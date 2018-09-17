moment.locale('pt-BR');
var events = [];
var dataAtual = moment(Date()).format("DD/MM/YYYY HH:mm:ss");
//console.log(Date());
$('#campo-calendario-numero-cartao').select2();
$('#campo-calendario-descricao').select2();

function getSessionValue() {
    return document.getElementById("id-pessoa-gastos-calendario").value;
}


$('#calendario').fullCalendar({
    locale: "pt-br",
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
    },
    defaultDate: Date(),
    eventStartEditable: true,
    eventLimit: true,
    eventDurationEditable: true,
    navLinks: true, // can click day/week names to navigate views
    businessHours: true, // display business hours
    editable: true,
    selectHelper: true,
    selectable: true,
    select: function (start, end) {

        $('#start').val(start);
        $('#end').val(end);

        $("#modal-cadastro-gasto-calendario").modal('show');

    },
    droppable: true, // this allows things to be dropped onto the calendar
    drop: function () {

    },
    events: function (title, start, end, callback) {
        $.ajax({
            'url': '/Home/TabelaGastos', /*"dataSrc": 'tabela',*/
            'method': 'GET',
            success: function (pesquisa) {
                var resultado = JSON.parse(pesquisa);
                $.each(resultado.tabela, function (i) {
                    events.push({
                        title: resultado.tabela[i].categoria,
                        start: resultado.tabela[i].entrada,
                        end: moment(resultado.tabela[i].vencimento).format("DD/MM/YYYY HH:mm:ss"),
                        description: 'Gasto'
                    });

                });
                return callback(events, title, start, end);
            }
        });
    },
    eventRender: function (event, element) {
        if (element && event.title) {
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
        $('#modal-visualizar-evento #title').text(moment(event.title).format("DD/MM/YYYY HH:mm:ss"));
        $('#modal-visualizar-evento #start').text(moment(event.start).format("DD/MM/YYYY HH:mm:ss"));
        $('#modal-visualizar-evento #end').text(moment(event.end).format("DD/MM/YYYY HH:mm:ss"));
        $('#modal-visualizar-evento').modal('show');

        return false;
    },
    eventAfterRender: function (event, element, view) {
        var dataComparar = moment(event.start).format("DD/MM/YYYY HH:mm:ss");
        //birthday = new Date('<somedate>');
        year = new Date(event.start).getFullYear();
        month = new Date(event.start).getMonth();
        day = new Date(event.start).getDate();

         //console.log(dataComparar);
        if (dataComparar == dataAtual) {
            alert('Chegou o dia! >>> ' + event.title);
            console.log(moment(event.start).format("DD/MM/YYYY HH:mm:ss"));
        }
    }
});

$('#salvar-gastos-calendario').on('click', function () {

    $valor = $('#campo-calendario-valor').val();
    $valor = $valor.replace(/\,/g, "");
    $valor = $valor.replace(',', ".");

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
            //limparCampos();
            $("#cadastrar-gastos-pessoa").modal('hide');
            $('#tabela-teste').DataTable().ajax.reload();
            new PNotify({
                text: 'Gastos adicionado com sucesso.',
                type: 'success'
            });
        },
        error: function () {
            new PNotify({
                text: 'Algo deu errado.',
                icon: 'icofont icofont-info-circle',
                type: 'error'
            });
        }
    });
});
