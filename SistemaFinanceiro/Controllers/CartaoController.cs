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
    public class CartaoController : Controller
    {

        // GET: Financeiro
        [HttpGet]
        public ActionResult Index()
        {
            List<Cartoes> cartoes = new RepositorioCartoes().ObterTodosCartoes();
            ViewBag.Cartoes = cartoes;
            ViewBag.TituloPagina = "Cartões";
            return View();

        }

        [HttpGet]
        public ActionResult Cadastro()
        {
            ViewBag.TituloPagina = "Cartões - Cadastro";
            ViewBag.Cartao = new Cartoes();
            ViewBag.Pessoas = new RepositorioPessoas().ObterTodosPessoas();
            return View();
        }

        [HttpPost]
        public ActionResult Store(Cartoes cartao)
        {
            if (ModelState.IsValid)
            {
                int identificador = new RepositorioCartoes().CadastrarCartao(cartao);
                return RedirectToAction("Editar", new { id = identificador });
            }

            ViewBag.cartao = cartao;
            return View("Index");
        }
        [HttpGet]
        public ActionResult Excluir(int id)
        {
            bool apagado = new RepositorioCartoes().ExcluirCartoes(id);
            if (apagado)
            {
                return RedirectToAction("Index");
            }
            return View("Index");
        }
        [HttpGet]
        public ActionResult Editar(int id)
        {
            Cartoes cartao = new RepositorioCartoes().ObterPeloIdCartoes(id);
            ViewBag.Cartao = cartao;
            return View();
        }
        [HttpPost]
        public ActionResult Update(Cartoes cartao)
        {
            bool alterado = new RepositorioCartoes().AlterarCartoes(cartao);
            if (alterado)
            {
                return RedirectToAction("Index");
            }
            return null;
        }
        [HttpGet]
        public ActionResult ObterTodosJson()
        {
            List<Cartoes> cartoes = new RepositorioCartoes().ObterTodosCartoes();
            return Content(JsonConvert.SerializeObject(new { data = cartoes }));
        }
        [HttpPost]
        public ActionResult CadastroModalCartoes(Cartoes cartao)
        {
            int id = new RepositorioCartoes().CadastrarCartao(cartao);
            return Content(JsonConvert.SerializeObject(new { id = id }));
        }
    }
}