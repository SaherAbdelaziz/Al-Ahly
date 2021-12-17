using Company.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Company.Data.Security
{
    public interface ISecurityManager
    {
        AppUserAuth ValidateUser(AppUser user);
        List<AppUserClaim> GetUserClaims(AppUser authUser);
        AppUserAuth BuildUserAuthObject(AppUser authUser);
        string BuildJwtToken(AppUserAuth authUser);
    }
}
