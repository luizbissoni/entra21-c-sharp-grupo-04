using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SistemaFinanceiro.Models
{
    public class Cartoes
    {
        public int Id { get; set; }

        public int IdPessoas { get; set; }

        public string Numero { get; set; }

        public string Conta { get; set; }

        public string Bandeira { get; set; }

        public string Banco { get; set; }
    }
}