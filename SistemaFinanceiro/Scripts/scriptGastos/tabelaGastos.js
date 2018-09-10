$(document).ready(function () {
    $('#tabela-gastos-home').DataTable({
        serverSide: true,
        "bProcessing": true,
        "ajax": "/Gasto/ObterTodosJson",
        columns: [

            { data: "Id" },
            { data: "IdCartao" },
            { data: "IdCategoria" },
            { data: "Valor" },
            { data: "Entrada" }
        ]
    });

    var table = $('#exampletabela-cartao-home').DataTable();
    var dataRow;

    $('#tabela-teste tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            dataRow
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $('#button').click(function () {
        table.row('.selected').remove().draw(false);

    });

    $('#tabela-teste').DataTable({
        serverSide: true,
        "bProcessing": true,
        "ajax": {
            "url": "/Home/TabelaGastos", "dataSrc": "tabela"
        },
        columns: [{
            "class": "details-control",
            "orderable": false,
            "data": null,
            "defaultContent": ""
        },
        { data: "conta" },
        { data: "categoria" },
        { data: "valor" },
        ],
        "order": [[1, 'asc']]
    });

    $('#tabela-teste tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });

    function format(d) {
        // `d` is the original data object for the row
        return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
            '<tr>' +
            '<td>Descrição:</td>' +
            '<td>' + d.conta + '</td>' +
            '</tr>' +
            //'<tr>' +
            //'<td>Extension number:</td>' +
            //'<td>' + d.extn + '</td>' +
            //'</tr>' +
            //'<tr>' +
            //'<td>Extra info:</td>' +
            //'<td>And any further details here (images etc)...</td>' +
            //'</tr>' +
            '</table>';
    }

});