var products = {};
var subtotal = 0;
var envio = 0;
var price = [];
const dolar = 40;
var moneda = "UYU ";
var formaDePago = 0;
var flag = true;
var cardIn = `<div class="needs-validation">
                <label for="name" class="">Nombre y Apellido:</label>
                <input type="text" name="nombre" id="name" class="form-control col-md-8" placeholder="Nombre y Apellido">
                <span id="tick1"></span>
                <div class="invalid-feedback"> <strong>Ingrese Nombre y Apellido</strong></div>
                <div class="valid-feedback"><strong>Correcto!</strong></div>
            </div>
            <div class="needs-validation">
                <label for="number" class="">Número de tarjeta:</label>
                <input type="text" name="numero" id="number" class="form-control col-md-8" placeholder="Número de tarjeta">
                <span id="tick2"></span>
                <div class="invalid-feedback"> <strong>Ingrese un número</strong></div>
                <div class="valid-feedback"><strong>Correcto!</strong></div>
            </div>
            <div class="needs-validation">
                <label for="securityNumber" class="">Número de seguridad:</label>
                <input type="number" name="numeroSeguridad" id="securityNumber" class="form-control col-md-6" placeholder="Nro de seguridad">
                <span id="tick3"></span>
                <div class="invalid-feedback"> <strong>Ingrese un número</strong></div>
                <div class="valid-feedback"><strong>Correcto!</strong></div>
            </div>
            <div class="needs-validation">
                <label for="date" class="">Fecha de vencimiento:</label>
                <input type="date" name="vto" id="date" class="form-control col-md-6" placeholder="Fecha de vencimiento">
                <span id="tick4"></span>
                <div class="invalid-feedback"> <strong>Ingrese una fecha</strong></div>
                <div class="valid-feedback"><strong>Correcto!</strong></div>
            </div>
                `
var transfIn = `<div class="needs-validation">
                    <label for="name" class="">Nombre y Apellido:</label>
                    <input type="text" name="nombre" id="name" class="form-control col-md-8" placeholder="Nombre y Apellido">
                    <span id="tick1"></span>
                    <div class="invalid-feedback"> <strong>Ingrese Nombre y Apellido</strong></div>
                    <div class="valid-feedback"><strong>Correcto!</strong></div>
                </div>
                <div class="needs-validation">
                    <label for="number" class="">Número de cuenta:</label>
                    <input type="number" name="numero" id="number" class="form-control col-md-8" placeholder="Número de cuenta">
                    <span id="tick2"></span>
                    <div class="invalid-feedback"> <strong>Ingrese un número</strong></div>
                    <div class="valid-feedback"><strong>Correcto!</strong></div>
                </div>
                <div class="needs-validation">
                    <label for="bank" class="">Banco:</label>
                    <input type="text" name="banco" id="bank" class="form-control col-md-6" placeholder="Banco">
                    <span id="tick3"></span>
                    <div class="invalid-feedback"> <strong>Ingrese un Banco</strong></div>
                    <div class="valid-feedback"><strong>Correcto!</strong></div>
                </div>
                <div class="needs-validation">
                    <label for="sucursal" class="">Sucursal</label>
                    <input type="text" name="sucursal" id="sucursal" class="form-control col-md-6" placeholder="Sucursal">
                    <span id="tick4"></span>
                    <div class="invalid-feedback"> <strong>Ingrese la sucursal</strong></div>
                    <div class="valid-feedback"><strong>Correcto!</strong></div>
                </div>
                `
var cashIn = `<div class="needs-validation">
                <label for="name" class="">Nombre y Apellido:</label>
                <input type="text" name="nombre" id="name" class="form-control col-md-8" placeholder="Nombre y Apellido">
                <span id="tick1"></span>
                <div class="invalid-feedback"> <strong>Ingrese Nombre y Apellido</strong></div>
                <div class="valid-feedback"><strong>Correcto!</strong></div>
            </div>
            <div class="needs-validation">
                <label for="red" class="">Red de cobranza:</label>
                <select name="red" class="custom-select d-block col-md-4" id="red">
                    <option value="">Elija la red</option>
                    <option>Abitab</option>
                    <option>RedPago</option>
                </select>
                <span id="tick2"></span>
                <div class="invalid-feedback"> <strong>Seleccione una red</strong></div>
                <div class="valid-feedback"><strong>Correcto!</strong></div>
            </div>
                `

