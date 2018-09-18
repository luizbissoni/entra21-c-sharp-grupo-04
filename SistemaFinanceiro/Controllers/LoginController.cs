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
            return View();
        }

        [HttpPost]
        public ActionResult Store(Login login, Pessoas novaPessoa)
        {
            int iddentificadorPessoa = new RepositorioPessoas().CadastrarPessoas(novaPessoa);

            Login novoLogin = new Login()
            {
                IdPessoas = iddentificadorPessoa,
                Email = login.Email,
                Senha = login.Senha,
                Usuario = login.Usuario
            };

            Session["user"] = iddentificadorPessoa;

            return View();
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
            var senhaCryp = Encrypt.SHA512(senha);

            List<Login> login = new RepositorioLogin().ObterTodosLogin();

            foreach (Login logins in login)
            {
                if (logins.Usuario == usuario && logins.Senha == senhaCryp)
                {
                    Session["user"] = logins.IdPessoas;

                   return Content(JsonConvert.SerializeObject(new { user = usuario, pass = senha, data = logins }));
                }
            }

            return View();
        }

        [HttpGet]
        public ActionResult GetIdPessoas(int id)
        {
            Pessoas pessoa = new RepositorioPessoas().ObterPeloIdPessoas(id);

            return Content(JsonConvert.SerializeObject(pessoa));
        }

        public ActionResult GetIdSession()
        {
            var idPessoa = Convert.ToInt32(Session["user"].ToString());

            Pessoas pessoa = new RepositorioPessoas().ObterPeloIdPessoas(idPessoa);

            return Content(JsonConvert.SerializeObject(pessoa));
        }

        [HttpPost]
        public ActionResult CreateNewUsers(Pessoas pessoas, Login logins)
        {
          
            int identificador = new RepositorioPessoas().CadastrarPessoas(pessoas);

            Login novoLogin = new Login()
            {
                IdPessoas = identificador,
                Email = logins.Email,
                Senha = Encrypt.SHA512(logins.Senha),
                Usuario = logins.Usuario
            };
            int deucerto = new RepositorioLogin().CadastrarLogin(novoLogin);

            return Content(JsonConvert.SerializeObject(novoLogin));
        }
    }
}
