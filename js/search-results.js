let queryStringBusqueda = new URLSearchParams(location.search);
let termino = queryStringBusqueda.get('q');

let tituloBusqueda = document.querySelector('#titulo-busqueda');
let estadoResultados = document.querySelector('#estado-productos');
let seccionResultados = document.querySelector('#resultados');

tituloBusqueda.innerText = 'Resultados de búsqueda para: ' + termino;

fetch('https://dummyjson.com/products/search?q=' + termino)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let productos = data.products;
        if (productos.length === 0) {
            estadoResultados.innerText = 'No hay resultados para el término: ' + termino;
        } else {
            let contenido = '';
            for (let i = 0; i < productos.length; i++) {
                contenido = contenido + `
                    <article>
                        <img src="${productos[i].thumbnail}" alt="${productos[i].title}">
                        <h3>${productos[i].title}</h3>
                        <p class="descripcion">${productos[i].description}</p>
                        <p class="precio">USD ${productos[i].price}</p>
                        <a class="boton-detalle" href="product.html?id=${productos[i].id}">Ver detalle</a>
                    </article>`;
            }
            seccionResultados.innerHTML = contenido;
            estadoResultados.innerText = '';
        }
    })
    .catch(function (error) {
        console.log('Error: ' + error);
    });
