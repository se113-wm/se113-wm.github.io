# Use Case Specifications - Báo cáo & Thống kê / Reports & Statistics

## Nhóm chức năng: Báo cáo & Thống kê / Reports & Statistics

---

## UC 57: Xem biểu đồ doanh thu / View Revenue Chart

### Mô tả ngắn gọn / Brief Description

Admin xem biểu đồ và thống kê doanh thu theo tháng, bao gồm doanh thu từng ngày, tổng doanh thu tháng, và tỷ lệ đóng góp của từng ngày.

Admin views revenue chart and statistics by month, including daily revenue, total monthly revenue, and contribution percentage of each day.

### Tác nhân / Actors

- **Admin** / Admin (Primary)

### Tiền điều kiện / Preconditions

1. Admin đã đăng nhập vào hệ thống
2. Có dữ liệu báo cáo doanh thu trong hệ thống (BAOCAODS, CTBAOCAODS)

### Hậu điều kiện / Postconditions

**Thành công:**

- Hiển thị biểu đồ doanh thu theo tháng
- Hiển thị bảng thống kê chi tiết từng ngày
- Hiển thị tổng doanh thu và số lượng tiệc của tháng

**Thất bại:**

- Không có dữ liệu báo cáo
- Hiển thị thông báo lỗi

### Luồng sự kiện chính / Main Flow

1. Admin chọn chức năng "Báo cáo doanh thu"
2. Hệ thống hiển thị form chọn tháng/năm (mặc định là tháng hiện tại)
3. Admin chọn tháng và năm cần xem
4. Admin nhấn nút "Xem báo cáo"
5. Hệ thống truy vấn dữ liệu báo cáo từ BAOCAODS và CTBAOCAODS
6. Hệ thống hiển thị biểu đồ doanh thu (biểu đồ cột hoặc đường theo ngày)
7. Hệ thống hiển thị bảng chi tiết: Ngày, Số lượng tiệc, Doanh thu, Tỷ lệ (%)
8. Hệ thống hiển thị tổng kết: Tổng doanh thu tháng, Tổng số tiệc, Doanh thu trung bình/ngày
9. Admin xem biểu đồ và thống kê
10. Use case kết thúc

### Luồng thay thế / Alternative Flows

**5a. Không có dữ liệu báo cáo**

- 5a1. Hệ thống không tìm thấy dữ liệu cho tháng/năm được chọn
- 5a2. Hiển thị thông báo "Chưa có dữ liệu báo cáo cho tháng này"
- 5a3. Admin xem thông báo
- 5a4. Use case kết thúc

**5b. Lỗi khi truy vấn dữ liệu**

- 5b1. Hệ thống gặp lỗi database
- 5b2. Hiển thị thông báo "Không thể tải dữ liệu báo cáo"
- 5b3. Admin xác nhận
- 5b4. Use case kết thúc

### Luồng ngoại lệ / Exception Flows

**E1. Admin chọn tháng/năm khác**

- E1.1. Admin chọn tháng/năm mới
- E1.2. Quay lại bước 4

**E2. Admin xuất báo cáo ra Excel**

- E2.1. Admin nhấn nút "Xuất Excel" (UC 58)
- E2.2. Chuyển sang UC 58
- E2.3. Use case kết thúc

### Yêu cầu đặc biệt / Special Requirements

- Biểu đồ trực quan, dễ đọc (sử dụng Chart.js hoặc thư viện tương tự)
- Hiển thị tỷ lệ % đóng góp của từng ngày
- Cho phép chọn loại biểu đồ (cột, đường, tròn)
- Highlight ngày có doanh thu cao nhất và thấp nhất
- Responsive trên nhiều kích thước màn hình

### Các yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Tải và hiển thị biểu đồ < 3 giây
- **Usability**: Giao diện trực quan, dễ hiểu
- **Visualization**: Sử dụng màu sắc phù hợp, biểu đồ rõ ràng

### Quy tắc nghiệp vụ / Business Rules

