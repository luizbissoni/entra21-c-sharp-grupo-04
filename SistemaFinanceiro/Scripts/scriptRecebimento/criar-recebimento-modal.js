$(function () {

    $('body').on('click', '#salvar-cadastro-modal', function () {
        $.ajax({
            url: '/Recebimentos/CadastroModal',
            method: 'POST',
            data: {
                valor: $('#campo-valor-recebido').val(),
                data: $('#campo-data-recebimento').val(),

            },
            success: function (data) {
                limpaCampos();
                $('#cadastrar-recebimento-modal').modal('hide');
                $('#tabela-recebimentos').DataTable().ajax.reload();
            }
        });
    });
    $('#cancelar-cadastro-recebimento').on('click', function () {
        limpaCampos();
    });

    function limpaCampos() {


        $('#campo-valor-recebido').val(''),
        $('#campo-data-recebimento').val('')

    };


});