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
        public int Id_cartoes { get; set; }
        [Required(ErrorMessage = "O número do cartão não pode ser vazio")] 
        [MaxLength(16, ErrorMessage = "O número do cartão não pode ser superior a dezesseis caracteres")]

        public string Numero_cartao { get; set; }

        [Required(ErrorMessage = "O número da conta não pode ser vazia")]
        [MaxLength(4, ErrorMessage = "Número da conta não pode ser superior a quatro dígitos")]
        public string Numero_conta { get; set; }

        [Required(ErrorMessage = "O número de segurança não pode ser vazio")]
        [MaxLength(4, ErrorMessage = "O número de segurança não pode ser superior á quatro dígitos")]

        public int Numero_seguranca { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime Data_vencimento { get; set; }

        [Required(ErrorMessage = "O nome da bandeira de seu cartão não pode ser vazio")]
        [MaxLength(20, ErrorMessage = "O nome da bandeira de seu cartão não pode ser superior a vinte dígitos")]
        [MinLength(3, ErrorMessage = "O nome da bandeira de seu cartão não pode ser inferior a três dígitos")]
        public string Bandeira { get; set; }

        [Required(ErrorMessage = "O nome da bandeira de seu cartão não pode ser vazio")]
        [MaxLength(20, ErrorMessage = "O nome do banco de seu cartão não pode ser superior a vinte dígitos")]
        [MinLength(3, ErrorMessage = "O nome do banco de seu cartão não pode ser inferior a três dígitos")]
        public string Banco { get; set; }
    }
}