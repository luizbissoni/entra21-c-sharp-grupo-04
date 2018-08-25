using Newtonsoft.Json;
using SistemaFinanceiro.Models;
using SistemaFinanceiro.Repositório;
using System;
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
               // return Content(JsonConvert.SerializeObject(new { id = identificador }));
                return RedirectToAction("Index", new { id = identificador });
            }

            ViewBag.Pessoas = pessoas;
            return View("Cadastro");
        }

        [HttpGet]
        public ActionResult Excluir(int id)
        {
            bool apagado = new SistemaFinanceiro.Repositório.RepositorioPessoas().ExcluirPessoas(id);
            return null;
        }

        [HttpGet]
        public ActionResult Editar(int id)
        {
            Pessoas pessoas = new RepositorioPessoas().ObterPeloIdPessoas(id);
            ViewBag.Pessoas = pessoas;
            return View();
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
            return Content(JsonConvert.SerializeObject(pessoas));
        }

        [HttpPost]
        public ActionResult CadastroModalPessoas(Pessoas pessoa)
        {
            int id = new RepositorioPessoas().CadastrarPessoas(pessoa);
            return Content(JsonConvert.SerializeObject(new { id = id }));
        }
       
    }
}