- **BR1**: Dữ liệu báo cáo được tính từ các phiếu đặt tiệc đã thanh toán (NgayThanhToan IS NOT NULL)
- **BR2**: Doanh thu ngày = Tổng TongTienHoaDon của các phiếu đặt có NgayDaiTiec trong ngày đó
- **BR3**: Tỷ lệ % = (Doanh thu ngày / Tổng doanh thu tháng) \* 100
- **BR4**: Tổng doanh thu tháng lưu trong BAOCAODS.TongDoanhThu
- **BR5**: Chi tiết từng ngày lưu trong CTBAOCAODS (Ngay, SoLuongTiec, DoanhThu, TiLe)
- **BR6**: Chỉ Admin mới có quyền xem báo cáo doanh thu

### SQL Queries

**Truy vấn tổng quan tháng:**

```sql
SELECT Thang, Nam, TongDoanhThu
FROM BAOCAODS
WHERE Thang = @Thang AND Nam = @Nam
```

**Truy vấn chi tiết từng ngày:**

```sql
SELECT Ngay, SoLuongTiec, DoanhThu, TiLe
FROM CTBAOCAODS
WHERE Thang = @Thang AND Nam = @Nam
ORDER BY Ngay
```

---

## UC 58: Xuất báo cáo ra Excel / Export Report to Excel

### Mô tả ngắn gọn / Brief Description

Admin xuất báo cáo doanh thu theo tháng ra file Excel để lưu trữ, in ấn hoặc chia sẻ.

Admin exports monthly revenue report to Excel file for storage, printing, or sharing.

### Tác nhân / Actors

- **Admin** / Admin (Primary)

### Tiền điều kiện / Preconditions

1. Admin đã đăng nhập vào hệ thống
2. Admin đang xem biểu đồ doanh thu (UC 57)
3. Có dữ liệu báo cáo để xuất

### Hậu điều kiện / Postconditions

**Thành công:**

- Tạo file Excel chứa báo cáo doanh thu
- Tải file Excel về máy Admin
- Hiển thị thông báo thành công

**Thất bại:**

- Không tạo được file Excel
- Hiển thị thông báo lỗi

### Luồng sự kiện chính / Main Flow

1. Admin xem biểu đồ doanh thu (UC 57)
2. Hệ thống hiển thị nút "Xuất Excel"
3. Admin nhấn nút "Xuất Excel"
4. Hệ thống truy vấn dữ liệu báo cáo từ BAOCAODS và CTBAOCAODS
5. Hệ thống tạo file Excel với định dạng chuẩn
6. Hệ thống tải file Excel về máy Admin
7. Hệ thống hiển thị thông báo "Xuất Excel thành công"
8. Admin mở file Excel đã tải
9. Use case kết thúc thành công

### Luồng thay thế / Alternative Flows

**4a. Không có dữ liệu để xuất**

- 4a1. Hệ thống không tìm thấy dữ liệu báo cáo
- 4a2. Hiển thị thông báo "Không có dữ liệu để xuất"
- 4a3. Admin xác nhận
- 4a4. Use case kết thúc

**5a. Lỗi khi tạo Excel**

- 5a1. Hệ thống không thể tạo file Excel
- 5a2. Hiển thị thông báo lỗi "Không thể tạo file Excel. Vui lòng thử lại"
- 5a3. Use case kết thúc thất bại

**6a. Lỗi khi tải file**

- 6a1. Không thể tải file về máy Admin
- 6a2. Hiển thị thông báo "Không thể tải file. Vui lòng kiểm tra kết nối"
- 6a3. Use case kết thúc thất bại

### Luồng ngoại lệ / Exception Flows

**E1. Admin hủy xuất Excel**

- E1.1. Admin đóng dialog hoặc nhấn ESC
- E1.2. Hủy quá trình xuất Excel
- E1.3. Use case kết thúc

### Yêu cầu đặc biệt / Special Requirements

- File Excel phải chứa đầy đủ thông tin báo cáo:
  - Sheet 1 "Tổng quan": Tháng/Năm, Tổng doanh thu, Tổng số tiệc, Doanh thu TB/ngày
  - Sheet 2 "Chi tiết": Bảng từng ngày (Ngày, Số lượng tiệc, Doanh thu, Tỷ lệ %)
  - Sheet 3 "Biểu đồ": Biểu đồ cột/đường doanh thu theo ngày (nếu có thể)
- Header với logo và tiêu đề báo cáo
- Format số tiền: #,##0 VNĐ
- Format tỷ lệ: 0.00%
- Tô màu header, border cho bảng
- Tên file: `BaoCaoDoanhThu_[Thang]_[Nam]_[NgayXuat].xlsx`

