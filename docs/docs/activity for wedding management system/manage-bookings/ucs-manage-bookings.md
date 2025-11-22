# Use Case Specifications - Quản lý Đặt tiệc (Staff/Admin) / Staff Booking Management

## Nhóm chức năng: Quản lý Đặt tiệc - Staff/Admin / Staff Booking Management

---

## UC 45: Tra cứu lịch sảnh trống (hệ thống) / Check System Hall Availability

### Mô tả ngắn gọn / Brief Description

Staff/Admin tra cứu lịch sảnh trống trong hệ thống để hỗ trợ khách hàng hoặc lập kế hoạch.

Staff/Admin checks system-wide hall availability to assist customers or plan events.

### Tác nhân / Actors

- **Nhân viên** / Staff (Primary)
- **Quản trị viên** / Admin (Primary)

### Tiền điều kiện / Preconditions

1. Staff/Admin đã đăng nhập vào hệ thống
2. Staff/Admin có quyền truy cập chức năng quản lý đặt tiệc
3. Hệ thống có dữ liệu sảnh, ca và phiếu đặt tiệc

### Hậu điều kiện / Postconditions

**Thành công:**

- Hiển thị danh sách tất cả các sảnh và trạng thái (trống/đã đặt)
- Hiển thị thông tin chi tiết phiếu đặt (nếu sảnh đã được đặt)
- Staff/Admin có thể xem lịch đặt sảnh theo ngày, tuần, tháng

**Thất bại:**

- Hiển thị thông báo lỗi
- Không thể truy vấn dữ liệu

### Luồng sự kiện chính / Main Flow

1. Staff/Admin chọn chức năng "Tra cứu lịch sảnh (Hệ thống)"
2. Hệ thống hiển thị giao diện tra cứu với các tùy chọn:
   - Chế độ xem: Ngày / Tuần / Tháng
   - Ngày bắt đầu
   - Loại sảnh (tùy chọn)
   - Ca tổ chức (tùy chọn)
3. Staff/Admin chọn chế độ xem (mặc định: Ngày)
4. Staff/Admin chọn ngày bắt đầu
5. Staff/Admin có thể lọc theo loại sảnh và ca
6. Staff/Admin nhấn nút "Tra cứu"
7. Hệ thống truy vấn dữ liệu:
   - Lấy danh sách tất cả sảnh (có thể lọc theo loại)
   - Lấy danh sách phiếu đặt trong khoảng thời gian
   - Kết hợp để hiển thị trạng thái sảnh
8. Hệ thống hiển thị lịch sảnh dạng bảng/lịch:
   - **Nếu xem theo Ngày**: Hiển thị ma trận Sảnh x Ca
   - **Nếu xem theo Tuần**: Hiển thị ma trận Sảnh x Ngày (7 ngày)
   - **Nếu xem theo Tháng**: Hiển thị lịch tháng với các ngày có sảnh trống
9. Mỗi ô trong bảng hiển thị:
   - **Sảnh trống**: Màu xanh lá, có thể nhấn để tạo phiếu đặt
   - **Sảnh đã đặt**: Màu vàng/đỏ (tùy trạng thái), hiển thị tên khách hàng
10. Staff/Admin có thể:
    - Nhấn vào ô "Sảnh trống" để tạo phiếu đặt mới (chuyển sang UC 46)
    - Nhấn vào ô "Sảnh đã đặt" để xem chi tiết phiếu đặt (chuyển sang UC 49)
    - Thay đổi chế độ xem hoặc khoảng thời gian
11. Use case kết thúc

### Luồng thay thế / Alternative Flows

**8a. Lỗi khi truy vấn dữ liệu**

- 8a1. Hệ thống không thể truy vấn cơ sở dữ liệu
- 8a2. Hiển thị thông báo lỗi "Không thể tải lịch sảnh, vui lòng thử lại"
- 8a3. Use case kết thúc

**8b. Không có sảnh nào trong hệ thống**

- 8b1. Hệ thống không tìm thấy sảnh nào
- 8b2. Hiển thị thông báo "Không có sảnh nào trong hệ thống"
- 8b3. Gợi ý thêm sảnh mới
- 8b4. Use case kết thúc

### Luồng ngoại lệ / Exception Flows

**E1. Staff/Admin hủy tra cứu**

