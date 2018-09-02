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
            comando.CommandText = @"INSERT INTO pessoas (nome, sexo, cpf, nascimento, telefone, cep) OUTPUT INSERTED.ID VALUES (@NOME, @IDADE, @SEXO, @CPF, @NASCIMENTO, @TELEFONE, @CEP)";
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
                    Id = Convert.ToInt32(linha[0].ToString()),
                    Nome = linha[1].ToString(),
                    Sexo = Convert.ToChar(linha[3].ToString()),
                    CPF = linha[4].ToString(),
                    Nascimento = Convert.ToDateTime(linha[5].ToString()),
                    Telefone = linha[6].ToString(),
                    Cep = linha[7].ToString()


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
                pessoas.Nome = tabela.Rows[0][0].ToString();
                pessoas.Sexo = Convert.ToChar(tabela.Rows[0][2].ToString());
                pessoas.CPF = tabela.Rows[0][3].ToString();
                pessoas.Nascimento = Convert.ToDateTime(tabela.Rows[0][4].ToString());
                pessoas.Telefone = tabela.Rows[0][5].ToString();
                pessoas.Cep = tabela.Rows[0][6].ToString();

            }


            return pessoas;
        }
        public bool AlterarPessoas(Pessoas pessoas)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "UPDATE pessoas SET nome = @NOME, sexo = @SEXO, cpf = @CPF, nascimento = @NASCIMENTO, telefone = @TELEFONE, cep = @CEP WHERE id = @ID";
            comando.Parameters.AddWithValue("@ID", pessoas.Id);
            comando.Parameters.AddWithValue("@NOME",pessoas.Nome);
            comando.Parameters.AddWithValue("@SEXO", pessoas.Sexo);
            comando.Parameters.AddWithValue("@CPF", pessoas.CPF);
            comando.Parameters.AddWithValue("@NASCIMENTO", pessoas.Nascimento);
            comando.Parameters.AddWithValue("@TELEFONE", pessoas.Telefone);
            comando.Parameters.AddWithValue("@CEP", pessoas.Cep);    
            return comando.ExecuteNonQuery() == 1;
        }

       

    }
}