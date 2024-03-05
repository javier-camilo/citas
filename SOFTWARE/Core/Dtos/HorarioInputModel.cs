using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFTWARE.Core.Dtos
{
    public class HorarioInputModel
    {
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public int IntervaloAtencion { get; set; }
        public int NumeroMaximoTurnos { get; set; }
        
    }
}