- E1.1. Staff/Admin nhấn nút "Hủy" hoặc đóng giao diện
- E1.2. Use case kết thúc

### Yêu cầu đặc biệt / Special Requirements

- Hiển thị trực quan lịch sảnh (dạng lịch hoặc bảng)
- Phân biệt rõ ràng sảnh trống và đã đặt bằng màu sắc
- Hỗ trợ xem nhanh thông tin phiếu đặt (tooltip khi hover)
- Thời gian phản hồi: < 3 giây

### Các yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Tải lịch sảnh nhanh với dữ liệu lớn
- **Usability**: Giao diện trực quan, dễ điều hướng
- **Availability**: Chức năng luôn khả dụng cho Staff/Admin

---

## UC 46: Tạo phiếu đặt tiệc (cho khách) / Create Booking for Customer

### Mô tả ngắn gọn / Brief Description

Staff tạo phiếu đặt tiệc mới cho khách hàng (khi khách hàng đặt qua điện thoại, trực tiếp, hoặc yêu cầu hỗ trợ).

Staff creates a new wedding booking for customers (when customers book via phone, in-person, or request assistance).

### Tác nhân / Actors

- **Nhân viên** / Staff (Primary)

### Tiền điều kiện / Preconditions

1. Staff đã đăng nhập vào hệ thống
2. Staff có quyền tạo phiếu đặt tiệc
3. Hệ thống có dữ liệu sảnh, ca, món ăn, dịch vụ

### Hậu điều kiện / Postconditions

**Thành công:**

- Tạo mới bản ghi PHIEUDATTIEC với trạng thái "Chờ duyệt" hoặc "Đã duyệt" (tùy quyền Staff)
- Tạo các bản ghi THUCDON và CHITIETDV
- Tính toán và lưu các giá trị tài chính
- Gửi email xác nhận cho khách hàng
- Hiển thị thông báo thành công

**Thất bại:**

- Không tạo phiếu đặt
- Hiển thị thông báo lỗi

### Luồng sự kiện chính / Main Flow

1. Staff chọn chức năng "Tạo phiếu đặt tiệc"
2. Hệ thống hiển thị form tạo phiếu đặt với các phần:

   **A. Thông tin khách hàng:**

   - Tên chú rể (bắt buộc)
   - Tên cô dâu (bắt buộc)
   - Số điện thoại (bắt buộc)
   - Email (tùy chọn)

   **B. Thông tin đại tiệc:**

   - Ngày đại tiệc (bắt buộc)
   - Ca tổ chức (bắt buộc)
   - Sảnh (bắt buộc)
   - Số lượng bàn (bắt buộc)
   - Số bàn dự trù (tùy chọn)
   - Đơn giá bàn tiệc (tự động)

   **C. Thực đơn:**

   - Chọn món ăn và số lượng

   **D. Dịch vụ:**

   - Chọn dịch vụ và số lượng

   **E. Thanh toán:**

   - Tiền đặt cọc (tự động tính hoặc có thể điều chỉnh)
   - Ghi chú

3. Staff nhập thông tin khách hàng
4. Hệ thống kiểm tra định dạng số điện thoại và email
5. Staff chọn ngày đại tiệc
6. Hệ thống kiểm tra ngày hợp lệ (phải trong tương lai)
7. Staff chọn ca tổ chức
8. Hệ thống hiển thị danh sách sảnh còn trống
9. Staff chọn sảnh
10. Hệ thống tự động điền đơn giá bàn tiệc
11. Staff nhập số lượng bàn và số bàn dự trù
12. Hệ thống kiểm tra số lượng bàn ≤ sức chứa sảnh
13. Staff chọn món ăn và dịch vụ với số lượng
14. Hệ thống tính toán tự động:
    - `TongTienBan = SoLuongBan × DonGiaBanTiec`
    - `TongTienDV = ∑(SoLuong × DonGia)` của dịch vụ
    - `TongTienHoaDon = TongTienBan + TongTienDV`
    - `TienDatCoc = TongTienHoaDon × TiLeTienDatCocToiThieu` (có thể điều chỉnh)
    - `TienConLai = TongTienHoaDon - TienDatCoc`
15. Staff xem lại thông tin
16. Staff có thể chọn trạng thái ban đầu:
    - "Chờ duyệt" (mặc định)
    - "Đã duyệt" (nếu có quyền duyệt ngay)
