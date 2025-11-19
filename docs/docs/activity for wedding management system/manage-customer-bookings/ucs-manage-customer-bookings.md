# Use Case Specifications - Quản lý Đặt tiệc (Khách hàng) / Customer Booking Management

## Nhóm chức năng: Nghiệp vụ Đặt tiệc - Khách hàng / Customer Booking Operations

---

## UC 40: Tra cứu lịch sảnh trống / Check Hall Availability

### Mô tả ngắn gọn / Brief Description

Khách hàng tra cứu các sảnh còn trống theo ngày, ca và loại sảnh để lựa chọn đặt tiệc cưới.

Customer checks available halls by date, shift, and hall type to select for wedding reservation.

### Tác nhân / Actors

- **Khách hàng** / Customer (Primary)

### Tiền điều kiện / Preconditions

1. Khách hàng đã đăng nhập vào hệ thống
2. Hệ thống có dữ liệu sảnh, ca và phiếu đặt tiệc

### Hậu điều kiện / Postconditions

**Thành công:**

- Hệ thống hiển thị danh sách các sảnh còn trống theo điều kiện lọc
- Khách hàng có thể xem thông tin chi tiết sảnh (sức chứa, loại sảnh, đơn giá)

**Thất bại:**

- Không có sảnh nào khả dụng với điều kiện đã chọn
- Hiển thị thông báo và gợi ý chọn ngày/ca khác

### Luồng sự kiện chính / Main Flow

1. Khách hàng chọn chức năng "Tra cứu lịch sảnh"
2. Hệ thống hiển thị form tra cứu với các trường:
   - Ngày đại tiệc (bắt buộc)
   - Ca tổ chức (tùy chọn)
   - Loại sảnh (tùy chọn)
3. Khách hàng nhập ngày đại tiệc
4. Hệ thống kiểm tra ngày hợp lệ (phải là ngày trong tương lai)
5. Khách hàng có thể chọn thêm ca và loại sảnh (nếu muốn)
6. Khách hàng nhấn nút "Tra cứu"
7. Hệ thống truy vấn cơ sở dữ liệu:
   - Lấy danh sách sảnh theo loại sảnh (nếu có)
   - Kiểm tra các sảnh đã được đặt trong ngày và ca đó (từ PHIEUDATTIEC)
   - Loại trừ các sảnh đã có phiếu đặt được duyệt
8. Hệ thống hiển thị kết quả gồm:
   - Tên sảnh
   - Loại sảnh
   - Sức chứa (số lượng bàn tối đa)
   - Đơn giá bàn tối thiểu
   - Ghi chú
9. Khách hàng xem danh sách và có thể chọn sảnh để đặt tiệc

### Luồng thay thế / Alternative Flows

**4a. Ngày đại tiệc không hợp lệ**

- 4a1. Hệ thống kiểm tra ngày đã nhập
- 4a2. Nếu ngày trong quá khứ hoặc không hợp lệ, hiển thị thông báo lỗi
- 4a3. Yêu cầu khách hàng nhập lại ngày
- 4a4. Quay lại bước 3

**8a. Không có sảnh nào khả dụng**

- 8a1. Hệ thống không tìm thấy sảnh trống
- 8a2. Hiển thị thông báo "Không có sảnh trống cho ngày và ca đã chọn"
- 8a3. Gợi ý khách hàng:
  - Chọn ca khác trong cùng ngày
  - Chọn ngày khác gần đó
  - Liên hệ nhân viên để tư vấn
- 8a4. Use case kết thúc

**8b. Lỗi kết nối cơ sở dữ liệu**

- 8b1. Hệ thống không thể truy vấn dữ liệu
- 8b2. Hiển thị thông báo lỗi "Không thể tra cứu lịch sảnh, vui lòng thử lại sau"
- 8b3. Use case kết thúc

### Luồng ngoại lệ / Exception Flows

**E1. Khách hàng hủy thao tác**

- E1.1. Khách hàng nhấn nút "Hủy" hoặc đóng form
- E1.2. Hệ thống hủy thao tác tra cứu
- E1.3. Use case kết thúc

### Yêu cầu đặc biệt / Special Requirements

- Thời gian phản hồi tra cứu: < 3 giây
- Hỗ trợ chọn ngày từ lịch (date picker)
- Hiển thị trực quan danh sách sảnh (có thể kèm hình ảnh)

### Các yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Truy vấn nhanh với dữ liệu lớn (sử dụng index)
- **Usability**: Giao diện thân thiện, dễ sử dụng
- **Availability**: Chức năng tra cứu luôn khả dụng 24/7

---

## UC 41: Đặt tiệc cưới mới (Tạo phiếu đặt) / Submit Wedding Reservation

### Mô tả ngắn gọn / Brief Description

