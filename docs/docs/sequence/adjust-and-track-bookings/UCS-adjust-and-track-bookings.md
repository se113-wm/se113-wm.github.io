# ĐẶC TẢ CÁC USE CASE - ADJUST AND TRACK BOOKINGS

Tài liệu này mô tả các use case thuộc nhóm điều chỉnh và theo dõi Đặt chỗ (Tour_Booking) dành cho Nhân viên/Quản trị.

Gồm 6 use case chính, tương ứng với các sơ đồ sequence trong thư mục này:

1. View and Filter Bookings (Xem và lọc đặt chỗ)
2. View Booking Details (Xem chi tiết đặt chỗ)
3. View Booking's Invoice (Xem hóa đơn đặt chỗ)
4. Add New Booking (Thêm đặt chỗ mới)
5. Edit Pre-departure Booking (Chỉnh sửa đặt chỗ trước ngày khởi hành)
6. Delete Booking (Xóa đặt chỗ)

---

## UC_ATB_01: View and Filter Bookings (Xem và lọc đặt chỗ)

### Mô tả

Nhân viên/Quản trị xem danh sách đặt chỗ và lọc theo nhiều tiêu chí (trạng thái, khách hàng, tuyến/chuyến, thời gian, tình trạng thanh toán).

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin

### Điều kiện hậu

- Hiển thị danh sách đặt chỗ theo tiêu chí lọc với thông tin tổng quan

### Luồng sự kiện chính

| Bước | Staff/Admin                    | Hệ thống                                                                         |
| ---- | ------------------------------ | -------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "View Bookings" |                                                                                  |
| 2    |                                | Truy vấn danh sách đặt chỗ với thông tin liên quan                               |
| 3    |                                | Hiển thị danh sách với: khách hàng, chuyến đi, ngày, số ghế, giá, trạng thái     |
| 4    | Nhập tiêu chí lọc (tùy chọn)   |                                                                                  |
| 5    | Click "Áp dụng"                |                                                                                  |
| 6    |                                | Truy vấn với tiêu chí lọc (trạng thái, thanh toán, khách hàng, tuyến, ngày, giá) |
| 7    |                                | Hiển thị kết quả theo tiêu chí                                                   |
| 8    | Xem kết quả                    |                                                                                  |

### Luồng sự kiện phụ

- 2a. Không có đặt chỗ: hiển thị "Chưa có đặt chỗ nào"
- 6a. Không có kết quả: hiển thị "Không tìm thấy kết quả phù hợp"

### Ràng buộc nghiệp vụ

- Hỗ trợ phân trang cho danh sách lớn
- Có thể sắp xếp theo ngày đặt, ngày khởi hành, tổng tiền

---

## UC_ATB_02: View Booking Details (Xem chi tiết đặt chỗ)

### Mô tả

Xem đầy đủ thông tin đặt chỗ bao gồm khách hàng, chuyến đi, hành khách và hóa đơn.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Booking tồn tại

### Điều kiện hậu

- Hiển thị chi tiết đầy đủ của đặt chỗ

### Luồng sự kiện chính

| Bước | Staff/Admin                                      | Hệ thống                                                    |
| ---- | ------------------------------------------------ | ----------------------------------------------------------- |
| 1    | Tại danh sách, click "Xem chi tiết" trên booking |                                                             |
| 2    |                                                  | Truy vấn chi tiết đặt chỗ                                   |
| 3    |                                                  | Hiển thị thông tin: booking, chuyến đi, khách hàng, hóa đơn |
| 4    | Xem thông tin                                    |                                                             |

### Luồng sự kiện phụ

- 2a. Booking không tồn tại: hiển thị "Không tìm thấy đặt chỗ"

---

## UC_ATB_03: View Booking's Invoice (Xem hóa đơn đặt chỗ)

### Mô tả

Xem hóa đơn của một đặt chỗ và tình trạng thanh toán.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Booking tồn tại

### Điều kiện hậu

- Hiển thị hóa đơn với tình trạng thanh toán

### Luồng sự kiện chính

| Bước | Staff/Admin                          | Hệ thống                                                |
| ---- | ------------------------------------ | ------------------------------------------------------- |
| 1    | Tại chi tiết booking, chọn "Invoice" |                                                         |
| 2    |                                      | Truy vấn thông tin hóa đơn                              |
| 3    |                                      | Hiển thị: tổng tiền, trạng thái thanh toán, phương thức |
| 4    | Xem hóa đơn                          |                                                         |

### Luồng sự kiện phụ

