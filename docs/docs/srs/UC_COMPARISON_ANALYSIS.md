# Phân tích so sánh UC - Danh sách gốc vs WMS_SRS_ver0.1.md

## Danh sách UC từ file gốc (59 UC)

### I. XÁC THỰC & TÀI KHOẢN (6 UC) ✅

| No. | Tên UC (VN)               | Tên UC (EN)      | Trong SRS  | Ghi chú |
| --- | ------------------------- | ---------------- | ---------- | ------- |
| 1   | Đăng nhập                 | Login            | ✅ 2.1.1.1 | OK      |
| 2   | Đăng xuất                 | Logout           | ✅ 2.1.1.2 | OK      |
| 3   | Quản lý thông tin cá nhân | Manage Profile   | ✅ 2.1.1.3 | OK      |
| 4   | Đổi mật khẩu              | Change Password  | ✅ 2.1.1.4 | OK      |
| 5   | Đăng ký tài khoản (Web)   | Register Account | ✅ 2.1.1.5 | OK      |
| 6   | Quên mật khẩu             | Forgot Password  | ✅ 2.1.1.6 | OK      |

### II. QUẢN TRỊ HỆ THỐNG (9 UC) ✅

| No. | Tên UC (VN)                         | Tên UC (EN)                   | Trong SRS  | Ghi chú |
| --- | ----------------------------------- | ----------------------------- | ---------- | ------- |
| 7   | Xem danh sách & chi tiết người dùng | View User Details             | ✅ 2.1.2.1 | OK      |
| 8   | Thêm người dùng (nhân viên)         | Add New User                  | ✅ 2.1.2.2 | OK      |
| 9   | Sửa thông tin người dùng            | Edit User                     | ✅ 2.1.2.3 | OK      |
| 10  | Xóa người dùng                      | Delete User                   | ✅ 2.1.2.4 | OK      |
| 11  | Xem danh sách & chi tiết nhóm quyền | View Permission Group Details | ✅ 2.1.2.5 | OK      |
| 12  | Thêm nhóm quyền mới                 | Add New Permission Group      | ✅ 2.1.2.6 | OK      |
| 13  | Sửa nhóm quyền (Tên & Quyền)        | Edit Permission Group         | ✅ 2.1.2.7 | OK      |
| 14  | Xóa nhóm quyền                      | Delete Permission Group       | ✅ 2.1.2.8 | OK      |
| 15  | Thay đổi tham số/quy định hệ thống  | Manage System Parameters      | ✅ 2.1.2.9 | OK      |

### III. QUẢN LÝ DANH MỤC (25 UC) ✅

