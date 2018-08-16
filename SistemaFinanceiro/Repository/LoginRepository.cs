using SistemaFinanceiro.DataBase;
using SistemaFinanceiro.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SistemaFinanceiro.Repository
{
    public class LoginRepository
    {
        public List<Login> GetAll()
        {
            List<Login> loginUsuario = new List<Login>();
            SqlCommand command = new DBconnection().GetConnction();
            command.CommandText = "SELECT ";
            return null;
        }

    }
}