# Kế hoạch xây dựng ứng dụng Tính lương & Phép — Trung tâm Anh văn Joy

## Mục tiêu
Tạo ứng dụng web độc lập, triển khai GitHub Pages, phục vụ khoảng 10 nhân sự. Ứng dụng tính lương giáo viên/văn phòng, theo dõi phép, BHXH, tạo bảng lương Excel/PDF, hỗ trợ nhắc cuối tháng và sao lưu/khôi phục dữ liệu JSON. Repo GitHub: `Aliuliu001/bang_luong` (public). Project folder: `/home/ubuntu/bang_luong`. Không sửa các repo đang dùng.

## Căn cứ đã kiểm tra
- File `Mr. Ngọc.xlsx`: có nhiều sheet điểm danh tháng, dùng sheet `10.2026` làm mẫu gần nhất. Lưới ngày theo cột, nhân sự/lớp theo dòng; ký hiệu ngày gồm `x`, `off`, `bù` và có cột tổng `AL` trong các sheet xem được.
- File `Danh sách nhân viên và danh sách lớp tương ứng.xlsx`: một sheet, hai bảng song song. Bảng nhân viên A:H có 10 người; bảng lớp K:N có 29 dòng lớp (trong đó 3 lớp được đánh dấu Kèm). Có 3 lớp được ghi Loại Lớp=`Kèm`: `Kem-Đức`, `Kem-Nguyen & Tuan Anh`, `Kem-Khoi`, đều thuộc Mr. Đức Anh. Các lớp khác có tên/ID, lớp/độ tuổi, giáo viên; một số trường để trống.
- Tệp có chi tiết nhân sự: NV0101 Trương Tuấn Ngọc (GV, bậc 5); NV2301 Nguyễn Thị Uyên Vi (GV, bậc 5); NV2707 Lê Đức Anh (GV, bậc 5); NV1308 Nguyễn Hồng Anh (GV, bậc 5); NV0904 Phạm Hoàng Khánh Vân (GV, bậc 6); NV2412 Nguyễn Ngọc Bảo Trâm (GV, bậc 3); NV2503 Trần Bảo Hạnh Nhung (GV, bậc 2); NV0204 Huỳnh Thuỵ Vân Anh (HCNS, 9.200.000đ/tháng); NV0801 Trần Đặng Chí Khôi (Content, 1.600.000đ/tháng); Nguyễn Ngọc Tuyết Quỳnh (trợ giảng, mã NV trống, học việc/bậc 0, 80.000đ/buổi).
- File `BHXH.xlsx` ghi tỷ lệ NLĐ 10,5% và công ty 21,5% ở đầu bảng; từng dòng ghi mức đóng, tỷ lệ tổng và số tiền. Tám người: Uyên Vi (10.000.000đ, 32%, 3.200.000đ); Nguyễn Hồng Anh, Lê Đức Anh, Huỳnh Thuỵ Vân Anh, Trương Thị Ngọc My, Võ Hoàng Ngọc Phú, Phạm Hoàng Khánh Vân (mỗi người 5.100.000đ, 32%, 1.632.000đ); Trương Tuấn Ngọc (5.100.000đ, 29,5%, 1.504.500đ). Tổng 7 người ngoài Giám đốc là 12.992.000đ; cộng riêng Giám đốc là 14.496.500đ. Các cột số tiền NLĐ/công ty trong Excel đang ghi 0; không tự chia/khấu trừ trước khi anh xác nhận. Khoản 1.504.500đ của Trương Tuấn Ngọc duy trì đến khi anh đổi và phải chỉnh sửa được trong ứng dụng.
- Lương giáo viên Full-time chính: bậc × 8 buổi × số lớp; chia 70% lương cứng và 30% quỹ KPI. Nhập KPI cuối cùng (không nhập hai điểm đánh giá): ≥85% nhận 100% quỹ KPI; 70–84% nhận 75%; 55–69% nhận 50%; 0–54% nhận 25%. Quy tắc KPI chỉ áp dụng Full-time. Part-time tính theo buổi giảng dạy; không áp dụng cách chia lương cứng/KPI theo bậc.
- Lớp chính: Full-time tính theo bậc × 8 buổi; Part-time nhận theo buổi dạy; ví dụ Ms. Trâm = 150.000đ × số buổi dạy. Số buổi part-time hiện nhập tay; phương pháp tổng hợp chấm công chưa chốt. Lớp kèm hiện thống nhất đơn giá 100.000đ/lớp/buổi, có thể chỉnh trong danh mục; số buổi nhập/tổng hợp sau khi xác nhận phương pháp chấm công.
- Văn phòng Ms. Vân Anh: lương 9.200.000đ; BHXH trên 5.100.000đ, khấu trừ 535.500đ. Hai PDF mẫu lương tháng 09.2026 đã trích xuất; mẫu GV có cột lương cứng/KPI/khấu trừ BHXH/thực nhận, mẫu Vân Anh có lương văn phòng/BHXH/thực nhận.
- BHXH chuyển 2 lệnh: nhân viên theo mã `TZ1121Z`; Giám đốc Trương Tuấn Ngọc theo `Q60460Z`. Thụ hưởng: STK `938015000008`, chủ tài khoản `BAO HIEM XA HOI TINH LAM DONG`, Vietinbank. Hai mẫu nội dung theo tháng và tên công ty/cá nhân do anh đã cung cấp.
- Phép giai đoạn đầu: nhập tay phép đã dùng/điều chỉnh; lưu số dư; chưa tự động cộng phép do quy tắc chưa chốt.
- Nhắc việc: hiển thị trong app khi mở cuối tháng, từng việc tuần tự, có nút sao chép nội dung; không gửi Telegram tự động.
- Dữ liệu lưu cục bộ trình duyệt; JSON backup/restore để chuyển máy. Người dùng biết cần tự giữ file backup an toàn.

