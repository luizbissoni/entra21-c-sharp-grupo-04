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

        [HttpPost]
        public ActionResult GetLoginJson(string usuario, string senha)
        {
            try
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
            }
            catch (Exception)
            {
                return Content(JsonConvert.SerializeObject(new { data = false }));
            }
            return null;
        }

        [HttpGet]
        public ActionResult GetIdPessoas(int id)
        {
            Pessoas pessoa = new RepositorioPessoas().ObterPeloIdPessoas(id);

            return Content(JsonConvert.SerializeObject(pessoa));
        }

        [HttpGet]
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
