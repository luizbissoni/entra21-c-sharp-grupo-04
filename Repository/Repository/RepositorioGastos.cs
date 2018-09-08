﻿using SistemaFinanceiro.DataBase;
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
            comando.CommandText = @"INSERT INTO gastos (id_cartao, id_categoria, valor, entrada) OUTPUT INSERTED.ID VALUES 
                    (@IDCARTAO, @IDCATEGORIA, @VALOR, GETDATE())";
            comando.Parameters.AddWithValue("@IDCARTAO", gastos.IdCartao);
            comando.Parameters.AddWithValue("@IDCATEGORIA", gastos.IdCategoria);
            comando.Parameters.AddWithValue("@VALOR", gastos.Valor);
            //comando.Parameters.AddWithValue("@ENTRADA", gastos.Entrada);

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
            comando.CommandText = "SELECT id, id_cartao, id_categoria, valor, entrada FROM gastos";


            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                Gastos gasto = new Gastos()
                {
                    Id = Convert.ToInt32(linha["id"].ToString()),
                    IdCartao = Convert.ToInt32(linha["id_cartao"].ToString()),
                    IdCategoria = Convert.ToInt32(linha["id_categoria"].ToString()),
                    Valor = Convert.ToDouble(linha["valor"].ToString()),
                    Entrada = Convert.ToDateTime(linha["entrada"].ToString()),

                };
                gastos.Add(gasto);
            }
            return gastos;
        }

        public Gastos ObterPeloIdGastos(int id)
        {
            Gastos gastos = null;
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT id_categoria, valor, entrada FROM gastos WHERE id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            if (tabela.Rows.Count == 1)
            {
                gastos = new Gastos();
                gastos.Id = id;
                gastos.IdCategoria = Convert.ToInt32(tabela.Rows[0]["id_categoria"].ToString());
                gastos.IdCartao = Convert.ToInt32(tabela.Rows[0]["id_cartao"].ToString());
                gastos.Valor = Convert.ToDouble(tabela.Rows[0]["valor"].ToString());
                gastos.Entrada = Convert.ToDateTime(tabela.Rows[0]["entrada"].ToString());

            }


            return gastos;
        }

        public bool AlterarGastos(Gastos gastos)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "UPDATE gastos SET id_cartao = @IDCARTAO, id_categoria = @IDCATEGORIA, valor = @VALOR, entrada = @ENTRADA WHERE id = @ID";
            //comando.Parameters.AddWithValue("@ID_CATEGORIA", gastos.IdGastos);
            comando.Parameters.AddWithValue("@IDCATEGORIA", gastos.IdCategoria);
            comando.Parameters.AddWithValue("@IDCARTAO", gastos.IdCartao);
            comando.Parameters.AddWithValue("@VALOR", gastos.Valor);
            comando.Parameters.AddWithValue("@ENTRADA", gastos.Entrada);
            comando.Parameters.AddWithValue("@ID", gastos.Id); 
            return comando.ExecuteNonQuery() == 1;
        }



    }
}