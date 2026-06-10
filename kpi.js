/* KPI - carregamento completo, aguardando Supabase antes dos gráficos. */
(function iniciarPaginaKpi(){
  window.CCO_PAGE = "kpi";

  async function iniciar(){
    try {
      if ((!window.operacoesOriginal || !window.operacoesOriginal.length) && typeof carregarBaseSupabase === "function") {
        await carregarBaseSupabase();
      }
      if (typeof carregarKpiMensalSupabase === "function") {
        await carregarKpiMensalSupabase();
      }
      if (typeof carregarFiltrosKpiServicoCompleto === "function") carregarFiltrosKpiServicoCompleto();
      if (typeof renderPaginaKpiPorServicoCompleto === "function") renderPaginaKpiPorServicoCompleto();
    } catch (error) {
      console.error("Erro no fluxo interno de renderização do KPI:", error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar, { once: true });
  } else {
    iniciar();
  }
})();
