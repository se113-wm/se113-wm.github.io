# ĐẶC TẢ CÁC USE CASE - MANAGE ROUTES

Tài liệu này mô tả các use case thuộc nhóm quản lý Tuyến du lịch (Route). Các bước không bao gồm kiểm tra vai trò trong luồng chính (đã được kiểm soát ở UI/ACL). Các ràng buộc nghiệp vụ và truy vấn SQL minh họa được nêu rõ trong từng use case.

---

## UC_ROUTE_01: View and Filter Routes (Xem và lọc tuyến du lịch)

### Mô tả

Nhân viên/Quản trị xem danh sách các tuyến du lịch và lọc theo tiêu chí.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập và có quyền truy cập trang quản lý tuyến

### Điều kiện hậu

- Hiển thị danh sách tuyến theo tiêu chí lọc (nếu có)

### Luồng sự kiện chính

| Bước | Staff/Admin                  | Hệ thống                                                                                                                                                                                        |
| ---- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "View Routes" |                                                                                                                                                                                                 |
| 2    |                              | Truy vấn danh sách tuyến: <br>`SELECT r.*, COUNT(t.id) AS total_trips` <br>`FROM Route r` <br>`LEFT JOIN Trip t ON r.id = t.route_id` <br>`GROUP BY r.id` <br>`ORDER BY r.id DESC`              |
| 3    |                              | Hiển thị danh sách tuyến với các cột: tên, điểm xuất phát/điểm kết thúc, số ngày, trạng thái, tổng số chuyến (total_trips) và các nút hành động (Xem chi tiết, Sửa, Xóa)                        |
| 4    | Nhập tiêu chí lọc            |                                                                                                                                                                                                 |
| 5    | Click "Áp dụng"              |                                                                                                                                                                                                 |
| 6    |                              | Truy vấn với điều kiện WHERE tương ứng theo tiêu chí: <br>- Từ khóa (LIKE theo name) <br>- Điểm xuất phát, điểm kết thúc <br>- Số ngày (= hoặc khoảng) <br>- Trạng thái (OPEN, ONGOING, CLOSED) |
| 7    |                              | Hiển thị danh sách đã lọc                                                                                                                                                                       |
| 8    | Xem kết quả                  |                                                                                                                                                                                                 |

### Luồng sự kiện phụ

**2a. Không có tuyến nào:**

- 2a.1. Hiển thị thông báo: "Chưa có tuyến du lịch nào"
- 2a.2. Hiển thị nút "Thêm tuyến mới"
- 2a.3. Kết thúc use case

**6a. Không có kết quả phù hợp:**

- 6a.1. Hiển thị: "Không tìm thấy tuyến phù hợp với tiêu chí lọc"
- 6a.2. Cho phép xóa bộ lọc hoặc thay đổi tiêu chí

---

## UC_ROUTE_02: Add Route (Thêm tuyến du lịch)

### Mô tả

Nhân viên/Quản trị thêm một tuyến du lịch mới.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Người dùng có quyền truy cập trang thêm tuyến

### Điều kiện hậu

- Tạo mới một bản ghi Route

### Luồng sự kiện chính

| Bước | Staff/Admin          | Hệ thống                                                                                                                                                                                                                      |
| ---- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Thêm tuyến"    |                                                                                                                                                                                                                               |
| 2    |                      | Hiển thị form thêm tuyến: <br>- Tên tuyến (name) <br>- Điểm xuất phát (start_location) <br>- Điểm kết thúc (end_location) <br>- Số ngày (duration_days) <br>- Ảnh (image - tùy chọn) <br>- Trạng thái (status, mặc định OPEN) |
| 3    | Nhập thông tin tuyến |                                                                                                                                                                                                                               |
| 4    | Click "Lưu"          |                                                                                                                                                                                                                               |
| 5    |                      | Kiểm tra dữ liệu hợp lệ: <br>- name không rỗng <br>- start_location, end_location không rỗng <br>- duration_days > 0 <br>- status ∈ {OPEN, ONGOING, CLOSED}                                                                   |
| 6    |                      | Thêm tuyến: <br>`INSERT INTO Route (name, start_location, end_location, duration_days, image, status)` <br>`VALUES (:name, :start, :end, :days, :image, :status)`                                                             |
| 7    |                      | Hiển thị thông báo thành công và quay về danh sách tuyến                                                                                                                                                                      |
| 8    | Xem tuyến vừa tạo    |                                                                                                                                                                                                                               |

