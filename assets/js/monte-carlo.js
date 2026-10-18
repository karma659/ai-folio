(() => {
  const chart = document.getElementById('monte-carlo');
  const slider = document.getElementById('volatility');
  const ns = 'http://www.w3.org/2000/svg';
  const quantile = (values, q) => values[Math.floor((values.length - 1) * q)];
  function add(tag, attrs, text) {
    const element = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
    if (text !== undefined) element.textContent = text;
    chart.appendChild(element);
  }
  function simulate() {
    const sigma = Number(slider.value) / 100;
    document.getElementById('vol-value').textContent = slider.value + '%';
    const steps = 60, paths = [], dt = 1 / 12;
    for (let p = 0; p < 1000; p++) {
      const path = [100];
      for (let t = 1; t <= steps; t++) {
        const u = Math.max(Number.EPSILON, Math.random());
        const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * Math.random());
        path.push(path[t - 1] * Math.exp((0.07 - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * z));
      }
      paths.push(path);
    }
    const slices = Array.from({length: steps + 1}, (_, t) => paths.map(path => path[t]).sort((a,b) => a-b));
    // Keep the chart readable at high volatility; extreme paths may leave the plot.
    const ceiling = Math.ceil(Math.max(160, ...slices.map(slice => quantile(slice, .95))) / 50) * 50;
    const x = t => 45 + t / steps * 530;
    const y = value => 255 - value / ceiling * 225;
    chart.replaceChildren();
    const defs = document.createElementNS(ns, 'defs');
    const clip = document.createElementNS(ns, 'clipPath'); clip.id = 'plot-clip';
    const rect = document.createElementNS(ns, 'rect');
    Object.entries({x:45,y:15,width:530,height:240}).forEach(([k,v]) => rect.setAttribute(k,v));
    clip.appendChild(rect); defs.appendChild(clip); chart.appendChild(defs);
    for (let i=0; i<=4; i++) {
      const value = ceiling * i / 4;
      add('line',{x1:45,x2:575,y1:y(value),y2:y(value),stroke:'#253040','stroke-width':.7});
      add('text',{x:34,y:y(value)+3,fill:'#63748c','font-size':8,'font-family':'monospace','text-anchor':'end'},Math.round(value));
    }
    for (let year=0; year<=5; year++) {
      add('line',{x1:x(year*12),x2:x(year*12),y1:30,y2:255,stroke:'#1d2838','stroke-width':.6});
      add('text',{x:x(year*12),y:276,fill:'#63748c','font-size':8,'font-family':'monospace','text-anchor':'middle'},'Y'+year);
    }
    const d = values => values.map((value,t) => (t?'L':'M')+x(t).toFixed(1)+','+y(value).toFixed(1)).join(' ');
    const lower = slices.map(slice => quantile(slice,.05));
    const upper = slices.map(slice => quantile(slice,.95));
    const band = d(upper) + lower.map((_,i) => {const t=steps-i;return 'L'+x(t).toFixed(1)+','+y(lower[t]).toFixed(1);}).join(' ')+'Z';
    add('path',{d:band,fill:'#698dcc','fill-opacity':.055,'clip-path':'url(#plot-clip)'});
    paths.slice(0,80).forEach(path => add('path',{d:d(path),fill:'none',stroke:'#6385bf','stroke-width':.65,'stroke-opacity':.22,'clip-path':'url(#plot-clip)'}));
    add('path',{d:d(slices.map(slice=>quantile(slice,.5))),fill:'none',stroke:'#b9ceff','stroke-width':2,'clip-path':'url(#plot-clip)'});
    const terminal = slices[steps];
    [['p05',.05],['p50',.5],['p95',.95]].forEach(([id,q])=>{document.getElementById(id).textContent=quantile(terminal,q).toFixed(1);});
  }
  slider.addEventListener('input',simulate);
  document.getElementById('rerun').addEventListener('click',simulate);
  simulate();
})();
