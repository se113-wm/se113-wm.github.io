# ĐẶC TẢ CÁC USE CASE - MANAGE HALLS

Tài liệu này mô tả các use case thuộc nhóm quản lý sảnh (Halls) dành cho Nhân viên và Quản trị viên trong Hệ thống Quản lý Tiệc Cưới.

Gồm 5 use case chính:

1. View Hall Details (Xem danh sách & chi tiết Sảnh)
2. Add New Hall (Thêm Sảnh mới)
3. Edit Hall (Sửa thông tin Sảnh)
4. Delete Hall (Xóa Sảnh)
5. Export Halls to Excel (Xuất danh sách Sảnh ra Excel)

---

## UC_MH_01: View Hall Details (Xem danh sách & chi tiết Sảnh)

### Mô tả

Nhân viên/Admin xem danh sách sảnh trong hệ thống và có thể lọc, tìm kiếm theo loại sảnh, sức chứa, cũng như xem chi tiết thông tin của từng sảnh.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin

### Điều kiện hậu

- Hiển thị danh sách sảnh theo tiêu chí lọc (nếu có)
- Hiển thị chi tiết thông tin sảnh được chọn (nếu có)

### Luồng sự kiện chính

| Bước | Staff/Admin                           | Hệ thống                                                                                                                                                                                                                       |
| ---- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Chọn chức năng "Quản lý sảnh"         |                                                                                                                                                                                                                                |
| 2    |                                       | Truy vấn danh sách sảnh: <br>`SELECT s.MaSanh, s.TenSanh, s.SoLuongBanToiDa, s.GhiChu, l.TenLoaiSanh, l.DonGiaBanToiThieu` <br>`FROM SANH s` <br>`LEFT JOIN LOAISANH l ON s.MaLoaiSanh = l.MaLoaiSanh` <br>`ORDER BY s.MaSanh` |
| 3    |                                       | Hiển thị danh sách với các cột: Mã sảnh, Tên sảnh, Loại sảnh, Số lượng bàn tối đa, Đơn giá bàn tối thiểu, Ghi chú, Hành động (Xem chi tiết, Chỉnh sửa, Xóa)                                                                    |
| 4    | (Tùy chọn) Nhập tiêu chí tìm kiếm/lọc |                                                                                                                                                                                                                                |
| 5    | Click "Tìm kiếm" hoặc "Áp dụng lọc"   |                                                                                                                                                                                                                                |
| 6    |                                       | Truy vấn với WHERE tương ứng: <br>- Theo loại sảnh (MaLoaiSanh) <br>- Theo tên sảnh (TenSanh LIKE N'%keyword%') <br>- Theo sức chứa (SoLuongBanToiDa >= @Min AND SoLuongBanToiDa <= @Max) <br>`... WHERE ... ORDER BY ...`     |
| 7    |                                       | Hiển thị kết quả theo tiêu chí tìm kiếm/lọc                                                                                                                                                                                    |
| 8    | Chọn sảnh muốn xem chi tiết           |                                                                                                                                                                                                                                |
| 9    |                                       | Truy vấn thông tin chi tiết: <br>`SELECT s.*, l.TenLoaiSanh, l.DonGiaBanToiThieu` <br>`FROM SANH s` <br>`LEFT JOIN LOAISANH l ON s.MaLoaiSanh = l.MaLoaiSanh` <br>`WHERE s.MaSanh = @MaSanh`                                   |
| 10   |                                       | Hiển thị dialog chi tiết với: Mã sảnh, Tên sảnh, Loại sảnh, Số lượng bàn tối đa, Đơn giá bàn tối thiểu, Ghi chú, Hành động (Chỉnh sửa, Xóa)                                                                                    |
| 11   | Xem thông tin chi tiết                |                                                                                                                                                                                                                                |

### Luồng sự kiện phụ

Không có luồng phụ đặc biệt.

### Ràng buộc nghiệp vụ/SQL gợi ý

- Thêm index trên `SANH.MaLoaiSanh`, `SANH.TenSanh` để tăng tốc tìm kiếm
- Hiển thị số lượng phiếu đặt tiệc đang sử dụng sảnh (nếu cần): `SELECT COUNT(*) FROM PHIEUDATTIEC WHERE MaSanh = @MaSanh`

---

## UC_MH_02: Add New Hall (Thêm Sảnh mới)

### Mô tả

Nhân viên/Admin tạo sảnh mới trong hệ thống với thông tin đầy đủ.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Loại sảnh (LOAISANH) đã tồn tại trong hệ thống

### Điều kiện hậu

- Tạo bản ghi SANH mới với thông tin đầy đủ

