# ĐẶC TẢ CÁC USE CASE - MANAGE TRIPS

Tài liệu này mô tả các use case quản lý Chuyến đi (Trip) cho Staff/Admin.

---

## UC_TRIP_06: Add New Booking for Trip (Tạo đặt chỗ cho Chuyến đi)

### Mô tả

Nhân viên tạo đặt chỗ cho khách hàng trực tiếp từ trang chi tiết chuyến đi.

### Tác nhân chính

- Staff
- Admin (tùy chính sách)

### Điều kiện tiên quyết

- Trip tồn tại và đang ở trạng thái SCHEDULED
- Chuyến chưa khởi hành (departure_date ≥ today + 2 ngày theo chính sách)
- Khách hàng (User.role = CUSTOMER) tồn tại và không bị khóa (is_lock = false)

### Điều kiện hậu

- Tạo bản ghi Tour_Booking, Tour_Booking_Detail và Invoice tương ứng; cập nhật Trip.booked_seats

### Luồng sự kiện chính

| Bước | Actor                                 | Hệ thống                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Tại chi tiết Trip, chọn "Add Booking" |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 2    |                                       | Hiển thị form: chọn khách hàng (tìm theo email/phone hoặc nhập user_id), nhập no_adults, no_children, (tùy chọn) danh sách hành khách, phương thức thanh toán (nếu thu tiền ngay)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 3    | Nhập dữ liệu và click "Lưu"           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 4    |                                       | Kiểm tra hợp lệ: Trip.status = 'SCHEDULED'; departure_date hợp lệ; user_id tồn tại và hợp lệ; seats_requested = no_adults + no_children > 0; seats_available = total_seats - booked_seats ≥ seats_requested; (nếu cung cấp) số hành khách khớp với tổng số ghế                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 5    |                                       | Bắt đầu transaction: <br>1) Khóa hàng Trip để kiểm tra chỗ chống race condition: <br>`SELECT total_seats, booked_seats, price, departure_date, status FROM Trip WHERE id=:trip_id FOR UPDATE` <br>2) Tính total_price theo chính sách (ví dụ: `price * seats_requested`) <br>3) Tạo booking: <br>`INSERT INTO Tour_Booking (trip_id, user_id, seats_booked, total_price, status) VALUES (:trip_id, :user_id, :seats, :total_price, 'PENDING') RETURNING id` <br>4) Tạo chi tiết: <br>`INSERT INTO Tour_Booking_Detail (booking_id, no_adults, no_children) VALUES (:booking_id, :adults, :children)` <br>5) (Tùy chọn) chèn Booking_Traveler cho từng hành khách <br>6) Cập nhật số chỗ: <br>`UPDATE Trip SET booked_seats = booked_seats + :seats WHERE id=:trip_id` <br>7) Tạo hóa đơn: <br>`INSERT INTO Invoice (booking_id, total_amount, payment_status, payment_method) VALUES (:booking_id, :total_price, 'UNPAID', :payment_method)` <br>8) (Tùy chọn) nếu thu tiền ngay và thành công: <br>`UPDATE Invoice SET payment_status='PAID', payment_method=:payment_method WHERE booking_id=:booking_id` <br>Commit |
| 6    |                                       | Hiển thị thông báo thành công và điều hướng đến chi tiết booking/chi tiết trip                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 7    | Xem kết quả                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

### Luồng sự kiện phụ

- 4a. Trip không ở trạng thái SCHEDULED hoặc đã/ sắp khởi hành: báo lỗi và dừng
- 4b. Khách hàng không tồn tại/đang bị khóa: báo lỗi
- 4c. Không đủ chỗ: seats_available < seats_requested → báo lỗi "Không đủ chỗ"
- 5a. Lỗi DB/transaction: rollback và báo lỗi chung
- 5b. Thu tiền ngay thất bại/ngoài hệ thống: giữ Invoice ở trạng thái UNPAID và hiển thị hướng dẫn thanh toán sau

### Ràng buộc nghiệp vụ/SQL gợi ý

