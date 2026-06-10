/* CCO • Gráficos modernos e coloridos sem alterar cálculos */
(function ccoChartExecutiveTheme(){
  const palette = [
    '#00D5FF','#22C55E','#F59E0B','#EC4899','#8B5CF6','#38BDF8',
    '#FB923C','#10B981','#EF4444','#A855F7','#06B6D4','#84CC16','#F43F5E'
  ];
  window.CCO_CHART_COLORS = palette;
  function applyTheme(Chart){
    if(!Chart || Chart.__ccoExecutiveTheme) return;
    Chart.__ccoExecutiveTheme = true;
    try{
      Chart.defaults.color = '#CBD5E1';
      Chart.defaults.font.family = 'Segoe UI, Inter, Arial, sans-serif';
      Chart.defaults.borderColor = 'rgba(148,163,184,.16)';
      Chart.defaults.plugins.legend.labels.color = '#E2E8F0';
      Chart.defaults.plugins.legend.labels.usePointStyle = true;
      Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(8,13,28,.96)';
      Chart.defaults.plugins.tooltip.titleColor = '#fff';
      Chart.defaults.plugins.tooltip.bodyColor = '#e2e8f0';
      Chart.defaults.plugins.tooltip.borderColor = 'rgba(0,213,255,.25)';
      Chart.defaults.plugins.tooltip.borderWidth = 1;
      Chart.defaults.plugins.tooltip.cornerRadius = 12;
    }catch(e){}
    const Original = Chart;
    function themedChart(ctx, config){
      try{
        config = config || {};
        config.data = config.data || {};
        config.data.datasets = (config.data.datasets || []).map((ds, i) => {
          const c = palette[i % palette.length];
          const c2 = palette[(i+3) % palette.length];
          const out = Object.assign({}, ds);
          const type = out.type || config.type;
          const hasArray = Array.isArray(out.backgroundColor) && out.backgroundColor.length > 1;
          if(!out.borderColor) out.borderColor = c;
          if(!out.backgroundColor){
            if(type === 'line') out.backgroundColor = c + '26';
            else if(type === 'doughnut' || type === 'pie' || type === 'polarArea') out.backgroundColor = palette;
            else out.backgroundColor = c;
          } else if(!hasArray && (type === 'doughnut' || type === 'pie' || type === 'polarArea')) {
            out.backgroundColor = palette;
          }
          out.borderWidth = out.borderWidth ?? 1;
          out.borderRadius = out.borderRadius ?? (type === 'bar' ? 10 : undefined);
          out.borderSkipped = out.borderSkipped ?? false;
          out.tension = out.tension ?? (type === 'line' ? .38 : undefined);
          out.pointRadius = out.pointRadius ?? (type === 'line' ? 3 : undefined);
          out.pointHoverRadius = out.pointHoverRadius ?? (type === 'line' ? 6 : undefined);
          return out;
        });
        config.options = config.options || {};
        config.options.responsive = config.options.responsive ?? true;
        config.options.maintainAspectRatio = config.options.maintainAspectRatio ?? false;
        config.options.animation = Object.assign({duration:800,easing:'easeOutQuart'}, config.options.animation || {});
        config.options.plugins = config.options.plugins || {};
        config.options.plugins.legend = Object.assign({position:'bottom', labels:{color:'#E2E8F0', usePointStyle:true, padding:16, font:{weight:'700'}}}, config.options.plugins.legend || {});
        config.options.scales = config.options.scales || {};
        ['x','y'].forEach(axis => {
          if(config.options.scales[axis]){
            config.options.scales[axis].grid = Object.assign({color:'rgba(148,163,184,.14)', drawBorder:false}, config.options.scales[axis].grid || {});
            config.options.scales[axis].ticks = Object.assign({color:'#CBD5E1', font:{weight:'700'}}, config.options.scales[axis].ticks || {});
            config.options.scales[axis].border = Object.assign({display:false}, config.options.scales[axis].border || {});
          }
        });
      }catch(e){}
      return new Original(ctx, config);
    }
    Object.setPrototypeOf(themedChart, Original);
    themedChart.prototype = Original.prototype;
    Object.getOwnPropertyNames(Original).forEach(p => { try{ if(!(p in themedChart)) themedChart[p]=Original[p]; }catch(e){} });
    window.Chart = themedChart;
  }
  if(window.Chart) applyTheme(window.Chart);
  let tries = 0;
  const timer = setInterval(()=>{
    tries++;
    if(window.Chart){ applyTheme(window.Chart); clearInterval(timer); }
    if(tries>100) clearInterval(timer);
  },50);
})();
