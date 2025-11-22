# Use Case Specifications - Quản lý Hóa đơn (Staff/Admin) / Staff Invoice Management

## Nhóm chức năng: Quản lý Hóa đơn - Staff/Admin / Staff Invoice Management

---

## UC 54: Xem chi tiết hóa đơn bất kỳ & Công nợ / View Any Invoice & Debt

### Mô tả ngắn gọn / Brief Description

Nhân viên hoặc Admin xem thông tin hóa đơn và công nợ của phiếu đặt tiệc từ màn hình chi tiết phiếu đặt.

Staff or Admin views invoice information and debt from booking details screen.

### Tác nhân / Actors

- **Nhân viên** / Staff (Primary)
- **Admin** / Admin (Primary)

### Tiền điều kiện / Preconditions

1. Nhân viên/Admin đã đăng nhập vào hệ thống
2. Đang xem chi tiết phiếu đặt tiệc (UC 49)
3. Phiếu đặt đã được duyệt (có hóa đơn)

### Hậu điều kiện / Postconditions

**Thành công:**

- Hiển thị chi tiết hóa đơn của phiếu đặt
- Hiển thị thông tin công nợ (tiền còn lại)

**Thất bại:**

- Hiển thị thông báo lỗi

### Luồng sự kiện chính / Main Flow

1. Nhân viên/Admin nhấn nút "Xem hóa đơn" từ màn hình chi tiết phiếu đặt (UC 49)
2. Hệ thống truy vấn chi tiết hóa đơn từ PHIEUDATTIEC, THUCDON, CHITIETDV, SANH, CA, NGUOIDUNG
3. Hệ thống hiển thị thông tin chi tiết hóa đơn
4. Nhân viên/Admin xem thông tin hóa đơn và công nợ
5. Use case kết thúc

### Luồng thay thế / Alternative Flows

**3a. Lỗi khi truy vấn chi tiết**

- 3a1. Hệ thống gặp lỗi database
- 3a2. Hiển thị thông báo lỗi "Không thể tải chi tiết hóa đơn"
- 3a3. Nhân viên/Admin xác nhận
- 3a4. Use case kết thúc

### Luồng ngoại lệ / Exception Flows

**E1. Nhân viên/Admin đóng hóa đơn**

- E1.1. Nhân viên/Admin nhấn nút "Đóng"
- E1.2. Quay về màn hình chi tiết phiếu đặt (UC 49)
- E1.3. Use case kết thúc

**E2. Nhân viên/Admin xác nhận thanh toán**

- E2.1. Nhân viên/Admin chọn "Xác nhận thanh toán" (UC 55)
- E2.2. Chuyển sang UC 55
- E2.3. Use case kết thúc

**E3. Nhân viên/Admin xuất PDF**

- E3.1. Nhân viên/Admin chọn "Xuất PDF" (UC 56)
- E3.2. Chuyển sang UC 56
- E3.3. Use case kết thúc

### Yêu cầu đặc biệt / Special Requirements

- Hiển thị rõ ràng trạng thái thanh toán (Chưa thanh toán / Đã thanh toán đủ)
- Highlight công nợ còn lại bằng màu sắc phù hợp
- Giao diện đơn giản, dễ đọc
- Truy cập trực tiếp từ UC 49 (Chi tiết phiếu đặt)

### Các yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Tải chi tiết hóa đơn < 1 giây
- **Usability**: Giao diện rõ ràng, dễ đọc
- **Security**: Phân quyền xem hóa đơn theo nhóm người dùng

### Quy tắc nghiệp vụ / Business Rules

- **BR1**: Chỉ phiếu đặt đã được duyệt mới có hóa đơn
- **BR2**: 1 phiếu đặt tương ứng với 1 hóa đơn duy nhất
- **BR3**: Công nợ = TongTienHoaDon - TienDatCoc - TienDaThanhToan
- **BR4**: Hiển thị cảnh báo nếu quá hạn thanh toán (NgayDaiTiec - 3 ngày)
- **BR5**: Hiển thị tiền phạt nếu áp dụng (theo THAMSO: KiemTraPhat, TiLePhat)
- **BR6**: Truy cập từ UC 49 bằng nút "Xem hóa đơn"

---

## UC 55: Xác nhận thanh toán & Tính tiền phạt / Confirm Payment & Calculate Penalty

