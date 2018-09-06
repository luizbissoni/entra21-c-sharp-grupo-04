﻿using Newtonsoft.Json;
using SistemaFinanceiro.Models;
using SistemaFinanceiro.Repositório;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaFinanceiro.Controllers
{
    public class PessoasController : Controller
    {
        // GET: Pessoas
        [HttpGet]
        public ActionResult Index()
        {
            List<Pessoas> pessoas = new RepositorioPessoas().ObterTodosPessoas();
            ViewBag.Pessoas = pessoas;
            ViewBag.TituloPagina = "Pessoas";
            return View();
        }

        [HttpGet]
        public ActionResult Cadastro()
        {
            ViewBag.TituloPagina = "Pessoas - Cadastro";
            ViewBag.Pessoas = new Pessoas();
            return View();
        }

        [HttpPost]
        public ActionResult Store(Pessoas pessoas)
        {
            if (ModelState.IsValid)
            {
                int identificador = new RepositorioPessoas().CadastrarPessoas(pessoas);

                return RedirectToAction("Index", new { id = identificador });
            }

            ViewBag.Pessoas = pessoas;
            return View("Cadastro");
        }

        [HttpGet]
        public ActionResult Excluir(int id)
        {
            bool apagado = new RepositorioPessoas().ExcluirPessoas(id);
            return null;
        }

        [HttpGet]
        public ActionResult Editar(int id)
        {
            Pessoas pessoa = new RepositorioPessoas().ObterPeloIdPessoas(id);

            return Content(JsonConvert.SerializeObject(pessoa));
        }

        [HttpPost]
        public ActionResult Update(Pessoas pessoa)
        {
            bool alterado = new RepositorioPessoas().AlterarPessoas(pessoa);

            if (alterado)
            {
                return RedirectToAction("Index");
            }

            return null;
        }

        [HttpGet]
        public ActionResult ObterTodosJson()
        {
            List<Pessoas> pessoas = new RepositorioPessoas().ObterTodosPessoas();
            return Content(JsonConvert.SerializeObject(new { data = pessoas }));
        }

        [HttpPost]
        public ActionResult CadastroCartaoModalPessoas(Cartoes cartao)
        {
            int id = Convert.ToInt32(Session["user"].ToString());
            Cartoes cartoes = new Cartoes()
            {
                IdPessoas = id,
                Banco = cartao.Banco,
                Bandeira = cartao.Bandeira,
                Conta = cartao.Conta,
                Numero = cartao.Numero
            };

            int deuCerto = new RepositorioCartoes().CadastrarCartao(cartoes);

            return Content(JsonConvert.SerializeObject(new { data = deuCerto }));
        }

        [HttpGet]
        public ActionResult GetPessoaCartao(int id)
        {
            Cartoes cartao = new RepositorioPessoas().GetIdpessoasCartao(id);

            return Content(JsonConvert.SerializeObject(cartao));
        }

        [HttpPost]
        public ActionResult CadastroRecebimento(Recebimento recebimento)
        {
            int id = Convert.ToInt32(Session["user"].ToString());

            Recebimento addRecebimento = new Recebimento()
            {
                IdCategoria = recebimento.IdCategoria,
                IdPessoas = Convert.ToInt32(Session["user"].ToString()),
                Data = recebimento.Data,
                Valor = recebimento.Valor
            };

            //int deuCerto = new RepositorioRecebimento().CadastrarRecebimento(recebimento);

            return Content(JsonConvert.SerializeObject(new {addRecebimento }));
        }

        [HttpPost]
        public ActionResult CadastroGastosModalPessoas(Gastos gasto)
        {
            int id = Convert.ToInt32(Session["user"].ToString());
            Gastos addGastos = new Gastos()
            {
                IdCartao = gasto.IdCartao,
                IdCategoria = gasto.IdCategoria,
                Valor = gasto.Valor,
                Vencimento = gasto.Vencimento,
                Entrada = gasto.Entrada
            };

            //int deuCerto = new RepositorioCartoes().CadastrarCartao(gasto);

            return Content(JsonConvert.SerializeObject(new {addGastos}));
        }




    }
}
