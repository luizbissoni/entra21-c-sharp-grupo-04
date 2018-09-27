$(document).ready(function () {
    var chartGraph;
    var arrayLabels = [];
    var arrayData = [];
    var arrayLabel = [];

 
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
        arrayLabels = [];
        arrayData = [];
        arrayLabel = [];

        $.ajax({
            url: '/Home/RecebimentoPessoaJsonGrafico',
            method: 'GET',
            success: function (pesquisa) {
                var resultado = JSON.parse(pesquisa);
                //console.log(pesquisa);
                $.each(resultado.data, function (i) {
                    arrayLabels.push(resultado.data[i].labels);
                    arrayData.push(resultado.data[i].datasets.data);
                    arrayLabel.push(resultado.data[i].datasets.label);
                });
                generationChartRecebimentos(arrayLabels, arrayData, arrayLabel);
            },
            error: function () {
                alert("Erro ao preencher Graficos.");
            }
        });
    }
    var ctx = document.getElementById('myChart');

    function generationChartRecebimentos(arrayLabels, arrayData, arrayLabel) {
         chartGraph = new Chart(ctx, {
            type: 'line',
            data: {
                labels: arrayLabel,
                datasets: [{
                    label: "Recebimento mensal",
                    data: arrayData,
                    borderWidth: 4,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    background: 'transparent',
                }],
               
            },
            options: {
                animation: {
                    animateScale: true
                }
            }
        });

        chartGraph.destroy();

        chartGraph = new Chart(ctx, {
            type: 'line',
            data: {
                labels: arrayLabel,
                datasets: [{
                    label: "Recebimento mensal",
                    data: arrayData,
                    borderWidth: 4,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    background: 'transparent',
                }],

            },
            options: {
                animation: {
                    animateScale: true
                }
            }
        });

    }

   

});




//function preencherGraficosRecebimento() {
//    $.ajax({
//        url: '/Home/RecebimentoPessoaJsonGrafico',
//        method: 'GET',
//        success: function (pesquisa) {
//            var resultado = JSON.parse(pesquisa);

//            $.each(resultado.data, function (i) {
//                label.push(resultado.data[i].datasets.label);
//                data.push(resultado.data[i].datasets.data);
//                labels.push(resultado.data[i].labels)
//            });
//            generationChartRecebimentos(labels, data, label);
//        },
//        error: function () {
//            alert("Erro ao preencher Graficos.");
//        }
//    });
//}

//{
//    labels: label,
//        datasets: [{
//            label: '2018',
//            data: data,
//            borderWidth: 6,
//            borderColor: 'rgba(77,166,253,0.85)',
//            background: 'transparent',
//        }],



//'rgba(54, 162, 235, 0.2)',
//    'rgba(255, 206, 86, 0.2)',
//    'rgba(75, 192, 192, 0.2)',
//    'rgba(153, 102, 255, 0.2)',
//    'rgba(255, 159, 64, 0.2)'

//'rgba(54, 162, 235, 1)',
//    'rgba(255, 206, 86, 1)',
//    'rgba(75, 192, 192, 1)',
//    'rgba(153, 102, 255, 1)',
//    'rgba(255, 159, 64, 1)'

//background: 'transparent'