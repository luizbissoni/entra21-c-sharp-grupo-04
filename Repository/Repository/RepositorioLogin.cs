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
    public class RepositorioLogin
    {

        public int CadastrarLogin(Login login)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "INSERT INTO login (id_login,usuario, senha, email) OUTPUT INSERTED.ID VALUES (@ID_LOGIN, @USUARIO, @SENHA, @EMAIL)";
            comando.Parameters.AddWithValue("@ID_LOGIN", login.Id_Login);
            comando.Parameters.AddWithValue("@USUARIO", login.Usuario);
            comando.Parameters.AddWithValue("@SENHA", login.Senha);
            comando.Parameters.AddWithValue("@EMAIL", login.Email);

            int id = Convert.ToInt32(comando.ExecuteScalar().ToString());
            return id;
        }

        public bool ExcluirLogin(int id)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "DELETE FROM login WHERE login id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            return comando.ExecuteNonQuery() == 1;
        }

        public List<Login> ObterTodosLogin()
        {
            List<Login> logins = new List<Login>();
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT id,id_login, usuario, senha, email FROM login";

            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                Login login = new Login()
                {
                    Id = Convert.ToInt32(linha[0].ToString()),
                    Id_Login = Convert.ToInt32(linha[1].ToString()),
                    Usuario = linha[2].ToString(),
                    Senha = linha[3].ToString(),
                    Email = linha[4].ToString(),


                };
                logins.Add(login);
            }
            return logins;
        }

        public Login ObterPeloIdLogin(int id)
        {
            Login login = null;
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT , usuario, senha, email FROM login  WHERE id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            if (tabela.Rows.Count == 1)
            {
                login = new Login();
                login.Id = id;
                login.Usuario = tabela.Rows[0][0].ToString();
                login.Senha = tabela.Rows[0][1].ToString();
                login.Email = tabela.Rows[0][2].ToString();
                
            }


            return login;
        }

        public bool AlterarLogin(Login login)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "UPDATE login SET usuario = @USUARIO, senha = @SENHA, email = @EMAIL";
            comando.Parameters.AddWithValue("@USUARIO", login.Usuario);
            comando.Parameters.AddWithValue("@SENHA", login.Senha);
            comando.Parameters.AddWithValue("@EMAIL", login.Email);
           
            return comando.ExecuteNonQuery() == 1;
        }
    }
}