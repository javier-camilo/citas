using Microsoft.EntityFrameworkCore;
using SOFTWARE.Models;

namespace SOFTWARE.Contexto
{

        public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        public DbSet<Poblacion> Poblacion { get; set; } = null!;
        public DbSet<Solicitante> Solicitantes { get; set; } = null!;
        public DbSet<Motivo> Motivo { get; set; } = null!;

    }

}