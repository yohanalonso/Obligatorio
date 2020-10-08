var products = {};
var subtotal = 0;
var envio = 0;
const dolar = 40;
var moneda = "UYU "

function changeCant(i) {
    document.getElementById("price" + i).innerHTML = products.articles[i].currency + ` ` + products.articles[i].unitCost * document.getElementById("cant" + i).value;
    for (let j = 0; j < products.articles.length; j++) {
        if ((moneda == "USD ") && (products.articles[j].currency == "UYU")) {
            subtotal += products.articles[j].unitCost * document.getElementById("cant" + j).value / dolar;
        } else {
            subtotal += products.articles[j].unitCost * document.getElementById("cant" + j).value;
        }
    }
    document.getElementById("productCostText").innerHTML = moneda + subtotal;
    document.getElementById("comissionText").innerHTML = moneda + envio;
    document.getElementById("totalCostText").innerHTML = moneda + (envio + subtotal);
    subtotal = 0;
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
                    <div class="col-md-2"><input onchange= changeCant(` + i + `) class="form-control" type="number" placeholder="` + product.count + `" id="cant` + i + `" value="` + product.count + `"></div>
                    <p class="col-md-2" id="price` + i + `">` + product.currency + ` ` + product.unitCost * product.count + `</p>
            </div>
            <hr>
            `
        if ((moneda == "USD ") && (product.currency == "UYU")) {
            subtotal += product.unitCost * product.count / dolar;
        } else {
            subtotal += product.unitCost * product.count;
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
            let j = 0;
            while (products.articles[j].currency == "UYU") {
                j++;
            }
            if (products.articles[j].currency != "UYU") {
                moneda = "USD "
            }
            showCart(products.articles);
        }
    });


});