Khách hàng tạo phiếu đặt tiệc cưới mới với thông tin cơ bản, chọn sảnh, ca, thực đơn và dịch vụ.

Customer creates a new wedding reservation with basic information, hall selection, shift, menu, and services.

### Tác nhân / Actors

- **Khách hàng** / Customer (Primary)

### Tiền điều kiện / Preconditions

1. Khách hàng đã đăng nhập vào hệ thống
2. Khách hàng đã tra cứu và chọn sảnh còn trống
3. Hệ thống có dữ liệu món ăn và dịch vụ

### Hậu điều kiện / Postconditions

**Thành công:**

- Tạo mới bản ghi PHIEUDATTIEC với trạng thái "Chờ duyệt"
- Tạo các bản ghi THUCDON (thực đơn món ăn)
- Tạo các bản ghi CHITIETDV (chi tiết dịch vụ)
- Tính toán và lưu các giá trị: TongTienBan, TongTienDV, TienDatCoc, TongTienHoaDon, TienConLai
- Gửi email xác nhận đặt tiệc cho khách hàng
- Hiển thị thông báo thành công và mã phiếu đặt

**Thất bại:**

- Không tạo phiếu đặt
- Hiển thị thông báo lỗi cụ thể

### Luồng sự kiện chính / Main Flow

1. Khách hàng chọn chức năng "Đặt tiệc cưới"
2. Hệ thống hiển thị form đặt tiệc gồm các phần:

   **A. Thông tin cơ bản:**

   - Tên chú rể (bắt buộc)
   - Tên cô dâu (bắt buộc)
   - Số điện thoại (bắt buộc)
   - Ngày đặt tiệc (tự động = ngày hiện tại)

   **B. Thông tin đại tiệc:**

   - Ngày đại tiệc (bắt buộc)
   - Ca tổ chức (bắt buộc)
   - Sảnh (bắt buộc)
   - Số lượng bàn (bắt buộc)
   - Số bàn dự trù (tùy chọn)
   - Đơn giá bàn tiệc (tự động lấy từ loại sảnh)

   **C. Thực đơn:**

   - Danh sách món ăn có sẵn
   - Chọn món và số lượng

   **D. Dịch vụ:**

   - Danh sách dịch vụ có sẵn
   - Chọn dịch vụ và số lượng

3. Khách hàng nhập thông tin cơ bản (tên chú rể, cô dâu, số điện thoại)
4. Hệ thống kiểm tra định dạng số điện thoại (10 chữ số)
5. Khách hàng chọn ngày đại tiệc
6. Hệ thống kiểm tra ngày đại tiệc (phải là ngày trong tương lai)
7. Khách hàng chọn ca tổ chức
8. Hệ thống hiển thị danh sách sảnh còn trống cho ngày và ca đã chọn
9. Khách hàng chọn sảnh
10. Hệ thống tự động điền đơn giá bàn tiệc từ loại sảnh
11. Khách hàng nhập số lượng bàn
12. Hệ thống kiểm tra:
    - Số lượng bàn > 0
    - Số lượng bàn ≤ Sức chứa tối đa của sảnh
13. Khách hàng có thể nhập số bàn dự trù (mặc định = 0)
14. Hệ thống hiển thị danh sách món ăn
15. Khách hàng chọn món ăn và nhập số lượng cho mỗi món
16. Hệ thống hiển thị danh sách dịch vụ
17. Khách hàng chọn dịch vụ và nhập số lượng cho mỗi dịch vụ
18. Hệ thống tính toán tự động:
    - `TongTienBan = SoLuongBan × DonGiaBanTiec`
    - `TongTienDV = ∑(SoLuong × DonGia)` của các dịch vụ
    - `TongTienHoaDon = TongTienBan + TongTienDV`
    - `TienDatCoc = TongTienHoaDon × TiLeTienDatCocToiThieu` (từ THAMSO)
    - `TienConLai = TongTienHoaDon - TienDatCoc`
19. Hệ thống hiển thị tổng kết chi phí dự kiến
20. Khách hàng xem lại thông tin và nhấn nút "Xác nhận đặt tiệc"
21. Hệ thống kiểm tra lại tất cả dữ liệu
22. Hệ thống bắt đầu transaction:
    - Tạo bản ghi mới trong PHIEUDATTIEC
    - Tạo các bản ghi trong THUCDON
    - Tạo các bản ghi trong CHITIETDV
    - Commit transaction
23. Hệ thống gửi email xác nhận đến khách hàng
24. Hệ thống hiển thị thông báo thành công kèm mã phiếu đặt
25. Use case kết thúc thành công

### Luồng thay thế / Alternative Flows

**4a. Số điện thoại không hợp lệ**

- 4a1. Hệ thống kiểm tra định dạng số điện thoại
- 4a2. Nếu không đúng định dạng (không phải 10 chữ số), hiển thị thông báo lỗi
- 4a3. Yêu cầu khách hàng nhập lại
- 4a4. Quay lại bước 3

