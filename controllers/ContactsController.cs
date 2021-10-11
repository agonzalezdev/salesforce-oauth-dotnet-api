using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net.Http.Json;

namespace SalesForceApi.Controllers
{
    [ApiController]
    [Route("contacts")]
    public class ContactsController : ControllerBase
    {

        private readonly ILogger<AuthController> _logger;

        public ContactsController(ILogger<AuthController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get([FromQuery] int? limit, [FromQuery] int? offset)
        {
            string token = await GetAccessToken();
            //TO-DO: Implements httpClientFactory
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

            var contacts = await httpClient.GetFromJsonAsync<SalesForceResponse<Contact>>(
                GenerateContactsApiEndpoint(limit, offset)
            );

            var contactsCount = (await httpClient.GetFromJsonAsync<SalesForceResponse<Contact>>(
                GenerateContactCountApiEndpoint()
            )).TotalSize;

            SetCountAndTotalSize(ref contacts, contactsCount);
            return Ok(contacts);
        }


        #region Private methods
        private async Task<string> GetAccessToken() => await HttpContext.GetTokenAsync("Salesforce", "access_token");

        private static void SetCountAndTotalSize(ref SalesForceResponse<Contact> contacts, int contactsCount)
        {
            contacts.Count = contacts.TotalSize;
            contacts.TotalSize = contactsCount;
        }

        private string GenerateContactsApiEndpoint(int? limit, int? offset)
        {
            var url = HttpContext.User.Claims.Where(e => e.Type.Equals("urn:salesforce:rest_url")).FirstOrDefault()?.Value;
            //TO-DO add 'photoUrl' fields
            var fields = new List<string>() { "id", "name", "email", "phone", "title", "description", "department", "birthdate", "fax" };
            url = Regex.Replace(url, @"{[^{}]+}", "52.0");
            url = $"{url}query/?q=SELECT+{string.Join(',', fields)}+from+Contact";

            if (limit.HasValue && offset.HasValue)
                url += $"+LIMIT+{limit}+OFFSET+{offset}";

            return url;
        }

        private string GenerateContactCountApiEndpoint()
        {
            var url = HttpContext.User.Claims.Where(e => e.Type.Equals("urn:salesforce:rest_url")).FirstOrDefault()?.Value;
            url = Regex.Replace(url, @"{[^{}]+}", "52.0");
            return $"{url}query/?q=SELECT+COUNT()+from+Contact";
        }
        #endregion
    }
}
