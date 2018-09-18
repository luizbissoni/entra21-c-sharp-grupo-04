$ (function () {

    $('#form-cadastro-pessoa').validate({
        
        errorClass: "form-control-danger",
        highlight: function (element){
            JQuery(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            jQuery(element).closest('.form-group').removeClass('has-error');
        },
        errorPlacement: function (error, element) {
            $(element).parent().append(error[0])
        },

        rules: {
            'cadastro-nome':{
                number: false,
                required: true,
                rengelength: [8, 100]
            },
            'cadastro-nascimento':{
                required: true,
                  
            },
            'cadastro-telefone':{
                required: true,
               
            },
            'cadastro-cpf': {
                required: true,
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