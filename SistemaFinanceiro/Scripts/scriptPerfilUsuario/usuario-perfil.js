$(function () {


    var table = $('#tabela-pessoas').DataTable();
    var dataRow;

    $('#tabela-pessoas tbody').on('click', 'tr', function () {

        dataRow = table.row(this).data();

    });

     $('#tabela-pessoas tbody').on('click', 'td.details-control', function () {
        $.ajax({
            url: '/Pessoas/Editar',
            method: 'GET',
            data: { id: dataRow.Id },
            success: function (preencher) {
                var data = JSON.parse(preencher);

                $('#modal-perfil-usuario').modal('show');
                $('#nome-perfil').text(data.Nome);
                //  $('#').val(data.Idade);
                $('#nascimento-perfil').text(data.DataNascimento);
                if (data.Sexo == 'M') {
                    $('#sexo-perfil').text('Masculino');
                } else {
                    $('#sexo-perfil').text('Feminino');
                }
                $('#cpf-perfil').val(data.CPF);
                $('#telefone-perfil').text(data.Telefone);
               $('#cep-perfil').text(data.Cep);
            }
        });
  
    });

});