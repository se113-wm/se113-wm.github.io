# ĐẶC TẢ CÁC USE CASE - MANAGE ATTRACTION

Tài liệu đặc tả các Use Case quản lý Điểm tham quan (Attraction) dùng cho vai trò Staff/Admin. Quy tắc: bỏ kiểm tra phân quyền trong luồng chính (được xử lý ở UI/ACL); chỉ nêu ở điều kiện tiên quyết.

---

## UC_ATTR_01: View and Filter Attractions (Xem và Lọc Điểm tham quan)

### Mô tả

Nhân viên xem danh sách điểm tham quan, tìm kiếm theo từ khóa, lọc theo danh mục, trạng thái và sắp xếp.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Dữ liệu danh mục (Category) đã tồn tại

### Điều kiện hậu

- Hiển thị danh sách điểm tham quan phù hợp tiêu chí, có phân trang/sắp xếp

### Luồng sự kiện chính

| Bước | Actor               | Hệ thống                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Vào trang Danh sách |                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 2    | Nhập tiêu chí lọc   |                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 3    |                     | Áp dụng tiêu chí: từ khóa (tìm trong a.name, a.location), category_id, status (ACTIVE/INACTIVE), sắp xếp (name asc/desc, category, updated desc)                                                                                                                                                                                                                                                                                               |
| 4    |                     | Truy vấn: <br>`SELECT a.*, c.name AS category_name` <br>`FROM Attraction a` <br>`JOIN Category c ON a.category_id = c.id` <br>`WHERE (:kw IS NULL OR (LOWER(a.name) LIKE LOWER(CONCAT('%', :kw, '%')) OR LOWER(a.location) LIKE LOWER(CONCAT('%', :kw, '%'))))` <br>`AND (:category_id IS NULL OR a.category_id = :category_id)` <br>`AND (:status IS NULL OR a.status = :status)` <br>`ORDER BY a.name ASC` <br>`LIMIT :limit OFFSET :offset` |
| 5    | Xem kết quả         | Hiển thị mỗi dòng: tên, danh mục, vị trí, trạng thái, ngày cập nhật; kèm các hành động: Xem chi tiết, Sửa, Đổi trạng thái, Xóa                                                                                                                                                                                                                                                                                                                 |

### Luồng sự kiện phụ

- 4a. Không có dữ liệu phù hợp: hiển thị thông báo "Không tìm thấy điểm tham quan" và gợi ý bỏ bớt tiêu chí
- 4b. category_id không tồn tại: bỏ tiêu chí này và ghi log cảnh báo

---

## UC_ATTR_02: Add Attraction (Thêm Điểm tham quan)

### Mô tả

Thêm mới một điểm tham quan, gán vào danh mục và trạng thái ban đầu.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Category đích tồn tại và ở trạng thái phù hợp (không yêu cầu ràng buộc trạng thái ở DB)

### Điều kiện hậu

- Tạo bản ghi mới trong Attraction với status mặc định ACTIVE (trừ khi người dùng chọn khác)

### Luồng sự kiện chính

| Bước | Actor        | Hệ thống                                                                                                                                                                                                        |
| ---- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Thêm"  |                                                                                                                                                                                                                 |
| 2    |              | Hiển thị form với trường: name, description, location, category_id, status (mặc định ACTIVE)                                                                                                                    |
| 3    | Nhập dữ liệu |                                                                                                                                                                                                                 |
| 4    |              | Kiểm tra hợp lệ: name/location không rỗng; độ dài hợp lệ; category_id tồn tại; status ∈ {ACTIVE, INACTIVE}                                                                                                      |
| 5    |              | Kiểm tra trùng logic (không bắt buộc DB): <br>`SELECT 1 FROM Attraction WHERE LOWER(name)=LOWER(:name) AND LOWER(location)=LOWER(:location) AND status <> 'DELETED' LIMIT 1`                                    |
| 6    | Click "Lưu"  |                                                                                                                                                                                                                 |
| 7    |              | Bắt đầu transaction: <br>`INSERT INTO Attraction (name, description, location, category_id, status) VALUES (:name, :description, :location, :category_id, COALESCE(:status, 'ACTIVE')) RETURNING id` <br>Commit |
| 8    |              | Thông báo thành công và điều hướng về danh sách/chi tiết                                                                                                                                                        |

### Luồng sự kiện phụ

- 4a. category_id không tồn tại: báo lỗi "Danh mục không hợp lệ"
- 5a. Phát hiện trùng: báo lỗi "Điểm tham quan đã tồn tại tại vị trí này"
- 7a. Lỗi DB/transaction: rollback và báo lỗi chung

### Ràng buộc nghiệp vụ/SQL gợi ý

- Có thể bổ sung chỉ số (index) trên (LOWER(name), LOWER(location)) để kiểm tra trùng nhanh

---

## UC_ATTR_03: Edit Attraction (Sửa Điểm tham quan)

### Mô tả

Chỉnh sửa thông tin điểm tham quan (tên, mô tả, vị trí, danh mục, trạng thái trừ DELETED).

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Điểm tham quan tồn tại và status <> DELETED

### Điều kiện hậu

- Cập nhật bản ghi Attraction theo dữ liệu hợp lệ

### Luồng sự kiện chính