**6a. Ngày đại tiệc không hợp lệ**

- 6a1. Hệ thống kiểm tra ngày đại tiệc
- 6a2. Nếu ngày trong quá khứ hoặc không hợp lệ, hiển thị thông báo lỗi
- 6a3. Yêu cầu khách hàng chọn lại ngày
- 6a4. Quay lại bước 5

**8a. Không có sảnh trống**

- 8a1. Hệ thống không tìm thấy sảnh trống cho ngày và ca đã chọn
- 8a2. Hiển thị thông báo "Không có sảnh trống cho ngày và ca đã chọn"
- 8a3. Gợi ý chọn ca khác hoặc ngày khác
- 8a4. Quay lại bước 7

**12a. Số lượng bàn không hợp lệ**

- 12a1. Hệ thống kiểm tra số lượng bàn
- 12a2. Nếu số lượng bàn ≤ 0 hoặc vượt quá sức chứa, hiển thị thông báo lỗi
- 12a3. Hiển thị sức chứa tối đa của sảnh
- 12a4. Yêu cầu khách hàng nhập lại
- 12a5. Quay lại bước 11

**15a. Khách hàng không chọn món ăn**

- 15a1. Hệ thống kiểm tra danh sách món đã chọn
- 15a2. Nếu không có món nào, hiển thị cảnh báo
- 15a3. Yêu cầu chọn ít nhất một món ăn
- 15a4. Quay lại bước 15

**22a. Lỗi khi tạo phiếu đặt (Database error)**

- 22a1. Hệ thống gặp lỗi khi lưu dữ liệu
- 22a2. Rollback transaction
- 22a3. Hiển thị thông báo lỗi "Không thể tạo phiếu đặt, vui lòng thử lại"
- 22a4. Use case kết thúc thất bại

**22b. Sảnh đã được đặt bởi người khác**

- 22b1. Trong lúc khách hàng nhập thông tin, sảnh đã được người khác đặt
- 22b2. Hệ thống phát hiện conflict khi tạo phiếu đặt
- 22b3. Rollback transaction
- 22b4. Hiển thị thông báo "Sảnh đã được đặt, vui lòng chọn sảnh khác"
- 22b5. Quay lại bước 8

**23a. Lỗi gửi email**

- 23a1. Hệ thống không thể gửi email xác nhận
- 23a2. Ghi log lỗi
- 23a3. Tiếp tục hiển thị thông báo thành công (phiếu đặt vẫn được tạo)
- 23a4. Thông báo "Phiếu đặt đã được tạo, tuy nhiên không thể gửi email xác nhận"
- 23a5. Tiếp tục bước 24

### Luồng ngoại lệ / Exception Flows

**E1. Khách hàng hủy đặt tiệc**

- E1.1. Khách hàng nhấn nút "Hủy" tại bất kỳ bước nào
- E1.2. Hệ thống hiển thị xác nhận "Bạn có chắc muốn hủy đặt tiệc?"
- E1.3. Nếu khách hàng xác nhận:
  - E1.3.1. Hủy toàn bộ thông tin đã nhập
  - E1.3.2. Use case kết thúc
- E1.4. Nếu khách hàng chọn "Không", quay lại form đặt tiệc

**E2. Timeout session**

- E2.1. Khách hàng không thao tác trong thời gian dài
- E2.2. Session hết hạn
- E2.3. Hệ thống yêu cầu đăng nhập lại
- E2.4. Use case kết thúc

### Yêu cầu đặc biệt / Special Requirements

- Tự động tính toán chi phí khi khách hàng thay đổi số lượng bàn, món ăn, dịch vụ
- Hiển thị rõ ràng tiền đặt cọc tối thiểu và tiền còn lại
- Lưu tạm thông tin đã nhập (draft) để tránh mất dữ liệu
- Hỗ trợ chọn nhiều món ăn và dịch vụ với số lượng linh hoạt

### Các yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Tính toán chi phí real-time, phản hồi < 1 giây
- **Security**: Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu
- **Usability**: Form đặt tiệc trực quan, chia thành các bước rõ ràng
- **Reliability**: Xử lý conflict khi nhiều người đặt cùng sảnh

### Quy tắc nghiệp vụ / Business Rules

- **BR1**: Tiền đặt cọc tối thiểu = TongTienHoaDon × TiLeTienDatCocToiThieu (từ THAMSO, mặc định 15%)
- **BR2**: Số lượng bàn phải ≥ 1 và ≤ Sức chứa tối đa của sảnh
- **BR3**: Ngày đại tiệc phải là ngày trong tương lai
- **BR4**: Phiếu đặt mới luôn có trạng thái "Chờ duyệt"
- **BR5**: Một sảnh chỉ có thể đặt một tiệc trong một ca, một ngày

