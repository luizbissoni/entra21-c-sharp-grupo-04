//$(document).ready(function () {
//    $('#validarLogin').validate({
//        errorClass: "form-control-danger",
//        validClass: "form-control-success",
//        highlight: function (element) {
//            jQuery(element).closest('.form-group').addClass('has-error');
//        },
//        unhighlight: function (element) {
//            jQuery(element).closest('.form-group').removeClass('has-error');
//            $('[data-toggle="tooltip"], .tooltip').tooltip("hide");
//        },
//        errorPlacement: function (error, element) {
//            $(element).parent().append(error[0])
//        },
//        rules: {
//            "campo-usuario": {
//                required: true,
//            },
//            "campo-senha": {
//                required: true,
//                rangelength: [6,10]
//            }
//        },
//        menssage: {
//            "campo-usuario": {
//                required: "Este campo é requerido.",
//            },
//            "campo-senha": {
//                required: "Este campo é requerido.",
//                rangelength: "Por favor, forneça um valor entre {0} e {1} caracteres de comprimento."

//            }
//        }
//    });
   
//});