### Luồng sự kiện phụ

**5a. Dữ liệu không hợp lệ:**

- 5a.1. Hiển thị thông báo lỗi chi tiết (trường nào sai)
- 5a.2. Giữ nguyên dữ liệu đã nhập
- 5a.3. Quay lại bước 2

**6a. Lỗi khi thêm tuyến (DB/transaction):**

- 6a.1. Hiển thị: "Không thể tạo tuyến. Vui lòng thử lại"
- 6a.2. Ghi log lỗi
- 6a.3. Kết thúc use case

---

## UC_ROUTE_03: Edit Route (Chỉnh sửa tuyến du lịch)

### Mô tả

Nhân viên/Quản trị chỉnh sửa thông tin một tuyến.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Tuyến tồn tại trong hệ thống

### Điều kiện hậu

- Cập nhật thành công bản ghi Route

### Luồng sự kiện chính

| Bước | Staff/Admin                           | Hệ thống                                                                                                                                                                                                           |
| ---- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Tại danh sách, click "Sửa" trên tuyến |                                                                                                                                                                                                                    |
| 2    |                                       | Truy vấn thông tin tuyến: <br>`SELECT * FROM Route WHERE id = :route_id`                                                                                                                                           |
| 3    |                                       | Hiển thị form chỉnh sửa với dữ liệu hiện tại                                                                                                                                                                       |
| 4    | Sửa thông tin và click "Lưu"          |                                                                                                                                                                                                                    |
| 5    |                                       | Kiểm tra dữ liệu hợp lệ: <br>- name không rỗng <br>- start_location, end_location không rỗng <br>- duration_days > 0 <br>- status ∈ {OPEN, ONGOING, CLOSED}                                                        |
| 6    |                                       | Ràng buộc bổ sung (nếu thay đổi status/duration_days): <br>- Nếu đổi status = CLOSED: chặn nếu còn Trip đang SCHEDULED/ONGOING <br>- Nếu giảm duration_days: phải >= `MAX(day)` trong `Route_Attraction` của tuyến |
| 7    |                                       | Cập nhật tuyến: <br>`UPDATE Route SET name=:name, start_location=:start, end_location=:end, duration_days=:days, image=:image, status=:status WHERE id=:route_id`                                                  |
| 8    |                                       | Hiển thị thông báo thành công và quay về danh sách                                                                                                                                                                 |
| 9    | Xem tuyến đã cập nhật                 |                                                                                                                                                                                                                    |

### Luồng sự kiện phụ

**6a. Vi phạm ràng buộc:**

- 6a.1. Nếu còn Trip SCHEDULED/ONGOING: hiển thị "Không thể đóng tuyến khi còn chuyến đang hoạt động"
- 6a.2. Nếu giảm duration_days < MAX(day) đang dùng: hiển thị "Số ngày phải ≥ ngày lớn nhất trong lịch trình"
- 6a.3. Quay lại bước 3

**7a. Lỗi khi cập nhật:**

- 7a.1. Hiển thị: "Không thể cập nhật tuyến. Vui lòng thử lại"
- 7a.2. Ghi log lỗi
- 7a.3. Kết thúc use case

---

## UC_ROUTE_04: Delete Route (Xóa tuyến du lịch)

### Mô tả

Nhân viên/Quản trị xóa một tuyến khỏi hệ thống.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Tuyến tồn tại

### Điều kiện hậu

