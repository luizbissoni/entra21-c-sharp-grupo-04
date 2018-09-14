$(document).ready(function () {
   
   $('.saldo-recebico').mask("#.##0,00", { reverse: true });

   $('#campo-valor-pessoa').mask("#.##0,00", { reverse: true });
   


    //exemplos de mask
    //$('.phone_with_ddd').mask('(00) 0000-0000');
    //$('.cpf').mask('000.000.000-00', { reverse: true });
    //$('.date_time').mask('00/00/0000 00:00:00');
    //$('.date').mask('00/00/0000');
    ////formata a data
    //$('.your-field').mask('00/00/0000', { 'translation': { 0: { pattern: /[0-9*]/ } } });







});

