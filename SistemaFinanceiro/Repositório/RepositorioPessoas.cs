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
            comando.CommandText = @"INSERT INTO categoria (nome,idade,sexo,
cpf,data_nascimento,telefone) OUTPUT INSERTED.ID VALUES 
(@NOME,@IDADE,@SEXO,@CPF,@DATA_NASCIMENTO,@TELEFONE)";
            comando.Parameters.AddWithValue("@NOME", pessoas.Nome);
            comando.Parameters.AddWithValue("@IDADE", pessoas.Idade);
            comando.Parameters.AddWithValue("@SEXO", pessoas.Sexo);
            comando.Parameters.AddWithValue("@CPF", pessoas.CPF);
            comando.Parameters.AddWithValue("@DATA_NASCIMENTO", pessoas.Data_nascimento);
            comando.Parameters.AddWithValue("@TELEFONE", pessoas.Telefone);
            int id = Convert.ToInt32(comando.ExecuteScalar().ToString());

            return id;
        }

        public bool ExcluirPessoas(int id)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "DELETE FROM cartoes WHERE pessoas id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            return comando.ExecuteNonQuery() == 1;
        }


        public List<Pessoas> ObterTodosPessoas()
        {
            List<Pessoas> pessoas = new List<Pessoas>();
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT id, id_pessoas, nome, idade, sexo, cpf, data_nascimento, telefone FROM pessoas";


            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                Pessoas pessoa = new Pessoas()
                {
                    Id = Convert.ToInt32(linha[0].ToString()),
                    Id_pessoas = Convert.ToInt32(linha[1].ToString()),
                    Nome = linha[2].ToString(),
                    Idade = Convert.ToInt32(linha[3].ToString()),
                    Sexo = Convert.ToBoolean(linha[4].ToString()),
                    CPF = Convert.ToInt32(linha[5].ToString()),
                    Data_nascimento = Convert.ToDateTime(linha[6].ToString()),
                    Telefone = Convert.ToInt32(linha[7].ToString())


                };
                pessoas.Add(pessoa);
            }
            return pessoas;
        }

    }
}