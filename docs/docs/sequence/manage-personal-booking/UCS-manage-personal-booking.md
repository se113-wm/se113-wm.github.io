# ĐẶC TẢ CÁC USE CASE - MANAGE PERSONAL BOOKING

## UC_BOOKING_01: Book a Trip (Đặt tour trực tiếp)

### Mô tả

Khách hàng đặt một chuyến du lịch trực tiếp từ trang chi tiết chuyến đi, không thông qua giỏ hàng.

### Tác nhân chính

- Customer (Khách hàng)

### Điều kiện tiên quyết

- Khách hàng đã đăng nhập vào hệ thống
- Chuyến đi tồn tại và có trạng thái SCHEDULED
- Chuyến đi còn chỗ trống (total_seats - booked_seats > 0)
- Ngày khởi hành >= ngày hiện tại + 2 ngày

### Điều kiện hậu

- Tạo thành công bản ghi Tour_Booking với status = PENDING
- Tạo bản ghi Tour_Booking_Detail
- Tạo các bản ghi Booking_Traveler cho từng hành khách
- Cập nhật Trip.booked_seats
- Tạo bản ghi Invoice với payment_status = UNPAID
- Gửi email xác nhận đặt chỗ cho khách hàng

### Luồng sự kiện chính

| Bước | Khách hàng                                  | Hệ thống                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Xem chi tiết một chuyến đi                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 2    | Click nút "Đặt ngay"                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 3    |                                             | Kiểm tra khách hàng đã đăng nhập chưa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 4    |                                             | Hiển thị form đặt tour với các trường: <br>- Số người lớn (no_adults) <br>- Số trẻ em (no_children) <br>- Thông tin từng hành khách (full_name, gender, date_of_birth, identity_doc)                                                                                                                                                                                                                                                                                                                                                                                               |
| 5    | Nhập số lượng người lớn và trẻ em           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 6    | Nhập thông tin chi tiết cho từng hành khách |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 7    | Click "Xác nhận đặt tour"                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 8    |                                             | Kiểm tra dữ liệu hợp lệ: <br>- no_adults + no_children > 0 <br>- Thông tin hành khách đầy đủ <br>- identity_doc hợp lệ                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 9    |                                             | Kiểm tra số chỗ còn trống: <br>`SELECT (total_seats - booked_seats) as available FROM Trip WHERE id = :trip_id`                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 10   |                                             | Kiểm tra: available >= (no_adults + no_children)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 11   |                                             | Tính tổng tiền: total_price = trip.price × (no_adults + no_children)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 12   |                                             | Bắt đầu transaction: <br>1. `INSERT INTO Tour_Booking (trip_id, user_id, seats_booked, total_price, status) VALUES (..., PENDING)` <br>2. `INSERT INTO Tour_Booking_Detail (booking_id, no_adults, no_children) VALUES (...)` <br>3. Lặp cho từng hành khách: `INSERT INTO Booking_Traveler (booking_id, full_name, gender, date_of_birth, identity_doc) VALUES (...)` <br>4. `UPDATE Trip SET booked_seats = booked_seats + :seats_booked WHERE id = :trip_id` <br>5. `INSERT INTO Invoice (booking_id, total_amount, payment_status) VALUES (:booking_id, :total_price, UNPAID)` |
| 13   |                                             | Commit transaction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 14   |                                             | Hiển thị thông báo thành công với mã booking                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 15   |                                             | Gửi email xác nhận đặt chỗ kèm: <br>- Mã booking <br>- Thông tin chuyến đi <br>- Danh sách hành khách <br>- Tổng tiền <br>- Hướng dẫn thanh toán <br>- Hạn thanh toán (30% trong 24h, 100% trước 7 ngày khởi hành)                                                                                                                                                                                                                                                                                                                                                                 |
| 16   | Xem thông tin booking vừa tạo               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

### Luồng sự kiện phụ

**3a. Khách hàng chưa đăng nhập:**

- 3a.1. Hệ thống hiển thị thông báo: "Vui lòng đăng nhập để đặt tour"
- 3a.2. Chuyển hướng đến trang đăng nhập
- 3a.3. Sau khi đăng nhập thành công, quay lại trang chi tiết chuyến đi
- 3a.4. Tiếp tục từ bước 4

