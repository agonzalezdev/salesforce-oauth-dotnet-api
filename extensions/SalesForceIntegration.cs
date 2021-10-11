using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Mvc.Client.Extensions
{
    public static class HttpContextExtensions
    {
        public static async Task<AuthenticationScheme> GetSalesForceAuthProvider(this HttpContext context)
        {
            if (context == null) throw new ArgumentNullException(nameof(context));

            var schemes = context.RequestServices.GetRequiredService<IAuthenticationSchemeProvider>();
            var a = await schemes.GetDefaultAuthenticateSchemeAsync();
            return await schemes.GetSchemeAsync("salesfoce");
        }
    }
}