## Nguyên tắc thiết kế
1. Tách rõ **danh mục thiết lập** (nhân sự, bậc, lớp, loại lớp, BHXH, tài khoản) và **dữ liệu chốt theo tháng**. Chỉnh danh mục không được sửa lịch sử tháng đã chốt.
2. Không tự đoán khi thiếu tên/mã/mức lương; báo danh sách cần kiểm tra.
3. Nhập điểm danh phải có màn hình xem trước: sheet/tháng/giáo viên, lớp ghép được, buổi kèm được đếm, lớp không khớp, dòng trùng, ký hiệu chưa biết.
4. Lớp chính không tính theo số dấu điểm danh, mà theo số lớp đã gán × bậc × 8; lớp kèm mới tính số buổi thực tế × đơn giá. Chưa dùng tổng cột ngày làm số buổi kèm nếu chưa xác nhận dấu nào tính lương. Hiện số buổi Part-time nhập tay cho đến khi quy trình chấm công được chốt.
5. Chỉ tạo bảng lương/tiền chuyển BHXH sau khi người dùng xem và xác nhận các cảnh báo.
6. Không chứa bí mật/tài khoản đăng nhập trong frontend hoặc repo công khai. JSON backup có dữ liệu nhạy cảm cần cảnh báo và hướng dẫn lưu riêng.

## Các giai đoạn và tác vụ
### P0 — Chốt nghiệp vụ & kiểm tra đầu vào
- Xác minh danh sách nhân sự/lớp, các ô trống, nhân sự có kiêm nhiệm, trạng thái hiện hành.
- BHXH.xlsx cho thấy tám người; cần đối chiếu với roster 10 người và làm rõ vì sao cột NLĐ/công ty bằng 0 trong file. Xác nhận cơ cấu khấu trừ NLĐ/chi phí công ty; giữ 1.504.500đ của Trương Tuấn Ngọc chỉnh sửa được.
- Xác minh sheet `10.2026`: cấu trúc hàng/cột, danh sách lớp theo GV, ký hiệu `x/off/bù/stop/đổi`, tổng số lần; đối chiếu 3 lớp kèm trong danh mục với sheet điểm danh. Chưa chốt cách tổng hợp chuyên cần; dùng nhập tay số buổi Part-time trước mắt.
- KPI chỉ áp dụng Full-time; Part-time tính theo buổi dạy. Đã chốt ranh giới KPI: 54/55, 69/70, 84/85 (hiện hiểu 54% trở xuống = 25%; 55–69 = 50%; 70–84 = 75%; từ 85% = 100%).
- Xác minh nhân viên ngoài giáo viên có chính sách lương/khấu trừ nào ngoài khoản đã nêu; lớp kèm ai phụ trách và xác nhận đơn giá 100.000đ/lớp/buổi.
- Chốt mẫu Excel/PDF, ngày nhắc (nhắc khi mở app; không chạy khi đóng), và kỳ lương tháng.

