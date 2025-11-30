**SOFTWARE REQUIREMENTS SPECIFICATION**

Wedding Management System

**WMS \- Wedding Management System**

## Revision and Signoff Sheet

### Change Record

| Author   | Version | Change reference                                                                                           | Date       |
| :------- | :------ | :--------------------------------------------------------------------------------------------------------- | :--------- |
| WMS Team | 1.0.0   | Initial SRS creation with Authentication Use Cases                                                         | 26/10/2025 |
| WMS Team | 1.2.0   | Refined BR descriptions following activity flows                                                           | 10/11/2025 |
| WMS Team | 1.3.0   | Added Edit/Delete Permission Group, Manage System Parameters; BR line breaks                               | 11/11/2025 |
| WMS Team | 1.4.0   | Added Master Data Management: Manage Halls (5 UCs), Manage Hall Types (5 UCs); BR41-BR72; MSG 31-50        | 14/11/2025 |
| WMS Team | 1.5.0   | Added Manage Dishes (5 UCs), Manage Services (5 UCs); BR73-BR104; MSG 51-71                                | 17/11/2025 |
| WMS Team | 1.6.0   | Added Manage Shifts (5 UCs) + Export, Customer Booking (6 UCs); BR105-BR137; MSG 72-98                     | 26/11/2025 |
| WMS Team | 1.7.0   | Added Forgot Password, Staff Booking Management (6 UCs), Customer Payment (3 UCs); BR138-BR159; MSG 99-112 | 27/11/2025 |
| WMS Team | 1.8.0   | Added Staff Invoice Management (3 UCs), Reports & Statistics (2 UCs); BR160-BR171; MSG 114-116             | 30/11/2025 |

### Reviewers

| Name            | Company | Version | Position        | Date       |
| :-------------- | :------ | :------ | :-------------- | :--------- |
| Project Manager | WMS     | 1.2.0   | Project Manager | 30/11/2025 |

# Table of Contents