function changeCant(i) { // Cambia el subtotal, el csoto del envio y el total al detectar un cambio en la cantidad
    document.getElementById("price" + i).innerHTML = products.articles[i].currency + ` ` + products.articles[i].unitCost * document.getElementById("cant" + i).value;
    if ((moneda == "USD ") && (products.articles[i].currency == "UYU")) {
        subtotal -= price[i] / dolar;
        price[i] = products.articles[i].unitCost * document.getElementById("cant" + i).value;
        subtotal += price[i] / dolar;
    } else {
        if ((moneda == "UYU ") && (products.articles[i].currency == "USD")) {
            subtotal -= price[i] * dolar;
            price[i] = products.articles[i].unitCost * document.getElementById("cant" + i).value;
            subtotal += price[i] * dolar;
        } else {
            subtotal -= price[i];
            price[i] = products.articles[i].unitCost * document.getElementById("cant" + i).value;
            subtotal += price[i];
        }
    }
    document.getElementById("productCostText").innerHTML = moneda + subtotal;
    document.getElementById("comissionText").innerHTML = moneda + (envio * subtotal).toFixed(2);
    document.getElementById("totalCostText").innerHTML = moneda + (envio * subtotal + subtotal).toFixed(2);
}

function borrar(i) { // Borra el producto del carrito
    subtotal -= price[i];
    document.getElementById("productCostText").innerHTML = moneda + subtotal;
    document.getElementById("comissionText").innerHTML = moneda + (envio * subtotal).toFixed(2);
    document.getElementById("totalCostText").innerHTML = moneda + (envio * subtotal + subtotal).toFixed(2);
    document.getElementById("fila" + i).innerHTML = "";
}

function showCart(array) { // Muestra los productos del carrito
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        htmlContentToAppend += `
        <div id="fila${i}">
            <div class="row" id="fila${i}">
                <div class="col-md-2">
                    <img src="` + product.src + `" class="d-block w-100" alt="...">
                </div>
                <p class="col-md-3">` + product.name + `</p>
                <p class="col-md-2">` + product.currency + ` ` + product.unitCost + `</p>
                <div class="col-md-2" ><input name="cantidad_${product.name}" onchange= changeCant(${i}) class="form-control" type="number" min="0" placeholder="` + product.count + `" id="cant${i}" value="` + product.count + `"></div>
                <p class="col-md-2" id="price` + i + `">` + product.currency + ` ` + price[i] + `</p>
                <div class="col-md-1">
                    <button class="btn-danger btn fas fa-trash-alt" onclick= borrar(${i})></button>
                </div>
            </div>
            <hr>
        </div>   
        `
        if ((moneda == "USD ") && (product.currency == "UYU")) {
            subtotal += price[i] / dolar;
        } else {
            subtotal += price[i];
        }
    }

    document.getElementById("cart").innerHTML = htmlContentToAppend;
    document.getElementById("productCostText").innerHTML = moneda + subtotal;
    document.getElementById("comissionText").innerHTML = moneda + (envio * subtotal).toFixed(2);
    document.getElementById("totalCostText").innerHTML = moneda + (envio * subtotal + subtotal).toFixed(2);
}

