# SRS Compatibility Check Report

## WMS - Wedding Management System

**Generated:** November 30, 2025  
**SRS Version:** 1.8.0

---

## Summary

| Category                 | Total UCs | ✅ Full Match | ⚠️ Partial | ❌ No Match | 📝 Not Implemented |
| ------------------------ | --------- | ------------- | ---------- | ----------- | ------------------ |
| Authentication           | 5         | 4             | 0          | 0           | 1                  |
| System Management        | 9         | 9             | 0          | 0           | 0                  |
| Master Data - Halls      | 5         | 5             | 0          | 0           | 0                  |
| Master Data - Hall Types | 5         | 5             | 0          | 0           | 0                  |
| Master Data - Dishes     | 5         | 5             | 0          | 0           | 0                  |
| Master Data - Services   | 5         | 5             | 0          | 0           | 0                  |
| Master Data - Shifts     | 5         | 5             | 0          | 0           | 0                  |
| Customer Booking         | 6         | 0             | 0          | 0           | 6                  |
| Staff Booking            | 6         | 5             | 1          | 0           | 0                  |
| Customer Payment         | 3         | 0             | 0          | 0           | 3                  |
| Staff Invoice            | 3         | 3             | 0          | 0           | 0                  |
| Reports                  | 2         | 2             | 0          | 0           | 0                  |
| **TOTAL**                | **59**    | **48**        | **1**      | **0**       | **10**             |

---

## Legend

- ✅ **Full Match**: SRS, Activity Diagram, and Code all align
- ⚠️ **Partial Match**: Minor differences exist
- ❌ **No Match**: Significant discrepancies
- 📝 **Not Implemented**: Web app features (Customer UCs) not in desktop codebase

---

## Detailed Check by Use Case

### 2.1.1 Authentication Use Case

| UC      | Name            | Activity                  | Code                  | Status | Notes                            |
| ------- | --------------- | ------------------------- | --------------------- | ------ | -------------------------------- |
| 2.1.1.1 | Login           | `auth/login.md`           | `LoginViewModel.cs`   | ✅     | MD5 hash, session management     |
| 2.1.1.2 | Logout          | `auth/logout.md`          | `MainViewModel.cs`    | ✅     | Clear session, redirect to login |
| 2.1.1.3 | Manage Profile  | `auth/manage-profile.md`  | `AccountViewModel.cs` | ✅     | Update FullName, Email           |
| 2.1.1.4 | Change Password | `auth/change-password.md` | `AccountViewModel.cs` | ✅     | Verify current, hash new         |
| 2.1.1.5 | Forgot Password | `auth/forgot-password.md` | ❌ N/A                | 📝     | Web app feature - not in desktop |

---

### 2.1.2 System Management Use Case

| UC      | Name                          | Activity                                        | Code                     | Status | Notes                         |
| ------- | ----------------------------- | ----------------------------------------------- | ------------------------ | ------ | ----------------------------- |
| 2.1.2.1 | View User Details             | `manage-users/view-user-details.md`             | `UserViewModel.cs`       | ✅     | GetAll(), search, filter      |
| 2.1.2.2 | Add New User                  | `manage-users/add-new-user.md`                  | `UserViewModel.cs`       | ✅     | AddCommand, validation        |
| 2.1.2.3 | Edit User                     | `manage-users/edit-user.md`                     | `UserViewModel.cs`       | ✅     | EditCommand, no-change check  |
| 2.1.2.4 | Delete User                   | `manage-users/delete-user.md`                   | `UserViewModel.cs`       | ✅     | DeleteCommand, confirm dialog |
| 2.1.2.5 | View Permission Group Details | `manage-permissions/view-permission-group.md`   | `PermissionViewModel.cs` | ✅     | GetAll(), search              |
| 2.1.2.6 | Add New Permission Group      | `manage-permissions/add-permission-group.md`    | `PermissionViewModel.cs` | ✅     | AddCommand, admin name check  |
| 2.1.2.7 | Edit Permission Group         | `manage-permissions/edit-permission-group.md`   | `PermissionViewModel.cs` | ✅     | EditCommand                   |
| 2.1.2.8 | Delete Permission Group       | `manage-permissions/delete-permission-group.md` | `PermissionViewModel.cs` | ✅     | Reference check (users)       |
| 2.1.2.9 | Manage System Parameters      | `system-settings/manage-parameters.md`          | `ParameterViewModel.cs`  | ✅     | Update all parameters         |

---

### 2.1.3 Master Data Management

#### Manage Halls (2.1.3.1 - 2.1.3.5)