| No.                            | Tên UC (VN)                        | Tên UC (EN)                | Trong SRS   | Ghi chú |
| ------------------------------ | ---------------------------------- | -------------------------- | ----------- | ------- |
| **Halls (5 UC)**               |
| 16                             | Xem danh sách & chi tiết Sảnh      | View Hall Details          | ✅ 2.1.3.1  | OK      |
| 17                             | Thêm Sảnh mới                      | Add New Hall               | ✅ 2.1.3.2  | OK      |
| 18                             | Sửa thông tin Sảnh                 | Edit Hall                  | ✅ 2.1.3.3  | OK      |
| 19                             | Xóa Sảnh                           | Delete Hall                | ✅ 2.1.3.4  | OK      |
| 20                             | Xuất danh sách Sảnh ra Excel       | Export Halls to Excel      | ✅ 2.1.3.5  | OK      |
| **Hall Types (5 UC)**          |
| 21                             | Xem danh sách & chi tiết Loại Sảnh | View Hall Type Details     | ✅ 2.1.3.6  | OK      |
| 22                             | Thêm Loại Sảnh mới                 | Add New Hall Type          | ✅ 2.1.3.7  | OK      |
| 23                             | Sửa Loại Sảnh & Đơn giá tối thiểu  | Edit Hall Type             | ✅ 2.1.3.8  | OK      |
| 24                             | Xóa Loại Sảnh                      | Delete Hall Type           | ✅ 2.1.3.9  | OK      |
| 25                             | Xuất danh sách Loại Sảnh ra Excel  | Export Hall Types to Excel | ✅ 2.1.3.10 | OK      |
| **Món ăn / Dishes (5 UC)**     |
| 26                             | Xem danh sách & chi tiết Món ăn    | View Dish Details          | ✅ 2.1.3.11 | OK      |
| 27                             | Thêm Món ăn mới                    | Add New Dish               | ✅ 2.1.3.12 | OK      |
| 28                             | Sửa thông tin Món ăn               | Edit Dish                  | ✅ 2.1.3.13 | OK      |
| 29                             | Xóa Món ăn                         | Delete Dish                | ✅ 2.1.3.14 | OK      |
| 30                             | Xuất danh sách Món ăn ra Excel     | Export Dishes to Excel     | ✅ 2.1.3.15 | OK      |
| **Dịch vụ / Services (5 UC)**  |
| 31                             | Xem danh sách & chi tiết Dịch vụ   | View Service Details       | ✅ 2.1.3.16 | OK      |
| 32                             | Thêm Dịch vụ mới                   | Add New Service            | ✅ 2.1.3.17 | OK      |
| 33                             | Sửa thông tin Dịch vụ              | Edit Service               | ✅ 2.1.3.18 | OK      |
| 34                             | Xóa Dịch vụ                        | Delete Service             | ✅ 2.1.3.19 | OK      |
| 35                             | Xuất danh sách Dịch vụ ra Excel    | Export Services to Excel   | ✅ 2.1.3.20 | OK      |
| **Ca tổ chức / Shifts (5 UC)** |
| 36                             | Xem danh sách & chi tiết Ca        | View Shift Details         | ✅ 2.1.3.21 | OK      |
| 37                             | Thêm Ca tổ chức mới                | Add New Shift              | ✅ 2.1.3.22 | OK      |
| 38                             | Sửa thông tin Ca tổ chức           | Edit Shift                 | ✅ 2.1.3.23 | OK      |
| 39                             | Xóa Ca tổ chức                     | Delete Shift               | ✅ 2.1.3.24 | OK      |
| 40                             | Xuất danh sách Ca ra Excel         | Export Shifts to Excel     | ✅ 2.1.3.25 | OK      |

### IV. NGHIỆP VỤ ĐẶT TIỆC - KHÁCH HÀNG (5 UC) ✅

| No. | Tên UC (VN)                               | Tên UC (EN)                | Trong SRS  | Ghi chú |
| --- | ----------------------------------------- | -------------------------- | ---------- | ------- |
| 41  | Tra cứu lịch sảnh trống                   | Check Hall Availability    | ✅ 2.1.4.1 | OK      |
| 42  | Đặt tiệc cưới mới (Tạo phiếu đặt)         | Submit Wedding Reservation | ✅ 2.1.4.2 | OK      |
| 43  | Xem chi tiết phiếu đặt của tôi            | View My Booking Details    | ✅ 2.1.4.3 | OK      |
| 44  | Chỉnh sửa phiếu đặt của tôi (trước duyệt) | Edit My Booking Request    | ✅ 2.1.4.4 | OK      |
| 45  | Hủy phiếu đặt của tôi                     | Cancel My Booking          | ✅ 2.1.4.5 | OK      |

### V. QUẢN LÝ ĐẶT TIỆC - STAFF/ADMIN (6 UC) ✅

| No. | Tên UC (VN)                            | Tên UC (EN)                    | Trong SRS  | Ghi chú |
| --- | -------------------------------------- | ------------------------------ | ---------- | ------- |
| 46  | Tra cứu lịch sảnh trống (hệ thống)     | Check System Hall Availability | ✅ 2.1.5.3 | OK      |
| 47  | Tạo phiếu đặt tiệc (cho khách)         | Create Booking for Customer    | ✅ 2.1.5.4 | OK      |
| 48  | Xóa phiếu đặt                          | Delete Booking                 | ✅ 2.1.5.6 | OK      |
| 49  | Tra cứu & lọc danh sách phiếu đặt      | Search/Filter All Bookings     | ✅ 2.1.5.1 | OK      |
| 50  | Xem chi tiết phiếu đặt bất kỳ          | View Any Booking Details       | ✅ 2.1.5.2 | OK      |
| 51  | Chỉnh sửa phiếu đặt (Món/DV/Thông tin) | Modify Booking Details         | ✅ 2.1.5.5 | OK      |

