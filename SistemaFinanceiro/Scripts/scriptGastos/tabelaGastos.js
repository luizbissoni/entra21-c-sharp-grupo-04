$(document).ready(function () {

    function getSessionValue() {
        return document.getElementById("id-pessoa-gastos").value;
    }

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
            "defaultContent": '<button id="" type="button" class="btn btn-outline-primary editar-gasto-home" data-target="#editar-gastos-pessoa" data-toggle="modal">Editar</button>     <button id="excluir-gasto-home" type="button" class= "btn btn-outline-danger" data-target="#avisoModal" data-toggle="modal">Excluir</button>'
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
            '<th>Descrição:</th>' +
            '<td>' + d.descricao + '</td>' +
            //'</tr>' +
            //'<tr>' +
            '<th>Dia Pagamento:</th>' +
            '<td>' + d.entrada + '</td>' +
            //'</tr>' +
            //'<tr>' +
            '<th>Término do pagamento:</th>' +
            '<td>' + d.vencimento + '</td>' +
            '</tr>' +
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
                $('.modal-excluir-gasto-pessoa').modal('hide');
                var data = JSON.parse(excluirId)
                table.row('.selected').remove().draw(false);
                new PNotify({
                    text: 'Gasto excluido com sucesso.',
                    type: 'success'
                });
            },
            error: function () {
                new PNotify({
                    //title: 'Salvo com sucesso!',
                    text: 'Algo deu errado.',
                    icon: 'icofont icofont-info-circle',
                    type: 'error'
                });
            }
        });

    });
});

