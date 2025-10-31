# ĐẶC TẢ CÁC USE CASE - AUTHENTICATION & ACCOUNT MANAGEMENT

Tài liệu này mô tả các use case thuộc nhóm Xác thực và Quản lý tài khoản người dùng (Authentication & Account Management). Hệ thống sử dụng OAuth 2.0 PKCE flow với JWT token để đảm bảo bảo mật. Các bước không bao gồm kiểm tra kỹ thuật chi tiết (đã được xử lý ở tầng Authentication Manager). Các ràng buộc nghiệp vụ và flow được nêu rõ trong từng use case.

---

## UC_AUTH_01: Sign Up (Đăng ký tài khoản)

### Mô tả

Người dùng mới tạo tài khoản trong hệ thống để sử dụng các dịch vụ của TMS.

### Tác nhân chính

- User (chưa có tài khoản)

### Điều kiện tiên quyết

- Người dùng chưa có tài khoản trong hệ thống
- Username và email chưa tồn tại

### Điều kiện hậu

- Tạo mới bản ghi User với role mặc định là 'CUSTOMER'
- Tạo Cart cho user mới
- Tạo JWT token và người dùng được đăng nhập tự động
- Chuyển hướng về trang chủ

### Luồng sự kiện chính

| Bước | User                            | Hệ thống                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Truy cập trang đăng ký          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2    |                                 | Sinh code verifier (random) và hash thành code challenge theo chuẩn PKCE                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 3    |                                 | Hiển thị SignUpView với form đăng ký: <br>- Username (*bắt buộc, duy nhất) <br>- Email (*bắt buộc, duy nhất, format email hợp lệ) <br>- Password (*bắt buộc, ≥8 ký tự) <br>- Full name (*bắt buộc) <br>- Phone number <br>- Address <br>- Birthday <br>- Gender (M/F/O) <br>- Redirect với code challenge đến Authentication Manager Sign Up View                                                                                                                                                                                    |
| 4    | Nhập thông tin đăng ký          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 5    | Click "Sign Up"                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 6    |                                 | Validate định dạng dữ liệu: <br>- Username không rỗng, không chứa ký tự đặc biệt <br>- Email đúng format (regex) <br>- Password đủ mạnh (≥8 ký tự, có chữ hoa, chữ thường, số) <br>- Phone number (nếu có) đúng format (10-11 chữ số) <br>- Birthday (nếu có) hợp lệ                                                                                                                                                                                                                                                                 |
| 7    |                                 | Authentication Manager User Management xử lý: <br>1) Kiểm tra username và email chưa tồn tại: <br>`SELECT COUNT(*) FROM User WHERE username = :username OR email = :email` <br>2) Hash password (bcrypt/argon2) <br>3) Tạo user mới: <br>`INSERT INTO User (username, password, full_name, email, phone_number, address, birthday, gender, role, is_lock)` <br>`VALUES (:username, :hashed_password, :full_name, :email, :phone, :address, :birthday, :gender, 'CUSTOMER', false)` <br>`RETURNING id` <br>4) Sinh authorization code |
| 8    |                                 | Client gửi authorization code + code verifier                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 9    |                                 | Authentication Manager validate: <br>- Verify code challenge từ verifier khớp với code đã lưu <br>- Sinh JWT token chứa: user_id, username, role, email                                                                                                                                                                                                                                                                                                                                                                              |
| 10   |                                 | Client gửi JWT token đến Backend User Controller                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 11   |                                 | Backend User Management: <br>1) Verify JWT token (signature, expiry) <br>2) Extract user_id từ token <br>3) Tạo Cart cho user: <br>`INSERT INTO Cart (user_id) VALUES (:user_id)` <br>4) Ghi log đăng ký thành công vào application log                                                                                                                                                                                                                                                                                              |
| 12   |                                 | Trả về Success và chuyển hướng đến HomeView                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 13   | Được đăng nhập và xem trang chủ |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

### Luồng sự kiện phụ

**6a. Dữ liệu không hợp lệ:**

- 6a.1. Hiển thị thông báo lỗi: "Invalid data format" với chi tiết trường nào sai
- 6a.2. Giữ nguyên dữ liệu đã nhập (trừ password)
- 6a.3. Quay lại bước 3

