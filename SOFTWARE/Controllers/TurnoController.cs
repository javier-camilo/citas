using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SOFTWARE.Contexto;
using SOFTWARE.Core.OtherObjects;
using SOFTWARE.Models;

namespace SOFTWARE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class TurnoController : ControllerBase
    {
        private readonly TodoContext _context;

        public TurnoController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Turno
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Turno>>> GetTurno()
        {
          if (_context.Turno == null)
          {
              return NotFound();
          }

            var listado = await _context.Turno.ToListAsync();
            List<Turno> turnos = new List<Turno>();

            foreach (var item in listado)
            {
                if(item.Asistencia == "no Atendido")
                {
                    turnos.Add(item);
                }
            }
            return turnos;
        }

        [HttpGet]
        [Route("listadoTurno")]
        public async Task<ActionResult<IEnumerable<Turno>>> GetListado()
        {
            if (_context.Turno == null)
            {
                return NotFound();
            }

            var listado = await _context.Turno.ToListAsync();

            return listado;
        }

        // GET: api/Turno/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Turno>> GetTurno(int id)
        {
          if (_context.Turno == null)
          {
              return NotFound();
          }
            var turno = await _context.Turno.FindAsync(id);

            if (turno == null)
            {
                return NotFound();
            }

            return turno;
        }

        // PUT: api/Turno/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTurno(int id, Turno turno)
        {
            if (id != turno.Numero)
            {
                return BadRequest();
            }

            _context.Entry(turno).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TurnoExists(id))
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

        // POST: api/Turno
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Turno>> PostTurno(Turno turno)
        {
          if (_context.Turno == null)
          {
              return Problem("Entity set 'TodoContext.Turno'  is null.");
          }

            turno.Asistencia = "no Atendido";
            turno.ContratistaAtendio = "sin contratista";
            
            _context.Turno.Add(turno);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTurno", new { id = turno.Numero }, turno);
        }

        // DELETE: api/Turno/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTurno(int id)
        {
            if (_context.Turno == null)
            {
                return NotFound();
            }
            var turno = await _context.Turno.FindAsync(id);
            if (turno == null)
            {
                return NotFound();
            }

            _context.Turno.Remove(turno);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TurnoExists(int id)
        {
            return (_context.Turno?.Any(e => e.Numero == id)).GetValueOrDefault();
        }
        
    }
}
