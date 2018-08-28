$(function () {

    $('body').on('click', '#salvar-cadastro-modal', function () {
        $.ajax({
            url: '/Categoria/CadastroModalCategoria',
            method: 'POST',
            data: {
                nome: $('#campo-nome').val(),
                
            },
            success: function (data) {
                limpaCampos();
                $('#cadastrar-categoria-modal').modal('hide');
                $('#tabela-categorias').DataTable().ajax.reload();
            }
        });
    });
    $('#cancelar-cadastro-categoria').on('click', function () {
        limpaCampos();
    });

    function limpaCampos() {

        
        $('#campo-nome').val('');
        
    };


});