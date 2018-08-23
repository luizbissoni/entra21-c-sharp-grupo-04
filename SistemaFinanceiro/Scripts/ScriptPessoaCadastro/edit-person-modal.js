$(function () {
    var id = -1;
    $('.editar-pessoa').on('click', function () {
        id = $(this).data('id');
    });

    $('#edit-option').on('click', function () {
        $.ajax({
            url: 'Pessoas/Update',
            method: 'POST',
            data: {
                id: id
            },

            success: function (data) {
                $('#linha-' + id).add();
                $('#editar-pessoa-modal').modal('hide');
            }
        });
    });
});