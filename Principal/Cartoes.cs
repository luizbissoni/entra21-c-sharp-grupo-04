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

        [Display(Name = "Id cartões")]
        [Required(ErrorMessage = "O número do cartão não pode ser vazio")]
        public int IdPessoas { get; set; }

       [Display(Name = "Numero do Cartão")]
       [Required(ErrorMessage = "O número da conta não pode ser vazia")]
       [MaxLength(4, ErrorMessage = "Número da conta não pode ser superior a quatro dígitos")]
       public string Numero { get; set; }

      [Display(Name = "Numero da conta")]
      public string Conta { get; set; }

       [Display(Name = "Bandeira")]
       [Required(ErrorMessage = "O nome da bandeira de seu cartão não pode ser vazio")]
       [MaxLength(20, ErrorMessage = "O nome da bandeira de seu cartão não pode ser superior a vinte dígitos")]
       [MinLength(3, ErrorMessage = "O nome da bandeira de seu cartão não pode ser inferior a três dígitos")]
       public string Bandeira { get; set; }

       [Display(Name = "Banco")]
       [Required(ErrorMessage = "O nome da bandeira de seu cartão não pode ser vazio")]
       [MaxLength(20, ErrorMessage = "O nome do banco de seu cartão não pode ser superior a vinte dígitos")]
       [MinLength(3, ErrorMessage = "O nome do banco de seu cartão não pode ser inferior a três dígitos")]
        public string Banco { get; set; }
    }
}