$(document).ready(function () {
 
    function getSessionValue() {
        return document.getElementById("id-pessoa-gastos").value;
    }

    //Preenche select2 editar gastos
    $('#editar-categoria-gastos').select2({
        placeholder: "selecione a categoria",
        tags: true,
        ajax: {
            url: '/Categoria/ObterTodosCategoriaJson',
            dataType: 'json',
        },
    }).on('change', function () {
        $('#validarGasto').valid();
    });

    //Preenche select2 editar cartao
    $('#editar-numero-cartao').select2({
        placeholder: "selecione o cartão",
        ajax: {
            url: '/Cartao/ObterTodosParaJson',
            dataType: 'json',
        },
    });

    $('#tabela-teste').DataTable({
        serverSide: true,
        "bProcessing": true,
        "ajax": {
            "url": "/Home/TabelaGastos", /*"dataSrc": "data"*/
        },
        "order": [[1, "asc"]],
        columns: [{
            "class": "details-control",
            "orderable": false,
            "data": null,
            "defaultContent": "",
             "bSortable": false,
        },
            { 'data': "cartao.Conta", "bSortable": false, "width": "10%", "target": 1},
            { 'data': "Categoria.Nome", "bSortable": true, "width": "40%", "target": 2 },
            { 'data': "Valor", "bSortable": true, "width": "30%", "target": 3 },
        ],

        columnDefs: [{
            "targets": 4,
            "data": null,
            "bSortable": false, "width": "20%",
            "defaultContent": '<button id="" type="button" class="btn btn-outline-primary editar-gasto-home" data-target="#editar-gastos-pessoa" data-toggle="modal">Editar</button>' +
                '<button id="excluir-gasto-home" type="button" class= "btn btn-outline-danger" data-target="#avisoModal" data-toggle="modal">Excluir</button>'
        }],
       
    });

    var table = $('#tabela-teste').DataTable();
    var dataRow;

    //botao detalhes da tabela
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

    //pega id da tabela quanto clica
    $('#tabela-teste tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).removeClass('selected');
        }
        dataRow = table.row(this).data();
    });

    //detalhes da tabela
    function format(d) {
        // `d` is the original data object for the row
        return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
            '<tr>' +
            '<th>Descrição:</th>' +
            '<td>' + d.Descricao + '</td>' +
            //'</tr>' +
            //'<tr>' +
            '<th>Dia Pagamento:</th>' +
            '<td>' + moment(d.entrada).format('DD/MM/YYYY HH:mm') + '</td>' +
            //'</tr>' +
            //'<tr>' +
            '<th>Término do pagamento:</th>' +
            '<td>' + moment(d.vencimento).format('DD/MM/YYYY HH:mm') + '</td>' +
            '</tr>' +
            '</table>';
    }

    //botao confirmar modalExcluir
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

    //Botao Editar da tabela gastos
    $('#tabela-teste').on('click', '.editar-gasto-home', function () {
        $.ajax({
            url: '/Home/EditarGastos',
            method: 'GET',
            data: {
                Id: dataRow.Id
            },
            success: function (pesquisa) {
                var resultado = JSON.parse(pesquisa);
                //console.log(resultado.gastos);
                $('#editar-numero-cartao').append(new Option(resultado.gastos.cartao.Conta, resultado.gastos.IdCartao, false, false)).val(resultado.gastos.IdCartao).trigger('change');
                $('#editar-categoria-gastos').append(new Option(resultado.gastos.Categoria.Nome, resultado.gastos.IdCategoria, false, false)).val(resultado.gastos.IdCategoria).trigger('change');
                $('#editar-valor').val(resultado.gastos.Valor);
                $('#editar-descricao-gasto').val(resultado.gastos.Descricao);
                $('#editar-entrada').val(moment(resultado.gastos.Entrada).format('DD/MM/YYYY HH:mm'));
                $('#editar-termino').val(moment(resultado.gastos.Vencimento).format('DD/MM/YYYY HH:mm'));
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

    //Botao Salvar ModalEditar
    $('body').on('click', '#editar-gastos-home', function () {
        $valor = $('#editar-valor').val(),
            $valor = $valor.replace(/\,/g, ""),
            $valor = $valor.replace('.', ","),
            $.ajax({
                url: '/Home/UpdateGastos',
                method: 'POST',
                data: {
                    Id: dataRow.Id,
                    idCartao: $('#editar-numero-cartao').val(),
                    idCategoria: $('#editar-categoria-gastos').val(),
                    Valor: $valor,
                    entrada: $('#editar-entrada').val(),
                    vencimento: $('#editar-termino').val(),
                    descricao: $('#editar-descricao-gasto').val()
                },
                success: function () {
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

