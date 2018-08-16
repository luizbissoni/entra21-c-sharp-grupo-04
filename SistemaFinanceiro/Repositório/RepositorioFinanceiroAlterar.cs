using SistemaFinanceiro.DataBase;
using SistemaFinanceiro.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SistemaFinanceiro.Repositório
{
    public class RepositorioFinanceiroAlterar
    {
        public bool AlterarCartoes(Cartoes cartao)
        {
        SqlCommand comando = new DBconnection().GetConnction();
        comando.CommandText = "INSERT INTO cartoes (id_cartoes, numero_cartao, numero_conta, numero_seguranca, data_vencimento, bandeira, banco)OUTPUT INSERTED.ID VALUES (@ID_CARTOES, @NUMERO_CARTAO, @NUMERO_CONTA, @NUMERO_SEGURANCA, @DATA_VENCIMENTO, @BANDEIRA, @BANCO)";
        comando.Parameters.AddWithValue("@ID_CARTOES", cartao.Id_cartoes);
        comando.Parameters.AddWithValue("@NUMERO_CARTAO", cartao.Numero_cartao);
        comando.Parameters.AddWithValue("@NUMERO_CONTA", cartao.Numero_conta);
        comando.Parameters.AddWithValue("@NUMERO_SEGURANCA", cartao.Numero_seguranca);
        comando.Parameters.AddWithValue("@DATA_VENCIMENTO", cartao.Data_vencimento);
        comando.Parameters.AddWithValue("@BANDEIRA", cartao.Bandeira);
        comando.Parameters.AddWithValue("@BANCO", cartao.Banco);
        return comando.ExecuteNonQuery() == 1;
        }

        public bool AlterarCategorias(Categoria categoria)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "INSERT INTO categorias (id_categoria, salario, contas, alimentacao, emprestimo, moradia, saude, impostos_taxas, roupas_acessorios, veiculo)OUTPUT INSERTED.ID VALUES (@ID_CATEGORIA, @SALARIO, @CONTAS, @ALIMENTACAO, @EMPRESTIMO, @MORADIA, @SAUDE, @IMPOSTOS_TAXAS, @ROUPAS_ACESSORIOS, VEICULO)";
            comando.Parameters.AddWithValue("@ID_CATEGORIA", categoria.Id_Categoria);
            comando.Parameters.AddWithValue("@SALARIO", categoria.Salario);
            comando.Parameters.AddWithValue("@CONTAS", categoria.Contas);
            comando.Parameters.AddWithValue("@ALIMENTACAO", categoria.Alimentacao);
            comando.Parameters.AddWithValue("@EMPRESTIMO", categoria.Emprestimo);
            comando.Parameters.AddWithValue("@MORADIA",);
            comando.Parameters.AddWithValue("@SAUDE",);
            comando.Parameters.AddWithValue("@IMPOSTOS_TAXAS",);
            comando.Parameters.AddWithValue("@ROUPAS_ACESSORIOS",);
            comando.Parameters.AddWithValue("@VEICULO",);
        }
    }
}