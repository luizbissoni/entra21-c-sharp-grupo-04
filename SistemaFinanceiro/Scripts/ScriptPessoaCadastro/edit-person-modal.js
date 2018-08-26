$(function () {

    //var id = -1;
    //$('.editar-pessoa').on('click', function () {
    //    id = $(this).data('id');
    //});

    //$('#tabela-pessoas').on('click', function () {
    //   $(this).find('tr').on('click', function () {
    //        var id = $(this).find('td:eq(0)');
    //        //    $.ajax({
    //        //        url: '/Pessoas/EditarModal',
    //        //        method: 'GET',
    //        //        success: function (data) {
    //        //            $('body').append(data);
    //                    $('#editar-pessoa-modal').modal('show');
    //                //}
    //            });
    //});

    $('body').on('click', '#salvar-cadastro-modal', function () {
        $.ajax({
            url: '/Pessoas/Update',
            method: 'POST',
            data: {
                nome: $('#campo-nome').val(),
                idade: $('#campo-idade').val(),
                data_nascimento: $('#campo-nascimento').val(),
                sexo: $('#campo-sexo').val(),
                cpf: $('#campo-cpf').val(),
                telefone: $('#campo-telefone').val(),
                cep: $('#cep').val()
            },
            success: function (data) {
                $('#editar-pessoa-modal').modal('hide');
            }
        });
    });

    var table = $('#tabela-pessoas').DataTable();


    $('#tabela-pessoas tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        $('#editar-pessoa-modal').modal('show');

    });


    //$('#table-pessoas').on('click', function () {
    //    alert($('#example tr.selected').children('.id').html());

    //});

    //$(this).find('tr').on('click', function () {
    //        var id = $(this).find('td:eq(0)');


});

