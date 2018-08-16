using SistemaFinanceiro.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaFinanceiro.Controllers
{
    public class FinanceiroController : Controller
    {
        UserBussinessLogic userLog = new UserBussinessLogic();

        // GET: Financeiro
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Cadastro()
        {
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

        public ActionResult ValidarLogin(Login user)
        {
            if (ModelState.IsValid)
            {
                if (userLog.CheckUserLogin(user)>0)
                {
                    return View("Index");
                }
                else
                {
                    return View("Login");
                }
            }
            return View("Login");
        }
        public ActionResult CreatLogin()
        {
            return View();
        }
    }
}