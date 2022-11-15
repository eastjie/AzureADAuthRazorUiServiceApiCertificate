using System.Collections.Generic;
using System.Threading.Tasks;
using ApiWithMutlipleApis.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web;

namespace ApiWithMutlipleApis.Controllers
{
    [Authorize(Policy = "ValidateAccessTokenPolicy", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [AuthorizeForScopes(Scopes = new string[] { "https://sandboxb2ctesting.onmicrosoft.com/73a141b6-7f79-4103-831b-be53d2766a19/access_as_user" })]
    [ApiController]
    [Route("[controller]")]
    public class ServiceApiCallsController : ControllerBase
    {
        private ServiceApiClientService _serviceApiClientService;

        public ServiceApiCallsController(ServiceApiClientService serviceApiClientService)
        {
            _serviceApiClientService = serviceApiClientService;
        }

        [HttpGet]
        public async Task<IEnumerable<string>> Get()
        {
            return await _serviceApiClientService.GetApiDataAsync();
        }
    }
}
