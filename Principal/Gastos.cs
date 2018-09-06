using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SistemaFinanceiro.Models
{
    public class Gastos
    {
        public int Id { get; set; }

        public int IdCartao { get; set; }

        public int IdCategoria { get; set; }
        
        public double Valor { get; set; }
        
        public DateTime Entrada { get; set; }
       
        public DateTime Vencimento { get; set; }

    }
}