17. Staff nhấn nút "Lưu phiếu đặt"
18. Hệ thống kiểm tra lại tất cả dữ liệu
19. Hệ thống bắt đầu transaction:
    - Tạo bản ghi PHIEUDATTIEC
    - Tạo các bản ghi THUCDON
    - Tạo các bản ghi CHITIETDV
    - Commit transaction
20. Hệ thống gửi email xác nhận cho khách hàng
21. Hệ thống hiển thị thông báo thành công và mã phiếu đặt
22. Use case kết thúc thành công

### Luồng thay thế / Alternative Flows

**4a. Số điện thoại hoặc email không hợp lệ**

- 4a1. Hệ thống kiểm tra định dạng
- 4a2. Hiển thị thông báo lỗi cụ thể
- 4a3. Yêu cầu Staff nhập lại
- 4a4. Quay lại bước 3

**6a. Ngày đại tiệc không hợp lệ**

- 6a1. Hệ thống kiểm tra ngày
- 6a2. Hiển thị thông báo "Ngày đại tiệc phải trong tương lai"
- 6a3. Quay lại bước 5

**8a. Không có sảnh trống**

- 8a1. Hệ thống không tìm thấy sảnh trống
- 8a2. Hiển thị thông báo và gợi ý chọn ngày/ca khác
- 8a3. Quay lại bước 5 hoặc 7

**12a. Số lượng bàn vượt quá sức chứa**

- 12a1. Hệ thống kiểm tra số lượng bàn
- 12a2. Hiển thị thông báo lỗi với sức chứa tối đa
- 12a3. Quay lại bước 11

**19a. Lỗi khi tạo phiếu đặt**

- 19a1. Hệ thống gặp lỗi database
- 19a2. Rollback transaction
- 19a3. Hiển thị thông báo lỗi
- 19a4. Use case kết thúc thất bại

**19b. Sảnh bị đặt bởi người khác**

- 19b1. Conflict xảy ra khi lưu
- 19b2. Rollback transaction
- 19b3. Hiển thị thông báo "Sảnh đã được đặt"
- 19b4. Quay lại bước 8

**20a. Lỗi gửi email**

- 20a1. Không thể gửi email
- 20a2. Ghi log lỗi
- 20a3. Tiếp tục hiển thị thông báo thành công
- 20a4. Thông báo "Phiếu đặt đã tạo, email gửi thất bại"

### Luồng ngoại lệ / Exception Flows

**E1. Staff hủy tạo phiếu đặt**

- E1.1. Staff nhấn nút "Hủy"
- E1.2. Hệ thống xác nhận "Bạn có chắc muốn hủy?"
- E1.3. Nếu xác nhận, hủy dữ liệu và kết thúc

### Yêu cầu đặc biệt / Special Requirements

- Staff có thể điều chỉnh tiền đặt cọc (không bắt buộc đúng tỷ lệ)
- Staff có thể tạo phiếu đặt với trạng thái "Đã duyệt" ngay (nếu có quyền)
- Hỗ trợ tìm kiếm nhanh món ăn và dịch vụ
- Lưu tạm thông tin để tránh mất dữ liệu

### Các yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Tính toán chi phí real-time
- **Security**: Sử dụng transaction
- **Usability**: Form nhập liệu thân thiện
- **Auditability**: Ghi lại Staff tạo phiếu đặt

### Quy tắc nghiệp vụ / Business Rules

- **BR1**: Staff có thể tạo phiếu đặt cho bất kỳ ngày nào trong tương lai
- **BR2**: Staff có thể điều chỉnh tiền đặt cọc (khác với tự động)
- **BR3**: Nếu Staff có quyền, có thể duyệt ngay khi tạo

---

## UC 47: Xóa phiếu đặt / Delete Booking

### Mô tả ngắn gọn / Brief Description

Staff/Admin xóa phiếu đặt tiệc khỏi hệ thống (thường là các phiếu đã từ chối hoặc đã hủy).

Staff/Admin deletes a wedding booking from the system (typically rejected or cancelled bookings).

### Tác nhân / Actors

- **Nhân viên** / Staff (Primary)
- **Quản trị viên** / Admin (Primary)

### Tiền điều kiện / Preconditions

