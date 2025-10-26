# ĐẶC TẢ CÁC USE CASE - MANAGE ROUTE SCHEDULE

## UC_SCHEDULE_01: View Route Schedule (Xem lịch trình tuyến)

### Mô tả

Admin hoặc Staff xem lịch trình chi tiết của một tuyến du lịch, bao gồm danh sách các điểm tham quan được sắp xếp theo ngày và thứ tự trong ngày.

### Tác nhân chính

- Admin
- Staff

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Admin hoặc Staff
- Tuyến du lịch tồn tại trong hệ thống

### Điều kiện hậu

- Hiển thị lịch trình chi tiết của tuyến với tất cả điểm tham quan được sắp xếp theo ngày và thứ tự

### Luồng sự kiện chính

| Bước | Actor                               | Hệ thống                                                                                                                                                                                                                                                                                                                                          |
| ---- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Xem danh sách tuyến du lịch         |                                                                                                                                                                                                                                                                                                                                                   |
| 2    | Click vào một tuyến để xem chi tiết |                                                                                                                                                                                                                                                                                                                                                   |
| 3    |                                     | Kiểm tra quyền truy cập (phải là Admin hoặc Staff)                                                                                                                                                                                                                                                                                                |
| 4    |                                     | Truy vấn thông tin tuyến: <br>`SELECT * FROM Route WHERE id = :route_id`                                                                                                                                                                                                                                                                          |
| 5    |                                     | Truy vấn lịch trình chi tiết: <br>`SELECT ra.*, a.name as attraction_name, a.description, a.location, c.name as category_name` <br>`FROM Route_Attraction ra` <br>`JOIN Attraction a ON ra.attraction_id = a.id` <br>`JOIN Category c ON a.category_id = c.id` <br>`WHERE ra.route_id = :route_id` <br>`ORDER BY ra.day ASC, ra.order_in_day ASC` |
| 6    |                                     | Nhóm các điểm tham quan theo ngày (day)                                                                                                                                                                                                                                                                                                           |
| 7    |                                     | Hiển thị thông tin tuyến: <br>- Tên tuyến (name) <br>- Điểm xuất phát (start_location) <br>- Điểm kết thúc (end_location) <br>- Số ngày (duration_days) <br>- Trạng thái (status) <br>- Hình ảnh (image)                                                                                                                                          |
| 8    |                                     | Hiển thị lịch trình chi tiết theo từng ngày: <br>**Ngày 1:** <br>1. [Tên điểm tham quan] - [Mô tả hoạt động] <br>2. [Tên điểm tham quan] - [Mô tả hoạt động] <br>**Ngày 2:** <br>1. [Tên điểm tham quan] - [Mô tả hoạt động] <br>...                                                                                                              |
| 9    |                                     | Hiển thị các nút hành động (nếu là Admin): <br>- "Thêm điểm tham quan" <br>- "Sửa" (cho từng điểm) <br>- "Xóa" (cho từng điểm)                                                                                                                                                                                                                    |
| 10   | Xem lịch trình chi tiết             |                                                                                                                                                                                                                                                                                                                                                   |

### Luồng sự kiện phụ

**3a. Người dùng không có quyền truy cập:**

- 3a.1. Hệ thống hiển thị thông báo: "Bạn không có quyền xem thông tin này"
- 3a.2. Chuyển hướng về trang chủ
- 3a.3. Kết thúc use case

**4a. Tuyến không tồn tại:**

- 4a.1. Hệ thống hiển thị thông báo: "Tuyến du lịch không tồn tại"
- 4a.2. Quay lại danh sách tuyến
- 4a.3. Kết thúc use case

**5a. Tuyến chưa có lịch trình (không có điểm tham quan):**

- 5a.1. Hệ thống hiển thị thông báo: "Tuyến này chưa có lịch trình chi tiết"
- 5a.2. Nếu là Admin, hiển thị nút "Thêm điểm tham quan đầu tiên"
- 5a.3. Tiếp tục hiển thị thông tin tuyến ở bước 7

---

## UC_SCHEDULE_02: Add Itinerary (Thêm điểm tham quan vào lịch trình)

### Mô tả

