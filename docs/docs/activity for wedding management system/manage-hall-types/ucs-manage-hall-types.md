# ĐẶC TẢ CÁC USE CASE - MANAGE HALL TYPES

Tài liệu này mô tả các use case thuộc nhóm quản lý loại sảnh (Hall Types) dành cho Nhân viên và Quản trị viên trong Hệ thống Quản lý Tiệc Cưới.

Gồm 5 use case chính:

1. View Hall Type Details (Xem danh sách & chi tiết Loại Sảnh)
2. Add New Hall Type (Thêm Loại Sảnh mới)
3. Edit Hall Type (Sửa Loại Sảnh & Đơn giá tối thiểu)
4. Delete Hall Type (Xóa Loại Sảnh)
5. Export Hall Types to Excel (Xuất danh sách Loại Sảnh ra Excel)

---

## UC_MHT_01: View Hall Type Details (Xem danh sách & chi tiết Loại Sảnh)

### Mô tả

Nhân viên/Admin xem danh sách loại sảnh trong hệ thống và có thể tìm kiếm theo tên loại sảnh, khoảng giá, cũng như xem chi tiết thông tin của từng loại sảnh.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin

### Điều kiện hậu

- Hiển thị danh sách loại sảnh theo tiêu chí tìm kiếm (nếu có)
- Hiển thị chi tiết thông tin loại sảnh được chọn (nếu có)

### Luồng sự kiện chính

| Bước | Staff/Admin                        | Hệ thống                                                                                                                                                                                                |
| ---- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "Quản lý loại sảnh" |                                                                                                                                                                                                         |
| 2    |                                    | Truy vấn danh sách loại sảnh: <br>`SELECT MaLoaiSanh, TenLoaiSanh, DonGiaBanToiThieu` <br>`FROM LOAISANH` <br>`ORDER BY MaLoaiSanh`                                                                     |
| 3    |                                    | Hiển thị danh sách với các cột: Mã loại sảnh, Tên loại sảnh, Đơn giá bàn tối thiểu, Hành động (Xem chi tiết, Chỉnh sửa, Xóa)                                                                            |
| 4    | (Tùy chọn) Nhập từ khóa tìm kiếm   |                                                                                                                                                                                                         |
| 5    | Click "Tìm kiếm"                   |                                                                                                                                                                                                         |
| 6    |                                    | Truy vấn với WHERE tương ứng: <br>- Theo tên loại sảnh (TenLoaiSanh LIKE N'%keyword%') <br>- Theo khoảng giá (DonGiaBanToiThieu >= @Min AND DonGiaBanToiThieu <= @Max) <br>`... WHERE ... ORDER BY ...` |
| 7    |                                    | Hiển thị kết quả theo tiêu chí tìm kiếm                                                                                                                                                                 |
| 8    | Chọn loại sảnh muốn xem chi tiết   |                                                                                                                                                                                                         |
| 9    |                                    | Truy vấn thông tin chi tiết: <br>`SELECT MaLoaiSanh, TenLoaiSanh, DonGiaBanToiThieu` <br>`FROM LOAISANH` <br>`WHERE MaLoaiSanh = @MaLoaiSanh`                                                           |
| 10   |                                    | Truy vấn số lượng sảnh thuộc loại này: <br>`SELECT COUNT(*) FROM SANH WHERE MaLoaiSanh = @MaLoaiSanh`                                                                                                   |
| 11   |                                    | Hiển thị dialog chi tiết với: Mã loại sảnh, Tên loại sảnh, Đơn giá bàn tối thiểu, Số lượng sảnh đang sử dụng loại này, Hành động (Chỉnh sửa, Xóa)                                                       |
| 12   | Xem thông tin chi tiết             |                                                                                                                                                                                                         |

### Luồng sự kiện phụ

Không có luồng phụ đặc biệt.

### Ràng buộc nghiệp vụ/SQL gợi ý

- Thêm index trên `LOAISANH.TenLoaiSanh` để tăng tốc tìm kiếm
- Hiển thị số lượng sảnh đang sử dụng mỗi loại sảnh trong danh sách (optional)

---

## UC_MHT_02: Add New Hall Type (Thêm Loại Sảnh mới)

### Mô tả

Nhân viên/Admin tạo loại sảnh mới trong hệ thống với tên và đơn giá bàn tối thiểu.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin

