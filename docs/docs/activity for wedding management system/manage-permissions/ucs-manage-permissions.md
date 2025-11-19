# ĐẶC TẢ CÁC USE CASE - MANAGE PERMISSIONS

Tài liệu này mô tả các use case thuộc nhóm quản lý nhóm quyền (Permission Groups) dành cho Quản trị viên (Admin) trong Hệ thống Quản lý Tiệc Cưới.

Gồm 4 use case chính:

1. View Permission Group Details (Xem danh sách & chi tiết nhóm quyền)
2. Add New Permission Group (Thêm nhóm quyền mới)
3. Edit Permission Group (Sửa nhóm quyền - Tên & Quyền)
4. Delete Permission Group (Xóa nhóm quyền)

---

## UC_MP_01: View Permission Group Details (Xem danh sách & chi tiết nhóm quyền)

### Mô tả

Quản trị viên xem danh sách các nhóm quyền trong hệ thống và có thể xem chi tiết các chức năng được phân quyền cho từng nhóm.

### Tác nhân chính

- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Admin

### Điều kiện hậu

- Hiển thị danh sách nhóm quyền với thông tin cơ bản
- Hiển thị chi tiết các chức năng được phân quyền cho nhóm được chọn (nếu có)

### Luồng sự kiện chính

| Bước | Admin                               | Hệ thống                                                                                                                                                                                                                        |
| ---- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "Quản lý nhóm quyền" |                                                                                                                                                                                                                                 |
| 2    |                                     | Truy vấn danh sách nhóm quyền: <br>`SELECT MaNhom, TenNhom` <br>`FROM NHOMNGUOIDUNG` <br>`ORDER BY MaNhom`                                                                                                                      |
| 3    |                                     | Hiển thị danh sách với các cột: Mã nhóm, Tên nhóm, Hành động (Xem chi tiết, Chỉnh sửa, Xóa)                                                                                                                                     |
| 4    | (Tùy chọn) Nhập từ khóa tìm kiếm    |                                                                                                                                                                                                                                 |
| 5    | Click "Tìm kiếm"                    |                                                                                                                                                                                                                                 |
| 6    |                                     | Truy vấn với WHERE: <br>`SELECT MaNhom, TenNhom` <br>`FROM NHOMNGUOIDUNG` <br>`WHERE TenNhom LIKE N'%keyword%'` <br>`ORDER BY MaNhom`                                                                                           |
| 7    |                                     | Hiển thị kết quả tìm kiếm                                                                                                                                                                                                       |
| 8    | Chọn nhóm quyền muốn xem chi tiết   |                                                                                                                                                                                                                                 |
| 9    |                                     | Truy vấn thông tin nhóm: <br>`SELECT MaNhom, TenNhom` <br>`FROM NHOMNGUOIDUNG` <br>`WHERE MaNhom = @MaNhom`                                                                                                                     |
| 10   |                                     | Truy vấn danh sách quyền: <br>`SELECT c.MaChucNang, c.TenChucNang, c.TenManHinhDuocLoad` <br>`FROM PHANQUYEN p` <br>`JOIN CHUCNANG c ON p.MaChucNang = c.MaChucNang` <br>`WHERE p.MaNhom = @MaNhom` <br>`ORDER BY c.MaChucNang` |
| 11   |                                     | Hiển thị dialog chi tiết với: Thông tin nhóm (Mã nhóm, Tên nhóm), Danh sách chức năng (Mã chức năng, Tên chức năng, Màn hình), Hành động (Chỉnh sửa quyền, Xóa nhóm)                                                            |
| 12   | Xem thông tin chi tiết              |                                                                                                                                                                                                                                 |

### Luồng sự kiện phụ

Không có luồng phụ đặc biệt.

### Ràng buộc nghiệp vụ/SQL gợi ý

- Thêm index trên `NHOMNGUOIDUNG.TenNhom` để tăng tốc tìm kiếm
- Hiển thị số lượng người dùng thuộc mỗi nhóm quyền (nếu cần): `SELECT COUNT(*) FROM NGUOIDUNG WHERE MaNhom = @MaNhom`

---

## UC_MP_02: Add New Permission Group (Thêm nhóm quyền mới)

### Mô tả

Quản trị viên tạo nhóm quyền mới và phân quyền các chức năng cho nhóm đó.

### Tác nhân chính

- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Admin
- Danh sách chức năng (CHUCNANG) đã tồn tại trong hệ thống