**7a. Username hoặc email đã tồn tại:**

- 7a.1. Authentication Manager trả về lỗi: "Username or email already exists"
- 7a.2. Hiển thị thông báo: "Tên đăng nhập hoặc email đã được sử dụng. Vui lòng chọn thông tin khác"
- 7a.3. Quay lại bước 3

**9a. Code verifier không hợp lệ (PKCE validation failed):**

- 9a.1. Authentication Manager trả về lỗi
- 9a.2. Hiển thị: "Xác thực không thành công. Vui lòng thử lại"
- 9a.3. Kết thúc use case, yêu cầu đăng ký lại

**11a. JWT token không hợp lệ:**

- 11a.1. Backend trả về lỗi: "Invalid JWT Token"
- 11a.2. Hiển thị: "Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại"
- 11a.3. Kết thúc use case

**11b. Lỗi khi tạo Cart:**

- 11b.1. Ghi log lỗi nghiêm trọng (user đã tạo nhưng Cart failed)
- 11b.2. Vẫn cho phép đăng nhập thành công (Cart sẽ được tạo lazy khi cần)
- 11b.3. Tiếp tục bước 12

### Ràng buộc nghiệp vụ/Kỹ thuật

- **PKCE (Proof Key for Code Exchange)**: Bắt buộc sử dụng để chống CSRF và authorization code interception attacks
- **Password hashing**: Phải dùng bcrypt (cost ≥ 10) hoặc argon2id
- **Username**: Unique, không phân biệt hoa thường, không chứa khoảng trắng
- **Email**: Unique, validate format, không phân biệt hoa thường
- **Role mặc định**: 'CUSTOMER' cho người dùng đăng ký mới
- **is_lock mặc định**: false (tài khoản active ngay lập tức, không cần email verification)
- **JWT Token Expiry**:
  - Access Token: 15 phút - 1 giờ (dùng cho API calls)
  - Refresh Token: 7-30 ngày (dùng để lấy access token mới)
  - Cần implement refresh token mechanism để user không phải đăng nhập lại liên tục
- **Cart**: Mỗi user phải có đúng 1 cart, tự động tạo sau khi user được tạo thành công
- **Audit Log**: Ghi log đăng ký thành công vào application log (không dùng database table riêng)

### Yêu cầu bảo mật

- **PKCE Flow**: Code challenge được sinh từ code verifier theo SHA-256
- **Authorization Code**: Chỉ sử dụng 1 lần và có thời hạn ngắn (5-10 phút)
- **JWT Token**:
  - Được sign bằng RS256 (RSA + SHA-256) với private key
  - Verify bằng public key
  - Chứa claims: user_id, username, role, email, iat (issued at), exp (expiry)
- **Password Storage**: Không bao giờ lưu plaintext, chỉ lưu hash (bcrypt cost ≥ 10 hoặc argon2id)
- **Rate Limiting**: Giới hạn 5 lần đăng ký thất bại / IP / 15 phút
- **HTTPS Only**: Bắt buộc sử dụng HTTPS trong production để bảo vệ credentials khi truyền tải

---

## UC_AUTH_02: Sign In (Đăng nhập)

### Mô tả

Người dùng đã có tài khoản đăng nhập vào hệ thống để sử dụng các dịch vụ.

### Tác nhân chính

- User (đã có tài khoản)

### Điều kiện tiên quyết

- User đã có tài khoản trong hệ thống (đã Sign Up)
- Tài khoản không bị khóa (is_lock = false)

### Điều kiện hậu

- Tạo JWT token mới cho session
- Người dùng được xác thực và chuyển về trang chủ
- Ghi log đăng nhập thành công

### Luồng sự kiện chính