[**Revision and Signoff Sheet 2**](#revision-and-signoff-sheet)

[Change Record 2](#change-record)

[Reviewers 2](#reviewers)

[**Table of Contents 3**](#table-of-contents)

[**1\. Introduction 5**](#1-introduction)

[1.1 Purpose 5](#11-purpose)

[1.2 Scope 5](#12-scope)

[1.3 Intended Audiences and Document Organization 5](#13-intended-audiences-and-document-organization)

[1.4 References 6](#14-references)

[**2\. Functional Requirements 6**](#2-functional-requirements)

[2.1 Use Case Description 6](#21-use-case-description)

[2.1.1 Authentication Use Case 6](#211-authentication-use-case)

[2.1.1.1 Login 6](#2111-login)

[2.1.1.2 Logout 8](#2112-logout)

[2.1.1.3 Manage Profile 9](#2113-manage-profile)

[2.1.1.4 Change Password 10](#2114-change-password)

[2.1.1.5 Forgot Password 11](#2115-forgot-password)

[2.1.2 System Management Use Case 11](#212-system-management-use-case)

[2.1.2.1 View User Details 11](#2121-view-user-details)

[2.1.2.2 Add New User 12](#2122-add-new-user)

[2.1.2.3 Edit User 13](#2123-edit-user)

[2.1.2.4 Delete User 14](#2124-delete-user)

[2.1.2.5 View Permission Group Details 15](#2125-view-permission-group-details)

[2.1.2.6 Add New Permission Group 16](#2126-add-new-permission-group)

[2.1.2.7 Edit Permission Group 17](#2127-edit-permission-group)

[2.1.2.8 Delete Permission Group 18](#2128-delete-permission-group)

[2.1.2.9 Manage System Parameters 19](#2129-manage-system-parameters)

[**2.1.3 Master Data Management**](#213-master-data-management)

[2.1.3.1 View Hall Details 20](#2131-view-hall-details)

[2.1.3.2 Add New Hall 21](#2132-add-new-hall)

[2.1.3.3 Edit Hall 22](#2133-edit-hall)

[2.1.3.4 Delete Hall 23](#2134-delete-hall)

[2.1.3.5 Export Hall List 24](#2135-export-hall-list)

[2.1.3.6 View Hall Type Details 25](#2136-view-hall-type-details)

[2.1.3.7 Add New Hall Type 26](#2137-add-new-hall-type)

[2.1.3.8 Edit Hall Type 27](#2138-edit-hall-type)

[2.1.3.9 Delete Hall Type 28](#2139-delete-hall-type)

[2.1.3.10 Export Hall Type List 29](#21310-export-hall-type-list)

[2.1.3.11 View Dish Details 30](#21311-view-dish-details)

[2.1.3.12 Add New Dish 31](#21312-add-new-dish)

[2.1.3.13 Edit Dish 32](#21313-edit-dish)

[2.1.3.14 Delete Dish 33](#21314-delete-dish)

[2.1.3.15 Export Dishes to Excel 34](#21315-export-dishes-to-excel)

[2.1.3.16 View Service Details 35](#21316-view-service-details)

[2.1.3.17 Add New Service 36](#21317-add-new-service)

[2.1.3.18 Edit Service 37](#21318-edit-service)

[2.1.3.19 Delete Service 38](#21319-delete-service)

[2.1.3.20 Export Services to Excel 39](#21320-export-services-to-excel)

[2.1.3.21 View Shift Details 40](#21321-view-shift-details)

[2.1.3.22 Add New Shift 41](#21322-add-new-shift)

[2.1.3.23 Edit Shift 42](#21323-edit-shift)

[2.1.3.24 Delete Shift 43](#21324-delete-shift)

[2.1.3.25 Export Shifts to Excel 44](#21325-export-shifts-to-excel)

[**2.1.4 Customer Booking Operations**](#214-customer-booking-operations)

[2.1.4.1 Register Account 45](#2141-register-account)

[2.1.4.2 Check Hall Availability 46](#2142-check-hall-availability)

[2.1.4.3 Submit Wedding Reservation 47](#2143-submit-wedding-reservation)

[2.1.4.4 View My Booking Details 48](#2144-view-my-booking-details)

[2.1.4.5 Edit My Booking Request 49](#2145-edit-my-booking-request)

[2.1.4.6 Cancel My Booking 50](#2146-cancel-my-booking)

[**2.1.5 Staff Booking Management**](#215-staff-booking-management)

[2.1.5.1 Check System Hall Availability 51](#2151-check-system-hall-availability)

[2.1.5.2 Create Booking for Customer 52](#2152-create-booking-for-customer)

[2.1.5.3 Delete Booking 53](#2153-delete-booking)

[2.1.5.4 Search/Filter All Bookings 54](#2154-searchfilter-all-bookings)

[2.1.5.5 View Any Booking Details 55](#2155-view-any-booking-details)

[2.1.5.6 Modify Booking Details 56](#2156-modify-booking-details)

[**2.1.6 Customer Payment & Invoice**](#216-customer-payment--invoice)

[2.1.6.1 View My Invoice & Debt 57](#2161-view-my-invoice--debt)

[2.1.6.2 Pay My Invoice 58](#2162-pay-my-invoice)

[2.1.6.3 Export My Invoice to PDF 59](#2163-export-my-invoice-to-pdf)

[**2.1.7 Staff Invoice Management**](#217-staff-invoice-management)

[2.1.7.1 View Any Invoice & Debt 60](#2171-view-any-invoice--debt)

[2.1.7.2 Confirm Payment & Calculate Penalty 61](#2172-confirm-payment--calculate-penalty)

[2.1.7.3 Export Any Invoice to PDF 62](#2173-export-any-invoice-to-pdf)

[**2.1.8 Reports & Statistics**](#218-reports--statistics)

[2.1.8.1 View Revenue Chart 63](#2181-view-revenue-chart)

[2.1.8.2 Export Report to Excel 64](#2182-export-report-to-excel)

[**3\. Non-functional Requirements 17**](#3-non-functional-requirements)

[**4\. Other Requirements 17**](#4-other-requirements)

[**5\. Appendixes 17**](#5-appendixes)

[5.1 Glossary 17](#51-glossary)

[5.2 Messages 17](#52-messages)

[5.3 Issues List 18](#53-issues-list)

## 1\. Introduction

### 1.1 Purpose

This Software Requirements Specification document outlines the comprehensive requirements for the "WMS" (Wedding Management System) platform. This document serves as a detailed technical foundation for the development, deployment, and maintenance of the desktop WPF application. It provides developers with clear guidelines for planning, task assignment, and implementation. Additionally, quality assurance teams will utilize this document to design test cases that align with specified requirements, ensuring the final product meets both quality standards and user expectations for a wedding management system.

### 1.2 Scope

This document encompasses the WMS platform, which is designed to provide a comprehensive wedding management system for booking wedding halls, managing menus and services, handling customer bookings, and processing payments. The system supports multiple user roles including Staff and Administrator, each with distinct functionalities for managing halls, bookings, and administering the platform.

### 1.3 Intended Audiences and Document Organization

This document is intended for:

- **Development Team**: Responsible for creating detailed designs, implementing features, and performing unit testing, integration testing, and system testing for the application using WPF and C# with Entity Framework.
- **Quality Assurance Team**: Responsible for conducting user acceptance test sessions and validating system requirements.
- **Documentation Team**: Responsible for creating user guides and help documentation for the application.
- **Project Stakeholders**: Business owners and managers who need to understand system capabilities and requirements.

Below are the main sections of this document:

**1\. Introduction**: General introduction and overview of this document.
**2\. Functional Requirements**: Detailed description of functional requirements including use cases and business rules.
**3\. Non-functional Requirements**: Description of non-functional requirements such as security, performance, and interface requirements.
**4\. Other Requirements**: Additional requirements including archive functions and other supporting features.
**5\. Appendixes**: Supporting information including glossary, messages, and issues list.

### 1.4 References

| \#  | Title             | Version | File Name / Link       | Description                                        |
| :-- | :---------------- | :------ | :--------------------- | :------------------------------------------------- |
| 1   | Use Case Diagrams | 1.0.0   | Use Case Documentation | Complete use case diagrams for all user roles      |
| 2   | Activity Diagrams | 1.0.0   | Activity Documentation | Activity flow diagrams for business processes      |
| 3   | Database Schema   | 1.0.0   | QuanLyTiecCuoi.sql     | Entity-relationship diagrams and table definitions |

## 2\. Functional Requirements

### 2.1 Use Case Description

#### 2.1.1 Authentication Use Case

##### 2.1.1.1 Login

###### _Use Case Description_

| Name               | Login                                                                                                                                        |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows users (Staff, Administrator) to authenticate and access the WMS system using their credentials (username and password). |
| **Actor**          | Staff, Administrator                                                                                                                         |
| **Trigger**        | When the user clicks on the "Login" button on the corresponding screen.                                                                      |
| **Pre-condition**  | User's device must be connected to the internet. User's account must have been in the system.                                                |
| **Post-condition** | User is signed in the system and redirected to role-specific home page.                                                                      |

###### _Activities Flow_

(Refer to "Activity Login" diagram in "Activity for wedding management system/auth" folder)

###### _Business Rules_

| Activity                                | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :-------------------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_                              | _BR1_   | **Displaying Rules:** The system displays a "LoginWindow" screen.<br>(Refer to "LoginWindow" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| _(3), (4), (5), (5.1)_                  | _BR2_   | **Validation Rules:** When user clicks button \[LoginButton\] on the screen, the system will use method `Login(Window window)` in `LoginViewModel` to check that the input is valid (empty or not).<br>These fields include: \[UsernameTextBox\] and \[PasswordBox\].<br>If the input is not valid: System moves to step (5.1) to display an error message.<br>IF \[Username\].IsEmpty = TRUE, the system will display a message for requiring user to enter username. (Refer to MSG 1)<br>IF \[Password\].IsEmpty = TRUE, the system will display a message for requiring user to enter password. (Refer to MSG 1)                                                                                                                                                                                                                                             |
| _(6), (6.1), (7), (8), (9), (10), (11)_ | _BR3_   | **Querying Rules:** The input data (username and password) will be checked by table "AppUser" in the database (Refer to "AppUser" table in "QuanLyTiecCuoi.sql" file) if it exists in the system.<br>The system uses method `MD5Hash(Base64Encode(Password))` in `PasswordHelper` class to hash the password, then queries users by syntax "SELECT \* FROM AppUser WHERE Username = \[inputUsername\] AND PasswordHash = \[hashedPassword\]".<br>IF \[users\].Count = 0, the system moves to step (6.1) and displays an error message for incorrect credentials. (Refer to MSG 2)<br>ELSE system moves to step (7)-(11): stores current user to session by method `setCurrentUser(user)`, creates new MainWindow with MainViewModel as DataContext, shows MainWindow and closes LoginWindow.<br>System displays successful login notification. (Refer to MSG 3) |

##### 2.1.1.2 Logout

###### _Use Case Description_

| Name               | Logout                                                                                                |
| :----------------- | :---------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows authenticated users to log out from the WMS system and return to the login page. |
| **Actor**          | Staff, Administrator                                                                                  |
| **Trigger**        | When the user clicks on the "Logout" button from navigation menu.                                     |
| **Pre-condition**  | User must be authenticated and have an active session.                                                |
| **Post-condition** | User session is cleared, and user is redirected to login page.                                        |

###### _Activities Flow_

(Refer to "Activity Logout" diagram in "Activity for wedding management system/auth" folder)

###### _Business Rules_

| Activity                                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :--------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3), (4), (5), (6), (7), (8)_ | _BR4_   | **Processing Rules:** When user clicks \[LogoutButton\] on the navigation menu, the system will use `LogoutCommand` in `MainViewModel` to process the logout request.<br>System creates new LoginWindow with LoginViewModel as DataContext by method `getService(LoginViewModel)`, reinitializes database context by method `resetDatabaseContext()`, shows LoginWindow, calls method `LoadButtonVisibility()` to reset button visibility states, calls method `clearCurrentUser()` to clear current session, and closes current MainWindow. |

##### 2.1.1.3 Manage Profile

###### _Use Case Description_

| Name               | Manage Profile                                                                                                                           |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows authenticated users to view and update their personal profile information including username, full name, and email. |
| **Actor**          | Staff, Administrator                                                                                                                     |
| **Trigger**        | When the user clicks "Account" menu item from navigation bar.                                                                            |
| **Pre-condition**  | User must be authenticated with valid active session.                                                                                    |
| **Post-condition** | User's profile information is updated in system and changes are saved to database.                                                       |

###### _Activities Flow_

(Refer to "Activity Manage Profile" diagram in "Activity for wedding management system/auth" folder)

###### _Business Rules_

| Activity                    | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :-------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_                  | _BR5_   | **Displaying Rules:** When user selects function Manage Profile by clicking \[AccountCommand\], the system reinitializes database context by method `resetDatabaseContext()`, creates new AccountView with AccountViewModel as DataContext by method `getService(AccountViewModel)`.<br>The AccountViewModel constructor loads current user data by method `getCurrentUser()` and displays "AccountView" screen with fields: \[Username\], \[FullName\], \[Email\], \[GroupName\].<br>(Refer to "AccountView" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                      |
| _(3), (4), (5), (5.1)_      | _BR6_   | **Validation Rules:** When user edits profile information and clicks \[SaveButton\], the system will use `SaveCommand` in `AccountViewModel` to validate data.<br>IF \[Username\] = \[currentUser.Username\] AND \[FullName\] = \[currentUser.FullName\] AND \[Email\] = \[currentUser.Email\], the system displays info message and returns false. (Refer to MSG 16)<br>IF \[Username\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 11)<br>IF isDuplicateUsername(\[Username\], \[currentUser.UserId\]) = TRUE, the system displays validation message and returns false. (Refer to MSG 5)<br>IF \[FullName\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 13)<br>IF isValidEmail(\[Email\]) = FALSE (checked by method `IsValidEmail(email)` in `EmailValidationHelper` class), the system displays validation message and returns false. (Refer to MSG 4) |
| _(6), (7), (7a), (8), (8a)_ | _BR7_   | **Processing Rules:** After validation passes, the system creates AppUserDTO object with updated values (UserId, Username, PasswordHash, FullName, Email, GroupId, UserGroup), calls method `Update(updateDto)` in `AppUserService` class to update AppUser record in database by syntax "UPDATE AppUser SET Username = \[Username\], FullName = \[FullName\], Email = \[Email\] WHERE UserId = \[UserId\]".<br>System updates current user session with new values and displays success notification. (Refer to MSG 6)<br>IF exception occurs, system displays error message. (Refer to MSG 113)                                                                                                                                                                                                                                                                                                                                                   |

##### 2.1.1.4 Change Password

###### _Use Case Description_

| Name               | Change Password                                                                                                   |
| :----------------- | :---------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows authenticated users to change their password by providing current password and new password. |
| **Actor**          | Staff, Administrator                                                                                              |
| **Trigger**        | When user selects function Change Password.                                                                       |
| **Pre-condition**  | User must be authenticated with valid active session.                                                             |
| **Post-condition** | User's password is updated in database and user is redirected to login page.                                      |

###### _Activities Flow_

(Refer to "Activity Change Password" diagram in "Activity for wedding management system/auth" folder)

###### _Business Rules_

| Activity                         | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :------------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_                       | _BR8_   | **Displaying Rules:** The system displays a change password form within "AccountView" screen with fields: \[CurrentPassword\], \[NewPassword\], \[ConfirmNewPassword\].<br>The password fields use PasswordBox control and values are captured by method `PasswordChangedCommand(PasswordBox)` in `AccountViewModel`.<br>(Refer to "AccountView" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                             |
| _(3), (4), (5), (5.1)_           | _BR9_   | **Validation Rules:** When user enters passwords and clicks \[ChangePasswordButton\], the system will use `ChangePasswordCommand` in `AccountViewModel` to validate inputs.<br>IF \[CurrentPassword\].IsEmpty = TRUE OR \[NewPassword\].IsEmpty = TRUE OR \[ConfirmNewPassword\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 10)<br>IF \[NewPassword\] != \[ConfirmNewPassword\], the system displays validation message and returns false. (Refer to MSG 7)                                                                                                                                                                                                                                      |
| _(6), (7), (7a), (8), (8a), (9)_ | _BR10_  | **Processing Rules:** After validation passes, the system verifies current password by method `verifyPassword(CurrentPassword, storedHash)` which compares \[hashedCurrentPassword\] with \[user.PasswordHash\].<br>IF \[hashedCurrentPassword\] != \[user.PasswordHash\], system displays validation message and returns false. (Refer to MSG 8)<br>ELSE the system hashes new password by method `MD5Hash(Base64Encode(NewPassword))` in `PasswordHelper` class, calls method `Update(updateDto)` in `AppUserService` class to update in database by syntax "UPDATE AppUser SET PasswordHash = \[newHash\] WHERE UserId = \[UserId\]", calls method `Reset()` to clear password fields, and displays success notification. (Refer to MSG 9) |

##### 2.1.1.5 Forgot Password

###### _Use Case Description_

| Name               | Forgot Password                                                          |
| :----------------- | :----------------------------------------------------------------------- |
| **Description**    | This use case allows users to reset their password via registered email. |
| **Actor**          | Customer, Staff, Administrator                                           |
| **Trigger**        | When user clicks "Forgot Password" link on login page.                   |
| **Pre-condition**  | User is not logged in. User has a registered email in the system.        |
| **Post-condition** | Password reset link is sent to user's email or password is reset.        |

###### _Activities Flow_

(Refer to "Activity Forgot Password" diagram in "Activity for wedding management system/auth" folder)

###### _Business Rules_

| Activity               | BR Code | Description                                                                                                                                                                                                                                                                                                                                                        |
| :--------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_             | _BR11A_ | **Displaying Rules:** When user clicks "Quên mật khẩu" link on login page, the system displays forgot password form with field: \[Email\].                                                                                                                                                                                                                         |
| _(3), (4), (5), (5.1)_ | _BR11B_ | **Validation Rules:** When user enters email and clicks \[SendResetButton\], the system validates data.<br>IF \[Email\].IsEmpty = TRUE, displays validation message. (Refer to MSG 4)<br>IF isValidEmailFormat(\[Email\]) = FALSE, displays validation message. (Refer to MSG 4)<br>IF email not found in database, displays validation message. (Refer to MSG 99) |
| _(6), (7), (8)_        | _BR11C_ | **Processing Rules:** After validation passes, the system generates password reset token, stores token with expiration time (24 hours) in database.<br>System sends email with reset link to user's email address and displays success notification. (Refer to MSG 100)                                                                                            |

#### 2.1.2 System Management Use Case

##### 2.1.2.1 View User Details

###### _Use Case Description_

| Name               | View User Details                                                                                 |
| :----------------- | :------------------------------------------------------------------------------------------------ |
| **Description**    | This use case allows Administrator to view the list of all users and their details in the system. |
| **Actor**          | Administrator                                                                                     |
| **Trigger**        | When Admin selects view user details function.                                                    |
| **Pre-condition**  | Admin must be authenticated with valid active session and have "User" permission.                 |
| **Post-condition** | User list is displayed with all user information.                                                 |

###### _Activities Flow_

(Refer to "Activity View User Details" diagram in "Activity for wedding management system/manage-users" folder)

###### _Business Rules_

| Activity              | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :-------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_            | _BR11_  | **Displaying Rules:** When admin clicks \[UserCommand\], the system reinitializes database context by method `resetDatabaseContext()`, creates new UserView with UserViewModel as DataContext by method `getService(UserViewModel)`.<br>The UserViewModel constructor loads users from database by method `GetAll()` in `AppUserService` class with syntax "SELECT \* FROM AppUser WHERE GroupId != \[currentGroupId\] AND GroupId != 'ADMIN'", loads user types by method `GetAll()` in `UserGroupService` class with same filter, and displays "UserView" screen with DataGrid showing list of users.<br>(Refer to "UserView" view in "View Description" file) |
| _(3), (4), (5), (6)_  | _BR12_  | **Searching Rules:** When admin enters search text in \[SearchText\] field, the system uses method `PerformSearch()` in `UserViewModel` to filter users.<br>The method checks \[SelectedSearchProperty\] and filters \[OriginalList\] accordingly:<br>IF \[SelectedSearchProperty\] = "Username", filter by \[Username\] CONTAINS \[SearchText\].<br>IF \[SelectedSearchProperty\] = "FullName", filter by \[FullName\] CONTAINS \[SearchText\].<br>IF \[SelectedSearchProperty\] = "GroupId", filter by \[GroupId\] CONTAINS \[SearchText\].<br>IF \[SelectedSearchProperty\] = "Email", filter by \[Email\] CONTAINS \[SearchText\].                           |
| _(7), (8), (9), (10)_ | _BR13_  | **Selection Rules:** When admin selects user from DataGrid, the system triggers property setter `setSelectedItem(user)` in `UserViewModel`.<br>The system populates form fields: \[Username\] = \[SelectedItem.Username\], \[NewPassword\] = empty, \[FullName\] = \[SelectedItem.FullName\], \[Email\] = \[SelectedItem.Email\], \[SelectedUserType\] = getUserType(\[SelectedItem.GroupId\]).<br>Admin views user information and can close dialog or proceed to edit/delete.                                                                                                                                                                                  |

##### 2.1.2.2 Add New User

###### _Use Case Description_

| Name               | Add New User                                                                   |
| :----------------- | :----------------------------------------------------------------------------- |
| **Description**    | This use case allows Administrator to add a new user (staff) to the system.    |
| **Actor**          | Administrator                                                                  |
| **Trigger**        | When Admin selects function Add New User.                                      |
| **Pre-condition**  | Admin must be authenticated and have "User" permission. UserView is displayed. |
| **Post-condition** | New user is created in database and displayed in user list.                    |

###### _Activities Flow_

(Refer to "Activity Add New User" diagram in "Activity for wedding management system/manage-users" folder)

###### _Business Rules_

| Activity                    | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :-------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(1), (2)_                  | _BR14_  | **Displaying Rules:** When admin selects action "Add" from \[SelectedAction\], the system sets \[IsAdding\] = TRUE, \[IsEditing\] = FALSE, \[IsDeleting\] = FALSE, \[IsExporting\] = FALSE and calls method `Reset()` to clear form fields.<br>The system displays add user form with fields: \[Username\], \[NewPassword\], \[FullName\], \[Email\], \[SelectedUserType\] dropdown, and \[IsPasswordChangeEnabled\] checkbox.<br>(Refer to "UserView" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| _(3), (4), (5), (6), (6.1)_ | _BR15_  | **Validation Rules:** When admin enters user information and clicks \[AddCommand\], the system will use `AddCommand` in `UserViewModel` to validate data.<br>IF \[Username\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 11)<br>IF \[IsPasswordChangeEnabled\] = FALSE OR \[NewPassword\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 12)<br>IF \[FullName\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 13)<br>IF \[SelectedUserType\] = NULL, the system displays validation message and returns false. (Refer to MSG 14)<br>IF isValidEmail(\[Email\]) = FALSE (checked by method `IsValidEmail(email)` in `EmailValidationHelper` class), the system displays validation message and returns false. (Refer to MSG 4)<br>IF isDuplicateUsername(\[Username\]) = TRUE (checked by syntax "SELECT COUNT(\*) FROM AppUser WHERE Username = \[Username\]"), the system displays validation message and returns false. (Refer to MSG 5) |
| _(7), (8), (9), (10)_       | _BR16_  | **Processing Rules:** After validation passes, the system creates new AppUserDTO object with: \[Username\], \[PasswordHash\] = MD5Hash(Base64Encode(\[NewPassword\])) (using method `MD5Hash(Base64Encode(password))` in `PasswordHelper` class), \[FullName\], \[Email\], \[GroupId\] = \[SelectedUserType.GroupId\].<br>System calls method `Create(newUser)` in `AppUserService` class to insert into database by syntax "INSERT INTO AppUser (Username, PasswordHash, FullName, Email, GroupId) VALUES (...)", adds to \[UserList\], calls method `Reset()` to clear form, and displays success notification.<br>(Refer to MSG 15)                                                                                                                                                                                                                                                                                                                                                                                                                                    |

##### 2.1.2.3 Edit User

###### _Use Case Description_

| Name               | Edit User                                                                                |
| :----------------- | :--------------------------------------------------------------------------------------- |
| **Description**    | This use case allows Administrator to edit an existing user's information in the system. |
| **Actor**          | Administrator                                                                            |
| **Trigger**        | When Admin selects function Edit User.                                                   |
| **Pre-condition**  | Admin must be authenticated with "User" permission. A user must be selected.             |
| **Post-condition** | User information is updated in database and reflected in user list.                      |

###### _Activities Flow_

(Refer to "Activity Edit User" diagram in "Activity for wedding management system/manage-users" folder)

###### _Business Rules_

| Activity                      | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :---------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(1), (2), (2.1), (2.2), (3)_ | _BR17_  | **Displaying Rules:** When admin selects action "Edit" from \[SelectedAction\], the system sets \[IsAdding\] = FALSE, \[IsEditing\] = TRUE, \[IsDeleting\] = FALSE, \[IsExporting\] = FALSE and calls method `Reset()`.<br>When admin selects a user from DataGrid, the system triggers property setter `setSelectedItem(user)` to populate form with current data.<br>(Refer to "UserView" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| _(4), (5), (6), (6.1)_        | _BR18_  | **Validation Rules:** When admin edits user information and clicks \[EditCommand\], the system will use `EditCommand` in `UserViewModel` to validate data.<br>IF \[SelectedItem\] = NULL, returns false.<br>IF no changes detected, the system displays info message and returns false. (Refer to MSG 16)<br>IF \[Username\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 11)<br>IF isDuplicateUsername(\[Username\], \[SelectedItem.UserId\]) = TRUE (checked by syntax "SELECT COUNT(\*) FROM AppUser WHERE Username = \[Username\] AND UserId != \[SelectedItem.UserId\]"), the system displays validation message and returns false. (Refer to MSG 5)<br>IF \[FullName\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 13)<br>IF isValidEmail(\[Email\]) = FALSE (checked by method `IsValidEmail(email)` in `EmailValidationHelper` class), the system displays validation message and returns false. (Refer to MSG 4)<br>IF \[IsPasswordChangeEnabled\] = TRUE AND \[NewPassword\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 12) |
| _(7), (8), (9), (10)_         | _BR19_  | **Processing Rules:** After validation passes, the system creates AppUserDTO object with: \[UserId\] = \[SelectedItem.UserId\], \[Username\], \[FullName\], \[Email\], \[GroupId\] = \[SelectedUserType.GroupId\].<br>IF \[NewPassword\].IsEmpty = FALSE, sets \[PasswordHash\] = MD5Hash(Base64Encode(\[NewPassword\])) (using method `MD5Hash(Base64Encode(password))` in `PasswordHelper` class).<br>ELSE keeps existing password by method `GetById(UserId)` in `AppUserService` class.<br>System calls method `Update(updateDto)` in `AppUserService` class to update in database by syntax "UPDATE AppUser SET Username = \[Username\], FullName = \[FullName\], Email = \[Email\], GroupId = \[GroupId\], PasswordHash = \[PasswordHash\] WHERE UserId = \[UserId\]", updates \[UserList\] at selected index, calls method `Reset()`, and displays success notification.<br>(Refer to MSG 17)                                                                                                                                                                                                                                                                      |

##### 2.1.2.4 Delete User

###### _Use Case Description_

| Name               | Delete User                                                                    |
| :----------------- | :----------------------------------------------------------------------------- |
| **Description**    | This use case allows Administrator to delete an existing user from the system. |
| **Actor**          | Administrator                                                                  |
| **Trigger**        | When Admin selects delete user function.                                       |
| **Pre-condition**  | Admin must be authenticated with "User" permission. A user must be selected.   |
| **Post-condition** | User is removed from database and no longer displayed in user list.            |

###### _Activities Flow_

(Refer to "Activity Delete User" diagram in "Activity for wedding management system/manage-users" folder)

###### _Business Rules_

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :----------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(1), (2), (3), (4)_     | _BR20_  | **Displaying Rules:** When admin selects action "Delete" from \[SelectedAction\], the system sets \[IsAdding\] = FALSE, \[IsEditing\] = FALSE, \[IsDeleting\] = TRUE, \[IsExporting\] = FALSE and calls method `Reset()`.<br>The system displays users list in DataGrid. Admin selects user to delete.<br>(Refer to "UserView" view in "View Description" file)                                                                                         |
| _(5), (5.1), (5.2)_      | _BR21_  | **Validation Rules:** The `DeleteCommand` in `UserViewModel` checks if a user is selected.<br>IF \[SelectedItem\] = NULL, the command returns false and cannot execute.                                                                                                                                                                                                                                                                                 |
| _(6), (7), (7.1), (7.2)_ | _BR22_  | **Confirmation Rules:** When delete command is executed, the system displays confirmation dialog.<br>IF user clicks "No" button, the operation is cancelled and no changes are made.                                                                                                                                                                                                                                                                    |
| _(8), (9), (10)_         | _BR23_  | **Processing Rules:** IF admin clicks "Yes" button to confirm delete, the system calls method `Delete(UserId)` in `AppUserService` class to delete user from database by syntax "DELETE FROM AppUser WHERE UserId = \[SelectedItem.UserId\]", removes user from \[UserList\], calls method `Reset()` to clear selection, and displays success notification. (Refer to MSG 18)<br>IF exception occurs, system displays error message. (Refer to MSG 113) |

##### 2.1.2.5 View Permission Group Details

###### _Use Case Description_

| Name               | View Permission Group Details                                                                       |
| :----------------- | :-------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows Administrator to view the list of all permission groups and their permissions. |
| **Actor**          | Administrator                                                                                       |
| **Trigger**        | When Admin selects view permission groups function.                                                 |
| **Pre-condition**  | Admin must be authenticated with valid active session and have "Permission" permission.             |
| **Post-condition** | Permission group list is displayed with all group information and their associated permissions.     |

###### _Activities Flow_

(Refer to "Activity View Permission Group Details" diagram in "Activity for wedding management system/manage-permissions" folder)

###### _Business Rules_

| Activity              | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :-------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_            | _BR24_  | **Displaying Rules:** When admin clicks \[PermissionCommand\], the system reinitializes database context by method `resetDatabaseContext()`, creates new PermissionView with PermissionViewModel as DataContext.<br>The PermissionViewModel constructor loads permission groups from database by method `GetAll()` in `UserGroupService` class with syntax "SELECT \* FROM UserGroup WHERE GroupName != 'Administrator' AND GroupId != \[currentGroupId\]", initializes \[PermissionStates\] dictionary with permission checkboxes for each function (Home, HallType, Hall, Shift, Food, Service, Wedding, Report, Parameter, Permission, User), and displays "PermissionView" screen with DataGrid showing list of permission groups.<br>(Refer to "PermissionView" view in "View Description" file) |
| _(3), (4), (5), (6)_  | _BR25_  | **Searching Rules:** When admin enters search text in \[SearchText\] field, the system uses method `PerformSearch()` in `PermissionViewModel` to filter groups.<br>The method filters \[OriginalList\] by \[GroupName\] CONTAINS \[SearchText\].<br>IF \[SearchText\].IsEmpty = TRUE OR \[SelectedSearchProperty\] = NULL, the system resets \[GroupList\] = \[OriginalList\].                                                                                                                                                                                                                                                                                                                                                                                                                        |
| _(7), (8), (9), (10)_ | _BR26_  | **Selection Rules:** When admin selects permission group from DataGrid, the system triggers property setter `setSelectedItem(group)` in `PermissionViewModel`.<br>The system sets \[GroupName\] = \[SelectedItem.GroupName\], \[IsSelected\] = TRUE, and calls method `UpdatePermissionStates()` to populate checkboxes.<br>The `UpdatePermissionStates()` method queries permissions from database by syntax "SELECT PermissionId FROM Permission WHERE GroupId = \[SelectedItem.GroupId\]" and sets \[IsChecked\] state for each PermissionState based on whether \[permissionIdSet\] CONTAINS \[state.PermissionId\].<br>Admin views permission group information with assigned functions.                                                                                                         |

##### 2.1.2.6 Add New Permission Group

###### _Use Case Description_

| Name               | Add New Permission Group                                                                   |
| :----------------- | :----------------------------------------------------------------------------------------- |
| **Description**    | This use case allows Administrator to add a new permission group to the system.            |
| **Actor**          | Administrator                                                                              |
| **Trigger**        | When Admin selects function Add New Permission Group.                                      |
| **Pre-condition**  | Admin must be authenticated and have "Permission" permission. PermissionView is displayed. |
| **Post-condition** | New permission group is created in database and displayed in group list.                   |

###### _Activities Flow_

(Refer to "Activity Add New Permission Group" diagram in "Activity for wedding management system/manage-permissions" folder)

###### _Business Rules_

| Activity                    | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :-------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_                  | _BR27_  | **Displaying Rules:** When admin selects action "Add" from \[SelectedAction\], the system sets \[IsAdding\] = TRUE, \[IsEditing\] = FALSE, \[IsDeleting\] = FALSE and calls method `Reset()` to clear form.<br>The system displays add permission group form with field \[GroupName\] and function checkboxes from \[PermissionStates\] dictionary (Home, HallType, Hall, Shift, Food, Service, Wedding, Report, Parameter, Permission, User).<br>(Refer to "PermissionView" view in "View Description" file)                                                                                                                                                                                 |
| _(3), (4), (5), (6), (6.1)_ | _BR28_  | **Validation Rules:** When admin enters group name and clicks \[AddCommand\], the system will use `AddCommand` in `PermissionViewModel` to validate data.<br>IF \[GroupName\].IsEmpty = TRUE, the system displays error message and returns false. (Refer to MSG 20)<br>IF \[GroupName\] = "Administrator" OR \[GroupName\].ToLower CONTAINS "administrator" OR \[GroupName\].ToLower CONTAINS "admin", the system displays error message and returns false. (Refer to MSG 21)<br>IF isDuplicateGroupName(\[GroupName\]) = TRUE (checked by syntax "SELECT COUNT(\*) FROM UserGroup WHERE GroupName = \[GroupName\]"), the system displays error message and returns false. (Refer to MSG 22) |
| _(7), (8), (9), (10)_       | _BR29_  | **Processing Rules:** After validation passes, the system generates unique GroupId by method `generateGroupId()` which returns "GR" + random 8 characters and validates uniqueness by syntax "SELECT COUNT(\*) FROM UserGroup WHERE GroupId = \[groupId\]".<br>System creates new UserGroupDTO object with \[GroupName\] = \[GroupName\].Trim and generated \[GroupId\], calls method `Create(newGroup)` in `UserGroupService` class to insert into database by syntax "INSERT INTO UserGroup (GroupId, GroupName) VALUES (...)", adds to \[GroupList\], calls method `Reset()`, and displays success notification. (Refer to MSG 23)                                                         |

##### 2.1.2.7 Edit Permission Group

###### _Use Case Description_

| Name               | Edit Permission Group                                                                           |
| :----------------- | :---------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows Administrator to edit an existing permission group's name and permissions. |
| **Actor**          | Administrator                                                                                   |
| **Trigger**        | When Admin selects function Edit Permission Group.                                              |
| **Pre-condition**  | Admin must be authenticated with "Permission" permission. A permission group must be selected.  |
| **Post-condition** | Permission group is updated in database and reflected in group list.                            |

###### _Activities Flow_

(Refer to "Activity Edit Permission Group" diagram in "Activity for wedding management system/manage-permissions" folder)

###### _Business Rules_

| Activity                  | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :------------------------ | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3), (4), (5)_ | _BR30_  | **Displaying Rules:** When admin selects action "Edit" from \[SelectedAction\], the system sets \[IsAdding\] = FALSE, \[IsEditing\] = TRUE, \[IsDeleting\] = FALSE and calls method `Reset()`.<br>When admin selects a permission group from DataGrid, the system triggers property setter `setSelectedItem(group)` to populate form with current data.<br>The system queries current permissions by syntax "SELECT PermissionId FROM Permission WHERE GroupId = \[SelectedItem.GroupId\]" and populates checkboxes via method `UpdatePermissionStates()`.<br>(Refer to "PermissionView" view in "View Description" file)                                                                                                                                                                                              |
| _(6), (7), (8), (8.1)_    | _BR31_  | **Validation Rules:** When admin edits group name and/or changes function assignments and clicks \[EditCommand\], the system will use `EditCommand` in `PermissionViewModel` to validate data.<br>IF \[SelectedItem\] = NULL, returns false.<br>IF no changes detected, the system displays error message and returns false. (Refer to MSG 16)<br>IF \[GroupName\].IsEmpty = TRUE, the system displays error message and returns false. (Refer to MSG 20)<br>IF \[GroupName\] = "Administrator" OR \[GroupName\].ToLower CONTAINS "administrator" OR \[GroupName\].ToLower CONTAINS "admin", the system displays error message and returns false. (Refer to MSG 21)<br>IF isDuplicateGroupName(\[GroupName\], \[SelectedItem.GroupId\]) = TRUE, the system displays error message and returns false. (Refer to MSG 22) |
| _(9), (10), (11)_         | _BR32_  | **Processing Rules:** After validation passes, the system creates UserGroupDTO object with: \[GroupId\] = \[SelectedItem.GroupId\], \[GroupName\] = \[GroupName\].Trim.<br>System calls method `Update(updateDto)` in `UserGroupService` class to update in database by syntax "UPDATE UserGroup SET GroupName = \[GroupName\] WHERE GroupId = \[GroupId\]".<br>The permission assignments are automatically updated via method `PermissionState_UpdatePermission()` which processes each checkbox change by adding/removing permission associations in Permission table.<br>System updates \[GroupList\] at selected index, calls method `Reset()`, and displays success notification. (Refer to MSG 24)                                                                                                              |

##### 2.1.2.8 Delete Permission Group

###### _Use Case Description_

| Name               | Delete Permission Group                                                                        |
| :----------------- | :--------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows Administrator to delete an existing permission group from the system.     |
| **Actor**          | Administrator                                                                                  |
| **Trigger**        | When Admin selects delete permission group function.                                           |
| **Pre-condition**  | Admin must be authenticated with "Permission" permission. A permission group must be selected. |
| **Post-condition** | Permission group and its permission assignments are removed from database.                     |

###### _Activities Flow_

(Refer to "Activity Delete Permission Group" diagram in "Activity for wedding management system/manage-permissions" folder)

###### _Business Rules_

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :----------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3), (4)_     | _BR33_  | **Displaying Rules:** When admin selects action "Delete" from \[SelectedAction\], the system sets \[IsAdding\] = FALSE, \[IsEditing\] = FALSE, \[IsDeleting\] = TRUE and calls method `Reset()`.<br>The system displays permission groups list in DataGrid. Admin selects permission group to delete.<br>(Refer to "PermissionView" view in "View Description" file)                                                                                                                                  |
| _(5), (5.1), (5.2)_      | _BR34_  | **Reference Check Rules:** The `DeleteCommand` in `PermissionViewModel` checks if the group has referenced data by method `hasReferences(GroupId)` which queries "SELECT COUNT(\*) FROM AppUser WHERE GroupId = \[SelectedItem.GroupId\]".<br>IF \[hasReferences\] = TRUE (users exist in this group), the system displays warning message and returns false.<br>Admin views referenced user count and confirms end. (Refer to MSG 25)                                                                |
| _(6), (7), (7.1), (7.2)_ | _BR35_  | **Confirmation Rules:** IF no references exist, the system displays confirmation dialog.<br>IF admin clicks "No" button, the operation is cancelled, dialog closes, and no changes are made.                                                                                                                                                                                                                                                                                                          |
| _(8), (9), (10)_         | _BR36_  | **Processing Rules:** IF admin clicks "Yes" button to confirm delete, the system calls method `Delete(GroupId)` in `UserGroupService` class which deletes permission assignments and group in transaction by syntax "DELETE FROM Permission WHERE GroupId = \[SelectedItem.GroupId\]; DELETE FROM UserGroup WHERE GroupId = \[SelectedItem.GroupId\]".<br>System removes group from \[GroupList\], calls method `Reset()` to clear selection, and displays success notification.<br>(Refer to MSG 26) |

##### 2.1.2.9 Manage System Parameters

###### _Use Case Description_

| Name               | Manage System Parameters                                                                    |
| :----------------- | :------------------------------------------------------------------------------------------ |
| **Description**    | This use case allows Administrator to view and update system-wide configuration parameters. |
| **Actor**          | Administrator                                                                               |
| **Trigger**        | When Admin selects System Settings function.                                                |
| **Pre-condition**  | Admin must be authenticated with valid active session and have "Parameter" permission.      |
| **Post-condition** | System parameters are updated in database and changes affect system-wide calculations.      |

###### _Activities Flow_

(Refer to "Activity Manage System Parameters" diagram in "Activity for wedding management system/system-settings" folder)

###### _Business Rules_

| Activity                         | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :------------------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3)_                  | _BR37_  | **Displaying Rules:** When admin clicks \[ParameterCommand\], the system reinitializes database context by method `resetDatabaseContext()`, creates new ParameterView with ParameterViewModel as DataContext.<br>The ParameterViewModel constructor loads all system parameters from database by method `GetAll()` in `ParameterService` class with syntax "SELECT \* FROM Parameter".<br>The system displays "ParameterView" screen with editable fields: \[EnablePenalty\] (checkbox: Có/Không), \[PenaltyRate\] (%), \[MinDepositRate\] (%), \[MinReserveTableRate\] (%).<br>(Refer to "ParameterView" view in "View Description" file)                                                                                                                                                                   |
| _(4), (5), (6), (7), (8), (8.1)_ | _BR38_  | **Validation Rules:** When admin edits parameter values and clicks \[EditCommand\], the system will use `EditCommand` in `ParameterViewModel` to validate data.<br>IF \[PenaltyRate\].IsEmpty = TRUE OR \[MinDepositRate\].IsEmpty = TRUE OR \[MinReserveTableRate\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 10)<br>IF \[PenaltyRate\].IsNumeric = FALSE OR \[MinDepositRate\].IsNumeric = FALSE OR \[MinReserveTableRate\].IsNumeric = FALSE, the system displays validation message and returns false. (Refer to MSG 30)<br>IF isInBounds(\[PenaltyRate\], 0, 1) = FALSE OR isInBounds(\[MinDepositRate\], 0, 1) = FALSE OR isInBounds(\[MinReserveTableRate\], 0, 1) = FALSE, the system displays validation message and returns false. (Refer to MSG 29) |
| _(9), (10), (11), (12), (13)_    | _BR39_  | **Processing Rules:** After validation passes, the system updates each parameter in database by method `Update(parameterDto)` in `ParameterService` class:<br>- Updates EnablePenalty by syntax "UPDATE Parameter SET Value = \[EnablePenalty\] WHERE ParameterName = 'EnablePenalty'"<br>- Updates PenaltyRate by syntax "UPDATE Parameter SET Value = \[PenaltyRate\] WHERE ParameterName = 'PenaltyRate'"<br>- Updates MinDepositRate by syntax "UPDATE Parameter SET Value = \[MinDepositRate\] WHERE ParameterName = 'MinDepositRate'"<br>- Updates MinReserveTableRate by syntax "UPDATE Parameter SET Value = \[MinReserveTableRate\] WHERE ParameterName = 'MinReserveTableRate'"<br>System displays success notification and reloads form with updated values.                                      |
| _(10a), (11a), (12a)_            | _BR40_  | **Error Handling Rules:** IF update fails (exception occurs during database transaction), the system rolls back transaction, displays error notification "Failed to update parameters. Please try again", and admin confirms end.<br>The parameter values remain unchanged in database.<br>(Refer to MSG 28)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

#### 2.1.3 Master Data Management Use Case

##### 2.1.3.1 View Hall Details

###### _Use Case Description_

| Name               | View Hall Details                                                                 |
| :----------------- | :-------------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to view the list of all halls and their details. |
| **Actor**          | Staff, Administrator                                                              |
| **Trigger**        | When user selects view halls function.                                            |
| **Pre-condition**  | User must be authenticated with valid active session and have "Hall" permission.  |
| **Post-condition** | Hall list is displayed with all hall information including hall type details.     |

###### _Activities Flow_

(Refer to "Activity View Hall Details" diagram in "Activity for wedding management system/manage-halls" folder)

###### _Business Rules_

| Activity              | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :-------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_            | _BR41_  | **Displaying Rules:** When user clicks \[HallCommand\], the system reinitializes database context by method `resetDatabaseContext()`, creates new HallView with HallViewModel as DataContext.<br>The HallViewModel constructor loads halls from database by method `GetAll()` in `HallService` class with syntax "SELECT \* FROM Hall", loads hall types by method `GetAll()` in `HallTypeService` class, and displays "HallView" screen with DataGrid showing list of halls.<br>(Refer to "HallView" view in "View Description" file)                                                                                                                                                                                                                                                               |
| _(3), (4), (5), (6)_  | _BR42_  | **Searching Rules:** When user enters search text in \[SearchText\] field, the system uses method `PerformSearch()` in `HallViewModel` to filter halls.<br>The method checks \[SelectedSearchProperty\] and filters \[OriginalList\] accordingly:<br>IF \[SelectedSearchProperty\] = "Tên sảnh", filter by \[HallName\] CONTAINS \[SearchText\].<br>IF \[SelectedSearchProperty\] = "Tên loại sảnh", filter by \[HallType.HallTypeName\] CONTAINS \[SearchText\].<br>IF \[SelectedSearchProperty\] = "Đơn giá bàn tối thiểu", filter by \[HallType.MinTablePrice\] CONTAINS \[SearchText\].<br>IF \[SelectedSearchProperty\] = "Số lượng bàn tối đa", filter by \[MaxTableCount\] CONTAINS \[SearchText\].<br>IF \[SelectedSearchProperty\] = "Ghi chú", filter by \[Note\] CONTAINS \[SearchText\]. |
| _(7), (8), (9), (10)_ | _BR43_  | **Selection Rules:** When user selects hall from DataGrid, the system triggers property setter `setSelectedItem(hall)` in `HallViewModel`.<br>The system populates form fields: \[HallName\] = \[SelectedItem.HallName\], \[MaxTableCount\] = \[SelectedItem.MaxTableCount\], \[Note\] = \[SelectedItem.Note\], \[SelectedHallType\] = getHallType(\[SelectedItem.HallTypeId\]), \[MinTablePrice\] = \[SelectedHallType.MinTablePrice\], and renders hall image by method `RenderImageAsync(HallId, "Hall")`.<br>User views hall information and can close dialog or proceed to edit/delete.                                                                                                                                                                                                         |

##### 2.1.3.2 Add New Hall

###### _Use Case Description_

| Name               | Add New Hall                                                                  |
| :----------------- | :---------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to add a new hall to the system.             |
| **Actor**          | Staff, Administrator                                                          |
| **Trigger**        | When user selects function Add New Hall.                                      |
| **Pre-condition**  | User must be authenticated and have "Hall" permission. HallView is displayed. |
| **Post-condition** | New hall is created in database and displayed in hall list.                   |

###### _Activities Flow_

(Refer to "Activity Add New Hall" diagram in "Activity for wedding management system/manage-halls" folder)

###### _Business Rules_

| Activity                    | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :-------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(1), (2)_                  | _BR44_  | **Displaying Rules:** When user selects action "Thêm" from \[SelectedAction\], the system sets \[IsAdding\] = TRUE, \[IsEditing\] = FALSE, \[IsDeleting\] = FALSE, \[IsExporting\] = FALSE, sets \[Image\] = NULL, and calls method `Reset()` to clear form fields.<br>The system displays add hall form with fields: \[HallName\], \[SelectedHallType\] dropdown, \[MaxTableCount\], \[Note\], and image selection button.<br>(Refer to "HallView" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                |
| _(3), (4), (5), (6), (6.1)_ | _BR45_  | **Validation Rules:** When user enters hall information and clicks \[AddCommand\], the system will use `AddCommand` in `HallViewModel` to validate data.<br>IF \[HallName\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 31)<br>IF \[SelectedHallType\] = NULL, the system displays validation message and returns false. (Refer to MSG 32)<br>IF \[MaxTableCount\].IsNumeric = FALSE OR \[MaxTableCount\] <= 0, the system displays validation message and returns false. (Refer to MSG 33)<br>IF isDuplicateHallName(\[HallName\], \[SelectedHallType.HallTypeId\]) = TRUE (checked by syntax "SELECT COUNT(\*) FROM Hall WHERE HallName = \[HallName\] AND HallTypeId = \[HallTypeId\]"), the system displays validation message and returns false. (Refer to MSG 34) |
| _(7), (8), (9), (10)_       | _BR46_  | **Processing Rules:** After validation passes, the system creates new HallDTO object with: \[HallName\] = \[HallName\].Trim, \[MaxTableCount\], \[Note\], \[HallTypeId\] = \[SelectedHallType.HallTypeId\], \[HallType\] = \[SelectedHallType\].<br>System calls method `Create(newHall)` in `HallService` class to insert into database by syntax "INSERT INTO Hall (HallName, MaxTableCount, Note, HallTypeId) VALUES (...)", adds to \[HallList\].<br>IF image cache exists at "Hall/Addcache.jpg", copies to "Hall/\[HallId\].jpg" and deletes cache.<br>Calls method `Reset()` to clear form and displays success notification.<br>(Refer to MSG 35)                                                                                                                                                           |

##### 2.1.3.3 Edit Hall

###### _Use Case Description_

| Name               | Edit Hall                                                                              |
| :----------------- | :------------------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to edit an existing hall's information in the system. |
| **Actor**          | Staff, Administrator                                                                   |
| **Trigger**        | When user selects function Edit Hall.                                                  |
| **Pre-condition**  | User must be authenticated with "Hall" permission. A hall must be selected.            |
| **Post-condition** | Hall information is updated in database and reflected in hall list.                    |

###### _Activities Flow_

(Refer to "Activity Edit Hall" diagram in "Activity for wedding management system/manage-halls" folder)

###### _Business Rules_

| Activity                  | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :------------------------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(1), (2), (3), (4), (5)_ | _BR47_  | **Displaying Rules:** When user selects action "Sửa" from \[SelectedAction\], the system sets \[IsAdding\] = FALSE, \[IsEditing\] = TRUE, \[IsDeleting\] = FALSE, \[IsExporting\] = FALSE and calls method `Reset()`.<br>When user selects a hall from DataGrid, the system triggers property setter `setSelectedItem(hall)` to populate form with current data and renders hall image.<br>(Refer to "HallView" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| _(6), (7), (8), (8.1)_    | _BR48_  | **Validation Rules:** When user edits hall information and clicks \[EditCommand\], the system will use `EditCommand` in `HallViewModel` to validate data.<br>IF \[SelectedItem\] = NULL, returns false.<br>IF no changes detected, the system displays info message and returns false. (Refer to MSG 16)<br>IF \[HallName\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 31)<br>IF \[MaxTableCount\].IsNumeric = FALSE OR \[MaxTableCount\] <= 0, the system displays validation message and returns false. (Refer to MSG 33)<br>IF isDuplicateHallName(\[HallName\], \[HallTypeId\], \[HallId\]) = TRUE, the system displays validation message and returns false. (Refer to MSG 34)<br>IF hasUpcomingBookings(\[HallId\]) = TRUE AND \[MaxTableCount\] changed, the system displays warning message and returns false. (Refer to MSG 37) |
| _(9), (10), (11)_         | _BR49_  | **Processing Rules:** After validation passes, IF \[Image\] = NULL AND image file exists, deletes image file.<br>System creates HallDTO object with updated values, calls method `Update(updateDto)` in `HallService` class to update in database by syntax "UPDATE Hall SET HallName = \[HallName\], MaxTableCount = \[MaxTableCount\], Note = \[Note\], HallTypeId = \[HallTypeId\] WHERE HallId = \[HallId\]".<br>IF edit cache exists at "Hall/Editcache.jpg", copies to "Hall/\[HallId\].jpg" and deletes cache.<br>Updates \[HallList\] at selected index, calls method `Reset()`, and displays success notification.<br>(Refer to MSG 36)                                                                                                                                                                                                                                      |

##### 2.1.3.4 Delete Hall

###### _Use Case Description_

| Name               | Delete Hall                                                                  |
| :----------------- | :--------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to delete an existing hall from the system. |
| **Actor**          | Staff, Administrator                                                         |
| **Trigger**        | When user selects delete hall function.                                      |
| **Pre-condition**  | User must be authenticated with "Hall" permission. A hall must be selected.  |
| **Post-condition** | Hall and its image are removed from database and file system.                |

###### _Activities Flow_

(Refer to "Activity Delete Hall" diagram in "Activity for wedding management system/manage-halls" folder)

###### _Business Rules_

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :----------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3), (4)_     | _BR50_  | **Displaying Rules:** When user selects action "Xóa" from \[SelectedAction\], the system sets \[IsAdding\] = FALSE, \[IsEditing\] = FALSE, \[IsDeleting\] = TRUE, \[IsExporting\] = FALSE and calls method `Reset()`.<br>The system displays halls list in DataGrid. User selects hall to delete.<br>(Refer to "HallView" view in "View Description" file)                                                                                         |
| _(5), (5.1), (5.2)_      | _BR51_  | **Reference Check Rules:** The `DeleteCommand` in `HallViewModel` checks if the hall has referenced data by method `hasBookings(HallId)` which queries "SELECT COUNT(\*) FROM Booking WHERE HallId = \[SelectedItem.HallId\]".<br>IF \[hasBookings\] = TRUE (bookings exist using this hall), the system displays warning message and returns false.<br>User views referenced booking count and confirms end. (Refer to MSG 38)                    |
| _(6), (7), (7.1), (7.2)_ | _BR52_  | **Confirmation Rules:** IF no references exist, the system displays confirmation dialog.<br>IF user clicks "No" button, the operation is cancelled and no changes are made. (Refer to MSG 39)                                                                                                                                                                                                                                                      |
| _(8), (9), (10)_         | _BR53_  | **Processing Rules:** IF user clicks "Yes" button to confirm delete, IF image file exists at "Hall/\[HallId\].jpg", deletes the image file.<br>System calls method `Delete(HallId)` in `HallService` class to delete hall from database by syntax "DELETE FROM Hall WHERE HallId = \[SelectedItem.HallId\]".<br>Removes hall from \[HallList\], calls method `Reset()` to clear selection, and displays success notification.<br>(Refer to MSG 40) |

##### 2.1.3.5 Export Halls to Excel

###### _Use Case Description_

| Name               | Export Halls to Excel                                                      |
| :----------------- | :------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to export the hall list to an Excel file. |
| **Actor**          | Staff, Administrator                                                       |
| **Trigger**        | When user clicks Export Excel button.                                      |
| **Pre-condition**  | User must be authenticated with "Hall" permission. HallView is displayed.  |
| **Post-condition** | Excel file containing hall data is generated and downloaded.               |

###### _Activities Flow_

(Refer to "Activity Export Halls to Excel" diagram in "Activity for wedding management system/manage-halls" folder)

###### _Business Rules_

| Activity                  | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :------------------------ | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3), (4), (5)_ | _BR54_  | **Displaying Rules:** When user selects action "Xuất Excel" from \[SelectedAction\], the system sets \[IsAdding\] = FALSE, \[IsEditing\] = FALSE, \[IsDeleting\] = FALSE, \[IsExporting\] = TRUE.<br>User can apply filter criteria (optional) and the system displays filtered halls list.<br>User clicks \[ExportToExcelCommand\] button to export.<br>(Refer to "HallView" view in "View Description" file)                                                                                                                                                                                                  |
| _(6), (6.1), (6.2)_       | _BR55_  | **Validation Rules:** The `ExportToExcelCommand` in `HallViewModel` checks if there is data to export.<br>IF \[HallList\] = NULL OR \[HallList\].Count = 0, the system displays validation message and returns.<br>User confirms end. (Refer to MSG 19)                                                                                                                                                                                                                                                                                                                                                         |
| _(7), (8), (9), (10)_     | _BR56_  | **Processing Rules:** IF data exists, the system creates new XLWorkbook using ClosedXML library, adds worksheet "Danh sách sảnh" with columns: "Tên sảnh", "Loại sảnh", "Đơn giá bàn tối thiểu", "Số lượng bàn tối đa", "Ghi chú".<br>Iterates through \[HallList\] and populates rows with hall data.<br>Applies formatting: header bold, light gray background, centered alignment, borders.<br>Creates filename with timestamp format "DanhSachSanh\_\[yyyyMMddHHmmss\].xlsx", opens SaveFileDialog for user to choose location.<br>Saves workbook and opens the file for user to view.<br>(Refer to MSG 41) |

##### 2.1.3.6 View Hall Type Details

###### _Use Case Description_

| Name               | View Hall Type Details                                                                 |
| :----------------- | :------------------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to view the list of all hall types and their details. |
| **Actor**          | Staff, Administrator                                                                   |
| **Trigger**        | When user selects view hall types function.                                            |
| **Pre-condition**  | User must be authenticated with valid active session and have "HallType" permission.   |
| **Post-condition** | Hall type list is displayed with all hall type information.                            |

###### _Activities Flow_

(Refer to "Activity View Hall Type Details" diagram in "Activity for wedding management system/manage-hall-types" folder)

###### _Business Rules_

| Activity              | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :-------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_            | _BR57_  | **Displaying Rules:** When user clicks \[HallTypeCommand\], the system reinitializes database context by method `resetDatabaseContext()`, creates new HallTypeView with HallTypeViewModel as DataContext.<br>The HallTypeViewModel constructor loads hall types from database by method `GetAll()` in `HallTypeService` class with syntax "SELECT \* FROM HallType", and displays "HallTypeView" screen with DataGrid showing list of hall types.<br>(Refer to "HallTypeView" view in "View Description" file) |
| _(3), (4), (5), (6)_  | _BR58_  | **Searching Rules:** When user enters search text in \[SearchText\] field, the system uses method `PerformSearch()` in `HallTypeViewModel` to filter hall types.<br>The method checks \[SelectedSearchProperty\] and filters \[OriginalList\] accordingly:<br>IF \[SelectedSearchProperty\] = "Tên loại sảnh", filter by \[HallTypeName\] CONTAINS \[SearchText\].<br>IF \[SelectedSearchProperty\] = "Đơn giá bàn tối thiểu", filter by \[MinTablePrice\] CONTAINS \[SearchText\].                            |
| _(7), (8), (9), (10)_ | _BR59_  | **Selection Rules:** When user selects hall type from DataGrid, the system triggers property setter `setSelectedItem(hallType)` in `HallTypeViewModel`.<br>The system populates form fields: \[HallTypeName\] = \[SelectedItem.HallTypeName\], \[MinTablePrice\] = \[SelectedItem.MinTablePrice\].<br>User views hall type information and can close dialog or proceed to edit/delete.                                                                                                                         |

##### 2.1.3.7 Add New Hall Type

###### _Use Case Description_

| Name               | Add New Hall Type                                                                     |
| :----------------- | :------------------------------------------------------------------------------------ |
| **Description**    | This use case allows Staff/Admin to add a new hall type to the system.                |
| **Actor**          | Staff, Administrator                                                                  |
| **Trigger**        | When user selects function Add New Hall Type.                                         |
| **Pre-condition**  | User must be authenticated and have "HallType" permission. HallTypeView is displayed. |
| **Post-condition** | New hall type is created in database and displayed in hall type list.                 |

###### _Activities Flow_

(Refer to "Activity Add New Hall Type" diagram in "Activity for wedding management system/manage-hall-types" folder)

###### _Business Rules_

| Activity                    | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :-------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(1), (2)_                  | _BR60_  | **Displaying Rules:** When user selects action "Thêm" from \[SelectedAction\], the system sets \[IsAdding\] = TRUE, \[IsEditing\] = FALSE, \[IsDeleting\] = FALSE, \[IsExporting\] = FALSE and calls method `Reset()` to clear form fields.<br>The system displays add hall type form with fields: \[HallTypeName\], \[MinTablePrice\].<br>(Refer to "HallTypeView" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                        |
| _(3), (4), (5), (6), (6.1)_ | _BR61_  | **Validation Rules:** When user enters hall type information and clicks \[AddCommand\], the system will use `AddCommand` in `HallTypeViewModel` to validate data.<br>IF \[HallTypeName\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 42)<br>IF isDuplicateHallTypeName(\[HallTypeName\]) = TRUE (checked by syntax "SELECT COUNT(\*) FROM HallType WHERE HallTypeName = \[HallTypeName\]"), the system displays validation message and returns false. (Refer to MSG 43)<br>IF \[MinTablePrice\].IsNumeric = FALSE OR \[MinTablePrice\] is not integer, the system displays validation message and returns false. (Refer to MSG 30)<br>IF \[MinTablePrice\] < 10000, the system displays validation message and returns false. (Refer to MSG 44) |
| _(7), (8), (9), (10)_       | _BR62_  | **Processing Rules:** After validation passes, the system creates new HallTypeDTO object with: \[HallTypeName\] = \[HallTypeName\].Trim, \[MinTablePrice\] = decimal.Parse(\[MinTablePrice\]).<br>System calls method `Create(newHallType)` in `HallTypeService` class to insert into database by syntax "INSERT INTO HallType (HallTypeName, MinTablePrice) VALUES (...)", adds to \[HallTypeList\], calls method `Reset()` to clear form, and displays success notification.<br>(Refer to MSG 45)                                                                                                                                                                                                                                                                                         |

##### 2.1.3.8 Edit Hall Type

###### _Use Case Description_

| Name               | Edit Hall Type                                                                       |
| :----------------- | :----------------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to edit an existing hall type's information.        |
| **Actor**          | Staff, Administrator                                                                 |
| **Trigger**        | When user selects function Edit Hall Type.                                           |
| **Pre-condition**  | User must be authenticated with "HallType" permission. A hall type must be selected. |
| **Post-condition** | Hall type information is updated in database and reflected in hall type list.        |

###### _Activities Flow_

(Refer to "Activity Edit Hall Type" diagram in "Activity for wedding management system/manage-hall-types" folder)

###### _Business Rules_

| Activity                  | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :------------------------ | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3), (4), (5)_ | _BR63_  | **Displaying Rules:** When user selects action "Sửa" from \[SelectedAction\], the system sets \[IsAdding\] = FALSE, \[IsEditing\] = TRUE, \[IsDeleting\] = FALSE, \[IsExporting\] = FALSE and calls method `Reset()`.<br>When user selects a hall type from DataGrid, the system triggers property setter `setSelectedItem(hallType)` to populate form with current data.<br>(Refer to "HallTypeView" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| _(6), (7), (8), (8.1)_    | _BR64_  | **Validation Rules:** When user edits hall type information and clicks \[EditCommand\], the system will use `EditCommand` in `HallTypeViewModel` to validate data.<br>IF \[SelectedItem\] = NULL, returns false.<br>IF \[HallTypeName\] = \[SelectedItem.HallTypeName\] AND \[MinTablePrice\] = \[SelectedItem.MinTablePrice\], the system displays info message and returns false. (Refer to MSG 16)<br>IF \[HallTypeName\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 42)<br>IF isDuplicateHallTypeName(\[HallTypeName\], \[HallTypeId\]) = TRUE, the system displays validation message and returns false. (Refer to MSG 43)<br>IF \[MinTablePrice\].IsNumeric = FALSE OR \[MinTablePrice\] is not integer, the system displays validation message and returns false. (Refer to MSG 30)<br>IF \[MinTablePrice\] < 10000, the system displays validation message and returns false. (Refer to MSG 44) |
| _(9), (10), (11)_         | _BR65_  | **Processing Rules:** After validation passes, the system creates HallTypeDTO object with: \[HallTypeId\] = \[SelectedItem.HallTypeId\], \[HallTypeName\] = \[HallTypeName\].Trim, \[MinTablePrice\] = decimal.Parse(\[MinTablePrice\]).<br>System calls method `Update(updateDto)` in `HallTypeService` class to update in database by syntax "UPDATE HallType SET HallTypeName = \[HallTypeName\], MinTablePrice = \[MinTablePrice\] WHERE HallTypeId = \[HallTypeId\]".<br>Updates \[HallTypeList\] at selected index, calls method `Reset()`, and displays success notification.<br>(Refer to MSG 46)                                                                                                                                                                                                                                                                                                                                            |

##### 2.1.3.9 Delete Hall Type

###### _Use Case Description_

| Name               | Delete Hall Type                                                                     |
| :----------------- | :----------------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to delete an existing hall type from the system.    |
| **Actor**          | Staff, Administrator                                                                 |
| **Trigger**        | When user selects delete hall type function.                                         |
| **Pre-condition**  | User must be authenticated with "HallType" permission. A hall type must be selected. |
| **Post-condition** | Hall type is removed from database.                                                  |

###### _Activities Flow_

(Refer to "Activity Delete Hall Type" diagram in "Activity for wedding management system/manage-hall-types" folder)

###### _Business Rules_

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :----------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(1), (2), (3), (4)_     | _BR66_  | **Displaying Rules:** When user selects action "Xóa" from \[SelectedAction\], the system sets \[IsAdding\] = FALSE, \[IsEditing\] = FALSE, \[IsDeleting\] = TRUE, \[IsExporting\] = FALSE and calls method `Reset()`.<br>The system displays hall types list in DataGrid. User selects hall type to delete.<br>(Refer to "HallTypeView" view in "View Description" file)                                                              |
| _(5), (5.1), (5.2)_      | _BR67_  | **Reference Check Rules:** The `DeleteCommand` in `HallTypeViewModel` checks if the hall type has referenced data by method `hasHalls(HallTypeId)` which queries "SELECT COUNT(\*) FROM Hall WHERE HallTypeId = \[SelectedItem.HallTypeId\]".<br>IF \[hasHalls\] = TRUE (halls exist using this type), the system displays warning message and returns false.<br>User views referenced hall count and confirms end. (Refer to MSG 47) |
| _(6), (7), (7.1), (7.2)_ | _BR68_  | **Confirmation Rules:** IF no references exist, the system displays confirmation dialog.<br>IF user clicks "No" button, the operation is cancelled and no changes are made. (Refer to MSG 48)                                                                                                                                                                                                                                         |
| _(8), (9), (10)_         | _BR69_  | **Processing Rules:** IF user clicks "Yes" button to confirm delete, the system calls method `Delete(HallTypeId)` in `HallTypeService` class to delete hall type from database by syntax "DELETE FROM HallType WHERE HallTypeId = \[SelectedItem.HallTypeId\]".<br>Removes hall type from \[HallTypeList\], calls method `Reset()` to clear selection, and displays success notification.<br>(Refer to MSG 49)                        |

##### 2.1.3.10 Export Hall Types to Excel

###### _Use Case Description_

| Name               | Export Hall Types to Excel                                                        |
| :----------------- | :-------------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to export the hall type list to an Excel file.   |
| **Actor**          | Staff, Administrator                                                              |
| **Trigger**        | When user clicks Export Excel button.                                             |
| **Pre-condition**  | User must be authenticated with "HallType" permission. HallTypeView is displayed. |
| **Post-condition** | Excel file containing hall type data is generated and downloaded.                 |

###### _Activities Flow_

(Refer to "Activity Export Hall Types to Excel" diagram in "Activity for wedding management system/manage-hall-types" folder)

###### _Business Rules_

| Activity                  | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :------------------------ | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3), (4), (5)_ | _BR70_  | **Displaying Rules:** When user selects action "Xuất Excel" from \[SelectedAction\], the system sets \[IsAdding\] = FALSE, \[IsEditing\] = FALSE, \[IsDeleting\] = FALSE, \[IsExporting\] = TRUE.<br>User can apply filter criteria (optional) and the system displays filtered hall types list.<br>User clicks \[ExportToExcelCommand\] button to export.<br>(Refer to "HallTypeView" view in "View Description" file)                                                                                                                                                                                                  |
| _(6), (6.1), (6.2)_       | _BR71_  | **Validation Rules:** The `ExportToExcelCommand` in `HallTypeViewModel` checks if there is data to export.<br>IF \[HallTypeList\] = NULL OR \[HallTypeList\].Count = 0, the system displays validation message and returns.<br>User confirms end. (Refer to MSG 19)                                                                                                                                                                                                                                                                                                                                                      |
| _(7), (8), (9), (10)_     | _BR72_  | **Processing Rules:** IF data exists, the system creates new XLWorkbook using ClosedXML library, adds worksheet "Danh sách loại sảnh" with columns: "Tên loại sảnh", "Đơn giá bàn tối thiểu".<br>Iterates through \[HallTypeList\] and populates rows with hall type data.<br>Applies formatting: header bold, light gray background, centered alignment, borders, number format "#,##0" for price.<br>Creates filename with timestamp format "DanhSachLoaiSanh\_\[yyyyMMddHHmmss\].xlsx", opens SaveFileDialog for user to choose location.<br>Saves workbook and opens the file for user to view.<br>(Refer to MSG 50) |

##### 2.1.3.11 View Dish Details

###### _Use Case Description_

| Name               | View Dish Details                                                                  |
| :----------------- | :--------------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to view the list of all dishes and their details. |
| **Actor**          | Staff, Administrator                                                               |
| **Trigger**        | When user selects view dishes function.                                            |
| **Pre-condition**  | User must be authenticated with valid active session and have "Dish" permission.   |
| **Post-condition** | Dish list is displayed with all dish information.                                  |

###### _Activities Flow_

(Refer to "Activity View Dish Details" diagram in "Activity for wedding management system/manage-dishes" folder)

###### _Business Rules_

| Activity              | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :-------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_            | _BR73_  | **Displaying Rules:** When user clicks \[DishCommand\], the system reinitializes database context by method `resetDatabaseContext()`, creates new FoodView with FoodViewModel as DataContext.<br>The FoodViewModel constructor loads dishes from database by method `GetAll()` in `DishService` class with syntax "SELECT \* FROM Dish", and displays "FoodView" screen with DataGrid showing list of dishes.<br>(Refer to "FoodView" view in "View Description" file)                                                                       |
| _(3), (4), (5), (6)_  | _BR74_  | **Searching Rules:** When user enters search text in \[SearchText\] field, the system uses method `PerformSearch()` in `FoodViewModel` to filter dishes.<br>The method checks \[SelectedSearchProperty\] and filters \[OriginalList\] accordingly:<br>IF \[SelectedSearchProperty\] = "Tên món ăn", filter by \[DishName\] CONTAINS \[SearchText\].<br>IF \[SelectedSearchProperty\] = "Đơn giá", filter by \[UnitPrice\] CONTAINS \[SearchText\].<br>IF \[SelectedSearchProperty\] = "Ghi chú", filter by \[Note\] CONTAINS \[SearchText\]. |
| _(7), (8), (9), (10)_ | _BR75_  | **Selection Rules:** When user selects dish from DataGrid, the system triggers property setter `setSelectedItem(dish)` in `FoodViewModel`.<br>The system populates form fields: \[DishName\] = \[SelectedItem.DishName\], \[UnitPrice\] = \[SelectedItem.UnitPrice\], \[Note\] = \[SelectedItem.Note\], and calls `RenderImageAsync()` to display dish image.<br>User views dish information and can close dialog or proceed to edit/delete.                                                                                                 |

##### 2.1.3.12 Add New Dish

###### _Use Case Description_

| Name               | Add New Dish                                                                  |
| :----------------- | :---------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to add a new dish to the system.             |
| **Actor**          | Staff, Administrator                                                          |
| **Trigger**        | When user selects function Add New Dish.                                      |
| **Pre-condition**  | User must be authenticated and have "Dish" permission. FoodView is displayed. |
| **Post-condition** | New dish is created in database and displayed in dish list.                   |

###### _Activities Flow_

(Refer to "Activity Add New Dish" diagram in "Activity for wedding management system/manage-dishes" folder)

###### _Business Rules_

| Activity                    | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :-------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_                  | _BR76_  | **Displaying Rules:** When user selects action "Thêm" from \[SelectedAction\], the system sets \[IsAdding\] = TRUE, \[IsEditing\] = FALSE, \[IsDeleting\] = FALSE, \[IsExporting\] = FALSE and calls method `Reset()` to clear form fields and \[Image\] = NULL.<br>The system displays add dish form with fields: \[DishName\], \[UnitPrice\], \[Note\], and image selection button.<br>(Refer to "FoodView" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                               |
| _(3), (4), (5), (6), (6.1)_ | _BR77_  | **Validation Rules:** When user enters dish information and clicks \[AddCommand\], the system will use `CanAdd()` in `FoodViewModel` to validate data.<br>IF \[OriginalList\].Count >= 100, the system displays validation message and returns false. (Refer to MSG 51)<br>IF \[DishName\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 52)<br>IF \[UnitPrice\].IsNumeric = FALSE OR \[UnitPrice\] <= 0, the system displays validation message and returns false. (Refer to MSG 53)<br>IF \[Note\].Length > 100, the system displays validation message and returns false. (Refer to MSG 54)<br>IF isDuplicateDishName(\[DishName\]) = TRUE (checked by LINQ query), the system displays validation message and returns false. (Refer to MSG 55) |
| _(7), (8), (9), (10)_       | _BR78_  | **Processing Rules:** After validation passes, the system creates new DishDTO object with: \[DishName\] = \[DishName\].Trim, \[UnitPrice\] = decimal.Parse(\[UnitPrice\]), \[Note\] = \[Note\].<br>System calls method `Create(newDish)` in `DishService` class to insert into database by syntax "INSERT INTO Dish (DishName, UnitPrice, Note) VALUES (...)".<br>IF image cache exists at "Food/Addcache.jpg", copies to "Food/\[DishId\].jpg" and deletes cache.<br>Adds to \[DishList\], calls method `Reset()` to clear form, and displays success notification.<br>(Refer to MSG 56)                                                                                                                                                                                                    |

##### 2.1.3.13 Edit Dish

###### _Use Case Description_

| Name               | Edit Dish                                                                   |
| :----------------- | :-------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to edit an existing dish's information.    |
| **Actor**          | Staff, Administrator                                                        |
| **Trigger**        | When user selects function Edit Dish.                                       |
| **Pre-condition**  | User must be authenticated with "Dish" permission. A dish must be selected. |
| **Post-condition** | Dish information is updated in database and reflected in dish list.         |

###### _Activities Flow_

(Refer to "Activity Edit Dish" diagram in "Activity for wedding management system/manage-dishes" folder)

###### _Business Rules_

| Activity                  | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :------------------------ | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3), (4), (5)_ | _BR79_  | **Displaying Rules:** When user selects action "Sửa" from \[SelectedAction\], the system sets \[IsAdding\] = FALSE, \[IsEditing\] = TRUE, \[IsDeleting\] = FALSE, \[IsExporting\] = FALSE and calls method `Reset()`.<br>When user selects a dish from DataGrid, the system triggers property setter `setSelectedItem(dish)` to populate form with current data and calls `RenderImageAsync()` to display current image.<br>(Refer to "FoodView" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                          |
| _(6), (7), (8), (8.1)_    | _BR80_  | **Validation Rules:** When user edits dish information and clicks \[EditCommand\], the system will use `CanEdit()` in `FoodViewModel` to validate data.<br>IF \[SelectedItem\] = NULL, returns false.<br>IF no changes detected (all fields unchanged AND image unchanged), the system displays info message and returns false. (Refer to MSG 16)<br>IF \[DishName\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 52)<br>IF \[UnitPrice\].IsNumeric = FALSE OR \[UnitPrice\] <= 0, the system displays validation message and returns false. (Refer to MSG 53)<br>IF \[Note\].Length > 100, the system displays validation message and returns false. (Refer to MSG 54)<br>IF isDuplicateDishName(\[DishName\], \[DishId\]) = TRUE, the system displays validation message and returns false. (Refer to MSG 55) |
| _(9), (10), (11)_         | _BR81_  | **Processing Rules:** After validation passes, IF \[Image\] = NULL AND image file exists, deletes the image file.<br>The system creates DishDTO object with updated values, calls method `Update(updateDto)` in `DishService` class to update in database by syntax "UPDATE Dish SET DishName = \[DishName\], UnitPrice = \[UnitPrice\], Note = \[Note\] WHERE DishId = \[DishId\]".<br>IF image cache exists at "Food/Editcache.jpg", copies to "Food/\[DishId\].jpg" and deletes cache.<br>Updates \[DishList\] at selected index, calls method `Reset()`, and displays success notification.<br>(Refer to MSG 57)                                                                                                                                                                                                                                       |

##### 2.1.3.14 Delete Dish

###### _Use Case Description_

| Name               | Delete Dish                                                                 |
| :----------------- | :-------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to delete an existing dish from system.    |
| **Actor**          | Staff, Administrator                                                        |
| **Trigger**        | When user selects delete dish function.                                     |
| **Pre-condition**  | User must be authenticated with "Dish" permission. A dish must be selected. |
| **Post-condition** | Dish is removed from database.                                              |

###### _Activities Flow_

(Refer to "Activity Delete Dish" diagram in "Activity for wedding management system/manage-dishes" folder)

###### _Business Rules_

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :----------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3), (4)_     | _BR82_  | **Displaying Rules:** When user selects action "Xóa" from \[SelectedAction\], the system sets \[IsAdding\] = FALSE, \[IsEditing\] = FALSE, \[IsDeleting\] = TRUE, \[IsExporting\] = FALSE and calls method `Reset()`.<br>The system displays dishes list in DataGrid. User selects dish to delete.<br>(Refer to "FoodView" view in "View Description" file)                                                                                                             |
| _(5), (5.1), (5.2)_      | _BR83_  | **Reference Check Rules:** The `CanDelete()` in `FoodViewModel` checks if the dish has referenced data by querying "SELECT COUNT(\*) FROM Menu WHERE DishId = \[SelectedItem.DishId\]" using `_menuService.GetAll()`.<br>IF dish exists in Menu (used in bookings), the system displays warning message and returns false.<br>User views that dish is being used and confirms end. (Refer to MSG 58)                                                                    |
| _(6), (7), (7.1), (7.2)_ | _BR84_  | **Confirmation Rules:** IF no references exist, the system displays confirmation dialog.<br>IF user clicks "No" button, the operation is cancelled and no changes are made. (Refer to MSG 59)                                                                                                                                                                                                                                                                           |
| _(8), (9), (10)_         | _BR85_  | **Processing Rules:** IF user clicks "Yes" button to confirm delete, IF image file exists at "Food/\[DishId\].jpg", deletes the image file.<br>System calls method `Delete(DishId)` in `DishService` class to delete dish from database by syntax "DELETE FROM Dish WHERE DishId = \[SelectedItem.DishId\]".<br>Removes dish from \[DishList\] and \[OriginalList\], calls method `Reset()` to clear selection, and displays success notification.<br>(Refer to MSG 60) |

##### 2.1.3.15 Export Dishes to Excel

###### _Use Case Description_

| Name               | Export Dishes to Excel                                                     |
| :----------------- | :------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to export the dish list to an Excel file. |
| **Actor**          | Staff, Administrator                                                       |
| **Trigger**        | When user clicks Export Excel button.                                      |
| **Pre-condition**  | User must be authenticated with "Dish" permission. FoodView is displayed.  |
| **Post-condition** | Excel file containing dish data is generated and downloaded.               |

###### _Activities Flow_

(Refer to "Activity Export Dishes to Excel" diagram in "Activity for wedding management system/manage-dishes" folder)

###### _Business Rules_

| Activity                  | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------------------ | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3), (4), (5)_ | _BR86_  | **Displaying Rules:** When user selects action "Xuất Excel" from \[SelectedAction\], the system sets \[IsAdding\] = FALSE, \[IsEditing\] = FALSE, \[IsDeleting\] = FALSE, \[IsExporting\] = TRUE.<br>User can apply filter criteria (optional) and the system displays filtered dishes list.<br>User clicks \[ExportToExcelCommand\] button to export.<br>(Refer to "FoodView" view in "View Description" file)                                                                                                                                                                                     |
| _(6), (6.1), (6.2)_       | _BR87_  | **Validation Rules:** The `ExportToExcel()` in `FoodViewModel` checks if there is data to export.<br>IF \[DishList\] = NULL OR \[DishList\].Count = 0, the system displays validation message and returns.<br>User confirms end. (Refer to MSG 19)                                                                                                                                                                                                                                                                                                                                                  |
| _(7), (8), (9), (10)_     | _BR88_  | **Processing Rules:** IF data exists, the system creates new XLWorkbook using ClosedXML library, adds worksheet "Danh sách Món ăn" with columns: "Tên món ăn", "Đơn giá", "Ghi chú".<br>Iterates through \[DishList\] and populates rows with dish data.<br>Applies formatting: header bold, light gray background, centered alignment, borders, number format "#,##0" for price.<br>Creates filename with timestamp format "DanhSachMonAn\_\[yyyyMMddHHmmss\].xlsx", opens SaveFileDialog for user to choose location.<br>Saves workbook and opens the file for user to view.<br>(Refer to MSG 61) |

##### 2.1.3.16 View Service Details

###### _Use Case Description_

| Name               | View Service Details                                                                |
| :----------------- | :---------------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to view the list of all services and details.      |
| **Actor**          | Staff, Administrator                                                                |
| **Trigger**        | When user selects view services function.                                           |
| **Pre-condition**  | User must be authenticated with valid active session and have "Service" permission. |
| **Post-condition** | Service list is displayed with all service information.                             |

###### _Activities Flow_

(Refer to "Activity View Service Details" diagram in "Activity for wedding management system/manage-services" folder)

###### _Business Rules_

| Activity              | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :-------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_            | _BR89_  | **Displaying Rules:** When user clicks \[ServiceCommand\], the system reinitializes database context by method `resetDatabaseContext()`, creates new ServiceView with ServiceViewModel as DataContext.<br>The ServiceViewModel constructor loads services from database by method `GetAll()` in `ServiceService` class with syntax "SELECT \* FROM Service", and displays "ServiceView" screen with DataGrid showing list of services.<br>(Refer to "ServiceView" view in "View Description" file)                                             |
| _(3), (4), (5), (6)_  | _BR90_  | **Searching Rules:** When user enters search text in \[SearchText\] field, the system uses method `PerformSearch()` in `ServiceViewModel` to filter services.<br>The method checks \[SelectedSearchProperty\] and filters \[OriginalList\] accordingly:<br>IF \[SelectedSearchProperty\] = "Tên dịch vụ", filter by \[ServiceName\] CONTAINS \[SearchText\].<br>IF \[SelectedSearchProperty\] = "Đơn giá", filter by \[UnitPrice\] = \[SearchText\].<br>IF \[SelectedSearchProperty\] = "Ghi chú", filter by \[Note\] CONTAINS \[SearchText\]. |
| _(7), (8), (9), (10)_ | _BR91_  | **Selection Rules:** When user selects service from DataGrid, the system triggers property setter `setSelectedItem(service)` in `ServiceViewModel`.<br>The system populates form fields: \[ServiceName\] = \[SelectedItem.ServiceName\], \[UnitPrice\] = \[SelectedItem.UnitPrice\], \[Note\] = \[SelectedItem.Note\], and calls `RenderImageAsync()` to display service image.<br>User views service information and can close dialog or proceed to edit/delete.                                                                              |

##### 2.1.3.17 Add New Service

###### _Use Case Description_

| Name               | Add New Service                                                                     |
| :----------------- | :---------------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to add a new service to the system.                |
| **Actor**          | Staff, Administrator                                                                |
| **Trigger**        | When user selects function Add New Service.                                         |
| **Pre-condition**  | User must be authenticated and have "Service" permission. ServiceView is displayed. |
| **Post-condition** | New service is created in database and displayed in service list.                   |

###### _Activities Flow_

(Refer to "Activity Add New Service" diagram in "Activity for wedding management system/manage-services" folder)

###### _Business Rules_

| Activity                    | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :-------------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_                  | _BR92_  | **Displaying Rules:** When user selects action "Thêm" from \[SelectedAction\], the system sets \[IsAdding\] = TRUE, \[IsEditing\] = FALSE, \[IsDeleting\] = FALSE, \[IsExporting\] = FALSE and calls method `Reset()` to clear form fields and \[Image\] = NULL.<br>The system displays add service form with fields: \[ServiceName\], \[UnitPrice\], \[Note\], and image selection button.<br>(Refer to "ServiceView" view in "View Description" file)                                                                                                                                                                                                                                          |
| _(3), (4), (5), (6), (6.1)_ | _BR93_  | **Validation Rules:** When user enters service information and clicks \[AddCommand\], the system will use `CanAdd()` in `ServiceViewModel` to validate data.<br>IF \[ServiceName\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 62)<br>IF \[UnitPrice\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 63)<br>IF \[UnitPrice\].IsNumeric = FALSE OR \[UnitPrice\] < 0, the system displays validation message and returns false. (Refer to MSG 64)<br>IF isDuplicateServiceName(\[ServiceName\]) = TRUE (checked by LINQ query), the system displays validation message and returns false. (Refer to MSG 65) |
| _(7), (8), (9), (10)_       | _BR94_  | **Processing Rules:** After validation passes, the system creates new ServiceDTO object with: \[ServiceName\] = \[ServiceName\].Trim, \[UnitPrice\] = decimal.Parse(\[UnitPrice\]), \[Note\] = \[Note\].<br>System calls method `Create(newService)` in `ServiceService` class to insert into database by syntax "INSERT INTO Service (ServiceName, UnitPrice, Note) VALUES (...)".<br>IF image cache exists at "Service/Addcache.jpg", copies to "Service/\[ServiceId\].jpg" and deletes cache.<br>Adds to \[ServiceList\], calls method `Reset()` to clear form, and displays success notification.<br>(Refer to MSG 66)                                                                       |

##### 2.1.3.18 Edit Service

###### _Use Case Description_

| Name               | Edit Service                                                                      |
| :----------------- | :-------------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to edit an existing service's information.       |
| **Actor**          | Staff, Administrator                                                              |
| **Trigger**        | When user selects function Edit Service.                                          |
| **Pre-condition**  | User must be authenticated with "Service" permission. A service must be selected. |
| **Post-condition** | Service information is updated in database and reflected in service list.         |

###### _Activities Flow_

(Refer to "Activity Edit Service" diagram in "Activity for wedding management system/manage-services" folder)

###### _Business Rules_

| Activity                  | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :------------------------ | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3), (4), (5)_ | _BR95_  | **Displaying Rules:** When user selects action "Sửa" from \[SelectedAction\], the system sets \[IsAdding\] = FALSE, \[IsEditing\] = TRUE, \[IsDeleting\] = FALSE, \[IsExporting\] = FALSE and calls method `Reset()`.<br>When user selects a service from DataGrid, the system triggers property setter `setSelectedItem(service)` to populate form with current data and calls `RenderImageAsync()` to display current image.<br>(Refer to "ServiceView" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                               |
| _(6), (7), (8), (8.1)_    | _BR96_  | **Validation Rules:** When user edits service information and clicks \[EditCommand\], the system will use `CanEdit()` in `ServiceViewModel` to validate data.<br>IF \[SelectedItem\] = NULL, returns false.<br>IF \[ServiceName\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 62)<br>IF \[UnitPrice\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 63)<br>IF \[UnitPrice\].IsNumeric = FALSE OR \[UnitPrice\] < 0, the system displays validation message and returns false. (Refer to MSG 64)<br>IF isDuplicateServiceName(\[ServiceName\], \[ServiceId\]) = TRUE, the system displays validation message and returns false. (Refer to MSG 65)<br>IF no changes detected (all fields AND image unchanged), the system displays info message and returns false. (Refer to MSG 16) |
| _(9), (10), (11)_         | _BR97_  | **Processing Rules:** After validation passes, IF \[Image\] = NULL AND image file exists, deletes the image file.<br>The system creates ServiceDTO object with updated values, calls method `Update(updateDto)` in `ServiceService` class to update in database by syntax "UPDATE Service SET ServiceName = \[ServiceName\], UnitPrice = \[UnitPrice\], Note = \[Note\] WHERE ServiceId = \[ServiceId\]".<br>IF image cache exists at "Service/Editcache.jpg", copies to "Service/\[ServiceId\].jpg" and deletes cache.<br>Updates \[ServiceList\] at selected index, calls method `Reset()`, and displays success notification.<br>(Refer to MSG 67)                                                                                                                                                                                                                    |

##### 2.1.3.19 Delete Service

###### _Use Case Description_

| Name               | Delete Service                                                                    |
| :----------------- | :-------------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to delete an existing service from the system.   |
| **Actor**          | Staff, Administrator                                                              |
| **Trigger**        | When user selects delete service function.                                        |
| **Pre-condition**  | User must be authenticated with "Service" permission. A service must be selected. |
| **Post-condition** | Service is removed from database.                                                 |

###### _Activities Flow_

(Refer to "Activity Delete Service" diagram in "Activity for wedding management system/manage-services" folder)

###### _Business Rules_

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :----------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3), (4)_     | _BR98_  | **Displaying Rules:** When user selects action "Xóa" from \[SelectedAction\], the system sets \[IsAdding\] = FALSE, \[IsEditing\] = FALSE, \[IsDeleting\] = TRUE, \[IsExporting\] = FALSE and calls method `Reset()`.<br>The system displays services list in DataGrid. User selects service to delete.<br>(Refer to "ServiceView" view in "View Description" file)                                                                                                                                   |
| _(5), (5.1), (5.2)_      | _BR99_  | **Reference Check Rules:** The `CanDelete()` in `ServiceViewModel` checks if the service has referenced data by querying "SELECT COUNT(\*) FROM ServiceDetail WHERE ServiceId = \[SelectedItem.ServiceId\]" using `_serviceDetailService.GetAll()`.<br>IF service exists in ServiceDetail (used in bookings), the system displays warning message and returns false.<br>User views that service is being used and confirms end. (Refer to MSG 68)                                                     |
| _(6), (7), (7.1), (7.2)_ | _BR100_ | **Confirmation Rules:** IF no references exist, the system displays confirmation dialog.<br>IF user clicks "No" button, the operation is cancelled and no changes are made. (Refer to MSG 69)                                                                                                                                                                                                                                                                                                         |
| _(8), (9), (10)_         | _BR101_ | **Processing Rules:** IF user clicks "Yes" button to confirm delete, IF image file exists at "Service/\[ServiceId\].jpg", deletes the image file.<br>System calls method `Delete(ServiceId)` in `ServiceService` class to delete service from database by syntax "DELETE FROM Service WHERE ServiceId = \[SelectedItem.ServiceId\]".<br>Removes service from \[ServiceList\] and \[OriginalList\], calls method `Reset()` to clear selection, and displays success notification.<br>(Refer to MSG 70) |

##### 2.1.3.20 Export Services to Excel

###### _Use Case Description_

| Name               | Export Services to Excel                                                        |
| :----------------- | :------------------------------------------------------------------------------ |
| **Description**    | This use case allows Staff/Admin to export the service list to an Excel file.   |
| **Actor**          | Staff, Administrator                                                            |
| **Trigger**        | When user clicks Export Excel button.                                           |
| **Pre-condition**  | User must be authenticated with "Service" permission. ServiceView is displayed. |
| **Post-condition** | Excel file containing service data is generated and downloaded.                 |

###### _Activities Flow_

(Refer to "Activity Export Services to Excel" diagram in "Activity for wedding management system/manage-services" folder)

###### _Business Rules_

| Activity                  | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :------------------------ | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3), (4), (5)_ | _BR102_ | **Displaying Rules:** When user selects action "Xuất Excel" from \[SelectedAction\], the system sets \[IsAdding\] = FALSE, \[IsEditing\] = FALSE, \[IsDeleting\] = FALSE, \[IsExporting\] = TRUE.<br>User can apply filter criteria (optional) and the system displays filtered services list.<br>User clicks \[ExportToExcelCommand\] button to export.<br>(Refer to "ServiceView" view in "View Description" file)                                                                                                                                                                                         |
| _(6), (6.1), (6.2)_       | _BR103_ | **Validation Rules:** The `ExportToExcel()` in `ServiceViewModel` checks if there is data to export.<br>IF \[ServiceList\] = NULL OR \[ServiceList\].Count = 0, the system displays validation message and returns.<br>User confirms end. (Refer to MSG 19)                                                                                                                                                                                                                                                                                                                                                  |
| _(7), (8), (9), (10)_     | _BR104_ | **Processing Rules:** IF data exists, the system creates new XLWorkbook using ClosedXML library, adds worksheet "Danh sách Dịch vụ" with columns: "Tên dịch vụ", "Đơn giá", "Ghi chú".<br>Iterates through \[ServiceList\] and populates rows with service data.<br>Applies formatting: header bold, light gray background, centered alignment, borders, number format "#,##0" for price.<br>Creates filename with timestamp format "DanhSachDichVu\_\[yyyyMMddHHmmss\].xlsx", opens SaveFileDialog for user to choose location.<br>Saves workbook and opens the file for user to view.<br>(Refer to MSG 71) |

##### 2.1.3.21 View Shift Details

###### _Use Case Description_

| Name               | View Shift Details                                                                 |
| :----------------- | :--------------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to view the list of all shifts and their details. |
| **Actor**          | Staff, Administrator                                                               |
| **Trigger**        | When user selects view shifts function.                                            |
| **Pre-condition**  | User must be authenticated with valid active session and have "Shift" permission.  |
| **Post-condition** | Shift list is displayed with all shift information.                                |

###### _Activities Flow_

(Refer to "Activity View Shift Details" diagram in "Activity for wedding management system/manage-shifts" folder)

###### _Business Rules_

| Activity              | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :-------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_            | _BR105_ | **Displaying Rules:** When user clicks \[ShiftCommand\], the system reinitializes database context by method `resetDatabaseContext()`, creates new ShiftView with ShiftViewModel as DataContext.<br>The ShiftViewModel constructor loads shifts from database by method `GetAll()` in `ShiftService` class with syntax "SELECT \* FROM Shift", and displays "ShiftView" screen with DataGrid showing list of shifts.<br>(Refer to "ShiftView" view in "View Description" file)                                                                       |
| _(3), (4), (5), (6)_  | _BR106_ | **Searching Rules:** When user enters search text in \[SearchText\] field, the system uses method `PerformSearch()` in `ShiftViewModel` to filter shifts.<br>The method checks \[SelectedSearchProperty\] and filters \[OriginalList\] accordingly:<br>IF \[SelectedSearchProperty\] = "Tên ca", filter by \[ShiftName\] CONTAINS \[SearchText\].<br>IF \[SelectedSearchProperty\] = "Thời gian bắt đầu", filter by \[StartTime\] = \[SearchText\].<br>IF \[SelectedSearchProperty\] = "Thời gian kết thúc", filter by \[EndTime\] = \[SearchText\]. |
| _(7), (8), (9), (10)_ | _BR107_ | **Selection Rules:** When user selects shift from DataGrid, the system triggers property setter `setSelectedItem(shift)` in `ShiftViewModel`.<br>The system populates form fields: \[ShiftName\] = \[SelectedItem.ShiftName\], \[StartTime\] = \[SelectedItem.StartTime\], \[EndTime\] = \[SelectedItem.EndTime\].<br>User views shift information and can close dialog or proceed to edit/delete.                                                                                                                                                   |

##### 2.1.3.22 Add New Shift

###### _Use Case Description_

| Name               | Add New Shift                                                                   |
| :----------------- | :------------------------------------------------------------------------------ |
| **Description**    | This use case allows Staff/Admin to add a new shift to the system.              |
| **Actor**          | Staff, Administrator                                                            |
| **Trigger**        | When user selects function Add New Shift.                                       |
| **Pre-condition**  | User must be authenticated and have "Shift" permission. ShiftView is displayed. |
| **Post-condition** | New shift is created in database and displayed in shift list.                   |

###### _Activities Flow_

(Refer to "Activity Add New Shift" diagram in "Activity for wedding management system/manage-shifts" folder)

###### _Business Rules_

| Activity                    | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :-------------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_                  | _BR108_ | **Displaying Rules:** When user selects action "Thêm" from \[SelectedAction\], the system sets \[IsAdding\] = TRUE, \[IsEditing\] = FALSE, \[IsDeleting\] = FALSE and calls method `Reset()` to clear form fields.<br>The system displays add shift form with fields: \[ShiftName\], \[StartTime\], \[EndTime\].<br>(Refer to "ShiftView" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| _(3), (4), (5), (6), (6.1)_ | _BR109_ | **Validation Rules:** When user enters shift information and clicks \[AddCommand\], the system will use `CanAdd()` in `ShiftViewModel` to validate data.<br>IF \[ShiftName\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 72)<br>IF \[StartTime\] = NULL, the system displays validation message and returns false. (Refer to MSG 73)<br>IF \[EndTime\] = NULL, the system displays validation message and returns false. (Refer to MSG 74)<br>IF \[StartTime\] < 07:30 OR \[StartTime\] >= 24:00, the system displays validation message and returns false. (Refer to MSG 75)<br>IF \[EndTime\] < 07:30 OR \[EndTime\] >= 24:00, the system displays validation message and returns false. (Refer to MSG 75)<br>IF \[EndTime\] <= \[StartTime\], the system displays validation message and returns false. (Refer to MSG 76)<br>IF isDuplicateShiftName(\[ShiftName\]) = TRUE, the system displays validation message and returns false. (Refer to MSG 77) |
| _(7), (8), (9), (10)_       | _BR110_ | **Processing Rules:** After validation passes, the system creates new ShiftDTO object with: \[ShiftName\] = \[ShiftName\].Trim, \[StartTime\] = \[StartTime\], \[EndTime\] = \[EndTime\].<br>System calls method `Create(newShift)` in `ShiftService` class to insert into database by syntax "INSERT INTO Shift (ShiftName, StartTime, EndTime) VALUES (...)".<br>Adds to \[ShiftList\], calls method `Reset()` to clear form, and displays success notification.<br>(Refer to MSG 78)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

##### 2.1.3.23 Edit Shift

###### _Use Case Description_

| Name               | Edit Shift                                                                    |
| :----------------- | :---------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to edit an existing shift's information.     |
| **Actor**          | Staff, Administrator                                                          |
| **Trigger**        | When user selects function Edit Shift.                                        |
| **Pre-condition**  | User must be authenticated with "Shift" permission. A shift must be selected. |
| **Post-condition** | Shift information is updated in database and reflected in shift list.         |

###### _Activities Flow_

(Refer to "Activity Edit Shift" diagram in "Activity for wedding management system/manage-shifts" folder)

###### _Business Rules_

| Activity                  | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :------------------------ | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3), (4), (5)_ | _BR111_ | **Displaying Rules:** When user selects action "Sửa" from \[SelectedAction\], the system sets \[IsAdding\] = FALSE, \[IsEditing\] = TRUE, \[IsDeleting\] = FALSE and calls method `Reset()`.<br>When user selects a shift from DataGrid, the system triggers property setter `setSelectedItem(shift)` to populate form with current data.<br>(Refer to "ShiftView" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| _(6), (7), (8), (8.1)_    | _BR112_ | **Validation Rules:** When user edits shift information and clicks \[EditCommand\], the system will use `CanEdit()` in `ShiftViewModel` to validate data.<br>IF \[SelectedItem\] = NULL, returns false.<br>IF \[ShiftName\].IsEmpty = TRUE, the system displays validation message and returns false. (Refer to MSG 72)<br>IF \[StartTime\] = NULL, the system displays validation message and returns false. (Refer to MSG 73)<br>IF \[EndTime\] = NULL, the system displays validation message and returns false. (Refer to MSG 74)<br>IF \[StartTime\] < 07:30 OR \[StartTime\] >= 24:00, the system displays validation message and returns false. (Refer to MSG 75)<br>IF \[EndTime\] < 07:30 OR \[EndTime\] >= 24:00, the system displays validation message and returns false. (Refer to MSG 75)<br>IF \[EndTime\] <= \[StartTime\], the system displays validation message and returns false. (Refer to MSG 76)<br>IF isDuplicateShiftName(\[ShiftName\], \[ShiftId\]) = TRUE, the system displays validation message and returns false. (Refer to MSG 77)<br>IF no changes detected (all fields unchanged), the system displays info message and returns false. (Refer to MSG 16) |
| _(9), (10), (11)_         | _BR113_ | **Processing Rules:** After validation passes, the system creates ShiftDTO object with updated values, calls method `Update(updateDto)` in `ShiftService` class to update in database by syntax "UPDATE Shift SET ShiftName = \[ShiftName\], StartTime = \[StartTime\], EndTime = \[EndTime\] WHERE ShiftId = \[ShiftId\]".<br>Updates \[ShiftList\] at selected index, calls method `Reset()`, and displays success notification.<br>(Refer to MSG 79)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

##### 2.1.3.24 Delete Shift

###### _Use Case Description_

| Name               | Delete Shift                                                                  |
| :----------------- | :---------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to delete an existing shift from the system. |
| **Actor**          | Staff, Administrator                                                          |
| **Trigger**        | When user selects delete shift function.                                      |
| **Pre-condition**  | User must be authenticated with "Shift" permission. A shift must be selected. |
| **Post-condition** | Shift is removed from database.                                               |

###### _Activities Flow_

(Refer to "Activity Delete Shift" diagram in "Activity for wedding management system/manage-shifts" folder)

###### _Business Rules_

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                         |
| :----------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(1), (2), (3), (4)_     | _BR114_ | **Displaying Rules:** When user selects action "Xóa" from \[SelectedAction\], the system sets \[IsAdding\] = FALSE, \[IsEditing\] = FALSE, \[IsDeleting\] = TRUE and calls method `Reset()`.<br>The system displays shifts list in DataGrid. User selects shift to delete.<br>(Refer to "ShiftView" view in "View Description" file)                                                                                |
| _(5), (5.1), (5.2)_      | _BR115_ | **Reference Check Rules:** The `CanDelete()` in `ShiftViewModel` checks if the shift has referenced data by querying "SELECT COUNT(\*) FROM Booking WHERE ShiftId = \[SelectedItem.ShiftId\]" using `_bookingService.GetAll()`.<br>IF shift exists in Booking (used in bookings), the system displays warning message and returns false.<br>User views that shift is being used and confirms end. (Refer to MSG 80) |
| _(6), (7), (7.1), (7.2)_ | _BR116_ | **Confirmation Rules:** IF no references exist, the system displays confirmation dialog.<br>IF user clicks "No" button, the operation is cancelled and no changes are made. (Refer to MSG 81)                                                                                                                                                                                                                       |
| _(8), (9), (10)_         | _BR117_ | **Processing Rules:** IF user clicks "Yes" button to confirm delete, the system calls method `Delete(ShiftId)` in `ShiftService` class to delete shift from database by syntax "DELETE FROM Shift WHERE ShiftId = \[SelectedItem.ShiftId\]".<br>Removes shift from \[ShiftList\] and \[OriginalList\], calls method `Reset()` to clear selection, and displays success notification.<br>(Refer to MSG 83)           |

##### 2.1.3.25 Export Shifts to Excel

###### _Use Case Description_

| Name               | Export Shifts to Excel                                                      |
| :----------------- | :-------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to export the shift list to an Excel file. |
| **Actor**          | Staff, Administrator                                                        |
| **Trigger**        | When user selects Export to Excel function.                                 |
| **Pre-condition**  | User must be authenticated with "Shift" permission. ShiftView is displayed. |
| **Post-condition** | Shift list is exported to Excel file and saved to user's selected location. |

###### _Activities Flow_

(Refer to "Activity Export Shifts to Excel" diagram in "Activity for wedding management system/manage-shifts" folder)

###### _Business Rules_

| Activity                  | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :------------------------ | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3), (4), (5)_ | _BR118_ | **Displaying Rules:** When user selects action "Xuất Excel" from \[SelectedAction\], the system sets \[IsAdding\] = FALSE, \[IsEditing\] = FALSE, \[IsDeleting\] = FALSE, \[IsExporting\] = TRUE.<br>User can apply filter criteria (optional) and the system displays filtered shifts list.<br>User clicks \[ExportToExcelCommand\] button to export.<br>(Refer to "ShiftView" view in "View Description" file)                                                                                                                                                                                     |
| _(6), (6.1), (6.2)_       | _BR119_ | **Validation Rules:** The `ExportToExcel()` in `ShiftViewModel` checks if there is data to export.<br>IF \[ShiftList\] = NULL OR \[ShiftList\].Count = 0, the system displays validation message and returns.<br>User confirms end. (Refer to MSG 19)                                                                                                                                                                                                                                                                                                                                                |
| _(7), (8), (9), (10)_     | _BR120_ | **Processing Rules:** IF data exists, the system creates new XLWorkbook using ClosedXML library, adds worksheet "Danh sách Ca" with columns: "Tên ca", "Thời gian bắt đầu", "Thời gian kết thúc".<br>Iterates through \[ShiftList\] and populates rows with shift data.<br>Applies formatting: header bold, light gray background, centered alignment, borders, time format "HH:mm".<br>Creates filename with timestamp format "DanhSachCa\_\[yyyyMMddHHmmss\].xlsx", opens SaveFileDialog for user to choose location.<br>Saves workbook and opens the file for user to view.<br>(Refer to MSG 101) |

#### 2.1.4 Customer Booking Operations

##### 2.1.4.1 Register Account

###### _Use Case Description_

| Name               | Register Account                                                                                   |
| :----------------- | :------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows a new customer to register an account on the wedding management web platform. |
| **Actor**          | Customer (Guest)                                                                                   |
| **Trigger**        | When customer clicks Register button on login page.                                                |
| **Pre-condition**  | Customer is not logged in. Registration page is displayed.                                         |
| **Post-condition** | New customer account is created and customer can login to the system.                              |

###### _Activities Flow_

(Refer to "Activity Register Account" diagram in "Activity for wedding management system/customer-auth" folder)

###### _Business Rules_

| Activity               | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :--------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_             | _BR118_ | **Displaying Rules:** When customer clicks "Đăng ký" button on login page, the system navigates to registration page.<br>The system displays registration form with fields: \[Username\], \[Password\], \[ConfirmPassword\], \[FullName\], \[Email\], \[PhoneNumber\].                                                                                                                                                                                                                                                                                                                                                                                                                   |
| _(3), (4), (5), (5.1)_ | _BR119_ | **Validation Rules:** When customer enters information and clicks \[RegisterButton\], the system validates data.<br>IF \[Username\].IsEmpty = TRUE, displays validation message. (Refer to MSG 11)<br>IF \[Password\].IsEmpty = TRUE, displays validation message. (Refer to MSG 12)<br>IF \[Password\] != \[ConfirmPassword\], displays validation message. (Refer to MSG 7)<br>IF \[FullName\].IsEmpty = TRUE, displays validation message. (Refer to MSG 13)<br>IF isValidEmail(\[Email\]) = FALSE, displays validation message. (Refer to MSG 4)<br>IF isDuplicateUsername(\[Username\]) = TRUE OR isDuplicateEmail(\[Email\]) = TRUE, displays validation message. (Refer to MSG 5) |
| _(6), (7), (8)_        | _BR120_ | **Processing Rules:** After validation passes, the system creates new Customer record with hashed password, inserts into database.<br>System sends verification email (optional) and displays success notification.<br>Customer is redirected to login page. (Refer to MSG 83)                                                                                                                                                                                                                                                                                                                                                                                                           |

##### 2.1.4.2 Check Hall Availability

###### _Use Case Description_

| Name               | Check Hall Availability                                                               |
| :----------------- | :------------------------------------------------------------------------------------ |
| **Description**    | This use case allows customer to check available halls for a specific date and shift. |
| **Actor**          | Customer                                                                              |
| **Trigger**        | When customer selects check availability function.                                    |
| **Pre-condition**  | Customer is logged in. Hall availability page is displayed.                           |
| **Post-condition** | Available halls for selected date and shift are displayed.                            |

###### _Activities Flow_

(Refer to "Activity Check Hall Availability" diagram in "Activity for wedding management system/customer-booking" folder)

###### _Business Rules_

| Activity        | BR Code | Description                                                                                                                                                                                                                                                                                                                                                    |
| :-------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_      | _BR121_ | **Displaying Rules:** When customer navigates to hall availability page, the system displays calendar and shift selection controls.<br>Customer selects \[EventDate\] from calendar and \[Shift\] from dropdown.                                                                                                                                               |
| _(3), (4), (5)_ | _BR122_ | **Validation Rules:** IF \[EventDate\] < TODAY, the system displays validation message. (Refer to MSG 84)<br>IF \[Shift\] = NULL, the system displays validation message. (Refer to MSG 85)                                                                                                                                                                    |
| _(6), (7), (8)_ | _BR123_ | **Processing Rules:** The system queries available halls by syntax "SELECT \* FROM Hall WHERE HallId NOT IN (SELECT HallId FROM Booking WHERE EventDate = \[EventDate\] AND ShiftId = \[ShiftId\])".<br>System displays list of available halls with details (name, type, capacity, price).<br>IF no halls available, displays info message. (Refer to MSG 86) |

##### 2.1.4.3 Submit Wedding Reservation

###### _Use Case Description_

| Name               | Submit Wedding Reservation                                             |
| :----------------- | :--------------------------------------------------------------------- |
| **Description**    | This use case allows customer to create a new wedding booking request. |
| **Actor**          | Customer                                                               |
| **Trigger**        | When customer clicks Book Now button for an available hall.            |
| **Pre-condition**  | Customer is logged in. Hall is available for selected date and shift.  |
| **Post-condition** | New booking request is created with "Pending" status.                  |

###### _Activities Flow_

(Refer to "Activity Submit Wedding Reservation" diagram in "Activity for wedding management system/customer-booking" folder)

###### _Business Rules_

| Activity               | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :--------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(1), (2), (3)_        | _BR124_ | **Displaying Rules:** When customer clicks "Đặt tiệc" button on available hall, the system displays booking form.<br>Form includes: \[GroomName\], \[BrideName\], \[PhoneNumber\], \[TableCount\], and selected hall/date/shift information (read-only).                                                                                                                                                                                                      |
| _(4), (5), (6), (6.1)_ | _BR125_ | **Validation Rules:** When customer clicks \[SubmitButton\], the system validates data.<br>IF \[GroomName\].IsEmpty = TRUE OR \[BrideName\].IsEmpty = TRUE, displays validation message. (Refer to MSG 87)<br>IF \[PhoneNumber\].IsEmpty = TRUE OR isValidPhone(\[PhoneNumber\]) = FALSE, displays validation message. (Refer to MSG 88)<br>IF \[TableCount\] <= 0 OR \[TableCount\] > \[Hall.MaxTableCount\], displays validation message. (Refer to MSG 89) |
| _(7), (8), (9), (10)_  | _BR126_ | **Processing Rules:** After validation passes, the system creates new Booking record with status = "Pending", calculates estimated total from \[TableCount\] × \[Hall.MinTablePrice\].<br>System inserts booking into database, sends confirmation email to customer, and displays success notification with booking reference number.<br>(Refer to MSG 90)                                                                                                   |

##### 2.1.4.4 View My Booking Details

###### _Use Case Description_

| Name               | View My Booking Details                                                  |
| :----------------- | :----------------------------------------------------------------------- |
| **Description**    | This use case allows customer to view their booking history and details. |
| **Actor**          | Customer                                                                 |
| **Trigger**        | When customer navigates to My Bookings page.                             |
| **Pre-condition**  | Customer is logged in.                                                   |
| **Post-condition** | Customer's booking list and selected booking details are displayed.      |

###### _Activities Flow_

(Refer to "Activity View My Booking Details" diagram in "Activity for wedding management system/customer-booking" folder)

###### _Business Rules_

| Activity        | BR Code | Description                                                                                                                                                                                                                                                                               |
| :-------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3)_ | _BR127_ | **Displaying Rules:** When customer navigates to "Phiếu đặt của tôi" page, the system queries bookings by syntax "SELECT \* FROM Booking WHERE CustomerId = \[currentUser.CustomerId\] ORDER BY CreatedDate DESC".<br>System displays list of customer's bookings with status indicators. |
| _(4), (5), (6)_ | _BR128_ | **Selection Rules:** When customer selects a booking from list, the system displays full booking details including: hall info, event date, shift, table count, menu items, services, total amount, payment status, and current booking status.                                            |

##### 2.1.4.5 Edit My Booking Request

###### _Use Case Description_

| Name               | Edit My Booking Request                                                            |
| :----------------- | :--------------------------------------------------------------------------------- |
| **Description**    | This use case allows customer to edit their pending booking before staff approval. |
| **Actor**          | Customer                                                                           |
| **Trigger**        | When customer clicks Edit button on a pending booking.                             |
| **Pre-condition**  | Customer is logged in. Booking status must be "Pending".                           |
| **Post-condition** | Booking information is updated.                                                    |

###### _Activities Flow_

(Refer to "Activity Edit My Booking Request" diagram in "Activity for wedding management system/customer-booking" folder)

###### _Business Rules_

| Activity               | BR Code | Description                                                                                                                                                                                                                                                                                                                                          |
| :--------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3)_        | _BR129_ | **Displaying Rules:** When customer clicks "Sửa" button on booking with status = "Pending", the system displays edit booking form with current values.<br>IF booking status != "Pending", the system displays warning message and disables edit. (Refer to MSG 91)                                                                                   |
| _(4), (5), (6), (6.1)_ | _BR130_ | **Validation Rules:** Same validation as BR125 for booking submission.<br>IF \[GroomName\].IsEmpty = TRUE OR \[BrideName\].IsEmpty = TRUE, displays validation message. (Refer to MSG 87)<br>IF \[PhoneNumber\] invalid, displays validation message. (Refer to MSG 88)<br>IF \[TableCount\] invalid, displays validation message. (Refer to MSG 89) |
| _(7), (8), (9)_        | _BR131_ | **Processing Rules:** After validation passes, the system updates Booking record in database, recalculates estimated total, and displays success notification.<br>(Refer to MSG 92)                                                                                                                                                                  |

##### 2.1.4.6 Cancel My Booking

###### _Use Case Description_

| Name               | Cancel My Booking                                                                      |
| :----------------- | :------------------------------------------------------------------------------------- |
| **Description**    | This use case allows customer to cancel their pending booking.                         |
| **Actor**          | Customer                                                                               |
| **Trigger**        | When customer clicks Cancel button on a booking.                                       |
| **Pre-condition**  | Customer is logged in. Booking status must be "Pending" or within cancellation period. |
| **Post-condition** | Booking is cancelled or marked for cancellation with applicable penalties.             |

###### _Activities Flow_

(Refer to "Activity Cancel My Booking" diagram in "Activity for wedding management system/customer-booking" folder)

###### _Business Rules_

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                        |
| :----------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3)_          | _BR132_ | **Displaying Rules:** When customer clicks "Hủy" button on booking, the system checks booking status and cancellation eligibility.<br>IF booking status = "Completed" OR booking status = "Cancelled", the system displays warning message. (Refer to MSG 93)                                                      |
| _(4), (5), (5.1), (5.2)_ | _BR136_ | **Penalty Check Rules:** IF booking has deposit paid AND \[EventDate\] - TODAY < \[Parameter.MinCancellationDays\], the system calculates penalty = \[DepositAmount\] × \[Parameter.PenaltyRate\].<br>System displays confirmation dialog with penalty amount if applicable. (Refer to MSG 96)                     |
| _(6), (7), (8)_          | _BR137_ | **Processing Rules:** IF customer confirms cancellation, the system updates Booking.Status = "Cancelled", records cancellation reason and penalty amount.<br>IF penalty applies, creates invoice for penalty. System sends cancellation confirmation email and displays success notification.<br>(Refer to MSG 98) |

#### 2.1.5 Staff Booking Management

##### 2.1.5.1 Check System Hall Availability

###### _Use Case Description_

| Name               | Check System Hall Availability                                                      |
| :----------------- | :---------------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to check hall availability for any date and shift. |
| **Actor**          | Staff, Administrator                                                                |
| **Trigger**        | When user selects check availability function from booking management.              |
| **Pre-condition**  | User must be authenticated with "Booking" permission.                               |
| **Post-condition** | Available halls for selected criteria are displayed.                                |

###### _Activities Flow_

(Refer to "Activity Check System Hall Availability" diagram in "Activity for wedding management system/manage-bookings" folder)

###### _Business Rules_

| Activity        | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                         |
| :-------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_      | _BR138_ | **Displaying Rules:** When user navigates to booking management screen, the system displays calendar view and shift selection.<br>User can select \[EventDate\] and \[Shift\] from controls.                                                                                                                                                                                                        |
| _(3), (4), (5)_ | _BR139_ | **Processing Rules:** The system queries available halls by syntax "SELECT h.\* FROM Hall h WHERE h.HallId NOT IN (SELECT b.HallId FROM Booking b WHERE b.EventDate = \[EventDate\] AND b.ShiftId = \[ShiftId\] AND b.Status != 'Cancelled')".<br>System displays list of available halls with capacity and pricing information.<br>IF no halls available, displays info message. (Refer to MSG 90) |

##### 2.1.5.2 Create Booking for Customer

###### _Use Case Description_

| Name               | Create Booking for Customer                                                         |
| :----------------- | :---------------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff to create a new booking on behalf of a walk-in customer. |
| **Actor**          | Staff                                                                               |
| **Trigger**        | When staff clicks Create New Booking button.                                        |
| **Pre-condition**  | User must be authenticated with "Booking" permission. Hall is available.            |
| **Post-condition** | New booking is created with "Confirmed" or "Pending" status.                        |

###### _Activities Flow_

(Refer to "Activity Create Booking for Customer" diagram in "Activity for wedding management system/manage-bookings" folder)

###### _Business Rules_

| Activity               | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                |
| :--------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3)_        | _BR140_ | **Displaying Rules:** When staff clicks "Tạo phiếu đặt" button, the system displays booking form with fields: \[GroomName\], \[BrideName\], \[PhoneNumber\], \[EventDate\], \[Shift\], \[Hall\], \[TableCount\], \[Menu\], \[Services\].                                                                                                                                                                   |
| _(4), (5), (6), (6.1)_ | _BR141_ | **Validation Rules:** When staff clicks \[SaveButton\], the system validates all required fields.<br>IF any required field is empty, displays validation message. (Refer to MSG 10)<br>IF \[TableCount\] <= 0 OR \[TableCount\] > \[Hall.MaxTableCount\], displays validation message. (Refer to MSG 91)<br>IF hall not available for selected date/shift, displays validation message. (Refer to MSG 102) |
| _(7), (8), (9)_        | _BR142_ | **Processing Rules:** After validation passes, the system calculates total amount from \[TableCount\] × \[MinTablePrice\] + \[MenuTotal\] + \[ServicesTotal\].<br>Creates new Booking record with status = "Confirmed", generates invoice, and displays success notification with booking ID.<br>(Refer to MSG 103)                                                                                        |

##### 2.1.5.3 Delete Booking

###### _Use Case Description_

| Name               | Delete Booking                                                                  |
| :----------------- | :------------------------------------------------------------------------------ |
| **Description**    | This use case allows Staff/Admin to delete a booking from the system.           |
| **Actor**          | Staff, Administrator                                                            |
| **Trigger**        | When user selects delete booking function.                                      |
| **Pre-condition**  | User must be authenticated with "Booking" permission. Booking must be selected. |
| **Post-condition** | Booking is removed from database or marked as deleted.                          |

###### _Activities Flow_

(Refer to "Activity Delete Booking" diagram in "Activity for wedding management system/manage-bookings" folder)

###### _Business Rules_

| Activity            | BR Code | Description                                                                                                                                                                                                                                                        |
| :------------------ | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3)_     | _BR143_ | **Displaying Rules:** When user selects booking and clicks "Xóa" button, the system checks booking status and payment status.                                                                                                                                      |
| _(4), (4.1), (4.2)_ | _BR144_ | **Validation Rules:** IF booking has payments (deposit or full), the system displays warning message about refund requirement.<br>IF booking status = "Completed", the system displays error message that completed bookings cannot be deleted. (Refer to MSG 104) |
| _(5), (6), (7)_     | _BR145_ | **Processing Rules:** IF user confirms deletion, the system updates Booking.Status = "Deleted" or removes from database, logs deletion reason, and displays success notification.<br>(Refer to MSG 105)                                                            |

##### 2.1.5.4 Search/Filter All Bookings

###### _Use Case Description_

| Name               | Search/Filter All Bookings                                                          |
| :----------------- | :---------------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to search and filter bookings by various criteria. |
| **Actor**          | Staff, Administrator                                                                |
| **Trigger**        | When user navigates to booking list screen.                                         |
| **Pre-condition**  | User must be authenticated with "Booking" permission.                               |
| **Post-condition** | Filtered booking list is displayed.                                                 |

###### _Activities Flow_

(Refer to "Activity Search/Filter All Bookings" diagram in "Activity for wedding management system/manage-bookings" folder)

###### _Business Rules_

| Activity             | BR Code | Description                                                                                                                                                                                                                                                                                                     |
| :------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_           | _BR146_ | **Displaying Rules:** When user navigates to booking management screen, the system loads all bookings by syntax "SELECT \* FROM Booking ORDER BY EventDate DESC".<br>System displays list with columns: Booking ID, Groom/Bride Name, Event Date, Shift, Hall, Status, Total Amount.                            |
| _(3), (4), (5), (6)_ | _BR147_ | **Searching Rules:** User can filter by: \[SearchText\] (name, phone), \[DateRange\] (from-to), \[Status\] (Pending/Confirmed/Completed/Cancelled), \[Shift\], \[Hall\].<br>System applies filters dynamically and displays matching results.<br>IF no results found, displays info message. (Refer to MSG 106) |

##### 2.1.5.5 View Any Booking Details

###### _Use Case Description_

| Name               | View Any Booking Details                                                      |
| :----------------- | :---------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to view detailed information of any booking. |
| **Actor**          | Staff, Administrator                                                          |
| **Trigger**        | When user selects a booking from the list.                                    |
| **Pre-condition**  | User must be authenticated with "Booking" permission.                         |
| **Post-condition** | Full booking details are displayed.                                           |

###### _Activities Flow_

(Refer to "Activity View Any Booking Details" diagram in "Activity for wedding management system/manage-bookings" folder)

###### _Business Rules_

| Activity        | BR Code | Description                                                                                                                                                                                                                                |
| :-------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3)_ | _BR148_ | **Displaying Rules:** When user selects booking from list, the system queries full booking details including: customer info, hall info, event details, menu items (dishes), services, payment history, and status timeline.                |
| _(4), (5), (6)_ | _BR149_ | **Display Rules:** System displays booking details in organized sections: Basic Info, Hall & Event, Menu & Services, Payment Summary, Status History.<br>User can print, export to PDF, or proceed to edit/process payment from this view. |

##### 2.1.5.6 Modify Booking Details

###### _Use Case Description_

| Name               | Modify Booking Details                                                               |
| :----------------- | :----------------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff to modify booking details (menu, services, table count).  |
| **Actor**          | Staff                                                                                |
| **Trigger**        | When staff clicks Edit button on a booking.                                          |
| **Pre-condition**  | User must be authenticated with "Booking" permission. Booking status != "Completed". |
| **Post-condition** | Booking details are updated and total amount is recalculated.                        |

###### _Activities Flow_

(Refer to "Activity Modify Booking Details" diagram in "Activity for wedding management system/manage-bookings" folder)

###### _Business Rules_

| Activity               | BR Code | Description                                                                                                                                                                                                                                               |
| :--------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3)_        | _BR150_ | **Displaying Rules:** When staff clicks "Sửa" on booking, the system checks status.<br>IF status = "Completed", displays error message that completed bookings cannot be edited. (Refer to MSG 107)<br>ELSE displays edit form with current booking data. |
| _(4), (5), (6), (6.1)_ | _BR151_ | **Validation Rules:** Staff modifies \[TableCount\], \[Menu\], \[Services\], or other details and clicks \[SaveButton\].<br>System validates changes similar to BR141.<br>IF no changes detected, displays info message. (Refer to MSG 16)                |
| _(7), (8), (9)_        | _BR152_ | **Processing Rules:** After validation passes, the system recalculates total amount, updates Booking record, updates invoice if exists, logs modification history, and displays success notification.<br>(Refer to MSG 108)                               |

#### 2.1.6 Customer Payment & Invoice

##### 2.1.6.1 View My Invoice & Debt

###### _Use Case Description_

| Name               | View My Invoice & Debt                                                    |
| :----------------- | :------------------------------------------------------------------------ |
| **Description**    | This use case allows customer to view their invoice and outstanding debt. |
| **Actor**          | Customer                                                                  |
| **Trigger**        | When customer navigates to My Invoices page.                              |
| **Pre-condition**  | Customer is logged in. Customer has at least one booking.                 |
| **Post-condition** | Customer's invoice list and debt information are displayed.               |

###### _Activities Flow_

(Refer to "Activity View My Invoice & Debt" diagram in "Activity for wedding management system/customer-payment" folder)

###### _Business Rules_

| Activity        | BR Code | Description                                                                                                                                                                                                                                                                                             |
| :-------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(1), (2), (3)_ | _BR153_ | **Displaying Rules:** When customer navigates to "Hóa đơn của tôi" page, the system queries invoices by syntax "SELECT \* FROM Invoice WHERE CustomerId = \[currentUser.CustomerId\]".<br>System displays invoice list with: Booking ID, Event Date, Total Amount, Paid Amount, Remaining Debt, Status. |
| _(4), (5), (6)_ | _BR154_ | **Selection Rules:** When customer selects invoice, the system displays detailed breakdown: hall cost, menu cost, services cost, penalties (if any), deposit paid, remaining balance.                                                                                                                   |

##### 2.1.6.2 Pay My Invoice

###### _Use Case Description_

| Name               | Pay My Invoice                                                                     |
| :----------------- | :--------------------------------------------------------------------------------- |
| **Description**    | This use case allows customer to make payment (deposit or full) for their booking. |
| **Actor**          | Customer                                                                           |
| **Trigger**        | When customer clicks Pay button on their invoice.                                  |
| **Pre-condition**  | Customer is logged in. Invoice has remaining balance > 0.                          |
| **Post-condition** | Payment is recorded and invoice balance is updated.                                |

###### _Activities Flow_

(Refer to "Activity Pay My Invoice" diagram in "Activity for wedding management system/customer-payment" folder)

###### _Business Rules_

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                              |
| :---------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3)_   | _BR155_ | **Displaying Rules:** When customer clicks "Thanh toán" button, the system displays payment form with: \[PaymentAmount\] (default = remaining balance), \[PaymentMethod\] (Bank Transfer, E-Wallet, Cash).<br>System shows minimum deposit requirement = \[Parameter.MinDepositRate\] × \[TotalAmount\].                 |
| _(4), (5), (5.1)_ | _BR156_ | **Validation Rules:** IF \[PaymentAmount\] < \[MinDepositAmount\] AND this is first payment, displays validation message about minimum deposit. (Refer to MSG 109)<br>IF \[PaymentAmount\] > \[RemainingBalance\], displays validation message. (Refer to MSG 110)                                                       |
| _(6), (7), (8)_   | _BR157_ | **Processing Rules:** After validation passes, the system records payment, updates invoice paid amount and remaining balance.<br>IF remaining balance = 0, updates invoice status to "Paid" and booking status to "Confirmed".<br>System generates payment receipt and displays success notification. (Refer to MSG 111) |

##### 2.1.6.3 Export My Invoice to PDF

###### _Use Case Description_

| Name               | Export My Invoice to PDF                                             |
| :----------------- | :------------------------------------------------------------------- |
| **Description**    | This use case allows customer to export their invoice to PDF format. |
| **Actor**          | Customer                                                             |
| **Trigger**        | When customer clicks Export PDF button on their invoice.             |
| **Pre-condition**  | Customer is logged in. Invoice exists.                               |
| **Post-condition** | Invoice PDF file is generated and downloaded.                        |

###### _Activities Flow_

(Refer to "Activity Export My Invoice to PDF" diagram in "Activity for wedding management system/customer-payment" folder)

###### _Business Rules_

| Activity        | BR Code | Description                                                                                                                                                                                                                                                                                                                                                    |
| :-------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3)_ | _BR158_ | **Displaying Rules:** When customer clicks "Xuất PDF" button on invoice, the system prepares invoice data including company logo, invoice details, itemized costs, payment history, and remaining balance.                                                                                                                                                     |
| _(4), (5), (6)_ | _BR159_ | **Processing Rules:** System generates PDF using iText library with professional invoice template.<br>PDF includes: header with company info, invoice number, customer details, booking details, cost breakdown, payment summary, terms & conditions.<br>Creates filename "HoaDon\_\[InvoiceId\]\_\[yyyyMMdd\].pdf" and initiates download. (Refer to MSG 112) |

#### 2.1.7 Staff Invoice Management

##### 2.1.7.1 View Any Invoice & Debt

###### _Use Case Description_

| Name               | View Any Invoice & Debt                                                                        |
| :----------------- | :--------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to view invoice and debt details from booking details screen. |
| **Actor**          | Staff, Administrator                                                                           |
| **Trigger**        | When user clicks "View Invoice" button from Booking Details screen (UC 2.1.5.5).               |
| **Pre-condition**  | User must be authenticated with "Invoice" permission. Booking must be approved (has invoice).  |
| **Post-condition** | Invoice details and remaining debt are displayed.                                              |

###### _Activities Flow_

(Refer to "Activity View Any Invoice & Debt" diagram in "Activity for wedding management system/manage-invoices" folder)

###### _Business Rules_

| Activity        | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                             |
| :-------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(1), (2), (3)_ | _BR160_ | **Displaying Rules:** When user clicks "Xem hóa đơn" button from Booking Details screen (UC 2.1.5.5), the system queries invoice details from `Booking`, `Menu`, `ServiceDetail`, `Hall`, `Shift`, `AppUser` tables.<br>System displays InvoiceView with: Groom/Bride Name, Wedding Date, Hall, Shift, Table Count, Table Price, Service List, Total Amounts, Deposit, Fine (if any), Remaining Amount. |
| _(4), (5), (6)_ | _BR161_ | **Display Rules:** System displays payment status clearly (Paid/Unpaid). If unpaid (`RemainingAmount` > 0), user can proceed to Confirm Payment (UC 2.1.7.2) or Export PDF (UC 2.1.7.3).<br>System highlights remaining debt with appropriate color coding.                                                                                                                                             |

##### 2.1.7.2 Confirm Payment & Calculate Penalty

###### _Use Case Description_

| Name               | Confirm Payment & Calculate Penalty                                                         |
| :----------------- | :------------------------------------------------------------------------------------------ |
| **Description**    | This use case allows Staff/Admin to confirm customer payments and calculate late penalties. |
| **Actor**          | Staff, Administrator                                                                        |
| **Trigger**        | When user clicks Confirm Payment button on an invoice.                                      |
| **Pre-condition**  | User must be authenticated with "Invoice" permission. Invoice has remaining balance > 0.    |
| **Post-condition** | Payment is confirmed and penalty is calculated if applicable.                               |

###### _Activities Flow_

(Refer to "Activity Confirm Payment & Calculate Penalty" diagram in "Activity for wedding management system/manage-invoices" folder)

###### _Business Rules_

| Activity               | BR Code | Description                                                                                                                                                                                                                                                                                                                                                  |
| :--------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3)_        | _BR162_ | **Displaying Rules:** When user clicks "Xác nhận thanh toán" button on invoice, the system displays payment confirmation form with: \[PaymentAmount\], \[PaymentMethod\], \[PaymentDate\], \[ReceivedBy\].<br>System auto-calculates penalty if payment is after event date.                                                                                 |
| _(4), (5), (6), (6.1)_ | _BR163_ | **Penalty Calculation Rules:** IF \[PaymentDate\] > \[EventDate\] AND \[RemainingBalance\] > 0, the system calculates late penalty = \[RemainingBalance\] × \[Parameter.LatePenaltyRate\].<br>System displays penalty amount and updated total. (Refer to MSG 114)<br>IF \[PaymentAmount\] < \[MinimumDue\], displays validation message. (Refer to MSG 109) |
| _(7), (8), (9)_        | _BR164_ | **Processing Rules:** After confirmation, the system records payment with staff info and timestamp, updates invoice balance.<br>IF full payment received (including penalties), updates invoice status to "Paid".<br>System prints receipt and displays success notification. (Refer to MSG 115)                                                             |

##### 2.1.7.3 Export Any Invoice to PDF

###### _Use Case Description_

| Name               | Export Any Invoice to PDF                                                        |
| :----------------- | :------------------------------------------------------------------------------- |
| **Description**    | This use case allows Staff/Admin to export any customer's invoice to PDF format. |
| **Actor**          | Staff, Administrator                                                             |
| **Trigger**        | When user clicks Export PDF button on an invoice.                                |
| **Pre-condition**  | User must be authenticated with "Invoice" permission. Invoice exists.            |
| **Post-condition** | Invoice PDF file is generated and saved.                                         |

###### _Activities Flow_

(Refer to "Activity Export Any Invoice to PDF" diagram in "Activity for wedding management system/manage-invoices" folder)

###### _Business Rules_

| Activity        | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :-------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3)_ | _BR165_ | **Displaying Rules:** When user clicks "Xuất PDF" button on invoice, the system prepares full invoice data including: company letterhead, invoice number, customer details, booking details, itemized costs, payment history, penalties, and balance.                                                                                                                                                                              |
| _(4), (5), (6)_ | _BR166_ | **Processing Rules:** System generates PDF using iText library with official invoice template.<br>PDF includes: header with logo, invoice metadata, customer and event info, detailed cost breakdown, payment records, terms & conditions, authorized signature line.<br>Opens SaveFileDialog with default filename "HoaDon\_\[InvoiceId\]\_\[yyyyMMdd\].pdf".<br>Saves file and displays success notification. (Refer to MSG 112) |

#### 2.1.8 Reports & Statistics

##### 2.1.8.1 View Revenue Chart

###### _Use Case Description_

| Name               | View Revenue Chart                                                                        |
| :----------------- | :---------------------------------------------------------------------------------------- |
| **Description**    | This use case allows Admin to view revenue statistics and charts by various time periods. |
| **Actor**          | Administrator                                                                             |
| **Trigger**        | When admin navigates to Reports screen.                                                   |
| **Pre-condition**  | User must be authenticated as Administrator with "Report" permission.                     |
| **Post-condition** | Revenue charts and statistics are displayed.                                              |

###### _Activities Flow_

(Refer to "Activity View Revenue Chart" diagram in "Activity for wedding management system/reports" folder)

###### _Business Rules_

| Activity              | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :-------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3)_       | _BR167_ | **Displaying Rules:** When admin navigates to Reports screen, the system displays report filter controls: \[Month\] dropdown (1-12), \[Year\] dropdown (current year ± 5 years).<br>Default view shows current month/year. Admin selects month and year, then clicks "Xem báo cáo" button.                                                                                                                                                                            |
| _(4), (5), (6)_       | _BR168_ | **Processing Rules:** The system queries revenue data from `RevenueReportDetail` by syntax "SELECT Day, Month, Year, WeddingCount, Revenue, Ratio FROM RevenueReportDetail WHERE Month = \[SelectedMonth\] AND Year = \[SelectedYear\] AND WeddingCount > 0 AND Revenue > 0".<br>System calculates Ratio = (DayRevenue / TotalMonthRevenue) × 100 for each day.<br>System displays data in table format with columns: STT, Ngày, Số lượng tiệc, Doanh thu, Tỷ lệ (%). |
| _(7), (8), (9), (10)_ | _BR169_ | **Chart Display Rules:** Admin can click "Xem biểu đồ" to open ChartView dialog showing bar/line chart of daily revenue using LiveCharts library.<br>System displays summary: Tổng doanh thu tháng, Tổng số tiệc.<br>Admin can export to Excel (UC 2.1.8.2) or PDF from this screen.                                                                                                                                                                                  |

##### 2.1.8.2 Export Report to Excel

###### _Use Case Description_

| Name               | Export Report to Excel                                                 |
| :----------------- | :--------------------------------------------------------------------- |
| **Description**    | This use case allows Admin to export revenue reports to Excel format.  |
| **Actor**          | Administrator                                                          |
| **Trigger**        | When admin clicks Export to Excel button on report screen.             |
| **Pre-condition**  | User must be authenticated as Administrator. Report data is generated. |
| **Post-condition** | Report Excel file is generated and saved.                              |

###### _Activities Flow_

(Refer to "Activity Export Report to Excel" diagram in "Activity for wedding management system/reports" folder)

###### _Business Rules_

| Activity             | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (3)_      | _BR170_ | **Validation Rules:** When admin clicks "Xuất Excel" button from Report screen, the system checks if \[ReportList\] has data.<br>IF \[ReportList\] = NULL OR \[ReportList\].Count = 0, displays validation message. (Refer to MSG 19)                                                                                                                                                                                                                                                                                                                                                            |
| _(4), (5), (6), (7)_ | _BR171_ | **Processing Rules:** IF data exists, the system creates new XLWorkbook using ClosedXML library, adds worksheet "Báo Cáo Doanh Thu".<br>Adds header row with columns: "STT", "Ngày", "Số lượng tiệc", "Doanh thu", "Tỉ lệ".<br>Iterates through \[ReportList\] and populates rows with: RowNumber, Day/Month/Year, WeddingCount, Revenue (format "#,##0 VNĐ"), Ratio (format "0.00%").<br>Applies formatting: header bold, light gray background, borders.<br>Opens SaveFileDialog with filename "BaoCaoDoanhThu\_\[yyyyMMddHHmmss\].xlsx".<br>Saves workbook and opens file. (Refer to MSG 116) |

## 3\. Non-functional Requirements

### 3.1 User Access and Security

The system is designed based on a user group permission model, ensuring that each user can only access and operate on functions appropriate to their assigned role. The permission data structure includes four main tables: `Permission`, `UserGroup`, `AppUser`, and role-based access control.

**Current Implementation (Desktop Application):**

| Function / Data               | Staff | Administrator |
| :---------------------------- | :---: | :-----------: |
| **Manage "Hall"**             |       |               |
| Create, Update, Delete        |       |       X       |
| Read                          |   X   |       X       |
| **Manage "Hall Type"**        |       |               |
| Create, Update, Delete        |       |       X       |
| Read                          |   X   |       X       |
| **Manage "Dish"**             |       |               |
| Create, Update, Delete        |       |       X       |
| Read                          |   X   |       X       |
| **Manage "Service"**          |       |               |
| Create, Update, Delete        |       |       X       |
| Read                          |   X   |       X       |
| **Manage "Shift"**            |       |               |
| Create, Update, Delete        |       |       X       |
| Read                          |   X   |       X       |
| **Manage "Booking"**          |       |               |
| Create, Update, Delete        |   X   |       X       |
| Read                          |   X   |       X       |
| **Manage "Invoice"**          |       |               |
| Create, Update                |   X   |       X       |
| Read                          |   X   |       X       |
| **Manage "User"**             |       |               |
| Create, Update, Delete        |       |       X       |
| Read                          |       |       X       |
| **Manage "Permission Group"** |       |               |
| Create, Update, Delete        |       |       X       |
| Read                          |       |       X       |
| **Manage "Parameter"**        |       |               |
| Update                        |       |       X       |
| Read                          |   X   |       X       |
| **Manage "Report"**           |       |               |
| Read, Export                  |       |       X       |

**Planned Implementation (Customer Web Portal - Future Phase):**

| Function / Data                           | Customer | Staff | Administrator |
| :---------------------------------------- | :------: | :---: | :-----------: |
| **Account Management**                    |          |       |               |
| Register Account                          |    X     |       |               |
| Login/Logout                              |    X     |   X   |       X       |
| Manage Own Profile                        |  X(\*)   |   X   |       X       |
| Change Password                           |  X(\*)   |   X   |       X       |
| Forgot Password                           |    X     |   X   |       X       |
| **Hall Browsing**                         |          |       |               |
| View Available Halls                      |    X     |   X   |       X       |
| Check Hall Availability                   |    X     |   X   |       X       |
| **Booking Operations**                    |          |       |               |
| Submit Wedding Reservation                |    X     |       |               |
| View Own Bookings                         |  X(\*)   |       |               |
| Edit Own Pending Booking                  |  X(\*)   |       |               |
| Cancel Own Booking                        |  X(\*)   |       |               |
| View/Manage All Bookings                  |          |   X   |       X       |
| Create Booking for Customer               |          |   X   |       X       |
| Delete Any Booking                        |          |   X   |       X       |
| **Invoice & Payment**                     |          |       |               |
| View Own Invoice                          |  X(\*)   |       |               |
| Pay Own Invoice (Online)                  |  X(\*)   |       |               |
| Export Own Invoice to PDF                 |  X(\*)   |       |               |
| View/Manage All Invoices                  |          |   X   |       X       |
| Confirm Payment                           |          |   X   |       X       |
| **Master Data Management**                |          |       |               |
| Manage Halls/Types/Dishes/Services/Shifts |          |       |       X       |
| **System Administration**                 |          |       |               |
| Manage Users                              |          |       |       X       |
| Manage Permission Groups                  |          |       |       X       |
| Manage System Parameters                  |          |       |       X       |
| **Reports & Statistics**                  |          |       |               |
| View Revenue Reports                      |          |       |       X       |
| Export Reports                            |          |       |       X       |

**Legend:**

- **X**: User has full permission to do the action.
- **X(\*)**: User has permission to do the action on their own data only.

**Security Features:**

- **Password Encryption:** User passwords are encrypted using MD5 hash before storing in the database to prevent information leakage in case of data access incidents.
- **Role-Based Access Control:** Permission assignment can only be performed by users with the highest authority (system administrator), preventing misuse or uncontrolled permission changes.
- **Session Management:** User sessions are managed through the application lifecycle, with automatic logout on application close.
- **Customer Data Isolation (Planned):** Customer users can only access and modify their own booking and payment data.

### 3.2 Performance Requirements

**Number of Users:**

- Number of concurrent users: 10-20 (Desktop), 100-500 (Web Portal - Planned)
- Number of business users: 50-100

**Data Volume:**

- Number of documents: ~10,000 bookings/year
- Data growth rate: ~1,000 records/month

**Processing Speed:**

| Operation                | Expected Time | Storage Size     |
| :----------------------- | :------------ | :--------------- |
| Add/Update Hall          | < 1 second    | ~1-2 KB/hall     |
| Create Booking           | < 1 second    | ~3-5 KB/booking  |
| Search Booking           | Instant       | No additional    |
| Generate Invoice         | < 1 second    | ~1-2 KB/invoice  |
| Generate Monthly Report  | < 5 seconds   | ~10-50 KB/report |
| Update System Parameters | Instant       | ~0.5-1 KB/change |

**Level of Availability:**

- 8x5 (Business hours, Monday to Friday)
- System should be available during peak booking hours (9 AM - 6 PM)

**Usage Frequency:**

- Booking operations: Daily
- Report generation: Monthly
- Parameter changes: Ad hoc

### 3.3 Implementation Requirements

**Location:**

- Desktop application deployed on local workstations
- Database server: Local SQL Server or network SQL Server

**Hardware Requirements:**

| Component | Minimum Requirement               |
| :-------- | :-------------------------------- |
| Processor | Intel Core i3 or equivalent       |
| RAM       | 4 GB                              |
| Display   | 1366x768 resolution               |
| Storage   | 500 MB free space for application |
| Network   | LAN connection to database server |

**Software Requirements:**

| Component        | Requirement                           |
| :--------------- | :------------------------------------ |
| Operating System | Windows 10 or later                   |
| .NET Framework   | .NET 6.0 or later                     |
| Database         | SQL Server 2019 or later              |
| Runtime          | Windows Presentation Foundation (WPF) |

**Read-only Duration:**

- 1 day preferred for maintenance windows

**Maintenance Window:**

- Weekly (Sunday night for updates if needed)

## 4\. Other Requirements

### 4.1 Archive Function

The system supports archival function for the following data:

| List/Table    | Actor         | Condition                                                                         |
| :------------ | :------------ | :-------------------------------------------------------------------------------- |
| Booking       | Administrator | Administrator can archive bookings older than 2 years based on wedding date.      |
| RevenueReport | Administrator | Administrator can archive reports older than 5 years based on report month/year.  |
| Invoice       | Administrator | Administrator can archive paid invoices older than 2 years based on payment date. |

**Archive Process:**

1. Administrator selects the data range to archive
2. System validates that data is eligible for archival (no pending operations)
3. System exports data to archive storage (Excel/Backup database)
4. System removes data from active database after successful archive
5. System logs archive operation for audit trail

### 4.2 Security Audit Function

The system enables Security Audit Function for Administrator to track any modification on user's permission and critical data changes.

**Audit Trail Captures:**

| Event Type           | Data Logged                                             |
| :------------------- | :------------------------------------------------------ |
| User Login/Logout    | Username, Timestamp, IP Address                         |
| Permission Changes   | User modified, Old permission, New permission, Modifier |
| Booking Creation     | Booking ID, Creator, Timestamp                          |
| Booking Modification | Booking ID, Changes made, Modifier, Timestamp           |
| Invoice Payment      | Invoice ID, Amount, Payment date, Recorder              |
| Parameter Changes    | Parameter name, Old value, New value, Modifier          |

### 4.3 System Design

#### 4.3.1 Architecture Layers

The system follows a 3-layer architecture with MVVM pattern:

**Presentation Layer (View):**

- XAML files defining user interface
- MaterialDesign components for modern UI
- Data binding to ViewModels

**Business Logic Layer (ViewModel + Service):**

- ViewModels handling UI logic and commands
- Services implementing business rules
- DTOs for data transfer between layers

**Data Access Layer (Repository):**

- Entity Framework for database operations
- Repository pattern for data access abstraction
- Model classes mapping to database tables

#### 4.3.2 Database Tables

| No. | Table Name          | Description                                          |
| :-- | :------------------ | :--------------------------------------------------- |
| 1   | HallType            | Stores hall type information and minimum table price |
| 2   | Hall                | Stores hall information for wedding venues           |
| 3   | Shift               | Manages wedding shifts (start time, end time)        |
| 4   | Booking             | Stores wedding booking information                   |
| 5   | Dish                | Catalog of available dishes                          |
| 6   | Menu                | Menu items for each booking                          |
| 7   | Service             | Catalog of available services                        |
| 8   | ServiceDetail       | Service details for each booking                     |
| 9   | RevenueReport       | Monthly revenue report headers                       |
| 10  | RevenueReportDetail | Daily revenue details within monthly reports         |
| 11  | Parameter           | System parameters (penalty rate, deposit rate, etc.) |
| 12  | Permission          | List of system functions/screens                     |
| 13  | UserGroup           | User group definitions                               |
| 14  | AppUser             | System user accounts                                 |

#### 4.3.3 Technical Stack

| Component            | Technology                            |
| :------------------- | :------------------------------------ |
| Frontend Framework   | Windows Presentation Foundation (WPF) |
| Programming Language | C# (.NET 6.0+)                        |
| Database             | Microsoft SQL Server 2019             |
| ORM                  | Entity Framework 6                    |
| UI Library           | MaterialDesignInXamlToolkit           |
| Excel Export         | ClosedXML                             |
| PDF Export           | iText 9                               |
| Charts               | LiveCharts                            |
| Architecture Pattern | MVVM (Model-View-ViewModel)           |

## 5\. Appendixes

### 5.1 Glossary

The list below contains all the necessary terms to interpret the document, including acronyms and abbreviations.

| Term | Definition                                                              |
| :--- | :---------------------------------------------------------------------- |
| WMS  | Wedding Management System                                               |
| DTO  | Data Transfer Object - Objects used to transfer data between layers     |
| MD5  | Message-Digest Algorithm 5 - Hash function used for password encryption |
| WPF  | Windows Presentation Foundation - Microsoft UI framework                |
| CRUD | Create, Read, Update, Delete - Basic data operations                    |
| MVVM | Model-View-ViewModel - Architectural pattern for WPF applications       |
| EF   | Entity Framework - Object-relational mapping framework                  |
| BR   | Business Rule                                                           |
| MSG  | Message - System notification or error message                          |
| UC   | Use Case                                                                |
| N/A  | Not Available or Not Applicable                                         |
| UI   | User Interface                                                          |
| SRS  | Software Requirements Specification                                     |
| TBD  | To Be Determined or To Be Defined                                       |
| DAL  | Data Access Layer                                                       |
| BLL  | Business Logic Layer                                                    |
| PK   | Primary Key                                                             |
| FK   | Foreign Key                                                             |
| PDF  | Portable Document Format                                                |
| XAML | Extensible Application Markup Language                                  |

### 5.2 Messages

| Code    | Content                                                | Button |
| :------ | :----------------------------------------------------- | :----- |
| MSG 1   | Please enter username and password!                    | OK     |
| MSG 2   | Incorrect username or password!                        | OK     |
| MSG 3   | Login successful!                                      | OK     |
| MSG 4   | Please enter valid email format!                       | OK     |
| MSG 5   | Username or Email already exists!                      | OK     |
| MSG 6   | Profile updated successfully!                          | OK     |
| MSG 7   | Password confirmation does not match!                  | OK     |
| MSG 8   | Incorrect current password!                            | OK     |
| MSG 9   | Password changed successfully!                         | OK     |
| MSG 10  | Please enter all required fields!                      | OK     |
| MSG 11  | Please enter username!                                 | OK     |
| MSG 12  | Please enter password!                                 | OK     |
| MSG 13  | Please enter full name!                                | OK     |
| MSG 14  | Please select user type!                               | OK     |
| MSG 15  | User added successfully!                               | OK     |
| MSG 16  | No changes to update!                                  | OK     |
| MSG 17  | User updated successfully!                             | OK     |
| MSG 18  | User deleted successfully!                             | OK     |
| MSG 19  | No data to export!                                     | OK     |
| MSG 20  | Please enter group code and group name!                | OK     |
| MSG 21  | Cannot use 'Administrator' or 'admin' in group name!   | OK     |
| MSG 22  | Group code or group name already exists!               | OK     |
| MSG 23  | Permission group added successfully!                   | OK     |
| MSG 24  | Permission group updated successfully!                 | OK     |
| MSG 25  | Cannot delete group that is being referenced by users! | OK     |
| MSG 26  | Permission group deleted successfully!                 | OK     |
| MSG 27  | Parameters updated successfully!                       | OK     |
| MSG 28  | Failed to update parameters. Please try again!         | OK     |
| MSG 29  | Please enter value between 0 and 1!                    | OK     |
| MSG 30  | Please enter valid number format!                      | OK     |
| MSG 31  | Please enter hall name!                                | OK     |
| MSG 32  | Please select hall type!                               | OK     |
| MSG 33  | Max table count must be greater than 0!                | OK     |
| MSG 34  | Hall name already exists in this hall type!            | OK     |
| MSG 35  | Hall added successfully!                               | OK     |
| MSG 36  | Hall updated successfully!                             | OK     |
| MSG 37  | Cannot reduce max table count below booked quantity!   | OK     |
| MSG 38  | Cannot delete hall that has bookings!                  | OK     |
| MSG 39  | Are you sure you want to delete this hall?             | Yes/No |
| MSG 40  | Hall deleted successfully!                             | OK     |
| MSG 41  | Hall list exported successfully!                       | OK     |
| MSG 42  | Please enter hall type name!                           | OK     |
| MSG 43  | Hall type name already exists!                         | OK     |
| MSG 44  | Min table price must be at least 10,000!               | OK     |
| MSG 45  | Hall type added successfully!                          | OK     |
| MSG 46  | Hall type updated successfully!                        | OK     |
| MSG 47  | Cannot delete hall type that has halls!                | OK     |
| MSG 48  | Are you sure you want to delete this hall type?        | Yes/No |
| MSG 49  | Hall type deleted successfully!                        | OK     |
| MSG 50  | Hall type list exported successfully!                  | OK     |
| MSG 51  | Maximum 100 dishes allowed!                            | OK     |
| MSG 52  | Please enter dish name!                                | OK     |
| MSG 53  | Unit price must be a positive number!                  | OK     |
| MSG 54  | Note cannot exceed 100 characters!                     | OK     |
| MSG 55  | Dish name already exists!                              | OK     |
| MSG 56  | Dish added successfully!                               | OK     |
| MSG 57  | Dish updated successfully!                             | OK     |
| MSG 58  | Cannot delete dish that is used in bookings!           | OK     |
| MSG 59  | Are you sure you want to delete this dish?             | Yes/No |
| MSG 60  | Dish deleted successfully!                             | OK     |
| MSG 61  | Dish list exported successfully!                       | OK     |
| MSG 62  | Please enter service name!                             | OK     |
| MSG 63  | Please enter unit price!                               | OK     |
| MSG 64  | Unit price must be a valid non-negative number!        | OK     |
| MSG 65  | Service name already exists!                           | OK     |
| MSG 66  | Service added successfully!                            | OK     |
| MSG 67  | Service updated successfully!                          | OK     |
| MSG 68  | Cannot delete service that is used in bookings!        | OK     |
| MSG 69  | Are you sure you want to delete this service?          | Yes/No |
| MSG 70  | Service deleted successfully!                          | OK     |
| MSG 71  | Service list exported successfully!                    | OK     |
| MSG 72  | Please enter shift name!                               | OK     |
| MSG 73  | Please enter start time!                               | OK     |
| MSG 74  | Please enter end time!                                 | OK     |
| MSG 75  | Start time must be between 07:30 and 24:00!            | OK     |
| MSG 76  | End time must be between 07:30 and 24:00!              | OK     |
| MSG 77  | End time must be greater than start time!              | OK     |
| MSG 78  | Shift name already exists!                             | OK     |
| MSG 79  | Shift added successfully!                              | OK     |
| MSG 80  | Shift updated successfully!                            | OK     |
| MSG 81  | Cannot delete shift that has bookings!                 | OK     |
| MSG 82  | Are you sure you want to delete this shift?            | Yes/No |
| MSG 83  | Shift deleted successfully!                            | OK     |
| MSG 84  | Account registered successfully! Please login.         | OK     |
| MSG 85  | Email already registered!                              | OK     |
| MSG 86  | Phone number already registered!                       | OK     |
| MSG 87  | Please enter a valid phone number!                     | OK     |
| MSG 88  | Wedding date must be at least 3 days in advance!       | OK     |
| MSG 89  | Please select a shift!                                 | OK     |
| MSG 90  | No halls available for selected date/shift/capacity!   | OK     |
| MSG 91  | Table count must be between 1 and hall max capacity!   | OK     |
| MSG 92  | Please select at least one dish for menu!              | OK     |
| MSG 93  | Booking submitted successfully! Awaiting confirmation. | OK     |
| MSG 94  | Only pending bookings can be edited!                   | OK     |
| MSG 95  | Booking updated successfully!                          | OK     |
| MSG 96  | Are you sure you want to cancel this booking?          | Yes/No |
| MSG 97  | Cancellation may incur penalty fee!                    | OK     |
| MSG 98  | Booking cancelled successfully!                        | OK     |
| MSG 99  | Email not found in system!                             | OK     |
| MSG 100 | Password reset link sent to your email!                | OK     |
| MSG 101 | Shift list exported successfully!                      | OK     |
| MSG 102 | Hall not available for selected date/shift!            | OK     |
| MSG 103 | Booking created successfully!                          | OK     |
| MSG 104 | Completed bookings cannot be deleted!                  | OK     |
| MSG 105 | Booking deleted successfully!                          | OK     |
| MSG 106 | No bookings found matching criteria!                   | OK     |
| MSG 107 | Completed bookings cannot be edited!                   | OK     |
| MSG 108 | Booking details updated successfully!                  | OK     |
| MSG 109 | Payment amount must meet minimum deposit requirement!  | OK     |
| MSG 110 | Payment amount cannot exceed remaining balance!        | OK     |
| MSG 111 | Payment recorded successfully!                         | OK     |
| MSG 112 | Invoice exported to PDF successfully!                  | OK     |
| MSG 113 | Error occurred. Please contact support.                | OK     |
| MSG 114 | Late payment penalty applied!                          | OK     |
| MSG 115 | Payment confirmed successfully!                        | OK     |
| MSG 116 | Report exported to Excel successfully!                 | OK     |

### 5.3 Issues List

| No. | Issue                                             | Priority | Status  | Notes                        |
| :-- | :------------------------------------------------ | :------- | :------ | :--------------------------- |
| 1   | Customer web portal not implemented               | Medium   | Planned | Future phase development     |
| 2   | Forgot Password feature pending email integration | Low      | Pending | Requires SMTP configuration  |
| 3   | Multi-language support not available              | Low      | Backlog | Vietnamese only currently    |
| 4   | Mobile responsive design not applicable           | N/A      | N/A     | Desktop WPF application      |
| 5   | Backup automation not implemented                 | Medium   | Planned | Manual backup via SQL Server |

---

## 6\. List Description

_(Refer to attached "List Description" document for complete field specifications)_

### 6.1 Hall List (Danh sách Sảnh)

| Field Name    | Data Type     | Constraints               | Description                |
| :------------ | :------------ | :------------------------ | :------------------------- |
| HallId        | INT           | PK, Auto Increment        | Unique identifier for hall |
| HallName      | NVARCHAR(100) | NOT NULL, Unique per type | Name of the hall           |
| HallTypeId    | INT           | FK → HallType             | Reference to hall type     |
| MaxTableCount | INT           | NOT NULL, > 0             | Maximum number of tables   |
| MinTablePrice | DECIMAL(18,0) | FROM HallType             | Minimum price per table    |
| Note          | NVARCHAR(255) | NULLABLE                  | Additional notes           |
| Image         | NVARCHAR(500) | NULLABLE                  | Path to hall image         |

**Business Rules:**

- Hall name must be unique within the same hall type
- MaxTableCount must be greater than 0
- MinTablePrice is inherited from HallType.MinTablePrice

### 6.2 Hall Type List (Danh sách Loại Sảnh)

| Field Name    | Data Type     | Constraints        | Description                     |
| :------------ | :------------ | :----------------- | :------------------------------ |
| HallTypeId    | INT           | PK, Auto Increment | Unique identifier for hall type |
| HallTypeName  | NVARCHAR(100) | NOT NULL, Unique   | Name of the hall type           |
| MinTablePrice | DECIMAL(18,0) | NOT NULL, >= 10000 | Minimum price per table         |

**Business Rules:**

- Hall type name must be unique
- Minimum table price must be at least 10,000 VNĐ

### 6.3 Shift List (Danh sách Ca)

| Field Name | Data Type    | Constraints        | Description                 |
| :--------- | :----------- | :----------------- | :-------------------------- |
| ShiftId    | INT          | PK, Auto Increment | Unique identifier for shift |
| ShiftName  | NVARCHAR(50) | NOT NULL, Unique   | Name of the shift           |
| StartTime  | TIME         | NOT NULL           | Start time of shift         |
| EndTime    | TIME         | NOT NULL           | End time of shift           |

**Business Rules:**

- Shift name must be unique
- StartTime must be between 07:30 and 24:00
- EndTime must be greater than StartTime

### 6.4 Dish List (Danh sách Món Ăn)

| Field Name | Data Type     | Constraints        | Description                |
| :--------- | :------------ | :----------------- | :------------------------- |
| DishId     | INT           | PK, Auto Increment | Unique identifier for dish |
| DishName   | NVARCHAR(100) | NOT NULL, Unique   | Name of the dish           |
| UnitPrice  | DECIMAL(18,0) | NOT NULL, > 0      | Price per dish             |
| Note       | NVARCHAR(100) | NULLABLE           | Additional notes           |

**Business Rules:**

- Maximum 100 dishes allowed in system
- Dish name must be unique
- Unit price must be a positive number

### 6.5 Service List (Danh sách Dịch Vụ)

| Field Name  | Data Type     | Constraints        | Description                   |
| :---------- | :------------ | :----------------- | :---------------------------- |
| ServiceId   | INT           | PK, Auto Increment | Unique identifier for service |
| ServiceName | NVARCHAR(100) | NOT NULL, Unique   | Name of the service           |
| UnitPrice   | DECIMAL(18,0) | NOT NULL, >= 0     | Price per service unit        |
| Note        | NVARCHAR(100) | NULLABLE           | Additional notes              |

**Business Rules:**

- Service name must be unique
- Unit price must be non-negative

### 6.6 Booking List (Danh sách Phiếu Đặt Tiệc)

| Field Name         | Data Type     | Constraints        | Description                     |
| :----------------- | :------------ | :----------------- | :------------------------------ |
| BookingId          | INT           | PK, Auto Increment | Unique identifier for booking   |
| GroomName          | NVARCHAR(100) | NOT NULL           | Groom's full name               |
| BrideName          | NVARCHAR(100) | NOT NULL           | Bride's full name               |
| Phone              | VARCHAR(15)   | NOT NULL           | Contact phone number            |
| BookingDate        | DATE          | NOT NULL           | Date when booking was made      |
| WeddingDate        | DATE          | NOT NULL           | Wedding event date              |
| ShiftId            | INT           | FK → Shift         | Reference to shift              |
| HallId             | INT           | FK → Hall          | Reference to hall               |
| TableCount         | INT           | NOT NULL, > 0      | Number of tables booked         |
| ReserveTableCount  | INT           | NOT NULL, >= 0     | Number of reserve tables        |
| Deposit            | DECIMAL(18,0) | NOT NULL           | Deposit amount paid             |
| TableUnitPrice     | DECIMAL(18,0) | NOT NULL           | Price per table at booking time |
| TotalTableAmount   | DECIMAL(18,0) | Calculated         | TableCount × TableUnitPrice     |
| TotalServiceAmount | DECIMAL(18,0) | Calculated         | Sum of all services             |
| AdditionalFee      | DECIMAL(18,0) | DEFAULT 0          | Additional/damage fees          |
| PenaltyFee         | DECIMAL(18,0) | DEFAULT 0          | Late payment penalty            |
| TotalAmount        | DECIMAL(18,0) | Calculated         | Grand total                     |
| RemainingAmount    | DECIMAL(18,0) | Calculated         | TotalAmount - Deposit           |
| PaymentDate        | DATE          | NULLABLE           | Date of final payment           |
| IsPaid             | BIT           | DEFAULT 0          | Payment status                  |

**Business Rules:**

- Wedding date must be at least 3 days in advance
- TableCount >= MinTableRatio × Hall.MaxTableCount
- Deposit >= DepositRate × Estimated Total
- One hall can only have one booking per shift per day
- ReserveTableCount <= Hall.MaxTableCount - TableCount

### 6.7 Menu List (Danh sách Thực Đơn)

| Field Name | Data Type     | Constraints      | Description           |
| :--------- | :------------ | :--------------- | :-------------------- |
| BookingId  | INT           | PK, FK → Booking | Reference to booking  |
| DishId     | INT           | PK, FK → Dish    | Reference to dish     |
| Quantity   | INT           | NOT NULL, > 0    | Quantity per table    |
| UnitPrice  | DECIMAL(18,0) | NOT NULL         | Price at booking time |
| Note       | NVARCHAR(100) | NULLABLE         | Additional notes      |

**Business Rules:**

- At least one dish must be selected per booking
- UnitPrice is captured at booking time (historical)

### 6.8 Service Detail List (Danh sách Chi Tiết Dịch Vụ)

| Field Name | Data Type     | Constraints      | Description             |
| :--------- | :------------ | :--------------- | :---------------------- |
| BookingId  | INT           | PK, FK → Booking | Reference to booking    |
| ServiceId  | INT           | PK, FK → Service | Reference to service    |
| Quantity   | INT           | NOT NULL, > 0    | Number of service units |
| UnitPrice  | DECIMAL(18,0) | NOT NULL         | Price at booking time   |
| Amount     | DECIMAL(18,0) | Calculated       | Quantity × UnitPrice    |
| Note       | NVARCHAR(100) | NULLABLE         | Additional notes        |

### 6.9 User List (Danh sách Người Dùng)

| Field Name   | Data Type     | Constraints        | Description                   |
| :----------- | :------------ | :----------------- | :---------------------------- |
| UserId       | INT           | PK, Auto Increment | Unique identifier for user    |
| Username     | VARCHAR(50)   | NOT NULL, Unique   | Login username                |
| PasswordHash | VARCHAR(256)  | NOT NULL           | MD5 hashed password           |
| FullName     | NVARCHAR(100) | NOT NULL           | User's full name              |
| Email        | VARCHAR(100)  | NULLABLE, Unique   | User's email address          |
| UserGroupId  | INT           | FK → UserGroup     | Reference to permission group |

### 6.10 User Group List (Danh sách Nhóm Người Dùng)

| Field Name  | Data Type     | Constraints        | Description                 |
| :---------- | :------------ | :----------------- | :-------------------------- |
| UserGroupId | INT           | PK, Auto Increment | Unique identifier for group |
| GroupCode   | VARCHAR(20)   | NOT NULL, Unique   | Short code for the group    |
| GroupName   | NVARCHAR(100) | NOT NULL, Unique   | Full name of the group      |

**Business Rules:**

- Cannot use 'Administrator' or 'admin' in group name (reserved)
- Cannot delete group that has users assigned

### 6.11 Parameter List (Danh sách Tham Số)

| Field Name    | Data Type    | Constraints | Description                                |
| :------------ | :----------- | :---------- | :----------------------------------------- |
| ParameterId   | INT          | PK          | Unique identifier                          |
| PenaltyRate   | DECIMAL(5,2) | 0-1         | Late payment penalty rate (1%/day default) |
| DepositRate   | DECIMAL(5,2) | 0-1         | Minimum deposit rate (20% default)         |
| MinTableRatio | DECIMAL(5,2) | 0-1         | Min tables vs hall capacity (80% default)  |
| EnablePenalty | BIT          | DEFAULT 1   | Enable/disable penalty calculation         |

### 6.12 Revenue Report List (Danh sách Báo Cáo Doanh Số)

| Field Name   | Data Type     | Constraints | Description           |
| :----------- | :------------ | :---------- | :-------------------- |
| Month        | INT           | PK          | Report month (1-12)   |
| Year         | INT           | PK          | Report year           |
| TotalRevenue | DECIMAL(18,0) | Calculated  | Total monthly revenue |

### 6.13 Revenue Report Detail List (Chi Tiết Báo Cáo Doanh Số)

| Field Name   | Data Type     | Constraints            | Description               |
| :----------- | :------------ | :--------------------- | :------------------------ |
| Day          | INT           | PK                     | Day of month (1-31)       |
| Month        | INT           | PK, FK → RevenueReport | Report month              |
| Year         | INT           | PK, FK → RevenueReport | Report year               |
| WeddingCount | INT           | NOT NULL               | Number of weddings on day |
| Revenue      | DECIMAL(18,0) | NOT NULL               | Daily revenue             |
| Ratio        | DECIMAL(5,2)  | Calculated             | % of monthly total        |

---

## 7\. View Description

_(Refer to attached "View Description" document for complete UI specifications)_

### 7.1 Screen List

| No. | Screen Name                  | Screen Type         | Function                                    |
| :-- | :--------------------------- | :------------------ | :------------------------------------------ |
| 1   | Login Screen                 | Input Screen        | User authentication                         |
| 2   | Home Screen                  | Main Screen         | Dashboard with quick actions and statistics |
| 3   | Hall Management Screen       | CRUD Screen         | Add, edit, delete, search halls             |
| 4   | Hall Type Management Screen  | CRUD Screen         | Add, edit, delete hall types                |
| 5   | Dish Management Screen       | CRUD Screen         | Add, edit, delete dishes                    |
| 6   | Service Management Screen    | CRUD Screen         | Add, edit, delete services                  |
| 7   | Shift Management Screen      | CRUD Screen         | Add, edit, delete shifts                    |
| 8   | Booking List Screen          | Search/List Screen  | View, search, filter all bookings           |
| 9   | Add Booking Screen           | Input Screen        | Create new wedding booking                  |
| 10  | Booking Detail Screen        | Detail/Edit Screen  | View and modify booking details             |
| 11  | Invoice Screen               | Input/Report Screen | View invoice, confirm payment, export PDF   |
| 12  | Report Screen                | Report Screen       | View revenue charts, export to Excel        |
| 13  | User Management Screen       | CRUD Screen         | Add, edit, delete users                     |
| 14  | Permission Management Screen | CRUD Screen         | Add, edit, delete permission groups         |
| 15  | Parameter Screen             | Settings Screen     | Update system parameters                    |
| 16  | Account Screen               | Input Screen        | Update profile, change password             |

### 7.2 Screen Details

#### 7.2.1 Login Screen (Màn hình Đăng nhập)

| No. | Control Name | Control Type | Constraints                | Function                 |
| :-- | :----------- | :----------- | :------------------------- | :----------------------- |
| 1   | txtUsername  | TextBox      | Required                   | Enter username           |
| 2   | txtPassword  | PasswordBox  | Required                   | Enter password (masked)  |
| 3   | btnLogin     | Button       | Enabled when fields filled | Submit login credentials |
| 4   | chkRemember  | CheckBox     | Optional                   | Remember login session   |

**Events:**

- btnLogin_Click: Validate credentials, authenticate user, redirect to Home

#### 7.2.2 Home Screen (Màn hình Trang chủ)

| No. | Control Name     | Control Type | Function                              |
| :-- | :--------------- | :----------- | :------------------------------------ |
| 1   | lblWelcome       | TextBlock    | Display welcome message with username |
| 2   | btnQuickBook     | Button       | Navigate to Add Booking screen        |
| 3   | calUpcoming      | Calendar     | Show upcoming weddings this month     |
| 4   | dgRecentBookings | DataGrid     | Display recent bookings list          |
| 5   | chartRevenue     | LiveChart    | Display current month revenue chart   |

#### 7.2.3 Hall Management Screen (Màn hình Quản lý Sảnh)

| No. | Control Name   | Control Type | Constraints                    | Function              |
| :-- | :------------- | :----------- | :----------------------------- | :-------------------- |
| 1   | txtHallName    | TextBox      | Required, Max 100 chars        | Enter hall name       |
| 2   | cboHallType    | ComboBox     | Required, Select from list     | Select hall type      |
| 3   | txtMinPrice    | TextBox      | ReadOnly (from HallType)       | Display minimum price |
| 4   | txtMaxTable    | TextBox      | Required, Numeric, > 0         | Enter max table count |
| 5   | txtNote        | TextBox      | Optional, Max 255 chars        | Enter notes           |
| 6   | btnChooseImage | Button       | Optional                       | Select hall image     |
| 7   | cboSearchBy    | ComboBox     | Select search criteria         | Choose search field   |
| 8   | txtSearch      | TextBox      | Optional                       | Enter search keyword  |
| 9   | cboAction      | ComboBox     | Select: Add/Edit/Delete/Export | Choose action         |
| 10  | dgHallList     | DataGrid     | Sortable, Selectable           | Display halls list    |
| 11  | btnReset       | Button       | Always enabled                 | Clear form fields     |

**Events:**

- cboAction_SelectionChanged: Show/hide action button based on selection
- dgHallList_SelectionChanged: Populate form with selected hall data
- btnAdd/btnEdit/btnDelete/btnExport: Execute corresponding action

#### 7.2.4 Booking List Screen (Màn hình Danh sách Tiệc cưới)

| No. | Control Name  | Control Type | Constraints           | Function                   |
| :-- | :------------ | :----------- | :-------------------- | :------------------------- |
| 1   | dpFromDate    | DatePicker   | Optional              | Filter from date           |
| 2   | dpToDate      | DatePicker   | Optional, >= FromDate | Filter to date             |
| 3   | cboShift      | ComboBox     | Optional              | Filter by shift            |
| 4   | cboHall       | ComboBox     | Optional              | Filter by hall             |
| 5   | txtSearch     | TextBox      | Optional              | Search by groom/bride name |
| 6   | btnSearch     | Button       | Always enabled        | Apply filters              |
| 7   | btnAddNew     | Button       | Always enabled        | Navigate to Add Booking    |
| 8   | dgBookingList | DataGrid     | Sortable, Selectable  | Display filtered bookings  |
| 9   | btnViewDetail | Button       | Enabled when selected | View booking details       |
| 10  | btnDelete     | Button       | Enabled when selected | Delete selected booking    |

#### 7.2.5 Add Booking Screen (Màn hình Thêm Tiệc cưới)

| No. | Control Name      | Control Type | Constraints                        | Function                   |
| :-- | :---------------- | :----------- | :--------------------------------- | :------------------------- |
| 1   | txtGroomName      | TextBox      | Required, Max 100 chars            | Enter groom name           |
| 2   | txtBrideName      | TextBox      | Required, Max 100 chars            | Enter bride name           |
| 3   | txtPhone          | TextBox      | Required, Valid phone format       | Enter phone number         |
| 4   | dpWeddingDate     | DatePicker   | Required, >= Today + 3 days        | Select wedding date        |
| 5   | cboShift          | ComboBox     | Required                           | Select shift               |
| 6   | cboHall           | ComboBox     | Required, Filtered by availability | Select available hall      |
| 7   | txtTableCount     | TextBox      | Required, Numeric, >= MinRatio     | Enter table count          |
| 8   | txtReserveCount   | TextBox      | Numeric, >= 0                      | Enter reserve tables       |
| 9   | dgDishes          | DataGrid     | At least 1 required                | Select dishes for menu     |
| 10  | dgServices        | DataGrid     | Optional                           | Select additional services |
| 11  | txtEstimatedTotal | TextBox      | ReadOnly, Calculated               | Display estimated total    |
| 12  | txtDeposit        | TextBox      | Required, >= DepositRate × Total   | Enter deposit amount       |
| 13  | btnCheckAvail     | Button       | After date/shift selected          | Check hall availability    |
| 14  | btnSave           | Button       | Enabled when all valid             | Save booking               |
| 15  | btnCancel         | Button       | Always enabled                     | Cancel and return          |

#### 7.2.6 Invoice Screen (Màn hình Hóa đơn)

| No. | Control Name      | Control Type | Constraints          | Function                    |
| :-- | :---------------- | :----------- | :------------------- | :-------------------------- |
| 1   | lblBookingInfo    | TextBlock    | ReadOnly             | Display booking info        |
| 2   | dgMenuItems       | DataGrid     | ReadOnly             | Display menu items & prices |
| 3   | dgServiceItems    | DataGrid     | ReadOnly             | Display services & prices   |
| 4   | txtTableTotal     | TextBox      | ReadOnly             | Display table total         |
| 5   | txtServiceTotal   | TextBox      | ReadOnly             | Display service total       |
| 6   | txtAdditionalFee  | TextBox      | Editable, Numeric    | Enter additional fees       |
| 7   | txtPenaltyFee     | TextBox      | ReadOnly, Calculated | Display penalty (if late)   |
| 8   | txtGrandTotal     | TextBox      | ReadOnly, Calculated | Display grand total         |
| 9   | txtDeposit        | TextBox      | ReadOnly             | Display deposit paid        |
| 10  | txtRemaining      | TextBox      | ReadOnly, Calculated | Display remaining balance   |
| 11  | btnConfirmPayment | Button       | Enabled when unpaid  | Confirm payment             |
| 12  | btnExportPDF      | Button       | Always enabled       | Export invoice to PDF       |

#### 7.2.7 Report Screen (Màn hình Báo cáo)

| No. | Control Name     | Control Type | Constraints       | Function                   |
| :-- | :--------------- | :----------- | :---------------- | :------------------------- |
| 1   | cboMonth         | ComboBox     | Required (1-12)   | Select report month        |
| 2   | cboYear          | ComboBox     | Required          | Select report year         |
| 3   | btnViewReport    | Button       | Always enabled    | Generate report            |
| 4   | dgReportData     | DataGrid     | ReadOnly          | Display daily revenue data |
| 5   | chartRevenue     | LiveChart    | Bar/Line chart    | Visualize revenue data     |
| 6   | lblTotalRevenue  | TextBlock    | ReadOnly          | Display monthly total      |
| 7   | lblTotalWeddings | TextBlock    | ReadOnly          | Display wedding count      |
| 8   | btnExportExcel   | Button       | Enabled when data | Export report to Excel     |

### 7.3 Screen Navigation Flow

```
                                    ┌─────────────────┐
                                    │   Login Screen  │
                                    └────────┬────────┘
                                             │
                                             ▼
                                    ┌─────────────────┐
                              ┌─────│   Home Screen   │─────┐
                              │     └────────┬────────┘     │
                              │              │              │
              ┌───────────────┼──────────────┼──────────────┼───────────────┐
              │               │              │              │               │
              ▼               ▼              ▼              ▼               ▼
      ┌───────────────┐ ┌──────────┐ ┌────────────┐ ┌───────────┐ ┌─────────────┐
      │ Master Data   │ │ Bookings │ │  Invoices  │ │  Reports  │ │   System    │
      │ (Halls, Types,│ │ (List,   │ │ (View,     │ │ (Charts,  │ │ (Users,     │
      │  Dishes, etc.)│ │  Add,    │ │  Payment,  │ │  Export)  │ │  Params,    │
      │               │ │  Detail) │ │  Export)   │ │           │ │  Perms)     │
      └───────────────┘ └──────────┘ └────────────┘ └───────────┘ └─────────────┘
```

---

_End of Software Requirements Specification Document_

_Last Updated: November 30, 2025_
_Version: 1.8.0_
