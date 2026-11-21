document.querySelector('.enlace-logout').addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.removeItem('emailUsuario');
    document.querySelector('.saludo').innerText = '';
    document.querySelector('.saludo').style.display = 'none';
    document.querySelector('.enlace-logout').style.display = 'none';
    document.querySelector('.enlace-login').style.display = 'inline';
    document.querySelector('.enlace-registro').style.display = 'inline';
});
