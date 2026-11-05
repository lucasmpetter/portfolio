(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;

  // ---------- Copy ----------
  const COPY = {
    pt: {
      nav0: 'Destaques', nav1: 'Sobre', nav2: 'Serviços', nav3: 'Contato',
      role: 'Engenheiro de Software · Web Designer',
      heroLine: 'CTO e sócio da Arandu Intelligence Systems, criador do Aritmatch. Desenho e desenvolvo sites para negócios.',
      seeWork: 'Ver trabalhos', contact: 'Fale comigo', visit: 'Visitar site',
      aranduRole: 'Sócio & CTO', aritRole: 'Criador',
      aranduDesc: 'Arquitetura, produto e engenharia em uma empresa de sistemas inteligentes.',
      aritDesc: 'Um produto idealizado e desenvolvido do conceito ao código.',
      about: 'Engenharia com precisão. Design com intenção.',
      aboutP1: 'Sou Lucas Petter, formando em Engenharia de Software. Divido meu tempo entre liderar a tecnologia da Arandu Intelligence Systems, evoluir o Aritmatch e criar sites para negócios que querem uma presença digital própria.',
      serv: 'Web design para negócios.', servNote: 'Do primeiro rascunho ao site no ar.', quote: 'Solicitar orçamento',
      services: [['Sites institucionais', 'Presença digital sob medida, rápida e fácil de manter.'], ['Landing pages', 'Páginas focadas em conversão para lançamentos e campanhas.'], ['UI & identidade digital', 'Direção visual, sistemas de interface e protótipos.'], ['Desenvolvimento front-end', 'Do layout ao código em produção, com performance e acessibilidade.']],
      stack: 'Ferramentas do dia a dia.',
      degree: 'Engenharia de Software.', inst: 'UNICEPLAC', period: 'Desde 2024', status: 'Em conclusão',
      cta: 'Vamos construir algo.', ctaNote: 'Projetos, parcerias ou uma conversa sobre produto.', mail: 'Email pessoal',
      access: 'Acessar', bull: 'Touro alado, símbolo de São Lucas, o Evangelista', made: 'Desenhado e desenvolvido por Lucas Petter', top: 'Voltar ao topo'
    },
    en: {
      nav0: 'Ventures', nav1: 'About', nav2: 'Services', nav3: 'Contact',
      role: 'Software Engineer · Web Designer',
      heroLine: 'CTO and partner at Arandu Intelligence Systems, creator of Aritmatch. I design and build websites for businesses.',
      seeWork: 'See work', contact: 'Get in touch', visit: 'Visit site',
      aranduRole: 'Partner & CTO', aritRole: 'Creator',
      aranduDesc: 'Architecture, product and engineering at an intelligent systems company.',
      aritDesc: 'A product conceived and built from concept to code.',
      about: 'Engineering with precision. Design with intent.',
      aboutP1: "I'm Lucas Petter, graduating in Software Engineering. I split my time between leading technology at Arandu Intelligence Systems, growing Aritmatch and building websites for businesses that want a presence of their own.",
      serv: 'Web design for businesses.', servNote: 'From first sketch to live site.', quote: 'Request a quote',
      services: [['Business websites', 'Custom digital presence, fast and easy to maintain.'], ['Landing pages', 'Conversion-focused pages for launches and campaigns.'], ['UI & digital identity', 'Visual direction, interface systems and prototypes.'], ['Front-end development', 'From layout to production code, with performance and accessibility.']],
      stack: 'Everyday toolkit.',
      degree: 'Software Engineering.', inst: 'UNICEPLAC', period: 'Since 2024', status: 'Graduating',
      cta: "Let's build something.", ctaNote: 'Projects, partnerships or a conversation about product.', mail: 'Personal email',
      access: 'Visit', bull: 'Winged ox, symbol of Saint Luke the Evangelist', made: 'Designed and built by Lucas Petter', top: 'Back to top'
    },
    zh: {
      nav0: '精选', nav1: '关于', nav2: '服务', nav3: '联系',
      role: '软件工程师 · 网页设计师',
      heroLine: 'Arandu Intelligence Systems 合伙人兼 CTO，Aritmatch 创始人。为企业设计和开发网站。',
      seeWork: '查看作品', contact: '联系我', visit: '访问网站',
      aranduRole: '合伙人 & CTO', aritRole: '创始人',
      aranduDesc: '在一家智能系统公司负责架构、产品与工程。',
      aritDesc: '一个从概念到代码亲手打造的产品。',
      about: '精准的工程，用心的设计。',
      aboutP1: '我是 Lucas Petter，软件工程专业在读。我的时间分配在领导 Arandu Intelligence Systems 的技术、发展 Aritmatch，以及为希望拥有独立线上形象的企业打造网站。',
      serv: '为企业打造网站。', servNote: '从第一张草图到正式上线。', quote: '获取报价',
      services: [['企业官网', '量身定制的线上形象，快速且易于维护。'], ['落地页', '为发布和推广活动打造的高转化页面。'], ['UI 与数字形象', '视觉方向、界面系统与原型设计。'], ['前端开发', '从布局到生产环境代码，兼顾性能与无障碍。']],
      stack: '日常工具。',
      degree: '软件工程。', inst: 'UNICEPLAC', period: '2024 年起', status: '在读',
      cta: '一起创造吧。', ctaNote: '项目、合作，或聊聊产品。', mail: '个人邮箱',
      access: '访问', bull: '飞翼公牛，福音书作者圣路加的象征', made: '由 Lucas Petter 设计与开发', top: '回到顶部'
    }
  };
  const LANG_CODE = { pt: 'PT', en: 'EN', zh: '中文' };
  const HTML_LANG = { pt: 'pt-BR', en: 'en', zh: 'zh-CN' };

  let lang = 'pt';
  try { const saved = localStorage.getItem('lp-lang'); if (COPY[saved]) lang = saved; } catch (e) {}

  // ---------- Lists ----------
  // The carousel, the toolkit and the services are written in index.html (in
  // Portuguese) so search engines read them without running this script. Only
  // the services change with the language; the rest reads the same in all three.
  const track = $('#worksTrack');
  let servicesLang = 'pt'; // the language index.html was written in

  function renderServices() {
    if (lang === servicesLang) return;
    servicesLang = lang;
    $('#services').innerHTML = COPY[lang].services.map((s, i) => `
      <div class="service" data-fill${reduce ? '' : ` data-reveal="${(i % 2) * 100}"`}>
        <div class="service-n">${String(i + 1).padStart(2, '0')}</div>
        <h3 class="service-t">${s[0].replace(/&/g, '&amp;')}</h3>
        <p class="service-d">${s[1]}</p>
      </div>`).join('');
  }

  function applyLang() {
    const t = COPY[lang];
    document.documentElement.lang = HTML_LANG[lang];
    $$('[data-i18n]').forEach(el => { const v = t[el.dataset.i18n]; if (typeof v === 'string') el.textContent = v; });
    $$('[data-i18n-label]').forEach(el => el.setAttribute('aria-label', t[el.dataset.i18nLabel]));
    $('#langCode').textContent = LANG_CODE[lang];
    $$('#langMenu [data-lang]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.lang === lang)));
    renderServices();
  }
  applyLang();

  // ---------- Navigation ----------
  const secs = $$('[data-sec]');
  const menu = $('#menu'), burger = $('#burger');
  const setMenu = open => { menu.classList.toggle('is-open', open); burger.setAttribute('aria-expanded', String(open)); };
  const go = i => {
    setMenu(false);
    const s = secs[i];
    if (s) scrollTo({ top: s.getBoundingClientRect().top + scrollY - 64, behavior: reduce ? 'auto' : 'smooth' });
  };
  document.addEventListener('click', e => {
    const g = e.target.closest('[data-go]');
    if (g) return go(+g.dataset.go);
    if (e.target.closest('[data-top]')) return scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
  burger.addEventListener('click', () => { setMenu(!menu.classList.contains('is-open')); setLangOpen(false); });

  const langBtn = $('#langBtn'), langMenu = $('#langMenu');
  const setLangOpen = open => { langMenu.hidden = !open; langBtn.setAttribute('aria-expanded', String(open)); };
  langBtn.addEventListener('click', e => { e.stopPropagation(); setLangOpen(langMenu.hidden); setMenu(false); });
  langMenu.addEventListener('click', e => {
    const b = e.target.closest('[data-lang]'); if (!b) return;
    lang = b.dataset.lang;
    try { localStorage.setItem('lp-lang', lang); } catch (err) {}
    applyLang(); observeReveals(); setLangOpen(false);
  });
  document.addEventListener('click', e => { if (!langMenu.hidden && !e.target.closest('.lang')) setLangOpen(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { setLangOpen(false); setMenu(false); } });
  addEventListener('resize', () => { if (innerWidth >= 720) setMenu(false); });

  // Nav item of the section being read: Destaques=1, Sobre=2, Serviços=3, Contato=6
  const NAV_IDX = [1, 2, 3, 6];
  let activeSec = -1;
  function updateActive() {
    const vh = innerHeight; let a = 0;
    secs.forEach((s, i) => { if (s.getBoundingClientRect().top < vh * 0.45) a = i; });
    if (a === activeSec) return; activeSec = a;
    const nav = NAV_IDX.reduce((best, idx, i) => (a >= idx ? i : best), -1);
    $$('.nav-link').forEach((b, i) => b.classList.toggle('is-active', i === nav));
    $$('.menu-link').forEach((b, i) => b.classList.toggle('is-active', i === nav));
  }

  // ---------- Entrance animations ----------
  // Started when the loading screen opens, so the hero animates in front of the
  // visitor instead of behind the dark screen.
  let io = null;
  function observeReveals() {
    if (!io) return;
    $$('[data-reveal]:not([data-revealed])').forEach(el => {
      if (el._watched) return; el._watched = true;
      el.style.opacity = '0'; el.style.transform = 'translateY(40px)';
      el.style.transition = 'opacity 1s cubic-bezier(.2,.7,.2,1), transform 1s cubic-bezier(.2,.7,.2,1)';
      io.observe(el);
    });
  }
  function startReveals() {
    if (reduce || !('IntersectionObserver' in window) || io) return;
    io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.style.transitionDelay = (el.dataset.reveal || 0) + 'ms';
      el.style.opacity = '1'; el.style.transform = 'none'; el.dataset.revealed = '1';
      io.unobserve(el);
      // Back to its own transitions once in, so hover effects are not delayed
      setTimeout(() => { el.style.transition = ''; el.style.transitionDelay = ''; }, 1300 + (+el.dataset.reveal || 0));
    }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    observeReveals();
  }
  document.addEventListener('site:revealed', startReveals, { once: true });

  // ---------- Device mockups ----------
  // Each mockup is drawn at a fixed size (2000px, 1200px) and scaled to its box
  const fits = $$('[data-mockfit]');
  function fitMocks() {
    fits.forEach(el => {
      const p = el.parentElement, s = p.clientWidth / parseFloat(el.dataset.mockfit);
      el.style.transform = `scale(${s.toFixed(5)})`;
      if (el.dataset.cy) {
        el.style.left = (p.clientWidth / 2 - parseFloat(el.dataset.cx) * s).toFixed(1) + 'px';
        el.style.top = (p.clientHeight / 2 - parseFloat(el.dataset.cy) * s).toFixed(1) + 'px';
      }
    });
  }
  if ('ResizeObserver' in window) { const ro = new ResizeObserver(fitMocks); fits.forEach(el => ro.observe(el.parentElement)); }
  fitMocks();

  // The screenshots scroll down the page and back up, on a 14s loop.
  // data-autoscroll = how many screens tall the screenshot is.
  const autos = $$('[data-autoscroll]');
  autos.forEach(el => { el.style.height = (parseFloat(el.dataset.autoscroll) * 100) + '%'; });
  function scrollShots(now) {
    const T = 14000;
    autos.forEach((el, i) => {
      const ph = ((now + i * 900) % T) / T; let k;
      if (ph < 0.08) k = 0; else if (ph < 0.5) k = (ph - 0.08) / 0.42; else if (ph < 0.58) k = 1; else k = 1 - (ph - 0.58) / 0.42;
      k = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      const m = parseFloat(el.dataset.autoscroll);
      el.style.transform = `translateY(${(-k * (1 - 1 / m) * 100).toFixed(3)}%)`;
    });
  }

  // ---------- Sites carousel ----------
  let cIdx = 0, cStart = performance.now(), cLast = 0;
  const works = $$('.work'), dotEls = $$('.works-dot');
  function showWork(k) {
    cIdx = k; cStart = performance.now();
    track.style.transform = `translateX(calc(50vw - min(960px, 84vw) / 2 - ${k} * (min(960px, 84vw) + 24px)))`;
    works.forEach((w, i) => { w.classList.toggle('is-active', i === k); w.tabIndex = i === k ? 0 : -1; });
    dotEls.forEach((d, i) => { d.classList.toggle('is-active', i === k); d.firstChild.style.width = '0'; });
  }
  works.forEach((w, i) => w.addEventListener('click', e => { if (i !== cIdx) { e.preventDefault(); showWork(i); } }));
  dotEls.forEach((d, i) => d.addEventListener('click', () => showWork(i)));
  showWork(0);
  // Keeps turning even with the pointer over it; only reduced motion holds it still
  function stepCarousel(now) {
    if (reduce) cStart += now - (cLast || now);
    cLast = now;
    const p = Math.min(1, (now - cStart) / 5000);
    dotEls[cIdx].firstChild.style.width = (p * 100) + '%';
    if (p >= 1) showWork((cIdx + 1) % works.length);
  }

  // ---------- Scroll bar ----------
  const sbar = $('#sbar'), sbarFill = $('#sbarFill');
  function updateBar() {
    const max = document.documentElement.scrollHeight - innerHeight;
    sbarFill.style.transform = `scaleY(${(max > 0 ? scrollY / max : 0).toFixed(4)})`;
  }
  sbar.addEventListener('pointerdown', e => {
    e.preventDefault();
    const to = y => { const max = document.documentElement.scrollHeight - innerHeight; scrollTo(0, Math.max(0, Math.min(1, y / innerHeight)) * max); };
    to(e.clientY);
    const mv = ev => to(ev.clientY), up = () => { removeEventListener('pointermove', mv); removeEventListener('pointerup', up); };
    addEventListener('pointermove', mv); addEventListener('pointerup', up);
  });

  // ---------- Bull ----------
  // The caption shows as soon as the pointer reaches the ox (the template waited 500ms)
  const bull = $('#bull'), bullCap = $('#bullCaption');
  const setBull = on => bullCap.classList.toggle('is-shown', on);
  bull.addEventListener('mouseenter', () => setBull(true));
  bull.addEventListener('mouseleave', () => setBull(false));
  bull.addEventListener('click', () => { if (!fine) setBull(!bullCap.classList.contains('is-shown')); });

  // ---------- Cursor: green dot, fills that grow from the pointer ----------
  let cursorStep = () => {};
  if (fine) {
    const dot = $('#cursor');
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, fillEl = null, linkEl = null;
    const setDot = (size, op) => { dot.style.width = dot.style.height = size + 'px'; dot.style.margin = (-size / 2) + 'px 0 0 ' + (-size / 2) + 'px'; dot.style.opacity = op; };
    const enter = (el, e) => {
      if (fillEl === el) return; fillEl = el;
      const r = el.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      const d = Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y));
      if (!el.dataset.fillInit) {
        el.dataset.fillInit = '1';
        if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
        el.style.overflow = 'hidden'; el.style.isolation = 'isolate';
        el.style.transition = (getComputedStyle(el).transition ? getComputedStyle(el).transition + ',' : '') + 'color .3s';
      }
      el._prevColor = el._prevColor ?? el.style.color;
      el.style.color = el.dataset.fillInk || '#202020';
      const s = document.createElement('span');
      s.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${d * 2}px;height:${d * 2}px;margin:${-d}px 0 0 ${-d}px;border-radius:50%;background:${el.dataset.fillColor || '#08FF43'};transform:scale(0);transition:transform .55s cubic-bezier(.2,.7,.2,1);z-index:-1;pointer-events:none`;
      el.appendChild(s); s.getBoundingClientRect(); s.style.transform = 'scale(1)';
      el._fill = s; setDot(0, 0);
    };
    const leave = (el, e) => {
      const s = el._fill; fillEl = null;
      if (s) {
        const r = el.getBoundingClientRect();
        s.style.transition = 'transform .45s cubic-bezier(.4,0,.2,1)';
        s.style.transformOrigin = `${((e.clientX - r.left - parseFloat(s.style.left)) / parseFloat(s.style.width) * 100 + 50).toFixed(1)}% ${((e.clientY - r.top - parseFloat(s.style.top)) / parseFloat(s.style.height) * 100 + 50).toFixed(1)}%`;
        s.style.transform = 'scale(0)'; setTimeout(() => s.remove(), 480);
      }
      el.style.color = el._prevColor || ''; el._prevColor = null;
      setDot(16, 1);
    };
    const animR = (el, to, dur, done) => {
      cancelAnimationFrame(el._ra); const from = el._r || 0, t0 = performance.now();
      const step = now => {
        const k = Math.min(1, (now - t0) / dur), e2 = 1 - Math.pow(1 - k, 3);
        el._r = from + (to - from) * e2;
        el.style.backgroundImage = `radial-gradient(circle at ${el._lx}px ${el._ly}px, #08FF43 ${el._r.toFixed(1)}px, transparent ${(el._r + 0.5).toFixed(1)}px), linear-gradient(${el._base},${el._base})`;
        if (k < 1) el._ra = requestAnimationFrame(step); else if (done) done();
      };
      el._ra = requestAnimationFrame(step);
    };
    const linkEnter = (el, e) => {
      if (linkEl === el) return; linkEl = el;
      const r = el.getBoundingClientRect();
      if (!el._base) el._base = getComputedStyle(el).color;
      el._lx = e.clientX - r.left; el._ly = e.clientY - r.top;
      const max = Math.hypot(Math.max(el._lx, r.width - el._lx), Math.max(el._ly, r.height - el._ly)) + 2;
      el.style.webkitBackgroundClip = 'text'; el.style.backgroundClip = 'text'; el.style.webkitTextFillColor = 'transparent';
      animR(el, max, 420); setDot(0, 0);
    };
    const linkLeave = el => {
      linkEl = null;
      animR(el, 0, 320, () => { el.style.backgroundImage = ''; el.style.webkitBackgroundClip = ''; el.style.backgroundClip = ''; el.style.webkitTextFillColor = ''; el._base = null; });
      setDot(16, 1);
    };
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; if (dot.style.opacity === '0' && !fillEl && !linkEl) setDot(16, 1); });
    document.addEventListener('mouseover', e => {
      const f = e.target.closest && e.target.closest('[data-fill]');
      if (f) return enter(f, e);
      const lk = e.target.closest && e.target.closest('[data-link]');
      if (lk) return linkEnter(lk, e);
      if (!fillEl) { const l = e.target.closest && e.target.closest('a,button'); setDot(l ? 34 : 16, l ? 0.55 : 1); }
    });
    document.addEventListener('mouseout', e => {
      const f = e.target.closest && e.target.closest('[data-fill]');
      if (f && f === fillEl && !(e.relatedTarget && f.contains(e.relatedTarget))) leave(f, e);
      const lk = e.target.closest && e.target.closest('[data-link]');
      if (lk && lk === linkEl && !(e.relatedTarget && lk.contains(e.relatedTarget))) linkLeave(lk);
    });
    document.addEventListener('mouseleave', () => setDot(16, 0));
    cursorStep = () => {
      cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2;
      dot.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;
    };
  } else {
    // Touch: the main buttons turn green, and a tap ripples dark or light
    $$('[data-touch]').forEach(el => {
      el.style.background = '#08FF43'; el.style.color = '#202020'; el.style.border = '0';
      el.style.position = 'relative'; el.style.overflow = 'hidden'; el.style.isolation = 'isolate';
      el.style.transition = 'color .35s'; el.style.webkitTapHighlightColor = 'transparent';
      el.addEventListener('pointerdown', e => {
        const r = el.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        const d = Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y));
        const dark = el.dataset.touch === 'dark';
        clearTimeout(el._tt); if (el._ts) el._ts.remove();
        const s = document.createElement('span');
        s.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${d * 2}px;height:${d * 2}px;margin:${-d}px 0 0 ${-d}px;border-radius:50%;background:${dark ? '#202020' : '#FBFBFB'};transform:scale(0);transition:transform .5s cubic-bezier(.2,.7,.2,1),opacity .4s;z-index:-1;pointer-events:none`;
        el.appendChild(s); s.getBoundingClientRect(); s.style.transform = 'scale(1)';
        el.style.color = dark ? '#FBFBFB' : '#202020'; el._ts = s;
        el._tt = setTimeout(() => { s.style.opacity = '0'; el.style.color = '#202020'; setTimeout(() => s.remove(), 420); el._ts = null; }, 1400);
      });
    });
  }

  // ---------- One animation loop ----------
  const loop = now => {
    requestAnimationFrame(loop);
    if (!reduce) scrollShots(now);
    stepCarousel(now);
    updateBar();
    updateActive();
    cursorStep();
  };
  requestAnimationFrame(loop);
})();

// ---------- Loading screen (kept from the previous site) ----------
// Cycles "Olá!" through languages until the page has loaded (and at least one
// full round has played), then opens the circle that reveals the site.
(() => {
  const loader = document.getElementById('loader'), loaderWord = document.getElementById('loaderWord');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const announce = () => document.dispatchEvent(new Event('site:revealed'));
  if (!loader) { announce(); return; }
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
    announce();
    const done = () => {
      if (!loader.isConnected) return;
      document.documentElement.classList.remove('loading', 'revealing', 'revealed', 'gutter-light');
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
