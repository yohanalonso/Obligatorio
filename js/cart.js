var products = {};
var subtotal = 0;
var envio = 0;
var cant = [];
const dolar = 40;
var moneda = "UYU "

function changeCant() {
    for (let i = 0; i < cant.length; i++) {
        cant[i] = document.getElementById("cant" + i).value;
    }
}

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
                    <div class="col-md-2"><input class="form-control" type="number" placeholder="` + product.count + `" id="cant` + i + `" value="` + cant[i] + `"></div>
                    <p class="col-md-2">` + product.currency + ` ` + product.unitCost * cant[i] + `</p>
            </div>
            <hr>
            `
        if ((moneda == "USD ") && (product.currency == "UYU")) {
            subtotal += product.unitCost * cant[i] / dolar;
        } else {
            subtotal += product.unitCost * cant[i];
        }
    }

    document.getElementById("cart").innerHTML = htmlContentToAppend;
    document.getElementById("productCostText").innerHTML = moneda + subtotal;
    document.getElementById("comissionText").innerHTML = moneda + envio;
    document.getElementById("totalCostText").innerHTML = moneda + (envio + subtotal);
    subtotal = 0;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            products = resultObj.data;
            for (let i = 0; i < products.articles.length; i++) {
                let product = products.articles[i];
                cant.push(product.count);
                if (product.currency == "USD") {
                    moneda = "USD "
                }
            }
            showCart(products.articles);
        }
    });

    document.getElementById("cart").addEventListener("change", function() {
        changeCant();
        showCart(products.articles);
    });

});