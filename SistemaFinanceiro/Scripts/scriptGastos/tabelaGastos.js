$(document).ready(function () {

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

        columnDefs: [{
            "targets": 4,
            "data": null,
            "defaultContent": '<button id="editar-gasto-home" type="button" class="btn btn-outline-primary">Editar</button>     <button id="excluir-gasto-home" type="button" class= "btn btn-outline-danger" data-target="#avisoModal" data-toggle="modal">Excluir</button>'
        }],
        "order": [[1, 'asc']]
    });

    var table = $('#tabela-teste').DataTable();
    var dataRow;

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
        dataRow = table.row(this).data();

       // console.log(dataRow);
    });

    $('#tabela-teste tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).removeClass('selected');
        }
        dataRow = table.row(this).data();
    });

    function format(d) {
        // `d` is the original data object for the row
        return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
            '<tr>' +
            '<td>Descrição:</td>' +
            '<td>' + d.descricao + '</td>' +
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

   

    $('.excluir-gasto-confirmar').click(function () {
        //table.row('.selected').remove().draw(false);
        $.ajax({
            url: '/Home/ExcluirGastos',
            method: 'GET',
            data: {
                Id: dataRow.Id
            },
            success: function (excluirId) {
                var data = JSON.parse(excluirId)
                console.log(data)
                $('#linha-' + data.Id).remove();
                $('#avisoModa').modal('hide');
            }
        }); 
    });
});

