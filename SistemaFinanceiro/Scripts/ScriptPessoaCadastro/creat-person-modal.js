$(function () {

    $('body').on('click', '#salvar-cadastro-modal', function () {
        $.ajax({
            url: '/Pessoas/CadastroModalPessoas',
            method: 'POST',
            data: {
                nome: $('#campo-nome').val(),
                nascimento: $('#campo-nascimento').val(),
                sexo: $('input[name="Pessoas.Sexo"]:checked').val(),
                cpf: $('#campo-cpf').val(),
                telefone: $('#campo-telefone').val(),
                cep: $('#cep').val(),

                Conta: $('.conta').val(),
                Numero: $('.numero').val(),
                Banco: $('#banco').val(),
                Bandeira: $('#bandeira').val()
            },
            success: function (data) {
                limpaCampos();
                $('#cadastrar-pessoa-modal').modal('hide');
                $('#tabela-pessoas').DataTable().ajax.reload();
                new PNotify({
                    //title: 'Salvo com sucesso!',
                    text: 'Salvo com sucesso!',
                    icon: 'icofont icofont-info-circle',
                    type: 'success'
                });
            }
        });
    });
    $('#cancelar-cadastro-pessoa').on('click', function () {
        limpaCampos();
    });

    //$('body').on('click', '.salvar-cartao-modal', function () {
    //    $.ajax({
    //        url: '/Pessoas/CadastroModalPessoas',
    //        method: 'POST',
    //        data: {

    //            Conta: $('#Conta').val(),
    //            Numero: $('#numero').val(),
    //            Banco: $('#banco').val(),
    //            Bandeira: $('#bandeira').val(),
    //        },
    //        success: function (data) {

    //            $('#cadastrar-carto-modal').modal('hide');
    //        }
    //    });

    //});

    function limpaCampos() {

        $('#campo-sexo-feminino').prop('checked', false);
        $('#campo-sexo-masculino').prop('checked', false);
        $('#campo-nome').val('');
        $('#campo-nascimento').val('');
        $('#campo-cpf').val('');
        $('#campo-telefone').val('');
        $('#cep').val('');
    };

    //Preenche o campo da idade
    //document.getElementById("campo-nascimento").addEventListener('change', function () {
    //    var data = new Date(this.value);
    //    if (isDate_(this.value) && data.getFullYear() > 1900)
    //        document.getElementById("campo-idade").value = calculateAge(this.value);
    //});

    //function calculateAge(dobString) {
    //    var dob = new Date(dobString);
    //    var currentDate = new Date();
    //    var currentYear = currentDate.getFullYear();
    //    var birthdayThisYear = new Date(currentYear, dob.getMonth(), dob.getDate());
    //    var age = currentYear - dob.getFullYear();
    //    if (birthdayThisYear > currentDate) {
    //        age--;
    //    }
    //    return age;
    //}

    //function calcular(data) {
    //    var data = document.form.nascimento.value;
    //    alert(data);
    //    var partes = data.split("/");
    //    var junta = partes[2] + "-" + partes[1] + "-" + partes[0];
    //    document.form.idade.value = (calculateAge(junta));
    //}

    //var isDate_ = function (input) {
    //    var status = false;
    //    if (!input || input.length <= 0) {
    //        status = false;
    //    } else {
    //        var result = new Date(input);
    //        if (result == 'Invalid Date') {
    //            status = false;
    //        } else {
    //            status = true;
    //        }
    //    }
    //    return status;
    //}
    ////fim campo idade

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

    
    //new PNotify({
    //    //title: 'Salvo com sucesso!',
    //    text: 'Salvo com sucesso!'

    //});

});