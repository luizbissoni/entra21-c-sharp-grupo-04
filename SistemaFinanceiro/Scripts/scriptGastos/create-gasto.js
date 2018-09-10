//$(function () {

//    $('body').on('click', '#salvar-cadastro-gasto', function () {
//        $.ajax({
//            url: '/Gasto/CadastroModalGastos',
//            method: 'POST',
//            data: {
//                Valor: $('#campo-valor').val(),
//                Entrada: $('#campo-data-entrada').val(),
//                Vencimento: $('#campo-vencimento').val(),
//                Descricao: $('#campo-descricao').val(),
//            },
//            success: function (data) {
//                limpaCampos();
//                $('#cadastrar-gastos-modal').modal('hide');
//                $('#tabela-gastos').DataTable().ajax.reload();
//            }
//        });
//    });
//    $('#cancelar-cadastro-gastos').on('click', function () {
//        limpaCampos();
//    });

//    function limpaCampos() {

//        $('#campo-valor').val('');
//        $('#campo-data-entrada').val('');
//        $('#campo-vencimento').val('');
//        $('#campo-descricao').val('');
//    };


//});