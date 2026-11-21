let email = localStorage.getItem('emailUsuario');
let saludo = document.querySelector('.saludo');
let login = document.querySelector('.enlace-login');
let registro = document.querySelector('.enlace-registro');
let logout = document.querySelector('.enlace-logout');

if (email !== null) {
    saludo.innerText = 'Bienvenido: ' + email;
    saludo.style.display = 'inline';
    logout.style.display = 'inline';
    login.style.display = 'none';
    registro.style.display = 'none';
}
