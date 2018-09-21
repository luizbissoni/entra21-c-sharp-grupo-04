$(function () {
    $('#cadastro-telefone').mask('(00) 00000-0000');
    $('#cadastro-cpf').mask('000.000.000-00', { reverse: true });

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
            'new-CPF ': {
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
});


/*function valCpf($cpf) {
    $cpf = preg_replace('/[^0-9]/', '', $cpf);
    $digitoA = 0;
    $digitoB = 0;
    for ($i = 0, $x = 10; $i <= 8; $i++ , $x--) {
        $digitoA += $cpf[$i] * $x;
    }
    for ($i = 0, $x = 11; $i <= 9; $i++ , $x--) {
        if (str_repeat($i, 11) == $cpf) {
            return false;
        }
        $digitoB += $cpf[$i] * $x;
    }
    $somaA = (($digitoA % 11) < 2) ? 0 : 11 - ($digitoA % 11);
    $somaB = (($digitoB % 11) < 2) ? 0 : 11 - ($digitoB % 11);
    if ($somaA != $cpf[9] || $somaB != $cpf[10]) {
        return false;
    } else {
        return true;
    }
}

function validaDat(campo, valor) {
    var date = valor;
    var ardt = new Array;
    var ExpReg = new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
    ardt = date.split("/");
    erro = false;
    if (date.search(ExpReg) == -1) {
        erro = true;
    }
    else if (((ardt[1] == 4) || (ardt[1] == 6) || (ardt[1] == 9) || (ardt[1] == 11)) && (ardt[0] > 30))
        erro = true;
    else if (ardt[1] == 2) {
        if ((ardt[0] > 28) && ((ardt[2] % 4) != 0))
            erro = true;
        if ((ardt[0] > 29) && ((ardt[2] % 4) == 0))
            erro = true;
    }
    if (erro) {
        alert(" valor "+" não é uma data válida!!!");
        campo.focus();
        campo.value = "";
        return false;
    }
    return true; 
} */
