const ORDER_ASC_BY_COST = "MinMax";
const ORDER_DESC_BY_COST = "MaxMin";
const ORDER_BY_SOLD_COUNT = "Relevancia.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;


function sortProduct(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) { // Ordena por costo ascendente
        result = array.sort(function(a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) { // Ordena por costo descendente
        result = array.sort(function(a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_SOLD_COUNT) { // Ordena por cantidad de vendidos
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}



function showProductsList() { // Muesta en pantalla los poroductos ordenados según el criterio elegido

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {

            htmlContentToAppend += `
            <div class="col-md-4">
                <a href="product-info.html" class="card mb-4 shadow-sm custom-card list-group-item list-group-item-action">
                    <img class="bd-placeholder-img card-img-top" src="` + product.imgSrc + `" alt="` + product.description + `">
                    <h3 class="m-3">` + product.name + ` - ` + product.currency + ` ` + product.cost + `</h3>
                    <div class="card-body">
                        <small class="text-muted">` + product.soldCount + ` articulos</small>
                        <p class="card-text">` + product.description + `</p>
                    </div>
                </a>
            </div>
            `
        }

        document.getElementById("pro-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productArray) { // Ordena y muestra los productos en el orden elegido
    currentSortCriteria = sortCriteria;

    if (productArray != undefined) {
        currentProductsArray = productArray;
    }

    currentProductsArray = sortProduct(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data); // Muestra por defecto los productos en orden ascendente según precio
        }
    });
    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() { // Limpia el rango de precios de los productos
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = document.getElementById("rangeFilterCountMin").value;
        maxCost = document.getElementById("rangeFilterCountMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        } else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        } else {
            maxCost = undefined;
        }

        showProductsList();
    });
});