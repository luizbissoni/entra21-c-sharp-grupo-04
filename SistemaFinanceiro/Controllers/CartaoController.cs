using SistemaFinanceiro.Models;
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
            List<Cartoes> cartoes = new Cartoes().ObterTodosCartoes();
            ViewBag.Cartoes = cartoes;
            ViewBag.TituloPagina = "Cartões";
            return View();

            List<Categoria> categorias = new Categoria().ObterTodosCategoria();
            ViewBag.Categorias = categorias;
            ViewBag.TituloPagina = "Categorias";
            return View();

            List<Gastos> gastos = new Gastos().ObterTodosGastos();
            ViewBag.Gastos = gastos;
            ViewBag.TituloPagina = "Gastos";
            return View();

            List<Login> logins = new Login().ObterTodosLogins();
            ViewBag.Logins = logins;
            ViewBag.TituloPagina = "Login";
            return View();

            List<Pessoas> pessoas = new Pessoas().ObterTodosPessoas();
            ViewBag.Pessoas = pessoas;
            ViewBag.TituloPagina = "Pessoas";
            return View();

            List<Recebimento> recebimentos = new Recebimento().ObterTodosRecebimentos();
            ViewBag.Recebimentos = recebimentos;
            ViewBag.TituloPagina = "Recebimentos";
            return View();
        }

        public ActionResult Cadastro()
        {
            ViewBag.TituloPagina = "Cartões - Cadastro";
            ViewBag.Cartao = new Cartoes();
            return View();

            ViewBag.TituloPagina = "Categorias - Cadastro";
            ViewBag.Categoria = new Categoria();
            return View();

            ViewBag.TituloPagina = "Gastos - Cadastro";
            ViewBag.Gastos = new Gastos();
            return View();

            ViewBag.TituloPagina = "Login - Cadastro";
            ViewBag.Login = new Login();
            return View();

            ViewBag.TituloPagina = "Pessoas - Cadastro";
            ViewBag.Pessoas = new Pessoas();
            return View();

            ViewBag.TituloPagina = "Recebimento - Cadastro";
            ViewBag.Recebimento = new Recebimento();
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