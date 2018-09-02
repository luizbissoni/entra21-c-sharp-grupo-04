$(function () {

    var table = $('#tabela-pessoas').DataTable();
    var dataRow;

    $('#tabela-pessoas tbody').on('click', 'tr', function () {

        dataRow = table.row(this).data();
        $.ajax({
            url: '/Pessoas/CadastroRecebimento',
            method: 'POST',
            data: {
                

            },
            success: function (preencher) {

            }
        });


    });

    //$('#cadastrar-recebimento').on('click', function () {
    //    $.ajax({
    //        url: '/Pessoas/CadastroRecebimento',
    //        method: 'POST',
    //        data: {
    //            id_pessoas: dataRow.Id,
    //            id_categoria:
    //            valor:
    //            data:

    //        },


    //    });



    //});
};