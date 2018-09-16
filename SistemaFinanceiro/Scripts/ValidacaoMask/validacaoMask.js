$(document).ready(function () {
   
   
    //mask do modal editar da tabela
    $('#campo-valor-pessoa-editar-gastos').mask("#.##0,00", { reverse: true });
    //mask modal cadastro recebimento
    $('#campo-recebimento-valor').maskMoney();

    //mask valor gasto cadastro
    $('#campo-valor').maskMoney();




    

});

