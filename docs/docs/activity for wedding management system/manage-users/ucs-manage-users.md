# ĐẶC TẢ CÁC USE CASE - MANAGE USERS

Tài liệu này mô tả các use case thuộc nhóm quản lý người dùng (Users) dành cho Quản trị viên (Admin) trong Hệ thống Quản lý Tiệc Cưới.

Gồm 4 use case chính:

1. View User Details (Xem danh sách & chi tiết người dùng)
2. Add New User (Thêm người dùng - nhân viên)
3. Edit User (Sửa thông tin người dùng)
4. Delete User (Xóa người dùng)

---

## UC_MU_01: View User Details (Xem danh sách & chi tiết người dùng)

### Mô tả

Quản trị viên xem danh sách người dùng trong hệ thống và có thể lọc, tìm kiếm theo nhiều tiêu chí, cũng như xem chi tiết thông tin của từng người dùng.

### Tác nhân chính

- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Admin

### Điều kiện hậu

- Hiển thị danh sách người dùng theo tiêu chí lọc (nếu có) với phân trang/sắp xếp
- Hiển thị chi tiết thông tin người dùng được chọn (nếu có)

### Luồng sự kiện chính

| Bước | Admin                                    | Hệ thống                                                                                                                                                                                                                                      |
| ---- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "Quản lý người dùng"      |                                                                                                                                                                                                                                               |
| 2    |                                          | Truy vấn danh sách người dùng: <br>`SELECT u.UserId, u.FullName, u.Email, u.PhoneNumber, g.GroupName` <br>`FROM AppUser u` <br>`LEFT JOIN UserGroup g ON u.GroupId = g.GroupId` <br>`ORDER BY u.UserId DESC`                                  |
| 3    |                                          | Hiển thị danh sách với các cột: Mã người dùng, Họ tên, Email, SĐT, Nhóm quyền, Hành động (Xem chi tiết, Chỉnh sửa, Xóa)                                                                                                                       |
| 4    | (Tùy chọn) Nhập tiêu chí tìm kiếm/lọc    |                                                                                                                                                                                                                                               |
| 5    | Click "Tìm kiếm" hoặc "Áp dụng bộ lọc"   |                                                                                                                                                                                                                                               |
| 6    |                                          | Truy vấn với WHERE tương ứng: <br>- Theo nhóm quyền (`GroupId`) <br>- Theo họ tên (`FullName` LIKE N'%keyword%') <br>- Theo email/số điện thoại <br>`... WHERE ... ORDER BY ... OFFSET ... ROWS FETCH NEXT ... ROWS ONLY`                     |
| 7    |                                          | Hiển thị kết quả theo tiêu chí tìm kiếm/lọc                                                                                                                                                                                                   |
| 8    | Click "Xem chi tiết" trên một người dùng |                                                                                                                                                                                                                                               |
| 9    |                                          | Truy vấn thông tin chi tiết: <br>`SELECT u.*, g.GroupName` <br>`FROM AppUser u` <br>`LEFT JOIN UserGroup g ON u.GroupId = g.GroupId` <br>`WHERE u.UserId = @UserId`                                                                           |
| 10   |                                          | Truy vấn danh sách quyền: <br>`SELECT p.PermissionName` <br>`FROM GroupPermission gp` <br>`JOIN Permission p ON gp.PermissionId = p.PermissionId` <br>`WHERE gp.GroupId = @GroupId`                                                           |
| 11   |                                          | Hiển thị trang chi tiết với đầy đủ thông tin: thông tin cá nhân (họ tên, email, SĐT, địa chỉ, ngày sinh, giới tính), thông tin tài khoản (tên đăng nhập, nhóm quyền, danh sách quyền), hành động liên quan (Chỉnh sửa, Đặt lại mật khẩu, Xóa) |
| 12   | Xem thông tin chi tiết                   |                                                                                                                                                                                                                                               |

### Luồng sự kiện phụ

- 2a. Không có người dùng nào trong hệ thống: hiển thị "Chưa có người dùng nào"
- 6a. Không có kết quả phù hợp: hiển thị "Không tìm thấy người dùng phù hợp với tiêu chí" và cho phép xóa/thay đổi bộ lọc
- 9a. Người dùng không tồn tại hoặc đã bị xóa: hiển thị "Không tìm thấy người dùng" và quay về danh sách

