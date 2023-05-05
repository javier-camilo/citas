using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SOFTWARE.Contexto;
using SOFTWARE.Models;

namespace SOFTWARE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SolicitanteController : ControllerBase
    {
        private readonly TodoContext _context;

        public SolicitanteController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Solicitante
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Solicitante>>> GetSolicitantes()
        {
          if (_context.Solicitantes == null)
          {
              return NotFound();
          }
            return await _context.Solicitantes.ToListAsync();
        }

        // GET: api/Solicitante/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Solicitante>> GetSolicitante(long id)
        {
          if (_context.Solicitantes == null)
          {
              return NotFound();
          }
            var solicitante = await _context.Solicitantes.FindAsync(id);

            if (solicitante == null)
            {
                return NotFound();
            }

            return solicitante;
        }

        // PUT: api/Solicitante/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSolicitante(long id, Solicitante solicitante)
        {
            if (id != solicitante.Id)
            {
                return BadRequest();
            }

            _context.Entry(solicitante).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SolicitanteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Solicitante
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Solicitante>> PostSolicitante(Solicitante solicitante)
        {
          if (_context.Solicitantes == null)
          {
              return Problem("Entity set 'TodoContext.Solicitantes'  is null.");
          }
            _context.Solicitantes.Add(solicitante);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSolicitante", new { id = solicitante.Id }, solicitante);
        }

        // DELETE: api/Solicitante/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSolicitante(long id)
        {
            if (_context.Solicitantes == null)
            {
                return NotFound();
            }
            var solicitante = await _context.Solicitantes.FindAsync(id);
            if (solicitante == null)
            {
                return NotFound();
            }

            _context.Solicitantes.Remove(solicitante);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SolicitanteExists(long id)
        {
            return (_context.Solicitantes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
