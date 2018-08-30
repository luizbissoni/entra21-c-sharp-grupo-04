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
            url: '/Categoria/Editar',
            method: 'GET',
            data: {
                id: dataRow.Id
            },
            success: function (preencher) {
                console.log(preencher);
                var data = JSON.parse(preencher);
                $('#editar-categoria-modal').modal('show');
                $('#campo-nome-categoria').val(data.Nome);

            }
        });
    });


    $('body').on('click', '#salvar-categoria-cadastro-modal', function () {
        $.ajax({
            url: '/Categoria/Update',
            method: 'POST',
            data: {
                nome: $('#campo-nome-categoria').val()
            },
            success: function (data) {
                $('#editar-categoria-modal').modal('hide');
            }
        });
        console.log($('#campo-nome-categoria').val());
    });

});

