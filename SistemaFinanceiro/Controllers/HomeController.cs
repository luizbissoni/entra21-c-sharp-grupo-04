using Newtonsoft.Json;
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
            if (Session["user"].ToString() != null)
            {
                List<Pessoas> pessoas = new RepositorioPessoas().ObterTodosPessoas();
                ViewBag.Pessoa = pessoas;

                return View();
            }
          
            return RedirectToAction("Login", "Index");

        }

        public ActionResult RecebimentoPessoa()
        {
            int id = Convert.ToInt32(Session["user"].ToString());

            //Recebimento recebimento = null;
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"SET LANGUAGE português SELECT pessoas.nome, recebimentos.valor, DATENAME(MONTH, recebimentos.data)  FROM recebimentos INNER JOIN pessoas ON pessoas.Id = recebimentos.id_pessoas WHERE pessoas.Id = @ID AND MONTH(recebimentos.data)
                BETWEEN '01' AND '12' AND YEAR(recebimentos.data) BETWEEN '2018' AND '2018' ORDER BY DAY(recebimentos.data)";

            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());

            return Content(JsonConvert.SerializeObject(new {tabela}));
            //if (tabela.Rows.Count == 1)
            //{
            //    recebimento = new Recebimento();
            //    recebimento.Id = id;
            //    recebimento.Valor = Convert.ToDouble(tabela.Rows[0][0].ToString());
            //    recebimento.Data = Convert.ToDateTime(tabela.Rows[0][1].ToString());

            //}

          // return null;
        }

    }
}