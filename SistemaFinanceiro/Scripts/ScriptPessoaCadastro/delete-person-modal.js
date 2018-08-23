$(function () {
    var id = -1;

    $('.excluir-pessoa').on('click', function () {
        id = $(this).data('id');
    });

    $('#yes-option').on("click", function () {
        $.ajax({
            url: '/Pessoas/Excluir',
            method: 'GET',
            data: {
                id: id
            },
            success: function (data) {
                $('#linha-'+id).remove();
                $('#exampleModal').modal('hide');
            }
        });
    });
});