---

## UC 42: Xem chi tiết phiếu đặt của tôi / View My Booking Details

### Mô tả ngắn gọn / Brief Description

Khách hàng xem thông tin chi tiết của các phiếu đặt tiệc mà mình đã tạo.

Customer views detailed information of their own wedding reservations.

### Tác nhân / Actors

- **Khách hàng** / Customer (Primary)

### Tiền điều kiện / Preconditions

1. Khách hàng đã đăng nhập vào hệ thống
2. Khách hàng đã có ít nhất một phiếu đặt tiệc

### Hậu điều kiện / Postconditions

**Thành công:**

- Hiển thị danh sách phiếu đặt của khách hàng
- Hiển thị chi tiết phiếu đặt được chọn bao gồm:
  - Thông tin cơ bản (tên chú rể, cô dâu, số điện thoại)
  - Thông tin đại tiệc (ngày, ca, sảnh, số bàn)
  - Thực đơn món ăn
  - Dịch vụ đã chọn
  - Thông tin thanh toán (tổng tiền, tiền đặt cọc, tiền còn lại)
  - Trạng thái phiếu đặt

**Thất bại:**

- Không có phiếu đặt nào
- Hiển thị thông báo "Bạn chưa có phiếu đặt tiệc nào"

### Luồng sự kiện chính / Main Flow

1. Khách hàng chọn chức năng "Phiếu đặt của tôi"
2. Hệ thống truy vấn danh sách phiếu đặt của khách hàng (theo DienThoai hoặc MaNguoiDung)
3. Hệ thống hiển thị danh sách phiếu đặt dạng bảng với các cột:
   - Mã phiếu đặt
   - Ngày đặt tiệc
   - Ngày đại tiệc
   - Sảnh
   - Ca
   - Trạng thái (Chờ duyệt / Đã duyệt / Đã từ chối / Đã hủy)
   - Tổng tiền
4. Khách hàng chọn một phiếu đặt để xem chi tiết
5. Hệ thống truy vấn thông tin chi tiết từ:
   - PHIEUDATTIEC
   - THUCDON (danh sách món ăn)
   - CHITIETDV (danh sách dịch vụ)
   - SANH, CA (thông tin sảnh và ca)
6. Hệ thống hiển thị chi tiết phiếu đặt gồm các phần:

   **A. Thông tin cơ bản:**

   - Mã phiếu đặt
   - Tên chú rể
   - Tên cô dâu
   - Số điện thoại
   - Ngày đặt tiệc
   - Trạng thái

   **B. Thông tin đại tiệc:**

   - Ngày đại tiệc
   - Ca tổ chức (tên ca, giờ bắt đầu - kết thúc)
   - Sảnh (tên sảnh, loại sảnh)
   - Số lượng bàn
   - Số bàn dự trù
   - Đơn giá bàn tiệc

   **C. Thực đơn:**

   - Danh sách món ăn (tên món, số lượng, đơn giá, thành tiền)

   **D. Dịch vụ:**

   - Danh sách dịch vụ (tên dịch vụ, số lượng, đơn giá, thành tiền)

   **E. Thông tin thanh toán:**

   - Tổng tiền bàn
   - Tổng tiền dịch vụ
   - Tổng tiền hóa đơn
   - Tiền đặt cọc
   - Tiền đã thanh toán
   - Tiền còn lại
   - Chi phí phát sinh (nếu có)
   - Tiền phạt (nếu có)

   **F. Thông tin khác:**

   - Ngày thanh toán (nếu đã thanh toán)
   - Ghi chú

7. Khách hàng xem thông tin chi tiết
8. Use case kết thúc

### Luồng thay thế / Alternative Flows

**3a. Khách hàng chưa có phiếu đặt nào**

- 3a1. Hệ thống không tìm thấy phiếu đặt nào của khách hàng
- 3a2. Hiển thị thông báo "Bạn chưa có phiếu đặt tiệc nào"
- 3a3. Hiển thị nút "Đặt tiệc mới"
- 3a4. Use case kết thúc

**6a. Lỗi khi truy vấn chi tiết**

- 6a1. Hệ thống không thể truy vấn thông tin chi tiết
- 6a2. Hiển thị thông báo lỗi "Không thể tải thông tin phiếu đặt"
- 6a3. Use case kết thúc

### Luồng ngoại lệ / Exception Flows

**E1. Khách hàng quay lại danh sách**

- E1.1. Khách hàng nhấn nút "Quay lại" từ màn hình chi tiết
- E1.2. Hệ thống quay về danh sách phiếu đặt (bước 3)

### Yêu cầu đặc biệt / Special Requirements

- Phân biệt rõ ràng trạng thái phiếu đặt bằng màu sắc:
  - Chờ duyệt: Màu vàng
  - Đã duyệt: Màu xanh lá
  - Đã từ chối: Màu đỏ
  - Đã hủy: Màu xám
