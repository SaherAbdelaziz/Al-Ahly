using Company.Data;
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
    [AllowAnonymous]
    public class WizardsController : ControllerBase
    {
        private readonly CompanyContext _context;

        public WizardsController(CompanyContext context)
        {
            _context = context;
        }

        // GET: api/Wizards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Wizard>>> GetWizards()
        {
            var Wizards = await _context.Wizards.Include(d => d.Items).ToListAsync();
            return Wizards;
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
            _context.Wizards.Add(wizard);
            try
            {

                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {

                throw;
            }

            return CreatedAtAction("GetWizard", new { id = wizard.Id }, wizard);
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
