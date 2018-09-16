$(document).ready(function () {

    $('#validar-cartao').validate({
        Locate: 'PT_BR',
        errorClass: "form-control-danger",
        validClass: "form-control-success",
        highligth: function (element) {
            jQuery(element).closest('.form-group').addClass('has-error');
        },
        unhighligth: function (element) {
            jQuery(element).closest('.form-group').removeClass('has-error');
        },
        errorPlacement: function (error, element) {
            $(element).parent().append(error[0])
        },

        rules: {

            'campo-numero-Cartao': {
                number: true,
                required: true,
                rangelength: [2, 15]
            },
            'campo-numero-Conta': {
                number: true,
                required: true,
                rengelength: [2, 15]
            },
            'campo-bandeira': {
                required: true,
                rengelength: [5, 10]
            },
            'campo-banco': {
                required: true,
                rengelength: [4, 20]
            },
            messages: {

                'campo-numero-Cartao': {
                    required: "Numero de cartao deve ser informado"
                },
                'campo-numero-Conta': {
                    required: "Numero da conta deve ser informada"
                },
                'campo-bandeira': {
                    required: "Bandeira do cartao, deve ser informada"
                },
                'campo-banco': {
                    required: "Banco deve ser informado"
                }
            },
            tooltip_options: {
                'campo-numero-Cartao': { placement: 'right', html: true },
                 'campo-numero-Conta': { placement: 'right', html: true },
                     'campo-bandeira': { placement: 'right', html: true },
                        'campo-banco': { placement: 'right', html: true }
            },

        },
    });

    });