| Bước | User                            | Hệ thống                                                                                                                                                                                                                                                                                            |
| ---- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Truy cập trang đăng nhập        |                                                                                                                                                                                                                                                                                                     |
| 2    |                                 | Sinh code verifier (random) và hash thành code challenge theo chuẩn PKCE                                                                                                                                                                                                                            |
| 3    |                                 | Hiển thị SignInView với form đăng nhập: <br>- Username hoặc Email <br>- Password <br>- Redirect với code challenge đến Authentication Manager Sign In View                                                                                                                                          |
| 4    | Nhập username/email và password |                                                                                                                                                                                                                                                                                                     |
| 5    | Click "Sign In"                 |                                                                                                                                                                                                                                                                                                     |
| 6    |                                 | Validate định dạng dữ liệu: <br>- Username/Email không rỗng <br>- Password không rỗng                                                                                                                                                                                                               |
| 7    |                                 | Authentication Manager User Management xử lý: <br>1) Truy vấn user: <br>`SELECT id, username, password, role, is_lock FROM User` <br>`WHERE (username = :credential OR email = :credential)` <br>2) Kiểm tra is_lock = false <br>3) Verify password hash <br>4) Nếu hợp lệ: sinh authorization code |
| 8    |                                 | Client gửi authorization code + code verifier                                                                                                                                                                                                                                                       |
| 9    |                                 | Authentication Manager validate: <br>- Verify code challenge từ verifier khớp với code đã lưu <br>- Sinh JWT token chứa: user_id, username, role, email                                                                                                                                             |
| 10   |                                 | Client gửi JWT token đến Backend User Controller                                                                                                                                                                                                                                                    |
| 11   |                                 | Backend User Management: <br>1) Verify JWT token (signature, expiry) <br>2) Extract user_id từ token <br>3) Ghi log đăng nhập thành công vào application log (bao gồm: user_id, login_time, ip_address, user_agent)                                                                                 |
| 12   |                                 | Trả về Success và chuyển hướng đến HomeView                                                                                                                                                                                                                                                         |
| 13   | Được đăng nhập và xem trang chủ |                                                                                                                                                                                                                                                                                                     |

### Luồng sự kiện phụ

**6a. Dữ liệu không hợp lệ:**

- 6a.1. Hiển thị thông báo lỗi: "Invalid data format"
- 6a.2. Giữ nguyên username/email đã nhập (xóa password)
- 6a.3. Quay lại bước 3

**7a. Thông tin đăng nhập không đúng (username/email không tồn tại HOẶC password sai):**

- 7a.1. Authentication Manager trả về lỗi generic: "Invalid credentials" (không tiết lộ user có tồn tại hay không - tránh username enumeration)
- 7a.2. Hiển thị: "Tên đăng nhập/Email hoặc mật khẩu không đúng"
- 7a.3. Ghi log failed login attempt vào application log (bao gồm: credential_attempted, ip_address, timestamp)
- 7a.4. Áp dụng rate limiting (5 lần thất bại / IP / 15 phút) để chống brute force attack
- 7a.5. Quay lại bước 3

**7b. Tài khoản bị khóa (is_lock = true):**

- 7b.1. Authentication Manager kiểm tra `is_lock = true`
- 7b.2. Trả về lỗi: "Account locked"
- 7b.3. Hiển thị: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ bộ phận hỗ trợ để được trợ giúp"
- 7b.4. Ghi log locked account access attempt vào application log
- 7b.5. Kết thúc use case

**9a. Code verifier không hợp lệ (PKCE validation failed):**

- 9a.1. Authentication Manager trả về lỗi
- 9a.2. Hiển thị: "Xác thực không thành công. Vui lòng thử lại"
- 9a.3. Kết thúc use case, yêu cầu đăng nhập lại

**11a. JWT token không hợp lệ:**

- 11a.1. Backend trả về lỗi: "Invalid JWT Token"
- 11a.2. Hiển thị: "Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại"
- 11a.3. Kết thúc use case

### Ràng buộc nghiệp vụ/Kỹ thuật

- **Credential Flexibility**: Cho phép đăng nhập bằng username HOẶC email + password
- **Password Verification**: Sử dụng bcrypt.compare() hoặc argon2.verify() để so sánh hash
- **Rate Limiting**: 5 lần thất bại / IP / 15 phút (chống brute force attack)
- **Session Management**:
  - Access Token: 15 phút - 1 giờ
  - Refresh Token: 7-30 ngày
  - Cần implement refresh token endpoint để lấy access token mới
