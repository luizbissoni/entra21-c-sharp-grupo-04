$(document).ready(function () {

    $.ajax({
        url: 'http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3477/days/15?token=your-app-token',
        method: 'GET',
        data: {
            token: 'c64eac5d856b416a22d80425aa91ec6c',
            name: 'Blumenau',
            state: 'SC',
            country:'BR'
        },
        success: function (pesquisaTempo) {
           // var resultadoTempo = JSON.parse(pesquisaTempo);

            console.log(pesquisaTempo);
        }

    });



});