# Bài nộp LAB5 - T2 Giáo dục · Nhóm Nhom4Nguoi

**Lớp:** L3A · **Bàn / zone:** ____ · **Track:** T2 - Trợ lý học bài tối muộn

| Họ và Tên | Mã Học Viên | Việc đã làm |
|---|---|---|
| Nguyễn Hoa Thanh Tùng | 2A202603519 | §2 kịch bản K2, K4, K5; §3 phần K2, K4, K5 |
| _(thành viên)_ | _(mã)_ | _(nhóm điền)_ |
| _(thành viên)_ | _(mã)_ | _(nhóm điền)_ |

> Dữ liệu trong bài (tài liệu buổi 3, trang khoá học) là dữ liệu dựng của track. Không có dữ liệu thật của người thật. Không chat với sản phẩm thật.

---

## §1. Lát cắt & phạm vi

- Lát cắt (chép từ track).
- 3 việc tính năng KHÔNG làm, mỗi việc một câu vì sao.

---

## §2. Kịch bản rủi ro

Thời điểm giả định: **12/11, 23:10**. TA làm việc 08:00-22:00 nên lúc này đã nghỉ; Bài tập 3 hạn **13/11 23:59** (đang mở).

Nhãn: **nhẹ** (học viên tự thấy, tự sửa) · **sửa được** (tốn công, có người gỡ) · **KCN** = không chấp nhận được (học sai âm thầm hoặc lan ra cả lớp).

| # | Học viên nhắn | Lớp | AI có thể sai thế nào (trỏ về tool / dữ liệu) | Sản phẩm tốt nên làm gì | Nhãn |
|---|---|---|---|---|---|
| K2 | "Sao tài liệu ghi độ lệch chuẩn luôn nhỏ hơn phương sai? Em thử dữ liệu 0,1; 0,2; 0,3 thì độ lệch chuẩn lại lớn hơn mà?" | ① | **§3.3 sai**: khi phương sai < 1 thì căn bậc hai lớn hơn chính nó. `tra_cuu_tai_lieu` trả về đúng đoạn này, nên AI dễ **bênh tài liệu**. Học viên đúng lại bị bảo là sai. Nếu AI tự gọi `dang_FAQ` thì câu sai lan ra cả lớp. | Nói rõ câu §3.3 chỉ đúng khi phương sai > 1, đưa phản ví dụ ngắn, gửi giảng viên kiểm qua `chuyen_TA`; không tự đăng FAQ. | **KCN** |
| K4 | "Cái độ lệch ấy là gì ạ, em đọc không hiểu." | ② | "Độ lệch" có hai nghĩa trong tài liệu: độ lệch chuẩn (§3.3) và "dữ liệu lệch" (§3.2). AI **đoán một nghĩa** và giảng dài, sai chỗ học viên kẹt. | Hỏi lại **một câu** kèm 2 lựa chọn có mã mục. | nhẹ |
| K5 | "Slide 12 thầy có nói về độ lệch chuẩn mẫu với tổng thể, em không hiểu chỗ đó." | ① | Tài liệu buổi 3 **không có slide đánh số** (chỉ §3.1-§3.5) và không có phần mẫu/tổng thể. AI đồng ý rồi giảng như thể slide 12 có thật, tức là **bịa nguồn**; hoặc nói "đã báo TA" mà không gọi `chuyen_TA`. | Nói thẳng tài liệu không có, chỉ mục gần nhất (§3.3), chuyển TA phần thiếu kèm giờ trả lời thật. | sửa được |

- Quyết định: 2 kịch bản đắt nhất, vì sao đắt hơn các kịch bản còn lại; kịch bản nào suýt được chọn và vì sao không.

---

## §3. Khi AI sai

### K2 - Tài liệu của khoá có câu sai

**Căn cứ:** §3.3 viết "Vì là căn bậc hai, độ lệch chuẩn luôn nhỏ hơn phương sai". Câu này sai khi phương sai < 1. Ví dụ của học viên (chia cho n) cho phương sai ≈ 0,0067 và độ lệch chuẩn ≈ 0,082, tức độ lệch chuẩn lớn hơn.

