using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SOFTWARE.Core.Dtos
{
    public class RegisterDto
    {   
        
        [Required(ErrorMessage = "UserName es requerido")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Email es requerido")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password es requerido")]
        public string Password { get; set; }
    }
}