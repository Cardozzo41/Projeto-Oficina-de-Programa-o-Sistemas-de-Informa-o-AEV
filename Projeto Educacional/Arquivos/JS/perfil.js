document.addEventListener("DOMContentLoaded", () => {
  // Recupera usuário
  let usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    // Se não estiver logado, volta pro login
    window.location.href = "login.html";
    return;
  }

  // ====== ELEMENTOS ======
  const bemVindoTopo = document.getElementById("bemVindoTopo");
  const perfilNome = document.getElementById("perfilNome");
  const perfilEmail = document.getElementById("perfilEmail");
  const perfilData = document.getElementById("perfilData");
  const fotoPerfil = document.getElementById("fotoPerfil");

  const editNome = document.getElementById("editNome");
  const editSenha = document.getElementById("editSenha");
  const editEmail = document.getElementById("editEmail");
  const editEmailConf = document.getElementById("editEmailConfirma");
  const facebookUser = document.getElementById("facebookUser");
  const twitterUser = document.getElementById("twitterUser");

  const nomeCartao = document.getElementById("nomeCartao");
  const numCartao = document.getElementById("numCartao");
  const validadeCartao = document.getElementById("validadeCartao");
  const cvvCartao = document.getElementById("cvvCartao");
  const enderecoCobranca = document.getElementById("enderecoCobranca");
  const cepCobranca = document.getElementById("cepCobranca");

  const formAtualizar = document.getElementById("formAtualizar");
  const formBilling = document.getElementById("formBilling");
  const btnLogout = document.getElementById("btnLogout");
  const uploadFoto = document.getElementById("uploadFoto");

  // ====== PREENCHE DADOS INICIAIS ======

  // se não tiver data de criação, coloca hoje
  if (!usuario.data) {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, "0");
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const ano = hoje.getFullYear();
    usuario.data = `${dia}/${mes}/${ano}`;
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }

  perfilNome.textContent = usuario.nome;
  perfilEmail.textContent = usuario.email;
  perfilData.textContent = usuario.data;

  editNome.value = usuario.nome;
  editEmail.value = usuario.email;
  editEmailConf.value = usuario.email;

  // redes sociais
  facebookUser.value = usuario.facebook || "";
  twitterUser.value = usuario.twitter || "";

  // billing (se existirem)
  if (usuario.billing) {
    nomeCartao.value = usuario.billing.nomeCartao || "";
    numCartao.value = usuario.billing.numCartao || "";
    validadeCartao.value = usuario.billing.validadeCartao || "";
    cvvCartao.value = usuario.billing.cvvCartao || "";
    enderecoCobranca.value = usuario.billing.enderecoCobranca || "";
    cepCobranca.value = usuario.billing.cepCobranca || "";
  }

  // mensagem de boas-vindas
  bemVindoTopo.textContent = "Bem-vindo, " + usuario.nome.split(" ")[0] + "!";

  // foto
  if (usuario.foto) {
    fotoPerfil.src = usuario.foto;
  }

  // ====== TABS ======
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const alvo = tab.dataset.tab; // "user" ou "billing"

      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      tabContents.forEach(c => {
        c.classList.remove("active");
        if (c.id === alvo) c.classList.add("active");
      });
    });
  });

  // ====== ATUALIZAR USER INFO ======
  formAtualizar.addEventListener("submit", (e) => {
    e.preventDefault();

    if (editEmail.value.trim() !== editEmailConf.value.trim()) {
      alert("Os e-mails não coincidem!");
      return;
    }

    usuario.nome = editNome.value.trim() || usuario.nome;
    usuario.email = editEmail.value.trim() || usuario.email;
    usuario.facebook = facebookUser.value.trim();
    usuario.twitter = twitterUser.value.trim();

    // senha: só atualiza se o campo não estiver vazio
    if (editSenha.value.trim()) {
      usuario.senha = editSenha.value.trim();
    }

    localStorage.setItem("usuario", JSON.stringify(usuario));

    perfilNome.textContent = usuario.nome;
    perfilEmail.textContent = usuario.email;
    bemVindoTopo.textContent = "Bem-vindo, " + usuario.nome.split(" ")[0] + "!";

    alert("Informações de usuário atualizadas com sucesso!");
  });

  // ====== ATUALIZAR BILLING ======
  formBilling.addEventListener("submit", (e) => {
    e.preventDefault();

    usuario.billing = {
      nomeCartao: nomeCartao.value.trim(),
      numCartao: numCartao.value.trim(),
      validadeCartao: validadeCartao.value,
      cvvCartao: cvvCartao.value.trim(),
      enderecoCobranca: enderecoCobranca.value.trim(),
      cepCobranca: cepCobranca.value.trim()
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    alert("Informações de pagamento salvas com sucesso!");
  });

  // ====== LOGOUT ======
  btnLogout.addEventListener("click", () => {
    if (confirm("Deseja realmente sair da conta?")) {
      localStorage.removeItem("usuario");
      window.location.href = "login.html";
    }
  });

  // ====== UPLOAD DE FOTO ======
  uploadFoto.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // (opcional) valida tamanho 1MB
    const maxSize = 1024 * 1024;
    if (file.size > maxSize) {
      alert("Imagem muito grande! Tamanho máximo é 1 MB.");
      uploadFoto.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      fotoPerfil.src = reader.result;
      usuario.foto = reader.result;
      localStorage.setItem("usuario", JSON.stringify(usuario));
    };
    reader.readAsDataURL(file);
  });
});
