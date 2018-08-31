var table = $('#tabela-cartoes').DataTable();
var dataRow;
$('#tabela-cartoes tbody').on('click', 'tr', function () {
    var id = $(this).id;
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
            $('#editar-pessoa-modal-campo-NCartao').val(data.NCartao);
            $('#editar-pessoa-modal-campo-NConta').val(data.NConta);
            $('#editar-pessoa-modal-campo-NSeguranca').val(data.NSeguranca);
            $('#editar-pessoa-modal-campo-nascimento').val(data.Nacimento);
            $('#editar-pessoa-modal-campo-Bandeira').val(data.Bandeira);
            $('#editar-pessoa-modal-campo-Banco').val(data.Banco);
        }
    });
});
