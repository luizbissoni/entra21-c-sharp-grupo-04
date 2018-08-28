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
    public class GastoController : Controller
    {
        // GET: Gasto
        [HttpGet]
        public ActionResult Index()
        {
            List<Gastos> gastos = new RepositorioGastos().ObterTodosGastos();
            ViewBag.Gastos = gastos;
            ViewBag.TituloPagina = "Gastos";
            return View();
        }
        [HttpGet]
        public ActionResult Cadastro()
        {
            ViewBag.TituloPagina = "Gastos - Cadastro";
            ViewBag.Gastos = new Gastos();
            ViewBag.Pessoas = new RepositorioPessoas().ObterTodosPessoas();
            ViewBag.Categorias = new RepositorioCategoria().ObterTodosCategoria();
            ViewBag.Categorias = new Categoria();
            
            return View();
        }

        [HttpPost]
          public ActionResult Store(Gastos gastos)
        {
            if (ModelState.IsValid)
            {
            int identificador = new RepositorioGastos().CadastrarGastos(gastos);

            return RedirectToAction("Editar", new { id = identificador });
            }
            return View("Cadastro");
        }

        [HttpGet]
        public ActionResult Excluir(int id)
        {
            bool apagado = new RepositorioGastos().ExcluirGastos(id);
            if (apagado)
            {
               return RedirectToAction("Index");
            }
            return View("Index");
        }

        [HttpGet]
        public ActionResult Editar(int id)
        {
            Gastos gastos = new RepositorioGastos().ObterPeloIdGastos(id);
            ViewBag.Gastos = gastos;
            return View();
        }

        [HttpPost]
        public ActionResult Update(Gastos gastos)
        {
            bool alterado = new RepositorioGastos().AlterarGastos(gastos);
            return null;
        }

        [HttpGet]
        public ActionResult ObterTodosJson()
        {
            List<Gastos> gastos = new RepositorioGastos().ObterTodosGastos();
            return Content(JsonConvert.SerializeObject(new { data = gastos }));
        }

        [HttpPost]
        public ActionResult CadastroModalGastos(Gastos gastos)
        {
            int id = new RepositorioGastos().CadastrarGastos(gastos);
            return Content(JsonConvert.SerializeObject(new { id = id }));
        }
    
    }
}