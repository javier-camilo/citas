using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SOFTWARE.Models
{
    public class Solicitante
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public string Identificacion { get; set; }

        public string Nombre { get; set; }

        public string Correo { get; set; }

        public int Consentimiento { get; set; }
    }
}