- 2a. Chưa có hóa đơn: hiển thị "Chưa có hóa đơn cho đặt chỗ này"

---

## UC_ATB_04: Add New Booking (Thêm đặt chỗ mới)

### Mô tả

Nhân viên tạo đặt chỗ cho khách hàng.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Chuyến đi khả dụng
- Khách hàng hợp lệ

### Điều kiện hậu

- Tạo thành công đặt chỗ mới

### Luồng sự kiện chính

| Bước | Staff/Admin                   | Hệ thống                      |
| ---- | ----------------------------- | ----------------------------- |
| 1    | Chọn "Add Booking"            |                               |
| 2    |                               | Hiển thị form nhập thông tin  |
| 3    | Nhập thông tin và click "Lưu" |                               |
| 4    |                               | Kiểm tra dữ liệu hợp lệ       |
| 5    |                               | Kiểm tra số chỗ còn trống     |
| 6    |                               | Tạo đặt chỗ mới               |
| 7    |                               | Hiển thị thông báo thành công |
| 8    | Xem kết quả                   |                               |

### Luồng sự kiện phụ

- 4a. Dữ liệu không hợp lệ: hiển thị lỗi chi tiết
- 5a. Không đủ chỗ: hiển thị "Không đủ chỗ trống"

### Ràng buộc nghiệp vụ

- Chuyến đi phải ở trạng thái SCHEDULED
- Ngày khởi hành phải trong tương lai
- Số ghế yêu cầu phải <= số chỗ còn trống

---

## UC_ATB_05: Edit Pre-departure Booking (Chỉnh sửa đặt chỗ trước ngày khởi hành)

### Mô tả

Chỉnh sửa thông tin đặt chỗ trước hạn chốt.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Booking tồn tại
- Còn trước hạn chốt (≥ 3 ngày trước khởi hành)
- Chưa thanh toán đủ

### Điều kiện hậu

- Cập nhật thông tin đặt chỗ thành công

### Luồng sự kiện chính

| Bước | Staff/Admin                       | Hệ thống                              |
| ---- | --------------------------------- | ------------------------------------- |
| 1    | Tại chi tiết booking, chọn "Edit" |                                       |
| 2    |                                   | Kiểm tra điều kiện cho phép chỉnh sửa |
| 3    |                                   | Hiển thị form với dữ liệu hiện tại    |
| 4    | Sửa thông tin và click "Lưu"      |                                       |
| 5    |                                   | Kiểm tra dữ liệu hợp lệ               |
| 6    |                                   | Cập nhật thông tin booking            |
| 7    |                                   | Hiển thị thông báo thành công         |
| 8    | Xem kết quả                       |                                       |

### Luồng sự kiện phụ

- 2a. Quá hạn chốt: chặn chỉnh sửa, hiển thị lý do
- 5a. Dữ liệu không hợp lệ: hiển thị lỗi

### Ràng buộc nghiệp vụ

- Chỉ cho phép sửa nếu còn trước deadline
- Nếu tăng số ghế, kiểm tra số chỗ còn trống

---

## UC_ATB_06: Delete Booking (Xóa đặt chỗ)

### Mô tả

Xóa đặt chỗ khỏi hệ thống khi đủ điều kiện.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Booking tồn tại
- Trạng thái = PENDING
- Chưa thanh toán
- Còn trước hạn chốt

### Điều kiện hậu

- Xóa đặt chỗ và cập nhật số ghế

### Luồng sự kiện chính

| Bước | Staff/Admin                         | Hệ thống                      |
| ---- | ----------------------------------- | ----------------------------- |
| 1    | Tại chi tiết booking, chọn "Delete" |                               |
| 2    |                                     | Kiểm tra điều kiện xóa        |
| 3    |                                     | Hiển thị xác nhận             |
| 4    | Xác nhận xóa                        |                               |
| 5    |                                     | Xóa đặt chỗ                   |
| 6    |                                     | Hiển thị thông báo thành công |
| 7    | Xem kết quả                         |                               |

### Luồng sự kiện phụ

- 2a. Không thỏa điều kiện: chặn xóa, gợi ý dùng "Cancel Booking"

### Ràng buộc nghiệp vụ

- Chỉ xóa được booking chưa thanh toán
- Xóa sẽ giải phóng số chỗ đã đặt

---

## UC_ATB_02: View Booking Details (Xem chi tiết đặt chỗ)

### Mô tả

Xem đầy đủ thông tin đặt chỗ, bao gồm khách hàng, chuyến đi, số ghế, tổng tiền, trạng thái, danh sách hành khách và hóa đơn.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Booking tồn tại

