var products = {};
var subtotal = 0;
var envio = 0;

function showCart(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        htmlContentToAppend += `
            <div class="row">
                    <div class="col-md-2">
                        <img src="` + product.src + `" class="d-block w-100" alt="...">
                    </div>
                    <p class="col-md-4">` + product.name + `</p>
                    <p class="col-md-2">` + product.currency + ` ` + product.unitCost + `</p>
                    <div class="col-md-2"><input class="form-control" type="number" placeholder="` + product.count + `" id="count" value="` + product.count + `"></div>
                    <p class="col-md-2" id="subtotal">` + product.currency + ` ` + product.unitCost * product.count + `</p>
            </div>
            <hr>
            `
        subtotal += product.unitCost * product.count;
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
            showCart(products.articles);
            document.getElementById("productCostText").innerHTML = `UYU ` + subtotal;
            document.getElementById("comissionText").innerHTML = `UYU ` + envio;
            document.getElementById("totalCostText").innerHTML = `UYU ` + (envio + subtotal);
        }
    });
});