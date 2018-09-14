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
                    text: 'Algo deu errado.',
                    icon: 'icofont icofont-info-circle',
                    type: 'error'
                });
            }
        });

    });


    $.ajax({
        url: '/Cartao/ObterTodosJson',
        method: "GET",
        success: function (cartao) {
            var allCard = JSON.parse(cartao);
            for (var i = 0; i < allCard.data.length; i++) {

                if (allCard.data[i].IdPessoas == getSessionValue()) {
                    cartaoOptions += '<option id="campo-numero-cartao-editar-gastos" value="' + allCard.data[i].Id + '">' + ' conta: ' + allCard.data[i].Conta + ' -- ' + ' Banco: ' + allCard.data[i].Banco + '</option>';
                }
            }
            $('#campo-numero-cartao-editar-gastos').html(cartaoOptions);
        }
    });

    $('#tabela-teste').on('click', '.editar-gasto-home', function () {
        $.ajax({
            url: '/Home/EditarGastos',
            method: 'GET',
            data: {
                Id: dataRow.Id
            },
            success: function (pesquisa) {
                var resultado = JSON.parse(pesquisa);
                //console.log(resultado.gastos.Entrada);
                //$('.cartao-gastos-editar option[value="' + resultado.gastos.IdCartao + '"]').val({ selected: "selected" });
                $('.descricao-gastos-editar').append(new Option(resultado.gastos.Categoria.Nome, resultado.gastos.IdCategoria, false, false)).val(resultado.gastos.IdCategoria).trigger('change');
                $('#campo-valor-pessoa-editar-gastos').val(resultado.gastos.Valor);
                $('#descricao-despesa-editar-gastos').val(resultado.gastos.Descricao);
                $('#data-entrada-editar-gastos').val(resultado.gastos.Entrada);
                $('#data-termino-editar-gastos').val(resultado.gastos.Vencimento);
            },
            error: function () {
                new PNotify({
                    text: 'Algo deu errado.',
                    icon: 'icofont icofont-info-circle',
                    type: 'error'
                });
            }
        });
    });

    $('body').on('click', '#editar-gastos-home', function () {
        $.ajax({
            url: '/Home/UpdateGastos',
            method: 'POST',
            data: {
                Id: dataRow.Id,
                idCartao: $('#campo-numero-cartao-editar-gastos').val(),
                idCategoria: $('#campo-descricao-editar-gastos').val(),
                Valor: $('#campo-valor-pessoa-editar-gastos').val(),
                entrada: $('#data-entrada-editar-gastos').val(),
                vencimento: $('#data-termino-editar-gastos').val(),
                descricao: $('#descricao-despesa-editar-gastos').val()
            },
            success: function (deuCerto) {
                table.ajax.reload();
                $('#editar-gastos-pessoa').modal('hide');
                new PNotify({
                    text: 'Gasto editado com sucesso.',
                    type: 'success'
                });
            },
            error: function () {
                new PNotify({
                    text: 'Algo deu errado.',
                    icon: 'icofont icofont-info-circle',
                    type: 'error'
                });
            }
        });
    });

});

