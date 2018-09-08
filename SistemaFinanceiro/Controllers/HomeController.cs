﻿using Newtonsoft.Json;
using SistemaFinanceiro.DataBase;
using SistemaFinanceiro.Models;
using SistemaFinanceiro.Repositório;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaFinanceiro.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            try
            {
                if (Session["user"].ToString() != null)
                {
                    List<Pessoas> pessoas = new RepositorioPessoas().ObterTodosPessoas();
                    ViewBag.Pessoa = pessoas;
                }
            }
            catch (Exception)
            {
                return RedirectToAction("Index", "Login");
            }

            return View();

        }

        public ActionResult RecebimentoPessoa()
        {
            int id = Convert.ToInt32(Session["user"].ToString());

            //Recebimento recebimento = null;
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"SET LANGUAGE português SELECT SUM(recebimentos.valor) AS 'VALOR', DATENAME(MONTH, recebimentos.data) 
AS 'MES', MONTH(recebimentos.data) FROM recebimentos INNER JOIN pessoas ON pessoas.Id = recebimentos.id_pessoas WHERE pessoas.Id = @ID GROUP BY DATENAME(MONTH, recebimentos.data),
MONTH(recebimentos.data) ORDER BY MONTH(recebimentos.data)";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());

            return Content(JsonConvert.SerializeObject(new { tabela }));

        }

        public ActionResult GastosCategoria()
        {

            int id = Convert.ToInt32(Session["user"].ToString());

            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"SELECT categorias.nome AS 'categoria', SUM(gastos.valor) AS 'valor', cartoes.id_pessoas FROM categorias INNER JOIN gastos 
ON gastos.id_categoria = categorias.Id INNER JOIN cartoes ON cartoes.Id = gastos.id_cartao 
WHERE MONTH(gastos.entrada) = MONTH(GETDATE()) AND cartoes.id_pessoas = @ID GROUP BY categorias.nome, cartoes.id_pessoas";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());

            return Content(JsonConvert.SerializeObject(new { tabela }));
        }

    }
}