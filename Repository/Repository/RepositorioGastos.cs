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
    public class RepositorioGastos
    {

        public int CadastrarGastos(Gastos gastos)
        {

            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"INSERT INTO gastos (id_cartao, id_categoria, valor, entrada, vencimento, descricao) OUTPUT INSERTED.ID VALUES (@IDCARTAO, @IDCATEGORIA, @VALOR, @ENTRADA, @VENCIMENTO, @DESCRICAO)
                                update recebimentos set valor = (case when (recebimentos.valor - (select sum(gastos.valor) from gastos)) <= 0 then 0 
                                else recebimentos.valor - (select sum(gastos.valor) from gastos) end) where recebimentos.id_pessoas = (select cartoes.id_pessoas from cartoes where cartoes.Id = @ID)";
            comando.Parameters.AddWithValue("@IDCARTAO", gastos.IdCartao);
            comando.Parameters.AddWithValue("@IDCATEGORIA", gastos.IdCategoria);
            comando.Parameters.AddWithValue("@VALOR", gastos.Valor);
            comando.Parameters.AddWithValue("@DESCRICAO", gastos.Descricao);
            comando.Parameters.AddWithValue("@ENTRADA", gastos.Entrada);
            comando.Parameters.AddWithValue("@VENCIMENTO", gastos.Vencimento);
            comando.Parameters.AddWithValue("@ID", gastos.IdCartao);

            int id = Convert.ToInt32(comando.ExecuteScalar().ToString());
            return id;
        }

        public bool ExcluirGastos(int id)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "DELETE FROM gastos WHERE id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            return comando.ExecuteNonQuery() == 1;
        }

        public List<Gastos> ObterTodosGastos()
        {
            List<Gastos> gastos = new List<Gastos>();
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "SELECT id, id_cartao, id_categoria, valor, entrada, vencimento, descricao FROM gastos";


            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                Gastos gasto = new Gastos()
                {
                    Id = Convert.ToInt32(linha["id"].ToString()),
                    IdCartao = Convert.ToInt32(linha["id_cartao"].ToString()),
                    IdCategoria = Convert.ToInt32(linha["id_categoria"].ToString()),
                    Valor = Convert.ToDouble(linha["valor"].ToString()),
                    Entrada = Convert.ToDateTime(linha["entrada"].ToString()),
                    Vencimento = Convert.ToDateTime(linha["vencimento"].ToString()),
                    Descricao = linha["descricao"].ToString()
                };
                gastos.Add(gasto);
            }
            return gastos;
        }

        public Gastos ObterPeloIdGastos(int id)
        {
            Gastos gastos = null;
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"SELECT gt.id_cartao, gt.id_categoria, gt.valor, gt.entrada, gt.vencimento, gt.descricao, gt.entrada, gt.vencimento, cat.nome, car.conta FROM gastos gt
                                    INNER JOIN categorias cat ON(cat.id = gt.id_categoria)
                                        INNER JOIN cartoes car ON(car.Id = gt.id_cartao)
                                               WHERE gt.id = @ID";
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            if (tabela.Rows.Count == 1)
            {
                gastos = new Gastos();
                gastos.Id = id;
                gastos.IdCategoria = Convert.ToInt32(tabela.Rows[0]["id_categoria"].ToString());
                gastos.cartao = new Cartoes()
                {
                    Id = Convert.ToInt32(tabela.Rows[0]["id_cartao"].ToString()),
                    Conta = tabela.Rows[0]["conta"].ToString()
                };
                gastos.IdCartao = Convert.ToInt32(tabela.Rows[0]["id_cartao"].ToString());
                gastos.Valor = Convert.ToDouble(tabela.Rows[0]["valor"].ToString());
                gastos.Entrada = Convert.ToDateTime(tabela.Rows[0]["entrada"].ToString());
                gastos.Vencimento = Convert.ToDateTime(tabela.Rows[0]["vencimento"].ToString());
                gastos.Descricao = tabela.Rows[0]["descricao"].ToString();
                gastos.Categoria = new Categoria()
                {
                    Id = Convert.ToInt32(tabela.Rows[0]["id_categoria"].ToString()),
                    Nome = tabela.Rows[0]["nome"].ToString()
                };


            }


            return gastos;
        }

        public bool AlterarGastos(Gastos gastos)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = "UPDATE gastos SET id_cartao = @IDCARTAO, id_categoria = @IDCATEGORIA, valor = @VALOR, entrada = @ENTRADA, vencimento = @VENCIMENTO WHERE id = @ID";
            //comando.Parameters.AddWithValue("@ID_CATEGORIA", gastos.IdGastos);
            comando.Parameters.AddWithValue("@IDCATEGORIA", gastos.IdCategoria);
            comando.Parameters.AddWithValue("@IDCARTAO", gastos.IdCartao);
            comando.Parameters.AddWithValue("@VALOR", gastos.Valor);
            comando.Parameters.AddWithValue("@ENTRADA", gastos.Entrada);
            comando.Parameters.AddWithValue("@VENCIMENTO", gastos.Vencimento);
            comando.Parameters.AddWithValue("@ID", gastos.Id);
            return comando.ExecuteNonQuery() == 1;
        }

        public List<Gastos> ObterTodosParaJson(string start, string length, string search, string orderColumn, string orderDir, int id)
        {
            List<Gastos> gastos = new List<Gastos>();
            //" + orderDir + " OFFSET " + start + " ROWS FETCH NEXT " + length + " ROWS ONLY "
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"SELECT gas.Id, pes.nome AS 'pessoa', car.conta, cat.nome AS 'categoria', gas.valor, gas.entrada, gas.vencimento, gas.descricao, gas.id_categoria  FROM gastos gas
                                        INNER JOIN categorias cat ON cat.Id = gas.id_categoria 
                                        INNER JOIN cartoes car ON car.Id = gas.id_cartao
                                        INNER JOIN pessoas pes ON pes.Id = car.id_pessoas WHERE pes.Id = @ID
                                        AND ((car.conta LIKE @SEARCH) OR (cat.nome LIKE @SEARCH) OR (gas.valor LIKE @SEARCH))
                                        ORDER BY " + orderColumn + "" + orderDir + " OFFSET " + start + " ROWS FETCH NEXT " + length + " ROWS ONLY";

            comando.Parameters.AddWithValue("@SEARCH", search);
            comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());

            foreach (DataRow line in tabela.Rows)
            {
                Gastos gasto = new Gastos() {
                    Id = Convert.ToInt32(line["Id"].ToString()),
                    IdCategoria = Convert.ToInt32(line["id_categoria"].ToString()),
                    Descricao = line["descricao"].ToString(),
                    Entrada = Convert.ToDateTime(line["entrada"].ToString()),
                    Vencimento =  Convert.ToDateTime(line["vencimento"].ToString()),
                    Valor = Convert.ToDouble(line["valor"].ToString()),
                    cartao = new Cartoes()
                    {
                        Id = Convert.ToInt32(line["id_categoria"].ToString()),
                        Conta = line["conta"].ToString()
                    },
                    Categoria = new Categoria()
                    {
                        Id = Convert.ToInt32(line["id_categoria"].ToString()),
                        Nome = line["categoria"].ToString(),
                    }
                };

                gastos.Add(gasto);
            }
            return gastos;
        }

        public int ContabilizarGastosFiltrados(string search)
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"SELECT COUNT(gas.Id) FROM gastos gas 
                                    JOIN cartoes car ON (car.Id = gas.id_cartao)
                                    JOIN categorias cat on (cat.Id = gas.id_categoria)
                                    WHERE (cat.nome LIKE @SEARCH OR gas.descricao LIKE @SEARCH)";
            comando.Parameters.AddWithValue("@SEARCH", search);
            return Convert.ToInt32(comando.ExecuteScalar().ToString());
        }

        public int ContabilizarGastos()
        {
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"SELECT COUNT(id) FROM gastos";
            return Convert.ToInt32(comando.ExecuteScalar().ToString());
        }

        public List<Object> FullCalendarGastos(int id)
        {
            List<Object> gastos = new List<object>();
            SqlCommand comando = new DBconnection().GetConnction();
            comando.CommandText = @"SET LANGUAGE português SELECT gastos.Id,pessoas.nome, cartoes.conta AS 'conta',categorias.nome AS 'categoria', valor, entrada, vencimento, descricao FROM gastos 
                                        INNER JOIN categorias ON categorias.Id = gastos.id_categoria 
                                        INNER JOIN cartoes ON cartoes.Id = gastos.id_cartao 
                                        INNER JOIN pessoas ON pessoas.Id = cartoes.id_pessoas WHERE pessoas.Id = @ID";
          comando.Parameters.AddWithValue("@ID", id);
            DataTable tabela = new DataTable();
            tabela.Load(comando.ExecuteReader());
            foreach (DataRow linha in tabela.Rows)
            {
                gastos.Add(new
                {

                    id = Convert.ToInt32(linha["id"].ToString()),
                    title = linha["descricao"].ToString(),
                    start = Convert.ToDateTime(linha["entrada"].ToString()),
                    end = Convert.ToDateTime(linha["vencimento"].ToString()),
                    description = "gastos",
                    color = "#FFA500"

                });
            }
                return gastos;
        }
    }
}



//// comando.CommandText = @"SET LANGUAGE português SELECT gastos.Id,pessoas.nome, cartoes.conta AS 'conta',categorias.nome AS 'categoria', valor, entrada,vencimento, descricao FROM gastos INNER JOIN categorias ON categorias.Id = gastos.id_categoria 
//INNER JOIN cartoes ON cartoes.Id = gastos.id_cartao INNER JOIN pessoas ON pessoas.Id = cartoes.id_pessoas WHERE pessoas.Id = @ID";
//            comando.Parameters.AddWithValue("@ID", id);  


//Gastos gasto = new Gastos()
//                {
//                    Id = Convert.ToInt32(linha["id"].ToString()),
//                    IdCartao = Convert.ToInt32(linha["id_cartao"].ToString()),
//                    IdCategoria = Convert.ToInt32(linha["id_categoria"].ToString()),
//                    Valor = Convert.ToDouble(linha["valor"].ToString()),
//                    Entrada = Convert.ToDateTime(linha["entrada"].ToString()),
//                    Vencimento = Convert.ToDateTime(linha["vencimento"].ToString()),
//                    Descricao = linha["descricao"].ToString()
//                };
//                gastos.Add(gasto);