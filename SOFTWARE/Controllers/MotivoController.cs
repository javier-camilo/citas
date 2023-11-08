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
    public class MotivoController : ControllerBase
    {
        private readonly TodoContext _context;

        public MotivoController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Motivo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Motivo>>> GetMotivo()
        {
          if (_context.Motivo == null)
          {
              return NotFound();
          }
            return await _context.Motivo.ToListAsync();
        }

        // GET: api/Motivo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Motivo>> GetMotivo(int id)
        {
          if (_context.Motivo == null)
          {
              return NotFound();
          }
            var motivo = await _context.Motivo.FindAsync(id);

            if (motivo == null)
            {
                return NotFound();
            }

            return Ok(motivo);
        }

        // PUT: api/Motivo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMotivo(int id, Motivo motivo)
        {
            if (id != motivo.Id)
            {
                return BadRequest();
            }

            _context.Entry(motivo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MotivoExists(id))
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

        // POST: api/Motivo
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Motivo>> PostMotivo(Motivo motivo)
        {
            
          if (_context.Motivo == null)
          {
              return Problem("no existe base de datos de motivos");
          }

            try{
                
                _context.Motivo.Add(motivo);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetMotivo", new { id = motivo.Id }, motivo);

            }catch (Exception e)
            {
                ModelState.AddModelError("Guardar motivo", e.Message);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
        }

        // DELETE: api/Motivo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMotivo(int id)
        {
            if (_context.Motivo == null)
            {
                return NotFound();
            }
            var motivo = await _context.Motivo.FindAsync(id);
            if (motivo == null)
            {
                return NotFound();
            }

            _context.Motivo.Remove(motivo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MotivoExists(int id)
        {
            return (_context.Motivo?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