| UC      | Name              | Activity                                | Code               | Status | Notes                          |
| ------- | ----------------- | --------------------------------------- | ------------------ | ------ | ------------------------------ |
| 2.1.3.1 | View Hall Details | `manage-halls/view-hall-details.md`     | `HallViewModel.cs` | ✅     | GetAll(), search by name/type  |
| 2.1.3.2 | Add New Hall      | `manage-halls/add-new-hall.md`          | `HallViewModel.cs` | ✅     | AddCommand, duplicate check    |
| 2.1.3.3 | Edit Hall         | `manage-halls/edit-hall.md`             | `HallViewModel.cs` | ✅     | EditCommand, table count check |
| 2.1.3.4 | Delete Hall       | `manage-halls/delete-hall.md`           | `HallViewModel.cs` | ✅     | Reference check (bookings)     |
| 2.1.3.5 | Export Hall List  | `manage-halls/export-halls-to-excel.md` | `HallViewModel.cs` | ✅     | ClosedXML, SaveFileDialog      |

#### Manage Hall Types (2.1.3.6 - 2.1.3.10)

| UC       | Name                   | Activity                                          | Code                   | Status | Notes                          |
| -------- | ---------------------- | ------------------------------------------------- | ---------------------- | ------ | ------------------------------ |
| 2.1.3.6  | View Hall Type Details | `manage-hall-types/view-hall-type-details.md`     | `HallTypeViewModel.cs` | ✅     | GetAll(), search               |
| 2.1.3.7  | Add New Hall Type      | `manage-hall-types/add-new-hall-type.md`          | `HallTypeViewModel.cs` | ✅     | AddCommand, min price ≥ 10,000 |
| 2.1.3.8  | Edit Hall Type         | `manage-hall-types/edit-hall-type.md`             | `HallTypeViewModel.cs` | ✅     | EditCommand                    |
| 2.1.3.9  | Delete Hall Type       | `manage-hall-types/delete-hall-type.md`           | `HallTypeViewModel.cs` | ✅     | Reference check (halls)        |
| 2.1.3.10 | Export Hall Type List  | `manage-hall-types/export-hall-types-to-excel.md` | `HallTypeViewModel.cs` | ✅     | ClosedXML export               |

#### Manage Dishes (2.1.3.11 - 2.1.3.15)

| UC       | Name                   | Activity                                | Code               | Status | Notes                      |
| -------- | ---------------------- | --------------------------------------- | ------------------ | ------ | -------------------------- |
| 2.1.3.11 | View Dish Details      | `manage-menu/view-dish-details.md`      | `FoodViewModel.cs` | ✅     | GetAll(), search           |
| 2.1.3.12 | Add New Dish           | `manage-menu/add-new-dish.md`           | `FoodViewModel.cs` | ✅     | Max 100 dishes check       |
| 2.1.3.13 | Edit Dish              | `manage-menu/edit-dish.md`              | `FoodViewModel.cs` | ✅     | EditCommand                |
| 2.1.3.14 | Delete Dish            | `manage-menu/delete-dish.md`            | `FoodViewModel.cs` | ✅     | Reference check (bookings) |
| 2.1.3.15 | Export Dishes to Excel | `manage-menu/export-dishes-to-excel.md` | `FoodViewModel.cs` | ✅     | ClosedXML export           |

#### Manage Services (2.1.3.16 - 2.1.3.20)

| UC       | Name                     | Activity                                      | Code                  | Status | Notes                  |
| -------- | ------------------------ | --------------------------------------------- | --------------------- | ------ | ---------------------- |
| 2.1.3.16 | View Service Details     | `manage-services/view-service-details.md`     | `ServiceViewModel.cs` | ✅     | GetAll(), search       |
| 2.1.3.17 | Add New Service          | `manage-services/add-new-service.md`          | `ServiceViewModel.cs` | ✅     | AddCommand, validation |
| 2.1.3.18 | Edit Service             | `manage-services/edit-service.md`             | `ServiceViewModel.cs` | ✅     | EditCommand            |
| 2.1.3.19 | Delete Service           | `manage-services/delete-service.md`           | `ServiceViewModel.cs` | ✅     | Reference check        |
| 2.1.3.20 | Export Services to Excel | `manage-services/export-services-to-excel.md` | `ServiceViewModel.cs` | ✅     | ClosedXML export       |

#### Manage Shifts (2.1.3.21 - 2.1.3.25)

| UC       | Name                   | Activity                                  | Code                | Status | Notes                      |
| -------- | ---------------------- | ----------------------------------------- | ------------------- | ------ | -------------------------- |
| 2.1.3.21 | View Shift Details     | `manage-shifts/view-shift-details.md`     | `ShiftViewModel.cs` | ✅     | GetAll(), search           |
| 2.1.3.22 | Add New Shift          | `manage-shifts/add-new-shift.md`          | `ShiftViewModel.cs` | ✅     | Time range 07:30-24:00     |
| 2.1.3.23 | Edit Shift             | `manage-shifts/edit-shift.md`             | `ShiftViewModel.cs` | ✅     | EditCommand                |
| 2.1.3.24 | Delete Shift           | `manage-shifts/delete-shift.md`           | `ShiftViewModel.cs` | ✅     | Reference check (bookings) |
| 2.1.3.25 | Export Shifts to Excel | `manage-shifts/export-shifts-to-excel.md` | `ShiftViewModel.cs` | ✅     | ClosedXML export           |

