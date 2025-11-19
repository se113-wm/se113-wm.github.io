# ĐẶC TẢ CÁC USE CASE - MANAGE MENU

Tài liệu này mô tả các use case thuộc nhóm quản lý Món ăn (Menu/Dishes) dành cho Nhân viên và Quản trị viên trong Hệ thống Quản lý Tiệc Cưới.

Gồm 5 use case chính:

1. View Dish Details (Xem danh sách & chi tiết Món ăn)
2. Add New Dish (Thêm Món ăn mới)
3. Edit Dish (Sửa thông tin Món ăn)
4. Delete Dish (Xóa Món ăn)
5. Export Dishes to Excel (Xuất danh sách Món ăn ra Excel)

---

## UC_MM_01: View Dish Details (Xem danh sách & chi tiết Món ăn)

### Mô tả

Nhân viên/Admin xem danh sách món ăn trong hệ thống và có thể lọc, tìm kiếm theo tên, khoảng giá, cũng như xem chi tiết thông tin của từng món ăn.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin

### Điều kiện hậu

- Hiển thị danh sách món ăn theo tiêu chí lọc (nếu có)
- Hiển thị chi tiết thông tin món ăn được chọn (nếu có)

### Luồng sự kiện chính

| Bước | Staff/Admin                           | Hệ thống                                                                                                                                                                         |
| ---- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "Quản lý món ăn"       |                                                                                                                                                                                  |
| 2    |                                       | Truy vấn danh sách món ăn: <br>`SELECT MaMonAn, TenMonAn, DonGia, GhiChu` <br>`FROM MONAN` <br>`ORDER BY TenMonAn`                                                               |
| 3    |                                       | Hiển thị danh sách với các cột: Mã món ăn, Tên món ăn, Đơn giá, Ghi chú, Hành động (Xem chi tiết, Chỉnh sửa, Xóa)                                                                |
| 4    | (Tùy chọn) Nhập tiêu chí tìm kiếm/lọc |                                                                                                                                                                                  |
| 5    | Click "Tìm kiếm" hoặc "Áp dụng lọc"   |                                                                                                                                                                                  |
| 6    |                                       | Truy vấn với WHERE tương ứng: <br>- Theo tên món ăn (TenMonAn LIKE N'%keyword%') <br>- Theo khoảng giá (DonGia >= @Min AND DonGia <= @Max) <br>`... WHERE ... ORDER BY TenMonAn` |
| 7    |                                       | Hiển thị kết quả theo tiêu chí tìm kiếm/lọc                                                                                                                                      |
| 8    | Chọn món ăn muốn xem chi tiết         |                                                                                                                                                                                  |
| 9    |                                       | Truy vấn thông tin chi tiết: <br>`SELECT m.*, (SELECT COUNT(*) FROM THUCDON t WHERE t.MaMonAn = m.MaMonAn) AS SoLuongSuDung` <br>`FROM MONAN m` <br>`WHERE m.MaMonAn = @MaMonAn` |
| 10   |                                       | Hiển thị dialog chi tiết với: Mã món ăn, Tên món ăn, Đơn giá, Ghi chú, Số lượng phiếu đặt đang sử dụng món này, Hành động (Chỉnh sửa, Xóa)                                       |
| 11   | Xem thông tin chi tiết                |                                                                                                                                                                                  |

### Luồng sự kiện phụ

Không có luồng phụ đặc biệt.

### Ràng buộc nghiệp vụ/SQL gợi ý

- Thêm index trên `MONAN.TenMonAn`, `MONAN.DonGia` để tăng tốc tìm kiếm
- Hiển thị số lượng phiếu đặt tiệc đang sử dụng món ăn này để cảnh báo khi xóa
- Phân trang nếu danh sách món ăn lớn

---

## UC_MM_02: Add New Dish (Thêm Món ăn mới)

### Mô tả

Nhân viên/Admin tạo món ăn mới trong hệ thống với thông tin đầy đủ.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin

### Điều kiện hậu

- Tạo bản ghi MONAN mới với thông tin đầy đủ

### Luồng sự kiện chính

| Bước | Staff/Admin                    | Hệ thống                                                                                                                                    |
| ---- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Thêm món ăn mới"         |                                                                                                                                             |
| 2    |                                | Hiển thị form thêm món ăn với các trường: Tên món ăn (bắt buộc), Đơn giá (bắt buộc), Ghi chú (tùy chọn)                                     |
| 3    | Nhập thông tin món ăn          |                                                                                                                                             |
| 4    | Click nút "Lưu"                |                                                                                                                                             |
| 5    |                                | Kiểm tra dữ liệu hợp lệ: <br>- Tên món ăn không rỗng <br>- Đơn giá > 0                                                                      |
| 6    |                                | Kiểm tra tên món ăn chưa tồn tại: <br>`SELECT COUNT(*) FROM MONAN WHERE TenMonAn = @TenMonAn`                                               |
| 7    |                                | **Nếu dữ liệu không hợp lệ hoặc tên bị trùng:** Hiển thị thông báo lỗi cụ thể (tên rỗng, đơn giá ≤ 0, hoặc tên đã tồn tại), quay lại bước 3 |
| 8    |                                | **Nếu hợp lệ:** Thêm món ăn vào DB: <br>`INSERT INTO MONAN (TenMonAn, DonGia, GhiChu)` <br>`VALUES (@TenMonAn, @DonGia, @GhiChu)`           |
| 9    |                                | Thông báo thành công, chuyển về danh sách món ăn                                                                                            |
| 10   | Xem món ăn mới trong danh sách |                                                                                                                                             |
| 11   | Xác nhận kết thúc              |                                                                                                                                             |

