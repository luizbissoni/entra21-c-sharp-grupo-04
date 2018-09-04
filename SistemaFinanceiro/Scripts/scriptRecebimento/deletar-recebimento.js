$(function () {

    var table = $('#tabela-recebimento').DataTable();
    var dataRow;
    $('#tabela-recebimento tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).removeClass('selected');
        }
        dataRow = table.row(this).data();
        $('#nome-recebimento-aviso').text(dataRow.Valor);

    });


    $('#yes-option').on("click", function () {
        $.ajax({
            url: '/recebimento/excluir',
            method: 'GET',
            data: {
                Id: dataRow.Id
            },
            success: function (excluirId) {
                var data = JSON.parse(excluirId)
                $('#linha-' + data.Id).remove();
                $('#avisoRecebimento').modal('hide');
            }
        });
    });
});

