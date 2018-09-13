$(document).ready(function () {

    var valorRecebido, valorGasto, porcentagemGasto;
   
   // $(".porcento").attr("data-percent", porcentagemGasto);

    $.ajax({
        url: '/Home/TotalRecebido',
        method: 'GET',
        success: function (resultado) {
            var total = JSON.parse(resultado);
            //console.log(total);
            if (total.tabela[0].total > 0) {

                $('h2.saldo-recebido').number('R$' + total.tabela[0].total, 2, ',', '.')
                //$('.saldo-recebido').text('R$' + total.tabela[0].total);
                valorRecebido = total.tabela[0].total;
            } else {
                $('.saldo-recebido').text('R$' + 00,00);
                valorRecebido = total.tabela[0].total;
            }
           
        }
    });

    $.ajax({
        url: '/Home/TotalGastos',
        method: 'GET',
        success: function (resultado) {
            var total = JSON.parse(resultado);
            $('.total-gastos').text('R$' + total.tabela[0].total);
            //console.log(total.tabela[0].total);
            valorGasto = total.tabela[0].total
          
            porcentagemGasto = ((valorRecebido - valorGasto) / valorRecebido) * 100;
            $('#meu-teste').data('percente')
            $('#meu-teste').attr('data-percent', porcentagemGasto);
            //console.log(porcentagemGasto);
        }
    });

    $.ajax({
        url: '/Home/SetorMaiorGasto',
        method: 'GET',
        success: function (resultado) {
            var total = JSON.parse(resultado);
            //console.log(total);
            // $('.setor-maior-gasto').text('R$' + total.tabela[0].total);
        }
    });


    $.ajax({
        url: '/Home/TabelaGastos',
        method: 'GET',
        success: function (dara) {
            var data = JSON.parse(dara);
            //console.log(data);

        }
    });
    

});


