# ĐẶC TẢ CÁC USE CASE - ADJUST CUSTOMERS

Tài liệu này mô tả các use case thuộc nhóm quản lý Khách hàng (Customer) dành cho Nhân viên/Quản trị.

Gồm 5 use case chính:

1. Add New Customer (Thêm khách hàng mới)
2. View Customer Details (Xem chi tiết khách hàng)
3. Edit Customer (Chỉnh sửa thông tin khách hàng)
4. Delete Customer (Xóa khách hàng)
5. View and Filter Customers (Xem và lọc khách hàng)

---

## UC_CUST_01: View and Filter Customers (Xem và lọc khách hàng)

### Mô tả

Nhân viên/Quản trị xem danh sách khách hàng và lọc theo nhiều tiêu chí (tên, email, số điện thoại, trạng thái khóa).

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin

### Điều kiện hậu

- Hiển thị danh sách khách hàng theo tiêu chí lọc (nếu có) với phân trang/sắp xếp

### Luồng sự kiện chính

| Bước | Staff/Admin                     | Hệ thống                                                                                                                                                                                                                                                                                                                 |
| ---- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Chọn chức năng "View Customers" |                                                                                                                                                                                                                                                                                                                          |
| 2    |                                 | Truy vấn danh sách khách hàng với thống kê: <br>`SELECT u.*, COUNT(DISTINCT tb.id) as total_bookings, SUM(tb.total_price) as total_spent` <br>`FROM User u` <br>`LEFT JOIN Tour_Booking tb ON u.id = tb.user_id` <br>`WHERE u.role = 'CUSTOMER'` <br>`GROUP BY u.id` <br>`ORDER BY u.id DESC`                            |
| 3    |                                 | Hiển thị danh sách với các cột: ID, full_name, email, phone_number, is_lock, total_bookings, total_spent, nút hành động (Xem chi tiết, Chỉnh sửa, Xóa, Khóa/Mở khóa)                                                                                                                                                     |
| 4    | Nhập tiêu chí lọc               |                                                                                                                                                                                                                                                                                                                          |
| 5    | Click "Áp dụng"                 |                                                                                                                                                                                                                                                                                                                          |
| 6    |                                 | Truy vấn với WHERE tương ứng: <br>- Theo tên (LIKE '%keyword%' trên full_name) <br>- Theo email (LIKE hoặc =) <br>- Theo số điện thoại (LIKE hoặc =) <br>- Theo trạng thái khóa (is_lock = true/false) <br>- Theo khoảng tổng chi tiêu <br>- Theo số lượng booking <br>`... WHERE ... ORDER BY ... LIMIT ... OFFSET ...` |
| 7    |                                 | Hiển thị kết quả theo tiêu chí lọc                                                                                                                                                                                                                                                                                       |
| 8    | Xem kết quả                     |                                                                                                                                                                                                                                                                                                                          |

### Luồng sự kiện phụ

- 2a. Không có khách hàng: hiển thị thông báo "Chưa có khách hàng nào trong hệ thống"
- 6a. Không có kết quả phù hợp: hiển thị "Không tìm thấy khách hàng phù hợp với tiêu chí lọc" và cho phép xóa/thay đổi bộ lọc

### Ràng buộc nghiệp vụ/SQL gợi ý

- Thêm chỉ số (index) trên các cột tìm kiếm phổ biến: `email`, `phone_number`, `full_name`, `is_lock`
- Phân trang với `LIMIT/OFFSET` hoặc keyset pagination cho danh sách lớn
- Có thể thêm export danh sách ra Excel/CSV

---

## UC_CUST_02: View Customer Details (Xem chi tiết khách hàng)

### Mô tả

Xem đầy đủ thông tin một khách hàng, bao gồm thông tin cá nhân, lịch sử booking, và thống kê hoạt động.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Khách hàng (User với role = CUSTOMER) tồn tại

### Điều kiện hậu

- Hiển thị chi tiết khách hàng cùng thống kê liên quan

### Luồng sự kiện chính

