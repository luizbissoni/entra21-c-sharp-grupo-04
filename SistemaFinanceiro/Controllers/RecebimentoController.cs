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
            ViewBag.Pessoas = new RepositorioPessoas().ObterTodosPessoas();
            return View();
        }

        [HttpPost]
        public ActionResult Store(Recebimento recebimento)
        {
            if (ModelState.IsValid)
            {
                int identificador = new RepositorioRecebimento().CadastrarRecebimento(recebimento);
                return RedirectToAction("Index", new { id = identificador });

            }
            return View("Index");
        }

        [HttpGet]
        public ActionResult Excluir(int id)
        {
            bool apagado = new RepositorioRecebimento().ExcluirRecebimento(id);
            if (apagado)
            {
                return RedirectToAction("Index");
            }
            return View("Index");
        }

        [HttpGet]
        public ActionResult Editar(int id)
        {
            Recebimento recebimento = new RepositorioRecebimento().ObterPeloIdRecebimento(id);
            ViewBag.Recebimento = recebimento;
            ViewBag.TituloPagina = "Editar - Recebimentos";
            return View();
        }

        [HttpPost]
        public ActionResult Update(Recebimento recebimento)
        {
            bool alterado = new RepositorioRecebimento().AlterarRecebimento(recebimento);
            if (alterado == true)
            {
                //return View("Index");
                return null;
            }
            //            return View("Index");
            return null;
        }

        [HttpGet]
        public ActionResult ObterTodosJson()
        {
            List<Recebimento> recebimento = new RepositorioRecebimento().ObterTodosRecebimento();
            return Content(JsonConvert.SerializeObject(new { data = recebimento }));

        }

        [HttpPost]
        public ActionResult CadastroModalRecebimento(Recebimento recebimento, Categoria categoria, Pessoas pessoa)
        {

            int id = new RepositorioRecebimento().CadastrarRecebimento(recebimento);
            Categoria novaCategoria = new Categoria()
            {
                IdRecebimento = id,
                Nome = categoria.Nome.ToString()
            };


            return Content(JsonConvert.SerializeObject(new { id = id }));
        }

        //[HttpPost]
        //public ActionResult CadastroModalPessoas(Pessoas pessoa, Cartoes cartao)
        //{
        //    int id = new RepositorioPessoas().CadastrarPessoas(pessoa);

        //    Cartoes novoCartao = new Cartoes()
        //    {
        //        Conta = cartao.Conta.ToString(),
        //        Numero = cartao.Numero.ToString(),
        //        Banco = cartao.Banco.ToString(),
        //        Bandeira = cartao.Bandeira.ToString(),
        //        IdPessoas = id
        //    };

        //    int deuCerto = new RepositorioCartoes().CadastrarCartao(novoCartao);
        //    return Content(JsonConvert.SerializeObject(new { id = id }));
        //}
    }
}