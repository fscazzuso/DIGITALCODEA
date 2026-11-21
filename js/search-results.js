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
let termino = queryStringObj.get('q');

let tituloBusqueda = document.querySelector('#titulo-busqueda');
let estadoResultados = document.querySelector('#estado-productos');
let seccionResultados = document.querySelector('#resultados');

tituloBusqueda.innerText = 'Resultados de búsqueda para: ' + termino;

fetch('https://dummyjson.com/products/search?q=' + termino)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (data.products.length === 0) {
            estadoResultados.innerText = 'No hay resultados para el término: ' + termino;
        } else {
            let productos = '';
            for (let i = 0; i < data.products.length; i++) {
                productos += `
                    <article>
                        <img src="${data.products[i].thumbnail}" alt="${data.products[i].title}">
                        <h3>${data.products[i].title}</h3>
                        <p class="descripcion">${data.products[i].description}</p>
                        <p class="precio">USD ${data.products[i].price}</p>
                        <a class="boton-detalle" href="product.html?id=${data.products[i].id}">Ver detalle</a>
                    </article>`;
            }
            seccionResultados.innerHTML = productos;
            estadoResultados.innerText = '';
        }
    })
    .catch(function (error) {
        console.log('Error: ' + error);
    });
