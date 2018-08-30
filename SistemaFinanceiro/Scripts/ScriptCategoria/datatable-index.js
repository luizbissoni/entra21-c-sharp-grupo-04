$(document).ready(function () {

    $('#tabela-categoria').DataTable({
        serverSide: true,
        "bProcessing": true,
        "ajax": "/Categoria/ObterTodosCategoriaJson",
        columns: [
       
            { data: "Id"},
            { data: "Nome" }
            
        ]
    });

});




