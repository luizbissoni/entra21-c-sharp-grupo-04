
$(function () {

    var table = $('#tabela-gastos').DataTable();
    var dataRow;


    $('#tabela-gastos tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).removeClass('selected');
        }




        dataRow = table.row(this).data();
        $('#gasto-aviso').text(dataRow.Nome);



    });



    $('#yes-option').on("click", function () {
        $.ajax({
            url: '/Gasto/Excluir',
            method: 'GET',
            data: {Id: dataRow.Id},
            success: function (excluirId) {
                var data = JSON.parse(excluirId)
                $('#linha-' + data.Id).remove();
                $('#aviso-').modal('hide');




            }




        });




    });




});