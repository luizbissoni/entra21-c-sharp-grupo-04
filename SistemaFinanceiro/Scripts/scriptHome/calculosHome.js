$(function () {

    Pusher.logToConsole = false;

    var pusher = new Pusher('3d2e47e4a257a668b2cc', {
        cluster: 'us2',
        forceTLS: true
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('cadastroRecebimento', function (data) {
        var resultado = JSON.stringify(data);
        graficosGastos();

    });

    var channel2 = pusher.subscribe('my-channel');
    channel2.bind('cadastroGastos', function (data) {
        var resultado = JSON.stringify(data);
        graficosGastos();

    });
    graficosGastos();

    function graficosGastos() {
        $.ajax({
            url: '/Home/TotalGastoERecebido',
            method: 'GET',
            async: true,
            success: function (resultado) {
                var result = JSON.parse(resultado);
                //console.log(result)
                var gastos = result.gastos;
                var recebidos = result.recebidos;

                $('#total-gastos').text('R$' + gastos.valor);
                $('.saldo-recebido').text('R$' + recebidos.valor);

                $('.porcentoCarteira').data('easyPieChart').update(recebidos.percentual);
                $('.porcentoGasto').data('easyPieChart').update(gastos.percentual);
            }
        });
    }

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



