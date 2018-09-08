$(document).ready(function () {
    $('#tabela-gastos-home').DataTable({
        serverSide: true,
        "bProcessing": true,
        "ajax": "/Gasto/ObterTodosJson",
        columns: [

            { data: "Id" },
            { data: "IdCartao" },
            { data: "IdCategoria"},
            { data: "Valor" },
            { data: "Entrada" }
        ]
    });
});