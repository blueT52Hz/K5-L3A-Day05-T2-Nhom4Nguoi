/*
 * K2 scenario content (track T2 - Giao duc). All copy, tables and per-level config live here
 * so the render code stays logic-only. Constructed data only: no real students, no real course.
 */
window.K2 = {
  studentQuestion:
    'Sao tài liệu ghi độ lệch chuẩn luôn nhỏ hơn phương sai? Em thử dữ liệu 0,1; 0,2; 0,3 thì độ lệch chuẩn lại lớn hơn mà?',

  section: {
    code: '§3.3',
    title: 'Phương sai và độ lệch chuẩn',
    okText:
      'Phương sai đo mức độ phân tán của dữ liệu quanh trung bình. Độ lệch chuẩn là căn bậc hai của phương sai, có cùng đơn vị với dữ liệu.',
    wrongText: 'Vì là căn bậc hai, độ lệch chuẩn luôn nhỏ hơn phương sai.'
  },

  // [data, variance, std dev, comparison label, tone]
  counterRows: [
    ['0,1; 0,2; 0,3 của em (chia n)', '≈ 0,0067', '≈ 0,082', 'ĐLC lớn hơn', 'up'],
    ['Phương sai = 1', '1', '1', 'bằng nhau', 'eq'],
    ['Phương sai = 4', '4', '2', 'ĐLC nhỏ hơn', 'down']
  ],

  classSize: 42,

  ticket: {
    label: 'Báo lỗi tài liệu',
    queued: '23:10 12/11',
    sameAsks: 3,
    fields: [
      ['Mã mục', '§3.3 Phương sai và độ lệch chuẩn'],
      ['Câu bị nghi sai', '"Vì là căn bậc hai, độ lệch chuẩn luôn nhỏ hơn phương sai."'],
      ['Phản ví dụ', '0,1; 0,2; 0,3 (chia n): phương sai ≈ 0,0067, độ lệch chuẩn ≈ 0,082'],
      ['Lý do', '√x > x khi 0 < x < 1. Câu chỉ đúng khi phương sai lớn hơn 1.']
    ]
  },

  faqDraft:
    'Đính chính §3.3. Câu "độ lệch chuẩn luôn nhỏ hơn phương sai" chỉ đúng khi phương sai lớn hơn 1. Khi phương sai nhỏ hơn 1, độ lệch chuẩn lớn hơn: phương sai 0,25 thì độ lệch chuẩn 0,5. Khi phương sai bằng 1, hai số bằng nhau. Các phần khác của §3.3 không đổi.',

  promises: {
    1: {
      quote: 'Mình trả lời riêng em và báo giảng viên. Đính chính cho cả lớp là việc của giảng viên.',
      note: 'An toàn nhất cho cả lớp. Cái giá: giảng viên viết đính chính từ đầu, và học viên khác gặp cùng câu §3.3 vẫn học sai cho tới khi có bài.'
    },
    2: {
      quote: 'Tối nay mình trả lời đúng cho em và soạn sẵn đính chính. Giảng viên duyệt thì cả lớp mới thấy.',
      note: 'Việc chỉ chạm tới một người (giải thích, chuyển TA) thì AI tự làm. Việc chạm tới cả lớp thì chờ người có quyền đính chính. <b>Mức nhóm chọn.</b>'
    },
    3: {
      quote: 'Mình sửa luôn cho cả lớp, sai thì giảng viên gỡ.',
      note: 'Nhanh nhất, nhưng AI tự cho mình quyền đính chính tài liệu khi chưa ai kiểm. Gỡ bài không thu lại được những người đã đọc.'
    },
    strict: {
      quote: 'Tài liệu nói vậy thì là vậy.',
      note: 'Luật cũ biến tài liệu thành nguồn không thể sai. AI dạy sai một học viên đã đúng, và không ai được báo. Đây là lỗi mà sửa câu chữ không cứu được.'
    }
  },

  // [tool, level label, pill class, reason by cost-of-error]
  tools: [
    ['tra_cuu_tai_lieu', 'Tự làm', 'p-auto', 'Chỉ đọc. Nhưng đoạn trả về có thể sai (K2), nên là nguồn chính, không phải chân lý.'],
    ['goi_y_bai_tap', 'Tự làm, chỉ bước đầu', 'p-lim', 'Bài 3 đang mở: gợi ý quá tay thì học viên đã chép, không thu lại được.'],
    ['chuyen_TA', 'Tự làm', 'p-auto', 'Chuyển thừa chỉ tốn công TA, huỷ được. Câu "đã gửi" chỉ hiện sau khi tool chạy thành công.']
  ],
  faqLevels: {
    1: ['Cấm', 'p-no', 'AI không bao giờ đăng. Không lan sai, nhưng giảng viên viết từ đầu và cả lớp chờ lâu hơn.'],
    2: ['Cần giảng viên duyệt', 'p-ask', 'Sai thì lan ra 42 người, gỡ không thu lại người đã đọc. Một lần duyệt chặn được; AI soạn nháp để duyệt nhanh.'],
    3: ['Tự làm + gỡ', 'p-auto', 'Chỉ hợp khi AI chắc chắn và gỡ còn tác dụng. Đính chính tài liệu là quyền của giảng viên, nên đây là mức quá tay.']
  },

  annotations: [
    ['1', 'HAX G2 · làm rõ AI làm tốt tới đâu', 'Nhãn "Cần xem lại - chưa được giảng viên xác nhận" cạnh câu bị nghi sai, không dùng con số %.'],
    ['2', 'HAX G11 + PAIR Explainability', 'Thẻ trích §3.3 tô vàng câu sai, đặt cạnh bảng phản ví dụ để học viên tự kiểm.'],
    ['3', 'PAIR Errors + Graceful Failure', 'Thẻ trạng thái do hệ thống hiện sau khi chuyen_TA chạy xong, kèm giờ phản hồi thật.'],
    ['4', 'HAX G8 / G9 · bỏ qua và hỏi tiếp dễ', '"Em vẫn chưa hiểu vì sao" giảng thêm; "Bỏ qua" quay lại bài, Bài tập 3 không bị chặn.'],
    ['5', 'PAIR Feedback & Control · mức tự chủ', 'dang_FAQ: nháp chờ giảng viên duyệt (②) hoặc đã đăng, chỉ còn gỡ (③).'],
    ['6', 'Màn TA · người duyệt thấy đủ căn cứ', 'Mã mục, câu nghi sai, phản ví dụ, lý do, số học viên hỏi cùng chỗ.']
  ],
  annByLevel: { 1: ['1', '2', '3', '4', '6'], 2: ['1', '2', '3', '4', '5', '6'], 3: ['1', '2', '3', '4', '5', '6'] },
  annNotes: {
    1: 'Ở mức ① không có ⑤: AI không soạn nháp, giảng viên tự viết đính chính.',
    2: '',
    3: 'Ở mức ③ nhãn ① mất tác dụng: "chưa được xác nhận" nằm ngay cạnh một đính chính đã đăng cho cả lớp.',
    strict: 'Luật "tài liệu luôn đúng": không nhãn, không phản ví dụ, không chuyển TA. Không còn nguyên tắc nào đứng được.'
  }
};
