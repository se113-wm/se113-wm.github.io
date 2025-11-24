**SOFTWARE REQUIREMENTS SPECIFICATION**

Wedding Management System

**WMS - Wedding Management System**

## Revision and Signoff Sheet

### Change Record

| Author   | Version | Change reference         | Date       |
| :------- | :------ | :----------------------- | :--------- |
| WMS Team | 0.1.0   | Initial project creation | 24/11/2025 |

### Reviewers

| Name            | Company | Version | Position        | Date       |
| :-------------- | :------ | :------ | :-------------- | :--------- |
| Project Manager | WMS     | 0.1.0   | Project Manager | 24/11/2025 |

# Table of Contents

[**Revision and Signoff Sheet 2**](#revision-and-signoff-sheet)

[Change Record 2](#change-record)

[Reviewers 2](#reviewers)

[**Table of Contents 3**](#table-of-contents)

[**1. Introduction 5**](#1-introduction)

[1.1 Purpose 5](#11-purpose)

[1.2 Scope 5](#12-scope)

[1.3 Intended Audiences and Document Organization 5](#13-intended-audiences-and-document-organization)

[1.4 References 6](#14-references)

[**2. Functional Requirements 6**](#2-functional-requirements)

[2.1 Use Case Description 6](#21-use-case-description)

[2.1.1 Authentication Use Case 6](#211-authentication-use-case)

[2.1.1.1 Login 6](#2111-login)

[Use Case Description 6](#use-case-description)

[Activities Flow 7](#activities-flow)

[Business Rules 7](#business-rules)

[2.1.1.2 Logout 8](#2112-logout)

[Use Case Description 8](#use-case-description-1)

[Activities Flow 8](#activities-flow-1)

[Business Rules 9](#business-rules-1)

[2.2 List Description 10](#22-list-description)

[2.3 View Description 10](#23-view-description)

[**3. Non-functional Requirements 10**](#3-non-functional-requirements)

[3.1 User Access and Security 10](#31-user-access-and-security)

[3.2 Performance Requirements 10](#32-performance-requirements)

[3.3 Implementation Requirements 10](#33-implementation-requirements)

[**4. Other Requirements 10**](#4-other-requirements)

[4.1 Archive Function 10](#41-archive-function)

[4.2 Security Audit Function 10](#42-security-audit-function)

[**5. Appendixes 10**](#5-appendixes)

[5.1 Glossary 10](#51-glossary)

[5.2 Messages 10](#52-messages)

[5.3 Issues List 10](#53-issues-list)

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification document outlines the comprehensive requirements for the "WMS" (Wedding Management System) platform. This document serves as a detailed technical foundation for the development, deployment, and maintenance of the web application. It provides developers with clear guidelines for planning, task assignment, and implementation. Additionally, quality assurance teams will utilize this document to design test cases that align with specified requirements, ensuring the final product meets both quality standards and user expectations for a wedding management system.

### 1.2 Scope

This document encompasses the WMS platform, which is designed to provide a comprehensive wedding management system for booking wedding halls, managing menus and services, handling customer bookings, and processing payments. The system supports multiple user roles including customers, staff, and administrators, each with distinct functionalities for browsing halls, managing bookings, and administering the platform.

### 1.3 Intended Audiences and Document Organization

This document is intended for:

- **Development Team**: Responsible for creating detailed designs, implementing features, and performing unit testing, integration testing, and system testing for the application.
- **Quality Assurance Team**: Responsible for conducting user acceptance testing sessions and validating system requirements.
- **Documentation Team**: Responsible for creating user guides and help documentation for the application.
- **Project Stakeholders**: Business owners and managers who need to understand system capabilities and requirements.

Below are the main sections of this document:

**1. Introduction**: General introduction and overview of this document.  
**2. Functional Requirements**: Detailed description of functional requirements including use cases and business rules.  
**3. Non-functional Requirements**: Description of non-functional requirements such as security, performance, and interface requirements.  
**4. Other Requirements**: Additional requirements including archive functions and other supporting features.  
**5. Appendixes**: Supporting information including glossary, messages, and issues list.

### 1.4 References

| #   | Title             | Version | File Name / Link         | Description                                        |
| :-- | :---------------- | :------ | :----------------------- | :------------------------------------------------- |
| 1   | Use Case Diagrams | 0.1.0   | Use Case Documentation   | Complete use case diagrams for all user roles      |
| 2   | Activity Diagrams | 0.1.0   | Activity Documentation   | Activity flow diagrams for business processes      |
| 3   | Database Schema   | 0.1.0   | Database Design Document | Entity-relationship diagrams and table definitions |

## 2. Functional Requirements

### 2.1 Use Case Description

#### 2.1.1 Authentication Use Case

##### 2.1.1.1 Login

###### _Use Case Description_

| Name               | Login                                                                                                                                                      |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows users (Customer, Staff, Administrator) to authenticate and access the WMS system using their credentials (username and password).     |
| **Actor**          | Customer, Staff, Administrator                                                                                                                             |
| **Trigger**        | User accesses login page and clicks "Login" button after entering credentials.                                                                             |
| **Pre-condition**  | User's device must be connected to the internet. User must have an existing account with status "active" in the system. System is operational.             |
| **Post-condition** | User is successfully authenticated with valid JWT token (access + refresh), user session is created, and user is redirected to role-appropriate home page. |

(Refer to "Activity Login" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity        | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :-------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2)_           | _BR1_   | **Loading Screen Rules:** The system loads "Login" screen with fields: [txtBoxUsername] for username input, [txtBoxPassword] for password input with password masking, [btnLogin] button for form submission, [linkForgotPassword] hyperlink to password recovery, and [linkRegisterAccount] hyperlink to registration. (Refer to "Login" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                      |
| _(5), (5.1)_    | _BR2_   | **Validation Rules:** When user enters credentials and clicks [btnLogin], system validates input using Text_change() method. System checks: If [txtBoxUsername].Text.isEmpty() = true OR [txtBoxPassword].Text.isEmpty() = true: System calls displayErrorMessage("Username and password are required.") (Refer to MSG 1) and returns to step (3). System queries user account from table "User" (Refer to "User" table in "DB Sheet" file) with SQL: "SELECT user_id, username, password_hash, role, status FROM User WHERE username = [txtBoxUsername].Text AND status = 'active'". If COUNT = 0: System calls displayErrorMessage("Invalid username or password.") (Refer to MSG 2) and returns to step (3). |
| _(6), (6.1)_    | _BR3_   | **Validation Rules:** System verifies password by calling bcryptCompare([txtBoxPassword].Text, User.password_hash) method. If bcryptCompare() returns false OR User.status != 'active': System calls displayErrorMessage("Invalid username or password or account is not active.") (Refer to MSG 3) and use case ends at step (6.1).                                                                                                                                                                                                                                                                                                                                                                            |
| _(7), (8), (9)_ | _BR4_   | **Querying Rules:** System queries user permissions and generates JWT access token with payload {user_id, username, role, exp: 24h} and refresh token with exp: 30 days. System executes SQL INSERT: "INSERT INTO Refresh_Token (user_id, token, expires_at) VALUES ([user_id], [refresh_token], [expiry_datetime])". System stores both tokens in browser localStorage by calling localStorage.setItem('accessToken', access_token) and localStorage.setItem('refreshToken', refresh_token). (Refer to "Refresh_Token" table in "DB Sheet" file)                                                                                                                                                               |
| _(10), (11)_    | _BR5_   | **Displaying Rules:** System redirects user to home page using redirectToHomePage(User.role) method. System displays "Home" view corresponding to user role: If User.role = 'Customer' → display "Customer Home" view showing available halls and upcoming bookings; If User.role = 'Staff' → display "Staff Dashboard" view showing today's bookings and pending tasks; If User.role = 'Admin' → display "Admin Dashboard" view showing system statistics and reports. (Refer to "Home" view in "View Description" file). System displays success notification "Welcome, [User.username]!" (Refer to MSG 4).                                                                                                   |

##### 2.1.1.2 Logout

###### _Use Case Description_

| Name               | Logout                                                                                                                                                                                      |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Description**    | This use case allows authenticated users (Customer, Staff, Administrator) to log out from the WMS system, invalidate their session tokens, and return to the login page.                    |
| **Actor**          | Customer, Staff, Administrator                                                                                                                                                              |
| **Trigger**        | User clicks "Logout" button in the navigation menu or profile dropdown.                                                                                                                     |
| **Pre-condition**  | User must be signed in with valid access token and refresh token stored in local storage. System is operational.                                                                            |
| **Post-condition** | User's access token is added to blacklist, refresh token is deleted from database, tokens are cleared from local storage, user session is terminated, and user is redirected to login page. |

(Refer to "Activity Logout" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity        | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :-------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2), (3)_      | _BR6_   | **Displaying Rules:** When user clicks [btnLogout] at step (1), system displays a confirmation dialog with message "Are you sure you want to logout?" showing [btnConfirm] and [btnCancel] buttons via displayConfirmationDialog(). (Refer to "Logout Confirmation Dialog" in "View Description" file). If user clicks [btnCancel]: System closes dialog and returns to previous screen without logging out. If user clicks [btnConfirm]: System proceeds to step (4) to perform logout process. |
| _(4)_           | _BR7_   | **Querying Rules:** System retrieves access token from localStorage.getItem('accessToken'). System executes SQL INSERT to add token to blacklist table: "INSERT INTO Token_Blacklist (token, blacklisted_at, expires_at) VALUES ([access_token], NOW(), [token_expiry_time])" by calling addTokenToBlacklist(). This prevents the access token from being used for future authenticated requests. (Refer to "Token_Blacklist" table in "DB Sheet" file)                                          |
| _(5)_           | _BR8_   | **Querying Rules:** System retrieves refresh token from localStorage.getItem('refreshToken'). System executes SQL DELETE to remove refresh token from database: "DELETE FROM Refresh_Token WHERE token = [refresh_token] AND user_id = [current_user_id]" by calling deleteRefreshToken(). This invalidates the refresh token and prevents token refresh operations. (Refer to "Refresh_Token" table in "DB Sheet" file)                                                                         |
| _(6), (7), (8)_ | _BR9_   | **Displaying Rules:** System clears all authentication tokens from browser local storage by calling localStorage.removeItem('accessToken') and localStorage.removeItem('refreshToken'). System clears any cached user data and session information. System redirects user to login screen via redirectToLoginPage(). System displays success notification "You have been logged out successfully." (Refer to MSG 5) on the login page.                                                           |

##### 2.1.1.3 Manage Profile

###### _Use Case Description_

This use case allows authenticated users (Customer, Staff, Admin) to view and edit their personal profile information including email, phone, and full name. The system validates all inputs and ensures email uniqueness before updating the user record in the database.

###### _Actors_

- User (Customer, Staff, Admin)

###### _Preconditions_

- User must be logged in with valid JWT access token

###### _Postconditions_

- User profile information is updated in the database
- Updated profile data is displayed in the form

(Refer to "Activity Manage Profile" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity     | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :----------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2)_        | _BR10_  | **Loading Screen Rules:** System loads "Manage Profile" screen via displayProfileForm() with fields populated from current user data: [txtBoxEmail] for email, [txtBoxPhone] for phone number, [txtBoxFullName] for full name, [lblUsername] displaying read-only username, [lblRole] displaying user role, [btnSaveChanges] button for form submission, [btnCancel] button to discard changes. System queries user data with SQL: "SELECT user_id, username, email, phone, full_name, role FROM User WHERE user_id = [current_user_id]" and populates form fields. (Refer to "Manage Profile" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                  |
| _(5), (5.1)_ | _BR11_  | **Validation Rules:** System validates input when user clicks [btnSaveChanges]. System checks: If [txtBoxEmail].Text.isEmpty() = true OR [txtBoxPhone].Text.isEmpty() = true OR [txtBoxFullName].Text.isEmpty() = true: System calls displayErrorMessage("All fields are required.") (Refer to MSG 6) and returns to step (3). System validates email format with regex pattern "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$". If email format invalid: System calls displayErrorMessage("Invalid email format.") (Refer to MSG 7) and returns to step (3). System validates phone with regex pattern "^\\d{10}$". If phone invalid: System calls displayErrorMessage("Phone must be 10 digits.") (Refer to MSG 8) and returns to step (3). System queries to check email uniqueness with SQL: "SELECT COUNT(\*) FROM User WHERE email = [txtBoxEmail].Text AND user_id != [current_user_id]". If COUNT > 0: System calls displayErrorMessage("Email already exists in system.") (Refer to MSG 9) and returns to step (3). |
| _(6), (7)_   | _BR12_  | **Querying Rules:** System executes SQL UPDATE to update user profile: "UPDATE User SET email = [txtBoxEmail].Text, phone = [txtBoxPhone].Text, full_name = [txtBoxFullName].Text, updated_at = NOW() WHERE user_id = [current_user_id]" via updateUserProfile(). If SQL execution fails: System calls displayErrorMessage("Failed to update profile. Please try again.") (Refer to MSG 10) and use case ends at step (7a). (Refer to "User" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| _(7), (8)_   | _BR13_  | **Displaying Rules:** System displays success notification "Profile updated successfully." (Refer to MSG 11) via displaySuccessMessage(). System reloads profile form by querying updated user data with SQL: "SELECT user_id, username, email, phone, full_name, role FROM User WHERE user_id = [current_user_id]" and refreshing all form fields with new values via reloadProfileForm().                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

##### 2.1.1.4 Change Password

###### _Use Case Description_

This use case allows authenticated users to change their account password. The system validates the current password using BCrypt, ensures new password meets security requirements, hashes the new password, updates the database, and invalidates all existing sessions by deleting refresh tokens and blacklisting the current access token to force re-authentication.

###### _Actors_

- User (Customer, Staff, Admin)

###### _Preconditions_

- User must be logged in with valid JWT access token

###### _Postconditions_

- User password is updated in the database
- All user sessions are terminated
- User is redirected to login page

(Refer to "Activity Change Password" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity        | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :-------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(2)_           | _BR14_  | **Loading Screen Rules:** System loads "Change Password" screen via displayChangePasswordForm() with fields: [txtBoxCurrentPassword] for current password with masking, [txtBoxNewPassword] for new password with masking, [txtBoxConfirmPassword] for password confirmation with masking, [btnChangePassword] button for form submission, [btnCancel] button to discard changes. All password fields use type="password" for security masking. (Refer to "Change Password" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| _(5), (5.1)_    | _BR15_  | **Validation Rules:** System validates input when user clicks [btnChangePassword]. System checks: If [txtBoxCurrentPassword].Text.isEmpty() = true OR [txtBoxNewPassword].Text.isEmpty() = true OR [txtBoxConfirmPassword].Text.isEmpty() = true: System calls displayErrorMessage("All fields are required.") (Refer to MSG 6) and returns to step (3). System validates new password strength: length >= 8 characters, contains at least 1 uppercase, 1 lowercase, 1 digit, 1 special character using regex "^(?=._[a-z])(?=._[A-Z])(?=._\\d)(?=._[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$". If validation fails: System calls displayErrorMessage("Password must be at least 8 characters with uppercase, lowercase, digit and special character.") (Refer to MSG 12) and returns to step (3). System checks if [txtBoxNewPassword].Text == [txtBoxConfirmPassword].Text. If passwords don't match: System calls displayErrorMessage("New password and confirm password do not match.") (Refer to MSG 12) and returns to step (3). System queries current user password hash from database with SQL: "SELECT password_hash FROM User WHERE user_id = [current_user_id]" and verifies current password by calling bcryptCompare([txtBoxCurrentPassword].Text, User.password_hash). If bcryptCompare() returns false: System calls displayErrorMessage("Current password is incorrect.") (Refer to MSG 12) and returns to step (3). |
| _(6), (7), (8)_ | _BR16_  | **Querying Rules:** System hashes new password by calling bcryptHash([txtBoxNewPassword].Text, saltRounds=10) to generate new_password_hash. System executes SQL UPDATE: "UPDATE User SET password_hash = [new_password_hash], updated_at = NOW() WHERE user_id = [current_user_id]" via updatePassword(). If SQL execution fails: System calls displayErrorMessage("Failed to change password. Please try again.") (Refer to MSG 12) and use case ends at step (7a). System invalidates all user sessions by: (1) Deleting all refresh tokens with SQL: "DELETE FROM Refresh_Token WHERE user_id = [current_user_id]" via deleteAllUserRefreshTokens(), (2) Adding current access token to blacklist with SQL: "INSERT INTO Token_Blacklist (token, blacklisted_at, expires_at) VALUES ([current_access_token], NOW(), [token_expiry_time])" via addTokenToBlacklist(), (3) Clearing localStorage by calling localStorage.clear(). System displays success message "Password changed successfully. Please login with your new password." (Refer to MSG 12) and redirects to login page via redirectToLoginPage(). (Refer to "User", "Refresh_Token" and "Token_Blacklist" tables in "DB Sheet" file)                                                                                                                                                                                                                           |

##### 2.1.1.5 Register Account

###### _Use Case Description_

This use case allows new customers to create an account in the Wedding Management System through the web registration page. The system validates all registration inputs, ensures username and email uniqueness, hashes the password using BCrypt, creates a new user record with Customer role, sends a welcome email, and redirects to the login page.

###### _Actors_

- Customer (prospective user)

###### _Preconditions_

- User accesses the public registration page (Web only)
- User is not logged in

###### _Postconditions_

- New user account is created in the database with Customer role
- Welcome email is sent to user's email address
- User is redirected to login page

(Refer to "Activity Register Account" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity             | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2)_                | _BR17_  | **Loading Screen Rules:** System loads "Register Account" screen via displayRegistrationForm() with fields: [txtBoxUsername] for username input, [txtBoxEmail] for email input, [txtBoxPhone] for phone number input, [txtBoxFullName] for full name input, [txtBoxPassword] for password input with masking, [txtBoxConfirmPassword] for password confirmation with masking, [btnRegister] button for form submission, [linkLoginPage] hyperlink to navigate back to login page, [chkboxAgreeTerms] checkbox for terms and conditions agreement. (Refer to "Register Account" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| _(5), (5.1)_         | _BR18_  | **Validation Rules:** System validates input when user clicks [btnRegister]. System checks: If [txtBoxUsername].Text.isEmpty() OR [txtBoxEmail].Text.isEmpty() OR [txtBoxPhone].Text.isEmpty() OR [txtBoxFullName].Text.isEmpty() OR [txtBoxPassword].Text.isEmpty() OR [txtBoxConfirmPassword].Text.isEmpty(): System calls displayErrorMessage("All fields are required.") (Refer to MSG 6) and returns to step (3). System validates username length 4-50 characters and alphanumeric with regex "^[a-zA-Z0-9_]{4,50}$". If invalid: System calls displayErrorMessage("Username must be 4-50 alphanumeric characters.") (Refer to MSG 12) and returns to step (3). System validates email format with regex "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$". If invalid: System calls displayErrorMessage("Invalid email format.") (Refer to MSG 7) and returns to step (3). System validates phone with regex "^\\d{10}$". If invalid: System calls displayErrorMessage("Phone must be 10 digits.") (Refer to MSG 8) and returns to step (3). System validates password strength: length >= 8 characters, contains at least 1 uppercase, 1 lowercase, 1 digit, 1 special character using regex "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%_?&#])[A-Za-z\\d@$!%_?&#]{8,}$". If validation fails: System calls displayErrorMessage("Password must be at least 8 characters with uppercase, lowercase, digit and special character.") (Refer to MSG 12) and returns to step (3). System checks [txtBoxPassword].Text == [txtBoxConfirmPassword].Text. If not equal: System calls displayErrorMessage("Password and confirm password do not match.") (Refer to MSG 18) and returns to step (3). System checks [chkboxAgreeTerms].Checked = true. If false: System calls displayErrorMessage("You must agree to terms and conditions.") (Refer to MSG 12) and returns to step (3). System queries to check username uniqueness with SQL: "SELECT COUNT(\*) FROM User WHERE username = [txtBoxUsername].Text". If COUNT > 0: System calls displayErrorMessage("Username already exists.") (Refer to MSG 20) and returns to step (3). System queries to check email uniqueness with SQL: "SELECT COUNT(\*) FROM User WHERE email = [txtBoxEmail].Text". If COUNT > 0: System calls displayErrorMessage("Email already exists.") (Refer to MSG 21) and returns to step (3). |
| _(6), (7), (8), (9)_ | _BR19_  | **Querying Rules:** System hashes password by calling bcryptHash([txtBoxPassword].Text, saltRounds=10) to generate password_hash. System executes SQL INSERT: "INSERT INTO User (username, email, phone, full_name, password_hash, role, status, created_at) VALUES ([txtBoxUsername].Text, [txtBoxEmail].Text, [txtBoxPhone].Text, [txtBoxFullName].Text, [password_hash], 'CUSTOMER', 'active', NOW())" via createNewUser(). If SQL execution fails: System calls displayErrorMessage("Registration failed. Please try again.") (Refer to MSG 22) and use case ends at step (8a). System sends welcome email to [txtBoxEmail].Text with subject "Welcome to Wedding Management System" via sendWelcomeEmail(). System displays success message "Registration successful! Please login with your account." (Refer to MSG 18) and redirects to login page via redirectToLoginPage(). (Refer to "User" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

##### 2.1.1.6 Forgot Password

###### _Use Case Description_

This use case allows users who have forgotten their password to reset it through an email-based verification process. The system generates a secure reset token, sends an email with a reset link, validates the token, allows the user to set a new password, updates the database, and terminates all existing sessions.

###### _Actors_

- User (Customer, Staff, Admin)

###### _Preconditions_

- User has a registered account in the system
- User accesses the forgot password page

###### _Postconditions_

- User password is reset in the database
- All user sessions are terminated
- Password reset token is deleted
- User is redirected to login page

(Refer to "Activity Forgot Password" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity               | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :--------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(2)_                  | _BR20_  | **Loading Screen Rules:** System loads "Forgot Password - Email Input" screen via displayForgotPasswordEmailForm() with fields: [txtBoxEmail] for email input, [btnSubmitEmail] button for form submission, [linkBackToLogin] hyperlink to return to login page. (Refer to "Forgot Password Email Input" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| _(4), (4.1), (5), (6)_ | _BR21_  | **Validation Rules:** System validates email when user clicks [btnSubmitEmail]. If [txtBoxEmail].Text.isEmpty() = true: System calls displayErrorMessage("Email is required.") (Refer to MSG 12) and returns to step (3). System validates email format with regex "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$". If invalid: System calls displayErrorMessage("Invalid email format.") (Refer to MSG 7) and returns to step (3). System queries user with SQL: "SELECT user_id, username, email FROM User WHERE email = [txtBoxEmail].Text AND status = 'active'". If COUNT = 0: System still displays success message (security measure to prevent email enumeration). System generates random reset token via generateSecureToken() (UUID format, 36 characters). System executes SQL INSERT: "INSERT INTO Password_Reset_Token (user_id, token, expires_at, created_at) VALUES ([user_id], [reset_token], NOW() + INTERVAL 1 HOUR, NOW())" via saveResetToken(). System sends email to [txtBoxEmail].Text with reset link "https://[domain]/reset-password?token=[reset_token]" via sendPasswordResetEmail(). System displays success message "If your email exists in our system, you will receive a password reset link." (Refer to MSG 20). (Refer to "Password_Reset_Token" table in "DB Sheet" file) |
| _(7), (8), (9)_        | _BR22_  | **Validation Rules:** When user clicks reset link from email, system extracts token from URL parameter. System queries password reset token with SQL: "SELECT prt.token, prt.expires_at, prt.user_id, u.username FROM Password_Reset_Token prt JOIN User u ON prt.user_id = u.user_id WHERE prt.token = [url_token] AND prt.expires_at > NOW() AND prt.used = false". If COUNT = 0: System calls displayErrorMessage("Invalid or expired reset link.") (Refer to MSG 21) and use case ends at step (8). If token is valid: System loads "Reset Password Form" screen via displayResetPasswordForm() with fields: [txtBoxNewPassword] for new password with masking, [txtBoxConfirmPassword] for password confirmation with masking, [btnResetPassword] button for form submission, [hiddenTokenField] containing reset token value. (Refer to "Reset Password Form" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                |
| _(11), (12.1)_         | _BR23_  | **Validation Rules:** System validates password input when user clicks [btnResetPassword]. If [txtBoxNewPassword].Text.isEmpty() = true OR [txtBoxConfirmPassword].Text.isEmpty() = true: System calls displayErrorMessage("All fields are required.") (Refer to MSG 6) and returns to step (10). System validates password strength: length >= 8 characters, contains at least 1 uppercase, 1 lowercase, 1 digit, 1 special character using regex "^(?=._[a-z])(?=._[A-Z])(?=._\\d)(?=._[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$". If validation fails: System calls displayErrorMessage("Password must be at least 8 characters with uppercase, lowercase, digit and special character.") (Refer to MSG 12) and returns to step (10). System checks [txtBoxNewPassword].Text == [txtBoxConfirmPassword].Text. If not equal: System calls displayErrorMessage("Password and confirm password do not match.") (Refer to MSG 18) and returns to step (10).                                                                                                                                                                                                                                                                                                                                                                |
| _(12), (13), (14)_     | _BR24_  | **Querying Rules:** System hashes new password by calling bcryptHash([txtBoxNewPassword].Text, saltRounds=10). System executes SQL UPDATE: "UPDATE User SET password_hash = [new_password_hash], updated_at = NOW() WHERE user_id = [user_id_from_token]" via resetPassword(). If SQL execution fails: System calls displayErrorMessage("Failed to reset password. Please try again.") (Refer to MSG 22) and use case ends. System marks token as used with SQL: "UPDATE Password_Reset_Token SET used = true WHERE token = [reset_token]" via markTokenAsUsed(). System deletes all user refresh tokens with SQL: "DELETE FROM Refresh_Token WHERE user_id = [user_id_from_token]" via deleteAllUserRefreshTokens(). System displays success message "Password reset successfully! Please login with your new password." (Refer to MSG 12) and redirects to login page via redirectToLoginPage(). (Refer to "User", "Password_Reset_Token", and "Refresh_Token" tables in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                         |

#### 2.1.2 System Management Use Cases

##### 2.1.2.1 View User Details

###### _Use Case Description_

This use case allows administrators to view the list of all users in the system with search/filter capabilities, and view detailed information of any selected user including their permission group assignments.

###### _Actors_

- Admin

###### _Preconditions_

- Admin must be logged in with valid JWT access token
- Admin has permission to view user details

###### _Postconditions_

- User list is displayed with search/filter results
- Selected user's detailed information is shown

(Refer to "Activity View User Details" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity   | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :--------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2)_      | _BR25_  | **Loading Screen Rules:** System loads "User Management" screen via displayUsersList() with components: [gridUsers] data grid showing columns (user_id, username, full_name, email, role, status), [txtBoxSearch] for search input, [cmbFilterRole] dropdown for role filtering (All/Customer/Staff/Admin), [cmbFilterStatus] dropdown for status filtering (All/Active/Inactive), [btnSearch] button, [btnAddNew] button. System queries all users with SQL: "SELECT user_id, username, full_name, email, phone, role, status FROM User ORDER BY created_at DESC" and populates grid. (Refer to "User Management" view in "View Description" file) |
| _(5), (6)_ | _BR26_  | **Querying Rules:** When admin enters search criteria and clicks [btnSearch], system builds dynamic SQL query. Base query: "SELECT user_id, username, full_name, email, phone, role, status FROM User WHERE 1=1". If [txtBoxSearch].Text not empty: Add "AND (username LIKE '%[search]%' OR full_name LIKE '%[search]%' OR email LIKE '%[search]%')". If [cmbFilterRole].SelectedValue != 'All': Add "AND role = [selected_role]". If [cmbFilterStatus].SelectedValue != 'All': Add "AND status = [selected_status]". Execute query and refresh [gridUsers] via refreshUsersList().                                                                 |
| _(8), (9)_ | _BR27_  | **Querying Rules:** When admin selects a user from [gridUsers] and clicks view details, system queries user details with SQL: "SELECT u.user_id, u.username, u.full_name, u.email, u.phone, u.address, u.cccd, u.role, u.status, u.created_at, pg.group_name FROM User u LEFT JOIN Permission_Group pg ON u.group_id = pg.group_id WHERE u.user_id = [selected_user_id]". System displays modal dialog via displayUserDetailsDialog() showing all user information in read-only format. (Refer to "User" and "Permission_Group" tables in "DB Sheet" file)                                                                                          |

##### 2.1.2.2 Add New User

###### _Use Case Description_

This use case allows administrators to create new user accounts (staff members) in the system. The system validates all inputs, ensures username and email uniqueness, hashes the password, and creates the user record with selected permission group.

###### _Actors_

- Admin

###### _Preconditions_

- Admin must be logged in with valid JWT access token
- Admin has permission to add new users

###### _Postconditions_

- New user account is created in database
- User appears in the users list

(Refer to "Activity Add New User" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :---------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2)_             | _BR28_  | **Loading Screen Rules:** System loads "Add New User" form via displayAddUserForm() with fields: [txtBoxFullName] for full name, [txtBoxEmail] for email, [txtBoxPhone] for phone, [txtBoxAddress] for address, [txtBoxCCCD] for citizen ID, [txtBoxUsername] for login username, [txtBoxPassword] for password with masking, [cmbPermissionGroup] dropdown populated with permission groups, [cmbStatus] dropdown (Active/Inactive), [btnSave] button, [btnCancel] button. System queries permission groups with SQL: "SELECT group_id, group_name FROM Permission_Group WHERE status = 'active'" to populate dropdown. (Refer to "Add User" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| _(5), (6), (6.1)_ | _BR29_  | **Validation Rules:** When admin clicks [btnSave], system validates all inputs. System checks: If [txtBoxFullName].Text.isEmpty() OR [txtBoxEmail].Text.isEmpty() OR [txtBoxPhone].Text.isEmpty() OR [txtBoxUsername].Text.isEmpty() OR [txtBoxPassword].Text.isEmpty(): System calls displayErrorMessage("All required fields must be filled.") (Refer to MSG 18) and returns to step (3). System validates email format with regex "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$". If invalid: System calls displayErrorMessage("Invalid email format.") (Refer to MSG 7) and returns to step (3). System validates phone with regex "^\\d{10}$". If invalid: System calls displayErrorMessage("Phone must be 10 digits.") (Refer to MSG 8) and returns to step (3). System validates username length 4-50 characters with regex "^[a-zA-Z0-9_]{4,50}$". If invalid: System calls displayErrorMessage("Username must be 4-50 alphanumeric characters.") (Refer to MSG 12) and returns to step (3). System validates password strength: length >= 8 characters, contains at least 1 uppercase, 1 lowercase, 1 digit, 1 special character using regex "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%_?&#])[A-Za-z\\d@$!%_?&#]{8,}$". If invalid: System calls displayErrorMessage("Password must be at least 8 characters with uppercase, lowercase, digit and special character.") (Refer to MSG 12) and returns to step (3). System validates CCCD format (if provided) with regex "^\\d{12}$". If invalid: System calls displayErrorMessage("CCCD must be 12 digits.") (Refer to MSG 12) and returns to step (3). System queries to check username uniqueness: "SELECT COUNT(\*) FROM User WHERE username = [txtBoxUsername].Text". If COUNT > 0: System calls displayErrorMessage("Username already exists.") (Refer to MSG 20) and returns to step (3). System queries to check email uniqueness: "SELECT COUNT(\*) FROM User WHERE email = [txtBoxEmail].Text". If COUNT > 0: System calls displayErrorMessage("Email already exists.") (Refer to MSG 21) and returns to step (3). |
| _(7), (8)_        | _BR30_  | **Querying Rules:** System hashes password by calling bcryptHash([txtBoxPassword].Text, saltRounds=10) to generate password_hash. System executes SQL INSERT: "INSERT INTO User (username, password_hash, full_name, email, phone, address, cccd, group_id, role, status, created_at) VALUES ([txtBoxUsername].Text, [password_hash], [txtBoxFullName].Text, [txtBoxEmail].Text, [txtBoxPhone].Text, [txtBoxAddress].Text, [txtBoxCCCD].Text, [cmbPermissionGroup].SelectedValue, 'Staff', [cmbStatus].SelectedValue, NOW())" via createNewUser(). If SQL execution fails: System calls displayErrorMessage("Failed to create user. Please try again.") (Refer to MSG 30) and use case ends. System displays success message "User created successfully." (Refer to MSG 20) and redirects to users list via redirectToUsersList(). (Refer to "User" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

##### 2.1.2.3 Edit User

###### _Use Case Description_

This use case allows administrators to modify existing user information including personal details, permission group assignment, and account status. The system validates the user exists and is editable before allowing modifications.

###### _Actors_

- Admin

###### _Preconditions_

- Admin must be logged in with valid JWT access token
- Admin has permission to edit users
- Target user exists in the system

###### _Postconditions_

- User information is updated in database
- Updated user data is reflected in the users list

(Refer to "Activity Edit User" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :----------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2), (2.1), (2.2), (3)_ | _BR31_  | **Validation Rules:** When admin selects user to edit, system queries user existence with SQL: "SELECT user_id, username, full_name, email, phone, address, cccd, group_id, role, status FROM User WHERE user_id = [selected_user_id]". If COUNT = 0: System calls displayErrorMessage("User not found.") (Refer to MSG 21) and use case ends at step (2.2). System loads "Edit User" form via displayEditUserForm() with fields populated from query result: [txtBoxFullName], [txtBoxEmail], [txtBoxPhone], [txtBoxAddress], [txtBoxCCCD], [lblUsername] (read-only), [cmbPermissionGroup], [cmbStatus]. System queries permission groups to populate dropdown: "SELECT group_id, group_name FROM Permission_Group WHERE status = 'active'". (Refer to "Edit User" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                       |
| _(6), (6.1)_             | _BR32_  | **Validation Rules:** When admin clicks [btnSave], system validates inputs. System checks: If [txtBoxFullName].Text.isEmpty() OR [txtBoxEmail].Text.isEmpty() OR [txtBoxPhone].Text.isEmpty(): System calls displayErrorMessage("All required fields must be filled.") (Refer to MSG 18) and returns to step (4). System validates email format with regex "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$". If invalid: System calls displayErrorMessage("Invalid email format.") (Refer to MSG 7) and returns to step (4). System validates phone with regex "^\\d{10}$". If invalid: System calls displayErrorMessage("Phone must be 10 digits.") (Refer to MSG 8) and returns to step (4). System validates CCCD format (if provided) with regex "^\\d{12}$". If invalid: System calls displayErrorMessage("CCCD must be 12 digits.") (Refer to MSG 12) and returns to step (4). System queries to check email uniqueness excluding current user: "SELECT COUNT(\*) FROM User WHERE email = [txtBoxEmail].Text AND user_id != [current_user_id]". If COUNT > 0: System calls displayErrorMessage("Email already exists.") (Refer to MSG 21) and returns to step (4). |
| _(7), (8)_               | _BR33_  | **Querying Rules:** System executes SQL UPDATE: "UPDATE User SET full_name = [txtBoxFullName].Text, email = [txtBoxEmail].Text, phone = [txtBoxPhone].Text, address = [txtBoxAddress].Text, cccd = [txtBoxCCCD].Text, group_id = [cmbPermissionGroup].SelectedValue, status = [cmbStatus].SelectedValue, updated_at = NOW() WHERE user_id = [selected_user_id]" via updateUser(). If SQL execution fails: System calls displayErrorMessage("Failed to update user. Please try again.") (Refer to MSG 33) and use case ends. System displays success message "User updated successfully." (Refer to MSG 34) and reloads users list via reloadUsersList(). (Refer to "User" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

##### 2.1.2.4 Delete User

###### _Use Case Description_

This use case allows administrators to delete user accounts from the system. The system checks for referenced data (bookings, invoices) and prevents deletion if the user has existing transactions, requiring admin confirmation before deletion.

###### _Actors_

- Admin

###### _Preconditions_

- Admin must be logged in with valid JWT access token
- Admin has permission to delete users
- Target user exists in the system

###### _Postconditions_

- User is deleted from database (if no referenced data)
- User is removed from users list

(Refer to "Activity Delete User" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :----------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(5), (5.1), (5.2)_      | _BR34_  | **Validation Rules:** When admin selects user and clicks delete, system queries referenced data with SQL: "SELECT (SELECT COUNT(\*) FROM Booking WHERE customer_id = [selected_user_id]) + (SELECT COUNT(\*) FROM Invoice WHERE user_id = [selected_user_id]) AS reference_count". If reference_count > 0: System calls displayErrorMessage("Cannot delete user. User has [reference_count] associated bookings/invoices.") (Refer to MSG 35) and use case ends at step (5.2). |
| _(6), (7), (7.1), (7.2)_ | _BR35_  | **Displaying Rules:** System displays confirmation dialog via displayConfirmationDialog() with message "Are you sure you want to delete user '[username]'? This action cannot be undone.". If admin clicks [btnCancel]: System closes dialog via closeDialog() and use case ends at step (7.2).                                                                                                                                                                                |
| _(8), (9)_               | _BR36_  | **Querying Rules:** System executes SQL DELETE in transaction: "DELETE FROM User WHERE user_id = [selected_user_id]" via deleteUser(). If SQL execution fails: System calls displayErrorMessage("Failed to delete user. Please try again.") (Refer to MSG 22) and use case ends. System displays success message "User deleted successfully." (Refer to MSG 37) and reloads users list via reloadUsersList(). (Refer to "User" table in "DB Sheet" file)                       |

##### 2.1.2.5 View Permission Group Details

###### _Use Case Description_

This use case allows administrators to view all permission groups in the system with search capabilities, and view detailed information of any selected permission group including assigned functions/permissions.

###### _Actors_

- Admin

###### _Preconditions_

- Admin must be logged in with valid JWT access token
- Admin has permission to view permission groups

###### _Postconditions_

- Permission groups list is displayed with search results
- Selected permission group's detailed information is shown

(Refer to "Activity View Permission Group Details" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity   | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :--------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2)_      | _BR37_  | **Loading Screen Rules:** System loads "Permission Groups Management" screen via displayPermissionGroupsList() with components: [gridGroups] data grid showing columns (group_id, group_code, group_name, function_count, status), [txtBoxSearch] for search input, [btnSearch] button, [btnAddNew] button. System queries all permission groups with SQL: "SELECT pg.group_id, pg.group_code, pg.group_name, pg.status, COUNT(pf.function_id) AS function_count FROM Permission_Group pg LEFT JOIN Permission_Function pf ON pg.group_id = pf.group_id GROUP BY pg.group_id ORDER BY pg.created_at DESC" and populates grid. (Refer to "Permission Groups Management" view in "View Description" file)     |
| _(5), (6)_ | _BR38_  | **Querying Rules:** When admin enters search keyword in [txtBoxSearch] and clicks [btnSearch], system queries permission groups with SQL: "SELECT pg.group_id, pg.group_code, pg.group_name, pg.status, COUNT(pf.function_id) AS function_count FROM Permission_Group pg LEFT JOIN Permission_Function pf ON pg.group_id = pf.group_id WHERE pg.group_code LIKE '%[search]%' OR pg.group_name LIKE '%[search]%' GROUP BY pg.group_id ORDER BY pg.created_at DESC" and refreshes [gridGroups] via refreshPermissionGroupsList().                                                                                                                                                                             |
| _(8), (9)_ | _BR39_  | **Querying Rules:** When admin selects a permission group from [gridGroups] and clicks view details, system queries permission group details with SQL: "SELECT pg.group_id, pg.group_code, pg.group_name, pg.status, pg.created_at, f.function_id, f.function_code, f.function_name FROM Permission_Group pg LEFT JOIN Permission_Function pf ON pg.group_id = pf.group_id LEFT JOIN Function f ON pf.function_id = f.function_id WHERE pg.group_id = [selected_group_id]". System displays modal dialog via displayPermissionGroupDetailsDialog() showing group information and list of assigned functions. (Refer to "Permission_Group", "Permission_Function", and "Function" tables in "DB Sheet" file) |

##### 2.1.2.6 Add New Permission Group

###### _Use Case Description_

This use case allows administrators to create new permission groups with assigned functions. The system validates inputs, ensures group code and name uniqueness, and creates the permission group with function assignments in a transaction.

###### _Actors_

- Admin

###### _Preconditions_

- Admin must be logged in with valid JWT access token
- Admin has permission to add permission groups

###### _Postconditions_

- New permission group is created in database
- Functions are assigned to the new group
- Group appears in the permission groups list

(Refer to "Activity Add New Permission Group" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2)_             | _BR40_  | **Loading Screen Rules:** System loads "Add New Permission Group" form via displayAddPermissionGroupForm() with fields: [txtBoxGroupCode] for group code input, [txtBoxGroupName] for group name input, [chkListFunctions] checklist displaying all available functions, [btnSave] button, [btnCancel] button. System queries all functions with SQL: "SELECT function_id, function_code, function_name FROM Function WHERE status = 'active' ORDER BY function_code" to populate checklist. (Refer to "Add Permission Group" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| _(5), (6), (6.1)_ | _BR41_  | **Validation Rules:** When admin clicks [btnSave], system validates inputs. System checks: If [txtBoxGroupCode].Text.isEmpty() OR [txtBoxGroupName].Text.isEmpty(): System calls displayErrorMessage("Group code and group name are required.") (Refer to MSG 18) and returns to step (3). System validates group code format with regex "^[A-Z0-9_]{3,20}$" (uppercase, numbers, underscore only). If invalid: System calls displayErrorMessage("Group code must be 3-20 uppercase alphanumeric characters with underscores.") (Refer to MSG 39) and returns to step (3). System validates group name length 3-100 characters. If invalid: System calls displayErrorMessage("Group name must be 3-100 characters.") (Refer to MSG 40) and returns to step (3). System checks at least one function is selected from [chkListFunctions]. If none selected: System calls displayErrorMessage("Please select at least one function for this permission group.") (Refer to MSG 41) and returns to step (3). System queries to check group code uniqueness: "SELECT COUNT(\*) FROM Permission_Group WHERE group_code = [txtBoxGroupCode].Text". If COUNT > 0: System calls displayErrorMessage("Group code already exists.") (Refer to MSG 42) and returns to step (3). System queries to check group name uniqueness: "SELECT COUNT(\*) FROM Permission_Group WHERE group_name = [txtBoxGroupName].Text". If COUNT > 0: System calls displayErrorMessage("Group name already exists.") (Refer to MSG 12) and returns to step (3). |
| _(7), (8)_        | _BR42_  | **Querying Rules:** System executes in transaction: (1) Insert permission group with SQL: "INSERT INTO Permission_Group (group_code, group_name, status, created_at) VALUES ([txtBoxGroupCode].Text, [txtBoxGroupName].Text, 'active', NOW())" via createPermissionGroup() to get new_group_id. (2) For each selected function in [chkListFunctions]: Execute SQL INSERT: "INSERT INTO Permission_Function (group_id, function_id) VALUES ([new_group_id], [function_id])" via assignFunctionToGroup(). If any SQL execution fails: System rolls back transaction and calls displayErrorMessage("Failed to create permission group. Please try again.") (Refer to MSG 44) and use case ends. System commits transaction, displays success message "Permission group created successfully." (Refer to MSG 45), and redirects to permission groups list via redirectToPermissionGroupsList(). (Refer to "Permission_Group" and "Permission_Function" tables in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

##### 2.1.2.7 Edit Permission Group

###### _Use Case Description_

This use case allows administrators to modify existing permission group information including group name and function assignments. The group code is read-only. The system validates inputs and updates the group with function reassignments in a transaction.

###### _Actors_

- Admin

###### _Preconditions_

- Admin must be logged in with valid JWT access token
- Admin has permission to edit permission groups
- Target permission group exists in the system

###### _Postconditions_

- Permission group information is updated in database
- Function assignments are updated
- Updated group data is reflected in the permission groups list

(Refer to "Activity Edit Permission Group" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity     | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :----------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(4), (5)_   | _BR43_  | **Loading Screen Rules:** When admin selects permission group to edit, system queries group details with SQL: "SELECT pg.group_id, pg.group_code, pg.group_name, pf.function_id FROM Permission_Group pg LEFT JOIN Permission_Function pf ON pg.group_id = pf.group_id WHERE pg.group_id = [selected_group_id]". System queries all available functions: "SELECT function_id, function_code, function_name FROM Function WHERE status = 'active' ORDER BY function_code". System displays "Edit Permission Group" form via displayEditPermissionGroupForm() with fields: [lblGroupCode] (read-only display), [txtBoxGroupName] populated with current name, [chkListFunctions] with all functions and current assignments checked. (Refer to "Edit Permission Group" view in "View Description" file)                                                                                                                                                                                                                                                                            |
| _(8), (8.1)_ | _BR44_  | **Validation Rules:** When admin clicks [btnSave], system validates inputs. System checks: If [txtBoxGroupName].Text.isEmpty(): System calls displayErrorMessage("Group name is required.") (Refer to MSG 30) and returns to step (6). System validates group name length 3-100 characters. If invalid: System calls displayErrorMessage("Group name must be 3-100 characters.") (Refer to MSG 40) and returns to step (6). System checks at least one function is selected from [chkListFunctions]. If none selected: System calls displayErrorMessage("Please select at least one function for this permission group.") (Refer to MSG 41) and returns to step (6). System queries to check group name uniqueness excluding current group: "SELECT COUNT(\*) FROM Permission_Group WHERE group_name = [txtBoxGroupName].Text AND group_id != [current_group_id]". If COUNT > 0: System calls displayErrorMessage("Group name already exists.") (Refer to MSG 12) and returns to step (6).                                                                                       |
| _(9), (10)_  | _BR45_  | **Querying Rules:** System executes in transaction: (1) Update permission group with SQL: "UPDATE Permission_Group SET group_name = [txtBoxGroupName].Text, updated_at = NOW() WHERE group_id = [selected_group_id]" via updatePermissionGroup(). (2) Delete all existing function assignments: "DELETE FROM Permission_Function WHERE group_id = [selected_group_id]" via clearPermissionFunctions(). (3) For each selected function in [chkListFunctions]: Execute SQL INSERT: "INSERT INTO Permission_Function (group_id, function_id) VALUES ([selected_group_id], [function_id])" via assignFunctionToGroup(). If any SQL execution fails: System rolls back transaction and calls displayErrorMessage("Failed to update permission group. Please try again.") (Refer to MSG 20) and use case ends. System commits transaction, displays success message "Permission group updated successfully." (Refer to MSG 21), and reloads permission groups list via reloadPermissionGroupsList(). (Refer to "Permission_Group" and "Permission_Function" tables in "DB Sheet" file) |

##### 2.1.2.8 Delete Permission Group

###### _Use Case Description_

This use case allows administrators to delete permission groups from the system. The system checks for referenced data (users assigned to this group) and prevents deletion if any users are using this permission group, requiring admin confirmation before deletion.

###### _Actors_

- Admin

###### _Preconditions_

- Admin must be logged in with valid JWT access token
- Admin has permission to delete permission groups
- Target permission group exists in the system

###### _Postconditions_

- Permission group is deleted from database (if no referenced data)
- Function assignments are deleted
- Group is removed from permission groups list

(Refer to "Activity Delete Permission Group" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :----------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(5), (5.1), (5.2)_      | _BR46_  | **Validation Rules:** When admin selects permission group and clicks delete, system queries referenced data with SQL: "SELECT COUNT(\*) FROM User WHERE group_id = [selected_group_id]". If COUNT > 0: System calls displayErrorMessage("Cannot delete permission group. [COUNT] user(s) are assigned to this group.") (Refer to MSG 49) and use case ends at step (5.2).                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| _(6), (7), (7.1), (7.2)_ | _BR47_  | **Displaying Rules:** System displays confirmation dialog via displayConfirmationDialog() with message "Are you sure you want to delete permission group '[group_name]'? This action cannot be undone.". If admin clicks [btnCancel]: System closes dialog via closeDialog() and use case ends at step (7.2).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| _(8), (9)_               | _BR48_  | **Querying Rules:** System executes in transaction: (1) Delete function assignments with SQL: "DELETE FROM Permission_Function WHERE group_id = [selected_group_id]" via deletePermissionFunctions(). (2) Delete permission group with SQL: "DELETE FROM Permission_Group WHERE group_id = [selected_group_id]" via deletePermissionGroup(). If any SQL execution fails: System rolls back transaction and calls displayErrorMessage("Failed to delete permission group. Please try again.") (Refer to MSG 50) and use case ends. System commits transaction, displays success message "Permission group deleted successfully." (Refer to MSG 51), and reloads permission groups list via reloadPermissionGroupsList(). (Refer to "Permission_Group" and "Permission_Function" tables in "DB Sheet" file) |

##### 2.1.2.9 Manage System Parameters

###### _Use Case Description_

This use case allows administrators to view and modify system-wide parameters including penalty settings, minimum deposit rates, and minimum table reservation rates. Changes affect the entire system and require confirmation before applying.

###### _Actors_

- Admin

###### _Preconditions_

- Admin must be logged in with valid JWT access token
- Admin has permission to manage system settings

###### _Postconditions_

- System parameters are updated in database
- New parameter values take effect immediately

(Refer to "Activity Manage System Parameters" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity                        | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------------------------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(2), (3)_                      | _BR49_  | **Loading Screen Rules:** System loads "System Settings" screen via displaySystemParametersForm(). System queries all parameters with SQL: "SELECT param_code, param_value FROM System_Parameter WHERE param_code IN ('ENABLE_PENALTY', 'PENALTY_RATE', 'MIN_DEPOSIT_RATE', 'MIN_TABLE_RESERVATION_RATE')" and displays form with fields: [chkEnablePenalty] checkbox for penalty enforcement (0 or 1), [txtBoxPenaltyRate] for penalty percentage (0.00-1.00), [txtBoxMinDepositRate] for minimum deposit percentage (0.01-1.00), [txtBoxMinTableReservationRate] for minimum table reservation percentage (0.01-1.00), [btnSave] button, [btnCancel] button. (Refer to "System Settings" view in "View Description" file)                                                                                                                                                                                                                                                                                                                 |
| _(6), (7), (8), (8.1)_          | _BR50_  | **Validation Rules:** When admin clicks [btnSave], system displays confirmation dialog via displayConfirmationDialog() with message "Parameter changes will affect the entire system. Do you want to continue?". If admin clicks [btnCancel]: System closes dialog and returns to step (4). If admin confirms, system validates inputs: Check [chkEnablePenalty] value is 0 or 1. Check [txtBoxPenaltyRate] is numeric and 0 <= value <= 1. If invalid: System calls displayErrorMessage("Penalty rate must be between 0% and 100%.") (Refer to MSG 52) and returns to step (4). Check [txtBoxMinDepositRate] is numeric and 0 < value <= 1. If invalid: System calls displayErrorMessage("Minimum deposit rate must be greater than 0% and up to 100%.") (Refer to MSG 53) and returns to step (4). Check [txtBoxMinTableReservationRate] is numeric and 0 < value <= 1. If invalid: System calls displayErrorMessage("Minimum table reservation rate must be greater than 0% and up to 100%.") (Refer to MSG 33) and returns to step (4). |
| _(9), (10), (11), (10a), (11a)_ | _BR51_  | **Querying Rules:** System executes in transaction: (1) Update each parameter with SQL: "UPDATE System_Parameter SET param_value = [new_value], updated_at = NOW() WHERE param_code = [param_code]" via updateSystemParameter() for each of: ('ENABLE_PENALTY', [chkEnablePenalty].Checked ? 1 : 0), ('PENALTY_RATE', [txtBoxPenaltyRate].Text), ('MIN_DEPOSIT_RATE', [txtBoxMinDepositRate].Text), ('MIN_TABLE_RESERVATION_RATE', [txtBoxMinTableReservationRate].Text). If any SQL execution fails: System rolls back transaction and calls displayErrorMessage("Failed to update system parameters. Please try again.") (Refer to MSG 34) and use case ends at step (11a). System commits transaction, displays success message "System parameters updated successfully. Changes will take effect immediately." (Refer to MSG 35), and reloads form with updated values via reloadSystemParametersForm(). (Refer to "System_Parameter" table in "DB Sheet" file)                                                                         |

#### 2.1.3 Master Data Management Use Cases

##### 2.1.3.1 View Hall Details

###### _Use Case Description_

This use case allows staff and administrators to view the list of all wedding halls in the system with search/filter capabilities, and view detailed information of any selected hall including hall type and capacity.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to view halls

###### _Postconditions_

- Halls list is displayed with search/filter results
- Selected hall's detailed information is shown

(Refer to "Activity View Hall Details" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity   | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :--------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2)_      | _BR52_  | **Loading Screen Rules:** System loads "Hall Management" screen via displayHallsList() with components: [gridHalls] data grid showing columns (hall_id, hall_name, hall_type_name, max_tables, status), [txtBoxSearch] for search input, [cmbFilterHallType] dropdown for hall type filtering, [btnSearch] button, [btnAddNew] button, [btnExport] button. System queries all halls with SQL: "SELECT h.hall_id, h.hall_name, ht.type_name, h.max_tables, h.status FROM Hall h LEFT JOIN Hall_Type ht ON h.type_id = ht.type_id ORDER BY h.created_at DESC" and populates grid. (Refer to "Hall Management" view in "View Description" file) |
| _(5), (6)_ | _BR53_  | **Querying Rules:** When user enters search criteria and clicks [btnSearch], system builds dynamic SQL query. Base query: "SELECT h.hall_id, h.hall_name, ht.type_name, h.max_tables, h.status FROM Hall h LEFT JOIN Hall_Type ht ON h.type_id = ht.type_id WHERE 1=1". If [txtBoxSearch].Text not empty: Add "AND h.hall_name LIKE '%[search]%'". If [cmbFilterHallType].SelectedValue != 'All': Add "AND h.type_id = [selected_type_id]". Execute query and refresh [gridHalls] via refreshHallsList().                                                                                                                                    |
| _(8), (9)_ | _BR54_  | **Querying Rules:** When user selects a hall from [gridHalls] and clicks view details, system queries hall details with SQL: "SELECT h.hall_id, h.hall_name, h.type_id, ht.type_name, h.max_tables, h.notes, h.status, h.created_at FROM Hall h LEFT JOIN Hall_Type ht ON h.type_id = ht.type_id WHERE h.hall_id = [selected_hall_id]". System displays modal dialog via displayHallDetailsDialog() showing all hall information in read-only format. (Refer to "Hall" and "Hall_Type" tables in "DB Sheet" file)                                                                                                                            |

##### 2.1.3.2 Add New Hall

###### _Use Case Description_

This use case allows staff and administrators to create new wedding hall records in the system. The system validates all inputs, ensures hall name uniqueness, and creates the hall record with selected hall type.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to add halls
- At least one hall type exists in the system

###### _Postconditions_

- New hall is created in database
- Hall appears in the halls list

(Refer to "Activity Add New Hall" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :---------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2)_             | _BR55_  | **Loading Screen Rules:** System loads "Add New Hall" form via displayAddHallForm() with fields: [txtBoxHallName] for hall name, [cmbHallType] dropdown populated with hall types, [txtBoxMaxTables] for maximum tables (numeric), [txtBoxNotes] for notes (optional), [btnSave] button, [btnCancel] button. System queries hall types with SQL: "SELECT type_id, type_name FROM Hall_Type WHERE status = 'active' ORDER BY type_name" to populate dropdown. (Refer to "Add Hall" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| _(5), (6), (6.1)_ | _BR56_  | **Validation Rules:** When user clicks [btnSave], system validates all inputs. System checks: If [txtBoxHallName].Text.isEmpty() OR [cmbHallType].SelectedValue.isEmpty() OR [txtBoxMaxTables].Text.isEmpty(): System calls displayErrorMessage("Hall name, hall type, and max tables are required.") (Refer to MSG 22) and returns to step (3). System validates hall name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Hall name must be 3-100 characters.") (Refer to MSG 37) and returns to step (3). System validates max tables is positive integer with regex "^[1-9]\\d\*$". If invalid: System calls displayErrorMessage("Max tables must be a positive number.") (Refer to MSG 18) and returns to step (3). System queries to check hall name uniqueness: "SELECT COUNT(\*) FROM Hall WHERE hall_name = [txtBoxHallName].Text". If COUNT > 0: System calls displayErrorMessage("Hall name already exists.") (Refer to MSG 39) and returns to step (3). |
| _(7), (8)_        | _BR57_  | **Querying Rules:** System executes SQL INSERT: "INSERT INTO Hall (hall_name, type_id, max_tables, notes, status, created_at) VALUES ([txtBoxHallName].Text, [cmbHallType].SelectedValue, [txtBoxMaxTables].Text, [txtBoxNotes].Text, 'active', NOW())" via createHall(). If SQL execution fails: System calls displayErrorMessage("Failed to create hall. Please try again.") (Refer to MSG 40) and use case ends. System displays success message "Hall created successfully." (Refer to MSG 41) and redirects to halls list via redirectToHallsList(). (Refer to "Hall" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                               |

##### 2.1.3.3 Edit Hall

###### _Use Case Description_

This use case allows staff and administrators to modify existing hall information including name, type, capacity, and notes. The system validates inputs and ensures name uniqueness before updating.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to edit halls
- Target hall exists in the system

###### _Postconditions_

- Hall information is updated in database
- Updated hall data is reflected in the halls list

(Refer to "Activity Edit Hall" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity     | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :----------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(4), (5)_   | _BR58_  | **Loading Screen Rules:** When user selects hall to edit, system queries hall details with SQL: "SELECT hall_id, hall_name, type_id, max_tables, notes, status FROM Hall WHERE hall_id = [selected_hall_id]". System queries hall types: "SELECT type_id, type_name FROM Hall_Type WHERE status = 'active' ORDER BY type_name". System displays "Edit Hall" form via displayEditHallForm() with fields populated: [txtBoxHallName], [cmbHallType] with current type selected, [txtBoxMaxTables], [txtBoxNotes], [cmbStatus] dropdown (Active/Inactive). (Refer to "Edit Hall" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| _(8), (8.1)_ | _BR59_  | **Validation Rules:** When user clicks [btnSave], system validates inputs. System checks: If [txtBoxHallName].Text.isEmpty() OR [cmbHallType].SelectedValue.isEmpty() OR [txtBoxMaxTables].Text.isEmpty(): System calls displayErrorMessage("Hall name, hall type, and max tables are required.") (Refer to MSG 22) and returns to step (6). System validates hall name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Hall name must be 3-100 characters.") (Refer to MSG 37) and returns to step (6). System validates max tables is positive integer with regex "^[1-9]\\d\*$". If invalid: System calls displayErrorMessage("Max tables must be a positive number.") (Refer to MSG 18) and returns to step (6). System queries to check hall name uniqueness excluding current hall: "SELECT COUNT(\*) FROM Hall WHERE hall_name = [txtBoxHallName].Text AND hall_id != [current_hall_id]". If COUNT > 0: System calls displayErrorMessage("Hall name already exists.") (Refer to MSG 39) and returns to step (6). |
| _(9), (10)_  | _BR60_  | **Querying Rules:** System executes SQL UPDATE: "UPDATE Hall SET hall_name = [txtBoxHallName].Text, type_id = [cmbHallType].SelectedValue, max_tables = [txtBoxMaxTables].Text, notes = [txtBoxNotes].Text, status = [cmbStatus].SelectedValue, updated_at = NOW() WHERE hall_id = [selected_hall_id]" via updateHall(). If SQL execution fails: System calls displayErrorMessage("Failed to update hall. Please try again.") (Refer to MSG 42) and use case ends. System displays success message "Hall updated successfully." (Refer to MSG 12) and reloads halls list via reloadHallsList(). (Refer to "Hall" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                                             |

##### 2.1.3.4 Delete Hall

###### _Use Case Description_

This use case allows staff and administrators to delete hall records from the system. The system checks for referenced bookings and prevents deletion if the hall has existing bookings, requiring user confirmation before deletion.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to delete halls
- Target hall exists in the system

###### _Postconditions_

- Hall is deleted from database (if no referenced data)
- Hall is removed from halls list

(Refer to "Activity Delete Hall" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :----------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(5), (5.1), (5.2)_      | _BR61_  | **Validation Rules:** When user selects hall and clicks delete, system queries referenced data with SQL: "SELECT COUNT(\*) FROM Booking WHERE hall_id = [selected_hall_id]". If COUNT > 0: System calls displayErrorMessage("Cannot delete hall. Hall has [COUNT] associated booking(s).") (Refer to MSG 44) and use case ends at step (5.2).                                                                                             |
| _(6), (7), (7.1), (7.2)_ | _BR62_  | **Displaying Rules:** System displays confirmation dialog via displayConfirmationDialog() with message "Are you sure you want to delete hall '[hall_name]'? This action cannot be undone.". If user clicks [btnCancel]: System closes dialog via closeDialog() and use case ends at step (7.2).                                                                                                                                           |
| _(8), (9)_               | _BR63_  | **Querying Rules:** System executes SQL DELETE: "DELETE FROM Hall WHERE hall_id = [selected_hall_id]" via deleteHall(). If SQL execution fails: System calls displayErrorMessage("Failed to delete hall. Please try again.") (Refer to MSG 45) and use case ends. System displays success message "Hall deleted successfully." (Refer to MSG 30) and reloads halls list via reloadHallsList(). (Refer to "Hall" table in "DB Sheet" file) |

##### 2.1.3.5 Export Halls to Excel

###### _Use Case Description_

This use case allows staff and administrators to export the current list of halls (with applied filters) to an Excel file for reporting and analysis purposes.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to export halls data

###### _Postconditions_

- Excel file containing halls data is generated and downloaded
- User can open and view the exported data

(Refer to "Activity Export Halls to Excel" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity            | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(6), (6.1), (6.2)_ | _BR64_  | **Validation Rules:** When user clicks [btnExport], system queries halls data with current filter criteria using same SQL as search operation. If result COUNT = 0: System calls displayErrorMessage("No data to export.") (Refer to MSG 68) and use case ends at step (6.2).                                                                                                                                                                                                                                                               |
| _(7), (8), (9)_     | _BR65_  | **Querying Rules:** System generates Excel file using library (e.g., Apache POI, ExcelJS) with columns: Hall ID, Hall Name, Hall Type, Max Tables, Status, Created Date. System creates filename with timestamp format "Halls_Export_YYYYMMDD_HHMMSS.xlsx" via generateExportFilename(). System sets HTTP headers: Content-Type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Content-Disposition = "attachment; filename=[generated_filename]". System sends file to browser for download via sendFileResponse(). |

##### 2.1.3.6 View Hall Type Details

###### _Use Case Description_

This use case allows staff and administrators to view the list of all hall types in the system with search capabilities, and view detailed information of any selected hall type including the count of halls using this type.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to view hall types

###### _Postconditions_

- Hall types list is displayed with search results
- Selected hall type's detailed information is shown

(Refer to "Activity View Hall Type Details" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity   | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :--------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2)_      | _BR66_  | **Loading Screen Rules:** System loads "Hall Type Management" screen via displayHallTypesList() with components: [gridHallTypes] data grid showing columns (type_id, type_name, min_table_price, halls_count, status), [txtBoxSearch] for search input, [btnSearch] button, [btnAddNew] button, [btnExport] button. System queries all hall types with SQL: "SELECT ht.type_id, ht.type_name, ht.min_table_price, ht.status, COUNT(h.hall_id) AS halls_count FROM Hall_Type ht LEFT JOIN Hall h ON ht.type_id = h.type_id GROUP BY ht.type_id ORDER BY ht.created_at DESC" and populates grid. (Refer to "Hall Type Management" view in "View Description" file) |
| _(5), (6)_ | _BR67_  | **Querying Rules:** When user enters search keyword in [txtBoxSearch] and clicks [btnSearch], system queries hall types with SQL: "SELECT ht.type_id, ht.type_name, ht.min_table_price, ht.status, COUNT(h.hall_id) AS halls_count FROM Hall_Type ht LEFT JOIN Hall h ON ht.type_id = h.type_id WHERE ht.type_name LIKE '%[search]%' GROUP BY ht.type_id ORDER BY ht.created_at DESC" and refreshes [gridHallTypes] via refreshHallTypesList().                                                                                                                                                                                                                  |
| _(8), (9)_ | _BR68_  | **Querying Rules:** When user selects a hall type from [gridHallTypes] and clicks view details, system queries hall type details with SQL: "SELECT ht.type_id, ht.type_name, ht.min_table_price, ht.status, ht.created_at, COUNT(h.hall_id) AS halls_count FROM Hall_Type ht LEFT JOIN Hall h ON ht.type_id = h.type_id WHERE ht.type_id = [selected_type_id] GROUP BY ht.type_id". System displays modal dialog via displayHallTypeDetailsDialog() showing hall type information. (Refer to "Hall_Type" and "Hall" tables in "DB Sheet" file)                                                                                                                   |

##### 2.1.3.7 Add New Hall Type

###### _Use Case Description_

This use case allows staff and administrators to create new hall type records in the system. The system validates all inputs, ensures hall type name uniqueness, and creates the hall type record with minimum table price.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to add hall types

###### _Postconditions_

- New hall type is created in database
- Hall type appears in the hall types list

(Refer to "Activity Add New Hall Type" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :---------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2)_             | _BR69_  | **Loading Screen Rules:** System loads "Add New Hall Type" form via displayAddHallTypeForm() with fields: [txtBoxTypeName] for hall type name, [txtBoxMinTablePrice] for minimum table price (numeric), [btnSave] button, [btnCancel] button. (Refer to "Add Hall Type" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| _(5), (6), (6.1)_ | _BR70_  | **Validation Rules:** When user clicks [btnSave], system validates all inputs. System checks: If [txtBoxTypeName].Text.isEmpty() OR [txtBoxMinTablePrice].Text.isEmpty(): System calls displayErrorMessage("Hall type name and minimum table price are required.") (Refer to MSG 69) and returns to step (3). System validates type name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Hall type name must be 3-100 characters.") (Refer to MSG 70) and returns to step (3). System validates min table price is positive number with regex "^\\d+(\\.\\d{1,2})?$" and value > 0. If invalid: System calls displayErrorMessage("Minimum table price must be a positive number.") (Refer to MSG 20) and returns to step (3). System queries to check type name uniqueness: "SELECT COUNT(\*) FROM Hall_Type WHERE type_name = [txtBoxTypeName].Text". If COUNT > 0: System calls displayErrorMessage("Hall type name already exists.") (Refer to MSG 21) and returns to step (3). |
| _(7), (8)_        | _BR71_  | **Querying Rules:** System executes SQL INSERT: "INSERT INTO Hall_Type (type_name, min_table_price, status, created_at) VALUES ([txtBoxTypeName].Text, [txtBoxMinTablePrice].Text, 'active', NOW())" via createHallType(). If SQL execution fails: System calls displayErrorMessage("Failed to create hall type. Please try again.") (Refer to MSG 49) and use case ends. System displays success message "Hall type created successfully." (Refer to MSG 50) and redirects to hall types list via redirectToHallTypesList(). (Refer to "Hall_Type" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

##### 2.1.3.8 Edit Hall Type

###### _Use Case Description_

This use case allows staff and administrators to modify existing hall type information including type name and minimum table price. The system validates inputs and ensures name uniqueness before updating.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to edit hall types
- Target hall type exists in the system

###### _Postconditions_

- Hall type information is updated in database
- Updated hall type data is reflected in the hall types list

(Refer to "Activity Edit Hall Type" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity     | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :----------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(4), (5)_   | _BR72_  | **Loading Screen Rules:** When user selects hall type to edit, system queries hall type details with SQL: "SELECT type_id, type_name, min_table_price, status FROM Hall_Type WHERE type_id = [selected_type_id]". System displays "Edit Hall Type" form via displayEditHallTypeForm() with fields populated: [txtBoxTypeName], [txtBoxMinTablePrice], [cmbStatus] dropdown (Active/Inactive). (Refer to "Edit Hall Type" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| _(8), (8.1)_ | _BR73_  | **Validation Rules:** When user clicks [btnSave], system validates inputs. System checks: If [txtBoxTypeName].Text.isEmpty() OR [txtBoxMinTablePrice].Text.isEmpty(): System calls displayErrorMessage("Hall type name and minimum table price are required.") (Refer to MSG 69) and returns to step (6). System validates type name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Hall type name must be 3-100 characters.") (Refer to MSG 70) and returns to step (6). System validates min table price is positive number with regex "^\\d+(\\.\\d{1,2})?$" and value > 0. If invalid: System calls displayErrorMessage("Minimum table price must be a positive number.") (Refer to MSG 20) and returns to step (6). System queries to check type name uniqueness excluding current type: "SELECT COUNT(\*) FROM Hall_Type WHERE type_name = [txtBoxTypeName].Text AND type_id != [current_type_id]". If COUNT > 0: System calls displayErrorMessage("Hall type name already exists.") (Refer to MSG 21) and returns to step (6). |
| _(9), (10)_  | _BR74_  | **Querying Rules:** System executes SQL UPDATE: "UPDATE Hall_Type SET type_name = [txtBoxTypeName].Text, min_table_price = [txtBoxMinTablePrice].Text, status = [cmbStatus].SelectedValue, updated_at = NOW() WHERE type_id = [selected_type_id]" via updateHallType(). If SQL execution fails: System calls displayErrorMessage("Failed to update hall type. Please try again.") (Refer to MSG 51) and use case ends. System displays success message "Hall type updated successfully." (Refer to MSG 52) and reloads hall types list via reloadHallTypesList(). (Refer to "Hall_Type" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

##### 2.1.3.9 Delete Hall Type

###### _Use Case Description_

This use case allows staff and administrators to delete hall type records from the system. The system checks for referenced halls and prevents deletion if any halls are using this type, requiring user confirmation before deletion.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to delete hall types
- Target hall type exists in the system

###### _Postconditions_

- Hall type is deleted from database (if no referenced data)
- Hall type is removed from hall types list

(Refer to "Activity Delete Hall Type" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :----------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(5), (5.1), (5.2)_      | _BR75_  | **Validation Rules:** When user selects hall type and clicks delete, system queries referenced data with SQL: "SELECT COUNT(\*) FROM Hall WHERE type_id = [selected_type_id]". If COUNT > 0: System calls displayErrorMessage("Cannot delete hall type. [COUNT] hall(s) are using this type.") (Refer to MSG 53) and use case ends at step (5.2).                                                                                                                          |
| _(6), (7), (7.1), (7.2)_ | _BR76_  | **Displaying Rules:** System displays confirmation dialog via displayConfirmationDialog() with message "Are you sure you want to delete hall type '[type_name]'? This action cannot be undone.". If user clicks [btnCancel]: System closes dialog via closeDialog() and use case ends at step (7.2).                                                                                                                                                                       |
| _(8), (9)_               | _BR77_  | **Querying Rules:** System executes SQL DELETE: "DELETE FROM Hall_Type WHERE type_id = [selected_type_id]" via deleteHallType(). If SQL execution fails: System calls displayErrorMessage("Failed to delete hall type. Please try again.") (Refer to MSG 33) and use case ends. System displays success message "Hall type deleted successfully." (Refer to MSG 34) and reloads hall types list via reloadHallTypesList(). (Refer to "Hall_Type" table in "DB Sheet" file) |

##### 2.1.3.10 Export Hall Types to Excel

###### _Use Case Description_

This use case allows staff and administrators to export the current list of hall types (with applied filters) to an Excel file for reporting and analysis purposes.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to export hall types data

###### _Postconditions_

- Excel file containing hall types data is generated and downloaded
- User can open and view the exported data

(Refer to "Activity Export Hall Types to Excel" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity            | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :------------------ | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(6), (6.1), (6.2)_ | _BR78_  | **Validation Rules:** When user clicks [btnExport], system queries hall types data with current filter criteria using same SQL as search operation. If result COUNT = 0: System calls displayErrorMessage("No data to export.") (Refer to MSG 68) and use case ends at step (6.2).                                                                                                                                                                                                                                                                     |
| _(7), (8), (9)_     | _BR79_  | **Querying Rules:** System generates Excel file using library (e.g., Apache POI, ExcelJS) with columns: Type ID, Type Name, Min Table Price, Halls Count, Status, Created Date. System creates filename with timestamp format "HallTypes_Export_YYYYMMDD_HHMMSS.xlsx" via generateExportFilename(). System sets HTTP headers: Content-Type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Content-Disposition = "attachment; filename=[generated_filename]". System sends file to browser for download via sendFileResponse(). |

##### 2.1.3.11 View Dish Details

###### _Use Case Description_

This use case allows staff and administrators to view the list of all dishes in the menu with search capabilities, and view detailed information of any selected dish.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to view dishes

###### _Postconditions_

- Dishes list is displayed with search results
- Selected dish's detailed information is shown

(Refer to "Activity View Dish Details" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity   | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :--------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2)_      | _BR80_  | **Loading Screen Rules:** System loads "Dish Management" screen via displayDishList() with components: [gridDishes] data grid showing columns (dish_id, dish_name, price, status), [txtBoxSearch] for search input, [btnSearch] button, [btnAddNew] button, [btnExport] button. System queries all dishes with SQL: "SELECT dish_id, dish_name, price, status FROM Dish ORDER BY created_at DESC" and populates grid. (Refer to "Dish Management" view in "View Description" file) |
| _(5), (6)_ | _BR81_  | **Querying Rules:** When user enters search keyword in [txtBoxSearch] and clicks [btnSearch], system queries dishes with SQL: "SELECT dish_id, dish_name, price, status FROM Dish WHERE dish_name LIKE '%[search]%' ORDER BY created_at DESC" and refreshes [gridDishes] via refreshDishList().                                                                                                                                                                                    |
| _(8), (9)_ | _BR82_  | **Querying Rules:** When user selects a dish from [gridDishes] and clicks view details, system queries dish details with SQL: "SELECT dish_id, dish_name, price, notes, status, created_at FROM Dish WHERE dish_id = [selected_dish_id]". System displays modal dialog via displayDishDetailsDialog() showing dish information. (Refer to "Dish" table in "DB Sheet" file)                                                                                                         |

##### 2.1.3.12 Add New Dish

###### _Use Case Description_

This use case allows staff and administrators to create new dish records in the menu. The system validates all inputs, ensures dish name uniqueness, and creates the dish record with price and optional notes.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to add dishes

###### _Postconditions_

- New dish is created in database
- Dish appears in the dishes list

(Refer to "Activity Add New Dish" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :---------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2)_             | _BR83_  | **Loading Screen Rules:** System loads "Add New Dish" form via displayAddDishForm() with fields: [txtBoxDishName] for dish name, [txtBoxPrice] for price (numeric), [txtBoxNotes] for optional notes, [btnSave] button, [btnCancel] button. (Refer to "Add Dish" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| _(5), (6), (6.1)_ | _BR84_  | **Validation Rules:** When user clicks [btnSave], system validates all inputs. System checks: If [txtBoxDishName].Text.isEmpty() OR [txtBoxPrice].Text.isEmpty(): System calls displayErrorMessage("Dish name and price are required.") (Refer to MSG 35) and returns to step (3). System validates dish name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Dish name must be 3-100 characters.") (Refer to MSG 22) and returns to step (3). System validates price is positive number with regex "^\\d+(\\.\\d{1,2})?$" and value > 0. If invalid: System calls displayErrorMessage("Price must be a positive number.") (Refer to MSG 37) and returns to step (3). System queries to check dish name uniqueness: "SELECT COUNT(\*) FROM Dish WHERE dish_name = [txtBoxDishName].Text". If COUNT > 0: System calls displayErrorMessage("Dish name already exists.") (Refer to MSG 18) and returns to step (3). |
| _(7), (8)_        | _BR85_  | **Querying Rules:** System executes SQL INSERT: "INSERT INTO Dish (dish_name, price, notes, status, created_at) VALUES ([txtBoxDishName].Text, [txtBoxPrice].Text, [txtBoxNotes].Text, 'active', NOW())" via createDish(). If SQL execution fails: System calls displayErrorMessage("Failed to create dish. Please try again.") (Refer to MSG 39) and use case ends. System displays success message "Dish created successfully." (Refer to MSG 40) and redirects to dishes list via redirectToDishList(). (Refer to "Dish" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                           |

##### 2.1.3.13 Edit Dish

###### _Use Case Description_

This use case allows staff and administrators to modify existing dish information including dish name, price, and notes. The system validates inputs and ensures name uniqueness before updating.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to edit dishes
- Target dish exists in the system

###### _Postconditions_

- Dish information is updated in database
- Updated dish data is reflected in the dishes list

(Refer to "Activity Edit Dish" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity     | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :----------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(4), (5)_   | _BR86_  | **Loading Screen Rules:** When user selects dish to edit, system queries dish details with SQL: "SELECT dish_id, dish_name, price, notes, status FROM Dish WHERE dish_id = [selected_dish_id]". System displays "Edit Dish" form via displayEditDishForm() with fields populated: [txtBoxDishName], [txtBoxPrice], [txtBoxNotes], [cmbStatus] dropdown (Active/Inactive). (Refer to "Edit Dish" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| _(8), (8.1)_ | _BR87_  | **Validation Rules:** When user clicks [btnSave], system validates inputs. System checks: If [txtBoxDishName].Text.isEmpty() OR [txtBoxPrice].Text.isEmpty(): System calls displayErrorMessage("Dish name and price are required.") (Refer to MSG 35) and returns to step (6). System validates dish name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Dish name must be 3-100 characters.") (Refer to MSG 22) and returns to step (6). System validates price is positive number with regex "^\\d+(\\.\\d{1,2})?$" and value > 0. If invalid: System calls displayErrorMessage("Price must be a positive number.") (Refer to MSG 37) and returns to step (6). System queries to check dish name uniqueness excluding current dish: "SELECT COUNT(\*) FROM Dish WHERE dish_name = [txtBoxDishName].Text AND dish_id != [current_dish_id]". If COUNT > 0: System calls displayErrorMessage("Dish name already exists.") (Refer to MSG 18) and returns to step (6). |
| _(9), (10)_  | _BR88_  | **Querying Rules:** System executes SQL UPDATE: "UPDATE Dish SET dish_name = [txtBoxDishName].Text, price = [txtBoxPrice].Text, notes = [txtBoxNotes].Text, status = [cmbStatus].SelectedValue, updated_at = NOW() WHERE dish_id = [selected_dish_id]" via updateDish(). If SQL execution fails: System calls displayErrorMessage("Failed to update dish. Please try again.") (Refer to MSG 41) and use case ends. System displays success message "Dish updated successfully." (Refer to MSG 87) and reloads dishes list via reloadDishList(). (Refer to "Dish" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                                          |

##### 2.1.3.14 Delete Dish

###### _Use Case Description_

This use case allows staff and administrators to delete dish records from the system. The system checks for referenced menu items and prevents deletion if any menus are using this dish, requiring user confirmation before deletion.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to delete dishes
- Target dish exists in the system

###### _Postconditions_

- Dish is deleted from database (if no referenced data)
- Dish is removed from dishes list

(Refer to "Activity Delete Dish" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :----------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(5), (5.1), (5.2)_      | _BR89_  | **Validation Rules:** When user selects dish and clicks delete, system queries referenced data with SQL: "SELECT COUNT(\*) FROM Menu_Item WHERE dish_id = [selected_dish_id]". If COUNT > 0: System calls displayErrorMessage("Cannot delete dish. This dish is used in [COUNT] menu item(s).") (Refer to MSG 88) and use case ends at step (5.2).                                                                                        |
| _(6), (7), (7.1), (7.2)_ | _BR90_  | **Displaying Rules:** System displays confirmation dialog via displayConfirmationDialog() with message "Are you sure you want to delete dish '[dish_name]'? This action cannot be undone.". If user clicks [btnCancel]: System closes dialog via closeDialog() and use case ends at step (7.2).                                                                                                                                           |
| _(8), (9)_               | _BR91_  | **Querying Rules:** System executes SQL DELETE: "DELETE FROM Dish WHERE dish_id = [selected_dish_id]" via deleteDish(). If SQL execution fails: System calls displayErrorMessage("Failed to delete dish. Please try again.") (Refer to MSG 89) and use case ends. System displays success message "Dish deleted successfully." (Refer to MSG 90) and reloads dishes list via reloadDishList(). (Refer to "Dish" table in "DB Sheet" file) |

##### 2.1.3.15 Export Dishes to Excel

###### _Use Case Description_

This use case allows staff and administrators to export the current list of dishes (with applied filters) to an Excel file for reporting and analysis purposes.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to export dishes data

###### _Postconditions_

- Excel file containing dishes data is generated and downloaded
- User can open and view the exported data

(Refer to "Activity Export Dishes to Excel" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity            | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :------------------ | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(6), (6.1), (6.2)_ | _BR92_  | **Validation Rules:** When user clicks [btnExport], system queries dishes data with current filter criteria using same SQL as search operation. If result COUNT = 0: System calls displayErrorMessage("No data to export.") (Refer to MSG 68) and use case ends at step (6.2).                                                                                                                                                                                                                                               |
| _(7), (8), (9)_     | _BR93_  | **Querying Rules:** System generates Excel file using library (e.g., Apache POI, ExcelJS) with columns: Dish ID, Dish Name, Price, Status, Created Date. System creates filename with timestamp format "Dishes_Export_YYYYMMDD_HHMMSS.xlsx" via generateExportFilename(). System sets HTTP headers: Content-Type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Content-Disposition = "attachment; filename=[generated_filename]". System sends file to browser for download via sendFileResponse(). |

##### 2.1.3.16 View Service Details

###### _Use Case Description_

This use case allows staff and administrators to view the list of all services available in the system with search capabilities, and view detailed information of any selected service.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to view services

###### _Postconditions_

- Services list is displayed with search results
- Selected service's detailed information is shown

(Refer to "Activity View Service Details" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity   | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :--------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2)_      | _BR94_  | **Loading Screen Rules:** System loads "Service Management" screen via displayServiceList() with components: [gridServices] data grid showing columns (service_id, service_name, price, status), [txtBoxSearch] for search input, [btnSearch] button, [btnAddNew] button, [btnExport] button. System queries all services with SQL: "SELECT service_id, service_name, price, status FROM Service ORDER BY created_at DESC" and populates grid. (Refer to "Service Management" view in "View Description" file) |
| _(5), (6)_ | _BR95_  | **Querying Rules:** When user enters search keyword in [txtBoxSearch] and clicks [btnSearch], system queries services with SQL: "SELECT service_id, service_name, price, status FROM Service WHERE service_name LIKE '%[search]%' ORDER BY created_at DESC" and refreshes [gridServices] via refreshServiceList().                                                                                                                                                                                             |
| _(8), (9)_ | _BR96_  | **Querying Rules:** When user selects a service from [gridServices] and clicks view details, system queries service details with SQL: "SELECT service_id, service_name, price, notes, status, created_at FROM Service WHERE service_id = [selected_service_id]". System displays modal dialog via displayServiceDetailsDialog() showing service information. (Refer to "Service" table in "DB Sheet" file)                                                                                                     |

##### 2.1.3.17 Add New Service

###### _Use Case Description_

This use case allows staff and administrators to create new service records in the system. The system validates all inputs, ensures service name uniqueness, and creates the service record with price and optional notes.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to add services

###### _Postconditions_

- New service is created in database
- Service appears in the services list

(Refer to "Activity Add New Service" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :---------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2)_             | _BR97_  | **Loading Screen Rules:** System loads "Add New Service" form via displayAddServiceForm() with fields: [txtBoxServiceName] for service name, [txtBoxPrice] for price (numeric), [txtBoxNotes] for optional notes, [btnSave] button, [btnCancel] button. (Refer to "Add Service" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| _(5), (6), (6.1)_ | _BR98_  | **Validation Rules:** When user clicks [btnSave], system validates all inputs. System checks: If [txtBoxServiceName].Text.isEmpty() OR [txtBoxPrice].Text.isEmpty(): System calls displayErrorMessage("Service name and price are required.") (Refer to MSG 42) and returns to step (3). System validates service name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Service name must be 3-100 characters.") (Refer to MSG 12) and returns to step (3). System validates price is positive number with regex "^\\d+(\\.\\d{1,2})?$" and value > 0. If invalid: System calls displayErrorMessage("Price must be a positive number.") (Refer to MSG 44) and returns to step (3). System queries to check service name uniqueness: "SELECT COUNT(\*) FROM Service WHERE service_name = [txtBoxServiceName].Text". If COUNT > 0: System calls displayErrorMessage("Service name already exists.") (Refer to MSG 45) and returns to step (3). |
| _(7), (8)_        | _BR99_  | **Querying Rules:** System executes SQL INSERT: "INSERT INTO Service (service_name, price, notes, status, created_at) VALUES ([txtBoxServiceName].Text, [txtBoxPrice].Text, [txtBoxNotes].Text, 'active', NOW())" via createService(). If SQL execution fails: System calls displayErrorMessage("Failed to create service. Please try again.") (Refer to MSG 30) and use case ends. System displays success message "Service created successfully." (Refer to MSG 68) and redirects to services list via redirectToServiceList(). (Refer to "Service" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                            |

##### 2.1.3.18 Edit Service

###### _Use Case Description_

This use case allows staff and administrators to modify existing service information including service name, price, and notes. The system validates inputs and ensures name uniqueness before updating.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to edit services
- Target service exists in the system

###### _Postconditions_

- Service information is updated in database
- Updated service data is reflected in the services list

(Refer to "Activity Edit Service" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity     | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :----------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(4), (5)_   | _BR100_ | **Loading Screen Rules:** When user selects service to edit, system queries service details with SQL: "SELECT service_id, service_name, price, notes, status FROM Service WHERE service_id = [selected_service_id]". System displays "Edit Service" form via displayEditServiceForm() with fields populated: [txtBoxServiceName], [txtBoxPrice], [txtBoxNotes], [cmbStatus] dropdown (Active/Inactive). (Refer to "Edit Service" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| _(8), (8.1)_ | _BR101_ | **Validation Rules:** When user clicks [btnSave], system validates inputs. System checks: If [txtBoxServiceName].Text.isEmpty() OR [txtBoxPrice].Text.isEmpty(): System calls displayErrorMessage("Service name and price are required.") (Refer to MSG 42) and returns to step (6). System validates service name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Service name must be 3-100 characters.") (Refer to MSG 12) and returns to step (6). System validates price is positive number with regex "^\\d+(\\.\\d{1,2})?$" and value > 0. If invalid: System calls displayErrorMessage("Price must be a positive number.") (Refer to MSG 44) and returns to step (6). System queries to check service name uniqueness excluding current service: "SELECT COUNT(\*) FROM Service WHERE service_name = [txtBoxServiceName].Text AND service_id != [current_service_id]". If COUNT > 0: System calls displayErrorMessage("Service name already exists.") (Refer to MSG 45) and returns to step (6). |
| _(9), (10)_  | _BR102_ | **Querying Rules:** System executes SQL UPDATE: "UPDATE Service SET service_name = [txtBoxServiceName].Text, price = [txtBoxPrice].Text, notes = [txtBoxNotes].Text, status = [cmbStatus].SelectedValue, updated_at = NOW() WHERE service_id = [selected_service_id]" via updateService(). If SQL execution fails: System calls displayErrorMessage("Failed to update service. Please try again.") (Refer to MSG 69) and use case ends. System displays success message "Service updated successfully." (Refer to MSG 70) and reloads services list via reloadServiceList(). (Refer to "Service" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                                              |

##### 2.1.3.19 Delete Service

###### _Use Case Description_

This use case allows staff and administrators to delete service records from the system. The system checks for referenced service details and prevents deletion if any bookings are using this service, requiring user confirmation before deletion.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to delete services
- Target service exists in the system

###### _Postconditions_

- Service is deleted from database (if no referenced data)
- Service is removed from services list

(Refer to "Activity Delete Service" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :----------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(5), (5.1), (5.2)_      | _BR103_ | **Validation Rules:** When user selects service and clicks delete, system queries referenced data with SQL: "SELECT COUNT(\*) FROM Service_Detail WHERE service_id = [selected_service_id]". If COUNT > 0: System calls displayErrorMessage("Cannot delete service. This service is used in [COUNT] booking(s).") (Refer to MSG 20) and use case ends at step (5.2).                                                                                                |
| _(6), (7), (7.1), (7.2)_ | _BR104_ | **Displaying Rules:** System displays confirmation dialog via displayConfirmationDialog() with message "Are you sure you want to delete service '[service_name]'? This action cannot be undone.". If user clicks [btnCancel]: System closes dialog via closeDialog() and use case ends at step (7.2).                                                                                                                                                               |
| _(8), (9)_               | _BR105_ | **Querying Rules:** System executes SQL DELETE: "DELETE FROM Service WHERE service_id = [selected_service_id]" via deleteService(). If SQL execution fails: System calls displayErrorMessage("Failed to delete service. Please try again.") (Refer to MSG 21) and use case ends. System displays success message "Service deleted successfully." (Refer to MSG 49) and reloads services list via reloadServiceList(). (Refer to "Service" table in "DB Sheet" file) |

##### 2.1.3.20 Export Services to Excel

###### _Use Case Description_

This use case allows staff and administrators to export the current list of services (with applied filters) to an Excel file for reporting and analysis purposes.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to export services data

###### _Postconditions_

- Excel file containing services data is generated and downloaded
- User can open and view the exported data

(Refer to "Activity Export Services to Excel" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity            | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :------------------ | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(6), (6.1), (6.2)_ | _BR106_ | **Validation Rules:** When user clicks [btnExport], system queries services data with current filter criteria using same SQL as search operation. If result COUNT = 0: System calls displayErrorMessage("No data to export.") (Refer to MSG 68) and use case ends at step (6.2).                                                                                                                                                                                                                                                     |
| _(7), (8), (9)_     | _BR107_ | **Querying Rules:** System generates Excel file using library (e.g., Apache POI, ExcelJS) with columns: Service ID, Service Name, Price, Status, Created Date. System creates filename with timestamp format "Services_Export_YYYYMMDD_HHMMSS.xlsx" via generateExportFilename(). System sets HTTP headers: Content-Type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Content-Disposition = "attachment; filename=[generated_filename]". System sends file to browser for download via sendFileResponse(). |

##### 2.1.3.21 View Shift Details

###### _Use Case Description_

This use case allows staff and administrators to view the list of all work shifts in the system with search capabilities, and view detailed information of any selected shift.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to view shifts

###### _Postconditions_

- Shifts list is displayed with search results
- Selected shift's detailed information is shown

(Refer to "Activity View Shift Details" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity   | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :--------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2)_      | _BR108_ | **Loading Screen Rules:** System loads "Shift Management" screen via displayShiftList() with components: [gridShifts] data grid showing columns (shift_id, shift_name, start_time, end_time, status), [txtBoxSearch] for search input, [btnSearch] button, [btnAddNew] button, [btnExport] button. System queries all shifts with SQL: "SELECT shift_id, shift_name, start_time, end_time, status FROM Shift ORDER BY start_time ASC" and populates grid. (Refer to "Shift Management" view in "View Description" file) |
| _(5), (6)_ | _BR109_ | **Querying Rules:** When user enters search keyword in [txtBoxSearch] and clicks [btnSearch], system queries shifts with SQL: "SELECT shift_id, shift_name, start_time, end_time, status FROM Shift WHERE shift_name LIKE '%[search]%' ORDER BY start_time ASC" and refreshes [gridShifts] via refreshShiftList().                                                                                                                                                                                                      |
| _(8), (9)_ | _BR110_ | **Querying Rules:** When user selects a shift from [gridShifts] and clicks view details, system queries shift details with SQL: "SELECT shift_id, shift_name, start_time, end_time, status, created_at FROM Shift WHERE shift_id = [selected_shift_id]". System displays modal dialog via displayShiftDetailsDialog() showing shift information. (Refer to "Shift" table in "DB Sheet" file)                                                                                                                            |

##### 2.1.3.22 Add New Shift

###### _Use Case Description_

This use case allows staff and administrators to create new shift records in the system. The system validates all inputs including time range validation, ensures shift name uniqueness, and creates the shift record.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to add shifts

###### _Postconditions_

- New shift is created in database
- Shift appears in the shifts list

(Refer to "Activity Add New Shift" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :---------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2)_             | _BR111_ | **Loading Screen Rules:** System loads "Add New Shift" form via displayAddShiftForm() with fields: [txtBoxShiftName] for shift name, [timePickerStart] for start time, [timePickerEnd] for end time, [btnSave] button, [btnCancel] button. (Refer to "Add Shift" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| _(5), (6), (6.1)_ | _BR112_ | **Validation Rules:** When user clicks [btnSave], system validates all inputs. System checks: If [txtBoxShiftName].Text.isEmpty() OR [timePickerStart].Value.isEmpty() OR [timePickerEnd].Value.isEmpty(): System calls displayErrorMessage("Shift name, start time, and end time are required.") (Refer to MSG 50) and returns to step (3). System validates shift name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Shift name must be 3-100 characters.") (Refer to MSG 103) and returns to step (3). System validates start time is before end time. If [timePickerStart].Value >= [timePickerEnd].Value: System calls displayErrorMessage("Start time must be before end time.") (Refer to MSG 104) and returns to step (3). System queries to check shift name uniqueness: "SELECT COUNT(\*) FROM Shift WHERE shift_name = [txtBoxShiftName].Text". If COUNT > 0: System calls displayErrorMessage("Shift name already exists.") (Refer to MSG 105) and returns to step (3). |
| _(7), (8)_        | _BR113_ | **Querying Rules:** System executes SQL INSERT: "INSERT INTO Shift (shift_name, start_time, end_time, status, created_at) VALUES ([txtBoxShiftName].Text, [timePickerStart].Value, [timePickerEnd].Value, 'active', NOW())" via createShift(). If SQL execution fails: System calls displayErrorMessage("Failed to create shift. Please try again.") (Refer to MSG 106) and use case ends. System displays success message "Shift created successfully." (Refer to MSG 51) and redirects to shifts list via redirectToShiftList(). (Refer to "Shift" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

##### 2.1.3.23 Edit Shift

###### _Use Case Description_

This use case allows staff and administrators to modify existing shift information including shift name, start time, and end time. The system validates inputs including time range and ensures name uniqueness before updating.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to edit shifts
- Target shift exists in the system

###### _Postconditions_

- Shift information is updated in database
- Updated shift data is reflected in the shifts list

(Refer to "Activity Edit Shift" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity     | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :----------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(4), (5)_   | _BR114_ | **Loading Screen Rules:** When user selects shift to edit, system queries shift details with SQL: "SELECT shift_id, shift_name, start_time, end_time, status FROM Shift WHERE shift_id = [selected_shift_id]". System displays "Edit Shift" form via displayEditShiftForm() with fields populated: [txtBoxShiftName], [timePickerStart], [timePickerEnd], [cmbStatus] dropdown (Active/Inactive). (Refer to "Edit Shift" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| _(8), (8.1)_ | _BR115_ | **Validation Rules:** When user clicks [btnSave], system validates inputs. System checks: If [txtBoxShiftName].Text.isEmpty() OR [timePickerStart].Value.isEmpty() OR [timePickerEnd].Value.isEmpty(): System calls displayErrorMessage("Shift name, start time, and end time are required.") (Refer to MSG 50) and returns to step (6). System validates shift name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Shift name must be 3-100 characters.") (Refer to MSG 103) and returns to step (6). System validates start time is before end time. If [timePickerStart].Value >= [timePickerEnd].Value: System calls displayErrorMessage("Start time must be before end time.") (Refer to MSG 104) and returns to step (6). System queries to check shift name uniqueness excluding current shift: "SELECT COUNT(\*) FROM Shift WHERE shift_name = [txtBoxShiftName].Text AND shift_id != [current_shift_id]". If COUNT > 0: System calls displayErrorMessage("Shift name already exists.") (Refer to MSG 105) and returns to step (6). |
| _(9), (10)_  | _BR116_ | **Querying Rules:** System executes SQL UPDATE: "UPDATE Shift SET shift_name = [txtBoxShiftName].Text, start_time = [timePickerStart].Value, end_time = [timePickerEnd].Value, status = [cmbStatus].SelectedValue, updated_at = NOW() WHERE shift_id = [selected_shift_id]" via updateShift(). If SQL execution fails: System calls displayErrorMessage("Failed to update shift. Please try again.") (Refer to MSG 52) and use case ends. System displays success message "Shift updated successfully." (Refer to MSG 53) and reloads shifts list via reloadShiftList(). (Refer to "Shift" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

##### 2.1.3.24 Delete Shift

###### _Use Case Description_

This use case allows staff and administrators to delete shift records from the system. The system checks for referenced bookings and prevents deletion if any bookings are using this shift, requiring user confirmation before deletion.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to delete shifts
- Target shift exists in the system

###### _Postconditions_

- Shift is deleted from database (if no referenced data)
- Shift is removed from shifts list

(Refer to "Activity Delete Shift" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :----------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(5), (5.1), (5.2)_      | _BR117_ | **Validation Rules:** When user selects shift and clicks delete, system queries referenced data with SQL: "SELECT COUNT(\*) FROM Booking WHERE shift_id = [selected_shift_id]". If COUNT > 0: System calls displayErrorMessage("Cannot delete shift. This shift is used in [COUNT] booking(s).") (Refer to MSG 33) and use case ends at step (5.2).                                                                                                |
| _(6), (7), (7.1), (7.2)_ | _BR118_ | **Displaying Rules:** System displays confirmation dialog via displayConfirmationDialog() with message "Are you sure you want to delete shift '[shift_name]'? This action cannot be undone.". If user clicks [btnCancel]: System closes dialog via closeDialog() and use case ends at step (7.2).                                                                                                                                                  |
| _(8), (9)_               | _BR119_ | **Querying Rules:** System executes SQL DELETE: "DELETE FROM Shift WHERE shift_id = [selected_shift_id]" via deleteShift(). If SQL execution fails: System calls displayErrorMessage("Failed to delete shift. Please try again.") (Refer to MSG 34) and use case ends. System displays success message "Shift deleted successfully." (Refer to MSG 112) and reloads shifts list via reloadShiftList(). (Refer to "Shift" table in "DB Sheet" file) |

##### 2.1.3.25 Export Shifts to Excel

###### _Use Case Description_

This use case allows staff and administrators to export the current list of shifts (with applied filters) to an Excel file for reporting and analysis purposes.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to export shifts data

###### _Postconditions_

- Excel file containing shifts data is generated and downloaded
- User can open and view the exported data

(Refer to "Activity Export Shifts to Excel" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity            | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :------------------ | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(6), (6.1), (6.2)_ | _BR120_ | **Validation Rules:** When user clicks [btnExport], system queries shifts data with current filter criteria using same SQL as search operation. If result COUNT = 0: System calls displayErrorMessage("No data to export.") (Refer to MSG 68) and use case ends at step (6.2).                                                                                                                                                                                                                                                                |
| _(7), (8), (9)_     | _BR121_ | **Querying Rules:** System generates Excel file using library (e.g., Apache POI, ExcelJS) with columns: Shift ID, Shift Name, Start Time, End Time, Status, Created Date. System creates filename with timestamp format "Shifts_Export_YYYYMMDD_HHMMSS.xlsx" via generateExportFilename(). System sets HTTP headers: Content-Type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Content-Disposition = "attachment; filename=[generated_filename]". System sends file to browser for download via sendFileResponse(). |

#### 2.1.4 Customer Bookings Management

##### 2.1.4.1 Check Hall Availability

###### _Use Case Description_

This use case allows customers to search for available wedding halls based on their preferred date, shift, and hall type. The system checks existing bookings and displays available halls with detailed information to help customers make informed decisions.

###### _Actors_

- Customer

###### _Preconditions_

- User must be logged in as a customer with valid JWT access token

###### _Postconditions_

- Available halls are displayed based on search criteria
- Customer can view hall details and proceed to booking if desired

(Refer to "Activity Check Hall Availability" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :---------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2)_             | _BR122_ | **Loading Screen Rules:** System loads "Check Hall Availability" screen via displayHallAvailabilitySearch() with components: [datePickerWedding] for wedding date, [cmbShift] dropdown populated with active shifts from Shift table, [cmbHallType] dropdown populated with active hall types from Hall_Type table, [btnSearch] button. All dropdowns include "All" option as default. (Refer to "Hall Availability Search" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                 |
| _(7), (7.1)_      | _BR123_ | **Validation Rules:** When user clicks [btnSearch], system validates wedding date. System checks: If [datePickerWedding].Value <= CurrentDate: System calls displayErrorMessage("Date must be in future.") (Refer to MSG 35) and returns to step (3).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| _(8), (9), (9.1)_ | _BR124_ | **Querying Rules:** System queries available halls with SQL: "SELECT h.hall_id, h.hall_name, ht.type_name, h.max_tables, ht.min_table_price, h.notes FROM Hall h INNER JOIN Hall_Type ht ON h.type_id = ht.type_id WHERE h.status = 'active' AND h.hall_id NOT IN (SELECT hall_id FROM Booking WHERE wedding_date = [datePickerWedding].Value AND (shift_id = [cmbShift].SelectedValue OR [cmbShift].SelectedValue = 'All') AND status IN ('Pending', 'Approved'))". If [cmbHallType].SelectedValue != 'All': Add "AND h.type_id = [cmbHallType].SelectedValue". If result COUNT = 0: System calls displayNoResultsMessage("No available halls found. Try other dates or shifts.") (Refer to MSG 22) with suggestions panel showing alternative dates/shifts via displaySuggestionsPanel(), and use case ends at step (9.2). |
| _(10), (11)_      | _BR125_ | **Displaying Rules:** System displays available halls in [gridAvailableHalls] data grid showing columns (hall_name, type_name, max_tables, min_table_price, notes) via displayAvailableHalls(). Each row has [btnViewDetails] button to show hall details modal and [btnBookNow] button to navigate to booking form with pre-filled hall selection. (Refer to "Available Halls List" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                        |

##### 2.1.4.2 Submit Wedding Reservation

###### _Use Case Description_

This use case allows customers to submit a complete wedding reservation including basic information, wedding details, menu selection, and service selection. The system validates all inputs, checks hall availability, calculates costs, and creates the booking with all related records in a transaction.

###### _Actors_

- Customer

###### _Preconditions_

- User must be logged in as a customer with valid JWT access token

###### _Postconditions_

- New booking is created with status "Pending" awaiting staff approval
- Booking details including menu and services are saved
- Confirmation email is sent to customer
- Hall is reserved for the selected date and shift

(Refer to "Activity Submit Wedding Reservation" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :----------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(2)_                    | _BR126_ | **Loading Screen Rules:** System loads "Submit Wedding Reservation" form via displayBookingForm() with sections: [sectionBasicInfo] with fields [txtBoxGroomName], [txtBoxBrideName], [txtBoxPhone]; [sectionWeddingInfo] with [datePickerWedding], [cmbShift] dropdown from Shift table, [cmbHall] dropdown from Hall table filtered by available halls, [txtBoxTableCount], [txtBoxReserveTableCount]; [sectionMenu] with [gridDishes] showing available dishes from Dish table with quantity input; [sectionServices] with [gridServices] showing available services from Service table with quantity input; [lblTotalTableCost], [lblTotalServiceCost], [lblDepositAmount], [lblTotalInvoice], [lblRemainingAmount] for cost display; [btnSubmit], [btnCancel] buttons. System pre-fills [cmbShift] and [cmbHall] if customer came from UC 2.1.4.1. (Refer to "Wedding Reservation Form" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| _(9), (10), (11), (12)_  | _BR127_ | **Validation Rules:** When user clicks [btnSubmit], system validates all inputs. System checks: If [txtBoxGroomName].Text.isEmpty() OR [txtBoxBrideName].Text.isEmpty() OR [txtBoxPhone].Text.isEmpty() OR [datePickerWedding].Value.isEmpty() OR [cmbShift].SelectedValue.isEmpty() OR [cmbHall].SelectedValue.isEmpty() OR [txtBoxTableCount].Text.isEmpty(): System calls displayErrorMessage("All required fields must be filled.") (Refer to MSG 18) and returns to step (3). System validates phone format with regex "^\\d{10}$". If invalid: System calls displayErrorMessage("Phone must be 10 digits.") (Refer to MSG 8) and returns to step (3). System validates wedding date. If [datePickerWedding].Value <= CurrentDate: System calls displayErrorMessage("Wedding date must be in future.") (Refer to MSG 37) and returns to step (3). System queries hall capacity: "SELECT max_tables FROM Hall WHERE hall_id = [cmbHall].SelectedValue". If [txtBoxTableCount].Value > max_tables: System calls displayErrorMessage("Number of tables exceeds hall capacity of [max_tables] tables.") (Refer to MSG 18) and returns to step (3).                                                                                                                                                                                                                                                                                                                                                                                                           |
| _(13), (13.1), (13.2)_   | _BR128_ | **Validation Rules:** System re-checks hall availability with SQL: "SELECT COUNT(\*) FROM Booking WHERE hall_id = [cmbHall].SelectedValue AND wedding_date = [datePickerWedding].Value AND shift_id = [cmbShift].SelectedValue AND status IN ('Pending', 'Approved')". If COUNT > 0: System calls displayErrorMessage("Hall is no longer available for selected date and shift.") (Refer to MSG 39) and use case ends at step (13.2).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| _(14), (15), (16), (17)_ | _BR129_ | **Querying Rules:** System calculates costs: TongTienBan = [txtBoxTableCount].Value \* min_table_price (from Hall_Type), TongTienDV = SUM(selected services price \* quantity), TienDatCoc = (TongTienBan + TongTienDV) \* 0.3, TongTienHoaDon = TongTienBan + TongTienDV, TienConLai = TongTienHoaDon - TienDatCoc. System begins transaction via beginTransaction(). System executes SQL INSERT: "INSERT INTO Booking (user_id, hall_id, shift_id, wedding_date, groom_name, bride_name, phone, table_count, reserve_table_count, total_table_cost, total_service_cost, deposit_amount, total_invoice, remaining_amount, status, created_at) VALUES ([current_user_id], [cmbHall].SelectedValue, [cmbShift].SelectedValue, [datePickerWedding].Value, [txtBoxGroomName].Text, [txtBoxBrideName].Text, [txtBoxPhone].Text, [txtBoxTableCount].Value, [txtBoxReserveTableCount].Value, TongTienBan, TongTienDV, TienDatCoc, TongTienHoaDon, TienConLai, 'Pending', NOW())" and retrieve generated booking_id. For each selected dish: System executes "INSERT INTO Menu_Item (booking_id, dish_id, quantity) VALUES ([booking_id], [dish_id], [quantity])". For each selected service: System executes "INSERT INTO Service_Detail (booking_id, service_id, quantity) VALUES ([booking_id], [service_id], [quantity])". System commits transaction via commitTransaction(). System sends confirmation email via sendBookingConfirmationEmail([txtBoxPhone].Text, [booking_id]). (Refer to "Booking", "Menu_Item", "Service_Detail" tables in "DB Sheet" file) |
| _(18), (19)_             | _BR130_ | **Displaying Rules:** System displays success message "Booking submitted successfully. Booking ID: [booking_id]. Please check your email for confirmation." (Refer to MSG 40) via displaySuccessMessage(). System redirects to booking details view via redirectToBookingDetails([booking_id]).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

##### 2.1.4.3 View My Booking Details

###### _Use Case Description_

This use case allows customers to view their list of wedding bookings with different statuses and view detailed information of any selected booking including all wedding details, menu items, services, and payment information.

###### _Actors_

- Customer

###### _Preconditions_

- User must be logged in as a customer with valid JWT access token

###### _Postconditions_

- Customer's bookings list is displayed
- Selected booking's complete details are shown
- Customer can access edit or cancel actions if applicable

(Refer to "Activity View My Booking Details" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity        | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :-------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2), (2.1)_    | _BR131_ | **Querying Rules:** System queries customer's bookings with SQL: "SELECT booking_id, wedding_date, groom_name, bride_name, hall_id, status, total_invoice, created_at FROM Booking WHERE user_id = [current_user_id] ORDER BY created_at DESC". If result COUNT = 0: System calls displayNoResultsMessage("No bookings found. Create your first wedding booking!") (Refer to MSG 119) with [btnCreateBooking] button via displayCreateBookingPrompt(), and use case ends at step (2.2).                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| _(3), (4)_      | _BR132_ | **Displaying Rules:** System displays bookings list in [gridMyBookings] data grid via displayCustomerBookings() with columns (booking_id, wedding_date, groom_name, bride_name, hall_name via JOIN Hall, status, total_invoice). System applies status colors: Pending = yellow, Approved = green, Rejected = red, Cancelled = gray. Grid includes [txtBoxSearch] for search by names, [cmbStatusFilter] dropdown for status filtering, [btnRefresh] button. (Refer to "My Bookings List" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| _(6), (6.1)_    | _BR133_ | **Querying Rules:** When user selects booking and clicks view details, system queries complete booking details with SQL: "SELECT b.\*, h.hall_name, ht.type_name, s.shift_name, s.start_time, s.end_time FROM Booking b INNER JOIN Hall h ON b.hall_id = h.hall_id INNER JOIN Hall_Type ht ON h.type_id = ht.type_id INNER JOIN Shift s ON b.shift_id = s.shift_id WHERE b.booking_id = [selected_booking_id]". System queries menu items: "SELECT d.dish_name, mi.quantity, d.price FROM Menu_Item mi INNER JOIN Dish d ON mi.dish_id = d.dish_id WHERE mi.booking_id = [selected_booking_id]". System queries services: "SELECT s.service_name, sd.quantity, s.price FROM Service_Detail sd INNER JOIN Service s ON sd.service_id = s.service_id WHERE sd.booking_id = [selected_booking_id]". If any query fails: System calls displayErrorMessage("Cannot load booking details. Please try again.") (Refer to MSG 120) and use case ends at step (6.2). |
| _(7), (8), (9)_ | _BR134_ | **Displaying Rules:** System displays booking details modal via displayBookingDetailsDialog() with sections: [sectionBasicInfo] showing booking_id, status, created_at; [sectionWeddingInfo] showing wedding_date, shift_name with time range, hall_name with type, groom_name, bride_name, phone, table_count, reserve_table_count; [sectionMenu] with [gridMenuItems] showing dish_name, quantity, price; [sectionServices] with [gridServiceDetails] showing service_name, quantity, price; [sectionPayment] showing total_table_cost, total_service_cost, deposit_amount, total_invoice, remaining_amount. If status = 'Pending': Display [btnEdit] and [btnCancel] action buttons. (Refer to "Booking Details Dialog" view in "View Description" file)                                                                                                                                                                                                 |

##### 2.1.4.4 Edit My Booking Request

###### _Use Case Description_

This use case allows customers to edit their pending booking requests before staff approval. Customers can modify wedding details, menu selection, and services. The system validates changes, recalculates costs, and updates all related records.

###### _Actors_

- Customer

###### _Preconditions_

- User must be logged in as a customer with valid JWT access token
- Target booking exists and has status "Pending"
- Wedding date has not passed

###### _Postconditions_

- Booking information is updated with new details
- Menu and service selections are updated
- Costs are recalculated
- Update notification email is sent

(Refer to "Activity Edit My Booking Request" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity                  | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :------------------------ | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2), (2.1), (2.2)_       | _BR135_ | **Validation Rules:** When customer views booking details (from UC 2.1.4.3), system checks booking status. If status != 'Pending': System calls displayErrorMessage("Cannot edit this booking. Only pending bookings can be edited.") (Refer to MSG 121) and use case ends at step (2.2).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| _(5)_                     | _BR136_ | **Loading Screen Rules:** System displays edit booking form via displayEditBookingForm() pre-populated with current booking data including: [txtBoxGroomName], [txtBoxBrideName], [txtBoxPhone], [datePickerWedding], [cmbShift], [cmbHall], [txtBoxTableCount], [txtBoxReserveTableCount], selected menu items in [gridDishes] with quantities, selected services in [gridServices] with quantities. Form includes real-time cost calculator showing updated totals as customer modifies selections. (Refer to "Edit Booking Form" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| _(9), (10), (11), (11.1)_ | _BR137_ | **Validation Rules:** When user clicks [btnSaveChanges], system validates all inputs using same validation as BR127. If date, shift, or hall changed: System queries availability with SQL: "SELECT COUNT(\*) FROM Booking WHERE hall_id = [cmbHall].SelectedValue AND wedding_date = [datePickerWedding].Value AND shift_id = [cmbShift].SelectedValue AND status IN ('Pending', 'Approved') AND booking_id != [current_booking_id]". If COUNT > 0: System calls displayErrorMessage("Hall is no longer available for selected date and shift.") (Refer to MSG 39) and returns to step (6). System validates table count against hall capacity same as BR127. If any validation fails: Display specific error message and return to step (6).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| _(12), (13), (14), (15)_  | _BR138_ | **Querying Rules:** System recalculates costs using same formula as BR129. System begins transaction via beginTransaction(). System executes SQL UPDATE: "UPDATE Booking SET hall_id = [cmbHall].SelectedValue, shift_id = [cmbShift].SelectedValue, wedding_date = [datePickerWedding].Value, groom_name = [txtBoxGroomName].Text, bride_name = [txtBoxBrideName].Text, phone = [txtBoxPhone].Text, table_count = [txtBoxTableCount].Value, reserve_table_count = [txtBoxReserveTableCount].Value, total_table_cost = TongTienBan, total_service_cost = TongTienDV, deposit_amount = TienDatCoc, total_invoice = TongTienHoaDon, remaining_amount = TienConLai, updated_at = NOW() WHERE booking_id = [current_booking_id]". System executes "DELETE FROM Menu_Item WHERE booking_id = [current_booking_id]" then inserts new menu items. System executes "DELETE FROM Service_Detail WHERE booking_id = [current_booking_id]" then inserts new service details. System commits transaction via commitTransaction(). System sends update notification email via sendBookingUpdateEmail([txtBoxPhone].Text, [current_booking_id]). System displays success message "Booking updated successfully." (Refer to MSG 122). (Refer to "Booking", "Menu_Item", "Service_Detail" tables in "DB Sheet" file) |

##### 2.1.4.5 Cancel My Booking

###### _Use Case Description_

This use case allows customers to cancel their wedding booking. The system enforces cancellation policies, warns about deposit forfeiture, records cancellation details, and updates the booking status.

###### _Actors_

- Customer

###### _Preconditions_

- User must be logged in as a customer with valid JWT access token
- Target booking exists with status allowing cancellation
- Wedding date has not passed

###### _Postconditions_

- Booking status is updated to "Cancelled"
- Cancellation details are recorded
- Deposit is marked as non-refundable
- Cancellation confirmation email is sent

(Refer to "Activity Cancel My Booking" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity                      | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :---------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(2), (2.1), (2.2)_           | _BR139_ | **Validation Rules:** When customer views booking details (from UC 2.1.4.3), system checks booking status and wedding date. System queries: "SELECT status, wedding_date, deposit_amount FROM Booking WHERE booking_id = [selected_booking_id]". If status IN ('Cancelled', 'Completed') OR wedding_date < CurrentDate: System calls displayErrorMessage("Cannot cancel this booking. Booking is already [status] or date has passed.") (Refer to MSG 41) and use case ends at step (2.2).                                                                                                                                                                                                                                                                    |
| _(5), (6), (7)_               | _BR140_ | **Displaying Rules:** System displays cancellation confirmation dialog via displayCancellationDialog() with components: [lblWarning] showing bold text "Warning: Deposit will not be refunded", [lblDepositAmount] showing "Deposit amount to be forfeited: [deposit_amount] VND", [txtBoxCancellationReason] optional text area for reason, [btnConfirm] and [btnCancelAction] buttons. (Refer to "Cancellation Confirmation Dialog" view in "View Description" file)                                                                                                                                                                                                                                                                                        |
| _(8), (8.1), (8.2)_           | _BR141_ | **Validation Rules:** If customer clicks [btnCancelAction]: System closes dialog via closeDialog() and returns to booking details view, use case ends at step (8.2).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| _(9), (10), (11), (12), (13)_ | _BR142_ | **Querying Rules:** When customer clicks [btnConfirm], system begins transaction via beginTransaction(). System executes SQL UPDATE: "UPDATE Booking SET status = 'Cancelled', cancellation_date = NOW(), cancellation_reason = [txtBoxCancellationReason].Text, remaining_amount = 0, updated_at = NOW() WHERE booking_id = [selected_booking_id]". System commits transaction via commitTransaction(). System sends cancellation confirmation email via sendCancellationEmail([phone], [booking_id], [deposit_amount]) with deposit non-refundable notice. System displays success message "Booking cancelled successfully. Deposit [deposit_amount] VND is non-refundable as per policy." (Refer to MSG 87). (Refer to "Booking" table in "DB Sheet" file) |

#### 2.1.5 Staff Booking Management

##### 2.1.5.1 Search and Filter All Bookings

###### _Use Case Description_

This use case allows staff and administrators to search and filter all bookings in the system using various criteria including keywords, status, date ranges, halls, and shifts. This provides comprehensive booking management capabilities.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to view bookings

###### _Postconditions_

- Filtered bookings list is displayed based on search criteria
- Staff can view booking details or perform actions on selected bookings

(Refer to "Activity Search/Filter All Bookings" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity     | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :----------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2), (3)_   | _BR143_ | **Loading Screen Rules:** System loads "Manage Bookings" screen via displayBookingsManagement() with components: [txtBoxKeyword] for search by booking_id, groom_name, bride_name, or phone; [cmbStatusFilter] dropdown with options (All, Pending, Approved, Rejected, Cancelled, Completed); [datePickerStartDate] and [datePickerEndDate] for date range; [cmbHallFilter] dropdown populated from Hall table; [cmbShiftFilter] dropdown populated from Shift table; [btnSearch] and [btnReset] buttons; [gridBookings] data grid. System displays recent bookings by default with SQL: "SELECT booking_id, wedding_date, groom_name, bride_name, hall_id, shift_id, status, total_invoice, created_at FROM Booking ORDER BY created_at DESC LIMIT 50". (Refer to "Bookings Management" view in "View Description" file)                                                                                                                                                                                                                                                                                                                   |
| _(6), (6.1)_ | _BR144_ | **Querying Rules:** When user clicks [btnSearch], system builds dynamic SQL query starting with: "SELECT b.booking_id, b.wedding_date, b.groom_name, b.bride_name, h.hall_name, s.shift_name, b.status, b.total_invoice, b.created_at FROM Booking b INNER JOIN Hall h ON b.hall_id = h.hall_id INNER JOIN Shift s ON b.shift_id = s.shift_id WHERE 1=1". If [txtBoxKeyword].Text not empty: Add "AND (b.booking_id LIKE '%[keyword]%' OR b.groom_name LIKE '%[keyword]%' OR b.bride_name LIKE '%[keyword]%' OR b.phone LIKE '%[keyword]%')". If [cmbStatusFilter].SelectedValue != 'All': Add "AND b.status = [cmbStatusFilter].SelectedValue". If date range specified: Add "AND b.wedding_date BETWEEN [datePickerStartDate].Value AND [datePickerEndDate].Value". If [cmbHallFilter].SelectedValue != 'All': Add "AND b.hall_id = [cmbHallFilter].SelectedValue". If [cmbShiftFilter].SelectedValue != 'All': Add "AND b.shift_id = [cmbShiftFilter].SelectedValue". Add "ORDER BY b.created_at DESC". If result COUNT = 0: System calls displayNoResultsMessage("No bookings found. Try adjusting search criteria.") (Refer to MSG 88). |
| _(7), (8)_   | _BR145_ | **Displaying Rules:** System displays search results in [gridBookings] with columns (booking_id, wedding_date, groom_name, bride_name, hall_name, shift_name, status with color coding, total_invoice) via displayBookingsResults(). Each row has action buttons: [btnViewDetails], [btnEdit] (if status allows), [btnDelete]. Status colors: Pending=yellow, Approved=green, Rejected=red, Cancelled=gray, Completed=blue. Grid supports sorting by columns and pagination for large result sets.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

##### 2.1.5.2 View Any Booking Details

###### _Use Case Description_

This use case allows staff and administrators to view complete details of any booking in the system including customer information, wedding details, menu items, services, payment information, notes, and booking history.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to view booking details
- Target booking exists in the system

###### _Postconditions_

- Complete booking details are displayed
- Staff can access edit, approve, or delete actions if applicable

(Refer to "Activity View Any Booking Details" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity            | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :------------------ | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2), (2.1), (2.2)_ | _BR146_ | **Validation Rules:** When staff selects booking from list, system validates booking exists with SQL: "SELECT COUNT(\*) FROM Booking WHERE booking_id = [selected_booking_id]". If COUNT = 0: System calls displayErrorMessage("Booking does not exist.") (Refer to MSG 89) and use case ends at step (2.2).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| _(3), (3.1), (3.2)_ | _BR147_ | **Querying Rules:** System queries complete booking details with SQL: "SELECT b.\*, u.username, u.email AS customer_email, h.hall_name, ht.type_name, s.shift_name, s.start_time, s.end_time FROM Booking b INNER JOIN User u ON b.user_id = u.user_id INNER JOIN Hall h ON b.hall_id = h.hall_id INNER JOIN Hall_Type ht ON h.type_id = ht.type_id INNER JOIN Shift s ON b.shift_id = s.shift_id WHERE b.booking_id = [selected_booking_id]". System queries menu items: "SELECT d.dish_name, mi.quantity, d.price, (mi.quantity \* d.price) AS subtotal FROM Menu_Item mi INNER JOIN Dish d ON mi.dish_id = d.dish_id WHERE mi.booking_id = [selected_booking_id]". System queries services: "SELECT s.service_name, sd.quantity, s.price, (sd.quantity \* s.price) AS subtotal FROM Service_Detail sd INNER JOIN Service s ON sd.service_id = s.service_id WHERE sd.booking_id = [selected_booking_id]". If any query fails: System calls displayErrorMessage("Cannot load booking details. Please try again.") (Refer to MSG 120) and use case ends at step (3.2). |
| _(4)_               | _BR148_ | **Displaying Rules:** System displays booking details dialog via displayStaffBookingDetailsDialog() with comprehensive sections: [sectionBasicInfo] showing booking_id, status, created_at, updated_at; [sectionCustomerInfo] showing username, email, phone; [sectionWeddingInfo] showing wedding_date, shift_name with time range, hall_name with type, groom_name, bride_name, table_count, reserve_table_count, notes; [sectionMenu] with [gridMenuItems] showing dish_name, quantity, price, subtotal with total; [sectionServices] with [gridServiceDetails] showing service_name, quantity, price, subtotal with total; [sectionPayment] showing total_table_cost, total_service_cost, deposit_amount, total_invoice, remaining_amount, payment status; [sectionHistory] showing creation date, last update, cancellation details if applicable. Action buttons displayed based on status and permissions. (Refer to "Staff Booking Details Dialog" view in "View Description" file)                                                                            |

##### 2.1.5.3 Check System Hall Availability

###### _Use Case Description_

This use case allows staff and administrators to view hall availability across the system in calendar or grid view for different time periods (day/week/month). This helps staff manage bookings efficiently and identify available slots quickly.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to view hall availability

###### _Postconditions_

- Hall availability is displayed in selected view mode
- Staff can click available slots to create bookings or view existing bookings

(Refer to "Activity Check System Hall Availability" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity               | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :--------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2)_                  | _BR149_ | **Loading Screen Rules:** System loads "Hall Availability View" screen via displayHallAvailabilityView() with components: [cmbViewMode] dropdown (Day View, Week View, Month View) with default "Week View"; [datePickerStartDate] for view start date defaulting to current date; [cmbHallTypeFilter] dropdown from Hall_Type table with "All Types" option; [cmbShiftFilter] dropdown from Shift table with "All Shifts" option; [btnSearch] button; [divCalendar] container for calendar/grid display. (Refer to "Hall Availability View" view in "View Description" file)                                                                                                                                                                                                                                                                                                       |
| _(7), (8), (9), (9.1)_ | _BR150_ | **Querying Rules:** When user clicks [btnSearch], system queries halls with SQL: "SELECT hall_id, hall_name, type_id FROM Hall WHERE status = 'active'". If [cmbHallTypeFilter].SelectedValue != 'All': Add "AND type_id = [cmbHallTypeFilter].SelectedValue". System determines date range based on view mode: Day View = 1 day, Week View = 7 days, Month View = 30 days from [datePickerStartDate].Value. System queries bookings with SQL: "SELECT booking_id, hall_id, shift_id, wedding_date, status, groom_name, bride_name FROM Booking WHERE wedding_date BETWEEN [start_date] AND [end_date] AND status IN ('Pending', 'Approved')". If [cmbShiftFilter].SelectedValue != 'All': Add "AND shift_id = [cmbShiftFilter].SelectedValue". If hall query COUNT = 0: System calls displayErrorMessage("No halls in system.") (Refer to MSG 90) and use case ends at step (9.2). |
| _(10), (11), (12)_     | _BR151_ | **Displaying Rules:** System combines hall and booking data to render availability calendar via renderAvailabilityCalendar(). For each hall and date/shift combination: If no booking exists: Display slot with green background indicating "Available", clickable to navigate to create booking form with pre-filled date/hall/shift. If booking exists with status 'Pending' or 'Approved': Display slot with yellow/red background showing booking_id and customer names, clickable to view booking details. Calendar legend shows: Green="Available", Yellow="Pending Booking", Red="Confirmed Booking". Grid displays halls as rows and dates/shifts as columns. Hovering over slots shows tooltip with additional information.                                                                                                                                                |

##### 2.1.5.4 Create Booking for Customer

###### _Use Case Description_

This use case allows staff to create wedding bookings on behalf of customers. Staff can enter all booking details, select menu and services, set booking status directly, and complete the reservation process with full administrative control.

###### _Actors_

- Staff

###### _Preconditions_

- User must be logged in as staff with valid JWT access token
- User has permission to create bookings

###### _Postconditions_

- New booking is created with staff-selected status
- Booking details including menu and services are saved
- Confirmation email is sent to customer
- Hall is reserved for the selected date and shift

(Refer to "Activity Create Booking for Customer" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity                | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :---------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(2)_                   | _BR152_ | **Loading Screen Rules:** System loads "Create Booking for Customer" form via displayStaffCreateBookingForm() with comprehensive sections: [sectionCustomerInfo] with [txtBoxUsername], [txtBoxEmail], [txtBoxPhone], [btnSearchCustomer] to auto-fill from existing users; [sectionWeddingInfo] with [datePickerWedding], [cmbShift], [cmbHall], [txtBoxGroomName], [txtBoxBrideName], [txtBoxTableCount], [txtBoxReserveTableCount], [txtBoxNotes]; [sectionMenu] with [gridDishes] for dish selection with quantities; [sectionServices] with [gridServices] for service selection with quantities; [sectionPayment] with [txtBoxDepositAmount] (editable by staff), auto-calculated fields for costs, [cmbBookingStatus] dropdown (Pending, Approved) for staff to set initial status; [btnSave], [btnCancel] buttons. Real-time cost calculator updates totals as staff modifies selections. (Refer to "Staff Create Booking Form" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| _(5), (6), (7), (7.1)_  | _BR153_ | **Validation Rules:** When staff clicks [btnSave], system validates all inputs. System checks: If [txtBoxEmail].Text.isEmpty() OR [txtBoxPhone].Text.isEmpty() OR [txtBoxGroomName].Text.isEmpty() OR [txtBoxBrideName].Text.isEmpty() OR [datePickerWedding].Value.isEmpty() OR [cmbShift].SelectedValue.isEmpty() OR [cmbHall].SelectedValue.isEmpty() OR [txtBoxTableCount].Text.isEmpty(): System calls displayErrorMessage("All required fields must be filled.") (Refer to MSG 18) and returns to step (3). System validates email format with regex "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$". If invalid: System calls displayErrorMessage("Invalid email format.") (Refer to MSG 7) and returns to step (3). System validates phone format with regex "^\\d{10}$". If invalid: System calls displayErrorMessage("Phone must be 10 digits.") (Refer to MSG 8) and returns to step (3). System validates wedding date. If [datePickerWedding].Value <= CurrentDate: System calls displayErrorMessage("Wedding date must be in future.") (Refer to MSG 37) and returns to step (3). System queries hall capacity and validates: If [txtBoxTableCount].Value > max_tables: System calls displayErrorMessage("Number of tables exceeds hall capacity.") (Refer to MSG 128) and returns to step (3).                                                                                                                                                                                                                                                                     |
| _(8), (8.1), (8.2)_     | _BR154_ | **Validation Rules:** System checks hall availability with SQL: "SELECT COUNT(\*) FROM Booking WHERE hall_id = [cmbHall].SelectedValue AND wedding_date = [datePickerWedding].Value AND shift_id = [cmbShift].SelectedValue AND status IN ('Pending', 'Approved')". If COUNT > 0: System calls displayErrorMessage("Hall is already booked for selected date and shift.") (Refer to MSG 42) and use case ends at step (8.2).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| _(9), (10), (11), (12)_ | _BR155_ | **Querying Rules:** System calculates costs same as BR129, but uses staff-entered [txtBoxDepositAmount].Value if provided (default to 30% calculation). System looks up or creates user*id: If [btnSearchCustomer] was used and customer exists: Use existing user_id. Else: System creates new user with SQL: "INSERT INTO User (username, email, phone, role, status, created_at) VALUES (CONCAT('customer*', [txtBoxPhone].Text), [txtBoxEmail].Text, [txtBoxPhone].Text, 'customer', 'active', NOW())" and retrieve user_id. System begins transaction via beginTransaction(). System executes SQL INSERT: "INSERT INTO Booking (user_id, hall_id, shift_id, wedding_date, groom_name, bride_name, phone, table_count, reserve_table_count, total_table_cost, total_service_cost, deposit_amount, total_invoice, remaining_amount, notes, status, created_at) VALUES ([user_id], [cmbHall].SelectedValue, [cmbShift].SelectedValue, [datePickerWedding].Value, [txtBoxGroomName].Text, [txtBoxBrideName].Text, [txtBoxPhone].Text, [txtBoxTableCount].Value, [txtBoxReserveTableCount].Value, TongTienBan, TongTienDV, [txtBoxDepositAmount].Value, TongTienHoaDon, TienConLai, [txtBoxNotes].Text, [cmbBookingStatus].SelectedValue, NOW())" and retrieve booking_id. System inserts menu items and service details same as BR129. System commits transaction via commitTransaction(). System sends confirmation email via sendBookingConfirmationEmail([txtBoxEmail].Text, [booking_id]). (Refer to "Booking", "Menu_Item", "Service_Detail", "User" tables in "DB Sheet" file) |
| _(13), (14)_            | _BR156_ | **Displaying Rules:** System displays success message "Booking created successfully. Booking ID: [booking_id]." (Refer to MSG 12) via displaySuccessMessage(). System redirects to booking details view via redirectToBookingDetails([booking_id]).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

##### 2.1.5.5 Modify Booking Details

###### _Use Case Description_

This use case allows staff to modify existing booking details including customer information, wedding details, menu, services, and payment information. Staff have broader editing permissions than customers and can edit bookings in different statuses.

###### _Actors_

- Staff

###### _Preconditions_

- User must be logged in as staff with valid JWT access token
- User has permission to edit bookings
- Target booking exists in the system
- Booking status allows editing (not Completed or Cancelled)

###### _Postconditions_

- Booking information is updated with new details
- Menu and service selections are updated
- Costs are recalculated
- Update notification email is sent to customer

(Refer to "Activity Modify Booking Details" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity                  | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------------------ | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2), (2.1), (2.2)_       | _BR157_ | **Validation Rules:** When staff views booking details (from UC 2.1.5.2), system checks booking status. If status IN ('Completed', 'Cancelled'): System calls displayErrorMessage("Cannot edit completed or cancelled bookings.") (Refer to MSG 44) and use case ends at step (2.2).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| _(5)_                     | _BR158_ | **Loading Screen Rules:** System displays edit booking form via displayStaffEditBookingForm() pre-populated with current booking data. Form structure same as BR152 with all sections editable: customer info, wedding info, menu, services, payment, status. Form includes [cmbBookingStatus] dropdown with all status options (Pending, Approved, Rejected, Cancelled) for staff to change status. Real-time cost calculator updates totals as staff modifies selections. (Refer to "Staff Edit Booking Form" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| _(9), (10), (11), (11.1)_ | _BR159_ | **Validation Rules:** When staff clicks [btnSaveChanges], system validates all inputs using same validation as BR153. If date, shift, or hall changed: System queries availability with SQL: "SELECT COUNT(\*) FROM Booking WHERE hall_id = [cmbHall].SelectedValue AND wedding_date = [datePickerWedding].Value AND shift_id = [cmbShift].SelectedValue AND status IN ('Pending', 'Approved') AND booking_id != [current_booking_id]". If COUNT > 0: System calls displayErrorMessage("Hall is already booked for selected date and shift.") (Refer to MSG 42) and returns to step (6). System validates table count against hall capacity. If any validation fails: Display specific error message and return to step (6).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| _(12), (13), (14), (15)_  | _BR160_ | **Querying Rules:** System recalculates costs using staff-entered deposit if provided. System begins transaction via beginTransaction(). System executes SQL UPDATE: "UPDATE Booking SET user_id = [user_id], hall_id = [cmbHall].SelectedValue, shift_id = [cmbShift].SelectedValue, wedding_date = [datePickerWedding].Value, groom_name = [txtBoxGroomName].Text, bride_name = [txtBoxBrideName].Text, phone = [txtBoxPhone].Text, table_count = [txtBoxTableCount].Value, reserve_table_count = [txtBoxReserveTableCount].Value, total_table_cost = TongTienBan, total_service_cost = TongTienDV, deposit_amount = [txtBoxDepositAmount].Value, total_invoice = TongTienHoaDon, remaining_amount = TienConLai, notes = [txtBoxNotes].Text, status = [cmbBookingStatus].SelectedValue, updated_at = NOW() WHERE booking_id = [current_booking_id]". System executes "DELETE FROM Menu_Item WHERE booking_id = [current_booking_id]" then inserts new menu items. System executes "DELETE FROM Service_Detail WHERE booking_id = [current_booking_id]" then inserts new service details. System commits transaction via commitTransaction(). System sends update notification email via sendBookingUpdateEmail([customer_email], [current_booking_id]). System displays success message "Booking updated successfully." (Refer to MSG 122). (Refer to "Booking", "Menu_Item", "Service_Detail" tables in "DB Sheet" file) |

##### 2.1.5.6 Delete Booking

###### _Use Case Description_

This use case allows staff and administrators to permanently delete booking records from the system. The system requires confirmation and logs the deletion action for audit purposes.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to delete bookings
- Target booking exists in the system

###### _Postconditions_

- Booking and all related records are deleted from database
- Deletion is logged for audit trail
- Bookings list is refreshed

(Refer to "Activity Delete Booking" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity                   | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(5), (6), (6.1), (6.2)_   | _BR161_ | **Displaying Rules:** When staff selects booking and clicks delete, system displays confirmation dialog via displayDeleteConfirmationDialog() with message "Are you sure you want to delete booking [booking_id] for [groom_name] & [bride_name]? This action cannot be undone and will permanently remove all booking data including menu and services." with [btnConfirmDelete] and [btnCancel] buttons. If staff clicks [btnCancel]: System closes dialog via closeDialog() and use case ends at step (6.2).                                                                                             |
| _(7), (7.1), (7.2), (7.3)_ | _BR162_ | **Querying Rules:** When staff confirms deletion, system begins transaction via beginTransaction(). System executes SQL DELETE in order: "DELETE FROM Service_Detail WHERE booking_id = [selected_booking_id]", "DELETE FROM Menu_Item WHERE booking_id = [selected_booking_id]", "DELETE FROM Booking WHERE booking_id = [selected_booking_id]". If any DELETE fails: System rolls back transaction via rollbackTransaction(), calls displayErrorMessage("Cannot delete booking. Database error occurred.") (Refer to MSG 45), and use case ends at step (7.3).                                            |
| _(8), (9), (10)_           | _BR163_ | **Querying Rules:** System commits transaction via commitTransaction(). System logs deletion action: "INSERT INTO Audit_Log (user_id, action_type, table_name, record_id, action_details, created_at) VALUES ([current_user_id], 'DELETE', 'Booking', [selected_booking_id], 'Deleted booking for [groom_name] & [bride_name]', NOW())". System displays success message "Booking deleted successfully." (Refer to MSG 30) via displaySuccessMessage(). System refreshes bookings list via reloadBookingsList(). (Refer to "Booking", "Menu_Item", "Service_Detail", "Audit_Log" tables in "DB Sheet" file) |

#### 2.1.6 Customer Payment

##### 2.1.6.1 View My Invoice and Debt

###### _Use Case Description_

This use case allows customers to view their list of invoices and detailed information about each invoice including payment status, amounts paid, and remaining debt.

###### _Actors_

- Customer

###### _Preconditions_

- User must be logged in as a customer with valid JWT access token

###### _Postconditions_

- Customer's invoices list is displayed
- Selected invoice's complete details including debt information are shown

(Refer to "Activity View My Invoice & Debt" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity     | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :----------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(2), (2.1)_ | _BR164_ | **Querying Rules:** System queries customer's invoices with SQL: "SELECT booking_id, wedding_date, groom_name, bride_name, total_invoice, deposit_amount, remaining_amount, status FROM Booking WHERE user_id = [current_user_id] AND status IN ('Approved', 'Completed') ORDER BY wedding_date DESC". If result COUNT = 0: System calls displayNoResultsMessage("You don't have any invoices yet.") (Refer to MSG 68) and use case ends at step (2.2).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| _(3), (4)_   | _BR165_ | **Displaying Rules:** System displays invoices list in [gridMyInvoices] data grid via displayCustomerInvoices() with columns (booking_id, wedding_date, groom_name, bride_name, total_invoice, deposit_amount as "Paid Amount", remaining_amount as "Remaining Debt", payment_status). System calculates payment_status: If remaining_amount = 0: "Paid in Full" (green), Else If remaining_amount > 0 AND wedding_date > CurrentDate: "Pending Payment" (yellow), Else If remaining_amount > 0 AND wedding_date <= CurrentDate: "Overdue" (red). Each row has [btnViewDetails] button to view full invoice. (Refer to "My Invoices List" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                  |
| _(5), (5.1)_ | _BR166_ | **Querying Rules:** When customer selects invoice and clicks view details, system queries complete invoice details with SQL: "SELECT b.\*, h.hall_name, ht.type_name, s.shift_name, s.start_time, s.end_time FROM Booking b INNER JOIN Hall h ON b.hall_id = h.hall_id INNER JOIN Hall_Type ht ON h.type_id = ht.type_id INNER JOIN Shift s ON b.shift_id = s.shift_id WHERE b.booking_id = [selected_booking_id]". System queries menu items: "SELECT d.dish_name, mi.quantity, d.price, (mi.quantity \* d.price) AS subtotal FROM Menu_Item mi INNER JOIN Dish d ON mi.dish_id = d.dish_id WHERE mi.booking_id = [selected_booking_id]". System queries services: "SELECT s.service_name, sd.quantity, s.price, (sd.quantity \* s.price) AS subtotal FROM Service_Detail sd INNER JOIN Service s ON sd.service_id = s.service_id WHERE sd.booking_id = [selected_booking_id]". If any query fails: System calls displayErrorMessage("Cannot load invoice details. Please try again.") (Refer to MSG 135) and use case ends at step (5.2). |
| _(6), (7)_   | _BR167_ | **Displaying Rules:** System displays invoice details dialog via displayCustomerInvoiceDialog() with sections: [sectionBookingInfo] showing booking_id, wedding_date, shift_name with time, hall_name with type, groom_name, bride_name, phone; [sectionMenuItems] with [gridMenu] showing dish_name, quantity, price, subtotal; [sectionServices] with [gridServices] showing service_name, quantity, price, subtotal; [sectionPaymentSummary] showing total_table_cost, total_service_cost, subtotal, deposit_amount as "Paid", remaining_amount as "Outstanding Debt" with red text if > 0. If remaining_amount > 0: Display [btnPayNow] button. Display [btnExportPDF] button. (Refer to "Customer Invoice Dialog" view in "View Description" file)                                                                                                                                                                                                                                                                                     |

##### 2.1.6.2 Pay My Invoice

###### _Use Case Description_

This use case allows customers to make payments toward their outstanding invoice balance through integrated payment gateway. The system validates payment amounts and updates the booking payment status.

###### _Actors_

- Customer

###### _Preconditions_

- User must be logged in as a customer with valid JWT access token
- Invoice has outstanding balance (remaining_amount > 0)
- Payment gateway integration is available

###### _Postconditions_

- Payment is processed through payment gateway
- Booking remaining amount is updated
- Payment confirmation email is sent

(Refer to "Activity Pay My Invoice" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity                  | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :------------------------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(2), (3), (4)_           | _BR168_ | **Displaying Rules:** When customer views invoice with remaining_amount > 0, system displays [btnPayNow] button. When clicked, system displays payment form via displayPaymentForm() with components: [cmbPaymentMethod] dropdown (Credit Card, Debit Card, Bank Transfer, E-Wallet) populated from available gateway methods; [txtBoxPaymentAmount] pre-filled with remaining_amount but editable to allow partial payment; [lblMaxAmount] showing "Maximum: [remaining_amount] VND"; [btnConfirmPayment], [btnCancel] buttons. (Refer to "Payment Form" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                |
| _(8), (8.1)_              | _BR169_ | **Validation Rules:** When customer clicks [btnConfirmPayment], system validates payment amount. System checks: If [txtBoxPaymentAmount].Value <= 0: System calls displayErrorMessage("Payment amount must be greater than 0.") (Refer to MSG 136) and returns to step (5). If [txtBoxPaymentAmount].Value > remaining_amount: System calls displayErrorMessage("Payment amount cannot exceed outstanding balance of [remaining_amount] VND.") (Refer to MSG 137) and returns to step (5).                                                                                                                                                                                                                                                                                                                                                                                                                                |
| _(9), (10), (11), (11.1)_ | _BR170_ | **Integration Rules:** System redirects customer to payment gateway via redirectToPaymentGateway([cmbPaymentMethod].SelectedValue, [txtBoxPaymentAmount].Value, [booking_id]) with transaction details. Customer completes payment on external gateway. System receives payment result callback via handlePaymentCallback([transaction_id], [status], [amount]). If payment status = 'failed' OR status = 'cancelled': System calls displayErrorMessage("Payment failed. Please try again or contact support.") (Refer to MSG 138) and use case ends at step (11.2).                                                                                                                                                                                                                                                                                                                                                      |
| _(12), (12.1), (12.2)_    | _BR171_ | **Querying Rules:** When payment is successful, system begins transaction via beginTransaction(). System calculates new remaining amount: new_remaining = remaining_amount - [payment_amount]. System executes SQL UPDATE: "UPDATE Booking SET remaining_amount = [new_remaining], payment_date = NOW(), updated_at = NOW() WHERE booking_id = [selected_booking_id]". If new_remaining = 0: Add "status = 'Completed'". System inserts payment history: "INSERT INTO Payment_History (booking_id, payment_amount, payment_method, transaction_id, payment_date, created_by) VALUES ([booking_id], [payment_amount], [payment_method], [transaction_id], NOW(), [current_user_id])". If SQL execution fails: System rolls back transaction via rollbackTransaction(), calls displayErrorMessage("Error occurred during payment processing. Please contact support.") (Refer to MSG 69), and use case ends at step (12.3). |
| _(13), (14), (15), (16)_  | _BR172_ | **Querying Rules:** System commits transaction via commitTransaction(). System sends payment confirmation email via sendPaymentConfirmationEmail([customer_email], [booking_id], [payment_amount], [new_remaining]) with receipt details. System displays success message "Payment successful! Amount paid: [payment_amount] VND. Remaining balance: [new_remaining] VND." (Refer to MSG 70) via displaySuccessMessage(). System refreshes invoice details via refreshInvoiceDetails(). (Refer to "Booking", "Payment_History" tables in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                 |

##### 2.1.6.3 Export My Invoice to PDF

###### _Use Case Description_

This use case allows customers to export their invoice details to a PDF file for printing or record-keeping purposes. The PDF includes complete booking and payment information.

###### _Actors_

- Customer

###### _Preconditions_

- User must be logged in as a customer with valid JWT access token
- Customer is viewing invoice details

###### _Postconditions_

- PDF file containing invoice details is generated
- PDF file is downloaded to customer's device

(Refer to "Activity Export My Invoice to PDF" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity            | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :------------------ | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2), (3), (4)_     | _BR173_ | **Displaying Rules:** When customer views invoice details, system displays [btnExportPDF] button. When clicked, system queries complete invoice data same as BR166 plus additional details: System queries payment history: "SELECT payment_amount, payment_method, payment_date FROM Payment_History WHERE booking_id = [selected_booking_id] ORDER BY payment_date DESC". (Refer to "Booking", "Menu_Item", "Service_Detail", "Payment_History" tables in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| _(5), (5.1), (5.2)_ | _BR174_ | **Integration Rules:** System generates PDF file via generateInvoicePDF() using PDF library (e.g., PDFKit, jsPDF, Apache PDFBox). PDF content includes: Header with company logo and "WEDDING INVOICE" title, Invoice details section (booking*id, issue_date, wedding_date), Customer information (groom_name, bride_name, phone), Venue details (hall_name, hall_type, shift with time), itemized Menu table (dish names, quantities, prices, subtotals), itemized Services table (service names, quantities, prices, subtotals), Payment summary box (Total Amount, Deposit Paid, Amount Paid to Date, Outstanding Balance), Payment history table if any payments made, Footer with terms and company contact. System creates filename "Invoice*[booking_id]\_[YYYYMMDD].pdf". If PDF generation fails: System calls displayErrorMessage("Cannot create PDF file. Please try again or contact support.") (Refer to MSG 20) and use case ends at step (5.2). |
| _(6), (6.1), (6.2)_ | _BR175_ | **Integration Rules:** System initiates file download via downloadFile([pdf_file], [filename]) setting HTTP headers: Content-Type = "application/pdf", Content-Disposition = "attachment; filename=[filename]". Browser downloads file to default downloads folder. If download fails due to browser restrictions or connection issues: System calls displayErrorMessage("Cannot download file. Please check your connection or browser settings.") (Refer to MSG 21) and use case ends at step (6.2).                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| _(7), (8)_          | _BR176_ | **Displaying Rules:** System displays success message "Invoice PDF exported successfully." (Refer to MSG 49) via displaySuccessMessage(). System provides option to view PDF in new browser tab via [btnViewPDF] link.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

#### 2.1.7 Staff Invoice Management

##### 2.1.7.1 View Any Invoice and Debt

###### _Use Case Description_

This use case allows staff and administrators to view invoice and debt information for any booking in the system. This provides staff with complete visibility into customer payment status.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to view invoices
- Viewing from booking details (UC 2.1.5.2)

###### _Postconditions_

- Complete invoice details including debt information are displayed
- Staff can access payment confirmation or export functions

(Refer to "Activity View Any Invoice & Debt" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :---------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2), (2.1)_ | _BR177_ | **Querying Rules:** When staff clicks [btnViewInvoice] from booking details, system queries complete invoice details with SQL: "SELECT b.\*, u.username, u.email AS customer_email, h.hall_name, ht.type_name, ht.min_table_price, s.shift_name, s.start_time, s.end_time FROM Booking b INNER JOIN User u ON b.user_id = u.user_id INNER JOIN Hall h ON b.hall_id = h.hall_id INNER JOIN Hall_Type ht ON h.type_id = ht.type_id INNER JOIN Shift s ON b.shift_id = s.shift_id WHERE b.booking_id = [selected_booking_id]". System queries menu items: "SELECT d.dish_name, mi.quantity, d.price, (mi.quantity \* d.price) AS subtotal FROM Menu_Item mi INNER JOIN Dish d ON mi.dish_id = d.dish_id WHERE mi.booking_id = [selected_booking_id]". System queries services: "SELECT s.service_name, sd.quantity, s.price, (sd.quantity \* s.price) AS subtotal FROM Service_Detail sd INNER JOIN Service s ON sd.service_id = s.service_id WHERE sd.booking_id = [selected_booking_id]". System queries payment history: "SELECT payment_amount, payment_method, payment_date, created_by FROM Payment_History WHERE booking_id = [selected_booking_id] ORDER BY payment_date DESC". If any query fails: System calls displayErrorMessage("Cannot load invoice details. Please try again.") (Refer to MSG 135) and use case ends at step (2.2). |
| _(3), (4)_        | _BR178_ | **Displaying Rules:** System displays staff invoice dialog via displayStaffInvoiceDialog() with comprehensive sections: [sectionInvoiceHeader] showing booking_id, invoice_date, status; [sectionCustomerInfo] showing username, email, phone; [sectionBookingInfo] showing wedding_date, shift_name with time, hall_name with type, groom_name, bride_name, table_count, reserve_table_count; [sectionMenuItems] with [gridMenu] showing dish_name, quantity, price, subtotal with total; [sectionServices] with [gridServices] showing service_name, quantity, price, subtotal with total; [sectionPaymentSummary] showing total_table_cost, total_service_cost, deposit_amount, total_invoice, remaining_amount with status indicator, penalty_amount if applicable; [sectionPaymentHistory] with [gridPaymentHistory] showing payment_date, payment_amount, payment_method, processed_by. If remaining_amount > 0: Display [btnConfirmPayment] button. Display [btnExportPDF] button. (Refer to "Staff Invoice Dialog" view in "View Description" file)                                                                                                                                                                                                                                                                                     |

##### 2.1.7.2 Confirm Payment and Calculate Penalty

###### _Use Case Description_

This use case allows staff to confirm customer payments and automatically calculate penalty fees for late payments based on system parameters. Staff can review payment details and finalize the transaction.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to confirm payments
- Invoice has outstanding balance (remaining_amount > 0)

###### _Postconditions_

- Payment is confirmed and recorded
- Penalty is calculated and applied if applicable
- Booking payment status is updated
- Payment confirmation email is sent to customer

(Refer to "Activity Confirm Payment & Calculate Penalty" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity                  | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------------------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(2), (3), (4), (5), (6)_ | _BR179_ | **Loading Screen Rules:** When staff views invoice with remaining_amount > 0, system displays [btnConfirmPayment] button. When clicked, system retrieves payment information from customer's recent transaction. System queries system parameters: "SELECT param_value FROM System_Parameter WHERE param_name = 'penalty_check_enabled'". If penalty_check_enabled = 1: System queries penalty rate: "SELECT param_value FROM System_Parameter WHERE param_name = 'late_payment_penalty_rate'". System calculates payment deadline: deadline_date = wedding_date - 3 days. System checks if current_date > deadline_date. If late AND penalty_check_enabled = 1: System calculates penalty_amount = remaining_amount \* (penalty_rate / 100), Else: penalty_amount = 0. (Refer to "System_Parameter" table in "DB Sheet" file)                                                              |
| _(7), (8), (9), (10)_     | _BR180_ | **Displaying Rules:** System displays payment confirmation dialog via displayPaymentConfirmationDialog() with sections: [sectionPaymentDetails] showing payment_amount equal to remaining_amount, payment_method from customer transaction or selectable by staff, payment_date defaulting to current date; [sectionPenaltyCalculation] showing deadline_date, days_overdue if late, penalty_rate, calculated penalty_amount with red text if > 0; [sectionTotalProcessed] showing "Total Amount to Process: [remaining_amount + penalty_amount] VND"; [txtBoxStaffNotes] for optional notes; [btnConfirm], [btnCancel] buttons. (Refer to "Payment Confirmation Dialog" view in "View Description" file)                                                                                                                                                                                   |
| _(11), (11.1), (11.2)_    | _BR181_ | **Querying Rules:** When staff clicks [btnConfirm], system begins transaction via beginTransaction(). System executes SQL UPDATE: "UPDATE Booking SET remaining_amount = 0, penalty_amount = [penalty_amount], payment_date = NOW(), status = 'Completed', updated_at = NOW() WHERE booking_id = [selected_booking_id]". System inserts payment history: "INSERT INTO Payment_History (booking_id, payment_amount, payment_method, penalty_amount, staff_notes, payment_date, created_by) VALUES ([booking_id], [remaining_amount], [payment_method], [penalty_amount], [txtBoxStaffNotes].Text, NOW(), [current_user_id])". If SQL execution fails: System rolls back transaction via rollbackTransaction(), calls displayErrorMessage("Error occurred during payment confirmation. Please try again.") (Refer to MSG 144), and use case ends at step (11.3).                              |
| _(12), (13), (14), (15)_  | _BR182_ | **Querying Rules:** System commits transaction via commitTransaction(). System logs payment action: "INSERT INTO Audit_Log (user_id, action_type, table_name, record_id, action_details, created_at) VALUES ([current_user_id], 'CONFIRM_PAYMENT', 'Booking', [booking_id], 'Confirmed payment [remaining_amount] VND + penalty [penalty_amount] VND', NOW())". System sends payment confirmation email via sendPaymentConfirmationEmail([customer_email], [booking_id], [remaining_amount], [penalty_amount]) with receipt and penalty explanation if applicable. System displays success message "Payment confirmation successful. Total processed: [remaining_amount + penalty_amount] VND." (Refer to MSG 50) via displaySuccessMessage(). System refreshes invoice details via refreshInvoiceDetails(). (Refer to "Booking", "Payment_History", "Audit_Log" tables in "DB Sheet" file) |

##### 2.1.7.3 Export Any Invoice to PDF

###### _Use Case Description_

This use case allows staff and administrators to export complete invoice details to PDF format including payment history and staff signatures for official documentation purposes.

###### _Actors_

- Staff, Admin

###### _Preconditions_

- User must be logged in with valid JWT access token
- User has permission to export invoices
- Staff is viewing invoice details

###### _Postconditions_

- PDF file containing complete invoice details is generated
- PDF file is downloaded to staff's device

(Refer to "Activity Export Any Invoice to PDF" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity            | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------------ | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2), (3), (4)_     | _BR183_ | **Displaying Rules:** When staff views invoice details, system displays [btnExportPDF] button. When clicked, system queries complete invoice data same as BR177 including all booking details, menu items, services, and payment history.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| _(5), (5.1), (5.2)_ | _BR184_ | **Integration Rules:** System generates official PDF file via generateOfficialInvoicePDF() using PDF library. PDF content includes professional invoice format: Header with company logo, name, address, tax ID, and "OFFICIAL WEDDING INVOICE" title; Invoice metadata (invoice*number = booking_id, issue_date, due_date); Customer information section (Full names, Contact details, Email); Booking details section (Wedding date and time, Venue with hall type, Shift schedule); Itemized charges table with Menu section (dish names, quantities, unit prices, subtotals), Services section (service names, quantities, unit prices, subtotals), Subtotal row; Payment information section (Total Amount, Deposit Paid, Payments Received with dates, Penalty Fees if applicable, Outstanding Balance); Payment history table with all transactions; Terms and conditions section; Staff signature section with processed_by name and date; Footer with company contact and payment instructions. System creates filename "Official_Invoice*[booking_id]\_[YYYYMMDD_HHMMSS].pdf". If PDF generation fails: System calls displayErrorMessage("Cannot create PDF file. Please try again.") (Refer to MSG 103) and use case ends at step (5.2). |
| _(6), (6.1), (6.2)_ | _BR185_ | **Integration Rules:** System initiates file download via downloadFile([pdf_file], [filename]) with HTTP headers same as BR175. If download fails: System calls displayErrorMessage("Cannot download file. Please check your connection.") (Refer to MSG 104) and use case ends at step (6.2).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| _(7), (8)_          | _BR186_ | **Displaying Rules:** System displays success message "Official invoice PDF exported successfully." (Refer to MSG 105) via displaySuccessMessage(). System logs export action: "INSERT INTO Audit_Log (user_id, action_type, table_name, record_id, action_details, created_at) VALUES ([current_user_id], 'EXPORT_INVOICE', 'Booking', [booking_id], 'Exported official invoice PDF', NOW())".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

#### 2.1.8 Reporting

##### 2.1.8.1 View Revenue Chart

###### _Use Case Description_

This use case allows administrators to view revenue charts and statistics by month, including daily revenue breakdown, total monthly revenue, and contribution percentages of each day.

###### _Actors_

- Admin

###### _Preconditions_

- User must be logged in as administrator with valid JWT access token
- User has permission to view revenue reports
- System has revenue data available

###### _Postconditions_

- Revenue chart and statistics are displayed
- Admin can analyze monthly revenue patterns

(Refer to "Activity View Revenue Chart" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity             | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(1), (2)_           | _BR187_ | **Displaying Rules:** When admin selects "Revenue Report" function, system displays month/year selection form via displayRevenueReportForm() with components: [datePickerMonth] defaulting to current month, [datePickerYear] defaulting to current year, [cmbChartType] dropdown (Column Chart, Line Chart, Pie Chart) defaulting to Column Chart, [btnViewReport] button. (Refer to "Revenue Report Selection Form" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                      |
| _(5), (5.1), (5.2)_  | _BR188_ | **Querying Rules:** When admin clicks [btnViewReport], system queries revenue summary: "SELECT month, year, total_revenue FROM Revenue_Report WHERE month = [datePickerMonth].Value AND year = [datePickerYear].Value". System queries daily details: "SELECT report_date, event_count, daily_revenue, contribution_percentage FROM Revenue_Report_Detail WHERE month = [datePickerMonth].Value AND year = [datePickerYear].Value ORDER BY report_date". If no data found (COUNT = 0): System calls displayNoResultsMessage("No report data for this month.") (Refer to MSG 106) and use case ends at step (5.2). If database query fails: System calls displayErrorMessage("Cannot load report data. Please try again.") (Refer to MSG 51) and use case ends at step (5.2). (Refer to "Revenue_Report", "Revenue_Report_Detail" tables in "DB Sheet" file) |
| _(6), (7), (8), (9)_ | _BR189_ | **Displaying Rules:** System renders revenue chart using Chart.js library via renderRevenueChart([chart_type], [daily_data]) showing X-axis = dates, Y-axis = revenue amounts. System displays [gridDailyRevenue] data grid with columns (Date, Event Count, Revenue formatted as #,##0 VND, Percentage formatted as 0.00%). System displays [panelSummary] section showing: "Total Monthly Revenue: [total_revenue] VND", "Total Events: [SUM(event_count)]", "Average Revenue per Day: [total_revenue / days_with_events] VND", "Highest Revenue Day: [date with MAX(daily_revenue)]", "Lowest Revenue Day: [date with MIN(daily_revenue)]". System highlights highest and lowest revenue days with color coding (green for highest, red for lowest). (Refer to "Revenue Report View" in "View Description" file)                                         |
| _(9)_                | _BR190_ | **Integration Rules:** System provides [btnExportExcel] button to export report data. Chart is interactive allowing hover to see exact values via tooltips. System auto-refreshes chart when admin changes chart type selection without requerying database.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

##### 2.1.8.2 Export Report to Excel

###### _Use Case Description_

This use case allows administrators to export monthly revenue reports to Excel format for storage, printing, or sharing purposes.

###### _Actors_

- Admin

###### _Preconditions_

- User must be logged in as administrator with valid JWT access token
- User is viewing revenue chart (UC 2.1.8.1)
- System has report data available

###### _Postconditions_

- Excel file containing revenue report is generated
- Excel file is downloaded to admin's device

(Refer to "Activity Export Report to Excel" diagram in "Activity for wedding management system" folder)

###### _Business Rules_

| Activity                      | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :---------------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _(2), (3), (4), (4.1), (4.2)_ | _BR191_ | **Displaying Rules:** When admin views revenue chart, system displays [btnExportExcel] button. When clicked, system queries same data as BR188 to ensure consistency. If no data available (COUNT = 0): System calls displayNoResultsMessage("No data to export.") (Refer to MSG 68) and use case ends at step (4.2).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| _(5), (5.1), (5.2)_           | _BR192_ | **Integration Rules:** System generates Excel file via generateRevenueExcel() using Excel library (e.g., ExcelJS, Apache POI, NPOI). Excel structure: Sheet 1 "Summary" with header section (Company Logo, Report Title "Revenue Report - [Month]/[Year]", Generation Date), summary table (Month/Year, Total Revenue with format #,##0 VND, Total Events, Average Revenue/Day); Sheet 2 "Daily Details" with table columns (Date, Event Count, Revenue formatted as #,##0 VND, Percentage formatted as 0.00%) with color-coded rows (green for highest, red for lowest), totals row at bottom; Sheet 3 "Chart" with embedded column chart if library supports. Apply professional formatting: Bold headers with background color #4472C4, borders on all cells, auto-fit column widths, freeze header rows. System creates filename "Revenue*Report*[Month]_[Year]_[YYYYMMDD].xlsx". If Excel generation fails due to library error or memory issues: System calls displayErrorMessage("Cannot create Excel file. Please try again.") (Refer to MSG 151) and use case ends at step (5.2). |
| _(6), (6.1), (6.2)_           | _BR193_ | **Integration Rules:** System initiates file download via downloadFile([excel_file], [filename]) setting HTTP headers: Content-Type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Content-Disposition = "attachment; filename=[filename]". Browser downloads file to default downloads folder. If download fails due to browser restrictions, connection issues, or disk space: System calls displayErrorMessage("Cannot download file. Please check your connection and disk space.") (Refer to MSG 152) and use case ends at step (6.2).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| _(7), (8)_                    | _BR194_ | **Displaying Rules:** System displays success message "Export Excel successful. File saved to Downloads folder." (Refer to MSG 153) via displaySuccessMessage() with option to open file location. System logs export action: "INSERT INTO Audit_Log (user_id, action_type, table_name, action_details, created_at) VALUES ([current_user_id], 'EXPORT_REPORT', 'Revenue_Report', 'Exported revenue report for [Month]/[Year]', NOW())".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

### 2.2 List Description

The Wedding Management System uses 15 main database tables to store and manage all business data:

| STT |     Table Name      |                       Description                        |
| :-: | :-----------------: | :------------------------------------------------------: |
|  1  |        User         | Stores user account information with encrypted passwords |
|  2  |  Permission_Group   |        Defines user role groups with permissions         |
|  3  | Permission_Function |      Maps permissions between groups and functions       |
|  4  |  System_Parameter   | System configuration parameters (penalty, deposit rates) |
|  5  |      Hall_Type      |  Stores hall type information and minimum table pricing  |
|  6  |        Hall         |        Stores hall information for wedding events        |
|  7  |        Shift        |      Manages shift schedules (start time, end time)      |
|  8  |        Dish         |                    Menu item catalog                     |
|  9  |       Service       |                     Service catalog                      |
| 10  |       Booking       |            Stores wedding booking information            |
| 11  |      Menu_Item      |               Menu items for each booking                |
| 12  |   Service_Detail    |             Service details for each booking             |
| 13  |   Payment_History   |               Payment transaction records                |
| 14  |    Refresh_Token    |                JWT refresh token storage                 |
| 15  |   Token_Blacklist   |                Invalidated access tokens                 |

For detailed table schemas including field definitions, data types, and constraints, refer to "DB Sheet" documentation.

### 2.3 View Description

The Wedding Management System consists of main screens organized by functional modules:

**Authentication Screens:**

1. Login - User authentication with JWT token generation
2. Register Account - Customer self-registration (Web only)
3. Forgot Password - Password reset via email
4. Change Password - User password update

**User Management Screens:** 5. Manage Profile - Personal information management 6. User Management - Admin user account management 7. Permission Groups - Role and permission configuration

**Master Data Screens:** 8. Hall Type Management - Input and manage hall types 9. Hall Management - Input and manage halls 10. Shift Management - Input and manage shifts 11. Dish Management - Input and manage menu items 12. Service Management - Input and manage services 13. System Parameters - Configure system regulations

**Booking & Operations Screens:** 14. Check Hall Availability - Query available halls by date/shift 15. Submit Wedding Reservation - Create new booking with menu/services 16. My Bookings - Customer booking list and details 17. Manage All Bookings - Staff booking management 18. Booking Details - View and edit booking information

**Payment & Invoice Screens:** 19. Invoice & Debt - View invoice and payment status 20. Pay Invoice - Process customer payments 21. Confirm Payment - Staff payment confirmation with penalty 22. Export Invoice PDF - Generate invoice documents

**Reporting Screens:** 23. Revenue Report - Monthly revenue visualization 24. Export Report - Generate Excel reports

For detailed screen designs including UI elements, validation rules, and event handling, refer to activity diagrams and view documentation.

## 3. Non-functional Requirements

### 3.1 User Access and Security

| Function / Data                       | Customer |  Staff  | Administrator |
| :------------------------------------ | -------- | :-----: | ------------- |
| **Manage Booking**                    |          |         |               |
| Create (Submit Wedding Reservation)   | X(\*)    |         |               |
| Read (View My Booking Details)        | X(\*)    | X(\*\*) | X             |
| Update (Edit My Booking Request)      | X(\*)    | X(\*\*) | X             |
| Delete (Cancel My Booking)            | X(\*)    | X(\*\*) | X             |
| **Manage Hall**                       |          |         |               |
| Create, Update, Delete                |          |         | X             |
| Read                                  | X        |    X    | X             |
| **Manage Hall Type**                  |          |         |               |
| Create, Update, Delete                |          |         | X             |
| Read                                  | X        |    X    | X             |
| **Manage Shift**                      |          |         |               |
| Create, Update, Delete                |          |         | X             |
| Read                                  | X        |    X    | X             |
| **Manage Dish**                       |          |         |               |
| Create, Update, Delete                |          |         | X             |
| Read                                  | X        |    X    | X             |
| **Manage Service**                    |          |         |               |
| Create, Update, Delete                |          |         | X             |
| Read                                  | X        |    X    | X             |
| **Manage System Parameters**          |          |         |               |
| Create, Update, Delete                |          |         | X             |
| Read                                  |          |    X    | X             |
| **Manage User**                       |          |         |               |
| Create, Update, Delete                |          |         | X             |
| Read                                  |          |         | X             |
| **Manage Permission Group**           |          |         |               |
| Create, Update, Delete                |          |         | X             |
| Read                                  |          |         | X             |
| **Manage Permissions**                |          |         |               |
| Create, Update, Delete                |          |         | X             |
| Read                                  |          |         | X             |
| Check Hall Availability               | X        |    X    | X             |
| Create Booking for Customer           |          |    X    | X             |
| View/Pay Invoice                      | X(\*)    | X(\*\*) | X             |
| Export Invoice to PDF                 | X(\*)    | X(\*\*) | X             |
| Confirm Payment and Calculate Penalty |          |    X    | X             |
| Manage Profile                        | X(\*)    |  X(\*)  | X(\*)         |
| Change Password                       | X(\*)    |  X(\*)  | X(\*)         |

X: User has full permission to perform the action.
X(\*): User has permission to perform action on their own items/profile only.
X(\*\*): User has permission to perform action on items assigned to them only.

**Security Implementation:**

The system implements role-based access control (RBAC) through:

- **Permission_Group** - Defines user role groups (Admin, Staff, Customer)
- **Permission_Function** - Maps permissions between groups and functions
- **User** - Stores user accounts with encrypted passwords (BCrypt hash + salt)

Access control is enforced at both presentation and business logic layers. Password encryption using BCrypt ensures secure storage. JWT tokens are used for authentication with refresh token rotation. Only administrators can assign permissions to prevent unauthorized privilege escalation.

### 3.2 Performance Requirements

**Number of Users:**

- Number of concurrent users: 20-50 users
- Number of business users: 100-200 users (including customers)

**Data Volume:**

- Number of bookings: Estimated 500-1000 bookings per year
- Data growth rate: ~100 bookings/month during peak season (wedding season)
- Storage per booking: ~3-5 KB/booking
- Storage per user: ~1-2 KB/user

**Response Time:**

- Login/Authentication: < 1 second
- Hall availability check: < 0.5 second
- Booking submission: < 2 seconds
- Booking search/filter: < 1 second
- Invoice generation: < 1 second
- Payment processing: < 2 seconds
- Report generation: < 5 seconds
- Parameter update: Instant

**Level of Availability:**
24×7 availability required. System must be accessible at all times for booking management, particularly during peak wedding season (October to March). Maximum planned downtime: 2 hours per month for maintenance.

**Usage Frequency:**

- Daily: Booking creation, hall availability check, invoice generation, payment confirmation
- Weekly: Booking updates, service/menu modifications, user management
- Monthly: System reports, parameter adjustments
- Ad-hoc: Permission configuration, data export

**Scalability:**

- System should support up to 200 concurrent users without performance degradation
- Database should handle up to 10,000 bookings efficiently
- Response times should remain consistent during peak season loads

### 3.3 Implementation Requirements

**Technology Stack:**

- Frontend: React.js or Angular (Web application)
- Backend: Node.js with Express.js or ASP.NET Core
- Database: PostgreSQL or Microsoft SQL Server
- Authentication: JWT (JSON Web Token) with BCrypt password hashing
- ORM: Prisma, TypeORM, or Entity Framework Core
- Email Service: SendGrid or AWS SES
- Payment Gateway: Stripe, PayPal, or local payment providers

**Architecture:**

- Pattern: RESTful API with 3-tier architecture
- Client: Single Page Application (SPA)
- Server: Stateless API server
- Database: Relational database with proper indexing

**Platform Requirements:**

- Operating System: Cross-platform (Windows, macOS, Linux)
- Browser Support: Chrome, Firefox, Safari, Edge (latest 2 versions)
- Minimum Screen Resolution: 1366x768
- Network: Stable internet connection required

**Deployment:**

- Cloud Hosting: AWS, Azure, or Google Cloud Platform
- Container Support: Docker for consistent deployment
- Reverse Proxy: Nginx or Apache
- SSL/TLS: HTTPS required for all connections

**Location:**
Vietnam - Wedding venue management centers in major cities (Ho Chi Minh City, Hanoi, Da Nang)

**Development Standards:**

- Code Style: Follow language-specific conventions (ESLint, Prettier)
- Version Control: Git with GitFlow workflow
- Testing: Unit tests, Integration tests, E2E tests
- Documentation: API documentation with Swagger/OpenAPI
- CI/CD: Automated build, test, and deployment pipeline

**Maintenance:**

- Daily automated database backups
- Weekly security updates
- Monthly feature releases
- Quarterly major version updates
- Annual security audits

## 4. Other Requirements

### 4.1 Archive Function

Enable Archival Function for following data:

| Data Type       | Actor         | Condition                                                                           |
| :-------------- | :------------ | :---------------------------------------------------------------------------------- |
| Booking         | Administrator | Administrator can archive completed bookings older than 2 years by wedding date.    |
| User Accounts   | Administrator | Administrator can archive inactive user accounts with no login activity for 1 year. |
| Payment History | Administrator | Payment records for archived bookings are automatically archived with booking data. |

**Archive Rules:**

- Archived data must be exported to external storage before deletion from active database
- Archived booking data must retain all related records (menu items, services, invoices, payments)
- Archive process must log all archived items with timestamp and administrator details
- Archived data must be restorable within 30 days of archival
- System must maintain archive index for quick retrieval if needed
- Archive operation requires administrator confirmation
- Archived records are marked with archive flag before physical deletion

### 4.2 Security Audit Function

Enable Security Audit Function for **Administrator** to track any modification on user permissions and critical system operations.

**Audit Logging Requirements:**

1. **Permission Changes**

   - Log all changes to Permission_Function table
   - Log all changes to Permission_Group assignments
   - Record: User who made change, timestamp, old values, new values

2. **User Account Management**

   - Log user creation, modification, deletion, and status changes
   - Log password reset operations
   - Record: Administrator who performed action, affected user, timestamp

3. **Critical Data Modifications**

   - Log changes to System_Parameter table
   - Log booking cancellations and modifications
   - Log invoice adjustments and penalty calculations
   - Log payment confirmations
   - Record: User, timestamp, operation type, affected records

4. **Authentication Events**
   - Log successful and failed login attempts
   - Log session timeout and logout events
   - Log refresh token operations
   - Record: Username, IP address, timestamp, result

**Audit Report Features:**

- Administrator can query audit logs by date range, user, operation type
- Audit logs are tamper-proof and cannot be deleted by any user
- Audit logs are retained for minimum 1 year
- Critical security events trigger immediate notification to administrators
- Export audit logs to CSV/Excel for external analysis
- Real-time audit dashboard showing recent critical events

### 4.3 WMS Sites

The Wedding Management System is deployed as a web-based application with the following deployment structure:

**Application Structure:**

- **Frontend Application**: React.js / Angular SPA

  - Deployed on CDN for optimal performance
  - Static assets cached at edge locations
  - Service worker for offline capabilities

- **Backend API Server**: Node.js / ASP.NET Core

  - RESTful API architecture
  - Load balanced across multiple instances
  - Auto-scaling based on traffic

- **Database Server**: PostgreSQL / SQL Server
  - Primary-replica configuration
  - Automated backups every 6 hours
  - Point-in-time recovery enabled

**Deployment Sites:**

1. **Main Office** (Ho Chi Minh City)

   - Primary database server
   - Administrator workstations
   - Backup and disaster recovery center

2. **Branch Offices** (Hanoi, Da Nang)
   - Client applications connect to main database
   - Local caching for improved performance
   - VPN connection to main office

**Network Configuration:**

- All sites connect via HTTPS with TLS 1.3
- Database connection uses encrypted connection string
- Minimum bandwidth requirement: 10 Mbps
- CDN edge locations for fast content delivery
- WebSocket support for real-time updates

### 4.4 WMS Lists

The Wedding Management System uses the following 15 core database tables:

**Master Data Tables:**

1. **Hall_Type** - Hall Types (hall_type_id, name, minimum_table_price, description)
2. **Hall** - Halls (hall_id, hall_type_id, name, max_tables, notes)
3. **Shift** - Shifts (shift_id, name, start_time, end_time)
4. **Dish** - Dishes (dish_id, name, price, notes)
5. **Service** - Services (service_id, name, price, notes)

**Transaction Tables:**

6. **Booking** - Wedding Bookings (booking_id, groom_name, bride_name, phone, booking_date, wedding_date, shift_id, hall_id, deposit_amount, table_count, reserved_tables, payment_date, total_amount, remaining_amount, penalty_amount, damage_cost, status)
7. **Menu_Item** - Menu Items (booking_id, dish_id, quantity, unit_price, serving_order, notes)
8. **Service_Detail** - Service Details (booking_id, service_id, quantity, unit_price, total_price, notes)
9. **Payment_History** - Payment Records (payment_id, booking_id, payment_date, amount, payment_method, notes)

**Report Tables:**

10. **Revenue_Report** - Monthly Revenue Reports (month, year, total_revenue)
11. **Revenue_Detail** - Daily Revenue Details (date, month, year, booking_count, revenue, percentage)

**System Configuration Tables:**

12. **System_Parameter** - System Parameters (enable_penalty, penalty_rate, minimum_deposit_rate, minimum_reserved_table_rate)

**Security Tables:**

13. **Permission_Function** - System Functions (function_id, function_name, screen_to_load)
14. **Permission_Group** - User Groups (group_id, group_name)
15. **User** - Users (user_id, username, password_hash, full_name, email, phone, group_id, status, created_at, updated_at)

Additional Security Tables:

16. **Refresh_Token** - JWT Refresh Tokens (token_id, user_id, token, expires_at, created_at)
17. **Token_Blacklist** - Invalidated Tokens (token, blacklisted_at, expires_at)

For detailed table schemas with field definitions, data types, constraints and relationships, refer to "DB Sheet" documentation.

### 4.5 Custom Pages

The Wedding Management System implements the following custom pages with specialized functionality:

| #   | Page Name                 | Description                                                                                                                                                                 |
| :-- | :------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Home Dashboard            | Custom dashboard with calendar view of upcoming weddings, recent bookings, and monthly revenue chart. Includes quick action button for new booking.                         |
| 2   | Wedding Booking Form      | Multi-step form with dynamic validation for hall availability, menu selection with real-time pricing calculation, service selection, and deposit calculation.               |
| 3   | Invoice Calculator        | Custom page with complex business logic for calculating table pricing, service charges, late payment penalties (1% per day), equipment damage costs, and remaining balance. |
| 4   | Revenue Report Viewer     | Interactive report page with date range filter, revenue breakdown by day, visual chart representation, and export to Excel functionality.                                   |
| 5   | Hall Availability Checker | Real-time hall availability checker with calendar interface showing booked and available slots by hall and shift.                                                           |
| 6   | System Parameter Manager  | Custom configuration page for managing business rules: penalty rates, deposit percentages, reserved table ratios, and minimum table requirements.                           |

All custom pages are built using modern web frameworks with responsive design and follow the system's design guidelines for consistency.

### 4.6 Scheduled Agents

The Wedding Management System implements the following scheduled background agents:

| No. | Name                            | Description                                                                                                                                                          | Schedule Rule                                        | Agent Main Class                       |
| :-- | :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------- | :------------------------------------- |
| 1   | Daily Backup Agent              | Performs automated database backup of all wedding bookings, invoices, and system data. Creates backup files with timestamp and stores in configured backup location. | Daily at 02:00 AM                                    | BackupService.PerformDailyBackup()     |
| 2   | Monthly Report Generator        | Automatically generates monthly revenue reports by aggregating booking data, calculating revenue by day, and computing percentages.                                  | 1st day of month at 01:00 AM                         | ReportService.GenerateMonthlyReport()  |
| 3   | Payment Reminder Agent          | Scans for overdue payments and sends reminder emails to customers. Calculates late payment penalties based on configured penalty rate (1% per day).                  | Daily at 08:00 AM                                    | PaymentService.SendPaymentReminders()  |
| 4   | Data Archive Agent              | Archives old booking records (older than 2 years) and monthly reports (older than 3 years) to external storage. Maintains archive index for retrieval.               | Monthly on last day at 03:00 AM                      | ArchiveService.ArchiveOldRecords()     |
| 5   | Session Cleanup Agent           | Removes expired JWT refresh tokens from Refresh_Token table and cleans up blacklisted tokens from Token_Blacklist table.                                             | Every 6 hours                                        | AuthService.CleanupExpiredSessions()   |
| 6   | Hall Availability Cache Refresh | Refreshes cached hall availability data to ensure real-time accuracy for booking system. Updates availability matrix based on confirmed bookings.                    | Every 15 minutes during business hours (08:00-20:00) | CacheService.RefreshHallAvailability() |

All scheduled agents include error handling with logging and email notifications to administrators in case of failures.

### 4.7 Technical Concern

**Factors Affecting System Performance:**

1. **Seasonal Data Growth Pattern**

   - Peak wedding season (October-March) causes 3-4x increase in booking volume
   - System must handle surge in concurrent users during peak hours
   - Database query optimization required for hall availability checks
   - Risk Level: Medium - Requires performance monitoring and optimization

2. **Complex Booking Validation Rules**

   - Multiple business rules must be validated during booking submission:
     - Hall availability by date and shift
     - Minimum table quantity (≥80% of hall capacity)
     - Minimum deposit amount (≥20% of estimated cost)
     - Reserved table limit calculation
   - Each validation requires database queries
   - Risk Level: Medium - May slow down booking submission process

3. **Invoice Calculation Complexity**

   - Real-time calculation of:
     - Table pricing (base price + menu items)
     - Service charges
     - Late payment penalties (1% per day)
     - Equipment damage costs
   - Multiple table joins required (Booking, Menu_Item, Service_Detail, Dish, Service)
   - Risk Level: Low - Single invoice calculation is fast, but batch processing may need optimization

4. **Report Generation Performance**

   - Monthly revenue reports aggregate data from multiple bookings
   - Requires calculation of revenue by date and percentages
   - Risk Level: Low - Monthly frequency allows acceptable 5-second processing time

5. **Database Connection Management**

   - Web application requires connection pooling
   - Network latency may affect response time
   - Risk Level: Medium - Implement connection pooling and retry logic

6. **User Concurrency**

   - Multiple staff members may access same booking simultaneously
   - Risk of data conflicts during updates
   - Risk Level: Medium - Implement optimistic concurrency control with row versioning

7. **Image Storage**

   - Hall, dish, and service images stored in system
   - Large image files may slow down loading
   - Risk Level: Low - Implement image caching, CDN, and optimization (WebP format, lazy loading)

8. **Data Archival**
   - Past booking data accumulates over years
   - May slow down queries if not properly indexed
   - Risk Level: Low - Implement data archiving strategy for old bookings

**Mitigation Strategies:**

- Implement database indexing on frequently queried fields (wedding_date, hall_id, shift_id, status)
- Use stored procedures or prepared statements for complex business logic calculations
- Implement caching for reference data (Hall_Type, Shift, Dish, Service) using Redis or in-memory cache
- Use async/await patterns for database operations to prevent blocking
- Implement connection pooling for database connections (pgBouncer for PostgreSQL)
- Regular database maintenance: vacuum, analyze, and statistics updates
- Monitor and optimize slow queries using database query analyzer
- Implement pagination for large data lists (50 items per page)
- Use CDN for static assets and image delivery
- Implement rate limiting to prevent API abuse
- Use database read replicas for reporting queries
- Implement proper error handling and retry logic with exponential backoff

## 5. Appendixes

### 5.1 Glossary

The list below contains all the necessary terms to interpret the document, including acronyms and abbreviations.

| Term  | Description                           |
| :---- | :------------------------------------ |
| _BR_  | **B**usiness **R**ule                 |
| _CBR_ | **C**ommon **B**usiness **R**ule      |
| _DB_  | **D**ata**b**ase                      |
| _MSG_ | **M**es**s**a**g**e                   |
| _UC_  | **U**se **C**ase                      |
| _WMS_ | **W**edding **M**anagement **S**ystem |
| _JWT_ | **J**SON **W**eb **T**oken            |

### 5.2 Messages

This section describes the details of messages used in business rules e.g. error messages, confirmation messages, etc.

| Message Code | Message Content                                                                                       | Button |
| :----------- | :---------------------------------------------------------------------------------------------------- | :----- |
| _MSG 1_      | "Username and password are required."                                                                 | OK     |
| _MSG 2_      | "Invalid username or password."                                                                       | OK     |
| _MSG 3_      | "Invalid username or password or account is not active."                                              | OK     |
| _MSG 4_      | "Welcome, [User.username]!"                                                                           | -      |
| _MSG 5_      | "You have been logged out successfully."                                                              | -      |
| _MSG 6_      | "All fields are required."                                                                            | OK     |
| _MSG 7_      | "Invalid email format."                                                                               | OK     |
| _MSG 8_      | "Phone must be 10 digits."                                                                            | OK     |
| _MSG 9_      | "Email already exists in system."                                                                     | OK     |
| _MSG 10_     | "Failed to update profile. Please try again."                                                         | OK     |
| _MSG 11_     | "Profile updated successfully."                                                                       | -      |
| _MSG 12_     | "Password must be at least 8 characters with uppercase, lowercase, digit and special character."      | OK     |
| _MSG 13_     | "New password and confirm password do not match."                                                     | OK     |
| _MSG 14_     | "Current password is incorrect."                                                                      | OK     |
| _MSG 15_     | "Failed to change password. Please try again."                                                        | OK     |
| _MSG 16_     | "Password changed successfully. Please login with your new password."                                 | -      |
| _MSG 17_     | "Username must be 4-50 alphanumeric characters."                                                      | OK     |
| _MSG 18_     | "Password and confirm password do not match."                                                         | OK     |
| _MSG 19_     | "You must agree to terms and conditions."                                                             | OK     |
| _MSG 20_     | "Username already exists."                                                                            | OK     |
| _MSG 21_     | "Email already exists."                                                                               | OK     |
| _MSG 22_     | "Registration failed. Please try again."                                                              | OK     |
| _MSG 23_     | "Registration successful! Please login with your account."                                            | -      |
| _MSG 24_     | "Email is required."                                                                                  | OK     |
| _MSG 25_     | "If your email exists in our system, you will receive a password reset link."                         | -      |
| _MSG 26_     | "Invalid or expired reset link."                                                                      | OK     |
| _MSG 27_     | "Failed to reset password. Please try again."                                                         | OK     |
| _MSG 28_     | "All required fields must be filled."                                                                 | OK     |
| _MSG 29_     | "CCCD must be 12 digits."                                                                             | OK     |
| _MSG 30_     | "Failed to create user. Please try again."                                                            | OK     |
| _MSG 31_     | "User created successfully."                                                                          | -      |
| _MSG 32_     | "User not found."                                                                                     | OK     |
| _MSG 33_     | "Failed to update user. Please try again."                                                            | OK     |
| _MSG 34_     | "User updated successfully."                                                                          | -      |
| _MSG 35_     | "Cannot delete user. User has [reference_count] associated bookings/invoices."                        | OK     |
| _MSG 36_     | "Failed to delete user. Please try again."                                                            | OK     |
| _MSG 37_     | "User deleted successfully."                                                                          | -      |
| _MSG 38_     | "Group code and group name are required."                                                             | OK     |
| _MSG 39_     | "Group code must be 3-20 uppercase alphanumeric characters with underscores."                         | OK     |
| _MSG 40_     | "Group name must be 3-100 characters."                                                                | OK     |
| _MSG 41_     | "Please select at least one function for this permission group."                                      | OK     |
| _MSG 42_     | "Group code already exists."                                                                          | OK     |
| _MSG 43_     | "Group name already exists."                                                                          | OK     |
| _MSG 44_     | "Failed to create permission group. Please try again."                                                | OK     |
| _MSG 45_     | "Permission group created successfully."                                                              | -      |
| _MSG 46_     | "Group name is required."                                                                             | OK     |
| _MSG 47_     | "Failed to update permission group. Please try again."                                                | OK     |
| _MSG 48_     | "Permission group updated successfully."                                                              | -      |
| _MSG 49_     | "Cannot delete permission group. [COUNT] user(s) are assigned to this group."                         | OK     |
| _MSG 50_     | "Failed to delete permission group. Please try again."                                                | OK     |
| _MSG 51_     | "Permission group deleted successfully."                                                              | -      |
| _MSG 52_     | "Penalty rate must be between 0% and 100%."                                                           | OK     |
| _MSG 53_     | "Minimum deposit rate must be greater than 0% and up to 100%."                                        | OK     |
| _MSG 54_     | "Minimum table reservation rate must be greater than 0% and up to 100%."                              | OK     |
| _MSG 55_     | "Failed to update system parameters. Please try again."                                               | OK     |
| _MSG 56_     | "System parameters updated successfully. Changes will take effect immediately."                       | -      |
| _MSG 57_     | "Hall name, hall type, and max tables are required."                                                  | OK     |
| _MSG 58_     | "Hall name must be 3-100 characters."                                                                 | OK     |
| _MSG 59_     | "Max tables must be a positive number."                                                               | OK     |
| _MSG 60_     | "Hall name already exists."                                                                           | OK     |
| _MSG 61_     | "Failed to create hall. Please try again."                                                            | OK     |
| _MSG 62_     | "Hall created successfully."                                                                          | -      |
| _MSG 63_     | "Failed to update hall. Please try again."                                                            | OK     |
| _MSG 64_     | "Hall updated successfully."                                                                          | -      |
| _MSG 65_     | "Cannot delete hall. Hall has [COUNT] associated booking(s)."                                         | OK     |
| _MSG 66_     | "Failed to delete hall. Please try again."                                                            | OK     |
| _MSG 67_     | "Hall deleted successfully."                                                                          | -      |
| _MSG 68_     | "No data to export."                                                                                  | OK     |
| _MSG 69_     | "Hall type name and minimum table price are required."                                                | OK     |
| _MSG 70_     | "Hall type name must be 3-100 characters."                                                            | OK     |
| _MSG 71_     | "Minimum table price must be a positive number."                                                      | OK     |
| _MSG 72_     | "Hall type name already exists."                                                                      | OK     |
| _MSG 73_     | "Failed to create hall type. Please try again."                                                       | OK     |
| _MSG 74_     | "Hall type created successfully."                                                                     | -      |
| _MSG 75_     | "Failed to update hall type. Please try again."                                                       | OK     |
| _MSG 76_     | "Hall type updated successfully."                                                                     | -      |
| _MSG 77_     | "Cannot delete hall type. [COUNT] hall(s) are using this type."                                       | OK     |
| _MSG 78_     | "Failed to delete hall type. Please try again."                                                       | OK     |
| _MSG 79_     | "Hall type deleted successfully."                                                                     | -      |
| _MSG 80_     | "Dish name and price are required."                                                                   | OK     |
| _MSG 81_     | "Dish name must be 3-100 characters."                                                                 | OK     |
| _MSG 82_     | "Price must be a positive number."                                                                    | OK     |
| _MSG 83_     | "Dish name already exists."                                                                           | OK     |
| _MSG 84_     | "Failed to create dish. Please try again."                                                            | OK     |
| _MSG 85_     | "Dish created successfully."                                                                          | -      |
| _MSG 86_     | "Failed to update dish. Please try again."                                                            | OK     |
| _MSG 87_     | "Dish updated successfully."                                                                          | -      |
| _MSG 88_     | "Cannot delete dish. This dish is used in [COUNT] menu item(s)."                                      | OK     |
| _MSG 89_     | "Failed to delete dish. Please try again."                                                            | OK     |
| _MSG 90_     | "Dish deleted successfully."                                                                          | -      |
| _MSG 91_     | "Service name and price are required."                                                                | OK     |
| _MSG 92_     | "Service name must be 3-100 characters."                                                              | OK     |
| _MSG 93_     | "Price must be a positive number."                                                                    | OK     |
| _MSG 94_     | "Service name already exists."                                                                        | OK     |
| _MSG 95_     | "Failed to create service. Please try again."                                                         | OK     |
| _MSG 96_     | "Service created successfully."                                                                       | -      |
| _MSG 97_     | "Failed to update service. Please try again."                                                         | OK     |
| _MSG 98_     | "Service updated successfully."                                                                       | -      |
| _MSG 99_     | "Cannot delete service. This service is used in [COUNT] booking(s)."                                  | OK     |
| _MSG 100_    | "Failed to delete service. Please try again."                                                         | OK     |
| _MSG 101_    | "Service deleted successfully."                                                                       | -      |
| _MSG 102_    | "Shift name, start time, and end time are required."                                                  | OK     |
| _MSG 103_    | "Shift name must be 3-100 characters."                                                                | OK     |
| _MSG 104_    | "Start time must be before end time."                                                                 | OK     |
| _MSG 105_    | "Shift name already exists."                                                                          | OK     |
| _MSG 106_    | "Failed to create shift. Please try again."                                                           | OK     |
| _MSG 107_    | "Shift created successfully."                                                                         | -      |
| _MSG 108_    | "Failed to update shift. Please try again."                                                           | OK     |
| _MSG 109_    | "Shift updated successfully."                                                                         | -      |
| _MSG 110_    | "Cannot delete shift. This shift is used in [COUNT] booking(s)."                                      | OK     |
| _MSG 111_    | "Failed to delete shift. Please try again."                                                           | OK     |
| _MSG 112_    | "Shift deleted successfully."                                                                         | -      |
| _MSG 113_    | "Date must be in future."                                                                             | OK     |
| _MSG 114_    | "No available halls found. Try other dates or shifts."                                                | -      |
| _MSG 115_    | "Wedding date must be in future."                                                                     | OK     |
| _MSG 116_    | "Number of tables exceeds hall capacity of [max_tables] tables."                                      | OK     |
| _MSG 117_    | "Hall is no longer available for selected date and shift."                                            | OK     |
| _MSG 118_    | "Booking submitted successfully. Booking ID: [booking_id]. Please check your email for confirmation." | -      |
| _MSG 119_    | "No bookings found. Create your first wedding booking!"                                               | -      |
| _MSG 120_    | "Cannot load booking details. Please try again."                                                      | OK     |
| _MSG 121_    | "Cannot edit this booking. Only pending bookings can be edited."                                      | OK     |
| _MSG 122_    | "Booking updated successfully."                                                                       | -      |
| _MSG 123_    | "Cannot cancel this booking. Booking is already [status] or date has passed."                         | OK     |
| _MSG 124_    | "Booking cancelled successfully. Deposit [deposit_amount] VND is non-refundable as per policy."       | -      |
| _MSG 125_    | "No bookings found. Try adjusting search criteria."                                                   | -      |
| _MSG 126_    | "Booking does not exist."                                                                             | OK     |
| _MSG 127_    | "No halls in system."                                                                                 | OK     |
| _MSG 128_    | "Number of tables exceeds hall capacity."                                                             | OK     |
| _MSG 129_    | "Hall is already booked for selected date and shift."                                                 | OK     |
| _MSG 130_    | "Booking created successfully. Booking ID: [booking_id]."                                             | -      |
| _MSG 131_    | "Cannot edit completed or cancelled bookings."                                                        | OK     |
| _MSG 132_    | "Cannot delete booking. Database error occurred."                                                     | OK     |
| _MSG 133_    | "Booking deleted successfully."                                                                       | -      |
| _MSG 134_    | "You don't have any invoices yet."                                                                    | -      |
| _MSG 135_    | "Cannot load invoice details. Please try again."                                                      | OK     |
| _MSG 136_    | "Payment amount must be greater than 0."                                                              | OK     |
| _MSG 137_    | "Payment amount cannot exceed outstanding balance of [remaining_amount] VND."                         | OK     |
| _MSG 138_    | "Payment failed. Please try again or contact support."                                                | OK     |
| _MSG 139_    | "Error occurred during payment processing. Please contact support."                                   | OK     |
| _MSG 140_    | "Payment successful! Amount paid: [payment_amount] VND. Remaining balance: [new_remaining] VND."      | -      |
| _MSG 141_    | "Cannot create PDF file. Please try again or contact support."                                        | OK     |
| _MSG 142_    | "Cannot download file. Please check your connection or browser settings."                             | OK     |
| _MSG 143_    | "Invoice PDF exported successfully."                                                                  | -      |
| _MSG 144_    | "Error occurred during payment confirmation. Please try again."                                       | OK     |
| _MSG 145_    | "Payment confirmation successful. Total processed: [remaining_amount + penalty_amount] VND."          | -      |
| _MSG 146_    | "Cannot create PDF file. Please try again."                                                           | OK     |
| _MSG 147_    | "Cannot download file. Please check your connection."                                                 | OK     |
| _MSG 148_    | "Official invoice PDF exported successfully."                                                         | -      |
| _MSG 149_    | "No report data for this month."                                                                      | -      |
| _MSG 150_    | "Cannot load report data. Please try again."                                                          | OK     |
| _MSG 151_    | "Cannot create Excel file. Please try again."                                                         | OK     |
| _MSG 152_    | "Cannot download file. Please check your connection and disk space."                                  | OK     |
| _MSG 153_    | "Export Excel successful. File saved to Downloads folder."                                            | -      |

### 5.3 Issues List

N/A
