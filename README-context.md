# Tính lương & phép — ghi chú để tiếp tục ở chat mới

Đọc lần lượt: `plan.md`, `task.md`, rồi file này. Repo: https://github.com/Aliuliu001/bang_luong (public). Tạo xong và đã xác minh; chưa code/push. Public/private không ảnh hưởng commit/push khi PAT có quyền. Public giúp Pages chia sẻ dễ; tuyệt đối không commit dữ liệu lương/BHXH, workbook nguồn, backup JSON. Dữ liệu thật chỉ nằm trong trình duyệt và backup riêng. Private Pages có thể cần gói phù hợp/người xem đăng nhập.

## Trạng thái
- Repo riêng đã tạo ở GitHub; chưa clone/đẩy code hoặc bật Pages.
- Kế hoạch và checklist tại `plan.md`, `task.md`. Chưa viết ứng dụng.
- Dữ liệu nguồn hiện có trong cuộc trò chuyện/tệp đính kèm: `Mr. Ngọc.xlsx`, `Danh sách nhân viên và danh sách lớp tương ứng.xlsx`, hai PDF phiếu lương; khi tiếp tục, yêu cầu anh gửi lại nếu cần truy cập nội dung.

## Yêu cầu đã chốt
- Web app tĩnh chạy GitHub Pages, tách repo; dữ liệu cục bộ, backup/restore JSON để chuyển máy. Không tự đồng bộ.
- Nhắc việc cuối tháng khi mở app; checklist lần lượt, nội dung chuyển khoản có nút sao chép. Không cần Telegram tự gửi.
- Xuất Excel và PDF theo mẫu hai phiếu lương.
- Danh mục nhân viên/lớp từ workbook gửi ngày 2026-10-27; dùng sheet `10.2026` trong `Mr. Ngọc.xlsx` làm mẫu chấm công gần nhất.
- Bảng lớp có loại lớp; 3 lớp Kèm: `Kem-Đức`, `Kem-Nguyen & Tuan Anh`, `Kem-Khoi`, giáo viên Mr. Đức Anh. Lớp khác coi lớp chính theo danh mục được duyệt.
- Lớp chính Full-time: bậc × 8 buổi × số lớp, chia 70% lương cứng + 30% quỹ KPI. Anh nhập KPI cuối; ngưỡng: ≥85%: trả 100% quỹ KPI; 70–84%:75%; 55–69%:50%; 0–54%:25%.
- Chỉ Full-time áp dụng KPI. Part-time tính theo số buổi giảng dạy (đơn giá theo bậc/thoả thuận; không chia 70/30, không KPI). Lớp kèm có đơn giá/buổi nhập theo lớp và số buổi thực tế cần xác nhận.
- Vân Anh: lương văn phòng 9.200.000đ; BHXH tính 10.5% × 5.100.000 = 535.500đ.
- Lớp kèm hiện có mức tham chiếu 100k/120k/150k/200k mỗi buổi, còn phải gán lớp/giá chính xác.
- Phép giai đoạn đầu nhập tay số dùng/điều chỉnh, theo dõi số dư; chưa tự cộng phép.
- BHXH: tỷ lệ thông thường phần NLĐ 10.5%, công ty 21.5%, tổng 32%. Mức lương đóng thường 5.100.000; Uyên Vi 10.000.000. Trương Tuấn Ngọc lệnh riêng tổng 1.504.500đ theo tỷ lệ 29,5% trên lương CB 5.100.000đ, cố định tới khi anh đổi; phải có ô chỉnh. BHXH.xlsx: các nhân viên thông thường tổng 32% (10,5% NLĐ + 21,5% công ty), Uyên Vi CB 10.000.000đ, các dòng có tổng BHXH ghi trong file. Vẫn cần xác nhận phần trích lương NLĐ của anh Trương và danh sách nhân sự tham gia BHXH hiện hành.
- Hai lệnh BHXH tách: nhân viên mã `TZ1121Z`; Trương Tuấn Ngọc mã `Q60460Z`. Thụ hưởng STK `938015000008`, BAO HIEM XA HOI TINH LAM DONG, Vietinbank. Nội dung mẫu đã cung cấp: `TZ1121Z - NOP TIEN BHXH THANG MM.YYYY - CONG TY TNHH TRUNG TAM NGOAI NGU JOY`; `Q60460Z - NOP TIEN BHXH THANG MM.YYYY - TRUONG TUAN NGOC`.

## Thông tin đọc được trong workbook nhân sự/lớp
- 10 nhân viên: NV0101 Trương Tuấn Ngọc (GV Fulltime bậc 5); NV2301 Nguyễn Thị Uyên Vi (GV Fulltime bậc 5); NV2707 Lê Đức Anh (GV Fulltime bậc 5); NV1308 Nguyễn Hồng Anh (GV Fulltime bậc 5); NV0904 Phạm Hoàng Khánh Vân (GV Fulltime bậc 6); NV2412 Nguyễn Ngọc Bảo Trâm (GV Part-time bậc 3); NV2503 Trần Bảo Hạnh Nhung (GV Part-time bậc 2); NV0204 Huỳnh Thuỵ Vân Anh (HCNS Fulltime, 9.2M/tháng); NV0801 Trần Đặng Chí Khôi (Content Part-time, 1.6M ghi ở cột mức lương/lớp); Nguyễn Ngọc Tuyết Quỳnh (trợ giảng Part-time, mã NV chưa ghi, bậc 0, 80k/buổi). Xác nhận lại trước khi nhập vào app; đặc biệt một số mức/role chưa rõ.
- Danh mục lớp có 29 dòng dữ liệu; sheet điểm danh cần ghép theo ID/tên lớp. Chưa xác minh dấu nào tính là một buổi trả lương kèm.

## Câu hỏi cần hỏi anh trước khi code tính lương
1. Xác nhận danh sách người tham gia BHXH hiện tại và các khoản trích lương NLĐ; BHXH.xlsx có 8 dòng tham gia, còn roster lương 10 nhân sự.
2. Đã chốt: 8 người trong file BHXH là người tham gia; 2 người còn lại không tham gia. Anh Trương bị khấu trừ 535.500đ, nhưng lệnh riêng nộp 1.504.500đ; ghi chú chênh 969.000đ để cân đối, không tự phân bổ.
3. Khi chốt tự động hóa: dấu nào tính buổi dạy; xử lý `off`, `bù`, vắng/đổi? Tạm thời nhập tay số buổi Part-time (anh đã xác nhận lương = số buổi × đơn giá).
4. Xác nhận giáo viên/Part-time phụ trách từng lớp Kèm; hiện giá 100.000đ/lớp/buổi.
5. Trợ giảng bậc 0 80.000đ/buổi: cách ghi buổi và mã NV cần bổ sung? Content 1.600.000đ là lương tháng cố định hay mức/lớp?
6. KPI Full-time áp dụng cho các giáo viên Full-time kể cả Trương Tuấn Ngọc và Uyên Vi khi có giờ/lớp dạy không?
7. Xác nhận roster nhân sự/lớp là hiện hành; có ai đã nghỉ/đổi trạng thái?

## Bảo mật
Workbook/phiếu lương có dữ liệu cá nhân và lương; không đưa dữ liệu thật vào repo công khai, không lưu PAT trong repo hoặc ghi chú. Repo hiện tạo private.
