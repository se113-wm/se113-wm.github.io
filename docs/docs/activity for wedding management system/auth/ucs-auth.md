# ĐẶC TẢ CÁC USE CASE - AUTHENTICATION (XÁC THỰC & TÀI KHOẢN)

Tài liệu này mô tả các use case thuộc nhóm xác thực và quản lý tài khoản trong Hệ thống Quản lý Tiệc Cưới.

Gồm 6 use case chính:

1. Login (Đăng nhập)
2. Logout (Đăng xuất)
3. Manage Profile (Quản lý thông tin cá nhân)
4. Change Password (Đổi mật khẩu)
5. Register Account (Đăng ký tài khoản - Web)
6. Forgot Password (Quên mật khẩu - Web)

---

## UC_AUTH_01: Login (Đăng nhập)

### Mô tả ngắn gọn / Brief Description

Người dùng đăng nhập vào hệ thống bằng tên đăng nhập và mật khẩu để sử dụng các chức năng theo vai trò được phân quyền.

User logs into the system using username and password to access role-based features.

### Tác nhân / Actors

- **Khách hàng** / Customer (Web)
- **Nhân viên** / Staff (Desktop)
- **Quản trị viên** / Admin (Desktop)

### Tiền điều kiện / Preconditions

- Người dùng đã có tài khoản trong hệ thống (bảng NGUOIDUNG)
- Tài khoản chưa bị khóa
- Người dùng chưa đăng nhập

### Hậu điều kiện / Postconditions

**Thành công:**

- Người dùng đăng nhập thành công
- Hệ thống tạo và trả về JWT access token và refresh token
- Lưu refresh token vào database
- Chuyển hướng đến trang chủ theo vai trò (Customer/Staff/Admin)

**Thất bại:**

- Người dùng không đăng nhập được
- Hiển thị thông báo lỗi cụ thể

### Luồng sự kiện chính / Main Flow

| Bước | User                          | Hệ thống                                                                                                                                                                              |
| ---- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Truy cập trang đăng nhập      |                                                                                                                                                                                       |
| 2    |                               | Hiển thị form đăng nhập với các trường: <br>- Tên đăng nhập (username) <br>- Mật khẩu (password) <br>- Nút "Đăng nhập" <br>- Link "Quên mật khẩu?" <br>- Link "Đăng ký" (chỉ Web)     |
| 3    | Nhập tên đăng nhập            |                                                                                                                                                                                       |
| 4    | Nhập mật khẩu                 |                                                                                                                                                                                       |
| 5    | Click nút "Đăng nhập"         |                                                                                                                                                                                       |
| 6    |                               | Kiểm tra dữ liệu: <br>- Tên đăng nhập không để trống <br>- Mật khẩu không để trống                                                                                                    |
| 7    |                               | Tạo UsernamePasswordAuthenticationToken với username và password                                                                                                                      |
| 8    |                               | Gọi AuthenticationManager.authenticate() để xác thực                                                                                                                                  |
| 9    |                               | Truy vấn database: <br>`SELECT MaNguoiDung, TenDangNhap, MatKhauHash, HoTen, Email, MaNhom` <br>`FROM NGUOIDUNG` <br>`WHERE TenDangNhap = @TenDangNhap`                               |
| 10   |                               | So sánh mật khẩu đã hash với MatKhauHash trong database (BCrypt)                                                                                                                      |
| 11   |                               | Truy vấn quyền của người dùng: <br>`SELECT c.MaChucNang, c.TenChucNang` <br>`FROM PHANQUYEN pq` <br>`JOIN CHUCNANG c ON pq.MaChucNang = c.MaChucNang` <br>`WHERE pq.MaNhom = @MaNhom` |
| 12   |                               | Tạo JWT access token (thời hạn 1 giờ) chứa: username, roles, permissions                                                                                                              |
| 13   |                               | Tạo JWT refresh token (thời hạn 7 ngày)                                                                                                                                               |
| 14   |                               | Lưu refresh token vào database/cache với key là username                                                                                                                              |
| 15   |                               | Trả về response: <br>`{ "status": "success", "message": "Login successful", "data": { "accessToken": "...", "refreshToken": "..." } }`                                                |
| 16   | Lưu tokens vào local storage  |                                                                                                                                                                                       |
| 17   |                               | Chuyển hướng đến trang chủ theo vai trò                                                                                                                                               |
| 18   | Xác nhận đăng nhập thành công |                                                                                                                                                                                       |