1. Staff/Admin đã đăng nhập vào hệ thống
2. Staff/Admin có quyền xóa phiếu đặt
3. Phiếu đặt tồn tại trong hệ thống

### Hậu điều kiện / Postconditions

**Thành công:**

- Xóa bản ghi PHIEUDATTIEC và các bản ghi liên quan (THUCDON, CHITIETDV)
- Ghi lại log hành động xóa
- Hiển thị thông báo thành công

**Thất bại:**

- Không xóa phiếu đặt
- Hiển thị thông báo lỗi

### Luồng sự kiện chính / Main Flow

1. Staff/Admin chọn chức năng "Xóa phiếu đặt"
2. Hệ thống hiển thị danh sách phiếu đặt
3. Staff/Admin chọn phiếu đặt cần xóa
4. Staff/Admin nhấn nút "Xóa"
5. Hệ thống hiển thị hộp thoại xác nhận "Bạn có chắc chắn muốn xóa phiếu đặt này?"
6. Staff/Admin nhấn nút "Xác nhận" hoặc "Hủy"
7. Hệ thống bắt đầu transaction:
   - Xóa các bản ghi CHITIETDV
   - Xóa các bản ghi THUCDON
   - Xóa bản ghi PHIEUDATTIEC
8. Hệ thống commit transaction và ghi log hành động
9. Hệ thống hiển thị thông báo thành công và tải lại danh sách
10. Staff/Admin xem danh sách đã cập nhật
11. Use case kết thúc thành công

### Luồng thay thế / Alternative Flows

**6a. Staff/Admin hủy xóa**

- 6a1. Staff/Admin nhấn nút "Hủy" trong hộp thoại xác nhận
- 6a2. Đóng hộp thoại xác nhận
- 6a3. Staff/Admin xác nhận kết thúc
- 6a4. Use case kết thúc

**7a. Lỗi khi xóa phiếu đặt**

- 7a1. Hệ thống gặp lỗi database
- 7a2. Rollback transaction
- 7a3. Hiển thị thông báo lỗi "Không thể xóa phiếu đặt"
- 7a4. Staff/Admin xem thông báo lỗi
- 7a5. Use case kết thúc thất bại

### Luồng ngoại lệ / Exception Flows

**E1. Phiếu đặt không tồn tại**

- E1.1. Phiếu đặt đã bị xóa hoặc không tồn tại
- E1.2. Hiển thị thông báo "Phiếu đặt không tồn tại"
- E1.3. Use case kết thúc

### Yêu cầu đặc biệt / Special Requirements

- Xác nhận trước khi xóa để tránh xóa nhầm
- Ghi lại log hành động xóa (ai xóa, khi nào)
- Sử dụng transaction để đảm bảo xóa toàn bộ dữ liệu liên quan

### Các yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Xóa phiếu đặt < 2 giây
- **Security**: Chỉ Staff/Admin có quyền xóa
- **Auditability**: Ghi log hành động xóa
- **Reliability**: Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu

### Quy tắc nghiệp vụ / Business Rules

- **BR1**: Nên xóa các phiếu đặt ở trạng thái "Đã từ chối" hoặc "Đã hủy" để dọn dẹp dữ liệu
- **BR2**: Cần xác nhận trước khi xóa để tránh xóa nhầm
- **BR3**: Xóa phiếu đặt sẽ xóa toàn bộ dữ liệu liên quan (món ăn, dịch vụ)
- **BR4**: Ghi log hành động xóa để audit

---

## UC 48: Tra cứu & lọc danh sách phiếu đặt / Search/Filter All Bookings

### Mô tả ngắn gọn / Brief Description

Staff/Admin tra cứu và lọc danh sách tất cả phiếu đặt tiệc trong hệ thống.

Staff/Admin searches and filters all wedding bookings in the system.

### Tác nhân / Actors

- **Nhân viên** / Staff (Primary)
- **Quản trị viên** / Admin (Primary)

### Tiền điều kiện / Preconditions

1. Staff/Admin đã đăng nhập vào hệ thống
2. Staff/Admin có quyền xem danh sách phiếu đặt
3. Hệ thống có dữ liệu phiếu đặt

### Hậu điều kiện / Postconditions

**Thành công:**

- Hiển thị danh sách phiếu đặt theo tiêu chí lọc
- Staff/Admin có thể xem chi tiết, chỉnh sửa hoặc xóa phiếu đặt

