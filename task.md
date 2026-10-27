# TASKS — Ứng dụng Tính lương & Phép Trung tâm Joy

Quy ước: chỉ đánh dấu DONE sau khi có kết quả kiểm tra thực tế. Chưa bắt đầu code; mọi mục bên dưới đang chờ duyệt kế hoạch và xác nhận nghiệp vụ.

## 0. Chuẩn bị & rà soát dữ liệu
- [x] Đối chiếu danh mục 10 nhân viên: 8 người đang làm (Khôi + Quỳnh không BHXH; Tuyết Quỳnh tạm nghỉ); Ms. Hồng Anh từ tháng 11 nghỉ việc nhưng vẫn BHXH tự nguyện.
- [x] Xác nhận: Tuyết Quỳnh tạm nghỉ; Content Mr. Khôi 1.6M/tháng; lớp kèm 100k/lớp/buổi.
- [x] Đọc BHXH.xlsx: 8 người; Trương Tuấn Ngọc 1.504.500đ (chỉnh sửa được), khấu trừ NLĐ 535.500đ, chênh 969k ghi chú.
- [x] Đối chiếu 8 người BHXH: Khôi + Quỳnh không tham gia; Ms. Hồng Anh tháng 10 bình thường, từ tháng 11 chỉ BHXH tự nguyện.
- [x] Chốt cách tổng hợp chấm công: tạm nhập tay; app hỗ trợ nhập CSV/JSON từ repo `cham_cong_in-out_joy` (không sửa repo chấm công).
- [x] Chốt KPI 70/30; Full-time; mặc định anh Trương + Uyên Vi = 100%, cho phép chỉnh từng tháng.
- [x] Chốt mẫu Excel/PDF từ 2 file mẫu tháng 09.2026.

## 1. Tạo repo và nền ứng dụng
- [x] Tạo repo `Aliuliu001/bang_luong` dạng public; đã xác minh trên GitHub.
- [ ] Không đưa dữ liệu lương/BHXH cá nhân, workbook nguồn hay backup JSON vào repo public; dữ liệu thật chỉ nhập trong app và backup riêng.
- [ ] Khởi tạo ứng dụng tĩnh cho GitHub Pages; thiết kế giao diện đơn giản, tiếng Việt.
- [ ] Tạo cấu trúc dữ liệu có version cho nhân viên, lớp, tháng lương, phép, BHXH, nhắc việc.
- [ ] Thêm cảnh báo không đưa dữ liệu nhạy cảm vào repo công khai.

## 2. Danh mục và sao lưu
- [ ] Nhập danh sách nhân viên/lớp đã được anh xác nhận.
- [ ] Tạo màn hình chỉnh sửa danh mục, mức lương, bậc, loại lớp, đơn giá kèm, mức BHXH.
- [ ] Tải backup JSON đầy đủ.
- [ ] Nhập/khôi phục JSON có xem trước, kiểm tra định dạng/phiên bản và sao lưu trước khi thay thế dữ liệu.
- [ ] Kiểm tra round-trip JSON và khôi phục trên trình duyệt sạch/máy khác.

## 3. Nhập dữ liệu tháng và tính lương
- [ ] Tạo tháng tính lương, nhập tay khoản phát sinh/KPI/phép dùng.
- [ ] Nhập XLSX/CSV điểm danh; hỗ trợ chọn sheet tháng.
- [ ] Preview dữ liệu trước khi lưu; báo lớp chưa ghép, dòng trùng, ký hiệu lạ, tổng không khớp.
- [ ] Ghép lớp theo ID/tên đã xác nhận; phân loại chính/kèm theo danh mục.
- [ ] Tính lớp chính theo bậc × 8 × số lớp; không đếm dấu học viên.
- [ ] Tính lớp kèm theo số buổi được duyệt × 100.000đ/lớp/buổi (cho phép sửa giá).
- [ ] Chỉ áp dụng KPI cho giáo viên Full-time: nhập KPI cuối cùng; tính phần 70% lương cứng + 30% quỹ KPI theo ngưỡng.
- [x] Mặc định KPI của Trương Tuấn Ngọc và Nguyễn Thị Uyên Vi là 100%.
- [ ] Giáo viên Part-time: tính số buổi nhập tay × đơn giá/buổi; ví dụ Ms. Trâm 150.000đ/buổi; không áp dụng KPI.
- [ ] Tính nhân viên văn phòng và các vai trò khác theo quy tắc đã xác nhận.
- [ ] Theo dõi phép: số đầu kỳ, cộng/trừ thủ công, đã dùng, số còn; lưu dấu vết điều chỉnh.
- [ ] Tính khấu trừ BHXH, thực nhận, tổng chi phí công ty theo từng người.

## 4. BHXH và chứng từ
- [ ] Tính/hiển thị riêng BHXH nhân viên và công ty theo quy tắc đã duyệt.
- [ ] Tạo lệnh chuyển khoản tổng nhân viên với mã `TZ1121Z`.
- [ ] Tạo lệnh riêng Trương Tuấn Ngọc với mã `Q60460Z`.
- [ ] Điền thụ hưởng: STK 938015000008, BAO HIEM XA HOI TINH LAM DONG, Vietinbank.
- [ ] Tạo nút sao chép từng nội dung chuyển tiền và kiểm tra đúng tháng/năm/số tiền/tên.
- [ ] Xuất Excel bảng lương tổng hợp và chi tiết.
- [ ] Xuất PDF phiếu lương phù hợp hai mẫu Ms. Vân và Ms. Vân Anh.

## 5. Nhắc việc, lịch sử và hoàn tất
- [ ] Hiện checklist nhắc cuối tháng khi mở app; hỗ trợ đánh dấu xong và sao chép nội dung.
- [ ] Lưu lịch sử tháng đã tính/chốt, cho mở lại và tải chứng từ.
- [ ] Kiểm thử công thức, nhập file, xuất báo cáo, backup/restore; so khớp tháng thử với bảng tay.
- [ ] Chạy validator đầy đủ: cú pháp, kiểm thử tự động, smoke test giao diện và nhập/xuất.
- [ ] Audit độc lập: công thức lương/BHXH/KPI, xử lý dữ liệu, không lộ dữ liệu cá nhân, không ghi đè/xóa dữ liệu âm thầm.
- [ ] Khắc phục lỗi audit; lưu kết quả test và quyết định các rủi ro còn lại.
- [ ] Anh duyệt kết quả tháng thử.
- [ ] Triển khai GitHub Pages; kiểm tra URL hoạt động, tải trang, tạo backup/restore thành công.

## Trạng thái hiện tại
- [x] Đọc cấu trúc file Mr. Ngọc.xlsx và workbook nhân viên/lớp.
- [x] Ghi nhận hai mẫu phiếu lương và các quy tắc KPI đã xác nhận.
- [x] Lập plan.md và task.md.
- [ ] Chưa tạo repo, chưa viết ứng dụng, chưa nhập dữ liệu thật vào app.
- [ ] Cần anh duyệt plan và giải quyết các câu hỏi chặn trong `plan.md` trước khi triển khai phần tính lương.