### Luồng sự kiện phụ / Alternative Flows

**6a. Dữ liệu không hợp lệ**

- 6a1. Hệ thống kiểm tra nếu tên đăng nhập hoặc mật khẩu để trống
- 6a2. Hiển thị thông báo lỗi: "Vui lòng nhập tên đăng nhập và mật khẩu"
- 6a3. Quay lại bước 3

**10a. Sai tên đăng nhập hoặc mật khẩu**

- 10a1. Username không tồn tại HOẶC mật khẩu không khớp
- 10a2. Throw BadCredentialsException
- 10a3. Hiển thị thông báo: "Tên đăng nhập hoặc mật khẩu không đúng"
- 10a4. Quay lại bước 3

**10b. Tài khoản bị khóa**

- 10b1. Hệ thống phát hiện tài khoản có trạng thái "Khóa"
- 10b2. Hiển thị thông báo: "Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên"
- 10b3. Use case kết thúc

### Luồng ngoại lệ / Exception Flows

**E1. Lỗi database**

- E1.1. Không thể kết nối database hoặc query thất bại
- E1.2. Hiển thị thông báo: "Không thể đăng nhập. Vui lòng thử lại sau"
- E1.3. Use case kết thúc

**E2. Lỗi tạo JWT token**

- E2.1. Không thể tạo access token hoặc refresh token
- E2.2. Log lỗi ra file
- E2.3. Hiển thị thông báo: "Đăng nhập thất bại. Vui lòng thử lại"
- E2.4. Use case kết thúc

### Yêu cầu đặc biệt / Special Requirements

- **Bảo mật**:
  - Mật khẩu phải được hash bằng BCrypt (không lưu plain text)
  - Sử dụng HTTPS cho tất cả requests
  - JWT secret key phải được bảo mật
- **Session**: Sử dụng JWT stateless authentication
- **Remember Me**: Có thể implement bằng cách lưu refresh token lâu hơn

### Yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Thời gian đăng nhập < 2 giây
- **Security**:
  - Giới hạn số lần đăng nhập sai (rate limiting)
  - Lock tài khoản sau 5 lần nhập sai liên tiếp
- **Usability**: Hiển thị/ẩn mật khẩu, autofocus vào username

### Quy tắc nghiệp vụ / Business Rules

- **BR1**: Tên đăng nhập phân biệt hoa thường
- **BR2**: Mật khẩu tối thiểu 8 ký tự
- **BR3**: Access token hết hạn sau 1 giờ
- **BR4**: Refresh token hết hạn sau 7 ngày
- **BR5**: Mỗi vai trò (Customer/Staff/Admin) có màn hình home khác nhau

### SQL Queries

```sql
-- Query user by username
SELECT MaNguoiDung, TenDangNhap, MatKhauHash, HoTen, Email, SoDienThoai, MaNhom
FROM NGUOIDUNG
WHERE TenDangNhap = @TenDangNhap;

-- Query user permissions
SELECT c.MaChucNang, c.TenChucNang, c.TenManHinhDuocLoad
FROM PHANQUYEN pq
JOIN CHUCNANG c ON pq.MaChucNang = c.MaChucNang
WHERE pq.MaNhom = @MaNhom;

-- Get group name
SELECT TenNhom
FROM NHOMNGUOIDUNG
WHERE MaNhom = @MaNhom;
```

---

## UC_AUTH_02: Logout (Đăng xuất)

### Mô tả ngắn gọn / Brief Description

Người dùng đăng xuất khỏi hệ thống, hủy session hiện tại và xóa tokens.

User logs out of the system, invalidating current session and removing tokens.

### Tác nhân / Actors

- **Khách hàng** / Customer (Web)
- **Nhân viên** / Staff (Desktop)
- **Quản trị viên** / Admin (Desktop)

### Tiền điều kiện / Preconditions

- Người dùng đã đăng nhập
- Có access token và refresh token hợp lệ

### Hậu điều kiện / Postconditions

**Thành công:**

- Access token được thêm vào blacklist (danh sách token không hợp lệ)
- Refresh token bị xóa khỏi database
- Người dùng được chuyển về trang đăng nhập
- Local storage được xóa

