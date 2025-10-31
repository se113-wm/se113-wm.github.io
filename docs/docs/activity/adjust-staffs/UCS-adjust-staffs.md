# ĐẶC TẢ CÁC USE CASE - ADJUST STAFFS

Tài liệu này mô tả các use case thuộc nhóm quản lý Nhân viên (Staff Management). Các bước không bao gồm kiểm tra vai trò trong luồng chính (đã được kiểm soát ở UI/ACL). Các ràng buộc nghiệp vụ và truy vấn SQL minh họa được nêu rõ trong từng use case.

---

## UC_STAFF_01: View and Filter Staffs (Xem và lọc nhân viên)

### Mô tả

Quản trị viên xem danh sách nhân viên và lọc theo tiêu chí.

### Tác nhân chính

- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Admin

### Điều kiện hậu

- Hiển thị danh sách nhân viên theo tiêu chí lọc (nếu có)

### Luồng sự kiện chính

| Bước | Admin                              | Hệ thống                                                                                                                                                                                                                                                      |
| ---- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "Quản lý nhân viên" |                                                                                                                                                                                                                                                               |
| 2    |                                    | Truy vấn danh sách nhân viên với thống kê: <br>`SELECT u.*, COUNT(DISTINCT tb.id) AS total_managed_bookings` <br>`FROM User u` <br>`LEFT JOIN Tour_Booking tb ON u.id = tb.user_id` <br>`WHERE u.role = 'STAFF'` <br>`GROUP BY u.id` <br>`ORDER BY u.id DESC` |
| 3    |                                    | Hiển thị danh sách với các cột: username, full_name, email, phone_number, is_lock, total_managed_bookings và các nút hành động (Xem chi tiết, Sửa, Xóa, Khóa/Mở khóa)                                                                                         |
| 4    | Nhập tiêu chí lọc                  |                                                                                                                                                                                                                                                               |
| 5    | Click "Áp dụng"                    |                                                                                                                                                                                                                                                               |
| 6    |                                    | Truy vấn với điều kiện WHERE tương ứng: <br>- Từ khóa (LIKE theo full_name, email, username) <br>- Số điện thoại <br>- Trạng thái khóa (is_lock) <br>- Giới tính (gender)                                                                                     |
| 7    |                                    | Hiển thị danh sách đã lọc                                                                                                                                                                                                                                     |
| 8    | Xem kết quả                        |                                                                                                                                                                                                                                                               |

### Luồng sự kiện phụ

**2a. Không có nhân viên nào:**

- 2a.1. Hiển thị thông báo: "Chưa có nhân viên nào trong hệ thống"
- 2a.2. Hiển thị nút "Thêm nhân viên mới"
- 2a.3. Kết thúc use case

**6a. Không có kết quả phù hợp:**

- 6a.1. Hiển thị: "Không tìm thấy nhân viên phù hợp với tiêu chí lọc"
- 6a.2. Cho phép xóa bộ lọc hoặc thay đổi tiêu chí

### Ràng buộc nghiệp vụ

- Chỉ hiển thị người dùng có `role = 'STAFF'`
- Thống kê `total_managed_bookings` giúp đánh giá hiệu suất làm việc của nhân viên
- Admin có thể xem trạng thái khóa (`is_lock`) để quản lý quyền truy cập

---

## UC_STAFF_02: View Staff Details (Xem chi tiết nhân viên)

### Mô tả

Quản trị viên xem thông tin chi tiết của một nhân viên.

### Tác nhân chính

- Admin

### Điều kiện tiên quyết

- Nhân viên tồn tại trong hệ thống

### Điều kiện hậu

- Hiển thị thông tin chi tiết của nhân viên

### Luồng sự kiện chính

