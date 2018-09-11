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

        public ActionResult TotalRecebidoCategoria()
        {

            int id = Convert.ToInt32(Session["user"].ToString());

            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"select sum(recebimentos.valor) AS 'valor', categorias.nome AS 'categoria', pessoas.nome  from recebimentos INNER JOIN categorias ON categorias.Id = recebimentos.id_categoria 
INNER JOIN pessoas ON recebimentos.id_pessoas = pessoas.Id WHERE pessoas.Id = @ID GROUP BY  categorias.nome, pessoas.nome";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());

            return Content(JsonConvert.SerializeObject(new { tabela }));
        }

        public ActionResult TotalRecebido()
        {
            int id = Convert.ToInt32(Session["user"].ToString());

            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"SELECT SUM(recebimentos.valor) AS 'total', pessoas.nome FROM recebimentos 
INNER JOIN pessoas ON recebimentos.id_pessoas = pessoas.Id WHERE pessoas.Id = @ID GROUP BY pessoas.nome ";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());

            return Content(JsonConvert.SerializeObject(new { tabela }));
        }

        public ActionResult TotalGastos()
        {
            int id = Convert.ToInt32(Session["user"].ToString());

            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"SELECT SUM(gastos.valor) AS 'total', pessoas.Id, cartoes.id_pessoas FROM gastos inner join pessoas 
on pessoas.Id = @ID inner join cartoes on cartoes.id_pessoas = pessoas.Id group by pessoas.id, cartoes.id_pessoas";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());

            return Content(JsonConvert.SerializeObject(new { tabela }));
        }

        public ActionResult SetorMaiorGasto()
        {
            int id = Convert.ToInt32(Session["user"].ToString());

            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"select  max(gastos.valor) as 'total', categorias.nome as 'categoria', cartoes.id_pessoas from gastos inner join categorias 
on categorias.Id = gastos.id_categoria inner join cartoes on cartoes.id_pessoas = @ID group by categorias.nome, cartoes.id_pessoas";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());

            return Content(JsonConvert.SerializeObject(new { tabela }));

        }

        public ActionResult TabelaGastos()
        {
            int id = Convert.ToInt32(Session["user"].ToString());

            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"SELECT gastos.Id,pessoas.nome, cartoes.conta AS 'conta',categorias.nome AS 'categoria', valor, entrada, descricao FROM gastos INNER JOIN categorias ON categorias.Id = gastos.id_categoria 
INNER JOIN cartoes ON cartoes.Id = gastos.id_cartao INNER JOIN pessoas ON pessoas.Id = cartoes.id_pessoas WHERE pessoas.Id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());

            return Content(JsonConvert.SerializeObject(new { tabela }));

        }

        [HttpGet]
        public ActionResult ExcluirGastos(int id)
        {
            bool apagado = new RepositorioGastos().ExcluirGastos(id);

            return Content(JsonConvert.SerializeObject(new { apagado }));
        }

    }
}