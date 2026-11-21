let email = localStorage.getItem('emailUsuario');
let saludo = document.querySelector('.saludo');
let login = document.querySelector('.enlace-login');
let registro = document.querySelector('.enlace-registro');
let logout = document.querySelector('.enlace-logout');

if (email !== null && email !== '') {
    saludo.innerText = 'Bienvenido: ' + email;
    saludo.style.display = 'inline';
    logout.style.display = 'inline';
    login.style.display = 'none';
    registro.style.display = 'none';
} else {
    saludo.innerText = '';
    saludo.style.display = 'none';
    logout.style.display = 'none';
    login.style.display = 'inline';
    registro.style.display = 'inline';
}
