# ĐẶC TẢ CÁC USE CASE - ADJUST CART

## UC_CART_01: Add Trip to Cart (Thêm chuyến vào giỏ hàng)

### Mô tả ngắn gọn

Khách hàng thêm chuyến đi vào giỏ hàng để đặt sau hoặc đặt nhiều chuyến cùng lúc.

### Luồng sự kiện

#### Luồng chính
1. Khách hàng xem chi tiết chuyến đi.
2. Khách hàng chọn "Thêm vào giỏ hàng".
3. Hệ thống kiểm tra đăng nhập và hiển thị form nhập số lượng.
4. Khách hàng nhập số lượng chỗ và xác nhận.
5. Hệ thống kiểm tra số lượng hợp lệ và số chỗ còn trống.
6. Hệ thống thêm hoặc cập nhật Cart_Item.
7. Hệ thống hiển thị thông báo thành công.

#### Luồng phụ
- Chưa đăng nhập → Chuyển hướng đến trang đăng nhập.
- Số lượng không hợp lệ → Yêu cầu nhập lại.
- Không đủ chỗ trống → Hiển thị số chỗ khả dụng.
- Lỗi database → Hiển thị thông báo lỗi.

### Yêu cầu đặc biệt

Cập nhật số lượng item trong icon giỏ hàng realtime.

### Điều kiện tiên quyết

Khách hàng đã đăng nhập và chuyến đi có trạng thái SCHEDULED.

### Điều kiện hậu

Nếu thành công: Tạo/cập nhật Cart_Item và hiển thị thông báo.
Nếu thất bại: Giỏ hàng giữ nguyên.

---

## UC_CART_02: View and Filter Trips in Cart (Xem và lọc giỏ hàng)

### Mô tả ngắn gọn

Khách hàng xem danh sách chuyến đi trong giỏ hàng và lọc theo tiêu chí.

### Luồng sự kiện

#### Luồng chính
1. Khách hàng mở trang giỏ hàng.
2. Hệ thống truy vấn và hiển thị danh sách cart items.
3. Hệ thống hiển thị tổng số chuyến và tổng tiền.
4. (Tùy chọn) Khách hàng chọn lọc theo tiêu chí.
5. Hệ thống hiển thị kết quả lọc.

#### Luồng phụ
- Giỏ hàng trống → Hiển thị thông báo và link "Khám phá tour".
- Không có kết quả lọc → Cho phép xóa bộ lọc.

### Yêu cầu đặc biệt

Hiển thị số chỗ còn trống cho mỗi chuyến.

### Điều kiện tiên quyết

Khách hàng đã đăng nhập.

### Điều kiện hậu

Nếu thành công: Hiển thị danh sách cart items.
Nếu giỏ trống: Hiển thị thông báo giỏ trống.

---

## UC_CART_03: Edit Trip Details in Cart (Chỉnh sửa số lượng chỗ)

### Mô tả ngắn gọn

Khách hàng chỉnh sửa số lượng chỗ cho chuyến đi trong giỏ hàng.

### Luồng sự kiện

#### Luồng chính
1. Khách hàng mở giỏ hàng.
2. Khách hàng chọn "Chỉnh sửa" trên một chuyến.
3. Hệ thống kiểm tra chuyến hợp lệ và hiển thị form.
4. Khách hàng thay đổi số lượng chỗ.
5. Hệ thống tự động tính tổng tiền mới.
6. Khách hàng lưu thay đổi.
7. Hệ thống kiểm tra số lượng hợp lệ và số chỗ còn trống.
8. Hệ thống cập nhật Cart_Item và hiển thị thông báo.

#### Luồng phụ
- Chuyến không hợp lệ → Yêu cầu xóa khỏi giỏ.
- Số lượng không hợp lệ → Yêu cầu nhập lại.
- Không đủ chỗ trống → Hiển thị số chỗ tối đa.
- Lỗi database → Giữ nguyên số lượng cũ.

### Yêu cầu đặc biệt

Tự động tính và hiển thị tổng tiền khi thay đổi số lượng.

### Điều kiện tiên quyết

Khách hàng đã đăng nhập và chuyến đi có trạng thái SCHEDULED.

### Điều kiện hậu

Nếu thành công: Cập nhật số lượng Cart_Item.
Nếu thất bại: Số lượng giữ nguyên.

---

## UC_CART_04: Remove Trip from Cart (Xóa chuyến khỏi giỏ hàng)

### Mô tả ngắn gọn

Khách hàng xóa chuyến đi khỏi giỏ hàng.

### Luồng sự kiện

#### Luồng chính
1. Khách hàng mở giỏ hàng.
2. Khách hàng chọn "Xóa" trên một chuyến.
3. Hệ thống hiển thị hộp thoại xác nhận.
4. Khách hàng xác nhận xóa.
5. Hệ thống xóa Cart_Item khỏi database.
6. Hệ thống cập nhật tổng số item và tổng tiền.
7. Hệ thống hiển thị thông báo thành công.

#### Luồng phụ
- Khách hàng hủy xác nhận → Không thay đổi gì.
- Lỗi database → Giữ nguyên item trong giỏ.
- Giỏ trống sau khi xóa → Hiển thị thông báo giỏ trống.

### Yêu cầu đặc biệt

Cập nhật giao diện và tổng tiền realtime sau khi xóa.

### Điều kiện tiên quyết

Khách hàng đã đăng nhập và chuyến tồn tại trong giỏ hàng.

### Điều kiện hậu

Nếu thành công: Xóa Cart_Item khỏi database.
Nếu thất bại: Item giữ nguyên trong giỏ.

### Điểm mở rộng

Có thể mở rộng để hỗ trợ xóa nhiều items cùng lúc.
