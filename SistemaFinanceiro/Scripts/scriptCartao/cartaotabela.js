$(function () {
    
    $('#tabela-cartao-home').DataTable({
        serverSide: true,
        "bProcessing": true,
        "ajax": "/Cartao/ObterTodosJson",
        columns: [
       
            { data: "Id" },
            { data: "IdPessoas"},
            { data: "Conta" },
            { data: "Numero" },
            { data: "Bandeira"},
            { data: "Banco"}
        ]
    });

});