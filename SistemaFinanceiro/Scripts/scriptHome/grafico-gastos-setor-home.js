$(document).ready(function () {

    var labels = [], data = [];

    $.ajax({
        url: '/Home/GastosCategoria',
        method: 'GET',
        success: function (gastosPesquisa) {
            var resultado = JSON.parse(gastosPesquisa);
            
            
            $.each(resultado.tabela, function (i) {
               labels.push(resultado.tabela[i].categoria);
                data.push(resultado.tabela[i].valor);

                //console.log(resultado.tabela[i].categoria);
                //console.log(resultado.tabela[i].valor);
            });
        }

    });

    var ctx = document.getElementById('chartSetor');


    var myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['vestuario', 'aluguel', 'automovel', ],
            datasets: [{
                label: 'Gastos por Setor',
                borderWidth: 2,
                borderColor: '#00FF00',
                backgroundColor: 'rgba(00,255,00,0.1)',
                data: [10, 50, 100 ]
            }],
            options: {
                animation: {
                    animateScale: true
                }
            }
        },
        //options: options
    });


});