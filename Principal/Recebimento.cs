using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaFinanceiro.Models
{
    public class Recebimento
    {
        public int Id { get; set; }
        //public int Id_recebimento { get; set; }
        public double Valor_recebido { get; set; }
        public DateTime data_recebimento { get; set; }
        public string Descricao { get; set; }

    }
}