function validacion(dato, i) { // Malida si se ingresaron datos en el modal
    if (dato.value == "") {
        dato.classList.add('is-invalid');
        flag = flag && false;

    } else {
        dato.classList.add('is-valid');
        flag = flag && true;
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            products = resultObj.data;
            for (let i = 0; i < products.articles.length; i++) {
                price.push(products.articles[i].unitCost * products.articles[i].count);
                if (products.articles[i].currency == "USD") {
                    moneda = "USD ";
                    document.getElementById("pesos").classList.remove('active');
                    document.getElementById("dolares").classList.add("active");
                }
            }
            showCart(products.articles);
        }
    });
    document.getElementById("card").addEventListener("click", function() { // Muestra el formulario en caso de seleccionar "Tarjeta de crédito"
        formaDePago = 1;
        document.getElementById("cardOptions").innerHTML = cardIn;
        document.getElementById("transfOptions").innerHTML = "";
        document.getElementById("cashOptions").innerHTML = "";
    });
    document.getElementById("transf").addEventListener("click", function() { // Muestra el formulario en caso de seleccionar "Transferencia bancaria"
        formaDePago = 2;
        document.getElementById("cardOptions").innerHTML = "";
        document.getElementById("transfOptions").innerHTML = transfIn;
        document.getElementById("cashOptions").innerHTML = "";
    });
    document.getElementById("cash").addEventListener("click", function() { // Muestra el formulario en caso de seleccionar "Efectivo"
        formaDePago = 3;
        document.getElementById("cardOptions").innerHTML = "";
        document.getElementById("transfOptions").innerHTML = "";
        document.getElementById("cashOptions").innerHTML = cashIn;
    });

    document.getElementById("premiumradio").addEventListener("click", function() { // Muetra el costo de de envio (15%)
        envio = 0.15;
        document.getElementById("comissionText").innerHTML = moneda + (envio * subtotal).toFixed(2);
        document.getElementById("totalCostText").innerHTML = moneda + (envio * subtotal + subtotal).toFixed(2);
    });
    document.getElementById("expressradio").addEventListener("click", function() { // Muetra el costo de de envío (7%)
        envio = 0.07;
        document.getElementById("comissionText").innerHTML = moneda + (envio * subtotal).toFixed(2);
        document.getElementById("totalCostText").innerHTML = moneda + (envio * subtotal + subtotal).toFixed(2);
    });
    document.getElementById("standardradio").addEventListener("click", function() { // Muetra el costo de de envío (5%)
        envio = 0.05;
        document.getElementById("comissionText").innerHTML = moneda + (envio * subtotal).toFixed(2);
        document.getElementById("totalCostText").innerHTML = moneda + (envio * subtotal + subtotal).toFixed(2);
    });
    document.getElementById("sinradio").addEventListener("click", function() { // Muetra el costo de de envío (0%)
        envio = 0;
        document.getElementById("comissionText").innerHTML = moneda + (envio * subtotal).toFixed(2);
        document.getElementById("totalCostText").innerHTML = moneda + (envio * subtotal + subtotal).toFixed(2);
    });

    document.getElementById("pesos").addEventListener("click", function() { // Pasa el subtotal, costo del envío y total en UYU
        if (moneda == "USD ") {
            moneda = "UYU "
            subtotal = subtotal * dolar;
            document.getElementById("productCostText").innerHTML = moneda + subtotal;
            document.getElementById("comissionText").innerHTML = moneda + (envio * subtotal).toFixed(2);
            document.getElementById("totalCostText").innerHTML = moneda + (envio * subtotal + subtotal).toFixed(2);
        }
    });

    document.getElementById("dolares").addEventListener("click", function() { // Pasa el subtotal, costo del envío y total en USD
        if (moneda == "UYU ") {
            moneda = "USD "
            subtotal = subtotal / dolar;
            document.getElementById("productCostText").innerHTML = moneda + subtotal;
            document.getElementById("comissionText").innerHTML = moneda + (envio * subtotal).toFixed(2);
            document.getElementById("totalCostText").innerHTML = moneda + (envio * subtotal + subtotal).toFixed(2);
        }
    });

    document.getElementById('comprobar').addEventListener("click", function() { // Comprueba los formularios


        var botton = document.getElementById('bottonToPay');
        if (formaDePago == 0) { // En caso de no selecionar forma de pago
            botton.classList.remove('is-invalid');
            botton.classList.remove('is-valid');
            botton.classList.add('is-invalid');

        } else {
            var name = document.getElementById('name');
            name.classList.remove('is-invalid');
            name.classList.remove('is-valid');
            validacion(name, 1);

            if (formaDePago == 1) { // En caso de elegir "Tarjeta de crédito"
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
                if (flag) {
                    botton.classList.remove('is-invalid');
                    botton.classList.remove('is-valid');
                    botton.classList.add('is-valid');
                } else {
                    botton.classList.remove('is-invalid');
                    botton.classList.remove('is-valid');
                    botton.classList.add('is-invalid');
                }
                flag = true;

            } else {
                if (formaDePago == 2) { // En caso de elegir "Transferencia bancaria"
                    var number = document.getElementById('number');
                    var bank = document.getElementById('bank');
                    var sucursal = document.getElementById('sucursal');
                    number.classList.remove('is-invalid');
                    number.classList.remove('is-valid');
                    bank.classList.remove('is-invalid');
                    bank.classList.remove('is-valid');
                    sucursal.classList.remove('is-invalid');
                    sucursal.classList.remove('is-valid');
                    validacion(number, 2);
                    validacion(bank, 3);
                    validacion(sucursal, 4);
                    if (flag) {
                        botton.classList.remove('is-invalid');
                        botton.classList.remove('is-valid');
                        botton.classList.add('is-valid');
                    } else {
                        botton.classList.remove('is-invalid');
                        botton.classList.remove('is-valid');
                        botton.classList.add('is-invalid');
                    }
                    flag = true;
                } else { // En caso de elegir "Efectivo"
                    var red = document.getElementById('red');
                    red.classList.remove('is-invalid');
                    red.classList.remove('is-valid');
                    validacion(red, 2);
                    if (flag) {
                        botton.classList.remove('is-invalid');
                        botton.classList.remove('is-valid');
                        botton.classList.add('is-valid');
                    } else {
                        botton.classList.remove('is-invalid');
                        botton.classList.remove('is-valid');
                        botton.classList.add('is-invalid');
                    }
                    flag = true;
                }

            }



        }
    });
});