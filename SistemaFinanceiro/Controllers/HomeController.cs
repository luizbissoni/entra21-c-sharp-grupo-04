using Newtonsoft.Json;
using PusherServer;
using SistemaFinanceiro.DataBase;
using SistemaFinanceiro.Models;
using SistemaFinanceiro.Repositório;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
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

        [HttpGet]
        public ActionResult RecebimentoPessoaJsonGrafico()
        {
            int id = Convert.ToInt32(Session["user"].ToString());

            List<Object> data = new RepositorioRecebimento().RecebimentoPessoaJsonFormat(id);

            return Content(JsonConvert.SerializeObject(new { data }, Formatting.Indented));
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

        public ActionResult TotalGastoERecebido()
        {
            int id = Convert.ToInt32(Session["user"].ToString());

            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"SELECT SUM(gastos.valor) AS 'totalGasto', pessoas.Id, cartoes.id_pessoas FROM gastos inner join pessoas 
on pessoas.Id = @ID inner join cartoes on cartoes.id_pessoas = pessoas.Id group by pessoas.id, cartoes.id_pessoas";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabelaGasto = new DataTable();
            tabelaGasto.Load(comando.ExecuteReader());

            comando.CommandText = @"SELECT SUM(recebimentos.valor) AS 'totalRecebido', pessoas.nome FROM recebimentos 
INNER JOIN pessoas ON recebimentos.id_pessoas = pessoas.Id WHERE pessoas.Id = @ID GROUP BY pessoas.nome";
            DataTable tabelaRecebido = new DataTable();
            tabelaRecebido.Load(comando.ExecuteReader());

            double valorRecebido = 0, valorGasto = 0, porcentagemGasto = 0, porcentagemCarteira = 0;
            if (tabelaRecebido.Rows.Count == 1)
            {
                valorRecebido = Convert.ToDouble(tabelaRecebido.Rows[0]["totalRecebido"].ToString());
                valorGasto = Convert.ToDouble(tabelaGasto.Rows[0]["totalGasto"].ToString());
            }
            if(tabelaGasto.Rows.Count == 1) { 
                 porcentagemGasto = ((valorRecebido - valorGasto) / valorRecebido) * 100;
                 porcentagemCarteira = ((valorRecebido - valorGasto) / valorRecebido) * 100;
            }
          

            return Content(JsonConvert.SerializeObject(new
            {
                gastos = new
                {
                    valor = valorGasto,
                    percentual = porcentagemGasto
                },
                recebidos = new
                {
                    valor = valorRecebido,
                    percentual = porcentagemCarteira
                }
            }));

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
            //fazer um vetor para pesquisa por coluna

            string start = Request.QueryString["start"];
            string length = Request.QueryString["length"];
            string draw = Request.QueryString["draw"];
            string search = '%' + Request.QueryString["search[value]"] + '%';
            string orderColumn = Request.QueryString["order[0][column]"];
            string orderDir = Request.QueryString["order[0][dir]"];
            orderColumn = orderColumn == "1" ? "car.conta" : "cat.nome";

            int id = Convert.ToInt32(Session["user"].ToString());

            RepositorioGastos repositorio = new RepositorioGastos();
            List<Gastos> gastos = repositorio.ObterTodosParaJson(start, length, search, orderColumn, orderDir, id);

            int countGastos = repositorio.ContabilizarGastos();
            int countFilter = repositorio.ContabilizarGastosFiltrados(search);

            return Content(JsonConvert.SerializeObject(new
            {
                data = gastos,
                draw = draw,
                recordsTotal = countGastos,
                recordsFiltered = countFilter
            }));

        }

        [HttpGet]
        public ActionResult ExcluirGastos(int id)
        {
            bool apagado = new RepositorioGastos().ExcluirGastos(id);

            return Content(JsonConvert.SerializeObject(new { apagado }));
        }

        [HttpGet]
        public ActionResult EditarGastos(int id)
        {
            Gastos gastos = new RepositorioGastos().ObterPeloIdGastos(id);

            return Content(JsonConvert.SerializeObject(new { gastos }));
        }

        [HttpPost]
        public ActionResult UpdateGastos(Gastos gastos)
        {
            bool alterado = new RepositorioGastos().AlterarGastos(gastos);
            return Content(JsonConvert.SerializeObject(new { alterado }));
        }

        public async Task<ActionResult> PreencherFullCalendar()
        {
            int id = Convert.ToInt32(Session["user"].ToString());

            List<Object> gastos = new RepositorioGastos().FullCalendarGastos(id);

            var options = new PusherOptions
            {
                Cluster = "us2",
                Encrypted = true
            };

            var pusher = new Pusher(
              "604342",
              "3d2e47e4a257a668b2cc",
              "65922eb9b246a4faa9a5",
              options);

            var result = await pusher.TriggerAsync(
              "my-channel",
              "my-event",
              new { message = "hello world" });

            return Content(JsonConvert.SerializeObject(new { events = gastos }, Formatting.Indented));
        }
    }
}