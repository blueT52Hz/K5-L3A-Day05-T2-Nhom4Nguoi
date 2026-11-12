# Dàn ý bài nộp *(spec.md — nộp trước 23:59 ngày lab của lớp)*

> Copy dàn ý này vào `spec.md` của nhóm. Đây **không** phải form để điền đủ ô: mỗi mục chỉ cần đủ **bằng chứng** và **lập luận** ghi bên dưới. Viết ngắn, gạch đầu dòng là được. Hướng dẫn từng chặng: `02-guide.md`. Cách chấm: `04-rubric.md`.
>
> **Một quyết định = bốn ý:** đã cân nhắc phương án nào · chọn phương án nào · vì sao · loại các phương án kia vì sao. Bằng chứng = lập luận trỏ về một chỗ cụ thể: tool nào, dòng dữ liệu nào của track, điều gì trong mục "Sản phẩm thật hôm nay", chỗ nào trên prototype (ảnh đánh số). Không chạy agent.

```markdown
# Bài nộp LAB5 — [Track] · Nhóm [tên]
[Danh sách thành viên và việc mỗi người làm — copy bảng từ README]

## §1. Lát cắt & phạm vi
- Lát cắt (chép từ track).
- 3 việc tính năng KHÔNG làm, mỗi việc một câu vì sao.

## §2. Kịch bản rủi ro  (chặng 2)
- ≥8 kịch bản, mỗi lớp ①②③④ ít nhất một; mỗi kịch bản: tin người dùng · lớp · AI có thể sai thế nào · sản phẩm tốt nên làm gì · nhãn (nhẹ / sửa được / không chấp nhận được).
- Bằng chứng: cột "AI có thể sai thế nào" trỏ về một tool hoặc một dòng dữ liệu của track (hoặc chỗ dữ liệu không có).
- Quyết định: 2 kịch bản đắt nhất — vì sao đắt hơn các kịch bản còn lại; kịch bản nào suýt được chọn và vì sao không.

| # | Tin người dùng | Lớp | AI có thể sai thế nào | Sản phẩm tốt nên làm gì | Nhãn |
|---|---|---|---|---|---|
| K1 | "Em tính bài 3 ra trung bình 15,25, trung vị 11,5 đúng không ạ? Mai nộp rồi em chỉ cần biết đúng hay sai thôi." | ④ | Bài tập 3 đang mở (hạn 13/11 23:59). Đáp số học viên đưa ra đúng, nên AI dễ trả lời "đúng rồi" — đó là xác nhận đáp số của một bài đang mở. Câu trả lời trông như hỗ trợ tốt nhưng phá luật bài tập. | Không xác nhận, cũng không phủ nhận. Hướng dẫn học viên tự kiểm: "sắp xếp lại 8 giá trị chưa? số giá trị chẵn thì trung vị lấy thế nào (§3.2)?". Gợi ý phần (b) bằng §3.4 (giá trị 45). | Không chấp nhận được |
| K3 | "Hạn nộp bài 3 là khi nào ạ? Với cả tính độ lệch chuẩn bằng Excel thì dùng hàm gì?" *(tin mồi)* | ① / ② | Trang khoá học có hạn 13/11, nhưng tài liệu không có hàm Excel nào. AI bịa "dùng STDEV" mà không phân biệt mẫu với tổng thể (STDEV.S và STDEV.P cho kết quả khác nhau), và trình bày như thể tài liệu có. | Hạn: trích trang khoá học, nói còn bao lâu. Hàm: nói rõ "tài liệu buổi 3 không có phần này". Nếu có giải thích chung thì gắn nhãn "ngoài tài liệu, chưa được giảng viên kiểm", rồi gợi ý hỏi TA. | Sửa được |

## §3. Khi AI sai  (chặng 3)
Với mỗi kịch bản đắt nhất:
- AI nói gì (nguyên văn) · người dùng thấy gì · làm gì tiếp · ai được báo, sau bao lâu.
- Quyết định: hỏi lại / trả lời kèm giới hạn / dừng và chuyển người — chọn cách nào, đã loại cách nào, vì sao.
- Loại lỗi (hệ thống / người dùng / ngữ cảnh) và vì sao cách nói, cách sửa đi theo loại đó.
- 2–3 nguyên tắc HAX/PAIR, mỗi cái trỏ vào một chỗ cụ thể (câu chữ hoặc chỗ trên màn hình).
- Lỗi nào sửa câu chữ không cứu được (nếu có), và thiết kế cứu nó thế nào.

### K1 — "Em tính bài 3 ra trung bình 15,25, trung vị 11,5 đúng không ạ?"
- **AI nói gì (nguyên văn):** "Mình không xác nhận đáp số bài đang mở được, nhưng mình trao đổi cách tính thôi nha. Với 8 giá trị đã sắp xếp, số thứ 4 và số thứ 5 là hai số ở giữa — khi số lượng giá trị là **chẵn**, trung vị tính thế nào (xem lại §3.2)? Phần (b) em thử đối chiếu thêm §3.4 (giá trị 45) xem có phải outlier không."
- **Người dùng thấy gì:** không có chữ "đúng"/"sai" nào gắn với số 15,25 hay 11,5; câu hỏi ngược trỏ đúng mục §3.2; một nhãn nhỏ "Bài 3 đang mở — hạn 13/11 23:59" hiện cạnh câu trả lời.
- **Làm gì tiếp:** tự sắp xếp lại và tính lại; nếu vẫn thấy cần xác nhận, có nút "Hỏi TA trực tiếp" (tool `chuyen_TA`).
- **Ai được báo, sau bao lâu:** không ai được báo ở lượt hỏi đầu (đây là một câu hỏi phương pháp hợp lệ, không phải vi phạm). Nếu học viên lặp lại ≥2 lần yêu cầu "chỉ cần biết đúng/sai", AI tự kích hoạt `chuyen_TA` — TA nhận ngay trong giờ trực (8:00–22:00).
- **Quyết định:** chọn **hỏi lại**. Loại "trả lời kèm giới hạn" vì bất kỳ câu nhận xét nào về số 15,25/11,5 cụ thể ("gần đúng rồi", "sai một chỗ") đều vô tình xác nhận một phần đáp số — đúng thứ luật bài tập cấm. Loại "dừng và chuyển người" ngay từ câu hỏi đầu vì đây chỉ là một câu hỏi phương pháp bình thường của một học viên — chuyển TA ngay sẽ làm TA ngập câu hỏi lặt vặt và học viên phải chờ vô ích cho một thứ AI tự xử lý được.
- **Loại lỗi:** lỗi **ngữ cảnh** — hệ thống hoạt động đúng như thiết kế (không xác nhận đáp số bài mở), nhưng đúng vào lúc học viên đang gấp (mai nộp), nên câu trả lời "đúng chuẩn" vẫn khiến họ thấy bị bỏ rơi. Sửa câu chữ không giải quyết được việc học viên thiếu thời gian — cần một đường thoát khác (xem bên dưới).
- **HAX/PAIR:**
  - **G10** (thu hẹp phạm vi khi không chắc, hỏi lại thay vì đoán) — ở chính câu hỏi ngược "khi số lượng giá trị là chẵn, trung vị tính thế nào".
  - **G11** (giải thích vì sao) — ở câu "mình không xác nhận đáp số bài đang mở được".
  - **G1** (nói rõ hệ thống làm được gì) — ở nhãn cố định "Bài 3 đang mở — hạn 13/11 23:59" hiển thị ngay đầu khung chat.
- **Lỗi sửa câu chữ không cứu được:** sự sốt ruột vì sắp hết giờ nộp bài. Thiết kế cứu: thêm đồng hồ đếm ngược hạn nộp + nút "TA đang trực — hỏi ngay" ngay cạnh câu trả lời, để học viên có một việc cụ thể để làm tiếp thay vì chỉ nhận một lời từ chối.

### K3 — "Hạn nộp bài 3 là khi nào ạ? Với cả tính độ lệch chuẩn bằng Excel thì dùng hàm gì?"
- **AI nói gì (nguyên văn):** "Hạn nộp Bài 3 là 23:59 ngày 13/11 (theo trang khoá học) — còn khoảng 1 ngày nữa. Về hàm Excel: tài liệu Buổi 3 (§3.1–§3.5) không có phần hướng dẫn Excel, nên mình không có cơ sở để nói hàm nào đúng với bài học này. Em có thể hỏi TA trong giờ trực hoặc đăng lên FAQ lớp để mọi người cùng xem."
- **Người dùng thấy gì:** phần hạn nộp có gắn nhãn nguồn "(theo trang khoá học)" + đồng hồ còn lại; phần Excel có nhãn riêng màu khác "ngoài tài liệu buổi 3" thay vì bị trộn chung giọng điệu chắc chắn với phần trên.
- **Làm gì tiếp:** bấm "Hỏi TA" (`chuyen_TA`) hoặc "Đăng FAQ" (`dang_FAQ`) cho câu hỏi Excel.
- **Ai được báo, sau bao lâu:** nếu bấm Hỏi TA, TA nhận ngay (trong giờ trực); nếu đăng FAQ, bài chờ duyệt trước khi hiện công khai cho cả lớp (không tự động public).
- **Quyết định:** **trả lời kèm giới hạn** cho phần hạn nộp (có dữ liệu chắc chắn, hỏi lại ở đây chỉ gây khó chịu) **+ dừng, không trả lời** phần Excel (không có cơ sở trong tài liệu). Loại "hỏi lại" cho phần hạn nộp vì dữ liệu đã rõ, hỏi ngược là vô nghĩa. Loại việc tự trả lời đại (ví dụ bịa STDEV) cho phần Excel vì tool tra tài liệu không trả về kết quả nào — trả lời vẫn là bịa, chỉ khác là bịa tự tin.
- **Loại lỗi:** lỗi **hệ thống** — nếu không thiết kế trước, khi tool tra cứu tài liệu không tìm thấy gì, mô hình ngôn ngữ sẽ tự "lấp khoảng trống" bằng kiến thức ngoài tài liệu và trình bày như sách giáo khoa. Đây là lỗi thiết kế retrieval, không phải học viên hỏi sai hay ngữ cảnh đặc biệt.
- **HAX/PAIR:**
  - **G2** (nói rõ hệ thống làm tốt tới đâu) — ở câu "tài liệu Buổi 3 không có phần hướng dẫn Excel, nên mình không có cơ sở".
  - **Explainability & Trust (PAIR)** — ở nhãn nguồn "(theo trang khoá học)" gắn cùng câu trả lời hạn nộp, cho học viên tự kiểm được.
  - **G11** (giải thích vì sao) — cùng câu từ chối phần Excel, nói rõ lý do là "không có trong tài liệu" chứ không phải "AI không biết".
- **Lỗi sửa câu chữ không cứu được:** nếu không có cơ chế bắt buộc trả lời mẫu "không có trong tài liệu" khi tool tra cứu rỗng, thì dù nhắc mô hình "đừng bịa" bằng prompt, nó vẫn có thể tự tin trả lời sai ở lần hỏi khác theo cách diễn đạt khác. Thiết kế cứu: khi `tra_cuu_tai_lieu` trả về rỗng, hệ thống **buộc** hiển thị khối "ngoài tài liệu buổi 3" cố định, không để mô hình tự sinh câu trả lời tự do cho phần đó.

## §4. Mức tự chủ  (chặng 4)
Với mỗi tool:
- Mức của nhóm (tự làm / cần người duyệt / cấm). Nếu cần người duyệt: ai duyệt · người duyệt thấy gì · quá hạn thì sao.
- Lý do theo cost-of-error: sai thì ai chịu gì · đảo lại được không · chờ người thì mất gì.
- Phương án đã cân nhắc và vì sao loại.
Thêm:
- Tool khó xếp nhất: mỗi người từng chọn gì, cái giá của mỗi phía (trỏ về kịch bản ở §2), nhóm chốt thế nào.
- Thử mức đã đặt trên 2 kịch bản đắt nhất + 1 kịch bản bình thường: cái sai có bị chặn không? còn việc nào làm khi lẽ ra phải hỏi? người dùng bình thường có phải chờ vô ích không?
- Luật thêm hoặc tool tách bước (nếu có), và vì sao.
- Một mức tự chủ đã đổi lời hứa nào với người dùng.

## §5. Prototype  (chặng 5)
- Link hoặc file · công cụ · phần nào mock · có lời gọi AI thật không.
- 1–2 ảnh có đánh số; mỗi số: thể hiện gì · nguyên tắc HAX/PAIR nào · mức tự chủ nào.
- Quyết định: cách hiện độ chắc/bằng chứng và điều khiển mức tự chủ — đã nghĩ tới cách nào khác, vì sao chọn cách này.

## §6. Tốt là gì  (chặng 6 — nhẹ, bỏ được nếu thiếu giờ)
- 3 tiêu chí Pass/Fail chấm được; thiết kế của nhóm đạt tiêu chí nào trên 2 kịch bản đắt nhất; lỗi còn lại.

## §7. Demo
- Ca lạ nhận được ở demo: prototype đã làm gì, và nhóm có đổi ý gì sau ca đó không.
```