### Điều kiện hậu

- Tạo bản ghi LOAISANH mới với thông tin đầy đủ

### Luồng sự kiện chính

| Bước | Staff/Admin                       | Hệ thống                                                                                                                    |
| ---- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Thêm loại sảnh mới"         |                                                                                                                             |
| 2    |                                   | Hiển thị form thêm loại sảnh với: Trường nhập (Tên loại sảnh, Đơn giá bàn tối thiểu)                                        |
| 3    | Nhập thông tin loại sảnh          |                                                                                                                             |
| 4    | Click "Lưu"                       |                                                                                                                             |
| 5    |                                   | Kiểm tra dữ liệu: <br>- Tên loại sảnh không để trống, độ dài ≤ 40 ký tự <br>- Đơn giá bàn tối thiểu > 0                     |
| 6    |                                   | Kiểm tra trùng lặp tên loại sảnh: <br>`SELECT COUNT(*) FROM LOAISANH` <br>`WHERE TenLoaiSanh = @TenLoaiSanh`                |
| 7    |                                   | Thực hiện thêm: <br>`INSERT INTO LOAISANH (TenLoaiSanh, DonGiaBanToiThieu)` <br>`VALUES (@TenLoaiSanh, @DonGiaBanToiThieu)` |
| 8    |                                   | Hiển thị thông báo "Thêm loại sảnh thành công" và chuyển về danh sách loại sảnh                                             |
| 9    | Xem loại sảnh mới trong danh sách |                                                                                                                             |
| 10   | Xác nhận kết thúc                 |                                                                                                                             |

### Luồng sự kiện phụ

- 5a. Dữ liệu không hợp lệ: hiển thị thông báo lỗi cụ thể (trường nào thiếu/sai format), quay về bước 3
- 6a. Tên loại sảnh đã tồn tại: hiển thị "Tên loại sảnh đã tồn tại trong hệ thống", quay về bước 3
- 7a. Lỗi database: hiển thị "Có lỗi xảy ra khi thêm loại sảnh. Vui lòng thử lại", quay về bước 3

### Ràng buộc nghiệp vụ/SQL gợi ý

- Tên loại sảnh phải là duy nhất (UNIQUE constraint)
- Đơn giá bàn tối thiểu phải > 0 (kiểu MONEY)
- Đơn giá nên được format theo VND currency

---

## UC_MHT_03: Edit Hall Type (Sửa Loại Sảnh & Đơn giá tối thiểu)

### Mô tả

Nhân viên/Admin chỉnh sửa thông tin loại sảnh (tên và đơn giá bàn tối thiểu).

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Loại sảnh cần chỉnh sửa đã tồn tại trong hệ thống

### Điều kiện hậu

- Cập nhật thông tin LOAISANH

### Luồng sự kiện chính

| Bước | Staff/Admin                          | Hệ thống                                                                                                                                                              |
| ---- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "Chỉnh sửa loại sảnh" |                                                                                                                                                                       |
| 2    |                                      | Hiển thị danh sách loại sảnh                                                                                                                                          |
| 3    | Chọn loại sảnh muốn chỉnh sửa        |                                                                                                                                                                       |
| 4    |                                      | Truy vấn thông tin loại sảnh: <br>`SELECT MaLoaiSanh, TenLoaiSanh, DonGiaBanToiThieu` <br>`FROM LOAISANH` <br>`WHERE MaLoaiSanh = @MaLoaiSanh`                        |
| 5    |                                      | Hiển thị form chỉnh sửa với dữ liệu hiện tại: Trường nhập (Tên loại sảnh, Đơn giá bàn tối thiểu)                                                                      |
| 6    | Chỉnh sửa thông tin loại sảnh        |                                                                                                                                                                       |
| 7    | Click "Lưu"                          |                                                                                                                                                                       |
| 8    |                                      | Kiểm tra dữ liệu: <br>- Tên loại sảnh không để trống, độ dài ≤ 40 ký tự <br>- Đơn giá bàn tối thiểu > 0                                                               |
| 9    |                                      | Kiểm tra trùng tên (nếu đổi tên): <br>`SELECT COUNT(*) FROM LOAISANH` <br>`WHERE TenLoaiSanh = @TenLoaiSanh AND MaLoaiSanh <> @MaLoaiSanh`                            |
| 10   |                                      | Thực hiện cập nhật: <br>`UPDATE LOAISANH` <br>`SET TenLoaiSanh = @TenLoaiSanh,` <br>`    DonGiaBanToiThieu = @DonGiaBanToiThieu` <br>`WHERE MaLoaiSanh = @MaLoaiSanh` |
| 11   |                                      | Hiển thị thông báo "Cập nhật loại sảnh thành công" và reload danh sách                                                                                                |
| 12   | Xem thông tin loại sảnh đã cập nhật  |                                                                                                                                                                       |

