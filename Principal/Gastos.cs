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
        
        public DateTime DataComeco { get; set; }

        public DateTime DataTermino { get; set; }

        public string Descricao { get; set; }

    }
}