- Hiển thị lịch sử thay đổi trạng thái (nếu có)
- Hỗ trợ xuất phiếu đặt ra PDF

### Các yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Tải danh sách phiếu đặt < 2 giây
- **Usability**: Giao diện dễ đọc, thông tin được tổ chức rõ ràng
- **Security**: Khách hàng chỉ xem được phiếu đặt của chính mình

---

## UC 43: Chỉnh sửa phiếu đặt của tôi (trước duyệt) / Edit My Booking Request

### Mô tả ngắn gọn / Brief Description

Khách hàng chỉnh sửa thông tin phiếu đặt tiệc của mình khi phiếu đặt còn ở trạng thái "Chờ duyệt".

Customer edits their wedding reservation information when the booking is still in "Pending approval" status.

### Tác nhân / Actors

- **Khách hàng** / Customer (Primary)

### Tiền điều kiện / Preconditions

1. Khách hàng đã đăng nhập vào hệ thống
2. Khách hàng có phiếu đặt tiệc ở trạng thái "Chờ duyệt"

### Hậu điều kiện / Postconditions

**Thành công:**

- Cập nhật thông tin PHIEUDATTIEC
- Cập nhật thông tin THUCDON (nếu thay đổi món ăn)
- Cập nhật thông tin CHITIETDV (nếu thay đổi dịch vụ)
- Tính toán lại các giá trị: TongTienBan, TongTienDV, TienDatCoc, TongTienHoaDon, TienConLai
- Gửi email thông báo thay đổi cho khách hàng
- Hiển thị thông báo cập nhật thành công

**Thất bại:**

- Không cập nhật phiếu đặt
- Hiển thị thông báo lỗi cụ thể

### Luồng sự kiện chính / Main Flow

1. Khách hàng xem chi tiết phiếu đặt của mình (UC 42)
2. Hệ thống kiểm tra trạng thái phiếu đặt
3. Nếu phiếu đặt ở trạng thái "Chờ duyệt", hiển thị nút "Chỉnh sửa"
4. Khách hàng nhấn nút "Chỉnh sửa"
5. Hệ thống hiển thị form chỉnh sửa với thông tin hiện tại:
   - Thông tin cơ bản (tên chú rể, cô dâu, số điện thoại)
   - Ngày đại tiệc, ca, sảnh
   - Số lượng bàn, số bàn dự trù
   - Thực đơn món ăn
   - Dịch vụ
6. Khách hàng chỉnh sửa các thông tin cho phép:
   - Tên chú rể, cô dâu (có thể sửa)
   - Số điện thoại (có thể sửa)
   - Ngày đại tiệc (có thể sửa, nếu sửa cần kiểm tra sảnh trống)
   - Ca (có thể sửa, nếu sửa cần kiểm tra sảnh trống)
   - Sảnh (có thể sửa, phải chọn sảnh trống)
   - Số lượng bàn (có thể sửa, phải ≤ sức chứa sảnh)
   - Số bàn dự trù (có thể sửa)
   - Thực đơn (có thể thêm, sửa, xóa món)
   - Dịch vụ (có thể thêm, sửa, xóa dịch vụ)
7. Hệ thống validate dữ liệu khi khách hàng thay đổi:
   - Nếu đổi ngày/ca/sảnh: Kiểm tra sảnh còn trống
   - Nếu đổi số lượng bàn: Kiểm tra ≤ sức chứa sảnh
   - Nếu đổi thực đơn/dịch vụ: Kiểm tra món/dịch vụ còn tồn tại
8. Hệ thống tính toán lại chi phí tự động khi có thay đổi
9. Khách hàng xem lại thông tin đã chỉnh sửa
10. Khách hàng nhấn nút "Lưu thay đổi"
11. Hệ thống kiểm tra lại tất cả dữ liệu
12. Hệ thống bắt đầu transaction:
    - Cập nhật PHIEUDATTIEC
    - Xóa và tạo lại THUCDON (nếu có thay đổi)
    - Xóa và tạo lại CHITIETDV (nếu có thay đổi)
    - Commit transaction
13. Hệ thống gửi email thông báo thay đổi cho khách hàng
14. Hệ thống hiển thị thông báo "Cập nhật phiếu đặt thành công"
15. Use case kết thúc thành công

### Luồng thay thế / Alternative Flows

**3a. Phiếu đặt không ở trạng thái "Chờ duyệt"**

- 3a1. Hệ thống kiểm tra trạng thái phiếu đặt
- 3a2. Nếu phiếu đặt đã được duyệt, từ chối hoặc hủy, không hiển thị nút "Chỉnh sửa"
- 3a3. Hiển thị thông báo "Phiếu đặt này không thể chỉnh sửa"
- 3a4. Use case kết thúc

