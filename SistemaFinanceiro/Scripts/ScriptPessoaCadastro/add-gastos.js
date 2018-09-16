$(function () {

    function getSessionValue() {
        return document.getElementById("id-pessoa-gastos").value;
    }

    //Preenche select2 editar gastos
    $('#campo-descricao-editar-gastos').select2({
        placeholder: "selecione a categoria",
        tags: true,
        ajax: {
            url: '/Categoria/ObterTodosCategoriaJson',
            dataType: 'json',
        },
         createSearchChoice: function (term, data) {
            if ($(data).filter(function () {
                return this.text.localeCompare(term) === 0;
             }).length === 0) { return { id: term, text: term }; }
        },
        multiple: false,
    });

    //preenche select Cartao na modal cadastro
    $('#campo-numero-cartao').select2({
        placeholder: "selecione o cartão",
        ajax: {
            url: '/Cartao/ObterTodosParaJson',
            dataType: 'json',
            success: function (resultado) {
                console.log(resultado);
            }
        }
    });

    //Preenche select2 categoria na modal cadastro
    $('#campo-descricao-gastos').select2({
        placeholder: "selecione a categoria",
        ajax: {
            url: '/Categoria/ObterTodosCategoriaJson',
            dataType: 'json'
        }
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

    function limparCampos() {
        $('#campo-numero-cartao').val('');
        $('#campo-valor').val('');
        $('#campo-descricao-gastos').val('');
        $('[name=campo-despesa]').val('');
    };



});