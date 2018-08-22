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

        [Display(Name = "Id")]
        public int Id_Gastos { get; set; }

        [Required(ErrorMessage = "O valor dos gastos não pode ser vazio")]
        [Display(Name = "Valor")]
        public double Valor_Dos_Gastos { get; set; }

        [Display(Name = "Data da Entrada")]
        [DataType(DataType.Date)]
        //[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime Data_De_Entrada { get; set; }


        [Display(Name = "Data de Vencimento")]
        [DataType(DataType.Date)]
        //[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime Data_De_Vencimento { get; set; }

        [Display(Name = "Descrição")]
        [MaxLength(50, ErrorMessage = "A descrição não pode ultrapassar de cinquenta caracteres")]
        [MinLength(4, ErrorMessage = "A descrição não pode ser inferior a quatro dígitos")]
        public string Descricao { get; set; }
    }
}