### P1 — Nền tảng và danh mục
- Tạo repo độc lập, vanilla HTML/CSS/JS (hoặc stack tĩnh tương đương), GitHub Pages.
- Tạo danh mục nhân viên/lớp/bậc/đơn giá/BHXH/tài khoản thanh toán.
- Nhập thử dữ liệu từ workbook, báo lỗi/thiếu/trùng; người dùng duyệt trước lưu.
- Tạo thiết lập versioned, xuất/nhập JSON; validate schema, phiên bản, checksum hoặc cấu trúc, preview trước ghi đè; backup trước restore.

### P2 — Nhập tháng và engine lương
- Màn hình mở tháng, tải XLSX/CSV và nhập tay khoản phát sinh.
- Bộ đọc sheet 10.2026 theo mẫu; xác định lớp kèm qua danh mục lớp (không dựa tên gần đúng khi không chắc).
- Tạo tổng hợp từng giáo viên/lớp: lớp chính, lớp kèm, buổi được tính, đơn giá, tiền trước KPI.
- Nhập KPI cuối cho từng GV, tính 70/30 và các bậc chi KPI.
- Tính lương văn phòng/Content/trợ giảng theo mức và cách nhập đã xác nhận; BHXH khấu trừ; lương thực nhận.
- Điều chỉnh/cộng trừ, phép đã dùng và số dư phép có nhật ký ai/giá trị/lý do.

### P3 — BHXH và xuất chứng từ
- Tính phần NLĐ/công ty/tổng theo từng người; ngoại lệ giám đốc minh bạch.
- Tạo hai nội dung chuyển khoản theo đúng mã, tháng, tên công ty/cá nhân; hiện số tiền, thụ hưởng, ngân hàng; nút sao chép từng mục.
- Xuất Excel bảng tổng hợp + chi tiết; PDF phiếu cá nhân theo hai mẫu, đúng dấu tiếng Việt và số tiền.

### P4 — Nhắc việc, lịch sử, kiểm thử & phát hành
- Hộp nhắc việc cuối tháng khi mở app, checklist tuần tự, đánh dấu xong và sao chép văn bản.
- Lịch sử các tháng đã chốt, khóa/snapshot tháng; cho tải lại chứng từ/backups.
- Test unit công thức; test nhập file mẫu 10.2026 và danh mục; test export/import JSON; kiểm tra phục hồi trên browser profile sạch.
- So khớp tháng thử với bảng lương thực tế; audit công thức BHXH/KPI, phát hiện dòng trùng/thiếu/không ghép lớp.
- Triển khai GitHub Pages sau khi anh duyệt kết quả thử.

## Kiểm thử nghiệm thu
- Bậc 6 × 8 × 5 lớp = 8.800.000đ; 70% = 6.160.000đ; 30% = 2.640.000đ; KPI 88% nhận 100%, tổng 8.800.000đ.
- Test ngưỡng KPI: 0/54/55/69/70/84/85/100%; nhận lần lượt 25/25/50/50/75/75/100/100% quỹ KPI.
- Lương theo lớp chính không đổi khi số dấu điểm danh học viên biến động, trừ khi có quy tắc khác được duyệt.
- Test lớp kèm: số buổi × đơn giá; các dấu `off`, `bù`, ô trống không tự tính tiền cho đến khi được quy định.
- Test BHXH: 5.100.000 × 10,5%=535.500; 10.000.000 × 10,5%=1.050.000; khấu trừ 10,5% cả nhân viên và Trương Tuấn Ngọc; lệnh BHXH riêng anh Trương 1.504.500đ, ghi chú chênh 969.000đ (không tự gán bên chịu), tổng có chỉnh sửa.
- Test backup/restore round-trip: danh mục, tháng, lịch sử, cài đặt, ghi chú; hỏng/phiên bản sai phải từ chối an toàn, không xóa dữ liệu đang có.
- Kiểm tra Excel/PDF: tổng lương = tổng chi tiết, thực nhận = tổng thu nhập − khấu trừ +/− phát sinh; hai nội dung BHXH đúng mẫu.

