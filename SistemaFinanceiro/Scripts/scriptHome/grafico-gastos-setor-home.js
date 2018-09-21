$(document).ready(function () {

   

    var labels = [], data = [], cores = ["#FFFFFF", "#C0C0C0", "#808080", "#000000", "#FF0000", "#800000", "#FFFF00", "#808000", "#00FF00", "#008000", "#00FFFF", "#008080", "#0000FF", "#000080", "#FF00FF", "#800080"];
   
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
        }

    });
    var ctx = document.getElementById('chartSetor');


    var myRadarChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                //label: 'Gastos por Setor',
                //borderWidth: 2,
                //borderColor: '#00FF00',
                backgroundColor:['#f1c40f','#e67e22','#16a085','#298ob9'],
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


});