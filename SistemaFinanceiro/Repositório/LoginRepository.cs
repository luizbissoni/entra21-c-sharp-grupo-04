using SistemaFinanceiro.DataBase;
using SistemaFinanceiro.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SistemaFinanceiro.Repositório
{
    public class LoginRepository
    {
        public List<Login> GetLoginUsuario()
        {
            List<Login> login = new List<Login>();
            SqlCommand command = new DBconnection().GetConnction();
            command.CommandText = "SELECT id, id_login, usuario, senha, email FROM login";
            DataTable table = new DataTable();
            table.Load(command.ExecuteReader());
            foreach (DataRow linha in table.Rows)
            {
                Login logins = new Login()
                {
                    Id = Convert.ToInt32(linha[0].ToString()),
                    Usuario = linha[1].ToString(),
                    Senha = linha[2].ToString(),
                    Email = linha[3].ToString()
                };
                login.Add(logins);
            }
            return login;
        }
    }
} 
    