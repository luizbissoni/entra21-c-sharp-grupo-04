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


    //$(function preencherCampos(preencher) {
    //    $('#campo-nome').val(preencher.Nome);
    //    $('#campo-idade').val(preencher.Idade);
    //    $('#campo-nascimento').val(preencher.Data_nascimento);
    //    $('#campo-sexo').val(preencher.Sexo);
    //    $('#campo-cpf').val(preencher.CPF);
    //    $('#campo-telefone').val(preencher.Telefone);
    //    $('#cep').val(preencher.Cep);
    //});

    $('#editar-pessoa-modal').on('click', function () {
        $.ajax({
            url: '/Pessoas/EditarModal',
            method: 'GET',
            success: function (data) {
                $('body').append(data);
                $('#editar-pessoa-modal').modal('show');
            }
        });
    });

    $('body').on('click', '#salvar-editar-pessoas-modal', function () {
        $.ajax({
            url: '/Pessoas/Update',
            method: 'post',
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




});

