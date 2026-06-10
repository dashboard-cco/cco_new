/* Histórico - carregamento instantâneo. */
(function iniciarPaginaHistorico(){
  window.CCO_PAGE = "historico";

  function iniciar(){
    if (typeof carregarHistorico === "function") carregarHistorico();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar, { once: true });
  } else {
    iniciar();
  }
})();
