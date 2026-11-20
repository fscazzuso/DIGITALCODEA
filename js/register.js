document.querySelector('#formulario-registro').addEventListener('submit', function (event) {
    event.preventDefault();

    let cuentaValida = validarCuenta();
    let contrasena = document.querySelector('#contrasena').value;
    let repeticion = document.querySelector('#repetir-contrasena').value;

    document.querySelector('#error-repetir').innerHTML = '';

    if (contrasena !== repeticion) {
        document.querySelector('#error-repetir').innerHTML = 'Las contraseñas no coinciden';
    } else if (cuentaValida === true) {
        this.submit();
    }
});