- Nên dùng `FOR UPDATE` khi đọc Trip để tránh overbooking trong môi trường đồng thời
- Trạng thái khởi tạo của booking là 'PENDING'; có thể chuyển 'CONFIRMED' khi nhận đủ điều kiện thanh toán theo chính sách (ngoài phạm vi UC này)
- Có thể cho phép nhập danh sách hành khách sau (trước hạn chốt), nhưng tổng số entries cần khớp seats_booked trước khi khóa sổ
- Tạo chỉ số hỗ trợ tìm kiếm khách hàng theo email/phone nếu workflow ưu tiên tìm nhanh

---

## UC_TRIP_01: View and Filter Trips (Xem và Lọc Chuyến đi)

### Mô tả

Nhân viên/Admin xem danh sách các chuyến đi, lọc theo tuyến, ngày khởi hành, trạng thái, và sắp xếp.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Dữ liệu tuyến (Route) đã tồn tại

### Điều kiện hậu

- Hiển thị danh sách chuyến đi phù hợp tiêu chí, có phân trang/sắp xếp

### Luồng sự kiện chính

| Bước | Actor               | Hệ thống                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Vào trang Danh sách |                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 2    | Nhập tiêu chí lọc   |                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 3    |                     | Áp dụng tiêu chí: route_id, khoảng ngày khởi hành (departure_date từ/đến), status ∈ {SCHEDULED, ONGOING, FINISHED, CANCELED}, sắp xếp (departure_date asc/desc, status, mới cập nhật)                                                                                                                                                                                                                                 |
| 4    |                     | Truy vấn: <br>`SELECT t.*, r.name AS route_name` <br>`FROM Trip t JOIN Route r ON t.route_id = r.id` <br>`WHERE (:route_id IS NULL OR t.route_id = :route_id)` <br>`AND (:from_date IS NULL OR t.departure_date >= :from_date)` <br>`AND (:to_date IS NULL OR t.departure_date <= :to_date)` <br>`AND (:status IS NULL OR t.status = :status)` <br>`ORDER BY t.departure_date DESC` <br>`LIMIT :limit OFFSET :offset` |
| 5    | Xem kết quả         | Hiển thị mỗi dòng: route_name, departure_date, return_date, price, total_seats, booked_seats, pick_up_time, pick_up_location, status; kèm hành động: Xem chi tiết, Sửa, Đổi trạng thái, Xóa/Hủy                                                                                                                                                                                                                       |

### Luồng sự kiện phụ

- 4a. Không có dữ liệu phù hợp: hiển thị "Không tìm thấy chuyến đi" và gợi ý thay đổi tiêu chí
- 4b. route_id không tồn tại: bỏ tiêu chí này và ghi log cảnh báo

---

## UC_TRIP_02: Add Trip (Thêm Chuyến đi)

### Mô tả

Thêm mới một chuyến đi cho một tuyến.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Staff hoặc Admin
- Tuyến (Route) mục tiêu tồn tại và có thể lập lịch (không bắt buộc ràng buộc trạng thái ở DB)

### Điều kiện hậu

- Tạo bản ghi mới trong Trip với status mặc định SCHEDULED (trừ khi chọn khác)

### Luồng sự kiện chính

| Bước | Actor        | Hệ thống                                                                                                                                                                                                                                                                           |
| ---- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Thêm"  |                                                                                                                                                                                                                                                                                    |
| 2    |              | Hiển thị form: route_id, departure_date, return_date, price, total_seats, pick_up_time, pick_up_location, status (mặc định SCHEDULED)                                                                                                                                              |
| 3    | Nhập dữ liệu |                                                                                                                                                                                                                                                                                    |
| 4    |              | Kiểm tra hợp lệ: route_id tồn tại; departure_date < return_date; price > 0; total_seats > 0; status ∈ {SCHEDULED, ONGOING, FINISHED, CANCELED}                                                                                                                                     |
| 5    |              | Kiểm tra trùng logic (không bắt buộc DB): <br>`SELECT 1 FROM Trip WHERE route_id=:route_id AND departure_date=:dep AND return_date=:ret LIMIT 1`                                                                                                                                   |
| 6    | Click "Lưu"  |                                                                                                                                                                                                                                                                                    |
| 7    |              | Bắt đầu transaction: <br>`INSERT INTO Trip (route_id, departure_date, return_date, price, total_seats, booked_seats, pick_up_time, pick_up_location, status)` <br>`VALUES (:route_id, :dep, :ret, :price, :seats, 0, :pu_time, :pu_loc, COALESCE(:status,'SCHEDULED'))` <br>Commit |
| 8    |              | Thông báo thành công và điều hướng về danh sách/chi tiết                                                                                                                                                                                                                           |

