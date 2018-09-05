using SistemaFinanceiro.Models;
using SistemaFinanceiro.Repositório;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaFinanceiro.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            if (Session["user"].ToString() != null)
            {
                List<Pessoas> pessoas = new RepositorioPessoas().ObterTodosPessoas();
                ViewBag.Pessoa = pessoas;
            }
          
            return RedirectToAction("Login", "Index");

        }

    }
}