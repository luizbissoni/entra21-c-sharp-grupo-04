$(document).ready(function () {
    
    $('#tabela-cartao').DataTable({
        serverSide: true,
        "bProcessing": true,
        "ajax": "/Cartao/ObterTodosJson",
        columns: [
       
            { data: "Id" },
            { data: "NumeroCartao" },
            { data: "NumeroConta" },
            { data: "Bandeira"},
            { data: "Banco"}
        ]
    });

});