using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaFinanceiro.Models
{
    public class Categoria
    {
        public int Id { get; set; }
        public int Id_Categoria { get; set; }
        public double Salario { get; set; }
        public double Contas { get; set; }
        public double Alimentacao { get; set; }
        public double Moradia { get; set; }
        public double Saude { get; set; }
        public double Impostos_taxas { get; set; }
        public double  Roupas_Acessorios { get; set; }
    }
}