function crearTarjetas(productos, selector) {
    let tarjetas = '';
    for (let i = 0; i < productos.length; i++) {
        tarjetas += `
            <article>
                <img alt="Imagen del producto">
                <h3></h3>
                <p class="descripcion"></p>
                <p class="precio"></p>
                <a class="boton-detalle" href="product.html?id=${Number(productos[i].id)}">Ver detalle</a>
            </article>`;
    }
    document.querySelector(selector).innerHTML = tarjetas;

    let imagenes = document.querySelectorAll(selector + ' img');
    let titulos = document.querySelectorAll(selector + ' h3');
    let descripciones = document.querySelectorAll(selector + ' .descripcion');
    let precios = document.querySelectorAll(selector + ' .precio');
    for (let i = 0; i < productos.length; i++) {
        imagenes[i].src = productos[i].thumbnail;
        titulos[i].innerText = productos[i].title;
        descripciones[i].innerText = productos[i].description;
        precios[i].innerText = 'USD ' + productos[i].price;
    }
}

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

function validarCuenta() {
    let email = document.querySelector('#email').value;
    let contrasena = document.querySelector('#contrasena').value;
    let errorEmail = '';
    let errorContrasena = '';

    if (email === '') {
        errorEmail = 'El email es obligatorio.';
    }
    if (contrasena === '') {
        errorContrasena = 'La contraseña es obligatoria.';
    } else if (contrasena.length < 6) {
        errorContrasena = 'La contraseña debe tener al menos 6 caracteres';
    }

    document.querySelector('#error-email').innerText = errorEmail;
    document.querySelector('#error-contrasena').innerText = errorContrasena;
    return errorEmail === '' && errorContrasena === '';
}