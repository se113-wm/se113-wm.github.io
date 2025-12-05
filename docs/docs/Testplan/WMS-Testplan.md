**VIETNAM NATIONAL UNIVERSITY HO CHI MINH CITY**  
**UNIVERSITY OF INFORMATION TECHNOLOGY**  
**FACULTY OF SOFTWARE ENGINEERING**  
**\------------------------------**

# WMS - Wedding Management System

# Test Plan Document

**Project Code:** SE113-WMS  
**Document Code:** WMS-TP-001

**TP. HỒ CHÍ MINH - 2025**

---

## TABLE OF CONTENTS

**1 Introduction [3](#1-introduction)**

**2 Business Background [4](#2-business-background)**

**3 Test Objectives [4](#3-test-objectives)**

**4 Scope [5](#4-scope)**

**5 Test Types Identified [6](#5-test-types-identified)**

**6 Problems Perceived [7](#6-problems-perceived)**

**7 Architecture [7](#7-architecture)**

**8 Environment [8](#8-environment)**

**9 Assumptions [8](#9-assumptions)**

**10 Functionality [9](#10-functionality)**

**11 Security [10](#11-security)**

**12 Performance [11](#12-performance)**

**13 Usability [12](#13-usability)**

**14 Test Team Organization [13](#14-test-team-organization)**

**15 Schedule [13](#15-schedule)**

**16 Defects Classification Mechanism [14](#16-defects-classification-mechanism)**

**17 Configuration Management [15](#17-configuration-management)**

**18 Release Criteria [15](#18-release-criteria)**

**19 Appendix [16](#19-appendix)**

---

## Record of Change

\*A - Added M - Modified D - Deleted

| Effective Date | Changed Items | A\*M, D | Change Description                 | New Version |
| -------------- | ------------- | :-----: | ---------------------------------- | :---------: |
| 05-Dec-2025    |               |    A    | Initial Test Plan document for WMS |     1.0     |
|                |               |         |                                    |             |

---

## SIGNATURE PAGE

**ORIGINATOR:** WMS Team 05-Dec-2025  
Tester

**REVIEWERS:** WMS Team 05-Dec-2025  
Test Leader

**APPROVAL:** Project Manager 05-Dec-2025  
Project Leader

---

# 1. Introduction {#1-introduction}

## 1.1 Purpose

This document encompasses a comprehensive description of all test scenarios executed within the context of the Wedding Management System (WMS) project. It provides in-depth scenarios for all elements slated for testing, as outlined in the test plan. All user interfaces will undergo testing in accordance with the User Interface Test Case Specification, while other components will be evaluated using the respective test case specifications provided below.

This Test Plan document covers:

- Functional testing for all 59 use cases with **824 test cases** mapped to **171 Business Rules (BR1-BR171)**
- Non-functional testing including security, performance, and usability
- Integration testing between modules
- User acceptance testing criteria

## 1.2 General Information

This document is structured into 19 main sections covering all aspects of testing for the WMS application:

- **Sections 1-3**: Introduction, business context, and testing objectives
- **Sections 4-5**: Test scope and types of testing to be performed
- **Sections 6-9**: Technical considerations including architecture, environment, and assumptions
- **Sections 10-13**: Detailed testing strategies for functionality, security, performance, and usability
- **Sections 14-18**: Team organization, schedule, defect management, and release criteria
- **Section 19**: Appendix with test case field definitions

---

# 2. Business Background {#2-business-background}

**Type of Business:** The Wedding Management System (WMS) is a service industry application designed to streamline wedding hall booking, menu and service management, customer reservations, and payment processing.

**Type of Legal Entity:** Educational project developed by WMS Team at University of Information Technology (UIT), Vietnam National University Ho Chi Minh City.

**Establishment:** October 2025

**Location:** Ho Chi Minh City, Vietnam

**Business Operations:**

- Wedding hall booking and management
- Menu and dish management
- Service catalog management
- Shift scheduling
- Customer booking operations
- Payment and invoice processing
- Revenue reporting and statistics

---

# 3. Test Objectives {#3-test-objectives}

The purpose of this test plan includes the following objectives:

1. **Prevent defects:** Efficient testing helps prevent defects and provides an error-free application for wedding management operations.

2. **Evaluate the work products:** Verify the Requirement document (SRS v1.8.0), Design documents, and User Stories before development pickup. The static analysis of code (reviews, walk-through, inspection) happens before integration.

3. **Verify the fulfillment of all specified requirements:** Ensure implementation of all **59 use cases** with **824 test cases** covering **171 Business Rules (BR1-BR171)**:

   | Module                       |  UCs   |   TCs   | BR Range      | Details                                             |
   | :--------------------------- | :----: | :-----: | :------------ | :-------------------------------------------------- |
   | **Authentication**           |   5    |   55    | BR1-BR10      | Login, Logout, Manage Profile, Change Password      |
   | **System Management**        |   9    |   145   | BR11-BR40     | User CRUD, Permission Group CRUD, System Parameters |
   | **Master Data - Halls**      |   5    |   78    | BR41-BR56     | View, Add, Edit, Delete, Export Halls               |
   | **Master Data - Hall Types** |   5    |   71    | BR57-BR72     | View, Add, Edit, Delete, Export Hall Types          |
   | **Master Data - Dishes**     |   5    |   78    | BR73-BR88     | View, Add, Edit, Delete, Export Dishes              |
   | **Master Data - Services**   |   5    |   77    | BR89-BR104    | View, Add, Edit, Delete, Export Services            |
   | **Master Data - Shifts**     |   5    |   74    | BR105-BR120   | View, Add, Edit, Delete, Export Shifts              |
   | **Customer Booking**         |   5    |   77    | BR121-BR136   | Check Availability, Book, View, Edit, Cancel        |
   | **Staff Booking**            |   6    |   70    | BR137-BR151   | Check, Create, Delete, Search, View, Modify         |
   | **Customer Payment**         |   3    |   34    | BR152-BR158   | View Invoice, Pay, Export PDF                       |
   | **Staff Invoice**            |   3    |   40    | BR159-BR166   | View Invoice, Confirm Payment, Export PDF           |
   | **Reports & Statistics**     |   2    |   25    | BR167-BR171   | View Revenue Chart, Export Excel                    |
   | **TOTAL**                    | **59** | **824** | **BR1-BR171** |                                                     |

4. **Validate if the test object is complete:** Ensure the system works as per the expectation of users (Staff, Administrator, Customer) through User Acceptance Testing (UAT).

5. **Prevent defects in the software product:** Early detection of errors in the development cycle to reduce cost, effort, and time. Root cause analysis of defects found previously will be conducted.

6. **Find defects in the software product:** Identify all defects through **824 test cases** validating Business Rules (BR1-BR171) and Messages (MSG 1-116) as specified in the SRS.

7. **Provide sufficient information to stakeholders:** Transparent reporting through test coverage metrics, testing reports, and defect tracking.

8. **Reduce the level of risk:** Integrate Risk Management process to identify risks early in development phases.

---

# 4. Scope {#4-scope}

## 4.1 Inclusions

Features to be tested include all functional requirements from SRS v1.8.0:

### Authentication Module

- Login (UC_AUTH_01)
- Logout (UC_AUTH_02)
- Manage Profile (UC_AUTH_03)
- Change Password (UC_AUTH_04)
- Forgot Password (UC_AUTH_05) _(Note: Test cases pending - not included in current RTM)_

### System Management Module

- View/Add/Edit/Delete User (UC_MU_01-04)
- View/Add/Edit/Delete Permission Group (UC_MP_01-04)
- Manage System Parameters (UC_SS_01)

### Master Data Management Module

- View/Add/Edit/Delete/Export Halls (UC_MH_01-05)
- View/Add/Edit/Delete/Export Hall Types (UC_MHT_01-05)
- View/Add/Edit/Delete/Export Dishes (UC_MM_01-05)
- View/Add/Edit/Delete/Export Services (UC_MS_01-05)
- View/Add/Edit/Delete/Export Shifts (UC_MSH_01-05)

### Customer Booking Operations

- Check Hall Availability (UC 40)
- Submit Wedding Reservation (UC 41)
- View My Booking Details (UC 42)
- Edit My Booking Request (UC 43)
- Cancel My Booking (UC 44)

### Staff Booking Management

- Check System Hall Availability (UC 45)
- Create Booking for Customer (UC 46)
- Delete Booking (UC 47)
- Search/Filter All Bookings (UC 48)
- View Any Booking Details (UC 49)
- Modify Booking Details (UC 50)

### Customer Payment & Invoice

- View My Invoice & Debt (UC 51)
- Pay My Invoice (UC 52)
- Export My Invoice to PDF (UC 53)

### Staff Invoice Management

- View Any Invoice & Debt (UC 54)
- Confirm Payment & Calculate Penalty (UC 55)
- Export Any Invoice to PDF (UC 56)

### Reports & Statistics

- View Revenue Chart (UC 57)
- Export Report to Excel (UC 58)

## 4.2 Exclusions

Features NOT to be tested:

- Third-party payment gateway integration (mock only)
- Email notification system (will be stubbed)
- Mobile application (out of scope)
- Web-based customer portal (future phase)

---

# 5. Test Types Identified {#5-test-types-identified}

## Test Levels

Test Levels represent the stages of testing organized according to the V-Model, from the smallest unit to the entire system:

```
Requirements ────────────────────────────> Acceptance Testing (UAT)
     ↓                                              ↑
  Design ────────────────────────────────> System Testing
     ↓                                              ↑
Architecture ────────────────────────────> Integration Testing
     ↓                                              ↑
  Code ──────────────────────────────────> Unit Testing
```

### 1. Unit Testing

Testing individual methods/functions in isolation, independent of other components. The objective is to verify that each unit of code works correctly.

**Example methods to be Unit Tested in WMS:**

| Layer      | Class               | Methods (Examples)                                               |
| :--------- | :------------------ | :--------------------------------------------------------------- |
| ViewModel  | `LoginViewModel`    | `Login()`, `ValidateCredentials()`, `ClearForm()`                |
| ViewModel  | `UserViewModel`     | `AddUser()`, `EditUser()`, `DeleteUser()`, `SearchUser()`        |
| ViewModel  | `HallViewModel`     | `LoadHalls()`, `ValidateHallData()`, `ExportToExcel()`           |
| ViewModel  | `BookingViewModel`  | `CheckAvailability()`, `CreateBooking()`, `CalculateTotal()`     |
| Service    | `UserService`       | `GetAllUsers()`, `GetUserById()`, `CreateUser()`, `UpdateUser()` |
| Service    | `BookingService`    | `GetAvailableHalls()`, `CreateBooking()`, `CancelBooking()`      |
| Service    | `InvoiceService`    | `CalculatePenalty()`, `GenerateInvoice()`, `ProcessPayment()`    |
| Repository | `UserRepository`    | `Add()`, `Update()`, `Delete()`, `GetById()`, `GetAll()`         |
| Repository | `BookingRepository` | `GetByDateRange()`, `GetByCustomerId()`, `CheckConflict()`       |

### 2. Integration Testing

Testing the interaction between components/layers when connected together. The objective is to detect defects at the interface points between modules.

**Integration points in WMS:**

| Integration Point     | Description                                                  |
| :-------------------- | :----------------------------------------------------------- |
| UI ↔ ViewModel        | WPF XAML data binding with ViewModel properties and commands |
| ViewModel ↔ Service   | ViewModel calls Service layer methods                        |
| Service ↔ Repository  | Service layer uses Repository pattern for data access        |
| Repository ↔ Database | Entity Framework DbContext communicates with SQL Server      |

### 3. System Testing

End-to-end testing of the complete system as a black box. The objective is to verify that the system meets all functional requirements.

**Example System Test scenarios:**

- Login → Navigate to Hall Management → Add Hall → Edit Hall → Delete Hall → Logout
- Login → Check Availability → Create Booking → View Invoice → Process Payment → Export PDF
- Login → View Reports → Filter by Date → Export to Excel

### 4. User Acceptance Testing (UAT)

Final testing by actual users/stakeholders to confirm the system meets business requirements.

**UAT scenarios by role:**

| Role          | Scenarios                                                         |
| :------------ | :---------------------------------------------------------------- |
| Administrator | Manage users, permission groups, system parameters                |
| Staff         | Manage master data, process bookings, confirm payments            |
| Customer      | Book wedding, view booking details, make payments, export invoice |

### 5. Regression Testing

Re-running test cases after changes (bug fixes, enhancements) to ensure no new defects have been introduced.

## Test Types

1. **GUI Functional Testing:** Test all 59 use cases with **824 test cases** against functional requirements and business rules (BR1-BR171).

2. **Usability Testing (UX):** Evaluate user-friendliness of:

   - Navigation flow
   - Form validation messages (MSG 1-116)
   - Error handling presentation

3. **Security Testing:** Verify:

   - Authentication mechanisms
   - Authorization/Permission controls
   - Password policies
   - Session management

4. **Performance Testing:** Test:

   - Response time for data loading
   - Export functionality with large datasets (>10k records)
   - Concurrent user handling

5. **Smoke Testing:** Run smoke tests on each new build covering:
   - Login functionality
   - Core CRUD operations
   - Database connectivity

---

# 6. Problems Perceived {#6-problems-perceived}

| Problem ID | Description                       | Impact                         | Mitigation                                     |
| :--------- | :-------------------------------- | :----------------------------- | :--------------------------------------------- |
| P001       | Entity Framework model complexity | May cause performance issues   | Optimize queries, use lazy loading judiciously |
| P002       | WPF data binding issues           | UI not reflecting data changes | Implement INotifyPropertyChanged properly      |
| P003       | SQL Server connection handling    | Connection pool exhaustion     | Proper using statements, connection pooling    |
| P004       | Excel export large datasets       | Memory overflow risk           | Implement streaming export                     |
| P005       | Concurrent booking conflicts      | Double booking possibility     | Implement optimistic locking                   |

---

# 7. Architecture {#7-architecture}

## Application Architecture

The WMS application follows a layered architecture:

```
┌─────────────────────────────────────────────┐
│         Presentation Layer (WPF/XAML)       │
│  - Views (Windows, UserControls)            │
│  - ResourceXAML (Styles, Templates)         │
├─────────────────────────────────────────────┤
│         ViewModel Layer (MVVM)              │
│  - ViewModels with ICommand                 │
│  - Data binding support                     │
├─────────────────────────────────────────────┤
│      Business Logic Layer (Services)        │
│  - IService interfaces                      │
│  - Service implementations                  │
│  - Business rule validation                 │
├─────────────────────────────────────────────┤
│      Data Access Layer (Repository)         │
│  - IRepository interfaces                   │
│  - Repository implementations               │
│  - Entity Framework DbContext               │
├─────────────────────────────────────────────┤
│         Data Layer (SQL Server)             │
│  - Tables: AppUser, Booking, Hall, etc.     │
│  - Stored procedures                        │
└─────────────────────────────────────────────┘
```

## Data Models

Core entities include:

- AppUser, UserGroup, Permission
- Booking, Hall, HallType, Shift
- Menu, Dish, Service, ServiceDetail
- RevenueReport, RevenueReportDetail
- Parameter

---

# 8. Environment {#8-environment}

## Hardware Requirements

| Component | Test Environment        | Production (Minimum) |
| :-------- | :---------------------- | :------------------- |
| Processor | Intel Core i5 or higher | Intel Core i3        |
| RAM       | 8 GB                    | 4 GB                 |
| Storage   | 50 GB SSD               | 20 GB                |
| Display   | 1920x1080               | 1366x768             |

## Software Requirements

| Software                     | Version       | Purpose                 |
| :--------------------------- | :------------ | :---------------------- |
| Operating System             | Windows 10/11 | Test machines           |
| .NET Framework               | 4.7.2+        | WPF Application runtime |
| SQL Server                   | 2019 Express+ | Database server         |
| Visual Studio                | 2022          | Development & debugging |
| SQL Server Management Studio | 19.x          | Database management     |
| Git                          | Latest        | Version control         |

## Testing Tools

| Tool             | Purpose                          |
| :--------------- | :------------------------------- |
| MSTest / NUnit   | Unit testing framework           |
| Appium.WebDriver | UI automation testing            |
| Azure DevOps     | Bug tracking and test management |
| Excel            | Test case documentation          |

---

# 9. Assumptions {#9-assumptions}

1. **Development Environment:** Development and testing will be performed on Windows environment with Visual Studio 2022.

2. **Database:** SQL Server database will be available and properly configured with test data.

3. **Test Data:** Adequate test data will be prepared for all modules including:

   - Multiple user accounts with different permission groups
   - Sample halls, hall types, dishes, services, shifts
   - Historical booking data for reporting tests

4. **Access:** Testers will have access to:

   - Source code repository
   - Database for direct verification
   - All user role credentials

5. **Dependencies:** All NuGet packages and dependencies will be available.

6. **Documentation:** SRS v1.8.0 and activity diagrams are finalized and serve as baseline.

---

# 10. Functionality {#10-functionality}

## Constraints and Resolutions

| Parameter           | Constraints                                | Resolutions                            |
| :------------------ | :----------------------------------------- | :------------------------------------- |
| Business Rules      | 171 business rules (BR1-BR171) to validate | Organize tests by use case, create RTM |
| Message Validation  | 116 messages (MSG 1-116) to verify         | Create message verification checklist  |
| Multiple User Roles | Different UI/permissions per role          | Create separate test suites per role   |
| Data Dependencies   | Some tests require existing data           | Implement test data setup/teardown     |

## Risk Identified & Mitigation Planned

| Risk                    | Probability | Impact | Mitigation                        |
| :---------------------- | :---------- | :----- | :-------------------------------- |
| Incomplete requirements | Medium      | High   | Early requirement review sessions |
| Data integrity issues   | Medium      | High   | Database constraint testing       |
| Time constraints        | High        | Medium | Prioritize critical path testing  |

## Test Strategy

### Functional Test Cases Overview

Total Test Cases: **824 test cases** covering **171 Business Rules (BR1-BR171)** across 59 use cases as defined in Requirements Traceability Matrix (RTM).

#### Test Cases by Business Rule (Detailed)

##### 2.1.1 Authentication Use Cases (55 TCs)

| UC           | UC Name         | BR Code      | BR Description                             |  TCs   |
| :----------- | :-------------- | :----------- | :----------------------------------------- | :----: |
| UC_AUTH_01   | Login           | BR1          | Display LoginWindow screen                 |   5    |
|              |                 | BR2          | Validate username and password input       |   5    |
|              |                 | BR3          | Query AppUser table for authentication     |   8    |
| UC_AUTH_02   | Logout          | BR4          | Process logout request and clear session   |   6    |
| UC_AUTH_03   | Manage Profile  | BR5          | Display AccountView with current user data |   5    |
|              |                 | BR6          | Validate profile update data before saving |   6    |
|              |                 | BR7          | Update AppUser record in database          |   5    |
| UC_AUTH_04   | Change Password | BR8          | Display Change Password dialog             |   5    |
|              |                 | BR9          | Validate change password input             |   5    |
|              |                 | BR10         | Update password in database                |   5    |
| **Subtotal** |                 | **BR1-BR10** |                                            | **55** |

##### 2.1.2 System Management Use Cases (145 TCs)

| UC           | UC Name                       | BR Code       | BR Description                             |   TCs   |
| :----------- | :---------------------------- | :------------ | :----------------------------------------- | :-----: |
| UC_MU_01     | View User Details             | BR11          | Display UserView with user list            |    5    |
|              |                               | BR12          | Search users by selected property          |    5    |
|              |                               | BR13          | Select user and populate form              |    5    |
| UC_MU_02     | Add New User                  | BR14          | Display add user form                      |    5    |
|              |                               | BR15          | Validate user input before adding          |    6    |
|              |                               | BR16          | Create new user in database                |    5    |
| UC_MU_03     | Edit User                     | BR17          | Display edit user form                     |    5    |
|              |                               | BR18          | Validate user edit input                   |    7    |
|              |                               | BR19          | Update user record in database             |    5    |
| UC_MU_04     | Delete User                   | BR20          | Display delete user mode                   |    3    |
|              |                               | BR21          | Validate delete selection                  |    3    |
|              |                               | BR22          | Display delete confirmation dialog         |    3    |
|              |                               | BR23          | Delete user from database                  |    5    |
| UC_MP_01     | View Permission Group Details | BR24          | Display PermissionView with group list     |    5    |
|              |                               | BR25          | Search permission groups                   |    3    |
|              |                               | BR26          | Select group and display permissions       |    5    |
| UC_MP_02     | Add New Permission Group      | BR27          | Display add permission group form          |    4    |
|              |                               | BR28          | Validate permission group input            |    5    |
|              |                               | BR29          | Create new permission group in database    |    5    |
| UC_MP_03     | Edit Permission Group         | BR30          | Display edit permission group form         |    5    |
|              |                               | BR31          | Validate permission group edit input       |    5    |
|              |                               | BR32          | Update permission group in database        |    5    |
| UC_MP_04     | Delete Permission Group       | BR33          | Display delete permission group mode       |    3    |
|              |                               | BR34          | Check for referenced users before delete   |    4    |
|              |                               | BR35          | Display delete confirmation dialog         |    3    |
|              |                               | BR36          | Delete permission group from database      |    5    |
| UC_SS_01     | Manage System Parameters      | BR37          | Display ParameterView with system settings |    6    |
|              |                               | BR38          | Validate parameter values before saving    |    9    |
|              |                               | BR39          | Update system parameters in database       |    6    |
|              |                               | BR40          | Handle parameter update errors             |    5    |
| **Subtotal** |                               | **BR11-BR40** |                                            | **145** |

##### 2.1.3 Master Data Management Use Cases (377 TCs)

**Manage Halls (BR41-BR56): 78 TCs**

| UC       | UC Name           | BR Code | BR Description                           | TCs |
| :------- | :---------------- | :------ | :--------------------------------------- | :-: |
| UC_MH_01 | View Hall Details | BR41    | Display HallView with hall list          |  5  |
|          |                   | BR42    | Filter halls by search criteria          |  5  |
|          |                   | BR43    | Select hall and display details          |  5  |
| UC_MH_02 | Add New Hall      | BR44    | Display add hall form                    |  5  |
|          |                   | BR45    | Validate hall data before saving         |  6  |
|          |                   | BR46    | Insert new hall into database            |  5  |
| UC_MH_03 | Edit Hall         | BR47    | Display edit hall form with current data |  5  |
|          |                   | BR48    | Validate edited hall data                |  6  |
|          |                   | BR49    | Update hall record in database           |  5  |
| UC_MH_04 | Delete Hall       | BR50    | Display delete hall mode                 |  4  |
|          |                   | BR51    | Check hall references before delete      |  4  |
|          |                   | BR52    | Display delete confirmation dialog       |  3  |
|          |                   | BR53    | Delete hall from database                |  5  |
| UC_MH_05 | Export Hall List  | BR54    | Display export halls mode                |  4  |
|          |                   | BR55    | Validate data before export              |  4  |
|          |                   | BR56    | Generate Excel file for halls            |  7  |

**Manage Hall Types (BR57-BR72): 71 TCs**

| UC        | UC Name                | BR Code | BR Description                           | TCs |
| :-------- | :--------------------- | :------ | :--------------------------------------- | :-: |
| UC_MHT_01 | View Hall Type Details | BR57    | Display HallTypeView with hall type list |  5  |
|           |                        | BR58    | Filter hall types by search criteria     |  4  |
|           |                        | BR59    | Select hall type and display details     |  4  |
| UC_MHT_02 | Add New Hall Type      | BR60    | Display add hall type form               |  4  |
|           |                        | BR61    | Validate hall type data before saving    |  5  |
|           |                        | BR62    | Insert new hall type into database       |  5  |
| UC_MHT_03 | Edit Hall Type         | BR63    | Display edit hall type form              |  4  |
|           |                        | BR64    | Validate edited hall type data           |  5  |
|           |                        | BR65    | Update hall type record in database      |  5  |
| UC_MHT_04 | Delete Hall Type       | BR66    | Display delete hall type mode            |  3  |
|           |                        | BR67    | Check hall type references before delete |  4  |
|           |                        | BR68    | Display delete confirmation dialog       |  3  |
|           |                        | BR69    | Delete hall type from database           |  5  |
| UC_MHT_05 | Export Hall Type List  | BR70    | Display export hall types mode           |  4  |
|           |                        | BR71    | Validate data before export              |  4  |
|           |                        | BR72    | Generate Excel file for hall types       |  7  |

**Manage Dishes (BR73-BR88): 78 TCs**

| UC       | UC Name                | BR Code | BR Description                           | TCs |
| :------- | :--------------------- | :------ | :--------------------------------------- | :-: |
| UC_MM_01 | View Dish Details      | BR73    | Display FoodView with dish list          |  5  |
|          |                        | BR74    | Filter dishes by search criteria         |  5  |
|          |                        | BR75    | Select dish and display details          |  5  |
| UC_MM_02 | Add New Dish           | BR76    | Display add dish form                    |  4  |
|          |                        | BR77    | Validate dish data before saving         |  6  |
|          |                        | BR78    | Insert new dish into database            |  6  |
| UC_MM_03 | Edit Dish              | BR79    | Display edit dish form with current data |  4  |
|          |                        | BR80    | Validate edited dish data                |  6  |
|          |                        | BR81    | Update dish record in database           |  6  |
| UC_MM_04 | Delete Dish            | BR82    | Display delete dish mode                 |  4  |
|          |                        | BR83    | Check dish references before delete      |  4  |
|          |                        | BR84    | Display delete confirmation dialog       |  3  |
|          |                        | BR85    | Delete dish from database                |  5  |
| UC_MM_05 | Export Dishes to Excel | BR86    | Display export dishes mode               |  4  |
|          |                        | BR87    | Validate data before export              |  4  |
|          |                        | BR88    | Generate Excel file for dishes           |  7  |

**Manage Services (BR89-BR104): 77 TCs**

| UC       | UC Name                  | BR Code | BR Description                         | TCs |
| :------- | :----------------------- | :------ | :------------------------------------- | :-: |
| UC_MS_01 | View Service Details     | BR89    | Display ServiceView with service list  |  5  |
|          |                          | BR90    | Filter services by search criteria     |  5  |
|          |                          | BR91    | Select service and display details     |  5  |
| UC_MS_02 | Add New Service          | BR92    | Display add service form               |  4  |
|          |                          | BR93    | Validate service data before saving    |  5  |
|          |                          | BR94    | Insert new service into database       |  6  |
| UC_MS_03 | Edit Service             | BR95    | Display edit service form              |  4  |
|          |                          | BR96    | Validate edited service data           |  6  |
|          |                          | BR97    | Update service record in database      |  6  |
| UC_MS_04 | Delete Service           | BR98    | Display delete service mode            |  4  |
|          |                          | BR99    | Check service references before delete |  4  |
|          |                          | BR100   | Display delete confirmation dialog     |  3  |
|          |                          | BR101   | Delete service record from database    |  5  |
| UC_MS_05 | Export Services to Excel | BR102   | Display export services mode           |  4  |
|          |                          | BR103   | Validate data exists for export        |  4  |
|          |                          | BR104   | Create Excel file with service data    |  7  |

**Manage Shifts (BR105-BR120): 74 TCs**

| UC        | UC Name                | BR Code | BR Description                       | TCs |
| :-------- | :--------------------- | :------ | :----------------------------------- | :-: |
| UC_MSH_01 | View Shift Details     | BR105   | Display ShiftView screen             |  5  |
|           |                        | BR106   | Query Shift table for all records    |  4  |
|           |                        | BR107   | Select shift to view details         |  5  |
|           |                        | BR108   | Filter shifts by search text         |  4  |
| UC_MSH_02 | Add New Shift          | BR109   | Display add shift form               |  4  |
|           |                        | BR110   | Validate shift input data            |  5  |
|           |                        | BR111   | Insert new shift into database       |  5  |
| UC_MSH_03 | Edit Shift             | BR112   | Display edit shift form              |  4  |
|           |                        | BR113   | Validate edited shift data           |  5  |
| UC_MSH_04 | Delete Shift           | BR114   | Display delete shift mode            |  4  |
|           |                        | BR115   | Check shift references before delete |  5  |
|           |                        | BR116   | Display delete confirmation dialog   |  4  |
|           |                        | BR117   | Delete shift record from database    |  5  |
| UC_MSH_05 | Export Shifts to Excel | BR118   | Display export shifts mode           |  4  |
|           |                        | BR119   | Validate data exists for export      |  4  |
|           |                        | BR120   | Create Excel file with shift data    |  7  |

| **Module Subtotal** |     | **BR41-BR120** |     | **377** |
| :------------------ | :-- | :------------- | :-- | :-----: |

##### 2.1.4 Customer Booking Operations (77 TCs)

| UC           | UC Name                    | BR Code         | BR Description                    |  TCs   |
| :----------- | :------------------------- | :-------------- | :-------------------------------- | :----: |
| UC_CB_01     | Check Hall Availability    | BR121           | Display hall availability page    |   5    |
|              |                            | BR122           | Validate check availability input |   4    |
|              |                            | BR123           | Query and display available halls |   5    |
| UC_CB_02     | Submit Wedding Reservation | BR124           | Display booking form              |   5    |
|              |                            | BR125           | Validate booking submission data  |   6    |
|              |                            | BR126           | Create new booking record         |   5    |
| UC_CB_03     | View My Booking Details    | BR127           | Display my bookings list          |   5    |
|              |                            | BR128           | Display selected booking details  |   6    |
| UC_CB_04     | Edit My Booking Request    | BR129           | Display edit booking form         |   4    |
|              |                            | BR130           | Validate edit booking data        |   5    |
|              |                            | BR131           | Update booking record             |   5    |
| UC_CB_05     | Cancel My Booking          | BR132           | Display cancel booking options    |   4    |
|              |                            | BR133           | Validate cancellation eligibility |   4    |
|              |                            | BR134           | Calculate cancellation penalty    |   5    |
|              |                            | BR135           | Display cancellation confirmation |   4    |
|              |                            | BR136           | Execute booking cancellation      |   5    |
| **Subtotal** |                            | **BR121-BR136** |                                   | **77** |

##### 2.1.5 Staff Booking Management (70 TCs)

| UC           | UC Name                        | BR Code         | BR Description                        |  TCs   |
| :----------- | :----------------------------- | :-------------- | :------------------------------------ | :----: |
| UC_SB_01     | Check System Hall Availability | BR137           | Display staff hall availability check |   4    |
|              |                                | BR138           | Query available halls for staff       |   5    |
| UC_SB_02     | Create Booking for Customer    | BR139           | Display staff booking form            |   5    |
|              |                                | BR140           | Validate staff booking data           |   5    |
|              |                                | BR141           | Create booking record by staff        |   5    |
| UC_SB_03     | Delete Booking                 | BR142           | Display delete booking options        |   3    |
|              |                                | BR143           | Validate booking deletion             |   4    |
|              |                                | BR144           | Execute booking deletion              |   5    |
| UC_SB_04     | Search/Filter All Bookings     | BR145           | Display booking list with filters     |   4    |
|              |                                | BR146           | Filter bookings by criteria           |   6    |
| UC_SB_05     | View Any Booking Details       | BR147           | Display any booking details           |   5    |
|              |                                | BR148           | Display booking action buttons        |   5    |
| UC_SB_06     | Modify Booking Details         | BR149           | Display modify booking form           |   5    |
|              |                                | BR150           | Validate booking modifications        |   4    |
|              |                                | BR151           | Execute booking modifications         |   5    |
| **Subtotal** |                                | **BR137-BR151** |                                       | **70** |

##### 2.1.6 Customer Payment & Invoice (34 TCs)

| UC           | UC Name                  | BR Code         | BR Description                   |  TCs   |
| :----------- | :----------------------- | :-------------- | :------------------------------- | :----: |
| UC_CP_01     | View My Invoice & Debt   | BR152           | Display customer invoice list    |   4    |
|              |                          | BR153           | Display selected invoice details |   6    |
| UC_CP_02     | Pay My Invoice           | BR154           | Display customer payment form    |   4    |
|              |                          | BR155           | Validate customer payment data   |   4    |
|              |                          | BR156           | Process customer payment         |   6    |
| UC_CP_03     | Export My Invoice to PDF | BR157           | Display PDF export option        |   3    |
|              |                          | BR158           | Generate customer invoice PDF    |   7    |
| **Subtotal** |                          | **BR152-BR158** |                                  | **34** |

##### 2.1.7 Staff Invoice Management (40 TCs)

| UC           | UC Name                             | BR Code         | BR Description                                |  TCs   |
| :----------- | :---------------------------------- | :-------------- | :-------------------------------------------- | :----: |
| UC_SI_01     | View Any Invoice & Debt             | BR159           | Display invoice from booking details          |   5    |
|              |                                     | BR160           | Display invoice status and actions            |   5    |
| UC_SI_02     | Confirm Payment & Calculate Penalty | BR161           | Allow staff to confirm payment for invoice    |   5    |
|              |                                     | BR162           | Calculate penalty based on late payment rules |   5    |
|              |                                     | BR163           | Update invoice after payment confirmation     |   5    |
|              |                                     | BR164           | Record penalty amount in invoice              |   5    |
| UC_SI_03     | Export Any Invoice to PDF           | BR165           | Allow staff to export any invoice to PDF      |   5    |
|              |                                     | BR166           | PDF contains complete invoice information     |   5    |
| **Subtotal** |                                     | **BR159-BR166** |                                               | **40** |

##### 2.1.8 Reports & Statistics (25 TCs)

| UC           | UC Name                | BR Code         | BR Description                                |  TCs   |
| :----------- | :--------------------- | :-------------- | :-------------------------------------------- | :----: |
| UC_RS_01     | View Revenue Chart     | BR167           | Allow authorized users to view revenue report |   5    |
|              |                        | BR168           | Filter revenue report by month and year       |   5    |
|              |                        | BR169           | Display revenue grouped by day with chart     |   5    |
| UC_RS_02     | Export Report to Excel | BR170           | Allow exporting revenue report to Excel       |   5    |
|              |                        | BR171           | Excel contains complete report data           |   5    |
| **Subtotal** |                        | **BR167-BR171** |                                               | **25** |

---

### Summary by Module

| Module                   | Use Cases | BR Range      | BR Count | Test Cases |
| :----------------------- | :-------: | :------------ | :------: | :--------: |
| Authentication           |     5     | BR1-BR10      |    10    |     55     |
| System Management        |     9     | BR11-BR40     |    30    |    145     |
| Master Data - Halls      |     5     | BR41-BR56     |    16    |     78     |
| Master Data - Hall Types |     5     | BR57-BR72     |    16    |     71     |
| Master Data - Dishes     |     5     | BR73-BR88     |    16    |     78     |
| Master Data - Services   |     5     | BR89-BR104    |    16    |     77     |
| Master Data - Shifts     |     5     | BR105-BR120   |    16    |     74     |
| Customer Booking         |     5     | BR121-BR136   |    16    |     77     |
| Staff Booking            |     6     | BR137-BR151   |    15    |     70     |
| Customer Payment         |     3     | BR152-BR158   |    7     |     34     |
| Staff Invoice            |     3     | BR159-BR166   |    8     |     40     |
| Reports & Statistics     |     2     | BR167-BR171   |    5     |     25     |
| **TOTAL**                |  **59**   | **BR1-BR171** | **171**  |  **824**   |

## Automation Plans

- Unit tests: 80% automation target
- Integration tests: 60% automation target
- UI tests: 40% automation with Appium

## Deliverables

- Test Plan document (this document)
- Test Case Specifications
- Requirements Traceability Matrix (RTM)
- Test Execution Reports
- Defect Reports

---

# 11. Security {#11-security}

## Constraints and Resolutions

| Parameter          | Constraints                             | Resolutions                     |
| :----------------- | :-------------------------------------- | :------------------------------ |
| Password Policy    | Minimum length, complexity requirements | Implement BR rules validation   |
| Session Management | Token expiration, blacklisting          | Test logout and session timeout |
| Role-based Access  | Different permissions per user group    | Create RBAC test matrix         |

## Risk Identified & Mitigation Planned

| Risk                | Probability | Impact   | Mitigation                          |
| :------------------ | :---------- | :------- | :---------------------------------- |
| Unauthorized access | Medium      | Critical | Comprehensive authorization testing |
| Password exposure   | Low         | Critical | Test password hashing, masking      |
| SQL Injection       | Medium      | Critical | Parameterized query validation      |

## Test Strategy

Security test cases will cover:

- **Authentication Tests:**
  - TC-UC_AUTH_01-01 to 05: Login validation
  - TC-UC_AUTH_04-01 to 05: Password change validation
- **Authorization Tests:**

  - All "Unauthorized" test cases (e.g., TC-UC_MU_01-04, TC-UC_MH_01-04)
  - Permission group restriction tests

- **Session Tests:**
  - TC-UC_AUTH_02-01 to 05: Logout and token invalidation

## Automation Plans

- Automated security scanning with static analysis tools
- Automated authorization boundary tests

## Deliverables

- Security Test Cases
- Security Test Execution Report
- Vulnerability Assessment Report

---

# 12. Performance {#12-performance}

## Constraints and Resolutions

| Parameter         | Constraints                        | Resolutions                          |
| :---------------- | :--------------------------------- | :----------------------------------- |
| Response Time     | < 3 seconds for normal operations  | Optimize queries, implement caching  |
| Export Large Data | >10k records export                | Streaming export implementation      |
| Concurrent Users  | Multiple staff simultaneous access | Connection pooling, async operations |

## Risk Identified & Mitigation Planned

| Risk               | Probability | Impact | Mitigation                                |
| :----------------- | :---------- | :----- | :---------------------------------------- |
| Slow data loading  | Medium      | Medium | Pagination, lazy loading                  |
| Export timeout     | Medium      | Low    | Background processing, progress indicator |
| Database deadlocks | Low         | High   | Transaction isolation level tuning        |

## Test Strategy

Performance test scenarios:

- **Load Testing:** Simulate typical daily usage patterns
- **Stress Testing:** Push system beyond normal limits
- **Export Testing:** Test with 10k+ records (TC-\*-03 scenarios)

Performance benchmarks:
| Operation | Target Response Time |
| :---- | :---- |
| Login | < 2 seconds |
| List view load (100 records) | < 2 seconds |
| CRUD operations | < 1 second |
| Export (1k records) | < 5 seconds |
| Export (10k records) | < 30 seconds |

## Automation Plans

- Automated performance regression tests
- Scheduled load testing runs

## Deliverables

- Performance Test Plan
- Performance Test Results
- Performance Tuning Recommendations

---

# 13. Usability {#13-usability}

## Constraints and Resolutions

| Parameter       | Constraints                            | Resolutions                  |
| :-------------- | :------------------------------------- | :--------------------------- |
| User Experience | Consistent UI across modules           | Follow XAML style guidelines |
| Error Messages  | Clear, actionable messages (MSG 1-116) | Message validation testing   |
| Navigation      | Intuitive menu structure               | User flow testing            |

## Risk Identified & Mitigation Planned

| Risk                   | Probability | Impact | Mitigation                       |
| :--------------------- | :---------- | :----- | :------------------------------- |
| Confusing UI           | Medium      | Medium | User feedback sessions           |
| Unclear error messages | Medium      | Low    | Message review with stakeholders |
| Accessibility issues   | Medium      | Medium | Keyboard navigation testing      |

## Test Strategy

Usability test areas:

- **Navigation Testing:** Verify menu structure and flow
- **Form Validation:** All validation messages display correctly
- **Empty State Handling:** User-friendly empty state messages (TC-\*-03 scenarios)
- **Confirmation Dialogs:** Delete/cancel confirmations work properly

## Compatibility Constraints and Resolutions

| Parameter         | Constraints            | Resolutions            |
| :---------------- | :--------------------- | :--------------------- |
| Screen Resolution | Support 1366x768 to 4K | Responsive WPF layouts |
| Windows Version   | Windows 10/11          | Test on both versions  |
| Display Scaling   | 100%, 125%, 150% DPI   | DPI-aware testing      |

## Automation Plans

- Automated UI regression tests
- Screenshot comparison for visual regression

## Deliverables

- Usability Test Cases
- Usability Test Report
- UI/UX Improvement Recommendations

---

# 14. Test Team Organization {#14-test-team-organization}

| Role               | Responsibility                         | Assigned To   |
| :----------------- | :------------------------------------- | :------------ |
| Test Lead          | Test planning, coordination, reporting | WMS Team Lead |
| Functional Tester  | Execute functional test cases          | WMS Tester 1  |
| Automation Tester  | Develop and maintain test automation   | WMS Tester 2  |
| Performance Tester | Performance and load testing           | WMS Tester 3  |
| UAT Coordinator    | Coordinate user acceptance testing     | WMS Team Lead |

---

# 15. Schedule {#15-schedule}

## Test Schedule and Estimation

| Phase                  | Start Date  | End Date    | Duration |
| :--------------------- | :---------- | :---------- | :------- |
| Test Planning          | 05-Dec-2025 | 10-Dec-2025 | 5 days   |
| Test Case Design       | 11-Dec-2025 | 20-Dec-2025 | 10 days  |
| Test Environment Setup | 21-Dec-2025 | 23-Dec-2025 | 3 days   |
| Unit Testing           | 24-Dec-2025 | 30-Dec-2025 | 7 days   |
| Integration Testing    | 31-Dec-2025 | 07-Jan-2026 | 8 days   |
| System Testing         | 08-Jan-2026 | 20-Jan-2026 | 13 days  |
| UAT                    | 21-Jan-2026 | 28-Jan-2026 | 8 days   |
| Regression Testing     | 29-Jan-2026 | 02-Feb-2026 | 5 days   |

## Effort Estimation by Module

| Module                   | Test Cases | Estimated Hours |
| :----------------------- | :--------- | :-------------- |
| Authentication           | 55         | 22 hours        |
| System Management        | 145        | 58 hours        |
| Master Data - Halls      | 78         | 31 hours        |
| Master Data - Hall Types | 71         | 28 hours        |
| Master Data - Dishes     | 78         | 31 hours        |
| Master Data - Services   | 77         | 31 hours        |
| Master Data - Shifts     | 74         | 30 hours        |
| Customer Booking         | 77         | 31 hours        |
| Staff Booking            | 70         | 28 hours        |
| Customer Payment         | 34         | 14 hours        |
| Staff Invoice            | 40         | 16 hours        |
| Reports & Statistics     | 25         | 10 hours        |
| **Total**                | **824**    | **330 hours**   |

---

# 16. Defects Classification Mechanism {#16-defects-classification-mechanism}

## Defect Severity Matrix

| Type of Defects | Functionality           | Performance          | Security                 | Usability            | Compatibility          |
| :-------------- | :---------------------- | :------------------- | :----------------------- | :------------------- | :--------------------- |
| **Critical**    | System crash, data loss | Complete system hang | Auth bypass, data breach | -                    | App won't launch       |
| **Major**       | Core feature broken     | >10s response time   | Permission bypass        | Cannot complete task | Major display issues   |
| **Minor**       | Feature partially works | 5-10s response time  | Minor exposure           | Confusing workflow   | Minor display issues   |
| **Cosmetic**    | UI text issues          | -                    | -                        | Minor UX issues      | Visual inconsistencies |

## Defects Logging and Status Changing Mechanism

| Status         | Description                      |
| :------------- | :------------------------------- |
| New            | Defect newly identified          |
| Open           | Defect assigned to developer     |
| In Progress    | Developer working on fix         |
| Fixed          | Developer completed fix          |
| Ready for Test | Fix deployed to test environment |
| Verified       | Tester verified fix works        |
| Closed         | Fix confirmed in production      |
| Reopened       | Fix verification failed          |
| Deferred       | Fix postponed to future release  |

## Turn Around Time for Defect Fixes

| Severity | Expected Fix Time | Verification Time |
| :------- | :---------------- | :---------------- |
| Critical | 4 hours           | 2 hours           |
| Major    | 24 hours          | 4 hours           |
| Minor    | 72 hours          | 8 hours           |
| Cosmetic | 1 week            | 24 hours          |

---

# 17. Configuration Management {#17-configuration-management}

## Version Control

- **Repository:** GitHub (se113-wm/se113-wm.github.io)
- **Branch Strategy:**
  - `main` - Production-ready code
  - `develop` - Integration branch
  - `feature/*` - Feature branches
  - `test/*` - Test automation branches

## Test Artifact Management

| Artifact     | Location                                                        | Naming Convention                  |
| :----------- | :-------------------------------------------------------------- | :--------------------------------- |
| Test Plan    | /docs/Testplan/                                                 | WMS-Testplan.md                    |
| Test Cases   | /docs/activity for wedding management system/testing-documents/ | TC-{UC_ID}-{##}.md                 |
| RTM          | /docs/activity for wedding management system/testing-documents/ | requirement-traceability-matrix.md |
| Test Reports | /docs/reports/                                                  | TestReport-{date}.md               |

## Build Configuration

| Environment | Database             | Purpose           |
| :---------- | :------------------- | :---------------- |
| Development | QuanLyTiecCuoi_Dev   | Developer testing |
| Test        | QuanLyTiecCuoi_Test  | QA testing        |
| Staging     | QuanLyTiecCuoi_Stage | UAT               |
| Production  | QuanLyTiecCuoi       | Live system       |

---

# 18. Release Criteria {#18-release-criteria}

## Exit Criteria for Testing Phases

### Unit Testing

- 100% of unit tests executed
- 95% pass rate minimum
- All critical defects resolved

### Integration Testing

- All integration test cases executed
- 90% pass rate minimum
- No critical or major defects open

### System Testing

- All 824 functional test cases executed
- 95% pass rate minimum
- No critical defects, <5 major defects open

### UAT

- All UAT scenarios completed
- Sign-off from stakeholders
- All critical and major defects resolved

## Release Acceptance Criteria

| Criteria              | Target                |
| :-------------------- | :-------------------- |
| Test Case Pass Rate   | ≥ 95%                 |
| Critical Defects      | 0                     |
| Major Defects         | ≤ 3 (with workaround) |
| Code Coverage         | ≥ 70%                 |
| Requirements Coverage | 100%                  |

---

# 19. Appendix {#19-appendix}

## Test Case Field Definitions

| ID  | Test Case Field        | Description                                                           |
| :-- | :--------------------- | :-------------------------------------------------------------------- |
| 1   | Test Case ID           | Unique identifier in format TC-{UC_ID}-{##}                           |
| 2   | Test Priority          | Low, Medium, High                                                     |
| 3   | Test Designed By       | Name of test case writer                                              |
| 4   | Date of Test Designed  | Creation date                                                         |
| 5   | Test Executed By       | Tester's name                                                         |
| 6   | Date of Test Execution | Execution date                                                        |
| 7   | Name/Title             | Brief description (e.g., "Happy path – Login with valid credentials") |
| 8   | Description/Summary    | Detailed test case description                                        |
| 9   | Pre-condition          | Requirements before execution                                         |
| 10  | Test Steps             | Numbered steps (3-8 steps recommended)                                |
| 11  | Test Data              | Input data or reference to data file                                  |
| 12  | Expected Results       | Expected outcome including messages                                   |
| 13  | Post-Condition         | System state after test                                               |
| 14  | Status                 | Pass/Fail                                                             |
| 15  | Notes/Comments         | Special conditions or observations                                    |
| 16  | Requirements           | Mapped BR codes (e.g., BR1, BR2)                                      |
| 17  | Attachments            | Screenshots, logs                                                     |
| 18  | Automation             | Yes/No                                                                |

## Requirements Traceability Matrix Summary

The complete RTM is maintained in `RTM-wedding-managerment-system.xlsx` and covers **824 test cases** mapped to **171 Business Rules**:

| Module                | Use Cases     | BR Codes      | BR Count | Test Cases | Status      |
| :-------------------- | :------------ | :------------ | :------: | :--------: | :---------- |
| Authentication        | UC_AUTH_01-05 | BR1-BR10      |    10    |     55     | Planned     |
| User Management       | UC_MU_01-04   | BR11-BR23     |    13    |     62     | Planned     |
| Permission Management | UC_MP_01-04   | BR24-BR36     |    13    |     57     | Planned     |
| System Settings       | UC_SS_01      | BR37-BR40     |    4     |     26     | Planned     |
| Hall Management       | UC_MH_01-05   | BR41-BR56     |    16    |     78     | Planned     |
| Hall Type Management  | UC_MHT_01-05  | BR57-BR72     |    16    |     71     | Planned     |
| Dish Management       | UC_MM_01-05   | BR73-BR88     |    16    |     78     | Planned     |
| Service Management    | UC_MS_01-05   | BR89-BR104    |    16    |     77     | Planned     |
| Shift Management      | UC_MSH_01-05  | BR105-BR120   |    16    |     74     | Planned     |
| Customer Booking      | UC_CB_01-05   | BR121-BR136   |    16    |     77     | Planned     |
| Staff Booking         | UC_SB_01-06   | BR137-BR151   |    15    |     70     | Planned     |
| Customer Payment      | UC_CP_01-03   | BR152-BR158   |    7     |     34     | Planned     |
| Staff Invoice         | UC_SI_01-03   | BR159-BR166   |    8     |     40     | Planned     |
| Reports               | UC_RS_01-02   | BR167-BR171   |    5     |     25     | Planned     |
| **Total**             | **59 UCs**    | **BR1-BR171** | **171**  |  **824**   | **Planned** |

## Reference Documents

| Document                            | Version | Description                                             |
| :---------------------------------- | :------ | :------------------------------------------------------ |
| WMS_SRS_v1.2_final.md               | 1.8.0   | Software Requirements Specification (171 BRs, 116 MSGs) |
| RTM-wedding-managerment-system.xlsx | 1.0     | Requirements Traceability Matrix (824 TCs)              |
| QuanLyTiecCuoi.sql                  | 1.0     | Database schema                                         |
| Activity Diagrams                   | 1.0     | Activity flow documentation                             |

---

**END OF DOCUMENT**
