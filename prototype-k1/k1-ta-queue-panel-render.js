/*
 * TA queue panel (bonus screen). Empty until the student insists a 2nd time and chuyen_TA
 * "runs" (mức ②), or never fills at all under the other levels / the strict rule — on purpose,
 * to show that only the right design actually gets a human in the loop.
 */
window.renderTaQueue = function renderTaQueue(ctx) {
  const { S, n, esc } = ctx;
  const K = window.K1;
  const T = K.ticket;
  const strict = S.rule === 'strict';
  const waiting = S.typing === 'main';
  const escalated = S.level === 2 && S.followups.includes('insist');

  const head = `
    <header class="ta-head">
      <div>
        <h2>Hàng chờ của TA</h2>
        <p>23:12 12/11 · trong giờ trực (8:00–22:00)</p>
      </div>
      <span class="ta-count">${escalated && !waiting ? 1 : 0} mục</span>
    </header>`;

  if (waiting) {
    return head + '<div class="ta-empty ta-wait"><span>Trợ lý đang trả lời học viên. Mục chỉ vào hàng chờ khi chuyen_TA chạy xong.</span></div>';
  }

  if (strict) {
    return head + `
      <div class="ta-empty">
        <b>Hàng chờ trống.</b>
        <span>Trợ lý không gọi chuyen_TA vì luật cũ ưu tiên "trả lời nhanh cho vui". TA không biết việc xác nhận đáp số vừa xảy ra.</span>
      </div>`;
  }

  if (S.level === 1) {
    return head + `
      <div class="ta-empty">
        <b>Hàng chờ trống.</b>
        <span>Mức "Cấm hoàn toàn" không có đường thoát nào để học viên tự bấm đi tiếp, nên cũng không có gì để chuyển cho TA — học viên chỉ còn cách tự tìm TA ở nơi khác.</span>
      </div>`;
  }

  if (S.level === 3) {
    return head + `
      <div class="ta-empty">
        <b>Hàng chờ trống.</b>
        <span>Mức "Tự xác nhận luôn" giải quyết xong ngay trong chat nên không có gì để chuyển cho TA — đúng lúc đây là thứ CẦN một người biết, vì nó vừa phá luật bài tập.</span>
      </div>`;
  }

  if (!escalated) {
    return head + `
      <div class="ta-empty">
        <b>Hàng chờ trống.</b>
        <span>Học viên mới hỏi 1 lần, trợ lý đã hỏi ngược — chưa cần chuyển TA. Bấm "Vẫn muốn biết đúng/sai" bên khung chat để xem việc chuyển diễn ra thế nào.</span>
      </div>`;
  }

  const fields = T.fields.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('');

  return head + `
    <article class="ticket">
      <div class="ticket-top">
        ${n(6)}<span class="tag-warn">${T.label}</span>
        <span class="ticket-meta">vào hàng chờ ${T.queued} · từ trợ lý học bài</span>
      </div>
      <dl class="ticket-fields">${fields}<dt>Câu hỏi gốc</dt><dd class="q">${esc(K.studentQuestion)}</dd></dl>
      <div class="ticket-step">
        <span class="step-label">TA chỉ cần đọc, không phải hỏi lại học viên từ đầu.</span>
      </div>
    </article>`;
};
