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
    public class CategoriaController : Controller
    {
        // GET: Default
        [HttpGet]
        public ActionResult Index()
        {
            List<Categoria> categorias = new RepositorioCategoria().ObterTodosCategoria();
            ViewBag.Categorias = categorias;
            ViewBag.TituloPagina = "Categorias";
            return View();
        }
        [HttpGet]
        public ActionResult Cadastro()
        {
            ViewBag.TituloPagina = "Categorias - Cadastro";
            ViewBag.Categoria = new Categoria();
            ViewBag.Pessoas = new RepositorioPessoas().ObterTodosPessoas();
            return View();
        }
        [HttpPost]
        public ActionResult Store(Categoria categoria)
        {
            if (ModelState.IsValid)
            {
                int identificador = new RepositorioCategoria().CadastrarCategoria(categoria);
                return RedirectToAction("Index", new { id = identificador });
            }
            return View("Cadastro");
        }
        [HttpGet]
        public ActionResult Excluir(int id)
        {
            bool apagado = new SistemaFinanceiro.Repositório.RepositorioCategoria().ExcluirCategoria(id);
            
            return null;
        }
        [HttpGet]
        public ActionResult Editar(int id)
        {
            Categoria categoria = new RepositorioCategoria().ObterPeloIdCategoria(id);
            return Content(JsonConvert.SerializeObject(categoria));
        }
        [HttpPost]
        public ActionResult Update(Categoria categoria)
        {
            bool alterado = new RepositorioCategoria().AlterarCategorias(categoria);
           
            return null;
        }

        [HttpGet]
        public ActionResult ObterTodosCategoriaJson()
        {
            List<Object> categorias = new RepositorioCategoria().ObterTodosCategoriaParaSelect2();
            return Content(JsonConvert.SerializeObject(new { results = categorias }, Formatting.Indented));
        }


        [HttpPost]
        public ActionResult CadastroModalCategoria(Categoria categoria)
        {
            int id = new RepositorioCategoria().CadastrarCategoria(categoria);
            return Content(JsonConvert.SerializeObject(new { id = id }));
        }
    }
}