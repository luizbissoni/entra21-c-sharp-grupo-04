$(function () {

    $('body').on('click', '#salvar-cadastro-cartao-modal', function () {
        $.ajax({
            url: '/Cartao/CadastroModalCartoes',
            method: 'POST',
            data: {

                numero: $('#campo-numero-Cartao').val(),
                conta: $('#campo-numero-Conta').val(),
                bandeira: $('#campo-bandeira').val(),
                banco: $('#campo-banco').val()
            },
            success: function (data) {
                limpaCampos();
                $('#cadastrar-cartoes-modal').modal('hide');
                //$('#tabela-cartoes').DataTable().ajax.reload();
            }
        });
    });
    $('#cancelar-cadastro-cartao').on('click', function () {
        limpaCampos();
    });

    function limpaCampos() {

        $('#campo-numero-Cartao').val('');
        $('#campo-numero-Conta').val('');
        $('#campo-bandeira').val('');
        $('#campo-banco').val('');
    };

    


});