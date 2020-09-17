var product = {};

function showImagesGallery(array) {

    let htmlContentToAppend = "";
    if (array.length > 0) {
        htmlContentToAppend += `
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="` + array[0] + `" class="d-block w-100" alt="...">
                </div>`
        for (let i = 1; i < array.length; i++) {
            let imageSrc = array[i];

            htmlContentToAppend += `
            <div class="carousel-item">
                <img src="` + imageSrc + `" class="d-block w-100" alt="...">
            </div>
            `
        }
        htmlContentToAppend += `   
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        `
    }
    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
}

function showRelatedProducts(products, related) {
    let htmlContentToAppend = "";

    for (let i = 0; i < related.length; i++) {
        let relatepr = products[related[i]];

        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action col-3" >
        <div>
            <img src="` + relatepr.imgSrc + `" alt="` + relatepr.description + `" class="img-thumbnail">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">` + relatepr.name + `</h4>
            </div>
            <p class="mb-1">` + relatepr.description + `</p>
        </div>
        </a>            
        `

        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
    }

};

function showStars(cantidad) {
    let stars = "";

    for (let i = 0; i < cantidad; i++) {
        stars += `<span class="fa fa-star checked"></span>`
    };
    for (let i = 0; i < 5 - cantidad; i++) {
        stars += `<span class="fa fa-star"></span>`
    };
    return stars;
};

function showComments(comments) {

    let htmlContentToAppend = "";

    for (let i = 0; i < comments.length; i++) {
        let info = comments[i];
        htmlContentToAppend += `
            <div class="list-group-item ">
                <div class="row">
                    <div class="col">
                        <p>Puntaje: ` + showStars(info.score) + `</p>
                        <p>Opinion: ` + info.description + `</p>
                        <p>Usuario: ` + info.user + `</p>
                        <p>Fecha: ` + info.dateTime + `</p>
                    </div>
                </div>
            </div>
            `

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
    document.getElementById("enviar").addEventListener("click", function() {
        showStars(document.getElementById("score").value);
        today = new Date();
        dd = today.getDate();
        mm = today.getMonth() + 1;
        yyyy = today.getFullYear();
        hour = today.getHours();
        minutes = today.getMinutes();
        seconds = today.getSeconds();
        date = yyyy + `-` + mm + `-` + dd + ` ` + hour + `:` + minutes + `:` + seconds;
        htmlContentToAppend = `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col">
                    <p>Puntaje: ` + stars + `</p>
                    <p>Opinion: ` + document.getElementById("cuerpo").value + `</p>
                    <p>Usuario: ` + localStorage.getItem('usuario') + `</p>
                    <p>Fecha: ` + date + `</p>
                </div>
            </div>
        </div>
        `
        stars = "";
        document.getElementById("comments").innerHTML += htmlContentToAppend;
    });

});