- **Audit Logging**: Ghi log vào application log (không dùng database table):
  - Login thành công: user_id, ip_address, user_agent, timestamp
  - Login thất bại: credential_attempted (không lưu password), ip_address, timestamp
  - Account locked access: user_id, ip_address, timestamp
- **Password Reset Link**: Nếu quên mật khẩu, chuyển đến UC_AUTH_03 (Forgot Password)

### Yêu cầu bảo mật

- **Brute-force Protection**: Rate limiting 5 lần / IP / 15 phút
- **Timing Attack Mitigation**: Response time giống nhau cho cả trường hợp:
  - Username không tồn tại
  - Password sai
  - Để tránh username enumeration attack
- **Username Enumeration Prevention**: Luôn trả về lỗi generic "Invalid credentials" (không tiết lộ user có tồn tại hay không)
- **Secure Password Storage**: Hash với bcrypt cost ≥ 10 hoặc argon2id
- **JWT Security**:
  - Access Token: Short-lived (15 phút - 1 giờ)
  - Refresh Token: Long-lived (7-30 ngày), stored in httpOnly cookie
  - Signed với RS256 (RSA + SHA-256) hoặc HS256 (HMAC + SHA-256)
  - Chứa claims: user_id, username, role, email, iat, exp
- **HTTPS Required**: Tất cả authentication flow phải qua HTTPS trong production
- **CSRF Protection**: PKCE flow đã cung cấp built-in CSRF protection

---

## Luồng tổng quan OAuth 2.0 PKCE Flow

```
Client (SignInView/SignUpView)
    ↓ (1) Generate code_verifier (random)
    ↓ (2) Generate code_challenge = SHA256(code_verifier)
    ↓ (3) Redirect with code_challenge
Authentication Manager
    ↓ (4) Validate credentials (Sign In) or Create user (Sign Up)
    ↓ (5) Generate authorization_code
    ↓ (6) Return authorization_code
Client
    ↓ (7) Send authorization_code + code_verifier
Authentication Manager
    ↓ (8) Verify code_challenge matches SHA256(code_verifier)
    ↓ (9) Generate JWT token
    ↓ (10) Return JWT token
Client
    ↓ (11) Send JWT token to Backend
Backend
    ↓ (12) Verify JWT signature
    ↓ (13) Extract user info
    ↓ (14) Execute business logic (create Cart, log, etc.)
    ↓ (15) Return success
Client → HomeView
```

### Tại sao sử dụng PKCE?

- **Chống CSRF**: Code challenge ngăn attacker đánh cắp authorization code
- **Chống man-in-the-middle**: Code verifier chỉ client biết, không gửi qua network ban đầu
- **Mobile/SPA friendly**: Không cần client secret, phù hợp cho ứng dụng public client
- **Standard compliance**: Tuân thủ OAuth 2.0 RFC 7636

---

## Bảng Login_Log (Gợi ý)

Để tracking đăng nhập:

```sql
CREATE TABLE Login_Log (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  login_time TIMESTAMP DEFAULT NOW(),
  ip_address VARCHAR(45),
  user_agent TEXT,
  status VARCHAR(20) DEFAULT 'SUCCESS', -- 'SUCCESS', 'FAILED', 'LOCKED'
  failure_reason TEXT,
  FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);

CREATE INDEX idx_login_log_user_time ON Login_Log(user_id, login_time DESC);
CREATE INDEX idx_login_log_ip ON Login_Log(ip_address, login_time DESC);
```

---

---

## UC_AUTH_03: Forgot Password (Quên mật khẩu)

### Mô tả

Người dùng đã quên mật khẩu có thể yêu cầu đặt lại mật khẩu thông qua email.

### Tác nhân chính

- User (Customer/Staff/Admin)

### Điều kiện tiên quyết

- Người dùng đã có tài khoản trong hệ thống
- Tài khoản không bị khóa (is_lock = false)
- Email đã được xác thực

### Điều kiện hậu

- Tạo reset token với thời hạn 24 giờ
- Gửi email chứa link reset password
- Người dùng có thể đặt lại mật khẩu thông qua link

### Luồng sự kiện chính