**7a. Ngày/Ca/Sảnh mới không khả dụng**

- 7a1. Khách hàng thay đổi ngày đại tiệc hoặc ca hoặc sảnh
- 7a2. Hệ thống kiểm tra sảnh còn trống
- 7a3. Nếu sảnh đã được đặt, hiển thị thông báo lỗi
- 7a4. Gợi ý chọn sảnh/ca/ngày khác
- 7a5. Quay lại bước 6

**7b. Số lượng bàn vượt quá sức chứa**

- 7b1. Khách hàng thay đổi số lượng bàn
- 7b2. Hệ thống kiểm tra số lượng bàn ≤ sức chứa sảnh
- 7b3. Nếu vượt quá, hiển thị thông báo lỗi
- 7b4. Hiển thị sức chứa tối đa
- 7b5. Quay lại bước 6

**12a. Lỗi khi cập nhật phiếu đặt**

- 12a1. Hệ thống gặp lỗi khi lưu dữ liệu
- 12a2. Rollback transaction
- 12a3. Hiển thị thông báo lỗi "Không thể cập nhật phiếu đặt, vui lòng thử lại"
- 12a4. Use case kết thúc thất bại

**12b. Sảnh đã được đặt bởi người khác (trong lúc chỉnh sửa)**

- 12b1. Trong lúc khách hàng chỉnh sửa, sảnh mới đã được người khác đặt
- 12b2. Hệ thống phát hiện conflict khi cập nhật
- 12b3. Rollback transaction
- 12b4. Hiển thị thông báo "Sảnh đã được đặt, vui lòng chọn sảnh khác"
- 12b5. Quay lại bước 6

**13a. Lỗi gửi email**

- 13a1. Hệ thống không thể gửi email thông báo
- 13a2. Ghi log lỗi
- 13a3. Tiếp tục hiển thị thông báo thành công (phiếu đặt vẫn được cập nhật)
- 13a4. Tiếp tục bước 14

### Luồng ngoại lệ / Exception Flows

**E1. Khách hàng hủy chỉnh sửa**

- E1.1. Khách hàng nhấn nút "Hủy" tại bất kỳ bước nào
- E1.2. Hệ thống hiển thị xác nhận "Bạn có chắc muốn hủy thay đổi?"
- E1.3. Nếu khách hàng xác nhận:
  - E1.3.1. Hủy toàn bộ thông tin đã chỉnh sửa
  - E1.3.2. Quay về màn hình chi tiết phiếu đặt
  - E1.3.3. Use case kết thúc
- E1.4. Nếu khách hàng chọn "Không", quay lại form chỉnh sửa

**E2. Phiếu đặt bị xóa/hủy trong lúc chỉnh sửa**

- E2.1. Phiếu đặt bị admin/staff xóa hoặc khách hàng hủy từ tab/thiết bị khác
- E2.2. Hệ thống phát hiện phiếu đặt không còn tồn tại hoặc đã hủy
- E2.3. Hiển thị thông báo "Phiếu đặt không còn tồn tại hoặc đã bị hủy"
- E2.4. Use case kết thúc

### Yêu cầu đặc biệt / Special Requirements

- Hiển thị rõ ràng các thông tin đã thay đổi (highlight)
- Tự động tính toán lại chi phí khi thay đổi số lượng bàn, món ăn, dịch vụ
- Lưu tạm thông tin đã chỉnh sửa để tránh mất dữ liệu
- Xác nhận trước khi lưu nếu có thay đổi lớn (đổi sảnh, đổi ngày)

### Các yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Tính toán chi phí real-time, phản hồi < 1 giây
- **Security**: Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu
- **Usability**: Form chỉnh sửa trực quan, dễ sử dụng
- **Reliability**: Xử lý conflict khi nhiều người đặt cùng sảnh

### Quy tắc nghiệp vụ / Business Rules

- **BR1**: Chỉ cho phép chỉnh sửa phiếu đặt ở trạng thái "Chờ duyệt"
- **BR2**: Khi thay đổi ngày/ca/sảnh, phải kiểm tra sảnh còn trống
- **BR3**: Khi thay đổi thông tin, tính toán lại toàn bộ chi phí
- **BR4**: Tự động cập nhật TienDatCoc và TienConLai khi thay đổi tổng tiền

---

## UC 44: Hủy phiếu đặt của tôi / Cancel My Booking

### Mô tả ngắn gọn / Brief Description

Khách hàng hủy phiếu đặt tiệc của mình.

Customer cancels their wedding reservation.

### Tác nhân / Actors

- **Khách hàng** / Customer (Primary)

### Tiền điều kiện / Preconditions

1. Khách hàng đã đăng nhập vào hệ thống
2. Khách hàng có phiếu đặt tiệc ở trạng thái "Chờ duyệt" hoặc "Đã duyệt"