---

### 2.1.4 Customer Booking Operations

| UC      | Name                       | Activity                                       | Code   | Status | Notes                    |
| ------- | -------------------------- | ---------------------------------------------- | ------ | ------ | ------------------------ |
| 2.1.4.1 | Register Account           | `customer-bookings/register-account.md`        | ❌ N/A | 📝     | Web app - not in desktop |
| 2.1.4.2 | Check Hall Availability    | `customer-bookings/check-hall-availability.md` | ❌ N/A | 📝     | Web app - not in desktop |
| 2.1.4.3 | Submit Wedding Reservation | `customer-bookings/submit-reservation.md`      | ❌ N/A | 📝     | Web app - not in desktop |
| 2.1.4.4 | View My Booking Details    | `customer-bookings/view-my-booking.md`         | ❌ N/A | 📝     | Web app - not in desktop |
| 2.1.4.5 | Edit My Booking Request    | `customer-bookings/edit-my-booking.md`         | ❌ N/A | 📝     | Web app - not in desktop |
| 2.1.4.6 | Cancel My Booking          | `customer-bookings/cancel-my-booking.md`       | ❌ N/A | 📝     | Web app - not in desktop |

---

### 2.1.5 Staff Booking Management

| UC      | Name                           | Activity                                  | Code                        | Status | Notes                                       |
| ------- | ------------------------------ | ----------------------------------------- | --------------------------- | ------ | ------------------------------------------- |
| 2.1.5.1 | Check System Hall Availability | `manage-bookings/check-availability.md`   | `AddWeddingViewModel.cs`    | ✅     | Calendar + shift selection                  |
| 2.1.5.2 | Create Booking for Customer    | `manage-bookings/create-booking.md`       | `AddWeddingViewModel.cs`    | ✅     | Full booking form                           |
| 2.1.5.3 | Delete Booking                 | `manage-bookings/delete-booking.md`       | `WeddingViewModel.cs`       | ✅     | DeleteCommand with confirm                  |
| 2.1.5.4 | Search/Filter All Bookings     | `manage-bookings/search-bookings.md`      | `WeddingViewModel.cs`       | ✅     | Search by name, date, status                |
| 2.1.5.5 | View Any Booking Details       | `manage-bookings/view-booking-details.md` | `WeddingDetailViewModel.cs` | ✅     | Full details display                        |
| 2.1.5.6 | Modify Booking Details         | `manage-bookings/modify-booking.md`       | `WeddingDetailViewModel.cs` | ⚠️     | Edit menu/services - partial implementation |

---

### 2.1.6 Customer Payment & Invoice

| UC      | Name                     | Activity                                | Code   | Status | Notes                    |
| ------- | ------------------------ | --------------------------------------- | ------ | ------ | ------------------------ |
| 2.1.6.1 | View My Invoice & Debt   | `customer-payment/view-my-invoice.md`   | ❌ N/A | 📝     | Web app - not in desktop |
| 2.1.6.2 | Pay My Invoice           | `customer-payment/pay-my-invoice.md`    | ❌ N/A | 📝     | Web app - not in desktop |
| 2.1.6.3 | Export My Invoice to PDF | `customer-payment/export-my-invoice.md` | ❌ N/A | 📝     | Web app - not in desktop |

---

### 2.1.7 Staff Invoice Management

| UC      | Name                                | Activity                              | Code                  | Status | Notes                             |
| ------- | ----------------------------------- | ------------------------------------- | --------------------- | ------ | --------------------------------- |
| 2.1.7.1 | View Any Invoice & Debt             | `manage-invoices/view-any-invoice.md` | `InvoiceViewModel.cs` | ✅     | Access from Booking Details       |
| 2.1.7.2 | Confirm Payment & Calculate Penalty | `manage-invoices/confirm-payment.md`  | `InvoiceViewModel.cs` | ✅     | PenaltyRate, EnablePenalty params |
| 2.1.7.3 | Export Any Invoice to PDF           | `manage-invoices/export-invoice.md`   | `InvoiceViewModel.cs` | ✅     | iText library, PDF export         |

---

### 2.1.8 Reports & Statistics

| UC      | Name                   | Activity                              | Code                 | Status | Notes                        |
| ------- | ---------------------- | ------------------------------------- | -------------------- | ------ | ---------------------------- |
| 2.1.8.1 | View Revenue Chart     | `reporting/view-revenue-chart.md`     | `ReportViewModel.cs` | ✅     | Monthly filter, LiveCharts   |
| 2.1.8.2 | Export Report to Excel | `reporting/export-report-to-excel.md` | `ReportViewModel.cs` | ✅     | ClosedXML, STT/Ngày/SL/DT/TL |

