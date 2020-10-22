var products = {};
var subtotal = 0;
var envio = 0;
var price = [];
const dolar = 40;
var moneda = "UYU ";
var formaDePago = "";
var cardIn = `
                <label for="name" class="">Nombre y Apellido:</label>
                <input type="text" id="name" class="form-control col-md-6" placeholder="Nombre y Apellido">
                <span id="tick1"></span>
                <br>
                <div class="invalid-feedback"> <strong>Ingrese Nombre y Apellido</strong></div>
                <div class="valid-feedback"><strong>Correcto!</strong></div>

                <label for="number" class="">Número de tarjeta:</label>
                <input type="text" id="number" class="form-control col-md-4" placeholder="Número de tarjeta">
                <span id="tick2"></span>
                <br>
                <div class="invalid-feedback"> <strong>Ingrese un número</strong></div>
                <div class="valid-feedback"><strong>Correcto!</strong></div>

                <label for="securityNumber" class="">Número de seguridad:</label>
                <input type="number" id="securityNumber" class="form-control col-md-2" placeholder="Nro de seguridad">
                <span id="tick3"></span>
                <br>
                <div class="invalid-feedback"> <strong>Ingrese un número</strong></div>
                <div class="valid-feedback"><strong>Correcto!</strong></div>

                <label for="date" class="">Fecha de vencimiento:</label>
                <input type="date" id="date" class="form-control col-md-3" placeholder="Fecha de vencimiento">
                <span id="tick4"></span>
                <br>
                <div class="invalid-feedback"> <strong>Ingrese una fecha</strong></div>
                <div class="valid-feedback"><strong>Correcto!</strong></div>
                `
var transfIn = `
                <label for="name" class="">Nombre y Apellido:</label>
                <input type="text" id="name" class="form-control col-md-6" placeholder="Nombre y Apellido">
                <span id="tick1"></span>
                <br>
                <div class="invalid-feedback"> <strong>Ingrese Nombre y Apellido</strong></div>
                <div class="valid-feedback"><strong>Correcto!</strong></div>

                <label for="number" class="">Número de cuenta:</label>
                <input type="number" id="number" class="form-control col-md-4" placeholder="Número de cuenta">
                <span id="tick2"></span>
                <br>
                <div class="invalid-feedback"> <strong>Ingrese un número</strong></div>
                <div class="valid-feedback"><strong>Correcto!</strong></div>

                <label for="bank" class="">Banco:</label>
                <input type="text" id="bank" class="form-control col-md-2" placeholder="Banco">
                <span id="tick3"></span>
                <br>
                <div class="invalid-feedback"> <strong>Ingrese un Banco</strong></div>
                <div class="valid-feedback"><strong>Correcto!</strong></div>

                <label for="sucursal" class="">Sucursal</label>
                <input type="text" id="sucursal" class="form-control col-md-3" placeholder="Sucursal">
                <span id="tick4"></span>
                <br>
                <div class="invalid-feedback"> <strong>Ingrese la sucursal</strong></div>
                <div class="valid-feedback"><strong>Correcto!</strong></div>
                `
var cashIn = `
                <label for="name" class="">Nombre y Apellido:</label>
                <input type="text" id="name" class="form-control col-md-6" placeholder="Nombre y Apellido">
                <span id="tick1"></span>
                <br>
                <div class="invalid-feedback"> <strong>Ingrese Nombre y Apellido</strong></div>
                <div class="valid-feedback"><strong>Correcto!</strong></div>

                <label for="red" class="">Red de cobranza:</label>
                <select class="custom-select d-block col-md-2" id="red">
                    <option value="">Elija la red</option>
                    <option>Abitab</option>
                    <option>RedPago</option>
                </select>
                <span id="tick2"></span>
                <br>
                <div class="invalid-feedback"> <strong>Seleccione una red</strong></div>
                <div class="valid-feedback"><strong>Correcto!</strong></div>
                `

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

function validacion(dato, i) {
    var tick = document.getElementById('tick' + i);
    tick.classList.remove('mal');
    tick.classList.remove('bien');
    if (dato.value == "") {

        dato.classList.add('is-invalid');
        tick.classList.add('mal');
        marca = " X";

    } else {
        marca = "&#10004;";
        dato.classList.add('is-valid');
        tick.classList.add('bien');
    }
    document.getElementById('tick' + i).innerHTML = marca;
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
    document.getElementById("card").addEventListener("click", function() {
        formaDePago = cardIn;
    });
    document.getElementById("transf").addEventListener("click", function() {
        formaDePago = transfIn;
    });
    document.getElementById("cash").addEventListener("click", function() {
        formaDePago = cashIn;
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

    document.getElementById('comprobar').addEventListener("click", function() {

        var marca = "";

        if (formaDePago == "") {
            var botton = document.getElementById('bottonToPay');
            botton.classList.remove('is-invalid');
            botton.classList.remove('is-valid');
            tick.classList.remove('mal');
            tick.classList.remove('bien');

            botton.classList.add('is-invalid');
            tick.classList.add('mal');
            marca = " X";

        } else {
            var name = document.getElementById('name');
            name.classList.remove('is-invalid');
            name.classList.remove('is-valid');
            validacion(name, 1);

            if (formaDePago == cardIn) {
                var number = document.getElementById('number');
                var securityNumber = document.getElementById('securityNumber');
                var date = document.getElementById('date');
                number.classList.remove('is-invalid');
                number.classList.remove('is-valid');
                securityNumber.classList.remove('is-invalid');
                securityNumber.classList.remove('is-valid');
                date.classList.remove('is-invalid');
                date.classList.remove('is-valid');
                validacion(number, 2);
                validacion(securityNumber, 3);
                validacion(date, 4);

            } else {
                var number = document.getElementById('number');
                var bank = document.getElementById('bank');
                var sucursal = document.getElementById('sucursal');
                number.classList.remove('is-invalid');
                number.classList.remove('is-valid');
                securityNumber.classList.remove('is-invalid');
                securityNumber.classList.remove('is-valid');
                date.classList.remove('is-invalid');
                date.classList.remove('is-valid');
                bank.classList.remove('is-invalid');
                bank.classList.remove('is-valid');
                sucursal.classList.remove('is-invalid');
                sucursal.classList.remove('is-valid');

            }

            var red = document.getElementById('red');
            red.classList.remove('is-invalid');
            red.classList.remove('is-valid');


        }
        document.getElementById('tick').innerHTML = marca;
    });
});