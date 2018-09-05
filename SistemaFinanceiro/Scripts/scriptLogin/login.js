
$(document).ready(function () {
    var home = '/Home';

    $("#botao-login").click(function () {
        $.ajax({
            url: "/Login/GetLoginJson",
            type: "POST",
            data: {
                "usuario": $("#campo-usuario").val(),
                "senha": $("#campo-senha").val()
            },
            success: function (result) {
                alert("OK!");
                var data = JSON.parse(result);
                console.log(data.data.Id);
                if (result != null) {
                    $.ajax({
                        url: '/Login/GetIdPessoas',
                        method: 'GET',
                        data: {
                            id: data.data.Id
                        },
                        success: function (usuario) {
                            var data = JSON.parse(usuario);
                           console.log(data);
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
    });
});




///$(window.document.location).attr('href',novaURL); redirection para ir a pagina index