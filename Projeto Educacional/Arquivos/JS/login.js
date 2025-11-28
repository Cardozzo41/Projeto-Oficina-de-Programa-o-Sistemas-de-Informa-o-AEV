document.getElementById("formLogin").addEventListener("submit", function(event) {
  event.preventDefault();

  const emailDigitado = document.getElementById("email").value.trim();
  const senhaDigitada = document.getElementById("senha").value;

  // Recupera usuário salvo no cadastro
  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

  if (!usuarioSalvo) {
    alert("Nenhum usuário cadastrado encontrado!");
    return;
  }

  if (emailDigitado === usuarioSalvo.email && senhaDigitada === usuarioSalvo.senha) {
    alert("Login realizado com sucesso!");

    // Redirecionar para página inicial (ajuste ao seu caminho)
    window.location.href = "/Arquivos/HTML/index.html";
  } else {
    alert("E-mail ou senha incorretos!");
  }
});
