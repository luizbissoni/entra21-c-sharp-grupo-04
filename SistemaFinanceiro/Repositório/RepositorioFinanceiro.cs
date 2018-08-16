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
    public class RepositorioFinanceiro
    {

        public List<Cartoes> ObterTodosCartoes()
        {
            List<Cartoes> cartoes = new List<Cartoes>();
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT id, id_cartoes, numero_cartao, numero_conta, numero_seguranca, data_vencimento, bandeira, banco FROM cartoes";
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                Cartoes cartao = new Cartoes()
                {
                       Id = Convert.ToInt32(linha[0].ToString()),
                       Id_cartoes = Convert.ToInt32(linha[1].ToString()),
                       Numero_cartao =linha[2].ToString(),
                       Numero_conta = linha[3].ToString(),
                       Numero_seguranca = Convert.ToInt32(linha[4].ToString()),
                       Bandeira = linha[5].ToString(),
                       Banco = linha[6].ToString()

                };
                cartoes.Add(cartao);
            }
            return cartoes;
        }


        public List<Categoria> ObterTodosCategoria()
        {
            List<Categoria> categorias = new List<Categoria>();
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT id, id_categoria, salario, contas, alimentacao, moradia, saude, impostostaxas, roupasacessorios, veiculo, criancas, moveis, educacao FROM categoria";

            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                Categoria categoria = new Categoria()
                {
                    Id = Convert.ToInt32(linha[0].ToString()),
                    Id_Categoria = Convert.ToInt32(linha[1].ToString()),
                    Salario = Convert.ToDouble(linha[2].ToString()),
                    Contas = Convert.ToDouble(linha[3].ToString()),
                    Alimentacao = Convert.ToDouble(linha[4].ToString()),
                    Moradia = Convert.ToDouble(linha[5].ToString()),
                    Saude = Convert.ToDouble(linha[6].ToString()),
                    Impostostaxas = Convert.ToDouble(linha[7].ToString()),
                    RoupasAcessorios = Convert.ToDouble(linha[8].ToString()),
                    Veiculo = Convert.ToDouble(linha[9].ToString()),
                    Criancas = Convert.ToDouble(linha[10].ToString()),
                    Moveis = Convert.ToDouble(linha[11].ToString()),
                    Educacao = Convert.ToDouble(linha[12].ToString())
                    
                };
                categorias.Add(categoria);
            }
            return categorias;
        }

        public List<Gastos> ObterTodosGastos()
        {
            List<Gastos> gastos = new List<Gastos>();
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT id, id_gastos, valor_dos_gastos, data_de_entrada, data_de_vencimento, descricao FROM gastos";


            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                Gastos gasto = new Gastos()
                {
                    Id = Convert.ToInt32(linha[0].ToString()),
                    Id_Gastos = Convert.ToInt32(linha[1].ToString()),
                    Valor_Dos_Gastos = Convert.ToDouble(linha[2].ToString()),
                    Data_De_Entrada = Convert.ToDateTime(linha[3].ToString()),
                    Data_De_Vencimento = Convert.ToDateTime(linha[4].ToString()),
                    Descricao = linha[5].ToString()

                };
                gastos.Add(gasto);
            }
            return gastos;
        }


        public List<Login> ObterTodosGastos()
        {
            List<Login> logins = new List<Login>();
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT id, usuario, senha, email FROM login";


            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                Login login = new Login()
                {
                    Id = Convert.ToInt32(linha[0].ToString()),
                    Usuario = linha[1].ToString(),
                    Senha = linha[2].ToString(),
                    Email = linha[3].ToString(),


                };
                logins.Add(login);
            }
            return logins;
        }

        public List<Pessoas> ObterTodosPessoas()
        {
            List<Pessoas> pessoas = new List<Pessoas>();
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT id, id_pessoas, nome, idade, sexo, cpf, data_nascimento, telefone FROM pessoas";


            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                Pessoas pessoa = new Pessoas()
                {
                    Id = Convert.ToInt32(linha[0].ToString()),
                    Id_pessoas = Convert.ToInt32(linha[1].ToString()),
                    Nome = linha[2].ToString(),
                    Idade = Convert.ToInt32(linha[3].ToString()),
                    Sexo = Convert.ToBoolean(linha[4].ToString()),
                    CPF = Convert.ToInt32(linha[5].ToString()),
                    Data_nascimento = Convert.ToDateTime(linha[6].ToString()),
                    Telefone = Convert.ToInt32(linha[7].ToString())


                };
                pessoas.Add(pessoa);
            }
            return pessoas;
        }

        public List<Recebimento> ObterTodosRecebimento()
        {
            List<Recebimento> recebimentos = new List<Recebimento>();
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT id, id_recebimento, valor_recebido, data_recebimento, descricao FROM recebimento";


            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                Recebimento recebimento = new Recebimento()
                {
                    Id = Convert.ToInt32(linha[0].ToString()),
                    Id_recebimento = Convert.ToInt32(linha[1].ToString()),
                    Valor_recebido = Convert.ToInt16(linha[2].ToString()),
                    data_recebimento = Convert.ToDateTime(linha[3].ToString()),
                    Descricao = linha[4].ToString()


                };
                recebimentos.Add(recebimento);
            }
            return recebimentos;
        }
    }
}