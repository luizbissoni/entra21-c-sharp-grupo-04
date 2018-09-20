$(document).ready(function () {
    var events = [];

    Pusher.logToConsole = true;

    var pusher = new Pusher('3d2e47e4a257a668b2cc', {
        cluster: 'us2',
        forceTLS: true
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function (data) {
        var resultado = JSON.stringify(data);
        calendario();

    });

    calendario();

    $('#campo-calendario-numero-cartao').select2({
        placeholder: "selecione o cartão",
        ajax: {
            url: '/Cartao/ObterTodosParaJson',
            dataType: 'json',
        }
    });
    $('#campo-calendario-descricao').select2({
        placeholder: "selecione a categoria",
        ajax: {
            url: '/Categoria/ObterTodosCategoriaJson',
            dataType: 'json'
        },

    });

    function getSessionValue() {
        return document.getElementById("id-pessoa-gastos-calendario").value;
    }
    function calendario() {
        $('#calendario').fullCalendar({
            locale: "pt-BR",
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
            },

            eventStartEditable: true,
            eventLimit: true,
            eventDurationEditable: true,
            navLinks: true, // can click day/week names to navigate views
            businessHours: true, // display business hours
            editable: true,
            selectHelper: true,
            selectable: true,
            select: function (start, end) {

                $('#start').val(moment(start).format("L LT"));
                $('#end').val(moment(end).format("L LT"));

                $("#modal-cadastro-gasto-calendario").modal('show');

            },
            droppable: true, // this allows things to be dropped onto the calendar
            drop: function () {

            },
            events: function (title, start, end, callback) {
                $('.fc-event').remove();
                $.ajax({
                    'url': '/Home/PreencherFullCalendar', /*"dataSrc": 'tabela',*/
                    'method': 'GET',
                    cache: false,
                    success: function (pesquisa) {
                        var resultado = JSON.parse(pesquisa);
                        $.each(resultado.events, function (i) {
                            events.push({
                                title: resultado.events[i].title,
                                start: resultado.events[i].start,
                                end: resultado.events[i].end,
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
                $('#modal-visualizar-evento #title').text(event.title);
                $('#modal-visualizar-evento #start').text(moment(event.start).format("L LT"));
                $('#modal-visualizar-evento #end').text(moment(event.end).format("L LT"));
                $('#modal-visualizar-evento').modal('show');

                return false;
            },
            //eventAfterRender: function (event, element, view) {
            //    var dataComparar = moment(event.start).format("L LT");
            //    //birthday = new Date('<somedate>');
            //    year = new Date(event.start).getFullYear();
            //    month = new Date(event.start).getMonth();
            //    day = new Date(event.start).getDate();

            //     //console.log(dataComparar);
            //    if (dataComparar == dataAtual) {
            //        alert('Chegou o dia! >>> ' + event.title);
            //        console.log(moment(event.start).format("L LT"));
            //    }
            //}
        });
    }

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
                "entrada": moment($('#start').val()).format("DD/MM/YYYY HH:mm:ss"),
                "vencimento": moment($('#end').val()).format("DD/MM/YYYY HH:mm:ss")

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
});