### Mô tả ngắn gọn / Brief Description

Nhân viên/Admin xác nhận thanh toán đã thực hiện từ khách hàng qua cổng thanh toán trực tuyến. Hệ thống tự động tính tiền phạt nếu thanh toán trễ.

Staff/Admin confirms payment completed by customer through online payment gateway. System automatically calculates penalty for late payment.

### Tác nhân / Actors

- **Nhân viên** / Staff (Primary)
- **Admin** / Admin (Primary)

### Tiền điều kiện / Preconditions

1. Nhân viên/Admin đã đăng nhập vào hệ thống
2. Phiếu đặt đã được duyệt và có hóa đơn
3. Hóa đơn chưa được thanh toán đầy đủ (TienConLai > 0)
4. Khách hàng đã thanh toán qua cổng thanh toán trực tuyến (VNPay, Momo, ZaloPay)

### Hậu điều kiện / Postconditions

**Thành công:**

- Cập nhật thông tin thanh toán trong PHIEUDATTIEC
- Cập nhật TienConLai = 0
- Tính và cập nhật TienPhat (nếu thanh toán trễ)
- Cập nhật NgayThanhToan = ngày hiện tại
- Gửi email xác nhận thanh toán cho khách hàng
- Hiển thị thông báo thành công

**Thất bại:**

- Không cập nhật thông tin thanh toán
- Hiển thị thông báo lỗi

### Luồng sự kiện chính / Main Flow

1. Nhân viên/Admin xem chi tiết hóa đơn (UC 54)
2. Hệ thống hiển thị nút "Xác nhận thanh toán" (nếu TienConLai > 0)
3. Nhân viên/Admin nhấn nút "Xác nhận thanh toán"
4. Hệ thống lấy thông tin thanh toán từ giao dịch của khách hàng (phương thức và số tiền đầy đủ)
5. Hệ thống kiểm tra hạn thanh toán (NgayHienTai vs NgayDaiTiec - 3 ngày)
6. Hệ thống tự động tính tiền phạt (nếu quá hạn và THAMSO.KiemTraPhat = 1)
7. Hệ thống hiển thị thông tin xác nhận: Số tiền thanh toán, Phương thức, Tiền phạt (nếu có), Tổng cộng
8. Nhân viên/Admin xem lại thông tin
9. Nhân viên/Admin nhập ghi chú (tùy chọn)
10. Nhân viên/Admin nhấn "Xác nhận"
11. Hệ thống cập nhật PHIEUDATTIEC (TienConLai = 0, TienPhat, NgayThanhToan)
12. Hệ thống gửi email xác nhận thanh toán cho khách hàng
13. Hệ thống gửi email xác nhận cho khách hàng
14. Hệ thống hiển thị thông báo "Xác nhận thanh toán thành công"
15. Hệ thống hiển thị thông báo "Xác nhận thanh toán thành công"
16. Nhân viên/Admin xem thông tin hóa đơn đã cập nhật
17. Use case kết thúc thành công

### Luồng thay thế / Alternative Flows

**6a. Không áp dụng tiền phạt**

- 6a1. THAMSO.KiemTraPhat = 0 hoặc chưa quá hạn
- 6a2. TienPhat = 0
- 6a3. Tiếp tục bước 7

**6b. Áp dụng tiền phạt**

- 6b1. NgayHienTai > NgayDaiTiec - 3 ngày AND THAMSO.KiemTraPhat = 1
- 6b2. Lấy TiLePhat từ THAMSO
- 6b3. TienPhat = TienConLai \* TiLePhat
- 6b4. Tiếp tục bước 7

**11a. Lỗi khi cập nhật**

- 11a1. Hệ thống gặp lỗi database
- 11a2. Rollback transaction
- 11a3. Hiển thị thông báo lỗi "Có lỗi xảy ra. Vui lòng thử lại"
- 11a4. Use case kết thúc thất bại

**12a. Lỗi gửi email**

- 12a1. Không thể gửi email xác nhận
- 12a2. Ghi log lỗi
- 12a3. Tiếp tục hiển thị thông báo thành công
- 12a4. Tiếp tục bước 13

### Luồng ngoại lệ / Exception Flows

**E1. Nhân viên/Admin hủy xác nhận**

