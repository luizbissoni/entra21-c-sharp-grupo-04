$(function () {

    $('body').on('click', '#salvar-cadastro-modal', function () {
        $.ajax({
            url: '/Recebimentos/CadastroModal',
            method: 'POST',
            data: {
                valor_recebido: $('#campo-valor-recebido').val(),
                data_recebimento: $('#campo-data-recebimento').val(),
                descricao: $('#campo-descricao').val()

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
        $('#campo-data-recebimento').val(''),
         $('#campo-descricao').val('')

    };


});