| Bước | Staff/Admin                                         | Hệ thống                                                                                                                                                                                                                                                                                                                               |
| ---- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Tại danh sách, click "Xem chi tiết" trên khách hàng |                                                                                                                                                                                                                                                                                                                                        |
| 2    |                                                     | Truy vấn thông tin khách hàng: <br>`SELECT * FROM User WHERE id = :user_id AND role = 'CUSTOMER'`                                                                                                                                                                                                                                      |
| 3    |                                                     | Truy vấn thống kê booking: <br>`SELECT COUNT(*) as total_bookings, SUM(total_price) as total_spent, COUNT(CASE WHEN status='COMPLETED' THEN 1 END) as completed_bookings, COUNT(CASE WHEN status='CANCELED' THEN 1 END) as canceled_bookings FROM Tour_Booking WHERE user_id = :user_id`                                               |
| 4    |                                                     | Truy vấn danh sách booking gần đây: <br>`SELECT tb.*, t.departure_date, t.return_date, r.name as route_name, i.payment_status FROM Tour_Booking tb JOIN Trip t ON tb.trip_id = t.id JOIN Route r ON t.route_id = r.id LEFT JOIN Invoice i ON i.booking_id = tb.id WHERE tb.user_id = :user_id ORDER BY t.departure_date DESC LIMIT 10` |
| 5    |                                                     | Truy vấn tuyến yêu thích: <br>`SELECT r.* FROM Route r JOIN Favorite_Tour ft ON r.id = ft.route_id WHERE ft.user_id = :user_id`                                                                                                                                                                                                        |
| 6    |                                                     | Hiển thị trang chi tiết với: <br>- Thông tin cá nhân (full_name, email, phone_number, address, birthday, gender, is_lock) <br>- Thống kê (tổng booking, tổng chi tiêu, booking hoàn thành/hủy) <br>- Danh sách booking gần đây <br>- Tuyến yêu thích <br>- Nút hành động (Chỉnh sửa, Xóa, Khóa/Mở khóa tài khoản, Xem lịch sử đầy đủ)  |
| 7    | Xem thông tin                                       |                                                                                                                                                                                                                                                                                                                                        |

### Luồng sự kiện phụ

- 2a. Khách hàng không tồn tại: hiển thị "Không tìm thấy khách hàng" và dừng

### Ràng buộc nghiệp vụ/SQL gợi ý

- Có thể hiển thị biểu đồ thống kê booking theo tháng/năm
- Hiển thị các cảnh báo nếu khách hàng có hành vi bất thường (hủy booking nhiều lần, nợ tiền, v.v.)

---

## UC_CUST_03: Add New Customer (Thêm khách hàng mới)

### Mô tả

Nhân viên/Quản trị tạo tài khoản khách hàng mới trong hệ thống (dùng khi khách hàng đăng ký trực tiếp tại văn phòng hoặc qua điện thoại).

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Người dùng có quyền thêm khách hàng
- Username và email chưa tồn tại trong hệ thống

### Điều kiện hậu

- Tạo mới bản ghi User với role = 'CUSTOMER'
- Gửi email thông báo tài khoản cho khách hàng

### Luồng sự kiện chính

| Bước | Staff/Admin               | Hệ thống                                                                                                                                                                                                                                                                                                                                                                                    |
| ---- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Thêm khách hàng"    |                                                                                                                                                                                                                                                                                                                                                                                             |
| 2    |                           | Hiển thị form thêm khách hàng: <br>- Username (bắt buộc, duy nhất) <br>- Password (bắt buộc, có thể tự động sinh) <br>- Full name (bắt buộc) <br>- Email (bắt buộc, duy nhất) <br>- Phone number (bắt buộc) <br>- Address (tùy chọn) <br>- Birthday (tùy chọn) <br>- Gender (M/F/O, tùy chọn) <br>- Is_lock (mặc định false)                                                                |
| 3    | Nhập thông tin khách hàng |                                                                                                                                                                                                                                                                                                                                                                                             |
| 4    | Click "Lưu"               |                                                                                                                                                                                                                                                                                                                                                                                             |
| 5    |                           | Kiểm tra dữ liệu hợp lệ: <br>- Username không rỗng, không trùng: `SELECT COUNT(*) FROM User WHERE username = :username` <br>- Email hợp lệ (format email), không trùng: `SELECT COUNT(*) FROM User WHERE email = :email` <br>- Phone number hợp lệ (10-11 chữ số) <br>- Password đủ mạnh (≥ 8 ký tự, có chữ hoa, chữ thường, số) <br>- Birthday (nếu có) phải < ngày hiện tại và >= 18 tuổi |
| 6    |                           | Hash mật khẩu và tạo khách hàng: <br>`INSERT INTO User (username, password, is_lock, full_name, email, phone_number, address, birthday, gender, role)` <br>`VALUES (:username, :hashed_password, false, :full_name, :email, :phone, :address, :birthday, :gender, 'CUSTOMER')` <br>RETURNING id                                                                                             |
| 7    |                           | Tạo giỏ hàng cho khách hàng: <br>`INSERT INTO Cart (user_id) VALUES (:user_id)`                                                                                                                                                                                                                                                                                                             |
| 8    |                           | Gửi email chào mừng với thông tin đăng nhập                                                                                                                                                                                                                                                                                                                                                 |
| 9    |                           | Hiển thị thông báo thành công và chuyển đến trang chi tiết khách hàng                                                                                                                                                                                                                                                                                                                       |
| 10   | Xem khách hàng vừa tạo    |                                                                                                                                                                                                                                                                                                                                                                                             |

