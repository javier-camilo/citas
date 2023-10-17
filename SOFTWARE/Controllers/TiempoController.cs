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
    public class TiempoController : ControllerBase
    {
        private readonly TodoContext _context;

        public TiempoController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Tiempo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tiempo>>> GetTiempo()
        {
          if (_context.Tiempo == null)
          {
              return NotFound();
          }
            return await _context.Tiempo.ToListAsync();
        }

        // GET: api/Tiempo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tiempo>> GetTiempo(string id)
        {
          if (_context.Tiempo == null)
          {
              return NotFound();
          }
            var tiempo = await _context.Tiempo.FindAsync(id);

            if (tiempo == null)
            {
                return NotFound();
            }

            return tiempo;
        }

        // PUT: api/Tiempo/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTiempo(string id, Tiempo tiempo)
        {
            if (id != tiempo.RefHorario)
            {
                return BadRequest();
            }

            _context.Entry(tiempo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TiempoExists(id))
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

        // POST: api/Tiempo
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tiempo>> PostTiempo(Tiempo tiempo)
        {
          if (_context.Tiempo == null)
          {
              return Problem("Entity set 'TodoContext.Tiempo'  is null.");
          }
            _context.Tiempo.Add(tiempo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTiempo", new { id = tiempo.RefHorario }, tiempo);
        }

        // DELETE: api/Tiempo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTiempo(string id)
        {
            if (_context.Tiempo == null)
            {
                return NotFound();
            }
            var tiempo = await _context.Tiempo.FindAsync(id);
            if (tiempo == null)
            {
                return NotFound();
            }

            _context.Tiempo.Remove(tiempo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TiempoExists(string id)
        {
            return (_context.Tiempo?.Any(e => e.RefHorario == id)).GetValueOrDefault();
        }
    }
}
