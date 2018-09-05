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
                return RedirectToAction("Login", "Index");
            }

            return View();

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

            return Content(JsonConvert.SerializeObject(new { tabela }));

        }

    }
}