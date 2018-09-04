$(document).ready(function () {

    $('#tabela-recebimento').DataTable({
        serverSide: true,
        "bProcessing": true,
        "ajax": "/Recebimento/ObterTodosJson",
        columns: [

            { data: "Id" },
            { data: "Valor" },
            { data: "Data" },

        ]
    });
});