### Hậu điều kiện / Postconditions

**Thành công:**

- Cập nhật trạng thái PHIEUDATTIEC thành "Đã hủy"
- Nếu phiếu đặt đã duyệt, tính tiền phạt (nếu bật tính năng kiểm tra phạt trong THAMSO)
- Cập nhật thông tin hủy (ngày hủy, lý do hủy)
- Gửi email xác nhận hủy phiếu đặt cho khách hàng
- Hiển thị thông báo hủy thành công

**Thất bại:**

- Không hủy phiếu đặt
- Hiển thị thông báo lỗi cụ thể

### Luồng sự kiện chính / Main Flow

1. Khách hàng xem chi tiết phiếu đặt của mình (UC 42)
2. Hệ thống kiểm tra trạng thái phiếu đặt
3. Nếu phiếu đặt ở trạng thái "Chờ duyệt" hoặc "Đã duyệt", hiển thị nút "Hủy phiếu đặt"
4. Khách hàng nhấn nút "Hủy phiếu đặt"
5. Hệ thống hiển thị hộp thoại xác nhận:
   - Thông báo: "Bạn có chắc chắn muốn hủy phiếu đặt này?"
   - Nếu phiếu đặt đã duyệt, hiển thị cảnh báo về tiền phạt (nếu có)
   - Trường nhập lý do hủy (tùy chọn)
6. Khách hàng xác nhận hủy
7. Khách hàng có thể nhập lý do hủy
8. Khách hàng nhấn nút "Xác nhận hủy"
9. Hệ thống kiểm tra tham số hệ thống:
   - Lấy giá trị `KiemTraPhat` từ THAMSO
   - Lấy giá trị `TiLePhat` từ THAMSO (nếu bật kiểm tra phạt)
10. Hệ thống tính toán tiền phạt (nếu cần):
    - Nếu phiếu đặt đã duyệt và `KiemTraPhat = 1`:
      - `TienPhat = TongTienHoaDon × TiLePhat`
      - `TienConLai = TienConLai + TienPhat`
    - Nếu phiếu đặt chờ duyệt hoặc `KiemTraPhat = 0`:
      - `TienPhat = 0`
11. Hệ thống bắt đầu transaction:
    - Cập nhật PHIEUDATTIEC:
      - Trạng thái = "Đã hủy"
      - NgayHuy = Ngày hiện tại
      - LyDoHuy = Lý do khách hàng nhập
      - TienPhat = Tiền phạt đã tính (nếu có)
      - TienConLai = Cập nhật nếu có tiền phạt
    - Commit transaction
12. Hệ thống gửi email xác nhận hủy phiếu đặt cho khách hàng
    - Thông tin phiếu đặt đã hủy
    - Tiền phạt (nếu có)
    - Số tiền sẽ được hoàn lại (nếu có)
13. Hệ thống hiển thị thông báo:
    - Nếu không có tiền phạt: "Hủy phiếu đặt thành công"
    - Nếu có tiền phạt: "Hủy phiếu đặt thành công. Tiền phạt: [số tiền]"
14. Use case kết thúc thành công

### Luồng thay thế / Alternative Flows

**3a. Phiếu đặt không thể hủy**

- 3a1. Hệ thống kiểm tra trạng thái phiếu đặt
- 3a2. Nếu phiếu đặt đã bị từ chối hoặc đã hủy trước đó, không hiển thị nút "Hủy"
- 3a3. Hiển thị thông báo "Phiếu đặt này không thể hủy"
- 3a4. Use case kết thúc

**3b. Phiếu đặt đã qua ngày đại tiệc**

- 3b1. Hệ thống kiểm tra ngày đại tiệc
- 3b2. Nếu ngày đại tiệc đã qua, không hiển thị nút "Hủy"
- 3b3. Hiển thị thông báo "Không thể hủy phiếu đặt đã qua ngày tổ chức"
- 3b4. Use case kết thúc

**6a. Khách hàng từ chối hủy**

- 6a1. Khách hàng nhấn nút "Không" trong hộp thoại xác nhận
- 6a2. Đóng hộp thoại xác nhận
- 6a3. Quay về màn hình chi tiết phiếu đặt
- 6a4. Use case kết thúc

**11a. Lỗi khi cập nhật phiếu đặt**

- 11a1. Hệ thống gặp lỗi khi lưu dữ liệu
- 11a2. Rollback transaction
- 11a3. Hiển thị thông báo lỗi "Không thể hủy phiếu đặt, vui lòng thử lại"
- 11a4. Use case kết thúc thất bại

**12a. Lỗi gửi email**

