/// <reference path="C:\Users\T-Gamer\Documents\GitHub\entra21-c-sharp-grupo-04\SistemaFinanceiro\Views/Pessoas/EditarModal.cshtml" />
$(function () {
    var id = -1;
    $('.editar-pessoa').on('click', function () {
        id = $(this).data('id');
    });

    $('#edit-option').on('click', function () {
        $.ajax({
            url: '/Pessoas/Update',
            method: 'GET',
            data: {
                id: id
            },

            success: function (data) {
                $('#linha-'+id).remove();
                $('#editar-pessoa-modal').modal('show');
            }
        });
    });
});