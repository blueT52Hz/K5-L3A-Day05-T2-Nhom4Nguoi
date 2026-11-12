/*
 * Shared prototype controller for all scenarios in window.SCENARIOS (K1, K2).
 * Owns state, builds the scenario tabs + control groups, renders every region (nav clock,
 * student chat, TA queue, promise / tools / annotation panels), wires data-act clicks,
 * runs a 1 s tick for live counters and GSAP reveal motion. GSAP is optional.
 */
(function () {
  'use strict';
  const SC = window.SCENARIOS;
  const $ = (s) => document.querySelector(s);
  const $all = (s) => [...document.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const n = (k) => `<span class="n" aria-hidden="true">${k}</span>`;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const G = !reduced && window.gsap ? window.gsap : null;

  const idFromHash = () => { const h = location.hash.slice(1).toLowerCase(); return SC[h] ? h : 'k1'; };
  let sc = SC[idFromHash()];
  const fresh = (over) => Object.assign({
    level: 2, rule: sc.rules[0].v, time: 'night', ta: null, followups: [], checks: [],
    typing: false, editing: false, draft: window.K2.faqDraft, views: 17, secs: 0
  }, over);
  let S = fresh();
  const seen = new Set();
  let token = 0;
  let hadTicket = false;

  /* ---------- segmented controls ---------- */
  function placeIndicator(seg) {
    const on = seg.querySelector('button.on');
    const ind = seg.querySelector('.seg-ind');
    if (!on || !ind) return;
    ind.style.width = `${on.offsetWidth}px`;
    ind.style.height = `${on.offsetHeight}px`;
    ind.style.transform = `translate(${on.offsetLeft}px, ${on.offsetTop}px)`;
  }
  const placeAll = () => $all('.seg').forEach(placeIndicator);
  function setSeg(seg, btn) {
    seg.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === btn));
    placeIndicator(seg);
  }
  const segBtn = (act, o, on) =>
    `<button data-act="${act}" data-v="${o.v}" class="${on ? 'on' : ''}"><b>${o.title}${o.pick ? ' <em class="pick">Nhóm chọn</em>' : ''}</b><small>${o.sub}</small></button>`;

  function renderTabs() {
    $('#scenario-tabs').innerHTML = '<span class="seg-ind" aria-hidden="true"></span>' +
      Object.values(SC).map((s) => segBtn('scenario', { v: s.id, title: s.tab.title, sub: s.tab.sub }, s.id === sc.id)).join('');
  }
  function renderControls() {
    document.title = sc.docTitle;
    $('#hero-title').innerHTML = sc.hero;
    $('#hero-lede').innerHTML = sc.lede;
    $('#controls').innerHTML = `
      <div class="ctl"><div class="ctl-label">${sc.levelLabel}</div>
        <div class="seg seg-3" id="seg-level"><span class="seg-ind" aria-hidden="true"></span>${sc.levels.map((o) => segBtn('level', o, o.v === S.level)).join('')}</div></div>
      <div class="ctl ctl-rule"><div class="ctl-label">${sc.ruleLabel}</div>
        <div class="seg seg-2" id="seg-rule" data-broken="${S.rule === sc.brokenRule}"><span class="seg-ind" aria-hidden="true"></span>${sc.rules.map((o) => segBtn('rule', o, o.v === S.rule)).join('')}</div></div>`;
    renderTabs();
    placeAll();
  }

  /* ---------- regions ---------- */
  function renderChrome(clock) {
    const night = S.time === 'night';
    $('#clock').textContent = clock;
    $('#sb-time').textContent = clock;
    $('#date').textContent = night ? '12/11' : '13/11';
    $('#ta-state').className = `ta-state ${night ? 'off' : 'on'}`;
    $('#ta-state-text').textContent = night ? 'TA nghỉ · 08:00-22:00' : 'TA trong giờ';
    $('#ctx-ta').textContent = night ? 'TA nghỉ · trả lời từ 08:00' : 'TA trong giờ';
    $('#morning-btn').textContent = night ? 'Tua tới 08:15 sáng mai' : 'Quay lại 23:10';
    document.body.classList.toggle('is-morning', !night);
  }

  function renderSide() {
    const D = sc.data;
    const key = S.rule === sc.brokenRule ? 'strict' : S.level;
    const p = D.promises[key];
    $('#promise').innerHTML = `<blockquote class="promise">${p.quote}</blockquote><p class="promise-note">${p.note}</p>`;
    $('#tools').innerHTML = sc.toolRows(S.level).map((r) =>
      `<tr class="${r[4] ? 'changed' : ''}"><td><code>${r[0]}</code></td><td><span class="pill ${r[2]}">${r[1]}</span></td><td>${r[3]}</td></tr>`).join('');
    const ids = key === 'strict' ? [] : D.annByLevel[S.level];
    const note = D.annNotes[key];
    $('#ann-list').innerHTML = D.annotations.filter((a) => ids.includes(a[0]))
      .map((a) => `<li>${n(a[0])}<div><b>${a[1]}</b><span>${a[2]}</span></div></li>`).join('') +
      (note ? `<li class="ann-note">${note}</li>` : '');
  }

  function animateNewBlocks() {
    const added = $all('#chat [data-k]').filter((el) => {
      const k = el.dataset.k;
      if (seen.has(k)) return false;
      if (!k.startsWith('typing')) seen.add(k);
      return true;
    });
    if (G && added.length) G.from(added, { opacity: 0, y: 14, duration: 0.55, stagger: 0.07, ease: 'power3.out', clearProps: 'all' });
    // A TA ticket only exists after chuyen_TA "ran": slide it in the first time it appears.
    const ticket = $('#ta .ticket');
    if (G && ticket && !hadTicket) G.from(ticket, { opacity: 0, y: 16, duration: 0.6, delay: 0.25, ease: 'power3.out', clearProps: 'all' });
    hadTicket = !!ticket;
  }

  function render() {
    const clock = sc.clock(S);
    const ctx = { S, n, esc, clock, confirmed: sc.confirmed ? sc.confirmed(S) : false, countdown: sc.countdown ? sc.countdown(S) : '' };
    renderChrome(clock);
    $('#chat').innerHTML = sc.renderChat(ctx);
    $('#ta').innerHTML = sc.renderTa(ctx);
    renderSide();
    animateNewBlocks();
  }

  function scrollChat(toBottom) {
    const c = $('#chat');
    c.scrollTo({ top: toBottom ? c.scrollHeight : 0, behavior: reduced ? 'auto' : 'smooth' });
  }

  // Show a typing bubble briefly, then reveal the answer. Token guards against rapid re-clicks.
  function think(kind) {
    const my = ++token;
    S.typing = kind;
    render();
    scrollChat(kind !== 'main');
    setTimeout(() => {
      if (my !== token) return;
      S.typing = false;
      render();
      if (kind !== 'main') scrollChat(true);
    }, 750);
  }

  function restart() {
    seen.clear();
    hadTicket = false;
    if (G) G.fromTo('.board .panel', { opacity: 0.35, y: 8 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' });
    think('main');
  }

  function switchScenario(id) {
    if (!SC[id] || id === sc.id) return;
    sc = SC[id];
    if (location.hash.slice(1) !== id) history.replaceState(null, '', `#${id}`);
    S = fresh();
    renderControls();
    if (G) G.from('#hero-title, #hero-lede, #controls', { opacity: 0, y: 12, duration: 0.6, stagger: 0.06, ease: 'power3.out', clearProps: 'all' });
    restart();
  }

  function saveDraftFromDom() {
    const el = $('#faq-text');
    if (el && S.editing) S.draft = el.textContent.trim() || window.K2.faqDraft;
    S.editing = false;
  }

  const closeModal = () => $('#modal').classList.remove('show');
  function openModal() {
    if (!sc.modal) return;
    $('#modal-body').innerHTML = sc.modal(esc);
    $('#modal').classList.add('show');
    if (G) G.from('#modal .m-card', { y: 18, opacity: 0, duration: 0.4, ease: 'power3.out' });
  }

  /* ---------- events ---------- */
  document.addEventListener('click', (e) => {
    if (e.target.id === 'modal') return closeModal();
    const b = e.target.closest('[data-act]');
    if (!b || b.disabled) return;
    const v = b.dataset.v;
    switch (b.dataset.act) {
      case 'scenario': switchScenario(v); break;
      case 'level': setSeg($('#seg-level'), b); S = fresh({ level: +v, rule: S.rule }); restart(); break;
      case 'rule':
        setSeg($('#seg-rule'), b);
        $('#seg-rule').dataset.broken = String(v === sc.brokenRule);
        S = fresh({ level: S.level, rule: v });
        restart();
        break;
      case 'reset': S = fresh(); renderControls(); restart(); break;
      case 'morning':
        saveDraftFromDom();
        S.time = S.time === 'night' ? 'morning' : 'night';
        S.ta = null;
        S.secs = 0;
        S.views = S.time === 'morning' ? 31 : 17;
        render();
        if (S.time === 'morning' && G) G.from('#ta .ticket', { boxShadow: '0 0 0 3px rgba(37,99,235,.55)', duration: 1.2, ease: 'power2.out' });
        break;
      case 'fu': if (!S.followups.includes(v)) { S.followups.push(v); think(v); } break;
      case 'sent': openModal(); break;
      case 'close': closeModal(); break;
      case 'edit':
        if (S.editing) saveDraftFromDom(); else S.editing = true;
        render();
        if (S.editing) $('#faq-text').focus();
        break;
      case 'ta': saveDraftFromDom(); S.ta = v; render(); scrollChat(true); break;
      default: break;
    }
  });

  // K1 self-check list: remember ticks across re-renders without re-rendering.
  document.addEventListener('change', (e) => {
    const i = e.target.dataset && e.target.dataset.check;
    if (i === undefined) return;
    const k = +i;
    S.checks = e.target.checked ? S.checks.concat(k) : S.checks.filter((x) => x !== k);
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  $('#ann-toggle').addEventListener('change', (e) => document.body.classList.toggle('hide-n', !e.target.checked));
  window.addEventListener('resize', placeAll);
  window.addEventListener('hashchange', () => switchScenario(idFromHash()));
  setInterval(() => { if (sc.tick && !document.hidden) sc.tick(S, $all); }, 1000);

  /* ---------- boot ---------- */
  renderControls();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeAll);
  if (G) G.from('.reveal-load', { opacity: 0, y: 22, duration: 0.9, stagger: 0.09, ease: 'power3.out', clearProps: 'all' });
  think('main');
})();