### Ràng buộc nghiệp vụ/SQL gợi ý

- Thêm chỉ số (index) trên các cột tìm kiếm/lọc: `AppUser.Email`, `AppUser.GroupId`
- Phân trang với `OFFSET/FETCH` cho hiệu năng tốt hơn
- Mật khẩu (`PasswordHash`) không được hiển thị trong bất kỳ trường hợp nào

---

## UC_MU_02: Add New User (Thêm người dùng mới - nhân viên)

### Mô tả

Quản trị viên tạo tài khoản người dùng mới trong hệ thống, chủ yếu dành cho nhân viên.

### Tác nhân chính

- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Admin
- Nhóm quyền (`UserGroup`) dành cho người dùng mới đã tồn tại trong hệ thống

### Điều kiện hậu

- Tạo bản ghi `AppUser` mới với thông tin đầy đủ

### Luồng sự kiện chính

| Bước | Admin                                | Hệ thống                                                                                                                                                                                                                                                                                                                          |
| ---- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Thêm người dùng mới"           |                                                                                                                                                                                                                                                                                                                                   |
| 2    |                                      | Truy vấn danh sách nhóm quyền: <br>`SELECT GroupId, GroupName FROM UserGroup ORDER BY GroupName`                                                                                                                                                                                                                                  |
| 3    |                                      | Hiển thị form nhập liệu với các trường: <br>- Thông tin cá nhân: Họ tên (_), Email (_), Số điện thoại, Địa chỉ, Ngày sinh, Giới tính <br>- Thông tin tài khoản: Tên đăng nhập (_), Mật khẩu (_), Xác nhận mật khẩu (_), Nhóm quyền (_) <br>(\*) = Bắt buộc                                                                        |
| 4    | Nhập đầy đủ thông tin và click "Lưu" |                                                                                                                                                                                                                                                                                                                                   |
| 5    |                                      | Kiểm tra tính hợp lệ: <br>- Các trường bắt buộc không được trống <br>- Email hợp lệ và chưa tồn tại: <br>`SELECT COUNT(*) FROM AppUser WHERE Email = @Email` → phải = 0 <br>- Tên đăng nhập hợp lệ và chưa tồn tại: <br>`SELECT COUNT(*) FROM AppUser WHERE Username = @Username` → phải = 0 <br>- Mật khẩu và xác nhận khớp nhau |
| 6    |                                      | Hash mật khẩu sử dụng thuật toán an toàn: <br>`@PasswordHash = HASHBYTES('SHA2_256', @MatKhau)`                                                                                                                                                                                                                                   |
| 7    |                                      | Bắt đầu transaction: <br>1) Tạo người dùng mới: <br>`INSERT INTO AppUser (Username, PasswordHash, FullName, Email, PhoneNumber, Address, BirthDate, Gender, GroupId)` <br>`VALUES (@Username, @PasswordHash, @FullName, @Email, @PhoneNumber, @Address, @BirthDate, @Gender, @GroupId)` <br>Commit                                |
| 8    |                                      | Hiển thị thông báo thành công: "Thêm người dùng thành công" và điều hướng đến trang chi tiết người dùng vừa tạo                                                                                                                                                                                                                   |
| 9    | Xem kết quả                          |                                                                                                                                                                                                                                                                                                                                   |

### Luồng sự kiện phụ

- 2a. Không có nhóm quyền nào: hiển thị cảnh báo "Cần tạo nhóm quyền trước" và chuyển đến chức năng tạo nhóm quyền
- 5a. Dữ liệu không hợp lệ: hiển thị thông báo lỗi cụ thể cho từng trường và giữ nguyên dữ liệu đã nhập (trừ mật khẩu)
  - 5a1. Email đã tồn tại: "Email này đã được đăng ký trong hệ thống"
  - 5a2. Tên đăng nhập đã tồn tại: "Tên đăng nhập này đã được sử dụng"
  - 5a3. Mật khẩu không khớp: "Mật khẩu xác nhận không khớp"
