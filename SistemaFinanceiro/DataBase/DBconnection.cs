using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SistemaFinanceiro.DataBase
{
    public class DBconnection
    {
        private static string connectionString;
        
        //static BDconnetion()
        //{
        //    connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        //}

        public SqlCommand GetConnction()
        {
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = new SqlCommand();
            command.Connection = connection;
            return command;
        }
    }
}