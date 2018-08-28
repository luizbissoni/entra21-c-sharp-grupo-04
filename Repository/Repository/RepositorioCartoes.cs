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
    public class RepositorioCartoes
    {

        public List<Cartoes> ObterTodosCartoes()
        {
            List<Cartoes> cartoes = new List<Cartoes>();
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT id, id_cartoes, numero_cartao, numero_conta, numero_seguranca, data_vencimento, bandeira, banco FROM cartoes";
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                Cartoes cartao = new Cartoes()
                {
                    Id = Convert.ToInt32(linha["id"].ToString()),
                    //        Id_cartoes = Convert.ToInt32(linha[1].ToString()),
                    Numero_cartao = linha["numero_cartao"].ToString(),
                    Numero_conta = linha["numero_conta"].ToString(),
                    Numero_seguranca = Convert.ToInt32(linha["numero_seguranca"].ToString()),
                    Data_vencimento = Convert.ToDateTime(linha["data_vencimento"].ToString()),
                    Bandeira = linha["bandeira"].ToString(),
                    Banco = linha["banco"].ToString()

                };
                cartoes.Add(cartao);
            }
            return cartoes;
        }



        public int CadastrarCartao(Cartoes cartoes)
        {

            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"INSERT INTO cartoes (id_cartoes,numero_cartao, numero_conta, numero_seguranca,
 data_vencimento, bandeira,banco) OUTPUT INSERTED.ID VALUES 
(@ID_CARTOES, @NUMERO_CARTAO, @NUMERO_CONTA, @NUMERO_SEGURANCA, @DATA_VENCIMENTO, @BANDEIRA, @BANCO)";
            comando.Parameters.AddWithValue("@ID_CARTOES", cartoes.Id_cartoes);
            comando.Parameters.AddWithValue("@NUMERO_CARTAO", cartoes.Numero_cartao);
            comando.Parameters.AddWithValue("@NUMERO_CONTA", cartoes.Numero_conta);
            comando.Parameters.AddWithValue("@NUMERO_SEGURANCA", cartoes.Numero_seguranca);
            comando.Parameters.AddWithValue("@DATA_VENCIMENTO", cartoes.Data_vencimento);
            comando.Parameters.AddWithValue("@BANDEIRA", cartoes.Bandeira);
            comando.Parameters.AddWithValue("@BANCO", cartoes.Banco);
            int id = Convert.ToInt32(comando.ExecuteScalar().ToString());
            return id;
        }

        public bool ExcluirCartoes(int id)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "DELETE FROM cartoes WHERE id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            return comando.ExecuteNonQuery() == 1;
        }

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
                cartoes.Numero_cartao = tabela.Rows[0]["numero_cartao"].ToString();
                cartoes.Numero_conta = tabela.Rows[0]["numero_conta"].ToString();
                cartoes.Numero_seguranca = Convert.ToInt32(tabela.Rows[0]["numero_seguranca"].ToString());
                cartoes.Data_vencimento = Convert.ToDateTime(tabela.Rows[0]["data_vencimento"].ToString());
                cartoes.Bandeira = tabela.Rows[0]["bandeira"].ToString();
                cartoes.Banco = tabela.Rows[0]["banco"].ToString();

            }


            return cartoes;
        }




        public bool AlterarCartoes(Cartoes cartao)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "UPDATE cartoes SET numero_cartao = @NUMERO_CARTAO, numero_conta = @NUMERO_CONTA, numero_seguranca = @NUMERO_SEGURANCA, data_vencimento = @DATA_VENCIMENTO, bandeira = @BANDEIRA, banco = @BANCO  WHERE id = @ID";
            comando.Parameters.AddWithValue("@NUMERO_CARTAO", cartao.Numero_cartao);
            comando.Parameters.AddWithValue("@NUMERO_CONTA", cartao.Numero_conta);
            comando.Parameters.AddWithValue("@NUMERO_SEGURANCA", cartao.Numero_seguranca);
            comando.Parameters.AddWithValue("@DATA_VENCIMENTO", cartao.Data_vencimento);
            comando.Parameters.AddWithValue("@BANDEIRA", cartao.Bandeira);
            comando.Parameters.AddWithValue("@BANCO", cartao.Banco);
            comando.Parameters.AddWithValue("@ID", cartao.Id);
            return comando.ExecuteNonQuery() == 1;
        }
    }
}