**Thất bại:**

- Không tìm thấy phiếu đặt nào
- Hiển thị thông báo "Không tìm thấy phiếu đặt"

### Luồng sự kiện chính / Main Flow

1. Staff/Admin chọn chức năng "Quản lý phiếu đặt"
2. Hệ thống hiển thị danh sách phiếu đặt với các bộ lọc:
   - Tìm kiếm (theo tên chú rể, cô dâu, số điện thoại, mã phiếu)
   - Trạng thái (Tất cả / Chờ duyệt / Đã duyệt / Đã từ chối / Đã hủy)
   - Ngày đại tiệc (Từ ngày - Đến ngày)
   - Sảnh
   - Ca
   - Ngày đặt tiệc (Từ ngày - Đến ngày)
3. Hệ thống mặc định hiển thị tất cả phiếu đặt (hoặc phiếu đặt gần đây)
4. Staff/Admin nhập tiêu chí lọc:
   - Có thể tìm kiếm theo từ khóa
   - Có thể chọn trạng thái
   - Có thể chọn khoảng thời gian
   - Có thể chọn sảnh/ca cụ thể
5. Staff/Admin nhấn nút "Tìm kiếm"
6. Hệ thống truy vấn cơ sở dữ liệu với các điều kiện lọc
7. Hệ thống hiển thị danh sách kết quả phiếu đặt
8. Staff/Admin xem danh sách phiếu đặt
9. Use case kết thúc

### Luồng thay thế / Alternative Flows

**7a. Không tìm thấy phiếu đặt nào**

- 7a1. Hệ thống không tìm thấy phiếu đặt phù hợp
- 7a2. Hiển thị thông báo "Không tìm thấy phiếu đặt" với gợi ý điều chỉnh tiêu chí
- 7a3. Staff/Admin xem thông báo
- 7a4. Use case kết thúc

**7b. Lỗi khi truy vấn dữ liệu**

- 7b1. Hệ thống gặp lỗi database
- 7b2. Hiển thị thông báo lỗi "Không thể tải danh sách phiếu đặt"
- 7b3. Use case kết thúc

### Luồng ngoại lệ / Exception Flows

**E1. Staff/Admin hủy tra cứu**

- E1.1. Staff/Admin nhấn nút "Hủy" hoặc đóng giao diện
- E1.2. Use case kết thúc

### Yêu cầu đặc biệt / Special Requirements

- Hỗ trợ tìm kiếm nhanh (tìm khi gõ)
- Phân biệt trạng thái bằng màu sắc rõ ràng
- Lưu tiêu chí lọc gần đây

### Các yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Tìm kiếm nhanh với dữ liệu lớn (< 3 giây)
- **Usability**: Giao diện lọc trực quan, dễ sử dụng
- **Scalability**: Hỗ trợ phân trang với số lượng lớn

---

## UC 49: Xem chi tiết phiếu đặt bất kỳ / View Any Booking Details

### Mô tả ngắn gọn / Brief Description

Staff/Admin xem thông tin chi tiết của bất kỳ phiếu đặt tiệc nào trong hệ thống.

Staff/Admin views detailed information of any wedding booking in the system.

### Tác nhân / Actors

- **Nhân viên** / Staff (Primary)
- **Quản trị viên** / Admin (Primary)

### Tiền điều kiện / Preconditions

1. Staff/Admin đã đăng nhập vào hệ thống
2. Staff/Admin có quyền xem chi tiết phiếu đặt
3. Phiếu đặt tồn tại trong hệ thống

### Hậu điều kiện / Postconditions

**Thành công:**

- Hiển thị đầy đủ thông tin chi tiết phiếu đặt
- Staff/Admin có thể thực hiện các thao tác (duyệt, sửa, hủy) tùy trạng thái
- Hiển thị lịch sử thay đổi phiếu đặt (nếu có)

**Thất bại:**

- Không thể tải chi tiết phiếu đặt
- Hiển thị thông báo lỗi

### Luồng sự kiện chính / Main Flow

