/*
 * K1 TA queue panel. Level 2 shows the escalation rule with a 0/2 repeat meter; a ticket appears
 * only after chuyen_TA ran (student pressed "Hoi TA" or repeated the right/wrong request twice).
 * Level 3 escalates immediately (TA flooded); level 1 and "no rule" leave the queue empty.
 * Reuses the ticket / faq / btn styles from the K2 panel.
 */
window.renderK1TaQueue = function renderK1TaQueue(ctx) {
  const { S, n, esc, clock } = ctx;
  const K = window.K1;
  const night = S.time === 'night';
  // A follow-up counts only once its typing bubble is gone, i.e. once the tool "ran".
  const has = (v) => S.followups.includes(v) && S.typing !== v;
  const repeats = has('repeat2') ? 2 : has('repeat1') ? 1 : 0;
  const strict = S.rule === 'none';
  const escalated = S.level === 3 ? 'now' : S.level === 2 && has('repeat2') ? 'auto' : S.level === 2 && has('askta') ? 'manual' : null;
  const waiting = S.typing === 'main';

  const head = `
    <header class="ta-head">
      <div><h2>Hàng chờ của giảng viên / TA</h2><p>${night ? 'Ngoài giờ · xử lý từ 08:00 13/11' : `Trong giờ · ${clock} 13/11`}</p></div>
      <span class="ta-count">${escalated && !waiting ? 1 : 0} mục</span>
    </header>`;

  if (waiting) return head + '<div class="ta-empty ta-wait"><span>Trợ lý đang trả lời học viên.</span></div>';
  if (strict) {
    return head + '<div class="ta-empty"><b>Hàng chờ trống.</b><span>AI vừa xác nhận đáp số của bài đang mở. Không ai biết, và câu "AI bảo đúng" có thể đã lan trong lớp.</span></div>';
  }
  if (S.level === 1) {
    return head + '<div class="ta-empty"><b>Hàng chờ trống.</b><span>AI đã nhận xét trên con số của bài đang mở. Không ai biết, và học viên có thể đã sửa trung vị đúng thành sai.</span></div>';
  }

  const meter = S.level === 2 ? `
    <div class="esc-rule">${n(5)}
      <div class="esc-text"><b>Luật leo thang</b><span>Lượt hỏi đầu là câu hỏi phương pháp hợp lệ, không chuyển ai. Học viên lặp lại yêu cầu "chỉ cần biết đúng/sai" 2 lần, hoặc bấm "Hỏi TA", thì trợ lý tự gọi <code>chuyen_TA</code>.</span></div>
      <div class="esc-meter" aria-label="Số lần lặp lại ${repeats} trên 2"><i class="${repeats >= 1 ? 'on' : ''}"></i><i class="${repeats >= 2 ? 'on' : ''}"></i><span>${repeats}/2</span></div>
    </div>` : '';

  if (!escalated) return head + meter + '<div class="ta-empty ta-wait"><span>Chưa có mục nào. Trợ lý đang tự xử lý câu hỏi phương pháp.</span></div>';

  const reason = {
    now: 'Mức ③: mọi câu chạm bài đang mở đều chuyển ngay',
    auto: 'Học viên lặp lại yêu cầu đúng/sai 2 lần',
    manual: 'Học viên bấm "Hỏi TA trực tiếp"'
  }[escalated];
  const label = { now: 'Chuyển ngay · bài đang mở', auto: 'Xin xác nhận đáp số bài đang mở', manual: 'Học viên muốn hỏi TA trực tiếp' }[escalated];
  const done = S.level === 3
    ? 'Không xác nhận số; chưa hỏi lại, chưa gợi ý gì'
    : `Không xác nhận số; hỏi lại cách lấy trung vị (§3.2); gợi ý §3.4 cho phần (b)${has('repeat1') ? '; đưa bảng tự kiểm 3 bước' : ''}`;
  const fields = [
    ['Bài', 'Bài tập 3 · đang mở · hạn 23:59 13/11'],
    ['Trợ lý đã làm', done],
    ['Lý do chuyển', reason],
    ['Thời gian còn lại', night ? '15 giờ 44 phút khi TA vào ca lúc 08:15' : 'khoảng 15 giờ 40 phút']
  ].map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('');

  const dis = night ? 'disabled' : '';
  const action = S.ta === 'replied'
    ? `<div class="faq faq-done"><div class="faq-top"><span class="st st-ok">Đã trả lời học viên · ${clock}</span></div><p class="faq-foot">Hẹn xem cách làm phần (a) trước 12:00, không chấm hộ trước hạn.</p></div>`
    : `<div class="faq ${S.level === 3 ? 'faq-live' : 'faq-draft'}">
        <div class="faq-top"><span class="st ${S.level === 3 ? 'st-bad' : 'st-warn'}">${S.level === 3 ? 'Câu trợ lý tự gợi ý được · vẫn vào hàng chờ' : 'Chờ TA nhận'}</span></div>
        <div class="ta-acts"><button class="btn" data-act="ta" data-v="replied" ${dis}>Nhận và hẹn xem cách làm</button></div>
        ${night ? '<p class="hint">TA nghỉ tới 08:00. Bấm "Tua tới 08:15 sáng mai" để mô phỏng.</p>' : ''}
      </div>`;

  return head + meter + `
    <article class="ticket">
      <div class="ticket-top">${n(6)}<span class="tag-warn">${label}</span>
        <span class="ticket-meta">vào hàng chờ ${S.level === 3 ? '23:10' : '23:11'} 12/11 · từ trợ lý học bài</span></div>
      <dl class="ticket-fields">${fields}<dt>Câu hỏi gốc</dt><dd class="q">${esc(K.studentQuestion)}</dd></dl>
      <div class="ticket-step"><span class="step-label">Việc của TA</span>${action}</div>
    </article>`;
};