### Điều kiện hậu

- Hiển thị chi tiết đặt chỗ cùng các thực thể liên quan

### Luồng sự kiện chính

| Bước | Staff/Admin                                      | Hệ thống                                                                                                                                                                                                                                                                                         |
| ---- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Tại danh sách, click "Xem chi tiết" trên booking |                                                                                                                                                                                                                                                                                                  |
| 2    |                                                  | Truy vấn chi tiết: <br>`SELECT b.*, u.full_name, u.email, t.departure_date, t.return_date, t.price, r.name AS route_name FROM Tour_Booking b` <br>`JOIN User u ON b.user_id = u.id` <br>`JOIN Trip t ON b.trip_id = t.id` <br>`JOIN Route r ON t.route_id = r.id` <br>`WHERE b.id = :booking_id` |
| 3    |                                                  | Truy vấn danh sách hành khách: <br>`SELECT * FROM Booking_Traveler WHERE booking_id = :booking_id ORDER BY id`                                                                                                                                                                                   |
| 4    |                                                  | Truy vấn hóa đơn (nếu có): <br>`SELECT * FROM Invoice WHERE booking_id = :booking_id`                                                                                                                                                                                                            |
| 5    |                                                  | Hiển thị trang chi tiết với: thông tin booking, tuyến/chuyến, khách hàng, seats_booked, total_price, status, payment_status, danh sách hành khách, hành động liên quan (Xem hóa đơn, Chỉnh sửa, Xóa)                                                                                             |
| 6    | Xem thông tin                                    |                                                                                                                                                                                                                                                                                                  |

### Luồng sự kiện phụ

- 2a. Booking không tồn tại: hiển thị "Không tìm thấy đặt chỗ" và dừng

### Ràng buộc nghiệp vụ/SQL gợi ý

- Có thể hiển thị thêm tiến trình trạng thái (PENDING→CONFIRMED→COMPLETED/ CANCELED)
- Tính lại số chỗ còn trống của Trip để hiển thị (tham khảo Trip.total_seats - booked_seats)

---

## UC_ATB_03: View Booking's Invoice (Xem hóa đơn đặt chỗ)

### Mô tả

Xem hóa đơn của một đặt chỗ, tình trạng thanh toán và phương thức thanh toán.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Booking tồn tại

### Điều kiện hậu

- Hiển thị hóa đơn (nếu có) với tình trạng thanh toán hiện tại

### Luồng sự kiện chính

| Bước | Staff/Admin                          | Hệ thống                                                                                                                                |
| ---- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Tại chi tiết booking, chọn "Invoice" |                                                                                                                                         |
| 2    |                                      | Truy vấn hóa đơn: <br>`SELECT * FROM Invoice WHERE booking_id = :booking_id`                                                            |
| 3    |                                      | Hiển thị hóa đơn với các thông tin: total_amount, payment_status (UNPAID/PAID/REFUNDED), payment_method; hiển thị nút tải/ in (nếu cần) |
| 4    | Xem hóa đơn                          |                                                                                                                                         |

### Luồng sự kiện phụ

- 2a. Chưa có hóa đơn: hiển thị "Chưa có hóa đơn cho đặt chỗ này" (trường hợp ngoại lệ hiếm gặp nếu tạo booking lỗi)

### Ràng buộc nghiệp vụ/SQL gợi ý

- Nếu có tích hợp cổng thanh toán, hiển thị thêm lịch sử giao dịch (ngoài phạm vi schema hiện tại)

---

## UC_ATB_04: Add New Booking (Thêm đặt chỗ mới)

Lưu ý: UC này tương tự logic UC_TRIP_06 (Add New Booking for Trip) nhưng đặt trong nhóm Adjust & Track Bookings để phục vụ quy trình tác nghiệp của Staff/Admin.

### Mô tả

Nhân viên tạo đặt chỗ cho khách hàng từ màn hình quản lý booking hoặc từ chi tiết chuyến đi.

### Tác nhân chính

- Staff
- Admin (tùy chính sách)

### Điều kiện tiên quyết

- Trip tồn tại và `status = 'SCHEDULED'`
- Chuyến chưa khởi hành (ví dụ: `departure_date ≥ today + 2 ngày` theo chính sách)
- Khách hàng (User.role = CUSTOMER) tồn tại và không bị khóa (`is_lock = false`)

### Điều kiện hậu

- Tạo bản ghi Tour_Booking, Tour_Booking_Detail và Invoice; cập nhật Trip.booked_seats

### Luồng sự kiện chính

