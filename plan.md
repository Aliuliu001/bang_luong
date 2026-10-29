# Kế hoạch sửa tổng thể — Bảng lương & Phép Joy

> Mục tiêu: biến bản app khung hiện tại thành công cụ tính lương có kiểm soát, không tự trả tiền từ dữ liệu thiếu, đủ rõ để anh tự kiểm/chỉnh trước khi chốt.

## Phạm vi và nguyên tắc

- Repo: `/home/ubuntu/bang_luong`, HTML/CSS/JS tĩnh + Alpine.js, localStorage và JSON backup.
- Không sửa logic của repo Check IN/OUT trong đợt này. App đó chỉ xuất dữ liệu; app lương nhập/kiểm/duyệt rồi mới tính tiền.
- Không commit dữ liệu thật, file Excel/PDF gốc, ảnh phiếu lương hoặc backup lên repo public.
- Mỗi đợt tối đa hai task; test trước thay đổi công thức; sau đợt phải kiểm giao diện, backup/restore và cập nhật `task.md`.

## Lỗi và thiếu sót cần xử lý

1. Cột “Lương cố định” đang gộp sai: part-time hiển thị 150k/120k như lương tháng; full-time để 0 gây hiểu nhầm.
2. Khôi cần gói lương 1,6 triệu/tháng + extra sửa được, không BHXH.
3. Chỉ có 3 lớp Kèm trong app trong khi danh sách nguồn có 29 lớp; chưa đổi được giáo viên bằng dropdown; chưa có lớp ngưng tô đỏ.
4. KPI cũ còn ngưỡng 55–69=50%, dưới 55=25%; quy tắc mới là 50–69=50%, dưới 50=0%.
5. Phép đang khởi tạo sẵn 12 ngày, trái với chính sách cộng dần theo tháng/quý, trần theo nhóm và điều kiện nghỉ nửa tháng.
6. Part-time đang nhập số buổi tay, chưa nhập file Check IN/OUT, chưa có bước duyệt ngoại lệ.
7. Chưa có snapshot kỳ chốt, Excel/PDF phiếu lương; mẫu nền đã có là `TEACHER SALARY SLIP`.
8. Tài liệu README từng còn dấu conflict Git; phải quét lại trước khi code.

---

## Đợt 0 — Khóa dữ liệu và test nền

### Task 0.1: Kiểm tra source và tạo test harness
- Files: `app.js`, `payroll-engine.js`, `index.html`; tạo `tests/payroll-engine.test.js` nếu chưa có.
- Quét `<<<<<<<`, `=======`, `>>>>>>>`; chạy syntax check `node --check app.js` và `node --check payroll-engine.js`.
- Test module dùng `PayrollEngine`: KPI, part-time, gói tháng, BHXH không tham gia.
- Không thay localStorage thật khi test.

### Task 0.2: Schema version và migration dữ liệu cũ
- Bổ sung `settings.version`/migration theo version, không reset dữ liệu cũ.
- Migration phải chuyển trường cũ `fixedSalary` có ngữ cảnh thành `monthlyPackage` hoặc `ratePerSession`; những trường không xác định phải đánh dấu cần kiểm thay vì tự bịa số tiền.
- Test backup cũ → migration → backup mới → restore, kiểm không mất kỳ lương/lớp/nhân viên.

**Nghiệm thu:** toàn bộ test xanh; không còn conflict marker; backup cũ mở an toàn.

---

## Đợt 1 — Nhân sự và cách gọi các khoản lương

### Task 1.1: Chuẩn hóa cấu trúc dữ liệu trả lương
- `payroll-engine.js`: tính theo `ratePerSession` cho part-time; `monthlyPackage` cho Content/HCNS; full-time tính từ bậc/số lớp.
- `app.js`: Khôi: `monthlyPackage=1600000`, `bhxh=false`; Vân Anh: `monthlyPackage=9200000`; Trâm/Nhung: `ratePerSession=150000/120000`.
- Bổ sung danh sách `extras` theo tháng: mô tả, số tiền dương/âm, không dùng một ô số chung làm mất lý do.
- Test: Khôi 1,6 triệu + extra; part-time 3 buổi × đơn giá; không trừ BHXH cho Khôi.

