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
    [AuthorizeForScopes(Scopes = new string[] { "api://0384055c-9c8a-4043-86aa-589b69078ba2/access_as_user" })]
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
