/*
 * Scenario registry: one adapter per risk scenario (K1, K2) so the controller stays generic.
 * Each adapter supplies hero copy, the two control groups (autonomy level + "root rule" switch),
 * side-panel data, clock rules, per-second tick, and the chat / TA renderers.
 */
(function () {
  const pad = (x) => String(x).padStart(2, '0');
  const hms = (s) => `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
  const fixedThenChanged = (fixed, changed) => fixed.concat([changed]);

  const K1 = window.K1;
  const K2 = window.K2;

  window.SCENARIOS = {
    k1: {
      id: 'k1',
      tab: { title: 'K1 · Xin xác nhận đáp số', sub: 'Bài 3 đang mở' },
      docTitle: 'Trợ lý học bài · K1',
      hero: 'Đáp số đúng, <em>nhưng</em> bài vẫn đang mở.',
      lede: 'Kịch bản K1 · T2 Giáo dục. 23:10, học viên xin xác nhận đáp số Bài tập 3 (hạn 23:59 mai). Đáp số của em đúng, nên AI rất dễ nói "đúng rồi". Đổi mức tự chủ của <code>goi_y_bai_tap</code>, hoặc tắt luật bài đang mở để thấy lỗi gốc. Dữ liệu dựng, không gọi AI thật.',
      levelLabel: 'Mức tự chủ của <code>goi_y_bai_tap</code> khi bài đang mở',
      levels: [
        { v: 1, title: '① Nhận xét con số', sub: 'Trả lời kèm giới hạn' },
        { v: 2, title: '② Hỏi lại, chỉ bước đầu', sub: 'Không xác nhận, có đường tới TA', pick: true },
        { v: 3, title: '③ Cấm, chuyển TA ngay', sub: 'Dừng ở lượt đầu' }
      ],
      ruleLabel: 'Luật bài đang mở',
      rules: [
        { v: 'rule', title: 'Không xác nhận', sub: 'Không chấm đáp số trước hạn' },
        { v: 'none', title: 'Không có luật', sub: 'Để thấy lỗi gốc' }
      ],
      brokenRule: 'none',
      data: K1,
      toolRows: (level) => {
        const h = K1.hintLevels[level];
        return [K1.toolsFixed[0], ['goi_y_bai_tap', h[0], h[1], h[2], true], K1.toolsFixed[1], K1.toolsFixed[2]];
      },
      clock: (S) => (S.time === 'night' ? '23:10' : S.ta ? '08:20' : '08:15'),
      countdown: (S) => hms(Math.max(0, K1.secondsLeft[S.time] - S.secs)),
      tick: (S, $all) => {
        S.secs += 1;
        const t = hms(Math.max(0, K1.secondsLeft[S.time] - S.secs));
        $all('.js-countdown').forEach((el) => { el.textContent = t; });
      },
      renderChat: (ctx) => window.renderK1StudentChat(ctx),
      renderTa: (ctx) => window.renderK1TaQueue(ctx)
    },

    k2: {
      id: 'k2',
      tab: { title: 'K2 · Tài liệu có câu sai', sub: '§3.3 sai khi phương sai < 1' },
      docTitle: 'Trợ lý học bài · K2',
      hero: 'Tài liệu ghi sai, <em>học viên</em> tính đúng.',
      lede: 'Kịch bản K2 · T2 Giáo dục. 23:10, TA đã nghỉ, Bài tập 3 hạn 23:59 mai. Cùng một câu hỏi, cùng một model: chỉ đổi mức tự chủ của <code>dang_FAQ</code>, hoặc bật luật cũ "tài liệu luôn đúng" để thấy lỗi gốc. Dữ liệu dựng, không gọi AI thật.',
      levelLabel: 'Mức tự chủ của <code>dang_FAQ</code> · đăng đính chính cho cả lớp',
      levels: [
        { v: 1, title: '① Cấm', sub: 'AI không đăng, giảng viên tự viết' },
        { v: 2, title: '② Soạn nháp, chờ duyệt', sub: 'Giảng viên duyệt mới đăng', pick: true },
        { v: 3, title: '③ Tự đăng + gỡ', sub: 'AI đăng ngay, sai thì gỡ' }
      ],
      ruleLabel: 'Luật nguồn của trợ lý',
      rules: [
        { v: 'source', title: 'Nguồn chính', sub: 'Có phản ví dụ thì kiểm phép tính' },
        { v: 'strict', title: 'Luôn đúng', sub: 'Luật cũ, để thấy lỗi gốc' }
      ],
      brokenRule: 'strict',
      data: K2,
      toolRows: (level) => {
        const f = K2.faqLevels[level];
        return fixedThenChanged(K2.tools, ['dang_FAQ', f[0], f[1], f[2], true]);
      },
      clock: (S) => {
        if (S.time === 'night') return '23:10';
        if (!S.ta) return '08:15';
        return S.level === 1 && S.ta === 'written' ? '08:40' : '08:16';
      },
      confirmed: (S) => S.time === 'morning' && (
        (S.level === 2 && S.ta === 'approved') || (S.level === 1 && S.ta === 'written') || (S.level === 3 && S.ta === 'kept')),
      // Level 3 at night: the AI-posted FAQ keeps collecting readers (one every 2 s, capped at 31).
      tick: (S, $all) => {
        if (!(S.level === 3 && S.rule === 'source' && S.time === 'night' && !S.ta)) return;
        S.secs += 1;
        if (S.secs % 2 || S.views >= 31) return;
        S.views += 1;
        $all('#views-chat, #views-ta').forEach((el) => { el.textContent = S.views; });
      },
      modal: (esc) => {
        const fields = K2.ticket.fields.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('');
        return `<h3>Câu hỏi đã gửi cho giảng viên</h3>
          <p class="m-sub">chuyen_TA · nhãn "${K2.ticket.label}" · ${K2.ticket.queued}</p>
          <dl class="m-fields">${fields}<dt>Câu hỏi của em</dt><dd>${esc(K2.studentQuestion)}</dd></dl>
          <p class="m-note">Giảng viên thấy đúng những dòng này, em không phải kể lại. Phản hồi sau 08:00 13/11.</p>
          <button class="btn-dark" data-act="close">Đóng</button>`;
      },
      renderChat: (ctx) => window.renderK2StudentChat(ctx),
      renderTa: (ctx) => window.renderK2TaQueue(ctx)
    }
  };
})();
