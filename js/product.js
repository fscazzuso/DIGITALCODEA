let formularioBusqueda = document.querySelector('.formulario-busqueda');
let campoBusqueda = document.querySelector('#buscador');
let errorBusqueda = document.querySelector('#error-busqueda');

formularioBusqueda.addEventListener('submit', function (event) {
    event.preventDefault();

    if (campoBusqueda.value === '') {
        errorBusqueda.innerText = 'El campo de búsqueda no puede estar vacío';
    } else if (campoBusqueda.value.length < 3) {
        errorBusqueda.innerText = 'La búsqueda debe tener al menos 3 caracteres';
    } else {
        this.submit();
    }
});

let listaCategorias = document.querySelector('.lista-categorias');
let estadoCategorias = document.querySelector('.estado-categorias');

fetch('https://dummyjson.com/products/categories')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let categorias = '';
        for (let i = 0; i < data.length; i++) {
            categorias += `<li><a href="category.html?categoria=${data[i].slug}">${data[i].name}</a></li>`;
        }
        listaCategorias.innerHTML = categorias;
        estadoCategorias.innerText = '';
    })
    .catch(function (error) {
        console.log('Error: ' + error);
    });

let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let idProducto = queryStringObj.get('id');

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
        categoriaProducto.innerHTML = `<a href="category.html?categoria=${data.category}">${data.category}</a>`;

        if (data.brand === undefined) {
            marcaProducto.innerText = 'Sin marca';
        } else {
            marcaProducto.innerText = data.brand;
        }

        let tags = '';
        for (let i = 0; i < data.tags.length; i++) {
            if (i < 3) {
                tags += `<li>${data.tags[i]}</li>`;
            }
        }
        tagsProducto.innerHTML = tags;

        let reviews = '';
        for (let i = 0; i < data.reviews.length; i++) {
            reviews += `
                <article>
                    <h3>Rating: ${data.reviews[i].rating} / 5</h3>
                    <p>${data.reviews[i].comment}</p>
                    <p>Fecha: ${data.reviews[i].date}</p>
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
