using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaFinanceiro.Models
{
    public class Recebimento
    {
        public int Id { get; set; }

        public int IdPessoas { get; set; }

        public double Valor { get; set; }

        public DateTime Data { get; set; }


    }
}