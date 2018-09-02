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
    public class RepositorioPessoas
    {

        public int CadastrarPessoas(Pessoas pessoas)
        {

            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"INSERT INTO pessoas (nome, sexo, cpf, nascimento, telefone, cep) OUTPUT INSERTED.ID VALUES (@NOME, @SEXO, @CPF, @NASCIMENTO, @TELEFONE, @CEP)";
            comando.Parameters.AddWithValue("@NOME", pessoas.Nome);
            comando.Parameters.AddWithValue("@SEXO", pessoas.Sexo);
            comando.Parameters.AddWithValue("@CPF", pessoas.CPF);
            comando.Parameters.AddWithValue("@NASCIMENTO", pessoas.Nascimento);
            comando.Parameters.AddWithValue("@TELEFONE", pessoas.Telefone);
            comando.Parameters.AddWithValue("@CEP", pessoas.Cep);
            int id = Convert.ToInt32(comando.ExecuteScalar().ToString());

            return id;
        }

        public bool ExcluirPessoas(int id)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "DELETE FROM pessoas WHERE id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            return comando.ExecuteNonQuery() == 1;
        }


        public List<Pessoas> ObterTodosPessoas()
        {
            List<Pessoas> pessoas = new List<Pessoas>();
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT id, nome, sexo, cpf, nascimento, telefone, cep FROM pessoas";


            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                Pessoas pessoa = new Pessoas()
                {
                    Id = Convert.ToInt32(linha["id"].ToString()),
                    Nome = linha["nome"].ToString(),
                    Sexo = Convert.ToChar(linha["sexo"].ToString()),
                    CPF = linha["cpf"].ToString(),
                    Nascimento = Convert.ToDateTime(linha["nascimento"].ToString()),
                    Telefone = linha["telefone"].ToString(),
                    Cep = linha["cep"].ToString()


                };
                pessoas.Add(pessoa);
            }
            return pessoas;
        }

        public Pessoas ObterPeloIdPessoas(int id)
        {
            Pessoas pessoas = null;
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT nome, sexo, cpf, nascimento, telefone, cep FROM pessoas WHERE id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            if (tabela.Rows.Count == 1)
            {
                pessoas = new Pessoas();
                pessoas.Id = id;
                pessoas.Nome = tabela.Rows[0]["nome"].ToString();
                pessoas.Sexo = Convert.ToChar(tabela.Rows[0]["sexo"].ToString());
                pessoas.CPF = tabela.Rows[0]["cpf"].ToString();
                pessoas.Nascimento = Convert.ToDateTime(tabela.Rows[0]["nascimento"].ToString());
                pessoas.Telefone = tabela.Rows[0]["telefone"].ToString();
                pessoas.Cep = tabela.Rows[0]["cep"].ToString();

            }


            return pessoas;
        }
        public bool AlterarPessoas(Pessoas pessoas)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "UPDATE pessoas SET nome = @NOME, sexo = @SEXO, cpf = @CPF, nascimento = @NASCIMENTO, telefone = @TELEFONE, cep = @CEP WHERE id = @ID";
            comando.Parameters.AddWithValue("@ID", pessoas.Id);
            comando.Parameters.AddWithValue("@NOME", pessoas.Nome);
            comando.Parameters.AddWithValue("@SEXO", pessoas.Sexo);
            comando.Parameters.AddWithValue("@CPF", pessoas.CPF);
            comando.Parameters.AddWithValue("@NASCIMENTO", pessoas.Nascimento);
            comando.Parameters.AddWithValue("@TELEFONE", pessoas.Telefone);
            comando.Parameters.AddWithValue("@CEP", pessoas.Cep);
            return comando.ExecuteNonQuery() == 1;
        }

        public Cartoes GetIdpessoasCartao(int id)
        {
            Cartoes cartoes = null;
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT id, numero, conta, bandeira, banco FROM cartoes WHERE id_pessoas = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            if (tabela.Rows.Count == 1)
            {
                cartoes = new Cartoes();

                cartoes.IdPessoas = id;
                cartoes.Id = Convert.ToInt32(tabela.Rows[0]["id"].ToString());
                cartoes.Numero = tabela.Rows[0]["numero"].ToString();
                cartoes.Conta = tabela.Rows[0]["conta"].ToString();
                cartoes.Bandeira = tabela.Rows[0]["bandeira"].ToString();
                cartoes.Banco = tabela.Rows[0]["banco"].ToString();

            }


            return cartoes;
        }

    }
}