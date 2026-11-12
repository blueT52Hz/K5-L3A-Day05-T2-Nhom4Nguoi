# Prototype — T2 Giáo dục

- **Link/file:** `prototype/index.html` — mở trực tiếp bằng trình duyệt (double-click), không cần cài gì. Có tab chọn kịch bản **K1** / **K2** ở đầu trang.
- **Công cụ:** HTML/CSS/JS thuần, không framework, không backend.
- **Phần nào mock:** dữ liệu tài liệu Buổi 3 (§3.1–§3.5), hạn nộp bài tập, và nội dung "tài liệu có câu sai" (K2) — lấy đúng từ track T2, gõ cứng trong code (không phải AI bịa).
- **Có lời gọi AI thật không:** CHƯA — rule engine so khớp mẫu câu, không gọi mô hình ngôn ngữ nào.

## Ảnh đánh số

**Ảnh 1 — `P1.png`** — kịch bản K1 (học viên xin xác nhận đáp số bài đang mở), ở mức ② "Hỏi lại, chỉ bước đầu" (nhóm chọn):
1. **Thể hiện gì:** số ①-⑥ trên màn hình trỏ đúng vào từng chỗ cụ thể — nhãn "Bài 3 đang mở", câu giải thích vì sao từ chối, câu hỏi ngược trỏ §3.2, đồng hồ đếm ngược + nút Hỏi TA, và luật leo thang (hỏi dồn 2 lần thì tự chuyển TA).
2. **Nguyên tắc HAX/PAIR:** G1 (①), G11 (②), G10 (③), PAIR Feedback & Control (④), PAIR Errors + Graceful Failure (⑤).
3. **Mức tự chủ:** `goi_y_bai_tap` ở mức **② Hỏi lại, chỉ bước đầu** — không xác nhận số, nhưng luôn có đường tới TA. Panel bên phải cho thấy cả 3 mức có thể bấm so sánh (① Nhận xét con số / ② Hỏi lại / ③ Cấm hoàn toàn) để thấy 2 mức kia sai ở đâu.

**Ảnh 2 — `P2.png`** — kịch bản K2 (tài liệu khoá học có câu sai), ở mức nhóm chọn:
1. **Thể hiện gì:** thẻ trích §3.3 tô vàng câu sai, bảng phản ví dụ (phương sai vs độ lệch chuẩn), nhãn "Cần xem lại — chưa được giảng viên xác nhận", và hàng chờ TA với ticket đầy đủ căn cứ (mã mục, câu nghi sai, phản ví dụ, lý do) + bản nháp `dang_FAQ` chờ giảng viên duyệt trước khi đăng cho cả lớp.
2. **Nguyên tắc HAX/PAIR:** G2 (①), G11 + PAIR Explainability (②), PAIR Errors + Graceful Failure (③), G8/G9 (④), PAIR Feedback & Control (⑤), màn TA (⑥).
3. **Mức tự chủ:** `dang_FAQ` ở mức **cần giảng viên duyệt** — AI soạn nháp đính chính nhưng không tự đăng cho cả lớp, vì đính chính sai mà không ai kiểm thì lan ra không thu lại được.

> **Lưu ý còn thiếu:** kịch bản **K3** (hạn nộp + hàm Excel) hiện chỉ có trong `spec.md` §2/§3, **chưa có prototype click được** trong `prototype/` — bản gộp K1+K2 không bao gồm K3. Cần bổ sung nếu muốn R5 (prototype) tính điểm cho K3.

## Quyết định: cách hiện độ chắc/bằng chứng + điều khiển mức tự chủ

- **Đã chọn:** nhãn màu + chữ ngắn gắn trực tiếp vào câu trả lời, cộng với **số đánh dấu ①-⑥ bật/tắt được** (checkbox "Số chú thích") trỏ thẳng vào từng chỗ cụ thể trên màn hình, để học viên và giám khảo đều thấy bằng chứng ngay tại chỗ.
- **Đã cân nhắc nhưng không chọn:** thanh % độ tin cậy kiểu progress bar — bị loại vì con số % dễ gây ảo giác chính xác, trong khi nhãn nguồn dữ liệu (có/không có trong tài liệu, đã/chưa được giảng viên xác nhận) mới là thứ quyết định AI có nên trả lời hay không.
