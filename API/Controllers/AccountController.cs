using System.Threading.Tasks;
using API.DTOs;
using API.Errors;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            //usermanager to get the user from the database
            //signinmanager to check the user's password against the database

            var user = _userManager.FindByEmailAsync(loginDto.Email);
            
            return null;
        }

    }
}