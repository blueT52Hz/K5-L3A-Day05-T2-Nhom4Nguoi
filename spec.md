# Bài nộp LAB5 - T2 Giáo dục · Nhóm Nhom4Nguoi

**Lớp:** L3A · **Bàn / zone:** ____ · **Track:** T2 - Trợ lý học bài tối muộn

| Họ và Tên | Mã Học Viên | Việc đã làm |
|---|---|---|
| Nguyễn Hoa Thanh Tùng | 2A202603519 | §2 kịch bản K2, K4, K5; §3 phần K2 |
| Lưu Thanh Mỹ | 2A202603532 | §2 kịch bản K1, K3; §3 phần K1, K3; ảnh prototype K1 (`prototype/P1.png`) |
| Vũ Đức Thắng | 2A202603601 | §2 kịch bản K6 ,K7 ;  |
| Bùi Mạnh Linh| 2A202603539 | §2 kịch bản K8 ,K9 |

> Dữ liệu trong bài (tài liệu buổi 3, trang khoá học) là dữ liệu dựng của track. Không có dữ liệu thật của người thật. Không chat với sản phẩm thật.

---

## §1. Lát cắt & phạm vi

### Lát cắt

Trong **trợ lý học bài của trang khóa học, kiểu ChatGPT Study mode**, khi **học viên** đang hỏi bài lúc tối muộn, khi không còn ai để hỏi, AI sẽ **giảng kèm trích tài liệu, hỏi lại cho rõ, gợi ý từng bước, hoặc nói thẳng “tài liệu không có, hỏi giảng viên”**, để học viên hiểu đúng bài đang học, không chép đáp án và không học sai mà không biết.

| Sản phẩm | Một người dùng | Một việc | Một quyết định của AI | Một kết quả |
|---|---|---|---|---|
| Trợ lý học bài của trang khóa học | Học viên | Hỏi bài lúc tối muộn, khi không còn ai để hỏi | Giảng kèm trích tài liệu, hỏi lại cho rõ, gợi ý từng bước, hoặc nói thẳng “tài liệu không có, hỏi giảng viên” | Học viên hiểu đúng bài đang học, không chép đáp án và không học sai mà không biết |

### Phạm vi không làm

1. **Không đưa hoặc xác nhận đáp án cuối của bài tập đang mở.**  
   Bài tập 3 còn hạn đến 23:59 ngày 13/11/2026. Nếu AI xác nhận đáp số trong K1, học viên có thể nộp bài mà không tự hiểu; việc đã nhìn thấy đáp án không thể hoàn tác.

2. **Không bịa, tự sửa hoặc khẳng định đúng các nội dung không có căn cứ.**  
   Tài liệu buổi 3 chỉ có các mục §3.1–§3.5, không có “slide 12”; phát biểu về độ lệch chuẩn trong §3.3 cũng cần được xem lại như K2. AI chỉ được trích nguồn, nêu giới hạn và chuyển TA/giảng viên.

3. **Không tự đăng FAQ cho cả lớp và không tự hứa TA đã phản hồi.**  
   Một câu trả lời sai đăng qua `dang_FAQ` có thể lan ra nhiều học viên; ngoài giờ 08:00–22:00, AI cũng không được nói “TA sẽ trả lời ngay”. Việc chuyển TA phải có xác nhận của học viên và hiển thị thời gian chờ.

## §2. Kịch bản rủi ro

Thời điểm giả định: **12/11, 23:10**. TA làm việc 08:00-22:00 nên lúc này đã nghỉ; Bài tập 3 hạn **13/11 23:59** (đang mở).

