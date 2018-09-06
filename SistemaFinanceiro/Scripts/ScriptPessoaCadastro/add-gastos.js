$(function () {
    $('.gastos-pessoa').on('click', function () {
        $('#cadastrar-gastos-pessoa').modal('show');
    });

    function getSessionValue() {
        return document.getElementById("id-pessoa-gastos").value;
    }

    function carregarSelected() {

        var categoriaOptions;

        $.ajax({
            url: '/Categoria/ObterTodosCategoriaJson',
            method: 'GET',
            success: function (dara) {
                var data = JSON.parse(dara);
                for (var i = 0; i < data.data.length; i++) {
                    console.log(data.data[i].Id);
                    categoriaOptions += '<option id="valor-campo-descricao-gastos" value="' + data.data[i].Id + '">' + data.data[i].Nome + '</option>';
                }
                $('#campo-descricao-gastos').html(categoriaOptions);
            }
        });

    };

    $('#salvar-gastos-pessoa').on('click', function () {
        $.ajax({
            url: '/Pessoas/ CadastroGastosModalPessoas',
            method: 'POST',
            data: {

                id_categoria: $('#valor-campo-descricao-gastos').val(),
                valor: $('#campo-valor').val(),
                entrada: $('#campo-data-entrada').val(),
                vencimento: $('#campo-vencimento').val()

            },
            success: {

            }

        });
    });


});