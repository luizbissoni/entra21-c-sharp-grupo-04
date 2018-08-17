using SistemaFinanceiro.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaFinanceiro.Controllers
{
    public class RecebimentoController : Controller
    {
        // GET: Recebimento
        public ActionResult Index()
        {
            List<Recebimento> recebimentos = new Recebimento().ObterTodosRecebimentos();
            ViewBag.Recebimentos = recebimentos;
            ViewBag.TituloPagina = "Recebimentos";
            return View();
        }
        public ActionResult Cadastro()
        {
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
    }
}