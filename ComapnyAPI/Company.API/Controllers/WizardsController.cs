using Company.Data;
using Company.Data.Security;
using Company.Domain.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Company.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WizardsController : ControllerBase
    {
        private readonly CompanyContext _context;
        private readonly ISecurityManager _securityManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public WizardsController(CompanyContext context , ISecurityManager securityManager, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _securityManager = securityManager;
            _httpContextAccessor = httpContextAccessor;
        }

        // GET: api/Wizards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Wizard>>> GetWizards()
        {

            Guid UserId = _securityManager.GetUser().UserId;
            if(UserId != null)
            {
                var Wizards = await _context.Wizards.Where(w=>w.AppUserId == UserId).Include(i => i.Items).ToListAsync();
                return Wizards;
            }
            else
                return NoContent();
        }

        // GET: api/Wizards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Wizard>> GetWizard(int id)
        {


            var wizards = await _context.Wizards.FindAsync(id);

            if (wizards == null)
            {
                return NotFound();
            }

            return wizards;
        }

        // POST : api/Wizards
        [HttpPost]
        public async Task<ActionResult<Wizard>> PostWizard(Wizard wizard)
        {

            Guid UserId = _securityManager.GetUser().UserId;
            wizard.AppUserId = UserId;
            _context.Wizards.Add(wizard);
            try
            {

                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {

                throw;
            }

            return CreatedAtAction("GetWizard", new { id = 1 }, wizard);
        }

        // DELETE: api/Wizards/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWizard(int id)
        {
            var wizard = await _context.Wizards.FindAsync(id);
            if (wizard == null)
            {
                return NotFound();
            }

            _context.Wizards.Remove(wizard);
            try
            {

                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {

                throw;
            }

            return NoContent();
        }
    }
}
