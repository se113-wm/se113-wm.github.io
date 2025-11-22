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
|    6     |                Quên mật khẩu                 |           Forgot Password           | x          |     x     |   x   |                       |
|  **II**  |            **Quản trị hệ thống**             |        **System Management**        |            |           |       | **Admin & Settings**  |
|    7     |     Xem danh sách & chi tiết người dùng      |          View User Details          |            |           |   x   |     Manage Users      |
|    8     |         Thêm người dùng (nhân viên)          |            Add New User             |            |           |   x   |                       |
|    9     |           Sửa thông tin người dùng           |              Edit User              |            |           |   x   |                       |
|    10    |                Xóa người dùng                |             Delete User             |            |           |   x   |                       |
|    11    |     Xem danh sách & chi tiết nhóm quyền      |    View Permission Group Details    |            |           |   x   |  Manage Permissions   |
|    12    |             Thêm nhóm quyền mới              |      Add New Permission Group       |            |           |   x   |                       |
|    13    |         Sửa nhóm quyền (Tên & Quyền)         |        Edit Permission Group        |            |           |   x   |                       |
|    14    |                Xóa nhóm quyền                |       Delete Permission Group       |            |           |   x   |                       |
|    15    |      Thay đổi tham số/quy định hệ thống      |      Manage System Parameters       |            |           |   x   |    System Settings    |
| **III**  |      **Quản lý Danh mục (Sảnh & Menu)**      |     **Master Data Management**      |            |           |       | **Manage Categories** |
|    16    |        Xem danh sách & chi tiết Sảnh         |          View Hall Details          |            |     x     |   x   |     Manage Halls      |
|    17    |                Thêm Sảnh mới                 |            Add New Hall             |            |     x     |   x   |                       |
|    18    |              Sửa thông tin Sảnh              |              Edit Hall              |            |     x     |   x   |                       |
|    19    |                   Xóa Sảnh                   |             Delete Hall             |            |     x     |   x   |                       |
|    20    |         Xuất danh sách Sảnh ra Excel         |        Export Halls to Excel        |            |     x     |   x   |                       |
|    21    |      Xem danh sách & chi tiết Loại Sảnh      |       View Hall Type Details        |            |     x     |   x   |   Manage Hall Types   |
|    22    |              Thêm Loại Sảnh mới              |          Add New Hall Type          |            |     x     |   x   |                       |
|    23    |      Sửa Loại Sảnh & Đơn giá tối thiểu       |           Edit Hall Type            |            |     x     |   x   |                       |
|    24    |                Xóa Loại Sảnh                 |          Delete Hall Type           |            |     x     |   x   |                       |
|    25    |      Xuất danh sách Loại Sảnh ra Excel       |     Export Hall Types to Excel      |            |     x     |   x   |                       |
|    26    |       Xem danh sách & chi tiết Món ăn        |          View Dish Details          |            |     x     |   x   |      Manage Menu      |
|    27    |               Thêm Món ăn mới                |            Add New Dish             |            |     x     |   x   |                       |
|    28    |             Sửa thông tin Món ăn             |              Edit Dish              |            |     x     |   x   |                       |
|    29    |                  Xóa Món ăn                  |             Delete Dish             |            |     x     |   x   |                       |
|    30    |        Xuất danh sách Món ăn ra Excel        |       Export Dishes to Excel        |            |     x     |   x   |                       |
|    31    |       Xem danh sách & chi tiết Dịch vụ       |        View Service Details         |            |     x     |   x   |    Manage Services    |
|    32    |               Thêm Dịch vụ mới               |           Add New Service           |            |     x     |   x   |                       |
|    33    |            Sửa thông tin Dịch vụ             |            Edit Service             |            |     x     |   x   |                       |
|    34    |                 Xóa Dịch vụ                  |           Delete Service            |            |     x     |   x   |                       |
|    35    |       Xuất danh sách Dịch vụ ra Excel        |      Export Services to Excel       |            |     x     |   x   |                       |
|    36    |         Xem danh sách & chi tiết Ca          |         View Shift Details          |            |     x     |   x   |     Manage Shifts     |
|    37    |             Thêm Ca tổ chức mới              |            Add New Shift            |            |     x     |   x   |                       |
|    38    |           Sửa thông tin Ca tổ chức           |             Edit Shift              |            |     x     |   x   |                       |
|    39    |                Xóa Ca tổ chức                |            Delete Shift             |            |     x     |   x   |                       |
|    40    |          Xuất danh sách Ca ra Excel          |       Export Shifts to Excel        |            |     x     |   x   |                       |
|  **IV**  |     **Nghiệp vụ Đặt tiệc - Khách hàng**      |   **Customer Booking Operations**   |            |           |       | **Customer Bookings** |
|    41    |           Tra cứu lịch sảnh trống            |       Check Hall Availability       | x          |           |       |  Check Availability   |
|    42    |      Đặt tiệc cưới mới (Tạo phiếu đặt)       |     Submit Wedding Reservation      | x          |           |       |    Create Booking     |
|    43    |        Xem chi tiết phiếu đặt của tôi        |       View My Booking Details       | x          |           |       |                       |
|    44    |  Chỉnh sửa phiếu đặt của tôi (trước duyệt)   |       Edit My Booking Request       | x          |           |       |                       |
|    45    |            Hủy phiếu đặt của tôi             |          Cancel My Booking          | x          |           |       |                       |
|  **V**   |      **Quản lý Đặt tiệc - Staff/Admin**      |    **Staff Booking Management**     |            |           |       |  **Manage Bookings**  |
|    46    |      Tra cứu lịch sảnh trống (hệ thống)      |   Check System Hall Availability    |            |     x     |   x   |  Check Availability   |
|    47    |        Tạo phiếu đặt tiệc (cho khách)        |     Create Booking for Customer     |            |     x     |       |    Create Booking     |
|    48    |                Xóa phiếu đặt                 |           Delete Booking            |            |     x     |   x   |                       |
|    49    |      Tra cứu & lọc danh sách phiếu đặt       |     Search/Filter All Bookings      |            |     x     |   x   |     View Bookings     |
|    50    |        Xem chi tiết phiếu đặt bất kỳ         |      View Any Booking Details       |            |     x     |   x   |                       |
|    51    |    Chỉnh sửa phiếu đặt (Món/DV/Thông tin)    |       Modify Booking Details        |            |     x     |       |                       |
|  **VI**  |    **Hóa đơn & Thanh toán - Khách hàng**     |   **Customer Payment & Invoice**    |            |           |       | **Customer Payment**  |
|    52    |        Xem hóa đơn của tôi & Công nợ         |       View My Invoice & Debt        | x          |           |       |     View Invoice      |
|    53    | Thanh toán hóa đơn của tôi (Đặt cọc/Toàn bộ) |           Pay My Invoice            | x          |           |       |      Pay Invoice      |
|    54    |         Xuất hóa đơn của tôi ra PDF          |      Export My Invoice to PDF       | x          |           |       |                       |
| **VII**  |      **Quản lý Hóa đơn - Staff/Admin**       |    **Staff Invoice Management**     |            |           |       |  **Manage Invoices**  |
|    55    |    Xem chi tiết hóa đơn bất kỳ & Công nợ     |       View Any Invoice & Debt       |            |     x     |   x   |     View Invoices     |
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
