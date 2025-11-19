# ĐẶC TẢ CÁC USE CASE - MANAGE SERVICES

Tài liệu này mô tả các use case thuộc nhóm quản lý Dịch vụ (Services) dành cho Nhân viên và Quản trị viên trong Hệ thống Quản lý Tiệc Cưới.

Gồm 5 use case chính:

1. View Service Details (Xem danh sách & chi tiết Dịch vụ)
2. Add New Service (Thêm Dịch vụ mới)
3. Edit Service (Sửa thông tin Dịch vụ)
4. Delete Service (Xóa Dịch vụ)
5. Export Services to Excel (Xuất danh sách Dịch vụ ra Excel)

---

## UC_MS_01: View Service Details (Xem danh sách & chi tiết Dịch vụ)

### Mô tả

Nhân viên/Admin xem danh sách dịch vụ trong hệ thống và có thể lọc, tìm kiếm theo tên, khoảng giá, cũng như xem chi tiết thông tin của từng dịch vụ.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin

### Điều kiện hậu

- Hiển thị danh sách dịch vụ theo tiêu chí lọc (nếu có)
- Hiển thị chi tiết thông tin dịch vụ được chọn (nếu có)

### Luồng sự kiện chính

| Bước | Staff/Admin                           | Hệ thống                                                                                                                                                                                |
| ---- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "Quản lý dịch vụ"      |                                                                                                                                                                                         |
| 2    |                                       | Truy vấn danh sách dịch vụ: <br>`SELECT MaDichVu, TenDichVu, DonGia, GhiChu` <br>`FROM DICHVU` <br>`ORDER BY TenDichVu`                                                                 |
| 3    |                                       | Hiển thị danh sách với các cột: Mã dịch vụ, Tên dịch vụ, Đơn giá, Ghi chú, Hành động (Xem chi tiết, Chỉnh sửa, Xóa)                                                                     |
| 4    | (Tùy chọn) Nhập tiêu chí tìm kiếm/lọc |                                                                                                                                                                                         |
| 5    | Click "Tìm kiếm" hoặc "Áp dụng lọc"   |                                                                                                                                                                                         |
| 6    |                                       | Truy vấn với WHERE tương ứng: <br>- Theo tên dịch vụ (TenDichVu LIKE N'%keyword%') <br>- Theo khoảng giá (DonGia >= @Min AND DonGia <= @Max) <br>`... WHERE ... ORDER BY TenDichVu`     |
| 7    |                                       | Hiển thị kết quả theo tiêu chí tìm kiếm/lọc                                                                                                                                             |
| 8    | Chọn dịch vụ muốn xem chi tiết        |                                                                                                                                                                                         |
| 9    |                                       | Truy vấn thông tin chi tiết: <br>`SELECT d.*, (SELECT COUNT(*) FROM CHITIETDV c WHERE c.MaDichVu = d.MaDichVu) AS SoLuongSuDung` <br>`FROM DICHVU d` <br>`WHERE d.MaDichVu = @MaDichVu` |
| 10   |                                       | Hiển thị dialog chi tiết với: Mã dịch vụ, Tên dịch vụ, Đơn giá, Ghi chú, Số lượng phiếu đặt đang sử dụng dịch vụ này, Hành động (Chỉnh sửa, Xóa)                                        |
| 11   | Xem thông tin chi tiết                |                                                                                                                                                                                         |

### Luồng sự kiện phụ

Không có luồng phụ đặc biệt.

### Ràng buộc nghiệp vụ/SQL gợi ý

- Thêm index trên `DICHVU.TenDichVu`, `DICHVU.DonGia` để tăng tốc tìm kiếm
- Hiển thị số lượng phiếu đặt tiệc đang sử dụng dịch vụ này để cảnh báo khi xóa
- Phân trang nếu danh sách dịch vụ lớn

---

## UC_MS_02: Add New Service (Thêm Dịch vụ mới)

### Mô tả

Nhân viên/Admin tạo dịch vụ mới trong hệ thống với thông tin đầy đủ.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin

### Điều kiện hậu

