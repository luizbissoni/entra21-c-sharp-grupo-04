using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SistemaFinanceiro.Models
{
    public class Pessoas
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public int Idade { get; set; }

        public char Sexo { get; set; }

        public string CPF { get; set; }

        //[Display(Name = "Data de nascimento")]
        //[DataType(DataType.Date)]
        //[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime Data_nascimento { get; set; }

        public string Telefone { get; set; }

        public string Cep { get; set; }
    }
}