let seccionSmartphones = document.querySelector('#productos-smartphones');
let estadoSmartphones = document.querySelector('#estado-smartphones');

fetch('https://dummyjson.com/products/category/smartphones?limit=10')
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
        seccionSmartphones.innerHTML = contenido;
        estadoSmartphones.innerText = '';
    })
    .catch(function (error) {
        console.log('Error: ' + error);
    });

let seccionAccesorios = document.querySelector('#productos-accesorios');
let estadoAccesorios = document.querySelector('#estado-accesorios');

fetch('https://dummyjson.com/products/category/mobile-accessories?limit=10')
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
        seccionAccesorios.innerHTML = contenido;
        estadoAccesorios.innerText = '';
    })
    .catch(function (error) {
        console.log('Error: ' + error);
    });