**8a. Dữ liệu không hợp lệ:**

- 8a.1. Hệ thống hiển thị thông báo lỗi cụ thể:
  - "Số lượng người phải lớn hơn 0"
  - "Vui lòng nhập đầy đủ thông tin hành khách"
  - "Giấy tờ tùy thân không hợp lệ"
- 8a.2. Quay lại bước 5

**10a. Không đủ chỗ trống:**

- 10a.1. Hệ thống hiển thị thông báo: "Chuyến đi chỉ còn [available] chỗ trống. Vui lòng giảm số lượng hành khách hoặc chọn chuyến khác"
- 10a.2. Quay lại bước 5

**12a. Lỗi khi tạo booking (lỗi database hoặc transaction):**

- 12a.1. Hệ thống rollback transaction
- 12a.2. Hiển thị thông báo: "Không thể đặt tour. Vui lòng thử lại sau"
- 12a.3. Ghi log lỗi để admin kiểm tra
- 12a.4. Kết thúc use case

---

## UC_BOOKING_02: Checkout Cart (Thanh toán giỏ hàng)

### Mô tả

Khách hàng thanh toán tất cả các chuyến đi trong giỏ hàng, tạo nhiều booking cùng một lúc.

### Tác nhân chính

- Customer (Khách hàng)

### Điều kiện tiên quyết

- Khách hàng đã đăng nhập
- Giỏ hàng có ít nhất 1 Cart_Item
- Tất cả các chuyến đi trong giỏ đều có trạng thái SCHEDULED và còn chỗ trống

### Điều kiện hậu

- Tạo thành công các bản ghi Tour_Booking (mỗi Cart_Item tạo 1 Booking)
- Tạo các bản ghi Tour_Booking_Detail, Booking_Traveler, Invoice tương ứng
- Cập nhật Trip.booked_seats cho tất cả các chuyến
- Xóa tất cả Cart_Item sau khi đặt thành công
- Gửi email xác nhận tất cả booking

### Luồng sự kiện chính

| Bước | Khách hàng                     | Hệ thống                                                                                                                                                                                                                                                                                               |
| ---- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Xem giỏ hàng (có N items)      |                                                                                                                                                                                                                                                                                                        |
| 2    | Click "Thanh toán giỏ hàng"    |                                                                                                                                                                                                                                                                                                        |
| 3    |                                | Kiểm tra giỏ hàng: <br>`SELECT ci.*, t.* FROM Cart_Item ci JOIN Trip t ON ci.trip_id = t.id WHERE ci.cart_id = :cart_id`                                                                                                                                                                               |
| 4    |                                | Kiểm tra tất cả các chuyến: <br>- status = SCHEDULED <br>- departure_date >= today + 2 <br>- (total_seats - booked_seats) >= quantity                                                                                                                                                                  |
| 5    |                                | Hiển thị form nhập thông tin cho TẤT CẢ chuyến: <br>- Với mỗi Cart_Item, hiển thị: <br> + Tên chuyến <br> + Số chỗ đã chọn (quantity) <br> + Form nhập: no_adults, no_children <br> + Form nhập thông tin hành khách (quantity người)                                                                  |
| 6    | Nhập thông tin cho từng chuyến |                                                                                                                                                                                                                                                                                                        |
| 7    | Click "Xác nhận đặt tất cả"    |                                                                                                                                                                                                                                                                                                        |
| 8    |                                | Kiểm tra dữ liệu hợp lệ cho TẤT CẢ chuyến                                                                                                                                                                                                                                                              |
| 9    |                                | Tính tổng tiền toàn bộ đơn hàng                                                                                                                                                                                                                                                                        |
| 10   |                                | Hiển thị trang xác nhận với: <br>- Danh sách tất cả chuyến <br>- Thông tin hành khách từng chuyến <br>- Tổng tiền từng chuyến <br>- Tổng tiền toàn bộ                                                                                                                                                  |
| 11   | Xác nhận đặt                   |                                                                                                                                                                                                                                                                                                        |
| 12   |                                | Bắt đầu transaction: <br>**Lặp cho mỗi Cart_Item:** <br>1. Tạo Tour_Booking <br>2. Tạo Tour_Booking_Detail <br>3. Tạo Booking_Traveler (lặp cho từng hành khách) <br>4. Cập nhật Trip.booked_seats <br>5. Tạo Invoice <br>**Sau khi tạo hết:** <br>6. `DELETE FROM Cart_Item WHERE cart_id = :cart_id` |
| 13   |                                | Commit transaction                                                                                                                                                                                                                                                                                     |
| 14   |                                | Hiển thị thông báo thành công với danh sách mã booking                                                                                                                                                                                                                                                 |
| 15   |                                | Gửi email tổng hợp tất cả booking                                                                                                                                                                                                                                                                      |
| 16   | Xem danh sách booking vừa tạo  |                                                                                                                                                                                                                                                                                                        |

