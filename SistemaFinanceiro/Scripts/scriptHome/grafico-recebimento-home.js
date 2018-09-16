$(document).ready(function () {

    var data = [], labels = [], label = [];
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
            })
        }
    });

    var ctx = document.getElementById('myChart');

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

});