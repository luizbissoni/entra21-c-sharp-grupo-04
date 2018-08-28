$(document).ready(function () {

    $('#tabela-gastos').DataTable({
        serverSide: true,
        "bProcessing": true,
        "ajax": "/Gasto/ObterTodosJson",
        columns: [

            { data: "Id" },
            { data: "Valor_Dos_Gastos" },
            { data: "Data_De_Entrada" },
            { data: "Data_De_Vencimento" },
            { data: "Descricao" },

        ]
    });
});