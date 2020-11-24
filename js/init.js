const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCTS_AWS_URL = "http://ec2-18-191-222-30.us-east-2.compute.amazonaws.com:3000/product/";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";


var showSpinner = function() { // Muestra el Spinner
    document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function() { // Deja de mostrar el Spinner
    document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url) { // Trae un JSon
    var result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    if (localStorage.getItem('usuario') != undefined) { //Muestra el usurio que se logueo en el menu desplegable
        document.getElementById("dropdownMenuButton").innerHTML = localStorage.getItem('usuario');
    }
    if (localStorage.getItem('data') != undefined) { //Muetrea la imagen de perfil ingresada
        let datos = JSON.parse(localStorage.getItem('data'));
        if (datos.imagen != undefined) {
            document.getElementById("addImage").innerHTML = `<img class="" src="` + datos.imagen + `" width=40px alt="Foto de perfil"></img>`
        }
    }

    document.getElementById("cerrar").addEventListener("click", function() { // Borra el localStorage al cerrar sesión
        localStorage.removeItem('usuario');
        localStorage.removeItem('data');
        localStorage.removeItem('image');
    });
});