| Bước | Staff/Admin                 | Hệ thống                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Add Booking"          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 2    |                             | Hiển thị form: chọn khách hàng (tìm theo email/phone hoặc nhập user_id), nhập `no_adults`, `no_children`, (tùy chọn) danh sách hành khách, phương thức thanh toán (nếu thu tiền ngay)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 3    | Nhập dữ liệu và click "Lưu" |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 4    |                             | Kiểm tra hợp lệ: Trip.status = 'SCHEDULED'; departure_date hợp lệ; user_id tồn tại và hợp lệ; `seats_requested = no_adults + no_children > 0`; `seats_available = total_seats - booked_seats ≥ seats_requested`; (nếu cung cấp) số hành khách khớp tổng số ghế                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 5    |                             | Bắt đầu transaction: <br>1) Khóa hàng Trip để chống overbooking: <br>`SELECT total_seats, booked_seats, price, departure_date, status FROM Trip WHERE id=:trip_id FOR UPDATE` <br>2) Tính `total_price = price * seats_requested` (theo chính sách) <br>3) Tạo booking: <br>`INSERT INTO Tour_Booking (trip_id, user_id, seats_booked, total_price, status) VALUES (:trip_id, :user_id, :seats, :total_price, 'PENDING') RETURNING id` <br>4) Tạo chi tiết: <br>`INSERT INTO Tour_Booking_Detail (booking_id, no_adults, no_children) VALUES (:booking_id, :adults, :children)` <br>5) (Tùy chọn) chèn Booking_Traveler cho từng hành khách <br>6) Cập nhật số chỗ: <br>`UPDATE Trip SET booked_seats = booked_seats + :seats WHERE id=:trip_id` <br>7) Tạo hóa đơn: <br>`INSERT INTO Invoice (booking_id, total_amount, payment_status, payment_method) VALUES (:booking_id, :total_price, 'UNPAID', :payment_method)` <br>Commit |
| 6    |                             | Hiển thị thông báo thành công và điều hướng đến chi tiết booking                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 7    | Xem kết quả                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

### Luồng sự kiện phụ

- 4a. Trip không ở trạng thái SCHEDULED hoặc đã/ sắp khởi hành: báo lỗi và dừng
- 4b. Khách hàng không tồn tại/đang bị khóa: báo lỗi
- 4c. Không đủ chỗ: `seats_available < seats_requested` → báo lỗi "Không đủ chỗ"
- 5a. Lỗi DB/transaction: rollback và báo lỗi chung
- 5b. Thu tiền ngay thất bại/ngoài hệ thống: giữ Invoice ở trạng thái UNPAID và hiển thị hướng dẫn thanh toán sau

### Ràng buộc nghiệp vụ/SQL gợi ý

- Nên dùng `FOR UPDATE` khi đọc Trip để tránh overbooking trong môi trường đồng thời
- Trạng thái khởi tạo của booking là 'PENDING'; có thể chuyển 'CONFIRMED' khi đáp ứng điều kiện thanh toán theo chính sách (xem UC_ATB_06)
- Có thể cho phép nhập danh sách hành khách sau (trước hạn chốt), cần khớp `seats_booked`

---

## UC_ATB_05: Edit Pre-departure Booking (Chỉnh sửa đặt chỗ trước ngày khởi hành)

### Mô tả

Chỉnh sửa số lượng ghế và/thông tin hành khách của một đặt chỗ trước hạn chốt (ví dụ: trước ngày khởi hành 3 ngày), đồng bộ lại tổng tiền và số ghế trên Trip.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Booking tồn tại
- Chuyến chưa khởi hành; còn trước hạn chốt chỉnh sửa (ví dụ: ≥ 3 ngày trước `departure_date`)
- Hóa đơn chưa thanh toán đủ (Invoice.payment_status ≠ 'PAID') theo chính sách hiện tại của hệ thống

### Điều kiện hậu

- Cập nhật Tour_Booking, Tour_Booking_Detail, (tùy chọn) Booking_Traveler; đồng bộ Trip.booked_seats và Invoice.total_amount

### Luồng sự kiện chính

