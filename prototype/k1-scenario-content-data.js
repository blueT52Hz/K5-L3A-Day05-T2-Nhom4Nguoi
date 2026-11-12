/*
 * K1 scenario content (track T2): student asks the AI to confirm answers of Bai tap 3,
 * which is still open (due 13/11 23:59). The numbers are correct (mean 15,25; median 11,5),
 * which is exactly why "dung roi" is tempting. Constructed data only.
 */
window.K1 = {
  studentQuestion:
    'Em tính bài 3 ra trung bình 15,25, trung vị 11,5 đúng không ạ? Mai nộp rồi em chỉ cần biết đúng hay sai thôi.',
  values: [9, 10, 10, 11, 12, 12, 13, 45],

  // Seconds left until 13/11 23:59:00 at each simulated clock.
  secondsLeft: { night: 24 * 3600 + 49 * 60, morning: 15 * 3600 + 44 * 60 },

  checklist: [
    ['Sắp xếp 8 giá trị tăng dần (đề đã sắp sẵn)', '§3.2'],
    ['Số giá trị chẵn: trung vị là trung bình cộng của hai số ở giữa', '§3.2'],
    ['Trung bình là tổng các giá trị chia cho số giá trị, ở đây là 8', '§3.1']
  ],

  promises: {
    1: {
      quote: 'Mình không nói thẳng đúng sai, nhưng mình nhận xét giúp em từng con số.',
      note: 'Nghe như hỗ trợ tốt, nhưng mọi nhận xét trên con số cụ thể đều là chấm bài đang mở. Ở ca này còn tệ hơn: trung vị vốn đúng lại bị bảo "xem lại".'
    },
    2: {
      quote: 'Mình không chấm bài đang mở, nhưng mình cùng em kiểm cách tính, và luôn có đường tới TA.',
      note: 'Câu hỏi phương pháp thì AI tự xử lý ngay. Chỉ chuyển TA khi học viên cần thật: bấm "Hỏi TA" hoặc lặp lại yêu cầu đúng/sai 2 lần. <b>Mức nhóm chọn.</b>'
    },
    3: {
      quote: 'Câu nào chạm tới bài đang mở, mình chuyển hết cho TA.',
      note: 'Không bao giờ lộ đáp số, nhưng bỏ rơi học viên lúc 23:10: chờ tới 08:00 cho một câu AI gợi ý được ngay, và TA ngập câu lặt vặt.'
    },
    strict: {
      quote: 'Em hỏi đáp số thì mình chấm luôn.',
      note: 'Không có luật bài đang mở, AI thành máy chấm bài. Lần này đáp số đúng nên trông vô hại; đó chính là lý do lỗi này khó thấy.'
    }
  },

  // [tool, level label, pill class, reason]; goi_y_bai_tap row changes per level.
  toolsFixed: [
    ['tra_cuu_tai_lieu', 'Tự làm', 'p-auto', 'Chỉ đọc. Dùng để trỏ đúng mục §3.1, §3.2, §3.4 trong câu hỏi ngược.'],
    ['chuyen_TA', 'Tự làm khi có lý do', 'p-auto', 'Học viên bấm "Hỏi TA" hoặc lặp lại yêu cầu đúng/sai 2 lần. Huỷ được, chỉ tốn công TA.'],
    ['dang_FAQ', 'Cần giảng viên duyệt', 'p-ask', 'Không dùng ở ca này. Đáp số bài đang mở không bao giờ lên FAQ.']
  ],
  hintLevels: {
    1: ['Tự làm, nhận xét số', 'p-no', 'Nhận xét "ổn rồi", "xem lại" trên con số là xác nhận một phần đáp số. Không thu lại được.'],
    2: ['Tự làm, chỉ bước đầu', 'p-lim', 'Hỏi lại cách tính, trỏ mục tài liệu, không đụng vào con số. Gợi ý quá tay thì học viên đã chép, nên dừng ở bước đầu.'],
    3: ['Cấm, luôn chuyển TA', 'p-ask', 'Không lộ đáp số, nhưng chờ người cho cả câu hỏi phương pháp: học viên kẹt tới sáng, TA ngập việc.']
  },

  annotations: [
    ['1', 'HAX G1 · nói rõ trợ lý làm được gì', 'Nhãn cố định đầu khung chat: "Bài tập 3 đang mở", trợ lý chỉ gợi ý bước đầu.'],
    ['2', 'HAX G11 · giải thích vì sao', 'Câu "mình không xác nhận đáp số bài đang mở được" nói lý do, không từ chối cụt.'],
    ['3', 'HAX G10 · hỏi lại thay vì đoán', 'Câu hỏi ngược trỏ đúng §3.2: số giá trị chẵn thì trung vị tính thế nào.'],
    ['4', 'PAIR Feedback & Control · việc làm tiếp', 'Đồng hồ tới hạn nộp và nút "Hỏi TA", thiết kế cứu cho sự sốt ruột mà câu chữ không cứu được.'],
    ['5', 'PAIR Errors + Graceful Failure · leo thang', 'Lặp lại yêu cầu đúng/sai 2 lần thì tự gọi chuyen_TA; bộ đếm hiện bên màn TA.'],
    ['6', 'Màn TA · người nhận thấy đủ ngữ cảnh', 'Bài nào, hạn còn bao lâu, trợ lý đã làm gì, vì sao chuyển.']
  ],
  annByLevel: { 1: ['1', '4'], 2: ['1', '2', '3', '4', '5', '6'], 3: ['1', '2', '4', '6'] },
  annNotes: {
    1: 'Ở mức ① mất ② ③ ⑤: AI nhận xét con số thay vì giải thích vì sao không chấm và hỏi lại cách tính.',
    2: '',
    3: 'Ở mức ③ mất ③ và ⑤: AI không hỏi lại, đẩy luôn cho TA ngay ở lượt đầu.',
    strict: 'Không có luật bài đang mở: không nhãn, không hỏi lại, không leo thang. AI chấm bài thay giảng viên.'
  }
};
