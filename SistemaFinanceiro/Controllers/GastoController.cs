using SistemaFinanceiro.Models;
using SistemaFinanceiro.Repositório;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaFinanceiro.Controllers
{
    public class GastoController : Controller
    {
        // GET: Gasto
        public ActionResult Index()
        {
            List<Gastos> gastos = new Gastos().ObterTodosGastos();
            ViewBag.Gastos = gastos;
            ViewBag.TituloPagina = "Gastos";
            return View();
        }
        public ActionResult Cadastro()
        {
            ViewBag.TituloPagina = "Gastos - Cadastro";
            ViewBag.Gastos = new Gastos();
            return View();
        }
          public ActionResult Store(Gastos gastos)
        {
            int identificador = new RepositorioGastos().CadastrarGastos(gastos);
            return RedirectToAction("Editar", new { id = identificador });
            return View();
        }

        public ActionResult Excluir(int id)
        {
            bool apagado = new RepositorioGastos().ExcluirGastos(id);
            return null;
           
        }

        public ActionResult Editar(int id)
        {
            Gastos gastos = new RepositorioGastos().ObterPeloIdGastos(id);
            ViewBag.Gastos = gastos;
            return View();
        }

        public ActionResult Update(Gastos gastos)
        {
            bool alterado = new RepositorioGastos().AlterarGastos(gastos);
            return null;
        }
        public ActionResult Login()
        {
            return View();
        }
    }
}