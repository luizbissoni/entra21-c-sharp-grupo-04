$(document).ready(function () {


    //$.ajax({
    //    url: '/Home/TotalRecebidoCategoria',
    //    method: 'GET',
    //    success: function (resultado) {
    //        var total = JSON.parse(resultado);

    //        $('#sexo-perfil').text('Feminino');
    //        console.log(total);
    //    }
    //});

    $.ajax({
        url: '/Home/TotalRecebido',
        method: 'GET',
        success: function (resultado) {
            var total = JSON.parse(resultado);

            console.log(total);
        }
    })



});