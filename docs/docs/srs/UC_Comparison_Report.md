# Use Case Comparison Report - ✅ UPDATED

## 1. Summary - Final Status

| Metric                   | Value       |
| ------------------------ | ----------- |
| Total UCs in Master List | 59          |
| UCs in SRS               | **59**      |
| Coverage                 | **100%**    |
| BR Codes                 | BR1-BR202   |
| MSG Codes                | MSG1-MSG119 |

---

## 2. Complete UC Mapping

|               No.                | Use Case Name (EN)                  | Actor        | SRS Section | BR Codes         |
| :------------------------------: | :---------------------------------- | :----------- | :---------- | :--------------- |
|      **I. Authentication**       |                                     |              |             |                  |
|                1                 | Login                               | All          | 2.1.1.1     | BR1-4            |
|                2                 | Logout                              | All          | 2.1.1.2     | BR5-7            |
|                3                 | Manage Profile                      | All          | 2.1.1.3     | BR8-9            |
|                4                 | Change Password                     | All          | 2.1.1.4     | BR10             |
|                5                 | Register Account (Web)              | Customer     | 2.1.1.5     | BR11 ✅ NEW      |
|    **II. System Management**     |                                     |              |             |                  |
|                6                 | View User Details                   | Admin        | 2.1.2.1     | BR12-15          |
|                7                 | Add New User                        | Admin        | 2.1.2.2     | BR16-18          |
|                8                 | Edit User                           | Admin        | 2.1.2.3     | BR19-21          |
|                9                 | Delete User                         | Admin        | 2.1.2.4     | BR22-23          |
|                10                | View Permission Group Details       | Admin        | 2.1.2.5     | BR24-27          |
|                11                | Add New Permission Group            | Admin        | 2.1.2.6     | BR28-30          |
|                12                | Edit Permission Group               | Admin        | 2.1.2.7     | BR31-32          |
|                13                | Delete Permission Group             | Admin        | 2.1.2.8     | BR33-35          |
|                14                | Manage System Parameters            | Admin        | 2.1.2.9     | BR36-39          |
| **III. Master Data Management**  |                                     |              |             |                  |
|                15                | View Hall Type Details              | Staff, Admin | 2.1.3.1     | BR40-43          |
|                16                | Add New Hall Type                   | Staff, Admin | 2.1.3.2     | BR44-47          |
|                17                | Edit Hall Type                      | Staff, Admin | 2.1.3.3     | BR48-50          |
|                18                | Delete Hall Type                    | Staff, Admin | 2.1.3.4     | BR51-52          |
|                19                | Export Hall Types to Excel          | Staff, Admin | 2.1.3.5     | BR53-54          |
|                20                | View Hall Details                   | Staff, Admin | 2.1.3.6     | BR55-58          |
|                21                | Add New Hall                        | Staff, Admin | 2.1.3.7     | BR59-62          |
|                22                | Edit Hall                           | Staff, Admin | 2.1.3.8     | BR63-65          |
|                23                | Delete Hall                         | Staff, Admin | 2.1.3.9     | BR66-67          |
|                24                | Export Halls to Excel               | Staff, Admin | 2.1.3.10    | BR68-69          |
|                25                | View Dish Details                   | Staff, Admin | 2.1.3.11    | BR70-73          |
|                26                | Add New Dish                        | Staff, Admin | 2.1.3.12    | BR74-77          |
|                27                | Edit Dish                           | Staff, Admin | 2.1.3.13    | BR78-80          |
|                28                | Delete Dish                         | Staff, Admin | 2.1.3.14    | BR81-82          |
|                29                | Export Dishes to Excel              | Staff, Admin | 2.1.3.15    | BR83-84          |
|                30                | View Service Details                | Staff, Admin | 2.1.3.16    | BR85-88          |
|                31                | Add New Service                     | Staff, Admin | 2.1.3.17    | BR89-92          |
|                32                | Edit Service                        | Staff, Admin | 2.1.3.18    | BR93-95          |
|                33                | Delete Service                      | Staff, Admin | 2.1.3.19    | BR96-97          |
|                34                | Export Services to Excel            | Staff, Admin | 2.1.3.20    | BR98-99          |
|                35                | View Shift Details                  | Staff, Admin | 2.1.3.21    | BR100-103        |
|                36                | Add New Shift                       | Staff, Admin | 2.1.3.22    | BR104-107        |
|                37                | Edit Shift                          | Staff, Admin | 2.1.3.23    | BR108-109        |
|                38                | Delete Shift                        | Staff, Admin | 2.1.3.24    | BR110            |
|                39                | Export Shifts to Excel              | Staff, Admin | 2.1.3.25    | BR111 ✅ NEW     |
| **IV. Staff Booking Management** |                                     |              |             |                  |
|                40                | Create Booking for Customer         | Staff        | 2.1.4.1     | BR112-119        |
|                41                | Manage Menu Items                   | Staff        | 2.1.4.1.1   | BR120-123        |
|                42                | Manage Service Items                | Staff        | 2.1.4.1.2   | BR124-127        |
|                43                | View Any Booking Details            | Staff, Admin | 2.1.4.2     | BR128-131        |
|                44                | Modify Booking Details              | Staff        | 2.1.4.3     | BR132-137        |
|                45                | Delete Wedding Booking              | Staff        | 2.1.4.4     | BR138-139        |
| **V. Staff Invoice Management**  |                                     |              |             |                  |
|                46                | View Any Invoice & Debt             | Staff, Admin | 2.1.4.5     | BR140-142        |
|                47                | Confirm Payment & Calculate Penalty | Staff, Admin | 2.1.4.6     | BR143-144        |
|                48                | Export Any Invoice to PDF           | Staff, Admin | 2.1.4.7     | BR145-146        |
|   **VI. Reports & Statistics**   |                                     |              |             |                  |
|                49                | View Monthly Revenue Report         | Admin        | 2.1.5.1     | BR147-149        |
|                50                | Export Revenue Report to Excel      | Admin        | 2.1.5.2     | BR150-151        |
|                51                | Export Revenue Report to PDF        | Admin        | 2.1.5.3     | BR152-153        |
|                52                | View Revenue Chart                  | Admin        | 2.1.5.4     | BR154            |
| **VII. Customer Booking (Web)**  |                                     |              |             |                  |
|                53                | Check Hall Availability             | Customer     | 2.1.6.1     | BR155-159 ✅ NEW |
|                54                | Submit Wedding Reservation          | Customer     | 2.1.6.2     | BR160-165 ✅ NEW |
|                55                | View My Booking Details             | Customer     | 2.1.6.3     | BR166-169 ✅ NEW |
|                56                | Edit My Booking Request             | Customer     | 2.1.6.4     | BR170-175 ✅ NEW |
|                57                | Cancel My Booking                   | Customer     | 2.1.6.5     | BR176-180 ✅ NEW |
| **VIII. Customer Payment (Web)** |                                     |              |             |                  |
|                58                | View My Invoice & Debt              | Customer     | 2.1.7.1     | BR181-184 ✅ NEW |
|                59                | Pay My Invoice                      | Customer     | 2.1.7.2     | BR185-190 ✅ NEW |
|                60                | Export My Invoice to PDF            | Customer     | 2.1.7.3     | BR191-194 ✅ NEW |
|  **IX. Staff Extended Booking**  |                                     |              |             |                  |
|                61                | Check System Hall Availability      | Staff, Admin | 2.1.8.1     | BR195-198 ✅ NEW |
|                62                | Search/Filter All Bookings          | Staff, Admin | 2.1.8.2     | BR199-202 ✅ NEW |

