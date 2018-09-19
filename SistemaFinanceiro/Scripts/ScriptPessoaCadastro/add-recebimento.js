﻿$(function () {
    //preenche select2 categoria recebimento cadastro

    $('#campo-descricao-recebimento').select2({
        placeholder: "selecione a categoria",
        allowClear: true,
        ajax: {
            url: '/Categoria/ObterTodosCategoriaJson',
            dataType: 'json',
        },
    });

    function getSessionValue() {
        return document.getElementById("id-pessoa").value;
    }

    $('.recebimento-pessoa').on('click', function () {
        $('#modal-recebimento-pessoa').modal('show');
    });

    $('#cadastrar-recebimento').on('click', function () {
        if ($('#validar-recebimento').valid()) {

            $valor = $('#campo-recebimento-valor').val();
            $valor = $valor.replace(/\,/g, "");
            $valor = $valor.replace('.', ",");
            $.ajax({
                url: '/Pessoas/CadastroRecebimento',
                method: 'POST',
                data: {
                    data: $('[name=campo-data-recebimento]').val(),
                    valor: $valor,
                    idCategoria: $('#campo-descricao-recebimento').val(),
                    idPessoas: getSessionValue()
                },
                success: function () {
                    limparCampos();
                    $('#modal-recebimento-pessoa').modal('hide');
                    new PNotify({
                        text: 'Cadastrado com sucesso.',
                        icon: 'icofont icofont-info-circle',
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
        }
    });

    function limparCampos() {
        $('[name=campo-data-recebimento]').val('');
        $('#campo-recebimento-valor').val('');
        $('#campo-descricao-recebimento').val('');
    };

});