1. Staff/Admin chọn phiếu đặt từ danh sách (UC 48)
2. Hệ thống truy vấn thông tin chi tiết phiếu đặt từ PHIEUDATTIEC, THUCDON, CHITIETDV, SANH, CA, NGUOIDUNG
3. Hệ thống hiển thị thông tin chi tiết các phần: Thông tin cơ bản, Thông tin khách hàng, Thông tin đại tiệc, Thực đơn, Dịch vụ, Thanh toán, Ghi chú, Lịch sử
4. Staff/Admin xem chi tiết phiếu đặt
5. Use case kết thúc

### Luồng thay thế / Alternative Flows

**2a. Phiếu đặt không tồn tại**

- 2a1. Hệ thống không tìm thấy phiếu đặt
- 2a2. Hiển thị thông báo lỗi "Phiếu đặt không tồn tại"
- 2a3. Staff/Admin xác nhận kết thúc
- 2a4. Use case kết thúc

**3a. Lỗi khi truy vấn chi tiết**

- 3a1. Hệ thống không thể truy vấn dữ liệu
- 3a2. Hiển thị thông báo lỗi "Không thể tải chi tiết phiếu đặt"
- 3a3. Staff/Admin xác nhận kết thúc
- 3a4. Use case kết thúc

**3b. Phiếu đặt không tồn tại**

- 3b1. Phiếu đặt đã bị xóa
- 3b2. Hiển thị thông báo "Phiếu đặt không tồn tại"
- 3b3. Use case kết thúc

### Luồng ngoại lệ / Exception Flows

**E1. Staff/Admin quay lại danh sách**

- E1.1. Staff/Admin nhấn nút "Quay lại"
- E1.2. Quay về danh sách phiếu đặt
- E1.3. Use case kết thúc

### Yêu cầu đặc biệt / Special Requirements

- Hiển thị đầy đủ, chi tiết, dễ đọc
- Phân biệt rõ ràng các trạng thái bằng màu sắc
- Hiển thị lịch sử thay đổi (audit trail)
- Hỗ trợ in phiếu đặt

### Các yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Tải chi tiết nhanh (< 2 giây)
- **Usability**: Giao diện rõ ràng, dễ đọc
- **Security**: Chỉ Staff/Admin có quyền xem

---

## UC 50: Chỉnh sửa phiếu đặt (Món/DV/Thông tin) / Modify Booking Details

### Mô tả ngắn gọn / Brief Description

Staff chỉnh sửa thông tin phiếu đặt tiệc (thông tin khách hàng, món ăn, dịch vụ, số lượng bàn, v.v.).

Staff modifies wedding booking information (customer info, dishes, services, table count, etc.).

### Tác nhân / Actors

- **Nhân viên** / Staff (Primary)

### Tiền điều kiện / Preconditions

1. Staff đã đăng nhập vào hệ thống
2. Staff có quyền chỉnh sửa phiếu đặt
3. Phiếu đặt ở trạng thái "Chờ duyệt" hoặc "Đã duyệt"

### Hậu điều kiện / Postconditions

**Thành công:**

- Cập nhật thông tin PHIEUDATTIEC
- Cập nhật THUCDON và CHITIETDV (nếu thay đổi)
- Tính toán lại chi phí
- Gửi email thông báo thay đổi cho khách hàng
- Ghi lại lịch sử thay đổi
- Hiển thị thông báo thành công

**Thất bại:**

- Không cập nhật phiếu đặt
- Hiển thị thông báo lỗi

### Luồng sự kiện chính / Main Flow

1. Staff xem chi tiết phiếu đặt (UC 49)
2. Hệ thống kiểm tra trạng thái phiếu đặt
3. Nếu phiếu đặt ở trạng thái "Chờ duyệt" hoặc "Đã duyệt", hiển thị nút "Chỉnh sửa"
4. Staff nhấn nút "Chỉnh sửa"
5. Hệ thống hiển thị form chỉnh sửa với thông tin hiện tại:
   - Thông tin khách hàng
   - Thông tin đại tiệc
   - Thực đơn
   - Dịch vụ
   - Thông tin thanh toán
6. Staff chỉnh sửa các thông tin:
   - **Có thể sửa**:
     - Tên chú rể, cô dâu, số điện thoại, email
     - Ngày đại tiệc, ca, sảnh (nếu sửa, phải kiểm tra trống)
     - Số lượng bàn, số bàn dự trù
     - Thực đơn (thêm, sửa, xóa món)
     - Dịch vụ (thêm, sửa, xóa dịch vụ)
     - Tiền đặt cọc (có thể điều chỉnh)
     - Chi phí phát sinh
     - Ghi chú
   - **Không thể sửa**:
     - Mã phiếu đặt
     - Ngày đặt tiệc
     - Trạng thái
