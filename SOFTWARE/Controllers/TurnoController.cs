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

        [HttpGet]
        [Route("reporteTurno")]
        public async Task<ActionResult<IEnumerable<Reporte>>> GetReporte()
        {

            var turnoAtendido = 0;
            var turnoNOAtendido = 0;
            var turnoNOAsistio = 0;
            List<Reporte> lista = new List<Reporte>();

            if (_context.Turno == null)
            {
                return NotFound();
            }

            var listado = await _context.Turno.ToListAsync();

            foreach (var item in listado)
            {
                if (item.Asistencia == "no Atendido")
                {
                    turnoNOAtendido += 1;
                }

                if (item.Asistencia == "no Asistio")
                {
                    turnoNOAsistio += 1;
                }

                if (item.Asistencia == "Atendido")
                {
                    turnoAtendido += 1;
                }
            }

            var reporte = new Reporte("Atendido",turnoAtendido);
            var reporteDos = new Reporte("no Atendido", turnoNOAtendido);
            var reporteTres = new Reporte("no Asistio", turnoNOAsistio);

            lista.Add(reporte);
            lista.Add(reporteDos);
            lista.Add(reporteTres);

            return lista;

        }



        private ApplicationUser? TraerUsuario(string identificacion, List<ApplicationUser> listado)
        {

            ApplicationUser usuario = new ApplicationUser();

            foreach (var item in listado)
            {

                if (item.Identificacion == identificacion)
                {
                    usuario = item;
                    return usuario;
                }
            }

            return null;
        }


        [HttpGet]
        [Route("reporteContratista/{identificacion}")]
        public async Task<ActionResult<IEnumerable<Reporte>>> GetReporteContratista(string identificacion)
        {

            var turnoAtendido = 0;
            var turnoAtendidoContratista = 0;
            List<Reporte> lista = new List<Reporte>();

            if (_context.Turno == null)
            {
            return BadRequest(error("Consultar turno", "no se encontro ningun listado de turnos")); 
            }


            var listadoUsuarios = await _context.Users.ToListAsync();

            var usuario = TraerUsuario(identificacion,listadoUsuarios);

            if(usuario==null){
                return BadRequest(error("Consultar turno", "no se encontro ningunusuario con esos datos"));
            }

            var listado = await _context.Turno.ToListAsync();

            foreach (var item in listado)
            {
                if(item.Asistencia== "Atendido" && item.ContratistaAtendio==identificacion)
                {
                    turnoAtendidoContratista += 1;
                }

                if (item.Asistencia == "no Asistio" && item.ContratistaAtendio == identificacion)
                {
                    turnoAtendidoContratista += 1;
                }

                if (item.Asistencia == "Atendido" || item.Asistencia == "no Asistio")
                {
                    turnoAtendido += 1;
                }
            }

            var reporteContratista = new Reporte(usuario.Nombre, turnoAtendidoContratista);
            var reporte = new Reporte("Atendido", turnoAtendido);

            lista.Add(reporte);
            lista.Add(reporteContratista);

            return lista;

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
                return BadRequest(error("Consultar turno", "no se encontro ningun turno con esos datos"));
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


        private ValidationProblemDetails error(string servicio, string e)
        {

            ModelState.AddModelError(servicio, e);
            var problemDetails = new ValidationProblemDetails(ModelState)
            {
                Status = StatusCodes.Status400BadRequest,
            };

            return problemDetails;
        }


    }
}