### VI. HÓA ĐƠN & THANH TOÁN - KHÁCH HÀNG (3 UC) ✅

| No. | Tên UC (VN)                                  | Tên UC (EN)              | Trong SRS  | Ghi chú |
| --- | -------------------------------------------- | ------------------------ | ---------- | ------- |
| 52  | Xem hóa đơn của tôi & Công nợ                | View My Invoice & Debt   | ✅ 2.1.6.1 | OK      |
| 53  | Thanh toán hóa đơn của tôi (Đặt cọc/Toàn bộ) | Pay My Invoice           | ✅ 2.1.6.2 | OK      |
| 54  | Xuất hóa đơn của tôi ra PDF                  | Export My Invoice to PDF | ✅ 2.1.6.3 | OK      |

### VII. QUẢN LÝ HÓA ĐƠN - STAFF/ADMIN (3 UC) ✅

| No. | Tên UC (VN)                           | Tên UC (EN)                         | Trong SRS  | Ghi chú |
| --- | ------------------------------------- | ----------------------------------- | ---------- | ------- |
| 55  | Xem chi tiết hóa đơn bất kỳ & Công nợ | View Any Invoice & Debt             | ✅ 2.1.7.1 | OK      |
| 56  | Xác nhận thanh toán & Tính tiền phạt  | Confirm Payment & Calculate Penalty | ✅ 2.1.7.2 | OK      |
| 57  | Xuất hóa đơn bất kỳ ra PDF            | Export Any Invoice to PDF           | ✅ 2.1.7.3 | OK      |

### VIII. BÁO CÁO & THỐNG KÊ (2 UC) ✅

| No. | Tên UC (VN)           | Tên UC (EN)            | Trong SRS  | Ghi chú |
| --- | --------------------- | ---------------------- | ---------- | ------- |
| 58  | Xem biểu đồ doanh thu | View Revenue Chart     | ✅ 2.1.8.1 | OK      |
| 59  | Xuất báo cáo ra Excel | Export Report to Excel | ✅ 2.1.8.2 | OK      |

---

## 📊 TỔNG KẾT

### ✅ HOÀN THÀNH ĐẦY ĐỦ 59 UC!

**Kết quả kiểm tra chi tiết:**

- ✅ Tổng UC trong danh sách gốc: **59 UC**
- ✅ Tổng UC đã implement trong WMS_SRS_ver0.1.md: **59 UC** (đã verify bằng grep_search)
- ✅ Tất cả 59 UC đã được implement đầy đủ
- ✅ **KHÔNG CÓ UC NÀO THIẾU!**

**Mapping đầy đủ:**

- UC 1-6 → 2.1.1.1-6 ✅
- UC 7-15 → 2.1.2.1-9 ✅
- UC 16-40 → 2.1.3.1-25 ✅
- UC 41-45 → 2.1.4.1-5 ✅
- UC 46-51 → 2.1.5.1-6 ✅ (UC 46 = 2.1.5.3, không thiếu!)
- UC 52-54 → 2.1.6.1-3 ✅
- UC 55-57 → 2.1.7.1-3 ✅
- UC 58-59 → 2.1.8.1-2 ✅

---

## ⚠️ VẤN ĐỀ CÒN LẠI: DUPLICATE MESSAGES

### Thống kê MSG:

- **Tổng số MSG hiện tại:** 213 messages (MSG 1 - MSG 213)
- **Ước tính MSG trùng lặp:** ~60-80 messages (28-38%)
- **MSG sau khi gộp:** Khoảng 150-160 unique messages

