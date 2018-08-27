$(function () {

    var table = $('#tabela-pessoas').DataTable();

    $('#tabela-pessoas tbody').on('click', 'tr', function () {

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        var datarow = table.row(this).data();
        //$('#editar-pessoa-modal').modal('show');

    });

    $('#editar-pessoa-modal').on('click', function () {
        $.ajax({
            url: '/Pessoas/EditarModal',
            method: 'GET',
            success: function (datarow) {
                $('body').append(datarow);
                $('#editar-pessoa-modal').modal('show');
            }
        });
    });


    $('body').on('click', '#salvar-editar-pessoas-modal', function () {
        $.ajax({
            url: '/Pessoas/EditarModal',
            method: 'GET',
            data: function (datarow) {
                nome: $('#campo-nome').val(datarow.Nome);
                idade: $('#campo-idade').val(datarow.Idade);
                data_nascimento: $('#campo-nascimento').val(datarow.Data_nasciment);
                sexo: $('#campo-sexo').val(datarow.Sexo);
                cpf: $('#campo-cpf').val(datarow.CPF);
                telefone: $('#campo-telefone').val(datarow.Telefone);
                cep: $('#cep').val(datarow.Cep)
            },
            success: function (datarow) {
                $('#editar-pessoa-modal').modal('hide');
            }
        });
    });




});

