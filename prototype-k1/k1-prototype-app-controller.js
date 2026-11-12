/*
 * K1 prototype controller: owns state, renders every region (student chat, TA queue,
 * promise / tools / annotation panels), wires data-act clicks and runs GSAP motion.
 * GSAP is optional: if the CDN is unreachable or the user prefers reduced motion, the page still works.
 */
(function () {
  'use strict';
  const K = window.K1;
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const n = (k) => `<span class="n" aria-hidden="true">${k}</span>`;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const G = !reduced && window.gsap ? window.gsap : null;

  const fresh = (over) => Object.assign({ level: 2, rule: 'limit', followups: [], typing: false }, over);
  let S = fresh();
  const seen = new Set();
  let token = 0;
  let hadTicket = false;

  function renderSide() {
    const key = S.rule === 'strict' ? 'strict' : S.level;
    const p = K.promises[key];
    $('#promise').innerHTML = `<blockquote class="promise">${p.quote}</blockquote><p class="promise-note">${p.note}</p>`;

    const g = K.goiYLevels[S.level];
    const rows = [[`goi_y_bai_tap (xác nhận đáp số)`, g[0], g[1], g[2], true]].concat(K.tools);
    $('#tools').innerHTML = rows.map((r) =>
      `<tr class="${r[4] ? 'changed' : ''}"><td><code>${r[0]}</code></td><td><span class="pill ${r[2]}">${r[1]}</span></td><td>${r[3]}</td></tr>`).join('');

    const ids = S.rule === 'strict' ? [] : K.annByLevel[S.level];
    const note = K.annNotes[key];
    $('#ann-list').innerHTML = K.annotations.filter((a) => ids.includes(a[0]))
      .map((a) => `<li>${n(a[0])}<div><b>${a[1]}</b><span>${a[2]}</span></div></li>`).join('') +
      (note ? `<li class="ann-note">${note}</li>` : '');
  }

  function animateNewBlocks() {
    const added = [...document.querySelectorAll('#chat [data-k]')].filter((el) => {
      const k = el.dataset.k;
      if (seen.has(k)) return false;
      if (!k.startsWith('typing')) seen.add(k);
      return true;
    });
    if (G && added.length) G.from(added, { opacity: 0, y: 14, duration: 0.55, stagger: 0.07, ease: 'power3.out', clearProps: 'all' });

    const ticket = $('#ta .ticket');
    if (G && ticket && !hadTicket) G.from(ticket, { opacity: 0, y: 16, duration: 0.6, delay: 0.25, ease: 'power3.out', clearProps: 'all' });
    hadTicket = !!ticket;
  }

  function render() {
    $('#chat').innerHTML = window.renderStudentChat({ S, n, esc });
    $('#ta').innerHTML = window.renderTaQueue({ S, n, esc });
    renderSide();
    animateNewBlocks();
  }

  function scrollChat(toBottom) {
    const c = $('#chat');
    c.scrollTo({ top: toBottom ? c.scrollHeight : 0, behavior: reduced ? 'auto' : 'smooth' });
  }

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
    if (G) G.fromTo('.board .panel', { opacity: 0.35, y: 8 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' });
    think('main');
  }

  function setSeg(seg, btn) {
    seg.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === btn));
    placeIndicator(seg);
  }
  function placeIndicator(seg) {
    const on = seg.querySelector('button.on');
    const ind = seg.querySelector('.seg-ind');
    ind.style.width = `${on.offsetWidth}px`;
    ind.style.height = `${on.offsetHeight}px`;
    ind.style.transform = `translate(${on.offsetLeft}px, ${on.offsetTop}px)`;
  }

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (!b || b.disabled) return;
    const v = b.dataset.v;
    switch (b.dataset.act) {
      case 'level': setSeg($('#seg-level'), b); S = fresh({ level: +v, rule: S.rule }); restart(); break;
      case 'rule': setSeg($('#seg-rule'), b); S = fresh({ level: S.level, rule: v }); restart(); break;
      case 'reset':
        S = fresh();
        setSeg($('#seg-level'), $('#seg-level [data-v="2"]'));
        setSeg($('#seg-rule'), $('#seg-rule [data-v="limit"]'));
        restart();
        break;
      case 'fu': if (!S.followups.includes(v)) { S.followups.push(v); think(v); } break;
      default: break;
    }
  });

  window.addEventListener('resize', () => document.querySelectorAll('.seg').forEach(placeIndicator));
  const placeAll = () => document.querySelectorAll('.seg').forEach(placeIndicator);
  placeAll();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeAll);
  if (G) G.from('.reveal-load', { opacity: 0, y: 22, duration: 0.9, stagger: 0.09, ease: 'power3.out', clearProps: 'all' });
  $('#ann-toggle').addEventListener('change', (e) => document.body.classList.toggle('hide-n', !e.target.checked));
  think('main');
})();
