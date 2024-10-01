export function validarCredenciales(credenciales) {
    if (credenciales.username?.trim() === '' && credenciales.password.trim() === '') {
        return {
            esValido : false,
            mensaje : "Completa los campos vacíos."
        }
    }
    if (credenciales.username.trim() === '') {
        return {
            esValido: false,
            mensaje: "El nombre de usuario no puede estar vacío."
        };
    }
  
    if (credenciales.password.trim() === '') {
        return {
            esValido: false,
            mensaje: "La contraseña no puede estar vacía."
        };
    }
  
    return {
        esValido: true,
        mensaje: "Las credenciales son válidas."
    };
  }