### Task 1.2: Form và bảng nhân sự dễ hiểu
- `index.html`: thay cột “Lương cố định” bằng nhãn theo loại: `Tính theo bậc & lớp`, `Đơn giá/buổi`, hoặc `Gói lương/tháng`.
- `app.js`: thay popup sửa tên bằng form sửa toàn bộ trường cần thiết; giữ nút xóa có xác nhận.
- Trong kỳ lương: hiển thị extra/điều chỉnh có ghi chú; không lẫn với KPI.

**Nghiệm thu:** xem danh sách là phân biệt được full-time/part-time/gói tháng; tất cả số tiền đúng qua test.

---

## Đợt 2 — Danh mục 29 lớp và đổi giáo viên

### Task 2.1: Nạp danh mục và migration lớp
- Dùng danh sách 29 lớp nguồn đã kiểm tra; các lớp hiện đưa đều là Hoạt động.
- Migration không tạo trùng ba lớp Kèm đang có.
- Mỗi lớp có `teacherId`, `status`, `type`, `price`; trường hợp thiếu GV dùng `teacherId=null`/“Chưa phân công”.

### Task 2.2: Bảng lớp thao tác trực tiếp
- `index.html`: dropdown Giáo viên phụ trách lấy từ danh mục nhân sự; đổi xong tự lưu.
- Thêm trạng thái: Hoạt động/Ngưng hoạt động. Lớp ngưng giữ lịch sử và tô đỏ, không xóa/ẩn.
- Test đổi GV → reload → backup/restore vẫn đúng.

**Nghiệm thu:** thấy đủ lớp, đổi GV không cần nhập mã, lớp ngưng nhìn rõ bằng màu đỏ.

---

## Đợt 3 — KPI theo quy tắc mới

### Task 3.1: Test ranh giới trước
Viết test ranh giới `49=0`, `50=0.5`, `69=0.5`, `70=0.75`, `84=0.75`, `85=1`.

### Task 3.2: Áp dụng thống nhất engine và UI
- Sửa cả `PayrollEngine.getKPIMultiplier()` và bản logic trùng trong `app.js`, hoặc bỏ logic trùng để dùng một nguồn.
- Cập nhật hướng dẫn trên màn hình, tài liệu và kết quả lương.

**Nghiệm thu:** quỹ KPI đúng tại tất cả ranh giới; 70% lương cứng không đổi.

---

## Đợt 4 — Phép cộng dần, chỉnh tay và lịch sử

### Task 4.1: Sổ phép thay số dư có sẵn
- Không khởi tạo 12 ngày phép. Bắt đầu 0 hoặc số đầu kỳ do anh nhập.
- Thêm `leaveGroup`, `ledger` với loại: `opening`, `monthly-accrual`, `quarter-bonus`, `manual-adjustment`, `used`.
- Mọi dòng có tháng/ngày, số ngày, lý do, khóa idempotent nếu là tự cộng.

### Task 4.2: Công thức và UI chấm điều kiện
- Nhóm A: Vân Anh, Ngọc, Uyên Vi; đủ tháng +1, đủ quý liên tục +0,5, trần 14/năm.
- Nhóm B GV WFH: đủ tháng +0,5, đủ quý +0,25, trần 7/năm.
- Nhập `ngày nghỉ` và `ngày làm theo lịch`; chỉ nghỉ từ nửa tháng mới không đủ. Tháng không đủ không cộng và không nhận bonus quý.
- Test 3 tháng đủ A=3,5; B=1,75; nghỉ dưới nửa tháng vẫn đủ; nghỉ từ nửa tháng không đủ; bấm lại không cộng trùng; trần năm.

**Nghiệm thu:** nhìn được cách số phép hình thành, sửa tay có lý do và không cộng trùng.

---

## Đợt 5 — Import Check IN/OUT và duyệt buổi part-time

