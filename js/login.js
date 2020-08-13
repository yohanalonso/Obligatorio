function validar(valor) {
    if (valor == null || valor.length == 0) {
        return false;
    } else {
        return true;
    }
}

function redireccionar() {
    window.location.href = "index.html";
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    document.getElementById("IniciarBottom").addEventListener("click", function() {
        valor1 = document.getElementById("inputPassword").value;
        valor2 = document.getElementById("inputEmail").value;
        if (validar(valor1) && validar(valor2)) {
            redireccionar();
        }
    });

});