| Bước | Admin                              | Hệ thống                                                                                                                                                                                                                                                                                           |
| ---- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Tại danh sách, chọn "Xem chi tiết" |                                                                                                                                                                                                                                                                                                    |
| 2    |                                    | Truy vấn thông tin nhân viên: <br>`SELECT * FROM User` <br>`WHERE id = :staff_id AND role = 'STAFF'`                                                                                                                                                                                               |
| 3    |                                    | Truy vấn thống kê công việc: <br>`SELECT` <br>`  COUNT(DISTINCT tb.id) AS total_bookings_handled,` <br>`  COUNT(DISTINCT t.id) AS total_trips_created,` <br>`  COUNT(DISTINCT r.id) AS total_routes_created` <br>`FROM User u` <br>`LEFT JOIN Tour_Booking tb ON ...` <br>`WHERE u.id = :staff_id` |
| 4    |                                    | Truy vấn các booking gần đây đã xử lý: <br>`SELECT tb.*, t.*, r.name AS route_name` <br>`FROM Tour_Booking tb` <br>`JOIN Trip t ON tb.trip_id = t.id` <br>`JOIN Route r ON t.route_id = r.id` <br>`WHERE tb.user_id = :staff_id` <br>`ORDER BY tb.id DESC` <br>`LIMIT 10`                          |
| 5    |                                    | Hiển thị trang chi tiết với: <br>- Thông tin cá nhân (username, full_name, email, phone_number, address, birthday, gender, is_lock) <br>- Thống kê công việc <br>- Danh sách booking gần đây <br>- Các nút hành động: Sửa, Xóa, Khóa/Mở khóa, Xem lịch sử đầy đủ                                   |
| 6    | Xem thông tin                      |                                                                                                                                                                                                                                                                                                    |

### Luồng sự kiện phụ

**2a. Nhân viên không tồn tại:**

- 2a.1. Hiển thị: "Nhân viên không tồn tại hoặc đã bị xóa"
- 2a.2. Chuyển về danh sách nhân viên
- 2a.3. Kết thúc use case

### Ràng buộc nghiệp vụ

- Chỉ hiển thị thông tin nhân viên có `role = 'STAFF'`
- Thống kê bao gồm: số booking đã xử lý, số chuyến đã tạo, số tuyến đã tạo
- Hiển thị 10 booking gần đây nhất để theo dõi hoạt động

---

## UC_STAFF_03: Add New Staff (Thêm nhân viên mới)

### Mô tả

Quản trị viên tạo tài khoản nhân viên mới trong hệ thống.

### Tác nhân chính

- Admin

### Điều kiện tiên quyết

- Admin đã đăng nhập

### Điều kiện hậu

- Tạo mới một bản ghi User với role='STAFF' và Cart tương ứng

### Luồng sự kiện chính

| Bước | Admin                 | Hệ thống                                                                                                                                                                                                                                                                                                         |
| ---- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Thêm nhân viên" |                                                                                                                                                                                                                                                                                                                  |
| 2    |                       | Hiển thị form thêm nhân viên với các trường: <br>- username (*bắt buộc, duy nhất) <br>- password (*bắt buộc, ≥8 ký tự) <br>- full_name (*bắt buộc) <br>- email (*bắt buộc, duy nhất) <br>- phone_number <br>- address <br>- birthday (\*bắt buộc, ≥18 tuổi) <br>- gender (M/F/O)                                 |
| 3    | Nhập thông tin        |                                                                                                                                                                                                                                                                                                                  |
| 4    | Click "Lưu"           |                                                                                                                                                                                                                                                                                                                  |
| 5    |                       | Kiểm tra tính hợp lệ: <br>- Kiểm tra username duy nhất: <br>`SELECT COUNT(*) FROM User WHERE username = :username` <br>- Kiểm tra email duy nhất: <br>`SELECT COUNT(*) FROM User WHERE email = :email` <br>- Kiểm tra password đủ mạnh (≥8 ký tự, có chữ hoa, chữ thường, số) <br>- Kiểm tra birthday (≥18 tuổi) |
| 6    |                       | Thêm nhân viên: <br>`INSERT INTO User (username, password, full_name, email, phone_number, address, birthday, gender, role, is_lock)` <br>`VALUES (:username, :hashed_password, :full_name, :email, :phone, :address, :birthday, :gender, 'STAFF', false)` <br>`RETURNING id`                                    |
| 7    |                       | Tự động tạo Cart cho nhân viên: <br>`INSERT INTO Cart (user_id) VALUES (:staff_id)`                                                                                                                                                                                                                              |
| 8    |                       | Gửi email thông báo tài khoản đã được tạo với thông tin đăng nhập tạm thời                                                                                                                                                                                                                                       |
| 9    |                       | Hiển thị thông báo thành công và chuyển đến trang chi tiết nhân viên                                                                                                                                                                                                                                             |
| 10   | Xem nhân viên vừa tạo |                                                                                                                                                                                                                                                                                                                  |

### Luồng sự kiện phụ

**5a. Username đã tồn tại:**

- 5a.1. Hiển thị: "Username đã được sử dụng. Vui lòng chọn username khác"
- 5a.2. Giữ nguyên dữ liệu đã nhập
- 5a.3. Quay lại bước 2