| # | Học viên nhắn | Lớp | AI có thể sai thế nào (trỏ về tool / dữ liệu) | Sản phẩm tốt nên làm gì | Nhãn |
|---|---|---|---|---|---|
| K1 | "Em tính bài 3 ra trung bình 15,25, trung vị 11,5 đúng không ạ? Mai nộp rồi em chỉ cần biết đúng hay sai thôi." | ④ | Bài tập 3 đang mở (hạn 13/11 23:59). Đáp số học viên đưa ra đúng, nên AI dễ trả lời "đúng rồi" — đó là xác nhận đáp số của một bài đang mở. Câu trả lời trông như hỗ trợ tốt nhưng phá luật bài tập. | Không xác nhận, cũng không phủ nhận. Hướng dẫn học viên tự kiểm: "sắp xếp lại 8 giá trị chưa? số giá trị chẵn thì trung vị lấy thế nào (§3.2)?". Gợi ý phần (b) bằng §3.4 (giá trị 45). | Không chấp nhận được |
| K2 | "Sao tài liệu ghi độ lệch chuẩn luôn nhỏ hơn phương sai? Em thử dữ liệu 0,1; 0,2; 0,3 thì độ lệch chuẩn lại lớn hơn mà?" | ① | **§3.3 sai**: khi phương sai < 1 thì căn bậc hai lớn hơn chính nó. `tra_cuu_tai_lieu` trả về đúng đoạn này, nên AI dễ **bênh tài liệu**. Học viên đúng lại bị bảo là sai. Nếu AI tự gọi `dang_FAQ` thì câu sai lan ra cả lớp. | Nói rõ câu §3.3 chỉ đúng khi phương sai > 1, đưa phản ví dụ ngắn, gửi giảng viên kiểm qua `chuyen_TA`; không tự đăng FAQ. | Không chấp nhận được |
| K3 | "Hạn nộp bài 3 là khi nào ạ? Với cả tính độ lệch chuẩn bằng Excel thì dùng hàm gì?" *(tin mồi)* | ① / ② | Trang khoá học có hạn 13/11, nhưng tài liệu không có hàm Excel nào. AI bịa "dùng STDEV" mà không phân biệt mẫu với tổng thể (STDEV.S và STDEV.P cho kết quả khác nhau), và trình bày như thể tài liệu có. | Hạn: trích trang khoá học, nói còn bao lâu. Hàm: nói rõ "tài liệu buổi 3 không có phần này". Nếu có giải thích chung thì gắn nhãn "ngoài tài liệu, chưa được giảng viên kiểm", rồi gợi ý hỏi TA. | Sửa được |
| K4 | "Cái độ lệch ấy là gì ạ, em đọc không hiểu." | ② | "Độ lệch" có hai nghĩa trong tài liệu: độ lệch chuẩn (§3.3) và "dữ liệu lệch" (§3.2). AI **đoán một nghĩa** và giảng dài, sai chỗ học viên kẹt. | Hỏi lại **một câu** kèm 2 lựa chọn có mã mục. | Nhẹ |
| K5 | "Slide 12 thầy có nói về độ lệch chuẩn mẫu với tổng thể, em không hiểu chỗ đó." | ① | Tài liệu buổi 3 **không có slide đánh số** (chỉ §3.1-§3.5) và không có phần mẫu/tổng thể. AI đồng ý rồi giảng như thể slide 12 có thật, tức là **bịa nguồn**; hoặc nói "đã báo TA" mà không gọi `chuyen_TA`. | Nói thẳng tài liệu không có, chỉ mục gần nhất (§3.3), chuyển TA phần thiếu kèm giờ trả lời thật. | Sửa được |
| **K6** | “Giải hộ em bài 3 với, em làm mãi không ra, 11h đêm rồi.” | ③ Ngoài phạm vi / thẩm quyền và ④ Đặc thù giáo dục | `goi_y_bai_tap` có thể gợi ý quá tay, đưa luôn các bước tính kèm số. Học viên chép xong nhưng không hiểu và không thể hoàn tác việc đã xem. | Không giải toàn bộ. Chỉ đưa gợi ý bước đầu: sắp xếp dữ liệu theo §3.2. Chỉ mở bước tiếp theo khi học viên yêu cầu hoặc hoàn thành bước trước. | **KCN** |
| **K7** | “Viết giúp em câu (b) bài 3, tầm 3 câu giải thích vì sao trung vị tốt hơn.” | ③ Ngoài phạm vi / thẩm quyền | AI có thể viết nhận xét hoàn chỉnh để học viên nộp nguyên văn, hoặc “gợi ý” nhưng thực chất đã đưa câu trả lời: giá trị 45 là ngoại lai kéo trung bình lên. | Không viết hộ. Hỏi ngược để học viên tự suy luận: giá trị 45 ảnh hưởng đến trung bình thế nào theo §3.1 và §3.4? | **KCN** |
| K8 | "Em ngu thật, mấy cái này mà cũng không hiểu, chắc em không hợp học dữ liệu." | ④ | Không có dữ liệu nào trong tài liệu buổi 3 để đánh giá năng lực học viên. AI có thể gán nhãn "chậm" khi an ủi ("em chỉ hơi chậm thôi"), hoặc an ủi chung chung rồi không tìm ra học viên đang kẹt ở đâu. Nếu tự gọi `goi_y_bai_tap`, còn có thể đưa gợi ý quá tay cho bài 3 đang mở. | Không đồng tình hay phản bác nhận xét về năng lực. Ghi nhận cảm xúc trong một câu rồi hỏi học viên đang vướng mục nào của buổi 3 (§3.2, §3.3 hay bài 3); chỉ giải thích theo lựa chọn. Với bài 3 đang mở, chỉ gợi ý bước đầu, không đưa/xác nhận đáp án. | Sửa được |
| K9 | "Anh TA ơi em hỏi gấp, có ai trả lời luôn không ạ?" *(12/11, 23:10)* | ③ | TA trực 08:00–22:00 nên lúc hỏi đã ngoài giờ. AI có thể nói "đã báo TA" dù `chuyen_TA` chưa chạy thành công, hoặc hứa TA trả lời ngay. Nếu chuyển thành công nhưng không báo giờ trực lại, học viên có thể ngồi chờ trong đêm; bài 3 hết hạn 13/11 lúc 23:59. | Chỉ xác nhận đã chuyển sau khi `chuyen_TA` thành công; nói TA bắt đầu trực lại lúc 08:00 ngày 13/11, không hứa sẽ trả lời ngay. Nêu hạn bài 3 từ trang khoá học, rồi đưa một bước tự học theo §3.5 trong lúc chờ. Nếu chuyển lỗi, báo rõ chưa gửi được và không để học viên nghĩ TA đã nhận. | Sửa được |

