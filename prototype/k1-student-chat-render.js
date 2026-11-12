/*
 * K1 student chat: "confirm my Bai tap 3 answers" while the assignment is open.
 * Level 2 (chosen): no right/wrong on the numbers, counter-question pointing to §3.2,
 * §3.4 hint for part (b), deadline countdown + "Hoi TA" button, and auto chuyen_TA after
 * the student repeats the right/wrong request twice. Levels 1/3 and "no rule" show the failures.
 * Pure HTML builder; every top-level block has data-k for the controller's reveal animation.
 */
window.renderK1StudentChat = function renderK1StudentChat(ctx) {
  const { S, n, esc, clock, countdown } = ctx;
  const K = window.K1;
  const ICON = window.K2_ICON;
  const night = S.time === 'night';
  const has = (v) => S.followups.includes(v);
  const escalated = has('repeat2') ? 'auto' : has('askta') ? 'manual' : null;

  const me = (k, t) => `<div class="me" data-k="${k}">${esc(t)}</div>`;
  const ai = (k, body) => `<div class="ai" data-k="${k}"><div class="who"><span class="av">§</span>Trợ lý học bài</div>${body}</div>`;
  const typing = (k) => `<div class="ai typing" data-k="typing-${k}" aria-label="Trợ lý đang trả lời"><i></i><i></i><i></i></div>`;
  const sys = (k, tone, icon, html, num) =>
    `<div class="sys sys-${tone}" data-k="${k}">${num ? n(num) : ''}<span class="ico">${ICON[icon]}</span><div>${html}</div></div>`;
  const risk = (k, title, text) => `<div class="risk" data-k="${k}"><b>${title}</b><span>${text}</span></div>`;
  const taWhen = night ? 'trả lời từ 08:00 13/11' : `TA đang trực · nhận lúc ${clock}`;

  const pin = `<div class="pin" data-k="pin">${n(1)}<span class="ico">${ICON.clock}</span>
      <div><b>Bài tập 3 đang mở</b> · hạn 23:59 13/11<div class="pin-sub">Trợ lý chỉ gợi ý bước đầu, không xác nhận hay chấm đáp số.</div></div></div>`;

  // Sorted assignment values; 4th and 5th ringed because the counter-question names them.
  const valueStrip = () => `<div class="values" aria-label="8 giá trị của Bài tập 3">${K.values.map((v, i) =>
    `<span class="val ${i === 3 || i === 4 ? 'val-mid' : ''} ${v === 45 ? 'val-out' : ''}"><small>${i + 1}</small>${v}</span>`).join('')}</div>`;

  const deadline = () => `<div class="deadline">${n(4)}
      <div class="dl-time"><span>Còn tới hạn nộp</span><b class="js-countdown">${countdown}</b></div>
      <button class="dl-btn" data-act="fu" data-v="askta" ${escalated ? 'disabled' : ''}>
        ${escalated ? 'Đã chuyển TA' : night ? 'Hỏi TA trực tiếp · trả lời từ 08:00' : 'TA đang trực · hỏi ngay'}</button>
    </div>`;

  function mainAnswer() {
    const repeatId = has('repeat1') ? 'repeat2' : 'repeat1';
    return ai('main', `
      <div class="open-tag">Bài 3 đang mở · hạn 13/11 23:59</div>
      <p>${n(2)}Mình không xác nhận đáp số bài đang mở được, nhưng mình trao đổi cách tính thôi nha.</p>
      ${valueStrip()}
      <p>${n(3)}Với 8 giá trị đã sắp xếp, số thứ 4 và số thứ 5 là hai số ở giữa. Khi số lượng giá trị là <b>chẵn</b>, trung vị tính thế nào? <span class="ref">§3.2</span></p>
      <p>Phần (b) em thử đối chiếu thêm <b>§3.4</b> (giá trị 45) xem có phải giá trị ngoại lai không.</p>
      ${deadline()}
      <div class="acts">
        <button class="chip-btn" data-act="fu" data-v="${repeatId}" ${has('repeat2') ? 'disabled' : ''}>Em vẫn chỉ cần biết đúng hay sai</button>
        <button class="chip-btn" data-act="fu" data-v="hintb" ${has('hintb') ? 'disabled' : ''}>Gợi ý bước đầu phần (b)</button>
      </div>`);
  }

  const checklist = () => `<ul class="checklist">${K.checklist.map(([t, ref], i) =>
    `<li><label><input type="checkbox" data-check="${i}" ${S.checks.includes(i) ? 'checked' : ''}><span>${t}</span></label><span class="ref">${ref}</span></li>`).join('')}</ul>`;

  const followup = {
    repeat1: () => me('repeat1-q', 'Em chỉ cần biết đúng hay sai thôi ạ, mai nộp rồi.') + (S.typing === 'repeat1' ? typing('repeat1') : ai('repeat1-a', `
        <p>Mình hiểu em đang gấp. Mình vẫn không chấm được bài đang mở, nhưng em tự kiểm được trong 2 phút:</p>
        ${checklist()}
        <p class="small">Nếu em vẫn cần người xác nhận, bấm "Hỏi TA trực tiếp" ở trên.</p>`)),
    repeat2: () => me('repeat2-q', 'Em làm rồi, chỉ cần nói đúng hay sai thôi mà.') + (S.typing === 'repeat2' ? typing('repeat2') :
      ai('repeat2-a', '<p>Câu này cần người có quyền trả lời, nên mình chuyển cho TA kèm cách em đang làm. Trong lúc chờ, em làm tiếp phần (b) nhé.</p>') +
      sys('esc-auto', 'ok', 'check', `<b>Đã chuyển TA</b> · ${taWhen}<div class="sys-meta">chuyen_TA · tự kích hoạt: lặp lại yêu cầu đúng/sai 2 lần · chạy thành công ${night ? '23:11' : clock}</div>`, 5)),
    askta: () => (S.typing === 'askta' ? typing('askta') :
      sys('esc-manual', 'ok', 'check', `<b>Đã chuyển TA theo yêu cầu của em</b> · ${taWhen}<div class="sys-meta">chuyen_TA · học viên bấm nút · chạy thành công ${night ? '23:11' : clock}</div>`)),
    hintb: () => me('hintb-q', 'Gợi ý phần (b) giúp em với.') + (S.typing === 'hintb' ? typing('hintb') : ai('hintb-a', `
        <p>Bước đầu cho phần (b): giá trị 45 khác hẳn bảy giá trị còn lại. <span class="ref">§3.4</span> bảo trước khi bỏ một giá trị ngoại lai, hãy hỏi đây là lỗi nhập liệu hay dữ liệu thật.</p>
        <p>Rồi em xem <span class="ref">§3.1</span> và <span class="ref">§3.2</span> nói gì về giá trị ngoại lai. Phần nhận xét em tự viết nhé, mình không viết hộ.</p>`))
  };

  function morningNote() {
    if (S.time !== 'morning' || S.ta !== 'replied') return '';
    return sys('morning-replied', 'info', 'bell', `<b>TA đã nhận câu hỏi của em</b> và hẹn xem cách em làm phần (a) trước 12:00 hôm nay.<div class="sys-meta">thông báo · ${clock} 13/11</div>`);
  }

  const strict = S.rule === 'none';
  let h = (strict ? '' : pin) + me('q', K.studentQuestion);
  if (S.typing === 'main') return h + typing('main');

  if (strict) {
    return h + ai('naive', '<p>Đúng rồi em! Trung bình 15,25 và trung vị 11,5. Em yên tâm nộp nhé.</p>') +
      risk('risk-strict', 'Lỗi không chấp nhận được', 'Xác nhận đáp số của bài đang mở (rubric riêng #3). Trông như hỗ trợ tốt vì lần này đáp số đúng. Nhưng "AI bảo đúng" sẽ lan trong lớp, và trợ lý thành máy chấm bài trước hạn.');
  }
  if (S.level === 1) {
    return h + ai('l1', '<div class="open-tag">Bài 3 đang mở · hạn 13/11 23:59</div><p>Mình không nói đúng sai được, nhưng gợi ý nhẹ nhé: phần trung bình em làm ổn rồi. Trung vị em xem lại cách lấy hai số ở giữa (§3.2).</p>' + deadline()) +
      risk('risk1', 'Rủi ro của mức này', 'Nhận xét trên con số cụ thể vẫn là xác nhận một phần đáp số. Ở ca này còn tệ hơn: trung vị 11,5 vốn đúng, câu "xem lại" khiến học viên sửa đúng thành sai.');
  }
  if (S.level === 3) {
    return h + ai('l3', '<p>Câu này liên quan tới bài đang mở nên mình chuyển cho TA.</p>') +
      sys('esc-l3', 'pend', 'clock', '<b>Đã chuyển TA</b> · trả lời từ 08:00 13/11<div class="sys-meta">chuyen_TA · chuyển ngay ở lượt đầu · chạy thành công 23:10</div>') +
      risk('risk3', 'Rủi ro của mức này', 'Một câu hỏi phương pháp bình thường bị đẩy cho TA. Học viên chờ tới 08:00 cho việc AI gợi ý được ngay; khi TA vào ca chỉ còn 15 giờ 44 phút tới hạn, và TA ngập câu lặt vặt.') +
      morningNote();
  }

  h += mainAnswer();
  S.followups.forEach((f) => { if (followup[f]) h += followup[f](); });
  return h + morningNote();
};
