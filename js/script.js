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
    let nombre = nombreRegistro.value.trim();
    let email = regEmail.value.trim();
    let pass = regPass.value;
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
    let email = loginEmail.value.trim();
    let pass = loginPass.value;
    let user = findUser(email, pass);
    if (user) {
        loginMsg.textContent = "";
        localStorage.setItem('loggedUser', user.nombre); // Guarda el nombre del usuario
        window.location.href = "home.html"; // Redirige al home
        loginForm.reset();
    } else {
        loginMsg.textContent = "Correo o contraseña incorrectos.";
        welcome.textContent = "";
        loginForm.reset(); // Limpia los campos si los datos son incorrectos
    }


    /*
        //Registro hecho por el profe
        function registroUsuario() {
            let nombreCompleto = document.getElementById("nombreCompleto").value
            let correoElectronico = document.getElementById("correoElectronico").value
            let password1 = document.getElementById("password1").value
            let password2 = document.getElementById("password2").value
            //es una variable de estado(bandera)
            let existe = false
            //Usuarios es un elemento del localStorage llamado usuarios, si no existe
            //es un array vacío
            let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
    
            for (let i = 0 ;i< usuarios.length; i++){
                if(usuarios[i].correoElectronico === correoElectronico){
                    existe = true
                    break
                }
            }
            if (correoElectronico == "" || password1 == "" || password2 == "" || nombreCompleto == ""){
                alert("Todos los campos deben estar completados ")
            }
            else if (password1 != password2){
                alert("Las contraseñas no coinciden")
            }
            else if (existe){
                alert("El correo electrónico ya está registrado ")
            }
            else{
                usuarios.push({nombreCompleto, correoElectronico, password1})
                localStorage.setItem("usuarios", JSON.stringify(usuarios))
            }
        }
            */
};