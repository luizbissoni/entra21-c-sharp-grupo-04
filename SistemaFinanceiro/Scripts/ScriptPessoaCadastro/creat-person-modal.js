$(function () {
    $('.cadastrar-pessoa').on('click', function () {
        $.ajax({
            url: '/Pessoas/CadastroModal',
            method: 'GET',
            success: function (data) {
                $('body').append(data);
                $('#cadastrar-pessoa-modal').modal('show');
            }
        });
    });

    $('body').on('click', '#salvar-cadastro-modal', function () {
        $.ajax({
            url: '/Pessoas/Store',
            method: 'POST',
            data: {
                nome: $('#campo-nome').val(),
                idade: $('#campo-idade').val(),
                data_nascimento: $('#campo-nascimento').val(),
                sexo: $('#campo-sexo').val(),
                cpf: $('#campo-cpf').val(),
                telefone: $('#campo-telefone').val(),
                cep: $('#cep').val()
            },
            success: function (data) {
                $('#cadastrar-pessoa-modal').modal('hide');
            }
        });
    });




});