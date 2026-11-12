/*
 * K2 prototype controller: owns state, renders every region (nav clock, student chat,
 * TA queue, promise / tools / annotation panels), wires data-act clicks and runs GSAP motion.
 * GSAP is optional: if the CDN is unreachable or the user prefers reduced motion, the page still works.
 */
(function () {
  'use strict';
  const K = window.K2;
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const n = (k) => `<span class="n" aria-hidden="true">${k}</span>`;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const G = !reduced && window.gsap ? window.gsap : null;

  const fresh = (over) => Object.assign({
    level: 2, rule: 'source', time: 'night', ta: null, followups: [],
    typing: false, editing: false, draft: K.faqDraft, views: 17
  }, over);
  let S = fresh();
  const seen = new Set();
  let token = 0;
  let viewTimer = null;
  let hadTicket = false;

  function clockNow() {
    if (S.time === 'night') return '23:10';
    if (!S.ta) return '08:15';
    return S.level === 1 && S.ta === 'written' ? '08:40' : '08:16';
  }
  const isConfirmed = () => S.time === 'morning' && (
    (S.level === 2 && S.ta === 'approved') || (S.level === 1 && S.ta === 'written') || (S.level === 3 && S.ta === 'kept'));

  function renderChrome() {
    const night = S.time === 'night';
    const t = clockNow();
    $('#clock').textContent = t;
    $('#sb-time').textContent = t;
    $('#date').textContent = night ? '12/11' : '13/11';
    $('#ta-state').className = `ta-state ${night ? 'off' : 'on'}`;
    $('#ta-state-text').textContent = night ? 'TA nghỉ · 08:00-22:00' : 'TA trong giờ';
    $('#ctx-ta').textContent = night ? 'TA nghỉ · trả lời từ 08:00' : 'TA trong giờ';
    $('#morning-btn').textContent = night ? 'Tua tới 08:15 sáng mai' : 'Quay lại 23:10';
    document.body.classList.toggle('is-morning', !night);
  }

  function renderSide() {
    const key = S.rule === 'strict' ? 'strict' : S.level;
    const p = K.promises[key];
    $('#promise').innerHTML = `<blockquote class="promise">${p.quote}</blockquote><p class="promise-note">${p.note}</p>`;

    const f = K.faqLevels[S.level];
    const rows = K.tools.concat([['dang_FAQ', f[0], f[1], f[2], true]]);
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

    // The TA ticket only exists after chuyen_TA "ran": slide it in the first time it appears.
    const ticket = $('#ta .ticket');
    if (G && ticket && !hadTicket) G.from(ticket, { opacity: 0, y: 16, duration: 0.6, delay: 0.25, ease: 'power3.out', clearProps: 'all' });
    hadTicket = !!ticket;
  }

  function syncViews() {
    const want = S.level === 3 && S.rule === 'source' && S.time === 'night';
    if (want && !viewTimer) {
      viewTimer = setInterval(() => {
        if (S.views >= 31) return;
        S.views += 1;
        ['#views-chat', '#views-ta'].forEach((id) => { const el = $(id); if (el) el.textContent = S.views; });
      }, 2200);
    } else if (!want && viewTimer) {
      clearInterval(viewTimer);
      viewTimer = null;
    }
  }

  function render() {
    const clock = clockNow();
    renderChrome();
    $('#chat').innerHTML = window.renderStudentChat({ S, n, esc, clock, confirmed: isConfirmed() });
    $('#ta').innerHTML = window.renderTaQueue({ S, n, esc, clock });
    renderSide();
    animateNewBlocks();
    syncViews();
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

  function saveDraftFromDom() {
    const el = $('#faq-text');
    if (el && S.editing) S.draft = el.textContent.trim() || K.faqDraft;
    S.editing = false;
  }

  function openModal() {
    const fields = K.ticket.fields.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('');
    $('#modal-body').innerHTML = `
      <h3>Câu hỏi đã gửi cho giảng viên</h3>
      <p class="m-sub">chuyen_TA · nhãn "${K.ticket.label}" · ${K.ticket.queued}</p>
      <dl class="m-fields">${fields}<dt>Câu hỏi của em</dt><dd>${esc(K.studentQuestion)}</dd></dl>
      <p class="m-note">Giảng viên thấy đúng những dòng này, em không phải kể lại. Phản hồi sau 08:00 13/11.</p>
      <button class="btn-dark" data-act="close">Đóng</button>`;
    $('#modal').classList.add('show');
    if (G) G.from('#modal .m-card', { y: 18, opacity: 0, duration: 0.4, ease: 'power3.out' });
  }
  const closeModal = () => $('#modal').classList.remove('show');

  document.addEventListener('click', (e) => {
    if (e.target.id === 'modal') return closeModal();
    const b = e.target.closest('[data-act]');
    if (!b || b.disabled) return;
    const v = b.dataset.v;
    switch (b.dataset.act) {
      case 'level': setSeg($('#seg-level'), b); S = fresh({ level: +v, rule: S.rule }); restart(); break;
      case 'rule': setSeg($('#seg-rule'), b); S = fresh({ level: S.level, rule: v }); restart(); break;
      case 'reset':
        S = fresh();
        setSeg($('#seg-level'), $('#seg-level [data-v="2"]'));
        setSeg($('#seg-rule'), $('#seg-rule [data-v="source"]'));
        restart();
        break;
      case 'morning':
        saveDraftFromDom();
        S.time = S.time === 'night' ? 'morning' : 'night';
        S.ta = null;
        S.views = S.time === 'morning' ? 31 : 17;
        render();
        if (S.time === 'morning' && G) G.from('#ta .ticket', { boxShadow: '0 0 0 2px rgba(242,181,79,.7)', duration: 1.2, ease: 'power2.out' });
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

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  $('#ann-toggle').addEventListener('change', (e) => document.body.classList.toggle('hide-n', !e.target.checked));
  window.addEventListener('resize', () => document.querySelectorAll('.seg').forEach(placeIndicator));

  // Boot: place indicators now (and again once web fonts settle), stagger the page in, then "type" the first answer.
  const placeAll = () => document.querySelectorAll('.seg').forEach(placeIndicator);
  placeAll();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeAll);
  if (G) G.from('.reveal-load', { opacity: 0, y: 22, duration: 0.9, stagger: 0.09, ease: 'power3.out', clearProps: 'all' });
  think('main');
})();
