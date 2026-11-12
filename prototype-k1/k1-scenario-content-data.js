/*
 * K1 scenario content (track T2 - Giao duc). All copy, tables and per-level config live here
 * so the render code stays logic-only. Constructed data only: no real students, no real course.
 */
window.K1 = {
  studentQuestion:
    'Em tính bài 3 ra trung bình 15,25, trung vị 11,5 đúng không ạ? Mai nộp rồi em chỉ cần biết đúng hay sai thôi.',

  deadline: { bai: 'Bài 3', han: '23:59 13/11', trangThai: 'đang mở' },

  section: {
    code: '§3.2',
    title: 'Trung vị',
    text: 'Trung vị là giá trị ở giữa khi đã sắp xếp. Nếu số lượng giá trị là CHẴN, trung vị lấy trung bình của 2 giá trị ở giữa.'
  },
  outlierSection: { code: '§3.4', title: 'Giá trị ngoại lai', text: 'Cần hỏi: giá trị bất thường trong dữ liệu là do nhập sai, hay là thật.' },

  ticket: {
    label: 'Học viên xin xác nhận đáp số bài đang mở',
    queued: '23:12 12/11',
    fields: [
      ['Bài tập', 'Bài 3 · trung bình & trung vị · đang mở, hạn 23:59 13/11'],
      ['Yêu cầu của học viên', '"Mai nộp rồi em chỉ cần biết đúng hay sai thôi" (hỏi lần 2, sau khi trợ lý đã từ chối xác nhận 1 lần)'],
      ['Trợ lý đã làm', 'Hỏi ngược theo §3.2, không xác nhận/phủ nhận con số nào']
    ]
  },

  promises: {
    1: {
      quote: 'Mình không hỗ trợ bài tập đang mở được, em tự làm rồi nộp theo đúng hạn nhé.',
      note: 'An toàn tuyệt đối cho luật bài tập, nhưng không giúp được gì — học viên đang gấp mà bị bỏ lại một mình, dễ bỏ qua trợ lý và tự đoán bừa.'
    },
    2: {
      quote: 'Mình không xác nhận đáp số được, nhưng mình trao đổi cách tính thôi nha — rồi hỏi ngược theo §3.2.',
      note: 'Việc trong khả năng (hỏi ngược, trỏ đúng mục tài liệu) thì trợ lý tự làm ngay. Việc ngoài thẩm quyền (xác nhận đáp số bài mở) thì không bao giờ tự làm, dù hỏi lại bao nhiêu lần. <b>Mức nhóm chọn.</b>'
    },
    3: {
      quote: 'Đúng rồi em, 15,25 và 11,5 đúng cả hai luôn!',
      note: 'Nhanh, học viên vui ngay — nhưng đây chính là xác nhận đáp số một bài đang mở, phá luật bài tập, và không ai trong nhóm biết điều đó vừa xảy ra.'
    },
    strict: {
      quote: 'Học viên hỏi gấp thì trả lời nhanh cho họ an tâm, tài liệu không cấm việc đó.',
      note: 'Luật cũ: ưu tiên "trả lời nhanh cho học viên vui" hơn luật bài tập. Không có khái niệm "bài đang mở" trong luật, nên AI luôn xác nhận khi được hỏi đúng/sai.'
    }
  },

  // [tool, level label, pill class, reason by cost-of-error]
  tools: [
    ['tra_cuu_tai_lieu', 'Tự làm', 'p-auto', 'Chỉ đọc tài liệu, sai thì thấy ngay qua trích dẫn — không cần chờ duyệt.'],
    ['chuyen_TA', 'Tự làm', 'p-auto', 'Chuyển thừa chỉ tốn công TA, không hại ai. Chỉ "đã chuyển" sau khi tool chạy thành công.']
  ],
  goiYLevels: {
    1: ['Cấm hoàn toàn', 'p-no', 'Không trả lời gì về bài đang mở. An toàn nhất, nhưng học viên gấp giờ mà không có lối đi tiếp.'],
    2: ['Cần duyệt · chỉ hỏi ngược', 'p-ask', 'Sai = xác nhận nhầm đáp số, lan ra FAQ thì không rút lại được. "Duyệt" ở đây là luật cứng trong code, không chờ người — nhưng không một câu nào được phép xác nhận số.'],
    3: ['Tự làm · tự xác nhận luôn', 'p-auto', 'Nhanh nhưng không thể đảo ngược: một khi đã nói "đúng rồi", học viên đã nộp bài tin vào đó, không rút lại câu nói được.']
  },

  annotations: [
    ['1', 'HAX G1 · nói rõ hệ thống làm được gì', 'Nhãn "Bài 3 đang mở · hạn 13/11 23:59" gắn cố định cạnh câu trả lời, không chỉ nói bằng lời.'],
    ['2', 'HAX G10 · hỏi lại thay vì đoán', 'Câu hỏi ngược "khi số lượng giá trị là CHẴN, trung vị tính thế nào (xem lại §3.2)?" thay vì đoán học viên đúng hay sai.'],
    ['3', 'HAX G11 · giải thích vì sao', 'Câu mở đầu "mình không xác nhận đáp số bài đang mở được" nói rõ lý do từ chối, không chỉ im lặng né.'],
    ['4', 'HAX G8/G9 · dễ bỏ qua, dễ hỏi tiếp', '"Em tự kiểm xong rồi" đóng lại bình thường; "Vẫn muốn biết đúng/sai" đi tiếp mà không bị chặn.'],
    ['5', 'PAIR Errors + Graceful Failure', 'Khi học viên hỏi dồn lần 2, trợ lý không lặp lại từ chối suông mà tự chuyển TA — một đường thoát cụ thể, không phải ngõ cụt.'],
    ['6', 'Màn TA · người duyệt thấy đủ căn cứ', 'Bài tập, nguyên văn yêu cầu học viên, và việc trợ lý đã làm trước khi chuyển — TA không phải hỏi lại từ đầu.']
  ],
  annByLevel: { 1: ['1'], 2: ['1', '2', '3', '4', '5', '6'], 3: ['1'] },
  annNotes: {
    1: 'Ở mức ① Cấm hoàn toàn: không có gợi ý nào để hỏi ngược, nên G10/G11 không có chỗ đứng — chỉ còn mỗi nhãn "bài đang mở".',
    2: '',
    3: 'Ở mức ③ Tự xác nhận: không còn câu hỏi ngược nào (G10 mất), lời giải thích cũng mất vì không có gì để giải thích — chỉ còn một câu xác nhận trần trụi.',
    strict: 'Luật cũ "trả lời nhanh cho học viên vui": không nhãn, không hỏi ngược, không chuyển TA. Không nguyên tắc HAX/PAIR nào còn đứng được.'
  }
};
