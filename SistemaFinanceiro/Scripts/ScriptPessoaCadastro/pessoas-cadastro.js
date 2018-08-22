function idade() {
    var data = document.getElementById("campo-nascimento").value;
    var dia = data.substr(0, 2);
    var mes = data.substr(3, 2);
    var ano = data.substr(6, 4);
    var d = new Date();
    var ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate();

    ano = +ano,
    mes = +mes,
    dia = +dia;

    var idade = ano_atual - ano;

    if (mes_atual < mes || mes_atual == mes_aniversario && dia_atual < dia) {
        idade--;
    }

    return document.getElementById('campo-idade').innerHTML = idade;
}

function exibe(i) {
    document.getElementById(i).readOnly = true;
}

function desabilita(i) {
    document.getElementById(i).disabled = true;
}

function habilita(i) {
    document.getElementById(i).disabled = false;
}

function formatar(mascara, documento) {
    var i = documento.value.length;
    var saida = mascara.substring(0, 1);
    var texto = mascara.substring(i);

    if (texto.substring(0, 1) != saida) {
        documento.value += texto.substring(0, 1);
    }

}