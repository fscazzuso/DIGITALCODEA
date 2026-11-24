let queryStringProducto = new URLSearchParams(location.search);
let idProducto = queryStringProducto.get('id');

let estadoProducto = document.querySelector('#estado-producto');
let nombreProducto = document.querySelector('#nombre-producto');
let fotoProducto = document.querySelector('#foto-producto');
let marcaProducto = document.querySelector('#marca-producto');
let descripcionProducto = document.querySelector('#descripcion-producto');
let precioProducto = document.querySelector('#precio-producto');
let categoriaProducto = document.querySelector('#categoria-producto');
let stockProducto = document.querySelector('#stock-producto');
let tagsProducto = document.querySelector('#tags-producto');
let reviewsProducto = document.querySelector('#reviews');

fetch('https://dummyjson.com/products/' + idProducto)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        nombreProducto.innerText = data.title;
        fotoProducto.src = data.thumbnail;
        fotoProducto.alt = data.title;
        descripcionProducto.innerText = data.description;
        precioProducto.innerText = 'USD ' + data.price;
        stockProducto.innerText = data.stock + ' unidades';
        categoriaProducto.innerText = data.category;
        categoriaProducto.href = 'category.html?categoria=' + data.category;

        if (data.brand === undefined) {
            marcaProducto.innerText = 'Sin marca';
        } else {
            marcaProducto.innerText = data.brand;
        }

        let tags = '';
        for (let i = 0; i < data.tags.length; i++) {
            if (i < 3) {
                tags = tags + `<li>${data.tags[i]}</li>`;
            }
        }
        tagsProducto.innerHTML = tags;

        let reviews = '';
        for (let i = 0; i < data.reviews.length; i++) {
            reviews = reviews + `
                <article>
                    <h3>Rating: ${data.reviews[i].rating} / 5</h3>
                    <p>${data.reviews[i].comment}</p>
                    <p>Fecha: ${data.reviews[i].date.slice(0, 10)}</p>
                    <p>Usuario: ${data.reviews[i].reviewerName}</p>
                </article>`;
        }
        reviewsProducto.innerHTML = reviews;

        estadoProducto.innerText = '';
        document.querySelector('#detalle-producto').style.display = 'block';
        document.querySelector('#seccion-reviews').style.display = 'block';
    })
    .catch(function (error) {
        console.log('Error: ' + error);
    });