### Luồng sự kiện phụ

**3a. Giỏ hàng trống:**

- 3a.1. Hiển thị thông báo: "Giỏ hàng của bạn đang trống"
- 3a.2. Hiển thị link "Khám phá tour"
- 3a.3. Kết thúc use case

**4a. Có chuyến không hợp lệ:**

- 4a.1. Hiển thị danh sách các chuyến có vấn đề:
  - "Chuyến [tên] đã hết chỗ"
  - "Chuyến [tên] đã bị hủy"
  - "Chuyến [tên] quá gần ngày khởi hành"
- 4a.2. Cho phép khách hàng:
  - Xóa các chuyến có vấn đề khỏi giỏ
  - Quay lại giỏ hàng để chỉnh sửa
- 4a.3. Kết thúc use case

**8a. Dữ liệu không hợp lệ cho một hoặc nhiều chuyến:**

- 8a.1. Hiển thị lỗi chi tiết cho từng chuyến
- 8a.2. Đánh dấu các trường lỗi
- 8a.3. Quay lại bước 6

**12a. Lỗi khi tạo booking (giữa chừng transaction):**

- 12a.1. Rollback toàn bộ transaction
- 12a.2. Giữ nguyên Cart_Item
- 12a.3. Hiển thị: "Không thể hoàn tất đặt chỗ. Vui lòng thử lại"
- 12a.4. Kết thúc use case

---

## UC_BOOKING_03: View and Filter Personal Bookings (Xem và lọc đặt chỗ cá nhân)

### Mô tả

Khách hàng xem danh sách tất cả các booking của mình và lọc theo các tiêu chí.

### Tác nhân chính

- Customer (Khách hàng)

### Điều kiện tiên quyết

- Khách hàng đã đăng nhập

### Điều kiện hậu

- Hiển thị danh sách booking theo tiêu chí lọc

### Luồng sự kiện chính

| Bước | Khách hàng                             | Hệ thống                                                                                                                                                                                                                                                                                                                 |
| ---- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Click vào "Booking của tôi" trong menu |                                                                                                                                                                                                                                                                                                                          |
| 2    |                                        | Truy vấn danh sách booking: <br>`SELECT tb.*, t.*, r.name as route_name, i.payment_status` <br>`FROM Tour_Booking tb` <br>`JOIN Trip t ON tb.trip_id = t.id` <br>`JOIN Route r ON t.route_id = r.id` <br>`JOIN Invoice i ON i.booking_id = tb.id` <br>`WHERE tb.user_id = :user_id` <br>`ORDER BY t.departure_date DESC` |
| 3    |                                        | Hiển thị danh sách với các tab: <br>- **Sắp tới** (PENDING, CONFIRMED và departure_date >= today) <br>- **Đã hoàn thành** (COMPLETED) <br>- **Đã hủy** (CANCELED)                                                                                                                                                        |
| 4    |                                        | Mỗi booking hiển thị: <br>- Mã booking <br>- Tên tuyến <br>- Ngày khởi hành - Ngày về <br>- Số chỗ <br>- Tổng tiền <br>- Trạng thái booking <br>- Trạng thái thanh toán <br>- Nút hành động (Xem chi tiết, Thanh toán, Hủy)                                                                                              |
| 5    | Xem danh sách                          |                                                                                                                                                                                                                                                                                                                          |

**Chức năng lọc:**

