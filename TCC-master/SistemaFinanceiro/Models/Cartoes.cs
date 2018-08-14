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
        [MaxLength(16, ErrorMessage = "Número do cartão deve conter no mínimo 16 caracteres")]
        public string Numero_cartao { get; set; }

        [Required(ErrorMessage = "O número da conta não pode ser vazia")]
        [MaxLength(4, ErrorMessage = "O número da conta não pode ser superior a 4 dígitos")]
        public string Numero_conta { get; set; }

        [Required(ErrorMessage = "Número de segurança do cartão não pode ser vazio")]
        [MaxLength(4, ErrorMessage = "Número de segurança do cartão não pode ser superior a quatro dígitos")]
        public int Numero_seguranca { get; set; }

        [Required(ErrorMessage = "A data do vencimento do cartão não pode ser vazia")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime Data_vencimento { get; set; }

        [Required(ErrorMessage = "A bandeira de seu cartão não pode ser vazia")]
        [MinLength(3, ErrorMessage = "O nome da bandeira do cartão não pode ser inferior a três caracteres")]
        [MaxLength(20, ErrorMessage = "O nome da bandeira de seu cartão não pode ser superior a vinte dígitos")]

        public string Bandeira { get; set; }


        [Required(ErrorMessage = "O nome do seu banco não pode ser vazio")]
        [MinLength(3, ErrorMessage = "O nome do seu abnco não pode ser inferior a três dígitos")]
        [MaxLength(20, ErrorMessage = "O nome do seu banco não pode ser superior a vinte dígitos")]
        public string Banco { get; set; }
    }
}