### Các loại MSG trùng lặp chính:

#### 1. Validation Messages - Form Input (trùng 6-8 lần):

- "All fields are required." / "All required fields must be filled."
  - MSG 6, 12, 18, 33, 38, 49, 163, 180
- "Invalid email format."
  - MSG 7, 20, 30, 39, 50, 181
- "Phone must be 10-11 digits." / "Phone must be 10 digits."
  - MSG 8, 21, 40, 51, 164, 182
- "Password must be at least 8 characters with uppercase, lowercase, digit and special character."
  - MSG 13, 22, 34

#### 2. CRUD Messages - Master Data (trùng 5 lần cho mỗi entity: Hall, HallType, Dish, Service, Shift):

- "[Entity] name and [attributes] are required."
  - MSG 81 (Hall), 87 (Hall), 97 (HallType), 103 (HallType), 113 (Dish), 119 (Dish), 129 (Service), 135 (Service), 145 (Shift), 151 (Shift)
- "[Entity] name must be 3-100 characters."
  - MSG 82, 88, 98, 104, 114, 120, 130, 136, 146, 152
- "Price must be a positive number."
  - MSG 115, 121, 131, 137
- "[Entity] name already exists."
  - MSG 84, 90, 100, 106, 116, 122, 132, 138, 148, 154
- "Failed to create [entity]. Please try again."
  - MSG 85, 101, 117, 133, 149
- "Failed to update [entity]. Please try again."
  - MSG 91, 107, 123, 139, 155
- "Failed to delete [entity]. Please try again."
  - MSG 94, 110, 126, 142, 158
- "[Entity] created successfully."
  - MSG 86, 102, 118, 134, 150
- "[Entity] updated successfully."
  - MSG 92, 108, 124, 140, 156
- "[Entity] deleted successfully."
  - MSG 95, 111, 127, 143, 159
- "No data to export."
  - MSG 96, 112, 128, 144, 160, 210 (6 lần!)

#### 3. Booking Messages (trùng 2 lần):

- "Hall is already booked for selected date and shift."
  - MSG 185, 188
- "Hall is no longer available for selected date and shift."
  - MSG 167, 172
- "Wedding date must be in future."
  - MSG 165, 183
- "Cannot load booking details. Please try again."
  - MSG 170, 178
- "Booking updated successfully."
  - MSG 173, 189

---

## 🔍 KẾ HOẠCH XỬ LÝ MSG TRÙNG:

### Bước 1: Tạo bảng mapping MSG consolidation

- Liệt kê tất cả MSG có nội dung trùng
- Chọn 1 MSG code chính để giữ lại (thường là số nhỏ nhất)
- Liệt kê các MSG code cần xóa

### Bước 2: Tìm và thay thế tất cả BR references

- Dùng multi_replace_string_in_file để thay (Refer to MSG XXX) → (Refer to MSG YYY)
- Update tất cả BR trong 1 lần

### Bước 3: Xóa các MSG entry trùng lặp

- Giữ lại 1 MSG duy nhất
- Xóa các MSG còn lại trong Messages section

### Bước 4: Đánh số lại MSG (optional)

- Nếu cần, có thể đánh số lại từ MSG 1 đến MSG ~150
- Nhưng việc này không bắt buộc nếu chỉ xóa MSG trùng

---

## 📝 GHI CHÚ:

- UC 46 (2.1.5.3) đã có từ đầu, chỉ là mapping không rõ ràng
- UC 47-51 trong danh sách gốc tương ứng với 2.1.5.4, 6, 1, 2, 5 trong SRS (thứ tự khác nhau)
- **Chắc chắn thiếu UC 46** và cần thêm vào giữa 2.1.5.2 và 2.1.5.3 (hoặc đổi số)
- Việc đánh số lại BR sẽ rất mất công → Nên làm 1 lần duy nhất sau khi xác định đủ tất cả UC
- **Không cần đánh số lại BR** vì không thiếu UC → Chỉ cần xử lý MSG trùng!
