document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const userActions = document.getElementById("userActions");
    const userProfile = document.getElementById("userProfile");
    const nomeUsuario = document.getElementById("nomeUsuario");

    if (usuario) {
        // Oculta "Entrar" e "Registrar"
        userActions.style.display = "none";

        // Mostra "Perfil"
        userProfile.style.display = "block";
        nomeUsuario.textContent = usuario.nome.split(" ")[0]; // mostra só o primeiro nome
    } else {
        // Se não estiver logado
        userActions.style.display = "block";
        userProfile.style.display = "none";
    }
});
