| Req No | Req Description | Test Case ID | Status |
| --- | --- | --- | --- |
| UC_AUTH_01 | Login (Đăng nhập) | `TC-UC_AUTH_01-01` Happy path – Login with valid credentials returns both access and refresh tokens. | Planned |
| UC_AUTH_01 | Login (Đăng nhập) | `TC-UC_AUTH_01-02` Missing fields – Submit empty username/password and verify validation errors. | Planned |
| UC_AUTH_01 | Login (Đăng nhập) | `TC-UC_AUTH_01-03` Wrong password – Use valid username but wrong password and confirm generic error. | Planned |
| UC_AUTH_01 | Login (Đăng nhập) | `TC-UC_AUTH_01-04` Locked account – Attempt login on locked account and expect lockout message. | Planned |
| UC_AUTH_01 | Login (Đăng nhập) | `TC-UC_AUTH_01-05` Service failure – Simulate auth service outage and ensure graceful error handling. | Planned |
| UC_AUTH_02 | Logout (Đăng xuất) | `TC-UC_AUTH_02-01` Happy path – Logout from active session and ensure tokens are blacklisted. | Planned |
| UC_AUTH_02 | Logout (Đăng xuất) | `TC-UC_AUTH_02-02` Cancel – Cancel logout confirmation keeps session active. | Planned |
| UC_AUTH_02 | Logout (Đăng xuất) | `TC-UC_AUTH_02-03` Missing refresh token – Logout without refresh token still clears access token. | Planned |
| UC_AUTH_02 | Logout (Đăng xuất) | `TC-UC_AUTH_02-04` Unauthorized – Call logout API without Authorization header and expect 401. | Planned |
| UC_AUTH_02 | Logout (Đăng xuất) | `TC-UC_AUTH_02-05` Persistence failure – Simulate blacklist store failure and verify client forced to clear tokens. | Planned |
| UC_AUTH_03 | Manage Profile (Quản lý thông tin cá nhân) | `TC-UC_AUTH_03-01` Happy path – Update personal information with valid data and verify persistence. | Planned |
| UC_AUTH_03 | Manage Profile (Quản lý thông tin cá nhân) | `TC-UC_AUTH_03-02` Invalid email – Enter malformed email and expect inline validation error. | Planned |
| UC_AUTH_03 | Manage Profile (Quản lý thông tin cá nhân) | `TC-UC_AUTH_03-03` Duplicate email – Use email already taken by another user and expect rejection. | Planned |
| UC_AUTH_03 | Manage Profile (Quản lý thông tin cá nhân) | `TC-UC_AUTH_03-04` Unauthorized role – Attempt profile edit without valid JWT and expect 401. | Planned |
| UC_AUTH_03 | Manage Profile (Quản lý thông tin cá nhân) | `TC-UC_AUTH_03-05` Concurrent update – Ensure optimistic locking prevents overriding newer data. | Planned |
| UC_AUTH_04 | Change Password (Đổi mật khẩu) | `TC-UC_AUTH_04-01` Happy path – Change password with correct current password and matching confirmation. | Planned |
| UC_AUTH_04 | Change Password (Đổi mật khẩu) | `TC-UC_AUTH_04-02` Wrong current – Provide wrong current password and ensure change is blocked. | Planned |
| UC_AUTH_04 | Change Password (Đổi mật khẩu) | `TC-UC_AUTH_04-03` Weak password – Enter password shorter than policy to trigger validation error. | Planned |
| UC_AUTH_04 | Change Password (Đổi mật khẩu) | `TC-UC_AUTH_04-04` Reuse password – Attempt to reuse previous password and expect rejection. | Planned |
| UC_AUTH_04 | Change Password (Đổi mật khẩu) | `TC-UC_AUTH_04-05` Token cleanup – Verify all refresh tokens are revoked after password change. | Planned |
| UC_AUTH_05 | Register Account (Đăng ký tài khoản - Web) | `TC-UC_AUTH_05-01` Happy path – Register new account with unique username/email. | Planned |
| UC_AUTH_05 | Register Account (Đăng ký tài khoản - Web) | `TC-UC_AUTH_05-02` Missing required – Omit mandatory fields and ensure inline validation. | Planned |
| UC_AUTH_05 | Register Account (Đăng ký tài khoản - Web) | `TC-UC_AUTH_05-03` Duplicate username – Register with existing username and expect duplication error. | Planned |
| UC_AUTH_05 | Register Account (Đăng ký tài khoản - Web) | `TC-UC_AUTH_05-04` Duplicate email – Register with email already in system and expect rejection. | Planned |
| UC_AUTH_05 | Register Account (Đăng ký tài khoản - Web) | `TC-UC_AUTH_05-05` Rollback failure – Simulate DB failure mid-transaction and verify rollback. | Planned |
| UC_AUTH_06 | Forgot Password (Quên mật khẩu - Web) | `TC-UC_AUTH_06-01` Happy path – Request reset link and complete password reset using valid token. | Planned |
| UC_AUTH_06 | Forgot Password (Quên mật khẩu - Web) | `TC-UC_AUTH_06-02` Unknown email – Submit email not in system and ensure generic success message. | Planned |
| UC_AUTH_06 | Forgot Password (Quên mật khẩu - Web) | `TC-UC_AUTH_06-03` Invalid token – Use tampered token and expect invalid/expired response. | Planned |
| UC_AUTH_06 | Forgot Password (Quên mật khẩu - Web) | `TC-UC_AUTH_06-04` Expired token – Try resetting after expiry threshold and expect denial. | Planned |
| UC_AUTH_06 | Forgot Password (Quên mật khẩu - Web) | `TC-UC_AUTH_06-05` Rate limit – Trigger throttling by requesting resets repeatedly. | Planned |
| UC_MU_01 | View User Details (Xem danh sách & chi tiết người dùng) | `TC-UC_MU_01-01` Default list – Load View User Details (Xem danh sách & chi tiết người dùng) without filters shows paginated data. | Planned |
| UC_MU_01 | View User Details (Xem danh sách & chi tiết người dùng) | `TC-UC_MU_01-02` Filter search – Apply combined filters and verify results match criteria. | Planned |
| UC_MU_01 | View User Details (Xem danh sách & chi tiết người dùng) | `TC-UC_MU_01-03` Empty state – Search with no matches and ensure friendly empty-state message. | Planned |
| UC_MU_01 | View User Details (Xem danh sách & chi tiết người dùng) | `TC-UC_MU_01-04` Unauthorized – Access View User Details (Xem danh sách & chi tiết người dùng) with insufficient role and expect 403. | Planned |
| UC_MU_01 | View User Details (Xem danh sách & chi tiết người dùng) | `TC-UC_MU_01-05` Pagination edge – Navigate to last page where remaining records < page size. | Planned |
| UC_MU_02 | Add New User (Thêm người dùng mới - nhân viên) | `TC-UC_MU_02-01` Happy path – Complete Add New User (Thêm người dùng mới - nhân viên) with valid unique data and verify persistence. | Planned |
| UC_MU_02 | Add New User (Thêm người dùng mới - nhân viên) | `TC-UC_MU_02-02` Missing required – Omit mandatory fields and ensure validation blocks save. | Planned |
| UC_MU_02 | Add New User (Thêm người dùng mới - nhân viên) | `TC-UC_MU_02-03` Duplicate detection – Attempt Add New User (Thêm người dùng mới - nhân viên) with data that violates uniqueness. | Planned |
| UC_MU_02 | Add New User (Thêm người dùng mới - nhân viên) | `TC-UC_MU_02-04` Business rule – Provide values outside allowed range and expect rejection. | Planned |
| UC_MU_02 | Add New User (Thêm người dùng mới - nhân viên) | `TC-UC_MU_02-05` Rollback – Simulate DB failure to ensure transaction rolls back. | Planned |
| UC_MU_03 | Edit User (Sửa thông tin người dùng) | `TC-UC_MU_03-01` Happy path – Update existing record via Edit User (Sửa thông tin người dùng) and verify persisted changes. | Planned |
| UC_MU_03 | Edit User (Sửa thông tin người dùng) | `TC-UC_MU_03-02` Validation – Enter invalid data (e.g., negative numbers) and expect inline errors. | Planned |
| UC_MU_03 | Edit User (Sửa thông tin người dùng) | `TC-UC_MU_03-03` Duplicate – Change key field to value already used elsewhere and ensure rejection. | Planned |
| UC_MU_03 | Edit User (Sửa thông tin người dùng) | `TC-UC_MU_03-04` Concurrent – Handle simultaneous edits by detecting stale version. | Planned |
| UC_MU_03 | Edit User (Sửa thông tin người dùng) | `TC-UC_MU_03-05` Unauthorized – Attempt Edit User (Sửa thông tin người dùng) without required role and expect 403. | Planned |
| UC_MU_04 | Delete User (Xóa người dùng) | `TC-UC_MU_04-01` Happy path – Delete target entity via Delete User (Xóa người dùng) when no dependencies exist. | Planned |
| UC_MU_04 | Delete User (Xóa người dùng) | `TC-UC_MU_04-02` Has dependencies – Prevent deletion when related records exist and show message. | Planned |
| UC_MU_04 | Delete User (Xóa người dùng) | `TC-UC_MU_04-03` Cancel – Select delete but cancel confirmation leaves record intact. | Planned |
| UC_MU_04 | Delete User (Xóa người dùng) | `TC-UC_MU_04-04` Unauthorized – Attempt Delete User (Xóa người dùng) without permission and expect 403. | Planned |
| UC_MU_04 | Delete User (Xóa người dùng) | `TC-UC_MU_04-05` DB failure – Simulate deletion failure and ensure error message displayed. | Planned |
| UC_MP_01 | View Permission Group Details (Xem danh sách & chi tiết nhóm quyền) | `TC-UC_MP_01-01` Default list – Load View Permission Group Details (Xem danh sách & chi tiết nhóm quyền) without filters shows paginated data. | Planned |
| UC_MP_01 | View Permission Group Details (Xem danh sách & chi tiết nhóm quyền) | `TC-UC_MP_01-02` Filter search – Apply combined filters and verify results match criteria. | Planned |
| UC_MP_01 | View Permission Group Details (Xem danh sách & chi tiết nhóm quyền) | `TC-UC_MP_01-03` Empty state – Search with no matches and ensure friendly empty-state message. | Planned |
| UC_MP_01 | View Permission Group Details (Xem danh sách & chi tiết nhóm quyền) | `TC-UC_MP_01-04` Unauthorized – Access View Permission Group Details (Xem danh sách & chi tiết nhóm quyền) with insufficient role and expect 403. | Planned |
| UC_MP_01 | View Permission Group Details (Xem danh sách & chi tiết nhóm quyền) | `TC-UC_MP_01-05` Pagination edge – Navigate to last page where remaining records < page size. | Planned |
| UC_MP_02 | Add New Permission Group (Thêm nhóm quyền mới) | `TC-UC_MP_02-01` Happy path – Complete Add New Permission Group (Thêm nhóm quyền mới) with valid unique data and verify persistence. | Planned |
| UC_MP_02 | Add New Permission Group (Thêm nhóm quyền mới) | `TC-UC_MP_02-02` Missing required – Omit mandatory fields and ensure validation blocks save. | Planned |
| UC_MP_02 | Add New Permission Group (Thêm nhóm quyền mới) | `TC-UC_MP_02-03` Duplicate detection – Attempt Add New Permission Group (Thêm nhóm quyền mới) with data that violates uniqueness. | Planned |
| UC_MP_02 | Add New Permission Group (Thêm nhóm quyền mới) | `TC-UC_MP_02-04` Business rule – Provide values outside allowed range and expect rejection. | Planned |
| UC_MP_02 | Add New Permission Group (Thêm nhóm quyền mới) | `TC-UC_MP_02-05` Rollback – Simulate DB failure to ensure transaction rolls back. | Planned |
| UC_MP_03 | Edit Permission Group (Sửa nhóm quyền - Tên & Quyền) | `TC-UC_MP_03-01` Happy path – Update existing record via Edit Permission Group (Sửa nhóm quyền - Tên & Quyền) and verify persisted changes. | Planned |
| UC_MP_03 | Edit Permission Group (Sửa nhóm quyền - Tên & Quyền) | `TC-UC_MP_03-02` Validation – Enter invalid data (e.g., negative numbers) and expect inline errors. | Planned |
| UC_MP_03 | Edit Permission Group (Sửa nhóm quyền - Tên & Quyền) | `TC-UC_MP_03-03` Duplicate – Change key field to value already used elsewhere and ensure rejection. | Planned |
| UC_MP_03 | Edit Permission Group (Sửa nhóm quyền - Tên & Quyền) | `TC-UC_MP_03-04` Concurrent – Handle simultaneous edits by detecting stale version. | Planned |
| UC_MP_03 | Edit Permission Group (Sửa nhóm quyền - Tên & Quyền) | `TC-UC_MP_03-05` Unauthorized – Attempt Edit Permission Group (Sửa nhóm quyền - Tên & Quyền) without required role and expect 403. | Planned |
| UC_MP_04 | Delete Permission Group (Xóa nhóm quyền) | `TC-UC_MP_04-01` Happy path – Delete target entity via Delete Permission Group (Xóa nhóm quyền) when no dependencies exist. | Planned |
| UC_MP_04 | Delete Permission Group (Xóa nhóm quyền) | `TC-UC_MP_04-02` Has dependencies – Prevent deletion when related records exist and show message. | Planned |
| UC_MP_04 | Delete Permission Group (Xóa nhóm quyền) | `TC-UC_MP_04-03` Cancel – Select delete but cancel confirmation leaves record intact. | Planned |
| UC_MP_04 | Delete Permission Group (Xóa nhóm quyền) | `TC-UC_MP_04-04` Unauthorized – Attempt Delete Permission Group (Xóa nhóm quyền) without permission and expect 403. | Planned |
| UC_MP_04 | Delete Permission Group (Xóa nhóm quyền) | `TC-UC_MP_04-05` DB failure – Simulate deletion failure and ensure error message displayed. | Planned |
| UC_MH_01 | View Hall Details (Xem danh sách & chi tiết Sảnh) | `TC-UC_MH_01-01` Default list – Load View Hall Details (Xem danh sách & chi tiết Sảnh) without filters shows paginated data. | Planned |
| UC_MH_01 | View Hall Details (Xem danh sách & chi tiết Sảnh) | `TC-UC_MH_01-02` Filter search – Apply combined filters and verify results match criteria. | Planned |
| UC_MH_01 | View Hall Details (Xem danh sách & chi tiết Sảnh) | `TC-UC_MH_01-03` Empty state – Search with no matches and ensure friendly empty-state message. | Planned |
| UC_MH_01 | View Hall Details (Xem danh sách & chi tiết Sảnh) | `TC-UC_MH_01-04` Unauthorized – Access View Hall Details (Xem danh sách & chi tiết Sảnh) with insufficient role and expect 403. | Planned |
| UC_MH_01 | View Hall Details (Xem danh sách & chi tiết Sảnh) | `TC-UC_MH_01-05` Pagination edge – Navigate to last page where remaining records < page size. | Planned |
| UC_MH_02 | Add New Hall (Thêm Sảnh mới) | `TC-UC_MH_02-01` Happy path – Complete Add New Hall (Thêm Sảnh mới) with valid unique data and verify persistence. | Planned |
| UC_MH_02 | Add New Hall (Thêm Sảnh mới) | `TC-UC_MH_02-02` Missing required – Omit mandatory fields and ensure validation blocks save. | Planned |
| UC_MH_02 | Add New Hall (Thêm Sảnh mới) | `TC-UC_MH_02-03` Duplicate detection – Attempt Add New Hall (Thêm Sảnh mới) with data that violates uniqueness. | Planned |
| UC_MH_02 | Add New Hall (Thêm Sảnh mới) | `TC-UC_MH_02-04` Business rule – Provide values outside allowed range and expect rejection. | Planned |
| UC_MH_02 | Add New Hall (Thêm Sảnh mới) | `TC-UC_MH_02-05` Rollback – Simulate DB failure to ensure transaction rolls back. | Planned |
| UC_MH_03 | Edit Hall (Sửa thông tin Sảnh) | `TC-UC_MH_03-01` Happy path – Update existing record via Edit Hall (Sửa thông tin Sảnh) and verify persisted changes. | Planned |
| UC_MH_03 | Edit Hall (Sửa thông tin Sảnh) | `TC-UC_MH_03-02` Validation – Enter invalid data (e.g., negative numbers) and expect inline errors. | Planned |
| UC_MH_03 | Edit Hall (Sửa thông tin Sảnh) | `TC-UC_MH_03-03` Duplicate – Change key field to value already used elsewhere and ensure rejection. | Planned |
| UC_MH_03 | Edit Hall (Sửa thông tin Sảnh) | `TC-UC_MH_03-04` Concurrent – Handle simultaneous edits by detecting stale version. | Planned |
| UC_MH_03 | Edit Hall (Sửa thông tin Sảnh) | `TC-UC_MH_03-05` Unauthorized – Attempt Edit Hall (Sửa thông tin Sảnh) without required role and expect 403. | Planned |
| UC_MH_04 | Delete Hall (Xóa Sảnh) | `TC-UC_MH_04-01` Happy path – Delete target entity via Delete Hall (Xóa Sảnh) when no dependencies exist. | Planned |
| UC_MH_04 | Delete Hall (Xóa Sảnh) | `TC-UC_MH_04-02` Has dependencies – Prevent deletion when related records exist and show message. | Planned |
| UC_MH_04 | Delete Hall (Xóa Sảnh) | `TC-UC_MH_04-03` Cancel – Select delete but cancel confirmation leaves record intact. | Planned |
| UC_MH_04 | Delete Hall (Xóa Sảnh) | `TC-UC_MH_04-04` Unauthorized – Attempt Delete Hall (Xóa Sảnh) without permission and expect 403. | Planned |
| UC_MH_04 | Delete Hall (Xóa Sảnh) | `TC-UC_MH_04-05` DB failure – Simulate deletion failure and ensure error message displayed. | Planned |
| UC_MH_05 | Export Halls to Excel (Xuất danh sách Sảnh ra Excel) | `TC-UC_MH_05-01` Happy path – Export Export Halls to Excel (Xuất danh sách Sảnh ra Excel) to file and verify schema/format. | Planned |
| UC_MH_05 | Export Halls to Excel (Xuất danh sách Sảnh ra Excel) | `TC-UC_MH_05-02` Filtered export – Export with active filters and ensure dataset respects criteria. | Planned |
| UC_MH_05 | Export Halls to Excel (Xuất danh sách Sảnh ra Excel) | `TC-UC_MH_05-03` Large dataset – Export >10k rows and ensure streaming/timeout handling. | Planned |
| UC_MH_05 | Export Halls to Excel (Xuất danh sách Sảnh ra Excel) | `TC-UC_MH_05-04` Unauthorized – Attempt export without proper role and expect 403. | Planned |
| UC_MH_05 | Export Halls to Excel (Xuất danh sách Sảnh ra Excel) | `TC-UC_MH_05-05` Corrupt template – Handle template/IO failure gracefully with error. | Planned |
| UC_MHT_01 | View Hall Type Details (Xem danh sách & chi tiết Loại Sảnh) | `TC-UC_MHT_01-01` Default list – Load View Hall Type Details (Xem danh sách & chi tiết Loại Sảnh) without filters shows paginated data. | Planned |
| UC_MHT_01 | View Hall Type Details (Xem danh sách & chi tiết Loại Sảnh) | `TC-UC_MHT_01-02` Filter search – Apply combined filters and verify results match criteria. | Planned |
| UC_MHT_01 | View Hall Type Details (Xem danh sách & chi tiết Loại Sảnh) | `TC-UC_MHT_01-03` Empty state – Search with no matches and ensure friendly empty-state message. | Planned |
| UC_MHT_01 | View Hall Type Details (Xem danh sách & chi tiết Loại Sảnh) | `TC-UC_MHT_01-04` Unauthorized – Access View Hall Type Details (Xem danh sách & chi tiết Loại Sảnh) with insufficient role and expect 403. | Planned |
| UC_MHT_01 | View Hall Type Details (Xem danh sách & chi tiết Loại Sảnh) | `TC-UC_MHT_01-05` Pagination edge – Navigate to last page where remaining records < page size. | Planned |
| UC_MHT_02 | Add New Hall Type (Thêm Loại Sảnh mới) | `TC-UC_MHT_02-01` Happy path – Complete Add New Hall Type (Thêm Loại Sảnh mới) with valid unique data and verify persistence. | Planned |
| UC_MHT_02 | Add New Hall Type (Thêm Loại Sảnh mới) | `TC-UC_MHT_02-02` Missing required – Omit mandatory fields and ensure validation blocks save. | Planned |
| UC_MHT_02 | Add New Hall Type (Thêm Loại Sảnh mới) | `TC-UC_MHT_02-03` Duplicate detection – Attempt Add New Hall Type (Thêm Loại Sảnh mới) with data that violates uniqueness. | Planned |
| UC_MHT_02 | Add New Hall Type (Thêm Loại Sảnh mới) | `TC-UC_MHT_02-04` Business rule – Provide values outside allowed range and expect rejection. | Planned |
| UC_MHT_02 | Add New Hall Type (Thêm Loại Sảnh mới) | `TC-UC_MHT_02-05` Rollback – Simulate DB failure to ensure transaction rolls back. | Planned |
| UC_MHT_03 | Edit Hall Type (Sửa Loại Sảnh & Đơn giá tối thiểu) | `TC-UC_MHT_03-01` Happy path – Update existing record via Edit Hall Type (Sửa Loại Sảnh & Đơn giá tối thiểu) and verify persisted changes. | Planned |
| UC_MHT_03 | Edit Hall Type (Sửa Loại Sảnh & Đơn giá tối thiểu) | `TC-UC_MHT_03-02` Validation – Enter invalid data (e.g., negative numbers) and expect inline errors. | Planned |
| UC_MHT_03 | Edit Hall Type (Sửa Loại Sảnh & Đơn giá tối thiểu) | `TC-UC_MHT_03-03` Duplicate – Change key field to value already used elsewhere and ensure rejection. | Planned |
| UC_MHT_03 | Edit Hall Type (Sửa Loại Sảnh & Đơn giá tối thiểu) | `TC-UC_MHT_03-04` Concurrent – Handle simultaneous edits by detecting stale version. | Planned |
| UC_MHT_03 | Edit Hall Type (Sửa Loại Sảnh & Đơn giá tối thiểu) | `TC-UC_MHT_03-05` Unauthorized – Attempt Edit Hall Type (Sửa Loại Sảnh & Đơn giá tối thiểu) without required role and expect 403. | Planned |
| UC_MHT_04 | Delete Hall Type (Xóa Loại Sảnh) | `TC-UC_MHT_04-01` Happy path – Delete target entity via Delete Hall Type (Xóa Loại Sảnh) when no dependencies exist. | Planned |
| UC_MHT_04 | Delete Hall Type (Xóa Loại Sảnh) | `TC-UC_MHT_04-02` Has dependencies – Prevent deletion when related records exist and show message. | Planned |
| UC_MHT_04 | Delete Hall Type (Xóa Loại Sảnh) | `TC-UC_MHT_04-03` Cancel – Select delete but cancel confirmation leaves record intact. | Planned |
| UC_MHT_04 | Delete Hall Type (Xóa Loại Sảnh) | `TC-UC_MHT_04-04` Unauthorized – Attempt Delete Hall Type (Xóa Loại Sảnh) without permission and expect 403. | Planned |
| UC_MHT_04 | Delete Hall Type (Xóa Loại Sảnh) | `TC-UC_MHT_04-05` DB failure – Simulate deletion failure and ensure error message displayed. | Planned |
| UC_MHT_05 | Export Hall Types to Excel (Xuất danh sách Loại Sảnh ra Excel) | `TC-UC_MHT_05-01` Happy path – Export Export Hall Types to Excel (Xuất danh sách Loại Sảnh ra Excel) to file and verify schema/format. | Planned |
| UC_MHT_05 | Export Hall Types to Excel (Xuất danh sách Loại Sảnh ra Excel) | `TC-UC_MHT_05-02` Filtered export – Export with active filters and ensure dataset respects criteria. | Planned |
| UC_MHT_05 | Export Hall Types to Excel (Xuất danh sách Loại Sảnh ra Excel) | `TC-UC_MHT_05-03` Large dataset – Export >10k rows and ensure streaming/timeout handling. | Planned |
| UC_MHT_05 | Export Hall Types to Excel (Xuất danh sách Loại Sảnh ra Excel) | `TC-UC_MHT_05-04` Unauthorized – Attempt export without proper role and expect 403. | Planned |
| UC_MHT_05 | Export Hall Types to Excel (Xuất danh sách Loại Sảnh ra Excel) | `TC-UC_MHT_05-05` Corrupt template – Handle template/IO failure gracefully with error. | Planned |
| UC_MS_01 | View Service Details (Xem danh sách & chi tiết Dịch vụ) | `TC-UC_MS_01-01` Default list – Load View Service Details (Xem danh sách & chi tiết Dịch vụ) without filters shows paginated data. | Planned |
| UC_MS_01 | View Service Details (Xem danh sách & chi tiết Dịch vụ) | `TC-UC_MS_01-02` Filter search – Apply combined filters and verify results match criteria. | Planned |
| UC_MS_01 | View Service Details (Xem danh sách & chi tiết Dịch vụ) | `TC-UC_MS_01-03` Empty state – Search with no matches and ensure friendly empty-state message. | Planned |
| UC_MS_01 | View Service Details (Xem danh sách & chi tiết Dịch vụ) | `TC-UC_MS_01-04` Unauthorized – Access View Service Details (Xem danh sách & chi tiết Dịch vụ) with insufficient role and expect 403. | Planned |
| UC_MS_01 | View Service Details (Xem danh sách & chi tiết Dịch vụ) | `TC-UC_MS_01-05` Pagination edge – Navigate to last page where remaining records < page size. | Planned |
| UC_MS_02 | Add New Service (Thêm Dịch vụ mới) | `TC-UC_MS_02-01` Happy path – Complete Add New Service (Thêm Dịch vụ mới) with valid unique data and verify persistence. | Planned |
| UC_MS_02 | Add New Service (Thêm Dịch vụ mới) | `TC-UC_MS_02-02` Missing required – Omit mandatory fields and ensure validation blocks save. | Planned |
| UC_MS_02 | Add New Service (Thêm Dịch vụ mới) | `TC-UC_MS_02-03` Duplicate detection – Attempt Add New Service (Thêm Dịch vụ mới) with data that violates uniqueness. | Planned |
| UC_MS_02 | Add New Service (Thêm Dịch vụ mới) | `TC-UC_MS_02-04` Business rule – Provide values outside allowed range and expect rejection. | Planned |
| UC_MS_02 | Add New Service (Thêm Dịch vụ mới) | `TC-UC_MS_02-05` Rollback – Simulate DB failure to ensure transaction rolls back. | Planned |
| UC_MS_03 | Edit Service (Sửa thông tin Dịch vụ) | `TC-UC_MS_03-01` Happy path – Update existing record via Edit Service (Sửa thông tin Dịch vụ) and verify persisted changes. | Planned |
| UC_MS_03 | Edit Service (Sửa thông tin Dịch vụ) | `TC-UC_MS_03-02` Validation – Enter invalid data (e.g., negative numbers) and expect inline errors. | Planned |
| UC_MS_03 | Edit Service (Sửa thông tin Dịch vụ) | `TC-UC_MS_03-03` Duplicate – Change key field to value already used elsewhere and ensure rejection. | Planned |
| UC_MS_03 | Edit Service (Sửa thông tin Dịch vụ) | `TC-UC_MS_03-04` Concurrent – Handle simultaneous edits by detecting stale version. | Planned |
| UC_MS_03 | Edit Service (Sửa thông tin Dịch vụ) | `TC-UC_MS_03-05` Unauthorized – Attempt Edit Service (Sửa thông tin Dịch vụ) without required role and expect 403. | Planned |
| UC_MS_04 | Delete Service (Xóa Dịch vụ) | `TC-UC_MS_04-01` Happy path – Delete target entity via Delete Service (Xóa Dịch vụ) when no dependencies exist. | Planned |
| UC_MS_04 | Delete Service (Xóa Dịch vụ) | `TC-UC_MS_04-02` Has dependencies – Prevent deletion when related records exist and show message. | Planned |
| UC_MS_04 | Delete Service (Xóa Dịch vụ) | `TC-UC_MS_04-03` Cancel – Select delete but cancel confirmation leaves record intact. | Planned |
| UC_MS_04 | Delete Service (Xóa Dịch vụ) | `TC-UC_MS_04-04` Unauthorized – Attempt Delete Service (Xóa Dịch vụ) without permission and expect 403. | Planned |
| UC_MS_04 | Delete Service (Xóa Dịch vụ) | `TC-UC_MS_04-05` DB failure – Simulate deletion failure and ensure error message displayed. | Planned |
| UC_MS_05 | Export Services to Excel (Xuất danh sách Dịch vụ ra Excel) | `TC-UC_MS_05-01` Happy path – Export Export Services to Excel (Xuất danh sách Dịch vụ ra Excel) to file and verify schema/format. | Planned |
| UC_MS_05 | Export Services to Excel (Xuất danh sách Dịch vụ ra Excel) | `TC-UC_MS_05-02` Filtered export – Export with active filters and ensure dataset respects criteria. | Planned |
| UC_MS_05 | Export Services to Excel (Xuất danh sách Dịch vụ ra Excel) | `TC-UC_MS_05-03` Large dataset – Export >10k rows and ensure streaming/timeout handling. | Planned |
| UC_MS_05 | Export Services to Excel (Xuất danh sách Dịch vụ ra Excel) | `TC-UC_MS_05-04` Unauthorized – Attempt export without proper role and expect 403. | Planned |
| UC_MS_05 | Export Services to Excel (Xuất danh sách Dịch vụ ra Excel) | `TC-UC_MS_05-05` Corrupt template – Handle template/IO failure gracefully with error. | Planned |
| UC_MM_01 | View Dish Details (Xem danh sách & chi tiết Món ăn) | `TC-UC_MM_01-01` Default list – Load View Dish Details (Xem danh sách & chi tiết Món ăn) without filters shows paginated data. | Planned |
| UC_MM_01 | View Dish Details (Xem danh sách & chi tiết Món ăn) | `TC-UC_MM_01-02` Filter search – Apply combined filters and verify results match criteria. | Planned |
| UC_MM_01 | View Dish Details (Xem danh sách & chi tiết Món ăn) | `TC-UC_MM_01-03` Empty state – Search with no matches and ensure friendly empty-state message. | Planned |
| UC_MM_01 | View Dish Details (Xem danh sách & chi tiết Món ăn) | `TC-UC_MM_01-04` Unauthorized – Access View Dish Details (Xem danh sách & chi tiết Món ăn) with insufficient role and expect 403. | Planned |
| UC_MM_01 | View Dish Details (Xem danh sách & chi tiết Món ăn) | `TC-UC_MM_01-05` Pagination edge – Navigate to last page where remaining records < page size. | Planned |
| UC_MM_02 | Add New Dish (Thêm Món ăn mới) | `TC-UC_MM_02-01` Happy path – Complete Add New Dish (Thêm Món ăn mới) with valid unique data and verify persistence. | Planned |
| UC_MM_02 | Add New Dish (Thêm Món ăn mới) | `TC-UC_MM_02-02` Missing required – Omit mandatory fields and ensure validation blocks save. | Planned |
| UC_MM_02 | Add New Dish (Thêm Món ăn mới) | `TC-UC_MM_02-03` Duplicate detection – Attempt Add New Dish (Thêm Món ăn mới) with data that violates uniqueness. | Planned |
| UC_MM_02 | Add New Dish (Thêm Món ăn mới) | `TC-UC_MM_02-04` Business rule – Provide values outside allowed range and expect rejection. | Planned |
| UC_MM_02 | Add New Dish (Thêm Món ăn mới) | `TC-UC_MM_02-05` Rollback – Simulate DB failure to ensure transaction rolls back. | Planned |
| UC_MM_03 | Edit Dish (Sửa thông tin Món ăn) | `TC-UC_MM_03-01` Happy path – Update existing record via Edit Dish (Sửa thông tin Món ăn) and verify persisted changes. | Planned |
| UC_MM_03 | Edit Dish (Sửa thông tin Món ăn) | `TC-UC_MM_03-02` Validation – Enter invalid data (e.g., negative numbers) and expect inline errors. | Planned |
| UC_MM_03 | Edit Dish (Sửa thông tin Món ăn) | `TC-UC_MM_03-03` Duplicate – Change key field to value already used elsewhere and ensure rejection. | Planned |
| UC_MM_03 | Edit Dish (Sửa thông tin Món ăn) | `TC-UC_MM_03-04` Concurrent – Handle simultaneous edits by detecting stale version. | Planned |
| UC_MM_03 | Edit Dish (Sửa thông tin Món ăn) | `TC-UC_MM_03-05` Unauthorized – Attempt Edit Dish (Sửa thông tin Món ăn) without required role and expect 403. | Planned |
| UC_MM_04 | Delete Dish (Xóa Món ăn) | `TC-UC_MM_04-01` Happy path – Delete target entity via Delete Dish (Xóa Món ăn) when no dependencies exist. | Planned |
| UC_MM_04 | Delete Dish (Xóa Món ăn) | `TC-UC_MM_04-02` Has dependencies – Prevent deletion when related records exist and show message. | Planned |
| UC_MM_04 | Delete Dish (Xóa Món ăn) | `TC-UC_MM_04-03` Cancel – Select delete but cancel confirmation leaves record intact. | Planned |
| UC_MM_04 | Delete Dish (Xóa Món ăn) | `TC-UC_MM_04-04` Unauthorized – Attempt Delete Dish (Xóa Món ăn) without permission and expect 403. | Planned |
| UC_MM_04 | Delete Dish (Xóa Món ăn) | `TC-UC_MM_04-05` DB failure – Simulate deletion failure and ensure error message displayed. | Planned |
| UC_MM_05 | Export Dishes to Excel (Xuất danh sách Món ăn ra Excel) | `TC-UC_MM_05-01` Happy path – Export Export Dishes to Excel (Xuất danh sách Món ăn ra Excel) to file and verify schema/format. | Planned |
| UC_MM_05 | Export Dishes to Excel (Xuất danh sách Món ăn ra Excel) | `TC-UC_MM_05-02` Filtered export – Export with active filters and ensure dataset respects criteria. | Planned |
| UC_MM_05 | Export Dishes to Excel (Xuất danh sách Món ăn ra Excel) | `TC-UC_MM_05-03` Large dataset – Export >10k rows and ensure streaming/timeout handling. | Planned |
| UC_MM_05 | Export Dishes to Excel (Xuất danh sách Món ăn ra Excel) | `TC-UC_MM_05-04` Unauthorized – Attempt export without proper role and expect 403. | Planned |
| UC_MM_05 | Export Dishes to Excel (Xuất danh sách Món ăn ra Excel) | `TC-UC_MM_05-05` Corrupt template – Handle template/IO failure gracefully with error. | Planned |
| UC_MSH_01 | View Shift Details (Xem danh sách & chi tiết Ca) | `TC-UC_MSH_01-01` Default list – Load View Shift Details (Xem danh sách & chi tiết Ca) without filters shows paginated data. | Planned |
| UC_MSH_01 | View Shift Details (Xem danh sách & chi tiết Ca) | `TC-UC_MSH_01-02` Filter search – Apply combined filters and verify results match criteria. | Planned |
| UC_MSH_01 | View Shift Details (Xem danh sách & chi tiết Ca) | `TC-UC_MSH_01-03` Empty state – Search with no matches and ensure friendly empty-state message. | Planned |
| UC_MSH_01 | View Shift Details (Xem danh sách & chi tiết Ca) | `TC-UC_MSH_01-04` Unauthorized – Access View Shift Details (Xem danh sách & chi tiết Ca) with insufficient role and expect 403. | Planned |
| UC_MSH_01 | View Shift Details (Xem danh sách & chi tiết Ca) | `TC-UC_MSH_01-05` Pagination edge – Navigate to last page where remaining records < page size. | Planned |
| UC_MSH_02 | Add New Shift (Thêm Ca tổ chức mới) | `TC-UC_MSH_02-01` Happy path – Complete Add New Shift (Thêm Ca tổ chức mới) with valid unique data and verify persistence. | Planned |
| UC_MSH_02 | Add New Shift (Thêm Ca tổ chức mới) | `TC-UC_MSH_02-02` Missing required – Omit mandatory fields and ensure validation blocks save. | Planned |
| UC_MSH_02 | Add New Shift (Thêm Ca tổ chức mới) | `TC-UC_MSH_02-03` Duplicate detection – Attempt Add New Shift (Thêm Ca tổ chức mới) with data that violates uniqueness. | Planned |
| UC_MSH_02 | Add New Shift (Thêm Ca tổ chức mới) | `TC-UC_MSH_02-04` Business rule – Provide values outside allowed range and expect rejection. | Planned |
| UC_MSH_02 | Add New Shift (Thêm Ca tổ chức mới) | `TC-UC_MSH_02-05` Rollback – Simulate DB failure to ensure transaction rolls back. | Planned |
| UC_MSH_03 | Edit Shift (Sửa thông tin Ca tổ chức) | `TC-UC_MSH_03-01` Happy path – Update existing record via Edit Shift (Sửa thông tin Ca tổ chức) and verify persisted changes. | Planned |
| UC_MSH_03 | Edit Shift (Sửa thông tin Ca tổ chức) | `TC-UC_MSH_03-02` Validation – Enter invalid data (e.g., negative numbers) and expect inline errors. | Planned |
| UC_MSH_03 | Edit Shift (Sửa thông tin Ca tổ chức) | `TC-UC_MSH_03-03` Duplicate – Change key field to value already used elsewhere and ensure rejection. | Planned |
| UC_MSH_03 | Edit Shift (Sửa thông tin Ca tổ chức) | `TC-UC_MSH_03-04` Concurrent – Handle simultaneous edits by detecting stale version. | Planned |
| UC_MSH_03 | Edit Shift (Sửa thông tin Ca tổ chức) | `TC-UC_MSH_03-05` Unauthorized – Attempt Edit Shift (Sửa thông tin Ca tổ chức) without required role and expect 403. | Planned |
| UC_MSH_04 | Delete Shift (Xóa Ca tổ chức) | `TC-UC_MSH_04-01` Happy path – Delete target entity via Delete Shift (Xóa Ca tổ chức) when no dependencies exist. | Planned |
| UC_MSH_04 | Delete Shift (Xóa Ca tổ chức) | `TC-UC_MSH_04-02` Has dependencies – Prevent deletion when related records exist and show message. | Planned |
| UC_MSH_04 | Delete Shift (Xóa Ca tổ chức) | `TC-UC_MSH_04-03` Cancel – Select delete but cancel confirmation leaves record intact. | Planned |
| UC_MSH_04 | Delete Shift (Xóa Ca tổ chức) | `TC-UC_MSH_04-04` Unauthorized – Attempt Delete Shift (Xóa Ca tổ chức) without permission and expect 403. | Planned |
| UC_MSH_04 | Delete Shift (Xóa Ca tổ chức) | `TC-UC_MSH_04-05` DB failure – Simulate deletion failure and ensure error message displayed. | Planned |
| UC_MSH_05 | Export Shifts to Excel (Xuất danh sách Ca ra Excel) | `TC-UC_MSH_05-01` Happy path – Export Export Shifts to Excel (Xuất danh sách Ca ra Excel) to file and verify schema/format. | Planned |
| UC_MSH_05 | Export Shifts to Excel (Xuất danh sách Ca ra Excel) | `TC-UC_MSH_05-02` Filtered export – Export with active filters and ensure dataset respects criteria. | Planned |
| UC_MSH_05 | Export Shifts to Excel (Xuất danh sách Ca ra Excel) | `TC-UC_MSH_05-03` Large dataset – Export >10k rows and ensure streaming/timeout handling. | Planned |
| UC_MSH_05 | Export Shifts to Excel (Xuất danh sách Ca ra Excel) | `TC-UC_MSH_05-04` Unauthorized – Attempt export without proper role and expect 403. | Planned |
| UC_MSH_05 | Export Shifts to Excel (Xuất danh sách Ca ra Excel) | `TC-UC_MSH_05-05` Corrupt template – Handle template/IO failure gracefully with error. | Planned |
| UC 40 | Tra cứu lịch sảnh trống / Check Hall Availability | `TC-UC 40-01` Default list – Load Tra cứu lịch sảnh trống / Check Hall Availability without filters shows paginated data. | Planned |
| UC 40 | Tra cứu lịch sảnh trống / Check Hall Availability | `TC-UC 40-02` Filter search – Apply combined filters and verify results match criteria. | Planned |
| UC 40 | Tra cứu lịch sảnh trống / Check Hall Availability | `TC-UC 40-03` Empty state – Search with no matches and ensure friendly empty-state message. | Planned |
| UC 40 | Tra cứu lịch sảnh trống / Check Hall Availability | `TC-UC 40-04` Unauthorized – Access Tra cứu lịch sảnh trống / Check Hall Availability with insufficient role and expect 403. | Planned |
| UC 40 | Tra cứu lịch sảnh trống / Check Hall Availability | `TC-UC 40-05` Pagination edge – Navigate to last page where remaining records < page size. | Planned |
| UC 41 | Đặt tiệc cưới mới (Tạo phiếu đặt) / Submit Wedding Reservation | `TC-UC 41-01` Happy path – Complete Đặt tiệc cưới mới (Tạo phiếu đặt) / Submit Wedding Reservation with valid unique data and verify persistence. | Planned |
| UC 41 | Đặt tiệc cưới mới (Tạo phiếu đặt) / Submit Wedding Reservation | `TC-UC 41-02` Missing required – Omit mandatory fields and ensure validation blocks save. | Planned |
| UC 41 | Đặt tiệc cưới mới (Tạo phiếu đặt) / Submit Wedding Reservation | `TC-UC 41-03` Duplicate detection – Attempt Đặt tiệc cưới mới (Tạo phiếu đặt) / Submit Wedding Reservation with data that violates uniqueness. | Planned |
| UC 41 | Đặt tiệc cưới mới (Tạo phiếu đặt) / Submit Wedding Reservation | `TC-UC 41-04` Business rule – Provide values outside allowed range and expect rejection. | Planned |
| UC 41 | Đặt tiệc cưới mới (Tạo phiếu đặt) / Submit Wedding Reservation | `TC-UC 41-05` Rollback – Simulate DB failure to ensure transaction rolls back. | Planned |
| UC 42 | Xem chi tiết phiếu đặt của tôi / View My Booking Details | `TC-UC 42-01` Default list – Load Xem chi tiết phiếu đặt của tôi / View My Booking Details without filters shows paginated data. | Planned |
| UC 42 | Xem chi tiết phiếu đặt của tôi / View My Booking Details | `TC-UC 42-02` Filter search – Apply combined filters and verify results match criteria. | Planned |
| UC 42 | Xem chi tiết phiếu đặt của tôi / View My Booking Details | `TC-UC 42-03` Empty state – Search with no matches and ensure friendly empty-state message. | Planned |
| UC 42 | Xem chi tiết phiếu đặt của tôi / View My Booking Details | `TC-UC 42-04` Unauthorized – Access Xem chi tiết phiếu đặt của tôi / View My Booking Details with insufficient role and expect 403. | Planned |
| UC 42 | Xem chi tiết phiếu đặt của tôi / View My Booking Details | `TC-UC 42-05` Pagination edge – Navigate to last page where remaining records < page size. | Planned |
| UC 43 | Chỉnh sửa phiếu đặt của tôi (trước duyệt) / Edit My Booking Request | `TC-UC 43-01` Happy path – Update existing record via Chỉnh sửa phiếu đặt của tôi (trước duyệt) / Edit My Booking Request and verify persisted changes. | Planned |
| UC 43 | Chỉnh sửa phiếu đặt của tôi (trước duyệt) / Edit My Booking Request | `TC-UC 43-02` Validation – Enter invalid data (e.g., negative numbers) and expect inline errors. | Planned |
| UC 43 | Chỉnh sửa phiếu đặt của tôi (trước duyệt) / Edit My Booking Request | `TC-UC 43-03` Duplicate – Change key field to value already used elsewhere and ensure rejection. | Planned |
| UC 43 | Chỉnh sửa phiếu đặt của tôi (trước duyệt) / Edit My Booking Request | `TC-UC 43-04` Concurrent – Handle simultaneous edits by detecting stale version. | Planned |
| UC 43 | Chỉnh sửa phiếu đặt của tôi (trước duyệt) / Edit My Booking Request | `TC-UC 43-05` Unauthorized – Attempt Chỉnh sửa phiếu đặt của tôi (trước duyệt) / Edit My Booking Request without required role and expect 403. | Planned |
| UC 44 | Hủy phiếu đặt của tôi / Cancel My Booking | `TC-UC 44-01` Happy path – Delete target entity via Hủy phiếu đặt của tôi / Cancel My Booking when no dependencies exist. | Planned |
| UC 44 | Hủy phiếu đặt của tôi / Cancel My Booking | `TC-UC 44-02` Has dependencies – Prevent deletion when related records exist and show message. | Planned |
| UC 44 | Hủy phiếu đặt của tôi / Cancel My Booking | `TC-UC 44-03` Cancel – Select delete but cancel confirmation leaves record intact. | Planned |
| UC 44 | Hủy phiếu đặt của tôi / Cancel My Booking | `TC-UC 44-04` Unauthorized – Attempt Hủy phiếu đặt của tôi / Cancel My Booking without permission and expect 403. | Planned |
| UC 44 | Hủy phiếu đặt của tôi / Cancel My Booking | `TC-UC 44-05` DB failure – Simulate deletion failure and ensure error message displayed. | Planned |
| UC 45 | Tra cứu lịch sảnh trống (hệ thống) / Check System Hall Availability | `TC-UC 45-01` Default list – Load Tra cứu lịch sảnh trống (hệ thống) / Check System Hall Availability without filters shows paginated data. | Planned |
| UC 45 | Tra cứu lịch sảnh trống (hệ thống) / Check System Hall Availability | `TC-UC 45-02` Filter search – Apply combined filters and verify results match criteria. | Planned |
| UC 45 | Tra cứu lịch sảnh trống (hệ thống) / Check System Hall Availability | `TC-UC 45-03` Empty state – Search with no matches and ensure friendly empty-state message. | Planned |
| UC 45 | Tra cứu lịch sảnh trống (hệ thống) / Check System Hall Availability | `TC-UC 45-04` Unauthorized – Access Tra cứu lịch sảnh trống (hệ thống) / Check System Hall Availability with insufficient role and expect 403. | Planned |
| UC 45 | Tra cứu lịch sảnh trống (hệ thống) / Check System Hall Availability | `TC-UC 45-05` Pagination edge – Navigate to last page where remaining records < page size. | Planned |
| UC 46 | Tạo phiếu đặt tiệc (cho khách) / Create Booking for Customer | `TC-UC 46-01` Happy path – Complete Tạo phiếu đặt tiệc (cho khách) / Create Booking for Customer with valid unique data and verify persistence. | Planned |
| UC 46 | Tạo phiếu đặt tiệc (cho khách) / Create Booking for Customer | `TC-UC 46-02` Missing required – Omit mandatory fields and ensure validation blocks save. | Planned |
| UC 46 | Tạo phiếu đặt tiệc (cho khách) / Create Booking for Customer | `TC-UC 46-03` Duplicate detection – Attempt Tạo phiếu đặt tiệc (cho khách) / Create Booking for Customer with data that violates uniqueness. | Planned |
| UC 46 | Tạo phiếu đặt tiệc (cho khách) / Create Booking for Customer | `TC-UC 46-04` Business rule – Provide values outside allowed range and expect rejection. | Planned |
| UC 46 | Tạo phiếu đặt tiệc (cho khách) / Create Booking for Customer | `TC-UC 46-05` Rollback – Simulate DB failure to ensure transaction rolls back. | Planned |
| UC 47 | Xóa phiếu đặt / Delete Booking | `TC-UC 47-01` Happy path – Delete target entity via Xóa phiếu đặt / Delete Booking when no dependencies exist. | Planned |
| UC 47 | Xóa phiếu đặt / Delete Booking | `TC-UC 47-02` Has dependencies – Prevent deletion when related records exist and show message. | Planned |
| UC 47 | Xóa phiếu đặt / Delete Booking | `TC-UC 47-03` Cancel – Select delete but cancel confirmation leaves record intact. | Planned |
| UC 47 | Xóa phiếu đặt / Delete Booking | `TC-UC 47-04` Unauthorized – Attempt Xóa phiếu đặt / Delete Booking without permission and expect 403. | Planned |
| UC 47 | Xóa phiếu đặt / Delete Booking | `TC-UC 47-05` DB failure – Simulate deletion failure and ensure error message displayed. | Planned |
| UC 48 | Tra cứu & lọc danh sách phiếu đặt / Search/Filter All Bookings | `TC-UC 48-01` Default list – Load Tra cứu & lọc danh sách phiếu đặt / Search/Filter All Bookings without filters shows paginated data. | Planned |
| UC 48 | Tra cứu & lọc danh sách phiếu đặt / Search/Filter All Bookings | `TC-UC 48-02` Filter search – Apply combined filters and verify results match criteria. | Planned |
| UC 48 | Tra cứu & lọc danh sách phiếu đặt / Search/Filter All Bookings | `TC-UC 48-03` Empty state – Search with no matches and ensure friendly empty-state message. | Planned |
| UC 48 | Tra cứu & lọc danh sách phiếu đặt / Search/Filter All Bookings | `TC-UC 48-04` Unauthorized – Access Tra cứu & lọc danh sách phiếu đặt / Search/Filter All Bookings with insufficient role and expect 403. | Planned |
| UC 48 | Tra cứu & lọc danh sách phiếu đặt / Search/Filter All Bookings | `TC-UC 48-05` Pagination edge – Navigate to last page where remaining records < page size. | Planned |
| UC 49 | Xem chi tiết phiếu đặt bất kỳ / View Any Booking Details | `TC-UC 49-01` Default list – Load Xem chi tiết phiếu đặt bất kỳ / View Any Booking Details without filters shows paginated data. | Planned |
| UC 49 | Xem chi tiết phiếu đặt bất kỳ / View Any Booking Details | `TC-UC 49-02` Filter search – Apply combined filters and verify results match criteria. | Planned |
| UC 49 | Xem chi tiết phiếu đặt bất kỳ / View Any Booking Details | `TC-UC 49-03` Empty state – Search with no matches and ensure friendly empty-state message. | Planned |
| UC 49 | Xem chi tiết phiếu đặt bất kỳ / View Any Booking Details | `TC-UC 49-04` Unauthorized – Access Xem chi tiết phiếu đặt bất kỳ / View Any Booking Details with insufficient role and expect 403. | Planned |
| UC 49 | Xem chi tiết phiếu đặt bất kỳ / View Any Booking Details | `TC-UC 49-05` Pagination edge – Navigate to last page where remaining records < page size. | Planned |
| UC 50 | Chỉnh sửa phiếu đặt (Món/DV/Thông tin) / Modify Booking Details | `TC-UC 50-01` Happy path – Update existing record via Chỉnh sửa phiếu đặt (Món/DV/Thông tin) / Modify Booking Details and verify persisted changes. | Planned |
| UC 50 | Chỉnh sửa phiếu đặt (Món/DV/Thông tin) / Modify Booking Details | `TC-UC 50-02` Validation – Enter invalid data (e.g., negative numbers) and expect inline errors. | Planned |
| UC 50 | Chỉnh sửa phiếu đặt (Món/DV/Thông tin) / Modify Booking Details | `TC-UC 50-03` Duplicate – Change key field to value already used elsewhere and ensure rejection. | Planned |
| UC 50 | Chỉnh sửa phiếu đặt (Món/DV/Thông tin) / Modify Booking Details | `TC-UC 50-04` Concurrent – Handle simultaneous edits by detecting stale version. | Planned |
| UC 50 | Chỉnh sửa phiếu đặt (Món/DV/Thông tin) / Modify Booking Details | `TC-UC 50-05` Unauthorized – Attempt Chỉnh sửa phiếu đặt (Món/DV/Thông tin) / Modify Booking Details without required role and expect 403. | Planned |
| UC 51 | Xem hóa đơn của tôi & Công nợ / View My Invoice & Debt | `TC-UC 51-01` Happy path – Complete payment for Xem hóa đơn của tôi & Công nợ / View My Invoice & Debt with valid method and amounts. | Planned |
| UC 51 | Xem hóa đơn của tôi & Công nợ / View My Invoice & Debt | `TC-UC 51-02` Insufficient funds – Simulate payment method rejection and ensure invoice stays unpaid. | Planned |
| UC 51 | Xem hóa đơn của tôi & Công nợ / View My Invoice & Debt | `TC-UC 51-03` Penalty calc – Verify penalty calculation when paying after due date. | Planned |
| UC 51 | Xem hóa đơn của tôi & Công nợ / View My Invoice & Debt | `TC-UC 51-04` Duplicate payment – Prevent double submission of same payment request. | Planned |
| UC 51 | Xem hóa đơn của tôi & Công nợ / View My Invoice & Debt | `TC-UC 51-05` Gateway failure – Handle payment gateway timeout with retry prompt. | Planned |
| UC 52 | Thanh toán hóa đơn của tôi (Đặt cọc/Toàn bộ) / Pay My Invoice | `TC-UC 52-01` Happy path – Complete payment for Thanh toán hóa đơn của tôi (Đặt cọc/Toàn bộ) / Pay My Invoice with valid method and amounts. | Planned |
| UC 52 | Thanh toán hóa đơn của tôi (Đặt cọc/Toàn bộ) / Pay My Invoice | `TC-UC 52-02` Insufficient funds – Simulate payment method rejection and ensure invoice stays unpaid. | Planned |
| UC 52 | Thanh toán hóa đơn của tôi (Đặt cọc/Toàn bộ) / Pay My Invoice | `TC-UC 52-03` Penalty calc – Verify penalty calculation when paying after due date. | Planned |
| UC 52 | Thanh toán hóa đơn của tôi (Đặt cọc/Toàn bộ) / Pay My Invoice | `TC-UC 52-04` Duplicate payment – Prevent double submission of same payment request. | Planned |
| UC 52 | Thanh toán hóa đơn của tôi (Đặt cọc/Toàn bộ) / Pay My Invoice | `TC-UC 52-05` Gateway failure – Handle payment gateway timeout with retry prompt. | Planned |
| UC 53 | Xuất hóa đơn của tôi ra PDF / Export My Invoice to PDF | `TC-UC 53-01` Happy path – Export Xuất hóa đơn của tôi ra PDF / Export My Invoice to PDF to file and verify schema/format. | Planned |
| UC 53 | Xuất hóa đơn của tôi ra PDF / Export My Invoice to PDF | `TC-UC 53-02` Filtered export – Export with active filters and ensure dataset respects criteria. | Planned |
| UC 53 | Xuất hóa đơn của tôi ra PDF / Export My Invoice to PDF | `TC-UC 53-03` Large dataset – Export >10k rows and ensure streaming/timeout handling. | Planned |
| UC 53 | Xuất hóa đơn của tôi ra PDF / Export My Invoice to PDF | `TC-UC 53-04` Unauthorized – Attempt export without proper role and expect 403. | Planned |
| UC 53 | Xuất hóa đơn của tôi ra PDF / Export My Invoice to PDF | `TC-UC 53-05` Corrupt template – Handle template/IO failure gracefully with error. | Planned |
| UC 54 | Xem chi tiết hóa đơn bất kỳ & Công nợ / View Any Invoice & Debt | `TC-UC 54-01` Happy path – Complete payment for Xem chi tiết hóa đơn bất kỳ & Công nợ / View Any Invoice & Debt with valid method and amounts. | Planned |
| UC 54 | Xem chi tiết hóa đơn bất kỳ & Công nợ / View Any Invoice & Debt | `TC-UC 54-02` Insufficient funds – Simulate payment method rejection and ensure invoice stays unpaid. | Planned |
| UC 54 | Xem chi tiết hóa đơn bất kỳ & Công nợ / View Any Invoice & Debt | `TC-UC 54-03` Penalty calc – Verify penalty calculation when paying after due date. | Planned |
| UC 54 | Xem chi tiết hóa đơn bất kỳ & Công nợ / View Any Invoice & Debt | `TC-UC 54-04` Duplicate payment – Prevent double submission of same payment request. | Planned |
| UC 54 | Xem chi tiết hóa đơn bất kỳ & Công nợ / View Any Invoice & Debt | `TC-UC 54-05` Gateway failure – Handle payment gateway timeout with retry prompt. | Planned |
| UC 55 | Xác nhận thanh toán & Tính tiền phạt / Confirm Payment & Calculate Penalty | `TC-UC 55-01` Happy path – Complete payment for Xác nhận thanh toán & Tính tiền phạt / Confirm Payment & Calculate Penalty with valid method and amounts. | Planned |
| UC 55 | Xác nhận thanh toán & Tính tiền phạt / Confirm Payment & Calculate Penalty | `TC-UC 55-02` Insufficient funds – Simulate payment method rejection and ensure invoice stays unpaid. | Planned |
| UC 55 | Xác nhận thanh toán & Tính tiền phạt / Confirm Payment & Calculate Penalty | `TC-UC 55-03` Penalty calc – Verify penalty calculation when paying after due date. | Planned |
| UC 55 | Xác nhận thanh toán & Tính tiền phạt / Confirm Payment & Calculate Penalty | `TC-UC 55-04` Duplicate payment – Prevent double submission of same payment request. | Planned |
| UC 55 | Xác nhận thanh toán & Tính tiền phạt / Confirm Payment & Calculate Penalty | `TC-UC 55-05` Gateway failure – Handle payment gateway timeout with retry prompt. | Planned |
| UC 56 | Xuất hóa đơn bất kỳ ra PDF / Export Any Invoice to PDF | `TC-UC 56-01` Happy path – Export Xuất hóa đơn bất kỳ ra PDF / Export Any Invoice to PDF to file and verify schema/format. | Planned |
| UC 56 | Xuất hóa đơn bất kỳ ra PDF / Export Any Invoice to PDF | `TC-UC 56-02` Filtered export – Export with active filters and ensure dataset respects criteria. | Planned |
| UC 56 | Xuất hóa đơn bất kỳ ra PDF / Export Any Invoice to PDF | `TC-UC 56-03` Large dataset – Export >10k rows and ensure streaming/timeout handling. | Planned |
| UC 56 | Xuất hóa đơn bất kỳ ra PDF / Export Any Invoice to PDF | `TC-UC 56-04` Unauthorized – Attempt export without proper role and expect 403. | Planned |
| UC 56 | Xuất hóa đơn bất kỳ ra PDF / Export Any Invoice to PDF | `TC-UC 56-05` Corrupt template – Handle template/IO failure gracefully with error. | Planned |
| UC 57 | Xem biểu đồ doanh thu / View Revenue Chart | `TC-UC 57-01` Default list – Load Xem biểu đồ doanh thu / View Revenue Chart without filters shows paginated data. | Planned |
| UC 57 | Xem biểu đồ doanh thu / View Revenue Chart | `TC-UC 57-02` Filter search – Apply combined filters and verify results match criteria. | Planned |
| UC 57 | Xem biểu đồ doanh thu / View Revenue Chart | `TC-UC 57-03` Empty state – Search with no matches and ensure friendly empty-state message. | Planned |
| UC 57 | Xem biểu đồ doanh thu / View Revenue Chart | `TC-UC 57-04` Unauthorized – Access Xem biểu đồ doanh thu / View Revenue Chart with insufficient role and expect 403. | Planned |
| UC 57 | Xem biểu đồ doanh thu / View Revenue Chart | `TC-UC 57-05` Pagination edge – Navigate to last page where remaining records < page size. | Planned |
| UC 58 | Xuất báo cáo ra Excel / Export Report to Excel | `TC-UC 58-01` Happy path – Export Xuất báo cáo ra Excel / Export Report to Excel to file and verify schema/format. | Planned |
| UC 58 | Xuất báo cáo ra Excel / Export Report to Excel | `TC-UC 58-02` Filtered export – Export with active filters and ensure dataset respects criteria. | Planned |
| UC 58 | Xuất báo cáo ra Excel / Export Report to Excel | `TC-UC 58-03` Large dataset – Export >10k rows and ensure streaming/timeout handling. | Planned |
| UC 58 | Xuất báo cáo ra Excel / Export Report to Excel | `TC-UC 58-04` Unauthorized – Attempt export without proper role and expect 403. | Planned |
| UC 58 | Xuất báo cáo ra Excel / Export Report to Excel | `TC-UC 58-05` Corrupt template – Handle template/IO failure gracefully with error. | Planned |
| UC_SS_01 | Manage System Parameters (Thay đổi tham số/quy định hệ thống) | `TC-UC_SS_01-01` Happy path – Update parameters within allowed ranges and persist values. | Planned |
| UC_SS_01 | Manage System Parameters (Thay đổi tham số/quy định hệ thống) | `TC-UC_SS_01-02` Range validation – Enter penalty/deposit ratios outside 0-1 and expect errors. | Planned |
| UC_SS_01 | Manage System Parameters (Thay đổi tham số/quy định hệ thống) | `TC-UC_SS_01-03` Permission – Block non-admin attempting to change parameters. | Planned |
| UC_SS_01 | Manage System Parameters (Thay đổi tham số/quy định hệ thống) | `TC-UC_SS_01-04` Transaction rollback – Simulate failure updating one parameter and ensure none persist. | Planned |
| UC_SS_01 | Manage System Parameters (Thay đổi tham số/quy định hệ thống) | `TC-UC_SS_01-05` Audit trail – Verify update recorded in audit log with user and timestamp. | Planned |