| Bước | User                                         | Hệ thống                                                                                                                                                                                                                                                                                                                            |
| ---- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Click vào "Forgot Password" từ trang Sign In |                                                                                                                                                                                                                                                                                                                                     |
| 2    |                                              | Hiển thị Forgot Password View với form nhập email                                                                                                                                                                                                                                                                                   |
| 3    | Nhập email và click "Send Reset Link"        |                                                                                                                                                                                                                                                                                                                                     |
| 4    |                                              | Validate format email                                                                                                                                                                                                                                                                                                               |
| 5    |                                              | Kiểm tra tồn tại user: <br>`SELECT id, email, is_lock FROM User WHERE email = :email`                                                                                                                                                                                                                                               |
| 6    |                                              | Nếu user tồn tại và is_lock = false: <br>1) Sinh reset_token (UUID) <br>2) Lưu reset_token và expiry_time (NOW() + 24 giờ): <br>`UPDATE User SET reset_token = :token, reset_token_expiry = DATE_ADD(NOW(), INTERVAL 24 HOUR) WHERE id = :user_id` <br>3) Gửi email chứa link: `https://tms.com/reset-password?token={reset_token}` |
| 7    |                                              | Hiển thị thông báo: "Nếu email tồn tại trong hệ thống, bạn sẽ nhận được link đặt lại mật khẩu" <br>(không tiết lộ liệu email có tồn tại hay không - security by obscurity)                                                                                                                                                          |
| 8    | Kiểm tra email và click vào reset link       |                                                                                                                                                                                                                                                                                                                                     |
| 9    |                                              | Redirect đến Reset Password View với token trong URL parameter                                                                                                                                                                                                                                                                      |
| 10   |                                              | Validate token: <br>`SELECT id, reset_token_expiry FROM User WHERE reset_token = :token`                                                                                                                                                                                                                                            |
| 11   |                                              | Kiểm tra token expiry: `reset_token_expiry > NOW()`                                                                                                                                                                                                                                                                                 |
| 12   |                                              | Hiển thị form nhập mật khẩu mới với 2 trường: New Password, Confirm New Password                                                                                                                                                                                                                                                    |
| 13   | Nhập mật khẩu mới và xác nhận, click "Reset" |                                                                                                                                                                                                                                                                                                                                     |
| 14   |                                              | Validate mật khẩu: <br>- ≥8 ký tự <br>- Chứa chữ hoa, chữ thường, số <br>- New Password = Confirm New Password                                                                                                                                                                                                                      |
| 15   |                                              | Hash mật khẩu mới và cập nhật: <br>`UPDATE User SET password = :hashed_password, reset_token = NULL, reset_token_expiry = NULL WHERE reset_token = :token`                                                                                                                                                                          |
| 16   |                                              | Gửi email xác nhận đổi mật khẩu thành công                                                                                                                                                                                                                                                                                          |
| 17   |                                              | Redirect đến Sign In View với thông báo: "Mật khẩu đã được đặt lại thành công. Vui lòng đăng nhập"                                                                                                                                                                                                                                  |
| 18   | Đăng nhập với mật khẩu mới                   |                                                                                                                                                                                                                                                                                                                                     |

### Luồng sự kiện phụ

**4a. Email format không hợp lệ:**

- 4a.1. Hiển thị: "Định dạng email không hợp lệ"
- 4a.2. Quay lại bước 2

**5a. Email không tồn tại hoặc tài khoản bị khóa:**

- 5a.1. Vẫn hiển thị thông báo thành công như bước 7 (để tránh email enumeration attack)
- 5a.2. Không gửi email
- 5a.3. Ghi log cảnh báo
- 5a.4. Kết thúc use case

**10a. Token không hợp lệ:**

- 10a.1. Hiển thị: "Link đặt lại mật khẩu không hợp lệ"
- 10a.2. Cung cấp link "Request New Reset Link"
- 10a.3. Kết thúc use case

**11a. Token đã hết hạn:**

- 11a.1. Hiển thị: "Link đặt lại mật khẩu đã hết hạn (hợp lệ trong 24 giờ)"
- 11a.2. Cung cấp link "Request New Reset Link"
- 11a.3. Xóa token: `UPDATE User SET reset_token = NULL, reset_token_expiry = NULL WHERE reset_token = :token`
- 11a.4. Kết thúc use case