### Các yêu cầu phi chức năng / Non-functional Requirements

- **Performance**: Tạo và tải file Excel < 5 giây
- **Usability**: File Excel dễ đọc, dễ in, định dạng chuyên nghiệp
- **Compatibility**: File Excel tương thích với Microsoft Excel 2010+ và Google Sheets

### Quy tắc nghiệp vụ / Business Rules

- **BR1**: Chỉ xuất báo cáo cho tháng/năm đang được xem trong UC 57
- **BR2**: File Excel phải chứa đầy đủ thông tin chi tiết và biểu đồ
- **BR3**: Định dạng số tiền và tỷ lệ theo chuẩn Việt Nam
- **BR4**: Chỉ Admin mới có quyền xuất báo cáo ra Excel

### Excel Structure

**Sheet 1: Tổng quan**
| Mục | Giá trị |
|-----|---------|
| Tháng/Năm | [Thang]/[Nam] |
| Tổng doanh thu | [TongDoanhThu] VNĐ |
| Tổng số tiệc | [SUM(SoLuongTiec)] |
| Doanh thu TB/ngày | [TongDoanhThu / Số ngày có tiệc] VNĐ |

**Sheet 2: Chi tiết**
| Ngày | Số lượng tiệc | Doanh thu (VNĐ) | Tỷ lệ (%) |
|------|---------------|-----------------|-----------|
| 1 | [SoLuongTiec] | [DoanhThu] | [TiLe] |
| ... | ... | ... | ... |

---

## Tổng kết nhóm chức năng / Summary

Nhóm chức năng **Báo cáo & Thống kê** bao gồm 2 use case chính:

1. **UC 57**: Xem biểu đồ doanh thu - Trực quan hóa dữ liệu doanh thu theo tháng
2. **UC 58**: Xuất báo cáo ra Excel - Tải file Excel báo cáo chi tiết

### Bảng CRUD tương ứng

| Use Case | BAOCAODS | CTBAOCAODS | PHIEUDATTIEC |
| -------- | -------- | ---------- | ------------ |
| UC 57    | R        | R          | -            |
| UC 58    | R        | R          | -            |

### Lưu ý quan trọng

- Tất cả use case trong nhóm này dành cho **Admin**
- Dữ liệu báo cáo được **tính toán tự động** từ các phiếu đặt tiệc đã thanh toán
- Sử dụng **biểu đồ trực quan** (Chart.js, D3.js) để hiển thị doanh thu
- **File Excel** phải có định dạng chuyên nghiệp, dễ đọc
- Dữ liệu báo cáo lưu trong 2 bảng: BAOCAODS (tổng quan tháng) và CTBAOCAODS (chi tiết ngày)

### Luồng nghiệp vụ liên quan

**Luồng xem và xuất báo cáo:**

1. Admin chọn "Báo cáo doanh thu"
2. Chọn tháng/năm cần xem (UC 57)
3. Hệ thống hiển thị biểu đồ và bảng chi tiết
4. Admin phân tích dữ liệu
5. Admin nhấn "Xuất Excel" (UC 58)
6. Tải file Excel về máy
7. Mở file Excel để xem chi tiết hoặc in

**Cách tính toán dữ liệu báo cáo:**

1. Hệ thống tự động tính doanh thu từ PHIEUDATTIEC
2. Doanh thu ngày = SUM(TongTienHoaDon) WHERE NgayDaiTiec = @Ngay AND NgayThanhToan IS NOT NULL
3. Số lượng tiệc = COUNT(\*) WHERE NgayDaiTiec = @Ngay AND NgayThanhToan IS NOT NULL
4. Tỷ lệ % = (Doanh thu ngày / Tổng doanh thu tháng) \* 100
5. Lưu vào BAOCAODS và CTBAOCAODS

---

## Tài liệu tham khảo / References

- **Database Schema**: `docs/docs/database/db.md`
- **Master Use Case List**: `Danh sách sơ đồ đề tài hệ thống quản lý tiệc cưới - formatted.md`
- **Business Requirements Document**: `Báo-cáo-đồ-án-cuối-kỳ_1.pdf`
- **Manage Halls**: `docs/docs/activity for wedding management system/manage-halls/ucs-manage-halls.md`

---

**Ngày tạo**: 22/11/2025  
**Phiên bản**: 1.0  
**Người tạo**: GitHub Copilot
