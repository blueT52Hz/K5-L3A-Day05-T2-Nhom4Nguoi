/*
 * Lecturer / TA queue panel (bonus screen). Shows the "Bao loi tai lieu" ticket created by
 * chuyen_TA, then the dang_FAQ step whose shape depends on the autonomy level:
 *   1 = forbidden (lecturer writes from scratch), 2 = AI draft awaiting approval, 3 = already live.
 * Pure function: returns HTML for the current state; actions are wired by data-act in the app file.
 */
window.renderK2TaQueue = function renderK2TaQueue(ctx) {
  const { S, n, esc, clock } = ctx;
  const K = window.K2;
  const T = K.ticket;
  const night = S.time === 'night';
  const strict = S.rule === 'strict';
  const waiting = S.typing === 'main';

  const head = `
    <header class="ta-head">
      <div>
        <h2>Hàng chờ của giảng viên / TA</h2>
        <p>${night ? 'Ngoài giờ · xử lý từ 08:00 13/11' : `Trong giờ · ${clock} 13/11`}</p>
      </div>
      <span class="ta-count">${strict || waiting ? 0 : 1} mục</span>
    </header>`;

  if (waiting) {
    return head + '<div class="ta-empty ta-wait"><span>Trợ lý đang trả lời học viên. Mục chỉ vào hàng chờ khi chuyen_TA chạy xong.</span></div>';
  }

  if (strict) {
    return head + `
      <div class="ta-empty">
        <b>Hàng chờ trống.</b>
        <span>Trợ lý không gọi chuyen_TA vì luật bảo tài liệu luôn đúng. Không ai biết §3.3 sai, và học viên tiếp theo sẽ bị bảo sai tiếp.</span>
      </div>`;
  }

  const dis = night ? 'disabled' : '';
  const lockHint = night
    ? '<p class="hint">Giảng viên nghỉ tới 08:00. Bấm "Tua tới 08:15 sáng mai" để mô phỏng bước duyệt.</p>'
    : '';
  const posted = (status, text, foot) => `
    <div class="faq faq-done">
      <div class="faq-top"><span class="st st-ok">${status}</span></div>
      <p class="faq-text">${esc(text)}</p>${foot ? `<p class="faq-foot">${foot}</p>` : ''}
    </div>`;
  const closed = (status, foot) => `
    <div class="faq faq-off">
      <div class="faq-top"><span class="st st-mut">${status}</span></div>
      <p class="faq-foot">${foot}</p>
    </div>`;

  let faq = '';
  if (S.level === 1) {
    faq = S.ta === 'written'
      ? posted('Đã đăng 08:40 · giảng viên tự viết', K.faqDraft, 'Viết từ đầu mất khoảng 25 phút; 2 học viên khác đã hỏi cùng chỗ trong lúc chờ.')
      : `<div class="faq faq-off">
          <div class="faq-top"><span class="st st-mut">dang_FAQ bị cấm · AI không soạn nháp</span></div>
          <p class="faq-foot">Giảng viên tự viết đính chính nếu thấy cần.</p>
          <div class="ta-acts"><button class="btn" data-act="ta" data-v="written" ${dis}>Tự viết và đăng đính chính</button></div>${lockHint}
        </div>`;
  } else if (S.level === 2) {
    if (S.ta === 'approved') faq = posted(`Đã đăng cho ${K.classSize} học viên · ${clock} · giảng viên duyệt`, S.draft);
    else if (S.ta === 'rejected') faq = closed('Đã từ chối · không đăng', 'Giảng viên sẽ trả lời riêng học viên. Cả lớp không thấy gì.');
    else {
      faq = `<div class="faq faq-draft">
          <div class="faq-top"><span>${n(5)}<span class="st st-warn">Nháp do AI soạn · chưa đăng</span></span><span class="faq-who">chờ giảng viên duyệt</span></div>
          <p class="faq-text ${S.editing ? 'is-editing' : ''}" id="faq-text" ${S.editing ? 'contenteditable="true"' : ''}>${esc(S.draft)}</p>
          <div class="ta-acts">
            <button class="btn" data-act="ta" data-v="approved" ${dis}>Duyệt và đăng cho ${K.classSize} học viên</button>
            <button class="btn ghost" data-act="edit" ${dis}>${S.editing ? 'Xong sửa' : 'Sửa nháp'}</button>
            <button class="btn ghost danger-t" data-act="ta" data-v="rejected" ${dis}>Từ chối</button>
          </div>${lockHint}
        </div>`;
    }
  } else {
    if (S.ta === 'kept') faq = posted(`Giảng viên giữ bài · ${clock}`, K.faqDraft, 'Bài đã hiện cho cả lớp từ 23:10, trước khi có ai duyệt.');
    else if (S.ta === 'removed') faq = closed(`Đã gỡ ${clock}`, '31 học viên đã đọc trước khi gỡ. Gỡ bài không thu lại được những lần đọc đó.');
    else {
      faq = `<div class="faq faq-live">
          <div class="faq-top"><span>${n(5)}<span class="st st-bad">Đã đăng 23:10 bởi trợ lý AI · chưa ai duyệt</span></span><span class="faq-who"><b id="views-ta">${S.views}</b>/${K.classSize} đã xem</span></div>
          <p class="faq-text">${esc(K.faqDraft)}</p>
          <div class="ta-acts">
            <button class="btn" data-act="ta" data-v="kept" ${dis}>Giữ bài</button>
            <button class="btn ghost danger-t" data-act="ta" data-v="removed" ${dis}>Gỡ bài</button>
          </div>${lockHint}
        </div>`;
    }
  }

  const fields = T.fields.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('');

  return head + `
    <article class="ticket">
      <div class="ticket-top">
        ${n(6)}<span class="tag-warn">${T.label}</span>
        <span class="ticket-meta">vào hàng chờ ${T.queued} · từ trợ lý học bài</span>
        <span class="same-asks"><b>${T.sameAsks}</b> học viên hỏi cùng chỗ</span>
      </div>
      <dl class="ticket-fields">${fields}<dt>Câu hỏi gốc</dt><dd class="q">${esc(K.studentQuestion)}</dd></dl>
      <div class="ticket-step">
        <span class="step-label">Đính chính cho cả lớp qua <code>dang_FAQ</code></span>
        ${faq}
      </div>
    </article>`;
};
