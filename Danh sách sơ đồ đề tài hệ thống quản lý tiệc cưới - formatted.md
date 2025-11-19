# Danh sách sơ đồ - Hệ thống Quản lý Tiệc Cưới

## Sơ đồ Use Case

### 1. SƠ ĐỒ USE CASE TỔNG QUÁT

### ĐẶC TẢ USE CASE:

|   No.    |               Tên usecase (VN)               |         Use case name (EN)          | Actor      |           |       |    Nhóm chức năng     |
| :------: | :------------------------------------------: | :---------------------------------: | ---------- | :-------: | :---: | :-------------------: |
|          |                                              |                                     | Khách hàng | Nhân viên | Admin |                       |
|  **I**   |           **Xác thực & Tài khoản**           |         **Authentication**          |            |           |       |       **Auth**        |
|    1     |                  Đăng nhập                   |                Login                | x          |     x     |   x   |         Auth          |
|    2     |                  Đăng xuất                   |               Logout                | x          |     x     |   x   |                       |
|    3     |          Quản lý thông tin cá nhân           |           Manage Profile            | x          |     x     |   x   |                       |
|    4     |                 Đổi mật khẩu                 |           Change Password           | x          |     x     |   x   |                       |
|    5     |           Đăng ký tài khoản (Web)            |          Register Account           | x          |           |       |                       |
|  **II**  |            **Quản trị hệ thống**             |        **System Management**        |            |           |       | **Admin & Settings**  |
|    6     |     Xem danh sách & chi tiết người dùng      |          View User Details          |            |           |   x   |     Manage Users      |
|    7     |         Thêm người dùng (nhân viên)          |            Add New User             |            |           |   x   |                       |
|    8     |           Sửa thông tin người dùng           |              Edit User              |            |           |   x   |                       |
|    9     |                Xóa người dùng                |             Delete User             |            |           |   x   |                       |
|    10    |     Xem danh sách & chi tiết nhóm quyền      |    View Permission Group Details    |            |           |   x   |  Manage Permissions   |
|    11    |             Thêm nhóm quyền mới              |      Add New Permission Group       |            |           |   x   |                       |
|    12    |         Sửa nhóm quyền (Tên & Quyền)         |        Edit Permission Group        |            |           |   x   |                       |
|    13    |                Xóa nhóm quyền                |       Delete Permission Group       |            |           |   x   |                       |
|    14    |      Thay đổi tham số/quy định hệ thống      |      Manage System Parameters       |            |           |   x   |    System Settings    |
| **III**  |      **Quản lý Danh mục (Sảnh & Menu)**      |     **Master Data Management**      |            |           |       | **Manage Categories** |
|    15    |        Xem danh sách & chi tiết Sảnh         |          View Hall Details          |            |     x     |   x   |     Manage Halls      |
|    16    |                Thêm Sảnh mới                 |            Add New Hall             |            |     x     |   x   |                       |
|    17    |              Sửa thông tin Sảnh              |              Edit Hall              |            |     x     |   x   |                       |
|    18    |                   Xóa Sảnh                   |             Delete Hall             |            |     x     |   x   |                       |
|    19    |         Xuất danh sách Sảnh ra Excel         |        Export Halls to Excel        |            |     x     |   x   |                       |
|    20    |      Xem danh sách & chi tiết Loại Sảnh      |       View Hall Type Details        |            |     x     |   x   |   Manage Hall Types   |
|    21    |              Thêm Loại Sảnh mới              |          Add New Hall Type          |            |     x     |   x   |                       |
|    22    |      Sửa Loại Sảnh & Đơn giá tối thiểu       |           Edit Hall Type            |            |     x     |   x   |                       |
|    23    |                Xóa Loại Sảnh                 |          Delete Hall Type           |            |     x     |   x   |                       |
|    24    |      Xuất danh sách Loại Sảnh ra Excel       |     Export Hall Types to Excel      |            |     x     |   x   |                       |
|    25    |       Xem danh sách & chi tiết Món ăn        |          View Dish Details          |            |     x     |   x   |      Manage Menu      |
|    26    |               Thêm Món ăn mới                |            Add New Dish             |            |     x     |   x   |                       |
|    27    |             Sửa thông tin Món ăn             |              Edit Dish              |            |     x     |   x   |                       |
|    28    |                  Xóa Món ăn                  |             Delete Dish             |            |     x     |   x   |                       |
|    29    |        Xuất danh sách Món ăn ra Excel        |       Export Dishes to Excel        |            |     x     |   x   |                       |
|    30    |       Xem danh sách & chi tiết Dịch vụ       |        View Service Details         |            |     x     |   x   |    Manage Services    |
|    31    |               Thêm Dịch vụ mới               |           Add New Service           |            |     x     |   x   |                       |
|    32    |            Sửa thông tin Dịch vụ             |            Edit Service             |            |     x     |   x   |                       |
|    33    |                 Xóa Dịch vụ                  |           Delete Service            |            |     x     |   x   |                       |
|    34    |       Xuất danh sách Dịch vụ ra Excel        |      Export Services to Excel       |            |     x     |   x   |                       |
|    35    |         Xem danh sách & chi tiết Ca          |         View Shift Details          |            |     x     |   x   |     Manage Shifts     |
|    36    |             Thêm Ca tổ chức mới              |            Add New Shift            |            |     x     |   x   |                       |
|    37    |           Sửa thông tin Ca tổ chức           |             Edit Shift              |            |     x     |   x   |                       |
|    38    |                Xóa Ca tổ chức                |            Delete Shift             |            |     x     |   x   |                       |
|    39    |          Xuất danh sách Ca ra Excel          |       Export Shifts to Excel        |            |     x     |   x   |                       |
|  **IV**  |     **Nghiệp vụ Đặt tiệc - Khách hàng**      |   **Customer Booking Operations**   |            |           |       | **Customer Bookings** |
|    40    |           Tra cứu lịch sảnh trống            |       Check Hall Availability       | x          |           |       |  Check Availability   |
|    41    |      Đặt tiệc cưới mới (Tạo phiếu đặt)       |     Submit Wedding Reservation      | x          |           |       |    Create Booking     |
|    42    |        Xem chi tiết phiếu đặt của tôi        |       View My Booking Details       | x          |           |       |                       |
|    43    |  Chỉnh sửa phiếu đặt của tôi (trước duyệt)   |       Edit My Booking Request       | x          |           |       |                       |
|    44    |            Hủy phiếu đặt của tôi             |          Cancel My Booking          | x          |           |       |                       |
|  **V**   |      **Quản lý Đặt tiệc - Staff/Admin**      |    **Staff Booking Management**     |            |           |       |  **Manage Bookings**  |
|    45    |      Tra cứu lịch sảnh trống (hệ thống)      |   Check System Hall Availability    |            |     x     |   x   |  Check Availability   |
|    46    |        Tạo phiếu đặt tiệc (cho khách)        |     Create Booking for Customer     |            |     x     |       |    Create Booking     |
|    47    |    Duyệt/Xác nhận hoặc Từ chối phiếu đặt     |  Approve/Confirm or Reject Booking  |            |     x     |   x   |                       |
|    48    |      Tra cứu & lọc danh sách phiếu đặt       |     Search/Filter All Bookings      |            |     x     |   x   |     View Bookings     |
|    49    |        Xem chi tiết phiếu đặt bất kỳ         |      View Any Booking Details       |            |     x     |   x   |                       |
|    50    |    Chỉnh sửa phiếu đặt (Món/DV/Thông tin)    |       Modify Booking Details        |            |     x     |       |                       |
|  **VI**  |    **Hóa đơn & Thanh toán - Khách hàng**     |   **Customer Payment & Invoice**    |            |           |       | **Customer Payment**  |
|    51    |        Xem hóa đơn của tôi & Công nợ         |       View My Invoice & Debt        | x          |           |       |     View Invoice      |
|    52    | Thanh toán hóa đơn của tôi (Đặt cọc/Toàn bộ) |           Pay My Invoice            | x          |           |       |      Pay Invoice      |
|    53    |         Xuất hóa đơn của tôi ra PDF          |      Export My Invoice to PDF       | x          |           |       |                       |
| **VII**  |      **Quản lý Hóa đơn - Staff/Admin**       |    **Staff Invoice Management**     |            |           |       |  **Manage Invoices**  |
|    54    |       Tra cứu & lọc danh sách hóa đơn        |     Search/Filter All Invoices      |            |     x     |   x   |     View Invoices     |
|    55    |    Xem chi tiết hóa đơn bất kỳ & Công nợ     |       View Any Invoice & Debt       |            |     x     |   x   |                       |
|    56    |     Xác nhận thanh toán & Tính tiền phạt     | Confirm Payment & Calculate Penalty |            |     x     |   x   |    Process Payment    |
|    57    |          Xuất hóa đơn bất kỳ ra PDF          |      Export Any Invoice to PDF      |            |     x     |   x   |                       |
| **VIII** |            **Báo cáo & Thống kê**            |      **Reports & Statistics**       |            |           |       |     **Reporting**     |
|    58    |            Xem biểu đồ doanh thu             |         View Revenue Chart          |            |           |   x   |   Generate Reports    |
|    59    |            Xuất báo cáo ra Excel             |       Export Report to Excel        |            |           |   x   |                       |

---

## Sơ đồ Activity

**Main flow của đặc tả use case (flow phụ -> sinh ra decision node)**

## Sơ đồ Sequence

## Sơ đồ Domain

## Sơ đồ Class

**Vẽ theo database**
