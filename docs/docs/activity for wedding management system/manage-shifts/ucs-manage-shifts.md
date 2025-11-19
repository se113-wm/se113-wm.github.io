# ĐẶC TẢ CÁC USE CASE - MANAGE SHIFTS

Tài liệu này mô tả các use case thuộc nhóm quản lý Ca tổ chức (Shifts) dành cho Nhân viên và Quản trị viên trong Hệ thống Quản lý Tiệc Cưới.

Gồm 5 use case chính:

1. View Shift Details (Xem danh sách & chi tiết Ca)
2. Add New Shift (Thêm Ca tổ chức mới)
3. Edit Shift (Sửa thông tin Ca tổ chức)
4. Delete Shift (Xóa Ca tổ chức)
5. Export Shifts to Excel (Xuất danh sách Ca ra Excel)

---

## UC_MSH_01: View Shift Details (Xem danh sách & chi tiết Ca)

### Mô tả

Nhân viên/Admin xem danh sách ca tổ chức trong hệ thống và có thể lọc, tìm kiếm theo tên ca, khung giờ, cũng như xem chi tiết thông tin của từng ca.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin

### Điều kiện hậu

- Hiển thị danh sách ca tổ chức theo tiêu chí lọc (nếu có)
- Hiển thị chi tiết thông tin ca được chọn (nếu có)

### Luồng sự kiện chính

| Bước | Staff/Admin                           | Hệ thống                                                                                                                                                                      |
| ---- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "Quản lý ca tổ chức"   |                                                                                                                                                                               |
| 2    |                                       | Truy vấn danh sách ca: <br>`SELECT MaCa, TenCa, ThoiGianBatDauCa, ThoiGianKetThucCa` <br>`FROM CA` <br>`ORDER BY ThoiGianBatDauCa`                                            |
| 3    |                                       | Hiển thị danh sách với các cột: Mã ca, Tên ca, Thời gian bắt đầu, Thời gian kết thúc, Hành động (Xem chi tiết, Chỉnh sửa, Xóa)                                                |
| 4    | (Tùy chọn) Nhập tiêu chí tìm kiếm/lọc |                                                                                                                                                                               |
| 5    | Click "Tìm kiếm" hoặc "Áp dụng lọc"   |                                                                                                                                                                               |
| 6    |                                       | Truy vấn với WHERE tương ứng: <br>- Theo tên ca (TenCa LIKE N'%keyword%') <br>- Theo khung giờ (ThoiGianBatDauCa >= @GioBatDau) <br>`... WHERE ... ORDER BY ThoiGianBatDauCa` |
| 7    |                                       | Hiển thị kết quả theo tiêu chí tìm kiếm/lọc                                                                                                                                   |
| 8    | Chọn ca muốn xem chi tiết             |                                                                                                                                                                               |
| 9    |                                       | Truy vấn thông tin chi tiết: <br>`SELECT c.*, (SELECT COUNT(*) FROM PHIEUDATTIEC p WHERE p.MaCa = c.MaCa) AS SoLuongSuDung` <br>`FROM CA c` <br>`WHERE c.MaCa = @MaCa`        |
| 10   |                                       | Hiển thị dialog chi tiết với: Mã ca, Tên ca, Thời gian bắt đầu, Thời gian kết thúc, Số lượng phiếu đặt đang sử dụng ca này, Hành động (Chỉnh sửa, Xóa)                        |
| 11   | Xem thông tin chi tiết                |                                                                                                                                                                               |

### Luồng sự kiện phụ

Không có luồng phụ đặc biệt.

### Ràng buộc nghiệp vụ/SQL gợi ý

- Thêm index trên `CA.TenCa`, `CA.ThoiGianBatDauCa` để tăng tốc tìm kiếm
- Hiển thị số lượng phiếu đặt tiệc đang sử dụng ca này để cảnh báo khi xóa
- Tính toán độ dài ca (duration): `DATEDIFF(HOUR, ThoiGianBatDauCa, ThoiGianKetThucCa)` giờ

---

## UC_MSH_02: Add New Shift (Thêm Ca tổ chức mới)

### Mô tả

Nhân viên/Admin tạo ca tổ chức mới trong hệ thống với thông tin đầy đủ.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin

