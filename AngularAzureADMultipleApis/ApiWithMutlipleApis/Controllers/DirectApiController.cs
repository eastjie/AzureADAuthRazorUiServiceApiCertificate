using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web;

namespace ApiWithMutlipleApis.Controllers
{
    [Authorize(Policy = "ValidateAccessTokenPolicy",
        AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [AuthorizeForScopes(Scopes = new string[] { "https://sandboxb2ctesting.onmicrosoft.com/73a141b6-7f79-4103-831b-be53d2766a19/access_as_user" })]
    [ApiController]
    [Route("[controller]")]
    public class DirectApiController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new List<string> { "some data", "more data", "loads of data" };
        }

        
    }
}
