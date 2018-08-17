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
            return View();
        }
        [HttpPost]
          public ActionResult Store(Categoria categoria)
        {
            int identificador = new RepositorioCategoria().CadastrarCategoria(categoria);
            return RedirectToAction("Editar", new { id = identificador });
            return View();
        }
        [HttpGet]
        public ActionResult Excluir(int id)
        {
            bool apagado = new RepositorioCategoria().ExcluirCategoria(id);
            return null;
        }
        [HttpGet]
        public ActionResult Editar(int id)
        {
            Categoria categoria = new RepositorioCategoria().ObterPeloIdCategoria(id);
            ViewBag.Categoria = categoria;
            return View();
        }
        [HttpPost]
        public ActionResult Update(Categoria categoria)
        {
            bool alterado = new RepositorioCategoria().AlterarCategorias(categoria);
            return null;
        }
        public ActionResult Login()
        {
            return View();
        }
    }
}