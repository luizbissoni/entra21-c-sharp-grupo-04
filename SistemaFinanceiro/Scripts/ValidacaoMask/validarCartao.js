$(function () {

    $('#validarCartao').validate({

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
            'numero-cartao': {
                required: true,
                number: true
            },
            'numero-conta': {
                rangelength: [2, 12],
                required: true,
                number: true
            },
            'bandeira': {
                rangelength: [4, 10],
                required: true
            },
            'banco': {
                rangelength: [3, 9],
                required: true
            }
        },

        messages: {

            'numero-cartao': {
                required: "Este campo é Requerido",
                number: "Somente números"
            },
            'numero-conta': {
                required: "Este campo é Requerido",
                rangelength: "Sua conta deve ter entra 2 e 12 caracteres",
                number: "Este valor é em números"
            },
            'bandeira': {
                rangelength: "A bandeira deve conter entre 4 e 10 caracteres",
                required: "Este campo é Requerido"
            },
            'banco': {
                rangelength: "Sua conta deve ter entra 3 e 9 caracteres",
                required: "Este campo é Requerido"
            }
        },

    });
});