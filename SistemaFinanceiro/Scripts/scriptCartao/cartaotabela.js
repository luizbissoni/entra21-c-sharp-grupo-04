$(document).ready(function () {
    
    $('#tabela-cartao'.DataTable({
        serverSide: true,
        "bProcessing": true,
        "ajax": "/Cartao/ObterTodosJson",
        order: [[1, 'asc']],
        columns: [
       
            { data: "id" },
            { data: "Numero_cartao"},
            { data: "Numero_conta"},
            { data: "Numero_seguranca" },
            { data: "Data_vencimento"},
            { data: "Bandeira"},
            { data: "Banco"}
        ],
    }));

});