- E1.1. Nhân viên/Admin nhấn nút "Hủy" ở bước 8-10
- E1.2. Hệ thống xác nhận "Bạn có chắc muốn hủy?"
- E1.3. Nếu xác nhận, quay về chi tiết hóa đơn
- E1.4. Use case kết thúc

### Yêu cầu đặc biệt / Special Requirements

- Tự động lấy thông tin thanh toán từ giao dịch của khách hàng
- Tự động lấy thông tin thanh toán từ giao dịch của khách hàng
- Tự động tính tiền phạt dựa trên tham số hệ thống
- Hiển thị rõ ràng tiền phạt (nếu có) trước khi xác nhận
- Cho phép nhân viên nhập ghi chú cho lần xác nhận

### Các yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Xử lý xác nhận thanh toán < 3 giây
- **Security**: Chỉ nhân viên/admin có quyền mới được xác nhận thanh toán
- **Reliability**: Đảm bảo tính toàn vẹn giao dịch (transaction)
- **Usability**: Quy trình xác nhận đơn giản, rõ ràng

### Quy tắc nghiệp vụ / Business Rules

- **BR1**: Khách hàng thanh toán đầy đủ 1 lần qua cổng thanh toán trực tuyến
- **BR2**: Số tiền thanh toán = TienConLai (thanh toán toàn bộ)
- **BR3**: Tiền phạt chỉ áp dụng nếu THAMSO.KiemTraPhat = 1
- **BR4**: Công thức tính tiền phạt: TienPhat = TienConLai \* THAMSO.TiLePhat
- **BR5**: Điều kiện áp dụng phạt: NgayHienTai > NgayDaiTiec - 3 ngày
- **BR6**: Sau khi xác nhận, cập nhật: TienConLai = 0, NgayThanhToan = ngày hiện tại
- **BR7**: Phương thức thanh toán tự động lấy từ giao dịch customer (VNPay, Momo, ZaloPay)
- **BR8**: Gửi email xác nhận ngay sau khi xác nhận thanh toán thành công

---

## UC 56: Xuất hóa đơn bất kỳ ra PDF / Export Any Invoice to PDF

### Mô tả ngắn gọn / Brief Description

Nhân viên/Admin xuất hóa đơn của bất kỳ phiếu đặt tiệc nào ra file PDF để lưu trữ, in ấn hoặc gửi cho khách hàng.

Staff/Admin exports any wedding booking invoice to PDF file for storage, printing, or sending to customer.

### Tác nhân / Actors

- **Nhân viên** / Staff (Primary)
- **Admin** / Admin (Primary)

### Tiền điều kiện / Preconditions

1. Nhân viên/Admin đã đăng nhập vào hệ thống
2. Phiếu đặt đã được duyệt
3. Hóa đơn đã tồn tại

### Hậu điều kiện / Postconditions

**Thành công:**

- Tạo file PDF chứa thông tin hóa đơn
- Tải file PDF về máy
- Hiển thị thông báo thành công
- Ghi log hành động xuất PDF

**Thất bại:**

- Không tạo được file PDF
- Hiển thị thông báo lỗi

### Luồng sự kiện chính / Main Flow

1. Nhân viên/Admin xem chi tiết hóa đơn (UC 54)
2. Hệ thống hiển thị nút "Xuất PDF"
3. Nhân viên/Admin nhấn nút "Xuất PDF"
4. Hệ thống truy vấn đầy đủ thông tin hóa đơn từ PHIEUDATTIEC, THUCDON, CHITIETDV, SANH, CA, NGUOIDUNG
5. Hệ thống tạo file PDF với nội dung hóa đơn đầy đủ
6. Hệ thống tải file PDF về máy
7. Hệ thống ghi log hành động (ai, khi nào, phiếu đặt nào)
8. Hệ thống hiển thị thông báo "Xuất PDF thành công"
9. Nhân viên/Admin xem file PDF đã tải
10. Use case kết thúc thành công

### Luồng thay thế / Alternative Flows

**5a. Lỗi khi tạo PDF**

- 5a1. Hệ thống không thể tạo file PDF
- 5a2. Hiển thị thông báo lỗi "Không thể tạo file PDF. Vui lòng thử lại"
- 5a3. Use case kết thúc thất bại

