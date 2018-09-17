$(function () {
    var sexos;

    if ($('input[name="Sexo-feminino"]:checked').val()) {
        sexos = 'F';
    } else {
        sexos = 'M';
    }

    $('body').on('click', '#salvar-cadastro-conta', function () {
        $.ajax({
            url: '/Login/CreateNewUsers',
            method: 'POST',
            data: {
                nome: $('#cadastro-nome').val(),
                nascimento: $('#cadastro-nascimento').val(),
                sexo: sexos,
                cpf: $('#cadastro-cpf').val(),
                telefone: $('#cadastro-telefone').val(),
                cep: $('#cadastro-cep').val(),

                usuario: $('#inputUser').val(),
                senha: $('#inputPassword').val(),
                email: $('#inputEmail').val()
            },
            success: function (data) {
                limpaCampos();
                $('#cadastro-pessoa').modal('hide');
                new PNotify({
                    text: 'Salvo com sucesso!',
                    icon: 'icofont icofont-info-circle',
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

    $('#close-cadastro').on('click', function () {
        limpaCampos();
    });

    function limpaCampos() {
        $('#cadastro-sexo-feminino').prop('checked', false);
        $('#cadastro-sexo-masculino').prop('checked', false);
        $('#cadastro-nome').val();
        $('#cadastro-nascimento').val();
        $('#cadastro-cpf').val();
        $('#cadastro-telefone').val();
        $('#cadastro-cep').val();
        $('#inputUser').val();
        $('#inputPassword').val();
        $('#inputEmail').val();
    };



    //busca cep ao sair do campo cep
    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
        $("#ibge").val("");
    }

    //Quando o campo cep perde o foco.
    $("#cep").blur(function () {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#rua").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");
                $("#ibge").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#rua").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
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


