using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                AppUser user = new AppUser
                {
                    DisplayName = "Logan",
                    Email = "Logan@test.com",
                    UserName = "Logana",
                    Address = new Address
                    {
                        FirstName = "Loganathan",
                        LastName = "M",
                        StreetName = "Awe Street",
                        City = "Metropolis",
                        State = "Gotham"
                    } 
                };

                await userManager.CreateAsync(user, "loganaA!1");
            }
        }
    }
}