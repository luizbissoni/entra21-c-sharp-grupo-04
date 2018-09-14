$(function () {
    $("#validarGasto").validate({

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
            'campovalor': {
                required: true,
                minlength: 3
            },

        },
        messages: {
            'campovalor': {
                required: "Por favor preencha corretamente esse campo",
                minlength: "Deve conter pelo menos 3 numeros"
            },

        },

    });









});