---

## Code Files Mapping

| ViewModel                   | Related UCs         | Lines | Status |
| --------------------------- | ------------------- | ----- | ------ |
| `LoginViewModel.cs`         | 2.1.1.1             | ~150  | ✅     |
| `AccountViewModel.cs`       | 2.1.1.3, 2.1.1.4    | ~200  | ✅     |
| `MainViewModel.cs`          | 2.1.1.2, Navigation | ~300  | ✅     |
| `UserViewModel.cs`          | 2.1.2.1-2.1.2.4     | ~450  | ✅     |
| `PermissionViewModel.cs`    | 2.1.2.5-2.1.2.8     | ~400  | ✅     |
| `ParameterViewModel.cs`     | 2.1.2.9             | ~200  | ✅     |
| `HallViewModel.cs`          | 2.1.3.1-2.1.3.5     | ~500  | ✅     |
| `HallTypeViewModel.cs`      | 2.1.3.6-2.1.3.10    | ~450  | ✅     |
| `FoodViewModel.cs`          | 2.1.3.11-2.1.3.15   | ~500  | ✅     |
| `ServiceViewModel.cs`       | 2.1.3.16-2.1.3.20   | ~450  | ✅     |
| `ShiftViewModel.cs`         | 2.1.3.21-2.1.3.25   | ~570  | ✅     |
| `WeddingViewModel.cs`       | 2.1.5.3, 2.1.5.4    | ~400  | ✅     |
| `AddWeddingViewModel.cs`    | 2.1.5.1, 2.1.5.2    | ~600  | ✅     |
| `WeddingDetailViewModel.cs` | 2.1.5.5, 2.1.5.6    | ~350  | ⚠️     |
| `InvoiceViewModel.cs`       | 2.1.7.1-2.1.7.3     | ~450  | ✅     |
| `ReportViewModel.cs`        | 2.1.8.1-2.1.8.2     | ~310  | ✅     |

---

## Activity Diagram Folders Mapping

| Folder                | Related UCs       | Files Count |
| --------------------- | ----------------- | ----------- |
| `auth/`               | 2.1.1.1-2.1.1.5   | 5           |
| `manage-users/`       | 2.1.2.1-2.1.2.4   | 4           |
| `manage-permissions/` | 2.1.2.5-2.1.2.8   | 4           |
| `system-settings/`    | 2.1.2.9           | 1           |
| `manage-halls/`       | 2.1.3.1-2.1.3.5   | 5           |
| `manage-hall-types/`  | 2.1.3.6-2.1.3.10  | 5           |
| `manage-menu/`        | 2.1.3.11-2.1.3.15 | 5           |
| `manage-services/`    | 2.1.3.16-2.1.3.20 | 5           |
| `manage-shifts/`      | 2.1.3.21-2.1.3.25 | 5           |
| `customer-bookings/`  | 2.1.4.1-2.1.4.6   | 6           |
| `manage-bookings/`    | 2.1.5.1-2.1.5.6   | 6           |
| `customer-payment/`   | 2.1.6.1-2.1.6.3   | 3           |
| `manage-invoices/`    | 2.1.7.1-2.1.7.3   | 3           |
| `reporting/`          | 2.1.8.1-2.1.8.2   | 2           |

---

## Issues & Recommendations

### 1. Not Implemented Features (Web App)

The following UCs are designed for the **Customer Web Application** which is not part of the desktop codebase:

- UC 2.1.1.5 (Forgot Password)
- UC 2.1.4.1-2.1.4.6 (Customer Booking Operations)
- UC 2.1.6.1-2.1.6.3 (Customer Payment & Invoice)

**Recommendation:** Keep these in SRS for future web app development reference.

### 2. Partial Implementation

- **UC 2.1.5.6 (Modify Booking Details)**: Code allows modifying menu/services but full booking modification (date, hall, shift change) is limited.

**Recommendation:** Document current limitations in SRS or enhance code to match full specification.

### 3. Code Quality Notes

- All ViewModels follow MVVM pattern correctly
- Proper use of RelayCommand for ICommand implementation
- Consistent validation patterns across all modules
- ClosedXML used for Excel exports, iText for PDF exports

---

## Conclusion

**Overall Compatibility Score: 81.4%** (48/59 UCs fully match)

- ✅ Desktop application features: **97.9%** match (48/49)
- 📝 Web application features: **0%** implemented (0/10) - Expected, as web app is separate project

The SRS document accurately reflects the implemented desktop application functionality with high fidelity to both Activity Diagrams and actual code implementation.

---

_Report generated automatically. Last updated: November 30, 2025_
