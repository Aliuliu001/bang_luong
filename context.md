# CONTEXT — Dự án Bảng lương & Phép Joy

**Bắt đầu chat mới:** đọc `README.md`, `context.md`, `plan.md`, `task.md` trong `/home/ubuntu/bang_luong` trước khi sửa bất kỳ code nào.

## Trạng thái kỹ thuật xác minh gần nhất

- Repo: `https://github.com/Aliuliu001/bang_luong`, nhánh `main`, GitHub Pages đã từng bật.
- App là HTML/CSS/JavaScript tĩnh, Alpine.js, dữ liệu nằm trong `localStorage` và backup JSON.
- Core: `app.js`, `payroll-engine.js`, `index.html`, `styles.css`.
- Tại thời điểm lập context: app chưa đủ điều kiện dùng lương thật; còn các lỗi nghiệp vụ/UI trong `plan.md`.
- `README.md` từng có conflict marker Git; đã thay bằng tài liệu sạch. Luôn chạy kiểm tra conflict trước commit.
- Không commit dữ liệu nhân sự/lương/BHXH thật, workbook, phiếu PDF, backup JSON hoặc token.

## Quy tắc lương đã chốt

### Full-time giáo viên
- Lương lớp chính = `bậc × 8 buổi × số lớp`.
- Tách 70% lương cứng và 30% quỹ KPI.
- KPI chỉ áp dụng cho giáo viên full-time:
  - ≥85%: 100% quỹ KPI.
  - 70–84%: 75% quỹ KPI.
  - 50–69%: 50% quỹ KPI.
  - <50%: 0% quỹ KPI.
- Mr. Ngọc và Ms. Uyên Vi mặc định KPI 100%, nhưng từng tháng vẫn sửa được.
- Chấm IN/OUT không tự làm giảm số lớp/lương full-time; dùng để tham khảo quản lý ca, KPI, phép.

### Part-time / gói tháng
- Giáo viên part-time = `số buổi đã duyệt × đơn giá/buổi`; không có KPI 70/30.
- Các số 150.000đ và 120.000đ của Trâm/Nhung là **đơn giá/buổi**, không phải “lương cố định”.
- Mr. Khôi: Content, **không BHXH**, gói lương **1.600.000đ/tháng**, có khoản extra cộng/trừ theo từng tháng, sửa được kèm ghi chú.
- Ms. Vân Anh: HCNS, gói lương 9.200.000đ/tháng.
- Lớp kèm: đơn giá mặc định 100.000đ/lớp/buổi, phải sửa được theo lớp/buổi khi cần.

### BHXH
- Khôi và Quỳnh không đóng BHXH.
- Ms. Hồng Anh: tháng 10 tính lương bình thường; từ tháng 11 nghỉ việc nhưng có BHXH tự nguyện 1.632.000đ.
- BHXH NLĐ thông thường: 10,5%; công ty: 21,5%.
- Anh Trương: khấu trừ NLĐ 535.500đ trên nền 5.100.000đ; lệnh BHXH riêng 1.504.500đ và có thể sửa.

## Danh mục nhân sự/lớp

- Có danh sách nguồn 10 nhân sự và **29 lớp**. App hiện mới khởi tạo 3 lớp Kèm — đây là lỗi thiếu dữ liệu cần sửa.
- Ba lớp Kèm: `Kem-Đức`, `Kem-Nguyen & Tuan Anh`, `Kem-Khoi`.
- Tất cả lớp anh đã gửi hiện đang hoạt động.
- Bảng Lớp phải có dropdown `Giáo viên phụ trách`, đổi được khi chuyển lớp.
- Lớp ngưng tương lai: không xóa/ẩn tự động, giữ lại và tô đỏ `Ngưng hoạt động` để anh kiểm.

## Phép — quy tắc chính thức

Phép được cộng dần theo thời gian làm đủ, không cấp sẵn đầu năm. Số đầu kỳ, phép đã dùng và điều chỉnh phải sửa được, có lý do/lịch sử.

### Nhóm A: Văn phòng / kiêm nhiệm văn phòng + giáo viên
Áp dụng Ms. Vân Anh, Mr. Ngọc, Ms. Uyên Vi.
- Làm đủ một tháng: +1 ngày.
- Đủ liên tục 3 tháng trong quý: cộng thêm +0,5 ngày.
- Một quý đủ: 3,5 ngày.
- Tối đa 14 ngày/năm nếu làm đủ 12 tháng.

