//$(function () {


//    var table = $('#tabela-pessoas').DataTable();
//    var dataRow;
//    var cartao;

//    $('#tabela-pessoas tbody').on('click', 'tr', function () {

//        dataRow = table.row(this).data();
//        $.ajax({
//            url: '/Pessoas/GetPessoaCartao',
//            method: 'GET',
//            data: { id: dataRow.Id },
//            success: function (preencher) {
//                cartao = JSON.parse(preencher);
//                $('#cartao-perfil').text(cartao.Numero);

//               // "{"Id":2,"IdPessoas":9,"Numero":"321","Conta":"321","Bandeira":"teste","Banco":"testeBank"}"
//            }
//        });


//    });

//    $('#tabela-pessoas tbody').on('click', 'td.details-control', function () {
     
//         $.ajax({
//             url: '/Pessoas/Editar',
//             method: 'GET',
//             data: { id: dataRow.Id },
//             success: function (preencher) {
//                var data = JSON.parse(preencher);

//                 $('#modal-perfil-usuario').modal('show');

//                 $('#nome-perfil').text(data.Nome);
//                 $('#nascimento-perfil').text(data.Nascimento);
//                 if (data.Sexo == 'M') {
//                     $('#sexo-perfil').text('Masculino');
//                 } else {
//                     $('#sexo-perfil').text('Feminino');
//                 }
//                 $('#cpf-perfil').val(data.CPF);
//                 $('#telefone-perfil').text(data.Telefone);
//                 $('#cep-perfil').text(data.Cep);
                

//             }
//         });
//    });

   

//});