### Luồng sự kiện phụ

- 5a. Dữ liệu không hợp lệ: hiển thị lỗi chi tiết và quay lại bước 2
- 5b. Username hoặc email đã tồn tại: hiển thị "Username/Email đã được sử dụng" và giữ nguyên các trường khác
- 6a. Lỗi khi tạo khách hàng: hiển thị "Không thể tạo tài khoản. Vui lòng thử lại" và ghi log
- 8a. Gửi email thất bại: vẫn tạo tài khoản thành công nhưng hiển thị cảnh báo "Tạo tài khoản thành công nhưng không gửi được email"

### Ràng buộc nghiệp vụ/SQL gợi ý

- Nên cho phép tạo mật khẩu tạm thời (temp password) và yêu cầu khách hàng đổi mật khẩu lần đầu đăng nhập
- Username có thể tự động sinh từ email hoặc phone number
- Role luôn phải là 'CUSTOMER', không cho phép thay đổi
- Tự động tạo Cart cho khách hàng mới

---

## UC_CUST_04: Edit Customer (Chỉnh sửa thông tin khách hàng)

### Mô tả

Nhân viên/Quản trị chỉnh sửa thông tin khách hàng (ngoại trừ username).

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Khách hàng tồn tại và có role = 'CUSTOMER'

### Điều kiện hậu

- Cập nhật thành công thông tin khách hàng

### Luồng sự kiện chính

| Bước | Staff/Admin                                | Hệ thống                                                                                                                                                                                                                                                                |
| ---- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Tại chi tiết khách hàng, click "Chỉnh sửa" |                                                                                                                                                                                                                                                                         |
| 2    |                                            | Truy vấn thông tin khách hàng: <br>`SELECT * FROM User WHERE id = :user_id AND role = 'CUSTOMER'`                                                                                                                                                                       |
| 3    |                                            | Hiển thị form chỉnh sửa với dữ liệu hiện tại (username không cho sửa, hiển thị read-only)                                                                                                                                                                               |
| 4    | Sửa thông tin và click "Lưu"               |                                                                                                                                                                                                                                                                         |
| 5    |                                            | Kiểm tra dữ liệu hợp lệ: <br>- Email hợp lệ và không trùng (ngoại trừ email hiện tại): <br>`SELECT COUNT(*) FROM User WHERE email = :email AND id != :user_id` <br>- Phone number hợp lệ <br>- Birthday (nếu thay đổi) hợp lệ <br>- Nếu thay đổi password: phải đủ mạnh |
| 6    |                                            | Cập nhật thông tin: <br>`UPDATE User SET password = :password (nếu thay đổi), full_name = :full_name, email = :email, phone_number = :phone, address = :address, birthday = :birthday, gender = :gender WHERE id = :user_id`                                            |
| 7    |                                            | (Tùy chọn) Nếu thay đổi email hoặc password: gửi email thông báo cho khách hàng                                                                                                                                                                                         |
| 8    |                                            | Hiển thị thông báo thành công và reload chi tiết khách hàng                                                                                                                                                                                                             |
| 9    | Xem thông tin đã cập nhật                  |                                                                                                                                                                                                                                                                         |

### Luồng sự kiện phụ

- 2a. Khách hàng không tồn tại: hiển thị "Không tìm thấy khách hàng" và dừng
- 5a. Dữ liệu không hợp lệ: hiển thị lỗi chi tiết và quay lại bước 3
- 5b. Email đã được sử dụng bởi user khác: hiển thị "Email đã được sử dụng" và giữ nguyên các trường khác
- 6a. Lỗi khi cập nhật: hiển thị "Không thể cập nhật thông tin. Vui lòng thử lại" và ghi log