- Xóa bản ghi Route thành công (chỉ khi không còn phụ thuộc)

### Luồng sự kiện chính

| Bước | Staff/Admin                | Hệ thống                                                                                                                                                            |
| ---- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Tại danh sách, click "Xóa" |                                                                                                                                                                     |
| 2    | Xác nhận xóa               |                                                                                                                                                                     |
| 3    |                            | Kiểm tra ràng buộc trước khi xóa: <br>- `SELECT COUNT(*) FROM Trip WHERE route_id=:route_id` <br>- `SELECT COUNT(*) FROM Route_Attraction WHERE route_id=:route_id` |
| 4    |                            | Nếu cả hai đều = 0, tiến hành xóa: <br>`DELETE FROM Route WHERE id=:route_id`                                                                                       |
| 5    |                            | Hiển thị thông báo xóa thành công                                                                                                                                   |
| 6    | Hoàn tất                   |                                                                                                                                                                     |

### Luồng sự kiện phụ

**3a. Còn dữ liệu phụ thuộc:**

- 3a.1. Nếu còn Trip hoặc Route_Attraction: hiển thị "Không thể xóa tuyến do còn dữ liệu liên quan"
- 3a.2. Gợi ý: đóng tuyến (status=CLOSED) hoặc xóa lịch trình/chuyến trước
- 3a.3. Kết thúc use case

**4a. Lỗi khi xóa:**

- 4a.1. Hiển thị: "Xóa không thành công. Vui lòng thử lại"
- 4a.2. Ghi log lỗi
- 4a.3. Kết thúc use case

---

## UC_ROUTE_05: View Route Details (Xem chi tiết tuyến)

### Mô tả

Nhân viên/Quản trị xem chi tiết một tuyến: thông tin cơ bản, tổng số chuyến, và (tùy chọn) tóm tắt lịch trình.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Tuyến tồn tại

### Điều kiện hậu

- Hiển thị thông tin chi tiết của tuyến

### Luồng sự kiện chính

| Bước | Staff/Admin                         | Hệ thống                                                                                                                                                                          |
| ---- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Tại danh sách, click "Xem chi tiết" |                                                                                                                                                                                   |
| 2    |                                     | Truy vấn thông tin tuyến: <br>`SELECT * FROM Route WHERE id=:route_id`                                                                                                            |
| 3    |                                     | Truy vấn tổng số chuyến: <br>`SELECT COUNT(*) AS total_trips FROM Trip WHERE route_id=:route_id`                                                                                  |
| 4    |                                     | (Tùy chọn) Tóm tắt lịch trình: <br>`SELECT day, COUNT(*) AS attractions_in_day FROM Route_Attraction WHERE route_id=:route_id GROUP BY day ORDER BY day`                          |
| 5    |                                     | Hiển thị: <br>- Thông tin tuyến (name, start_location, end_location, duration_days, status, image) <br>- Tổng số chuyến (total_trips) <br>- Tóm tắt lịch trình theo ngày (nếu có) |
| 6    | Xem chi tiết                        |                                                                                                                                                                                   |

### Luồng sự kiện phụ

**2a. Tuyến không tồn tại:**

- 2a.1. Hiển thị: "Tuyến không tồn tại"
- 2a.2. Quay lại danh sách tuyến
- 2a.3. Kết thúc use case

---

## Ghi chú & Ràng buộc nghiệp vụ chung

- Trạng thái Route: OPEN, ONGOING, CLOSED.
- Không cho phép đặt status=CLOSED nếu tồn tại Trip ở trạng thái SCHEDULED hoặc ONGOING.
- Khi giảm `duration_days`, phải đảm bảo `duration_days ≥ MAX(day)` đã được sử dụng trong Route_Attraction của tuyến đó.
- Khuyến nghị không xóa cứng (hard delete) nếu còn dữ liệu liên quan; thay vào đó đóng tuyến hoặc làm sạch dữ liệu phụ thuộc trước.
