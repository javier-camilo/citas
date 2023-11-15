using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace SOFTWARE.Models
{
    
    public class ApplicationUserInputModel
    {
        
        public string Identificacion { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }

        public string  Rol { get; set; }
    }

    
    public class ApplicationUserViewModel
    {
        public bool result { get; set; }
        public string Token { get; set; }

        public string UserName { get; set; }
    }

    public class LoginRequest
    {
        public string UserNameorEmail { get; set; }
        public string  Password { get; set; }
    }
}