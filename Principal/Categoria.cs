using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SistemaFinanceiro.Models
{
    public class Categoria
    {
        public int Id { get; set; }

        public int Id_Categoria { get; set; }


        [Display(Name = "Nome")]
        [MaxLength(150, ErrorMessage = "O nome da categoria não pode ultrapassar de cento e cinquenta caracteres")]
        [MinLength(4, ErrorMessage = "O nome da categoria não pode ser inferior a quatro dígitos")]
        public string Nome { get; set; }

    }
}