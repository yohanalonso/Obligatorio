function showInfo() { //Muestra los datos guardados
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
        if (datos.imagen != undefined) {
            document.getElementById("addImage").innerHTML = `<img class="" src="` + datos.imagen + `" width=40px alt="Foto de perfil"></img>`
        }
    }

}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    //Configuraciones para el elemento que sube archivos
    var dzoptions = {
        url: "/",
        autoQueue: false
    };
    var myDropzone = new Dropzone("div#file-upload", dzoptions);

    showInfo();
    document.getElementById("save").addEventListener("click", function() { // Guarada los datos ingresados
        let info = {
            "firstName": document.getElementById("firstName").value,
            "secondName": document.getElementById("secondName").value,
            "firstLastname": document.getElementById("firstLastname").value,
            "secondLastname": document.getElementById("secondLastname").value,
            "age": document.getElementById("age").value,
            "email": document.getElementById("email").value,
            "cel": document.getElementById("cel").value
        }
        if (document.getElementById("imagen") != undefined) {
            localStorage.setItem('image', document.getElementById("imagen").src);
        }
        if (localStorage.getItem("image") != undefined) {
            info.imagen = localStorage.getItem("image");
        }
        localStorage.setItem('data', JSON.stringify(info));
        localStorage.setItem('guardado', "true"); //Crea un elemento momentaneo en localStorage para poder mostrar el mensaje 
        showInfo();
    });
    if (localStorage.getItem('guardado') == "true") { // Muestra el mensaje de que se guardo
        document.getElementById("alertResult").classList.add("show");
        localStorage.removeItem('guardado');
    }

});