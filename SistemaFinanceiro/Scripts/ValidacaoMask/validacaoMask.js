$(document).ready(function () {


    //mask do modal editar da tabela
    $('#editar-valor').maskMoney();

    //mask modal cadastro recebimento
    $('#campo-recebimento-valor').maskMoney();

    //mask modal cadastro gastos calendario
    $('#campo-calendario-valor').maskMoney();

    //mask valor gasto cadastro
    $('#campo-valor').maskMoney();

    //mask valor total gasto grafico topo
    $('#total-gastos').maskMoney({
        prefix: 'R$',
        thousands: '.',
        decimal: ','
    });
    $('.saldo-recebido').maskMoney({
        prefix: 'R$',
        thousands: '.',
        decimal: ','
    });

    //mask cpf
    $('.cpf').mask('000.000.000-00', { reverse: true });


    //mask telefone
    $('.phone_with_ddd').mask('(00) 00000-0000');




});

