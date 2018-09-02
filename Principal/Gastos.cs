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

        
       // public int IdCartao { get; set; }

        [Required(ErrorMessage = "O valor dos gastos não pode ser vazio")]
        [Display(Name = "Valor")]
        public double Valor { get; set; }

        [Display(Name = "Data da Entrada")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime Entrada { get; set; }


        [Display(Name = "Data de Vencimento")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime Vencimento { get; set; }

    }
}