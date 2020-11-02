var dato = [];

function showInfo() {
    let info = localStorage.getItem('guardado');
    if (info != undefined) {
        let datos = JSON.parse(info);
        document.getElementById("firstName").value = datos[0].firstName;
        document.getElementById("secondName").value = datos[0].secondName;
        document.getElementById("firstLastname").value = datos[0].firstLastname;
        document.getElementById("secondLastname").value = datos[0].secondLastname;
        document.getElementById("age").value = datos[0].age;
        document.getElementById("email").value = datos[0].email;
        document.getElementById("cel").value = datos[0].cel;
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
            "cel": document.getElementById("cel").value
        }
        dato.push(info);
        localStorage.setItem('guardado', JSON.stringify(dato));
        showInfo();
    });

});