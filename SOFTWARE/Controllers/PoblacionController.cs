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
    public class PoblacionController : ControllerBase
    {
        private readonly TodoContext _context;

        public PoblacionController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Poblacion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Poblacion>>> GetPoblacion()
        {
          if (_context.Poblacion == null)
          {
              return NotFound();
          }
            return await _context.Poblacion.ToListAsync();
        }

        // GET: api/Poblacion/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Poblacion>> GetPoblacion(long id)
        {
          if (_context.Poblacion == null)
          {
              return NotFound();
          }
            var poblacion = await _context.Poblacion.FindAsync(id);

            if (poblacion == null)
            {
                return NotFound();
            }

            return poblacion;
        }

        // PUT: api/Poblacion/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPoblacion(long id, Poblacion poblacion)
        {
            if (id != poblacion.Id)
            {
                return BadRequest();
            }

            _context.Entry(poblacion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PoblacionExists(id))
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

        // POST: api/Poblacion
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Poblacion>> PostPoblacion(Poblacion poblacion)
        {
          if (_context.Poblacion == null)
          {
              return Problem("Entity set 'TodoContext.Poblacion'  is null.");
          }
            _context.Poblacion.Add(poblacion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPoblacion", new { id = poblacion.Id }, poblacion);
        }

        // DELETE: api/Poblacion/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePoblacion(long id)
        {
            if (_context.Poblacion == null)
            {
                return NotFound();
            }
            var poblacion = await _context.Poblacion.FindAsync(id);
            if (poblacion == null)
            {
                return NotFound();
            }

            _context.Poblacion.Remove(poblacion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PoblacionExists(long id)
        {
            return (_context.Poblacion?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
