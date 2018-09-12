
var events = [];

var categoriaOptions;
var cartaoOptions;

$('#campo-calendario-numero-cartao').select2();
$('#campo-calendario-descricao').select2();

function getSessionValue() {
    return document.getElementById("id-pessoa-gastos-calendario").value;
}

$('#calendario').fullCalendar({
   
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
    },
    defaultDate: Date(),
    eventStartEditable: true,
    navLinks: true, // can click day/week names to navigate views
    businessHours: true, // display business hours
    editable: true,
    selectHelper: true,
    selectable: true,
    select: function (start, end) {
        $('#modal-cadastro-gasto-calendario #start').val(moment(start).format('DD/MM/YYYY HH:mm:ss'));
        $('#modal-cadastro-gasto-calendario #end').val(moment(end).format('DD/MM/YYYY HH:mm:ss'));
        
        $("#modal-cadastro-gasto-calendario").modal('show');

    },
    droppable: true, // this allows things to be dropped onto the calendar
    drop: function () {

    },
    events: function (title, start, end, callback) {
        $.ajax({
            'url': '/Home/TabelaGastos', /*"dataSrc": 'tabela',*/
            'method': 'POST',
            success: function (pesquisa) {
                var resultado = JSON.parse(pesquisa);

                $.each(resultado.tabela, function (i) {
                    events.push({

                        title: resultado.tabela[i].descricao,
                        start: (moment(resultado.tabela[i].entrada).format('DD/MM/YYYY HH:mm:ss')),
                        end: (moment(resultado.tabela[i].vencimento).format('DD/MM/YYYY HH:mm:ss'))

                    });

                });
                // console.log(events);
                return callback(events);
            }
        });
    },
    eventRender: function (event, element) {
        if (element && event.description) {
            element.qtip({
                content: event.title,
                hide: {
                    fixed: true,
                    delay: 500
                }
            });
        }
    },
    eventClick: function (event) {
        $('#modal-visualizar-evento').modal('show');
        //$('#').text(envent.id);
        //$('#campo-title #title').text(envent.title);
        //$('#campo-entrada #start').text(envent.start);
        //$('#campo-vancimento #end').text(envent.end);

        return false;
    }
});

$.ajax({
    url: '/Categoria/ObterTodosCategoriaJson',
    method: 'GET',
    success: function (dara) {
        var data = JSON.parse(dara);
        for (var i = 0; i < data.data.length; i++) {
            // console.log(data.data[i].Id);
            categoriaOptions += '<option id="valor-campo-descricao-gastos" value="' + data.data[i].Id + '">' + data.data[i].Nome + '</option>';
        }

        $('#campo-calendario-descricao').html(categoriaOptions);
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

        $('#campo-calendario-numero-cartao').html(cartaoOptions)
        //console.log(allCard.data);
    }
});

$('#salvar-gastos-calendario').on('click', function () {

    $valor = $('#campo-calendario-valor').val();
    //$valor = $valor.replace(/\,/g, "");
    //$valor = $valor.replace(',', ".");
   
    $.ajax({
        url: '/Pessoas/CadastroGastosModalPessoas',
        method: 'POST',
        data: {

            "idCartao": $("#campo-calendario-numero-cartao").val(),
            "idCategoria": $("#campo-calendario-descricao").val(),
            "Valor": $valor,
            "descricao": $('#calendario-descricao-despesa').val(),
            "entrada": $('#start').val(),
            "vencimento": $('#end').val()

        },
        success: function () {
            limparCampos();
            $("#cadastrar-gastos-pessoa").modal('hide');
            $('#tabela-teste').DataTable().ajax.reload();
            new PNotify({
                //title: 'Salvo com sucesso!',
                text: 'Gastos adicionado com sucesso.',
                //icon: 'icofont icofont-info-circle',
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