**6a. Lỗi khi tải file**

- 6a1. Không thể tải file về máy
- 6a2. Hiển thị thông báo "Không thể tải file. Vui lòng kiểm tra kết nối"
- 6a3. Use case kết thúc thất bại

### Luồng ngoại lệ / Exception Flows

**E1. Nhân viên/Admin hủy xuất PDF**

- E1.1. Nhân viên/Admin đóng dialog hoặc nhấn ESC
- E1.2. Hủy quá trình xuất PDF
- E1.3. Use case kết thúc

**E2. Nhân viên/Admin chọn gửi email**

- E2.1. Nhân viên/Admin chọn "Gửi PDF qua email"
- E2.2. Hệ thống hiển thị form nhập email
- E2.3. Nhân viên/Admin nhập email khách hàng
- E2.4. Hệ thống tạo PDF và gửi email
- E2.5. Hiển thị thông báo "Đã gửi hóa đơn qua email"
- E2.6. Use case kết thúc

### Yêu cầu đặc biệt / Special Requirements

- File PDF phải chứa đầy đủ thông tin hóa đơn:
  - Logo và thông tin công ty
  - Thông tin khách hàng (tên chú rể, cô dâu, SĐT)
  - Thông tin đại tiệc (ngày, ca, sảnh, loại sảnh)
  - Bảng thực đơn với số lượng, đơn giá, thành tiền
  - Bảng dịch vụ với số lượng, đơn giá, thành tiền
  - Tổng tiền bàn, tổng tiền dịch vụ, tổng hóa đơn
  - Tiền đặt cọc, tiền đã thanh toán, tiền còn lại
  - Tiền phạt (nếu có)
  - Chi phí phát sinh (nếu có)
  - Lịch sử thanh toán
  - Người xác nhận thanh toán
  - Ngày xuất hóa đơn
  - Chữ ký (nếu cần in)
- Định dạng PDF chuẩn, dễ in
- Tên file: `HoaDon_[MaPhieuDat]_[TenKhachHang]_[NgayXuat].pdf`
- Cho phép gửi PDF qua email trực tiếp

### Các yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Tạo và tải file PDF < 5 giây
- **Usability**: File PDF dễ đọc, dễ in, định dạng chuyên nghiệp
- **Compatibility**: File PDF tương thích với các trình đọc PDF phổ biến
- **Security**: Ghi log mỗi lần xuất PDF để kiểm soát

### Quy tắc nghiệp vụ / Business Rules

- **BR1**: Chỉ xuất PDF cho hóa đơn của phiếu đặt đã được duyệt
- **BR2**: File PDF phải chứa đầy đủ thông tin chi tiết và lịch sử thanh toán
- **BR3**: Ghi log mỗi lần xuất PDF (ai, khi nào, phiếu đặt nào, gửi email hay không)
- **BR4**: Nhân viên/Admin có thể xuất PDF nhiều lần cho cùng một hóa đơn
- **BR5**: Nếu gửi email, gửi kèm file PDF đính kèm

---

## Tổng kết nhóm chức năng / Summary

Nhóm chức năng **Quản lý Hóa đơn (Staff/Admin)** bao gồm 3 use case chính:

1. **UC 54**: Xem chi tiết hóa đơn bất kỳ & Công nợ - Xem danh sách và chi tiết hóa đơn của tất cả khách hàng
2. **UC 55**: Xác nhận thanh toán & Tính tiền phạt - Xác nhận thanh toán trực tiếp và tự động tính phạt
3. **UC 56**: Xuất hóa đơn bất kỳ ra PDF - Tải file PDF hóa đơn hoặc gửi email

### Bảng CRUD tương ứng

| Use Case | PHIEUDATTIEC | THUCDON | CHITIETDV | SANH | CA  | NGUOIDUNG | THAMSO |
| -------- | ------------ | ------- | --------- | ---- | --- | --------- | ------ |
| UC 54    | R            | R       | R         | R    | R   | R         | R      |
| UC 55    | U            | -       | -         | -    | -   | R         | R      |
| UC 56    | R            | R       | R         | R    | R   | R         | -      |

### Lưu ý quan trọng