**Thất bại:**

- Vẫn đăng xuất người dùng ở phía client

### Luồng sự kiện chính / Main Flow

| Bước | User                          | Hệ thống                                                                                      |
| ---- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| 1    | Click nút "Đăng xuất"         |                                                                                               |
| 2    |                               | Hiển thị dialog xác nhận: "Bạn có chắc chắn muốn đăng xuất?"                                  |
| 3    | Click "Xác nhận"              |                                                                                               |
| 4    |                               | Lấy access token từ Authorization header: `Bearer {token}`                                    |
| 5    |                               | Lưu access token vào blacklist/cache với TTL = thời gian còn lại của token                    |
| 6    |                               | Lấy refresh token từ request body                                                             |
| 7    |                               | Xóa refresh token khỏi database: <br>`DELETE FROM REFRESH_TOKENS WHERE token = @RefreshToken` |
| 8    |                               | Trả về response: <br>`{ "status": "success", "message": "Logout successful" }`                |
| 9    | Xóa tokens khỏi local storage |                                                                                               |
| 10   |                               | Chuyển hướng về trang đăng nhập                                                               |
| 11   | Xác nhận đã đăng xuất         |                                                                                               |

### Luồng sự kiện phụ / Alternative Flows

**3a. Người dùng hủy đăng xuất**

- 3a1. Click "Hủy" trong dialog xác nhận
- 3a2. Đóng dialog
- 3a3. Use case kết thúc

**7a. Refresh token không tồn tại**

- 7a1. Refresh token đã bị xóa hoặc không hợp lệ
- 7a2. Bỏ qua lỗi, vẫn tiếp tục đăng xuất
- 7a3. Tiếp tục bước 8

### Luồng ngoại lệ / Exception Flows

**E1. Lỗi khi xóa token**

- E1.1. Không thể lưu access token vào blacklist hoặc xóa refresh token
- E1.2. Log lỗi
- E1.3. Vẫn đăng xuất người dùng ở phía client
- E1.4. Tiếp tục bước 9

### Yêu cầu đặc biệt / Special Requirements

- **Blacklist**: Access token phải được lưu vào cache (Redis) với TTL
- **Cleanup**: Tự động xóa expired refresh tokens khỏi database

### Yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Đăng xuất < 1 giây
- **Security**: Đảm bảo token không thể sử dụng lại sau khi logout

---

## UC_AUTH_03: Manage Profile (Quản lý thông tin cá nhân)

### Mô tả ngắn gọn / Brief Description

Người dùng xem và chỉnh sửa thông tin cá nhân như họ tên, email, số điện thoại, địa chỉ, ngày sinh, giới tính.

User views and edits personal information such as name, email, phone number, address, date of birth, gender.

### Tác nhân / Actors

- **Khách hàng** / Customer (Web)
- **Nhân viên** / Staff (Desktop)
- **Quản trị viên** / Admin (Desktop)

### Tiền điều kiện / Preconditions

- Người dùng đã đăng nhập
- Có access token hợp lệ

### Hậu điều kiện / Postconditions

**Thành công:**

- Cập nhật thông tin trong bảng NGUOIDUNG
- Hiển thị thông báo thành công
- Reload thông tin mới

**Thất bại:**

- Không cập nhật, hiển thị lỗi

### Luồng sự kiện chính / Main Flow

