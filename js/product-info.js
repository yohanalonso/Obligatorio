var product = {};
var stars = "";

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showRelatedProducts(products, related) {
    let htmlContentToAppend = "";

    for (let i = 0; i < related.length; i++) {
        let relatepr = products[related[i]];

        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="` + relatepr.imgSrc + `" alt="` + relatepr.description + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">` + relatepr.name + `</h4>
                </div>
            </div>
        </div>
        </a>            
        `

        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
    }

};

function showStars(cantidad) {

    for (let i = 0; i < cantidad; i++) {
        stars += `<span class="fa fa-star checked"></span>`
    };
    for (let i = 0; i < 5 - cantidad; i++) {
        stars += `<span class="fa fa-star"></span>`
    };
};

function showComments(comments) {

    let htmlContentToAppend = "";

    for (let i = 0; i < comments.length; i++) {
        let info = comments[i];
        showStars(info.score);
        htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <p>Puntaje: ` + stars + `</p>
                        <p>Opinion: ` + info.description + `</p>
                        <p>Usuario: ` + info.user + `</p>
                        <p>Fecha: ` + info.dateTime + `</p>
                    </div>
                </div>
            </a>
            `

        stars = "";
    }
    document.getElementById("comments").innerHTML = htmlContentToAppend;

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let categoryNameHTML = document.getElementById("categoryName");
            let descriptionHTML = document.getElementById("description");
            let soldCountHTML = document.getElementById("soldCount");
            let categoryHTML = document.getElementById("category");
            let priceHTML = document.getElementById("price");

            categoryNameHTML.innerHTML = product.name;
            descriptionHTML.innerHTML = product.description;
            soldCountHTML.innerHTML = product.soldCount;
            categoryHTML.innerHTML = product.category;
            priceHTML.innerHTML = product.currency + ` ` + product.cost;

            getJSONData(PRODUCTS_URL).then(function(resultObj) {
                if (resultObj.status === "ok") {
                    showRelatedProducts(resultObj.data, product.relatedProducts);
                };
            });

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            showComments(resultObj.data);
        }
    });

});