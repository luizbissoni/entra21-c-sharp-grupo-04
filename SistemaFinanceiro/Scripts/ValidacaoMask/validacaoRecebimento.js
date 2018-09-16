$(document).ready(function () {

    $('#validar-recebimento').validate({
        //lang: 'pt-br',

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

            'campo-recebimento-valor': {
                number: true,
                required: true,
                rangelength: [2, 7]
            },
            'campo-recebimento-data': {
                required: true,
                date: true
            },
            'campo-descricao-recebimento': { required: true }

        },
        messages: {

            'campo-recebimento-valor': "Algum valor deve ser informado",

            'campo-recebimento-data': "Data deve ser preenchido."
        },
        tooltip_options: {

            //thefield: { placement: 'left' }
            'campo-recebimento-data': { trigger: 'focus' },
            'campo-recebimento-valor': { placement: 'right', html: true }
        },
    });


});