| Bước | User                      | Hệ thống                                                                                                                                                                                                                      |
| ---- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Thông tin cá nhân"  |                                                                                                                                                                                                                               |
| 2    |                           | Lấy MaNguoiDung từ JWT token                                                                                                                                                                                                  |
| 3    |                           | Truy vấn thông tin: <br>`SELECT HoTen, Email, SoDienThoai, DiaChi, NgaySinh, GioiTinh` <br>`FROM NGUOIDUNG` <br>`WHERE MaNguoiDung = @MaNguoiDung`                                                                            |
| 4    |                           | Hiển thị form với thông tin hiện tại: <br>- Họ tên <br>- Email <br>- Số điện thoại <br>- Địa chỉ <br>- Ngày sinh <br>- Giới tính (Nam/Nữ/Khác)                                                                                |
| 5    | Xem thông tin             |                                                                                                                                                                                                                               |
| 6    | Chỉnh sửa thông tin       |                                                                                                                                                                                                                               |
| 7    | Click "Lưu thay đổi"      |                                                                                                                                                                                                                               |
| 8    |                           | Kiểm tra dữ liệu: <br>- Họ tên không để trống, độ dài ≤ 100 ký tự <br>- Email hợp lệ và không trùng với người khác <br>- Số điện thoại 10 chữ số <br>- Ngày sinh hợp lệ (tuổi ≥ 18)                                           |
| 9    |                           | Cập nhật database: <br>`UPDATE NGUOIDUNG` <br>`SET HoTen = @HoTen, Email = @Email, SoDienThoai = @SoDienThoai,` <br>`    DiaChi = @DiaChi, NgaySinh = @NgaySinh, GioiTinh = @GioiTinh` <br>`WHERE MaNguoiDung = @MaNguoiDung` |
| 10   |                           | Hiển thị thông báo "Cập nhật thông tin thành công" và reload form với dữ liệu mới                                                                                                                                             |
| 11   | Xem thông tin đã cập nhật |                                                                                                                                                                                                                               |

### Luồng sự kiện phụ / Alternative Flows

**8a. Dữ liệu không hợp lệ**

- 8a1. Có trường không đúng định dạng
- 8a2. Hiển thị lỗi cụ thể cho từng trường
- 8a3. Quay lại bước 6

**8b. Email đã tồn tại**

- 8b1. Email đã được người khác sử dụng
- 8b2. Hiển thị: "Email đã được sử dụng bởi tài khoản khác"
- 8b3. Quay lại bước 6

### Yêu cầu đặc biệt / Special Requirements

- **Email**: Gửi email xác nhận khi thay đổi email
- **Phone**: Xác thực OTP khi thay đổi số điện thoại (optional)

---

## UC_AUTH_04: Change Password (Đổi mật khẩu)

### Mô tả ngắn gọn / Brief Description

Người dùng đổi mật khẩu bằng cách nhập mật khẩu cũ và mật khẩu mới.

User changes password by entering old password and new password.

### Tác nhân / Actors

- **Khách hàng** / Customer (Web)
- **Nhân viên** / Staff (Desktop)
- **Quản trị viên** / Admin (Desktop)

### Tiền điều kiện / Preconditions

- Người dùng đã đăng nhập

### Hậu điều kiện / Postconditions

**Thành công:**

- Cập nhật MatKhauHash trong NGUOIDUNG
- Xóa tất cả refresh tokens cũ (force logout khỏi thiết bị khác)
- Yêu cầu đăng nhập lại

### Luồng sự kiện chính / Main Flow

| Bước | User                  | Hệ thống                                                                                                                      |
| ---- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Đổi mật khẩu"   |                                                                                                                               |
| 2    |                       | Hiển thị form: <br>- Mật khẩu cũ <br>- Mật khẩu mới <br>- Nhập lại mật khẩu mới                                               |
| 3    | Nhập mật khẩu cũ      |                                                                                                                               |
| 4    | Nhập mật khẩu mới     |                                                                                                                               |
| 5    | Nhập lại mật khẩu mới |                                                                                                                               |
| 6    | Click "Đổi mật khẩu"  |                                                                                                                               |
| 7    |                       | Kiểm tra: <br>- Mật khẩu cũ không trống <br>- Mật khẩu mới không trống, ≥ 8 ký tự <br>- Mật khẩu mới == Nhập lại mật khẩu mới |
| 8    |                       | Lấy MaNguoiDung từ JWT                                                                                                        |
| 9    |                       | Truy vấn: <br>`SELECT MatKhauHash FROM NGUOIDUNG WHERE MaNguoiDung = @MaNguoiDung`                                            |
| 10   |                       | Verify mật khẩu cũ với MatKhauHash (BCrypt.checkpw)                                                                           |
| 11   |                       | Hash mật khẩu mới: `newHash = BCrypt.hashpw(newPassword, BCrypt.gensalt())`                                                   |
| 12   |                       | Cập nhật: <br>`UPDATE NGUOIDUNG SET MatKhauHash = @NewHash WHERE MaNguoiDung = @MaNguoiDung`                                  |
| 13   |                       | Xóa tất cả refresh tokens: <br>`DELETE FROM REFRESH_TOKENS WHERE username = @Username`                                        |
| 14   |                       | Hiển thị: "Đổi mật khẩu thành công. Vui lòng đăng nhập lại"                                                                   |
| 15   |                       | Chuyển về trang đăng nhập                                                                                                     |

