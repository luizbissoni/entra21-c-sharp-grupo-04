$(function () {

    function getSessionValue() {
        return document.getElementById("id-pessoa-gastos").value;
    }


    //preenche select Cartao na modal cadastro
    $('#campo-numero-cartao').select2({
        placeholder: "selecione o cartão",
        ajax: {
            url: '/Cartao/ObterTodosParaJson',
            dataType: 'json',
        }
    });

    //Preenche select2 categoria na modal cadastro
    $('#campo-descricao-gastos').select2({
        placeholder: "selecione a categoria",
        ajax: {
            url: '/Categoria/ObterTodosCategoriaJson',
            dataType: 'json'
        },

        tags: true,
        createTag: function (params) {
            var term = $.trim(params.term);
            if (term === '') {
                return null;
            }
            return {
                id: term,
                text: term,
                newTag: true
            }
        },

    });


    $('.gastos-pessoa').on('click', function () {

        $('#cadastrar-gastos-pessoa').modal('show');
    });

    $(".fechar-gastos").on('click', function () {
        limparCampos();
    });

    $('#salvar-gastos-pessoa').on('click', function () {
        if ($('#validarGasto').valid()) {
            $valor = $('#campo-valor').val();
            $valor = $valor.replace(/\,/g, "");
            $valor = $valor.replace('.', ",");
            $.ajax({
                url: '/Pessoas/CadastroGastosModalPessoas',
                method: 'POST',
                data: {
                    "idCartao": $("#campo-numero-cartao").val(),
                    "idCategoria": $("#campo-descricao-gastos").val(),
                    "Valor": $valor,
                    "descricao": $('#descricao-despesa').val(),
                    "entrada": $('#data-entrada').val(),
                    "vencimento": $('#data-termino').val()
                },
                success: function () {
                    limparCampos();
                    $("#cadastrar-gastos-pessoa").modal('hide');
                    $('#tabela-teste').DataTable().ajax.reload();
                    new PNotify({
                        text: 'Gastos adicionado com sucesso.',
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

    $('#data-termino').on('keypress', function (e) {
        if (e.which == 13) {
            $('#data-termino').click();
            e.preventDefault();
        }
    });

    function limparCampos() {
        $('#campo-descricao-gastos').val(null).trigger('change');
        $('#campo-numero-cartao').val(null).trigger('change');
        $('#campo-valor').val('');
        $('#descricao-despesa').val('');
        $('#data-entrada').val(null);
        $('#data-termino').val(null);
    };



});