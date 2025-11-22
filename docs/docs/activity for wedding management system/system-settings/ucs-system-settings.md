# ĐẶC TẢ CÁC USE CASE - SYSTEM SETTINGS

Tài liệu này mô tả các use case thuộc nhóm cài đặt hệ thống (System Settings) dành cho Quản trị viên trong Hệ thống Quản lý Tiệc Cưới.

Gồm 1 use case chính:

1. Manage System Parameters (Thay đổi tham số/quy định hệ thống)

---

## UC_SS_01: Manage System Parameters (Thay đổi tham số/quy định hệ thống)

### Mô tả

Quản trị viên xem và cập nhật các tham số cấu hình hệ thống như: bật/tắt kiểm tra phạt, tỷ lệ phạt, tỷ lệ đặt cọc tối thiểu, và tỷ lệ số bàn đặt trước tối thiểu.

### Tác nhân chính

- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Admin

### Điều kiện hậu

- Cập nhật các tham số hệ thống trong bảng THAMSO

### Luồng sự kiện chính

| Bước | Admin                             | Hệ thống                                                                                                                                                                                                                                                                                                                                                             |
| ---- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "Cài đặt hệ thống" |                                                                                                                                                                                                                                                                                                                                                                      |
| 2    |                                   | Truy vấn tất cả tham số hệ thống: <br>`SELECT TenThamSo, GiaTri` <br>`FROM THAMSO` <br>`ORDER BY TenThamSo`                                                                                                                                                                                                                                                          |
| 3    |                                   | Hiển thị form cài đặt với các tham số: <br>- Bật kiểm tra phạt (KiemTraPhat): Checkbox (1 = Bật, 0 = Tắt) <br>- Tỷ lệ phạt (TiLePhat): Input number (%) <br>- Tỷ lệ tiền đặt cọc tối thiểu (TiLeTienDatCocToiThieu): Input number (%) <br>- Tỷ lệ số bàn đặt trước tối thiểu (TiLeSoBanDatTruocToiThieu): Input number (%) <br>Kèm giá trị hiện tại của từng tham số |
| 4    | Chỉnh sửa giá trị tham số         |                                                                                                                                                                                                                                                                                                                                                                      |
| 5    | Click "Lưu thay đổi"              |                                                                                                                                                                                                                                                                                                                                                                      |
| 6    |                                   | Hiển thị hộp thoại xác nhận: "Các thay đổi tham số sẽ ảnh hưởng đến toàn bộ hệ thống. Bạn có chắc chắn muốn tiếp tục?"                                                                                                                                                                                                                                               |
| 7    | Click "Xác nhận"                  |                                                                                                                                                                                                                                                                                                                                                                      |
| 8    |                                   | Kiểm tra dữ liệu: <br>- KiemTraPhat: 0 hoặc 1 <br>- TiLePhat: 0 ≤ giá trị ≤ 1 (hoặc 0% - 100%) <br>- TiLeTienDatCocToiThieu: 0 < giá trị ≤ 1 (hoặc 1% - 100%) <br>- TiLeSoBanDatTruocToiThieu: 0 < giá trị ≤ 1 (hoặc 1% - 100%)                                                                                                                                      |
| 9    |                                   | Thực hiện cập nhật từng tham số trong transaction: <br>`UPDATE THAMSO` <br>`SET GiaTri = @GiaTri` <br>`WHERE TenThamSo = @TenThamSo` <br>(Lặp lại cho từng tham số: KiemTraPhat, TiLePhat, TiLeTienDatCocToiThieu, TiLeSoBanDatTruocToiThieu)                                                                                                                        |
| 10   |                                   | Commit transaction                                                                                                                                                                                                                                                                                                                                                   |
| 11   |                                   | Hiển thị thông báo "Cập nhật tham số hệ thống thành công" và reload form với giá trị mới                                                                                                                                                                                                                                                                             |
| 12   | Xem các tham số đã được cập nhật  |                                                                                                                                                                                                                                                                                                                                                                      |
| 13   | Xác nhận kết thúc                 |                                                                                                                                                                                                                                                                                                                                                                      |

### Luồng sự kiện phụ

