$(function () {

    var table = $('#tabela-pessoas').DataTable();

    $('#tabela-pessoas tbody').on('click', 'tr', function () {
        var id = $(this).id;
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        var dataRow = table.row(this).data();
        $.ajax({
            url: '/Pessoas/Editar',
            method: 'GET',
            data: {
                id: dataRow.Id
            },
            success: function (preencher) {
                console.log(preencher);
                var data = JSON.parse(preencher);
                $('#editar-pessoa-modal').modal('show');
                $('#editar-pessoa-modal-campo-nome').val(data.Nome);
                $('#editar-pessoa-modal-campo-idade').val(data.Idade);
                $('#editar-pessoa-modal-campo-nascimento').val(data.Data_nascimento);
                if (data.Sexo == 'M') {
                    $('#editar-pessoa-modal-campo-sexo-feminino').attr('checked', 'checked');
                } else {
                    $('#editar-pessoa-modal-campo-sexo-masculino').attr('checked', 'checked');
                }
                $('#editar-pessoa-modal-campo-sexo').val(data.Sexo);
                $('#editar-pessoa-modal-campo-cpf').val(data.CPF);
                $('#editar-pessoa-modal-campo-telefone').val(data.Telefone);
                $('#editar-pessoa-modal-campo-cep').val(data.Cep);
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

