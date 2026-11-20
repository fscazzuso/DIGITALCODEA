let queryString = location.search;
let parametros = new URLSearchParams(queryString);
let idProducto = parametros.get('id');
let estadoProducto = document.querySelector('#estado-producto');

if (Number(idProducto) > 0) {
    fetch('https://dummyjson.com/products/' + idProducto)
        .then(function (response) {
            return response.json();
        })
        .then(function (producto) {
            if (producto.id === undefined) {
                estadoProducto.innerHTML = 'No se encontró el producto.';
                return;
            }

            document.querySelector('#nombre-producto').innerHTML = producto.title;
            document.querySelector('#descripcion-producto').innerHTML = producto.description;
            document.querySelector('#precio-producto').innerHTML = 'USD ' + producto.price;
            document.querySelector('#foto-producto').src = producto.thumbnail;
            document.querySelector('#stock-producto').innerHTML = producto.stock + ' unidades';

            let marca = 'Sin marca informada';
            if (producto.brand !== undefined && producto.brand !== null) {
                marca = producto.brand;
            }
            document.querySelector('#marca-producto').innerHTML = marca;

            document.querySelector('#categoria-producto').innerHTML = `<a href="category.html?categoria=${producto.category}"></a>`;
            document.querySelector('#categoria-producto a').innerHTML = producto.category;

            let etiquetas = [];
            if (producto.tags !== undefined && producto.tags !== null) {
                etiquetas = producto.tags;
            }

            let tags = document.querySelector('#tags-producto');
            tags.innerHTML = '';

            for (let i = 0; i < etiquetas.length && i < 3; i++) {
                tags.innerHTML += '<li></li>';
                let textosTags = document.querySelectorAll('#tags-producto li');
                textosTags[i].innerHTML = etiquetas[i];
            }

            let comentarios = [];
            if (producto.reviews !== undefined && producto.reviews !== null) {
                comentarios = producto.reviews;
            }

            let reviews = document.querySelector('#reviews');
            reviews.innerHTML = '';

            for (let i = 0; i < comentarios.length; i++) {
                reviews.innerHTML += `
                    <article>
                        <h3 class="rating"></h3>
                        <p class="comentario"></p>
                        <p class="fecha"></p>
                        <p class="usuario"></p>
                    </article>`;

                let ratings = document.querySelectorAll('#reviews .rating');
                let textos = document.querySelectorAll('#reviews .comentario');
                let fechas = document.querySelectorAll('#reviews .fecha');
                let usuarios = document.querySelectorAll('#reviews .usuario');

                ratings[i].innerHTML = 'Rating: ' + comentarios[i].rating + ' / 5';
                textos[i].innerHTML = comentarios[i].comment;
                fechas[i].innerHTML = 'Fecha: ' + comentarios[i].date;
                usuarios[i].innerHTML = 'Usuario: ' + comentarios[i].reviewerName;
            }

            if (comentarios.length === 0) {
                document.querySelector('#estado-reviews').innerHTML = 'Este producto todavía no tiene reviews.';
            }

            estadoProducto.innerHTML = '';
            document.querySelector('#detalle-producto').style.display = 'block';
            document.querySelector('#seccion-reviews').style.display = 'block';
        })
        .catch(function () {
            estadoProducto.innerHTML = 'No se pudo cargar el producto.';
        });
} else {
    estadoProducto.innerHTML = 'Elegí un producto desde el catálogo.';
}