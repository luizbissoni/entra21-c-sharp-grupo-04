$(function () {

    function getSessionValue() {

        return document.getElementById("idpessoa-cartao").value;
    }

    $('.close fechar-modal-cartao').on('click', function () {
        limparCampos();
    });

    $('.cartao-pessoa').on('click', function () {
        $('#cadastrar-cartoes-pessoa').modal('show');
    });

    $('#salvar-cartao').on('click', function () {
        if ($('#validarCartao').valid()) {

        $.ajax({
            url: '/Pessoas/CadastroCartaoModalPessoas',
            method: 'POST',
            data: {

                id_pessoas: getSessionValue(),
                numero: $('#campo-numero-Cartao').val(),
                conta: $('input[name=numero-conta]').val(),
                bandeira: $('#campo-bandeira').val(),
                banco: $('#campo-banco').val()
            },
            success: function () {
                limparCampos();
                $('#cadastrar-cartoes-pessoa').modal('hide');
                new PNotify({
                    //title: 'Salvo com sucesso!',
                    text: 'Cartão cadastrado.',
                    //icon: 'icofont icofont-info-circle',
                    type: 'success'
                });
            }
        });
      }
    });

    function limparCampos() {
            $('#campo-numero-Cartao').val(),
            $('input[name=numero-conta]').val(),
            $('#campo-bandeira').val(),
            $('#campo-banco').val()
    }

});