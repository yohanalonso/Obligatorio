function validar(valor) {
    if (!(valor.value == null || valor.value.length == 0)) {
        valor.classList.remove('is-invalid');
        valor.classList.remove('is-valid');
        valor.classList.add('is-valid');
    } else {
        valor.classList.remove('is-invalid');
        valor.classList.remove('is-valid');
        valor.classList.add('is-invalid');
    }
    return !(valor.value == null || valor.value.length == 0);
}

function validarEmail(valor) {
    let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (email.test(valor.value)) {
        valor.classList.remove('is-invalid');
        valor.classList.remove('is-valid');
        valor.classList.add('is-valid');
    } else {
        valor.classList.remove('is-invalid');
        valor.classList.remove('is-valid');
        valor.classList.add('is-invalid');
    }
    return email.test(valor.value);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    document.getElementById("signin").addEventListener("submit", e => {
        e.preventDefault();
        valor1 = document.getElementById("inputPassword");
        valor2 = document.getElementById("inputEmail");
        validarEmail(valor2);
        validar(valor1);
        if (validar(valor1) && validarEmail(valor2)) {
            localStorage.setItem('usuario', valor2.value);
            window.location.href = "index1.html";
        }
    });

});