- Tạo bản ghi DICHVU mới với thông tin đầy đủ

### Luồng sự kiện chính

| Bước | Staff/Admin                     | Hệ thống                                                                                                                                    |
| ---- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Thêm dịch vụ mới"         |                                                                                                                                             |
| 2    |                                 | Hiển thị form thêm dịch vụ với các trường: Tên dịch vụ (bắt buộc), Đơn giá (bắt buộc), Ghi chú (tùy chọn)                                   |
| 3    | Nhập thông tin dịch vụ          |                                                                                                                                             |
| 4    | Click nút "Lưu"                 |                                                                                                                                             |
| 5    |                                 | Kiểm tra dữ liệu hợp lệ: <br>- Tên dịch vụ không rỗng <br>- Đơn giá > 0                                                                     |
| 6    |                                 | Kiểm tra tên dịch vụ chưa tồn tại: <br>`SELECT COUNT(*) FROM DICHVU WHERE TenDichVu = @TenDichVu`                                           |
| 7    |                                 | **Nếu dữ liệu không hợp lệ hoặc tên bị trùng:** Hiển thị thông báo lỗi cụ thể (tên rỗng, đơn giá ≤ 0, hoặc tên đã tồn tại), quay lại bước 3 |
| 8    |                                 | **Nếu hợp lệ:** Thêm dịch vụ vào DB: <br>`INSERT INTO DICHVU (TenDichVu, DonGia, GhiChu)` <br>`VALUES (@TenDichVu, @DonGia, @GhiChu)`       |
| 9    |                                 | Thông báo thành công, chuyển về danh sách dịch vụ                                                                                           |
| 10   | Xem dịch vụ mới trong danh sách |                                                                                                                                             |
| 11   | Xác nhận kết thúc               |                                                                                                                                             |

### Luồng sự kiện phụ

- **Bước 4a:** Nếu Staff/Admin click "Hủy" → quay về danh sách dịch vụ, không lưu thay đổi

### Ràng buộc nghiệp vụ/SQL gợi ý

- `TenDichVu` phải UNIQUE (đã có constraint trong DB)
- `DonGia` phải > 0
- Có thể thêm validation đơn giá không vượt quá giá trị hợp lý
- Ví dụ dịch vụ: Trang trí hoa tươi, MC, Ban nhạc, Chụp ảnh, Quay phim, etc.

---

## UC_MS_03: Edit Service (Sửa thông tin Dịch vụ)

### Mô tả

Nhân viên/Admin chỉnh sửa thông tin dịch vụ đã tồn tại (tên, đơn giá, ghi chú).

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Dịch vụ cần sửa đã tồn tại trong hệ thống

### Điều kiện hậu

- Thông tin dịch vụ được cập nhật trong DB

### Luồng sự kiện chính

| Bước | Staff/Admin                       | Hệ thống                                                                                                                                                                                                                |
| ---- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Chỉnh sửa dịch vụ"          |                                                                                                                                                                                                                         |
| 2    |                                   | Hiển thị danh sách dịch vụ                                                                                                                                                                                              |
| 3    | Chọn dịch vụ cần sửa              |                                                                                                                                                                                                                         |
| 4    |                                   | Truy vấn thông tin dịch vụ: <br>`SELECT MaDichVu, TenDichVu, DonGia, GhiChu` <br>`FROM DICHVU` <br>`WHERE MaDichVu = @MaDichVu`                                                                                         |
| 5    |                                   | Hiển thị form chỉnh sửa với dữ liệu hiện tại                                                                                                                                                                            |
| 6    | Chỉnh sửa thông tin dịch vụ       |                                                                                                                                                                                                                         |
| 7    | Click nút "Lưu"                   |                                                                                                                                                                                                                         |
| 8    |                                   | Kiểm tra dữ liệu hợp lệ: <br>- Tên dịch vụ không rỗng <br>- Đơn giá > 0 <br>- Nếu tên thay đổi, kiểm tra tên mới chưa tồn tại: <br>`SELECT COUNT(*) FROM DICHVU WHERE TenDichVu = @TenDichVu AND MaDichVu <> @MaDichVu` |
| 9    |                                   | **Nếu dữ liệu không hợp lệ hoặc tên bị trùng:** Hiển thị thông báo lỗi, quay lại bước 6                                                                                                                                 |
| 10   |                                   | **Nếu hợp lệ:** Cập nhật dịch vụ: <br>`UPDATE DICHVU` <br>`SET TenDichVu = @TenDichVu, DonGia = @DonGia, GhiChu = @GhiChu` <br>`WHERE MaDichVu = @MaDichVu`                                                             |
| 11   |                                   | Thông báo thành công, reload danh sách dịch vụ                                                                                                                                                                          |
| 12   | Xem thông tin dịch vụ đã cập nhật |                                                                                                                                                                                                                         |

