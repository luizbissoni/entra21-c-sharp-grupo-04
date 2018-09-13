$(function () {

    $('[name=descricao]').select2();


    function getSessionValue() {
        return document.getElementById("id-pessoa").value;
    }

    $('.recebimento-pessoa').on('click', function () {
        $('#modal-recebimento-pessoa').modal('show');

        var categoriaOptions;

        $.ajax({
            url: '/Categoria/ObterTodosCategoriaJson',
            method: 'GET',
            success: function (dara) {
                var data = JSON.parse(dara);
                for (var i = 0; i < data.data.length; i++) {
                    // console.log(data.data[i].Id);
                    categoriaOptions += '<option id="valor-campo-descricao" value="' + data.data[i].Id + '">' + data.data[i].Nome + '</option>';
                }
                $('[name=descricao]').html(categoriaOptions);
            }
        });
    });

    $('#cadastrar-recebimento').on('click', function () {
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
            success: function (data) {
                //console.log(data);
                $('#modal-recebimento-pessoa').modal('hide');
                new PNotify({
                    title: 'Salvo com sucesso!',
                    text: 'Cadastro de Recebimento.',
                    icon: 'icofont icofont-info-circle',
                    type: 'success'
                });
            }
        });
   

   

    });

});