### Điều kiện hậu

- Tạo bản ghi NHOMNGUOIDUNG mới
- Tạo các bản ghi PHANQUYEN tương ứng với các chức năng được chọn

### Luồng sự kiện chính

| Bước | Admin                                       | Hệ thống                                                                                                                                                                                                                                                                                            |
| ---- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "Thêm nhóm quyền mới"        |                                                                                                                                                                                                                                                                                                     |
| 2    |                                             | Truy vấn danh sách chức năng: <br>`SELECT MaChucNang, TenChucNang, TenManHinhDuocLoad` <br>`FROM CHUCNANG` <br>`ORDER BY MaChucNang`                                                                                                                                                                |
| 3    |                                             | Hiển thị form thêm nhóm quyền với: Trường nhập (Mã nhóm, Tên nhóm), Danh sách chức năng với checkbox để chọn quyền                                                                                                                                                                                  |
| 4    | Nhập thông tin nhóm quyền và chọn các quyền |                                                                                                                                                                                                                                                                                                     |
| 5    | Click "Lưu"                                 |                                                                                                                                                                                                                                                                                                     |
| 6    |                                             | Kiểm tra dữ liệu: <br>- Mã nhóm không để trống, độ dài ≤ 10 ký tự <br>- Tên nhóm không để trống, độ dài ≤ 100 ký tự <br>- Ít nhất một chức năng được chọn                                                                                                                                           |
| 7    |                                             | Kiểm tra trùng lặp: <br>`SELECT COUNT(*) FROM NHOMNGUOIDUNG` <br>`WHERE MaNhom = @MaNhom OR TenNhom = @TenNhom`                                                                                                                                                                                     |
| 8    |                                             | Thực hiện thêm trong transaction: <br>`BEGIN TRANSACTION` <br>`INSERT INTO NHOMNGUOIDUNG (MaNhom, TenNhom)` <br>`VALUES (@MaNhom, @TenNhom)` <br><br>Với mỗi chức năng được chọn: <br>`INSERT INTO PHANQUYEN (MaNhom, MaChucNang)` <br>`VALUES (@MaNhom, @MaChucNang)` <br><br>`COMMIT TRANSACTION` |
| 9    |                                             | Hiển thị thông báo "Thêm nhóm quyền thành công" và chuyển về danh sách nhóm quyền                                                                                                                                                                                                                   |
| 10   | Xem nhóm quyền mới trong danh sách          |                                                                                                                                                                                                                                                                                                     |

### Luồng sự kiện phụ

- 6a. Dữ liệu không hợp lệ: hiển thị thông báo lỗi cụ thể (trường nào thiếu/sai format), quay về bước 4
- 7a. Mã nhóm hoặc tên nhóm đã tồn tại: hiển thị "Mã nhóm hoặc tên nhóm đã tồn tại trong hệ thống", quay về bước 4
- 8a. Lỗi database khi insert: rollback transaction, hiển thị "Có lỗi xảy ra khi thêm nhóm quyền. Vui lòng thử lại", quay về bước 4

### Ràng buộc nghiệp vụ/SQL gợi ý

- Mã nhóm nên theo quy tắc đặt tên rõ ràng (VD: ADMIN, STAFF, MANAGER)
- Tên nhóm phải là duy nhất (UNIQUE constraint)
- Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu
- Nên có ít nhất một nhóm quyền "Admin" với đầy đủ quyền trong hệ thống

---

## UC_MP_03: Edit Permission Group (Sửa nhóm quyền - Tên & Quyền)

### Mô tả

Quản trị viên chỉnh sửa thông tin nhóm quyền (tên nhóm) và cập nhật các chức năng được phân quyền.

### Tác nhân chính

- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Admin
- Nhóm quyền cần chỉnh sửa đã tồn tại trong hệ thống

### Điều kiện hậu

- Cập nhật thông tin NHOMNGUOIDUNG
- Cập nhật các bản ghi PHANQUYEN (xóa quyền cũ, thêm quyền mới)

### Luồng sự kiện chính

