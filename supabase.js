/* Supabase client - CCO */
(function iniciarSupabaseCCO(){
  const SUPABASE_URL = "https://vavldaiysqxczvmrxnyw.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_RqSecyxRNNgTy-LmnxPJeg_eADTtP4Z";

  if (!window.supabase || typeof window.supabase.createClient !== "function") {
    console.error("Biblioteca Supabase não carregou. Verifique a conexão/CDN.");
    return;
  }

  const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.supabaseClient = supabaseClient;
  window.banco = supabaseClient;
  console.log("Cliente Supabase criado com sucesso.");
})();