### Luồng sự kiện phụ / Alternative Flows

**7a. Dữ liệu không hợp lệ**

- 7a1. Mật khẩu mới < 8 ký tự HOẶC mật khẩu không khớp
- 7a2. Hiển thị lỗi cụ thể
- 7a3. Quay lại bước 3

**10a. Mật khẩu cũ không đúng**

- 10a1. BCrypt.checkpw trả về false
- 10a2. Hiển thị: "Mật khẩu cũ không đúng"
- 10a3. Quay lại bước 3

### Quy tắc nghiệp vụ / Business Rules

- **BR1**: Mật khẩu mới phải khác mật khẩu cũ
- **BR2**: Mật khẩu phải chứa: chữ hoa, chữ thường, số, ký tự đặc biệt (optional)
- **BR3**: Sau khi đổi mật khẩu, logout khỏi tất cả thiết bị

---

## UC_AUTH_05: Register Account (Đăng ký tài khoản - Web)

### Mô tả ngắn gọn / Brief Description

Khách hàng tạo tài khoản mới trên web để sử dụng hệ thống đặt tiệc.

Customer creates a new account on web to use the wedding booking system.

### Tác nhân / Actors

- **Khách hàng** / Customer (Web only)

### Tiền điều kiện / Preconditions

- Người dùng chưa có tài khoản
- Truy cập trang đăng ký trên web

### Hậu điều kiện / Postconditions

**Thành công:**

- Tạo bản ghi mới trong NGUOIDUNG với MaNhom = 'CUSTOMER'
- Gửi email xác nhận đăng ký
- Chuyển về trang đăng nhập

### Luồng sự kiện chính / Main Flow

| Bước | Customer                        | Hệ thống                                                                                                                                                                                               |
| ---- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Click "Đăng ký" tại trang login |                                                                                                                                                                                                        |
| 2    |                                 | Hiển thị form đăng ký: <br>- Tên đăng nhập <br>- Mật khẩu <br>- Nhập lại mật khẩu <br>- Họ tên <br>- Email <br>- Số điện thoại                                                                         |
| 3    | Nhập thông tin đăng ký          |                                                                                                                                                                                                        |
| 4    | Click "Đăng ký"                 |                                                                                                                                                                                                        |
| 5    |                                 | Kiểm tra: <br>- Tất cả trường bắt buộc không trống <br>- Tên đăng nhập: 6-50 ký tự, không khoảng trắng <br>- Mật khẩu ≥ 8 ký tự <br>- Mật khẩu == Nhập lại mật khẩu <br>- Email hợp lệ <br>- SĐT 10 số |
| 6    |                                 | Kiểm tra trùng: <br>`SELECT COUNT(*) FROM NGUOIDUNG` <br>`WHERE TenDangNhap = @TenDangNhap OR Email = @Email`                                                                                          |
| 7    |                                 | Hash mật khẩu: `hash = BCrypt.hashpw(password, BCrypt.gensalt())`                                                                                                                                      |
| 8    |                                 | Insert: <br>`INSERT INTO NGUOIDUNG` <br>`(TenDangNhap, MatKhauHash, HoTen, Email, SoDienThoai, MaNhom)` <br>`VALUES (@TenDangNhap, @Hash, @HoTen, @Email, @SoDienThoai, 'CUSTOMER')`                   |
| 9    |                                 | Gửi email chào mừng                                                                                                                                                                                    |
| 10   |                                 | Hiển thị: "Đăng ký thành công! Vui lòng đăng nhập"                                                                                                                                                     |
| 11   |                                 | Chuyển về trang đăng nhập                                                                                                                                                                              |

### Luồng sự kiện phụ / Alternative Flows

**5a. Dữ liệu không hợp lệ**

- 5a1. Có trường không đúng định dạng
- 5a2. Hiển thị lỗi cụ thể
- 5a3. Quay lại bước 3

**6a. Tên đăng nhập hoặc email đã tồn tại**