### Điều kiện đầu vào: attendance-export-v4
Chỉ bắt đầu khi nhận file `Cham_cong_tinh_luong_MM-YYYY.xlsx` có `Phiên bản file = attendance-export-v4` và đủ ba sheet đúng tên: `Tong hop GV`, `Chi tiet ca`, `Gio tuan`.

- `Chi tiet ca` là nguồn từng ca; phải có **Mã dòng** ổn định, Mã NV, ngày, loại/tên ca, giờ IN/OUT, giờ thực tế, kết quả công, lý do, KPI, phép, Exception, nguồn và lịch đối chiếu.
- `Tong hop GV`/`Gio tuan` chỉ đối chiếu; không tự trả tiền hay overtime từ số tổng.
- Không nhận/không dùng file v3 hoặc chuẩn 12 cột cũ để tính tiền thật.

### Task 5.1: Import, kiểm file và xem trước
- Kiểm đúng phiên bản, đủ ba sheet, cột bắt buộc, tháng và Mã dòng; sai thì chỉ báo lỗi, không ghi dữ liệu.
- Chống nhập trùng bằng `Mã dòng`, không dùng khóa ghép có thể gộp hai Exception.
- Ưu tiên `Nguồn dữ liệu = Bản chốt`; `Dữ liệu hiện tại` và `Lịch đối chiếu = Lịch hiện tại` phải cảnh báo vàng.
- Lưu nguyên dòng nguồn và trạng thái duyệt riêng bên Bảng lương; không ghi ngược Check IN/OUT.

### Task 5.2: Duyệt ca và đề xuất tiền
- Ca thường đủ IN+OUT: dùng `OUT − IN` để đối chiếu giờ.
- Thiếu IN/OUT: không tự tính công, kể cả bốn lần quên đầu; hiện quota + `Chờ quản lý kiểm tra`. Từ lần thứ năm phải gắn ảnh hưởng KPI nhưng không tự đổi % KPI.
- PH xin nghỉ: không trừ phép/KPI; báo muộn chỉ là nhắc nhở.
- Exception đủ IN+OUT: có giờ kiểm mốc 40/46, nhưng giờ đề xuất = 0 và `Chờ duyệt Exception`; anh chọn `Đã duyệt`/`Không duyệt` tại Bảng lương.
- Không tự trả overtime; mọi thay đổi thành tiền chỉ sau thao tác duyệt rõ ràng.

**Nghiệm thu:** không dòng Không tính công/Exception bị âm thầm bỏ; không ca thiếu nào tự thành tiền; quyết định Exception không ghi ngược app Chấm công.

---

## Đợt 6 — Chốt kỳ, Excel và PDF phiếu lương

### Task 6.1: Snapshot/chốt kỳ
- Khi chốt, lưu snapshot nhân sự, đơn giá, lớp, quyết định buổi, KPI/extras/BHXH trong chính tháng đó.
- Kỳ đã chốt không đổi theo danh mục hiện tại; muốn sửa phải thao tác Mở lại kỳ có cảnh báo.
- Tạo bảng xem trước tổng hợp trước khi chốt.

### Task 6.2: Xuất chứng từ
- Excel: Tổng hợp + chi tiết, số tổng phải khớp engine.
- PDF từng nhân sự dùng nền `TEACHER SALARY SLIP` từ mẫu PowerPoint; giữ logo/nền, chèn thông tin/hạng mục/số tiền rõ ràng.
- Đối chiếu phiếu Mr. Đức Anh tháng 09/2026 và mẫu văn phòng trước khi đưa anh sử dụng.
- Render/kiểm PDF trực quan: không che logo, không tràn bảng, tổng thực nhận đúng.

**Nghiệm thu cuối:** toàn bộ test, smoke test UI, backup/restore, export Excel/PDF xanh; anh duyệt số liệu tháng thử trước khi tính tiền thật.

## Cách triển khai và kiểm chứng

Mỗi task phải theo thứ tự: test đỏ → code tối thiểu → test xanh → kiểm giao diện → cập nhật tracker → commit. Sau mọi thay đổi external/GitHub, đọc lại commit/URL trước khi báo hoàn thành.
