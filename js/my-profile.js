function showInfo() {
    let info = localStorage.getItem('data');
    if (info != undefined) {
        let datos = JSON.parse(info);
        document.getElementById("firstName").value = datos.firstName;
        document.getElementById("secondName").value = datos.secondName;
        document.getElementById("firstLastname").value = datos.firstLastname;
        document.getElementById("secondLastname").value = datos.secondLastname;
        document.getElementById("age").value = datos.age;
        document.getElementById("email").value = datos.email;
        document.getElementById("cel").value = datos.cel;
    }

}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    showInfo();
    document.getElementById("save").addEventListener("click", function() {
        let info = {
            "firstName": document.getElementById("firstName").value,
            "secondName": document.getElementById("secondName").value,
            "firstLastname": document.getElementById("firstLastname").value,
            "secondLastname": document.getElementById("secondLastname").value,
            "age": document.getElementById("age").value,
            "email": document.getElementById("email").value,
            "cel": document.getElementById("cel").value,
        }
        localStorage.setItem('data', JSON.stringify(info));
        localStorage.setItem('guardado', "true");
        showInfo();
    });
    if (localStorage.getItem('guardado') == "true") {
        document.getElementById("alertResult").classList.add("show");
        localStorage.removeItem('guardado');
    }
});