$(function () {
    $('.cadastrar-pessoa').on('click', function () {
        $.ajax({
            url: '/CadastroModal',
            success: function (data) {
                $('body').append(data);
                $('#cadastrar-pessoa-modal').modal('show');
            }
        });
    });

    $('body').on('click', '#salvar-cadastro-modal', function () {
        $.ajax({
            url: 'Pessoas/Store',
            method: 'POST',
            data: {
                nome: $('#campo-nome').val(),
                idade: $('#campo-idade').val(),
                nascimento: $('#campo-nascimento').val(),
                sexo: $('#campo-sexo').val(),
                cpf: $('#campo-cpf').val(),
                telefone: $('#campo-telefone').val(),
                cep: $('#cep').val()
            },
            success: function (data) {
                //var resultado = JSON.parse(data);
                $('#cadastrar-pessoa-modal').modal('hide');
                //adicionarLinhaTabela($('#campo-nome').val(), $('#campo-idade').val(), $('#campo-nascimento').val(), $('#campo-cpf').val(), $('#campo-telefone').val(), $('#cep').val(), resultado.id);
            }
        });
    });

    $(document).ready(function () {

        $('#tabela-pessoas').DataTable({
            serverSide: true,
            "bProcessing": true,
            "ajax": "/Pessoas/ObterTodosJson",
            columns: [
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
});