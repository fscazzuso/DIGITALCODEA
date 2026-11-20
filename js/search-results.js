let queryString = location.search;
let parametros = new URLSearchParams(queryString);
let termino = parametros.get('q');
let estadoResultados = document.querySelector('#estado-productos');

if (termino === null || termino === '') {
    estadoResultados.innerHTML = 'Ingresá un término en el buscador.';
} else if (termino.length < 3) {
    estadoResultados.innerHTML = 'Ingresá al menos 3 caracteres.';
} else {
    document.querySelector('#titulo-busqueda').innerHTML = 'Resultados de búsqueda para: ' + termino;

    fetch('https://dummyjson.com/products/search' + queryString + '&limit=0')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            crearTarjetas(data.products, '#resultados');
            estadoResultados.innerHTML = '';

            if (data.products.length === 0) {
                estadoResultados.innerHTML = 'No hay resultados para el término: ' + termino;
            }
        })
        .catch(function () {
            estadoResultados.innerHTML = 'No se pudo realizar la búsqueda.';
        });
}