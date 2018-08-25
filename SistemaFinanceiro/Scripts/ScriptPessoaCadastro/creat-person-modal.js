$(function () {
    $('.cadastrar-pessoa').on('click', function () {
        $.ajax({
            url: '/Pessoas/CadastroModal',
            method: 'get',
            success: function (data) {
                $('body').append(data);
                $('#cadastrar-pessoa-modal').modal('show');
            }
        });
    });

    $('body').on('click', '#salvar-cadastro-modal', function () {
        $.ajax({
            url: '/Pessoas/CadastroModalPessoas',
            method: 'POST',
            data: {
                nome: $('#campo-nome').val(),
                idade: $('#campo-idade').val(),
                nascimento: $('#campo-nascimento').val(),
                cpf: $('#campo-cpf').val(),
                telefone: $('#campo-telefone').val(),
                cep: $('#cep').val()
            },
            success: function (data) {
                var resultado = JSON.parse(data);
                $('#cadastrar-pessoa-modal').modal('hide');

                //adicionarLinhaTabela($('#campo-nome').val(), $('#campo-idade').val(), $('#campo-nascimento').val(), $('#campo-cpf').val(), $('#campo-telefone').val(), $('#cep').val(), resultado.id);
            }
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
  
    

    $(document).ready(function () {
        $.ajax({
            url: "/Pessoas/ObterTodosJson",
            method: 'GET',
            success: function (resultado) {
                var registros = JSON.parse(resultado);
                $('#tabela-pessoas').DataTable({
                    data: registros,
                    columns: [
                        { "data": "registros.nome" },
                         { "data": "registros.idade" },
                          { "data": "registros.nascimento" },
                           { "data": "registros.cpf" },
                            { "data": "registros.telefone" },
                             { "data": "registros.cep" },
                    ],
                });
            }
        });
    });

    //$(document).ready(function () {
    //    $('#search-form').submit(function (e) {
    //        e.preventDefault();
    //        var table = $('#tabela-pessoas').DataTable({
    //            destroy: true,
    //            ajax: "/Pessoas/ObterTodosJson",
    //            columns: [
    //              { "data": "registros.nome" },
    //                     { "data": "registros.idade" },
    //                      { "data": "registros.nascimento" },
    //                       { "data": "registros.cpf" },
    //                        { "data": "registros.telefone" },
    //                         { "data": "registros.cep" },
    //            ]
    //        })
    //        table.on('xhr', function () {
    //            var json = table.ajax.json();
    //            $('#totals').text(json.totals)
    //        });
    //    })
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
});