- Tất cả use case trong nhóm này dành cho **Nhân viên/Admin**
- Nhân viên/Admin có thể xem và quản lý **hóa đơn của tất cả khách hàng**
- **Tự động tính tiền phạt** dựa trên tham số hệ thống (THAMSO: KiemTraPhat, TiLePhat)
- **UC 54** có thể được truy cập từ **UC 49** (Xem chi tiết phiếu đặt bất kỳ) → Tích hợp xem hóa đơn ngay trong màn hình chi tiết phiếu đặt
- Sử dụng **transaction** để đảm bảo tính toàn vẹn dữ liệu thanh toán
- **Gửi email** xác nhận sau mỗi giao dịch thanh toán
- **Ghi log** tất cả hành động liên quan đến hóa đơn (xem, xác nhận thanh toán, xuất PDF)

### So sánh với Customer Payment (UC 51-53)

| Tiêu chí                   | Customer Payment (UC 51-53)   | Staff Invoice Management (UC 54-56)                   |
| -------------------------- | ----------------------------- | ----------------------------------------------------- |
| **Phạm vi dữ liệu**        | Chỉ hóa đơn của chính mình    | Tất cả hóa đơn trong hệ thống                         |
| **Phương thức thanh toán** | Cổng thanh toán trực tuyến    | Tiền mặt, chuyển khoản (xác nhận thủ công)            |
| **Tính tiền phạt**         | Không                         | Có (tự động)                                          |
| **Gửi email**              | Tự động sau thanh toán online | Tự động sau xác nhận thanh toán                       |
| **Bộ lọc/Tìm kiếm**        | Không                         | Có (theo trạng thái, ngày, khách hàng)                |
| **Lịch sử thanh toán**     | Xem của mình                  | Xem tất cả + thông tin người xác nhận                 |
| **Xuất PDF**               | Chỉ hóa đơn của mình          | Bất kỳ hóa đơn nào + gửi email                        |
| **Quyền truy cập**         | Khách hàng                    | Nhân viên/Admin                                       |
| **Ghi log**                | Không                         | Có (tất cả hành động)                                 |
| **Entry point**            | Menu "Hóa đơn của tôi"        | Menu "Quản lý hóa đơn" HOẶC từ UC 49 (Chi tiết phiếu) |

### Luồng nghiệp vụ liên quan

**Luồng xác nhận thanh toán điển hình:**

1. Khách hàng đặt tiệc (UC 41) → Tạo phiếu đặt với trạng thái "Chờ duyệt"
2. Nhân viên duyệt phiếu đặt (UC 47 cũ - nay đã bỏ) → Trạng thái "Đã duyệt", tạo hóa đơn
3. Khách hàng thanh toán trực tiếp tại quầy (tiền mặt/chuyển khoản)
4. Nhân viên xem danh sách hóa đơn (UC 54) → Tìm hóa đơn của khách
5. Nhân viên xác nhận thanh toán (UC 55) → Nhập số tiền, hệ thống tự động tính phạt (nếu trễ)
6. Hệ thống cập nhật TienConLai, TienPhat
7. Hệ thống gửi email xác nhận cho khách hàng
8. Nhân viên xuất PDF (UC 56) → In biên lai hoặc gửi email cho khách

**Luồng theo dõi công nợ:**

1. Admin xem báo cáo công nợ (UC 57 - Xem biểu đồ doanh thu)
2. Admin lọc các phiếu đặt có công nợ lớn hoặc quá hạn (UC 54)
3. Admin gửi nhắc nhở khách hàng (email, điện thoại)
4. Khách hàng thanh toán → Nhân viên xác nhận (UC 55)

---

## Tài liệu tham khảo / References

- **Database Schema**: `docs/docs/database/db.md`
- **Master Use Case List**: `Danh sách sơ đồ đề tài hệ thống quản lý tiệc cưới - formatted.md`
- **Business Requirements Document**: `Báo-cáo-đồ-án-cuối-kỳ_1.pdf`
- **Customer Payment & Invoice**: `docs/docs/activity for wedding management system/customer-payment/ucs-customer-payment.md`
- **Staff Booking Management**: `docs/docs/activity for wedding management system/manage-bookings/ucs-manage-bookings.md`
- **View Any Booking Details (UC 49)**: Entry point to UC 54

---

**Ngày tạo**: 22/11/2025  
**Phiên bản**: 1.0  
**Người tạo**: GitHub Copilot