7. Hệ thống validate dữ liệu khi Staff thay đổi:
   - Nếu đổi ngày/ca/sảnh: Kiểm tra sảnh còn trống
   - Nếu đổi số lượng bàn: Kiểm tra ≤ sức chứa sảnh
   - Nếu đổi thực đơn/dịch vụ: Kiểm tra tồn tại
8. Hệ thống tính toán lại chi phí tự động
9. Staff xem lại thông tin đã sửa
10. Staff nhấn nút "Lưu thay đổi"
11. Hệ thống kiểm tra lại tất cả dữ liệu
12. Hệ thống bắt đầu transaction:
    - Cập nhật PHIEUDATTIEC
    - Xóa và tạo lại THUCDON (nếu có thay đổi)
    - Xóa và tạo lại CHITIETDV (nếu có thay đổi)
    - Ghi lại lịch sử thay đổi
    - Commit transaction
13. Hệ thống gửi email thông báo thay đổi cho khách hàng
14. Hệ thống hiển thị thông báo "Cập nhật phiếu đặt thành công"
15. Use case kết thúc thành công

### Luồng thay thế / Alternative Flows

**3a. Phiếu đặt không thể chỉnh sửa**

- 3a1. Phiếu đặt đã từ chối hoặc đã hủy
- 3a2. Không hiển thị nút "Chỉnh sửa"
- 3a3. Hiển thị thông báo "Phiếu đặt này không thể chỉnh sửa"
- 3a4. Use case kết thúc

**7a. Ngày/Ca/Sảnh mới không khả dụng**

- 7a1. Staff thay đổi ngày/ca/sảnh
- 7a2. Hệ thống kiểm tra sảnh còn trống
- 7a3. Nếu đã đặt, hiển thị thông báo lỗi
- 7a4. Gợi ý chọn sảnh/ca/ngày khác
- 7a5. Quay lại bước 6

**7b. Số lượng bàn vượt quá sức chứa**

- 7b1. Staff thay đổi số lượng bàn
- 7b2. Hệ thống kiểm tra ≤ sức chứa
- 7b3. Nếu vượt quá, hiển thị thông báo lỗi
- 7b4. Quay lại bước 6

**12a. Lỗi khi cập nhật**

- 12a1. Hệ thống gặp lỗi
- 12a2. Rollback transaction
- 12a3. Hiển thị thông báo lỗi
- 12a4. Use case kết thúc thất bại

**12b. Conflict khi cập nhật**

- 12b1. Sảnh mới đã bị đặt
- 12b2. Rollback transaction
- 12b3. Hiển thị thông báo conflict
- 12b4. Quay lại bước 6

**13a. Lỗi gửi email**

- 13a1. Không thể gửi email
- 13a2. Ghi log lỗi
- 13a3. Tiếp tục hiển thị thông báo thành công
- 13a4. Tiếp tục bước 14

### Luồng ngoại lệ / Exception Flows

**E1. Staff hủy chỉnh sửa**

- E1.1. Staff nhấn nút "Hủy"
- E1.2. Hệ thống xác nhận "Bạn có chắc muốn hủy thay đổi?"
- E1.3. Nếu xác nhận, hủy và quay về chi tiết phiếu đặt

### Yêu cầu đặc biệt / Special Requirements

- Highlight các thông tin đã thay đổi
- Tính toán lại chi phí real-time
- Lưu lịch sử thay đổi (audit trail)
- Xác nhận trước khi lưu nếu có thay đổi lớn

### Các yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Tính toán chi phí real-time
- **Security**: Sử dụng transaction
- **Auditability**: Ghi lại lịch sử thay đổi
- **Usability**: Form chỉnh sửa trực quan

### Quy tắc nghiệp vụ / Business Rules

- **BR1**: Chỉ cho phép sửa phiếu đặt "Chờ duyệt" hoặc "Đã duyệt"
- **BR2**: Khi thay đổi ngày/ca/sảnh, phải kiểm tra trống
- **BR3**: Staff có thể điều chỉnh tiền đặt cọc và chi phí phát sinh
- **BR4**: Ghi lại lịch sử thay đổi để audit

