
$(document).ready(function () {
    var home = '/Home';

    $("#botao-login").on('click', function () {
        //if ($('#validarLogin').valid()) {
        $.ajax({
            url: "/Login/GetLoginJson",
            type: "POST",
            data: {
                "usuario": $("#campo-usuario").val(),
                "senha": $("#campo-senha").val()
            },
            success: function (result) {
                var data = JSON.parse(result);
                if (data.data != false) {
                    $.ajax({
                        url: '/Login/GetIdPessoas',
                        method: 'GET',
                        data: {
                            id: data.data.Id
                        },
                        success: function () {
                            $(window.document.location).attr('href', home);
                        },
                        error: function () {
                            alert("Error!");
                        }
                    });
                }
            },
            error: function () {
                alert("Error!");
            }
        });
        //}
    });

    $('#campo-senha').on('keypress', function (e) {
        if (e.which == 13) {
            $('#botao-login').click();
            e.preventDefault();
        }
    })

    






});




///$(window.document.location).attr('href',novaURL); redirection para ir a pagina index