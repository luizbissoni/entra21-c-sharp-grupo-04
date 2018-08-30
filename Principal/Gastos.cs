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

        
       // public int IdGastos { get; set; }

        [Required(ErrorMessage = "O valor dos gastos não pode ser vazio")]
        [Display(Name = "Valor")]
        public double ValorGastos { get; set; }

        [Display(Name = "Data da Entrada")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DataEntrada { get; set; }


        [Display(Name = "Data de Vencimento")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DataVencimento { get; set; }

        [Display(Name = "Descrição")]
        [MaxLength(50, ErrorMessage = "A descrição não pode ultrapassar de cinquenta caracteres")]
        [MinLength(4, ErrorMessage = "A descrição não pode ser inferior a quatro dígitos")]
        public string Descricao { get; set; }
    }
}