var products = {};

function showCart(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        htmlContentToAppend += `
            <div class="row">
                    <div class="col-md-2">
                        <img src="` + product.src + `" class="d-block w-100" alt="...">
                    </div>
                    <p class="col-md-4 col-md-offset-3"><strong>Nombre</strong></p>
                    <p class="col-md-2"><strong>Costo</strong></p>
                    <p class="col-md-2"><strong>Cantidad</strong></p>
                    <p class="col-md-2"><strong>Subtotal</strong></p>
            </div>
            `
    }

    document.getElementById("cart").innerHTML = htmlContentToAppend;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            products = resultObj.data;
            console.log(products);
            showCart(products);
        }
    });
});