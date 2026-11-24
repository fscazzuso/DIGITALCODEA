let listaCategorias = document.querySelector('.lista-categorias');
let estadoCategorias = document.querySelector('.estado-categorias');

fetch('https://dummyjson.com/products/categories')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let contenido = '';
        for (let i = 0; i < data.length; i++) {
            contenido = contenido + `<li><a href="category.html?categoria=${data[i].slug}">${data[i].name}</a></li>`;
        }
        listaCategorias.innerHTML = contenido;
        estadoCategorias.innerText = '';
    })
    .catch(function (error) {
        console.log('Error: ' + error);
    });

let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let categoria = queryStringObj.get('categoria');

if (categoria !== null) {
    let tituloCategoria = document.querySelector('#titulo-categoria');
    let estadoProductos = document.querySelector('#estado-productos');
    let seccionProductos = document.querySelector('#productos-categoria');

    tituloCategoria.innerText = 'Productos de la categoría: ' + categoria;

    fetch('https://dummyjson.com/products/category/' + categoria)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let productos = data.products;
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
            seccionProductos.innerHTML = contenido;
            estadoProductos.innerText = '';
        })
        .catch(function (error) {
            console.log('Error: ' + error);
        });
}