**5b. Email đã tồn tại:**

- 5b.1. Hiển thị: "Email đã được đăng ký. Vui lòng sử dụng email khác"
- 5b.2. Giữ nguyên dữ liệu đã nhập
- 5b.3. Quay lại bước 2

**5c. Password không đủ mạnh:**

- 5c.1. Hiển thị: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số"
- 5c.2. Quay lại bước 2

**5d. Tuổi không hợp lệ:**

- 5d.1. Hiển thị: "Nhân viên phải từ 18 tuổi trở lên"
- 5d.2. Quay lại bước 2

**6a. Lỗi khi thêm nhân viên:**

- 6a.1. Hiển thị: "Không thể tạo tài khoản nhân viên. Vui lòng thử lại"
- 6a.2. Ghi log lỗi
- 6a.3. Kết thúc use case

### Ràng buộc nghiệp vụ

- `username` và `email` phải duy nhất trong toàn bộ bảng User
- Mật khẩu phải được hash trước khi lưu (bcrypt/argon2)
- Nhân viên phải từ 18 tuổi trở lên
- Tự động gán `role = 'STAFF'` và `is_lock = false`
- Mỗi User (bao gồm Staff) phải có một Cart

---

## UC_STAFF_04: Edit Staff (Chỉnh sửa thông tin nhân viên)

### Mô tả

Quản trị viên chỉnh sửa thông tin của một nhân viên.

### Tác nhân chính

- Admin

### Điều kiện tiên quyết

- Nhân viên tồn tại trong hệ thống

### Điều kiện hậu

- Cập nhật thành công thông tin nhân viên

### Luồng sự kiện chính

| Bước | Admin                        | Hệ thống                                                                                                                                                                                                                                                                                    |
| ---- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Tại danh sách, click "Sửa"   |                                                                                                                                                                                                                                                                                             |
| 2    |                              | Truy vấn thông tin nhân viên: <br>`SELECT * FROM User WHERE id = :staff_id AND role = 'STAFF'`                                                                                                                                                                                              |
| 3    |                              | Hiển thị form chỉnh sửa với dữ liệu hiện tại: <br>- username (read-only, không cho sửa) <br>- password (tùy chọn, để trống nếu không đổi) <br>- full_name <br>- email <br>- phone_number <br>- address <br>- birthday <br>- gender                                                          |
| 4    | Sửa thông tin và click "Lưu" |                                                                                                                                                                                                                                                                                             |
| 5    |                              | Kiểm tra tính hợp lệ: <br>- Email duy nhất (ngoại trừ email hiện tại): <br>`SELECT COUNT(*) FROM User WHERE email = :email AND id != :staff_id` <br>- Nếu đổi password: kiểm tra độ mạnh <br>- Kiểm tra phone_number hợp lệ <br>- Kiểm tra birthday (≥18 tuổi)                              |
| 6    |                              | Cập nhật nhân viên: <br>`UPDATE User SET` <br>`  full_name = :full_name,` <br>`  email = :email,` <br>`  phone_number = :phone,` <br>`  address = :address,` <br>`  birthday = :birthday,` <br>`  gender = :gender` <br>`  password = :hashed_password (nếu có)` <br>`WHERE id = :staff_id` |
| 7    |                              | Nếu đổi email hoặc password: gửi email thông báo thay đổi                                                                                                                                                                                                                                   |
| 8    |                              | Hiển thị thông báo thành công và tải lại trang chi tiết                                                                                                                                                                                                                                     |
| 9    | Xem thông tin đã cập nhật    |                                                                                                                                                                                                                                                                                             |

### Luồng sự kiện phụ

**2a. Nhân viên không tồn tại:**

- 2a.1. Hiển thị: "Nhân viên không tồn tại hoặc đã bị xóa"
- 2a.2. Chuyển về danh sách
- 2a.3. Kết thúc use case

**5a. Email đã được sử dụng:**

- 5a.1. Hiển thị: "Email đã được đăng ký bởi tài khoản khác"
- 5a.2. Giữ nguyên dữ liệu
- 5a.3. Quay lại bước 3

**5b. Password không đủ mạnh:**

- 5b.1. Hiển thị: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số"
- 5b.2. Quay lại bước 3

**6a. Lỗi khi cập nhật:**

- 6a.1. Hiển thị: "Không thể cập nhật thông tin. Vui lòng thử lại"
- 6a.2. Ghi log lỗi
- 6a.3. Kết thúc use case

### Ràng buộc nghiệp vụ