---

## Tổng kết nhóm chức năng / Summary

Nhóm chức năng **Quản lý Đặt tiệc (Staff/Admin)** bao gồm 6 use case chính:

1. **UC 45**: Tra cứu lịch sảnh trống (hệ thống) - Xem tổng quan lịch sảnh
2. **UC 46**: Tạo phiếu đặt tiệc (cho khách) - Staff tạo phiếu đặt cho khách hàng
3. **UC 47**: Xóa phiếu đặt - Xóa phiếu đặt khỏi hệ thống
4. **UC 48**: Tra cứu & lọc danh sách phiếu đặt - Tìm kiếm và lọc phiếu đặt
5. **UC 49**: Xem chi tiết phiếu đặt bất kỳ - Xem đầy đủ thông tin phiếu đặt
6. **UC 50**: Chỉnh sửa phiếu đặt (Món/DV/Thông tin) - Cập nhật thông tin phiếu đặt

### Bảng CRUD tương ứng

| Use Case | PHIEUDATTIEC | THUCDON | CHITIETDV | SANH | CA  | LOAISANH | MONAN | DICHVU | THAMSO | NGUOIDUNG |
| -------- | ------------ | ------- | --------- | ---- | --- | -------- | ----- | ------ | ------ | --------- |
| UC 45    | R            | -       | -         | R    | R   | R        | -     | -      | -      | -         |
| UC 46    | C            | C       | C         | R    | R   | R        | R     | R      | R      | -         |
| UC 47    | D            | D       | D         | -    | -   | -        | -     | -      | -      | R         |
| UC 48    | R            | -       | -         | R    | R   | -        | -     | -      | -      | -         |
| UC 49    | R            | R       | R         | R    | R   | R        | R     | R      | -      | R         |
| UC 50    | U            | U       | U         | R    | R   | R        | R     | R      | -      | R         |

### Lưu ý quan trọng

- Tất cả use case trong nhóm này dành cho **Staff/Admin**
- Staff/Admin có thể **xem và quản lý tất cả phiếu đặt** trong hệ thống
- Staff có thể **tạo phiếu đặt cho khách hàng** (UC 46)
- Staff/Admin có thể **xóa phiếu đặt** (UC 47) - thường là các phiếu đã từ chối hoặc đã hủy
- Staff có thể **chỉnh sửa** phiếu đặt (UC 50)
- Phải **ghi lại lịch sử** thay đổi và người thực hiện (audit trail)
- Sử dụng **transaction** để đảm bảo tính toàn vẹn dữ liệu
- **Lưu ý**: Chức năng duyệt/từ chối phiếu đặt sẽ được xử lý ở module khác

### So sánh với Customer Booking Operations

| Tiêu chí          | Customer Bookings (UC 40-44) | Staff Booking Management (UC 45-50) |
| ----------------- | ---------------------------- | ----------------------------------- |
| **Phạm vi**       | Chỉ phiếu đặt của chính mình | Tất cả phiếu đặt trong hệ thống     |
| **Tạo phiếu đặt** | Tự tạo cho mình              | Tạo cho khách hàng                  |
| **Xóa phiếu đặt** | Không                        | Có (UC 47)                          |
| **Xem chi tiết**  | Chỉ của mình                 | Bất kỳ phiếu đặt nào                |
| **Chỉnh sửa**     | Chỉ khi "Chờ duyệt"          | "Chờ duyệt" hoặc "Đã duyệt"         |
| **Hủy phiếu đặt** | Của mình                     | Bất kỳ phiếu đặt nào                |
| **Tra cứu lịch**  | Xem sảnh trống               | Xem tổng quan hệ thống              |

---

## Tài liệu tham khảo / References

- **Database Schema**: `docs/docs/database/db.md`
- **Master Use Case List**: `Danh sách sơ đồ đề tài hệ thống quản lý tiệc cưới - formatted.md`
- **Business Requirements Document**: `Báo-cáo-đồ-án-cuối-kỳ_1.pdf`
- **Customer Booking Operations**: `docs/docs/activity for wedding management system/manage-customer-bookings/ucs-manage-customer-bookings.md`

---

**Ngày tạo**: 19/11/2025  
**Phiên bản**: 1.0  
**Người tạo**: GitHub Copilot
