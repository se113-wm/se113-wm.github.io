# Use Case Specifications - Hóa đơn & Thanh toán (Khách hàng) / Customer Payment & Invoice

## Nhóm chức năng: Hóa đơn & Thanh toán - Khách hàng / Customer Payment & Invoice

---

## UC 51: Xem hóa đơn của tôi & Công nợ / View My Invoice & Debt

### Mô tả ngắn gọn / Brief Description

Khách hàng xem thông tin hóa đơn và công nợ của các phiếu đặt tiệc của mình.

Customer views invoice information and debt for their wedding bookings.

### Tác nhân / Actors

- **Khách hàng** / Customer (Primary)

### Tiền điều kiện / Preconditions

1. Khách hàng đã đăng nhập vào hệ thống
2. Khách hàng có ít nhất một phiếu đặt tiệc trong hệ thống
3. Phiếu đặt đã được duyệt (có hóa đơn)

### Hậu điều kiện / Postconditions

**Thành công:**

- Hiển thị danh sách hóa đơn của khách hàng
- Hiển thị chi tiết hóa đơn được chọn
- Hiển thị thông tin công nợ (tiền còn lại)

**Thất bại:**

- Không tìm thấy hóa đơn nào
- Hiển thị thông báo lỗi

### Luồng sự kiện chính / Main Flow

1. Khách hàng chọn chức năng "Hóa đơn của tôi"
2. Hệ thống truy vấn danh sách hóa đơn của khách hàng từ PHIEUDATTIEC
3. Hệ thống hiển thị danh sách hóa đơn
4. Khách hàng chọn hóa đơn muốn xem chi tiết
5. Hệ thống truy vấn chi tiết hóa đơn từ PHIEUDATTIEC, THUCDON, CHITIETDV, SANH, CA
6. Hệ thống hiển thị thông tin chi tiết hóa đơn
7. Khách hàng xem thông tin hóa đơn và công nợ
8. Use case kết thúc

### Luồng thay thế / Alternative Flows

**3a. Không có hóa đơn nào**

- 3a1. Hệ thống không tìm thấy hóa đơn nào
- 3a2. Hiển thị thông báo "Bạn chưa có hóa đơn nào"
- 3a3. Khách hàng xem thông báo
- 3a4. Use case kết thúc

**6a. Lỗi khi truy vấn chi tiết**

- 6a1. Hệ thống gặp lỗi database
- 6a2. Hiển thị thông báo lỗi "Không thể tải chi tiết hóa đơn"
- 6a3. Khách hàng xác nhận
- 6a4. Use case kết thúc

### Luồng ngoại lệ / Exception Flows

**E1. Khách hàng quay lại danh sách**

- E1.1. Khách hàng nhấn nút "Quay lại"
- E1.2. Quay về danh sách hóa đơn
- E1.3. Use case kết thúc

### Yêu cầu đặc biệt / Special Requirements

- Hiển thị rõ ràng trạng thái thanh toán (Chưa thanh toán / Đã thanh toán một phần / Đã thanh toán đủ)
- Highlight công nợ còn lại bằng màu sắc phù hợp
- Hiển thị lịch sử thanh toán (nếu có)
- Cho phép lọc theo trạng thái thanh toán

### Các yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Tải danh sách hóa đơn < 2 giây
- **Usability**: Giao diện rõ ràng, dễ hiểu
- **Security**: Chỉ hiển thị hóa đơn của chính khách hàng

### Quy tắc nghiệp vụ / Business Rules

- **BR1**: Khách hàng chỉ xem được hóa đơn của phiếu đặt của mình
- **BR2**: Chỉ phiếu đặt đã được duyệt mới có hóa đơn
- **BR3**: Công nợ = TongTienHoaDon - TienDatCoc - TienDaThanhToan
- **BR4**: Hiển thị cảnh báo nếu quá hạn thanh toán (NgayDaiTiec - 3 ngày)

---

## UC 52: Thanh toán hóa đơn của tôi (Đặt cọc/Toàn bộ) / Pay My Invoice