**14a. Mật khẩu không hợp lệ:**

- 14a.1. Hiển thị lỗi chi tiết (độ dài, ký tự, confirm mismatch)
- 14a.2. Giữ nguyên form
- 14a.3. Quay lại bước 12

**15a. Lỗi khi cập nhật mật khẩu:**

- 15a.1. Hiển thị: "Không thể đặt lại mật khẩu. Vui lòng thử lại hoặc liên hệ hỗ trợ"
- 15a.2. Ghi log lỗi
- 15a.3. Giữ nguyên token
- 15a.4. Kết thúc use case

### Ràng buộc nghiệp vụ/Kỹ thuật

- **Token expiry**: 24 giờ kể từ khi tạo, sau đó tự động vô hiệu hóa
- **Token uniqueness**: Mỗi reset request tạo token mới, vô hiệu hóa token cũ
- **One-time use**: Token chỉ dùng 1 lần, sau khi reset thành công sẽ bị xóa
- **Password strength**: Giống như Sign Up (≥8 chars, mixed case, numbers)
- **Email enumeration prevention**: Không tiết lộ thông tin về email có tồn tại hay không
- **Rate limiting**: Giới hạn số lần request reset trong 1 giờ (max 3 lần/IP, max 5 lần/email)
- **Audit trail**: Ghi log mọi reset request (thành công/thất bại) với timestamp và IP

### Yêu cầu bảo mật

- **Token strength**: UUID v4 hoặc secure random string (32+ chars)
- **HTTPS required**: Tất cả flow phải qua HTTPS
- **Email security**: Link chỉ gửi qua email đã xác thực, không hiển thị trên UI
- **Token storage**: Hash token trong database (optional, hoặc dùng signed JWT)
- **Timing attack mitigation**: Response time giống nhau cho cả trường hợp email tồn tại/không tồn tại
- **XSS prevention**: Token không được expose qua JavaScript (HttpOnly cookies nếu dùng cookies)

---

## UC_AUTH_04: Manage Profile (Quản lý hồ sơ cá nhân)

### Mô tả

Người dùng có thể xem và cập nhật thông tin cá nhân của mình, bao gồm thay đổi mật khẩu.

### Tác nhân chính

- User (Customer/Staff/Admin)

### Điều kiện tiên quyết

- Người dùng đã đăng nhập
- JWT token hợp lệ

### Điều kiện hậu

- Cập nhật thông tin User trong database
- Gửi email thông báo nếu thay đổi email hoặc password

### Luồng sự kiện chính

| Bước | User                                                 | Hệ thống                                                                                                                                                                                                                                                                                                  |
| ---- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Truy cập Profile/Account Settings từ menu người dùng |                                                                                                                                                                                                                                                                                                           |
| 2    |                                                      | Verify JWT token và extract user_id                                                                                                                                                                                                                                                                       |
| 3    |                                                      | Query thông tin user: <br>`SELECT username, full_name, email, phone_number, address, birthday, gender, role, created_at, last_login_at FROM User WHERE id = :user_id`                                                                                                                                     |
| 4    |                                                      | Hiển thị Profile View với 2 tabs: <br>**Tab 1 - Personal Information**: username (read-only), full_name, email, phone_number, address, birthday, gender <br>**Tab 2 - Security**: Change Password form (Current Password, New Password, Confirm New Password)                                             |
| 5    | Chỉnh sửa thông tin cá nhân và click "Save"          |                                                                                                                                                                                                                                                                                                           |
| 6    |                                                      | Validate dữ liệu: <br>- Full name không rỗng <br>- Email format hợp lệ <br>- Email unique (ngoại trừ email hiện tại của user): <br>`SELECT COUNT(*) FROM User WHERE email = :new_email AND id != :user_id` <br>- Phone number format hợp lệ (10-11 digits) nếu có <br>- Birthday hợp lệ (≥18 tuổi) nếu có |
| 7    |                                                      | Cập nhật thông tin: <br>`UPDATE User SET full_name = :full_name, email = :email, phone_number = :phone, address = :address, birthday = :birthday, gender = :gender, updated_at = NOW() WHERE id = :user_id`                                                                                               |
| 8    |                                                      | Nếu email thay đổi: <br>1) Gửi email xác nhận đến email mới <br>2) Gửi email thông báo đến email cũ <br>3) (Optional) Đánh dấu email_verified = false và yêu cầu verify email mới                                                                                                                         |
| 9    |                                                      | Hiển thị thông báo: "Thông tin cá nhân đã được cập nhật thành công"                                                                                                                                                                                                                                       |
| 10   | Hoàn tất                                             |                                                                                                                                                                                                                                                                                                           |

