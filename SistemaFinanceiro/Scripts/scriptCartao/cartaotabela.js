$(document).ready(function () {
    
    $('#tabela-cartao-home').DataTable({
        serverSide: true,
        "bProcessing": true,
        "ajax": "/Cartao/ObterTodosJson",
        columns: [
       
            { data: "Id" },
            { data: "IdPessoas"},
            { data: "Numero" },
            { data: "Conta" },
            { data: "Bandeira"},
            { data: "Banco"}
        ]
    });

});