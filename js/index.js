fetch('https://dummyjson.com/products/category/smartphones?limit=10')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        crearTarjetas(data.products, '#productos-destacados');
        document.querySelector('#estado-destacados').innerText = '';
    })
    .catch(function () {
        document.querySelector('#estado-destacados').innerText = 'No se pudieron cargar los productos.';
    });

fetch('https://dummyjson.com/products/category/mobile-accessories?limit=10')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        crearTarjetas(data.products, '#productos-nuevos');
        document.querySelector('#estado-nuevos').innerText = '';
    })
    .catch(function () {
        document.querySelector('#estado-nuevos').innerText = 'No se pudieron cargar los productos.';
    });
