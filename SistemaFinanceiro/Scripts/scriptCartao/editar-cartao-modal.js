$(function () {
var table = $('#tabela-cartao').DataTable();
var dataRow;
$('#tabela-cartao tbody').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    } else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
    dataRow = table.row(this).data();
});

$('.editar-cartao').on('click', function () {
    $.ajax({
        url: '/Cartao/Editar',
        method: 'GET',
        data: {
            id: dataRow.Id
        },
        success: function (preencher) {
            console.log(preencher);
            var data = JSON.parse(preencher);
            $('#editar-cartao-modal').modal('show');
            $('#editar-pessoa-modal-campo-NCartao').val(data.NumeroCartao);
            $('#editar-pessoa-modal-campo-NConta').val(data.NumeroConta);
            $('#editar-pessoa-modal-campo-NSeguranca').val(data.NumeroSeguranca);
            $('#editar-pessoa-modal-campo-nascimento').val(data.DataVencimento);
            $('#editar-pessoa-modal-campo-Bandeira').val(data.Bandeira);
            $('#editar-pessoa-modal-campo-Banco').val(data.Banco);
            $('#campo-id-cartao').val(dataRow.id);
        } })
    } );
});

$('body').on('click', '#salvar-cadastro-cadastro-modal', function () {
    $.ajax({
        url: '/Cartao/Update',
        method: 'post',
        data: {
            NumeroCartao: $('#campo-NCartao').val(),
            NumeroConta: $('#campo-NConta').val(),
            NumeroSeguranca: $('#campo-NSeguranca').val(),
            DataVencimento: $('#campo-nascimento').val(),
            Bandeira: $('#campo-Bandeira').val(),
            Banco: $('#campo-Banco').val()
        },
        success: function (data) {
            $('#edit-cartao-modal').modal('hide');
        }
    });
});