### Luồng sự kiện phụ

- 4a. route_id không tồn tại: báo lỗi "Tuyến không hợp lệ"
- 4b. departure_date >= return_date: báo lỗi "Ngày về phải sau ngày đi"
- 5a. Phát hiện trùng: báo lỗi "Chuyến đi trùng lịch cho tuyến"
- 7a. Lỗi DB/transaction: rollback và báo lỗi chung

### Ràng buộc nghiệp vụ/SQL gợi ý

- Xem xét unique index theo (route_id, departure_date, return_date)
- Có thể kiểm tra xung đột lịch với các Trip khác cùng tuyến nếu cần nâng cao

---

## UC_TRIP_03: Edit Trip (Sửa Chuyến đi)

### Mô tả

Chỉnh sửa thông tin chuyến đi. Một số trường bị hạn chế khi đã có đặt chỗ.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Trip tồn tại và không ở trạng thái FINISHED

### Điều kiện hậu

- Cập nhật bản ghi Trip theo dữ liệu hợp lệ và ràng buộc hiện hữu

### Luồng sự kiện chính

| Bước | Actor            | Hệ thống                                                                                                                                                                                                                                                                          |
| ---- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Sửa"       |                                                                                                                                                                                                                                                                                   |
| 2    |                  | Truy vấn hiện trạng: <br>`SELECT t.*, r.name AS route_name,` <br>`(SELECT COALESCE(SUM(tb.seats_booked),0) FROM Tour_Booking tb WHERE tb.trip_id=t.id AND tb.status IN ('PENDING','CONFIRMED')) AS seats_locked` <br>`FROM Trip t JOIN Route r ON t.route_id=r.id WHERE t.id=:id` |
| 3    |                  | Hiển thị form điền sẵn: route_id (không đổi), departure_date, return_date, price, total_seats, pick_up_time, pick_up_location, status                                                                                                                                             |
| 4    | Cập nhật dữ liệu |                                                                                                                                                                                                                                                                                   |
| 5    |                  | Kiểm tra hợp lệ: departure_date < return_date; price > 0; total_seats ≥ seats_locked; status ∈ {SCHEDULED, ONGOING, CANCELED, FINISHED} với quy tắc chuyển trạng thái hợp lệ                                                                                                      |
| 6    | Click "Lưu"      |                                                                                                                                                                                                                                                                                   |
| 7    |                  | Cập nhật: <br>`UPDATE Trip` <br>`SET departure_date=:dep, return_date=:ret, price=:price, total_seats=:seats, pick_up_time=:pu_time, pick_up_location=:pu_loc, status=:status` <br>`WHERE id=:id` <br>Thông báo thành công và quay lại danh sách/chi tiết                         |

### Luồng sự kiện phụ

- 2a. Không tìm thấy: thông báo "Không tồn tại" và quay về danh sách
- 5a. Giảm total_seats < seats_locked: báo lỗi "Số chỗ phải ≥ số chỗ đã giữ/đặt"
- 5b. Sửa ngày với chuyến đã bắt đầu (status ∈ {ONGOING, FINISHED}): chặn đổi ngày; báo lỗi phù hợp
- 7a. Lỗi DB: báo lỗi chung, không thay đổi dữ liệu

### Ràng buộc chuyển trạng thái gợi ý