- 7a. Lỗi cơ sở dữ liệu: rollback transaction và hiển thị "Có lỗi xảy ra khi tạo người dùng, vui lòng thử lại"

### Ràng buộc nghiệp vụ/SQL gợi ý

- Thêm unique constraint trên `AppUser.Email` và `AppUser.Username`
- Mật khẩu phải được hash bằng thuật toán an toàn (SHA2_256 hoặc tốt hơn)
- Không lưu mật khẩu dạng plain text

---

## UC_MU_03: Edit User (Sửa thông tin người dùng)

### Mô tả

Quản trị viên chỉnh sửa thông tin người dùng hiện có, bao gồm thông tin cá nhân và nhóm quyền.

### Tác nhân chính

- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Admin
- Người dùng cần chỉnh sửa tồn tại trong hệ thống

### Điều kiện hậu

- Cập nhật thông tin AppUser với dữ liệu mới

### Luồng sự kiện chính

| Bước | Admin                                     | Hệ thống                                                                                                                                                                                                                                                                                                            |
| ---- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Tại chi tiết người dùng, chọn "Chỉnh sửa" |                                                                                                                                                                                                                                                                                                                     |
| 2    |                                           | Truy vấn thông tin người dùng hiện tại: <br>`SELECT * FROM AppUser WHERE UserId = @UserId`                                                                                                                                                                                                                          |
| 3    |                                           | Truy vấn danh sách nhóm quyền: <br>`SELECT GroupId, GroupName FROM UserGroup ORDER BY GroupName`                                                                                                                                                                                                                    |
| 4    |                                           | Hiển thị form chỉnh sửa với dữ liệu hiện tại đã điền sẵn: <br>- Thông tin cá nhân: Họ tên (_), Email (_), Số điện thoại, Địa chỉ, Ngày sinh, Giới tính <br>- Thông tin tài khoản: Tên đăng nhập (chỉ hiển thị, không cho sửa), Nhóm quyền (_) <br>- (Tùy chọn) Nút "Đặt lại mật khẩu" riêng biệt <br>(_) = Bắt buộc |
| 5    | Sửa thông tin và click "Lưu"              |                                                                                                                                                                                                                                                                                                                     |
| 6    |                                           | Kiểm tra tính hợp lệ: <br>- Các trường bắt buộc không được trống <br>- Email hợp lệ và không trùng với người dùng khác: <br>`SELECT COUNT(*) FROM AppUser WHERE Email = @Email AND UserId != @UserId` → phải = 0 <br>- Nhóm quyền tồn tại                                                                           |
| 7    |                                           | Bắt đầu transaction: <br>1) Cập nhật thông tin: <br>`UPDATE AppUser SET` <br>`FullName = @FullName, Email = @Email, PhoneNumber = @PhoneNumber,` <br>`Address = @Address, BirthDate = @BirthDate, Gender = @Gender,` <br>`GroupId = @GroupId` <br>`WHERE UserId = @UserId` <br>Commit                               |
| 8    |                                           | Hiển thị thông báo thành công: "Cập nhật thông tin người dùng thành công" và quay về trang chi tiết người dùng                                                                                                                                                                                                      |
| 9    | Xem kết quả                               |                                                                                                                                                                                                                                                                                                                     |

### Luồng sự kiện phụ

- 2a. Người dùng không tồn tại hoặc đã bị xóa: hiển thị "Không tìm thấy người dùng" và quay về danh sách
- 6a. Dữ liệu không hợp lệ: hiển thị thông báo lỗi cụ thể và giữ nguyên dữ liệu đã nhập
  - 6a1. Email đã tồn tại: "Email này đã được sử dụng bởi người dùng khác"
  - 6a2. Nhóm quyền không tồn tại: "Nhóm quyền đã chọn không hợp lệ"
- 7a. Lỗi cơ sở dữ liệu: rollback transaction và hiển thị "Có lỗi xảy ra khi cập nhật thông tin, vui lòng thử lại"

### Luồng sự kiện đặc biệt: Đặt lại mật khẩu

