# TASKS — Bảng lương & Phép Joy

**Quy ước:** chỉ tick `[x]` khi đã có test/kiểm tra giao diện thực tế. Mỗi đợt tối đa **2 task**; xong đợt phải cập nhật `plan.md`, `context.md`, chạy test và backup trước khi chuyển đợt.

## Đợt 0 — Tài liệu và an toàn dữ liệu
- [x] Tổng hợp lỗi/đề xuất lương, KPI, phép, lớp và chấm công vào `plan.md`/`context.md`/`README.md`.
- [x] Sửa README có conflict marker trên GitHub và kiểm lại sau push.
- [x] Kiểm tra syntax JS, quét conflict marker thật và `git diff --check`.
- [x] Tạo test Node độc lập: KPI, part-time, gói tháng, BHXH, mốc Chỉ BHXH và migration dữ liệu cũ.
- [x] Chốt chuẩn đang chờ `attendance-export-v4`: 3 sheet và Mã dòng; không nhận V3/12 cột cũ để tính tiền thật.

## Đợt 1 — Danh mục nhân sự và cách hiển thị tiền lương
- [x] Tách nền dữ liệu/hiển thị: tính theo bậc & lớp, đơn giá/buổi, gói lương/tháng; còn extra có lý do là việc sau.
- [ ] Khôi: gói 1.600.000đ/tháng, extra sửa được có ghi chú, BHXH = không. *(Đã xong gói tháng + không BHXH; còn form extra.)*
- [x] Vân Anh: gói tháng 9.200.000đ; part-time Trâm/Nhung hiển thị đơn giá/buổi, không nằm dưới cột “lương cố định”.
- [ ] Form chỉnh sửa nhân viên đầy đủ, không còn popup chỉ sửa tên.
- [x] Hồng Anh: chuyển Chỉ BHXH theo kỳ từ `2026-11`, không làm các kỳ trước thành Chỉ BHXH.

## Đợt 2 — Lớp và giáo viên phụ trách
- [ ] Nạp đủ 29 lớp nguồn; giữ ba lớp Kèm và không tạo trùng khi app đã có dữ liệu cũ.
- [ ] Mỗi lớp có dropdown Giáo viên phụ trách, cho chọn “Chưa phân công”, tự lưu sau đổi.
- [ ] Thêm trạng thái lớp Hoạt động/Ngưng hoạt động; lớp ngưng tô đỏ, không bị xóa/ẩn.
- [ ] Kiểm backup/restore vẫn giữ giáo viên, trạng thái, đơn giá lớp.

## Đợt 3 — Công thức KPI
- [x] Sửa KPI: ≥85=100%, 70–84=75%, 50–69=50%, <50=0% quỹ KPI.
- [x] Test ranh giới 49/50/69/70/84/85 và xác nhận 70% lương cứng không đổi.
- [ ] Cập nhật nhãn/hướng dẫn KPI trên màn hình nhập lương.

## Đợt 4 — Phép cộng dần và lịch sử phép
- [ ] Thay số phép mặc định 12 ngày bằng số dư 0 + số dư đầu kỳ do anh nhập.
- [ ] Nhóm A (Văn phòng/kiêm nhiệm): +1/tháng đủ, +0,5/quý đủ, trần 14/năm.
- [ ] Nhóm B (GV WFH): +0,5/tháng đủ, +0,25/quý đủ, trần 7/năm.
- [ ] Nhập ngày nghỉ/ngày làm theo lịch; chỉ từ nghỉ nửa tháng mới coi tháng không đủ.
- [ ] Nhật ký: cộng tháng, thưởng quý, điều chỉnh, đã dùng; chống cộng trùng.
- [ ] Test: Nhóm A đủ quý=3,5; Nhóm B đủ quý=1,75; thiếu nửa tháng không cộng/thưởng; trần năm; sửa tay số dư.

## Đợt 5 — Nhập chấm công V4 và duyệt ca
- [ ] Chờ/kiểm file `Cham_cong_tinh_luong_MM-YYYY.xlsx`, phiên bản `attendance-export-v4`, đủ 3 sheet `Tong hop GV` / `Chi tiet ca` / `Gio tuan`.
- [ ] Nút nhập file, xem trước và báo thiếu sheet/cột/Mã dòng/trùng; không làm mất dữ liệu đang có.
- [ ] Dùng Mã dòng để truy vết/chống trùng; chỉ ưu tiên Bản chốt, cảnh báo vàng Dữ liệu hiện tại hoặc Lịch hiện tại.
- [ ] Không tính công: hiện quota + Chờ quản lý kiểm tra, không tự cộng giờ/lương.
- [ ] Exception: giữ giờ kiểm 40/46, nhưng giờ đề xuất = 0 cho tới khi anh chọn Đã duyệt/Không duyệt.
- [ ] PH xin nghỉ không trừ phép/KPI; ảnh hưởng KPI chỉ hiển thị để anh quyết định, không tự đổi % KPI.
- [ ] Không tạo overtime từ Gio tuan; kiểm đầy đủ các ca thường, thiếu IN/OUT, Exception và nguồn/lịch cảnh báo.

## Đợt 6 — Chốt kỳ và phiếu lương
- [ ] Màn hình xem trước theo từng người, khóa/snapshot số liệu khi chốt kỳ.
- [ ] Xuất Excel tổng hợp + chi tiết, tổng phải khớp bảng tính.
- [ ] Xuất PDF từng người dùng nền `TEACHER SALARY SLIP`; giữ logo/nền, có lương cứng, KPI, lớp kèm, extra, BHXH, thực nhận.
- [ ] Đối chiếu phiếu Mr. Đức Anh 09/2026 và mẫu văn phòng trước khi phát hành.
- [ ] Test export, backup/restore, giao diện và dữ liệu tháng thử; anh duyệt trước khi dùng tiền thật.

## Các việc đã có từ phiên bản trước
- [x] Khung app HTML/JS, danh mục, kỳ lương, BHXH, backup/restore.
- [x] Công thức Full-time/Part-time cơ bản; chưa đạt quy tắc mới nên không dùng để chốt tiền thật.
- [x] Nội dung chuyển khoản BHXH cơ bản.
- [ ] Xuất Excel/PDF và tích hợp chấm công chưa hoàn thành.