| Bước | Khách hàng                   | Hệ thống                                                                                                                                                                                                        |
| ---- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 6    | Click "Lọc" và chọn tiêu chí |                                                                                                                                                                                                                 |
| 7    |                              | Hiển thị form lọc: <br>- Trạng thái booking (PENDING, CONFIRMED, CANCELED, COMPLETED) <br>- Trạng thái thanh toán (UNPAID, PAID, REFUNDED) <br>- Khoảng thời gian (từ ngày - đến ngày) <br>- Tìm theo tên tuyến |
| 8    | Nhập tiêu chí lọc            |                                                                                                                                                                                                                 |
| 9    | Click "Áp dụng"              |                                                                                                                                                                                                                 |
| 10   |                              | Truy vấn với điều kiện WHERE tương ứng                                                                                                                                                                          |
| 11   |                              | Hiển thị danh sách đã lọc                                                                                                                                                                                       |
| 12   | Xem kết quả                  |                                                                                                                                                                                                                 |

### Luồng sự kiện phụ

**2a. Khách hàng chưa có booking nào:**

- 2a.1. Hiển thị thông báo: "Bạn chưa có booking nào"
- 2a.2. Hiển thị nút "Khám phá tour"
- 2a.3. Kết thúc use case

**10a. Không có kết quả phù hợp:**

- 10a.1. Hiển thị: "Không tìm thấy booking phù hợp với tiêu chí lọc"
- 10a.2. Cho phép xóa bộ lọc hoặc thay đổi tiêu chí

---

## UC_BOOKING_04: View and Pay Booking Invoice Details (Xem và thanh toán hóa đơn)

### Mô tả

Khách hàng xem chi tiết hóa đơn của một booking và thực hiện thanh toán.

### Tác nhân chính

- Customer (Khách hàng)

### Điều kiện tiên quyết

- Khách hàng đã đăng nhập
- Booking tồn tại và thuộc về khách hàng
- Hóa đơn có trạng thái UNPAID

### Điều kiện hậu

- Cập nhật Invoice.payment_status = PAID
- Cập nhật Invoice.payment_method
- Cập nhật Tour_Booking.status = CONFIRMED
- Gửi email xác nhận thanh toán và vé điện tử

### Luồng sự kiện chính

| Bước | Khách hàng                            | Hệ thống                                                                                                                                                                                                                                                                                                          |
| ---- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Click "Xem chi tiết" trên một booking |                                                                                                                                                                                                                                                                                                                   |
| 2    |                                       | Truy vấn thông tin booking: <br>`SELECT tb.*, t.*, r.* FROM Tour_Booking tb` <br>`JOIN Trip t ON tb.trip_id = t.id` <br>`JOIN Route r ON t.route_id = r.id` <br>`WHERE tb.id = :booking_id AND tb.user_id = :user_id`                                                                                             |
| 3    |                                       | Truy vấn hóa đơn: <br>`SELECT * FROM Invoice WHERE booking_id = :booking_id`                                                                                                                                                                                                                                      |
| 4    |                                       | Hiển thị chi tiết booking: <br>- Thông tin tuyến và chuyến đi <br>- Thông tin booking (ngày đặt, số chỗ, trạng thái) <br>- Danh sách hành khách <br>- **Thông tin hóa đơn:** <br> + Tổng tiền <br> + Trạng thái thanh toán <br> + Phương thức thanh toán (nếu đã thanh toán) <br> + Nút "Thanh toán" (nếu UNPAID) |
| 5    | Xem thông tin                         |                                                                                                                                                                                                                                                                                                                   |
| 6    | Click "Thanh toán"                    |                                                                                                                                                                                                                                                                                                                   |
| 7    |                                       | Kiểm tra: <br>- Invoice.payment_status = UNPAID <br>- Booking.status IN (PENDING, CONFIRMED) <br>- departure_date >= today                                                                                                                                                                                        |
| 8    |                                       | Hiển thị trang thanh toán: <br>- Tổng tiền cần thanh toán <br>- Các phương thức thanh toán: <br> + Chuyển khoản ngân hàng <br> + Thẻ tín dụng/ghi nợ <br> + Ví điện tử (Momo, ZaloPay) <br> + Thanh toán tại văn phòng                                                                                            |
| 9    | Chọn phương thức thanh toán           |                                                                                                                                                                                                                                                                                                                   |
| 10   | Nhập thông tin thanh toán (nếu cần)   |                                                                                                                                                                                                                                                                                                                   |
| 11   | Xác nhận thanh toán                   |                                                                                                                                                                                                                                                                                                                   |
| 12   |                                       | Xử lý thanh toán qua cổng thanh toán (nếu online)                                                                                                                                                                                                                                                                 |
| 13   |                                       | Nhận kết quả thanh toán thành công                                                                                                                                                                                                                                                                                |
| 14   |                                       | Bắt đầu transaction: <br>1. `UPDATE Invoice SET payment_status = PAID, payment_method = :method WHERE id = :invoice_id` <br>2. `UPDATE Tour_Booking SET status = CONFIRMED WHERE id = :booking_id`                                                                                                                |
| 15   |                                       | Commit transaction                                                                                                                                                                                                                                                                                                |
| 16   |                                       | Hiển thị thông báo thành công                                                                                                                                                                                                                                                                                     |
| 17   |                                       | Gửi email: <br>- Xác nhận thanh toán <br>- Vé điện tử (e-ticket) với QR code <br>- Thông tin đón khách <br>- Lưu ý chuẩn bị                                                                                                                                                                                       |
| 18   | Xem thông báo thành công              |                                                                                                                                                                                                                                                                                                                   |

