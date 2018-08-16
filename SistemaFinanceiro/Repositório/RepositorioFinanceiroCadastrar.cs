using SistemaFinanceiro.DataBase;
using SistemaFinanceiro.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SistemaFinanceiro.Repositório
{
    public class RepositorioFinanceiroCadastrar
    {
        public int CadastrarCartao(Cartoes cartoes)
        {

            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"INSERT INTO cartoes (numero_cartao,numero_conta,numero_seguranca,
data_vencimento,bandeira,banco) OUTPUT INSERTED.ID VALUES 
(@NUMERO_CARTAO,@NUMERO_CONTA,@NUMERO_SEGURANCA,@DATA_VENCIMENTO,@BANDEIRA,@BANCO)";
            comando.Parameters.AddWithValue("@NUMERO_CARTAO", cartoes.Numero_cartao);
            comando.Parameters.AddWithValue("@NUMERO_CONTA", cartoes.Numero_conta);
            comando.Parameters.AddWithValue("@NUMERO_SEGURANCA", cartoes.Numero_seguranca);
            comando.Parameters.AddWithValue("@DATA_VENCIMENTO", cartoes.Data_vencimento);
            comando.Parameters.AddWithValue("@BANDEIRA", cartoes.Bandeira);
            comando.Parameters.AddWithValue("@BANCO", cartoes.Banco);
            int id = Convert.ToInt32(comando.ExecuteScalar().ToString());
            return id;
        }

        public int CadastrarCategoria(Categoria categorias)
        {

            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"INSERT INTO categoria (salario,contas,alimentacao,
moradia,saude,impostostaxas, roupasacessorios,veiculo,criancas,moveis,educacao) OUTPUT INSERTED.ID VALUES 
(@SALARIO,@CONTAS,@ALIMENTACAO,@MORADIA,@SAUDE,@IMPOSTOSTAXAS, @ROUPASACESSORIOS, @VEICULO, @CRIANCAS, @MOVEIS, @EDUCACAO)";
            comando.Parameters.AddWithValue("@SALARIO", categorias.Salario);
            comando.Parameters.AddWithValue("@CONTAS", categorias.Contas);
            comando.Parameters.AddWithValue("@ALIMENTACAO", categorias.Alimentacao);
            comando.Parameters.AddWithValue("@MORADIA", categorias.Moradia);
            comando.Parameters.AddWithValue("@SAUDE", categorias.Salario);
            comando.Parameters.AddWithValue("@IMPOSTOSTAXAS", categorias.Impostostaxas);
            comando.Parameters.AddWithValue("@ROUPASACESSORIOS", categorias.RoupasAcessorios);
            comando.Parameters.AddWithValue("@VEICULO", categorias.Veiculo);
            comando.Parameters.AddWithValue("@CRIANCAS", categorias.Criancas);
            comando.Parameters.AddWithValue("@MOVEIS", categorias.Moveis);
            comando.Parameters.AddWithValue("@EDUCACAO", categorias.Educacao);
            int id = Convert.ToInt32(comando.ExecuteScalar().ToString());
            return id;
        }

        public int CadastrarGastos(Gastos gastos)
        {

            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"INSERT INTO gastos (valor_dos_gastos,data_de_entrada,data_de_vencimento,
descricao) OUTPUT INSERTED.ID VALUES 
(@VALOR_DOS_GASTOS,@DATA_DE_ENTRADA,@DATA_DE_VENCIMENTO,@DESCRICAO)";
            comando.Parameters.AddWithValue("@VALOR_DOS_GASTOS", gastos.Valor_Dos_Gastos);
            comando.Parameters.AddWithValue("@DATA_DE_ENTRADA", gastos.Data_De_Entrada);
            comando.Parameters.AddWithValue("@DATA_DE_VENCIMENTO", gastos.Data_De_Vencimento);
            comando.Parameters.AddWithValue("@DESCRICAO", gastos.Descricao);
       
            int id = Convert.ToInt32(comando.ExecuteScalar().ToString());
            return id;
        }
        public int CadastrarLogin(Login login)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"INSERT INTO login (usuario, senha, email) OUTPUT INSERTED.ID
VALUES (@USUARIO, @SENHA, @EMAIL)";
            comando.Parameters.AddWithValue("@USUARIO", login.Usuario);
            comando.Parameters.AddWithValue("@SENHA", login.Senha);
            comando.Parameters.AddWithValue("@EMAIL", login.Email);

            int id = Convert.ToInt32(comando.ExecuteScalar().ToString());
            return id;
        }

        public int CadastrarPessoas(Pessoas pessoas)
        {

            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"INSERT INTO categoria (nome,idade,sexo,
cpf,data_nascimento,telefone) OUTPUT INSERTED.ID VALUES 
(@NOME,@IDADE,@SEXO,@CPF,@DATA_NASCIMENTO,@TELEFONE)";
            comando.Parameters.AddWithValue("@NOME", pessoas.Nome);
            comando.Parameters.AddWithValue("@IDADE", pessoas.Idade);
            comando.Parameters.AddWithValue("@SEXO", pessoas.Sexo);
            comando.Parameters.AddWithValue("@CPF", pessoas.CPF);
            comando.Parameters.AddWithValue("@DATA_NASCIMENTO", pessoas.Data_nascimento);
            comando.Parameters.AddWithValue("@TELEFONE", pessoas.Telefone);
            int id = Convert.ToInt32(comando.ExecuteScalar().ToString());
            return id;
        }

        public int CadastrarRecebimento(Recebimento recebimento)
        {

            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"INSERT INTO recebimento (valor_recebido,data_recebimento,descricao) OUTPUT INSERTED.ID VALUES 
(@VALOR_RECEBIDO,@DATA_RECEBIMENTO,@DESCRICAO)";
            comando.Parameters.AddWithValue("@VALOR_RECEBIDO", recebimento.Valor_recebido);
            comando.Parameters.AddWithValue("@DATA_RECEBIMENTO", recebimento.data_recebimento);
            comando.Parameters.AddWithValue("@DESCRICAO", recebimento.Descricao);
            
            int id = Convert.ToInt32(comando.ExecuteScalar().ToString());
            return id;
        }


        
    }
}