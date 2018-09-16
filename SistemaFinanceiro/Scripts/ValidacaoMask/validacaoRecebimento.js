$(function () {

    $('#validar-recebimento').validate({

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
            'campo-valor-recebimento': {
                number: true,
                required: true,
                rangelength: [2, 12]
            },
            'campo-data-recebimento': {
                required: true,
               
            },
            'descricao-recebimento': {
                required: true
            }
        },
        messages: {

            'campo-valor-recebimento': {
                number: "Por favor, forneça um número válido.",
                required: "Este campo é requerido.",
                rangelength: "Por favor, forneça um valor entre {0} e {1} caracteres de comprimento."
            },
            'campo-data-recebimento': {
                date:"Por favor, forneça uma data válida.",
                required: "Este campo é requerido."

            },
            'descricao-recebimento': {
                required: "Este campo é requerido."
            }
        },

    });

    //Expressão regular para data(acho que não funciona para dateTime) formato da data local
    //$.validator.addMethod("dateBR", function (value) {
    //    if (value.length != 10) return false;
    //    return value.match(/^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d$/);
    //}, "Por favor, forneça uma data válida.");

    //Expressão regular para valores em reais
    //$.validator.addMethod("valorBR", function (value) {
    //    if (value.length > 7 || value.length < 2 ) return false;
    //    return value.test(/^([^\d\s]{1,}\s ? [+-] ?)(\d{ 1, 3})(\, \d{ 3}) * (\.\d{ 1,}) ? $/);
    //}, "Por favor, forneça um valor válido.");
   
});