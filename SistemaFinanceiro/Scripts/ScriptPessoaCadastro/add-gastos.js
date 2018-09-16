﻿$(function () {
    function getSessionValue() {
        return document.getElementById("id-pessoa-gastos").value;
    }
    var cartaoOptions;

    //Preenche select2 editar gastos
    $('#campo-descricao-editar-gastos').select2({
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

    //Preenche select2 cadastrar gastos
    $('.lista-cartao-gastos').select2();
    $('#campo-descricao-gastos').select2({
        ajax: {
            url: '/Categoria/ObterTodosCategoriaJson',
            dataType: 'json'
        }
    });

    //preenche select Cartao na modal
    $('.gastos-pessoa').on('click', function () {
        $('#cadastrar-gastos-pessoa').modal('show');
        $.ajax({
            url: '/Cartao/ObterTodosJson',
            method: "GET",
            success: function (cartao) {
                var allCard = JSON.parse(cartao);
                for (var i = 0; i < allCard.data.length; i++) {

                    if (allCard.data[i].IdPessoas == getSessionValue()) {
                        cartaoOptions += '<option id="select-cartao" value="' + allCard.data[i].Id + '">' + ' conta: ' + allCard.data[i].Conta + ' -- ' + ' Banco: ' + allCard.data[i].Banco + '</option>';
                    }
                }
                $('#campo-numero-cartao').html(cartaoOptions);
                $('.lista-cartao-gastos').html(cartaoOptions);

            }
        });
    });

   

    $(".fechar-gastos").on('click', function () {
        limparCampos();
    });

    $('#salvar-gastos-pessoa').on('click', function () {
        if ($('#validarGasto').valid()) {
            $valor = $('#campo-valor-pessoa').val();
            $valor = $valor.replace(/\,/g, "");
            $valor = $valor.replace('.', ",");
            //console.log($valor);
            $.ajax({
                url: '/Pessoas/CadastroGastosModalPessoas',
                method: 'POST',
                data: {

                    "idCartao": $(".lista-cartao-gastos").val(),
                    "idCategoria": $(".descricao-gastos").val(),
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