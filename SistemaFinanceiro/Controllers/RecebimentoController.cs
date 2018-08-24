using SistemaFinanceiro.Models;
using SistemaFinanceiro.Repositório;
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
        [HttpGet]
        public ActionResult Index()
        {
            List<Recebimento> recebimentos = new RepositorioRecebimento().ObterTodosRecebimento();
            ViewBag.Recebimentos = recebimentos;
            ViewBag.TituloPagina = "Recebimentos";
            return View();
        }

        [HttpGet]
        public ActionResult Cadastro()
        {
            ViewBag.TituloPagina = "Recebimento - Cadastro";
            ViewBag.Recebimento = new Recebimento();
            return View();
        }

        [HttpPost]
        public ActionResult Store(Recebimento recebimento)
        {

            int identificador = new RepositorioRecebimento().CadastrarRecebimento(recebimento);
            return RedirectToAction("Index", new { id = identificador });

            ViewBag.Recebimento = recebimento;
            return View("Index");
        }

        [HttpGet]
        public ActionResult Excluir(int id)
        {
            bool apagado = new RepositorioRecebimento().ExcluirRecebimento(id);
            return View();
        }

        [HttpGet]
        public ActionResult Editar(int id)
        {
            Recebimento recebimento = new RepositorioRecebimento().ObterPeloIdRecebimento(id);
            ViewBag.Recebimento = recebimento;
            return View();
        }

        [HttpPost]
        public ActionResult Update(Recebimento recebimento)
        {
            bool alterado = new RepositorioRecebimento().AlterarRecebimento(recebimento);
            return null;
            
        }


        public ActionResult Login()
        {
            return View();
        }
    }
}