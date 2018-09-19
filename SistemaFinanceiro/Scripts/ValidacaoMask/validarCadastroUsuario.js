$(function () {
    $('#cadastro-telefone').mask('(00) 0000-0000');
    $('#cadastro-cpf').mask('000.000.000-00', { reverse: true });

    $('#form-cadastro-pessoa').validate({
        errorClass: "form-control-danger",
        validClass: "form-control-success",
        highlight: function (element) {
            jQuery(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            jQuery(element).closest('.form-group').removeClass('has-error');
            $('[data-toggle="tooltip"], .tooltip').tooltip("hide");

        },
        errorPlacement: function (error, element) {
            $(element).parent().append(error[0])
        },
        rules: {
            'nome': {
                required: true,
            },
            'nascimento': {
                required: true,
            },
            'telefone': {
                required: true,
            },
            'new-CPF': {
                required: true,
            },
            'Cep': {
                required: true,
            },
            'emailInput': {
                email: true,
                required: true
            },
            'userInput': {
                required: true,
            },
            'passwordInput': {
                password: true,
            },
            'repeatPasswordInput': {
                required: true,
                equalTo:'#inputPassword'
            }
        },
        messages: {
            'nome': {
                required: "Este campo é requerido.",
            },
            'nascimento': {
                required: "Este campo é requerido.",
            },
            'telefone': {
                required: "Este campo é requerido.",
            },
            'new-CPF': {
                required: "Este campo é requerido.",
            },
            'Cep': {
                required: "Este campo é requerido.",
            },
            'emailInput': {
                email: true,
                required: "Este campo é requerido."
            },
            'userInput': {
                required: "Este campo é requerido.",
            },
            'passwordInput': {
                required: "Este campo é requerido.",
                password: true,
            },
            'repeatPasswordInput': {
                required: "Este campo é requerido.",
                equalTo: 'Senhas não conferem'
            }
        }
       
       

    });

    //fecha todo os tootips quando fecha a modal
    $('.close-cadastro').on('click', function () {
        $('[data-toggle="tooltip"], .tooltip').tooltip("hide");
    });
});