| Bước | Actor            | Hệ thống                                                                                                                                                                                                                                              |
| ---- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Sửa"       |                                                                                                                                                                                                                                                       |
| 2    |                  | Truy vấn hiện trạng: <br>`SELECT a.*, c.name AS category_name FROM Attraction a JOIN Category c ON a.category_id = c.id WHERE a.id = :id`                                                                                                             |
| 3    |                  | Hiển thị form điền sẵn các trường: name, description, location, category_id, status (không cho chọn DELETED)                                                                                                                                          |
| 4    | Cập nhật dữ liệu |                                                                                                                                                                                                                                                       |
| 5    |                  | Kiểm tra hợp lệ tương tự UC_ATTR_02; kiểm tra trùng (name+location) loại trừ chính bản ghi hiện tại: <br>`SELECT 1 FROM Attraction WHERE LOWER(name)=LOWER(:name) AND LOWER(location)=LOWER(:location) AND id <> :id AND status <> 'DELETED' LIMIT 1` |
| 6    | Click "Lưu"      |                                                                                                                                                                                                                                                       |
| 7    |                  | `UPDATE Attraction SET name=:name, description=:desc, location=:location, category_id=:category_id, status=:status WHERE id=:id` <br>Thông báo thành công và quay lại danh sách/chi tiết                                                              |

### Luồng sự kiện phụ

- 2a. Không tìm thấy: thông báo "Không tồn tại" và quay về danh sách
- 5a. Trùng lặp: báo lỗi và yêu cầu đổi tên/vị trí
- 7a. Lỗi DB: báo lỗi chung, không thay đổi dữ liệu

---

## UC_ATTR_04: Delete Attraction (Xóa Điểm tham quan)

### Mô tả

Xóa mềm một điểm tham quan. Nếu còn được tham chiếu trong lịch trình tuyến (Route_Attraction) thì không cho xóa, gợi ý chuyển sang INACTIVE.

### Tác nhân chính

- Admin
- Staff (tùy chính sách, có thể hạn chế xóa)

### Điều kiện tiên quyết

- Điểm tham quan tồn tại và status <> DELETED

### Điều kiện hậu

- 1 trong 2 kết quả: <br> (a) Attraction.status = DELETED nếu không còn phụ thuộc <br> (b) Không xóa, hiển thị gợi ý đổi sang INACTIVE nếu có phụ thuộc

### Luồng sự kiện chính

| Bước | Actor      | Hệ thống                                                                                                                                       |
| ---- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Xóa" |                                                                                                                                                |
| 2    |            | Truy vấn phụ thuộc: <br>`SELECT COUNT(*) AS refs FROM Route_Attraction WHERE attraction_id = :id`                                              |
| 3    |            | Nếu refs > 0 → hiển thị cảnh báo: "Điểm tham quan đang được dùng trong lịch trình. Không thể xóa. Bạn có muốn đặt trạng thái INACTIVE?"        |
| 4    | Xác nhận   |                                                                                                                                                |
| 5    |            | Nhánh không có phụ thuộc (refs = 0) và người dùng xác nhận: <br>`UPDATE Attraction SET status='DELETED' WHERE id=:id` <br>Thông báo thành công |

### Luồng sự kiện phụ

- 3a. Có phụ thuộc và người dùng chọn đổi trạng thái: `UPDATE Attraction SET status='INACTIVE' WHERE id=:id` → thông báo đã vô hiệu hóa
- 4a. Người dùng hủy: không thay đổi dữ liệu
- 5a. Đã ở trạng thái DELETED trước đó: hiển thị thông báo phù hợp

### Ghi chú nghiệp vụ

- Không thực hiện xóa cứng để bảo toàn lịch sử; các màn hình công khai chỉ hiển thị Attraction.status = ACTIVE

---

## UC_ATTR_05: View Attraction Detail (Xem chi tiết Điểm tham quan)

### Mô tả

Xem chi tiết một điểm tham quan, kèm thông tin danh mục và mức độ được sử dụng trong các tuyến.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Điểm tham quan tồn tại (có thể xem cả INACTIVE/ACTIVE; DELETED chỉ hiển thị cho quản trị nếu cần)

### Điều kiện hậu

- Hiển thị đầy đủ thông tin điểm tham quan và thống kê tham chiếu

### Luồng sự kiện chính

| Bước | Actor             | Hệ thống                                                                                                                                  |
| ---- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Mở trang chi tiết |                                                                                                                                           |
| 2    |                   | Truy vấn chi tiết: <br>`SELECT a.*, c.name AS category_name FROM Attraction a JOIN Category c ON a.category_id = c.id WHERE a.id = :id`   |
| 3    |                   | Truy vấn thống kê sử dụng: <br>`SELECT COUNT(DISTINCT ra.route_id) AS total_routes FROM Route_Attraction ra WHERE ra.attraction_id = :id` |
| 4    |                   | Hiển thị: tên, danh mục, vị trí, mô tả, trạng thái, ngày tạo/cập nhật; kèm số tuyến đang sử dụng (total_routes)                           |

### Luồng sự kiện phụ

- 2a. Không tìm thấy: hiển thị "Điểm tham quan không tồn tại" và quay lại danh sách

---

## Phụ lục: Quy tắc và gợi ý triển khai

- Danh sách công khai (customer) chỉ lấy Attraction.status = 'ACTIVE'; trang quản trị có thể xem cả INACTIVE/DELETED tùy quyền
- Nên thêm index cho các cột tìm kiếm: LOWER(name), LOWER(location), category_id, status
- Tránh xóa cứng để không phá vỡ lịch sử trong Route_Attraction/Trip
