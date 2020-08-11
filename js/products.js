var currentProductsArray = [];
var minCount = undefined;
var maxCount = undefined;

function showCategoriesList(categoriesArray) {

    if (categoriesArray != undefined) {
        currentProductsArray = productsArray;
    }

    console.log(productsArray);

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];
        htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + category.name + `</h4>
                            <small class="text-muted">` + category.currency + ` ` + category.soldCount + `</small>
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                    </div>
                </div>
            </a>
            `
        console.log(htmlContentToAppend);

        document.getElementById("spinner-wrapper").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            showCategoriesList(resultObj.data);
        }
    });

});