- 6a1. COUNT(\*) > 0
- 6a2. Hiển thị: "Tên đăng nhập hoặc email đã được sử dụng"
- 6a3. Quay lại bước 3

---

## UC_AUTH_06: Forgot Password (Quên mật khẩu - Web)

### Mô tả ngắn gọn / Brief Description

Người dùng (Customer/Staff/Admin) quên mật khẩu sẽ được chuyển hướng sang web để yêu cầu reset password qua email.

User who forgot password will be redirected to web to request password reset via email.

### Tác nhân / Actors

- **Khách hàng** / Customer (Web)
- **Nhân viên** / Staff (Desktop → Web)
- **Quản trị viên** / Admin (Desktop → Web)

### Tiền điều kiện / Preconditions

- Người dùng có tài khoản trong hệ thống
- Email đã được đăng ký

### Hậu điều kiện / Postconditions

**Thành công:**

- Tạo password reset token (UUID) với thời hạn 1 giờ
- Gửi email chứa link reset password
- Hiển thị thông báo kiểm tra email

### Luồng sự kiện chính / Main Flow - Request Reset

| Bước | User                             | Hệ thống                                                                                                                                                                |
| ---- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Click "Quên mật khẩu?" tại login |                                                                                                                                                                         |
| 2    |                                  | (Desktop) Mở browser và chuyển đến trang web forgot password <br>(Web) Hiển thị form forgot password                                                                    |
| 3    |                                  | Hiển thị form nhập email                                                                                                                                                |
| 4    | Nhập email đã đăng ký            |                                                                                                                                                                         |
| 5    | Click "Gửi yêu cầu"              |                                                                                                                                                                         |
| 6    |                                  | Kiểm tra email hợp lệ                                                                                                                                                   |
| 7    |                                  | Truy vấn: <br>`SELECT MaNguoiDung, TenDangNhap, HoTen FROM NGUOIDUNG WHERE Email = @Email`                                                                              |
| 8    |                                  | Tạo reset token: `token = UUID.randomUUID().toString()`                                                                                                                 |
| 9    |                                  | Lưu token vào database/cache với TTL 1 giờ: <br>`INSERT INTO PASSWORD_RESET_TOKENS` <br>`(token, email, expiry)` <br>`VALUES (@Token, @Email, NOW() + INTERVAL 1 HOUR)` |
| 10   |                                  | Tạo reset link: `https://weddingms.com/reset-password?token={token}`                                                                                                    |
| 11   |                                  | Gửi email với subject: "[TMS Tourism] Password Reset Request" <br>Nội dung: Link reset + hướng dẫn                                                                      |
| 12   |                                  | Hiển thị: "Nếu email tồn tại, bạn sẽ nhận được hướng dẫn reset password. Vui lòng kiểm tra hộp thư (và spam folder)"                                                    |

### Luồng sự kiện chính / Main Flow - Reset Password

| Bước | User                     | Hệ thống                                                                                                                                                       |
| ---- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 13   | Click link trong email   |                                                                                                                                                                |
| 14   |                          | Mở trang reset password với token trong URL                                                                                                                    |
| 15   |                          | Validate token: <br>`SELECT email, expiry FROM PASSWORD_RESET_TOKENS` <br>`WHERE token = @Token AND expiry > NOW()`                                            |
| 16   |                          | Hiển thị form: <br>- Mật khẩu mới <br>- Nhập lại mật khẩu mới                                                                                                  |
| 17   | Nhập mật khẩu mới        |                                                                                                                                                                |
| 18   | Click "Đặt lại mật khẩu" |                                                                                                                                                                |
| 19   |                          | Kiểm tra: <br>- Mật khẩu mới ≥ 8 ký tự <br>- Mật khẩu == Nhập lại mật khẩu                                                                                     |
| 20   |                          | Hash password: `hash = BCrypt.hashpw(newPassword, BCrypt.gensalt())`                                                                                           |
| 21   |                          | Transaction: <br>- `UPDATE NGUOIDUNG SET MatKhauHash = @Hash WHERE Email = @Email` <br>- `DELETE FROM PASSWORD_RESET_TOKENS WHERE token = @Token` <br>- Commit |
| 22   |                          | Xóa tất cả refresh tokens: <br>`DELETE FROM REFRESH_TOKENS WHERE email = @Email`                                                                               |
| 23   |                          | Hiển thị: "Mật khẩu đã được đặt lại thành công. Vui lòng đăng nhập"                                                                                            |
| 24   |                          | Chuyển về trang đăng nhập                                                                                                                                      |

