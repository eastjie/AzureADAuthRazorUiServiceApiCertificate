using Microsoft.Graph;
using Microsoft.Identity.Web;
using System;
using System.IO;
using System.Threading.Tasks;

namespace ApiWithMutlipleApis.Services
{
    public class GraphApiClientService
    {
        private readonly GraphServiceClient _graphServiceClient;

        public GraphApiClientService(GraphServiceClient graphServiceClient)
        {
            _graphServiceClient = graphServiceClient;
        }

        public async Task<User> GetGraphApiUser()
        {
            try
            {
                var test = await _graphServiceClient.Users.Request().Filter($"DisplayName eq 'Jie SSO'").GetAsync();
                return await _graphServiceClient
                    .Me
                    .Request()
                    .WithScopes("User.ReadWrite.All") // Here, some difference between Azure AD and B2C
                                                      //.WithScopes("User.ReadBasic.All") //, "user.read")
                    .GetAsync();
            }
            catch (Exception ex )
            {
                throw ex;
            }
        }

        public async Task<string> GetGraphApiProfilePhoto()
        {
            try
            {
                var photo = string.Empty;
                // Get user photo
                using (var photoStream = await _graphServiceClient
                    .Me
                    .Photo
                    .Content
                    .Request()
                    .WithScopes("User.ReadBasic.All", "user.read")
                    .GetAsync())
                {
                    byte[] photoByte = ((MemoryStream)photoStream).ToArray();
                    photo = Convert.ToBase64String(photoByte);
                }

                return photo;
            }
            catch
            {
                return string.Empty;
            }
        }
    }
}
