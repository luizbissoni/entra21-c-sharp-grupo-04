$(function () {

    $('#validarGasto').validate({

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
            'cartao-pessoa': {
                required: true,
            },
            'campo-valor': {
                rangelength: [2, 12],
                required: true,
                number: true
            },
            'descricao-gastos': {
                required: true
            },
            'campo-despesa': {
                required: true,
                rangelength: [4, 20]
            },
            'campo-dara-entrada': {
                required: true,
                date: true
            },
            'campo-data-termino': {
                required: true,
                date: true

            }
        },

        messages: {

            'cartao-pessoa': {
                number: "Por favor, forneça um número válido.",
                required: "Este campo é requerido.",
                rangelength: "Por favor, forneça um valor entre {0} e {1} caracteres de comprimento."
            },
            'campo-valor': {
                rangelength: [2, 12],
                number: "Por favor, forneça um número válido.",
                required: "Este campo é requerido."
            },
            'descricao-gastos': {
                required: "Este campo é requerido."
            },
            'campo-despesa': {
                required: "Este campo é requerido.",
                rangelength: "Por favor, forneça um valor entre {0} e {1} caracteres de comprimento."
            },
            'campo-data-entrada': {
                required: "Este campo é requerido.",
                date: "Por favor, forneça uma data válida."
            },
            'campo-data-termino': {
                required: "Este campo é requerido.",
                date: "Por favor, forneça uma data válida."
            }
        },

        tooltip_options: {
            'cartao-pessoa': { placement: 'right', html: true },
            'campo-valor': { placement: 'right', html: true },
            'descricao-gastos': { placement: 'right', html: true },
            'campo-despesa': { placement: 'right', html: true },
            'campo-data-entrada': { placement: 'right', html: true },
            'campo-data-termino': { placement: 'right', html: true }
        },

    });
});