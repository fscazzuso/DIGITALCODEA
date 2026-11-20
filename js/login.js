document.querySelector('#formulario-login').addEventListener('submit', function (event) {
    event.preventDefault();
    if (validarCuenta()) {
        localStorage.setItem('emailUsuario', document.querySelector('#email').value);
        this.submit();
    }
});