- 12a1. Hệ thống không thể gửi email xác nhận hủy
- 12a2. Ghi log lỗi
- 12a3. Tiếp tục hiển thị thông báo thành công (phiếu đặt vẫn được hủy)
- 12a4. Thông báo "Phiếu đặt đã được hủy, tuy nhiên không thể gửi email xác nhận"
- 12a5. Tiếp tục bước 13

### Luồng ngoại lệ / Exception Flows

**E1. Phiếu đặt bị xóa trong lúc hủy**

- E1.1. Phiếu đặt bị admin/staff xóa trong lúc khách hàng hủy
- E1.2. Hệ thống phát hiện phiếu đặt không còn tồn tại
- E1.3. Hiển thị thông báo "Phiếu đặt không còn tồn tại"
- E1.4. Use case kết thúc

**E2. Timeout session**

- E2.1. Khách hàng không thao tác trong thời gian dài
- E2.2. Session hết hạn
- E2.3. Hệ thống yêu cầu đăng nhập lại
- E2.4. Use case kết thúc

### Yêu cầu đặc biệt / Special Requirements

- Hiển thị rõ ràng thông tin tiền phạt (nếu có) trước khi khách hàng xác nhận hủy
- Tính toán tiền phạt chính xác theo tham số hệ thống
- Lưu lại lý do hủy để admin/staff tham khảo
- Xác nhận 2 lần trước khi hủy phiếu đặt (đặc biệt nếu có tiền phạt)

### Các yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Xử lý hủy phiếu đặt < 2 giây
- **Security**: Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu
- **Usability**: Hiển thị cảnh báo rõ ràng về tiền phạt
- **Auditability**: Ghi lại thông tin hủy (ngày hủy, lý do hủy, tiền phạt)

### Quy tắc nghiệp vụ / Business Rules

- **BR1**: Chỉ cho phép hủy phiếu đặt ở trạng thái "Chờ duyệt" hoặc "Đã duyệt"
- **BR2**: Không cho phép hủy phiếu đặt đã qua ngày đại tiệc
- **BR3**: Tính tiền phạt nếu:
  - Phiếu đặt đã được duyệt
  - Tham số `KiemTraPhat = 1` trong THAMSO
  - `TienPhat = TongTienHoaDon × TiLePhat`
- **BR4**: Nếu phiếu đặt chờ duyệt, không tính tiền phạt
- **BR5**: Lưu lại lý do hủy và ngày hủy trong PHIEUDATTIEC

---

## Tổng kết nhóm chức năng / Summary

Nhóm chức năng **Quản lý Đặt tiệc (Khách hàng)** bao gồm 5 use case chính:

1. **UC 40**: Tra cứu lịch sảnh trống - Khách hàng tìm kiếm sảnh còn trống
2. **UC 41**: Đặt tiệc cưới mới - Khách hàng tạo phiếu đặt tiệc
3. **UC 42**: Xem chi tiết phiếu đặt của tôi - Khách hàng xem thông tin phiếu đặt
4. **UC 43**: Chỉnh sửa phiếu đặt của tôi - Khách hàng sửa phiếu đặt chờ duyệt
5. **UC 44**: Hủy phiếu đặt của tôi - Khách hàng hủy phiếu đặt

### Bảng CRUD tương ứng

| Use Case | PHIEUDATTIEC | THUCDON | CHITIETDV | SANH | CA  | LOAISANH | MONAN | DICHVU | THAMSO |
| -------- | ------------ | ------- | --------- | ---- | --- | -------- | ----- | ------ | ------ |
| UC 40    | R            | -       | -         | R    | R   | R        | -     | -      | -      |
| UC 41    | C            | C       | C         | R    | R   | R        | R     | R      | R      |
| UC 42    | R            | R       | R         | R    | R   | R        | R     | R      | -      |
| UC 43    | U            | U       | U         | R    | R   | R        | R     | R      | R      |
| UC 44    | U            | -       | -         | -    | -   | -        | -     | -      | R      |

### Lưu ý quan trọng

- Tất cả use case trong nhóm này chỉ dành cho **Khách hàng**
- Khách hàng chỉ được thao tác với **phiếu đặt của chính mình**
- Phiếu đặt mới luôn có trạng thái **"Chờ duyệt"**
- Chỉ cho phép chỉnh sửa/hủy phiếu đặt ở trạng thái **"Chờ duyệt"** hoặc **"Đã duyệt"**
- Tính tiền phạt khi hủy phiếu đặt đã duyệt (theo tham số hệ thống)

---

## Tài liệu tham khảo / References

- **Database Schema**: `docs/docs/database/db.md`
- **Master Use Case List**: `Danh sách sơ đồ đề tài hệ thống quản lý tiệc cưới - formatted.md`
- **Business Requirements Document**: `Báo-cáo-đồ-án-cuối-kỳ_1.pdf`

---

**Ngày tạo**: 19/11/2025  
**Phiên bản**: 1.0  
**Người tạo**: GitHub Copilot
