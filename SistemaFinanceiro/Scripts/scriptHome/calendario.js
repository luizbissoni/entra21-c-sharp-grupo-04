$(document).ready(function () {
    $('#calendario-numero-cartao-editar').select2({
        placeholder: "selecione o cartão",
        ajax: {
            url: '/Cartao/ObterTodosParaJson',
            dataType: 'json',
        }
    }); //preenche select2 cartao calendario

    $('#campo-calendario-numero-cartao').select2({
        placeholder: "selecione o cartão",
        ajax: {
            url: '/Cartao/ObterTodosParaJson',
            dataType: 'json',
        }
    }); //preenche cartao select2 cadastro de gastos no calendario

    $('#campo-calendario-descricao-editar').select2({
        placeholder: "selecione a categoria",
        ajax: {
            url: '/Categoria/ObterTodosCategoriaJson',
            dataType: 'json'
        },

    }); //preenche select2 categoria calendario

    $('#campo-calendario-descricao').select2({

        placeholder: "selecione a categoria",
        ajax: {
            url: '/Categoria/ObterTodosCategoriaJson',
            dataType: 'json'
        },
        createTag: function (params) {
            var term = $.trim(params.term);

            if (term === '') {
                return null;
            }

            return {
                id: term,
                text: term,
                newTag: true, // add additional parameters
            }
            console.log(term);
        }
        //createSearchChoice: function (term, data) {
        //    if ($(data).filter(function () {
        //        return this.text.localeCompare(term) === 0;
        //    }).length === 0) {
        //        return { id: term, text: term };
        //        console.log(term);
        //    }
        //},

    });//preenche categoria select2 cadastro de gastos no calendario

    var events = [];
    var selectedEvent = null;

    //pusher inicio
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
    //pusher fim



    preencherFullCalendarGastos();
    preencherFullCalendarRecebimento();

    //EVENTOS PARA CALENDARIO
    function preencherFullCalendarRecebimento() {
        events = [];
        $.ajax({
            'url': '/Home/PreencherFullCalendarRecebimento', /*"dataSrc": 'tabela',*/
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
    function preencherFullCalendarGastos() {
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

    //CALENDARIO
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

                console.log(event);

                $('#modal-visualizar-evento #title').text(event.title);
                $('#modal-visualizar-evento #start').text(moment(event.start).format("L LT"));
                $('#modal-visualizar-evento #end').text(moment(event.end).format("L LT"));
                $('#modal-visualizar-evento').modal('show');

                return false;
            },
            eventAfterRender: function (event, element, view) {
                //var dataComparar = moment(event.start).format("L");
                ////birthday = new Date('<somedate>');
                //year = new Date(event.start).getFullYear();
                //month = new Date(event.start).getMonth();
                //day = new Date(event.start).getDate();
                //moment(event.end).format("L");
            },
            eventDrop: function (event) {

                var data = {
                    Id: event.id,
                    entrada: moment(event.start).format('DD/MM/YYYY'),
                    vencimento: event.end != null ? moment(event.end).format('DD/MM/YYYY') : moment(event.start).format('DD/MM/YYYY'),
                };
                updateEvento(data);
            }

        });
    }


    //UPDATE AO ARRASTAR EVENTO
    function updateEvento(data) {

        var dataEntrada = data.entrada, dataTermino = data.vencimento;

        $.ajax({
            url: '/Home/EditarGastos',
            method: 'GET',
            data: {
                Id: data.Id
            },
            async: false,
            success: function (pesquisa) {
                var resultado = JSON.parse(pesquisa);
                console.log(data);

                var updateData = {
                    Id: resultado.gastos.Id,
                    idCartao: resultado.gastos.IdCartao,
                    idCategoria: resultado.gastos.IdCategoria,
                    Valor: resultado.gastos.Valor,
                    Entrada: dataEntrada,
                    Vencimento: dataTermino,
                    descricao: resultado.gastos.Descricao,
                }
                postUpdateGasto(updateData);
            },
            error: function () {
                new PNotify({
                    text: 'Algo deu errado.',
                    icon: 'icofont icofont-info-circle',
                    type: 'error'
                });
            }
        });

        function postUpdateGasto(data) {
            $.ajax({
                url: '/Home/UpdateGastos',
                method: 'POST',
                data: data,
                success: function () {
                    table.ajax.reload();
                    preencherFullCalendar();
                    new PNotify({
                        text: 'Gasto editado com sucesso.',
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
        }
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

    //BOTAO SALVAR EDIÇÃO GASTOS NO CALENDARIO
    $('#botao-modal-editar-gasto-calendario').on('click', function () {
        $valor = $('#campo-calendario-valor-editar').val(),
            $valor = $valor.replace(/\,/g, ""),
            $valor = $valor.replace('.', ","),
            $.ajax({
                url: '/Home/UpdateGastos',
                method: 'POST',
                data: {
                    Id: selectedEvent.id,
                    idCartao: $('#calendario-numero-cartao-editar').val(),
                    idCategoria: $('#campo-calendario-descricao-editar').val(),
                    Valor: $valor,
                    entrada: $('#start-editar').val(),
                    vencimento: $('#end-editar').val(),
                    descricao: $('#calendario-descricao-despesa-editar').val()
                },
                success: function () {
                    table.ajax.reload();
                    preencherFullCalendar();
                    $('#modal-editar-gasto-calendario').modal('hide');
                    new PNotify({
                        text: 'Gasto editado com sucesso.',
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

    //CADASTRAR GASTOS CALENDARIO
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

    //MODAL EDITAR GASTOS CALENDARIO
    $('#editarEvento').on('click', function () {
        $('#modal-visualizar-evento').modal('hide');
        $.ajax({
            url: '/Home/EditarGastos',
            method: 'GET',
            data: {
                Id: selectedEvent.id
            },
            async: false,
            success: function (pesquisa) {
                var resultado = JSON.parse(pesquisa);
                $('#modal-editar-gasto-calendario #calendario-numero-cartao-edita').append(new Option(resultado.gastos.cartao.Conta, resultado.gastos.IdCartao, false, false)).val(resultado.gastos.IdCartao).trigger('change');
                $('#modal-editar-gasto-calendario #campo-calendario-descricao-editar').append(new Option(resultado.gastos.Categoria.Nome, resultado.gastos.IdCategoria, false, false)).val(resultado.gastos.IdCategoria).trigger('change');
                $('#modal-editar-gasto-calendario #campo-calendario-valor-editar').val(resultado.gastos.Valor);
                $('#modal-editar-gasto-calendario #calendario-descricao-despesa-editar').val(resultado.gastos.Descricao);
                $('#modal-editar-gasto-calendario #start-editar').val(resultado.gastos.Entrada);
                $('#modal-editar-gasto-calendario #end-editar').val(resultado.gastos.Vencimento);
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

    $('.fechar-cadastro-gasto-calendario').on('click', function () {
        limparCampos();
    });



    function limparCampos() {

        $('#campo-calendario-descricao').val(null).trigger('change');
        $('#campo-calendario-numero-cartao').val(null).trigger('change');

        $('#campo-calendario-valor').val('');
        $('#calendario-descricao-despesa').val('');
    }

});