| Bước | Admin                                     | Hệ thống                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "Chỉnh sửa nhóm quyền"     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 2    |                                           | Hiển thị danh sách nhóm quyền                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 3    | Chọn nhóm quyền muốn chỉnh sửa            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 4    |                                           | Truy vấn thông tin nhóm: <br>`SELECT MaNhom, TenNhom FROM NHOMNGUOIDUNG` <br>`WHERE MaNhom = @MaNhom`                                                                                                                                                                                                                                                                                                                                                           |
| 5    |                                           | Truy vấn quyền hiện tại: <br>`SELECT MaChucNang FROM PHANQUYEN` <br>`WHERE MaNhom = @MaNhom`                                                                                                                                                                                                                                                                                                                                                                    |
| 6    |                                           | Truy vấn tất cả chức năng: <br>`SELECT MaChucNang, TenChucNang, TenManHinhDuocLoad` <br>`FROM CHUCNANG`                                                                                                                                                                                                                                                                                                                                                         |
| 7    |                                           | Hiển thị form chỉnh sửa với: Trường nhập (Mã nhóm - readonly, Tên nhóm - editable), Danh sách chức năng với checkbox (đánh dấu sẵn các quyền hiện có)                                                                                                                                                                                                                                                                                                           |
| 8    | Chỉnh sửa tên nhóm và/hoặc thay đổi quyền |                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 9    | Click "Lưu"                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 10   |                                           | Kiểm tra dữ liệu: <br>- Tên nhóm không để trống, độ dài ≤ 100 ký tự <br>- Ít nhất một chức năng được chọn                                                                                                                                                                                                                                                                                                                                                       |
| 11   |                                           | Kiểm tra trùng tên (nếu đổi tên): <br>`SELECT COUNT(*) FROM NHOMNGUOIDUNG` <br>`WHERE TenNhom = @TenNhom AND MaNhom <> @MaNhom`                                                                                                                                                                                                                                                                                                                                 |
| 12   |                                           | Thực hiện cập nhật trong transaction: <br>`BEGIN TRANSACTION` <br><br>Cập nhật tên nhóm (nếu thay đổi): <br>`UPDATE NHOMNGUOIDUNG` <br>`SET TenNhom = @TenNhom` <br>`WHERE MaNhom = @MaNhom` <br><br>Xóa tất cả quyền cũ: <br>`DELETE FROM PHANQUYEN` <br>`WHERE MaNhom = @MaNhom` <br><br>Thêm quyền mới: <br>`INSERT INTO PHANQUYEN (MaNhom, MaChucNang)` <br>`VALUES (@MaNhom, @MaChucNang)` -- lặp cho mỗi chức năng được chọn <br><br>`COMMIT TRANSACTION` |
| 13   |                                           | Hiển thị thông báo "Cập nhật nhóm quyền thành công" và reload danh sách                                                                                                                                                                                                                                                                                                                                                                                         |
| 14   | Xem thông tin nhóm quyền đã cập nhật      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

### Luồng sự kiện phụ

- 10a. Dữ liệu không hợp lệ: hiển thị thông báo lỗi cụ thể, quay về bước 8
- 11a. Tên nhóm đã tồn tại: hiển thị "Tên nhóm đã tồn tại trong hệ thống", quay về bước 8
- 12a. Lỗi database: rollback transaction, hiển thị "Có lỗi xảy ra khi cập nhật nhóm quyền. Vui lòng thử lại", quay về bước 8

### Ràng buộc nghiệp vụ/SQL gợi ý

- Mã nhóm không được phép thay đổi (là khóa chính và được tham chiếu bởi nhiều bảng)
- Phải xóa hết quyền cũ trước khi thêm quyền mới để tránh conflict
- Sử dụng transaction để đảm bảo tính toàn vẹn
- Cảnh báo nếu thay đổi quyền của nhóm có nhiều người dùng

---

## UC_MP_04: Delete Permission Group (Xóa nhóm quyền)

### Mô tả

Quản trị viên xóa nhóm quyền khỏi hệ thống sau khi kiểm tra không còn người dùng nào thuộc nhóm đó.

### Tác nhân chính

- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Admin
- Nhóm quyền cần xóa đã tồn tại trong hệ thống

### Điều kiện hậu

- Xóa bản ghi NHOMNGUOIDUNG
- Xóa các bản ghi PHANQUYEN liên quan

### Luồng sự kiện chính