### Điều kiện hậu

- Tạo bản ghi CA mới với thông tin đầy đủ

### Luồng sự kiện chính

| Bước | Staff/Admin                | Hệ thống                                                                                                                                                       |
| ---- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Thêm ca tổ chức mới" |                                                                                                                                                                |
| 2    |                            | Hiển thị form thêm ca với các trường: Tên ca (bắt buộc), Thời gian bắt đầu (bắt buộc), Thời gian kết thúc (bắt buộc)                                           |
| 3    | Nhập thông tin ca tổ chức  |                                                                                                                                                                |
| 4    | Click nút "Lưu"            |                                                                                                                                                                |
| 5    |                            | Kiểm tra dữ liệu hợp lệ: <br>- Tên ca không rỗng <br>- Thời gian bắt đầu < Thời gian kết thúc <br>- Thời gian không trùng với ca khác                          |
| 6    |                            | Kiểm tra tên ca chưa tồn tại: <br>`SELECT COUNT(*) FROM CA WHERE TenCa = @TenCa`                                                                               |
| 7    |                            | **Nếu dữ liệu không hợp lệ hoặc tên bị trùng:** Hiển thị thông báo lỗi cụ thể (tên rỗng, thời gian không hợp lệ, hoặc tên đã tồn tại), quay lại bước 3         |
| 8    |                            | **Nếu hợp lệ:** Thêm ca vào DB: <br>`INSERT INTO CA (TenCa, ThoiGianBatDauCa, ThoiGianKetThucCa)` <br>`VALUES (@TenCa, @ThoiGianBatDauCa, @ThoiGianKetThucCa)` |
| 9    |                            | Thông báo thành công, chuyển về danh sách ca                                                                                                                   |
| 10   | Xem ca mới trong danh sách |                                                                                                                                                                |
| 11   | Xác nhận kết thúc          |                                                                                                                                                                |

### Luồng sự kiện phụ

- **Bước 4a:** Nếu Staff/Admin click "Hủy" → quay về danh sách ca, không lưu thay đổi

### Ràng buộc nghiệp vụ/SQL gợi ý

- `TenCa` phải UNIQUE (đã có constraint trong DB)
- `ThoiGianBatDauCa` phải < `ThoiGianKetThucCa`
- Có thể thêm validation: không cho các ca có khung giờ trùng lặp (overlapping)
- Ví dụ ca: Ca sáng (08:00-12:00), Ca trưa (12:00-17:00), Ca tối (17:00-22:00)

---

## UC_MSH_03: Edit Shift (Sửa thông tin Ca tổ chức)

### Mô tả

Nhân viên/Admin chỉnh sửa thông tin ca tổ chức đã tồn tại (tên ca, thời gian bắt đầu, thời gian kết thúc).

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Ca tổ chức cần sửa đã tồn tại trong hệ thống

### Điều kiện hậu

- Thông tin ca tổ chức được cập nhật trong DB

### Luồng sự kiện chính

| Bước | Staff/Admin                  | Hệ thống                                                                                                                                                                                                                  |
| ---- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Chỉnh sửa ca tổ chức"  |                                                                                                                                                                                                                           |
| 2    |                              | Hiển thị danh sách ca                                                                                                                                                                                                     |
| 3    | Chọn ca cần sửa              |                                                                                                                                                                                                                           |
| 4    |                              | Truy vấn thông tin ca: <br>`SELECT MaCa, TenCa, ThoiGianBatDauCa, ThoiGianKetThucCa` <br>`FROM CA` <br>`WHERE MaCa = @MaCa`                                                                                               |
| 5    |                              | Hiển thị form chỉnh sửa với dữ liệu hiện tại                                                                                                                                                                              |
| 6    | Chỉnh sửa thông tin ca       |                                                                                                                                                                                                                           |
| 7    | Click nút "Lưu"              |                                                                                                                                                                                                                           |
| 8    |                              | Kiểm tra dữ liệu hợp lệ: <br>- Tên ca không rỗng <br>- Thời gian bắt đầu < Thời gian kết thúc <br>- Nếu tên thay đổi, kiểm tra tên mới chưa tồn tại: <br>`SELECT COUNT(*) FROM CA WHERE TenCa = @TenCa AND MaCa <> @MaCa` |
| 9    |                              | **Nếu dữ liệu không hợp lệ hoặc tên bị trùng:** Hiển thị thông báo lỗi, quay lại bước 6                                                                                                                                   |
| 10   |                              | **Nếu hợp lệ:** Cập nhật ca: <br>`UPDATE CA` <br>`SET TenCa = @TenCa, ThoiGianBatDauCa = @ThoiGianBatDauCa, ThoiGianKetThucCa = @ThoiGianKetThucCa` <br>`WHERE MaCa = @MaCa`                                              |
| 11   |                              | Thông báo thành công, reload danh sách ca                                                                                                                                                                                 |
| 12   | Xem thông tin ca đã cập nhật |                                                                                                                                                                                                                           |

