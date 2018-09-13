$(document).ready(function () {

    function getSessionValue() {
        return document.getElementById("id-pessoa-gastos").value;
    }

    var categoriaOptions;
    var cartaoOptions;


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

    $('.calendario-editar-gasto').on('click', function () {

        $.ajax({
            url: '/Home/EditarGastos',
            method: 'GET',
            data: {
                Id: getSessionValue
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