### Luồng sự kiện phụ

**2a. Booking không tồn tại hoặc không thuộc về khách hàng:**

- 2a.1. Hiển thị: "Booking không tồn tại hoặc bạn không có quyền truy cập"
- 2a.2. Kết thúc use case

**7a. Hóa đơn đã được thanh toán:**

- 7a.1. Hiển thị: "Hóa đơn này đã được thanh toán"
- 7a.2. Hiển thị thông tin thanh toán
- 7a.3. Kết thúc use case

**7b. Booking đã bị hủy:**

- 7b.1. Hiển thị: "Booking đã bị hủy, không thể thanh toán"
- 7b.2. Kết thúc use case

**13a. Thanh toán thất bại:**

- 13a.1. Hiển thị thông báo lỗi từ cổng thanh toán
- 13a.2. Cho phép thử lại hoặc chọn phương thức khác
- 13a.3. Quay lại bước 8

**14a. Lỗi khi cập nhật database:**

- 14a.1. Rollback transaction
- 14a.2. Ghi log để kiểm tra (tiền đã trừ nhưng chưa cập nhật)
- 14a.3. Thông báo: "Có lỗi xảy ra. Vui lòng liên hệ bộ phận hỗ trợ"
- 14a.4. Tạo ticket hỗ trợ tự động

---

## UC_BOOKING_05: Edit Upcoming Trip's Passenger Details (Sửa thông tin hành khách)

### Mô tả

Khách hàng chỉnh sửa thông tin hành khách cho các chuyến đi sắp tới.

### Tác nhân chính

- Customer (Khách hàng)

### Điều kiện tiên quyết

- Khách hàng đã đăng nhập
- Booking tồn tại và thuộc về khách hàng
- Booking có status IN (PENDING, CONFIRMED)
- departure_date - today >= 3 ngày

### Điều kiện hậu

- Cập nhật thông tin Booking_Traveler
- Gửi email xác nhận cập nhật thông tin

### Luồng sự kiện chính

