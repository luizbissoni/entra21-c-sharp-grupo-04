using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaFinanceiro.Controllers
{
    public class FinanceiroController : Controller
    {
        // GET: Financeiro
        public ActionResult Index()
        {
            return View();
        }
    }
}