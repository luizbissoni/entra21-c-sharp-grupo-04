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

        public ActionResult Cadastro()
        {
            ViewBag.TituloPagina = "Cartões - Cadastro";
            ViewBag.Cartao = new Cartoes();
            return View();
        }

        public ActionResult Store()
        {
            return View();
        }

        public ActionResult Excluir()
        {
            return View();
        }

        public ActionResult Editar()
        {
            return View();
        }

        public ActionResult Update()
        {
            return View();
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