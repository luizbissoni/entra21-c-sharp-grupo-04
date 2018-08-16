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
    public class RepositorioCategoria
    {

        public int CadastrarCategoria(Categoria categorias)
        {

            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"INSERT INTO categoria (nome) OUTPUT INSERTED.ID VALUES 
(@NOME)";
            comando.Parameters.AddWithValue("@NOME", categorias.Nome);

            int id = Convert.ToInt32(comando.ExecuteScalar().ToString());
            return id;
        }
        public bool AlterarCategorias(Categoria categoria)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "INSERT INTO categorias (id_categoria, nome)OUTPUT INSERTED.ID VALUES (@ID_CATEGORIA, @NOME)";
            comando.Parameters.AddWithValue("@ID_CATEGORIA", categoria.Id_Categoria);
            comando.Parameters.AddWithValue("@NOME", categoria.Nome);

            return comando.ExecuteNonQuery() == 1;
        }

        public bool ExcluirCategoria(int id)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "DELETE FROM cartoes WHERE categoria id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            return comando.ExecuteNonQuery() == 1;
        }

        public List<Categoria> ObterTodosCategoria()
        {
            List<Categoria> categorias = new List<Categoria>();
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT id, id_categoria FROM categoria";

            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                Categoria categoria = new Categoria()
                {
                    Id = Convert.ToInt32(linha[0].ToString()),
                    Id_Categoria = Convert.ToInt32(linha[1].ToString()),
                    Nome = linha[2].ToString()


                };
                categorias.Add(categoria);
            }
            return categorias;
        }

    }
}