$(function () {

    $('body').on('click', '#salvar-cadastro-modal', function () {
        $.ajax({
            url: '/Recebimento/CadastroModal',
            method: 'POST',
            data: {
                valor_recebido: $('#campo-valor-recebido').val(),
                data_recebimento: $('#campo-valor-recebido').val(),
                descricao: $('#campo-descricao').val()

            },
            success: function (data) {
                limpaCampos();
                $('#cadastrar-categoria-modal').modal('hide');
                $('#tabela-recebimento').DataTable().ajax.reload();
            }
        });
    });
    $('#cancelar-cadastro-recebimento').on('click', function () {
        limpaCampos();
    });

    function limpaCampos() {


        $('#campo-valor-recebido').val(''),
        $('#campo-valor-recebido').val(''),
         $('#campo-descricao').val('')

    };


});