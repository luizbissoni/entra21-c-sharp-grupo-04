
$(document).ready(function () {
    var home = '/Home';

    $('#campo-senha').on('keydown', function (e) {
        if (e.which == 13) {
            e.preventDefault();
        }
        $.ajax({
            url: "/Login/GetLoginJson",
            type: "POST",
            data: {
                "usuario": $("#campo-usuario").val(),
                "senha": $("#campo-senha").val()
            },
            success: function (result) {
                var data = JSON.parse(result);
                if (result != null) {
                    $.ajax({
                        url: '/Login/GetIdPessoas',
                        method: 'GET',
                        data: {
                            id: data.data.Id
                        },
                        success: function (usuario) {
                            var data = JSON.parse(usuario);

                            $(window.document.location).attr('href', home);

                        }
                    });
                }
            },
            error: function () {
                console.log(result);
                alert("Error!")
            }
        });
    })

    $("#botao-login").on('click', function () {
        $('#campo-senha').keydown();

    });




});




///$(window.document.location).attr('href',novaURL); redirection para ir a pagina index