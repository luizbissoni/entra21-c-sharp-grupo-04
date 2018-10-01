$(document).ready(function () {

    $('#botao-login-modal').on('click', function () {
        $.ajax({
            url: '/Login/GetLoginJson',
            method: 'GET',
            success:function(dataLogin) {
                var login = JSON.parse(dataLogin);
                var usuario = $('#campo-login-usuario').val();
                var senha = $('#campo-login-senha').val();

                $.each(login, function (login, senha) {
                    console.log("login: " + login + " senha: " + senha);
                });
            }
        });

    });
});