| Bước | Khách hàng                              | Hệ thống                                                                                                                                                                                                                                               |
| ---- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Vào chi tiết một booking sắp tới        |                                                                                                                                                                                                                                                        |
| 2    |                                         | Hiển thị chi tiết booking                                                                                                                                                                                                                              |
| 3    |                                         | Truy vấn danh sách hành khách: <br>`SELECT * FROM Booking_Traveler` <br>`WHERE booking_id = :booking_id` <br>`ORDER BY id`                                                                                                                             |
| 4    |                                         | Hiển thị danh sách hành khách với nút "Chỉnh sửa" (nếu đủ điều kiện)                                                                                                                                                                                   |
| 5    | Click "Chỉnh sửa thông tin hành khách"  |                                                                                                                                                                                                                                                        |
| 6    |                                         | Kiểm tra điều kiện cho phép sửa: <br>`SELECT tb.status, t.departure_date` <br>`FROM Tour_Booking tb` <br>`JOIN Trip t ON tb.trip_id = t.id` <br>`WHERE tb.id = :booking_id`                                                                            |
| 7    |                                         | Kiểm tra: <br>- status IN (PENDING, CONFIRMED) <br>- DATEDIFF(departure_date, CURRENT_DATE) >= 3                                                                                                                                                       |
| 8    |                                         | Hiển thị form chỉnh sửa với thông tin hiện tại của từng hành khách: <br>- Full name <br>- Gender <br>- Date of birth <br>- Identity doc                                                                                                                |
| 9    | Sửa thông tin một hoặc nhiều hành khách |                                                                                                                                                                                                                                                        |
| 10   | Click "Lưu thay đổi"                    |                                                                                                                                                                                                                                                        |
| 11   |                                         | Kiểm tra dữ liệu hợp lệ: <br>- Tất cả trường bắt buộc không trống <br>- Date of birth hợp lệ <br>- Identity doc hợp lệ                                                                                                                                 |
| 12   |                                         | Bắt đầu transaction: <br>Lặp cho từng hành khách bị sửa: <br>`UPDATE Booking_Traveler` <br>`SET full_name = :name, gender = :gender,` <br>`date_of_birth = :dob, identity_doc = :doc` <br>`WHERE id = :traveler_id` <br>`AND booking_id = :booking_id` |
| 13   |                                         | Commit transaction                                                                                                                                                                                                                                     |
| 14   |                                         | Hiển thị thông báo: "Cập nhật thông tin hành khách thành công"                                                                                                                                                                                         |
| 15   |                                         | Gửi email xác nhận cập nhật thông tin                                                                                                                                                                                                                  |
| 16   | Xem thông tin đã cập nhật               |                                                                                                                                                                                                                                                        |

### Luồng sự kiện phụ

**6a. Không đủ điều kiện sửa (quá gần ngày khởi hành):**

- 6a.1. Không hiển thị nút "Chỉnh sửa"
- 6a.2. Hiển thị thông báo: "Chuyến đi quá gần ngày khởi hành. Không thể chỉnh sửa thông tin hành khách. Vui lòng liên hệ bộ phận hỗ trợ nếu cần thiết"
- 6a.3. Kết thúc use case

**6b. Booking đã hủy hoặc hoàn thành:**

- 6b.1. Không hiển thị nút "Chỉnh sửa"
- 6b.2. Hiển thị thông báo: "Không thể chỉnh sửa thông tin cho booking đã [hủy/hoàn thành]"
- 6b.3. Kết thúc use case

**11a. Dữ liệu không hợp lệ:**

- 11a.1. Hiển thị lỗi cụ thể cho từng trường:
  - "Họ tên không được để trống"
  - "Ngày sinh không hợp lệ"
  - "Giấy tờ tùy thân không hợp lệ"
- 11a.2. Đánh dấu các trường lỗi
- 11a.3. Quay lại bước 9

**12a. Lỗi khi cập nhật database:**

- 12a.1. Rollback transaction
- 12a.2. Hiển thị: "Không thể cập nhật thông tin. Vui lòng thử lại"
- 12a.3. Quay lại bước 9

---

## UC_BOOKING_06: Cancel Booking (Hủy đặt chỗ)

### Mô tả

Khách hàng hủy một booking và nhận hoàn tiền theo chính sách.

### Tác nhân chính

- Customer (Khách hàng)

### Điều kiện tiên quyết

- Khách hàng đã đăng nhập
- Booking tồn tại và thuộc về khách hàng
- Booking có status IN (PENDING, CONFIRMED)
- Chưa quá hạn cho phép hủy

### Điều kiện hậu

- Cập nhật Tour_Booking.status = CANCELED
- Cập nhật Invoice.payment_status = REFUNDED (nếu đã thanh toán)
- Giảm Trip.booked_seats
- Tạo yêu cầu hoàn tiền (nếu đã thanh toán)
- Gửi email xác nhận hủy

### Luồng sự kiện chính

