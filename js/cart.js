var products = {};
var subtotal = 0;
var envio = 0;
var price = [];
const dolar = 40;
var moneda = "UYU ";
var formaDePago = "";

function changeCant(i) {
    document.getElementById("price" + i).innerHTML = products.articles[i].currency + ` ` + products.articles[i].unitCost * document.getElementById("cant" + i).value;
    if ((moneda == "USD ") && (products.articles[i].currency == "UYU")) {
        subtotal -= price[i];
        price[i] = products.articles[i].unitCost * document.getElementById("cant" + i).value / dolar;
        subtotal += price[i];
    } else {
        subtotal -= price[i];
        price[i] = products.articles[i].unitCost * document.getElementById("cant" + i).value;
        subtotal += price[i];
    }
    document.getElementById("productCostText").innerHTML = moneda + subtotal;
    document.getElementById("comissionText").innerHTML = moneda + (envio * subtotal).toFixed(2);
    document.getElementById("totalCostText").innerHTML = moneda + (envio * subtotal + subtotal).toFixed(2);
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
                    <div class="col-md-2"><input onchange= changeCant(` + i + `) class="form-control" type="number" min="0" placeholder="` + product.count + `" id="cant` + i + `" value="` + product.count + `"></div>
                    <p class="col-md-2" id="price` + i + `">` + product.currency + ` ` + price[i] + `</p>
            </div>
            <hr>
            `
        if ((moneda == "USD ") && (product.currency == "UYU")) {
            price[i] = product.unitCost * product.count / dolar;
            subtotal += price[i];
        } else {
            subtotal += price[i];
        }
    }

    document.getElementById("cart").innerHTML = htmlContentToAppend;
    document.getElementById("productCostText").innerHTML = moneda + subtotal;
    document.getElementById("comissionText").innerHTML = moneda + (envio * subtotal).toFixed(2);
    document.getElementById("totalCostText").innerHTML = moneda + (envio * subtotal + subtotal).toFixed(2);
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            products = resultObj.data;
            let j = 0;
            for (let i = 0; i < products.articles.length; i++) {
                price.push(products.articles[i].unitCost * products.articles[i].count);
                if (products.articles[i].currency == "USD") {
                    moneda = "USD ";
                }
            }
            showCart(products.articles);
        }
    });
    document.getElementById("tarjet").addEventListener("click", function() {
        formaDePago = `
        <label for="name" class="">Nombre y Apellido:</label>
        <input type="text" id="name" class="form-control col-md-6" placeholder="Nombre y Apellido">
        <label for="number" class="">Número de tarjeta:</label>
        <input type="text" id="number" class="form-control col-md-4" placeholder="Número de tarjeta">
        <label for="securityNumber" class="">Número de seguridad:</label>
        <input type="text" id="securityNumber" class="form-control col-md-2" placeholder="Nro de seguridad">
        <label for="date" class="">Fecha de vencimiento:</label>
        <input type="text" id="date" class="form-control col-md-3" placeholder="Fecha de vencimiento">
        `
    });
    document.getElementById("transf").addEventListener("click", function() {
        formaDePago = `
        <label for="name" class="">Nombre y Apellido:</label>
        <input type="text" id="name" class="form-control col-md-6" placeholder="Nombre y Apellido">
        <label for="number" class="">Número de cuenta:</label>
        <input type="text" id="number" class="form-control col-md-4" placeholder="Número de cuenta">
        <label for="bank" class="">Banco:</label>
        <input type="text" id="bank" class="form-control col-md-2" placeholder="Banco">
        <label for="sucursal" class="">Sucursal</label>
        <input type="text" id="sucursal" class="form-control col-md-3" placeholder="Sucursal">
        `
    });
    document.getElementById("cash").addEventListener("click", function() {
        formaDePago = `
        <label for="name" class="">Nombre y Apellido:</label>
        <input type="text" id="name" class="form-control col-md-6" placeholder="Nombre y Apellido">
        <label for="red" class="">Red de cobranza:</label>
        <select class="custom-select d-block col-md-2" id="red">
            <option value="">Elija la red</option>
                    <option>Abitab</option>
                    <option>RedPago</option>
            </select>
        `
    });
    document.getElementById("acept").addEventListener("click", function() {
        document.getElementById("waytopay").innerHTML = formaDePago;
    });
    document.getElementById("premiumradio").addEventListener("click", function() {
        envio = 0.15;
        document.getElementById("comissionText").innerHTML = moneda + (envio * subtotal).toFixed(2);
        document.getElementById("totalCostText").innerHTML = moneda + (envio * subtotal + subtotal).toFixed(2);
    });
    document.getElementById("expressradio").addEventListener("click", function() {
        envio = 0.07;
        document.getElementById("comissionText").innerHTML = moneda + (envio * subtotal).toFixed(2);
        document.getElementById("totalCostText").innerHTML = moneda + (envio * subtotal + subtotal).toFixed(2);
    });
    document.getElementById("standardradio").addEventListener("click", function() {
        envio = 0.05;
        document.getElementById("comissionText").innerHTML = moneda + (envio * subtotal).toFixed(2);
        document.getElementById("totalCostText").innerHTML = moneda + (envio * subtotal + subtotal).toFixed(2);
    });
    document.getElementById("sinradio").addEventListener("click", function() {
        envio = 0;
        document.getElementById("comissionText").innerHTML = moneda + (envio * subtotal).toFixed(2);
        document.getElementById("totalCostText").innerHTML = moneda + (envio * subtotal + subtotal).toFixed(2);
    });
});