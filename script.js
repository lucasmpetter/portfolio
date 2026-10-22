(() => {
  const T = {
    pt: {
      n0: 'Sobre', n1: 'Projetos', n2: 'Experiência', n3: 'Contato',
      h1: ['Engenheiro', 'de Software,', 'web designer'],
      l0: 'Quem sou eu', l1: 'arandu&aritmatch', l2: 'Acadêmico e profissional', l3: 'Emails e social',
      soon: 'Em breve', up: 'Voltar ao início', hint: 'Toque num card para puxá-lo',      exp: [['Profissional', 'CTO & Co-founder', 'Arandu Intelligence Systems'], ['Profissional', 'Criador do Aritmatch', 'Arandu'], ['Profissional', 'Web designer', 'Landing pages'], ['Acadêmico', 'Engenharia de Software', 'Uniceplac · Gama']],
      p: [
        [['Me chamo Lucas, sou engenheiro de software, mas gosto mesmo é de ', 0], ['web design', 1], [', criação de landing pages e one-paged sites.', 0]],
        [['Sou extremamente curioso, e talvez por isso eu tenha escolhido mexer com a internet (ela é ', 0], ['enorme', 1], [').', 0]],
        [['Eu me descreveria como: ', 0], ['metódico', 1], [', ', 0], ['excêntrico', 1], [', corajoso, determinado, confiante, meio indeciso. ', 0], ['Não me julgue pelas minhas perdas', 1], [', porque elas são bem poucas.', 0]]
      ]
    },
    en: {
      n0: 'About', n1: 'Projects', n2: 'Experience', n3: 'Contact',
      h1: ['Software', 'Engineer,', 'web designer'],
      l0: 'Who I am', l1: 'arandu&aritmatch', l2: 'Academic and professional', l3: 'Emails and social',
      soon: 'Coming soon', up: 'Back to top', hint: 'Tap a card to pull it',      exp: [['Professional', 'CTO & Co-founder', 'Arandu Intelligence Systems'], ['Professional', 'Creator of Aritmatch', 'Arandu'], ['Professional', 'Web designer', 'Landing pages'], ['Academic', 'Software Engineering', 'Uniceplac · Gama']],
      p: [
        [["I'm Lucas, a software engineer, but what I really love is ", 0], ['web design', 1], [', building landing pages and one-page sites.', 0]],
        [["I'm extremely curious, and maybe that's why I chose to work with the internet (it's ", 0], ['huge', 1], [').', 0]],
        [['I would describe myself as: ', 0], ['methodical', 1], [', ', 0], ['eccentric', 1], [', brave, determined, confident, a bit indecisive. ', 0], ["Don't judge me by my losses", 1], [', they are very few.', 0]]
      ]
    }
  };

  // Hover preview per experience row: a video if set, otherwise an image, otherwise no preview.
  const EXP_MEDIA = [
    { video: '', img: 'assets/proj-arandudf.png' },
    { video: '', img: 'assets/proj-aritmatch.png' },
    { video: '', img: '' },
    { video: '', img: '' }
  ];

  const SITES = {
    arandu: { href: 'https://arandudf.com.br', img: 'assets/proj-arandudf.png', label: 'arandudf.com.br' },
    arit: { href: 'https://aritmatch.com.br', img: 'assets/proj-aritmatch.png', label: 'aritmatch.com.br' }
  };
  // Each row: direction, start offset (cqw), and cards (site key or null = placeholder)
  const ROWS = [
    { dir: 1, ml: -6, cards: ['arandu', null, 'arit', null, 'arandu', null] },
    { dir: -1, ml: -16, cards: [null, 'arit', null, 'arandu', null, 'arit'] },
    { dir: 1, ml: -2, cards: ['arandu', null, 'arit', null, 'arandu', null] },
    { dir: -1, ml: -12, cards: [null, 'arit', null, 'arandu', null, 'arit'] }
  ];

  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);
  const hdr = $('#hdr'), stage = $('#stage'), sobre = $('#sobre');
  const panels = [...$$('.panel')];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrowMQ = window.matchMedia('(max-width: 759px)');
  const store = {
    get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let lang = 'pt', scrolled = false, openIdx = null;

  // ---------- Projects ----------
  const rowsEl = $('#rows');
  rowsEl.innerHTML = ROWS.map((r, i) => `<div class="row" data-dir="${r.dir}" style="margin-left:${r.ml}cqw">${r.cards.map(k => {
    if (!k) return '<div class="card soon"><span data-i18n="soon">Em breve</span></div>';
    const s = SITES[k];
    return `<a class="card" href="${s.href}" target="_blank" rel="noopener"><img src="${s.img}" alt="Página inicial de ${s.label}" loading="lazy"><span class="tag">${s.label} ↗</span></a>`;
  }).join('')}</div>`).join('');
  const rows = [...rowsEl.children];

  // ---------- Language ----------
  let scrTimers = {};
  // The title is a list of lines; every word is its own span so it can scramble on hover.
  const h1Words = () => T[lang].h1.flatMap(line => line.split(' '));
  function renderH1() {
    let i = 0;
    $('#h1').innerHTML = T[lang].h1.map(line =>
      `<span class="line">${line.split(' ').map(w => `<span data-w="${i++}">${esc(w)}</span>`).join(' ')}</span>`).join('');
  }
  function renderPanels() {
    $$('[data-panel]').forEach(p => {
      p.innerHTML = T[lang].p[+p.dataset.panel].map(([s, b]) => b ? `<b>${esc(s)}</b>` : esc(s)).join('');
    });
  }
  function renderExp() {
    $('#expList').innerHTML = T[lang].exp.map(([kind, role, place], i) =>
      `<div class="exp-row" data-i="${i}"><span class="kind">${esc(kind)}</span><span class="role">${esc(role)}</span><span class="place">${esc(place)}</span></div>`).join('');
  }
  function setLang(l) {
    Object.values(scrTimers).forEach(clearInterval); scrTimers = {};
    lang = l;
    const t = T[l];
    $$('[data-i18n]').forEach(el => { if (t[el.dataset.i18n] != null) el.textContent = t[el.dataset.i18n]; });
    $$('.lang [data-lang]').forEach(s => s.classList.toggle('on', s.dataset.lang === l));
    $('#up').setAttribute('aria-label', t.up);
    document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en';
    renderH1(); renderPanels(); renderExp();
    store.set('lang', l);
  }
  $('#lang').addEventListener('click', () => setLang(lang === 'pt' ? 'en' : 'pt'));

  setLang(store.get('lang') === 'en' ? 'en' : 'pt');

  // ---------- H1 scramble per word ----------
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&*@$/';
  $('#h1').addEventListener('mouseover', e => {
    const span = e.target.closest('[data-w]');
    if (!span || reduce) return;
    const key = span.dataset.w;
    if (scrTimers[key]) return;
    const word = h1Words()[+key];
    const total = 16; let f = 0;
    scrTimers[key] = setInterval(() => {
      f++;
      if (f >= total) { clearInterval(scrTimers[key]); delete scrTimers[key]; span.textContent = word; return; }
      span.textContent = [...word].map((c, i) => (c === ',' || f / total > (i + 1) / word.length) ? c : CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
    }, 35);
  });

  // ---------- Hero eyes: pupils look at the pointer ----------
  const eyes = [...$$('.eye')];
  let lookX = null, lookY = null, lookQueued = false;
  function look() {
    lookQueued = false;
    eyes.forEach(eye => {
      const pupil = eye.firstElementChild;
      const r = eye.getBoundingClientRect();
      // How far the pupil can travel inside the eye white (an ellipse)
      const maxX = (r.width - pupil.offsetWidth) / 2 * .85;
      const maxY = (r.height - pupil.offsetHeight) / 2 * .85;
      const dx = lookX - (r.left + r.width / 2), dy = lookY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      // Full deflection once the pointer is ~200px away; closer, it eases toward the center
      const k = Math.min(1, dist / 200);
      pupil.style.transform = `translate(${(dx / dist * maxX * k).toFixed(1)}px,${(dy / dist * maxY * k).toFixed(1)}px)`;
    });
  }
  function queueLook(x, y) {
    lookX = x; lookY = y;
    if (!lookQueued) { lookQueued = true; requestAnimationFrame(look); }
  }
  window.addEventListener('pointermove', e => queueLook(e.clientX, e.clientY), { passive: true });
  window.addEventListener('touchmove', e => { const t = e.touches[0]; if (t) queueLook(t.clientX, t.clientY); }, { passive: true });

  // ---------- Navigation ----------
  function go(id) {
    closePanel();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: reduce ? 'auto' : 'smooth' });
  }
  $$('[data-go]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); go(a.dataset.go); }));
  $('#up').addEventListener('click', e => { e.preventDefault(); closePanel(); window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

  function updateHeader() {
    hdr.classList.toggle('scrolled', scrolled);
    hdr.classList.toggle('pill', scrolled || narrowMQ.matches);
    $('#up').tabIndex = scrolled ? 0 : -1;
  }

  // ---------- Lupa ----------
  $$('.lupa').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--x', (e.clientX - r.left) + 'px');
      el.style.setProperty('--y', (e.clientY - r.top) + 'px');
      el.style.setProperty('--r', narrowMQ.matches ? '60px' : 'max(6.5cqw,70px)');
    });
    el.addEventListener('mouseleave', () => el.style.setProperty('--r', '0px'));
  });

  // ---------- Panels: spread on hover, expand on click ----------
  sobre.addEventListener('mouseenter', () => { if (!narrowMQ.matches && openIdx == null) sobre.classList.add('spread'); });
  sobre.addEventListener('mouseleave', () => sobre.classList.remove('spread'));

  // Narrow screens: panels form a 3D deck (front -> back). DOM order: 0 rosa, 1 amarela, 2 azul.
  let deck = [2, 1, 0], pulling = false;
  const deckTf = (d, lift = 0) =>
    `perspective(900px) translateY(${-d * 40 - lift}px) rotateX(-18deg) scale(${(1 - d * 0.06).toFixed(2)})`;
  function deckApply() {
    const narrow = narrowMQ.matches;
    panels.forEach((p, i) => {
      if (i === openIdx) return;
      const d = deck.indexOf(i);
      p.style.transform = narrow ? deckTf(d) : '';
      p.style.zIndex = narrow ? 10 - d : '';
      p.classList.toggle('back', narrow && d > 0);
    });
  }
  // Pull a back card up out of the deck, then bring it to the front
  function pull(i) {
    if (pulling) return;
    pulling = true;
    const p = panels[i], h = p.offsetHeight;
    p.style.transform = deckTf(deck.indexOf(i), h * 0.55);
    setTimeout(() => {
      deck = [i, ...deck.filter(x => x !== i)];
      deckApply();
      setTimeout(() => { pulling = false; }, 400);
    }, reduce ? 0 : 280);
  }
  function activate(i) {
    if (narrowMQ.matches && openIdx == null && deck[0] !== i) pull(i);
    else openPanel(i);
  }

  function openPanel(i) {
    if (openIdx === i) return closePanel();
    closePanel();
    const el = panels[i];
    const par = el.offsetParent.getBoundingClientRect();
    const cx = par.left + el.offsetLeft + el.offsetWidth / 2, cy = par.top + el.offsetTop + el.offsetHeight / 2;
    const vw = window.innerWidth, vh = window.innerHeight;
    const s = Math.min(vw * 0.9 / el.offsetWidth, vh * 0.86 / el.offsetHeight);
    openIdx = i;
    sobre.classList.remove('spread');
    document.body.style.overflow = 'hidden';
    stage.classList.add('exp-open');
    el.classList.add('open');
    el.style.zIndex = 90;
    el.style.transform = `translate(${vw / 2 - cx}px,${vh / 2 - cy}px) scale(${s}) rotate(0deg)`;
  }
  function closePanel() {
    if (openIdx == null) return;
    const i = openIdx, el = panels[i];
    openIdx = null;
    stage.classList.remove('exp-open');
    document.body.style.overflow = '';
    el.style.transform = narrowMQ.matches ? deckTf(deck.indexOf(i)) : '';
    setTimeout(() => { if (openIdx !== i) { el.classList.remove('open'); deckApply(); } }, 700);
  }
  panels.forEach((p, i) => {
    p.addEventListener('click', () => activate(i));
    p.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(i); } });
  });
  $('#overlay').addEventListener('click', closePanel);
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });

  // ---------- Experience hover preview ----------
  const preview = $('#preview'), previewBox = $('#previewBox');
  const vid = { x: 0, y: 0, tx: 0, ty: 0, on: false };
  const expList = $('#expList');
  let hoverIdx = null;
  function showPreview(i) {
    const m = EXP_MEDIA[i] || {};
    if (!m.video && !m.img) { hidePreview(); return; }
    if (hoverIdx !== i) {
      previewBox.innerHTML = m.video
        ? `<video src="${m.video}" autoplay muted loop playsinline></video>`
        : `<img src="${m.img}" alt="">`;
    }
    hoverIdx = i;
    preview.classList.add('on');
  }
  function hidePreview() { hoverIdx = null; vid.on = false; preview.classList.remove('on'); }
  expList.addEventListener('mouseover', e => {
    const row = e.target.closest('.exp-row');
    if (!row) return;
    vid.tx = e.clientX; vid.ty = e.clientY;
    if (!vid.on) { vid.x = e.clientX; vid.y = e.clientY; vid.on = true; }
    showPreview(+row.dataset.i);
  });
  expList.addEventListener('mousemove', e => { vid.tx = e.clientX; vid.ty = e.clientY; });
  expList.addEventListener('mouseleave', hidePreview);
  (function vloop() {
    requestAnimationFrame(vloop);
    if (!vid.on) return;
    vid.x += (vid.tx - vid.x) * 0.16; vid.y += (vid.ty - vid.y) * 0.16;
    const pw = preview.offsetWidth || 280, ph = preview.offsetHeight || 175;
    const px = vid.x + 24 + pw > window.innerWidth ? vid.x - 24 - pw : vid.x + 24;
    const py = Math.max(8, Math.min(window.innerHeight - ph - 8, vid.y - 90));
    const rot = Math.max(-6, Math.min(6, (vid.tx - vid.x) * 0.08));
    preview.style.transform = `translate3d(${px.toFixed(1)}px,${py.toFixed(1)}px,0) rotate(${rot.toFixed(2)}deg)`;
  })();

  // ---------- Scroll ----------
  let ticking = false;
  function onScroll() {
    ticking = false;
    const s = window.scrollY > 80;
    if (s !== scrolled) { scrolled = s; updateHeader(); }
    if (reduce) return;
    const r = rowsEl.getBoundingClientRect(), vh = window.innerHeight;
    const p = Math.max(-0.2, Math.min(1.2, (vh - r.top) / (vh + r.height)));
    rows.forEach((row, i) => { row.style.transform = `translate3d(${(p - 0.5) * +row.dataset.dir * (18 + i * 4)}vw,0,0)`; });
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', () => { closePanel(); updateHeader(); onScroll(); });
  narrowMQ.addEventListener && narrowMQ.addEventListener('change', () => { sobre.classList.remove('spread'); updateHeader(); deckApply(); });

  deckApply();
  updateHeader();
  onScroll();

  // ---------- Loading screen ----------
  // Cycles "Olá!" through languages until the page has loaded (and at least one
  // full round has played), then opens the circle that reveals the hero.
  const loader = $('#loader'), loaderWord = $('#loaderWord');
  const HELLOS = ['Olá!', 'Hello!', '¡Hola!', 'Bonjour!', 'Ciao!', 'Hallo!', 'Привет!', 'こんにちは!', '안녕하세요!', 'مرحبا!', 'नमस्ते!'];
  const MAX_WAIT = 6000;
  // "Loaded" = window load AND web fonts ready, so nothing re-lays out after the reveal
  let pageLoaded = false, revealed = false;
  const windowLoaded = document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise(r => window.addEventListener('load', r, { once: true }));
  const pageReady = Promise.all([windowLoaded, document.fonts ? document.fonts.ready : null]);
  pageReady.then(() => { pageLoaded = true; });
  const startedAt = performance.now();

  function reveal() {
    if (revealed) return;
    revealed = true;
    document.documentElement.classList.add('revealing');
    loader.classList.add('reveal');
    const done = () => {
      if (!loader.isConnected) return;
      document.documentElement.classList.remove('loading', 'revealing', 'revealed');
      loader.remove();
    };
    setTimeout(done, 3000); // safety net
    if (reduce) { setTimeout(done, 450); return; }

    // The hole: the loader is clipped to "the screen minus a circle". Both clip
    // polygons have the same points, so the browser's transition moves each circle
    // point straight outward and the hole stays round while it grows.
    const DELAY = 300, DURATION = 1100;
    const R = Math.ceil(Math.hypot(window.innerWidth, window.innerHeight) / 2) + 24;
    const hole = r => {
      const pts = ['0 0', '100% 0', '100% 100%', '0 100%', '0 50%'];
      // Circle traced the opposite way round (and evenodd), starting/ending at its
      // leftmost point, joined to the left edge by a zero-width seam
      for (let i = 0; i <= 96; i++) {
        const a = Math.PI - (i / 96) * Math.PI * 2;
        pts.push(`calc(50% + ${(Math.cos(a) * r).toFixed(1)}px) calc(50% + ${(Math.sin(a) * r).toFixed(1)}px)`);
      }
      pts.push('0 50%');
      return `polygon(evenodd, ${pts.join(', ')})`;
    };
    const setClip = v => { loader.style.clipPath = v; loader.style.webkitClipPath = v; };
    setClip(hole(0));
    loader.getBoundingClientRect(); // commit the closed state before transitioning
    const ease = `${DURATION}ms cubic-bezier(.76,0,.24,1) ${DELAY}ms`;
    loader.style.transition = `clip-path ${ease}, -webkit-clip-path ${ease}`;
    requestAnimationFrame(() => setClip(hole(R)));
    loader.addEventListener('transitionend', e => { if (/clip-path/.test(e.propertyName)) done(); });
    setTimeout(() => document.documentElement.classList.add('gutter-light'), DELAY + DURATION * .6);
  }
  // n = how many words have been shown so far
  function nextHello(n) {
    if (revealed) return;
    if ((n >= HELLOS.length && pageLoaded) || performance.now() - startedAt > MAX_WAIT) return reveal();
    loaderWord.textContent = HELLOS[n % HELLOS.length];
    // The first "Olá!" lingers; the rest flash by
    setTimeout(() => nextHello(n + 1), n === 0 ? 750 : 170);
  }
  if (reduce) {
    // Just "Olá!", then a fade as soon as the page is ready
    setTimeout(() => pageReady.then(reveal), 500);
    setTimeout(reveal, MAX_WAIT);
  } else {
    nextHello(0);
  }
})();
