var events = [], dateRegex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;



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
        $('#modal-cadastro-gasto-calendario #calendario-data-entrada').val(moment(start).format('DD//MM/YYYY HH:mm:ss'));
        $('#modal-cadastro-gasto-calendario #calendario-data-termino').val(moment(end).format('DD//MM/YYYY HH:mm:ss'));
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

                        title: resultado.tabela[i].descricao,
                        start: (moment(resultado.tabela[i].entrada).format('DD//MM/YYYY HH:mm:ss')),
                        end: (moment(resultado.tabela[i].vencimento).format('DD//MM/YYYY HH:mm:ss'))

                    });

                });
                console.log(events);
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