Admin thêm một hoặc nhiều điểm tham quan vào lịch trình của tuyến du lịch, xác định ngày và thứ tự trong ngày cho mỗi điểm.

### Tác nhân chính

- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Admin
- Tuyến du lịch tồn tại và có trạng thái khác CLOSED
- Có ít nhất một điểm tham quan khả dụng (status = ACTIVE) trong hệ thống

### Điều kiện hậu

- Tạo thành công bản ghi Route_Attraction mới
- Lịch trình tuyến được cập nhật với điểm tham quan mới
- Thứ tự các điểm tham quan trong cùng ngày được sắp xếp đúng

### Luồng sự kiện chính

| Bước | Admin                                       | Hệ thống                                                                                                                                                                                                                                            |
| ---- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Xem lịch trình của một tuyến                |                                                                                                                                                                                                                                                     |
| 2    | Click nút "Thêm điểm tham quan"             |                                                                                                                                                                                                                                                     |
| 3    |                                             | Kiểm tra tuyến có trạng thái khác CLOSED                                                                                                                                                                                                            |
| 4    |                                             | Lấy danh sách điểm tham quan khả dụng: <br>`SELECT a.*, c.name as category_name` <br>`FROM Attraction a` <br>`JOIN Category c ON a.category_id = c.id` <br>`WHERE a.status = 'ACTIVE'` <br>`ORDER BY c.name, a.name`                                |
| 5    |                                             | Hiển thị form thêm điểm tham quan: <br>- Dropdown chọn điểm tham quan (nhóm theo Category) <br>- Input chọn ngày (day: 1 đến duration_days) <br>- Input chọn thứ tự trong ngày (order_in_day) <br>- Textarea mô tả hoạt động (activity_description) |
| 6    | Chọn điểm tham quan từ dropdown             |                                                                                                                                                                                                                                                     |
| 7    |                                             | Hiển thị thông tin điểm: tên, mô tả, vị trí, danh mục                                                                                                                                                                                               |
| 8    | Nhập ngày (day)                             |                                                                                                                                                                                                                                                     |
| 9    |                                             | Hiển thị các điểm hiện có trong ngày đó (nếu có)                                                                                                                                                                                                    |
| 10   | Nhập thứ tự trong ngày (order_in_day)       |                                                                                                                                                                                                                                                     |
| 11   | Nhập mô tả hoạt động (activity_description) |                                                                                                                                                                                                                                                     |
| 12   | Click "Lưu"                                 |                                                                                                                                                                                                                                                     |
| 13   |                                             | Kiểm tra dữ liệu hợp lệ: <br>- attraction_id phải tồn tại và status = ACTIVE <br>- day phải trong khoảng 1 đến duration_days <br>- order_in_day > 0 <br>- activity_description không rỗng                                                           |
| 14   |                                             | Kiểm tra điểm tham quan chưa tồn tại trong lịch trình: <br>`SELECT COUNT(*) as count` <br>`FROM Route_Attraction` <br>`WHERE route_id = :route_id` <br>`AND attraction_id = :attraction_id` <br>`AND day = :day`                                    |
| 15   |                                             | Nếu order_in_day trùng, điều chỉnh thứ tự các điểm sau: <br>`UPDATE Route_Attraction` <br>`SET order_in_day = order_in_day + 1` <br>`WHERE route_id = :route_id` <br>`AND day = :day` <br>`AND order_in_day >= :order_in_day`                       |
| 16   |                                             | Thêm điểm tham quan vào lịch trình: <br>`INSERT INTO Route_Attraction (route_id, attraction_id, day, order_in_day, activity_description)` <br>`VALUES (:route_id, :attraction_id, :day, :order_in_day, :activity_description)`                      |
| 17   |                                             | Hiển thị thông báo thành công: "Đã thêm điểm tham quan vào lịch trình"                                                                                                                                                                              |
| 18   |                                             | Tải lại trang lịch trình với dữ liệu mới                                                                                                                                                                                                            |
| 19   | Xem lịch trình đã cập nhật                  |                                                                                                                                                                                                                                                     |

### Luồng sự kiện phụ

**3a. Tuyến có trạng thái CLOSED:**

