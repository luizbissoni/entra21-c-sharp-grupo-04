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
            return View("Cadastro");
        }
        [HttpGet]
        public ActionResult Excluir(int id)
        {
            bool apagado = new RepositorioCartoes().ExcluirCartoes(id);
            ViewBag.TituloPagina = "Cartões - Apagar";
            return null;
        }
        [HttpGet]
        public ActionResult Editar(int id)
        {
            Cartoes cartao = new RepositorioCartoes().ObterPeloIdCartoes(id);
           ViewBag.Cartao = cartao;
           ViewBag.TituloPagina = "Cartões - Editar";
           return View();

        }
        [HttpPost]
        public ActionResult Update(Cartoes cartao)
        {
            bool alterado = new RepositorioCartoes().AlterarCartoes(cartao);
            return null;
        }
        public ActionResult Login()
        {
            return View();
        }

        public ActionResult ValidarLogin(Login user)
        {

            return View();
        }
        public ActionResult CreatLogin()
        {
            return View();
        }
    }
}