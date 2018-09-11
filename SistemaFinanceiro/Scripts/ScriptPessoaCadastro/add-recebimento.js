$(function () {
    $('#campo-descricao').select2();


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
                $('#campo-descricao').html(categoriaOptions);
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
                idCategoria: $('.descricao-recebimento').val(),
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



    //var table = $('#tabela-pessoas').DataTable();
    //var dataRow;

    //$('#tabela-pessoas tbody').on('click', 'tr', function () {

    //    dataRow = table.row(this).data();
    //    $.ajax({
    //        url: '/Pessoas/CadastroRecebimento',
    //        method: 'POST',
    //        data: {
    //        },
    //        success: function (preencher) {


    //        }
    //    });

    //});


    //$('#cadastrar-recebimento').on('click', function () {
    //    $.ajax({
    //        url: '/Pessoas/CadastroRecebimento',
    //        method: 'POST',
    //        data: {
    //            id_pessoas: dataRow.Id,
    //            id_categoria:
    //            valor:
    //            data:

    //        },


    //    });



    //});
});