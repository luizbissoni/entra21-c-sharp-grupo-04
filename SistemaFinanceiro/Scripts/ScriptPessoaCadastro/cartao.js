$(function () {

    function getSessionValue() {
        return document.getElementById("id-pessoa").value;
    }

    $('.cartao-pessoa').on('click', function () {
        $('#cadastrar-cartoes-pessoa').modal('show');
    });

    $('#salvar-cartao').on('click', function () {
        $.ajax({
            url: '/Pessoas/CadastroCartaoModalPessoas',
            method: 'POST',
            data: {

                id_pessoas: getSessionValue(),
                numero: $('#campo-numero-Cartao').val(),
                conta: $('#campo-numero-conta').val(),
                bandeira: $('#campo-bandeira').val(),
                banco: $('#campo-banco').val()
            },
            success: function () {
                $('#cadastrar-cartao-pessoa').modal('hide');

                new PNotify({
                    //title: 'Salvo com sucesso!',
                    text: 'Cartão cadastrado.',
                    icon: 'icofont icofont-info-circle',
                    type: 'success'
                });
            }

        });


    });


});