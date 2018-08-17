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