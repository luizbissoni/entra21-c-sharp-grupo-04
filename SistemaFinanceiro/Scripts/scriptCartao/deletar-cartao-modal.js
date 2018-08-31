$(function () {
    
    var table = $('#tabela-cartao').DataTable();
    var dataRow;
    $('#tabela-cartao tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).removeClass('selected');
        }
        dataRow = table.row(this).data();
        $('#nome-cartao-aviso').text(dataRow.Nome);

    });
    $(".selected").click(function () {
        var row = $(this).parent().parent().parent().html();
    });

    $('#yes-option').on("click", function () {
        $.ajax({
            url: '/cartao/excluir',
            method: 'GET',
            data: {
                Id: dataRow.Id
            },
            success: function (excluirId) {
                var data = JSON.parse(excluirId)
                $('#linha-' + data.Id).remove();
                $('#avisoCartao').modal('hide');
            }

        });
    });
});