| Bước | Admin                     | Hệ thống                                                                               |
| ---- | ------------------------- | -------------------------------------------------------------------------------------- |
| 1    | Click "Đặt lại mật khẩu"  |                                                                                        |
| 2    |                           | Hiển thị dialog nhập mật khẩu mới: "Nhập mật khẩu mới (_), Xác nhận mật khẩu mới (_)"  |
| 3    | Nhập mật khẩu và xác nhận |                                                                                        |
| 4    |                           | Kiểm tra mật khẩu khớp nhau                                                            |
| 5    |                           | Hash mật khẩu mới: `@PasswordHash = HASHBYTES('SHA2_256', @MatKhauMoi)`                |
| 6    |                           | Cập nhật: <br>`UPDATE AppUser SET PasswordHash = @PasswordHash WHERE UserId = @UserId` |
| 7    |                           | Hiển thị thông báo: "Đặt lại mật khẩu thành công"                                      |

### Ràng buộc nghiệp vụ/SQL gợi ý

- Thêm unique constraint trên `AppUser.Email`
- Không cho phép chỉnh sửa `Username` sau khi tạo

---

## UC_MU_04: Delete User (Xóa người dùng)

### Mô tả

Quản trị viên xóa người dùng khỏi hệ thống. Xóa vật lý nếu không có dữ liệu liên quan.

### Tác nhân chính

- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Admin
- Người dùng cần xóa tồn tại trong hệ thống

### Điều kiện hậu

- Xóa bản ghi AppUser khỏi hệ thống

### Luồng sự kiện chính

| Bước | Admin                               | Hệ thống                                                                                                               |
| ---- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 1    | Tại chi tiết người dùng, chọn "Xóa" |                                                                                                                        |
| 2    |                                     | Kiểm tra người dùng tồn tại: <br>`SELECT UserId FROM AppUser WHERE UserId = @UserId`                                   |
| 3    |                                     | Kiểm tra dữ liệu tham chiếu: <br>`SELECT COUNT(*) FROM Booking WHERE UserId = @UserId` (nếu có trường người tạo/xử lý) |
| 4    |                                     | Hiển thị dialog xác nhận: "Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác."                |
| 5    | Xác nhận xóa                        |                                                                                                                        |
| 6    |                                     | Bắt đầu transaction: <br>1) Xóa người dùng: <br>`DELETE FROM AppUser WHERE UserId = @UserId` <br>Commit                |
| 7    |                                     | Hiển thị thông báo thành công: "Xóa người dùng thành công" và quay về danh sách người dùng                             |
| 8    | Xem kết quả                         |                                                                                                                        |

### Luồng sự kiện phụ

- 2a. Người dùng không tồn tại: hiển thị "Không tìm thấy người dùng" và quay về danh sách
- 3a. Người dùng có dữ liệu tham chiếu: chặn thao tác và hiển thị "Không thể xóa người dùng này vì đang được tham chiếu trong hệ thống (X phiếu đặt tiệc). Vui lòng xóa dữ liệu liên quan trước.", dừng use case
- 5a. Hủy xác nhận: đóng dialog và quay về trang chi tiết người dùng
- 6a. Lỗi cơ sở dữ liệu: rollback transaction và hiển thị "Có lỗi xảy ra khi xóa người dùng, vui lòng thử lại"

### Ràng buộc nghiệp vụ/SQL gợi ý

- **BẮT BUỘC** kiểm tra dữ liệu tham chiếu trước khi xóa
- Không thể xóa người dùng đang có phiếu đặt tiệc hoặc dữ liệu liên quan khác
- Chỉ thực hiện xóa vật lý (hard delete) khi không có dữ liệu tham chiếu

---

## Ghi chú bổ sung

### Bảo mật

- Mật khẩu phải được hash bằng thuật toán an toàn (SHA2_256 hoặc bcrypt)
- Không bao giờ log hoặc hiển thị mật khẩu dạng plain text

### Khuyến nghị thiết kế database

```sql
-- Thêm ràng buộc unique
ALTER TABLE AppUser ADD CONSTRAINT UQ_AppUser_Email UNIQUE (Email);
ALTER TABLE AppUser ADD CONSTRAINT UQ_AppUser_Username UNIQUE (Username);

-- Thêm index cho hiệu năng
CREATE INDEX IX_AppUser_Email ON AppUser(Email);
CREATE INDEX IX_AppUser_GroupId ON AppUser(GroupId);
```

---
