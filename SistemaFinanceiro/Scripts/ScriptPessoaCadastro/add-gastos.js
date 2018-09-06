$(function () {

    function getSessionValue() {
        return document.getElementById("id-pessoa-gastos").value;
    }

    $('.gastos-pessoa').on('click', function () {
        $('#cadastrar-gastos-pessoa').modal('show');
        //carregarSelected('.descricao-gastos');

        var categoriaOptions;
        var cartaoOptions;

        $.ajax({
            url: '/Categoria/ObterTodosCategoriaJson',
            method: 'GET',
            success: function (dara) {
                var data = JSON.parse(dara);
                for (var i = 0; i < data.data.length; i++) {
                    // console.log(data.data[i].Id);
                    categoriaOptions += '<option id="valor-campo-descricao-gastos" value="' + data.data[i].Id + '">' + data.data[i].Nome + '</option>';
                }
                $('#campo-descricao-gastos').html(categoriaOptions);
            }
        });

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
                //console.log(allCard.data);
            }
        });
    });

    $('#salvar-gastos-pessoa').on('click', function () {
        $.ajax({
            url: '/Pessoas/CadastroGastosModalPessoas',
            method: 'POST',
            data: {

                id_cartao : $("#select-cartao").val(),
                id_categoria : $('#valor-campo-descricao-gastos').val(),
                valor : $('#campo-valor').val(),
                entrada : $('#campo-data-entrada').val(),
                vencimento: $('#campo-vencimento').val()
            },
            success: function() {
                $("#cadastrar-gastos-pessoa").modal('hide');
                new PNotify({
                    //title: 'Salvo com sucesso!',
                    text: 'Gastos adicionado com sucesso.',
                    icon: 'icofont icofont-info-circle',
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