let queryString = location.search;
let parametros = new URLSearchParams(queryString);
let categoria = parametros.get('categoria');
let estadoProductos = document.querySelector('#estado-productos');

if (categoria === null || categoria === '') {
    estadoProductos.innerHTML = 'Elegí una categoría del menú.';
} else {
    document.querySelector('#titulo-categoria').innerHTML = 'Productos por categoría';

    fetch('https://dummyjson.com/products/category/' + categoria + '?limit=0')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            crearTarjetas(data.products, '#productos-categoria');
            estadoProductos.innerHTML = '';

            if (data.products.length === 0) {
                estadoProductos.innerHTML = 'No hay productos en esta categoría.';
            }
        })
        .catch(function () {
            estadoProductos.innerHTML = 'No se pudieron cargar los productos.';
        });
}