﻿$(function () {
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
    });

    //$('.aviso-pessoa').on('click', function () {
    //    id = $(this).data('id');
    //});

    $('#yes-option').on("click", function () {
        $.ajax({
            url: '/pessoas/excluir',
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

//$('.aviso-pessoa').on('click')) {
//    $.ajax({
//        url: '/Pessoas/Excluir',
//        method: 'GET',
//        data: { id: dataRow.Id },
//        success: function (data) {
//            //$('#linha-' + id).remove();
//            $('#avisoModal').modal('show');
//        }
//    });
//}