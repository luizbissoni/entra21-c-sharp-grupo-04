$(function () {

    var table = $('#tabela-pessoas').DataTable();
    var dataRow;
    $('#tabela-pessoas tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).removeClass('selected');
        }
        dataRow = table.row(this).data();
        $('#nome-pessoa-aviso').text(dataRow.Nome);

    });


    $('#yes-option').on("click", function () {
        $.ajax({
            url: '/pessoas/excluir',
            method: 'GET',
            data: {
                Id: dataRow.Id
            },
            success: function (excluirId) {
                var data = JSON.parse(excluirId)
                $('#linha-' + data.Id).remove();
                $('#avisoModa').modal('hide');
            }
        }); 
    });
});

