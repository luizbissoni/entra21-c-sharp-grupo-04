$(function () {

    var table = $('#tabela-categoria').DataTable();
    var dataRow;
    $('#tabela-categoria tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).removeClass('selected');
        }
        dataRow = table.row(this).data();
        $('#nome-categoria-aviso').text(dataRow.Nome);

    });


    $('#yes-option').on("click", function () {
        $.ajax({
            url: '/categorias/excluir',
            method: 'GET',
            data: {
                id: dataRow.Id
            },
            success: function (excluirId) {
                var data = JSON.parse(excluirId)
                $('#linha-' + data.Id).remove();
                $('#examplemodal').modal('hide');
            }
        });
    });
});

