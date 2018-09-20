$(function () {

    var valorRecebido, valorGasto, porcentagemGasto, porcentoTotalCarteira;




    $.ajax({
        url: '/Home/TotalGastoERecebido',
        method: 'GET',
        async: true,
        success: function (resultado) {
            var result = JSON.parse(resultado);
  

            var gastos = result.gastos;

            var recebidos = result.recebidos;
            console.log(resultado.recebidos);
            $('.saldo-recebido').text('R$' + recebidos.valor);
           // $("#porcentoCarteira").append('<div class="chart" data-percent="' + recebidos.percentual + '" data-barcolor="#4680FE" data-trackcolor="#dbdada" data-linewidth="6" data-barsize="110"><div class="chart-percent"><span></span >%</div ></div > ');

            $('.porcentoCarteira').data('easyPieChart').update(recebidos.percentual);


            $('#total-gastos').text('R$' + gastos.valor);
            $("#teste").append('<div class="chart dial" data-percent="' + gastos.percentual + '" data-barcolor="#FC6180" data-trackcolor="#dbdada" data-linewidth="6" data-barsize="110"><div class="chart-percent"><span></span>%</div></div>');

        }
    });

    $.ajax({
        url: '/Home/SetorMaiorGasto',
        method: 'GET',
        async: true,
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



