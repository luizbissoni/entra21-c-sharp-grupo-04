
window.dataTableLanguage = {
    "sEmptyTable": "Nenhum registro encontrado",
    "sInfo": "Mostrando página _PAGE_ de _PAGES_",
    "sInfoEmpty": "Nenhum registro disponível",
    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
    "sInfoPostFix": "",
    "sInfoThousands": ".",
    "sLengthMenu": '<span>Apresentar:</span> _MENU_',
    "sLoadingRecords": "Carregando...",
    "sProcessing": "Processando...",
    "sZeroRecords": "Nenhum registro encontrado",
    "sSearch": "Pesquisa:  ",
    "oPaginate": {
        "sNext": "Próximo",
        "sPrevious": "Anterior",
        "sFirst": "Primeiro",
        "sLast": "Último"
    },
    "oAria": {
        "sSortAscending": ": Ordenar colunas de forma ascendente",
        "sSortDescending": ": Ordenar colunas de forma descendente"
    }
};

$(function () {

    $.extend($.fn.dataTable.defaults, {
        language: window.dataTableLanguage,
        responsive: true,
        autoWidth: false,
        processing: true,
        serverSide: true,
    });

});

