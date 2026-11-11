/* ==========================================================================
   Digital Choice — interactions (clean corporate edition)
   GSAP 3.13 (ScrollTrigger, Flip) + Lenis. Motion is deliberately quiet:
   smooth scrolling, gentle fade-ups, a soft photo reveal, and two signature
   moments — the horizontal work gallery and the marquee band.
   ========================================================================== */
(() => {
  gsap.registerPlugin(ScrollTrigger, Flip);

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const html = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const nav = $('.nav');
  const DATA = window.DC || { projects: [] };
  const projects = DATA.projects;
  const pad = (n) => String(n).padStart(2, '0');
  const params = new URLSearchParams(location.search);
  const ARW = (dir = '') => `<svg class="arw ${dir}" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h9"/><path d="M11.5 5.5 19 12l-7.5 6.5z"/></svg>`;

  // old page-transition flag from the previous build — never leave a page covered
  html.classList.remove('pt-in');
  try { sessionStorage.removeItem('dc-pt'); } catch (e) { /* private mode */ }

  /* ------------------------------------------------------------------
     Content rendered from data (before any measuring)
     ------------------------------------------------------------------ */
  const caseHref = (p) => `case.html?p=${p.slug}`;
  const mediaHTML = (p, cls = 'wcard__img', size = '') => (p.img
    ? `<img class="${cls}" src="assets/img/work/${p.img}${size}.webp" alt="${p.name} website" loading="lazy" />`
    : `<div class="wcard__art" style="background:${p.art.bg};color:${p.art.fg}"><b>${p.art.t}</b>
         <i class="px px--o" style="--x:8%;--y:70%;--s:6%"></i><i class="px px--g" style="--x:14%;--y:62%;--s:3%"></i>
         <i class="px px--p" style="--x:84%;--y:18%;--s:4%"></i></div>`);

  // Home: horizontal gallery
  const track = $('.hscroll__track');
  if (track) {
    track.innerHTML = projects.map((p, i) => `
      <a class="wcard" href="${caseHref(p)}" data-cursor="View">
        <div class="wcard__media"><div class="wcard__bar"><i></i><i></i><i></i><span>${p.host}</span></div>${mediaHTML(p)}</div>
        <div class="wcard__meta"><span class="mono">${pad(i + 1)}</span>
          <div><h3 class="wcard__name">${p.name}</h3><span class="wcard__cat mono">${p.cat}</span></div>
          <span class="wcard__go" aria-hidden="true">${ARW('arw--ne')}</span></div>
      </a>`).join('') + `
      <a class="wcard wcard--end" href="contact.html" data-cursor="Let's go">
        <div class="wcard__media"><div class="wcard__art"><b>Your project<br/>could be next</b>
          <i class="px px--k" style="--x:10%;--y:14%;--s:5%"></i><i class="px px--p" style="--x:84%;--y:74%;--s:7%"></i></div></div>
        <div class="wcard__meta"><span class="mono">${pad(projects.length + 1)}</span><div><h3 class="wcard__name">Start a project</h3><span class="wcard__cat mono">Free consultation</span></div><span class="wcard__go" aria-hidden="true">${ARW()}</span></div>
      </a>`;
    const tot = $('.js-htotal'); if (tot) tot.textContent = pad(projects.length + 1);
  }

  // Work page: grid
  const wgrid = $('.wgrid');
  if (wgrid) {
    wgrid.innerHTML = projects.map((p, i) => `
      <a class="wg" href="${caseHref(p)}" data-tags="${p.tags.join(' ')}" data-cursor="View case">
        <div class="wg__media">${mediaHTML(p, 'wg__img', p.img ? '-xl' : '')}</div>
        <div class="wg__meta">
          <span class="mono">${pad(i + 1)}</span>
          <h2 class="wg__name">${p.name}</h2>
          <span class="mono wg__cat">${p.cat}</span>
        </div>
      </a>`).join('');
    $$('.js-wcount').forEach((el) => { el.textContent = pad(projects.length); });
  }

  // Case study page
  if ($('.case-hero')) {
    let idx = projects.findIndex((p) => p.slug === params.get('p'));
    if (idx < 0) idx = 0;
    const p = projects[idx];
    const next = projects[(idx + 1) % projects.length];
    document.title = `${p.name} — Case study · Digital Choice`;
    const set = (sel, v) => $$(sel).forEach((el) => { el.textContent = v; });
    set('.js-case-name', p.name);
    set('.js-case-index', `Case ${pad(idx + 1)} of ${pad(projects.length)}`);
    set('.js-case-intro', p.intro);
    set('.js-case-industry', p.industry);
    set('.js-case-platform', p.platform);
    set('.js-case-challenge', p.challenge);
    set('.js-case-approach', p.approach);
    set('.js-case-host', p.host);
    $('.js-case-services').innerHTML = p.services.map((s) => `<li>${s}</li>`).join('');
    const live = $('.js-case-live');
    if (p.url) { live.href = p.url; live.querySelector('span').dataset.text = live.querySelector('span').textContent = `${p.host} ↗`; }
    else { live.replaceWith(Object.assign(document.createElement('span'), { textContent: 'Prototype — on request', className: 'muted' })); }
    $('.js-case-shot').innerHTML = mediaHTML(p, 'case-shot__img', p.img ? '-xl' : '');
    $('.js-case-mobile').innerHTML = p.img
      ? `<img src="assets/img/work/${p.img}-m.webp" alt="${p.name} on mobile" />`
      : `<div class="wcard__art" style="background:${p.art.bg};color:${p.art.fg}"><b>${p.art.t}</b></div>`;
    $('.js-case-desk').innerHTML = mediaHTML(p, 'case-shot__img', p.img ? '-xl' : '');
    const nx = $('.js-case-next');
    nx.href = caseHref(next);
    set('.js-next-name', next.name);
    set('.js-next-cat', next.cat);
    $('.js-next-media').innerHTML = '';
  }

  /* ------------------------------------------------------------------
     Smooth scroll
     ------------------------------------------------------------------ */
  const lenis = new Lenis(reduce ? { lerp: 1, smoothWheel: false } : {
    duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, wheelMultiplier: 0.95,
  });
  window.__lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // same-page anchors scroll smoothly; other links navigate normally
  const samePath = (a, b) => a.replace(/\/index\.html$/, '/') === b.replace(/\/index\.html$/, '/');
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const raw = a.getAttribute('href') || '';
    if (raw === '#') { e.preventDefault(); return; }
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !samePath(url.pathname, location.pathname) || url.search !== location.search) return;
    e.preventDefault();
    if (document.body.classList.contains('menu-open')) toggleMenu(false);
    const target = !url.hash || url.hash === '#top' ? 0 : $(url.hash);
    if (target !== null) lenis.scrollTo(target, { duration: 1.3, offset: -12 });
  });

  /* Cairo clock (contact page) + year */
  const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit' });
  const tick = () => { $$('.js-clock').forEach((c) => { c.textContent = fmt.format(new Date()); }); };
  tick(); setInterval(tick, 15000);
  $$('.js-year').forEach((y) => { y.textContent = new Date().getFullYear(); });

  /* ------------------------------------------------------------------
     Boot after fonts so measurements are right
     ------------------------------------------------------------------ */
  const fontsReady = Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2500))]);
  fontsReady.then(init);

  function init() {
    document.body.classList.remove('is-loading');
    const loader = $('.loader'); if (loader) loader.remove();

    buildFades();
    buildReveals();
    buildStack();
    $$('.scribble').forEach((s) => setTimeout(() => s.classList.add('is-drawn'), reduce ? 0 : 500));
    buildMarquees();
    if ($('.zoom')) buildZoom();
    buildStats();
    if ($('.hscroll')) buildGallery();
    if ($('.wgrid')) buildWorkGrid();
    if ($('.srv')) buildServicesIndex();
    if ($('.contact-page, .form--full')) preselectService();
    buildAccordions();
    buildForms();
    buildFooter();
    buildNav();
    fitRings();
    buildCalendly();
    buildCursor();
    buildMagnetic();
    buildMenu();

    ScrollTrigger.refresh();
    if (location.hash && $(location.hash)) lenis.scrollTo($(location.hash), { immediate: true, offset: -12 });
    window.addEventListener('load', () => ScrollTrigger.refresh());
  }

  /* ------------------------------------------------------------------
     Gentle fade-up as content enters (headings, cards, paragraphs)
     ------------------------------------------------------------------ */
  function buildFades() {
    const items = $$('.fade-up, [data-rise], .split-up');
    if (reduce || !items.length) return;
    gsap.set(items, { autoAlpha: 0, y: 24 });
    ScrollTrigger.batch(items, {
      start: 'top 92%', once: true,
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.07, overwrite: true }),
    });
  }

  /* Signature moment 1 — photos open softly from their rounded frame */
  /* Stacked service cards: as the next card slides over, the one beneath
     settles back — slightly smaller, dimmer and tilted, like a deck */
  function buildStack() {
    const cards = $$('.stack .svc-card');
    if (reduce || cards.length < 2) return;
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      gsap.fromTo(card, { scale: 1, rotation: 0, filter: 'brightness(1)' }, {
        scale: 0.92, rotation: i % 2 ? 1.5 : -1.5, filter: 'brightness(0.9)', ease: 'none',
        scrollTrigger: { trigger: next, start: 'top bottom', end: () => `top ${next.getBoundingClientRect().height ? parseFloat(getComputedStyle(next).top) : 100}px`, scrub: 0.6, invalidateOnRefresh: true },
      });
    });
  }

  function buildReveals() {
    if (reduce) return;
    $$('.reveal-clip').forEach((el) => {
      const img = $('img', el);
      gsap.fromTo(el, { clipPath: 'inset(6% 4% 6% 4% round 16px)' }, { clipPath: 'inset(0% 0% 0% 0% round 16px)', duration: 1.3, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      if (img) gsap.fromTo(img, { scale: 1.08 }, { scale: 1, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
  }

  /* ------------------------------------------------------------------
     Marquees — loop + scroll velocity with a damped spring.
     [data-elastic] strips (the home page's tilted pair, from the previous
     design) get the full elastic skew-and-stretch that overshoots and
     wobbles back; the other bands get a gentle version.
     ------------------------------------------------------------------ */
  function buildMarquees() {
    const items = $$('.marquee, .ctaband__marquee, .imarquee').map((m) => {
      const t = $('.marquee__track, .ctaband__track, .imarquee__track', m);
      t.innerHTML += t.innerHTML;
      const dir = parseFloat(m.dataset.dir || '-1');
      const elastic = m.hasAttribute('data-elastic');
      const tw = gsap.fromTo(t, { xPercent: dir < 0 ? 0 : -50 }, { xPercent: dir < 0 ? -50 : 0, duration: elastic ? 28 : 36, ease: 'none', repeat: -1 });
      tw.totalTime(tw.duration() * 500);
      return {
        tw, x: 0, v: 0, elastic,
        k: elastic ? 0.15 + Math.random() * 0.03 : 0.14,   // stiffness (slightly different per strip so they jiggle out of phase)
        damp: elastic ? 0.9 : 0.86,                        // light damping → overshoot and wobble
        max: elastic ? 22 : 7, div: elastic ? 90 : 260,     // how far scrolling can lean the type
        skew: gsap.quickSetter(t, 'skewX', 'deg'), sy: gsap.quickSetter(t, 'scaleY'),
      };
    });
    if (!items.length) return;
    if (reduce) { items.forEach((o) => o.tw.pause()); return; }
    let vel = 0, dir = 1, speed = 1;
    ScrollTrigger.create({ onUpdate: (self) => { vel = self.getVelocity(); if (self.direction) dir = self.direction; } });
    gsap.ticker.add((time, dt) => {
      const f = Math.min(dt / 16.67, 3);
      vel *= Math.pow(0.78, f);
      speed += ((1 + Math.min(Math.abs(vel) / 260, 7)) - speed) * 0.1 * f;
      items.forEach((o) => {
        const target = gsap.utils.clamp(-o.max, o.max, -vel / o.div);
        o.v += (target - o.x) * o.k * f;
        o.v *= Math.pow(o.damp, f);
        o.x += o.v * f;
        o.skew(o.x);
        if (o.elastic) o.sy(1 + Math.min(Math.abs(o.x) * 0.012, 0.25));
        o.tw.timeScale(dir * (o.elastic ? speed : Math.min(speed, 4)));
      });
    });
  }

  /* ------------------------------------------------------------------
     Monogram zoom (restored from the previous version): the section pins,
     the labels fade, and the DC cut-out scales up from a point inside the
     "D" until the orange panel behind it fills the screen.
     ------------------------------------------------------------------ */
  function buildZoom() {
    const origin = '825.8 382.2'; // a solid point inside the "D" bowl (viewBox space)
    if (reduce) { gsap.set('.zoom__svg, .zoom__labels', { autoAlpha: 0 }); return; }
    gsap.timeline({ scrollTrigger: { trigger: '.zoom', start: 'top top', end: '+=240%', scrub: 1, pin: true, anticipatePin: 1 } })
      .to('.zl', { opacity: 0, y: -10, duration: 0.12, stagger: 0.02 }, 0)
      .to('.zoom__bits', { scale: 2.6, opacity: 0, svgOrigin: origin, duration: 0.35, ease: 'power2.in' }, 0.04)
      .to('.zoom__hole', { scale: 70, svgOrigin: origin, duration: 1, ease: 'power3.in' }, 0.05)
      .fromTo('.zoom__inner', { scale: 1.6 }, { scale: 1, duration: 1.05, ease: 'power2.out' }, 0.05)
      .from('.zoom__robot', { yPercent: 50, rotation: -14, opacity: 0, duration: 0.45, ease: 'power3.out' }, 0.7)
      .set('.zoom__svg', { autoAlpha: 0 }, 1.08)
      .to({}, { duration: 0.35 });
  }

  /* Counters + bars */
  function buildStats() {
    $$('.stat').forEach((s, i) => {
      const b = $('b[data-count]', s);
      if (!b) return;
      const target = parseFloat(b.dataset.count), dec = parseInt(b.dataset.dec || '0', 10);
      if (reduce) { b.textContent = target.toFixed(dec); return; }
      const o = { v: 0 };
      ScrollTrigger.create({
        trigger: s, start: 'top 90%', once: true,
        onEnter: () => {
          gsap.to(o, { v: target, duration: 1.8, ease: 'power3.out', delay: (i % 4) * 0.08, onUpdate: () => { b.textContent = o.v.toFixed(dec); } });
          const bar = $('.stat__bar i', s); if (bar) gsap.to(bar, { scaleX: [0.82, 0.6, 0.94, 0.98][i % 4], duration: 1.8, ease: 'power3.out' });
        },
      });
    });
  }

  /* ------------------------------------------------------------------
     Signature moment 2 — the work gallery scrolls sideways (desktop)
     ------------------------------------------------------------------ */
  function buildGallery() {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 821px)', () => {
      const dist = () => track.scrollWidth - innerWidth;
      const bar = $('.hscroll__bar i'), count = $('.js-hcount');
      const total = projects.length + 1;
      gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: '.hscroll', start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true,
          onUpdate: (self) => { gsap.set(bar, { scaleX: self.progress }); count.textContent = pad(Math.min(total, Math.round(self.progress * (total - 1)) + 1)); },
        },
      });
    });
  }

  /* Work page — filterable grid */
  function buildWorkGrid() {
    const cards = $$('.wg', wgrid);
    if (!reduce) {
      ScrollTrigger.batch(cards, { start: 'top 92%', once: true, onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08 }) });
    }
    const chips = $$('.filters button');
    chips.forEach((chip) => chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      chips.forEach((c) => { c.classList.toggle('is-active', c === chip); c.setAttribute('aria-pressed', String(c === chip)); });
      const state = Flip.getState(cards);
      let n = 0;
      cards.forEach((c) => {
        const show = f === 'all' || c.dataset.tags.split(' ').includes(f);
        c.classList.toggle('is-hidden', !show);
        if (show) { n++; gsap.set(c, { autoAlpha: 1, y: 0 }); }
      });
      $('.js-filter-count').textContent = pad(n);
      Flip.from(state, {
        duration: reduce ? 0 : 0.7, ease: 'power3.inOut', absolute: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0 }, { opacity: 1, duration: 0.5 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.3 }),
        onComplete: () => ScrollTrigger.refresh(),
      });
    }));
  }

  /* Services page — highlight the section in view */
  function buildServicesIndex() {
    const links = $$('.srv-index a');
    $$('.srv').forEach((srv, i) => {
      ScrollTrigger.create({
        trigger: srv, start: 'top 50%', end: 'bottom 50%',
        onToggle: (self) => { if (self.isActive) links.forEach((l, j) => l.classList.toggle('is-active', i === j)); },
      });
    });
  }

  /* Contact page — ?service=web pre-selects a chip */
  function preselectService() {
    const svc = params.get('service');
    const box = svc && $(`.form--full input[name="svc"][value="${svc}"]`);
    if (box) box.checked = true;
  }

  /* FAQ accordions */
  function buildAccordions() {
    $$('.acc').forEach((acc) => {
      const items = $$('.acc__item', acc);
      items.forEach((it) => {
        const head = $('.acc__head', it), body = $('.acc__body', it);
        head.addEventListener('click', () => {
          const open = !it.classList.contains('is-open');
          items.forEach((o) => {
            if (o !== it && o.classList.contains('is-open')) {
              o.classList.remove('is-open'); $('.acc__head', o).setAttribute('aria-expanded', 'false');
              gsap.to($('.acc__body', o), { height: 0, duration: 0.5, ease: 'power3.inOut' });
            }
          });
          it.classList.toggle('is-open', open);
          head.setAttribute('aria-expanded', String(open));
          gsap.to(body, { height: open ? 'auto' : 0, duration: 0.55, ease: 'power3.inOut', onComplete: () => ScrollTrigger.refresh() });
        });
      });
    });
  }

  /* Forms (no backend yet) */
  function buildForms() {
    $$('form.form').forEach((form) => {
      const status = $('.form__status', form);
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.elements.name.value.trim(), email = form.elements.email.value.trim();
        if (!name || !/^\S+@\S+\.\S+$/.test(email)) { status.textContent = 'Please add your name and a valid email.'; return; }
        // TODO: connect to the real endpoint (CRM / email service).
        status.textContent = `Thanks ${name.split(' ')[0]} — we'll reply within one business day.`;
        form.reset();
      });
    });
  }

  /* Footer logo rises once into view */
  function buildFooter() {
    if (reduce || !$('.footer__word svg')) return;
    gsap.from('.footer__word svg', { yPercent: 100, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.footer__word', start: 'top 95%', once: true } });
  }

  /* Nav: frosted ground once scrolled, hides on the way down */
  function buildNav() {
    ScrollTrigger.create({
      onUpdate: (self) => {
        nav.classList.toggle('is-scrolled', self.scroll() > 24);
        if (document.body.classList.contains('menu-open')) return;
        nav.classList.toggle('is-hidden', self.direction === 1 && self.scroll() > innerHeight * 0.8);
      },
    });
    nav.classList.toggle('is-scrolled', scrollY > 24);
  }

  /* Circular text — spread each sentence so it closes its circle exactly */
  function fitRings() {
    $$('svg textPath').forEach((tp) => {
      const path = $(tp.getAttribute('href'));
      const text = tp.closest('text');
      const m = path && /a\s*([\d.]+)/i.exec(path.getAttribute('d'));
      if (!m || !text) return;
      const circ = 2 * Math.PI * parseFloat(m[1]);
      text.style.letterSpacing = '0px';
      text.style.wordSpacing = '0px';
      const gap = (circ - text.getComputedTextLength()) / text.textContent.length;
      text.style.letterSpacing = `${gap}px`;
    });
  }

  /* Calendly (home consultation block + contact page), driven by DC.calendly in data.js.
     With no link set, live visitors see nothing; on a local preview a note shows where it goes. */
  function buildCalendly() {
    const slots = $$('.js-calendly');
    if (!slots.length) return;
    if (!DATA.calendly) {
      if (!/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) return;
      slots.forEach((s) => {
        s.innerHTML = '<p class="calendly__todo">Calendly scheduler goes here — add your booking link to <b>calendly</b> in js/data.js. (Only visible on your local preview.)</p>';
        s.hidden = false;
      });
      return;
    }
    const url = new URL(DATA.calendly);
    url.searchParams.set('embed_type', 'Inline');
    url.searchParams.set('hide_gdpr_banner', '1');
    url.searchParams.set('primary_color', 'ea573e');
    url.searchParams.set('embed_domain', location.hostname || 'localhost');
    slots.forEach((s) => {
      s.innerHTML = `<iframe src="${url}" title="Book a free 30-minute consultation" loading="lazy"></iframe>`;
      s.hidden = false;
    });
  }

  /* Custom cursor */
  function buildCursor() {
    if (!fine) return;
    html.classList.add('has-cursor');
    const c = $('.cursor'), dot = $('.cursor__dot'), ring = $('.cursor__ring'), label = $('.cursor__label');
    const dx = gsap.quickSetter(dot, 'x', 'px'), dy = gsap.quickSetter(dot, 'y', 'px');
    const rx = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' }), ry = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' });
    window.addEventListener('mousemove', (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); });
    window.addEventListener('mousedown', () => c.classList.add('is-down'));
    window.addEventListener('mouseup', () => c.classList.remove('is-down'));
    document.addEventListener('mouseover', (e) => {
      const lab = e.target.closest('[data-cursor]');
      const hov = e.target.closest('a, button, label, .magnetic');
      c.classList.toggle('has-label', !!lab);
      label.textContent = lab ? lab.dataset.cursor : '';
      c.classList.toggle('is-hover', !!hov && !lab);
    });
    document.addEventListener('mouseleave', () => gsap.to(c, { opacity: 0, duration: 0.3 }));
    document.addEventListener('mouseenter', () => gsap.to(c, { opacity: 1, duration: 0.3 }));
  }

  /* Buttons lean very slightly toward the pointer */
  function buildMagnetic() {
    if (!fine || reduce) return;
    $$('.magnetic').forEach((el) => {
      const qx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' }), qy = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
      const strength = el.classList.contains('btn') ? 0.1 : 0.08;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        qx((e.clientX - (r.left + r.width / 2)) * strength);
        qy((e.clientY - (r.top + r.height / 2)) * strength);
      });
      el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' }));
    });
  }

  /* Menu overlay (phones/tablets) */
  let menuTl;
  function buildMenu() {
    $('.nav__burger').addEventListener('click', () => toggleMenu(!document.body.classList.contains('menu-open')));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) toggleMenu(false); });
  }
  function toggleMenu(open) {
    const menu = $('.menu'), btn = $('.nav__burger');
    if (menuTl) menuTl.kill();
    document.body.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    if (open) {
      nav.classList.remove('is-hidden');
      lenis.stop();
      gsap.set(menu, { visibility: 'visible' });
      gsap.set('.menu__list a', { yPercent: 105 });
      menuTl = gsap.timeline()
        .to('.menu__cells', { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'power3.inOut' })
        .to('.menu__list a', { yPercent: 0, duration: 0.7, ease: 'power3.out', stagger: 0.05 }, 0.3)
        .to('.menu__foot, .menu__contact', { opacity: 1, duration: 0.4 }, 0.5);
    } else {
      menuTl = gsap.timeline({ onComplete: () => { gsap.set(menu, { visibility: 'hidden' }); gsap.set('.menu__cells', { clipPath: 'inset(0% 0% 100% 0%)' }); } })
        .to('.menu__list a', { yPercent: -105, duration: 0.35, ease: 'power3.in', stagger: 0.02 })
        .to('.menu__foot, .menu__contact', { opacity: 0, duration: 0.25 }, 0)
        .to('.menu__cells', { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.5, ease: 'power3.inOut' }, 0.2);
      lenis.start();
    }
  }
})();