- 3a.1. Hệ thống hiển thị thông báo: "Không thể chỉnh sửa lịch trình của tuyến đã đóng"
- 3a.2. Kết thúc use case

**4a. Không có điểm tham quan khả dụng:**

- 4a.1. Hệ thống hiển thị thông báo: "Không có điểm tham quan nào khả dụng. Vui lòng thêm điểm tham quan mới trước"
- 4a.2. Hiển thị link "Thêm điểm tham quan mới"
- 4a.3. Kết thúc use case

**13a. Dữ liệu không hợp lệ:**

- 13a.1. Hệ thống hiển thị thông báo lỗi cụ thể:
  - "Vui lòng chọn điểm tham quan"
  - "Ngày phải từ 1 đến [duration_days]"
  - "Thứ tự phải là số nguyên dương"
  - "Vui lòng nhập mô tả hoạt động"
- 13a.2. Giữ nguyên dữ liệu đã nhập
- 13a.3. Quay lại bước 5

**14a. Điểm tham quan đã tồn tại trong ngày đó:**

- 14a.1. Hệ thống hiển thị cảnh báo: "Điểm tham quan này đã có trong lịch trình ngày [day]. Bạn có muốn thêm lại không?"
- 14a.2. Nếu Admin chọn "Có", tiếp tục bước 15
- 14a.3. Nếu Admin chọn "Không", quay lại bước 5

**16a. Lỗi khi thêm vào database:**

- 16a.1. Hệ thống rollback các thay đổi
- 16a.2. Hiển thị thông báo: "Không thể thêm điểm tham quan. Vui lòng thử lại"
- 16a.3. Ghi log lỗi
- 16a.4. Quay lại bước 5

---

## UC_SCHEDULE_03: Edit Itinerary (Sửa điểm tham quan trong lịch trình)

### Mô tả

Admin chỉnh sửa thông tin của một điểm tham quan trong lịch trình tuyến, bao gồm thay đổi ngày, thứ tự, hoặc mô tả hoạt động.

### Tác nhân chính

- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Admin
- Tuyến du lịch tồn tại và có trạng thái khác CLOSED
- Điểm tham quan đã tồn tại trong lịch trình tuyến (Route_Attraction)

### Điều kiện hậu

- Thông tin Route_Attraction được cập nhật thành công
- Nếu thay đổi day hoặc order_in_day, thứ tự các điểm khác được điều chỉnh tương ứng
- Lịch trình tuyến hiển thị đúng thông tin mới

### Luồng sự kiện chính

| Bước | Admin                                   | Hệ thống                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Xem lịch trình của một tuyến            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2    | Click nút "Sửa" trên một điểm tham quan |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 3    |                                         | Kiểm tra tuyến có trạng thái khác CLOSED                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 4    |                                         | Lấy thông tin Route_Attraction hiện tại: <br>`SELECT ra.*, a.name as attraction_name, a.description, a.location` <br>`FROM Route_Attraction ra` <br>`JOIN Attraction a ON ra.attraction_id = a.id` <br>`WHERE ra.id = :route_attraction_id`                                                                                                                                                                                                                                                                                                                                                      |
| 5    |                                         | Hiển thị form chỉnh sửa với dữ liệu hiện tại: <br>- Tên điểm tham quan (read-only, hiển thị thông tin) <br>- Input ngày (day) - giá trị hiện tại <br>- Input thứ tự (order_in_day) - giá trị hiện tại <br>- Textarea mô tả hoạt động (activity_description) - giá trị hiện tại                                                                                                                                                                                                                                                                                                                   |
| 6    | Chỉnh sửa các trường cần thay đổi       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 7    | Click "Lưu"                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 8    |                                         | Kiểm tra dữ liệu hợp lệ: <br>- day phải trong khoảng 1 đến duration_days <br>- order_in_day > 0 <br>- activity_description không rỗng                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 9    |                                         | Kiểm tra xem có thay đổi day hoặc order_in_day không                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 10   |                                         | Nếu thay đổi day hoặc order_in_day: <br>a. Lấy giá trị cũ (old_day, old_order) <br>b. Điều chỉnh thứ tự ở ngày cũ (lấp khoảng trống): <br>`UPDATE Route_Attraction` <br>`SET order_in_day = order_in_day - 1` <br>`WHERE route_id = :route_id` <br>`AND day = :old_day` <br>`AND order_in_day > :old_order` <br>c. Điều chỉnh thứ tự ở ngày mới (nếu trùng, đẩy các điểm sau xuống): <br>`UPDATE Route_Attraction` <br>`SET order_in_day = order_in_day + 1` <br>`WHERE route_id = :route_id` <br>`AND day = :new_day` <br>`AND order_in_day >= :new_order` <br>`AND id != :route_attraction_id` |
| 11   |                                         | Cập nhật thông tin Route_Attraction: <br>`UPDATE Route_Attraction` <br>`SET day = :day, order_in_day = :order_in_day, activity_description = :activity_description` <br>`WHERE id = :route_attraction_id`                                                                                                                                                                                                                                                                                                                                                                                        |
| 12   |                                         | Hiển thị thông báo thành công: "Đã cập nhật thông tin điểm tham quan"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 13   |                                         | Tải lại trang lịch trình với dữ liệu mới                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 14   | Xem lịch trình đã cập nhật              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