### Nhóm B: Giáo viên WFH
- Làm đủ một tháng: +0,5 ngày.
- Đủ liên tục 3 tháng trong quý: cộng thêm +0,25 ngày.
- Một quý đủ: 1,75 ngày.
- Tối đa 7 ngày/năm nếu làm đủ 12 tháng.

### Điều kiện “làm đủ”
- Chỉ khi tổng thời gian nghỉ **từ nửa tháng trở lên** mới coi là tháng không làm đủ.
- Tháng không đủ: không cộng phần tháng và quý chứa tháng đó không nhận thưởng quý.
- Trước khi tích hợp chấm công đầy đủ: nhập tay số ngày nghỉ và số ngày làm theo lịch để app so sánh; không tự suy diễn.
- Mỗi lần cộng tự động cần khóa chống trùng theo `nhân viên + tháng/quý + loại cộng`.

## Liên thông Check IN/OUT → Bảng lương

Hai app tách riêng. Repo chấm công: `Aliuliu001/cham_cong_in-out_joy`.

### Chuẩn file đang chờ từ Check IN/OUT: attendance-export-v4

Chỉ nhận file `Cham_cong_tinh_luong_MM-YYYY.xlsx` khi `Phiên bản file = attendance-export-v4` và có đúng ba sheet: `Tong hop GV`, `Chi tiet ca`, `Gio tuan`.

- `Chi tiet ca` là nguồn chính; mỗi dòng có **Mã dòng** do hệ thống tạo, giữ ổn định khi xuất lại. Bảng lương dùng Mã dòng để chống nhập trùng và lưu quyết định Exception.
- `Tong hop GV` và `Gio tuan` chỉ để đối chiếu; không tự tạo tiền lương/overtime từ số tổng.
- Ca thường đủ IN+OUT: dùng giờ thực tế `OUT − IN` để đối chiếu.
- Thiếu một đầu: không tự tính công, kể cả bốn lần đầu năm; hiện ngày, ca, quota và `Chờ quản lý kiểm tra`. Từ lần thứ năm vẫn không tính công và phải đánh dấu ảnh hưởng KPI.
- Phụ huynh xin nghỉ là lớp không học, không phải GV nghỉ phép: không trừ phép, không giảm KPI; báo muộn chỉ là nhắc nhở.
- Exception đủ IN+OUT: cộng vào bảng kiểm 40/46 giờ, nhưng `Giờ đề xuất tính công = 0`, `Kết quả công = Chờ duyệt Exception`; không tự trả tiền/overtime.
- Quyết định `Đã duyệt`/`Không duyệt` Exception chỉ lưu trong Bảng lương, không ghi ngược repo Chấm công.
- Ưu tiên `Nguồn dữ liệu = Bản chốt`; `Dữ liệu hiện tại` phải cảnh báo vàng. `Lịch đối chiếu = Lịch hiện tại` cũng cảnh báo vàng vì lịch có thể đã đổi.

**Không dùng file v3 hoặc định dạng 12 cột cũ để nhập thật.** V4 đang chờ repo Check IN/OUT hoàn thiện và phải có file mẫu để kiểm end-to-end.

### Quy đổi ca → buổi part-time
Việc quy đổi chỉ bắt đầu sau khi nhận V4 mẫu và anh duyệt từng ngoại lệ. App không được tự trả tiền từ `Tong hop GV`, `Gio tuan`, ca thiếu IN/OUT hoặc Exception chưa duyệt.

## Phiếu lương PDF

- Background nguồn: file PowerPoint `02.2025 - Copy.pptx`, có nền `TEACHER SALARY SLIP` và logo `LEARN ENGLISH WITH JOY`.
- Giữ nguyên nền, chèn dữ liệu ở lớp phía trên, không che logo/trang trí.
- Xuất mỗi nhân sự một PDF; thông tin bao gồm kỳ lương, các hạng mục, 70% lương cứng, KPI, lớp kèm, extra/điều chỉnh, BHXH và thực nhận.
- File Mr. Đức Anh tháng 09/2026 là mẫu đối chiếu số liệu/bố cục; không đưa file này lên repo public.

## Cách làm bắt buộc

- Chưa code trước khi anh duyệt toàn bộ đợt trong `plan.md`.
- Mỗi đợt tối đa 2 task để dễ kiểm thử và phản hồi.
- Viết test đỏ trước mỗi thay đổi công thức/migration; sau đó test hồi quy, smoke test giao diện và kiểm backup/restore.
- Khi có thay đổi ngoài repo: kiểm tra đọc lại trước khi báo hoàn thành.
