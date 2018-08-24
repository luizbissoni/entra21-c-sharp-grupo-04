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
    public class RepositorioGastos
    {

        public int CadastrarGastos(Gastos gastos)
        {

            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"INSERT INTO gastos (valor_gastos, data_entrada, data_vencimento, descricao) OUTPUT INSERTED.ID VALUES 
(@VALOR_GASTOS, @DATA_ENTRADA, @DATA_VENCIMENTO, @DESCRICAO)";
            //comando.Parameters.AddWithValue("@ID_GASTOS", gastos.Id_Gastos);
            comando.Parameters.AddWithValue("@VALOR_GASTOS", gastos.Valor_Dos_Gastos);
            comando.Parameters.AddWithValue("@DATA_ENTRADA", gastos.Data_De_Entrada);
            comando.Parameters.AddWithValue("@DATA_VENCIMENTO", gastos.Data_De_Vencimento);
            comando.Parameters.AddWithValue("@DESCRICAO", gastos.Descricao);

            int id = Convert.ToInt32(comando.ExecuteScalar().ToString());
            return id;
        }

        public bool ExcluirGastos(int id)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "DELETE FROM gastos WHERE gastos id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            return comando.ExecuteNonQuery() == 1;
        }

        public List<Gastos> ObterTodosGastos()
        {
            List<Gastos> gastos = new List<Gastos>();
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT id, valor_gastos, data_entrada, data_vencimento, descricao FROM gastos";


            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                Gastos gasto = new Gastos()
                {
                    Id = Convert.ToInt32(linha[0].ToString()),
                    //Id_Gastos = Convert.ToInt32(linha[1].ToString()),
                    Valor_Dos_Gastos = Convert.ToDouble(linha[1].ToString()),
                    Data_De_Entrada = Convert.ToDateTime(linha[2].ToString()),
                    Data_De_Vencimento = Convert.ToDateTime(linha[3].ToString()),
                    Descricao = linha[4].ToString()

                };
                gastos.Add(gasto);
            }
            return gastos;
        }

        public Gastos ObterPeloIdGastos(int id)
        {
            Gastos gastos = null;
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT valor_gastos, data_entrada, data_vencimento, descricao FROM gastos WHERE id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            if (tabela.Rows.Count == 1)
            {
                gastos = new Gastos();
                gastos.Id = id;
                gastos.Valor_Dos_Gastos = Convert.ToDouble(tabela.Rows[0][0].ToString());
                gastos.Data_De_Entrada = Convert.ToDateTime(tabela.Rows[0][1].ToString());
                gastos.Data_De_Vencimento = Convert.ToDateTime(tabela.Rows[0][2].ToString());
                gastos.Descricao = tabela.Rows[0][3].ToString();

            }


            return gastos;
        }

        public bool AlterarGastos(Gastos gastos)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "UPDATE gastos SET valor_gastos = @VALOR_GASTOS, data_entrada = @DATA_ENTRADA, data_vencimento = @DATA_VENCIMENTO, descricao = @DESCRICAO WHERE id = @ID";
            //comando.Parameters.AddWithValue("@ID_CATEGORIA", gastos.Id_Gastos);
            comando.Parameters.AddWithValue("@VALOR_GASTOS", gastos.Valor_Dos_Gastos);
            comando.Parameters.AddWithValue("@DATA_ENTRADA", gastos.Data_De_Entrada);
            comando.Parameters.AddWithValue("@DATA_VENCIMENTO", gastos.Data_De_Vencimento);
            comando.Parameters.AddWithValue("@DESCRICAO", gastos.Descricao);
            comando.Parameters.AddWithValue("@ID", gastos.Id); 
            return comando.ExecuteNonQuery() == 1;
        }



    }
}