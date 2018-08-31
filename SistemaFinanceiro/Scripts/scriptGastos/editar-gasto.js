 
$(function () { 

 
    var table = $('#tabela-gastos').DataTable(); 

    var dataRow; 


 
    $('#tabela-gastos tbody').on('click', 'tr', function () { 

        if ($(this).hasClass('selected')) { 

            $(this).removeClass('selected'); 

        } else { 

            table.$('tr.selected').removeClass('selected'); 

            $(this).addClass('selected'); 

        } 

        dataRow = table.row(this).data(); 

    }); 


    $('#salvar-gastos-editar').on('click', function () { 

        $.ajax({ 
            url: '/Gasto/Editar', 
            method: 'GET', 
            data: { 

                id: dataRow.Id 

            }, 

            success: function (preencher) { 

                console.log(preencher); 
                var data = JSON.parse(preencher); 
                $('#editar-gasto').modal('show'); 
                $('#editar-gastos-modal-campo-valor').val(data.ValorGastos); 
                $('#editar-gastos-modal-campo-data-entrada').val(data.DataEntrada); 
                $('#editar-gastos-modal-campo-data-vencimento').val(data.DataVencimento); 
                $('#editar-pessoa-modal-campo-descricao').val(data.Descricao); 
            } 
        }); 
    }); 



 
 



 
    $('body').on('click', '#salvar-gastos-editar', function () { 
        $.ajax({ 

            url: '/Gasto/Update', 

            method: 'post', 

            data: { 

                ValorGastos: $('#editar-gastos-modal-campo-valor').val(), 
                DataEntrada: $('#editar-gastos-modal-campo-data-entrada').val(), 
                data_nascimento: $('#editar-gastos-modal-campo-data-entrada').val(), 
                DataVencimento: $('#editar-gastos-modal-campo-data-vencimento').val(), 
                Descricao: $('#editar-pessoa-modal-campo-descricao').val(), 
            }, 



 
            success: function (data) { 

                $('#editar-gasto').modal('hide'); 
            } 

        }); 
    });