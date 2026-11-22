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
            categorias = categorias + `<li><a href="category.html?categoria=${data[i].slug}">${data[i].name}</a></li>`;
        }
        listaCategorias.innerHTML = categorias;
        estadoCategorias.innerText = '';
    })
    .catch(function (error) {
        console.log('Error: ' + error);
    });

let formularioRegistro = document.querySelector('#formulario-registro');
let campoEmail = document.querySelector('#email');
let campoContrasena = document.querySelector('#contrasena');
let campoRepetir = document.querySelector('#repetir-contrasena');
let errorEmail = document.querySelector('#error-email');
let errorContrasena = document.querySelector('#error-contrasena');
let errorRepetir = document.querySelector('#error-repetir');

formularioRegistro.addEventListener('submit', function (event) {
    event.preventDefault();

    errorEmail.innerText = '';
    errorContrasena.innerText = '';
    errorRepetir.innerText = '';

    if (campoEmail.value === '') {
        errorEmail.innerText = 'El email es obligatorio';
    } else if (campoContrasena.value === '') {
        errorContrasena.innerText = 'La contraseña es obligatoria';
    } else if (campoContrasena.value.length < 6) {
        errorContrasena.innerText = 'La contraseña debe tener al menos 6 caracteres';
    } else if (campoContrasena.value !== campoRepetir.value) {
        errorRepetir.innerText = 'Las contraseñas no coinciden';
    } else {
        this.submit();
    }
});
