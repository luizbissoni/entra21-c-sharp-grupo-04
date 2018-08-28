$(document).ready(function () {

    $('#tabela-categoria').DataTable({
        serverSide: true,
        "bProcessing": true,
        "ajax": "/Categorias/ObterTodosCategoriaJson",
        order: [[1, 'asc']],
        columns: [
            {

                "class": "details-control",
                "orderable": false,
                "data": null,
                "defaultContent": ""

            },

            
            { data: "Nome" }
            
        ],
    });

});




