using Newtonsoft.Json;
using PusherServer;
using SistemaFinanceiro.Models;
using SistemaFinanceiro.Repositório;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SistemaFinanceiro.Controllers
{
    public class PessoasController : Controller
    {
        // GET: Pessoas
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Cadastro()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Store(Pessoas pessoas)
        {
            if (ModelState.IsValid)
            {
                int identificador = new RepositorioPessoas().CadastrarPessoas(pessoas);

                return RedirectToAction("Index", new { id = identificador });
            }

            ViewBag.Pessoas = pessoas;
            return View("Cadastro");
        }

        [HttpGet]
        public ActionResult Excluir(int id)
        {
            bool apagado = new RepositorioPessoas().ExcluirPessoas(id);
            return null;
        }

        [HttpGet]
        public ActionResult Editar(int id)
        {
            Pessoas pessoa = new RepositorioPessoas().ObterPeloIdPessoas(id);

            return Content(JsonConvert.SerializeObject(pessoa));
        }

        [HttpPost]
        public ActionResult Update(Pessoas pessoa)
        {
            bool alterado = new RepositorioPessoas().AlterarPessoas(pessoa);

            if (alterado)
            {
                return RedirectToAction("Index");
            }

            return null;
        }

        [HttpGet]
        public ActionResult ObterTodosJson()
        {
            List<Pessoas> pessoas = new RepositorioPessoas().ObterTodosPessoas();
            return Content(JsonConvert.SerializeObject(new { data = pessoas }));
        }

        [HttpPost]
        public ActionResult CadastroCartaoModalPessoas(Cartoes cartao)
        {
            int id = Convert.ToInt32(Session["user"].ToString());

            Cartoes addcartoes = new Cartoes()
            {
                IdPessoas = id,
                Banco = cartao.Banco,
                Bandeira = cartao.Bandeira,
                Conta = cartao.Conta,
                Numero = cartao.Numero
            };

            int deuCerto = new RepositorioCartoes().CadastrarCartao(addcartoes);

            return Content(JsonConvert.SerializeObject(new { addcartoes }));
        }

        [HttpGet]
        public ActionResult GetPessoaCartao(int id)
        {
            Cartoes cartao = new RepositorioPessoas().GetIdpessoasCartao(id);

            return Content(JsonConvert.SerializeObject(cartao));
        }

        [HttpPost]
        public ActionResult CadastroRecebimento(Recebimento recebimento)
        {
            int id = Convert.ToInt32(Session["user"].ToString());

            int deuCerto = new RepositorioRecebimento().CadastrarRecebimento(recebimento);

            return Content(JsonConvert.SerializeObject(new { recebimento }));
        }

        [HttpPost]
        public async Task<ActionResult> CadastroGastosModalPessoas(Gastos gasto)
        {
            int id = Convert.ToInt32(Session["user"].ToString());

            int deuCerto = new RepositorioGastos().CadastrarGastos(gasto);


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

            return Content(JsonConvert.SerializeObject(new { gasto}));

        }

    }
}
