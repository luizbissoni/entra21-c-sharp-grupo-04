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
        public ActionResult Index()
        {
            List<Categoria> categorias = new RepositorioCategoria().ObterTodosCategoria();
            ViewBag.Categorias = categorias;
            ViewBag.TituloPagina = "Categorias";
            return View();
        }
        public ActionResult Cadastro()
        {
            ViewBag.TituloPagina = "Categorias - Cadastro";
            ViewBag.Categoria = new Categoria();
            return View();
        }
          public ActionResult Store(Categoria categoria)
        {
            int identificador = new RepositorioCategoria().CadastrarCategoria(categoria);
            return RedirectToAction("Editar", new { id = identificador });
            return View();
        }

        public ActionResult Excluir(int id)
        {
            bool apagado = new RepositorioCategoria().ExcluirCategoria(id);
            return null;
        }

        public ActionResult Editar(int id)
        {
            Categoria categoria = new RepositorioCategoria().ObterPeloIdCategoria(id);
            ViewBag.Categoria = categoria;
            return View();
        }

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