| Bước | Staff/Admin                          | Hệ thống                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Tại chi tiết booking, chọn "Edit"    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 2    |                                      | Truy vấn dữ liệu hiện tại: booking, detail, travelers; hiển thị form với `no_adults`, `no_children`, danh sách hành khách                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 3    | Sửa số lượng/chi tiết và click "Lưu" |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 4    |                                      | Kiểm tra hợp lệ: tổng ghế > 0; thông tin hành khách đầy đủ; (nếu tăng ghế) kiểm tra `available = Trip.total_seats - Trip.booked_seats ≥ delta_seats`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 5    |                                      | Bắt đầu transaction: <br>1) Khóa `Trip` và (tùy chọn) khóa `Tour_Booking` để tính chính xác: <br>`SELECT total_seats, booked_seats, price, departure_date, status FROM Trip WHERE id=:trip_id FOR UPDATE` <br>`SELECT seats_booked FROM Tour_Booking WHERE id=:booking_id FOR UPDATE` <br>2) Tính `delta = seats_new - seats_old` <br>3) Nếu `delta > 0` và `available < delta` → rollback, báo lỗi <br>4) Cập nhật booking & detail: <br>`UPDATE Tour_Booking SET seats_booked=:seats_new, total_price=:price* :seats_new WHERE id=:booking_id` <br>`UPDATE Tour_Booking_Detail SET no_adults=:adults, no_children=:children WHERE booking_id=:booking_id` <br>5) Đồng bộ danh sách hành khách: xóa thừa/ thêm thiếu theo số ghế mới (nếu nhập chi tiết) <br>6) Cập nhật Trip: <br>`UPDATE Trip SET booked_seats = booked_seats + :delta WHERE id=:trip_id` <br>7) Cập nhật hóa đơn: <br>`UPDATE Invoice SET total_amount = :price * :seats_new WHERE booking_id=:booking_id` <br>Commit |
| 6    |                                      | Hiển thị thông báo thành công và quay lại chi tiết booking                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 7    | Xem kết quả                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

### Luồng sự kiện phụ

- 2a. Quá hạn chốt/Trip sắp khởi hành: chặn chỉnh sửa, hiển thị lý do
- 2b. Invoice đã PAID (đã thanh toán đủ): chặn chỉnh sửa; gợi ý tạo yêu cầu hoàn tiền/điều chỉnh (ngoài phạm vi schema hiện tại)
- 4a. Dữ liệu không hợp lệ: hiển thị lỗi chi tiết và giữ nguyên dữ liệu nhập
- 5a. Lỗi DB/transaction: rollback và báo lỗi chung

### Ràng buộc nghiệp vụ/SQL gợi ý

- Dùng `FOR UPDATE` trên `Trip` và `Tour_Booking` khi tính `delta`
- Nếu phát sinh hoàn/thu thêm do thay đổi số ghế khi đã cọc một phần, cần cơ chế thanh toán/hoàn tiền chi tiết hơn (ngoài phạm vi bảng hiện có)

---

## UC_ATB_06: Cancel Booking (Hủy đặt chỗ)

### Mô tả

Hủy một đặt chỗ bằng cách chuyển trạng thái sang CANCELED (soft delete), giải phóng số ghế đã đặt.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Booking tồn tại
- `Tour_Booking.status IN ('PENDING', 'CONFIRMED')`
- Chưa qua hạn chốt (ví dụ: ≥ 3 ngày trước `departure_date`)

### Điều kiện hậu

- Cập nhật `Tour_Booking.status = 'CANCELED'`
- Cập nhật `Trip.booked_seats` giảm tương ứng
- Nếu đã thanh toán: Cập nhật `Invoice.payment_status = 'REFUNDED'`

### Luồng sự kiện chính

| Bước | Staff/Admin                         | Hệ thống                                        |
| ---- | ----------------------------------- | ----------------------------------------------- |
| 1    | Tại chi tiết booking, chọn "Cancel" |                                                 |
| 2    |                                     | Kiểm tra điều kiện hủy                          |
| 3    |                                     | Hiển thị xác nhận hủy                           |
| 4    | Xác nhận hủy                        |                                                 |
| 5    |                                     | Hủy đặt chỗ (chuyển status = CANCELED)          |
| 6    |                                     | Cập nhật số ghế đã đặt của chuyến               |
| 7    |                                     | Cập nhật trạng thái hóa đơn (nếu đã thanh toán) |
| 8    |                                     | Hiển thị thông báo thành công                   |
| 9    | Xem kết quả                         |                                                 |

### Luồng sự kiện phụ

- 2a. Không thỏa điều kiện hủy (quá hạn chốt/đã hủy/đã hoàn thành): chặn thao tác, hiển thị lý do
- 5a. Lỗi khi cập nhật: rollback và báo lỗi

### Ràng buộc nghiệp vụ

- Sử dụng soft delete (status = CANCELED) để bảo toàn lịch sử đặt chỗ
- Ghi log hành động hủy và lý do (audit)
- Tính toán hoàn tiền theo chính sách (nếu đã thanh toán)

---