## GitHub public/private và bảo mật
- Repo hiện public theo yêu cầu tên `bang_luong`; public/private không ảnh hưởng khả năng commit/push nếu PAT có quyền phù hợp. Public repo nghĩa là mọi người có thể xem mã nguồn và tệp đã commit. GitHub Pages public dễ chia sẻ và không yêu cầu người xem đăng nhập.
- Repo private không làm git push khó hơn về nguyên tắc, nhưng GitHub Pages private/restricted access có thể phụ thuộc gói tài khoản/tổ chức; người xem có thể cần đăng nhập/quyền. Với mục tiêu link dễ mở, đề xuất để repo public nhưng chỉ chứa mã nguồn mẫu, tuyệt đối không commit tên nhân viên, lương, BHXH, backup JSON hoặc file spreadsheet thật.
- Dữ liệu lương lưu trong trình duyệt của máy; người dùng khác không truy cập chỉ nhờ thấy trang. Bản backup JSON chứa dữ liệu nhạy cảm, cần lưu riêng.

## Rủi ro/giới hạn
- GitHub Pages không có backend: không đồng bộ tự động giữa máy, không thể gửi nhắc khi app đóng. Chuyển máy bằng JSON.
- Workbook chấm công có cấu trúc theo tháng và ký hiệu nội bộ; parser cần preview và kiểm tra thay đổi mẫu.
- File JSON/CSV/XLSX lương/BHXH nhạy cảm; cần hạn chế chia sẻ, không commit dữ liệu thật vào GitHub.
- Thông tin ảnh/dữ liệu hiện có thể xung đột: danh sách BHXH trước đó gồm 8 người, workbook nhân sự có 10 người; cần đối chiếu trước khi bật tính tự động.
- Cột lớp kèm có trong danh sách lớp, nhưng chưa kiểm chứng các dòng lớp kèm đó xuất hiện và đánh dấu thế nào trong sheet điểm danh 10.2026.

## ✅ Đã xác nhận (2026-10-27)
1. **Tuyết Quỳnh**: Đang tạm nghỉ → không tính trong roster hiện tại.
2. **BHXH anh Trương**: 1.504.500đ/tháng (29,5%); khấu trừ NLĐ 535.500đ (10,5%), chênh 969.000đ ghi chú để anh cân đối về sau. Khoản 1.504.500đ phải chỉnh sửa được.
3. **Part-time số buổi**: Tạm nhập tay. App hỗ trợ nhập CSV/JSON từ repo chấm công `cham_cong_in-out_joy` để tự tính buổi đi làm (xuất dữ liệu sang, không sửa code repo chấm công).
4. **KPI**: Chỉ áp dụng Full-time; mặc định anh Trương + Uyên Vi = 100%; cho phép chỉnh theo tháng.
5. **Content & lớp kèm**: Mr. Khôi 1.600.000đ/tháng. Lớp kèm 100.000đ/lớp/buổi; 3 lớp đều do Mr. Đức Anh phụ trách.
6. **Khôi và Quỳnh**: Không đóng BHXH.
7. **Ms. Hồng Anh**: Tháng 10 tính lương bình thường; từ tháng 11 nghỉ việc nhưng vẫn đóng BHXH tự nguyện 1.632.000đ (app cần xử lý trường hợp "nghỉ việc nhưng vẫn BHXH").

## Liên kết với repo chấm công
- Repo chấm công: https://github.com/Aliuliu001/cham_cong_in-out_joy
- App lương sẽ có chức năng **nhập báo cáo chấm công** (JSON/CSV) từ repo chấm công để tự động tính số buổi Part-time/lớp kèm.
- Không sửa code repo chấm công; chỉ xuất dữ liệu từ đó sang app lương.
