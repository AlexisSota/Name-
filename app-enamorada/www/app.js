(function () {
  var C = window.CONTENT;
  var stage = document.getElementById('stage');
  var canvas = document.getElementById('fx');
  var ctx = canvas.getContext('2d');

  /* ---------- Partículas flotantes (luciérnagas / polvo de cueva) ---------- */
  var W, H, motes = [];
  function resize() {
    W = canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
    H = canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
  }
  window.addEventListener('resize', resize);
  resize();
  for (var i = 0; i < 55; i++) {
    motes.push({
      x: Math.random() * W, y: Math.random() * H,
      r: (Math.random() * 1.8 + 0.6) * (window.devicePixelRatio || 1),
      vx: (Math.random() - 0.5) * 0.15, vy: -Math.random() * 0.25 - 0.05,
      p: Math.random() * Math.PI * 2,
      warm: Math.random() < 0.25
    });
  }
  function tick(t) {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < motes.length; i++) {
      var m = motes[i];
      m.x += m.vx + Math.sin(t / 2500 + m.p) * 0.15;
      m.y += m.vy;
      if (m.y < -10) { m.y = H + 10; m.x = Math.random() * W; }
      if (m.x < -10) m.x = W + 10;
      if (m.x > W + 10) m.x = -10;
      var a = 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(t / 900 + m.p));
      ctx.beginPath();
      ctx.fillStyle = m.warm ? 'rgba(255,230,168,' + a + ')' : 'rgba(159,216,255,' + a + ')';
      ctx.shadowBlur = 12; ctx.shadowColor = m.warm ? '#ffe6a8' : '#9fd8ff';
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  /* ---------- Utilidades ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function timeTogether() {
    var f = C.fechaInicio, start = new Date(f.year, f.month - 1, f.day);
    var now = new Date();
    var y = now.getFullYear() - start.getFullYear();
    var m = now.getMonth() - start.getMonth();
    var d = now.getDate() - start.getDate();
    if (d < 0) { m--; d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (m < 0) { y--; m += 12; }
    var total = Math.floor((now - start) / 86400000);
    return { y: y, m: m, d: d, total: total };
  }

  /* ---------- Escenas ---------- */
  var scenes = [];

  scenes.push(function () {
    var t = timeTogether();
    return '<div class="zone">' + esc(C.nombreElla) + '</div>' +
      '<h1>' + esc(C.portada.titulo) + '</h1><div class="divider"></div>' +
      '<p>' + esc(C.portada.subtitulo) + '</p>' +
      '<div class="counter">' +
        '<div>' + t.y + '<small>años</small></div>' +
        '<div>' + t.m + '<small>meses</small></div>' +
        '<div>' + t.d + '<small>días</small></div>' +
      '</div>' +
      '<button class="btn" data-next>' + esc(C.portada.boton) + '</button>';
  });

  C.zonas.forEach(function (z) {
    scenes.push(function () {
      var photo = z.foto ? '<div class="photo" style="background-image:url(\'' + esc(z.foto) + '\')"></div>' : '';
      return '<div class="zone">' + esc(z.zona) + '</div>' + photo +
        '<h1>' + esc(z.titulo) + '</h1><div class="divider"></div>' +
        '<p>' + esc(z.texto) + '</p>' +
        '<button class="btn" data-next>Continuar</button>';
    });
  });

  scenes.push(function () {
    var t = timeTogether();
    var bench =
      '<svg class="bench" viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<g fill="none" stroke="#ffe6a8" stroke-width="3" stroke-linecap="round">' +
      '<path d="M30 62h160M30 78h160"/><path d="M40 62v40M180 62v40"/>' +
      '<path d="M44 20h132M44 36h132M50 20v42M170 20v42"/></g>' +
      /* dos insectos originales sentados */
      '<g fill="#dfe8f2"><ellipse cx="88" cy="52" rx="13" ry="12"/><ellipse cx="132" cy="52" rx="13" ry="12"/></g>' +
      '<g fill="#05070d"><circle cx="84" cy="50" r="2"/><circle cx="92" cy="50" r="2"/>' +
      '<circle cx="128" cy="50" r="2"/><circle cx="136" cy="50" r="2"/></g>' +
      '<g stroke="#dfe8f2" stroke-width="2" stroke-linecap="round" fill="none">' +
      '<path d="M84 41q-4-10-10-12M92 41q4-10 10-12M128 41q-4-10-10-12M136 41q4-10 10-12"/></g>' +
      '</svg>';
    return '<div class="final">' + bench +
      '<div class="zone">' + esc(C.final.zona) + '</div>' +
      '<h1>' + esc(C.final.titulo) + '</h1><div class="divider"></div>' +
      '<p>' + esc(C.final.texto) + '</p>' +
      '<p style="font-size:.95rem;color:var(--dim)">Hoy llevamos ' + t.total + ' días juntos.</p>' +
      '<p>' + esc(C.final.firma) + ',<br>' + esc(C.tuNombre) + '</p>' +
      '<button class="btn" data-restart>Volver a empezar</button></div>';
  });

  /* ---------- Navegación ---------- */
  var dots = document.createElement('div');
  dots.className = 'dots';
  scenes.forEach(function () { dots.appendChild(document.createElement('i')); });
  document.body.appendChild(dots);

  var current = -1;
  function go(n) {
    var old = stage.querySelector('.scene');
    function render() {
      current = n;
      var el = document.createElement('div');
      el.className = 'scene';
      el.innerHTML = scenes[n]();
      stage.innerHTML = '';
      stage.appendChild(el);
      requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('show'); }); });
      Array.prototype.forEach.call(dots.children, function (d, i) { d.classList.toggle('on', i === n); });
    }
    if (old) { old.classList.add('out'); setTimeout(render, 700); } else { render(); }
  }

  stage.addEventListener('click', function (e) {
    if (e.target.closest('[data-next]')) go(Math.min(current + 1, scenes.length - 1));
    else if (e.target.closest('[data-restart]')) go(0);
  });

  go(0);
})();
