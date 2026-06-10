const SUPABASE_URL_LOGIN = "https://vavldaiysqxczvmrxnyw.supabase.co";
const SUPABASE_KEY_LOGIN = "sb_publishable_RqSecyxRNNgTy-LmnxPJeg_eADTtP4Z";

const clientLogin = window.supabase.createClient(
  SUPABASE_URL_LOGIN,
  SUPABASE_KEY_LOGIN
);

document.addEventListener("DOMContentLoaded", () => {
  const usuarioSalvo = localStorage.getItem("ultimoUsuarioCCO");

  if (usuarioSalvo) {
    document.getElementById("usuario").value = usuarioSalvo;
    document.getElementById("lembrarUsuario").checked = true;
  }
});

async function entrar() {
  const usuario = document.getElementById("usuario").value.trim().toLowerCase();
  const senha = document.getElementById("senha").value.trim();
  const lembrar = document.getElementById("lembrarUsuario").checked;
  const erro = document.getElementById("erro");

  erro.textContent = "";

  if (!usuario || !senha) {
    erro.textContent = "Informe usuário e senha.";
    return;
  }

  const emailFake = `${usuario}@cco.local`;

  const { data, error } = await clientLogin.auth.signInWithPassword({
    email: emailFake,
    password: senha
  });

  if (error || !data?.user) {
    console.error("Erro Supabase:", error);
    erro.textContent = error?.message || "Usuário ou senha inválidos.";
    return;
  }

  localStorage.setItem("usuarioLogado", JSON.stringify({
    id: data.user.id,
    usuario,
    email: emailFake,
    perfil: obterPerfil(usuario)
  }));

  if (lembrar) {
    localStorage.setItem("ultimoUsuarioCCO", usuario);
  } else {
    localStorage.removeItem("ultimoUsuarioCCO");
  }

  window.location.href = "index.html";
}

function obterPerfil(usuario) {
  if (usuario === "admin") return "Administrador";
  if (usuario === "cco") return "Operador";
  if (usuario === "diretoria") return "Diretoria";
  return "Operador";
}