### Luồng sự kiện phụ

- **Bước 7a:** Nếu Staff/Admin click "Hủy" → đóng form, không lưu thay đổi

### Ràng buộc nghiệp vụ/SQL gợi ý

- Nếu thay đổi khung giờ ca, có thể cảnh báo: "Thay đổi này có thể ảnh hưởng đến [số lượng] phiếu đặt tiệc hiện có."
- Không cho phép thay đổi `MaCa` (khóa chính)
- Kiểm tra không có phiếu đặt tiệc nào đang sử dụng ca này trong tương lai (NgayDaiTiec > GETDATE())

---

## UC_MSH_04: Delete Shift (Xóa Ca tổ chức)

### Mô tả

Nhân viên/Admin xóa ca tổ chức khỏi hệ thống. Hệ thống kiểm tra xem ca có đang được sử dụng trong phiếu đặt tiệc nào không trước khi xóa.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Ca tổ chức cần xóa đã tồn tại trong hệ thống

### Điều kiện hậu

- Ca tổ chức bị xóa khỏi DB (nếu không có tham chiếu)
- Hoặc hiển thị thông báo không thể xóa (nếu có tham chiếu)

### Luồng sự kiện chính

| Bước | Staff/Admin                 | Hệ thống                                                                                                                                          |
| ---- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Xóa ca tổ chức"       |                                                                                                                                                   |
| 2    |                             | Hiển thị danh sách ca                                                                                                                             |
| 3    | Chọn ca cần xóa             |                                                                                                                                                   |
| 4    | Click nút "Xóa"             |                                                                                                                                                   |
| 5    |                             | Kiểm tra ca có đang được sử dụng không: <br>`SELECT COUNT(*) AS SoLuongThamChieu` <br>`FROM PHIEUDATTIEC` <br>`WHERE MaCa = @MaCa`                |
| 6    |                             | **Nếu SoLuongThamChieu > 0:** Hiển thị thông báo: "Không thể xóa ca này vì đang được sử dụng trong [SoLuongThamChieu] phiếu đặt tiệc." → Kết thúc |
| 7    |                             | **Nếu SoLuongThamChieu = 0:** Hiển thị dialog xác nhận: "Bạn có chắc muốn xóa ca [TenCa]?"                                                        |
| 8    | Click "Xác nhận" hoặc "Hủy" |                                                                                                                                                   |
| 9    |                             | **Nếu click "Hủy":** Đóng dialog xác nhận → Kết thúc                                                                                              |
| 10   |                             | **Nếu click "Xác nhận":** Xóa ca: <br>`DELETE FROM CA WHERE MaCa = @MaCa`                                                                         |
| 11   |                             | Thông báo xóa thành công, reload danh sách ca                                                                                                     |
| 12   | Xem danh sách đã cập nhật   |                                                                                                                                                   |

### Luồng sự kiện phụ

Không có luồng phụ đặc biệt.

### Ràng buộc nghiệp vụ/SQL gợi ý

- **KHÔNG sử dụng xóa mềm** (soft delete) cho ca tổ chức
- Chỉ kiểm tra tham chiếu từ bảng `PHIEUDATTIEC`
- Xóa vật lý (hard delete) nếu không có tham chiếu

---

## UC_MSH_05: Export Shifts to Excel (Xuất danh sách Ca ra Excel)

### Mô tả

Nhân viên/Admin xuất danh sách ca tổ chức (có thể đã lọc) ra file Excel để lưu trữ hoặc báo cáo.

