using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace SalesForceApi.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {

        private readonly ILogger<AuthController> _logger;

        public AuthController(ILogger<AuthController> logger)
        {
            _logger = logger;
        }

        [HttpGet("signin")]
        public IActionResult SignIn()
            => Challenge(new AuthenticationProperties { RedirectUri = "/user-panel" }, "Salesforce");

        [HttpGet("signout")]
        public async Task<IActionResult> SignOutCurrentUser()
        {
            SignOut(new AuthenticationProperties { RedirectUri = "/" }, CookieAuthenticationDefaults.AuthenticationScheme);
            await HttpContext.SignOutAsync("Cookies");
            Response.Cookies.Delete("LOGGED_IN");
            return Redirect("/");
        }

        [Authorize]
        [HttpGet]
        public IActionResult IsAuthorized() => Ok(true);
    }
}
