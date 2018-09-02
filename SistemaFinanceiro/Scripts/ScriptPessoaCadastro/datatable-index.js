$(document).ready(function () {

    $('#tabela-pessoas').DataTable({
        serverSide: true,
        "bProcessing": true,
        "scrollX": false,
        "ajax": "/Pessoas/ObterTodosJson",
        columns: [
            {
                "class": "details-control",
                "orderable": false,
                "data": null,
                "defaultContent": ""
            },
            { data: "Id" },
            { data: "Nome" },
            { data: "Sexo" },
            { data: "Nascimento" },
            { data: "CPF" },
            { data: "Telefone" },
            { data: "Cep" }
        ],
    });

});




