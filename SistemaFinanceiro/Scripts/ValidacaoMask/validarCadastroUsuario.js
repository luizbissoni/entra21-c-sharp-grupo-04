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
                rengelenght: [8,100]
            },
            'nascimento': {
                required: true,
            },
            'telefone': {
                required: true,
            },
            'new-cpf': {
                required: true,
            },
            'cep': {
                required: true,
            },
            'email': {
                email: true,
                required: true
            },
            'usuario': {
                required: true,
            },
            'senha': {
                password: true,
            },
            'repeatinputPassword': {
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
            'cpf': {
                required: "Este campo é requerido.",
            },
            'cep': {
                required: "Este campo é requerido.",
            },
            'email': {
                email: true,
                required: "Este campo é requerido."
            },
            'usuario': {
                required: "Este campo é requerido.",
            },
            'senha': {
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