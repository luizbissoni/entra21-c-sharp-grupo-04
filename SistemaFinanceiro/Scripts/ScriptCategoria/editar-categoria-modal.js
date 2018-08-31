$(function () {

    var table = $('#tabela-categoria').DataTable();
    var dataRow;
    $('#tabela-categoria tbody').on('click', 'tr', function () {
        var Id = $(this).Id;
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        dataRow = table.row(this).data();
    });

    
    $('.editar-categoria').on('click', function () {
        $.ajax({
            url: '/Categoria/Editar',
            method: 'GET',
            data: {
                Id: dataRow.Id
            },
            success: function (preencher) {
                console.log(preencher);
                var data = JSON.parse(preencher);
                $('#editar-categoria-modal').modal('show');
                $('#campo-nome-categoria').val(data.Nome);
                $('#campo-id-categoria').val(dataRow.Id);

            }
        });
    });


    $('body').on('click', '#salvar-categoria-cadastro-modal', function () {
        $.ajax({
            url: '/Categoria/Update',
            method: 'post',
            data: {
                nome: $('#campo-nome-categoria').val(),
                id: $('#campo-id-categoria').val()
            },
            success: function (data) {
                $('#editar-categoria-modal').modal('hide');
            }
        });
    });

});