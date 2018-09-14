$('#form_validacao').validate({
    errorClass: "form-control-danger",
    validClass: "form-control-success",
    highlight: function (element) {
        jQuery(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
        jQuery(element).closest('.form-group').removeClass('has-error');
    },
    errorPlacement: function (error, element) {
        $(element).parent().append(error[0])
    },

    rules: {
        "numero-cartao": {
            required: true
        },
        "numero-conta": {
            required: true,
            rangelength: [3, 30]
        }
    },
    messages: {
        'numero-cartao': {
            required: 'Colocar um número para o cartão'
        },
        'numero-conta': {
            required: 'Colocar um número de conta',
            rangelength: 'número deve conter de {0} a {1} caracteres'
        }
    }
});