### Luồng sự kiện phụ

**3a. Tuyến có trạng thái CLOSED:**

- 3a.1. Hệ thống hiển thị thông báo: "Không thể chỉnh sửa lịch trình của tuyến đã đóng"
- 3a.2. Kết thúc use case

**4a. Route_Attraction không tồn tại:**

- 4a.1. Hệ thống hiển thị thông báo: "Không tìm thấy thông tin điểm tham quan này"
- 4a.2. Tải lại trang lịch trình
- 4a.3. Kết thúc use case

**8a. Dữ liệu không hợp lệ:**

- 8a.1. Hệ thống hiển thị thông báo lỗi cụ thể:
  - "Ngày phải từ 1 đến [duration_days]"
  - "Thứ tự phải là số nguyên dương"
  - "Vui lòng nhập mô tả hoạt động"
- 8a.2. Giữ nguyên dữ liệu đã nhập
- 8a.3. Quay lại bước 5

**11a. Lỗi khi cập nhật database:**

- 11a.1. Hệ thống rollback tất cả thay đổi (bao gồm cả điều chỉnh thứ tự)
- 11a.2. Hiển thị thông báo: "Không thể cập nhật thông tin. Vui lòng thử lại"
- 11a.3. Ghi log lỗi
- 11a.4. Quay lại bước 5

---

## UC_SCHEDULE_04: Delete Itinerary (Xóa điểm tham quan khỏi lịch trình)

### Mô tả

Admin xóa một điểm tham quan khỏi lịch trình tuyến du lịch. Thứ tự các điểm còn lại trong cùng ngày sẽ được tự động điều chỉnh.

### Tác nhân chính

- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Admin
- Tuyến du lịch tồn tại và có trạng thái khác CLOSED
- Điểm tham quan tồn tại trong lịch trình tuyến (Route_Attraction)
- Tuyến phải còn ít nhất 2 điểm tham quan (không xóa điểm cuối cùng)

### Điều kiện hậu

- Bản ghi Route_Attraction bị xóa khỏi hệ thống
- Thứ tự (order_in_day) của các điểm còn lại trong cùng ngày được điều chỉnh để lấp khoảng trống
- Lịch trình tuyến được cập nhật

### Luồng sự kiện chính