### Tác nhân chính

- Staff (Nhân viên)
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Có ít nhất 1 ca tổ chức trong hệ thống (hoặc trong kết quả lọc)

### Điều kiện hậu

- File Excel được tải xuống chứa danh sách ca tổ chức

### Luồng sự kiện chính

| Bước | Staff/Admin                         | Hệ thống                                                                                                                                                                                                                                                     |
| ---- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Chọn chức năng "Quản lý ca tổ chức" |                                                                                                                                                                                                                                                              |
| 2    |                                     | Hiển thị danh sách ca                                                                                                                                                                                                                                        |
| 3    | (Tùy chọn) Áp dụng bộ lọc           |                                                                                                                                                                                                                                                              |
| 4    |                                     | Hiển thị danh sách ca đã lọc                                                                                                                                                                                                                                 |
| 5    | Click nút "Xuất Excel"              |                                                                                                                                                                                                                                                              |
| 6    |                                     | Truy vấn dữ liệu ca với bộ lọc hiện tại: <br>`SELECT c.MaCa, c.TenCa, c.ThoiGianBatDauCa, c.ThoiGianKetThucCa,` <br>`(SELECT COUNT(*) FROM PHIEUDATTIEC p WHERE p.MaCa = c.MaCa) AS SoLuongSuDung` <br>`FROM CA c` <br>`WHERE ... ORDER BY ThoiGianBatDauCa` |
| 7    |                                     | **Nếu không có dữ liệu:** Hiển thị thông báo "Không có dữ liệu để xuất" → Kết thúc                                                                                                                                                                           |
| 8    |                                     | **Nếu có dữ liệu:** Tạo file Excel với các cột: STT, Mã ca, Tên ca, Thời gian bắt đầu, Thời gian kết thúc, Độ dài ca (giờ), Số lượng sử dụng                                                                                                                 |
| 9    |                                     | Đặt tên file theo format: `DanhSachCa_YYYYMMDD_HHmmss.xlsx`                                                                                                                                                                                                  |
| 10   |                                     | Gửi file đến trình duyệt để tải xuống                                                                                                                                                                                                                        |
| 11   | Tải và mở file Excel                |                                                                                                                                                                                                                                                              |

### Luồng sự kiện phụ

Không có luồng phụ đặc biệt.

### Ràng buộc nghiệp vụ/SQL gợi ý

- Sử dụng thư viện EPPlus, ClosedXML hoặc NPOI để tạo file Excel
- Format thời gian theo định dạng `HH:mm` (ví dụ: 08:00, 17:30)
- Có thể thêm header với tiêu đề "DANH SÁCH CA TỔ CHỨC", ngày xuất, người xuất
- Tính tổng số ca ở cuối file
- Tính cột "Độ dài ca": `DATEDIFF(HOUR, ThoiGianBatDauCa, ThoiGianKetThucCa)` hoặc format `HH:mm` (số giờ:phút)

---

## Ghi chú chung

- **Bảng liên quan:** `CA`, `PHIEUDATTIEC`
- **Quyền truy cập:** Staff và Admin đều có đầy đủ quyền quản lý ca tổ chức
- **Validation chung:**
  - Tên ca: không rỗng, độ dài ≤ 40 ký tự, duy nhất
  - Thời gian bắt đầu: phải < Thời gian kết thúc
  - Thời gian: kiểu TIME, validation format hợp lệ (HH:mm)
- **Xóa ca:** Chỉ kiểm tra tham chiếu từ `PHIEUDATTIEC`, không có xóa mềm
- **Thống kê:** Hiển thị số lượng phiếu đặt đang sử dụng ca để hỗ trợ quyết định chỉnh sửa/xóa
- **Lưu ý nghiệp vụ:**
  - Thường có 3 ca trong ngày: Ca sáng, Ca trưa, Ca tối
  - Có thể có ca đặc biệt: Ca sáng sớm (buffet), Ca đêm muộn
  - Không nên để các ca có khung giờ trùng lặp (overlapping) để tránh nhầm lẫn khi đặt tiệc
  - Khung giờ ca nên được thiết lập phù hợp với giờ hoạt động của nhà hàng/trung tâm tiệc cưới