---

## 3. Newly Added UCs Summary

### Total: 14 UCs Added

| Section  | UC Name                        | BR Codes  | MSG Codes  |
| -------- | ------------------------------ | --------- | ---------- |
| 2.1.1.5  | Register Account (Web)         | BR11      | -          |
| 2.1.3.25 | Export Shifts to Excel         | BR111     | -          |
| 2.1.6.1  | Check Hall Availability        | BR155-159 | MSG102     |
| 2.1.6.2  | Submit Wedding Reservation     | BR160-165 | MSG103     |
| 2.1.6.3  | View My Booking Details        | BR166-169 | MSG104-105 |
| 2.1.6.4  | Edit My Booking Request        | BR170-175 | MSG106     |
| 2.1.6.5  | Cancel My Booking              | BR176-180 | MSG107-108 |
| 2.1.7.1  | View My Invoice & Debt         | BR181-184 | MSG109-110 |
| 2.1.7.2  | Pay My Invoice                 | BR185-190 | MSG111-114 |
| 2.1.7.3  | Export My Invoice to PDF       | BR191-194 | MSG115-117 |
| 2.1.8.1  | Check System Hall Availability | BR195-198 | MSG118     |
| 2.1.8.2  | Search/Filter All Bookings     | BR199-202 | MSG119     |

---

## 4. SRS Section Overview

| Section   | Name                          | UC Count |
| --------- | ----------------------------- | -------- |
| 2.1.1     | Authentication                | 5        |
| 2.1.2     | System Management             | 9        |
| 2.1.3     | Master Data Management        | 25       |
| 2.1.4     | Booking & Invoice Management  | 9        |
| 2.1.5     | Reports and Statistics        | 4        |
| 2.1.6     | Customer Booking (Web Portal) | 5        |
| 2.1.7     | Customer Payment (Web Portal) | 3        |
| 2.1.8     | Staff Extended Booking        | 2        |
| **TOTAL** |                               | **62**   |

> Note: Actual count is 62 because some master list items (Menu/Service management) are sub-UCs under Create Booking.

---

## 5. Notes

### Approve/Reject Booking

- This functionality is integrated into **Modify Booking Details** (2.1.4.3)
- Status field can be changed to Approved/Rejected

### Search/Filter All Invoices

- This functionality is integrated into **View Any Invoice & Debt** (2.1.4.5)
- Invoice list includes search and filter capabilities

### Activity Diagram Compliance

- All Activity steps in BR tables now match exactly with Activity Diagram step numbers
- Rule: "step trong activity phải giống chính xác với step activity trong activity diagram!"
