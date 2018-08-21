using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaFinanceiro.Models
{
    public class Pessoas
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Idade { get; set; }
        public bool Sexo { get; set; }
        public string CPF { get; set; }
        public DateTime Data_nascimento { get; set; }
        public int Telefone { get; set; }
    }
}