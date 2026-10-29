# Bảng lương & Phép — Trung tâm Anh văn Joy

Ứng dụng web nội bộ để quản lý danh mục nhân sự/lớp, tính lương, BHXH, phép và xuất phiếu lương.

- Repo: `Aliuliu001/bang_luong` (public, chỉ chứa mã nguồn và tài liệu)
- Thư mục làm việc: `/home/ubuntu/bang_luong`
- Dữ liệu thật chỉ lưu trên trình duyệt của anh và file backup JSON riêng — **không đưa dữ liệu lương, BHXH, bảng chấm công, PDF nguồn hay token lên GitHub**.

## Bắt đầu lại ở chat mới

Nhắn đúng câu này:

> Đọc `/home/ubuntu/bang_luong/README.md`, `context.md`, `plan.md` và `task.md`, rồi tiếp tục dự án bang_luong.

Thứ tự tài liệu:
- `README.md`: cách tiếp tục và nguyên tắc an toàn.
- `context.md`: các quyết định nghiệp vụ đã chốt — là nguồn thông tin mới nhất.
- `plan.md`: kế hoạch sửa tổng thể, theo từng đợt.
- `task.md`: checklist tiến độ; chỉ tick sau khi kiểm tra thực tế.

## Trạng thái hiện tại

- App khung đã có: danh mục nhân viên/lớp, tính lương cơ bản, BHXH, phép, backup/restore.
- **Chưa dùng để chốt tiền thật.** Các phần cần anh duyệt/chưa có file V4 được ghi rõ trong `plan.md`.
- Đã sửa nền tính lương: KPI `85/70/50`, Trâm/Nhung dùng đơn giá/buổi, Khôi/Vân Anh dùng gói tháng; Hồng Anh chỉ chuyển Chỉ BHXH từ kỳ `2026-11`.
- Chưa xong: extra có ghi chú, nạp đủ 29 lớp, sửa nhân sự đầy đủ, phép cộng dần, nhập V4, chốt kỳ, Excel/PDF.

## Chuẩn file chấm công đang chờ

Chỉ nhập file `Cham_cong_tinh_luong_MM-YYYY.xlsx` có **Phiên bản file `attendance-export-v4`** và đúng 3 sheet:

```text
Tong hop GV     — đối chiếu, không tính tiền trực tiếp
Chi tiet ca     — nguồn từng ca để duyệt trong Bảng lương
Gio tuan        — cảnh báo mốc 40/46 giờ, không tạo overtime
```

`Chi tiet ca` bắt buộc có **Mã dòng** ổn định do app Chấm công tạo. Bảng lương dùng mã này để chống nhập trùng và lưu duyệt Exception. Chưa được nhập file V3/12 cột cũ hoặc dùng dữ liệu mẫu để tính tiền thật.

## Kiểm tra trước khi thay đổi

```text
node tests/payroll-engine.test.js
node --check app.js
node --check payroll-engine.js
```

Kết quả test phải xanh trước khi đưa thay đổi lên GitHub.

## Nguyên tắc không được phá

1. App Bảng lương và Check IN/OUT là **hai app tách riêng**, chỉ truyền dữ liệu một chiều: Check IN/OUT xuất file → Bảng lương nhập file. Không ghi ngược sang app chấm công.
2. Không tự chốt số buổi hoặc tiền lương từ check-in. App chỉ đề xuất, anh phải duyệt từng ngoại lệ trước khi tính tiền.
3. Không xóa nhân sự/lớp đã có dữ liệu lịch sử. Lớp ngưng phải giữ lại, trạng thái `Ngưng hoạt động`, tô đỏ.
4. Chỉnh danh mục hiện tại không được thay đổi số liệu của kỳ lương đã chốt; kỳ chốt cần snapshot dữ liệu của chính kỳ đó.
5. Trước restore backup phải tự tạo bản backup hiện tại; trước xóa phải xác nhận rõ phạm vi.
6. Mọi thay đổi công thức phải có test ranh giới và test hồi quy; chỉ commit/push khi test xanh.

## Quy trình vận hành dự kiến

1. Bên Check IN/OUT xuất file V4 theo tháng.
2. Anh nhập file vào Bảng lương; app kiểm phiên bản, 3 sheet và Mã dòng trước, không ghi ngược app chấm công.
3. App hiển thị ca thường, Không tính công, Exception, KPI/phép và cảnh báo nguồn/lịch. Anh quyết định từng Exception; không có ca nào tự thành tiền.
4. Nhập KPI, extra, điều chỉnh, phép; xem trước toàn bộ.
5. Bấm tính lương, kiểm tổng, sau đó chốt kỳ.
6. Xuất Excel tổng hợp và PDF phiếu lương từng người theo background `TEACHER SALARY SLIP` đã cung cấp.
7. Tải backup JSON sau mỗi buổi làm việc và giữ riêng trong Drive.
