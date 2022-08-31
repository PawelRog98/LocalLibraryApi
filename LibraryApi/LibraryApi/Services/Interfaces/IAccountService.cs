using LibraryApi.Data;
using LibraryApi.Enities;
using LibraryApi.Models.Authorization;

namespace LibraryApi.Services.Interfaces
{
    public interface IAccountService
    {
        Task<IEnumerable<UserInfoDto>> GetAll();
        Task<IEnumerable<RoleDto>> GetRoles();
        Task RegisterNewUser(RegisterDto registerDto);
        Task<UserAuthorizationDto> GenerateJwtToken(LoginDto loginDto);
        Task<EditAccountDto> GetUserData();
        Task EditUserData(EditAccountDto editAccountDto);
        Task SuspendingUnsuspendingUser(int id);
        Task ChangeUserRole(ChangeRoleDto changeRoleDto);
        Task ForgotPassword(string email);
        Task VerifyAccount(string token);
        Task ResetPassword(ResetPasswordDto resetPasswordDto);

    }
}