### Luồng sự kiện phụ

- **Bước 4a:** Nếu Staff/Admin click "Hủy" → quay về danh sách món ăn, không lưu thay đổi

### Ràng buộc nghiệp vụ/SQL gợi ý

- `TenMonAn` phải UNIQUE (đã có constraint trong DB)
- `DonGia` phải > 0
- Có thể thêm validation đơn giá không vượt quá giá trị hợp lý (ví dụ: < 10,000,000 VNĐ)

---

## UC_MM_03: Edit Dish (Sửa thông tin Món ăn)

### Mô tả

Nhân viên/Admin chỉnh sửa thông tin món ăn đã tồn tại (tên, đơn giá, ghi chú).

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Món ăn cần sửa đã tồn tại trong hệ thống

### Điều kiện hậu

- Thông tin món ăn được cập nhật trong DB

### Luồng sự kiện chính

| Bước | Staff/Admin                      | Hệ thống                                                                                                                                                                                                          |
| ---- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Chỉnh sửa món ăn"          |                                                                                                                                                                                                                   |
| 2    |                                  | Hiển thị danh sách món ăn                                                                                                                                                                                         |
| 3    | Chọn món ăn cần sửa              |                                                                                                                                                                                                                   |
| 4    |                                  | Truy vấn thông tin món ăn: <br>`SELECT MaMonAn, TenMonAn, DonGia, GhiChu` <br>`FROM MONAN` <br>`WHERE MaMonAn = @MaMonAn`                                                                                         |
| 5    |                                  | Hiển thị form chỉnh sửa với dữ liệu hiện tại                                                                                                                                                                      |
| 6    | Chỉnh sửa thông tin món ăn       |                                                                                                                                                                                                                   |
| 7    | Click nút "Lưu"                  |                                                                                                                                                                                                                   |
| 8    |                                  | Kiểm tra dữ liệu hợp lệ: <br>- Tên món ăn không rỗng <br>- Đơn giá > 0 <br>- Nếu tên thay đổi, kiểm tra tên mới chưa tồn tại: <br>`SELECT COUNT(*) FROM MONAN WHERE TenMonAn = @TenMonAn AND MaMonAn <> @MaMonAn` |
| 9    |                                  | **Nếu dữ liệu không hợp lệ hoặc tên bị trùng:** Hiển thị thông báo lỗi, quay lại bước 6                                                                                                                           |
| 10   |                                  | **Nếu hợp lệ:** Cập nhật món ăn: <br>`UPDATE MONAN` <br>`SET TenMonAn = @TenMonAn, DonGia = @DonGia, GhiChu = @GhiChu` <br>`WHERE MaMonAn = @MaMonAn`                                                             |
| 11   |                                  | Thông báo thành công, reload danh sách món ăn                                                                                                                                                                     |
| 12   | Xem thông tin món ăn đã cập nhật |                                                                                                                                                                                                                   |

### Luồng sự kiện phụ

- **Bước 7a:** Nếu Staff/Admin click "Hủy" → đóng form, không lưu thay đổi

### Ràng buộc nghiệp vụ/SQL gợi ý

- Nếu đơn giá thay đổi, có thể cảnh báo: "Đơn giá mới sẽ áp dụng cho các phiếu đặt mới. Các phiếu đặt cũ giữ nguyên đơn giá đã lưu."
- Không cho phép thay đổi `MaMonAn` (khóa chính)

---

## UC_MM_04: Delete Dish (Xóa Món ăn)

### Mô tả

Nhân viên/Admin xóa món ăn khỏi hệ thống. Hệ thống kiểm tra xem món ăn có đang được sử dụng trong thực đơn của phiếu đặt tiệc nào không trước khi xóa.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Món ăn cần xóa đã tồn tại trong hệ thống

### Điều kiện hậu

- Món ăn bị xóa khỏi DB (nếu không có tham chiếu)
- Hoặc hiển thị thông báo không thể xóa (nếu có tham chiếu)

### Luồng sự kiện chính

