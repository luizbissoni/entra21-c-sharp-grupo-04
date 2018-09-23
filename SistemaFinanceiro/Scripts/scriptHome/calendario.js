﻿$(document).ready(function () {

    var events = [];
    var selectedEvent = null;

    Pusher.logToConsole = false;

    var pusher = new Pusher('3d2e47e4a257a668b2cc', {
        cluster: 'us2',
        forceTLS: true
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('cadastroGastos', function (data) {
        var resultado = JSON.stringify(data);
        $('#calendario').fullCalendar('refetchEvents');
    });

    preencherFullCalendar();

    function preencherFullCalendar() {
        events = [];
        $.ajax({
            'url': '/Home/PreencherFullCalendar', /*"dataSrc": 'tabela',*/
            'method': 'GET',
            cache: false,
            success: function (pesquisa) {
                var resultado = JSON.parse(pesquisa);

                $.each(resultado.events, function (i) {
                    events.push({
                        id: resultado.events[i].id,
                        title: resultado.events[i].title,
                        start: resultado.events[i].start,
                        end: resultado.events[i].end,
                        color: resultado.events[i].color,
                    });
                });
                generationCalendar(events);
            },
            error: function () {
                alert("Erro ao preencher eventos no calendario.");
            }
        });
    }


    function generationCalendar(events) {
        $('#calendario').fullCalendar('destroy');
    $('#calendario').fullCalendar({
        locale: "pt-BR",
        height: 550,
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
        drop: function (date) {
            alert(date);
        },
        events: events,
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
            selectedEvent = event;
            $('#modal-visualizar-evento #title').text(event.title);
            $('#modal-visualizar-evento #start').text(moment(event.start).format("L LT"));
            $('#modal-visualizar-evento #end').text(moment(event.end).format("L LT"));
            $('#modal-visualizar-evento').modal('show');

            return false;
        },
        eventAfterRender: function (event, element, view) {
            var dataComparar = moment(event.start).format("L");
            //birthday = new Date('<somedate>');
            year = new Date(event.start).getFullYear();
            month = new Date(event.start).getMonth();
            day = new Date(event.start).getDate();
            moment(event.end).format("L");
        },

        });
    }

    var table = $('#tabela-teste').DataTable(); 
    //Exclui evento do calendario
    $('#excluirEvento').on('click', function () {
        if (selectedEvent != null && confirm('Tem certeza que deseja excluir esse evento ?')) {
            $.ajax({
                url: '/Home/ExcluirGastos',
                method: 'GET',
                data: {
                    Id: selectedEvent.id
                },
                success: function (excluirId) {
                    $('.modal-excluir-gasto-pessoa').modal('hide');
                    var data = JSON.parse(excluirId)
                    new PNotify({
                        text: 'Evento excluido com sucesso.',
                        type: 'success'
                    });
                    table.ajax.reload();
                    preencherFullCalendar();
                    $('#modal-visualizar-evento').modal('hide');

                },
                error: function () {
                    new PNotify({
                        text: 'Algo deu errado.',
                        icon: 'icofont icofont-info-circle',
                        type: 'error'
                    });
                }
            });
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
                limparCampos();
                $("#modal-cadastro-gasto-calendario").modal('hide');
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

    $('#editarEvento').on('click', function () {
        $('#modal-visualizar-evento').modal('hide');
        $('#modal-cadastro-gasto-calendario').modal('show');
    });

    $('.fechar-cadastro-gasto-calendario').on('click', function () {
        limparCampos();
    });

    $('#campo-calendario-numero-cartao').select2({
        placeholder: "selecione o cartão",
        ajax: {
            url: '/Cartao/ObterTodosParaJson',
            dataType: 'json',
        }
    }); //preenche select2 cartao calendario

    $('#campo-calendario-descricao').select2({
        placeholder: "selecione a categoria",
        ajax: {
            url: '/Categoria/ObterTodosCategoriaJson',
            dataType: 'json'
        },

    }); //preenche select2 categoria calendario

    function limparCampos() {

        $('#campo-calendario-descricao').val(null).trigger('change');
        $('#campo-calendario-numero-cartao').val(null).trigger('change');

        $('#campo-calendario-valor').val('');
        $('#calendario-descricao-despesa').val('');
    }
});