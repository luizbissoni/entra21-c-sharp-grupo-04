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
    $.ajax({
        url: '/Categoria/ObterTodosCategoriaJson',
        method: 'GET',
        success: function (dara) {
            var data = JSON.parse(dara);
            for (var i = 0; i < data.data.length; i++) {
                // console.log(data.data[i].Id);
                categoriaOptions += '<option id="campo-descricao-editar-gastos" value="' + data.data[i].Id + '">' + data.data[i].Nome + '</option>';
            }
            $('.descricao-gastos-editar').html(categoriaOptions);
        }
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

            $('.cartao-gastos-editar').html(cartaoOptions);
            //console.log(allCard.data);
        }
    });

    $('.editar-gasto-home').on('click', function () {

        $.ajax({
            url: '/Home/EditarGastos',
            method: 'GET',
            data: {
                Id: dataRow.Id
            },
            success: function (pesquisa) {
                var resultado = JSON.parse(pesquisa);

                console.log(resultado);

                //$valor = $('#campo-valor-pessoa-editar-gastos').val(resultado.valor);
                //$valor = $valor.replace(/\,/g, "");
                //$valor = $valor.replace('.', ",");
                idCartao: $('#campo-numero-cartao-editar-gastos option[value="' + resultado.idCartao + '"]').attr({ "selected": "selected" });
                idCategoria: $('#campo-descricao-editar-gastos option[value="' + resultado.idCategoria + '"]').attr({ "selected": "selected" });
                Valor: $('#campo-valor-pessoa-editar-gastos').val();
                descricao: $('#descricao-despesa-editar-gastos').val(resultado.descricao);
                entrada: $('#data-entrada-editar-gastos').val(resultado.entrada);
                vencimento: $('#data-termino-editar-gastos').val(resultado.vencimento);

                new PNotify({
                    text: 'Gasto editado com sucesso.',
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


    $('body').on('click', '#salvar-gastos-editar', function () {
        $.ajax({
            url: '/Home/UpdateGastos',
            method: 'post',
            data: {
                idCartao: $('#campo-numero-cartao-editar-gastos').val(),
                idCategoria: $('#campo-descricao-editar-gastos').val(),
                Valor: $('#campo-valor-pessoa-editar-gastos').val(),
                entrada: $('#data-entrada-editar-gastos').val(),
                vencimento: $('#data-termino-editar-gastos').val(),
                descricao: $('#descricao-despesa-editar-gastos').val()
            },
            success: function (data) {
                $('#editar-gasto').modal('hide');
            }
        });
    });

});

