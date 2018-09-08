$(document).ready(function () {

    var ctx = document.getElementById('chartSetor');


    var myRadarChart = new Chart(ctx, {
        type: 'radar',

        data: {
            labels:['haha','ontem','hoje','agora','antes de ontem'],
            datasets: [{
                label: 'Gastos mês',
                data: [10, 20, 30, 80, 15],
                borderWidth: 6,
                borderColor: 'rgba(77,166,253,0.85)',
                background: 'transparent',
            }],
            datasets: [{
                label: 'Gastos onte',
                data: [10, 20, 11, 15, 25],
                borderWidth: 6,
                borderColor: 'rgba(77,166,253,0.85)',
                background: 'transparent',
            }],
        },
        //options: options
    });


});