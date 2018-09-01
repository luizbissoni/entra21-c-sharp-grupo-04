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
            comando.CommandText = "SELECT  id , numero_cartao, numero_conta, bandeira, banco FROM cartoes";
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                Cartoes cartao = new Cartoes()
                {
                    Id = Convert.ToInt32(linha["id"].ToString()),
                    //    IdCartoes = Convert.ToInt32(linha[1].ToString()),
                    NumeroCartao = linha["numero_cartao"].ToString(),
                    NumeroConta = linha["numero_conta"].ToString(),
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
            comando.CommandText = @"INSERT INTO cartoes (numero_cartao, numero_conta, bandeira, banco) OUTPUT INSERTED.ID VALUES ( @NUMERO_CARTAO, @NUMERO_CONTA, @BANDEIRA, @BANCO)";
           // comando.Parameters.AddWithValue("@ID_CARTOES", cartoes.IdCartoes);
            comando.Parameters.AddWithValue("@NUMERO_CARTAO", cartoes.NumeroCartao);
            comando.Parameters.AddWithValue("@NUMERO_CONTA", cartoes.NumeroConta);
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
            comando.CommandText = "SELECT numero_cartao, numero_conta, bandeira, banco FROM cartoes WHERE id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            if (tabela.Rows.Count == 1)
            {
                cartoes = new Cartoes();
                cartoes.Id = id;
                cartoes.NumeroCartao = tabela.Rows[0]["numero_cartao"].ToString();
                cartoes.NumeroConta = tabela.Rows[0]["numero_conta"].ToString();
                cartoes.Bandeira = tabela.Rows[0]["bandeira"].ToString();
                cartoes.Banco = tabela.Rows[0]["banco"].ToString();

            }


            return cartoes;
        }




        public bool AlterarCartoes(Cartoes cartao)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "UPDATE cartoes SET numero_cartao = @NUMERO_CARTAO, numero_conta = @NUMERO_CONTA, bandeira = @BANDEIRA, banco = @BANCO  WHERE id = @ID";
            comando.Parameters.AddWithValue("@NUMERO_CARTAO", cartao.NumeroCartao);
            comando.Parameters.AddWithValue("@NUMERO_CONTA", cartao.NumeroConta);
            comando.Parameters.AddWithValue("@BANDEIRA", cartao.Bandeira);
            comando.Parameters.AddWithValue("@BANCO", cartao.Banco);
            comando.Parameters.AddWithValue("@ID", cartao.Id);
            return comando.ExecuteNonQuery() == 1;
        }
    }
}