$(document).ready(function () {

    var valorRecebido, valorGasto, porcentagemGasto, porcentoTotalCarteira;


    $.ajax({
        url: '/Home/TotalRecebido',
        method: 'GET',
        success: function (resultado) {
            var total = JSON.parse(resultado);
            if (total.tabela.length > 0) {
                valorRecebido = total.tabela[0].total;

                porcentoTotalCarteira = (valorGasto * 100) / valorRecebido;

                $("#porcentoCarteira").append('<div class="chart" data-percent="' + porcentoTotalCarteira + '" data-barcolor="#4680FE" data-trackcolor="#dbdada" data-linewidth="6" data-barsize="110"><div class="chart-percent"><span></span >%</div ></div > ');
                $('.saldo-recebido').text('R$' + total.tabela[0].total);

            //$('h2.saldo-recebido').number('R$' + total.tabela[0].total, 2, ',', '.')
            //valorRecebido = total.tabela[0].total;
            } else {
                $('.saldo-recebido').text('R$' + 00,00);
                $("#porcentoCarteira").append('<div class="chart" data-percent="' + 0 + '" data-barcolor="#4680FE" data-trackcolor="#dbdada" data-linewidth="6" data-barsize="110"><div class="chart-percent"><span></span >%</div ></div > ');
            }
        }
    });

    $.ajax({
        url: '/Home/TotalGastos',
        method: 'GET',
        success: function (resultado) {
            var total = JSON.parse(resultado);
            if (total.tabela.length > 0) {
                var totalGasto = total.tabela[0].total;
                valorGasto = total.tabela[0].total

                $('#total-gastos').text('R$' + totalGasto);
                porcentagemGasto = ((valorRecebido - valorGasto) / valorRecebido) * 100;

                $("#teste").append('<div class="chart dial" data-percent="' + porcentagemGasto + '" data-barcolor="#FC6180" data-trackcolor="#dbdada" data-linewidth="6" data-barsize="110"><div class="chart-percent"><span></span>%</div></div>');
            } else {
                $('#total-gastos').text('R$' + 00,00);
                $("#teste").append('<div class="chart dial" data-percent="' + 0 + '" data-barcolor="#FC6180" data-trackcolor="#dbdada" data-linewidth="6" data-barsize="110"><div class="chart-percent"><span></span>%</div></div>');

            }
          
        }
    });

    $.ajax({
        url: '/Home/SetorMaiorGasto',
        method: 'GET',
        success: function (resultado) {
            var total = JSON.parse(resultado);
            // $('.setor-maior-gasto').text('R$' + total.tabela[0].total);
        }
    });


    $.ajax({
        url: '/Home/TabelaGastos',
        method: 'GET',
        success: function (dara) {
            var data = JSON.parse(dara);
            //console.log(data);
        }
    });




});