- `username` không được phép sửa (immutable) để đảm bảo tính nhất quán
- Email phải duy nhất, nhưng cho phép giữ nguyên email hiện tại
- Khi đổi email hoặc password, gửi email thông báo bảo mật cho nhân viên
- Password chỉ cập nhật khi Admin nhập mật khẩu mới (không bắt buộc)

---

## UC_STAFF_05: Delete Staff (Xóa nhân viên)

### Mô tả

Quản trị viên xóa hoặc vô hiệu hóa tài khoản nhân viên khỏi hệ thống.

### Tác nhân chính

- Admin

### Điều kiện tiên quyết

- Nhân viên tồn tại trong hệ thống

### Điều kiện hậu

- Tài khoản nhân viên bị xóa hoặc vô hiệu hóa (is_lock=true)

### Luồng sự kiện chính

| Bước | Admin                      | Hệ thống                                                                                                                                                                                                                                                      |
| ---- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Tại danh sách, click "Xóa" |                                                                                                                                                                                                                                                               |
| 2    |                            | Kiểm tra ràng buộc trước khi xóa: <br>- Kiểm tra booking đang xử lý: <br>`SELECT COUNT(*) FROM Tour_Booking WHERE user_id = :staff_id AND status IN ('PENDING', 'CONFIRMED')` <br>- Kiểm tra các tuyến/chuyến đang quản lý: (nếu có bảng phân công công việc) |
| 3    |                            | Hiển thị hộp thoại xác nhận với: <br>- Thông tin nhân viên <br>- Cảnh báo về dữ liệu liên quan (nếu có) <br>- Hai tùy chọn: "Vô hiệu hóa tài khoản" hoặc "Xóa vĩnh viễn"                                                                                      |
| 4    | Chọn hành động và xác nhận |                                                                                                                                                                                                                                                               |
| 5    |                            | Nếu chọn "Vô hiệu hóa": <br>`UPDATE User SET is_lock = true WHERE id = :staff_id` <br><br>Nếu chọn "Xóa vĩnh viễn": <br>- Xóa Cart_Item liên quan <br>- Xóa Cart <br>- Xóa Favorite_Tour <br>- Xóa User <br>`DELETE FROM User WHERE id = :staff_id`           |
| 6    |                            | Ghi log hành động xóa/vô hiệu hóa                                                                                                                                                                                                                             |
| 7    |                            | Hiển thị thông báo thành công và tải lại danh sách                                                                                                                                                                                                            |
| 8    | Hoàn tất                   |                                                                                                                                                                                                                                                               |

### Luồng sự kiện phụ

**2a. Còn booking đang xử lý:**

- 2a.1. Hiển thị: "Không thể xóa nhân viên do còn booking đang xử lý (PENDING/CONFIRMED)"
- 2a.2. Gợi ý: "Vui lòng chuyển giao công việc hoặc vô hiệu hóa tài khoản thay vì xóa"
- 2a.3. Kết thúc use case

**4a. Admin hủy xác nhận:**

- 4a.1. Đóng hộp thoại
- 4a.2. Quay về danh sách
- 4a.3. Kết thúc use case

**5a. Lỗi khi xóa:**

- 5a.1. Hiển thị: "Không thể xóa nhân viên. Vui lòng thử lại"
- 5a.2. Ghi log lỗi
- 5a.3. Kết thúc use case

### Ràng buộc nghiệp vụ

- Không cho phép xóa nhân viên đang có booking PENDING/CONFIRMED
- **Khuyến nghị**: Sử dụng "Vô hiệu hóa" (is_lock=true) thay vì xóa vĩnh viễn để giữ lại dữ liệu lịch sử
- Khi xóa vĩnh viễn, phải xóa cascade: Cart_Item → Cart → Favorite_Tour → User
- Ghi log audit trail về hành động xóa/vô hiệu hóa

### SQL gợi ý cho xóa cascade

```sql
-- Transaction xóa nhân viên
BEGIN;

-- Xóa Cart_Item
DELETE FROM Cart_Item WHERE cart_id IN (
  SELECT id FROM Cart WHERE user_id = :staff_id
);

-- Xóa Cart
DELETE FROM Cart WHERE user_id = :staff_id;

-- Xóa Favorite_Tour
DELETE FROM Favorite_Tour WHERE user_id = :staff_id;

-- Xóa User
DELETE FROM User WHERE id = :staff_id AND role = 'STAFF';

COMMIT;
```

---