| Bước | Khách hàng               | Hệ thống                                                                                                                                                                                                                                                                                                                                                                            |
| ---- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Vào chi tiết một booking |                                                                                                                                                                                                                                                                                                                                                                                     |
| 2    | Click nút "Hủy tour"     |                                                                                                                                                                                                                                                                                                                                                                                     |
| 3    |                          | Kiểm tra điều kiện cho phép hủy: <br>`SELECT tb.status, t.departure_date, i.payment_status` <br>`FROM Tour_Booking tb` <br>`JOIN Trip t ON tb.trip_id = t.id` <br>`JOIN Invoice i ON i.booking_id = tb.id` <br>`WHERE tb.id = :booking_id`                                                                                                                                          |
| 4    |                          | Kiểm tra: <br>- status IN (PENDING, CONFIRMED) <br>- departure_date > CURRENT_DATE                                                                                                                                                                                                                                                                                                  |
| 5    |                          | Tính số ngày còn lại đến ngày khởi hành: <br>`days_left = DATEDIFF(departure_date, CURRENT_DATE)`                                                                                                                                                                                                                                                                                   |
| 6    |                          | Tính % hoàn tiền theo chính sách: <br>- days_left >= 15: refund = 80% <br>- 15 > days_left >= 7: refund = 50% <br>- 7 > days_left >= 3: refund = 20% <br>- days_left < 3: refund = 0%                                                                                                                                                                                               |
| 7    |                          | Hiển thị hộp thoại xác nhận: <br>"Bạn có chắc muốn hủy tour này?" <br><br>**Thông tin hủy:** <br>- Số ngày còn lại: [days_left] ngày <br>- Tổng tiền đã thanh toán: [total_amount] <br>- Số tiền hoàn lại: [refund_amount] ([refund]%) <br>- Số tiền không hoàn: [penalty_amount] <br><br>[Nút Hủy bỏ] [Nút Xác nhận hủy]                                                           |
| 8    | Click "Xác nhận hủy"     |                                                                                                                                                                                                                                                                                                                                                                                     |
| 9    |                          | Bắt đầu transaction: <br>1. `UPDATE Tour_Booking SET status = CANCELED WHERE id = :booking_id` <br>2. Nếu payment_status = PAID: <br>`UPDATE Invoice SET payment_status = REFUNDED WHERE booking_id = :booking_id` <br>3. `UPDATE Trip SET booked_seats = booked_seats - :seats_booked WHERE id = :trip_id` <br>4. Nếu có hoàn tiền: Tạo bản ghi yêu cầu hoàn tiền (Refund Request) |
| 10   |                          | Commit transaction                                                                                                                                                                                                                                                                                                                                                                  |
| 11   |                          | Hiển thị thông báo thành công: <br>"Hủy tour thành công" <br>- Số tiền hoàn lại: [refund_amount] <br>- Thời gian hoàn tiền: 7-10 ngày làm việc                                                                                                                                                                                                                                      |
| 12   |                          | Gửi email xác nhận hủy với: <br>- Mã booking <br>- Lý do hủy (do khách hàng) <br>- Số tiền hoàn lại <br>- Thời gian hoàn tiền dự kiến                                                                                                                                                                                                                                               |
| 13   | Xem thông báo            |                                                                                                                                                                                                                                                                                                                                                                                     |

### Luồng sự kiện phụ

**3a. Booking không thuộc về khách hàng:**

- 3a.1. Hiển thị: "Bạn không có quyền hủy booking này"
- 3a.2. Kết thúc use case

**4a. Booking không thể hủy (đã hủy, đã hoàn thành, hoặc chuyến đã khởi hành):**

- 4a.1. Hiển thị thông báo:
  - Nếu đã hủy: "Booking này đã được hủy trước đó"
  - Nếu đã hoàn thành: "Không thể hủy booking đã hoàn thành"
  - Nếu đã khởi hành: "Chuyến đi đã khởi hành, không thể hủy"
- 4a.2. Kết thúc use case

**8a. Khách hàng chọn "Hủy bỏ" (không muốn hủy nữa):**

- 8a.1. Đóng hộp thoại xác nhận
- 8a.2. Quay lại trang chi tiết booking
- 8a.3. Kết thúc use case

**9a. Lỗi khi cập nhật database:**

- 9a.1. Rollback transaction
- 9a.2. Hiển thị: "Không thể hủy booking. Vui lòng thử lại sau"
- 9a.3. Kết thúc use case

**Chú ý:**

- Nếu Staff/Admin hủy chuyến đi (Trip), tất cả booking của chuyến đó sẽ tự động được hủy và hoàn tiền 100% (được xử lý trong UC_TRIP_CANCEL)