| Bước | Admin                                   | Hệ thống                                                                                                                                                                                                                                                                                                                                        |
| ---- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Xem lịch trình của một tuyến            |                                                                                                                                                                                                                                                                                                                                                 |
| 2    | Click nút "Xóa" trên một điểm tham quan |                                                                                                                                                                                                                                                                                                                                                 |
| 3    |                                         | Kiểm tra tuyến có trạng thái khác CLOSED                                                                                                                                                                                                                                                                                                        |
| 4    |                                         | Lấy thông tin Route_Attraction: <br>`SELECT ra.*, a.name as attraction_name` <br>`FROM Route_Attraction ra` <br>`JOIN Attraction a ON ra.attraction_id = a.id` <br>`WHERE ra.id = :route_attraction_id`                                                                                                                                         |
| 5    |                                         | Kiểm tra số điểm tham quan còn lại của tuyến: <br>`SELECT COUNT(*) as total` <br>`FROM Route_Attraction` <br>`WHERE route_id = :route_id`                                                                                                                                                                                                       |
| 6    |                                         | Nếu total > 1, tiếp tục. Nếu total = 1, chuyển sang luồng phụ 6a                                                                                                                                                                                                                                                                                |
| 7    |                                         | Hiển thị hộp thoại xác nhận: <br>"Bạn có chắc muốn xóa điểm tham quan '[attraction_name]' khỏi ngày [day] của lịch trình?" <br>- Nút "Xác nhận" <br>- Nút "Hủy"                                                                                                                                                                                 |
| 8    | Click "Xác nhận"                        |                                                                                                                                                                                                                                                                                                                                                 |
| 9    |                                         | Lấy thông tin day và order_in_day của điểm cần xóa                                                                                                                                                                                                                                                                                              |
| 10   |                                         | Bắt đầu transaction: <br>1. Xóa điểm tham quan: <br>`DELETE FROM Route_Attraction WHERE id = :route_attraction_id` <br>2. Điều chỉnh thứ tự các điểm còn lại trong cùng ngày: <br>`UPDATE Route_Attraction` <br>`SET order_in_day = order_in_day - 1` <br>`WHERE route_id = :route_id` <br>`AND day = :day` <br>`AND order_in_day > :old_order` |
| 11   |                                         | Commit transaction                                                                                                                                                                                                                                                                                                                              |
| 12   |                                         | Hiển thị thông báo thành công: "Đã xóa điểm tham quan khỏi lịch trình"                                                                                                                                                                                                                                                                          |
| 13   |                                         | Tải lại trang lịch trình với dữ liệu mới                                                                                                                                                                                                                                                                                                        |
| 14   | Xem lịch trình đã cập nhật              |                                                                                                                                                                                                                                                                                                                                                 |

### Luồng sự kiện phụ

**3a. Tuyến có trạng thái CLOSED:**

- 3a.1. Hệ thống hiển thị thông báo: "Không thể chỉnh sửa lịch trình của tuyến đã đóng"
- 3a.2. Kết thúc use case

**4a. Route_Attraction không tồn tại:**

- 4a.1. Hệ thống hiển thị thông báo: "Không tìm thấy thông tin điểm tham quan này"
- 4a.2. Tải lại trang lịch trình
- 4a.3. Kết thúc use case

**6a. Đây là điểm tham quan cuối cùng:**

- 6a.1. Hệ thống hiển thị thông báo: "Không thể xóa điểm tham quan cuối cùng. Tuyến phải có ít nhất 1 điểm tham quan"
- 6a.2. Kết thúc use case

**8a. Admin click "Hủy":**

- 8a.1. Đóng hộp thoại xác nhận
- 8a.2. Quay lại trang lịch trình, không thực hiện thay đổi
- 8a.3. Kết thúc use case

**10a. Lỗi khi xóa hoặc cập nhật database:**

- 10a.1. Hệ thống rollback transaction
- 10a.2. Hiển thị thông báo: "Không thể xóa điểm tham quan. Vui lòng thử lại"
- 10a.3. Ghi log lỗi
- 10a.4. Kết thúc use case

---

## Mối quan hệ giữa các Use Case

### Include

- Không có

### Extend

- UC_SCHEDULE_02 (Add Itinerary) extends UC_SCHEDULE_01 (View Route Schedule)
- UC_SCHEDULE_03 (Edit Itinerary) extends UC_SCHEDULE_01 (View Route Schedule)
- UC_SCHEDULE_04 (Delete Itinerary) extends UC_SCHEDULE_01 (View Route Schedule)

### Generalization

- Không có

## Quy tắc nghiệp vụ (Business Rules)

### BR_SCHEDULE_01: Ràng buộc về ngày

- Giá trị `day` phải nằm trong khoảng từ 1 đến `Route.duration_days`
- Mỗi ngày có thể có nhiều điểm tham quan

