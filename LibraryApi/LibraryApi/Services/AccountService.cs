using AutoMapper;
using LibraryApi.Data;
using LibraryApi.Enities;
using LibraryApi.Exceptions;
using LibraryApi.Models.Authorization;
using LibraryApi.Models.Email;
using LibraryApi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace LibraryApi.Services
{
    public class AccountService : IAccountService
    {
        private readonly LibraryDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly JwtAuthSettings _authSettings;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        public AccountService(LibraryDbContext context, IPasswordHasher<User> passwordHasher, 
            JwtAuthSettings authSettings, IHttpContextAccessor httpContextAccessor, IMapper mapper,
            IConfiguration configuration, IEmailService emailService)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _authSettings = authSettings;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
            _configuration = configuration;
            _emailService = emailService;
        }
        public async Task<IEnumerable<UserInfoDto>> GetAll()
        {
            var users = await _context.Users.Include(x=>x.Role).ToListAsync();

            var usersDto = _mapper.Map<List<UserInfoDto>>(users);
            return usersDto;

        }
        public async Task<IEnumerable<RoleDto>> GetRoles()
        {
            var roles = await _context.Roles.ToListAsync();

            var rolesDto = _mapper.Map<List<RoleDto>>(roles);
            return rolesDto;
        }
        public async Task RegisterNewUser(RegisterDto registerDto)
        {
            var user = new User()
            {
                Email = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                DateOfBirth = registerDto.DateOfBirth,
                RoleId = registerDto.RoleId,
                IsEmailConfirmed = registerDto.IsEmailConfirmed,
                IsSuspended = registerDto.IsSuspended
            };

            var password = _passwordHasher.HashPassword(user, registerDto.Password);
            var verificaionToken = Convert.ToHexString(RandomNumberGenerator.GetBytes(64));

            user.PasswordHash = password;
            user.VerificationToken = verificaionToken;

            var appUrl = _configuration.GetSection("FrontednApplicationUrll").Value;

            var message = new CreateEmailDto()
            {
                Destination = registerDto.Email,
                Subject = "Verify your account",
                Text = $"Click here to verify your account: {appUrl}Authorization/VerifyAccount?verificationToken={verificaionToken}"
            };

            await _emailService.SendEmail(message);

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }
        public async Task<UserAuthorizationDto> GenerateJwtToken(LoginDto loginDto)
        {
            var user = await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if (user.IsSuspended == true)
            {
                throw new UnauthorizedAccessException("Account has been suspended!");
            }
            if(user.IsEmailConfirmed == false)
            {
                throw new UnauthorizedAccessException("Please, check your email and confirm your account.");
            }

            if(user == null)
            {
                throw new BadRequestException("Invalid email or password!");
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, loginDto.Password);
            if(result == PasswordVerificationResult.Failed)
            {
                throw new BadRequestException("Invalid email or password!");
            }

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.FirstName + user.LastName),
                new Claim(ClaimTypes.Role, user.Role.RoleName),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authSettings.JwtKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expireDays = DateTime.Now.AddDays(_authSettings.JwtExpireDays);

            var token = new JwtSecurityToken(_authSettings.JwtIssuer, _authSettings.JwtIssuer, claims, expires: expireDays, signingCredentials: credentials);
            
            var tokenHandler = new JwtSecurityTokenHandler();

            var userAuthorizationInfo = new UserAuthorizationDto
            {
                Token = tokenHandler.WriteToken(token),
                RoleName = user.Role.RoleName
            };
            return userAuthorizationInfo;
        }
        public async Task<EditAccountDto> GetUserData()
        {
            int userId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            var userToEdit = new EditAccountDto()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                DateOfBirth = user.DateOfBirth,

            };

            return userToEdit;
        }
        public async Task EditUserData(EditAccountDto editAccountDto)
        {
            int userId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            user.FirstName = editAccountDto.FirstName;
            user.LastName = editAccountDto.LastName;
            user.DateOfBirth = editAccountDto.DateOfBirth;

            _context.Update(user);
            await _context.SaveChangesAsync();
        }
        public async Task SuspendingUnsuspendingUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);

            if(user.RoleId == 1)
            {
                throw new BadRequestException("Cannot suspend admin account");
            }

            if (user.IsSuspended == false)
            {
                user.IsSuspended = true;
            }
            else
            {
                user.IsSuspended = false;
            }
            _context.Update(user);
            await _context.SaveChangesAsync();
        }
        public async Task ChangeUserRole(ChangeRoleDto changeRoleDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == changeRoleDto.IdUser);

            user.RoleId = changeRoleDto.IdRole;

            _context.Update(user);
            await _context.SaveChangesAsync();
        }
        public async Task VerifyAccount(string token)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.VerificationToken == token);

            user.IsEmailConfirmed = true;
            user.VerificationToken = null;

            _context.Update(user);
            await _context.SaveChangesAsync();
        }
        public async Task ForgotPassword(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            var resetToken = Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
            user.ResetPasswordToken = resetToken;
            user.ResetPasswordExpirationDate = DateTime.Now.AddDays(1);

            var appUrl = _configuration.GetSection("FrontednApplicationUrl").Value;

            var message = new CreateEmailDto()
            {
                Destination = email,
                Subject = "Reset your password",
                Text = $"Click here to reset your password: {appUrl}Authorization/ResetPassword?email={email}&resetPasswordToken={resetToken}"
            };
            await _emailService.SendEmail(message);

            _context.Update(user);
            await _context.SaveChangesAsync();
        }
        public async Task ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == resetPasswordDto.Email 
            && x.ResetPasswordToken==resetPasswordDto.ResetPasswordToken);
            
            if(user==null || user.ResetPasswordExpirationDate < DateTime.Now)
            {
                throw new BadRequestException("You cannot reset your password");
            }

            user.PasswordHash = _passwordHasher.HashPassword(user, resetPasswordDto.Password);
            user.ResetPasswordToken = null;
            user.ResetPasswordExpirationDate = null;

            _context.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}
