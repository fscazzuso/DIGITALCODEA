let formularioBusqueda = document.querySelector('.formulario-busqueda');
let campoBusqueda = document.querySelector('#buscador');
let errorBusqueda = document.querySelector('#error-busqueda');

formularioBusqueda.addEventListener('submit', function (event) {
    event.preventDefault();
    errorBusqueda.innerText = '';

    if (campoBusqueda.value === '') {
        errorBusqueda.innerText = 'Ingresá un término de búsqueda.';
    } else if (campoBusqueda.value.length < 3) {
        errorBusqueda.innerText = 'La búsqueda debe tener al menos 3 caracteres.';
    } else {
        this.submit();
    }
});

campoBusqueda.addEventListener('input', function () {
    errorBusqueda.innerText = '';
});

let listaCategorias = document.querySelector('.lista-categorias');
let estadoCategorias = document.querySelector('.estado-categorias');

fetch('https://dummyjson.com/products/categories')
    .then(function (response) {
        return response.json();
    })
    .then(function (categorias) {
        let enlaces = '';
        for (let i = 0; i < categorias.length; i++) {
            enlaces += `<li><a href="category.html?categoria=${categorias[i].slug}"></a></li>`;
        }
        listaCategorias.innerHTML = enlaces;
        let textos = document.querySelectorAll('.lista-categorias a');
        for (let i = 0; i < categorias.length; i++) {
            textos[i].innerText = categorias[i].name;
        }
        estadoCategorias.innerText = '';
    })
    .catch(function () {
        estadoCategorias.innerText = 'No se pudieron cargar las categorías. Volvé a intentar.';
    });

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
            let tarjetas = '';
            for (let i = 0; i < data.products.length; i++) {
                tarjetas += `
                    <article>
                        <img alt="Imagen del producto">
                        <h3></h3>
                        <p class="descripcion"></p>
                        <p class="precio"></p>
                        <a class="boton-detalle" href="product.html?id=${Number(data.products[i].id)}">Ver detalle</a>
                    </article>`;
            }
            document.querySelector('#resultados').innerHTML = tarjetas;

            let imagenes = document.querySelectorAll('#resultados img');
            let titulos = document.querySelectorAll('#resultados h3');
            let descripciones = document.querySelectorAll('#resultados .descripcion');
            let precios = document.querySelectorAll('#resultados .precio');
            for (let i = 0; i < data.products.length; i++) {
                imagenes[i].src = data.products[i].thumbnail;
                titulos[i].innerText = data.products[i].title;
                descripciones[i].innerText = data.products[i].description;
                precios[i].innerText = 'USD ' + data.products[i].price;
            }
            estadoResultados.innerHTML = '';

            if (data.products.length === 0) {
                estadoResultados.innerHTML = 'No hay resultados para el término: ' + termino;
            }
        })
        .catch(function () {
            estadoResultados.innerHTML = 'No se pudo realizar la búsqueda.';
        });
}