### BR_SCHEDULE_02: Ràng buộc về thứ tự

- `order_in_day` phải là số nguyên dương (> 0)
- Trong cùng một ngày, các điểm tham quan phải có thứ tự liên tục (1, 2, 3,...)
- Khi thêm/sửa/xóa, hệ thống tự động điều chỉnh thứ tự để không có khoảng trống

### BR_SCHEDULE_03: Ràng buộc về điểm tham quan

- Chỉ được thêm điểm tham quan có `status = ACTIVE`
- Một điểm tham quan có thể xuất hiện nhiều lần trong lịch trình (các ngày khác nhau hoặc cùng ngày)
- Mỗi lần xuất hiện phải có `activity_description` riêng

### BR_SCHEDULE_04: Ràng buộc về tuyến

- Chỉ Admin mới có quyền thêm/sửa/xóa lịch trình
- Staff chỉ được xem lịch trình
- Không được chỉnh sửa lịch trình của tuyến có `status = CLOSED`
- Tuyến phải có ít nhất 1 điểm tham quan (không xóa điểm cuối cùng)

### BR_SCHEDULE_05: Ràng buộc về mô tả hoạt động

- `activity_description` là bắt buộc và không được rỗng
- Mô tả nên bao gồm: thời gian dự kiến, hoạt động cụ thể, lưu ý đặc biệt

### BR_SCHEDULE_06: Tính toán tự động

- Khi thay đổi lịch trình, hệ thống không tự động cập nhật `Route.duration_days`
- Admin phải đảm bảo `duration_days` phù hợp với số ngày thực tế có điểm tham quan
- Hệ thống nên cảnh báo nếu có ngày không có điểm tham quan nào (ngày trống)

## Ràng buộc dữ liệu (Data Constraints)

### Route_Attraction Table

```sql
CREATE TABLE Route_Attraction (
    id INT PRIMARY KEY AUTO_INCREMENT,
    route_id INT NOT NULL,
    attraction_id INT NOT NULL,
    day INT NOT NULL CHECK (day > 0),
    order_in_day INT NOT NULL CHECK (order_in_day > 0),
    activity_description TEXT NOT NULL,
    FOREIGN KEY (route_id) REFERENCES Route(id) ON DELETE CASCADE,
    FOREIGN KEY (attraction_id) REFERENCES Attraction(id) ON DELETE RESTRICT,
    INDEX idx_route_day (route_id, day, order_in_day)
);
```

### Validation Rules

- `day`: 1 ≤ day ≤ Route.duration_days
- `order_in_day`: > 0, integer
- `activity_description`: NOT NULL, length ≥ 10 characters
- Unique constraint: Không áp dụng (cho phép cùng attraction xuất hiện nhiều lần)

## Ghi chú bổ sung

### Trải nghiệm người dùng (UX Notes)

1. **Drag-and-drop**: Có thể cải tiến UX bằng cách cho phép Admin kéo thả điểm tham quan để thay đổi thứ tự
2. **Bulk actions**: Hỗ trợ thêm nhiều điểm cùng lúc, copy lịch trình từ tuyến khác
3. **Validation real-time**: Kiểm tra ngày và thứ tự ngay khi nhập, không chờ đến khi submit
4. **Preview**: Hiển thị preview lịch trình sau khi thay đổi trước khi lưu

### Tối ưu hóa hiệu năng

1. **Indexing**: Tạo index trên (route_id, day, order_in_day) để tăng tốc truy vấn
2. **Caching**: Cache lịch trình của các tuyến phổ biến
3. **Batch update**: Khi điều chỉnh thứ tự nhiều điểm, sử dụng batch update thay vì update từng bản ghi

### Mở rộng tương lai

1. **Template**: Cho phép tạo template lịch trình và áp dụng cho nhiều tuyến
2. **Version control**: Lưu lịch sử thay đổi lịch trình để có thể rollback
3. **AI suggestion**: Gợi ý điểm tham quan dựa trên thời gian, địa điểm, sở thích khách hàng
4. **Multi-language**: Hỗ trợ mô tả hoạt động bằng nhiều ngôn ngữ