### Mô tả ngắn gọn / Brief Description

Khách hàng thanh toán tiền đặt cọc hoặc toàn bộ hóa đơn cho phiếu đặt tiệc của mình.

Customer pays deposit or full amount for their wedding booking invoice.

### Tác nhân / Actors

- **Khách hàng** / Customer (Primary)

### Tiền điều kiện / Preconditions

1. Khách hàng đã đăng nhập vào hệ thống
2. Khách hàng có phiếu đặt đã được duyệt
3. Hóa đơn chưa được thanh toán đầy đủ (TienConLai > 0)

### Hậu điều kiện / Postconditions

**Thành công:**

- Cập nhật thông tin thanh toán trong PHIEUDATTIEC
- Cập nhật TienConLai
- Cập nhật NgayThanhToan (nếu thanh toán đủ)
- Gửi email xác nhận thanh toán
- Hiển thị thông báo thành công

**Thất bại:**

- Không cập nhật thông tin thanh toán
- Hiển thị thông báo lỗi

### Luồng sự kiện chính / Main Flow

1. Khách hàng xem chi tiết hóa đơn (UC 51)
2. Hệ thống hiển thị nút "Thanh toán" (nếu TienConLai > 0)
3. Khách hàng nhấn nút "Thanh toán"
4. Hệ thống hiển thị thông tin thanh toán
5. Khách hàng chọn phương thức thanh toán
6. Khách hàng nhập số tiền thanh toán
7. Hệ thống kiểm tra số tiền hợp lệ
8. Khách hàng xác nhận thanh toán
9. Hệ thống chuyển hướng đến cổng thanh toán
10. Khách hàng thực hiện thanh toán qua cổng thanh toán
11. Hệ thống nhận kết quả thanh toán từ cổng thanh toán
12. Hệ thống cập nhật PHIEUDATTIEC
13. Hệ thống gửi email xác nhận thanh toán
14. Hệ thống hiển thị thông báo "Thanh toán thành công"
15. Khách hàng xem thông tin thanh toán đã cập nhật
16. Use case kết thúc thành công

### Luồng thay thế / Alternative Flows

**7a. Số tiền không hợp lệ**

- 7a1. Số tiền < 0 hoặc số tiền > TienConLai
- 7a2. Hiển thị thông báo lỗi "Số tiền thanh toán không hợp lệ"
- 7a3. Quay lại bước 6

**11a. Thanh toán thất bại**

- 11a1. Cổng thanh toán trả về kết quả thất bại
- 11a2. Hiển thị thông báo "Thanh toán thất bại. Vui lòng thử lại"
- 11a3. Quay lại bước 4

**11b. Thanh toán bị hủy**

- 11b1. Khách hàng hủy thanh toán trên cổng thanh toán
- 11b2. Hiển thị thông báo "Bạn đã hủy thanh toán"
- 11b3. Quay lại bước 4

**12a. Lỗi khi cập nhật**

- 12a1. Hệ thống gặp lỗi database
- 12a2. Rollback transaction
- 12a3. Hiển thị thông báo lỗi "Có lỗi xảy ra. Vui lòng liên hệ hỗ trợ"
- 12a4. Use case kết thúc thất bại

**13a. Lỗi gửi email**

- 13a1. Không thể gửi email xác nhận
- 13a2. Ghi log lỗi
- 13a3. Tiếp tục hiển thị thông báo thành công
- 13a4. Tiếp tục bước 14

### Luồng ngoại lệ / Exception Flows

**E1. Khách hàng hủy thanh toán**

- E1.1. Khách hàng nhấn nút "Hủy" ở bước 6-8
- E1.2. Hệ thống xác nhận "Bạn có chắc muốn hủy?"
- E1.3. Nếu xác nhận, quay về chi tiết hóa đơn
- E1.4. Use case kết thúc

### Yêu cầu đặc biệt / Special Requirements

