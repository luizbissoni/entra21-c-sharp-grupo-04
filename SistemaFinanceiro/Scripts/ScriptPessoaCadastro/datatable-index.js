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
            { data: "Idade" },
            { data: "Sexo" },
            { data: "DataNascimento" },
            { data: "CPF" },
            { data: "Telefone" },
            { data: "Cep" }
        ],
    });

});




