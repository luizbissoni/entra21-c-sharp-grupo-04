$(function () {
    $("#modal-index-pessoas").on("click", function () {
        if ($("#modal-cadastro-pessoas").length == 0) {
            $.ajax({
                url: "/Pessoas/Cadastro",
                method: "get",
                success: function (data) {
                    $("body").append(data);
                    $("modal-cadastro-pessoas").modal('show');
                }
            });
        } else {
            $('modal-cadastro-pessoas').modal('show');

        }
    });

    $('body').on('click', '#modal-savar-pessoa', function () {
        $.ajax({
            url: '/Pessoas/Cadastro',
            method: 'post',
            data: {
                nome: $('#nome').val(),
                idade: $('#idade').val(),
                salario: $('#salario').val()
            },
            success: function (data) {
                var resultado = JSON.parse(data);
                limparCampos();
                $('#modal-cadastro-pessoas').modal('hide');
                adicionarLinhaTabela($('nome'.val(), $('#idade').val(), $('#salario').val(), resultado.id));
                }
            });
    });

    function adicionarLinhaTabela(nome, idade, salario, id) {
        $registro = "<tr>";
        $registro += "<td>" + nome + "</td>";
        $registro += "<td>" + idade + "</td>";
        $registro += "<td>" + salario + "</td>";
        $registro += "<td><a href=\"/funcionario/Editar?id=" + id + "\" >Editar</a></td>";
        $registro += "</tr>";
        $("table").append($registro);
    }

    function limparCampos() {
        $("#nome").val("");
        $("#idade").val("");
        $("#salario").val("");
    }




})