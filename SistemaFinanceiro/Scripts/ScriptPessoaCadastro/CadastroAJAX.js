$(function () {
    $('salvar-pessoa').on('click', function (e) {
        $.ajax({
            url: '/Pessoas/CadastrarAJAX',
            method: 'POST',
            data: {

                nome: $('#campo-nome').val(),
                idade: $('#campo-idade').val(),
                sexo: $('#campo-sexo').val(),
                cPF: $('#campo-cpf').val(),
                data_nascimento: $('#campo-nascimento').val(),
                telefone: $('#campo-telefone')
            }

        });
    });
});