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

        public Categoria Categoria;

        public double Valor { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Entrada { get; set; }

        public DateTime Vencimento { get; set; }

        public string Descricao { get; set; }

    }
}