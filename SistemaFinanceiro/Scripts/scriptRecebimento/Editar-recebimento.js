$(function () {

    var table = $('#tabela-recebimento').DataTable();
    var dataRow;
    $('#tabela-recebimento tbody').on('click', 'tr', function () {
        var Id = $(this).Id;
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        dataRow = table.row(this).data();
    });


    $('.editar-recebimento').on('click', function () {
        $.ajax({
            url: '/Recebimento/Editar',
            method: 'GET',
            data: {
                Id: dataRow.Id
            },
            success: function (preencher) {
                console.log(preencher);
                var data = JSON.parse(preencher);
                $('#editar-categoria-modal').modal('show');
                $('#campo-campo-recebimento-valor').val(data.valor_recebido);
                $('#campo-recebimento-data').val(data.data_recebimento);
                $('#campo-descricao').val(data.descricao);
                $('#campo-id-recebimento').val(dataRow.Id);

            }
        });
    });


    $('body').on('click', '#salvar-recebimento-cadastro-modal', function () {
        $.ajax({
            url: '/Recebimento/Update',
            method: 'post',
            data: {

                valor_recebido: $('#campo-campo-recebimento-valor').val(),
                data_recebimento: $('#campo-recebimento-data').val(),
                descricao: $('#campo-descricao').val(),
                id: $('#campo-id-recebimento').val(Id)
            },
            success: function (data) {
                $('#editar-recebimento-modal').modal('hide');
            }
        });
    });

});