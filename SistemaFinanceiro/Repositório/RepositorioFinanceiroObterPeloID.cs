using SistemaFinanceiro.DataBase;
using SistemaFinanceiro.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SistemaFinanceiro.Repositório
{
    public class RepositorioFinanceiroObterPeloID
    {

        public Cartoes ObterPeloIdCartoes(int id)
        {
            Cartoes cartoes = null;
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT numero_cartao,numero_conta,numero_seguranca, data_vencimento,bandeira,banco FROM cartoes WHERE id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            if (tabela.Rows.Count == 1)
            {
                cartoes = new Cartoes();
                cartoes.Id = id;
                cartoes.Numero_cartao = tabela.Rows[0][0].ToString();
                cartoes.Numero_conta = tabela.Rows[0][1].ToString();
                cartoes.Numero_seguranca = Convert.ToInt32(tabela.Rows[0][2].ToString());
                cartoes.Data_vencimento = Convert.ToDateTime(tabela.Rows[0][3].ToString());
                cartoes.Bandeira = tabela.Rows[0][4].ToString();
                cartoes.Banco = tabela.Rows[0][5].ToString();

            }


            return cartoes;
        }

    }
}