### Ràng buộc nghiệp vụ/SQL gợi ý

- Username không được phép thay đổi (immutable)
- Role không được phép thay đổi trong UC này (chỉ Admin có quyền thay đổi role qua UC riêng)
- Nên ghi log mọi thay đổi thông tin khách hàng (audit trail)
- Khi thay đổi email/password: gửi thông báo đến cả email cũ và email mới (nếu thay đổi email)

---

## UC_CUST_05: Delete Customer (Xóa khách hàng)

### Mô tả

Nhân viên/Quản trị xóa khách hàng khỏi hệ thống. Chỉ cho phép xóa khi khách hàng không có booking đang hoạt động hoặc nợ tiền.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Khách hàng tồn tại và có role = 'CUSTOMER'
- Khách hàng không có booking đang hoạt động (PENDING/CONFIRMED)
- Khách hàng không có nợ tiền (Invoice với payment_status = 'UNPAID')

### Điều kiện hậu

- Xóa hoặc vô hiệu hóa tài khoản khách hàng
- Xóa dữ liệu liên quan (Cart, Favorite_Tour)

### Luồng sự kiện chính

| Bước | Staff/Admin                          | Hệ thống                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Tại chi tiết khách hàng, click "Xóa" |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2    |                                      | Kiểm tra ràng buộc trước khi xóa: <br>1) Kiểm tra booking đang hoạt động: <br>`SELECT COUNT(*) FROM Tour_Booking WHERE user_id = :user_id AND status IN ('PENDING', 'CONFIRMED')` <br>2) Kiểm tra nợ tiền: <br>`SELECT COUNT(*) FROM Invoice i JOIN Tour_Booking tb ON i.booking_id = tb.id WHERE tb.user_id = :user_id AND i.payment_status = 'UNPAID'`                                                                                                                                             |
| 3    |                                      | Hiển thị dialog xác nhận với thông tin: <br>- Tên khách hàng <br>- Số lượng booking đã hoàn thành <br>- Tổng chi tiêu <br>- Cảnh báo: "Hành động này không thể hoàn tác" <br>- Tùy chọn: "Xóa vĩnh viễn" hoặc "Vô hiệu hóa tài khoản" (set is_lock = true)                                                                                                                                                                                                                                           |
| 4    | Chọn hành động và xác nhận           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 5    |                                      | **Nếu chọn "Vô hiệu hóa"**: <br>`UPDATE User SET is_lock = true WHERE id = :user_id` <br><br>**Nếu chọn "Xóa vĩnh viễn"** (khuyến nghị chỉ Admin): <br>Bắt đầu transaction: <br>1) Xóa Cart items: `DELETE FROM Cart_Item WHERE cart_id IN (SELECT id FROM Cart WHERE user_id = :user_id)` <br>2) Xóa Cart: `DELETE FROM Cart WHERE user_id = :user_id` <br>3) Xóa Favorite: `DELETE FROM Favorite_Tour WHERE user_id = :user_id` <br>4) Xóa User: `DELETE FROM User WHERE id = :user_id` <br>Commit |
| 6    |                                      | Hiển thị thông báo thành công và quay về danh sách khách hàng                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 7    | Xem danh sách đã cập nhật            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

### Luồng sự kiện phụ

- 2a. Có booking đang hoạt động: hiển thị "Không thể xóa khách hàng vì còn booking đang hoạt động (PENDING/CONFIRMED). Vui lòng hủy hoặc hoàn thành các booking trước." và dừng
- 2b. Có nợ tiền: hiển thị "Không thể xóa khách hàng vì còn nợ tiền. Vui lòng xử lý thanh toán trước." và dừng
- 4a. Người dùng chọn "Hủy": đóng dialog và dừng
- 5a. Lỗi khi xóa: rollback transaction, hiển thị "Không thể xóa khách hàng. Vui lòng thử lại" và ghi log

### Ràng buộc nghiệp vụ/SQL gợi ý