- Cho phép: SCHEDULED → ONGOING (khi đến ngày khởi hành), SCHEDULED → CANCELED, ONGOING → FINISHED
- Không cho phép: FINISHED → bất kỳ; CANCELED → ONGOING/FINISHED; ONGOING → SCHEDULED

---

## UC_TRIP_04: Delete/Cancel Trip (Xóa/Hủy Chuyến đi)

### Mô tả

Xóa cứng một Trip khi chưa có đặt chỗ; nếu đã có đặt chỗ thì không xóa mà chuyển sang hủy (CANCELED).

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Trip tồn tại

### Điều kiện hậu

- 1 trong 2 kết quả: <br> (a) Đã xóa Trip nếu không có phụ thuộc <br> (b) Không xóa, chuyển trạng thái CANCELED nếu có đặt chỗ

### Luồng sự kiện chính

| Bước | Actor      | Hệ thống                                                                                                                    |
| ---- | ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn "Xóa" |                                                                                                                             |
| 2    |            | Truy vấn phụ thuộc: <br>`SELECT COUNT(*) AS refs FROM Tour_Booking WHERE trip_id=:id AND status IN ('PENDING','CONFIRMED')` |
| 3    |            | Nếu refs > 0 → hiển thị cảnh báo: "Chuyến đã có đặt chỗ. Không thể xóa. Bạn có muốn chuyển sang CANCELED?"                  |
| 4    | Xác nhận   |                                                                                                                             |
| 5    |            | Nhánh không có phụ thuộc (refs = 0) và người dùng xác nhận: <br>`DELETE FROM Trip WHERE id=:id` <br>Thông báo thành công    |

### Luồng sự kiện phụ

- 3a. Có phụ thuộc và người dùng chọn hủy: `UPDATE Trip SET status='CANCELED' WHERE id=:id` → thông báo đã hủy
- 4a. Người dùng hủy thao tác: không thay đổi dữ liệu
- 5a. Lỗi khi xóa/hủy: báo lỗi chung và ghi log

### Ghi chú nghiệp vụ

- Khi chuyển sang CANCELED, các tính năng đặt chỗ mới bị chặn; có thể phát sinh quy trình hoàn tiền theo chính sách (ngoài phạm vi UC này)

---

## UC_TRIP_05: View Trip Detail (Xem chi tiết Chuyến đi)

### Mô tả

Xem chi tiết một chuyến đi kèm thông tin tuyến và thống kê đặt chỗ cơ bản.

### Tác nhân chính

- Staff
- Admin

### Điều kiện tiên quyết

- Trip tồn tại

### Điều kiện hậu

- Hiển thị đầy đủ thông tin chuyến đi và số liệu tổng hợp

### Luồng sự kiện chính

| Bước | Actor             | Hệ thống                                                                                                                                                                                                                                    |
| ---- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Mở trang chi tiết |                                                                                                                                                                                                                                             |
| 2    |                   | Truy vấn: <br>`SELECT t.*, r.name AS route_name FROM Trip t JOIN Route r ON t.route_id=r.id WHERE t.id=:id`                                                                                                                                 |
| 3    |                   | Nếu không tìm thấy: hiển thị "Không tồn tại" và điều hướng về danh sách                                                                                                                                                                     |
| 4    |                   | Truy vấn thống kê: <br>`SELECT COALESCE(SUM(tb.seats_booked),0) AS seats_booked,` <br>`SUM(CASE WHEN tb.status IN ('PENDING','CONFIRMED') THEN tb.seats_booked ELSE 0 END) AS seats_active` <br>`FROM Tour_Booking tb WHERE tb.trip_id=:id` |
| 5    |                   | Hiển thị chi tiết Trip: thông tin cơ bản, route_name, seats_active/seats_booked, số chỗ còn trống = total_seats - booked_seats                                                                                                              |

### Luồng sự kiện phụ

- 4a. Lỗi truy vấn: hiển thị thông báo chung và ghi log

### Ràng buộc nghiệp vụ/SQL gợi ý

- Tạo index trên Trip(route_id, departure_date) để lọc nhanh
- Có thể thêm computed-field hoặc view cho seats_available nếu cần

---
