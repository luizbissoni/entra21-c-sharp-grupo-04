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
    public class LoginController : Controller
    {
        // GET: Login

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Cadastro()
        {
            ViewBag.TituloPagina = "Login - Cadastro";
            ViewBag.Login = new Login();
            return View();
        }

        [HttpPost]
        public ActionResult Store(Login login)
        {
            if (ModelState.IsValid)
            {
                int identificador = new RepositorioLogin().CadastrarLogin(login);

                return RedirectToAction("Index", new { id = identificador });
            }
            ViewBag.Login = login;

            return View("Cadastro");
        }

        [HttpGet]
        public ActionResult Excluir(int id)
        {
            bool apagado = new RepositorioLogin().ExcluirLogin(id);
            return null;
        }

        [HttpGet]
        public ActionResult Editar(int id)
        {
            Login login = new RepositorioLogin().ObterPeloIdLogin(id);
            ViewBag.Login = login;
            return View();
        }

        [HttpPost]
        public ActionResult Update(Login login)
        {
            bool alterado = new RepositorioLogin().AlterarLogin(login);
            return null;
        }

        [HttpPost]
        public ActionResult GetLoginJson(string usuario, string senha)
        {

            List<Login> login = new RepositorioLogin().ObterTodosLogin();
            //Login login = new RepositorioLogin().ObterTodosLogin();

            foreach (Login logins in login)
            {
                if (logins.Usuario == usuario && logins.Senha == senha)
                {
                    return Content(JsonConvert.SerializeObject(new { user = usuario, pass = senha, data = logins}));
                }
            }

            return View();
        }



    }
}