**AI nói (nguyên văn):**

> Em tính đúng rồi, và em đã phát hiện một chỗ cần xem lại trong tài liệu.
>
> Ở **§3.3**, tài liệu ghi: *"Vì là căn bậc hai, độ lệch chuẩn luôn nhỏ hơn phương sai."* Câu này **chỉ đúng khi phương sai lớn hơn 1**. Khi phương sai nhỏ hơn 1, căn bậc hai lại lớn hơn - đúng như ví dụ của em: phương sai ≈ 0,0067, độ lệch chuẩn ≈ 0,082.
>
> Phần còn lại của §3.3 vẫn đúng: độ lệch chuẩn là căn bậc hai của phương sai và có cùng đơn vị với dữ liệu.
>
> Mình **đã gửi chỗ này cho giảng viên kiểm**. TA làm việc từ **08:00 sáng mai** nên em sẽ có phản hồi sau giờ đó. Trong lúc chờ, em cứ học theo cách hiểu đúng ở trên; câu này không ảnh hưởng tới cách tính trong Bài tập 3.

**Học viên thấy gì:**

- Thẻ trích **§3.3**, câu sai tô vàng, nhãn **"Cần xem lại - chưa được giảng viên xác nhận"**.
- Bảng phản ví dụ: phương sai so với độ lệch chuẩn.
- Trạng thái hệ thống **"Đã gửi giảng viên kiểm · phản hồi sau 08:00 13/11"**.
- Nút **[Xem câu hỏi đã gửi]** · **[Em vẫn chưa hiểu vì sao]** · **[Bỏ qua, quay lại bài]**.

**Làm gì tiếp:**

- Học tiếp với cách hiểu đúng; Bài tập 3 không bị chặn.
- Bấm "Em vẫn chưa hiểu vì sao" thì AI giảng thêm bằng ví dụ √0,25 = 0,5 > 0,25.
- Sáng 13/11, khi giảng viên xác nhận, học viên nhận thông báo trong khung chat.

**Ai được báo, sau bao lâu:**

- **Giảng viên / TA**, qua `chuyen_TA` với nhãn **"Báo lỗi tài liệu"**. Họ thấy: mã mục, câu bị nghi sai, phản ví dụ, lý do, số học viên đã hỏi cùng chỗ.
- **Khi nào:** vào hàng chờ lúc 23:10, xử lý từ 08:00.
- **Cả lớp:** chỉ được báo khi giảng viên duyệt bài `dang_FAQ` "Đính chính §3.3".

**Quyết định:**

| Phương án | Chọn? | Vì sao |
|---|---|---|
| **Trả lời kèm giới hạn** + chuyển giảng viên kiểm | ✅ | Học viên không kẹt tới sáng, không học thuộc câu sai; nhưng AI không tự cho mình quyền sửa tài liệu cả lớp. |
| Bênh tài liệu ("theo §3.3 thì luôn nhỏ hơn") | ❌ | Dạy sai một học viên đã đúng; vi phạm rubric riêng #6 (không khẳng định tài liệu đúng khi chưa kiểm). |
| Dừng, chỉ nói "hỏi TA nhé" | ❌ | 23:10 TA nghỉ; học viên dễ tự kết luận mình sai. Toán học kiểm được ngay, không cần chờ người. |
| Tự đăng FAQ đính chính cho cả lớp | ❌ | Nếu AI hiểu nhầm, câu sai lan rộng; gỡ được nhưng nhiều người đã đọc. Đính chính là quyền của giảng viên. |

**Loại lỗi:**

- **Lỗi hệ thống, do nguồn dữ liệu sai.** AI chạy đúng luật "dựa vào tài liệu" vẫn ra kết quả sai.
- **Cách nói:** không đổ lỗi, nói "chỗ cần xem lại" kèm điều kiện đúng/sai.
- **Cách sửa:** sửa ở nguồn (giảng viên đính chính), không chỉ sửa câu trả lời.

