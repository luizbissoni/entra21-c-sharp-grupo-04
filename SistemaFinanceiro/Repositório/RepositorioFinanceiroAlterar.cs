using SistemaFinanceiro.DataBase;
using SistemaFinanceiro.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SistemaFinanceiro.Repositório
{
    public class RepositorioFinanceiroAlterar
    {
        public bool Alterar(Cartoes cartao)
        {
        SqlCommand comando = new DBconnection().GetConnction();
        comando.CommandText = "INSERT INTO cartoes (id_cartoes, numero_cartao, numero_conta, numero_seguranca, data_vencimento, bandeira, banco)OUTPUT INSERTED.ID VALUES (@ID_CARTOES, @NUMERO_CARTAO, @NUMERO_CONTA, @NUMERO_SEGURANCA, @DATA_VENCIMENTO, @BANDEIRA, @BANCO)";
        comando.Parameters.AddWithValue("@ID_CARTOES", cartao.Id_cartoes);
        comando.Parameters.AddWithValue("@NUMERO_CARTAO", cartao.Numero_cartao);
        comando.Parameters.AddWithValue("@NUMERO_CONTA", cartao.Numero_conta);
        comando.Parameters.AddWithValue("@NUMERO_SEGURANCA", cartao.Numero_seguranca);
        comando.Parameters.AddWithValue("@DATA_VENCIMENTO", cartao.Data_vencimento);
        comando.Parameters.AddWithValue("@BANDEIRA", cartao.Bandeira);
        comando.Parameters.AddWithValue("@BANCO", cartao.Banco);
        return comando.ExecuteNonQuery() == 1;
        }
    }
}