### Luồng sự kiện phụ

- **Bước 7a:** Nếu Staff/Admin click "Hủy" → đóng form, không lưu thay đổi

### Ràng buộc nghiệp vụ/SQL gợi ý

- Nếu đơn giá thay đổi, có thể cảnh báo: "Đơn giá mới sẽ áp dụng cho các phiếu đặt mới. Các phiếu đặt cũ giữ nguyên đơn giá đã lưu trong CHITIETDV."
- Không cho phép thay đổi `MaDichVu` (khóa chính)

---

## UC_MS_04: Delete Service (Xóa Dịch vụ)

### Mô tả

Nhân viên/Admin xóa dịch vụ khỏi hệ thống. Hệ thống kiểm tra xem dịch vụ có đang được sử dụng trong chi tiết dịch vụ của phiếu đặt tiệc nào không trước khi xóa.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Dịch vụ cần xóa đã tồn tại trong hệ thống

### Điều kiện hậu

- Dịch vụ bị xóa khỏi DB (nếu không có tham chiếu)
- Hoặc hiển thị thông báo không thể xóa (nếu có tham chiếu)

### Luồng sự kiện chính

| Bước | Staff/Admin                 | Hệ thống                                                                                                                                                                        |
| ---- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Xóa dịch vụ"          |                                                                                                                                                                                 |
| 2    |                             | Hiển thị danh sách dịch vụ                                                                                                                                                      |
| 3    | Chọn dịch vụ cần xóa        |                                                                                                                                                                                 |
| 4    | Click nút "Xóa"             |                                                                                                                                                                                 |
| 5    |                             | Kiểm tra dịch vụ có đang được sử dụng không: <br>`SELECT COUNT(*) AS SoLuongThamChieu` <br>`FROM CHITIETDV` <br>`WHERE MaDichVu = @MaDichVu`                                    |
| 6    |                             | **Nếu SoLuongThamChieu > 0:** Hiển thị thông báo: "Không thể xóa dịch vụ này vì đang được sử dụng trong [SoLuongThamChieu] chi tiết dịch vụ của các phiếu đặt tiệc." → Kết thúc |
| 7    |                             | **Nếu SoLuongThamChieu = 0:** Hiển thị dialog xác nhận: "Bạn có chắc muốn xóa dịch vụ [TenDichVu]?"                                                                             |
| 8    | Click "Xác nhận" hoặc "Hủy" |                                                                                                                                                                                 |
| 9    |                             | **Nếu click "Hủy":** Đóng dialog xác nhận → Kết thúc                                                                                                                            |
| 10   |                             | **Nếu click "Xác nhận":** Xóa dịch vụ: <br>`DELETE FROM DICHVU WHERE MaDichVu = @MaDichVu`                                                                                      |
| 11   |                             | Thông báo xóa thành công, reload danh sách dịch vụ                                                                                                                              |
| 12   | Xem danh sách đã cập nhật   |                                                                                                                                                                                 |

### Luồng sự kiện phụ

Không có luồng phụ đặc biệt.

### Ràng buộc nghiệp vụ/SQL gợi ý

- **KHÔNG sử dụng xóa mềm** (soft delete) cho dịch vụ
- Chỉ kiểm tra tham chiếu từ bảng `CHITIETDV`
- Xóa vật lý (hard delete) nếu không có tham chiếu

---

