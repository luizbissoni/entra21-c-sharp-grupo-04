$(function () {

    var table = $('#tabela-pessoas').DataTable();
    var dataRow;

    $('#tabela-pessoas tbody').on('click', 'tr', function () {

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        dataRow = table.row(this).data();

    });

    $('.modal-usuario').on('click', function () {
        $.ajax({
            url: '/Pessoas/Editar',
            method: 'GET',
            data: { id: dataRow.Id },
            success: function (preencher) {
                var data = JSON.parse(preencher);

                $('#modal-perfil-usuario').modal('show');
                $('#nome-perfil').text(data.Nome);
              //  $('#').val(data.Idade);
                $('#nascimento-perfil').text(data.Data_nascimento);
                if (data.Sexo == 'M') {
                $('#sexo-perfil').text('Masculino');
                } else {
                    $('#sexo-perfil').text('Feminino');
                }
               // $('#editar-pessoa-modal-campo-cpf').val(data.CPF);
                $('#telefone-perfil').text(data.Telefone);
                //$('#editar-pessoa-modal-campo-cep').val(data.Cep);
            }
        });

    });

});