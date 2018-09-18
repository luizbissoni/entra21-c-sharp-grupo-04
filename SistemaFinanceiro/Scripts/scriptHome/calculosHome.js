$(document).ready(function () {

    var valorRecebido, valorGasto, porcentagemGasto, porcentoTotalCarteira;


    $.ajax({
        url: '/Home/TotalRecebido',
        method: 'GET',
        success: function (resultado) {
            var total = JSON.parse(resultado);
            valorRecebido = total.tabela[0].total;

            porcentoTotalCarteira = (valorGasto * 100) / valorRecebido;

            $("#porcentoCarteira").append('<div class="chart" data-percent="' + porcentoTotalCarteira + '" data-barcolor="#4680FE" data-trackcolor="#dbdada" data-linewidth="6" data-barsize="110"><div class="chart-percent"><span></span >%</div ></div > ');
            if (total.tabela[0].total > 0) {
                $('.saldo-recebido').text('R$' + total.tabela[0].total);
            } else {
               // $("#porcentoCarteira").append('<div class="chart" data-percent="0" data-barcolor="#4680FE" data-trackcolor="#dbdada" data-linewidth="6" data-barsize="110"><div class="chart-percent"><span></span>%</div></div>');
                //$('.saldo-recebido').text('R$' + 00,00);
            }
            //$('h2.saldo-recebido').number('R$' + total.tabela[0].total, 2, ',', '.')
            //valorRecebido = total.tabela[0].total;

        }
    });

    $.ajax({
        url: '/Home/TotalGastos',
        method: 'GET',
        success: function (resultado) {
            var total = JSON.parse(resultado);
            var totalGasto = total.tabela[0].total;
            $('#total-gastos').text('R$' + totalGasto);
            valorGasto = total.tabela[0].total

            porcentagemGasto = ((valorRecebido - valorGasto) / valorRecebido) * 100;

            $("#teste").append('<div class="chart dial" data-percent="' + porcentagemGasto + '" data-barcolor="#FC6180" data-trackcolor="#dbdada" data-linewidth="6" data-barsize="110"><div class="chart-percent"><span></span>%</div></div>');
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