## UC_STAFF_06: Toggle Staff Lock Status (Khóa/Mở khóa nhân viên)

### Mô tả

Quản trị viên khóa hoặc mở khóa tài khoản nhân viên để kiểm soát quyền truy cập.

### Tác nhân chính

- Admin

### Điều kiện tiên quyết

- Nhân viên tồn tại trong hệ thống

### Điều kiện hậu

- Trạng thái `is_lock` của nhân viên được đảo ngược

### Luồng sự kiện chính

| Bước | Admin                               | Hệ thống                                                                                                                                                                              |
| ---- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Tại danh sách, click "Khóa/Mở khóa" |                                                                                                                                                                                       |
| 2    |                                     | Truy vấn trạng thái hiện tại: <br>`SELECT id, username, full_name, is_lock FROM User WHERE id = :staff_id AND role = 'STAFF'`                                                         |
| 3    |                                     | Hiển thị hộp thoại xác nhận: <br>- Nếu is_lock=false: "Khóa tài khoản nhân viên [tên]?" <br>- Nếu is_lock=true: "Mở khóa tài khoản nhân viên [tên]?"                                  |
| 4    |                                     | Yêu cầu nhập lý do (reason) - bắt buộc khi khóa, tùy chọn khi mở khóa                                                                                                                 |
| 5    | Nhập lý do và xác nhận              |                                                                                                                                                                                       |
| 6    |                                     | Cập nhật trạng thái: <br>`UPDATE User SET is_lock = NOT is_lock WHERE id = :staff_id`                                                                                                 |
| 7    |                                     | Ghi log hành động vào bảng User_Lock_Log: <br>`INSERT INTO User_Lock_Log (user_id, action, reason, admin_id, timestamp)` <br>`VALUES (:staff_id, :action, :reason, :admin_id, NOW())` |
| 8    |                                     | Gửi email thông báo cho nhân viên về thay đổi trạng thái tài khoản                                                                                                                    |
| 9    |                                     | Hiển thị thông báo thành công và cập nhật danh sách                                                                                                                                   |
| 10   | Hoàn tất                            |                                                                                                                                                                                       |

### Luồng sự kiện phụ

**2a. Nhân viên không tồn tại:**

- 2a.1. Hiển thị: "Nhân viên không tồn tại"
- 2a.2. Kết thúc use case

**5a. Admin hủy xác nhận:**

- 5a.1. Đóng hộp thoại
- 5a.2. Không thay đổi gì
- 5a.3. Kết thúc use case

**5b. Không nhập lý do khi khóa:**

- 5b.1. Hiển thị: "Vui lòng nhập lý do khóa tài khoản"
- 5b.2. Quay lại bước 4

**6a. Lỗi khi cập nhật:**

- 6a.1. Hiển thị: "Không thể thay đổi trạng thái. Vui lòng thử lại"
- 6a.2. Ghi log lỗi
- 6a.3. Kết thúc use case

### Ràng buộc nghiệp vụ

- Khi khóa tài khoản, phải có lý do (reason) rõ ràng
- Nhân viên bị khóa không thể đăng nhập vào hệ thống
- Ghi log đầy đủ (audit trail) mọi thao tác khóa/mở khóa với thông tin: user_id, action, reason, admin_id, timestamp
- Gửi email thông báo cho nhân viên về thay đổi trạng thái

### SQL gợi ý cho bảng User_Lock_Log

```sql
CREATE TABLE User_Lock_Log (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  action VARCHAR(20) NOT NULL, -- 'LOCK' hoặc 'UNLOCK'
  reason TEXT,
  admin_id INT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES User(id),
  FOREIGN KEY (admin_id) REFERENCES User(id)
);
```

---

## Tổng kết

Tài liệu này mô tả 6 use case chính cho quản lý nhân viên:

1. **UC_STAFF_01**: Xem và lọc danh sách nhân viên với thống kê
2. **UC_STAFF_02**: Xem chi tiết thông tin và hiệu suất nhân viên
3. **UC_STAFF_03**: Thêm nhân viên mới với các ràng buộc validation
4. **UC_STAFF_04**: Chỉnh sửa thông tin nhân viên (username immutable)
5. **UC_STAFF_05**: Xóa hoặc vô hiệu hóa nhân viên với kiểm tra ràng buộc
6. **UC_STAFF_06**: Khóa/mở khóa tài khoản nhân viên với audit trail

Các use case này đảm bảo quản lý nhân viên hiệu quả, bảo mật và có thể truy vết đầy đủ.
