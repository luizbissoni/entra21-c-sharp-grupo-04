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
                return RedirectToAction("Editar", new { id = identificador });
            }
            ViewBag.Pessoas = pessoas;
            return View("Index");
        }

        [HttpGet]
        public ActionResult Excluir(int id)
        {
            return View();
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
            return null;
        }
        public ActionResult Login()
        {
            return View();
        }
    }
}
