using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SOFTWARE.Core.Dtos
{
    public class RegisterDto
    {   
        
        [Required(ErrorMessage = "usuario es requerido")]
        public string UserName { get; set; }


        [Required(ErrorMessage = "Email es requerido")]
        [EmailAddress(ErrorMessage = "debe digitar un email valido")]
        public string Email { get; set; }

        [Required(ErrorMessage = "contraseña es requerido")]
        public string Password { get; set; }

        
        [Required(ErrorMessage = "identificacion es requerido")]
        public string Identificacion { get; set; }
        
        [Required(ErrorMessage = "nombre es requerido")]
        public string Nombre { get; set; }

        
        [Required(ErrorMessage = "Apellido es requerido")]
        public string Apellido { get; set; }

        
        [Required(ErrorMessage = "Telefono es requerido")]
        public string Telefono { get; set; }
    }
}