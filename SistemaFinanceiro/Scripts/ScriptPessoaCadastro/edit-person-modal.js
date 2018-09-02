$(function () {

    var table = $('#tabela-pessoas').DataTable();
    var dataRow;
    $('#tabela-pessoas tbody').on('click', 'tr', function () {
        var id = $(this).id;
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        dataRow = table.row(this).data();
    });

    //editar no perfil do usuario
    $('#editar-pessoa-perfil').on('click', function () {
        $.ajax({
            url: '/Pessoas/Editar',
            method: 'GET',
            data: { id: dataRow.Id },
            success: function (Complete) {
                var data = JSON.parse(Complete);
                $('#editar-pessoa-modal-campo-nome').val(data.Nome);
                $('#editar-pessoa-modal-campo-nascimento').val(data.Nascimento);
                if (data.Sexo == 'M') {
                    $('#editar-pessoa-modal-campo-sexo-feminino').attr('checked', 'checked');
                } else {
                    $('#editar-pessoa-modal-campo-sexo-masculino').attr('checked', 'checked');
                }
                $('#editar-pessoa-modal-campo-cpf').val(data.CPF);
                $('#editar-pessoa-modal-campo-telefone').val(data.Telefone);
                $('#editar-pessoa-modal-campo-cep').val(data.Cep);
            }
        });
    });

    //editar do index pessoa
    $('.editar-pessoa').on('click', function () {
        $.ajax({
            url: '/Pessoas/Editar',
            method: 'GET',
            data: {
                id: dataRow.Id
            },
            success: function (preencher) {
                console.log(preencher);
                var data = JSON.parse(preencher);
                $('#editar-pessoa-modal').modal('show');
                $('#editar-pessoa-modal-campo-nome').val(data.Nome);
                $('#editar-pessoa-modal-campo-nascimento').val(data.Nascimento);
                if (data.Sexo == 'M') {
                    $('#editar-pessoa-modal-campo-sexo-feminino').attr('checked', 'checked');
                } else {
                    $('#editar-pessoa-modal-campo-sexo-masculino').attr('checked', 'checked');
                }
                $('#editar-pessoa-modal-campo-cpf').val(data.CPF);
                $('#editar-pessoa-modal-campo-telefone').val(data.Telefone);
                $('#editar-pessoa-modal-campo-cep').val(data.Cep);
            }
        });
    });


    $('body').on('click', '#salvar-editar-pessoas-modal', function () {
        $.ajax({
            url: '/Pessoas/Update',
            method: 'post',
            data: {
                nome: $('#editar-pessoa-modal-campo-nome').val(),
                nascimento: $('#editar-pessoa-modal-campo-nascimento').val(),
                sexo: $('#campo-sexo').val(),
                cpf: $('#editar-pessoa-modal-campo-cpf').val(),
                telefone: $('#editar-pessoa-modal-campo-telefone').val(),
                cep: $('#editar-pessoa-modal-campo-cep').val()
            },
            success: function (data) {
                $('#editar-pessoa-modal').modal('hide');
            }
        });
    });

    //busca cep ao sair do campo cep
    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#rua-editar").val("");
        $("#bairro-editar").val("");
        $("#cidade-editar").val("");
        $("#uf-editar").val("");
        $("#ibge").val("");
    }

    //Quando o campo cep perde o foco.
    $("#editar-pessoa-modal-campo-cep").blur(function () {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#rua-editar").val("...");
                $("#bairro-editar").val("...");
                $("#cidade-editar").val("...");
                $("#uf-editar").val("...");
                $("#ibge").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#rua-editar").val(dados.logradouro);
                        $("#bairro-editar").val(dados.bairro);
                        $("#cidade-editar").val(dados.localidade);
                        $("#uf-editar").val(dados.uf);
                        $("#ibge").val(dados.ibge);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
    //fim buscador cep



});