### Luồng sự kiện phụ

- 8a. Dữ liệu không hợp lệ: hiển thị thông báo lỗi cụ thể, quay về bước 6
- 9a. Tên loại sảnh đã tồn tại: hiển thị "Tên loại sảnh đã tồn tại trong hệ thống", quay về bước 6
- 10a. Lỗi database: hiển thị "Có lỗi xảy ra khi cập nhật loại sảnh. Vui lòng thử lại", quay về bước 6

### Ràng buộc nghiệp vụ/SQL gợi ý

- Cảnh báo nếu thay đổi đơn giá bàn tối thiểu có thể ảnh hưởng đến các sảnh đang sử dụng loại này
- Kiểm tra số lượng sảnh bị ảnh hưởng: `SELECT COUNT(*) FROM SANH WHERE MaLoaiSanh = @MaLoaiSanh`

---

## UC_MHT_04: Delete Hall Type (Xóa Loại Sảnh)

### Mô tả

Nhân viên/Admin xóa loại sảnh khỏi hệ thống sau khi kiểm tra không còn sảnh nào sử dụng loại sảnh đó.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Loại sảnh cần xóa đã tồn tại trong hệ thống

### Điều kiện hậu

- Xóa bản ghi LOAISANH

### Luồng sự kiện chính

| Bước | Staff/Admin                    | Hệ thống                                                                                                             |
| ---- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "Xóa loại sảnh" |                                                                                                                      |
| 2    |                                | Hiển thị danh sách loại sảnh                                                                                         |
| 3    | Chọn loại sảnh muốn xóa        |                                                                                                                      |
| 4    | Click nút "Xóa"                |                                                                                                                      |
| 5    |                                | Kiểm tra dữ liệu tham chiếu: <br>`SELECT COUNT(*) FROM SANH` <br>`WHERE MaLoaiSanh = @MaLoaiSanh`                    |
| 6    |                                | Hiển thị dialog xác nhận: "Bạn có chắc chắn muốn xóa loại sảnh '[Tên loại sảnh]'? Hành động này không thể hoàn tác." |
| 7    | Click "Xác nhận" hoặc "Hủy"    |                                                                                                                      |
| 8    |                                | Thực hiện xóa: <br>`DELETE FROM LOAISANH` <br>`WHERE MaLoaiSanh = @MaLoaiSanh`                                       |
| 9    |                                | Hiển thị thông báo "Xóa loại sảnh thành công" và reload danh sách                                                    |
| 10   | Xem danh sách đã cập nhật      |                                                                                                                      |

### Luồng sự kiện phụ

- 5a. Loại sảnh có sảnh tham chiếu: chặn thao tác và hiển thị "Không thể xóa loại sảnh này vì đang có X sảnh sử dụng. Vui lòng xóa hoặc chuyển các sảnh sang loại khác trước khi xóa.", dừng use case
- 7a. Staff/Admin click "Hủy": đóng dialog xác nhận, dừng use case
- 8a. Lỗi database: hiển thị "Có lỗi xảy ra khi xóa loại sảnh. Vui lòng thử lại"

### Ràng buộc nghiệp vụ/SQL gợi ý

- **BẮT BUỘC** kiểm tra dữ liệu tham chiếu từ SANH trước khi xóa
- Chỉ thực hiện xóa vật lý (hard delete) khi không có dữ liệu tham chiếu
- Nên có ít nhất một loại sảnh trong hệ thống

---

## UC_MHT_05: Export Hall Types to Excel (Xuất danh sách Loại Sảnh ra Excel)

### Mô tả

