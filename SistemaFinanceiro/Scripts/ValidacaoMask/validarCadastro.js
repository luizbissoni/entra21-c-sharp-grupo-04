$.('document').ready(); {

$.validator.addMethod("#cadastro-nascimento", function (value, element) {
    if (value.length != 10) return false;
    // verificando data
    var data = value;
    var dia = data.substr(0, 2);
    var barra1 = data.substr(2, 1);
    var mes = data.substr(3, 2);
    var barra2 = data.substr(5, 1);
    var ano = data.substr(6, 4);
    if (data.length != 10 || barra1 != "/" || barra2 != "/" || isNaN(dia) || isNaN(mes) || isNaN(ano) || dia > 31 || mes > 12) return false;
    if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia == 31) return false;
    if (mes == 2 && (dia > 29 || (dia == 29 && ano % 4 != 0))) return false;
    if (ano < 1900) return false;
    return true;
}


$(function () {

    $('#form-cadastro-pessoa').validate({

        errorClass: "form-control-danger",
        highlight: function (element) {
            JQuery(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            jQuery(element).closest('.form-group').removeClass('has-error');
        },
        errorPlacement: function (error, element) {
            $(element).parent().append(error[0])
        },

        rules: {
            'cadastro-nome': {
                number: false,
                required: true,
                rengelength: [8, 100]
            },
            'cadastro-nascimento': {
                required: true,


            },
            'cadastro-telefone': {
                required: true,

            },
            'cadastro-cpf': {
                    required: true
}            
        },
        messages:{

            'cadastro-nome':{
                required: "Este campo é requerido",
                rengelength: "Por favor, forneça um valor entre {0} e {1} caracteres de comprimento."
            },
            'cadastro-nascimento':{
                required:"Este campo é requerido"
                
            },
            'cadastro-telefone':{
                required: 'Este campo é requerido'
            },
            'cadastro-cpf':{
                required: 'Este campo é requerido'
            }
        },
        
    }});