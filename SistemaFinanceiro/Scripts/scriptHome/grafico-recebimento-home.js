$(function () {

    var labels = [], data = [];

    $.ajax({
        url: '/Home/RecebimentoPessoa',
        method: 'GET',
        success: function (pesquisa) {
            var resultado = JSON.parse(pesquisa);

            $.each(resultado.tabela, function (i) {
                console.log(resultado.tabela[i]);
                labels.push(resultado.tabela[i].MES);
                data.push(parseFloat(resultado.tabela[i].VALOR));
            });

        }

    });

    var ctx = document.getElementById('myChart');

    var chartGraph = new Chart(ctx, {
        type: 'line',
        data: {
        labels: labels,
            datasets: [{
                label: 'Recebimento 2018',
                data: data,
                borderWidth: 6,
                borderColor: 'rgba(77,166,253,0.85)',
                background: 'transparent',
                
            }]

        }
    });



});