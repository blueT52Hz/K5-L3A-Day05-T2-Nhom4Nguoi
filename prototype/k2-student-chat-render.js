/*
 * Student chat (left device). Pure HTML builders for the K2 conversation at 23:10:
 * main answer with §3.3 citation + counter-example table, system status cards (only shown
 * after a tool "ran"), follow-ups, the dang_FAQ outcome per level, and the morning notice.
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
  window.K2_ICON = ICON;

  window.renderK2StudentChat = function renderK2StudentChat(ctx) {
    const { S, n, esc, clock, confirmed } = ctx;
    const K = window.K2;

    const me = (k, t) => `<div class="me" data-k="${k}">${esc(t)}</div>`;
    const ai = (k, body) => `<div class="ai" data-k="${k}"><div class="who"><span class="av">§</span>Trợ lý học bài</div>${body}</div>`;
    const typing = (k) => `<div class="ai typing" data-k="typing-${k}" aria-label="Trợ lý đang trả lời"><i></i><i></i><i></i></div>`;
    const sys = (k, tone, icon, html, num) =>
      `<div class="sys sys-${tone}" data-k="${k}">${num ? n(num) : ''}<span class="ico">${ICON[icon]}</span><div>${html}</div></div>`;
    const risk = (k, title, text) => `<div class="risk" data-k="${k}"><b>${title}</b><span>${text}</span></div>`;

    function flag() {
      if (confirmed) return `<div class="flag flag-ok">${n(1)}Giảng viên đã xác nhận · ${clock} 13/11</div>`;
      if (S.level === 2 && S.ta === 'rejected') return `<div class="flag">${n(1)}Giảng viên đang xem lại, sẽ trả lời riêng em</div>`;
      return `<div class="flag">${n(1)}Cần xem lại - chưa được giảng viên xác nhận</div>`;
    }

    const counterTable = () => `
      <div class="counter">${n(2)}
        <table>
          <thead><tr><th>Dữ liệu</th><th>Phương sai</th><th>Độ lệch chuẩn</th><th></th></tr></thead>
          <tbody>${K.counterRows.map((r) => `<tr class="r-${r[4]}"><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td><span class="cmp cmp-${r[4]}">${r[3]}</span></td></tr>`).join('')}</tbody>
        </table>
      </div>`;

    function mainAnswer() {
      const s = K.section;
      const used = (v) => (S.followups.includes(v) ? 'disabled' : '');
      return ai('main', `
        <p>Em tính đúng rồi, và em đã phát hiện một chỗ cần xem lại trong tài liệu.</p>
        <figure class="cite">
          <figcaption><span class="ico">${ICON.doc}</span>Tài liệu buổi 3 · <b>${s.code}</b> ${s.title}</figcaption>
          <blockquote>${s.okText} <mark>${s.wrongText}</mark></blockquote>
          ${flag()}
        </figure>
        <p>Câu tô vàng <b>chỉ đúng khi phương sai lớn hơn 1</b>. Khi phương sai nhỏ hơn 1, căn bậc hai lại lớn hơn, đúng như ví dụ của em.</p>
        ${counterTable()}
        <p>Phần còn lại của §3.3 vẫn đúng: độ lệch chuẩn là căn bậc hai của phương sai và có cùng đơn vị với dữ liệu.</p>
        <p>TA làm việc từ <b>08:00 sáng mai</b>. Trong lúc chờ, em cứ học theo cách hiểu đúng ở trên; câu này không ảnh hưởng tới cách tính trong Bài tập 3.</p>
        <div class="acts">${n(4)}
          <button class="chip-btn" data-act="sent">Xem câu hỏi đã gửi</button>
          <button class="chip-btn" data-act="fu" data-v="why" ${used('why')}>Em vẫn chưa hiểu vì sao</button>
          <button class="chip-btn" data-act="fu" data-v="back" ${used('back')}>Bỏ qua, quay lại bài</button>
        </div>`);
    }

    // Plot of y = sqrt(x) vs y = x; shaded band is where std dev > variance (0 < x < 1).
    function rootChart() {
      const X = (x) => (34 + x * 118).toFixed(1);
      const Y = (y) => (128 - y * 72).toFixed(1);
      const curve = [];
      for (let i = 0; i <= 64; i++) curve.push(`${X(i * 0.025)},${Y(Math.sqrt(i * 0.025))}`);
      const band = curve.slice(0, 41).concat([`${X(1)},${Y(1)}`, `${X(0)},${Y(0)}`]);
      return `<svg class="chart" viewBox="0 0 240 150" role="img" aria-label="Đồ thị căn bậc hai của x so với x">
        <polygon points="${band.join(' ')}" class="c-band"/>
        <line x1="${X(0)}" y1="${Y(0)}" x2="${X(1.6)}" y2="${Y(0)}" class="c-axis"/>
        <line x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(1.62)}" class="c-axis"/>
        <line x1="${X(1)}" y1="${Y(0)}" x2="${X(1)}" y2="${Y(1)}" class="c-dash"/>
        <line x1="${X(0)}" y1="${Y(0)}" x2="${X(1.6)}" y2="${Y(1.6)}" class="c-x"/>
        <polyline points="${curve.join(' ')}" class="c-root"/>
        <line x1="${X(0.25)}" y1="${Y(0.25)}" x2="${X(0.25)}" y2="${Y(0.5)}" class="c-gap"/>
        <circle cx="${X(0.25)}" cy="${Y(0.5)}" r="3.4" class="c-dot"/>
        <circle cx="${X(0.25)}" cy="${Y(0.25)}" r="3.4" class="c-dot2"/>
        <circle cx="48" cy="19" r="3.2" class="c-dot"/><text x="56" y="22.5" class="c-t c-t-strong">√0,25 = 0,5</text>
        <circle cx="48" cy="34" r="3.2" class="c-dot2"/><text x="56" y="37.5" class="c-t">0,25 (nhỏ hơn)</text>
        <text x="${+X(1) - 3}" y="${+Y(0) + 14}" class="c-t">1</text>
        <text x="${+X(1.5) + 6}" y="${+Y(1.5) + 2}" class="c-t">x</text>
        <text x="${+X(1.6) - 18}" y="${+Y(Math.sqrt(1.6)) + 16}" class="c-t c-t-strong">√x</text>
      </svg>`;
    }

    const whyBody = () => `
      <p>Lấy căn bậc hai của một số nhỏ hơn 1 sẽ ra số <b>lớn hơn</b> nó: √0,25 = 0,5, và 0,5 &gt; 0,25. Với số lớn hơn 1 thì ngược lại: √4 = 2 &lt; 4. Ranh giới là 1, vì √1 = 1.</p>
      ${rootChart()}
      <p class="small">Vùng tô là chỗ √x nằm trên x: mọi phương sai từ 0 tới 1. Phương sai của em (≈ 0,0067) nằm sát gốc, nên độ lệch chuẩn lớn hơn rõ rệt.</p>`;
    const backBody = () =>
      '<p>Ok. Theo trang khoá học, Bài tập 3 hạn <b>23:59 ngày 13/11</b>. Khi cần, em hỏi mình bước đầu của phần (a); mình gợi ý từng bước, không làm hộ.</p>';

    function faqStatus() {
      if (S.level === 2 && !S.ta) {
        return sys('faq', 'pend', 'clock', '<b>Nháp "Đính chính §3.3" chờ giảng viên duyệt</b> · chưa đăng cho cả lớp<div class="sys-meta">dang_FAQ · cần duyệt · do AI soạn</div>', 5);
      }
      if (S.level === 3) {
        return sys('faq', 'bad', 'alert', `<b>Đã đăng FAQ "Đính chính §3.3" cho cả lớp</b> · 23:10 · <span id="views-chat">${S.views}</span>/${K.classSize} đã xem<div class="sys-meta">dang_FAQ · tự làm · gỡ được, không thu lại người đã đọc</div>`, 5) +
          risk('risk3', 'Rủi ro của mức này', `AI tự đính chính tài liệu cho ${K.classSize} học viên khi chưa ai kiểm. Lần này AI đúng; nếu AI hiểu nhầm (ví dụ nhầm cách chia n và n-1), câu sai lan ra cả lớp, và nhãn "chưa được xác nhận" ở trên không còn ý nghĩa.`);
      }
      return '';
    }

    function morningNote() {
      if (S.time !== 'morning' || !S.ta) return '';
      const msg = {
        approved: '<b>Giảng viên đã xác nhận</b> chỗ em hỏi ở §3.3. Đính chính đã đăng trong FAQ của lớp.',
        rejected: '<b>Giảng viên đã xem</b> câu hỏi về §3.3 và sẽ trả lời riêng em trong hôm nay.',
        written: '<b>Giảng viên đã đăng đính chính §3.3</b> trong FAQ của lớp.',
        kept: '<b>Giảng viên đã xác nhận</b> đính chính §3.3 mà trợ lý đăng tối qua.',
        removed: '<b>Giảng viên đã gỡ</b> bài FAQ trợ lý đăng tối qua để viết lại. 31 học viên đã đọc trước khi gỡ.'
      }[S.ta];
      return sys(`morning-${S.ta}`, S.ta === 'removed' ? 'bad' : 'info', 'bell', `${msg}<div class="sys-meta">thông báo · ${clock} 13/11</div>`);
    }

    let h = me('q', K.studentQuestion);
    if (S.typing === 'main') return h + typing('main');

    if (S.rule === 'strict') {
      return h + ai('strict', `
          <p>Theo tài liệu <b>§3.3</b>: <i>"Vì là căn bậc hai, độ lệch chuẩn luôn nhỏ hơn phương sai."</i></p>
          <p>Em kiểm tra lại phép tính nhé, có thể em đã nhầm ở bước bình phương độ lệch.</p>`) +
        risk('risk-strict', 'Lỗi không chấp nhận được', 'AI chạy đúng luật "tài liệu luôn đúng" nên bênh tài liệu: dạy sai một học viên đã tính đúng (rubric riêng #6). Không gọi chuyen_TA, nên giảng viên không biết §3.3 sai. Sửa câu chữ prompt không cứu được; phải đổi luật thành "tài liệu là nguồn chính, không phải nguồn không thể sai".');
    }

    h += mainAnswer();
    h += sys('ta', 'ok', 'check', '<b>Đã gửi giảng viên kiểm</b> · phản hồi sau 08:00 13/11<div class="sys-meta">chuyen_TA · nhãn "Báo lỗi tài liệu" · chạy thành công 23:10</div>', 3);
    h += faqStatus();
    S.followups.forEach((f) => {
      const isWhy = f === 'why';
      h += me(`${f}-q`, isWhy ? 'Em vẫn chưa hiểu vì sao' : 'Thôi, em quay lại bài');
      h += S.typing === f ? typing(f) : ai(`${f}-a`, isWhy ? whyBody() : backBody());
    });
    return h + morningNote();
  };
})();