### Luồng sự kiện chính

| Bước | Staff/Admin                  | Hệ thống                                                                                                                                                                                |
| ---- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Thêm sảnh mới"         |                                                                                                                                                                                         |
| 2    |                              | Truy vấn danh sách loại sảnh: <br>`SELECT MaLoaiSanh, TenLoaiSanh, DonGiaBanToiThieu` <br>`FROM LOAISANH` <br>`ORDER BY TenLoaiSanh`                                                    |
| 3    |                              | Hiển thị form thêm sảnh với: Trường nhập (Tên sảnh, Loại sảnh - dropdown, Số lượng bàn tối đa, Ghi chú)                                                                                 |
| 4    | Nhập thông tin sảnh          |                                                                                                                                                                                         |
| 5    | Click "Lưu"                  |                                                                                                                                                                                         |
| 6    |                              | Kiểm tra dữ liệu: <br>- Tên sảnh không để trống, độ dài ≤ 40 ký tự <br>- Loại sảnh đã được chọn <br>- Số lượng bàn tối đa > 0 và là số nguyên <br>- Ghi chú (nếu có) độ dài ≤ 100 ký tự |
| 7    |                              | Kiểm tra trùng lặp tên sảnh: <br>`SELECT COUNT(*) FROM SANH` <br>`WHERE TenSanh = @TenSanh`                                                                                             |
| 8    |                              | Thực hiện thêm: <br>`INSERT INTO SANH (MaLoaiSanh, TenSanh, SoLuongBanToiDa, GhiChu)` <br>`VALUES (@MaLoaiSanh, @TenSanh, @SoLuongBanToiDa, @GhiChu)`                                   |
| 9    |                              | Hiển thị thông báo "Thêm sảnh thành công" và chuyển về danh sách sảnh                                                                                                                   |
| 10   | Xem sảnh mới trong danh sách |                                                                                                                                                                                         |

### Luồng sự kiện phụ

- 6a. Dữ liệu không hợp lệ: hiển thị thông báo lỗi cụ thể (trường nào thiếu/sai format), quay về bước 4
- 7a. Tên sảnh đã tồn tại: hiển thị "Tên sảnh đã tồn tại trong hệ thống", quay về bước 4
- 8a. Lỗi database: hiển thị "Có lỗi xảy ra khi thêm sảnh. Vui lòng thử lại", quay về bước 4

### Ràng buộc nghiệp vụ/SQL gợi ý

- Tên sảnh phải là duy nhất (UNIQUE constraint)
- Số lượng bàn tối đa phải là số nguyên dương
- MaLoaiSanh phải tồn tại trong bảng LOAISANH (FK constraint)

---

## UC_MH_03: Edit Hall (Sửa thông tin Sảnh)

### Mô tả

Nhân viên/Admin chỉnh sửa thông tin sảnh đã tồn tại trong hệ thống.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Sảnh cần chỉnh sửa đã tồn tại trong hệ thống

### Điều kiện hậu

- Cập nhật thông tin SANH

### Luồng sự kiện chính

| Bước | Staff/Admin                     | Hệ thống                                                                                                                                                                                                      |
| ---- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "Chỉnh sửa sảnh" |                                                                                                                                                                                                               |
| 2    |                                 | Hiển thị danh sách sảnh                                                                                                                                                                                       |
| 3    | Chọn sảnh muốn chỉnh sửa        |                                                                                                                                                                                                               |
| 4    |                                 | Truy vấn thông tin sảnh: <br>`SELECT MaSanh, MaLoaiSanh, TenSanh, SoLuongBanToiDa, GhiChu` <br>`FROM SANH` <br>`WHERE MaSanh = @MaSanh`                                                                       |
| 5    |                                 | Truy vấn danh sách loại sảnh: <br>`SELECT MaLoaiSanh, TenLoaiSanh, DonGiaBanToiThieu` <br>`FROM LOAISANH`                                                                                                     |
| 6    |                                 | Hiển thị form chỉnh sửa với dữ liệu hiện tại: Trường nhập (Tên sảnh, Loại sảnh - dropdown, Số lượng bàn tối đa, Ghi chú)                                                                                      |
| 7    | Chỉnh sửa thông tin sảnh        |                                                                                                                                                                                                               |
| 8    | Click "Lưu"                     |                                                                                                                                                                                                               |
| 9    |                                 | Kiểm tra dữ liệu: <br>- Tên sảnh không để trống, độ dài ≤ 40 ký tự <br>- Loại sảnh đã được chọn <br>- Số lượng bàn tối đa > 0 và là số nguyên <br>- Ghi chú (nếu có) độ dài ≤ 100 ký tự                       |
| 10   |                                 | Kiểm tra trùng tên (nếu đổi tên): <br>`SELECT COUNT(*) FROM SANH` <br>`WHERE TenSanh = @TenSanh AND MaSanh <> @MaSanh`                                                                                        |
| 11   |                                 | Thực hiện cập nhật: <br>`UPDATE SANH` <br>`SET MaLoaiSanh = @MaLoaiSanh,` <br>`    TenSanh = @TenSanh,` <br>`    SoLuongBanToiDa = @SoLuongBanToiDa,` <br>`    GhiChu = @GhiChu` <br>`WHERE MaSanh = @MaSanh` |
| 12   |                                 | Hiển thị thông báo "Cập nhật sảnh thành công" và reload danh sách                                                                                                                                             |
| 13   | Xem thông tin sảnh đã cập nhật  |                                                                                                                                                                                                               |

