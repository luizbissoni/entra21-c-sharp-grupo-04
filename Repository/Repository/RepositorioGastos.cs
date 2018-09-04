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
            comando.CommandText = @"INSERT INTO gastos (id_categoria, valor, entrada, vencimento) OUTPUT INSERTED.ID VALUES 
(@IDCATEGORIA, @VALOR, @ENTRADA, @VENCIMENTO, @DESCRICAO)";
            //comando.Parameters.AddWithValue("@ID_GASTOS", gastos.IdGastos);
            comando.Parameters.AddWithValue("@IDCATEGORIA", gastos.Id_categoria);
            comando.Parameters.AddWithValue("@VALOR", gastos.Valor);
            comando.Parameters.AddWithValue("@ENTRADA", gastos.Entrada);
            comando.Parameters.AddWithValue("@VENCIMENTO", gastos.Vencimento);

            int id = Convert.ToInt32(comando.ExecuteScalar().ToString());
            return id;
        }

        public bool ExcluirGastos(int id)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "DELETE FROM gastos WHERE id = @ID";
            comando.Parameters.AddWithValue("@ID",  id);
            return comando.ExecuteNonQuery() == 1;
        }

        public List<Gastos> ObterTodosGastos()
        {
            List<Gastos> gastos = new List<Gastos>();
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT id, id_categoria, valor, entrada, vencimento FROM gastos";


            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                Gastos gasto = new Gastos()
                {
                    Id = Convert.ToInt32(linha[0].ToString()),
                    Id_categoria = Convert.ToInt32(linha[1].ToString()),
                    //Id_Gastos = Convert.ToInt32(linha[1].ToString()),
                    Valor = Convert.ToDouble(linha[2].ToString()),
                    Entrada = Convert.ToDateTime(linha[3].ToString()),
                    Vencimento = Convert.ToDateTime(linha[4].ToString()),

                };
                gastos.Add(gasto);
            }
            return gastos;
        }

        public Gastos ObterPeloIdGastos(int id)
        {
            Gastos gastos = null;
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT id_categoria, valor, entrada, vencimento FROM gastos WHERE id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            if (tabela.Rows.Count == 1)
            {
                gastos = new Gastos();
                gastos.Id = id;
                gastos.Id_categoria = Convert.ToInt32(tabela.Rows[0][0].ToString());
                gastos.Valor = Convert.ToDouble(tabela.Rows[0][1].ToString());
                gastos.Entrada = Convert.ToDateTime(tabela.Rows[0][2].ToString());
                gastos.Vencimento = Convert.ToDateTime(tabela.Rows[0][3].ToString());

            }


            return gastos;
        }

        public bool AlterarGastos(Gastos gastos)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "UPDATE gastos SET id_categoria = @IDCATEGORIA, valor = @VALOR, entrada = @ENTRADA, vencimento = @VENCIMENTO WHERE id = @ID";
            //comando.Parameters.AddWithValue("@ID_CATEGORIA", gastos.IdGastos);
            comando.Parameters.AddWithValue("@IDCATEGORIA", gastos.Id_categoria);
            comando.Parameters.AddWithValue("@VALOR", gastos.Valor);
            comando.Parameters.AddWithValue("@ENTRADA", gastos.Entrada);
            comando.Parameters.AddWithValue("@VENCIMENTO", gastos.Vencimento);
            comando.Parameters.AddWithValue("@ID", gastos.Id); 
            return comando.ExecuteNonQuery() == 1;
        }



    }
}