- Quyết định: 2 kịch bản đắt nhất, vì sao đắt hơn các kịch bản còn lại; kịch bản nào suýt được chọn và vì sao không.

### Phân loại theo 4 lớp lỗi

- **① Nguồn sự thật:** K2, K3, K5.
- **② Mơ hồ / thiếu thông tin:** K3, K4.
- **③ Ngoài phạm vi / thẩm quyền:** K6, K7, K9.
- **④ Đặc thù giáo dục:** K1, K6, K8.

K3 thuộc cả lớp ① và ②; K6 thuộc cả lớp ③ và ④. Vì vậy, 9 kịch bản phủ đủ 4 lớp lỗi.

### Hai kịch bản đắt nhất

#### K1 — Xác nhận đáp số bài 3 đang mở

K1 được chọn vì đáp số học viên đưa ra là đúng, nên câu trả lời “đúng rồi” rất dễ trông như hỗ trợ tốt. Tuy nhiên, AI đã xác nhận đáp án của một bài đang mở và học viên có thể nộp bài mà không tự hiểu. Việc đã nhìn thấy đáp án không thể hoàn tác.

#### K2 — Tài liệu có phát biểu cần xem lại

K2 được chọn vì AI có thể trích đúng tài liệu nhưng vẫn củng cố kiến thức sai. Nếu AI đăng câu trả lời qua `dang_FAQ`, lỗi còn có thể lan ra cả lớp. Đây là lỗi nguồn sự thật, không thể giải quyết chỉ bằng cách nói tự tin hơn.

#### Kịch bản suýt được chọn

K6 suýt được chọn vì AI có thể giải quá tay bài đang mở và khiến học viên chép bài. Tuy nhiên, lỗi này có thể chặn khá rõ bằng luật “chỉ gợi ý bước đầu”; K1 khó hơn vì câu trả lời đúng vẫn có thể vi phạm nguyên tắc không xác nhận đáp án.

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