- **Khuyến nghị**: Nên dùng "Vô hiệu hóa" (is_lock = true) thay vì xóa vĩnh viễn để giữ lịch sử và audit trail
- Chỉ Admin mới được phép "Xóa vĩnh viễn"
- Không xóa các bản ghi Tour_Booking, Tour_Booking_Detail, Booking_Traveler đã hoàn thành (COMPLETED) vì cần giữ lịch sử
- Nên thêm bảng `Deleted_User` để lưu thông tin khách hàng đã xóa (soft delete pattern)
- Ghi log đầy đủ: ai xóa, khi nào, lý do gì
- Có thể thêm cơ chế "Khôi phục tài khoản" nếu dùng soft delete

---

## UC_CUST_06: Toggle Customer Lock Status (Khóa/Mở khóa tài khoản khách hàng)

### Mô tả

Nhân viên/Quản trị khóa hoặc mở khóa tài khoản khách hàng. Tài khoản bị khóa sẽ không thể đăng nhập.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Khách hàng tồn tại và có role = 'CUSTOMER'

### Điều kiện hậu

- Cập nhật trạng thái is_lock của khách hàng
- Gửi email thông báo cho khách hàng

### Luồng sự kiện chính

| Bước | Staff/Admin                                       | Hệ thống                                                                                                                                                                                                                                                                                                     |
| ---- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Tại chi tiết hoặc danh sách, click "Khóa/Mở khóa" |                                                                                                                                                                                                                                                                                                              |
| 2    |                                                   | Truy vấn trạng thái hiện tại: <br>`SELECT is_lock, full_name, email FROM User WHERE id = :user_id AND role = 'CUSTOMER'`                                                                                                                                                                                     |
| 3    |                                                   | Hiển thị dialog xác nhận: <br>- Nếu is_lock = false: "Bạn có chắc muốn khóa tài khoản [tên khách hàng]? Khách hàng sẽ không thể đăng nhập." <br>- Nếu is_lock = true: "Bạn có chắc muốn mở khóa tài khoản [tên khách hàng]? Khách hàng sẽ có thể đăng nhập lại." <br>- Trường nhập lý do (bắt buộc khi khóa) |
| 4    | Nhập lý do (nếu khóa) và xác nhận                 |                                                                                                                                                                                                                                                                                                              |
| 5    |                                                   | Đảo trạng thái khóa: <br>`UPDATE User SET is_lock = NOT is_lock WHERE id = :user_id`                                                                                                                                                                                                                         |
| 6    |                                                   | Ghi log hành động: <br>`INSERT INTO User_Lock_Log (user_id, locked_by, action, reason, locked_at) VALUES (:user_id, :staff_id, :action, :reason, NOW())`                                                                                                                                                     |
| 7    |                                                   | Gửi email thông báo cho khách hàng: <br>- Nếu khóa: thông báo tài khoản bị khóa, lý do, và cách liên hệ để giải quyết <br>- Nếu mở khóa: thông báo tài khoản đã được mở khóa                                                                                                                                 |
| 8    |                                                   | Hiển thị thông báo thành công và cập nhật giao diện                                                                                                                                                                                                                                                          |
| 9    | Xem trạng thái đã thay đổi                        |                                                                                                                                                                                                                                                                                                              |

### Luồng sự kiện phụ

- 2a. Khách hàng không tồn tại: hiển thị "Không tìm thấy khách hàng" và dừng
- 4a. Người dùng chọn "Hủy": đóng dialog và dừng
- 4b. Khi khóa mà không nhập lý do: hiển thị "Vui lòng nhập lý do khóa tài khoản" và giữ dialog
- 5a. Lỗi khi cập nhật: hiển thị "Không thể thay đổi trạng thái tài khoản. Vui lòng thử lại" và ghi log
- 7a. Gửi email thất bại: vẫn thực hiện hành động nhưng hiển thị cảnh báo "Thay đổi trạng thái thành công nhưng không gửi được email thông báo"

### Ràng buộc nghiệp vụ/SQL gợi ý

- Bắt buộc phải có lý do khi khóa tài khoản (để audit và giải quyết khiếu nại)
- Lý do mở khóa là tùy chọn
- Ghi log đầy đủ: ai thực hiện, thời gian, lý do
- Tài khoản bị khóa vẫn hiển thị trong danh sách nhưng có dấu hiệu đặc biệt (icon khóa, màu xám, v.v.)
- Khách hàng bị khóa không thể đăng nhập nhưng vẫn giữ nguyên dữ liệu (booking, invoice, v.v.)
- Có thể thêm cơ chế tự động khóa khi phát hiện hành vi bất thường (nhiều booking hủy liên tiếp, nợ tiền quá lâu, v.v.)

---
