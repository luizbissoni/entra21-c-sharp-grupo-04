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
            comando.CommandText = "INSERT INTO login (id_pessoas, usuario, senha, email) OUTPUT INSERTED.ID VALUES (@ID_PESSOAS, @USUARIO, @SENHA, @EMAIL)";
            comando.Parameters.AddWithValue("@ID_PESSOAS", login.IdPessoas);
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
            comando.CommandText = "SELECT login.id, login.id_pessoas, login.usuario, login.senha, login.email FROM [login]";

            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                Login login = new Login()
                {
                    Id = Convert.ToInt32(linha["id"].ToString()),
                    IdPessoas = Convert.ToInt32(linha["id_pessoas"].ToString()),
                    Usuario = linha["usuario"].ToString(),
                    Senha = linha["senha"].ToString(),
                    Email = linha["email"].ToString()


                };
                logins.Add(login);
            }
            return logins;
        }

        public Login ObterPeloIdLogin(int id)
        {
            Login login = null;
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT usuario, senha,id_pessoas, email FROM login  WHERE id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            if (tabela.Rows.Count == 1)
            {
                login = new Login();
                login.Id = id;
                login.IdPessoas = Convert.ToInt32(tabela.Rows[0]["id_pessoas"].ToString());
                login.Usuario = tabela.Rows[0]["usuario"].ToString();
                login.Senha = tabela.Rows[0]["senha"].ToString();
                login.Email = tabela.Rows[0]["email"].ToString();

            }
            return login;
        }

        public bool AlterarLogin(Login login)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "UPDATE login SET usuario = @USUARIO, senha = @SENHA, email = @EMAIL WHERE id = @ID";
            comando.Parameters.AddWithValue("@ID", login.Id);
            comando.Parameters.AddWithValue("@USUARIO", login.Usuario);
            comando.Parameters.AddWithValue("@SENHA", login.Senha);
            comando.Parameters.AddWithValue("@EMAIL", login.Email);

            return comando.ExecuteNonQuery() == 1;
        }

      


    }
}