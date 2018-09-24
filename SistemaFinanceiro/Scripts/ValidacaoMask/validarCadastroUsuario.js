﻿$(function () {
    $('#cadastro-telefone').mask('(00) 00000-0000');
    $('#cadastro-cpf').mask('000.000.000-00', { reverse: false });

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
                // rangelenght: [8,100]
            },
            'nascimento': {
                required: true,
                
            },
            'telefone': {
                required: true,
                // rangelenght:[10,11]
            },
            'new-CPF': {
                required: true,
               // verificarCPF: true   -> Ativar para validacao do CPF
                //  rangelength: [  ]
            },
            'Cep': {
                required: true,
            },
            'email': {
                email: true,
                required: true
            },
            'usuario': {
                required: true,
            },
            'passwordInput': {
                // password: true,
                required: true,
            },
            'repeatinputPassword': {
                required: true,
                //equalTo:'passwordInput'
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
            'new-CPF': {
                required: "Este campo é requerido.",
            },
            'Cep': {
                required: "Este campo é requerido.",
            },
            'emailInput': {
                email: true,
                required: "Este campo é requerido."
            },
            'userInput': {
                required: "Este campo é requerido.",
            },
            'passwordInput': {
                required: "Este campo é requerido.",
                //password: true,
            },
            'repeatPasswordInput': {
                required: "Este campo é requerido.",
                // equalTo: 'Senhas não conferem'
            }
        }
       
       

    });

    //fecha todo os tootips quando fecha a modal
    $('.close-cadastro').on('click', function () {
        $('[data-toggle="tooltip"], .tooltip').tooltip("hide");
    });
      //$.validator.addMethod("verificaCPF", function (value, element)   > Testei com os dois, ambos dá o mesmo resultado, ou aceita tudo, ou nao aceita nada xD :(
   /* jQuery.validator.addMethod("verificaCPF", function (value, element) {

        value = value.replace('.', '');
        value = value.replace('.', '');
        cpf = value.replace('-', '');

        while (cpf.length < 11) cpf = "0" + cpf;
        var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
        var a = [];
        var b = new Number;
        var c = 11;

        for (i = 0; i < 11; i++) {
            a[i] = cpf.charAt(i);
            if (i < 9) b += (a[i] * --c);
        }

        if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11 - x }

        b = 0;
        c = 11;

        for (y = 0; y < 10; y++) b += (a[y] * c--);

        if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11 - x; }

        if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) return false;

        var verifica = false;
        $.get('verificaCpf.php', { cpf: cpf }, function (data) {
            if (data == 0) verifica = true;
        });

        if (!verifica) return false;

        return true;
    }, "Informe um CPF Válido.");
 Validar cpf =>   */   
  });

   /* jQuery.validator.addMethod("dateBR", function(value, element) {            
     //contando chars 
    if(value.length!=10) return false;
    // verificando data
    var data        = value;
    var dia         = data.substr(0,2);
    var barra1      = data.substr(2,1);
    var mes         = data.substr(3,2);         
    var barra2      = data.substr(5,1);
    var ano         = data.substr(6,4);         
    if(data.length!=10||barra1!="/"||barra2!="/"||isNaN(dia)||isNaN(mes)||isNaN(ano)||dia>31||mes>12)return false; 
    if((mes==4||mes==6||mes==9||mes==11)&amp;&amp;dia==31)return false;
    if(mes==2 &amp;&amp; (dia>29||(dia==29&amp;&amp;ano%4!=0)))return false;
    if(ano < 1900)return false;
    return true;        
}, "Informe uma data válida");  // Mensagem padrão */

// http://flaviosilveira.com/2010/jquery-jquery-validation-sincrono-e-assincrono-cpf-unico-no-banco-de-dados-ajax-sincrono-com-jquery/
   