$(document).ready(function () {
    var labels = [], data = [];

    Pusher.logToConsole = false;

    var pusher = new Pusher('3d2e47e4a257a668b2cc', {
        cluster: 'us2',
        forceTLS: true
    });
    var channel = pusher.subscribe('my-channel');
    channel.bind('cadastroRecebimento', function (data) {
        var resultado = JSON.stringify(data);
        preencherGraficosGastos();
    });
    var channel2 = pusher.subscribe('my-channel');
    channel2.bind('cadastroGastos', function (data) {
        var resultado = JSON.stringify(data);
        preencherGraficosGastos();
    });

    preencherGraficosGastos();

    function preencherGraficosGastos() {
        
        $.ajax({
            url: '/Home/GastosCategoria',
            method: 'GET',
            success: function (gastosPesquisa) {
                var resultado = JSON.parse(gastosPesquisa);


                $.each(resultado.tabela, function (i) {
                    labels.push(resultado.tabela[i].categoria);
                    data.push(resultado.tabela[i].valor);

                    //console.log(resultado.tabela[i].categoria);
                    // console.log(resultado.tabela[i].valor);
                });

                generationChartGastos(labels, data);
            },
            error: function () {
                alert("Erro ao preencher Graficos.");
            }

        });
    }
        var ctx = document.getElementById('chartSetor');

    function generationChartGastos(labels, data) {

        var myRadarChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    //label: 'Gastos por Setor',
                    //borderWidth: 2,
                    //borderColor: '#00FF00',
                    backgroundColor: ['#f1c40f', '#e67e22', '#16a085', '#298ob9'],
                    data: data
                }],
                options: {
                    animation: {
                        animateScale: true
                    }
                }
            },
            //options: options
        });
    }

});