### Luồng sự kiện phụ

- 9a. Dữ liệu không hợp lệ: hiển thị thông báo lỗi cụ thể, quay về bước 7
- 10a. Tên sảnh đã tồn tại: hiển thị "Tên sảnh đã tồn tại trong hệ thống", quay về bước 7
- 11a. Lỗi database: hiển thị "Có lỗi xảy ra khi cập nhật sảnh. Vui lòng thử lại", quay về bước 7

### Ràng buộc nghiệp vụ/SQL gợi ý

- Kiểm tra ảnh hưởng khi thay đổi loại sảnh (có thể ảnh hưởng đến đơn giá)
- Cảnh báo nếu giảm số lượng bàn tối đa xuống thấp hơn số bàn đã được đặt trong các phiếu đặt tiệc

---

## UC_MH_04: Delete Hall (Xóa Sảnh)

### Mô tả

Nhân viên/Admin xóa sảnh khỏi hệ thống sau khi kiểm tra không còn phiếu đặt tiệc nào sử dụng sảnh đó.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Sảnh cần xóa đã tồn tại trong hệ thống

### Điều kiện hậu

- Xóa bản ghi SANH

### Luồng sự kiện chính

| Bước | Staff/Admin                 | Hệ thống                                                                                                   |
| ---- | --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "Xóa sảnh"   |                                                                                                            |
| 2    |                             | Hiển thị danh sách sảnh                                                                                    |
| 3    | Chọn sảnh muốn xóa          |                                                                                                            |
| 4    | Click nút "Xóa"             |                                                                                                            |
| 5    |                             | Kiểm tra dữ liệu tham chiếu: <br>`SELECT COUNT(*) FROM PHIEUDATTIEC` <br>`WHERE MaSanh = @MaSanh`          |
| 6    |                             | Hiển thị dialog xác nhận: "Bạn có chắc chắn muốn xóa sảnh '[Tên sảnh]'? Hành động này không thể hoàn tác." |
| 7    | Click "Xác nhận" hoặc "Hủy" |                                                                                                            |
| 8    |                             | Thực hiện xóa: <br>`DELETE FROM SANH` <br>`WHERE MaSanh = @MaSanh`                                         |
| 9    |                             | Hiển thị thông báo "Xóa sảnh thành công" và reload danh sách                                               |
| 10   | Xem danh sách đã cập nhật   |                                                                                                            |

### Luồng sự kiện phụ

- 5a. Sảnh có phiếu đặt tiệc tham chiếu: chặn thao tác và hiển thị "Không thể xóa sảnh này vì đang có X phiếu đặt tiệc sử dụng. Vui lòng xử lý các phiếu đặt tiệc trước khi xóa.", dừng use case
- 7a. Staff/Admin click "Hủy": đóng dialog xác nhận, dừng use case
- 8a. Lỗi database: hiển thị "Có lỗi xảy ra khi xóa sảnh. Vui lòng thử lại"

### Ràng buộc nghiệp vụ/SQL gợi ý

- **BẮT BUỘC** kiểm tra dữ liệu tham chiếu từ PHIEUDATTIEC trước khi xóa
- Chỉ thực hiện xóa vật lý (hard delete) khi không có dữ liệu tham chiếu
- Có thể thêm trạng thái "Ngừng hoạt động" thay vì xóa vật lý trong tương lai

---

## UC_MH_05: Export Halls to Excel (Xuất danh sách Sảnh ra Excel)

### Mô tả

Nhân viên/Admin xuất danh sách sảnh (có thể đã được lọc) ra file Excel để lưu trữ hoặc báo cáo.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Đã xem danh sách sảnh (có thể đã áp dụng bộ lọc)

