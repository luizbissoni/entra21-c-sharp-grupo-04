$(document).ready(function () {
    var data = [], labels = [], label = [];

    Pusher.logToConsole = false;

    var pusher = new Pusher('3d2e47e4a257a668b2cc', {
        cluster: 'us2',
        forceTLS: true
    });
    var channel = pusher.subscribe('my-channel');
    channel.bind('cadastroRecebimento', function (data) {
        var resultado = JSON.stringify(data);
        preencherGraficosRecebimento();
    });
    var channel2 = pusher.subscribe('my-channel');
    channel2.bind('cadastroGastos', function (data) {
        var resultado = JSON.stringify(data);
        preencherGraficosRecebimento();
    });

    preencherGraficosRecebimento();

    function preencherGraficosRecebimento() {
        $.ajax({
            url: '/Home/RecebimentoPessoaJsonGrafico',
            method: 'GET',
            success: function (pesquisa) {
                var resultado = JSON.parse(pesquisa);
                //console.log(resultado.data[0].labels);

                $.each(resultado.data, function (i) {

                    label.push(resultado.data[i].datasets.label);
                    data.push(resultado.data[i].datasets.data);
                    labels.push(resultado.data[i].labels)
                    //console.log(resultado.data[i].datasets.label);
                });
                generationChartRecebimentos(labels, data, label);
            },
            error: function () {
                alert("Erro ao preencher Graficos.");
            }
        });
    }
        var ctx = document.getElementById('myChart');

    function generationChartRecebimentos(labels, data, label) {
        var chartGraph = new Chart(ctx, {
            type: 'line',
            data: {
                labels: label,
                datasets: [{
                    label: '2018',
                    data: data,
                    borderWidth: 6,
                    borderColor: 'rgba(77,166,253,0.85)',
                    background: 'transparent',
                }],
                options: {
                    animation: {
                        animateScale: true
                    }
                }
            }
        });
    }

});