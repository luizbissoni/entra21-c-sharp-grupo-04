using Newtonsoft.Json;
using SistemaFinanceiro.Models;
using SistemaFinanceiro.Repositório;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
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
            List<Pessoas> pessoas = new RepositorioPessoas().ObterTodosPessoas();
            ViewBag.Pessoas = pessoas;
            ViewBag.TituloPagina = "Pessoas";
            return View();
        }

        [HttpGet]
        public ActionResult Cadastro()
        {
            ViewBag.TituloPagina = "Pessoas - Cadastro";
            ViewBag.Pessoas = new Pessoas();
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
                return  RedirectToAction("Index");
            }

            return null;
        }

        [HttpGet]
        public ActionResult ObterTodosJson()
        {
            List<Pessoas> pessoas = new RepositorioPessoas().ObterTodosPessoas();


            return Content(JsonConvert.SerializeObject(new {data = pessoas}));
        }

        [HttpPost]
        public ActionResult CadastroModalPessoas(Pessoas pessoa, Cartoes cartao)
        {
            int id = new RepositorioPessoas().CadastrarPessoas(pessoa);

            Cartoes novoCartao = new Cartoes()
            {
                Conta = cartao.Conta.ToString(),
                Numero = cartao.Numero.ToString(),
                Banco = cartao.Banco.ToString(),
                Bandeira = cartao.Bandeira.ToString(),
                IdPessoas = id
            };

            int deuCerto = new RepositorioCartoes().CadastrarCartao(novoCartao);
            return Content(JsonConvert.SerializeObject(new { id = id }));
        }

        [HttpGet]
        public ActionResult GetPessoaCartao(int id)
        {
            Cartoes cartao = new RepositorioPessoas().GetIdpessoasCartao(id);

            return Content(JsonConvert.SerializeObject(cartao));
        }

        [HttpPost]
        public ActionResult CadastroRecebimento(Recebimento recebimento, Categoria categoria)
        {
           
            Recebimento addRecebimento = new Recebimento()
            {
                //IdPessoas = id,
                //Data = ,
                //Valor = 
            };

            return null;
        }
       
    }
}
