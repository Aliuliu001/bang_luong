# CONTEXT — Dự án tính lương & phép `bang_luong`

**Bắt đầu chat mới:** anh nhắn “Đọc `/home/ubuntu/bang_luong/README.md` và `/home/ubuntu/bang_luong/context.md`, rồi tiếp tục dự án bang_luong.” Đọc thêm `plan.md` và `task.md` để biết toàn bộ đặc tả/trạng thái.

## Trạng thái hiện tại
- Repo GitHub: https://github.com/Aliuliu001/bang_luong — **public**, đã tạo và xác minh. Chưa code, chưa push source, chưa bật GitHub Pages.
- Thư mục dự án local: `/home/ubuntu/bang_luong` (đã đồng bộ tên với repo).
- Tài liệu dự án: `README.md` (cách tiếp tục), `context.md` (yêu cầu và quyết định), `plan.md` (kế hoạch đầy đủ), `task.md` (tracker).
- Chỉ code public; tuyệt đối không commit dữ liệu lương, BHXH, file XLSX/PDF nguồn, backup JSON thật hoặc PAT.

## Quyết định đã chốt
- App web tĩnh trên GitHub Pages; dữ liệu lưu cục bộ trình duyệt; backup/restore JSON để chuyển máy; không đồng bộ tự động.
- Nhắc việc cuối tháng hiển thị khi mở app, checklist tuần tự và nút sao chép; không cần Telegram tự gửi.
- Xuất Excel/PDF theo mẫu GV và văn phòng Ms. Vân Anh.
- Full-time giáo viên: tổng lớp chính = bậc × 8 × số lớp; lương cứng 70%, quỹ KPI 30%. KPI nhập cuối cùng: ≥85%=100% quỹ; 70–84%=75%; 55–69%=50%; 0–54%=25%.
- KPI chỉ áp dụng Full-time. Trương Tuấn Ngọc và Nguyễn Thị Uyên Vi đặt KPI mặc định 100%; nên cho phép chỉnh từng tháng nếu cần.
- Part-time: lương = số buổi dạy × đơn giá/buổi; số buổi hiện nhập tay trong lúc chưa thống nhất cách tự tổng hợp chấm công. Ví dụ Ms. Trâm 150.000đ/buổi. Không KPI.
- Lớp kèm: danh mục có 3 lớp đánh dấu Kèm: `Kem-Đức`, `Kem-Nguyen & Tuan Anh`, `Kem-Khoi` (Mr. Đức Anh); đơn giá hiện 100.000đ/lớp/buổi, cho phép sửa. Số buổi sẽ nhập tay cho tới khi chốt cách chấm công.
- Ms. Vân Anh: HCNS, lương 9.200.000đ/tháng; BHXH đóng trên 5.100.000đ; khấu trừ NLĐ 535.500đ.
- BHXH.xlsx có 8 người tham gia (đã xác nhận; 2 người còn lại chưa tham gia). Tổng nhân viên thường 12.992.000đ (7 người, gồm Uyên Vi 3.200.000đ và sáu người 1.632.000đ/người). Tách lệnh Trương Tuấn Ngọc 1.504.500đ.
- BHXH người lao động khấu trừ 10,5% cho cả mọi nhân viên tham gia và anh Trương; 5.100.000×10,5%=535.500đ; Uyên Vi 10.000.000×10,5%=1.050.000đ. Với anh Trương lương chỉ khấu trừ 535.500đ nhưng lệnh BHXH vẫn 1.504.500đ; ghi chú chênh 969.000đ để anh cân đối về sau, không tự gán bên chịu. Số lệnh 1.504.500đ phải chỉnh được.
- Thụ hưởng BHXH: STK `938015000008`; `BAO HIEM XA HOI TINH LAM DONG`; Vietinbank. Hai lệnh/nội dung riêng theo mã `TZ1121Z` (nhân viên) và `Q60460Z` (Truong Tuan Ngoc), thay tháng/năm tương ứng.
- Phép: giai đoạn đầu nhập tay điều chỉnh và phép đã dùng, theo dõi số dư; chưa tự động cộng phép.

