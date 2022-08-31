using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using LibraryApi.Services.Interfaces;
using LibraryApi.Models.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LibraryApi.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }
        [Authorize(Roles ="Administrator")]
        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            var allUsers = await _accountService.GetAll();
            return Ok(allUsers);
        }
        [Authorize(Roles = "Administrator")]
        [HttpGet("getroles")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _accountService.GetRoles();
            return Ok(roles);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            await _accountService.RegisterNewUser(registerDto);
            return Ok();
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var userInfo = await _accountService.GenerateJwtToken(loginDto);
            return Ok(userInfo);
        }
        [Authorize]
        [HttpGet("get")]
        public async Task<IActionResult> Get()
        {
            var editAccountData = await _accountService.GetUserData();
            return Ok(editAccountData);
        }
        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] EditAccountDto editAccountDto)
        {
            await _accountService.EditUserData(editAccountDto);
            return Ok();
        }
        [Authorize(Roles ="Administrator")]
        [HttpPut("suspend/{id}")]
        public async Task<IActionResult> Suspend([FromRoute] int id)
        {
            await _accountService.SuspendingUnsuspendingUser(id);
            return Ok();
        }
        [Authorize(Roles = "Administrator")]
        [HttpPut("changerole")]
        public async Task<IActionResult> ChangeRole([FromBody] ChangeRoleDto changeRoleDto)
        {
            await _accountService.ChangeUserRole(changeRoleDto);
            return Ok();
        }
        [HttpPut("forgotpassword")]
        public async Task<IActionResult> ForgotPassword([FromQuery] string email)
        {
            await _accountService.ForgotPassword(email);
            return Ok();
        }
        [HttpPut("verifyaccount")]
        public async Task<IActionResult> VerifyAccount([FromQuery] string verificationToken)
        {
            await _accountService.VerifyAccount(verificationToken);
            return Ok("Verified successfully");
        }
        [HttpPut("resetpassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        {
            await _accountService.ResetPassword(resetPasswordDto);
            return Ok();
        }

    }
}
