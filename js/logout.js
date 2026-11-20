document.querySelector('.enlace-logout').addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.removeItem('emailUsuario');
    actualizarSaludo();
});