- Tích hợp với cổng thanh toán trực tuyến (VNPay, Momo, ZaloPay, etc.)
- Hỗ trợ thanh toán một phần hoặc toàn bộ
- Lưu lịch sử thanh toán
- Mã hóa thông tin thanh toán
- Timeout thanh toán: 15 phút

### Các yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Xử lý thanh toán < 5 giây (không kể thời gian cổng thanh toán)
- **Security**: Sử dụng HTTPS, mã hóa dữ liệu thanh toán
- **Reliability**: Đảm bảo tính toàn vẹn giao dịch (transaction)
- **Usability**: Quy trình thanh toán đơn giản, dễ hiểu

### Quy tắc nghiệp vụ / Business Rules

- **BR1**: Số tiền thanh toán phải > 0 và ≤ TienConLai
- **BR2**: Sau khi thanh toán, cập nhật: TienConLai = TienConLai - SoTienThanhToan
- **BR3**: Nếu TienConLai = 0 sau thanh toán, cập nhật NgayThanhToan = ngày hiện tại
- **BR4**: Lưu lại lịch sử thanh toán (timestamp, số tiền, phương thức)
- **BR5**: Gửi email xác nhận ngay sau khi thanh toán thành công

---

## UC 53: Xuất hóa đơn của tôi ra PDF / Export My Invoice to PDF

### Mô tả ngắn gọn / Brief Description

Khách hàng xuất hóa đơn của phiếu đặt tiệc ra file PDF để lưu trữ hoặc in ấn.

Customer exports their wedding booking invoice to PDF file for storage or printing.

### Tác nhân / Actors

- **Khách hàng** / Customer (Primary)

### Tiền điều kiện / Preconditions

1. Khách hàng đã đăng nhập vào hệ thống
2. Khách hàng có phiếu đặt đã được duyệt
3. Hóa đơn đã tồn tại

### Hậu điều kiện / Postconditions

**Thành công:**

- Tạo file PDF chứa thông tin hóa đơn
- Tải file PDF về máy khách hàng
- Hiển thị thông báo thành công

**Thất bại:**

- Không tạo được file PDF
- Hiển thị thông báo lỗi

### Luồng sự kiện chính / Main Flow

1. Khách hàng xem chi tiết hóa đơn (UC 51)
2. Hệ thống hiển thị nút "Xuất PDF"
3. Khách hàng nhấn nút "Xuất PDF"
4. Hệ thống truy vấn đầy đủ thông tin hóa đơn từ PHIEUDATTIEC, THUCDON, CHITIETDV, SANH, CA
5. Hệ thống tạo file PDF với nội dung hóa đơn
6. Hệ thống tải file PDF về máy khách hàng
7. Hệ thống hiển thị thông báo "Xuất PDF thành công"
8. Khách hàng xem file PDF đã tải
9. Use case kết thúc thành công

### Luồng thay thế / Alternative Flows

**5a. Lỗi khi tạo PDF**

- 5a1. Hệ thống không thể tạo file PDF
- 5a2. Hiển thị thông báo lỗi "Không thể tạo file PDF. Vui lòng thử lại"
- 5a3. Use case kết thúc thất bại

**6a. Lỗi khi tải file**

- 6a1. Không thể tải file về máy khách hàng
- 6a2. Hiển thị thông báo "Không thể tải file. Vui lòng kiểm tra kết nối"
- 6a3. Use case kết thúc thất bại

### Luồng ngoại lệ / Exception Flows

**E1. Khách hàng hủy xuất PDF**

- E1.1. Khách hàng đóng dialog hoặc nhấn ESC
- E1.2. Hủy quá trình xuất PDF
- E1.3. Use case kết thúc

### Yêu cầu đặc biệt / Special Requirements

- File PDF phải chứa đầy đủ thông tin hóa đơn:
  - Logo và thông tin công ty
  - Thông tin khách hàng (tên chú rể, cô dâu, SĐT)
  - Thông tin đại tiệc (ngày, ca, sảnh)
  - Bảng thực đơn với số lượng và đơn giá
  - Bảng dịch vụ với số lượng và đơn giá
  - Tổng tiền bàn, tổng tiền dịch vụ, tổng hóa đơn
  - Tiền đặt cọc, tiền đã thanh toán, tiền còn lại
  - Ngày xuất hóa đơn