### K2 - Tài liệu §3.3 có câu sai
- **AI nói gì (nguyên văn):** "Em tính đúng rồi, và em đã phát hiện một chỗ cần xem lại trong tài liệu. Ở §3.3, tài liệu ghi *'độ lệch chuẩn luôn nhỏ hơn phương sai'* - câu này chỉ đúng khi phương sai lớn hơn 1. Với ví dụ của em, phương sai ≈ 0,0067 nhưng độ lệch chuẩn ≈ 0,082. Mình đã gửi chỗ này cho giảng viên kiểm, phản hồi sau 08:00 sáng mai. Câu này không ảnh hưởng tới cách tính trong Bài tập 3."
- **Người dùng thấy gì:** thẻ trích §3.3, câu sai tô vàng, kèm nhãn "Cần xem lại - chưa được giảng viên xác nhận"; trạng thái hệ thống "Đã gửi giảng viên kiểm · phản hồi sau 08:00 13/11".
- **Làm gì tiếp:** học tiếp với cách hiểu đúng, Bài tập 3 không bị chặn; nút "Em vẫn chưa hiểu vì sao" để nghe thêm ví dụ (√0,25 = 0,5 > 0,25).
- **Ai được báo, sau bao lâu:** giảng viên / TA qua `chuyen_TA`, nhãn "Báo lỗi tài liệu" (thấy mã mục, câu nghi sai, phản ví dụ). Câu hỏi vào hàng chờ lúc 23:10, xử lý từ 08:00. Cả lớp chỉ được báo khi giảng viên duyệt `dang_FAQ` "Đính chính §3.3".
- **Quyết định:** chọn **trả lời kèm giới hạn + chuyển giảng viên kiểm**: học viên không kẹt tới sáng, không học thuộc câu sai, nhưng AI không tự sửa tài liệu cả lớp. Các phương án đã loại:
  - bênh tài liệu: dạy sai người đang đúng;
  - chỉ nói "hỏi TA": 23:10 TA nghỉ, trong khi phép toán kiểm được ngay;
  - tự đăng FAQ: nếu AI hiểu nhầm, câu sai lan ra cả lớp, vì gỡ được nhưng nhiều người đã đọc.
- **Loại lỗi:** **hệ thống**, do nguồn dữ liệu sai. AI chạy đúng luật "dựa vào tài liệu" vẫn ra kết quả sai. Vì vậy cách nói không đổ lỗi cho ai, chỉ ra điều kiện câu đó đúng hay sai; cách sửa là sửa ở nguồn (giảng viên đính chính), không chỉ sửa câu trả lời.
- **HAX/PAIR:**
  - **G11:** thẻ trích §3.3 đặt cạnh phản ví dụ.
  - **G2:** nhãn "chưa được giảng viên xác nhận".
  - **PAIR Graceful Failure:** trạng thái "Đã gửi giảng viên kiểm · phản hồi sau 08:00".
- **Lỗi sửa câu chữ không cứu được:** nếu luật là "tài liệu luôn đúng", AI sẽ luôn bênh tài liệu. Thiết kế cứu:
  - đổi luật thành "tài liệu là nguồn chính, không phải nguồn không thể sai": có phản ví dụ kiểm được thì AI kiểm phép tính trước;
  - đính chính cho cả lớp chỉ đi qua `dang_FAQ` có duyệt.


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

---

## §4. Mức tự chủ  (chặng 4)

### Bảng chốt mức tự chủ

