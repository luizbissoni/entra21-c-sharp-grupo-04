
$(document).ready(function () {
    $("#botao-login").click(function () {
        $.ajax({
            url: "/Login/GetLoginJson",
            type: "POST",
            data: {
                "usuario": $("#campo-usuario").val(),
                "senha": $("#campo-senha").val()
            },
            success: function (result) {
                alert(result);
            },
            error: function () {
                alert("Error!")
            }
        });
    });
});