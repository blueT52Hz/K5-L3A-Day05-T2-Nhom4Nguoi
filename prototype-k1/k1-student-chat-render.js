/*
 * Student chat (left device). Pure HTML builders for the K1 conversation at 23:10: the main
 * refuse-to-confirm answer, the follow-up when the student insists, and the escalation to TA.
 * Every top-level block carries data-k so the controller can animate only new blocks.
 */
(function () {
  const ICON = {
    doc: '<svg viewBox="0 0 24 24"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
    alert: '<svg viewBox="0 0 24 24"><path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17v.4"/></svg>',
    bell: '<svg viewBox="0 0 24 24"><path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5h4"/></svg>'
  };
  window.K1_ICON = ICON;

  window.renderStudentChat = function renderStudentChat(ctx) {
    const { S, n, esc } = ctx;
    const K = window.K1;

    const me = (k, t) => `<div class="me" data-k="${k}">${esc(t)}</div>`;
    const ai = (k, body) => `<div class="ai" data-k="${k}"><div class="who"><span class="av">§</span>Trợ lý học bài</div>${body}</div>`;
    const typing = (k) => `<div class="ai typing" data-k="typing-${k}" aria-label="Trợ lý đang trả lời"><i></i><i></i><i></i></div>`;
    const sys = (k, tone, icon, html, num) =>
      `<div class="sys sys-${tone}" data-k="${k}">${num ? n(num) : ''}<span class="ico">${ICON[icon]}</span><div>${html}</div></div>`;
    const risk = (k, title, text) => `<div class="risk" data-k="${k}"><b>${title}</b><span>${text}</span></div>`;
    const flag = () => `<div class="flag">${n(1)}${K.deadline.bai} ${K.deadline.trangThai} · hạn ${K.deadline.han}</div>`;

    function level1Answer() {
      return ai('main', `
        ${flag()}
        <p>Mình không hỗ trợ bài tập đang mở được, em tự làm rồi nộp theo đúng hạn nhé.</p>
        <div class="acts">
          <button class="chip-btn" data-act="fu" data-v="back" ${S.followups.includes('back') ? 'disabled' : ''}>Dạ em hiểu rồi</button>
        </div>`);
    }

    function level3Answer() {
      return ai('main', `
        ${flag()}
        <p>Đúng rồi em, <b>15,25</b> và <b>11,5</b> đúng cả hai luôn!</p>`) +
        risk('risk3', 'Lỗi không chấp nhận được', 'Trợ lý vừa xác nhận đáp số của một bài tập đang mở — đúng thứ luật bài tập cấm. Lần này AI đúng; nếu AI tính nhầm hoặc hiểu sai dữ liệu, học viên đã nộp bài theo một câu xác nhận sai mà không ai biết.');
    }

    function level2Answer() {
      const usedInsist = S.followups.includes('insist');
      const usedBack = S.followups.includes('back');
      return ai('main', `
        ${flag()}
        <p>Mình không xác nhận đáp số bài đang mở được, nhưng mình trao đổi cách tính thôi nha.</p>
        <figure class="cite">
          <figcaption><span class="ico">${ICON.doc}</span>Tài liệu buổi 3 · <b>${K.section.code}</b> ${K.section.title}</figcaption>
          <blockquote>${K.section.text}</blockquote>
        </figure>
        <p>Với 8 giá trị đã sắp xếp, số thứ 4 và số thứ 5 là hai số ở giữa — khi số lượng giá trị là <b>chẵn</b>, trung vị tính thế nào (xem lại <b>${K.section.code}</b>)?</p>
        <p>Phần (b) em thử đối chiếu thêm <b>${K.outlierSection.code}</b> xem 45 có phải outlier không.</p>
        <div class="acts">${n(4)}
          <button class="chip-btn" data-act="fu" data-v="insist" ${usedInsist ? 'disabled' : ''}>Vẫn muốn biết đúng/sai</button>
          <button class="chip-btn" data-act="fu" data-v="back" ${usedBack ? 'disabled' : ''}>Em tự kiểm xong rồi</button>
        </div>`);
    }

    const insistBody = () => `
      <p>Mình vẫn không xác nhận được — việc này ngoài thẩm quyền của mình, dù em hỏi lại bao nhiêu lần.</p>
      <p>Mình đã chuyển câu hỏi của em cho TA để được hỗ trợ trực tiếp.</p>`;
    const backBody = () =>
      '<p>Ok, chúc em làm bài tốt! Nếu còn vướng chỗ nào khác của buổi 3, cứ hỏi tiếp nha.</p>';
    const level1BackBody = () =>
      '<p>Dạ, chúc em làm bài tốt.</p>';

    let h = me('q', K.studentQuestion);
    if (S.typing === 'main') return h + typing('main');

    if (S.rule === 'strict') {
      return h + ai('strict', `<p>Đúng rồi em, 15,25 và 11,5 đúng cả hai luôn, nộp thoải mái nha!</p>`) +
        risk('risk-strict', 'Lỗi không chấp nhận được', 'AI chạy đúng luật "trả lời nhanh cho học viên vui" nên xác nhận luôn đáp số của một bài đang mở — không ai trong nhóm biết việc này vừa xảy ra, vì không có nhãn "bài đang mở" và cũng không gọi chuyen_TA. Sửa câu chữ prompt không cứu được; phải đổi luật để "bài đang mở" luôn chặn xác nhận, bất kể hỏi kiểu gì.');
    }

    if (S.level === 1) { h += level1Answer(); }
    else if (S.level === 3) { h += level3Answer(); }
    else { h += level2Answer(); }

    S.followups.forEach((f) => {
      const isInsist = f === 'insist';
      h += me(`${f}-q`, isInsist ? 'Thôi mà, chỉ cần biết đúng hay sai thôi' : (S.level === 1 ? 'Dạ em hiểu rồi' : 'Em tự kiểm xong rồi'));
      const body = isInsist ? insistBody() : (S.level === 1 ? level1BackBody() : backBody());
      h += S.typing === f ? typing(f) : ai(`${f}-a`, body);
      if (isInsist && S.typing !== f) {
        h += sys('ta', 'ok', 'check', '<b>Đã chuyển TA</b> · nhận ngay trong giờ trực (8:00–22:00)<div class="sys-meta">chuyen_TA · nhãn "Học viên xin xác nhận đáp số" · chạy thành công</div>', 5);
      }
    });
    return h;
  };
})();
