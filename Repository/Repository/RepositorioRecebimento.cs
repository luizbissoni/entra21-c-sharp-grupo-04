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
            comando.CommandText = @"INSERT INTO recebimento (valor_recebido,data_recebimento,descricao) OUTPUT INSERTED.ID VALUES 
(@VALOR_RECEBIDO,@DATA_RECEBIMENTO,@DESCRICAO)";
            comando.Parameters.AddWithValue("@VALOR_RECEBIDO", recebimento.Valor_recebido);
            comando.Parameters.AddWithValue("@DATA_RECEBIMENTO", recebimento.data_recebimento);
            comando.Parameters.AddWithValue("@DESCRICAO", recebimento.Descricao);

            int id = Convert.ToInt32(comando.ExecuteScalar().ToString());
            return id;
        }

        public bool ExcluirRecebimento(int id)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "DELETE FROM cartoes WHERE recebimento id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            return comando.ExecuteNonQuery() == 1;
        }

        public List<Recebimento> ObterTodosRecebimento()
        {
            List<Recebimento> recebimentos = new List<Recebimento>();
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT id, id_recebimento, valor_recebido, data_recebimento, descricao FROM recebimento";


            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                Recebimento recebimento = new Recebimento()
                {
                    Id = Convert.ToInt32(linha[0].ToString()),
                    Id_recebimento = Convert.ToInt32(linha[1].ToString()),
                    Valor_recebido = Convert.ToInt16(linha[2].ToString()),
                    data_recebimento = Convert.ToDateTime(linha[3].ToString()),
                    Descricao = linha[4].ToString()


                };
                recebimentos.Add(recebimento);
            }
            return recebimentos;
        }

        public Recebimento ObterPeloIdRecebimento(int id)
        {
            Recebimento recebimento = null;
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT valor_recebido, data_recebimento, descricao FROM recebimento WHERE id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            if (tabela.Rows.Count == 1)
            {
                recebimento = new Recebimento();
                recebimento.Id = id;
                
                recebimento.Valor_recebido = Convert.ToDecimal(tabela.Rows[0][0].ToString());
                recebimento.data_recebimento = Convert.ToDateTime(tabela.Rows[0][1].ToString());
                recebimento.Descricao = tabela.Rows[0][2].ToString();
                
            }


            return recebimento;
        }

        public bool AlterarRecebimento(Recebimento recebimento)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "UPDATE categoria SET valor_recebido = @VALOR_RECEBIDO, data_recebimento = @DATA_RECEBIMENTO, descricao = @DESCRICAO WHERE id = @ID";
            comando.Parameters.AddWithValue("@ID_CATEGORIA", recebimento.Id_recebimento);
            comando.Parameters.AddWithValue("@VALOR_RECEBIDO", recebimento.Valor_recebido);
            comando.Parameters.AddWithValue("@DATA_RECEBIMENTO", recebimento.data_recebimento);
            
            comando.Parameters.AddWithValue("@DESCRICAO", recebimento.Descricao);

            return comando.ExecuteNonQuery() == 1;
        }
    }
}