- 7a. Admin click "Hủy" trong hộp thoại xác nhận:
  - Hệ thống đóng hộp thoại xác nhận và quay về form chỉnh sửa (bước 4)
- 8a. Dữ liệu không hợp lệ:
  - Hệ thống hiển thị thông báo lỗi cụ thể (tham số nào không hợp lệ, giá trị cho phép là gì)
  - Quay về bước 4
- 10a. Lỗi database (cập nhật thất bại):
  - Hệ thống rollback transaction
  - Hệ thống hiển thị "Cập nhật tham số thất bại. Vui lòng thử lại"
  - Kết thúc use case (người dùng cần khởi động lại use case từ đầu nếu muốn thử lại)

### Luồng sự kiện ngoại lệ

Không có luồng ngoại lệ đặc biệt.

### Yêu cầu đặc biệt

- **Bảo mật**: Chỉ Admin mới có quyền truy cập chức năng này
- **Xác nhận**: Hiển thị cảnh báo xác nhận trước khi lưu thay đổi: "Các thay đổi tham số sẽ ảnh hưởng đến toàn bộ hệ thống. Bạn có chắc chắn muốn tiếp tục?"
- **Transaction**: Tất cả các tham số phải được cập nhật trong một transaction, nếu có bất kỳ lỗi nào thì rollback toàn bộ

### Yêu cầu phi chức năng

- **Hiệu suất**: Cập nhật tham số phải hoàn thành trong vòng 2 giây
- **Độ tin cậy**: Rollback toàn bộ nếu có bất kỳ tham số nào cập nhật thất bại (transaction)
- **Khả năng mở rộng**: Dễ dàng thêm tham số mới mà không cần thay đổi cấu trúc bảng

### Quy tắc nghiệp vụ

- **BR1**: KiemTraPhat = 0 nghĩa là hệ thống không tính tiền phạt khi khách hàng thanh toán muộn
- **BR2**: KiemTraPhat = 1 nghĩa là hệ thống sẽ tự động tính tiền phạt dựa trên TiLePhat
- **BR3**: TiLePhat được lưu dưới dạng decimal (0.01 = 1%), áp dụng khi khách thanh toán sau ngày tổ chức tiệc
- **BR4**: TiLeTienDatCocToiThieu xác định phần trăm tối thiểu phải đặt cọc (ví dụ: 0.15 = 15% tổng hóa đơn)
- **BR5**: TiLeSoBanDatTruocToiThieu xác định phần trăm tối thiểu số bàn phải đặt trước (ví dụ: 0.85 = 85% số bàn dự kiến)
- **BR6**: Các tỷ lệ phần trăm (TiLePhat, TiLeTienDatCocToiThieu, TiLeSoBanDatTruocToiThieu) phải nằm trong khoảng từ 0 đến 1

### SQL Queries/Logic

#### Query 1: Load all system parameters

```sql
SELECT TenThamSo, GiaTri
FROM THAMSO
ORDER BY TenThamSo;
```

#### Query 2: Update a specific parameter

```sql
UPDATE THAMSO
SET GiaTri = @GiaTri
WHERE TenThamSo = @TenThamSo;
```

#### Query 3: Update all parameters in a transaction

```sql
BEGIN TRANSACTION;

UPDATE THAMSO SET GiaTri = @KiemTraPhat WHERE TenThamSo = N'KiemTraPhat';
UPDATE THAMSO SET GiaTri = @TiLePhat WHERE TenThamSo = N'TiLePhat';
UPDATE THAMSO SET GiaTri = @TiLeTienDatCocToiThieu WHERE TenThamSo = N'TiLeTienDatCocToiThieu';
UPDATE THAMSO SET GiaTri = @TiLeSoBanDatTruocToiThieu WHERE TenThamSo = N'TiLeSoBanDatTruocToiThieu';

COMMIT TRANSACTION;
```

#### Validation Logic

