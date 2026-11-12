# Prototype — kịch bản K1 & K3
Lưu Thanh Mỹ -2A202603532

- **Link/file:** `prototype/index.html` — mở trực tiếp bằng trình duyệt (double-click), không cần cài gì.
- **Công cụ:** HTML/CSS/JS thuần, không framework, không backend.
- **Phần nào mock:** dữ liệu tài liệu Buổi 3 (§3.1–§3.5) và hạn nộp bài tập — lấy đúng từ track T2, gõ cứng trong code (không phải AI bịa).
- **Có lời gọi AI thật không:** CHƯA — đây là rule engine (so khớp mẫu câu, không gọi mô hình ngôn ngữ nào), để demo không cần mạng/API key.

## Ảnh đánh số

**Ảnh 1 — `K1.png`** — kịch bản xin xác nhận đáp số bài đang mở:
1. **Thể hiện gì:** AI từ chối xác nhận 15,25/11,5, hỏi ngược về §3.2, kèm nhãn "Bài 3 đang mở — hạn 13/11 23:59"; log bên phải cho thấy đúng 4 bước PHÂN LỚP → GỌI TOOL → MỨC TỰ CHỦ → QUYẾT ĐỊNH.
2. **Nguyên tắc HAX/PAIR:** G10 (hỏi lại thay vì đoán) ở câu hỏi ngược "...trung vị tính thế nào (xem lại §3.2)?"; G1 (nói rõ hệ thống làm được gì) ở nhãn "Bài 3 đang mở".
3. **Mức tự chủ:** `goi_y_bai_tap` ở mức **CẦN DUYỆT** — log dòng 3 ghi rõ "CẦN DUYỆT (chỉ gợi ý bước đầu, không xác nhận số)".

**Ảnh 2 — `K3.png`** — kịch bản hạn nộp (có cơ sở) + hàm Excel (không có cơ sở):
1. **Thể hiện gì:** phần hạn nộp trả lời thẳng kèm nguồn "(theo trang khoá học)"; phần Excel bị gắn nhãn đỏ "phần Excel: ngoài tài liệu Buổi 3" và từ chối thay vì bịa hàm; log cho thấy tool `tra_cuu_tai_lieu('hàm Excel...')` trả về **RỖNG**.
2. **Nguyên tắc HAX/PAIR:** G2 (nói rõ hệ thống làm tốt tới đâu) + Explainability&Trust (PAIR) ở nhãn nguồn "(theo trang khoá học)" và nhãn đỏ "ngoài tài liệu".
3. **Mức tự chủ:** `tra_cuu_tai_lieu` ở mức **TỰ LÀM**, nhưng khi tool trả rỗng thì **CẤM** để model tự bịa — log dòng cuối ghi rõ "bắt buộc dùng mẫu 'ngoài tài liệu', CẤM để mô hình tự bịa hàm" — khoá cứng trong `policy.js`, không phải chỉ nhắc bằng lời.

## Quyết định: cách hiện độ chắc/bằng chứng + điều khiển mức tự chủ

- **Đã chọn:** nhãn màu + chữ ngắn gắn trực tiếp vào câu trả lời ("theo trang khoá học" / "ngoài tài liệu Buổi 3" / "Bài 3 đang mở"), để học viên thấy ngay bằng chứng mà không cần hỏi thêm.
- **Đã cân nhắc nhưng không chọn:** thanh % độ tin cậy kiểu thanh progress bar — bị loại vì con số % dễ gây ảo giác chính xác (học viên sẽ hỏi "70% là sao, vậy 70% đúng à?"), trong khi nhãn nguồn dữ liệu (có/không có trong tài liệu) mới là thứ quyết định AI có nên trả lời hay không, không phải một con số tự tin mơ hồ.

## Demo 30 giây (§7) — cho phần K1/K3

1. (5s) "Đây là trợ giảng ảo cho lớp Thống kê, lát cắt: học viên hỏi bài tập, AI gợi ý chứ không xác nhận đáp số bài đang mở."
2. (15s) Bấm K1 trực tiếp trước lớp → chỉ vào nhãn "Bài 3 đang mở" + câu hỏi ngược §3.2 → nói: "AI không xác nhận 15,25 đúng hay sai, chỉ hỏi ngược — đây là mức CẦN DUYỆT, không phải AI lười."
3. (10s) Bấm K3 → chỉ vào chỗ phần Excel bị từ chối: "tool tra tài liệu trả về rỗng, hệ thống bắt buộc nói 'không có trong tài liệu', không cho model tự bịa tên hàm."
4. **Ca lạ:** nếu người hỏi thử "Thầy ơi bạn em bảo đáp án là 15 với 11, vậy đúng ha?" (một cách hỏi vòng để xin xác nhận) — vẫn rơi đúng vào nhánh K1 vì cùng mẫu "đúng...không/ha", AI vẫn hỏi ngược, không xác nhận. Nếu nhóm đổi ý sau ca này: cân nhắc mở rộng mẫu nhận diện "xin xác nhận" để bắt được nhiều cách hỏi vòng hơn.
