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
    var channel6 = pusher.subscribe('my-channel');
    channel6.bind('cadastroGastos', function (data) {
        var resultado = JSON.stringify(data);
        graficosGastos();
    });
    var channel5 = pusher.subscribe('my-channel');
    channel5.bind('ExcluiGastos', function (data) {
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
                var gastos = result.gastos;
                var recebidos = result.recebidos;

                $('#total-gastos').text('R$' + gastos.valor).maskMoney();
                $('.saldo-recebido').text('R$' + recebidos.valor).maskMoney();

                $('.porcentoCarteira').data('easyPieChart').update(parseFloat(recebidos.percentual));
                $('.porcentoGasto').data('easyPieChart').update(parseFloat(gastos.percentual));
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