### Luồng sự kiện phụ / Alternative Flows

**7a. Email không tồn tại**

- 7a1. Query trả về 0 kết quả
- 7a2. Vẫn hiển thị thông báo thành công (security: không tiết lộ email có tồn tại hay không)
- 7a3. Không gửi email
- 7a4. Tiếp tục bước 12

**15a. Token không hợp lệ hoặc hết hạn**

- 15a1. Token không tồn tại hoặc expiry < NOW()
- 15a2. Hiển thị: "Link reset password không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu lại"
- 15a3. Hiển thị nút "Yêu cầu lại" → Quay về bước 3

**19a. Mật khẩu không hợp lệ**

- 19a1. Mật khẩu < 8 ký tự hoặc không khớp
- 19a2. Hiển thị lỗi
- 19a3. Quay lại bước 17

### Luồng ngoại lệ / Exception Flows

**E1. Lỗi gửi email**

- E1.1. SMTP server lỗi
- E1.2. Log lỗi
- E1.3. Hiển thị: "Không thể gửi email. Vui lòng thử lại sau hoặc liên hệ support"

### Yêu cầu đặc biệt / Special Requirements

- **Desktop to Web**: Desktop app mở browser mặc định với URL forgot password
- **Email Template**: Professional email với logo, button, footer
- **Security**:
  - Rate limiting: tối đa 3 requests/email/giờ
  - Token chỉ sử dụng 1 lần

### Quy tắc nghiệp vụ / Business Rules

- **BR1**: Reset token hết hạn sau 1 giờ
- **BR2**: Một email chỉ có thể có 1 token active tại một thời điểm
- **BR3**: Sau khi reset password, logout khỏi tất cả thiết bị
- **BR4**: Desktop user (Staff/Admin) phải truy cập web để reset password

### SQL Queries

```sql
-- Password Reset Token table (cần tạo)
CREATE TABLE PASSWORD_RESET_TOKENS (
    id INT IDENTITY(1,1) PRIMARY KEY,
    token VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    expiry DATETIME NOT NULL,
    used BIT DEFAULT 0
);

-- Request reset
INSERT INTO PASSWORD_RESET_TOKENS (token, email, expiry)
VALUES (@Token, @Email, DATEADD(HOUR, 1, GETDATE()));

-- Validate token
SELECT email, expiry
FROM PASSWORD_RESET_TOKENS
WHERE token = @Token
  AND expiry > GETDATE()
  AND used = 0;

-- Reset password
BEGIN TRANSACTION;

UPDATE NGUOIDUNG
SET MatKhauHash = @NewHash
WHERE Email = @Email;

UPDATE PASSWORD_RESET_TOKENS
SET used = 1
WHERE token = @Token;

COMMIT TRANSACTION;
```

---

## Ghi chú bổ sung

### JWT Token Structure

**Access Token (1 hour):**

```json
{
  "sub": "username",
  "userId": 123,
  "roles": ["CUSTOMER"],
  "permissions": ["VIEW_BOOKING", "CREATE_BOOKING"],
  "iat": 1234567890,
  "exp": 1234571490
}
```

**Refresh Token (7 days):**

```json
{
  "sub": "username",
  "type": "refresh",
  "iat": 1234567890,
  "exp": 1235172690
}
```

### Security Best Practices

1. **Password Hashing**: BCrypt with salt rounds = 10
2. **JWT Secret**: Strong random key, stored in environment variable
3. **HTTPS**: All authentication endpoints must use HTTPS
4. **Rate Limiting**:
   - Login: 5 requests/minute/IP
   - Forgot Password: 3 requests/hour/email
5. **CORS**: Whitelist allowed origins
6. **XSS Protection**: Sanitize all inputs
7. **SQL Injection**: Use parameterized queries

### Platform-Specific Notes

**Web (Customer):**

- Responsive design
- Remember me (optional)
- Social login (future)

**Desktop (Staff/Admin):**

- Auto-login with saved credentials
- Forgot password → open web browser
- Session timeout warning

---