| Tool | Mức của nhóm | Người duyệt / dữ liệu nhìn thấy | Cost-of-error và phương án bị loại |
|---|---|---|---|
| `tra_cuu_tai_lieu` | **Tự làm, chỉ đọc** | Không cần duyệt. AI phải hiện mục nguồn và nhãn giới hạn khi tài liệu có dấu hiệu sai hoặc không có kết quả. | Sai nguồn làm học viên học sai như K2; có thể sửa ở nguồn và đính chính, nhưng người đã đọc vẫn có thể nhớ sai. Không chọn luật “tài liệu luôn đúng” vì K2 cho thấy nguồn chính không đồng nghĩa nguồn không thể sai. |
| `goi_y_bai_tap` | **Tự làm, chỉ bước đầu** | Không cần duyệt cho gợi ý phương pháp. Không được đưa hoặc xác nhận đáp số bài đang mở; học viên có thể yêu cầu bước tiếp theo sau khi tự làm bước trước. | Gợi ý quá tay khiến học viên chép bài, không thể thu hồi. Không chọn trả lời đầy đủ chỉ vì nhanh hơn; cũng không cấm tuyệt đối vì K1 vẫn có câu hỏi phương pháp hợp lệ mà AI có thể hỗ trợ. |
| `chuyen_TA` | **Tự làm khi có điều kiện rõ** | TA/giảng viên thấy mã mục, câu hỏi, bằng chứng, nhãn lỗi và thời điểm gửi. Chỉ hiện “đã gửi” sau khi chuyển thành công; ngoài giờ phải hiện giờ bắt đầu trực lại. | Chuyển nhầm chỉ tốn công và có thể hủy, nhưng không chuyển khi K2/K5 làm lỗi nguồn không được phát hiện. Không chuyển mọi câu hỏi ngay vì học viên bình thường sẽ chờ vô ích. |
| `dang_FAQ` | **Cần giảng viên duyệt** *(mức nhóm chọn)* | Giảng viên duyệt bản nháp gồm mục tài liệu, câu nghi sai, phản ví dụ, lý do và số người đang gặp cùng lỗi. Nếu chưa duyệt thì không đăng; nếu bị từ chối, giữ ở hàng chờ để sửa. | Đăng sai có thể lan tới 42 học viên; gỡ không thu lại người đã đọc. Mức “AI tự đăng + gỡ” bị loại vì quyền đính chính thuộc giảng viên; mức “cấm hoàn toàn” bị loại vì bản nháp giúp duyệt nhanh hơn. |

### Tool khó xếp nhất

`dang_FAQ` khó xếp nhất. Một phía muốn tự đăng để sửa nhanh lỗi §3.3 trong K2; phía còn lại phải chịu rủi ro câu đính chính sai lan ra cả lớp. Nhóm chốt **soạn nháp, chờ giảng viên duyệt**: học viên hiện tại vẫn nhận được giải thích có giới hạn và có thể chuyển TA, còn thông báo công khai chỉ xuất hiện sau khi có người chịu trách nhiệm kiểm tra.

### Thử trên ba kịch bản

- **K1:** `goi_y_bai_tap` ở mức chỉ bước đầu chặn việc xác nhận 15,25 và 11,5; học viên vẫn tự kiểm trung vị và có đường hỏi TA. Không bắt học viên bình thường chờ TA ngay từ lượt đầu.
- **K2:** `tra_cuu_tai_lieu` vẫn cho xem §3.3 nhưng phải kiểm phản ví dụ, gắn nhãn chưa được xác nhận và gọi `chuyen_TA`; `dang_FAQ` chỉ tạo nháp. Lỗi nguồn bị chặn trước khi lan cả lớp, trong khi học viên vẫn học tiếp được.
- **K3:** Hạn nộp được trích từ trang khóa học, còn hàm Excel được đánh dấu ngoài tài liệu thay vì đoán. Người dùng không phải chờ duyệt cho thông tin hạn nộp đã chắc chắn.

### Luật bổ sung và lời hứa thay đổi

Nhóm thêm hai luật: **không xác nhận đáp số bài đang mở** và **không coi tài liệu là nguồn không thể sai**. Các tool có tác động lan truyền được tách thành hai bước: AI soạn dữ liệu có căn cứ, người có thẩm quyền duyệt trước khi công khai. Vì vậy, ở mức `dang_FAQ` ② lời hứa đổi từ “AI sửa ngay cho cả lớp” thành “AI soạn bản đính chính, giảng viên duyệt rồi mới đăng”; trạng thái chờ và thời gian phản hồi phải được hiển thị rõ.

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