| Bước | Staff/Admin                 | Hệ thống                                                                                                                                                               |
| ---- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Xóa món ăn"           |                                                                                                                                                                        |
| 2    |                             | Hiển thị danh sách món ăn                                                                                                                                              |
| 3    | Chọn món ăn cần xóa         |                                                                                                                                                                        |
| 4    | Click nút "Xóa"             |                                                                                                                                                                        |
| 5    |                             | Kiểm tra món ăn có đang được sử dụng không: <br>`SELECT COUNT(*) AS SoLuongThamChieu` <br>`FROM THUCDON` <br>`WHERE MaMonAn = @MaMonAn`                                |
| 6    |                             | **Nếu SoLuongThamChieu > 0:** Hiển thị thông báo: "Không thể xóa món ăn này vì đang được sử dụng trong [SoLuongThamChieu] thực đơn của các phiếu đặt tiệc." → Kết thúc |
| 7    |                             | **Nếu SoLuongThamChieu = 0:** Hiển thị dialog xác nhận: "Bạn có chắc muốn xóa món ăn [TenMonAn]?"                                                                      |
| 8    | Click "Xác nhận" hoặc "Hủy" |                                                                                                                                                                        |
| 9    |                             | **Nếu click "Hủy":** Đóng dialog xác nhận → Kết thúc                                                                                                                   |
| 10   |                             | **Nếu click "Xác nhận":** Xóa món ăn: <br>`DELETE FROM MONAN WHERE MaMonAn = @MaMonAn`                                                                                 |
| 11   |                             | Thông báo xóa thành công, reload danh sách món ăn                                                                                                                      |
| 12   | Xem danh sách đã cập nhật   |                                                                                                                                                                        |

### Luồng sự kiện phụ

Không có luồng phụ đặc biệt.

### Ràng buộc nghiệp vụ/SQL gợi ý

- **KHÔNG sử dụng xóa mềm** (soft delete) cho món ăn
- Chỉ kiểm tra tham chiếu từ bảng `THUCDON`
- Xóa vật lý (hard delete) nếu không có tham chiếu

---

## UC_MM_05: Export Dishes to Excel (Xuất danh sách Món ăn ra Excel)

### Mô tả

Nhân viên/Admin xuất danh sách món ăn (có thể đã lọc) ra file Excel để lưu trữ hoặc báo cáo.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Có ít nhất 1 món ăn trong hệ thống (hoặc trong kết quả lọc)

### Điều kiện hậu

- File Excel được tải xuống chứa danh sách món ăn

### Luồng sự kiện chính

| Bước | Staff/Admin                     | Hệ thống                                                                                                                                                                                                                                 |
| ---- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "Quản lý món ăn" |                                                                                                                                                                                                                                          |
| 2    |                                 | Hiển thị danh sách món ăn                                                                                                                                                                                                                |
| 3    | (Tùy chọn) Áp dụng bộ lọc       |                                                                                                                                                                                                                                          |
| 4    |                                 | Hiển thị danh sách món ăn đã lọc                                                                                                                                                                                                         |
| 5    | Click nút "Xuất Excel"          |                                                                                                                                                                                                                                          |
| 6    |                                 | Truy vấn dữ liệu món ăn với bộ lọc hiện tại: <br>`SELECT m.MaMonAn, m.TenMonAn, m.DonGia, m.GhiChu,` <br>`(SELECT COUNT(*) FROM THUCDON t WHERE t.MaMonAn = m.MaMonAn) AS SoLuongSuDung` <br>`FROM MONAN m` <br>`WHERE ... ORDER BY ...` |
| 7    |                                 | **Nếu không có dữ liệu:** Hiển thị thông báo "Không có dữ liệu để xuất" → Kết thúc                                                                                                                                                       |
| 8    |                                 | **Nếu có dữ liệu:** Tạo file Excel với các cột: STT, Mã món ăn, Tên món ăn, Đơn giá, Số lượng sử dụng, Ghi chú                                                                                                                           |
| 9    |                                 | Đặt tên file theo format: `DanhSachMonAn_YYYYMMDD_HHmmss.xlsx`                                                                                                                                                                           |
| 10   |                                 | Gửi file đến trình duyệt để tải xuống                                                                                                                                                                                                    |
| 11   | Tải và mở file Excel            |                                                                                                                                                                                                                                          |

### Luồng sự kiện phụ

Không có luồng phụ đặc biệt.

### Ràng buộc nghiệp vụ/SQL gợi ý

- Sử dụng thư viện EPPlus, ClosedXML hoặc NPOI để tạo file Excel
- Format số tiền theo định dạng tiền tệ VNĐ
- Có thể thêm header với tiêu đề "DANH SÁCH MÓN ĂN", ngày xuất, người xuất
- Tính tổng số món ăn ở cuối file

---

## Ghi chú chung

- **Bảng liên quan:** `MONAN`, `THUCDON`, `PHIEUDATTIEC`
- **Quyền truy cập:** Staff và Admin đều có đầy đủ quyền quản lý món ăn
- **Validation chung:**
  - Tên món ăn: không rỗng, độ dài ≤ 40 ký tự, duy nhất
  - Đơn giá: phải > 0, kiểu MONEY (kiểm tra giá trị hợp lý)
  - Ghi chú: tùy chọn, độ dài ≤ 100 ký tự
- **Xóa món ăn:** Chỉ kiểm tra tham chiếu từ `THUCDON`, không có xóa mềm
- **Thống kê:** Hiển thị số lượng phiếu đặt đang sử dụng món ăn để hỗ trợ quyết định chỉnh sửa/xóa