**Nguyên tắc HAX/PAIR:**

- **G11 - Giải thích vì sao:** thẻ trích §3.3 đặt cạnh bảng phản ví dụ.
- **G2 - Làm rõ làm tốt đến đâu:** nhãn "Cần xem lại - chưa được giảng viên xác nhận".
- **PAIR Errors + Graceful Failure:** trạng thái "Đã gửi giảng viên kiểm · phản hồi sau 08:00".

**Lỗi mà sửa câu chữ không cứu được:** nếu luật là "tài liệu luôn đúng", AI sẽ luôn bênh tài liệu. Thiết kế cứu:

1. Đổi luật: tài liệu là *nguồn chính*, không phải *nguồn không thể sai*. Có phản ví dụ kiểm được thì AI kiểm phép tính trước.
2. Thêm kênh "Báo lỗi tài liệu" trong `chuyen_TA`, gom câu hỏi trùng mục.
3. Đính chính cho cả lớp chỉ đi qua `dang_FAQ` có duyệt.

### K4 - Tin nhắn mơ hồ (đường low-confidence)

**AI nói (nguyên văn):**

> Trong tài liệu buổi 3 có hai chỗ dùng chữ "lệch", em đang hỏi chỗ nào?
> **[Độ lệch chuẩn - §3.3]** mức dữ liệu phân tán quanh trung bình
> **[Dữ liệu lệch - §3.2]** như thu nhập, giá nhà: vài giá trị rất lớn kéo lệch về một phía

- **Học viên thấy:** 2 nút có mã mục, và link "Không phải hai chỗ này".
- **Làm gì tiếp:** bấm một nút. AI giảng kèm trích mục, ví dụ bằng dữ liệu Bài tập 3, rồi hỏi ngược để kiểm tra hiểu.
- **Ai được báo:** không ai, vì đây là lỗi nhẹ, tự sửa trong một lượt.

**Quyết định:**

| Phương án | Chọn? | Vì sao |
|---|---|---|
| **Hỏi lại một câu, có 2 lựa chọn kèm mã mục** | ✅ | Một lần bấm rẻ hơn đọc một đoạn giảng sai chỗ; mã mục giúp học viên nhận ra chữ mình kẹt. |
| Đoán nghĩa phổ biến nhất rồi giảng | ❌ | Sai chỗ thì học viên vẫn kẹt và thấy mình kém. |
| Giảng cả hai nghĩa | ❌ | Quá dài lúc 23:10. |
| Hỏi câu mở "em đọc đoạn nào?" | ❌ | Đẩy việc về người đang kẹt. |

- **Loại lỗi:** ngữ cảnh / đầu vào mơ hồ. Nói "tài liệu có hai chỗ dùng chữ này", không nói "câu hỏi của em chưa rõ".
- **HAX:** **G10** (hỏi đúng một câu, không đoán) · **G9** (link "Không phải hai chỗ này").

### K5 - Nguồn không có (đường failure / không căn cứ)

**AI nói (nguyên văn):**

> Tài liệu buổi 3 mình có **không đánh số slide** - chỉ có các mục §3.1 đến §3.5 - và **không có phần phân biệt độ lệch chuẩn mẫu với tổng thể**. Có thể thầy nói phần này trên lớp, nên mình không chắc thầy giảng theo cách nào.
>
> Phần gần nhất trong tài liệu là **§3.3 Phương sai và độ lệch chuẩn**. Em muốn mình giải thích lại §3.3 trước không?
>
> Câu "mẫu hay tổng thể", mình **đã chuyển cho TA** kèm câu hỏi của em. TA làm việc từ **08:00 sáng mai**; Bài tập 3 hạn 23:59 mai nên em vẫn kịp hỏi lại trước khi nộp.

