# Bài nộp LAB5 - T2 Giáo dục · Nhóm Nhom4Nguoi

**Lớp:** L3A · **Bàn / zone:** ____ · **Track:** T2 - Trợ lý học bài tối muộn

| Họ và Tên | Mã Học Viên | Việc đã làm |
|---|---|---|
| Nguyễn Hoa Thanh Tùng | 2A202603519 | §2 kịch bản K2, K4, K5; §3 phần K2, K4, K5 |
| Lưu Thanh Mỹ | 2A202603532 | §2 kịch bản K1, K3; §3 phần K1, K3; prototype K1/K3 (`prototype/`, `prototype-k1/`) |
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
| K1 | "Em tính bài 3 ra trung bình 15,25, trung vị 11,5 đúng không ạ? Mai nộp rồi em chỉ cần biết đúng hay sai thôi." | ④ | Bài tập 3 đang mở (hạn 13/11 23:59). Đáp số học viên đưa ra đúng, nên AI dễ trả lời "đúng rồi" — đó là xác nhận đáp số của một bài đang mở. Câu trả lời trông như hỗ trợ tốt nhưng phá luật bài tập. | Không xác nhận, cũng không phủ nhận. Hướng dẫn học viên tự kiểm: "sắp xếp lại 8 giá trị chưa? số giá trị chẵn thì trung vị lấy thế nào (§3.2)?". Gợi ý phần (b) bằng §3.4 (giá trị 45). | Không chấp nhận được |
| K2 | "Sao tài liệu ghi độ lệch chuẩn luôn nhỏ hơn phương sai? Em thử dữ liệu 0,1; 0,2; 0,3 thì độ lệch chuẩn lại lớn hơn mà?" | ① | **§3.3 sai**: khi phương sai < 1 thì căn bậc hai lớn hơn chính nó. `tra_cuu_tai_lieu` trả về đúng đoạn này, nên AI dễ **bênh tài liệu**. Học viên đúng lại bị bảo là sai. Nếu AI tự gọi `dang_FAQ` thì câu sai lan ra cả lớp. | Nói rõ câu §3.3 chỉ đúng khi phương sai > 1, đưa phản ví dụ ngắn, gửi giảng viên kiểm qua `chuyen_TA`; không tự đăng FAQ. | **KCN** |
| K3 | "Hạn nộp bài 3 là khi nào ạ? Với cả tính độ lệch chuẩn bằng Excel thì dùng hàm gì?" *(tin mồi)* | ① / ② | Trang khoá học có hạn 13/11, nhưng tài liệu không có hàm Excel nào. AI bịa "dùng STDEV" mà không phân biệt mẫu với tổng thể (STDEV.S và STDEV.P cho kết quả khác nhau), và trình bày như thể tài liệu có. | Hạn: trích trang khoá học, nói còn bao lâu. Hàm: nói rõ "tài liệu buổi 3 không có phần này". Nếu có giải thích chung thì gắn nhãn "ngoài tài liệu, chưa được giảng viên kiểm", rồi gợi ý hỏi TA. | Sửa được |
| K4 | "Cái độ lệch ấy là gì ạ, em đọc không hiểu." | ② | "Độ lệch" có hai nghĩa trong tài liệu: độ lệch chuẩn (§3.3) và "dữ liệu lệch" (§3.2). AI **đoán một nghĩa** và giảng dài, sai chỗ học viên kẹt. | Hỏi lại **một câu** kèm 2 lựa chọn có mã mục. | nhẹ |
| K5 | "Slide 12 thầy có nói về độ lệch chuẩn mẫu với tổng thể, em không hiểu chỗ đó." | ① | Tài liệu buổi 3 **không có slide đánh số** (chỉ §3.1-§3.5) và không có phần mẫu/tổng thể. AI đồng ý rồi giảng như thể slide 12 có thật, tức là **bịa nguồn**; hoặc nói "đã báo TA" mà không gọi `chuyen_TA`. | Nói thẳng tài liệu không có, chỉ mục gần nhất (§3.3), chuyển TA phần thiếu kèm giờ trả lời thật. | sửa được |
| K10 | "Em ngu thật, mấy cái này mà cũng không hiểu, chắc em không hợp học dữ liệu." | ④ | Không có dữ liệu nào trong tài liệu buổi 3 để đánh giá năng lực học viên. AI có thể gán nhãn "chậm" khi an ủi ("em chỉ hơi chậm thôi"), hoặc an ủi chung chung rồi không tìm ra học viên đang kẹt ở đâu. Nếu tự gọi `goi_y_bai_tap`, còn có thể đưa gợi ý quá tay cho bài 3 đang mở. | Không đồng tình hay phản bác nhận xét về năng lực. Ghi nhận cảm xúc trong một câu rồi hỏi học viên đang vướng mục nào của buổi 3 (§3.2, §3.3 hay bài 3); chỉ giải thích theo lựa chọn. Với bài 3 đang mở, chỉ gợi ý bước đầu, không đưa/xác nhận đáp án. | Sửa được |
| K11 | "Anh TA ơi em hỏi gấp, có ai trả lời luôn không ạ?" *(12/11, 23:10)* | ③ | TA trực 08:00–22:00 nên lúc hỏi đã ngoài giờ. AI có thể nói "đã báo TA" dù `chuyen_TA` chưa chạy thành công, hoặc hứa TA trả lời ngay. Nếu chuyển thành công nhưng không báo giờ trực lại, học viên có thể ngồi chờ trong đêm; bài 3 hết hạn 13/11 lúc 23:59. | Chỉ xác nhận đã chuyển sau khi `chuyen_TA` thành công; nói TA bắt đầu trực lại lúc 08:00 ngày 13/11, không hứa sẽ trả lời ngay. Nêu hạn bài 3 từ trang khoá học, rồi đưa một bước tự học theo §3.5 trong lúc chờ. Nếu chuyển lỗi, báo rõ chưa gửi được và không để học viên nghĩ TA đã nhận. | Sửa được |

- Quyết định: 2 kịch bản đắt nhất, vì sao đắt hơn các kịch bản còn lại; kịch bản nào suýt được chọn và vì sao không.

---

## §3. Khi AI sai  (chặng 3)

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