| Bước | Admin                           | Hệ thống                                                                                                                                                                                                                                                             |
| ---- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "Xóa nhóm quyền" |                                                                                                                                                                                                                                                                      |
| 2    |                                 | Hiển thị danh sách nhóm quyền                                                                                                                                                                                                                                        |
| 3    | Chọn nhóm quyền muốn xóa        |                                                                                                                                                                                                                                                                      |
| 4    | Click nút "Xóa"                 |                                                                                                                                                                                                                                                                      |
| 5    |                                 | Kiểm tra dữ liệu tham chiếu: <br>`SELECT COUNT(*) FROM NGUOIDUNG` <br>`WHERE MaNhom = @MaNhom`                                                                                                                                                                       |
| 6    |                                 | Hiển thị dialog xác nhận: "Bạn có chắc chắn muốn xóa nhóm quyền '[Tên nhóm]'? Hành động này không thể hoàn tác."                                                                                                                                                     |
| 7    | Click "Xác nhận" hoặc "Hủy"     |                                                                                                                                                                                                                                                                      |
| 8    |                                 | Thực hiện xóa trong transaction: <br>`BEGIN TRANSACTION` <br><br>Xóa các quyền liên quan: <br>`DELETE FROM PHANQUYEN` <br>`WHERE MaNhom = @MaNhom` <br><br>Xóa nhóm quyền: <br>`DELETE FROM NHOMNGUOIDUNG` <br>`WHERE MaNhom = @MaNhom` <br><br>`COMMIT TRANSACTION` |
| 9    |                                 | Hiển thị thông báo "Xóa nhóm quyền thành công" và reload danh sách                                                                                                                                                                                                   |
| 10   | Xem danh sách đã cập nhật       |                                                                                                                                                                                                                                                                      |

### Luồng sự kiện phụ

- 5a. Nhóm quyền có người dùng tham chiếu: chặn thao tác và hiển thị "Không thể xóa nhóm quyền này vì đang có X người dùng thuộc nhóm. Vui lòng chuyển người dùng sang nhóm khác trước khi xóa.", dừng use case
- 7a. Admin click "Hủy": đóng dialog xác nhận, dừng use case
- 8a. Lỗi database: rollback transaction, hiển thị "Có lỗi xảy ra khi xóa nhóm quyền. Vui lòng thử lại"

### Ràng buộc nghiệp vụ/SQL gợi ý

- **BẮT BUỘC** kiểm tra dữ liệu tham chiếu trước khi xóa
- Chỉ thực hiện xóa vật lý (hard delete) khi không có dữ liệu tham chiếu
- Sử dụng transaction để đảm bảo tính toàn vẹn
- Không cho phép xóa nhóm "Admin" mặc định của hệ thống
- Xóa theo thứ tự: PHANQUYEN trước, NHOMNGUOIDUNG sau (tuân thủ ràng buộc khóa ngoại)

---

## PHỤ LỤC: THÔNG TIN BẢNG DATABASE

### Bảng NHOMNGUOIDUNG

| Tên cột | Kiểu dữ liệu  | Ràng buộc       | Mô tả          |
| ------- | ------------- | --------------- | -------------- |
| MaNhom  | VARCHAR(10)   | PRIMARY KEY     | Mã nhóm quyền  |
| TenNhom | NVARCHAR(100) | UNIQUE NOT NULL | Tên nhóm quyền |

### Bảng CHUCNANG

| Tên cột            | Kiểu dữ liệu  | Ràng buộc   | Mô tả                  |
| ------------------ | ------------- | ----------- | ---------------------- |
| MaChucNang         | VARCHAR(10)   | PRIMARY KEY | Mã chức năng           |
| TenChucNang        | NVARCHAR(100) |             | Tên chức năng          |
| TenManHinhDuocLoad | NVARCHAR(100) |             | Tên màn hình được load |

### Bảng PHANQUYEN

| Tên cột    | Kiểu dữ liệu | Ràng buộc                               | Mô tả         |
| ---------- | ------------ | --------------------------------------- | ------------- |
| MaNhom     | VARCHAR(10)  | PRIMARY KEY, FK → NHOMNGUOIDUNG(MaNhom) | Mã nhóm quyền |
| MaChucNang | VARCHAR(10)  | PRIMARY KEY, FK → CHUCNANG(MaChucNang)  | Mã chức năng  |

### Bảng NGUOIDUNG (liên quan)

| Tên cột     | Kiểu dữ liệu | Ràng buộc                  | Mô tả         |
| ----------- | ------------ | -------------------------- | ------------- |
| MaNguoiDung | INT          | PRIMARY KEY IDENTITY(1,1)  | Mã người dùng |
| MaNhom      | VARCHAR(10)  | FK → NHOMNGUOIDUNG(MaNhom) | Mã nhóm quyền |
| ...         | ...          | ...                        | ...           |