### Luồng thay đổi mật khẩu

| Bước | User                                                      | Hệ thống                                                                                                                                                                           |
| ---- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chuyển sang tab "Security" và nhập thông tin đổi mật khẩu |                                                                                                                                                                                    |
| 2    | Click "Change Password"                                   |                                                                                                                                                                                    |
| 3    |                                                           | Validate mật khẩu hiện tại: <br>`SELECT password FROM User WHERE id = :user_id` <br>Verify current_password hash                                                                   |
| 4    |                                                           | Validate mật khẩu mới: <br>- ≥8 ký tự <br>- Chứa chữ hoa, chữ thường, số <br>- Khác mật khẩu hiện tại <br>- New Password = Confirm New Password                                    |
| 5    |                                                           | Hash mật khẩu mới và cập nhật: <br>`UPDATE User SET password = :new_hashed_password, updated_at = NOW() WHERE id = :user_id`                                                       |
| 6    |                                                           | Gửi email xác nhận đổi mật khẩu thành công                                                                                                                                         |
| 7    |                                                           | (Optional) Invalidate tất cả JWT tokens hiện tại (force re-login): <br>- Tăng token_version trong User table <br>- Hoặc thêm changed_password_at timestamp và check khi verify JWT |
| 8    |                                                           | Hiển thị thông báo: "Mật khẩu đã được thay đổi thành công. Vui lòng đăng nhập lại"                                                                                                 |
| 9    |                                                           | Redirect đến Sign In View                                                                                                                                                          |

### Luồng sự kiện phụ

**6a. Dữ liệu không hợp lệ:**

- 6a.1. Hiển thị lỗi chi tiết (trường nào sai)
- 6a.2. Giữ nguyên dữ liệu đã nhập (trừ password)
- 6a.3. Quay lại bước 4

**6b. Email đã tồn tại (thuộc user khác):**

- 6b.1. Hiển thị: "Email này đã được sử dụng bởi tài khoản khác"
- 6b.2. Quay lại bước 4

**3a. Mật khẩu hiện tại không đúng:**

- 3a.1. Hiển thị: "Mật khẩu hiện tại không chính xác"
- 3a.2. Quay lại tab Security
- 3a.3. Ghi log cảnh báo (possible unauthorized access attempt)

**4a. Mật khẩu mới không hợp lệ:**

- 4a.1. Hiển thị lỗi chi tiết (độ dài, ký tự, giống mật khẩu cũ, confirm mismatch)
- 4a.2. Giữ nguyên form (clear password fields)
- 4a.3. Quay lại tab Security

**7a. Lỗi khi cập nhật:**

- 7a.1. Hiển thị: "Không thể cập nhật thông tin. Vui lòng thử lại"
- 7a.2. Ghi log lỗi
- 7a.3. Kết thúc use case

### Ràng buộc nghiệp vụ/Kỹ thuật

- **Username immutability**: Username không thể thay đổi sau khi tạo tài khoản
- **Email uniqueness**: Email phải unique trong toàn hệ thống
- **Password strength**: Giống như Sign Up và Forgot Password
- **Age restriction**: Birthday phải đảm bảo user ≥18 tuổi
- **Phone format**: 10-11 chữ số (Vietnam phone number)
- **Email verification**: Nếu thay đổi email, nên yêu cầu verify email mới trước khi sử dụng đầy đủ
- **Audit trail**: Ghi log mọi thay đổi thông tin quan trọng (email, password) với timestamp và IP