### Điều kiện hậu

- Tạo file Excel chứa danh sách sảnh và tự động tải về

### Luồng sự kiện chính

| Bước | Staff/Admin                   | Hệ thống                                                                                                                                                                                                                                                                                  |
| ---- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "Quản lý sảnh" |                                                                                                                                                                                                                                                                                           |
| 2    |                               | Hiển thị danh sách sảnh                                                                                                                                                                                                                                                                   |
| 3    | (Tùy chọn) Áp dụng bộ lọc     |                                                                                                                                                                                                                                                                                           |
| 4    | Click "Xuất Excel"            |                                                                                                                                                                                                                                                                                           |
| 5    |                               | Truy vấn dữ liệu sảnh theo bộ lọc hiện tại: <br>`SELECT s.MaSanh, s.TenSanh, l.TenLoaiSanh, s.SoLuongBanToiDa, l.DonGiaBanToiThieu, s.GhiChu` <br>`FROM SANH s` <br>`LEFT JOIN LOAISANH l ON s.MaLoaiSanh = l.MaLoaiSanh` <br>`WHERE ... -- điều kiện lọc nếu có` <br>`ORDER BY s.MaSanh` |
| 6    |                               | Tạo file Excel với: <br>- Sheet "Danh sách sảnh" <br>- Header: Mã sảnh, Tên sảnh, Loại sảnh, Số lượng bàn tối đa, Đơn giá bàn tối thiểu, Ghi chú <br>- Dữ liệu từ query <br>- Footer: Tổng số sảnh, Ngày xuất báo cáo                                                                     |
| 7    |                               | Tạo tên file: "DanhSachSanh_YYYYMMDD_HHmmss.xlsx"                                                                                                                                                                                                                                         |
| 8    |                               | Gửi file về trình duyệt để tải xuống                                                                                                                                                                                                                                                      |
| 9    | Tải file Excel về máy         |                                                                                                                                                                                                                                                                                           |
| 10   | Mở và kiểm tra file Excel     |                                                                                                                                                                                                                                                                                           |

### Luồng sự kiện phụ

- 5a. Không có dữ liệu để xuất: hiển thị "Không có dữ liệu sảnh để xuất", dừng use case
- 6a. Lỗi khi tạo file Excel: hiển thị "Có lỗi xảy ra khi tạo file Excel. Vui lòng thử lại"

### Ràng buộc nghiệp vụ/SQL gợi ý

- Format file Excel: .xlsx (Office Open XML)
- Sử dụng thư viện: EPPlus, ClosedXML, hoặc NPOI
- Giới hạn số lượng bản ghi xuất (VD: tối đa 10,000 sảnh) để tránh quá tải
- Định dạng số tiền theo currency (VND)
- Auto-fit column width để hiển thị đẹp

---

## PHỤ LỤC: THÔNG TIN BẢNG DATABASE

### Bảng SANH

| Tên cột         | Kiểu dữ liệu  | Ràng buộc                 | Mô tả               |
| --------------- | ------------- | ------------------------- | ------------------- |
| MaSanh          | INT           | PRIMARY KEY IDENTITY(1,1) | Mã sảnh             |
| MaLoaiSanh      | INT           | FK → LOAISANH(MaLoaiSanh) | Mã loại sảnh        |
| TenSanh         | NVARCHAR(40)  | UNIQUE NOT NULL           | Tên sảnh            |
| SoLuongBanToiDa | INT           |                           | Số lượng bàn tối đa |
| GhiChu          | NVARCHAR(100) |                           | Ghi chú             |

### Bảng LOAISANH (liên quan)

| Tên cột           | Kiểu dữ liệu | Ràng buộc                 | Mô tả                 |
| ----------------- | ------------ | ------------------------- | --------------------- |
| MaLoaiSanh        | INT          | PRIMARY KEY IDENTITY(1,1) | Mã loại sảnh          |
| TenLoaiSanh       | NVARCHAR(40) | UNIQUE NOT NULL           | Tên loại sảnh         |
| DonGiaBanToiThieu | MONEY        |                           | Đơn giá bàn tối thiểu |

### Bảng PHIEUDATTIEC (liên quan)

| Tên cột    | Kiểu dữ liệu | Ràng buộc                 | Mô tả        |
| ---------- | ------------ | ------------------------- | ------------ |
| MaPhieuDat | INT          | PRIMARY KEY IDENTITY(1,1) | Mã phiếu đặt |
| MaSanh     | INT          | FK → SANH(MaSanh)         | Mã sảnh      |
| ...        | ...          | ...                       | ...          |
