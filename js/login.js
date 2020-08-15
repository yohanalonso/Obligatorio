function validar(valor) {
    if (valor == null || valor.length == 0) {
        return false;
    } else {
        return true;
    }
}

function validarEmail(valor) {
    let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return email.test(valor2);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    document.getElementById("signin").addEventListener("submit", e => {
        e.preventDefault();
        valor1 = document.getElementById("inputPassword").value;
        valor2 = document.getElementById("inputEmail").value;
        if (validar(valor1) && validarEmail(valor2)) {
            window.location.href = "index.html";
        }
    });

});