- **Học viên thấy:**
  - dòng "Không tìm thấy trong tài liệu buổi 3" kèm danh sách §3.1-§3.5;
  - thẻ "Gần nhất: §3.3" có nút **[Giải thích §3.3]**;
  - trạng thái hệ thống "Đã chuyển TA · phản hồi sau 08:00 13/11", có nút **[Huỷ chuyển]**.
- **Làm gì tiếp:** học §3.3 ngay tối nay; chờ TA trả lời phần mẫu/tổng thể; tự tìm ra rồi thì bấm "Huỷ chuyển".
- **Ai được báo:** TA, qua `chuyen_TA`, nhãn "Học viên nhắc nguồn không có trong tài liệu: slide 12". Vào hàng chờ 23:10, xử lý từ 08:00.

**Quyết định:**

| Phương án | Chọn? | Vì sao |
|---|---|---|
| **Nói thẳng "không có" + chỉ mục gần nhất + chuyển TA phần thiếu** | ✅ | Không bịa nguồn; học viên vẫn có thứ học được tối nay; phần thiếu căn cứ giao đúng người, kèm giờ thật. |
| Giảng như thể slide 12 có thật | ❌ | Bịa nguồn; có thể trái quy ước chia n hay n-1 của thầy, ảnh hưởng đáp số Bài tập 3. |
| Từ chối cụt "không có slide 12" | ❌ | Đúng nhưng vô dụng; học viên kẹt tới sáng. |
| Hỏi lại "slide 12 buổi nào?" | ❌ | Tài liệu vẫn không có slide; hỏi lại không tạo thêm căn cứ. |

- **Loại lỗi:** ngữ cảnh. Học viên có thể nhớ đúng, nhưng hệ thống không có nguồn. Nói "tài liệu mình có không có phần này", không nói "em nhớ nhầm".
- **HAX:** **G1** (nói rõ trợ lý chỉ đọc được §3.1-§3.5) · **G11** (thẻ "Gần nhất: §3.3") · **PAIR Graceful Failure** (trạng thái chuyển TA có "Huỷ chuyển").
- **Lỗi sửa câu chữ không cứu được:** AI nói "đã chuyển TA" mà không gọi `chuyen_TA`. Thiết kế cứu: câu này chỉ xuất hiện dưới dạng **thẻ trạng thái do hệ thống hiện ra** sau khi tool chạy thành công.

---

## §4. Mức tự chủ

Với mỗi tool:
- Mức của nhóm (tự làm / cần người duyệt / cấm). Nếu cần người duyệt: ai duyệt · người duyệt thấy gì · quá hạn thì sao.
- Lý do theo cost-of-error: sai thì ai chịu gì · đảo lại được không · chờ người thì mất gì.
- Phương án đã cân nhắc và vì sao loại.

Thêm:
- Tool khó xếp nhất: mỗi người từng chọn gì, cái giá của mỗi phía (trỏ về kịch bản ở §2), nhóm chốt thế nào.
- Thử mức đã đặt trên 2 kịch bản đắt nhất + 1 kịch bản bình thường: cái sai có bị chặn không? còn việc nào làm khi lẽ ra phải hỏi? người dùng bình thường có phải chờ vô ích không?
- Luật thêm hoặc tool tách bước (nếu có), và vì sao.
- Một mức tự chủ đã đổi lời hứa nào với người dùng.

---

## §5. Prototype

- Link hoặc file · công cụ · phần nào mock · có lời gọi AI thật không.
- 1-2 ảnh có đánh số; mỗi số: thể hiện gì · nguyên tắc HAX/PAIR nào · mức tự chủ nào.
- Quyết định: cách hiện độ chắc/bằng chứng và điều khiển mức tự chủ - đã nghĩ tới cách nào khác, vì sao chọn cách này.

---

## §6. Tốt là gì

- 3 tiêu chí Pass/Fail chấm được; thiết kế của nhóm đạt tiêu chí nào trên 2 kịch bản đắt nhất; lỗi còn lại.

---

## §7. Demo

- Ca lạ nhận được ở demo: prototype đã làm gì, và nhóm có đổi ý gì sau ca đó không.
