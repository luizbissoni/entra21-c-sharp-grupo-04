$(function () {

    //var recebimento = SistemaFinanceiro.Models.Categoria;
    carregarSelected('#campo-descricao');

    function carregarSelected(id) {

        var categoriaOptions;

        $.ajax({
            url: '/Categoria/ObterTodosCategoriaJson',
            method: 'GET',
            success: function (dara) {
                var data = JSON.parse(dara);
                for (var i = 0; i < data.data.length; i++) {
                   // console.log(data.data[i].Id);
                    categoriaOptions += '<option id="valor-campo-descricao" value="' + data.data[i].Id + '">' + data.data[i].Nome + '</option>';
                }
                $('#campo-descricao').html(categoriaOptions);
            }
        });

    };

    $('#cadastrar-recebimento').on('click', function () {
        $.ajax({
            url: '/Pessoas/CadastroRecebimento',
            method: 'POST',
            data: {
                data: $('#campo-recebimento-data').val(),
                valor: $('#campo-recebimento-valor').val(),
                id_categoria: $('#campo-descricao').val(),
                //id_pessoas: $('').val()
            },
            success: function (data) {

                $('#modal-gastos-pessoa').modal('hide');
            }
        });

    });



    //var table = $('#tabela-pessoas').DataTable();
    //var dataRow;

    //$('#tabela-pessoas tbody').on('click', 'tr', function () {

    //    dataRow = table.row(this).data();
    //    $.ajax({
    //        url: '/Pessoas/CadastroRecebimento',
    //        method: 'POST',
    //        data: {
    //        },
    //        success: function (preencher) {


    //        }
    //    });

    //});


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
});