## Dữ liệu nguồn đã kiểm tra (không nằm trong repo)
- `Mr. Ngọc.xlsx`: dùng sheet `10.2026` làm mẫu chấm công gần nhất.
- `Danh sách nhân viên và danh sách lớp tương ứng.xlsx`: 10 người và 29 dòng lớp; 3 lớp Kèm ở trên. Nhân viên: NV0101 Trương Tuấn Ngọc GV FT bậc 5; NV2301 Nguyễn Thị Uyên Vi GV FT bậc 5; NV2707 Lê Đức Anh GV FT bậc 5; NV1308 Nguyễn Hồng Anh GV FT bậc 5; NV0904 Phạm Hoàng Khánh Vân GV FT bậc 6; NV2412 Nguyễn Ngọc Bảo Trâm GV PT bậc 3, 150k/buổi; NV2503 Trần Bảo Hạnh Nhung GV PT bậc 2, 120k/buổi; NV0204 Huỳnh Thuỵ Vân Anh HCNS FT, 9.2M/tháng; NV0801 Trần Đặng Chí Khôi Content PT, bảng ghi 1.6M mức lương/lớp; Nguyễn Ngọc Tuyết Quỳnh trợ giảng PT bậc 0, 80k/buổi, mã NV để trống. Các điều kiện/mức còn mơ hồ cần hỏi trước tính thật.
- `BHXH.xlsx`: 8 dòng; file ghi header 10.5% NLĐ và 21.5% công ty, mỗi người có tổng tỷ lệ (32%, riêng Trương Tuấn Ngọc 29.5%); cột NLĐ/công ty trong tệp hiện là 0, do đó dùng đúng các xác nhận trong chat ở trên.
- Hai PDF phiếu lương tháng 09.2026: GV có lương cứng/KPI/BHXH/thực nhận; văn phòng Vân Anh có lương/BHXH/thực nhận.

## ✅ Đã xác nhận (2026-10-27)
1. **Part-time/lớp kèm**: Tạm nhập tay số buổi. Anh có repo chấm công check in/out (`cham_cong_in-out_joy`); app lương sẽ hỗ trợ nhập CSV/JSON từ báo cáo chấm công để tự tính buổi đi làm. Không sửa code repo chấm công; chỉ xuất dữ liệu sang.
2. **Lớp kèm**: Giá 100.000đ/lớp/buổi — xác nhận đúng.
3. **Content & Trợ giảng**: Mr. Khôi (Content) 1.600.000đ/tháng. Ms. Tuyết Quỳnh (trợ giảng) đang tạm nghỉ → không tính trong roster hiện tại.
4. **BHXH 8 người**: Khôi và Quỳnh không đóng BHXH. **Ms. Hồng Anh từ tháng 11 nghỉ việc** nhưng vẫn đóng BHXH tự nguyện (gửi 1.632.000đ vào trung tâm). **Tháng 10**: tính lương bình thường. **Tháng 11 trở đi**: ngưng lương Ms. Hồng Anh, chỉ nhận BHXH tự nguyện.
5. **KPI mặc định**: Anh Trương và Uyên Vi 100% — xác nhận đúng; cho phép chỉnh theo tháng.

## Việc cần làm tiếp theo
- Gán giáo viên cụ thể cho 3 lớp Kèm (`Kem-Đức`, `Kem-Nguyen & Tuan Anh`, `Kem-Khoi`) — hiện đều thuộc Mr. Đức Anh.
- Thiết kế màn hình nhập/xuất dữ liệu chấm công từ repo `cham_cong_in-out_joy`.

## Quy trình an toàn
- Trước khi tính tiền thật, hiển thị bảng xem trước/đối chiếu; không tự đoán ô trống.
- Dữ liệu thật chỉ nhập trong app, backup riêng, không đưa lên GitHub. Repo public không cản push/commit; private repo cũng push được nếu PAT có quyền, nhưng có thể làm Pages khó chia sẻ hơn tùy cấu hình/gói.
- Làm từng phần, validator + test + audit bắt buộc; không triển khai Pages cho tới khi anh kiểm tra bảng thử.
