$(document).ready(function () {
   
   
    //mask do modal editar da tabela
    $('#editar-valor').maskMoney();
    //mask modal cadastro recebimento
    $('#campo-recebimento-valor').maskMoney();

    //mask valor gasto cadastro
    $('#campo-valor').maskMoney();

    //mask valor total gasto grafico topo
    $('#total-gastos').maskMoney();

    //mask cpf
    $('.cpf').mask('000.000.000-00', { reverse: true });
    $('cadastro-cpf').mask('000.000.000-00', { reverse: true });

    //mask telefone
    $('.phone_with_ddd').mask('(00) 0000-0000');
    $('cadastro-telefone').mask('(00) 0000-0000');

    

});

