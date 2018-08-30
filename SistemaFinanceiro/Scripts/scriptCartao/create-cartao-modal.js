$(function () {

    $('body').on('click', '#salvar-cadastro-modal', function () {
        $.ajax({
            url: '/Cartao/CadastroModalCartoes',
            method: 'POST',
            data: {
                nome: $('#campo-nome').val(),
                idade: $('#campo-idade').val(),
                data_nascimento: $('#campo-nascimento').val(),
                sexo: $('input[name="Pessoas.Sexo"]:checked').val(),
                cpf: $('#campo-cpf').val(),
                telefone: $('#campo-telefone').val(),
                cep: $('#cep').val()
            },
            success: function (data) {
                limpaCampos();
                $('#cadastrar-pessoa-modal').modal('hide');
                $('#tabela-pessoas').DataTable().ajax.reload();
            }
        });
    });
    $('#cancelar-cadastro-pessoa').on('click', function () {
        limpaCampos();
    });

    function limpaCampos() {

        $('#campo-sexo-feminino').prop('checked', false);
        $('#campo-sexo-masculino').prop('checked', false);
        $('#campo-nome').val('');
        $('#campo-idade').val('');
        $('#campo-nascimento').val('');
        $('#campo-cpf').val('');
        $('#campo-telefone').val('');
        $('#cep').val('');
    };

    


});