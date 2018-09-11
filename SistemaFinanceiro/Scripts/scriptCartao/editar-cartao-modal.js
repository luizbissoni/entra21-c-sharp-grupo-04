//$(function () {
//var table = $('#tabela-cartao').DataTable();
//var dataRow;
//$('#tabela-cartao tbody').on('click', 'tr', function () {
//    if ($(this).hasClass('selected')) {
//        $(this).removeClass('selected');
//    } else {
//        table.$('tr.selected').removeClass('selected');
//        $(this).addClass('selected');
//    }
//    dataRow = table.row(this).data();
//});

//$('.editar-cartao').on('click', function () {
//    $.ajax({
//        url: '/Cartao/Editar',
//        method: 'GET',
//        data: {
//            id: dataRow.Id
//        },
//        success: function (preencher) {
//            console.log(preencher);
//            var data = JSON.parse(preencher);
//            $('#editar-cartoes-modal').modal('show');
//            $('#campo-cartao-editar').val(data.NumeroCartao);
//            $('#campo-conta-editar').val(data.NumeroConta);
//            $('#campo-bandeira-editar').val(data.Bandeira);
//            $('#campo-banco-editar').val(data.Banco);

//            $('#campo-id-cartao').val(dataRow.id);
//        } })
//    } );
//});

//$('body').on('click', '#salvar-cartao-cadastro-modal', function () {
//    $.ajax({
//        url: '/Cartao/Update',
//        method: 'post',
//        data: {
//            NumeroCartao: $('#campo-cartao-editar').val(),
//            NumeroConta: $('#campo-conta-editar').val(),
//            Bandeira: $('#campo-bandeira-editar').val(),
//            Banco: $('#campo-banco-editar').val(),
//            id: $('#campo-id-cartao').val()
//        },
//        success: function (data) {
//            $('#editar-cartoes-modal').modal('hide');
//        }
//    });
//});