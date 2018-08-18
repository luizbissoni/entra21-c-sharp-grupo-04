using SistemaFinanceiro.Models;
using SistemaFinanceiro.Repositório;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaFinanceiro.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            List<Login> logins = new RepositorioLogin().ObterTodosLogin();
            ViewBag.Logins = logins;
            ViewBag.TituloPagina = "Login";
            return View();
        }
        public ActionResult Cadastro()
        {
            ViewBag.TituloPagina = "Login - Cadastro";
            ViewBag.Login = new Login();
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
    }
}