Nhân viên/Admin xuất danh sách loại sảnh (có thể đã được lọc) ra file Excel để lưu trữ hoặc báo cáo.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Đã xem danh sách loại sảnh (có thể đã áp dụng bộ lọc)

### Điều kiện hậu

- Tạo file Excel chứa danh sách loại sảnh và tự động tải về

### Luồng sự kiện chính

| Bước | Staff/Admin                        | Hệ thống                                                                                                                                                                                                                                                                                              |
| ---- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "Quản lý loại sảnh" |                                                                                                                                                                                                                                                                                                       |
| 2    |                                    | Hiển thị danh sách loại sảnh                                                                                                                                                                                                                                                                          |
| 3    | (Tùy chọn) Áp dụng bộ lọc          |                                                                                                                                                                                                                                                                                                       |
| 4    | Click "Xuất Excel"                 |                                                                                                                                                                                                                                                                                                       |
| 5    |                                    | Truy vấn dữ liệu loại sảnh theo bộ lọc hiện tại: <br>`SELECT l.MaLoaiSanh, l.TenLoaiSanh, l.DonGiaBanToiThieu,` <br>`       (SELECT COUNT(*) FROM SANH s WHERE s.MaLoaiSanh = l.MaLoaiSanh) AS SoLuongSanh` <br>`FROM LOAISANH l` <br>`WHERE ... -- điều kiện lọc nếu có` <br>`ORDER BY l.MaLoaiSanh` |
| 6    |                                    | Tạo file Excel với: <br>- Sheet "Danh sách loại sảnh" <br>- Header: Mã loại sảnh, Tên loại sảnh, Đơn giá bàn tối thiểu, Số lượng sảnh <br>- Dữ liệu từ query <br>- Footer: Tổng số loại sảnh, Ngày xuất báo cáo                                                                                       |
| 7    |                                    | Tạo tên file: "DanhSachLoaiSanh_YYYYMMDD_HHmmss.xlsx"                                                                                                                                                                                                                                                 |
| 8    |                                    | Gửi file về trình duyệt để tải xuống                                                                                                                                                                                                                                                                  |
| 9    | Tải file Excel về máy              |                                                                                                                                                                                                                                                                                                       |
| 10   | Mở và kiểm tra file Excel          |                                                                                                                                                                                                                                                                                                       |

### Luồng sự kiện phụ

- 5a. Không có dữ liệu để xuất: hiển thị "Không có dữ liệu loại sảnh để xuất", dừng use case
- 6a. Lỗi khi tạo file Excel: hiển thị "Có lỗi xảy ra khi tạo file Excel. Vui lòng thử lại"

### Ràng buộc nghiệp vụ/SQL gợi ý

- Format file Excel: .xlsx (Office Open XML)
- Sử dụng thư viện: EPPlus, ClosedXML, hoặc NPOI
- Định dạng số tiền theo currency (VND)
- Auto-fit column width để hiển thị đẹp
- Thêm cột "Số lượng sảnh" để biết mức độ sử dụng của mỗi loại sảnh

---

## PHỤ LỤC: THÔNG TIN BẢNG DATABASE

### Bảng LOAISANH

| Tên cột           | Kiểu dữ liệu | Ràng buộc                 | Mô tả                 |
| ----------------- | ------------ | ------------------------- | --------------------- |
| MaLoaiSanh        | INT          | PRIMARY KEY IDENTITY(1,1) | Mã loại sảnh          |
| TenLoaiSanh       | NVARCHAR(40) | UNIQUE NOT NULL           | Tên loại sảnh         |
| DonGiaBanToiThieu | MONEY        |                           | Đơn giá bàn tối thiểu |

### Bảng SANH (liên quan)

| Tên cột         | Kiểu dữ liệu  | Ràng buộc                 | Mô tả               |
| --------------- | ------------- | ------------------------- | ------------------- |
| MaSanh          | INT           | PRIMARY KEY IDENTITY(1,1) | Mã sảnh             |
| MaLoaiSanh      | INT           | FK → LOAISANH(MaLoaiSanh) | Mã loại sảnh        |
| TenSanh         | NVARCHAR(40)  | UNIQUE NOT NULL           | Tên sảnh            |
| SoLuongBanToiDa | INT           |                           | Số lượng bàn tối đa |
| GhiChu          | NVARCHAR(100) |                           | Ghi chú             |
