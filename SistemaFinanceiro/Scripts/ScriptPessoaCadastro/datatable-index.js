$(document).ready(function () {

    $('#tabela-pessoas').DataTable({
        serverSide: true,
        "bProcessing": true,
        "ajax": "/Pessoas/ObterTodosJson",
        order: [[1, 'asc']],
        columns: [
            {

                "class": "details-control",
                "orderable": false,
                "data": null,
                "defaultContent": ""

            },

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




