$(document).ready(function () {



    $('#tabela-pessoas').DataTable({
        serverSide: true,
        "bProcessing": true,
        "ajax": "/Pessoas/ObterTodosJson",
        order: [[1, 'asc']],
        columns: [
            {
                data: null,
                defaultContent: '',
                className: 'select-checkbox',
                orderable: false
            },

            { data: "Id" },
            { data: "Nome" },
            { data: "Idade" },
            { data: "Sexo" },
            { data: "Data_nascimento" },
            { data: "CPF" },
            { data: "Telefone" },
            { data: "Cep" }
        ],
       

    });
});


//$(function () {
//    $.ajax({
//        url: '/Pessoas/ObterTodosJson',
//        method: 'GET',
//        success: function (resultado) {
//            var registros = JSON.parse(resultado);
//            //for (var i = 0; i < registros.length; i++) {
//            //    var nome = registros[i].Nome;
//            //    var idade = registros[i].Idade;
//            //    var nascimento = registros[i].Data_Nascimento;
//            //    var cpf = registros[i].CPF;
//            //    var telefone = registros[i].Telefone;
//            //    var cep = registros[i].CEP;
//            //    $registro = '<tr>';
//            //    $registro += '<td>' + nome + '</td>';
//            //    $registro += '<td>' + idade + '</td>';
//            //    $registro += '<td>' + nascimento + '</td>';
//            //    $registro += '<td>' + cpf + '</td>';
//            //    $registro += '<td>' + telefone + '</td>';
//            //    $registro += '<td>' + cep + '</td>';
//            //    $registro += '</tr>';
//            //    $('table').append($registro);
//            //}
//        }
//    });
//});



//function adicionarLinhaTabela(nome, idade, nascimento, cpf, telefone, cep) {
//    $registro = '<tr>';
//    $registro += '<td>' + nome + '</td>';
//    $registro += '<td>' + idade + '</td>';
//    $registro += '<td>' + nascimento + '</td>';
//    $registro += '<td>' + cpf + '</td>';
//    $registro += '<td>' + telefone + '</td>';
//    $registro += '<td>' + cep + '</td>';
//    $registro += '<td><a href="#" class="btn btn-warning editar-pessoa" data-id="' + id + '"data-target="#editar-pessoa-modal" data-toggle="modal">Editar</a></td>'
//    $registro += '</tr>';
//    $('table').append($registro);
//}