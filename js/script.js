// Guardar usuario en localStorage
function saveUser(nombre, email, pass) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    // Validar si el correo ya existe
    if (users.some(u => u.email === email)) {
        return false;
    }
    users.push({ nombre, email, pass });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

// Buscar usuario para login
function findUser(email, pass) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(u => u.email === email && u.pass === pass);
}

// Registro
document.getElementById('registerForm').onsubmit = function (e) {
    e.preventDefault();
    const nombre = nombreRegistro.value.trim();
    const email = regEmail.value.trim();
    const pass = regPass.value;
    if (saveUser(nombre, email, pass)) {
        regMsg.textContent = "Registro exitoso.";
        registerForm.reset();
    } else {
        regMsg.textContent = "El correo ya está registrado.";
        registerForm.reset(); // Limpia los campos del formulario de registro si este ya se encuentra registrado
    }
};

// Login
document.getElementById('loginForm').onsubmit = function (e) {
    e.preventDefault();
    const email = loginEmail.value.trim();
    const pass = loginPass.value;
    const user = findUser(email, pass);
    if (user) {
        loginMsg.textContent = "";
        localStorage.setItem('loggedUser', user.name); // Guarda el nombre del usuario
        window.location.href = "home.html"; // Redirige al home
        loginForm.reset();
    } else {
        loginMsg.textContent = "Correo o contraseña incorrectos.";
        welcome.textContent = "";
        loginForm.reset(); // Limpia los campos si los datos son incorrectos
    }
};