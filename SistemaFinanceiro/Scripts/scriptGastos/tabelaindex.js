$(document).ready(function () {

    $('#tabela-gastos').DataTable({
        serverSide: true,
        "bProcessing": true,
        "ajax": "/Gasto/ObterTodosJson",
        columns: [

            { data: "Id" },
            { data: "ValorGastos" },
            { data: "DataEntrada" },
            { data: "DataVencimento" },
            { data: "Descricao" },

        ]
    });
});