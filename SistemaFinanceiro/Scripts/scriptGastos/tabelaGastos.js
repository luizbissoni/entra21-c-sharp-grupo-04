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

    var table = $('#exampletabela-cartao-home').DataTable();

    $('#tabela-cartao-home tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $('#button').click(function () {
        table.row('.selected').remove().draw(false);

    });






});