## UC_MS_05: Export Services to Excel (Xuất danh sách Dịch vụ ra Excel)

### Mô tả

Nhân viên/Admin xuất danh sách dịch vụ (có thể đã lọc) ra file Excel để lưu trữ hoặc báo cáo.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Có ít nhất 1 dịch vụ trong hệ thống (hoặc trong kết quả lọc)

### Điều kiện hậu

- File Excel được tải xuống chứa danh sách dịch vụ

### Luồng sự kiện chính

| Bước | Staff/Admin                      | Hệ thống                                                                                                                                                                                                                                         |
| ---- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Chọn chức năng "Quản lý dịch vụ" |                                                                                                                                                                                                                                                  |
| 2    |                                  | Hiển thị danh sách dịch vụ                                                                                                                                                                                                                       |
| 3    | (Tùy chọn) Áp dụng bộ lọc        |                                                                                                                                                                                                                                                  |
| 4    |                                  | Hiển thị danh sách dịch vụ đã lọc                                                                                                                                                                                                                |
| 5    | Click nút "Xuất Excel"           |                                                                                                                                                                                                                                                  |
| 6    |                                  | Truy vấn dữ liệu dịch vụ với bộ lọc hiện tại: <br>`SELECT d.MaDichVu, d.TenDichVu, d.DonGia, d.GhiChu,` <br>`(SELECT COUNT(*) FROM CHITIETDV c WHERE c.MaDichVu = d.MaDichVu) AS SoLuongSuDung` <br>`FROM DICHVU d` <br>`WHERE ... ORDER BY ...` |
| 7    |                                  | **Nếu không có dữ liệu:** Hiển thị thông báo "Không có dữ liệu để xuất" → Kết thúc                                                                                                                                                               |
| 8    |                                  | **Nếu có dữ liệu:** Tạo file Excel với các cột: STT, Mã dịch vụ, Tên dịch vụ, Đơn giá, Số lượng sử dụng, Ghi chú                                                                                                                                 |
| 9    |                                  | Đặt tên file theo format: `DanhSachDichVu_YYYYMMDD_HHmmss.xlsx`                                                                                                                                                                                  |
| 10   |                                  | Gửi file đến trình duyệt để tải xuống                                                                                                                                                                                                            |
| 11   | Tải và mở file Excel             |                                                                                                                                                                                                                                                  |

### Luồng sự kiện phụ

Không có luồng phụ đặc biệt.

### Ràng buộc nghiệp vụ/SQL gợi ý

- Sử dụng thư viện EPPlus, ClosedXML hoặc NPOI để tạo file Excel
- Format số tiền theo định dạng tiền tệ VNĐ
- Có thể thêm header với tiêu đề "DANH SÁCH DỊCH VỤ", ngày xuất, người xuất
- Tính tổng số dịch vụ ở cuối file

---

## Ghi chú chung

- **Bảng liên quan:** `DICHVU`, `CHITIETDV`, `PHIEUDATTIEC`
- **Quyền truy cập:** Staff và Admin đều có đầy đủ quyền quản lý dịch vụ
- **Validation chung:**
  - Tên dịch vụ: không rỗng, độ dài ≤ 40 ký tự, duy nhất
  - Đơn giá: phải > 0, kiểu MONEY (kiểm tra giá trị hợp lý)
  - Ghi chú: tùy chọn, độ dài ≤ 100 ký tự
- **Xóa dịch vụ:** Chỉ kiểm tra tham chiếu từ `CHITIETDV`, không có xóa mềm
- **Thống kê:** Hiển thị số lượng phiếu đặt đang sử dụng dịch vụ để hỗ trợ quyết định chỉnh sửa/xóa
- **Lưu ý nghiệp vụ:**
  - Bảng CHITIETDV lưu trữ `DonGia` tại thời điểm đặt tiệc, nên việc thay đổi đơn giá dịch vụ trong DICHVU không ảnh hưởng đến các phiếu đặt cũ
  - Trong CHITIETDV còn có cột `ThanhTien = SoLuong * DonGia` để tính tổng tiền dịch vụ
