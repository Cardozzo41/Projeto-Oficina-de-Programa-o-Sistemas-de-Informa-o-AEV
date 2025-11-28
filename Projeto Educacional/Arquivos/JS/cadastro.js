// Garante que o script só rode depois que o DOM carregar
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formCadastro");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;
        const confirmar = document.getElementById("confirmar").value;

        // Verifica campos vazios
        if (!nome || !email || !senha || !confirmar) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Verifica senhas diferentes
        if (senha !== confirmar) {
            alert("As senhas não coincidem! Tente novamente.");
            return;
        }

        // Salva usuário no localStorage
        const usuario = {
            nome: nome,
            email: email,
            senha: senha
        };

        localStorage.setItem("usuario", JSON.stringify(usuario));

        alert("Cadastro realizado com sucesso!");

        // Redireciona para index
        window.location.href = "../HTML/index.html"; // <- Caminho correto no seu projeto
    });

});