```sql
-- Validate KiemTraPhat (must be 0 or 1)
IF @KiemTraPhat NOT IN (0, 1)
    RAISERROR(N'KiemTraPhat phải là 0 (tắt) hoặc 1 (bật)', 16, 1);

-- Validate TiLePhat (must be between 0 and 1)
IF @TiLePhat < 0 OR @TiLePhat > 1
    RAISERROR(N'TiLePhat phải nằm trong khoảng 0 đến 1 (0% - 100%)', 16, 1);

-- Validate TiLeTienDatCocToiThieu (must be between 0 and 1, greater than 0)
IF @TiLeTienDatCocToiThieu <= 0 OR @TiLeTienDatCocToiThieu > 1
    RAISERROR(N'TiLeTienDatCocToiThieu phải nằm trong khoảng 0.01 đến 1 (1% - 100%)', 16, 1);

-- Validate TiLeSoBanDatTruocToiThieu (must be between 0 and 1, greater than 0)
IF @TiLeSoBanDatTruocToiThieu <= 0 OR @TiLeSoBanDatTruocToiThieu > 1
    RAISERROR(N'TiLeSoBanDatTruocToiThieu phải nằm trong khoảng 0.01 đến 1 (1% - 100%)', 16, 1);
```

---

## Ghi chú bổ sung

### Giải thích các tham số

1. **KiemTraPhat** (Enable Penalty Check):

   - Giá trị: 0 (Tắt) hoặc 1 (Bật)
   - Mục đích: Bật/tắt chức năng tính tiền phạt tự động

2. **TiLePhat** (Penalty Rate):

   - Giá trị: 0.00 - 1.00 (0% - 100%)
   - Mục đích: Tỷ lệ phạt áp dụng khi khách thanh toán muộn
   - Ví dụ: 0.01 = phạt 1% tổng hóa đơn

3. **TiLeTienDatCocToiThieu** (Minimum Deposit Rate):

   - Giá trị: 0.01 - 1.00 (1% - 100%)
   - Mục đích: Phần trăm tối thiểu khách hàng phải đặt cọc
   - Ví dụ: 0.15 = khách phải đặt cọc tối thiểu 15% tổng hóa đơn

4. **TiLeSoBanDatTruocToiThieu** (Minimum Table Reservation Rate):
   - Giá trị: 0.01 - 1.00 (1% - 100%)
   - Mục đích: Phần trăm tối thiểu số bàn phải đặt trước
   - Ví dụ: 0.85 = khách phải đặt trước tối thiểu 85% số bàn dự kiến

### Ví dụ cụ thể

Giả sử một phiếu đặt tiệc có:

- Tổng hóa đơn: 50,000,000 VNĐ
- Số bàn dự kiến: 20 bàn
- TiLeTienDatCocToiThieu = 0.15 (15%)
- TiLeSoBanDatTruocToiThieu = 0.85 (85%)
- KiemTraPhat = 1 (Bật)
- TiLePhat = 0.01 (1%)

Thì:

- Tiền đặt cọc tối thiểu = 50,000,000 × 0.15 = **7,500,000 VNĐ**
- Số bàn đặt trước tối thiểu = 20 × 0.85 = **17 bàn**
- Nếu thanh toán sau ngày tổ chức, tiền phạt = 50,000,000 × 0.01 = **500,000 VNĐ**

### Giao diện gợi ý

Form cài đặt nên hiển thị:

```
┌─────────────────────────────────────────────────────────────────┐
│ CÀI ĐẶT HỆ THỐNG                                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ☑ Bật kiểm tra phạt thanh toán muộn                             │
│   (Tích vào checkbox để bật tính năng tự động tính tiền phạt)   │
│                                                                 │
│ Tỷ lệ phạt (%)                      [____1____] %               │
│   (Tỷ lệ phạt áp dụng khi thanh toán sau ngày tổ chức tiệc)     │
│                                                                 │
│ Tỷ lệ đặt cọc tối thiểu (%)         [____15___] %               │
│   (Phần trăm tối thiểu khách hàng phải đặt cọc)                 │
│                                                                 │
│ Tỷ lệ số bàn đặt trước tối thiểu (%) [____85___] %              │
│   (Phần trăm tối thiểu số bàn khách phải đặt trước)             │
│                                                                 │
│                    [Lưu thay đổi]  [Hủy]                        │
└─────────────────────────────────────────────────────────────────┘
```

---