### Yêu cầu bảo mật

- **Re-authentication for sensitive changes**: Yêu cầu nhập mật khẩu hiện tại khi đổi email/password
- **Session invalidation**: Sau khi đổi password, invalidate tất cả sessions cũ (trừ session hiện tại - optional)
- **Email notifications**: Gửi email thông báo mọi thay đổi về email và password
- **Rate limiting**: Giới hạn số lần đổi password trong 1 ngày (max 3 lần)
- **Password history**: (Optional) Không cho phép dùng lại 3 mật khẩu gần nhất
- **HTTPS required**: Tất cả thao tác phải qua HTTPS
- **XSS/CSRF prevention**: Validate và sanitize tất cả input

---

## Bảng User (Cập nhật schema)

Để hỗ trợ Forgot Password và Manage Profile, schema User cần bổ sung:

```sql
ALTER TABLE User ADD COLUMN reset_token VARCHAR(64) UNIQUE;
ALTER TABLE User ADD COLUMN reset_token_expiry DATETIME;
ALTER TABLE User ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE User ADD COLUMN last_password_change_at DATETIME;
ALTER TABLE User ADD COLUMN token_version INT DEFAULT 0;
ALTER TABLE User ADD COLUMN updated_at DATETIME DEFAULT NOW() ON UPDATE NOW();

CREATE INDEX idx_reset_token ON User(reset_token);
CREATE INDEX idx_email ON User(email);
```

**Giải thích các trường mới:**

- **reset_token**: Token UUID để reset password (nullable, unique)
- **reset_token_expiry**: Thời hạn hết hạn của reset token
- **email_verified**: Đánh dấu email đã được xác thực (optional - cho Email Verification flow)
- **last_password_change_at**: Timestamp lần cuối đổi password (để invalidate old JWT tokens)
- **token_version**: Version của token để force logout khi đổi password
- **updated_at**: Timestamp lần cuối cập nhật thông tin

---

## Tổng kết

Tài liệu này mô tả **4 use case chính** cho Authentication & Account Management:

1. **UC_AUTH_01**: Sign Up - Đăng ký tài khoản mới với PKCE flow
2. **UC_AUTH_02**: Sign In - Đăng nhập với xác thực an toàn
3. **UC_AUTH_03**: Forgot Password - Đặt lại mật khẩu qua email với reset token (24h expiry)
4. **UC_AUTH_04**: Manage Profile - Quản lý thông tin cá nhân và đổi mật khẩu

### Đặc điểm chung của tất cả use cases:

- **OAuth 2.0 PKCE flow**: Sign Up và Sign In sử dụng PKCE để bảo mật
- **JWT token management**: Session được quản lý bằng JWT với token invalidation khi cần
- **Email notifications**: Gửi email cho tất cả thao tác quan trọng (sign up, password reset, password change, email change)
- **Rate limiting**: Bảo vệ chống brute-force và abuse
- **Audit trail**: Ghi log đầy đủ cho security audit
- **Security best practices**:
  - Password hashing với bcrypt/argon2id
  - Timing attack mitigation
  - Email enumeration prevention
  - XSS/CSRF protection
  - HTTPS requirement
- **User experience**: Clear error messages, confirmation emails, success notifications

### Tích hợp với các hệ thống con:

- **Authentication Manager**: Xử lý PKCE flow, JWT generation, token validation
- **Email Service**: Gửi welcome email, password reset link, change notifications
- **Backend User Management**: CRUD operations trên User table, audit logging
- **Frontend Views**: SignInView, SignUpView, ForgotPasswordView, ResetPasswordView, ProfileView

### Security Considerations:

1. **Forgot Password**:

   - Token-based với expiry 24h
   - One-time use token
   - Email enumeration prevention
   - Rate limiting (3 requests/hour per IP)

2. **Manage Profile**:
   - Re-authentication cho sensitive changes
   - Email verification cho email mới
   - Session invalidation sau đổi password
   - Password history (optional - không dùng lại 3 passwords gần nhất)

### Database Changes Required:

- Thêm 6 columns mới vào User table để hỗ trợ password reset và profile management
- Tạo indexes cho reset_token và email để tăng performance