- Định dạng PDF chuẩn, dễ in
- Tên file: `HoaDon_[MaPhieuDat]_[NgayXuat].pdf`

### Các yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Tạo và tải file PDF < 5 giây
- **Usability**: File PDF dễ đọc, dễ in
- **Compatibility**: File PDF tương thích với các trình đọc PDF phổ biến

### Quy tắc nghiệp vụ / Business Rules

- **BR1**: Chỉ xuất PDF cho hóa đơn của phiếu đặt đã được duyệt
- **BR2**: File PDF phải chứa đầy đủ thông tin chi tiết
- **BR3**: Ghi log mỗi lần xuất PDF (ai, khi nào, phiếu đặt nào)

---

## Tổng kết nhóm chức năng / Summary

Nhóm chức năng **Hóa đơn & Thanh toán (Khách hàng)** bao gồm 3 use case chính:

1. **UC 51**: Xem hóa đơn của tôi & Công nợ - Xem danh sách và chi tiết hóa đơn
2. **UC 52**: Thanh toán hóa đơn của tôi - Thanh toán tiền đặt cọc hoặc toàn bộ
3. **UC 53**: Xuất hóa đơn của tôi ra PDF - Tải file PDF hóa đơn

### Bảng CRUD tương ứng

| Use Case | PHIEUDATTIEC | THUCDON | CHITIETDV | SANH | CA  | NGUOIDUNG |
| -------- | ------------ | ------- | --------- | ---- | --- | --------- |
| UC 51    | R            | R       | R         | R    | R   | -         |
| UC 52    | U            | -       | -         | -    | -   | -         |
| UC 53    | R            | R       | R         | R    | R   | -         |

### Lưu ý quan trọng

- Tất cả use case trong nhóm này dành cho **Khách hàng**
- Khách hàng chỉ xem và thanh toán **hóa đơn của chính mình**
- Tích hợp với **cổng thanh toán** trực tuyến (VNPay, Momo, ZaloPay)
- Sử dụng **transaction** để đảm bảo tính toàn vẹn dữ liệu thanh toán
- **Gửi email** xác nhận sau mỗi giao dịch thanh toán
- **Bảo mật** thông tin thanh toán (HTTPS, mã hóa)

### Luồng nghiệp vụ liên quan

**Luồng thanh toán điển hình:**

1. Khách hàng đặt tiệc (UC 41) → Tạo phiếu đặt với trạng thái "Chờ duyệt"
2. Staff duyệt phiếu đặt → Trạng thái "Đã duyệt", tạo hóa đơn
3. Khách hàng xem hóa đơn (UC 51) → Xem công nợ
4. Khách hàng thanh toán (UC 52) → Cập nhật TienConLai
5. Khách hàng xuất PDF (UC 53) → Lưu trữ hóa đơn

**Thời điểm thanh toán:**

- **Đặt cọc**: Sau khi phiếu đặt được duyệt
- **Thanh toán toàn bộ**: Trước ngày đại tiệc (khuyến nghị 3-7 ngày)
- **Thanh toán bổ sung**: Nếu có chi phí phát sinh

---

## Tài liệu tham khảo / References

- **Database Schema**: `docs/docs/database/db.md`
- **Master Use Case List**: `Danh sách sơ đồ đề tài hệ thống quản lý tiệc cưới - formatted.md`
- **Business Requirements Document**: `Báo-cáo-đồ-án-cuối-kỳ_1.pdf`
- **Customer Booking Operations**: `docs/docs/activity for wedding management system/manage-customer-bookings/ucs-manage-customer-bookings.md`
- **Staff Booking Management**: `docs/docs/activity for wedding management system/manage-bookings/ucs-manage-bookings.md`

---

**Ngày tạo**: 22/11/2025  
**Phiên bản**: 1.0  
**Người tạo**: GitHub Copilot
