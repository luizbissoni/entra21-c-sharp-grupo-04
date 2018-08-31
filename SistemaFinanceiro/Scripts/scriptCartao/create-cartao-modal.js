$(function () {

    $('body').on('click', '#salvar-cadastro-modal', function () {
        $.ajax({
            url: '/Cartao/CadastroModalCartoes',
            method: 'POST',
            data: {
                NumeroCartao: $('#campo-NCartao').val(),
                NumeroConta: $('#campo-NConta').val(),
                NumeroSeguranca: $('#campo-NSeguranca').val(),
                DataVencimento: $('#campo-nascimento').val(),
                Bandeira: $('#campo-Bandeira').val(),
                Banco: $('#campo-Banco').val()
            },
            success: function (data) {
                limpaCampos();
                $('#cadastrar-cartoes-modal').modal('hide');
                $('#tabela-cartoes').DataTable().ajax.reload();
            }
        });
    });
    $('#cancelar-cadastro-cartao').on('click', function () {
        limpaCampos();
    });

    function limpaCampos() {

        $('#campo-NCartao').val('');
        $('#campo-NConta').val('');
        $('#campo-NSeguranca').val('');
        $('#campo-Bandeira').val('');
        $('#campo-Banco').val('');
    };

    


});