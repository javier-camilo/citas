using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SOFTWARE.Models
{
    public class Turno
    {
        
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Numero { get; set; }

        public string Motivo { get; set; }

        public string Asistencia { get; set; }

        public string DescripcionOperacion { get; set; }

        public string ContratistaAtendio { get; set; }

        public string RefTiempo { get; set; }

        public string RefSolicitante { get; set; }

        public string FechaFinalizacion { get; set; }
        
    }
}