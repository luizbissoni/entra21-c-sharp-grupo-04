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
    public class RepositorioRecebimento
    {
        public int CadastrarRecebimento(Recebimento recebimento)
        {

            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"INSERT INTO recebimentos (valor, data, id_pessoas, id_categoria) OUTPUT INSERTED.ID VALUES (@VALOR, @DATA, @IDPESSOA, @IDCATEGORIA)";
            comando.Parameters.AddWithValue("@VALOR", recebimento.Valor);
            comando.Parameters.AddWithValue("@DATA", recebimento.Data);
            comando.Parameters.AddWithValue("@IDPESSOA", recebimento.IdPessoas);
            comando.Parameters.AddWithValue("@IDCATEGORIA", recebimento.IdCategoria);
            int id = Convert.ToInt32(comando.ExecuteScalar().ToString());
            return id;
        }

        public bool ExcluirRecebimento(int id)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "DELETE FROM recebimentos WHERE id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            return comando.ExecuteNonQuery() == 1;
        }

        public List<Recebimento> ObterTodosRecebimento()
        {
            List<Recebimento> recebimentos = new List<Recebimento>();
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT id, valor, data FROM recebimentos";


            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                Recebimento recebimento = new Recebimento()
                {
                    Id = Convert.ToInt32(linha[0].ToString()),
                //  Id_recebimento = Convert.ToInt32(linha[1].ToString()),
                    Valor = Convert.ToDouble(linha[1].ToString()),
                    Data = Convert.ToDateTime(linha[2].ToString()),


                };
                recebimentos.Add(recebimento);
            }
            return recebimentos;
        }

        public Recebimento ObterPeloIdRecebimento(int id)
        {
            Recebimento recebimento = null;
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT valor, data FROM recebimentos WHERE id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            if (tabela.Rows.Count == 1)
            {
                recebimento = new Recebimento();
                recebimento.Id = id;
                
                recebimento.Valor = Convert.ToDouble(tabela.Rows[0][0].ToString());
                recebimento.Data = Convert.ToDateTime(tabela.Rows[0][1].ToString());
                
            }


            return recebimento;
        }

        public bool AlterarRecebimento(Recebimento recebimento)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "UPDATE recebimentos SET valor = @VALOR, data = @DATA WHERE id = @ID";
    //      comando.Parameters.AddWithValue("@ID_CATEGORIA", recebimento.Id_recebimento);
            comando.Parameters.AddWithValue("@VALOR", recebimento.Valor);
            comando.Parameters.AddWithValue("@DATAO", recebimento.Data);
            comando.Parameters.AddWithValue("@ID", recebimento.Id);
            return comando.ExecuteNonQuery() == 1;
        }
    }
}