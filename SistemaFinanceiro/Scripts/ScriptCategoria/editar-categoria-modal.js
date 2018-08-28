$(function () {

    var table = $('#tabela-categoria').DataTable();
    var dataRow;
    $('#tabela-categoria tbody').on('click', 'tr', function () {
        var id = $(this).id;
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
            url: '/Categorias/Editar',
            method: 'GET',
            data: {
                id: dataRow.Id
            },
            success: function (preencher) {
                console.log(preencher);
                var data = JSON.parse(preencher);
                $('#editar-categoria-modal').modal('show');
                $('#editar-categoria-modal-campo-nome').val(data.Nome);

            }
        });
    });


    $('body').on('click', '#salvar-editar-categoria-modal', function () {
        $.ajax({
            url: '/Categorias/Update',
            method: 'post',
            data: {
                nome: $('#editar-categoria-modal-campo-nome').val(),

            },
            success: function (data) {
                $('#editar-categoria-modal').modal('hide');
            }
        });
    });

});

