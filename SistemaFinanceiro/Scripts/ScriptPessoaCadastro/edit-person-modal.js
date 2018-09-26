$(document).ready(function () {


    //editar do index pessoa
    $('.editar-pessoa').on('click', function () {
        $.ajax({
            url: '/Login/GetIdSession',
            method: 'GET',
            success: function (data) {
               
                var pessoa = JSON.parse(data);

                $('#editar-pessoa-modal').modal('show');
                $('#editar-pessoa-modal-campo-nome').val(pessoa.Nome);
                $('input[name=nascimento]').val(pessoa.Nascimento);
                if (pessoa.Sexo == 'M') {
                    $('#editar-pessoa-modal-campo-sexo-masculino').attr('checked', 'checked');
                } else {
                    $('#editar-pessoa-modal-campo-sexo-feminino').attr('checked', 'checked');
                }
                $('#editar-pessoa-modal-campo-cpf').val(pessoa.CPF);
                $('#editar-pessoa-modal-campo-telefone').val(pessoa.Telefone);
                $('#editar-pessoa-modal-campo-cep').val(pessoa.Cep);
            }
         
        });
    });


    $('body').on('click', '#salvar-cadastro-modal', function () {

        $.ajax({
            url: '/Pessoas/Update',
            method: 'POST',
            data: {
                nome: $('#editar-pessoa-modal-campo-nome').val(),
                nascimento: $('#editar-pessoa-modal-campo-nascimento').val(),
                sexo: $('input[name="sexo-masculino"]:checked').val(),
                cpf: $('#editar-pessoa-modal-campo-cpf').val(),
                telefone: $('#editar-pessoa-modal-campo-telefone').val(),
                cep: $('#editar-pessoa-modal-campo-cep').val(),
                
                
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

