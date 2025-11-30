**SOFTWARE REQUIREMENTS SPECIFICATION**

Wedding Management System

**WMS \- Wedding Management System**

## Revision and Signoff Sheet

### Change Record

| Author | Version | Change reference | Date |
| :---- | :---- | :---- | :---- |
| WMS Team | 0.1.0 | Initial project creation | 24/11/2025 |

### Reviewers

| Name | Company | Version | Position | Date |
| :---- | :---- | :---- | :---- | :---- |
| Project Manager | WMS | 0.1.0 | Project Manager | 24/11/2025 |

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

[Use Case Description 6](#use-case-description)

[Activities Flow 7](#activities-flow)

[Business Rules 7](#business-rules)

[2.1.1.2 Logout 8](#2112-logout)

[Use Case Description 8](#use-case-description-1)

[Activities Flow 8](#activities-flow-1)

[Business Rules 9](#business-rules-1)

[2.2 List Description 10](#22-list-description)

[2.3 View Description 10](#23-view-description)

[**3\. Non-functional Requirements 10**](#3-non-functional-requirements)

[3.1 User Access and Security 10](#31-user-access-and-security)

[3.2 Performance Requirements 10](#32-performance-requirements)

[3.3 Implementation Requirements 10](#33-implementation-requirements)

[**4\. Other Requirements 10**](#4-other-requirements)

[4.1 Archive Function 10](#41-archive-function)

[4.2 Security Audit Function 10](#42-security-audit-function)

[**5\. Appendixes 10**](#5-appendixes)

[5.1 Glossary 10](#51-glossary)

[5.2 Messages 10](#52-messages)

[5.3 Issues List 10](#53-issues-list)

## 1\. Introduction

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

**1\. Introduction**: General introduction and overview of this document.  
**2\. Functional Requirements**: Detailed description of functional requirements including use cases and business rules.  
**3\. Non-functional Requirements**: Description of non-functional requirements such as security, performance, and interface requirements.  
**4\. Other Requirements**: Additional requirements including archive functions and other supporting features.  
**5\. Appendixes**: Supporting information including glossary, messages, and issues list.

### 1.4 References

| \# | Title | Version | File Name / Link | Description |
| :---- | :---- | :---- | :---- | :---- |
| 1 | Use Case Diagrams | 0.1.0 | Use Case Documentation | Complete use case diagrams for all user roles |
| 2 | Activity Diagrams | 0.1.0 | Activity Documentation | Activity flow diagrams for business processes |
| 3 | Database Schema | 0.1.0 | Database Design Document | Entity-relationship diagrams and table definitions |

## 2\. Functional Requirements

### 2.1 Use Case Description

#### 2.1.1 Authentication Use Case

##### 2.1.1.1 Login

###### *Use Case Description*

| Name | Login |
| :---- | :---- |
| **Description** | This use case allows users (Customer, Staff, Administrator) to authenticate and access the WMS system using their credentials (username and password). |
| **Actor** | Customer, Staff, Administrator |
| **Trigger** | User accesses login page and clicks "Login" button after entering credentials. |
| **Pre-condition** | User's device must be connected to the internet. User must have an existing account with status "active" in the system. System is operational. |
| **Post-condition** | User is successfully authenticated with valid JWT token (access \+ refresh), user session is created, and user is redirected to role-appropriate home page. |

(Refer to "Activity Login" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR1* | **Loading Screen Rules:** The system loads "Login" screen with fields: \[txtBoxUsername\] for username input, \[txtBoxPassword\] for password input with password masking, \[btnLogin\] button for form submission, \[linkForgotPassword\] hyperlink to password recovery, and \[linkRegisterAccount\] hyperlink to registration. (Refer to "Login" view in "View Description" file) |
| *(5), (5.1)* | *BR2* | **Validation Rules:** When user enters credentials and clicks \[btnLogin\], system validates input using Text\_change() method. System checks: If \[txtBoxUsername\].Text.isEmpty() \= true OR \[txtBoxPassword\].Text.isEmpty() \= true: System calls displayErrorMessage("Username and password are required.") (Refer to MSG 1\) and returns to step (3). System queries user account from table "User" (Refer to "User" table in "DB Sheet" file) with SQL: "SELECT user\_id, username, password\_hash, role, status FROM User WHERE username \= \[txtBoxUsername\].Text AND status \= 'active'". If COUNT \= 0: System calls displayErrorMessage("Invalid username or password.") (Refer to MSG 2\) and returns to step (3). |
| *(6), (6.1)* | *BR3* | **Validation Rules:** System verifies password by calling bcryptCompare(\[txtBoxPassword\].Text, User.password\_hash) method. If bcryptCompare() returns false OR User.status \!= 'active': System calls displayErrorMessage("Invalid username or password or account is not active.") (Refer to MSG 3\) and use case ends at step (6.1). |
| *(7), (8), (9)* | *BR4* | **Querying Rules:** System queries user permissions and generates JWT access token with payload {user\_id, username, role, exp: 24h} and refresh token with exp: 30 days. System executes SQL INSERT: "INSERT INTO Refresh\_Token (user\_id, token, expires\_at) VALUES (\[user\_id\], \[refresh\_token\], \[expiry\_datetime\])". System stores both tokens in browser localStorage by calling localStorage.setItem('accessToken', access\_token) and localStorage.setItem('refreshToken', refresh\_token). (Refer to "Refresh\_Token" table in "DB Sheet" file) |
| *(10), (11)* | *BR5* | **Displaying Rules:** System redirects user to home page using redirectToHomePage(User.role) method. System displays "Home" view corresponding to user role: If User.role \= 'Customer' → display "Customer Home" view showing available halls and upcoming bookings; If User.role \= 'Staff' → display "Staff Dashboard" view showing today's bookings and pending tasks; If User.role \= 'Admin' → display "Admin Dashboard" view showing system statistics and reports. (Refer to "Home" view in "View Description" file). System displays success notification "Welcome, \[User.username\]\!" (Refer to MSG 4). |

##### 2.1.1.2 Logout

###### *Use Case Description*

| Name | Logout |
| :---- | :---- |
| **Description** | This use case allows authenticated users (Customer, Staff, Administrator) to log out from the WMS system, invalidate their session tokens, and return to the login page. |
| **Actor** | Customer, Staff, Administrator |
| **Trigger** | User clicks "Logout" button in the navigation menu or profile dropdown. |
| **Pre-condition** | User must be signed in with valid access token and refresh token stored in local storage. System is operational. |
| **Post-condition** | User's access token is added to blacklist, refresh token is deleted from database, tokens are cleared from local storage, user session is terminated, and user is redirected to login page. |

(Refer to "Activity Logout" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2), (3)* | *BR6* | **Displaying Rules:** When user clicks \[btnLogout\] at step (1), system displays a confirmation dialog with message "Are you sure you want to logout?" showing \[btnConfirm\] and \[btnCancel\] buttons via displayConfirmationDialog(). (Refer to "Logout Confirmation Dialog" in "View Description" file). If user clicks \[btnCancel\]: System closes dialog and returns to previous screen without logging out. If user clicks \[btnConfirm\]: System proceeds to step (4) to perform logout process. |
| *(4)* | *BR7* | **Querying Rules:** System retrieves access token from localStorage.getItem('accessToken'). System executes SQL INSERT to add token to blacklist table: "INSERT INTO Token\_Blacklist (token, blacklisted\_at, expires\_at) VALUES (\[access\_token\], NOW(), \[token\_expiry\_time\])" by calling addTokenToBlacklist(). This prevents the access token from being used for future authenticated requests. (Refer to "Token\_Blacklist" table in "DB Sheet" file) |
| *(5)* | *BR8* | **Querying Rules:** System retrieves refresh token from localStorage.getItem('refreshToken'). System executes SQL DELETE to remove refresh token from database: "DELETE FROM Refresh\_Token WHERE token \= \[refresh\_token\] AND user\_id \= \[current\_user\_id\]" by calling deleteRefreshToken(). This invalidates the refresh token and prevents token refresh operations. (Refer to "Refresh\_Token" table in "DB Sheet" file) |
| *(6), (7), (8)* | *BR9* | **Displaying Rules:** System clears all authentication tokens from browser local storage by calling localStorage.removeItem('accessToken') and localStorage.removeItem('refreshToken'). System clears any cached user data and session information. System redirects user to login screen via redirectToLoginPage(). System displays success notification "You have been logged out successfully." (Refer to MSG 5\) on the login page. |

##### 2.1.1.3 Manage Profile

###### *Use Case Description*

This use case allows authenticated users (Customer, Staff, Admin) to view and edit their personal profile information including email, phone, and full name. The system validates all inputs and ensures email uniqueness before updating the user record in the database.

###### *Actors*

- User (Customer, Staff, Admin)

###### *Preconditions*

- User must be logged in with valid JWT access token

###### *Postconditions*

- User profile information is updated in the database  
- Updated profile data is displayed in the form

(Refer to "Activity Manage Profile" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR10* | **Loading Screen Rules:** System loads "Manage Profile" screen via displayProfileForm() with fields populated from current user data: \[txtBoxEmail\] for email, \[txtBoxPhone\] for phone number, \[txtBoxFullName\] for full name, \[lblUsername\] displaying read-only username, \[lblRole\] displaying user role, \[btnSaveChanges\] button for form submission, \[btnCancel\] button to discard changes. System queries user data with SQL: "SELECT user\_id, username, email, phone, full\_name, role FROM User WHERE user\_id \= \[current\_user\_id\]" and populates form fields. (Refer to "Manage Profile" view in "View Description" file) |
| *(5), (5.1)* | *BR11* | **Validation Rules:** System validates input when user clicks \[btnSaveChanges\]. System checks: If \[txtBoxEmail\].Text.isEmpty() \= true OR \[txtBoxPhone\].Text.isEmpty() \= true OR \[txtBoxFullName\].Text.isEmpty() \= true: System calls displayErrorMessage("All fields are required.") (Refer to MSG 6\) and returns to step (3). System validates email format with regex pattern "^\[a-zA-Z0-9.\_%+-\]+@\[a-zA-Z0-9.-\]+\\.\[a-zA-Z\]{2,}$". If email format invalid: System calls displayErrorMessage("Invalid email format.") (Refer to MSG 7\) and returns to step (3). System validates phone with regex pattern "^\\d{10}$". If phone invalid: System calls displayErrorMessage("Phone must be 10 digits.") (Refer to MSG 8\) and returns to step (3). System queries to check email uniqueness with SQL: "SELECT COUNT(\*) FROM User WHERE email \= \[txtBoxEmail\].Text AND user\_id \!= \[current\_user\_id\]". If COUNT \> 0: System calls displayErrorMessage("Email already exists in system.") (Refer to MSG 9\) and returns to step (3). |
| *(6), (7)* | *BR12* | **Querying Rules:** System executes SQL UPDATE to update user profile: "UPDATE User SET email \= \[txtBoxEmail\].Text, phone \= \[txtBoxPhone\].Text, full\_name \= \[txtBoxFullName\].Text, updated\_at \= NOW() WHERE user\_id \= \[current\_user\_id\]" via updateUserProfile(). If SQL execution fails: System calls displayErrorMessage("Failed to update profile. Please try again.") (Refer to MSG 10\) and use case ends at step (7a). (Refer to "User" table in "DB Sheet" file) |
| *(7), (8)* | *BR13* | **Displaying Rules:** System displays success notification "Profile updated successfully." (Refer to MSG 11\) via displaySuccessMessage(). System reloads profile form by querying updated user data with SQL: "SELECT user\_id, username, email, phone, full\_name, role FROM User WHERE user\_id \= \[current\_user\_id\]" and refreshing all form fields with new values via reloadProfileForm(). |

##### 2.1.1.4 Change Password

###### *Use Case Description*

This use case allows authenticated users to change their account password. The system validates the current password using BCrypt, ensures new password meets security requirements, hashes the new password, updates the database, and invalidates all existing sessions by deleting refresh tokens and blacklisting the current access token to force re-authentication.

###### *Actors*

- User (Customer, Staff, Admin)

###### *Preconditions*

- User must be logged in with valid JWT access token

###### *Postconditions*

- User password is updated in the database  
- All user sessions are terminated  
- User is redirected to login page

(Refer to "Activity Change Password" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR14* | **Loading Screen Rules:** System loads "Change Password" screen via displayChangePasswordForm() with fields: \[txtBoxCurrentPassword\] for current password with masking, \[txtBoxNewPassword\] for new password with masking, \[txtBoxConfirmPassword\] for password confirmation with masking, \[btnChangePassword\] button for form submission, \[btnCancel\] button to discard changes. All password fields use type="password" for security masking. (Refer to "Change Password" view in "View Description" file) |
| *(5), (5.1)* | *BR15* | **Validation Rules:** System validates input when user clicks \[btnChangePassword\]. System checks: If \[txtBoxCurrentPassword\].Text.isEmpty() \= true OR \[txtBoxNewPassword\].Text.isEmpty() \= true OR \[txtBoxConfirmPassword\].Text.isEmpty() \= true: System calls displayErrorMessage("All fields are required.") (Refer to MSG 6\) and returns to step (3). System validates new password strength: length \>= 8 characters, contains at least 1 uppercase, 1 lowercase, 1 digit, 1 special character using regex "^(?=.*\[a-z\])(?=.*\[A-Z\])(?=.*\\d)(?=.*\[@$\!%*?&\#\])\[A-Za-z\\d@$\!%*?&\#\]{8,}$". If validation fails: System calls displayErrorMessage("Password must be at least 8 characters with uppercase, lowercase, digit and special character.") (Refer to MSG 12\) and returns to step (3). System checks if \[txtBoxNewPassword\].Text \== \[txtBoxConfirmPassword\].Text. If passwords don't match: System calls displayErrorMessage("New password and confirm password do not match.") (Refer to MSG 12\) and returns to step (3). System queries current user password hash from database with SQL: "SELECT password\_hash FROM User WHERE user\_id \= \[current\_user\_id\]" and verifies current password by calling bcryptCompare(\[txtBoxCurrentPassword\].Text, User.password\_hash). If bcryptCompare() returns false: System calls displayErrorMessage("Current password is incorrect.") (Refer to MSG 12\) and returns to step (3). |
| *(6), (7), (8)* | *BR16* | **Querying Rules:** System hashes new password by calling bcryptHash(\[txtBoxNewPassword\].Text, saltRounds=10) to generate new\_password\_hash. System executes SQL UPDATE: "UPDATE User SET password\_hash \= \[new\_password\_hash\], updated\_at \= NOW() WHERE user\_id \= \[current\_user\_id\]" via updatePassword(). If SQL execution fails: System calls displayErrorMessage("Failed to change password. Please try again.") (Refer to MSG 12\) and use case ends at step (7a). System invalidates all user sessions by: (1) Deleting all refresh tokens with SQL: "DELETE FROM Refresh\_Token WHERE user\_id \= \[current\_user\_id\]" via deleteAllUserRefreshTokens(), (2) Adding current access token to blacklist with SQL: "INSERT INTO Token\_Blacklist (token, blacklisted\_at, expires\_at) VALUES (\[current\_access\_token\], NOW(), \[token\_expiry\_time\])" via addTokenToBlacklist(), (3) Clearing localStorage by calling localStorage.clear(). System displays success message "Password changed successfully. Please login with your new password." (Refer to MSG 12\) and redirects to login page via redirectToLoginPage(). (Refer to "User", "Refresh\_Token" and "Token\_Blacklist" tables in "DB Sheet" file) |

##### 2.1.1.5 Register Account

###### *Use Case Description*

This use case allows new customers to create an account in the Wedding Management System through the web registration page. The system validates all registration inputs, ensures username and email uniqueness, hashes the password using BCrypt, creates a new user record with Customer role, sends a welcome email, and redirects to the login page.

###### *Actors*

- Customer (prospective user)

###### *Preconditions*

- User accesses the public registration page (Web only)  
- User is not logged in

###### *Postconditions*

- New user account is created in the database with Customer role  
- Welcome email is sent to user's email address  
- User is redirected to login page

(Refer to "Activity Register Account" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR17* | **Loading Screen Rules:** System loads "Register Account" screen via displayRegistrationForm() with fields: \[txtBoxUsername\] for username input, \[txtBoxEmail\] for email input, \[txtBoxPhone\] for phone number input, \[txtBoxFullName\] for full name input, \[txtBoxPassword\] for password input with masking, \[txtBoxConfirmPassword\] for password confirmation with masking, \[btnRegister\] button for form submission, \[linkLoginPage\] hyperlink to navigate back to login page, \[chkboxAgreeTerms\] checkbox for terms and conditions agreement. (Refer to "Register Account" view in "View Description" file) |
| *(5), (5.1)* | *BR18* | **Validation Rules:** System validates input when user clicks \[btnRegister\]. System checks: If \[txtBoxUsername\].Text.isEmpty() OR \[txtBoxEmail\].Text.isEmpty() OR \[txtBoxPhone\].Text.isEmpty() OR \[txtBoxFullName\].Text.isEmpty() OR \[txtBoxPassword\].Text.isEmpty() OR \[txtBoxConfirmPassword\].Text.isEmpty(): System calls displayErrorMessage("All fields are required.") (Refer to MSG 6\) and returns to step (3). System validates username length 4-50 characters and alphanumeric with regex "^\[a-zA-Z0-9\_\]{4,50}$". If invalid: System calls displayErrorMessage("Username must be 4-50 alphanumeric characters.") (Refer to MSG 12\) and returns to step (3). System validates email format with regex "^\[a-zA-Z0-9.*%+-\]+@\[a-zA-Z0-9.-\]+\\.\[a-zA-Z\]{2,}$". If invalid: System calls displayErrorMessage("Invalid email format.") (Refer to MSG 7\) and returns to step (3). System validates phone with regex "^\\d{10}$". If invalid: System calls displayErrorMessage("Phone must be 10 digits.") (Refer to MSG 8\) and returns to step (3). System validates password strength: length \>= 8 characters, contains at least 1 uppercase, 1 lowercase, 1 digit, 1 special character using regex "^(?=.\[a-z\])(?=.\[A-Z\])(?=.\\d)(?=.\[@$\!%*?&\#\])\[A-Za-z\\d@$\!%\_?&\#\]{8,}$". If validation fails: System calls displayErrorMessage("Password must be at least 8 characters with uppercase, lowercase, digit and special character.") (Refer to MSG 12\) and returns to step (3). System checks \[txtBoxPassword\].Text \== \[txtBoxConfirmPassword\].Text. If not equal: System calls displayErrorMessage("Password and confirm password do not match.") (Refer to MSG 18\) and returns to step (3). System checks \[chkboxAgreeTerms\].Checked \= true. If false: System calls displayErrorMessage("You must agree to terms and conditions.") (Refer to MSG 12\) and returns to step (3). System queries to check username uniqueness with SQL: "SELECT COUNT(\*) FROM User WHERE username \= \[txtBoxUsername\].Text". If COUNT \> 0: System calls displayErrorMessage("Username already exists.") (Refer to MSG 20\) and returns to step (3). System queries to check email uniqueness with SQL: "SELECT COUNT(\*) FROM User WHERE email \= \[txtBoxEmail\].Text". If COUNT \> 0: System calls displayErrorMessage("Email already exists.") (Refer to MSG 21\) and returns to step (3). |
| *(6), (7), (8), (9)* | *BR19* | **Querying Rules:** System hashes password by calling bcryptHash(\[txtBoxPassword\].Text, saltRounds=10) to generate password\_hash. System executes SQL INSERT: "INSERT INTO User (username, email, phone, full\_name, password\_hash, role, status, created\_at) VALUES (\[txtBoxUsername\].Text, \[txtBoxEmail\].Text, \[txtBoxPhone\].Text, \[txtBoxFullName\].Text, \[password\_hash\], 'CUSTOMER', 'active', NOW())" via createNewUser(). If SQL execution fails: System calls displayErrorMessage("Registration failed. Please try again.") (Refer to MSG 22\) and use case ends at step (8a). System sends welcome email to \[txtBoxEmail\].Text with subject "Welcome to Wedding Management System" via sendWelcomeEmail(). System displays success message "Registration successful\! Please login with your account." (Refer to MSG 18\) and redirects to login page via redirectToLoginPage(). (Refer to "User" table in "DB Sheet" file) |

##### 2.1.1.6 Forgot Password

###### *Use Case Description*

This use case allows users who have forgotten their password to reset it through an email-based verification process. The system generates a secure reset token, sends an email with a reset link, validates the token, allows the user to set a new password, updates the database, and terminates all existing sessions.

###### *Actors*

- User (Customer, Staff, Admin)

###### *Preconditions*

- User has a registered account in the system  
- User accesses the forgot password page

###### *Postconditions*

- User password is reset in the database  
- All user sessions are terminated  
- Password reset token is deleted  
- User is redirected to login page

(Refer to "Activity Forgot Password" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR20* | **Loading Screen Rules:** System loads "Forgot Password \- Email Input" screen via displayForgotPasswordEmailForm() with fields: \[txtBoxEmail\] for email input, \[btnSubmitEmail\] button for form submission, \[linkBackToLogin\] hyperlink to return to login page. (Refer to "Forgot Password Email Input" view in "View Description" file) |
| *(4), (4.1), (5), (6)* | *BR21* | **Validation Rules:** System validates email when user clicks \[btnSubmitEmail\]. If \[txtBoxEmail\].Text.isEmpty() \= true: System calls displayErrorMessage("Email is required.") (Refer to MSG 12\) and returns to step (3). System validates email format with regex "^\[a-zA-Z0-9.\_%+-\]+@\[a-zA-Z0-9.-\]+\\.\[a-zA-Z\]{2,}$". If invalid: System calls displayErrorMessage("Invalid email format.") (Refer to MSG 7\) and returns to step (3). System queries user with SQL: "SELECT user\_id, username, email FROM User WHERE email \= \[txtBoxEmail\].Text AND status \= 'active'". If COUNT \= 0: System still displays success message (security measure to prevent email enumeration). System generates random reset token via generateSecureToken() (UUID format, 36 characters). System executes SQL INSERT: "INSERT INTO Password\_Reset\_Token (user\_id, token, expires\_at, created\_at) VALUES (\[user\_id\], \[reset\_token\], NOW() \+ INTERVAL 1 HOUR, NOW())" via saveResetToken(). System sends email to \[txtBoxEmail\].Text with reset link "https://\[domain\]/reset-password?token=\[reset\_token\]" via sendPasswordResetEmail(). System displays success message "If your email exists in our system, you will receive a password reset link." (Refer to MSG 20). (Refer to "Password\_Reset\_Token" table in "DB Sheet" file) |
| *(7), (8), (9)* | *BR22* | **Validation Rules:** When user clicks reset link from email, system extracts token from URL parameter. System queries password reset token with SQL: "SELECT prt.token, prt.expires\_at, prt.user\_id, u.username FROM Password\_Reset\_Token prt JOIN User u ON prt.user\_id \= u.user\_id WHERE prt.token \= \[url\_token\] AND prt.expires\_at \> NOW() AND prt.used \= false". If COUNT \= 0: System calls displayErrorMessage("Invalid or expired reset link.") (Refer to MSG 21\) and use case ends at step (8). If token is valid: System loads "Reset Password Form" screen via displayResetPasswordForm() with fields: \[txtBoxNewPassword\] for new password with masking, \[txtBoxConfirmPassword\] for password confirmation with masking, \[btnResetPassword\] button for form submission, \[hiddenTokenField\] containing reset token value. (Refer to "Reset Password Form" view in "View Description" file) |
| *(11), (12.1)* | *BR23* | **Validation Rules:** System validates password input when user clicks \[btnResetPassword\]. If \[txtBoxNewPassword\].Text.isEmpty() \= true OR \[txtBoxConfirmPassword\].Text.isEmpty() \= true: System calls displayErrorMessage("All fields are required.") (Refer to MSG 6\) and returns to step (10). System validates password strength: length \>= 8 characters, contains at least 1 uppercase, 1 lowercase, 1 digit, 1 special character using regex "^(?=.*\[a-z\])(?=.*\[A-Z\])(?=.*\\d)(?=.*\[@$\!%*?&\#\])\[A-Za-z\\d@$\!%*?&\#\]{8,}$". If validation fails: System calls displayErrorMessage("Password must be at least 8 characters with uppercase, lowercase, digit and special character.") (Refer to MSG 12\) and returns to step (10). System checks \[txtBoxNewPassword\].Text \== \[txtBoxConfirmPassword\].Text. If not equal: System calls displayErrorMessage("Password and confirm password do not match.") (Refer to MSG 18\) and returns to step (10). |
| *(12), (13), (14)* | *BR24* | **Querying Rules:** System hashes new password by calling bcryptHash(\[txtBoxNewPassword\].Text, saltRounds=10). System executes SQL UPDATE: "UPDATE User SET password\_hash \= \[new\_password\_hash\], updated\_at \= NOW() WHERE user\_id \= \[user\_id\_from\_token\]" via resetPassword(). If SQL execution fails: System calls displayErrorMessage("Failed to reset password. Please try again.") (Refer to MSG 22\) and use case ends. System marks token as used with SQL: "UPDATE Password\_Reset\_Token SET used \= true WHERE token \= \[reset\_token\]" via markTokenAsUsed(). System deletes all user refresh tokens with SQL: "DELETE FROM Refresh\_Token WHERE user\_id \= \[user\_id\_from\_token\]" via deleteAllUserRefreshTokens(). System displays success message "Password reset successfully\! Please login with your new password." (Refer to MSG 12\) and redirects to login page via redirectToLoginPage(). (Refer to "User", "Password\_Reset\_Token", and "Refresh\_Token" tables in "DB Sheet" file) |

#### 2.1.2 System Management Use Cases

##### 2.1.2.1 View User Details

###### *Use Case Description*

This use case allows administrators to view the list of all users in the system with search/filter capabilities, and view detailed information of any selected user including their permission group assignments.

###### *Actors*

- Admin

###### *Preconditions*

- Admin must be logged in with valid JWT access token  
- Admin has permission to view user details

###### *Postconditions*

- User list is displayed with search/filter results  
- Selected user's detailed information is shown

(Refer to "Activity View User Details" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR25* | **Loading Screen Rules:** System loads "User Management" screen via displayUsersList() with components: \[gridUsers\] data grid showing columns (user\_id, username, full\_name, email, role, status), \[txtBoxSearch\] for search input, \[cmbFilterRole\] dropdown for role filtering (All/Customer/Staff/Admin), \[cmbFilterStatus\] dropdown for status filtering (All/Active/Inactive), \[btnSearch\] button, \[btnAddNew\] button. System queries all users with SQL: "SELECT user\_id, username, full\_name, email, phone, role, status FROM User ORDER BY created\_at DESC" and populates grid. (Refer to "User Management" view in "View Description" file) |
| *(5), (6)* | *BR26* | **Querying Rules:** When admin enters search criteria and clicks \[btnSearch\], system builds dynamic SQL query. Base query: "SELECT user\_id, username, full\_name, email, phone, role, status FROM User WHERE 1=1". If \[txtBoxSearch\].Text not empty: Add "AND (username LIKE '%\[search\]%' OR full\_name LIKE '%\[search\]%' OR email LIKE '%\[search\]%')". If \[cmbFilterRole\].SelectedValue \!= 'All': Add "AND role \= \[selected\_role\]". If \[cmbFilterStatus\].SelectedValue \!= 'All': Add "AND status \= \[selected\_status\]". Execute query and refresh \[gridUsers\] via refreshUsersList(). |
| *(8), (9)* | *BR27* | **Querying Rules:** When admin selects a user from \[gridUsers\] and clicks view details, system queries user details with SQL: "SELECT u.user\_id, u.username, u.full\_name, u.email, u.phone, u.address, u.cccd, u.role, u.status, u.created\_at, pg.group\_name FROM User u LEFT JOIN Permission\_Group pg ON u.group\_id \= pg.group\_id WHERE u.user\_id \= \[selected\_user\_id\]". System displays modal dialog via displayUserDetailsDialog() showing all user information in read-only format. (Refer to "User" and "Permission\_Group" tables in "DB Sheet" file) |

##### 2.1.2.2 Add New User

###### *Use Case Description*

This use case allows administrators to create new user accounts (staff members) in the system. The system validates all inputs, ensures username and email uniqueness, hashes the password, and creates the user record with selected permission group.

###### *Actors*

- Admin

###### *Preconditions*

- Admin must be logged in with valid JWT access token  
- Admin has permission to add new users

###### *Postconditions*

- New user account is created in database  
- User appears in the users list

(Refer to "Activity Add New User" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR28* | **Loading Screen Rules:** System loads "Add New User" form via displayAddUserForm() with fields: \[txtBoxFullName\] for full name, \[txtBoxEmail\] for email, \[txtBoxPhone\] for phone, \[txtBoxAddress\] for address, \[txtBoxCCCD\] for citizen ID, \[txtBoxUsername\] for login username, \[txtBoxPassword\] for password with masking, \[cmbPermissionGroup\] dropdown populated with permission groups, \[cmbStatus\] dropdown (Active/Inactive), \[btnSave\] button, \[btnCancel\] button. System queries permission groups with SQL: "SELECT group\_id, group\_name FROM Permission\_Group WHERE status \= 'active'" to populate dropdown. (Refer to "Add User" view in "View Description" file) |
| *(5), (6), (6.1)* | *BR29* | **Validation Rules:** When admin clicks \[btnSave\], system validates all inputs. System checks: If \[txtBoxFullName\].Text.isEmpty() OR \[txtBoxEmail\].Text.isEmpty() OR \[txtBoxPhone\].Text.isEmpty() OR \[txtBoxUsername\].Text.isEmpty() OR \[txtBoxPassword\].Text.isEmpty(): System calls displayErrorMessage("All required fields must be filled.") (Refer to MSG 18\) and returns to step (3). System validates email format with regex "^\[a-zA-Z0-9.*%+-\]+@\[a-zA-Z0-9.-\]+\\.\[a-zA-Z\]{2,}$". If invalid: System calls displayErrorMessage("Invalid email format.") (Refer to MSG 7\) and returns to step (3). System validates phone with regex "^\\d{10}$". If invalid: System calls displayErrorMessage("Phone must be 10 digits.") (Refer to MSG 8\) and returns to step (3). System validates username length 4-50 characters with regex "^\[a-zA-Z0-9*\]{4,50}$". If invalid: System calls displayErrorMessage("Username must be 4-50 alphanumeric characters.") (Refer to MSG 12\) and returns to step (3). System validates password strength: length \>= 8 characters, contains at least 1 uppercase, 1 lowercase, 1 digit, 1 special character using regex "^(?=.*\[a-z\])(?=.*\[A-Z\])(?=.*\\d)(?=.*\[@$\!%*?&\#\])\[A-Za-z\\d@$\!%*?&\#\]{8,}$". If invalid: System calls displayErrorMessage("Password must be at least 8 characters with uppercase, lowercase, digit and special character.") (Refer to MSG 12\) and returns to step (3). System validates CCCD format (if provided) with regex "^\\d{12}$". If invalid: System calls displayErrorMessage("CCCD must be 12 digits.") (Refer to MSG 12\) and returns to step (3). System queries to check username uniqueness: "SELECT COUNT(\*) FROM User WHERE username \= \[txtBoxUsername\].Text". If COUNT \> 0: System calls displayErrorMessage("Username already exists.") (Refer to MSG 20\) and returns to step (3). System queries to check email uniqueness: "SELECT COUNT(\*) FROM User WHERE email \= \[txtBoxEmail\].Text". If COUNT \> 0: System calls displayErrorMessage("Email already exists.") (Refer to MSG 21\) and returns to step (3). |
| *(7), (8)* | *BR30* | **Querying Rules:** System hashes password by calling bcryptHash(\[txtBoxPassword\].Text, saltRounds=10) to generate password\_hash. System executes SQL INSERT: "INSERT INTO User (username, password\_hash, full\_name, email, phone, address, cccd, group\_id, role, status, created\_at) VALUES (\[txtBoxUsername\].Text, \[password\_hash\], \[txtBoxFullName\].Text, \[txtBoxEmail\].Text, \[txtBoxPhone\].Text, \[txtBoxAddress\].Text, \[txtBoxCCCD\].Text, \[cmbPermissionGroup\].SelectedValue, 'Staff', \[cmbStatus\].SelectedValue, NOW())" via createNewUser(). If SQL execution fails: System calls displayErrorMessage("Failed to create user. Please try again.") (Refer to MSG 30\) and use case ends. System displays success message "User created successfully." (Refer to MSG 20\) and redirects to users list via redirectToUsersList(). (Refer to "User" table in "DB Sheet" file) |

##### 2.1.2.3 Edit User

###### *Use Case Description*

This use case allows administrators to modify existing user information including personal details, permission group assignment, and account status. The system validates the user exists and is editable before allowing modifications.

###### *Actors*

- Admin

###### *Preconditions*

- Admin must be logged in with valid JWT access token  
- Admin has permission to edit users  
- Target user exists in the system

###### *Postconditions*

- User information is updated in database  
- Updated user data is reflected in the users list

(Refer to "Activity Edit User" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2), (2.1), (2.2), (3)* | *BR31* | **Validation Rules:** When admin selects user to edit, system queries user existence with SQL: "SELECT user\_id, username, full\_name, email, phone, address, cccd, group\_id, role, status FROM User WHERE user\_id \= \[selected\_user\_id\]". If COUNT \= 0: System calls displayErrorMessage("User not found.") (Refer to MSG 21\) and use case ends at step (2.2). System loads "Edit User" form via displayEditUserForm() with fields populated from query result: \[txtBoxFullName\], \[txtBoxEmail\], \[txtBoxPhone\], \[txtBoxAddress\], \[txtBoxCCCD\], \[lblUsername\] (read-only), \[cmbPermissionGroup\], \[cmbStatus\]. System queries permission groups to populate dropdown: "SELECT group\_id, group\_name FROM Permission\_Group WHERE status \= 'active'". (Refer to "Edit User" view in "View Description" file) |
| *(6), (6.1)* | *BR32* | **Validation Rules:** When admin clicks \[btnSave\], system validates inputs. System checks: If \[txtBoxFullName\].Text.isEmpty() OR \[txtBoxEmail\].Text.isEmpty() OR \[txtBoxPhone\].Text.isEmpty(): System calls displayErrorMessage("All required fields must be filled.") (Refer to MSG 18\) and returns to step (4). System validates email format with regex "^\[a-zA-Z0-9.\_%+-\]+@\[a-zA-Z0-9.-\]+\\.\[a-zA-Z\]{2,}$". If invalid: System calls displayErrorMessage("Invalid email format.") (Refer to MSG 7\) and returns to step (4). System validates phone with regex "^\\d{10}$". If invalid: System calls displayErrorMessage("Phone must be 10 digits.") (Refer to MSG 8\) and returns to step (4). System validates CCCD format (if provided) with regex "^\\d{12}$". If invalid: System calls displayErrorMessage("CCCD must be 12 digits.") (Refer to MSG 12\) and returns to step (4). System queries to check email uniqueness excluding current user: "SELECT COUNT(\*) FROM User WHERE email \= \[txtBoxEmail\].Text AND user\_id \!= \[current\_user\_id\]". If COUNT \> 0: System calls displayErrorMessage("Email already exists.") (Refer to MSG 21\) and returns to step (4). |
| *(7), (8)* | *BR33* | **Querying Rules:** System executes SQL UPDATE: "UPDATE User SET full\_name \= \[txtBoxFullName\].Text, email \= \[txtBoxEmail\].Text, phone \= \[txtBoxPhone\].Text, address \= \[txtBoxAddress\].Text, cccd \= \[txtBoxCCCD\].Text, group\_id \= \[cmbPermissionGroup\].SelectedValue, status \= \[cmbStatus\].SelectedValue, updated\_at \= NOW() WHERE user\_id \= \[selected\_user\_id\]" via updateUser(). If SQL execution fails: System calls displayErrorMessage("Failed to update user. Please try again.") (Refer to MSG 33\) and use case ends. System displays success message "User updated successfully." (Refer to MSG 34\) and reloads users list via reloadUsersList(). (Refer to "User" table in "DB Sheet" file) |

##### 2.1.2.4 Delete User

###### *Use Case Description*

This use case allows administrators to delete user accounts from the system. The system checks for referenced data (bookings, invoices) and prevents deletion if the user has existing transactions, requiring admin confirmation before deletion.

###### *Actors*

- Admin

###### *Preconditions*

- Admin must be logged in with valid JWT access token  
- Admin has permission to delete users  
- Target user exists in the system

###### *Postconditions*

- User is deleted from database (if no referenced data)  
- User is removed from users list

(Refer to "Activity Delete User" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(5), (5.1), (5.2)* | *BR34* | **Validation Rules:** When admin selects user and clicks delete, system queries referenced data with SQL: "SELECT (SELECT COUNT(\*) FROM Booking WHERE customer\_id \= \[selected\_user\_id\]) \+ (SELECT COUNT(\*) FROM Invoice WHERE user\_id \= \[selected\_user\_id\]) AS reference\_count". If reference\_count \> 0: System calls displayErrorMessage("Cannot delete user. User has \[reference\_count\] associated bookings/invoices.") (Refer to MSG 35\) and use case ends at step (5.2). |
| *(6), (7), (7.1), (7.2)* | *BR35* | **Displaying Rules:** System displays confirmation dialog via displayConfirmationDialog() with message "Are you sure you want to delete user '\[username\]'? This action cannot be undone.". If admin clicks \[btnCancel\]: System closes dialog via closeDialog() and use case ends at step (7.2). |
| *(8), (9)* | *BR36* | **Querying Rules:** System executes SQL DELETE in transaction: "DELETE FROM User WHERE user\_id \= \[selected\_user\_id\]" via deleteUser(). If SQL execution fails: System calls displayErrorMessage("Failed to delete user. Please try again.") (Refer to MSG 22\) and use case ends. System displays success message "User deleted successfully." (Refer to MSG 37\) and reloads users list via reloadUsersList(). (Refer to "User" table in "DB Sheet" file) |

##### 2.1.2.5 View Permission Group Details

###### *Use Case Description*

This use case allows administrators to view all permission groups in the system with search capabilities, and view detailed information of any selected permission group including assigned functions/permissions.

###### *Actors*

- Admin

###### *Preconditions*

- Admin must be logged in with valid JWT access token  
- Admin has permission to view permission groups

###### *Postconditions*

- Permission groups list is displayed with search results  
- Selected permission group's detailed information is shown

(Refer to "Activity View Permission Group Details" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR37* | **Loading Screen Rules:** System loads "Permission Groups Management" screen via displayPermissionGroupsList() with components: \[gridGroups\] data grid showing columns (group\_id, group\_code, group\_name, function\_count, status), \[txtBoxSearch\] for search input, \[btnSearch\] button, \[btnAddNew\] button. System queries all permission groups with SQL: "SELECT pg.group\_id, pg.group\_code, pg.group\_name, pg.status, COUNT(pf.function\_id) AS function\_count FROM Permission\_Group pg LEFT JOIN Permission\_Function pf ON pg.group\_id \= pf.group\_id GROUP BY pg.group\_id ORDER BY pg.created\_at DESC" and populates grid. (Refer to "Permission Groups Management" view in "View Description" file) |
| *(5), (6)* | *BR38* | **Querying Rules:** When admin enters search keyword in \[txtBoxSearch\] and clicks \[btnSearch\], system queries permission groups with SQL: "SELECT pg.group\_id, pg.group\_code, pg.group\_name, pg.status, COUNT(pf.function\_id) AS function\_count FROM Permission\_Group pg LEFT JOIN Permission\_Function pf ON pg.group\_id \= pf.group\_id WHERE pg.group\_code LIKE '%\[search\]%' OR pg.group\_name LIKE '%\[search\]%' GROUP BY pg.group\_id ORDER BY pg.created\_at DESC" and refreshes \[gridGroups\] via refreshPermissionGroupsList(). |
| *(8), (9)* | *BR39* | **Querying Rules:** When admin selects a permission group from \[gridGroups\] and clicks view details, system queries permission group details with SQL: "SELECT pg.group\_id, pg.group\_code, pg.group\_name, pg.status, pg.created\_at, f.function\_id, f.function\_code, f.function\_name FROM Permission\_Group pg LEFT JOIN Permission\_Function pf ON pg.group\_id \= pf.group\_id LEFT JOIN Function f ON pf.function\_id \= f.function\_id WHERE pg.group\_id \= \[selected\_group\_id\]". System displays modal dialog via displayPermissionGroupDetailsDialog() showing group information and list of assigned functions. (Refer to "Permission\_Group", "Permission\_Function", and "Function" tables in "DB Sheet" file) |

##### 2.1.2.6 Add New Permission Group

###### *Use Case Description*

This use case allows administrators to create new permission groups with assigned functions. The system validates inputs, ensures group code and name uniqueness, and creates the permission group with function assignments in a transaction.

###### *Actors*

- Admin

###### *Preconditions*

- Admin must be logged in with valid JWT access token  
- Admin has permission to add permission groups

###### *Postconditions*

- New permission group is created in database  
- Functions are assigned to the new group  
- Group appears in the permission groups list

(Refer to "Activity Add New Permission Group" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR40* | **Loading Screen Rules:** System loads "Add New Permission Group" form via displayAddPermissionGroupForm() with fields: \[txtBoxGroupCode\] for group code input, \[txtBoxGroupName\] for group name input, \[chkListFunctions\] checklist displaying all available functions, \[btnSave\] button, \[btnCancel\] button. System queries all functions with SQL: "SELECT function\_id, function\_code, function\_name FROM Function WHERE status \= 'active' ORDER BY function\_code" to populate checklist. (Refer to "Add Permission Group" view in "View Description" file) |
| *(5), (6), (6.1)* | *BR41* | **Validation Rules:** When admin clicks \[btnSave\], system validates inputs. System checks: If \[txtBoxGroupCode\].Text.isEmpty() OR \[txtBoxGroupName\].Text.isEmpty(): System calls displayErrorMessage("Group code and group name are required.") (Refer to MSG 18\) and returns to step (3). System validates group code format with regex "^\[A-Z0-9\_\]{3,20}$" (uppercase, numbers, underscore only). If invalid: System calls displayErrorMessage("Group code must be 3-20 uppercase alphanumeric characters with underscores.") (Refer to MSG 39\) and returns to step (3). System validates group name length 3-100 characters. If invalid: System calls displayErrorMessage("Group name must be 3-100 characters.") (Refer to MSG 40\) and returns to step (3). System checks at least one function is selected from \[chkListFunctions\]. If none selected: System calls displayErrorMessage("Please select at least one function for this permission group.") (Refer to MSG 41\) and returns to step (3). System queries to check group code uniqueness: "SELECT COUNT(\*) FROM Permission\_Group WHERE group\_code \= \[txtBoxGroupCode\].Text". If COUNT \> 0: System calls displayErrorMessage("Group code already exists.") (Refer to MSG 42\) and returns to step (3). System queries to check group name uniqueness: "SELECT COUNT(\*) FROM Permission\_Group WHERE group\_name \= \[txtBoxGroupName\].Text". If COUNT \> 0: System calls displayErrorMessage("Group name already exists.") (Refer to MSG 12\) and returns to step (3). |
| *(7), (8)* | *BR42* | **Querying Rules:** System executes in transaction: (1) Insert permission group with SQL: "INSERT INTO Permission\_Group (group\_code, group\_name, status, created\_at) VALUES (\[txtBoxGroupCode\].Text, \[txtBoxGroupName\].Text, 'active', NOW())" via createPermissionGroup() to get new\_group\_id. (2) For each selected function in \[chkListFunctions\]: Execute SQL INSERT: "INSERT INTO Permission\_Function (group\_id, function\_id) VALUES (\[new\_group\_id\], \[function\_id\])" via assignFunctionToGroup(). If any SQL execution fails: System rolls back transaction and calls displayErrorMessage("Failed to create permission group. Please try again.") (Refer to MSG 44\) and use case ends. System commits transaction, displays success message "Permission group created successfully." (Refer to MSG 45), and redirects to permission groups list via redirectToPermissionGroupsList(). (Refer to "Permission\_Group" and "Permission\_Function" tables in "DB Sheet" file) |

##### 2.1.2.7 Edit Permission Group

###### *Use Case Description*

This use case allows administrators to modify existing permission group information including group name and function assignments. The group code is read-only. The system validates inputs and updates the group with function reassignments in a transaction.

###### *Actors*

- Admin

###### *Preconditions*

- Admin must be logged in with valid JWT access token  
- Admin has permission to edit permission groups  
- Target permission group exists in the system

###### *Postconditions*

- Permission group information is updated in database  
- Function assignments are updated  
- Updated group data is reflected in the permission groups list

(Refer to "Activity Edit Permission Group" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(4), (5)* | *BR43* | **Loading Screen Rules:** When admin selects permission group to edit, system queries group details with SQL: "SELECT pg.group\_id, pg.group\_code, pg.group\_name, pf.function\_id FROM Permission\_Group pg LEFT JOIN Permission\_Function pf ON pg.group\_id \= pf.group\_id WHERE pg.group\_id \= \[selected\_group\_id\]". System queries all available functions: "SELECT function\_id, function\_code, function\_name FROM Function WHERE status \= 'active' ORDER BY function\_code". System displays "Edit Permission Group" form via displayEditPermissionGroupForm() with fields: \[lblGroupCode\] (read-only display), \[txtBoxGroupName\] populated with current name, \[chkListFunctions\] with all functions and current assignments checked. (Refer to "Edit Permission Group" view in "View Description" file) |
| *(8), (8.1)* | *BR44* | **Validation Rules:** When admin clicks \[btnSave\], system validates inputs. System checks: If \[txtBoxGroupName\].Text.isEmpty(): System calls displayErrorMessage("Group name is required.") (Refer to MSG 30\) and returns to step (6). System validates group name length 3-100 characters. If invalid: System calls displayErrorMessage("Group name must be 3-100 characters.") (Refer to MSG 40\) and returns to step (6). System checks at least one function is selected from \[chkListFunctions\]. If none selected: System calls displayErrorMessage("Please select at least one function for this permission group.") (Refer to MSG 41\) and returns to step (6). System queries to check group name uniqueness excluding current group: "SELECT COUNT(\*) FROM Permission\_Group WHERE group\_name \= \[txtBoxGroupName\].Text AND group\_id \!= \[current\_group\_id\]". If COUNT \> 0: System calls displayErrorMessage("Group name already exists.") (Refer to MSG 12\) and returns to step (6). |
| *(9), (10)* | *BR45* | **Querying Rules:** System executes in transaction: (1) Update permission group with SQL: "UPDATE Permission\_Group SET group\_name \= \[txtBoxGroupName\].Text, updated\_at \= NOW() WHERE group\_id \= \[selected\_group\_id\]" via updatePermissionGroup(). (2) Delete all existing function assignments: "DELETE FROM Permission\_Function WHERE group\_id \= \[selected\_group\_id\]" via clearPermissionFunctions(). (3) For each selected function in \[chkListFunctions\]: Execute SQL INSERT: "INSERT INTO Permission\_Function (group\_id, function\_id) VALUES (\[selected\_group\_id\], \[function\_id\])" via assignFunctionToGroup(). If any SQL execution fails: System rolls back transaction and calls displayErrorMessage("Failed to update permission group. Please try again.") (Refer to MSG 20\) and use case ends. System commits transaction, displays success message "Permission group updated successfully." (Refer to MSG 21), and reloads permission groups list via reloadPermissionGroupsList(). (Refer to "Permission\_Group" and "Permission\_Function" tables in "DB Sheet" file) |

##### 2.1.2.8 Delete Permission Group

###### *Use Case Description*

This use case allows administrators to delete permission groups from the system. The system checks for referenced data (users assigned to this group) and prevents deletion if any users are using this permission group, requiring admin confirmation before deletion.

###### *Actors*

- Admin

###### *Preconditions*

- Admin must be logged in with valid JWT access token  
- Admin has permission to delete permission groups  
- Target permission group exists in the system

###### *Postconditions*

- Permission group is deleted from database (if no referenced data)  
- Function assignments are deleted  
- Group is removed from permission groups list

(Refer to "Activity Delete Permission Group" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(5), (5.1), (5.2)* | *BR46* | **Validation Rules:** When admin selects permission group and clicks delete, system queries referenced data with SQL: "SELECT COUNT(\*) FROM User WHERE group\_id \= \[selected\_group\_id\]". If COUNT \> 0: System calls displayErrorMessage("Cannot delete permission group. \[COUNT\] user(s) are assigned to this group.") (Refer to MSG 49\) and use case ends at step (5.2). |
| *(6), (7), (7.1), (7.2)* | *BR47* | **Displaying Rules:** System displays confirmation dialog via displayConfirmationDialog() with message "Are you sure you want to delete permission group '\[group\_name\]'? This action cannot be undone.". If admin clicks \[btnCancel\]: System closes dialog via closeDialog() and use case ends at step (7.2). |
| *(8), (9)* | *BR48* | **Querying Rules:** System executes in transaction: (1) Delete function assignments with SQL: "DELETE FROM Permission\_Function WHERE group\_id \= \[selected\_group\_id\]" via deletePermissionFunctions(). (2) Delete permission group with SQL: "DELETE FROM Permission\_Group WHERE group\_id \= \[selected\_group\_id\]" via deletePermissionGroup(). If any SQL execution fails: System rolls back transaction and calls displayErrorMessage("Failed to delete permission group. Please try again.") (Refer to MSG 50\) and use case ends. System commits transaction, displays success message "Permission group deleted successfully." (Refer to MSG 51), and reloads permission groups list via reloadPermissionGroupsList(). (Refer to "Permission\_Group" and "Permission\_Function" tables in "DB Sheet" file) |

##### 2.1.2.9 Manage System Parameters

###### *Use Case Description*

This use case allows administrators to view and modify system-wide parameters including penalty settings, minimum deposit rates, and minimum table reservation rates. Changes affect the entire system and require confirmation before applying.

###### *Actors*

- Admin

###### *Preconditions*

- Admin must be logged in with valid JWT access token  
- Admin has permission to manage system settings

###### *Postconditions*

- System parameters are updated in database  
- New parameter values take effect immediately

(Refer to "Activity Manage System Parameters" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2), (3)* | *BR49* | **Loading Screen Rules:** System loads "System Settings" screen via displaySystemParametersForm(). System queries all parameters with SQL: "SELECT param\_code, param\_value FROM System\_Parameter WHERE param\_code IN ('ENABLE\_PENALTY', 'PENALTY\_RATE', 'MIN\_DEPOSIT\_RATE', 'MIN\_TABLE\_RESERVATION\_RATE')" and displays form with fields: \[chkEnablePenalty\] checkbox for penalty enforcement (0 or 1), \[txtBoxPenaltyRate\] for penalty percentage (0.00-1.00), \[txtBoxMinDepositRate\] for minimum deposit percentage (0.01-1.00), \[txtBoxMinTableReservationRate\] for minimum table reservation percentage (0.01-1.00), \[btnSave\] button, \[btnCancel\] button. (Refer to "System Settings" view in "View Description" file) |
| *(6), (7), (8), (8.1)* | *BR50* | **Validation Rules:** When admin clicks \[btnSave\], system displays confirmation dialog via displayConfirmationDialog() with message "Parameter changes will affect the entire system. Do you want to continue?". If admin clicks \[btnCancel\]: System closes dialog and returns to step (4). If admin confirms, system validates inputs: Check \[chkEnablePenalty\] value is 0 or 1\. Check \[txtBoxPenaltyRate\] is numeric and 0 \<= value \<= 1\. If invalid: System calls displayErrorMessage("Penalty rate must be between 0% and 100%.") (Refer to MSG 52\) and returns to step (4). Check \[txtBoxMinDepositRate\] is numeric and 0 \< value \<= 1\. If invalid: System calls displayErrorMessage("Minimum deposit rate must be greater than 0% and up to 100%.") (Refer to MSG 53\) and returns to step (4). Check \[txtBoxMinTableReservationRate\] is numeric and 0 \< value \<= 1\. If invalid: System calls displayErrorMessage("Minimum table reservation rate must be greater than 0% and up to 100%.") (Refer to MSG 33\) and returns to step (4). |
| *(9), (10), (11), (10a), (11a)* | *BR51* | **Querying Rules:** System executes in transaction: (1) Update each parameter with SQL: "UPDATE System\_Parameter SET param\_value \= \[new\_value\], updated\_at \= NOW() WHERE param\_code \= \[param\_code\]" via updateSystemParameter() for each of: ('ENABLE\_PENALTY', \[chkEnablePenalty\].Checked ? 1 : 0), ('PENALTY\_RATE', \[txtBoxPenaltyRate\].Text), ('MIN\_DEPOSIT\_RATE', \[txtBoxMinDepositRate\].Text), ('MIN\_TABLE\_RESERVATION\_RATE', \[txtBoxMinTableReservationRate\].Text). If any SQL execution fails: System rolls back transaction and calls displayErrorMessage("Failed to update system parameters. Please try again.") (Refer to MSG 34\) and use case ends at step (11a). System commits transaction, displays success message "System parameters updated successfully. Changes will take effect immediately." (Refer to MSG 35), and reloads form with updated values via reloadSystemParametersForm(). (Refer to "System\_Parameter" table in "DB Sheet" file) |

#### 2.1.3 Master Data Management Use Cases

##### 2.1.3.1 View Hall Details

###### *Use Case Description*

This use case allows staff and administrators to view the list of all wedding halls in the system with search/filter capabilities, and view detailed information of any selected hall including hall type and capacity.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to view halls

###### *Postconditions*

- Halls list is displayed with search/filter results  
- Selected hall's detailed information is shown

(Refer to "Activity View Hall Details" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR52* | **Loading Screen Rules:** System loads "Hall Management" screen via displayHallsList() with components: \[gridHalls\] data grid showing columns (hall\_id, hall\_name, hall\_type\_name, max\_tables, status), \[txtBoxSearch\] for search input, \[cmbFilterHallType\] dropdown for hall type filtering, \[btnSearch\] button, \[btnAddNew\] button, \[btnExport\] button. System queries all halls with SQL: "SELECT h.hall\_id, h.hall\_name, ht.type\_name, h.max\_tables, h.status FROM Hall h LEFT JOIN Hall\_Type ht ON h.type\_id \= ht.type\_id ORDER BY h.created\_at DESC" and populates grid. (Refer to "Hall Management" view in "View Description" file) |
| *(5), (6)* | *BR53* | **Querying Rules:** When user enters search criteria and clicks \[btnSearch\], system builds dynamic SQL query. Base query: "SELECT h.hall\_id, h.hall\_name, ht.type\_name, h.max\_tables, h.status FROM Hall h LEFT JOIN Hall\_Type ht ON h.type\_id \= ht.type\_id WHERE 1=1". If \[txtBoxSearch\].Text not empty: Add "AND h.hall\_name LIKE '%\[search\]%'". If \[cmbFilterHallType\].SelectedValue \!= 'All': Add "AND h.type\_id \= \[selected\_type\_id\]". Execute query and refresh \[gridHalls\] via refreshHallsList(). |
| *(8), (9)* | *BR54* | **Querying Rules:** When user selects a hall from \[gridHalls\] and clicks view details, system queries hall details with SQL: "SELECT h.hall\_id, h.hall\_name, h.type\_id, ht.type\_name, h.max\_tables, h.notes, h.status, h.created\_at FROM Hall h LEFT JOIN Hall\_Type ht ON h.type\_id \= ht.type\_id WHERE h.hall\_id \= \[selected\_hall\_id\]". System displays modal dialog via displayHallDetailsDialog() showing all hall information in read-only format. (Refer to "Hall" and "Hall\_Type" tables in "DB Sheet" file) |

##### 2.1.3.2 Add New Hall

###### *Use Case Description*

This use case allows staff and administrators to create new wedding hall records in the system. The system validates all inputs, ensures hall name uniqueness, and creates the hall record with selected hall type.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to add halls  
- At least one hall type exists in the system

###### *Postconditions*

- New hall is created in database  
- Hall appears in the halls list

(Refer to "Activity Add New Hall" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR55* | **Loading Screen Rules:** System loads "Add New Hall" form via displayAddHallForm() with fields: \[txtBoxHallName\] for hall name, \[cmbHallType\] dropdown populated with hall types, \[txtBoxMaxTables\] for maximum tables (numeric), \[txtBoxNotes\] for notes (optional), \[btnSave\] button, \[btnCancel\] button. System queries hall types with SQL: "SELECT type\_id, type\_name FROM Hall\_Type WHERE status \= 'active' ORDER BY type\_name" to populate dropdown. (Refer to "Add Hall" view in "View Description" file) |
| *(5), (6), (6.1)* | *BR56* | **Validation Rules:** When user clicks \[btnSave\], system validates all inputs. System checks: If \[txtBoxHallName\].Text.isEmpty() OR \[cmbHallType\].SelectedValue.isEmpty() OR \[txtBoxMaxTables\].Text.isEmpty(): System calls displayErrorMessage("Hall name, hall type, and max tables are required.") (Refer to MSG 22\) and returns to step (3). System validates hall name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Hall name must be 3-100 characters.") (Refer to MSG 37\) and returns to step (3). System validates max tables is positive integer with regex "^\[1-9\]\\d\*$". If invalid: System calls displayErrorMessage("Max tables must be a positive number.") (Refer to MSG 18\) and returns to step (3). System queries to check hall name uniqueness: "SELECT COUNT(\*) FROM Hall WHERE hall\_name \= \[txtBoxHallName\].Text". If COUNT \> 0: System calls displayErrorMessage("Hall name already exists.") (Refer to MSG 39\) and returns to step (3). |
| *(7), (8)* | *BR57* | **Querying Rules:** System executes SQL INSERT: "INSERT INTO Hall (hall\_name, type\_id, max\_tables, notes, status, created\_at) VALUES (\[txtBoxHallName\].Text, \[cmbHallType\].SelectedValue, \[txtBoxMaxTables\].Text, \[txtBoxNotes\].Text, 'active', NOW())" via createHall(). If SQL execution fails: System calls displayErrorMessage("Failed to create hall. Please try again.") (Refer to MSG 40\) and use case ends. System displays success message "Hall created successfully." (Refer to MSG 41\) and redirects to halls list via redirectToHallsList(). (Refer to "Hall" table in "DB Sheet" file) |

##### 2.1.3.3 Edit Hall

###### *Use Case Description*

This use case allows staff and administrators to modify existing hall information including name, type, capacity, and notes. The system validates inputs and ensures name uniqueness before updating.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to edit halls  
- Target hall exists in the system

###### *Postconditions*

- Hall information is updated in database  
- Updated hall data is reflected in the halls list

(Refer to "Activity Edit Hall" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(4), (5)* | *BR58* | **Loading Screen Rules:** When user selects hall to edit, system queries hall details with SQL: "SELECT hall\_id, hall\_name, type\_id, max\_tables, notes, status FROM Hall WHERE hall\_id \= \[selected\_hall\_id\]". System queries hall types: "SELECT type\_id, type\_name FROM Hall\_Type WHERE status \= 'active' ORDER BY type\_name". System displays "Edit Hall" form via displayEditHallForm() with fields populated: \[txtBoxHallName\], \[cmbHallType\] with current type selected, \[txtBoxMaxTables\], \[txtBoxNotes\], \[cmbStatus\] dropdown (Active/Inactive). (Refer to "Edit Hall" view in "View Description" file) |
| *(8), (8.1)* | *BR59* | **Validation Rules:** When user clicks \[btnSave\], system validates inputs. System checks: If \[txtBoxHallName\].Text.isEmpty() OR \[cmbHallType\].SelectedValue.isEmpty() OR \[txtBoxMaxTables\].Text.isEmpty(): System calls displayErrorMessage("Hall name, hall type, and max tables are required.") (Refer to MSG 22\) and returns to step (6). System validates hall name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Hall name must be 3-100 characters.") (Refer to MSG 37\) and returns to step (6). System validates max tables is positive integer with regex "^\[1-9\]\\d\*$". If invalid: System calls displayErrorMessage("Max tables must be a positive number.") (Refer to MSG 18\) and returns to step (6). System queries to check hall name uniqueness excluding current hall: "SELECT COUNT(\*) FROM Hall WHERE hall\_name \= \[txtBoxHallName\].Text AND hall\_id \!= \[current\_hall\_id\]". If COUNT \> 0: System calls displayErrorMessage("Hall name already exists.") (Refer to MSG 39\) and returns to step (6). |
| *(9), (10)* | *BR60* | **Querying Rules:** System executes SQL UPDATE: "UPDATE Hall SET hall\_name \= \[txtBoxHallName\].Text, type\_id \= \[cmbHallType\].SelectedValue, max\_tables \= \[txtBoxMaxTables\].Text, notes \= \[txtBoxNotes\].Text, status \= \[cmbStatus\].SelectedValue, updated\_at \= NOW() WHERE hall\_id \= \[selected\_hall\_id\]" via updateHall(). If SQL execution fails: System calls displayErrorMessage("Failed to update hall. Please try again.") (Refer to MSG 42\) and use case ends. System displays success message "Hall updated successfully." (Refer to MSG 12\) and reloads halls list via reloadHallsList(). (Refer to "Hall" table in "DB Sheet" file) |

##### 2.1.3.4 Delete Hall

###### *Use Case Description*

This use case allows staff and administrators to delete hall records from the system. The system checks for referenced bookings and prevents deletion if the hall has existing bookings, requiring user confirmation before deletion.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to delete halls  
- Target hall exists in the system

###### *Postconditions*

- Hall is deleted from database (if no referenced data)  
- Hall is removed from halls list

(Refer to "Activity Delete Hall" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(5), (5.1), (5.2)* | *BR61* | **Validation Rules:** When user selects hall and clicks delete, system queries referenced data with SQL: "SELECT COUNT(\*) FROM Booking WHERE hall\_id \= \[selected\_hall\_id\]". If COUNT \> 0: System calls displayErrorMessage("Cannot delete hall. Hall has \[COUNT\] associated booking(s).") (Refer to MSG 44\) and use case ends at step (5.2). |
| *(6), (7), (7.1), (7.2)* | *BR62* | **Displaying Rules:** System displays confirmation dialog via displayConfirmationDialog() with message "Are you sure you want to delete hall '\[hall\_name\]'? This action cannot be undone.". If user clicks \[btnCancel\]: System closes dialog via closeDialog() and use case ends at step (7.2). |
| *(8), (9)* | *BR63* | **Querying Rules:** System executes SQL DELETE: "DELETE FROM Hall WHERE hall\_id \= \[selected\_hall\_id\]" via deleteHall(). If SQL execution fails: System calls displayErrorMessage("Failed to delete hall. Please try again.") (Refer to MSG 45\) and use case ends. System displays success message "Hall deleted successfully." (Refer to MSG 30\) and reloads halls list via reloadHallsList(). (Refer to "Hall" table in "DB Sheet" file) |

##### 2.1.3.5 Export Halls to Excel

###### *Use Case Description*

This use case allows staff and administrators to export the current list of halls (with applied filters) to an Excel file for reporting and analysis purposes.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to export halls data

###### *Postconditions*

- Excel file containing halls data is generated and downloaded  
- User can open and view the exported data

(Refer to "Activity Export Halls to Excel" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(6), (6.1), (6.2)* | *BR64* | **Validation Rules:** When user clicks \[btnExport\], system queries halls data with current filter criteria using same SQL as search operation. If result COUNT \= 0: System calls displayErrorMessage("No data to export.") (Refer to MSG 68\) and use case ends at step (6.2). |
| *(7), (8), (9)* | *BR65* | **Querying Rules:** System generates Excel file using library (e.g., Apache POI, ExcelJS) with columns: Hall ID, Hall Name, Hall Type, Max Tables, Status, Created Date. System creates filename with timestamp format "Halls\_Export\_YYYYMMDD\_HHMMSS.xlsx" via generateExportFilename(). System sets HTTP headers: Content-Type \= "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Content-Disposition \= "attachment; filename=\[generated\_filename\]". System sends file to browser for download via sendFileResponse(). |

##### 2.1.3.6 View Hall Type Details

###### *Use Case Description*

This use case allows staff and administrators to view the list of all hall types in the system with search capabilities, and view detailed information of any selected hall type including the count of halls using this type.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to view hall types

###### *Postconditions*

- Hall types list is displayed with search results  
- Selected hall type's detailed information is shown

(Refer to "Activity View Hall Type Details" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR66* | **Loading Screen Rules:** System loads "Hall Type Management" screen via displayHallTypesList() with components: \[gridHallTypes\] data grid showing columns (type\_id, type\_name, min\_table\_price, halls\_count, status), \[txtBoxSearch\] for search input, \[btnSearch\] button, \[btnAddNew\] button, \[btnExport\] button. System queries all hall types with SQL: "SELECT ht.type\_id, ht.type\_name, ht.min\_table\_price, ht.status, COUNT(h.hall\_id) AS halls\_count FROM Hall\_Type ht LEFT JOIN Hall h ON ht.type\_id \= h.type\_id GROUP BY ht.type\_id ORDER BY ht.created\_at DESC" and populates grid. (Refer to "Hall Type Management" view in "View Description" file) |
| *(5), (6)* | *BR67* | **Querying Rules:** When user enters search keyword in \[txtBoxSearch\] and clicks \[btnSearch\], system queries hall types with SQL: "SELECT ht.type\_id, ht.type\_name, ht.min\_table\_price, ht.status, COUNT(h.hall\_id) AS halls\_count FROM Hall\_Type ht LEFT JOIN Hall h ON ht.type\_id \= h.type\_id WHERE ht.type\_name LIKE '%\[search\]%' GROUP BY ht.type\_id ORDER BY ht.created\_at DESC" and refreshes \[gridHallTypes\] via refreshHallTypesList(). |
| *(8), (9)* | *BR68* | **Querying Rules:** When user selects a hall type from \[gridHallTypes\] and clicks view details, system queries hall type details with SQL: "SELECT ht.type\_id, ht.type\_name, ht.min\_table\_price, ht.status, ht.created\_at, COUNT(h.hall\_id) AS halls\_count FROM Hall\_Type ht LEFT JOIN Hall h ON ht.type\_id \= h.type\_id WHERE ht.type\_id \= \[selected\_type\_id\] GROUP BY ht.type\_id". System displays modal dialog via displayHallTypeDetailsDialog() showing hall type information. (Refer to "Hall\_Type" and "Hall" tables in "DB Sheet" file) |

##### 2.1.3.7 Add New Hall Type

###### *Use Case Description*

This use case allows staff and administrators to create new hall type records in the system. The system validates all inputs, ensures hall type name uniqueness, and creates the hall type record with minimum table price.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to add hall types

###### *Postconditions*

- New hall type is created in database  
- Hall type appears in the hall types list

(Refer to "Activity Add New Hall Type" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR69* | **Loading Screen Rules:** System loads "Add New Hall Type" form via displayAddHallTypeForm() with fields: \[txtBoxTypeName\] for hall type name, \[txtBoxMinTablePrice\] for minimum table price (numeric), \[btnSave\] button, \[btnCancel\] button. (Refer to "Add Hall Type" view in "View Description" file) |
| *(5), (6), (6.1)* | *BR70* | **Validation Rules:** When user clicks \[btnSave\], system validates all inputs. System checks: If \[txtBoxTypeName\].Text.isEmpty() OR \[txtBoxMinTablePrice\].Text.isEmpty(): System calls displayErrorMessage("Hall type name and minimum table price are required.") (Refer to MSG 69\) and returns to step (3). System validates type name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Hall type name must be 3-100 characters.") (Refer to MSG 70\) and returns to step (3). System validates min table price is positive number with regex "^\\d+(\\.\\d{1,2})?$" and value \> 0\. If invalid: System calls displayErrorMessage("Minimum table price must be a positive number.") (Refer to MSG 20\) and returns to step (3). System queries to check type name uniqueness: "SELECT COUNT(\*) FROM Hall\_Type WHERE type\_name \= \[txtBoxTypeName\].Text". If COUNT \> 0: System calls displayErrorMessage("Hall type name already exists.") (Refer to MSG 21\) and returns to step (3). |
| *(7), (8)* | *BR71* | **Querying Rules:** System executes SQL INSERT: "INSERT INTO Hall\_Type (type\_name, min\_table\_price, status, created\_at) VALUES (\[txtBoxTypeName\].Text, \[txtBoxMinTablePrice\].Text, 'active', NOW())" via createHallType(). If SQL execution fails: System calls displayErrorMessage("Failed to create hall type. Please try again.") (Refer to MSG 49\) and use case ends. System displays success message "Hall type created successfully." (Refer to MSG 50\) and redirects to hall types list via redirectToHallTypesList(). (Refer to "Hall\_Type" table in "DB Sheet" file) |

##### 2.1.3.8 Edit Hall Type

###### *Use Case Description*

This use case allows staff and administrators to modify existing hall type information including type name and minimum table price. The system validates inputs and ensures name uniqueness before updating.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to edit hall types  
- Target hall type exists in the system

###### *Postconditions*

- Hall type information is updated in database  
- Updated hall type data is reflected in the hall types list

(Refer to "Activity Edit Hall Type" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(4), (5)* | *BR72* | **Loading Screen Rules:** When user selects hall type to edit, system queries hall type details with SQL: "SELECT type\_id, type\_name, min\_table\_price, status FROM Hall\_Type WHERE type\_id \= \[selected\_type\_id\]". System displays "Edit Hall Type" form via displayEditHallTypeForm() with fields populated: \[txtBoxTypeName\], \[txtBoxMinTablePrice\], \[cmbStatus\] dropdown (Active/Inactive). (Refer to "Edit Hall Type" view in "View Description" file) |
| *(8), (8.1)* | *BR73* | **Validation Rules:** When user clicks \[btnSave\], system validates inputs. System checks: If \[txtBoxTypeName\].Text.isEmpty() OR \[txtBoxMinTablePrice\].Text.isEmpty(): System calls displayErrorMessage("Hall type name and minimum table price are required.") (Refer to MSG 69\) and returns to step (6). System validates type name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Hall type name must be 3-100 characters.") (Refer to MSG 70\) and returns to step (6). System validates min table price is positive number with regex "^\\d+(\\.\\d{1,2})?$" and value \> 0\. If invalid: System calls displayErrorMessage("Minimum table price must be a positive number.") (Refer to MSG 20\) and returns to step (6). System queries to check type name uniqueness excluding current type: "SELECT COUNT(\*) FROM Hall\_Type WHERE type\_name \= \[txtBoxTypeName\].Text AND type\_id \!= \[current\_type\_id\]". If COUNT \> 0: System calls displayErrorMessage("Hall type name already exists.") (Refer to MSG 21\) and returns to step (6). |
| *(9), (10)* | *BR74* | **Querying Rules:** System executes SQL UPDATE: "UPDATE Hall\_Type SET type\_name \= \[txtBoxTypeName\].Text, min\_table\_price \= \[txtBoxMinTablePrice\].Text, status \= \[cmbStatus\].SelectedValue, updated\_at \= NOW() WHERE type\_id \= \[selected\_type\_id\]" via updateHallType(). If SQL execution fails: System calls displayErrorMessage("Failed to update hall type. Please try again.") (Refer to MSG 51\) and use case ends. System displays success message "Hall type updated successfully." (Refer to MSG 52\) and reloads hall types list via reloadHallTypesList(). (Refer to "Hall\_Type" table in "DB Sheet" file) |

##### 2.1.3.9 Delete Hall Type

###### *Use Case Description*

This use case allows staff and administrators to delete hall type records from the system. The system checks for referenced halls and prevents deletion if any halls are using this type, requiring user confirmation before deletion.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to delete hall types  
- Target hall type exists in the system

###### *Postconditions*

- Hall type is deleted from database (if no referenced data)  
- Hall type is removed from hall types list

(Refer to "Activity Delete Hall Type" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(5), (5.1), (5.2)* | *BR75* | **Validation Rules:** When user selects hall type and clicks delete, system queries referenced data with SQL: "SELECT COUNT(\*) FROM Hall WHERE type\_id \= \[selected\_type\_id\]". If COUNT \> 0: System calls displayErrorMessage("Cannot delete hall type. \[COUNT\] hall(s) are using this type.") (Refer to MSG 53\) and use case ends at step (5.2). |
| *(6), (7), (7.1), (7.2)* | *BR76* | **Displaying Rules:** System displays confirmation dialog via displayConfirmationDialog() with message "Are you sure you want to delete hall type '\[type\_name\]'? This action cannot be undone.". If user clicks \[btnCancel\]: System closes dialog via closeDialog() and use case ends at step (7.2). |
| *(8), (9)* | *BR77* | **Querying Rules:** System executes SQL DELETE: "DELETE FROM Hall\_Type WHERE type\_id \= \[selected\_type\_id\]" via deleteHallType(). If SQL execution fails: System calls displayErrorMessage("Failed to delete hall type. Please try again.") (Refer to MSG 33\) and use case ends. System displays success message "Hall type deleted successfully." (Refer to MSG 34\) and reloads hall types list via reloadHallTypesList(). (Refer to "Hall\_Type" table in "DB Sheet" file) |

##### 2.1.3.10 Export Hall Types to Excel

###### *Use Case Description*

This use case allows staff and administrators to export the current list of hall types (with applied filters) to an Excel file for reporting and analysis purposes.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to export hall types data

###### *Postconditions*

- Excel file containing hall types data is generated and downloaded  
- User can open and view the exported data

(Refer to "Activity Export Hall Types to Excel" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(6), (6.1), (6.2)* | *BR78* | **Validation Rules:** When user clicks \[btnExport\], system queries hall types data with current filter criteria using same SQL as search operation. If result COUNT \= 0: System calls displayErrorMessage("No data to export.") (Refer to MSG 68\) and use case ends at step (6.2). |
| *(7), (8), (9)* | *BR79* | **Querying Rules:** System generates Excel file using library (e.g., Apache POI, ExcelJS) with columns: Type ID, Type Name, Min Table Price, Halls Count, Status, Created Date. System creates filename with timestamp format "HallTypes\_Export\_YYYYMMDD\_HHMMSS.xlsx" via generateExportFilename(). System sets HTTP headers: Content-Type \= "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Content-Disposition \= "attachment; filename=\[generated\_filename\]". System sends file to browser for download via sendFileResponse(). |

##### 2.1.3.11 View Dish Details

###### *Use Case Description*

This use case allows staff and administrators to view the list of all dishes in the menu with search capabilities, and view detailed information of any selected dish.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to view dishes

###### *Postconditions*

- Dishes list is displayed with search results  
- Selected dish's detailed information is shown

(Refer to "Activity View Dish Details" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR80* | **Loading Screen Rules:** System loads "Dish Management" screen via displayDishList() with components: \[gridDishes\] data grid showing columns (dish\_id, dish\_name, price, status), \[txtBoxSearch\] for search input, \[btnSearch\] button, \[btnAddNew\] button, \[btnExport\] button. System queries all dishes with SQL: "SELECT dish\_id, dish\_name, price, status FROM Dish ORDER BY created\_at DESC" and populates grid. (Refer to "Dish Management" view in "View Description" file) |
| *(5), (6)* | *BR81* | **Querying Rules:** When user enters search keyword in \[txtBoxSearch\] and clicks \[btnSearch\], system queries dishes with SQL: "SELECT dish\_id, dish\_name, price, status FROM Dish WHERE dish\_name LIKE '%\[search\]%' ORDER BY created\_at DESC" and refreshes \[gridDishes\] via refreshDishList(). |
| *(8), (9)* | *BR82* | **Querying Rules:** When user selects a dish from \[gridDishes\] and clicks view details, system queries dish details with SQL: "SELECT dish\_id, dish\_name, price, notes, status, created\_at FROM Dish WHERE dish\_id \= \[selected\_dish\_id\]". System displays modal dialog via displayDishDetailsDialog() showing dish information. (Refer to "Dish" table in "DB Sheet" file) |

##### 2.1.3.12 Add New Dish

###### *Use Case Description*

This use case allows staff and administrators to create new dish records in the menu. The system validates all inputs, ensures dish name uniqueness, and creates the dish record with price and optional notes.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to add dishes

###### *Postconditions*

- New dish is created in database  
- Dish appears in the dishes list

(Refer to "Activity Add New Dish" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR83* | **Loading Screen Rules:** System loads "Add New Dish" form via displayAddDishForm() with fields: \[txtBoxDishName\] for dish name, \[txtBoxPrice\] for price (numeric), \[txtBoxNotes\] for optional notes, \[btnSave\] button, \[btnCancel\] button. (Refer to "Add Dish" view in "View Description" file) |
| *(5), (6), (6.1)* | *BR84* | **Validation Rules:** When user clicks \[btnSave\], system validates all inputs. System checks: If \[txtBoxDishName\].Text.isEmpty() OR \[txtBoxPrice\].Text.isEmpty(): System calls displayErrorMessage("Dish name and price are required.") (Refer to MSG 35\) and returns to step (3). System validates dish name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Dish name must be 3-100 characters.") (Refer to MSG 22\) and returns to step (3). System validates price is positive number with regex "^\\d+(\\.\\d{1,2})?$" and value \> 0\. If invalid: System calls displayErrorMessage("Price must be a positive number.") (Refer to MSG 37\) and returns to step (3). System queries to check dish name uniqueness: "SELECT COUNT(\*) FROM Dish WHERE dish\_name \= \[txtBoxDishName\].Text". If COUNT \> 0: System calls displayErrorMessage("Dish name already exists.") (Refer to MSG 18\) and returns to step (3). |
| *(7), (8)* | *BR85* | **Querying Rules:** System executes SQL INSERT: "INSERT INTO Dish (dish\_name, price, notes, status, created\_at) VALUES (\[txtBoxDishName\].Text, \[txtBoxPrice\].Text, \[txtBoxNotes\].Text, 'active', NOW())" via createDish(). If SQL execution fails: System calls displayErrorMessage("Failed to create dish. Please try again.") (Refer to MSG 39\) and use case ends. System displays success message "Dish created successfully." (Refer to MSG 40\) and redirects to dishes list via redirectToDishList(). (Refer to "Dish" table in "DB Sheet" file) |

##### 2.1.3.13 Edit Dish

###### *Use Case Description*

This use case allows staff and administrators to modify existing dish information including dish name, price, and notes. The system validates inputs and ensures name uniqueness before updating.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to edit dishes  
- Target dish exists in the system

###### *Postconditions*

- Dish information is updated in database  
- Updated dish data is reflected in the dishes list

(Refer to "Activity Edit Dish" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(4), (5)* | *BR86* | **Loading Screen Rules:** When user selects dish to edit, system queries dish details with SQL: "SELECT dish\_id, dish\_name, price, notes, status FROM Dish WHERE dish\_id \= \[selected\_dish\_id\]". System displays "Edit Dish" form via displayEditDishForm() with fields populated: \[txtBoxDishName\], \[txtBoxPrice\], \[txtBoxNotes\], \[cmbStatus\] dropdown (Active/Inactive). (Refer to "Edit Dish" view in "View Description" file) |
| *(8), (8.1)* | *BR87* | **Validation Rules:** When user clicks \[btnSave\], system validates inputs. System checks: If \[txtBoxDishName\].Text.isEmpty() OR \[txtBoxPrice\].Text.isEmpty(): System calls displayErrorMessage("Dish name and price are required.") (Refer to MSG 35\) and returns to step (6). System validates dish name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Dish name must be 3-100 characters.") (Refer to MSG 22\) and returns to step (6). System validates price is positive number with regex "^\\d+(\\.\\d{1,2})?$" and value \> 0\. If invalid: System calls displayErrorMessage("Price must be a positive number.") (Refer to MSG 37\) and returns to step (6). System queries to check dish name uniqueness excluding current dish: "SELECT COUNT(\*) FROM Dish WHERE dish\_name \= \[txtBoxDishName\].Text AND dish\_id \!= \[current\_dish\_id\]". If COUNT \> 0: System calls displayErrorMessage("Dish name already exists.") (Refer to MSG 18\) and returns to step (6). |
| *(9), (10)* | *BR88* | **Querying Rules:** System executes SQL UPDATE: "UPDATE Dish SET dish\_name \= \[txtBoxDishName\].Text, price \= \[txtBoxPrice\].Text, notes \= \[txtBoxNotes\].Text, status \= \[cmbStatus\].SelectedValue, updated\_at \= NOW() WHERE dish\_id \= \[selected\_dish\_id\]" via updateDish(). If SQL execution fails: System calls displayErrorMessage("Failed to update dish. Please try again.") (Refer to MSG 41\) and use case ends. System displays success message "Dish updated successfully." (Refer to MSG 87\) and reloads dishes list via reloadDishList(). (Refer to "Dish" table in "DB Sheet" file) |

##### 2.1.3.14 Delete Dish

###### *Use Case Description*

This use case allows staff and administrators to delete dish records from the system. The system checks for referenced menu items and prevents deletion if any menus are using this dish, requiring user confirmation before deletion.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to delete dishes  
- Target dish exists in the system

###### *Postconditions*

- Dish is deleted from database (if no referenced data)  
- Dish is removed from dishes list

(Refer to "Activity Delete Dish" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(5), (5.1), (5.2)* | *BR89* | **Validation Rules:** When user selects dish and clicks delete, system queries referenced data with SQL: "SELECT COUNT(\*) FROM Menu\_Item WHERE dish\_id \= \[selected\_dish\_id\]". If COUNT \> 0: System calls displayErrorMessage("Cannot delete dish. This dish is used in \[COUNT\] menu item(s).") (Refer to MSG 88\) and use case ends at step (5.2). |
| *(6), (7), (7.1), (7.2)* | *BR90* | **Displaying Rules:** System displays confirmation dialog via displayConfirmationDialog() with message "Are you sure you want to delete dish '\[dish\_name\]'? This action cannot be undone.". If user clicks \[btnCancel\]: System closes dialog via closeDialog() and use case ends at step (7.2). |
| *(8), (9)* | *BR91* | **Querying Rules:** System executes SQL DELETE: "DELETE FROM Dish WHERE dish\_id \= \[selected\_dish\_id\]" via deleteDish(). If SQL execution fails: System calls displayErrorMessage("Failed to delete dish. Please try again.") (Refer to MSG 89\) and use case ends. System displays success message "Dish deleted successfully." (Refer to MSG 90\) and reloads dishes list via reloadDishList(). (Refer to "Dish" table in "DB Sheet" file) |

##### 2.1.3.15 Export Dishes to Excel

###### *Use Case Description*

This use case allows staff and administrators to export the current list of dishes (with applied filters) to an Excel file for reporting and analysis purposes.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to export dishes data

###### *Postconditions*

- Excel file containing dishes data is generated and downloaded  
- User can open and view the exported data

(Refer to "Activity Export Dishes to Excel" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(6), (6.1), (6.2)* | *BR92* | **Validation Rules:** When user clicks \[btnExport\], system queries dishes data with current filter criteria using same SQL as search operation. If result COUNT \= 0: System calls displayErrorMessage("No data to export.") (Refer to MSG 68\) and use case ends at step (6.2). |
| *(7), (8), (9)* | *BR93* | **Querying Rules:** System generates Excel file using library (e.g., Apache POI, ExcelJS) with columns: Dish ID, Dish Name, Price, Status, Created Date. System creates filename with timestamp format "Dishes\_Export\_YYYYMMDD\_HHMMSS.xlsx" via generateExportFilename(). System sets HTTP headers: Content-Type \= "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Content-Disposition \= "attachment; filename=\[generated\_filename\]". System sends file to browser for download via sendFileResponse(). |

##### 2.1.3.16 View Service Details

###### *Use Case Description*

This use case allows staff and administrators to view the list of all services available in the system with search capabilities, and view detailed information of any selected service.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to view services

###### *Postconditions*

- Services list is displayed with search results  
- Selected service's detailed information is shown

(Refer to "Activity View Service Details" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR94* | **Loading Screen Rules:** System loads "Service Management" screen via displayServiceList() with components: \[gridServices\] data grid showing columns (service\_id, service\_name, price, status), \[txtBoxSearch\] for search input, \[btnSearch\] button, \[btnAddNew\] button, \[btnExport\] button. System queries all services with SQL: "SELECT service\_id, service\_name, price, status FROM Service ORDER BY created\_at DESC" and populates grid. (Refer to "Service Management" view in "View Description" file) |
| *(5), (6)* | *BR95* | **Querying Rules:** When user enters search keyword in \[txtBoxSearch\] and clicks \[btnSearch\], system queries services with SQL: "SELECT service\_id, service\_name, price, status FROM Service WHERE service\_name LIKE '%\[search\]%' ORDER BY created\_at DESC" and refreshes \[gridServices\] via refreshServiceList(). |
| *(8), (9)* | *BR96* | **Querying Rules:** When user selects a service from \[gridServices\] and clicks view details, system queries service details with SQL: "SELECT service\_id, service\_name, price, notes, status, created\_at FROM Service WHERE service\_id \= \[selected\_service\_id\]". System displays modal dialog via displayServiceDetailsDialog() showing service information. (Refer to "Service" table in "DB Sheet" file) |

##### 2.1.3.17 Add New Service

###### *Use Case Description*

This use case allows staff and administrators to create new service records in the system. The system validates all inputs, ensures service name uniqueness, and creates the service record with price and optional notes.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to add services

###### *Postconditions*

- New service is created in database  
- Service appears in the services list

(Refer to "Activity Add New Service" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR97* | **Loading Screen Rules:** System loads "Add New Service" form via displayAddServiceForm() with fields: \[txtBoxServiceName\] for service name, \[txtBoxPrice\] for price (numeric), \[txtBoxNotes\] for optional notes, \[btnSave\] button, \[btnCancel\] button. (Refer to "Add Service" view in "View Description" file) |
| *(5), (6), (6.1)* | *BR98* | **Validation Rules:** When user clicks \[btnSave\], system validates all inputs. System checks: If \[txtBoxServiceName\].Text.isEmpty() OR \[txtBoxPrice\].Text.isEmpty(): System calls displayErrorMessage("Service name and price are required.") (Refer to MSG 42\) and returns to step (3). System validates service name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Service name must be 3-100 characters.") (Refer to MSG 12\) and returns to step (3). System validates price is positive number with regex "^\\d+(\\.\\d{1,2})?$" and value \> 0\. If invalid: System calls displayErrorMessage("Price must be a positive number.") (Refer to MSG 44\) and returns to step (3). System queries to check service name uniqueness: "SELECT COUNT(\*) FROM Service WHERE service\_name \= \[txtBoxServiceName\].Text". If COUNT \> 0: System calls displayErrorMessage("Service name already exists.") (Refer to MSG 45\) and returns to step (3). |
| *(7), (8)* | *BR99* | **Querying Rules:** System executes SQL INSERT: "INSERT INTO Service (service\_name, price, notes, status, created\_at) VALUES (\[txtBoxServiceName\].Text, \[txtBoxPrice\].Text, \[txtBoxNotes\].Text, 'active', NOW())" via createService(). If SQL execution fails: System calls displayErrorMessage("Failed to create service. Please try again.") (Refer to MSG 30\) and use case ends. System displays success message "Service created successfully." (Refer to MSG 68\) and redirects to services list via redirectToServiceList(). (Refer to "Service" table in "DB Sheet" file) |

##### 2.1.3.18 Edit Service

###### *Use Case Description*

This use case allows staff and administrators to modify existing service information including service name, price, and notes. The system validates inputs and ensures name uniqueness before updating.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to edit services  
- Target service exists in the system

###### *Postconditions*

- Service information is updated in database  
- Updated service data is reflected in the services list

(Refer to "Activity Edit Service" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(4), (5)* | *BR100* | **Loading Screen Rules:** When user selects service to edit, system queries service details with SQL: "SELECT service\_id, service\_name, price, notes, status FROM Service WHERE service\_id \= \[selected\_service\_id\]". System displays "Edit Service" form via displayEditServiceForm() with fields populated: \[txtBoxServiceName\], \[txtBoxPrice\], \[txtBoxNotes\], \[cmbStatus\] dropdown (Active/Inactive). (Refer to "Edit Service" view in "View Description" file) |
| *(8), (8.1)* | *BR101* | **Validation Rules:** When user clicks \[btnSave\], system validates inputs. System checks: If \[txtBoxServiceName\].Text.isEmpty() OR \[txtBoxPrice\].Text.isEmpty(): System calls displayErrorMessage("Service name and price are required.") (Refer to MSG 42\) and returns to step (6). System validates service name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Service name must be 3-100 characters.") (Refer to MSG 12\) and returns to step (6). System validates price is positive number with regex "^\\d+(\\.\\d{1,2})?$" and value \> 0\. If invalid: System calls displayErrorMessage("Price must be a positive number.") (Refer to MSG 44\) and returns to step (6). System queries to check service name uniqueness excluding current service: "SELECT COUNT(\*) FROM Service WHERE service\_name \= \[txtBoxServiceName\].Text AND service\_id \!= \[current\_service\_id\]". If COUNT \> 0: System calls displayErrorMessage("Service name already exists.") (Refer to MSG 45\) and returns to step (6). |
| *(9), (10)* | *BR102* | **Querying Rules:** System executes SQL UPDATE: "UPDATE Service SET service\_name \= \[txtBoxServiceName\].Text, price \= \[txtBoxPrice\].Text, notes \= \[txtBoxNotes\].Text, status \= \[cmbStatus\].SelectedValue, updated\_at \= NOW() WHERE service\_id \= \[selected\_service\_id\]" via updateService(). If SQL execution fails: System calls displayErrorMessage("Failed to update service. Please try again.") (Refer to MSG 69\) and use case ends. System displays success message "Service updated successfully." (Refer to MSG 70\) and reloads services list via reloadServiceList(). (Refer to "Service" table in "DB Sheet" file) |

##### 2.1.3.19 Delete Service

###### *Use Case Description*

This use case allows staff and administrators to delete service records from the system. The system checks for referenced service details and prevents deletion if any bookings are using this service, requiring user confirmation before deletion.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to delete services  
- Target service exists in the system

###### *Postconditions*

- Service is deleted from database (if no referenced data)  
- Service is removed from services list

(Refer to "Activity Delete Service" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(5), (5.1), (5.2)* | *BR103* | **Validation Rules:** When user selects service and clicks delete, system queries referenced data with SQL: "SELECT COUNT(\*) FROM Service\_Detail WHERE service\_id \= \[selected\_service\_id\]". If COUNT \> 0: System calls displayErrorMessage("Cannot delete service. This service is used in \[COUNT\] booking(s).") (Refer to MSG 20\) and use case ends at step (5.2). |
| *(6), (7), (7.1), (7.2)* | *BR104* | **Displaying Rules:** System displays confirmation dialog via displayConfirmationDialog() with message "Are you sure you want to delete service '\[service\_name\]'? This action cannot be undone.". If user clicks \[btnCancel\]: System closes dialog via closeDialog() and use case ends at step (7.2). |
| *(8), (9)* | *BR105* | **Querying Rules:** System executes SQL DELETE: "DELETE FROM Service WHERE service\_id \= \[selected\_service\_id\]" via deleteService(). If SQL execution fails: System calls displayErrorMessage("Failed to delete service. Please try again.") (Refer to MSG 21\) and use case ends. System displays success message "Service deleted successfully." (Refer to MSG 49\) and reloads services list via reloadServiceList(). (Refer to "Service" table in "DB Sheet" file) |

##### 2.1.3.20 Export Services to Excel

###### *Use Case Description*

This use case allows staff and administrators to export the current list of services (with applied filters) to an Excel file for reporting and analysis purposes.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to export services data

###### *Postconditions*

- Excel file containing services data is generated and downloaded  
- User can open and view the exported data

(Refer to "Activity Export Services to Excel" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(6), (6.1), (6.2)* | *BR106* | **Validation Rules:** When user clicks \[btnExport\], system queries services data with current filter criteria using same SQL as search operation. If result COUNT \= 0: System calls displayErrorMessage("No data to export.") (Refer to MSG 68\) and use case ends at step (6.2). |
| *(7), (8), (9)* | *BR107* | **Querying Rules:** System generates Excel file using library (e.g., Apache POI, ExcelJS) with columns: Service ID, Service Name, Price, Status, Created Date. System creates filename with timestamp format "Services\_Export\_YYYYMMDD\_HHMMSS.xlsx" via generateExportFilename(). System sets HTTP headers: Content-Type \= "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Content-Disposition \= "attachment; filename=\[generated\_filename\]". System sends file to browser for download via sendFileResponse(). |

##### 2.1.3.21 View Shift Details

###### *Use Case Description*

This use case allows staff and administrators to view the list of all work shifts in the system with search capabilities, and view detailed information of any selected shift.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to view shifts

###### *Postconditions*

- Shifts list is displayed with search results  
- Selected shift's detailed information is shown

(Refer to "Activity View Shift Details" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR108* | **Loading Screen Rules:** System loads "Shift Management" screen via displayShiftList() with components: \[gridShifts\] data grid showing columns (shift\_id, shift\_name, start\_time, end\_time, status), \[txtBoxSearch\] for search input, \[btnSearch\] button, \[btnAddNew\] button, \[btnExport\] button. System queries all shifts with SQL: "SELECT shift\_id, shift\_name, start\_time, end\_time, status FROM Shift ORDER BY start\_time ASC" and populates grid. (Refer to "Shift Management" view in "View Description" file) |
| *(5), (6)* | *BR109* | **Querying Rules:** When user enters search keyword in \[txtBoxSearch\] and clicks \[btnSearch\], system queries shifts with SQL: "SELECT shift\_id, shift\_name, start\_time, end\_time, status FROM Shift WHERE shift\_name LIKE '%\[search\]%' ORDER BY start\_time ASC" and refreshes \[gridShifts\] via refreshShiftList(). |
| *(8), (9)* | *BR110* | **Querying Rules:** When user selects a shift from \[gridShifts\] and clicks view details, system queries shift details with SQL: "SELECT shift\_id, shift\_name, start\_time, end\_time, status, created\_at FROM Shift WHERE shift\_id \= \[selected\_shift\_id\]". System displays modal dialog via displayShiftDetailsDialog() showing shift information. (Refer to "Shift" table in "DB Sheet" file) |

##### 2.1.3.22 Add New Shift

###### *Use Case Description*

This use case allows staff and administrators to create new shift records in the system. The system validates all inputs including time range validation, ensures shift name uniqueness, and creates the shift record.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to add shifts

###### *Postconditions*

- New shift is created in database  
- Shift appears in the shifts list

(Refer to "Activity Add New Shift" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR111* | **Loading Screen Rules:** System loads "Add New Shift" form via displayAddShiftForm() with fields: \[txtBoxShiftName\] for shift name, \[timePickerStart\] for start time, \[timePickerEnd\] for end time, \[btnSave\] button, \[btnCancel\] button. (Refer to "Add Shift" view in "View Description" file) |
| *(5), (6), (6.1)* | *BR112* | **Validation Rules:** When user clicks \[btnSave\], system validates all inputs. System checks: If \[txtBoxShiftName\].Text.isEmpty() OR \[timePickerStart\].Value.isEmpty() OR \[timePickerEnd\].Value.isEmpty(): System calls displayErrorMessage("Shift name, start time, and end time are required.") (Refer to MSG 50\) and returns to step (3). System validates shift name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Shift name must be 3-100 characters.") (Refer to MSG 103\) and returns to step (3). System validates start time is before end time. If \[timePickerStart\].Value \>= \[timePickerEnd\].Value: System calls displayErrorMessage("Start time must be before end time.") (Refer to MSG 104\) and returns to step (3). System queries to check shift name uniqueness: "SELECT COUNT(\*) FROM Shift WHERE shift\_name \= \[txtBoxShiftName\].Text". If COUNT \> 0: System calls displayErrorMessage("Shift name already exists.") (Refer to MSG 105\) and returns to step (3). |
| *(7), (8)* | *BR113* | **Querying Rules:** System executes SQL INSERT: "INSERT INTO Shift (shift\_name, start\_time, end\_time, status, created\_at) VALUES (\[txtBoxShiftName\].Text, \[timePickerStart\].Value, \[timePickerEnd\].Value, 'active', NOW())" via createShift(). If SQL execution fails: System calls displayErrorMessage("Failed to create shift. Please try again.") (Refer to MSG 106\) and use case ends. System displays success message "Shift created successfully." (Refer to MSG 51\) and redirects to shifts list via redirectToShiftList(). (Refer to "Shift" table in "DB Sheet" file) |

##### 2.1.3.23 Edit Shift

###### *Use Case Description*

This use case allows staff and administrators to modify existing shift information including shift name, start time, and end time. The system validates inputs including time range and ensures name uniqueness before updating.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to edit shifts  
- Target shift exists in the system

###### *Postconditions*

- Shift information is updated in database  
- Updated shift data is reflected in the shifts list

(Refer to "Activity Edit Shift" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(4), (5)* | *BR114* | **Loading Screen Rules:** When user selects shift to edit, system queries shift details with SQL: "SELECT shift\_id, shift\_name, start\_time, end\_time, status FROM Shift WHERE shift\_id \= \[selected\_shift\_id\]". System displays "Edit Shift" form via displayEditShiftForm() with fields populated: \[txtBoxShiftName\], \[timePickerStart\], \[timePickerEnd\], \[cmbStatus\] dropdown (Active/Inactive). (Refer to "Edit Shift" view in "View Description" file) |
| *(8), (8.1)* | *BR115* | **Validation Rules:** When user clicks \[btnSave\], system validates inputs. System checks: If \[txtBoxShiftName\].Text.isEmpty() OR \[timePickerStart\].Value.isEmpty() OR \[timePickerEnd\].Value.isEmpty(): System calls displayErrorMessage("Shift name, start time, and end time are required.") (Refer to MSG 50\) and returns to step (6). System validates shift name length 3-100 characters with regex "^.{3,100}$". If invalid: System calls displayErrorMessage("Shift name must be 3-100 characters.") (Refer to MSG 103\) and returns to step (6). System validates start time is before end time. If \[timePickerStart\].Value \>= \[timePickerEnd\].Value: System calls displayErrorMessage("Start time must be before end time.") (Refer to MSG 104\) and returns to step (6). System queries to check shift name uniqueness excluding current shift: "SELECT COUNT(\*) FROM Shift WHERE shift\_name \= \[txtBoxShiftName\].Text AND shift\_id \!= \[current\_shift\_id\]". If COUNT \> 0: System calls displayErrorMessage("Shift name already exists.") (Refer to MSG 105\) and returns to step (6). |
| *(9), (10)* | *BR116* | **Querying Rules:** System executes SQL UPDATE: "UPDATE Shift SET shift\_name \= \[txtBoxShiftName\].Text, start\_time \= \[timePickerStart\].Value, end\_time \= \[timePickerEnd\].Value, status \= \[cmbStatus\].SelectedValue, updated\_at \= NOW() WHERE shift\_id \= \[selected\_shift\_id\]" via updateShift(). If SQL execution fails: System calls displayErrorMessage("Failed to update shift. Please try again.") (Refer to MSG 52\) and use case ends. System displays success message "Shift updated successfully." (Refer to MSG 53\) and reloads shifts list via reloadShiftList(). (Refer to "Shift" table in "DB Sheet" file) |

##### 2.1.3.24 Delete Shift

###### *Use Case Description*

This use case allows staff and administrators to delete shift records from the system. The system checks for referenced bookings and prevents deletion if any bookings are using this shift, requiring user confirmation before deletion.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to delete shifts  
- Target shift exists in the system

###### *Postconditions*

- Shift is deleted from database (if no referenced data)  
- Shift is removed from shifts list

(Refer to "Activity Delete Shift" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(5), (5.1), (5.2)* | *BR117* | **Validation Rules:** When user selects shift and clicks delete, system queries referenced data with SQL: "SELECT COUNT(\*) FROM Booking WHERE shift\_id \= \[selected\_shift\_id\]". If COUNT \> 0: System calls displayErrorMessage("Cannot delete shift. This shift is used in \[COUNT\] booking(s).") (Refer to MSG 33\) and use case ends at step (5.2). |
| *(6), (7), (7.1), (7.2)* | *BR118* | **Displaying Rules:** System displays confirmation dialog via displayConfirmationDialog() with message "Are you sure you want to delete shift '\[shift\_name\]'? This action cannot be undone.". If user clicks \[btnCancel\]: System closes dialog via closeDialog() and use case ends at step (7.2). |
| *(8), (9)* | *BR119* | **Querying Rules:** System executes SQL DELETE: "DELETE FROM Shift WHERE shift\_id \= \[selected\_shift\_id\]" via deleteShift(). If SQL execution fails: System calls displayErrorMessage("Failed to delete shift. Please try again.") (Refer to MSG 34\) and use case ends. System displays success message "Shift deleted successfully." (Refer to MSG 112\) and reloads shifts list via reloadShiftList(). (Refer to "Shift" table in "DB Sheet" file) |

##### 2.1.3.25 Export Shifts to Excel

###### *Use Case Description*

This use case allows staff and administrators to export the current list of shifts (with applied filters) to an Excel file for reporting and analysis purposes.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to export shifts data

###### *Postconditions*

- Excel file containing shifts data is generated and downloaded  
- User can open and view the exported data

(Refer to "Activity Export Shifts to Excel" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(6), (6.1), (6.2)* | *BR120* | **Validation Rules:** When user clicks \[btnExport\], system queries shifts data with current filter criteria using same SQL as search operation. If result COUNT \= 0: System calls displayErrorMessage("No data to export.") (Refer to MSG 68\) and use case ends at step (6.2). |
| *(7), (8), (9)* | *BR121* | **Querying Rules:** System generates Excel file using library (e.g., Apache POI, ExcelJS) with columns: Shift ID, Shift Name, Start Time, End Time, Status, Created Date. System creates filename with timestamp format "Shifts\_Export\_YYYYMMDD\_HHMMSS.xlsx" via generateExportFilename(). System sets HTTP headers: Content-Type \= "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Content-Disposition \= "attachment; filename=\[generated\_filename\]". System sends file to browser for download via sendFileResponse(). |

#### 2.1.4 Customer Bookings Management

##### 2.1.4.1 Check Hall Availability

###### *Use Case Description*

This use case allows customers to search for available wedding halls based on their preferred date, shift, and hall type. The system checks existing bookings and displays available halls with detailed information to help customers make informed decisions.

###### *Actors*

- Customer

###### *Preconditions*

- User must be logged in as a customer with valid JWT access token

###### *Postconditions*

- Available halls are displayed based on search criteria  
- Customer can view hall details and proceed to booking if desired

(Refer to "Activity Check Hall Availability" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR122* | **Loading Screen Rules:** System loads "Check Hall Availability" screen via displayHallAvailabilitySearch() with components: \[datePickerWedding\] for wedding date, \[cmbShift\] dropdown populated with active shifts from Shift table, \[cmbHallType\] dropdown populated with active hall types from Hall\_Type table, \[btnSearch\] button. All dropdowns include "All" option as default. (Refer to "Hall Availability Search" view in "View Description" file) |
| *(7), (7.1)* | *BR123* | **Validation Rules:** When user clicks \[btnSearch\], system validates wedding date. System checks: If \[datePickerWedding\].Value \<= CurrentDate: System calls displayErrorMessage("Date must be in future.") (Refer to MSG 35\) and returns to step (3). |
| *(8), (9), (9.1)* | *BR124* | **Querying Rules:** System queries available halls with SQL: "SELECT h.hall\_id, h.hall\_name, ht.type\_name, h.max\_tables, ht.min\_table\_price, h.notes FROM Hall h INNER JOIN Hall\_Type ht ON h.type\_id \= ht.type\_id WHERE h.status \= 'active' AND h.hall\_id NOT IN (SELECT hall\_id FROM Booking WHERE wedding\_date \= \[datePickerWedding\].Value AND (shift\_id \= \[cmbShift\].SelectedValue OR \[cmbShift\].SelectedValue \= 'All') AND status IN ('Pending', 'Approved'))". If \[cmbHallType\].SelectedValue \!= 'All': Add "AND h.type\_id \= \[cmbHallType\].SelectedValue". If result COUNT \= 0: System calls displayNoResultsMessage("No available halls found. Try other dates or shifts.") (Refer to MSG 22\) with suggestions panel showing alternative dates/shifts via displaySuggestionsPanel(), and use case ends at step (9.2). |
| *(10), (11)* | *BR125* | **Displaying Rules:** System displays available halls in \[gridAvailableHalls\] data grid showing columns (hall\_name, type\_name, max\_tables, min\_table\_price, notes) via displayAvailableHalls(). Each row has \[btnViewDetails\] button to show hall details modal and \[btnBookNow\] button to navigate to booking form with pre-filled hall selection. (Refer to "Available Halls List" view in "View Description" file) |

##### 2.1.4.2 Submit Wedding Reservation

###### *Use Case Description*

This use case allows customers to submit a complete wedding reservation including basic information, wedding details, menu selection, and service selection. The system validates all inputs, checks hall availability, calculates costs, and creates the booking with all related records in a transaction.

###### *Actors*

- Customer

###### *Preconditions*

- User must be logged in as a customer with valid JWT access token

###### *Postconditions*

- New booking is created with status "Pending" awaiting staff approval  
- Booking details including menu and services are saved  
- Confirmation email is sent to customer  
- Hall is reserved for the selected date and shift

(Refer to "Activity Submit Wedding Reservation" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR126* | **Loading Screen Rules:** System loads "Submit Wedding Reservation" form via displayBookingForm() with sections: \[sectionBasicInfo\] with fields \[txtBoxGroomName\], \[txtBoxBrideName\], \[txtBoxPhone\]; \[sectionWeddingInfo\] with \[datePickerWedding\], \[cmbShift\] dropdown from Shift table, \[cmbHall\] dropdown from Hall table filtered by available halls, \[txtBoxTableCount\], \[txtBoxReserveTableCount\]; \[sectionMenu\] with \[gridDishes\] showing available dishes from Dish table with quantity input; \[sectionServices\] with \[gridServices\] showing available services from Service table with quantity input; \[lblTotalTableCost\], \[lblTotalServiceCost\], \[lblDepositAmount\], \[lblTotalInvoice\], \[lblRemainingAmount\] for cost display; \[btnSubmit\], \[btnCancel\] buttons. System pre-fills \[cmbShift\] and \[cmbHall\] if customer came from UC 2.1.4.1. (Refer to "Wedding Reservation Form" view in "View Description" file) |
| *(9), (10), (11), (12)* | *BR127* | **Validation Rules:** When user clicks \[btnSubmit\], system validates all inputs. System checks: If \[txtBoxGroomName\].Text.isEmpty() OR \[txtBoxBrideName\].Text.isEmpty() OR \[txtBoxPhone\].Text.isEmpty() OR \[datePickerWedding\].Value.isEmpty() OR \[cmbShift\].SelectedValue.isEmpty() OR \[cmbHall\].SelectedValue.isEmpty() OR \[txtBoxTableCount\].Text.isEmpty(): System calls displayErrorMessage("All required fields must be filled.") (Refer to MSG 18\) and returns to step (3). System validates phone format with regex "^\\d{10}$". If invalid: System calls displayErrorMessage("Phone must be 10 digits.") (Refer to MSG 8\) and returns to step (3). System validates wedding date. If \[datePickerWedding\].Value \<= CurrentDate: System calls displayErrorMessage("Wedding date must be in future.") (Refer to MSG 37\) and returns to step (3). System queries hall capacity: "SELECT max\_tables FROM Hall WHERE hall\_id \= \[cmbHall\].SelectedValue". If \[txtBoxTableCount\].Value \> max\_tables: System calls displayErrorMessage("Number of tables exceeds hall capacity of \[max\_tables\] tables.") (Refer to MSG 18\) and returns to step (3). |
| *(13), (13.1), (13.2)* | *BR128* | **Validation Rules:** System re-checks hall availability with SQL: "SELECT COUNT(\*) FROM Booking WHERE hall\_id \= \[cmbHall\].SelectedValue AND wedding\_date \= \[datePickerWedding\].Value AND shift\_id \= \[cmbShift\].SelectedValue AND status IN ('Pending', 'Approved')". If COUNT \> 0: System calls displayErrorMessage("Hall is no longer available for selected date and shift.") (Refer to MSG 39\) and use case ends at step (13.2). |
| *(14), (15), (16), (17)* | *BR129* | **Querying Rules:** System calculates costs: TongTienBan \= \[txtBoxTableCount\].Value \* min\_table\_price (from Hall\_Type), TongTienDV \= SUM(selected services price \* quantity), TienDatCoc \= (TongTienBan \+ TongTienDV) \* 0.3, TongTienHoaDon \= TongTienBan \+ TongTienDV, TienConLai \= TongTienHoaDon \- TienDatCoc. System begins transaction via beginTransaction(). System executes SQL INSERT: "INSERT INTO Booking (user\_id, hall\_id, shift\_id, wedding\_date, groom\_name, bride\_name, phone, table\_count, reserve\_table\_count, total\_table\_cost, total\_service\_cost, deposit\_amount, total\_invoice, remaining\_amount, status, created\_at) VALUES (\[current\_user\_id\], \[cmbHall\].SelectedValue, \[cmbShift\].SelectedValue, \[datePickerWedding\].Value, \[txtBoxGroomName\].Text, \[txtBoxBrideName\].Text, \[txtBoxPhone\].Text, \[txtBoxTableCount\].Value, \[txtBoxReserveTableCount\].Value, TongTienBan, TongTienDV, TienDatCoc, TongTienHoaDon, TienConLai, 'Pending', NOW())" and retrieve generated booking\_id. For each selected dish: System executes "INSERT INTO Menu\_Item (booking\_id, dish\_id, quantity) VALUES (\[booking\_id\], \[dish\_id\], \[quantity\])". For each selected service: System executes "INSERT INTO Service\_Detail (booking\_id, service\_id, quantity) VALUES (\[booking\_id\], \[service\_id\], \[quantity\])". System commits transaction via commitTransaction(). System sends confirmation email via sendBookingConfirmationEmail(\[txtBoxPhone\].Text, \[booking\_id\]). (Refer to "Booking", "Menu\_Item", "Service\_Detail" tables in "DB Sheet" file) |
| *(18), (19)* | *BR130* | **Displaying Rules:** System displays success message "Booking submitted successfully. Booking ID: \[booking\_id\]. Please check your email for confirmation." (Refer to MSG 40\) via displaySuccessMessage(). System redirects to booking details view via redirectToBookingDetails(\[booking\_id\]). |

##### 2.1.4.3 View My Booking Details

###### *Use Case Description*

This use case allows customers to view their list of wedding bookings with different statuses and view detailed information of any selected booking including all wedding details, menu items, services, and payment information.

###### *Actors*

- Customer

###### *Preconditions*

- User must be logged in as a customer with valid JWT access token

###### *Postconditions*

- Customer's bookings list is displayed  
- Selected booking's complete details are shown  
- Customer can access edit or cancel actions if applicable

(Refer to "Activity View My Booking Details" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2), (2.1)* | *BR131* | **Querying Rules:** System queries customer's bookings with SQL: "SELECT booking\_id, wedding\_date, groom\_name, bride\_name, hall\_id, status, total\_invoice, created\_at FROM Booking WHERE user\_id \= \[current\_user\_id\] ORDER BY created\_at DESC". If result COUNT \= 0: System calls displayNoResultsMessage("No bookings found. Create your first wedding booking\!") (Refer to MSG 119\) with \[btnCreateBooking\] button via displayCreateBookingPrompt(), and use case ends at step (2.2). |
| *(3), (4)* | *BR132* | **Displaying Rules:** System displays bookings list in \[gridMyBookings\] data grid via displayCustomerBookings() with columns (booking\_id, wedding\_date, groom\_name, bride\_name, hall\_name via JOIN Hall, status, total\_invoice). System applies status colors: Pending \= yellow, Approved \= green, Rejected \= red, Cancelled \= gray. Grid includes \[txtBoxSearch\] for search by names, \[cmbStatusFilter\] dropdown for status filtering, \[btnRefresh\] button. (Refer to "My Bookings List" view in "View Description" file) |
| *(6), (6.1)* | *BR133* | **Querying Rules:** When user selects booking and clicks view details, system queries complete booking details with SQL: "SELECT b.\*, h.hall\_name, ht.type\_name, s.shift\_name, s.start\_time, s.end\_time FROM Booking b INNER JOIN Hall h ON b.hall\_id \= h.hall\_id INNER JOIN Hall\_Type ht ON h.type\_id \= ht.type\_id INNER JOIN Shift s ON b.shift\_id \= s.shift\_id WHERE b.booking\_id \= \[selected\_booking\_id\]". System queries menu items: "SELECT d.dish\_name, mi.quantity, d.price FROM Menu\_Item mi INNER JOIN Dish d ON mi.dish\_id \= d.dish\_id WHERE mi.booking\_id \= \[selected\_booking\_id\]". System queries services: "SELECT s.service\_name, sd.quantity, s.price FROM Service\_Detail sd INNER JOIN Service s ON sd.service\_id \= s.service\_id WHERE sd.booking\_id \= \[selected\_booking\_id\]". If any query fails: System calls displayErrorMessage("Cannot load booking details. Please try again.") (Refer to MSG 120\) and use case ends at step (6.2). |
| *(7), (8), (9)* | *BR134* | **Displaying Rules:** System displays booking details modal via displayBookingDetailsDialog() with sections: \[sectionBasicInfo\] showing booking\_id, status, created\_at; \[sectionWeddingInfo\] showing wedding\_date, shift\_name with time range, hall\_name with type, groom\_name, bride\_name, phone, table\_count, reserve\_table\_count; \[sectionMenu\] with \[gridMenuItems\] showing dish\_name, quantity, price; \[sectionServices\] with \[gridServiceDetails\] showing service\_name, quantity, price; \[sectionPayment\] showing total\_table\_cost, total\_service\_cost, deposit\_amount, total\_invoice, remaining\_amount. If status \= 'Pending': Display \[btnEdit\] and \[btnCancel\] action buttons. (Refer to "Booking Details Dialog" view in "View Description" file) |

##### 2.1.4.4 Edit My Booking Request

###### *Use Case Description*

This use case allows customers to edit their pending booking requests before staff approval. Customers can modify wedding details, menu selection, and services. The system validates changes, recalculates costs, and updates all related records.

###### *Actors*

- Customer

###### *Preconditions*

- User must be logged in as a customer with valid JWT access token  
- Target booking exists and has status "Pending"  
- Wedding date has not passed

###### *Postconditions*

- Booking information is updated with new details  
- Menu and service selections are updated  
- Costs are recalculated  
- Update notification email is sent

(Refer to "Activity Edit My Booking Request" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2), (2.1), (2.2)* | *BR135* | **Validation Rules:** When customer views booking details (from UC 2.1.4.3), system checks booking status. If status \!= 'Pending': System calls displayErrorMessage("Cannot edit this booking. Only pending bookings can be edited.") (Refer to MSG 121\) and use case ends at step (2.2). |
| *(5)* | *BR136* | **Loading Screen Rules:** System displays edit booking form via displayEditBookingForm() pre-populated with current booking data including: \[txtBoxGroomName\], \[txtBoxBrideName\], \[txtBoxPhone\], \[datePickerWedding\], \[cmbShift\], \[cmbHall\], \[txtBoxTableCount\], \[txtBoxReserveTableCount\], selected menu items in \[gridDishes\] with quantities, selected services in \[gridServices\] with quantities. Form includes real-time cost calculator showing updated totals as customer modifies selections. (Refer to "Edit Booking Form" view in "View Description" file) |
| *(9), (10), (11), (11.1)* | *BR137* | **Validation Rules:** When user clicks \[btnSaveChanges\], system validates all inputs using same validation as BR127. If date, shift, or hall changed: System queries availability with SQL: "SELECT COUNT(\*) FROM Booking WHERE hall\_id \= \[cmbHall\].SelectedValue AND wedding\_date \= \[datePickerWedding\].Value AND shift\_id \= \[cmbShift\].SelectedValue AND status IN ('Pending', 'Approved') AND booking\_id \!= \[current\_booking\_id\]". If COUNT \> 0: System calls displayErrorMessage("Hall is no longer available for selected date and shift.") (Refer to MSG 39\) and returns to step (6). System validates table count against hall capacity same as BR127. If any validation fails: Display specific error message and return to step (6). |
| *(12), (13), (14), (15)* | *BR138* | **Querying Rules:** System recalculates costs using same formula as BR129. System begins transaction via beginTransaction(). System executes SQL UPDATE: "UPDATE Booking SET hall\_id \= \[cmbHall\].SelectedValue, shift\_id \= \[cmbShift\].SelectedValue, wedding\_date \= \[datePickerWedding\].Value, groom\_name \= \[txtBoxGroomName\].Text, bride\_name \= \[txtBoxBrideName\].Text, phone \= \[txtBoxPhone\].Text, table\_count \= \[txtBoxTableCount\].Value, reserve\_table\_count \= \[txtBoxReserveTableCount\].Value, total\_table\_cost \= TongTienBan, total\_service\_cost \= TongTienDV, deposit\_amount \= TienDatCoc, total\_invoice \= TongTienHoaDon, remaining\_amount \= TienConLai, updated\_at \= NOW() WHERE booking\_id \= \[current\_booking\_id\]". System executes "DELETE FROM Menu\_Item WHERE booking\_id \= \[current\_booking\_id\]" then inserts new menu items. System executes "DELETE FROM Service\_Detail WHERE booking\_id \= \[current\_booking\_id\]" then inserts new service details. System commits transaction via commitTransaction(). System sends update notification email via sendBookingUpdateEmail(\[txtBoxPhone\].Text, \[current\_booking\_id\]). System displays success message "Booking updated successfully." (Refer to MSG 122). (Refer to "Booking", "Menu\_Item", "Service\_Detail" tables in "DB Sheet" file) |

##### 2.1.4.5 Cancel My Booking

###### *Use Case Description*

This use case allows customers to cancel their wedding booking. The system enforces cancellation policies, warns about deposit forfeiture, records cancellation details, and updates the booking status.

###### *Actors*

- Customer

###### *Preconditions*

- User must be logged in as a customer with valid JWT access token  
- Target booking exists with status allowing cancellation  
- Wedding date has not passed

###### *Postconditions*

- Booking status is updated to "Cancelled"  
- Cancellation details are recorded  
- Deposit is marked as non-refundable  
- Cancellation confirmation email is sent

(Refer to "Activity Cancel My Booking" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2), (2.1), (2.2)* | *BR139* | **Validation Rules:** When customer views booking details (from UC 2.1.4.3), system checks booking status and wedding date. System queries: "SELECT status, wedding\_date, deposit\_amount FROM Booking WHERE booking\_id \= \[selected\_booking\_id\]". If status IN ('Cancelled', 'Completed') OR wedding\_date \< CurrentDate: System calls displayErrorMessage("Cannot cancel this booking. Booking is already \[status\] or date has passed.") (Refer to MSG 41\) and use case ends at step (2.2). |
| *(5), (6), (7)* | *BR140* | **Displaying Rules:** System displays cancellation confirmation dialog via displayCancellationDialog() with components: \[lblWarning\] showing bold text "Warning: Deposit will not be refunded", \[lblDepositAmount\] showing "Deposit amount to be forfeited: \[deposit\_amount\] VND", \[txtBoxCancellationReason\] optional text area for reason, \[btnConfirm\] and \[btnCancelAction\] buttons. (Refer to "Cancellation Confirmation Dialog" view in "View Description" file) |
| *(8), (8.1), (8.2)* | *BR141* | **Validation Rules:** If customer clicks \[btnCancelAction\]: System closes dialog via closeDialog() and returns to booking details view, use case ends at step (8.2). |
| *(9), (10), (11), (12), (13)* | *BR142* | **Querying Rules:** When customer clicks \[btnConfirm\], system begins transaction via beginTransaction(). System executes SQL UPDATE: "UPDATE Booking SET status \= 'Cancelled', cancellation\_date \= NOW(), cancellation\_reason \= \[txtBoxCancellationReason\].Text, remaining\_amount \= 0, updated\_at \= NOW() WHERE booking\_id \= \[selected\_booking\_id\]". System commits transaction via commitTransaction(). System sends cancellation confirmation email via sendCancellationEmail(\[phone\], \[booking\_id\], \[deposit\_amount\]) with deposit non-refundable notice. System displays success message "Booking cancelled successfully. Deposit \[deposit\_amount\] VND is non-refundable as per policy." (Refer to MSG 87). (Refer to "Booking" table in "DB Sheet" file) |

#### 2.1.5 Staff Booking Management

##### 2.1.5.1 Search and Filter All Bookings

###### *Use Case Description*

This use case allows staff and administrators to search and filter all bookings in the system using various criteria including keywords, status, date ranges, halls, and shifts. This provides comprehensive booking management capabilities.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to view bookings

###### *Postconditions*

- Filtered bookings list is displayed based on search criteria  
- Staff can view booking details or perform actions on selected bookings

(Refer to "Activity Search/Filter All Bookings" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2), (3)* | *BR143* | **Loading Screen Rules:** System loads "Manage Bookings" screen via displayBookingsManagement() with components: \[txtBoxKeyword\] for search by booking\_id, groom\_name, bride\_name, or phone; \[cmbStatusFilter\] dropdown with options (All, Pending, Approved, Rejected, Cancelled, Completed); \[datePickerStartDate\] and \[datePickerEndDate\] for date range; \[cmbHallFilter\] dropdown populated from Hall table; \[cmbShiftFilter\] dropdown populated from Shift table; \[btnSearch\] and \[btnReset\] buttons; \[gridBookings\] data grid. System displays recent bookings by default with SQL: "SELECT booking\_id, wedding\_date, groom\_name, bride\_name, hall\_id, shift\_id, status, total\_invoice, created\_at FROM Booking ORDER BY created\_at DESC LIMIT 50". (Refer to "Bookings Management" view in "View Description" file) |
| *(6), (6.1)* | *BR144* | **Querying Rules:** When user clicks \[btnSearch\], system builds dynamic SQL query starting with: "SELECT b.booking\_id, b.wedding\_date, b.groom\_name, b.bride\_name, h.hall\_name, s.shift\_name, b.status, b.total\_invoice, b.created\_at FROM Booking b INNER JOIN Hall h ON b.hall\_id \= h.hall\_id INNER JOIN Shift s ON b.shift\_id \= s.shift\_id WHERE 1=1". If \[txtBoxKeyword\].Text not empty: Add "AND (b.booking\_id LIKE '%\[keyword\]%' OR b.groom\_name LIKE '%\[keyword\]%' OR b.bride\_name LIKE '%\[keyword\]%' OR b.phone LIKE '%\[keyword\]%')". If \[cmbStatusFilter\].SelectedValue \!= 'All': Add "AND b.status \= \[cmbStatusFilter\].SelectedValue". If date range specified: Add "AND b.wedding\_date BETWEEN \[datePickerStartDate\].Value AND \[datePickerEndDate\].Value". If \[cmbHallFilter\].SelectedValue \!= 'All': Add "AND b.hall\_id \= \[cmbHallFilter\].SelectedValue". If \[cmbShiftFilter\].SelectedValue \!= 'All': Add "AND b.shift\_id \= \[cmbShiftFilter\].SelectedValue". Add "ORDER BY b.created\_at DESC". If result COUNT \= 0: System calls displayNoResultsMessage("No bookings found. Try adjusting search criteria.") (Refer to MSG 88). |
| *(7), (8)* | *BR145* | **Displaying Rules:** System displays search results in \[gridBookings\] with columns (booking\_id, wedding\_date, groom\_name, bride\_name, hall\_name, shift\_name, status with color coding, total\_invoice) via displayBookingsResults(). Each row has action buttons: \[btnViewDetails\], \[btnEdit\] (if status allows), \[btnDelete\]. Status colors: Pending=yellow, Approved=green, Rejected=red, Cancelled=gray, Completed=blue. Grid supports sorting by columns and pagination for large result sets. |

##### 2.1.5.2 View Any Booking Details

###### *Use Case Description*

This use case allows staff and administrators to view complete details of any booking in the system including customer information, wedding details, menu items, services, payment information, notes, and booking history.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to view booking details  
- Target booking exists in the system

###### *Postconditions*

- Complete booking details are displayed  
- Staff can access edit, approve, or delete actions if applicable

(Refer to "Activity View Any Booking Details" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2), (2.1), (2.2)* | *BR146* | **Validation Rules:** When staff selects booking from list, system validates booking exists with SQL: "SELECT COUNT(\*) FROM Booking WHERE booking\_id \= \[selected\_booking\_id\]". If COUNT \= 0: System calls displayErrorMessage("Booking does not exist.") (Refer to MSG 89\) and use case ends at step (2.2). |
| *(3), (3.1), (3.2)* | *BR147* | **Querying Rules:** System queries complete booking details with SQL: "SELECT b.\*, u.username, u.email AS customer\_email, h.hall\_name, ht.type\_name, s.shift\_name, s.start\_time, s.end\_time FROM Booking b INNER JOIN User u ON b.user\_id \= u.user\_id INNER JOIN Hall h ON b.hall\_id \= h.hall\_id INNER JOIN Hall\_Type ht ON h.type\_id \= ht.type\_id INNER JOIN Shift s ON b.shift\_id \= s.shift\_id WHERE b.booking\_id \= \[selected\_booking\_id\]". System queries menu items: "SELECT d.dish\_name, mi.quantity, d.price, (mi.quantity \* d.price) AS subtotal FROM Menu\_Item mi INNER JOIN Dish d ON mi.dish\_id \= d.dish\_id WHERE mi.booking\_id \= \[selected\_booking\_id\]". System queries services: "SELECT s.service\_name, sd.quantity, s.price, (sd.quantity \* s.price) AS subtotal FROM Service\_Detail sd INNER JOIN Service s ON sd.service\_id \= s.service\_id WHERE sd.booking\_id \= \[selected\_booking\_id\]". If any query fails: System calls displayErrorMessage("Cannot load booking details. Please try again.") (Refer to MSG 120\) and use case ends at step (3.2). |
| *(4)* | *BR148* | **Displaying Rules:** System displays booking details dialog via displayStaffBookingDetailsDialog() with comprehensive sections: \[sectionBasicInfo\] showing booking\_id, status, created\_at, updated\_at; \[sectionCustomerInfo\] showing username, email, phone; \[sectionWeddingInfo\] showing wedding\_date, shift\_name with time range, hall\_name with type, groom\_name, bride\_name, table\_count, reserve\_table\_count, notes; \[sectionMenu\] with \[gridMenuItems\] showing dish\_name, quantity, price, subtotal with total; \[sectionServices\] with \[gridServiceDetails\] showing service\_name, quantity, price, subtotal with total; \[sectionPayment\] showing total\_table\_cost, total\_service\_cost, deposit\_amount, total\_invoice, remaining\_amount, payment status; \[sectionHistory\] showing creation date, last update, cancellation details if applicable. Action buttons displayed based on status and permissions. (Refer to "Staff Booking Details Dialog" view in "View Description" file) |

##### 2.1.5.3 Check System Hall Availability

###### *Use Case Description*

This use case allows staff and administrators to view hall availability across the system in calendar or grid view for different time periods (day/week/month). This helps staff manage bookings efficiently and identify available slots quickly.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to view hall availability

###### *Postconditions*

- Hall availability is displayed in selected view mode  
- Staff can click available slots to create bookings or view existing bookings

(Refer to "Activity Check System Hall Availability" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR149* | **Loading Screen Rules:** System loads "Hall Availability View" screen via displayHallAvailabilityView() with components: \[cmbViewMode\] dropdown (Day View, Week View, Month View) with default "Week View"; \[datePickerStartDate\] for view start date defaulting to current date; \[cmbHallTypeFilter\] dropdown from Hall\_Type table with "All Types" option; \[cmbShiftFilter\] dropdown from Shift table with "All Shifts" option; \[btnSearch\] button; \[divCalendar\] container for calendar/grid display. (Refer to "Hall Availability View" view in "View Description" file) |
| *(7), (8), (9), (9.1)* | *BR150* | **Querying Rules:** When user clicks \[btnSearch\], system queries halls with SQL: "SELECT hall\_id, hall\_name, type\_id FROM Hall WHERE status \= 'active'". If \[cmbHallTypeFilter\].SelectedValue \!= 'All': Add "AND type\_id \= \[cmbHallTypeFilter\].SelectedValue". System determines date range based on view mode: Day View \= 1 day, Week View \= 7 days, Month View \= 30 days from \[datePickerStartDate\].Value. System queries bookings with SQL: "SELECT booking\_id, hall\_id, shift\_id, wedding\_date, status, groom\_name, bride\_name FROM Booking WHERE wedding\_date BETWEEN \[start\_date\] AND \[end\_date\] AND status IN ('Pending', 'Approved')". If \[cmbShiftFilter\].SelectedValue \!= 'All': Add "AND shift\_id \= \[cmbShiftFilter\].SelectedValue". If hall query COUNT \= 0: System calls displayErrorMessage("No halls in system.") (Refer to MSG 90\) and use case ends at step (9.2). |
| *(10), (11), (12)* | *BR151* | **Displaying Rules:** System combines hall and booking data to render availability calendar via renderAvailabilityCalendar(). For each hall and date/shift combination: If no booking exists: Display slot with green background indicating "Available", clickable to navigate to create booking form with pre-filled date/hall/shift. If booking exists with status 'Pending' or 'Approved': Display slot with yellow/red background showing booking\_id and customer names, clickable to view booking details. Calendar legend shows: Green="Available", Yellow="Pending Booking", Red="Confirmed Booking". Grid displays halls as rows and dates/shifts as columns. Hovering over slots shows tooltip with additional information. |

##### 2.1.5.4 Create Booking for Customer

###### *Use Case Description*

This use case allows staff to create wedding bookings on behalf of customers. Staff can enter all booking details, select menu and services, set booking status directly, and complete the reservation process with full administrative control.

###### *Actors*

- Staff

###### *Preconditions*

- User must be logged in as staff with valid JWT access token  
- User has permission to create bookings

###### *Postconditions*

- New booking is created with staff-selected status  
- Booking details including menu and services are saved  
- Confirmation email is sent to customer  
- Hall is reserved for the selected date and shift

(Refer to "Activity Create Booking for Customer" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR152* | **Loading Screen Rules:** System loads "Create Booking for Customer" form via displayStaffCreateBookingForm() with comprehensive sections: \[sectionCustomerInfo\] with \[txtBoxUsername\], \[txtBoxEmail\], \[txtBoxPhone\], \[btnSearchCustomer\] to auto-fill from existing users; \[sectionWeddingInfo\] with \[datePickerWedding\], \[cmbShift\], \[cmbHall\], \[txtBoxGroomName\], \[txtBoxBrideName\], \[txtBoxTableCount\], \[txtBoxReserveTableCount\], \[txtBoxNotes\]; \[sectionMenu\] with \[gridDishes\] for dish selection with quantities; \[sectionServices\] with \[gridServices\] for service selection with quantities; \[sectionPayment\] with \[txtBoxDepositAmount\] (editable by staff), auto-calculated fields for costs, \[cmbBookingStatus\] dropdown (Pending, Approved) for staff to set initial status; \[btnSave\], \[btnCancel\] buttons. Real-time cost calculator updates totals as staff modifies selections. (Refer to "Staff Create Booking Form" view in "View Description" file) |
| *(5), (6), (7), (7.1)* | *BR153* | **Validation Rules:** When staff clicks \[btnSave\], system validates all inputs. System checks: If \[txtBoxEmail\].Text.isEmpty() OR \[txtBoxPhone\].Text.isEmpty() OR \[txtBoxGroomName\].Text.isEmpty() OR \[txtBoxBrideName\].Text.isEmpty() OR \[datePickerWedding\].Value.isEmpty() OR \[cmbShift\].SelectedValue.isEmpty() OR \[cmbHall\].SelectedValue.isEmpty() OR \[txtBoxTableCount\].Text.isEmpty(): System calls displayErrorMessage("All required fields must be filled.") (Refer to MSG 18\) and returns to step (3). System validates email format with regex "^\[a-zA-Z0-9.\_%+-\]+@\[a-zA-Z0-9.-\]+\\.\[a-zA-Z\]{2,}$". If invalid: System calls displayErrorMessage("Invalid email format.") (Refer to MSG 7\) and returns to step (3). System validates phone format with regex "^\\d{10}$". If invalid: System calls displayErrorMessage("Phone must be 10 digits.") (Refer to MSG 8\) and returns to step (3). System validates wedding date. If \[datePickerWedding\].Value \<= CurrentDate: System calls displayErrorMessage("Wedding date must be in future.") (Refer to MSG 37\) and returns to step (3). System queries hall capacity and validates: If \[txtBoxTableCount\].Value \> max\_tables: System calls displayErrorMessage("Number of tables exceeds hall capacity.") (Refer to MSG 128\) and returns to step (3). |
| *(8), (8.1), (8.2)* | *BR154* | **Validation Rules:** System checks hall availability with SQL: "SELECT COUNT(\*) FROM Booking WHERE hall\_id \= \[cmbHall\].SelectedValue AND wedding\_date \= \[datePickerWedding\].Value AND shift\_id \= \[cmbShift\].SelectedValue AND status IN ('Pending', 'Approved')". If COUNT \> 0: System calls displayErrorMessage("Hall is already booked for selected date and shift.") (Refer to MSG 42\) and use case ends at step (8.2). |
| *(9), (10), (11), (12)* | *BR155* | **Querying Rules:** System calculates costs same as BR129, but uses staff-entered \[txtBoxDepositAmount\].Value if provided (default to 30% calculation). System looks up or creates user*id: If \[btnSearchCustomer\] was used and customer exists: Use existing user\_id. Else: System creates new user with SQL: "INSERT INTO User (username, email, phone, role, status, created\_at) VALUES (CONCAT('customer*', \[txtBoxPhone\].Text), \[txtBoxEmail\].Text, \[txtBoxPhone\].Text, 'customer', 'active', NOW())" and retrieve user\_id. System begins transaction via beginTransaction(). System executes SQL INSERT: "INSERT INTO Booking (user\_id, hall\_id, shift\_id, wedding\_date, groom\_name, bride\_name, phone, table\_count, reserve\_table\_count, total\_table\_cost, total\_service\_cost, deposit\_amount, total\_invoice, remaining\_amount, notes, status, created\_at) VALUES (\[user\_id\], \[cmbHall\].SelectedValue, \[cmbShift\].SelectedValue, \[datePickerWedding\].Value, \[txtBoxGroomName\].Text, \[txtBoxBrideName\].Text, \[txtBoxPhone\].Text, \[txtBoxTableCount\].Value, \[txtBoxReserveTableCount\].Value, TongTienBan, TongTienDV, \[txtBoxDepositAmount\].Value, TongTienHoaDon, TienConLai, \[txtBoxNotes\].Text, \[cmbBookingStatus\].SelectedValue, NOW())" and retrieve booking\_id. System inserts menu items and service details same as BR129. System commits transaction via commitTransaction(). System sends confirmation email via sendBookingConfirmationEmail(\[txtBoxEmail\].Text, \[booking\_id\]). (Refer to "Booking", "Menu\_Item", "Service\_Detail", "User" tables in "DB Sheet" file) |
| *(13), (14)* | *BR156* | **Displaying Rules:** System displays success message "Booking created successfully. Booking ID: \[booking\_id\]." (Refer to MSG 12\) via displaySuccessMessage(). System redirects to booking details view via redirectToBookingDetails(\[booking\_id\]). |

##### 2.1.5.5 Modify Booking Details

###### *Use Case Description*

This use case allows staff to modify existing booking details including customer information, wedding details, menu, services, and payment information. Staff have broader editing permissions than customers and can edit bookings in different statuses.

###### *Actors*

- Staff

###### *Preconditions*

- User must be logged in as staff with valid JWT access token  
- User has permission to edit bookings  
- Target booking exists in the system  
- Booking status allows editing (not Completed or Cancelled)

###### *Postconditions*

- Booking information is updated with new details  
- Menu and service selections are updated  
- Costs are recalculated  
- Update notification email is sent to customer

(Refer to "Activity Modify Booking Details" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2), (2.1), (2.2)* | *BR157* | **Validation Rules:** When staff views booking details (from UC 2.1.5.2), system checks booking status. If status IN ('Completed', 'Cancelled'): System calls displayErrorMessage("Cannot edit completed or cancelled bookings.") (Refer to MSG 44\) and use case ends at step (2.2). |
| *(5)* | *BR158* | **Loading Screen Rules:** System displays edit booking form via displayStaffEditBookingForm() pre-populated with current booking data. Form structure same as BR152 with all sections editable: customer info, wedding info, menu, services, payment, status. Form includes \[cmbBookingStatus\] dropdown with all status options (Pending, Approved, Rejected, Cancelled) for staff to change status. Real-time cost calculator updates totals as staff modifies selections. (Refer to "Staff Edit Booking Form" view in "View Description" file) |
| *(9), (10), (11), (11.1)* | *BR159* | **Validation Rules:** When staff clicks \[btnSaveChanges\], system validates all inputs using same validation as BR153. If date, shift, or hall changed: System queries availability with SQL: "SELECT COUNT(\*) FROM Booking WHERE hall\_id \= \[cmbHall\].SelectedValue AND wedding\_date \= \[datePickerWedding\].Value AND shift\_id \= \[cmbShift\].SelectedValue AND status IN ('Pending', 'Approved') AND booking\_id \!= \[current\_booking\_id\]". If COUNT \> 0: System calls displayErrorMessage("Hall is already booked for selected date and shift.") (Refer to MSG 42\) and returns to step (6). System validates table count against hall capacity. If any validation fails: Display specific error message and return to step (6). |
| *(12), (13), (14), (15)* | *BR160* | **Querying Rules:** System recalculates costs using staff-entered deposit if provided. System begins transaction via beginTransaction(). System executes SQL UPDATE: "UPDATE Booking SET user\_id \= \[user\_id\], hall\_id \= \[cmbHall\].SelectedValue, shift\_id \= \[cmbShift\].SelectedValue, wedding\_date \= \[datePickerWedding\].Value, groom\_name \= \[txtBoxGroomName\].Text, bride\_name \= \[txtBoxBrideName\].Text, phone \= \[txtBoxPhone\].Text, table\_count \= \[txtBoxTableCount\].Value, reserve\_table\_count \= \[txtBoxReserveTableCount\].Value, total\_table\_cost \= TongTienBan, total\_service\_cost \= TongTienDV, deposit\_amount \= \[txtBoxDepositAmount\].Value, total\_invoice \= TongTienHoaDon, remaining\_amount \= TienConLai, notes \= \[txtBoxNotes\].Text, status \= \[cmbBookingStatus\].SelectedValue, updated\_at \= NOW() WHERE booking\_id \= \[current\_booking\_id\]". System executes "DELETE FROM Menu\_Item WHERE booking\_id \= \[current\_booking\_id\]" then inserts new menu items. System executes "DELETE FROM Service\_Detail WHERE booking\_id \= \[current\_booking\_id\]" then inserts new service details. System commits transaction via commitTransaction(). System sends update notification email via sendBookingUpdateEmail(\[customer\_email\], \[current\_booking\_id\]). System displays success message "Booking updated successfully." (Refer to MSG 122). (Refer to "Booking", "Menu\_Item", "Service\_Detail" tables in "DB Sheet" file) |

##### 2.1.5.6 Delete Booking

###### *Use Case Description*

This use case allows staff and administrators to permanently delete booking records from the system. The system requires confirmation and logs the deletion action for audit purposes.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to delete bookings  
- Target booking exists in the system

###### *Postconditions*

- Booking and all related records are deleted from database  
- Deletion is logged for audit trail  
- Bookings list is refreshed

(Refer to "Activity Delete Booking" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(5), (6), (6.1), (6.2)* | *BR161* | **Displaying Rules:** When staff selects booking and clicks delete, system displays confirmation dialog via displayDeleteConfirmationDialog() with message "Are you sure you want to delete booking \[booking\_id\] for \[groom\_name\] & \[bride\_name\]? This action cannot be undone and will permanently remove all booking data including menu and services." with \[btnConfirmDelete\] and \[btnCancel\] buttons. If staff clicks \[btnCancel\]: System closes dialog via closeDialog() and use case ends at step (6.2). |
| *(7), (7.1), (7.2), (7.3)* | *BR162* | **Querying Rules:** When staff confirms deletion, system begins transaction via beginTransaction(). System executes SQL DELETE in order: "DELETE FROM Service\_Detail WHERE booking\_id \= \[selected\_booking\_id\]", "DELETE FROM Menu\_Item WHERE booking\_id \= \[selected\_booking\_id\]", "DELETE FROM Booking WHERE booking\_id \= \[selected\_booking\_id\]". If any DELETE fails: System rolls back transaction via rollbackTransaction(), calls displayErrorMessage("Cannot delete booking. Database error occurred.") (Refer to MSG 45), and use case ends at step (7.3). |
| *(8), (9), (10)* | *BR163* | **Querying Rules:** System commits transaction via commitTransaction(). System logs deletion action: "INSERT INTO Audit\_Log (user\_id, action\_type, table\_name, record\_id, action\_details, created\_at) VALUES (\[current\_user\_id\], 'DELETE', 'Booking', \[selected\_booking\_id\], 'Deleted booking for \[groom\_name\] & \[bride\_name\]', NOW())". System displays success message "Booking deleted successfully." (Refer to MSG 30\) via displaySuccessMessage(). System refreshes bookings list via reloadBookingsList(). (Refer to "Booking", "Menu\_Item", "Service\_Detail", "Audit\_Log" tables in "DB Sheet" file) |

#### 2.1.6 Customer Payment

##### 2.1.6.1 View My Invoice and Debt

###### *Use Case Description*

This use case allows customers to view their list of invoices and detailed information about each invoice including payment status, amounts paid, and remaining debt.

###### *Actors*

- Customer

###### *Preconditions*

- User must be logged in as a customer with valid JWT access token

###### *Postconditions*

- Customer's invoices list is displayed  
- Selected invoice's complete details including debt information are shown

(Refer to "Activity View My Invoice & Debt" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2), (2.1)* | *BR164* | **Querying Rules:** System queries customer's invoices with SQL: "SELECT booking\_id, wedding\_date, groom\_name, bride\_name, total\_invoice, deposit\_amount, remaining\_amount, status FROM Booking WHERE user\_id \= \[current\_user\_id\] AND status IN ('Approved', 'Completed') ORDER BY wedding\_date DESC". If result COUNT \= 0: System calls displayNoResultsMessage("You don't have any invoices yet.") (Refer to MSG 68\) and use case ends at step (2.2). |
| *(3), (4)* | *BR165* | **Displaying Rules:** System displays invoices list in \[gridMyInvoices\] data grid via displayCustomerInvoices() with columns (booking\_id, wedding\_date, groom\_name, bride\_name, total\_invoice, deposit\_amount as "Paid Amount", remaining\_amount as "Remaining Debt", payment\_status). System calculates payment\_status: If remaining\_amount \= 0: "Paid in Full" (green), Else If remaining\_amount \> 0 AND wedding\_date \> CurrentDate: "Pending Payment" (yellow), Else If remaining\_amount \> 0 AND wedding\_date \<= CurrentDate: "Overdue" (red). Each row has \[btnViewDetails\] button to view full invoice. (Refer to "My Invoices List" view in "View Description" file) |
| *(5), (5.1)* | *BR166* | **Querying Rules:** When customer selects invoice and clicks view details, system queries complete invoice details with SQL: "SELECT b.\*, h.hall\_name, ht.type\_name, s.shift\_name, s.start\_time, s.end\_time FROM Booking b INNER JOIN Hall h ON b.hall\_id \= h.hall\_id INNER JOIN Hall\_Type ht ON h.type\_id \= ht.type\_id INNER JOIN Shift s ON b.shift\_id \= s.shift\_id WHERE b.booking\_id \= \[selected\_booking\_id\]". System queries menu items: "SELECT d.dish\_name, mi.quantity, d.price, (mi.quantity \* d.price) AS subtotal FROM Menu\_Item mi INNER JOIN Dish d ON mi.dish\_id \= d.dish\_id WHERE mi.booking\_id \= \[selected\_booking\_id\]". System queries services: "SELECT s.service\_name, sd.quantity, s.price, (sd.quantity \* s.price) AS subtotal FROM Service\_Detail sd INNER JOIN Service s ON sd.service\_id \= s.service\_id WHERE sd.booking\_id \= \[selected\_booking\_id\]". If any query fails: System calls displayErrorMessage("Cannot load invoice details. Please try again.") (Refer to MSG 135\) and use case ends at step (5.2). |
| *(6), (7)* | *BR167* | **Displaying Rules:** System displays invoice details dialog via displayCustomerInvoiceDialog() with sections: \[sectionBookingInfo\] showing booking\_id, wedding\_date, shift\_name with time, hall\_name with type, groom\_name, bride\_name, phone; \[sectionMenuItems\] with \[gridMenu\] showing dish\_name, quantity, price, subtotal; \[sectionServices\] with \[gridServices\] showing service\_name, quantity, price, subtotal; \[sectionPaymentSummary\] showing total\_table\_cost, total\_service\_cost, subtotal, deposit\_amount as "Paid", remaining\_amount as "Outstanding Debt" with red text if \> 0\. If remaining\_amount \> 0: Display \[btnPayNow\] button. Display \[btnExportPDF\] button. (Refer to "Customer Invoice Dialog" view in "View Description" file) |

##### 2.1.6.2 Pay My Invoice

###### *Use Case Description*

This use case allows customers to make payments toward their outstanding invoice balance through integrated payment gateway. The system validates payment amounts and updates the booking payment status.

###### *Actors*

- Customer

###### *Preconditions*

- User must be logged in as a customer with valid JWT access token  
- Invoice has outstanding balance (remaining\_amount \> 0\)  
- Payment gateway integration is available

###### *Postconditions*

- Payment is processed through payment gateway  
- Booking remaining amount is updated  
- Payment confirmation email is sent

(Refer to "Activity Pay My Invoice" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2), (3), (4)* | *BR168* | **Displaying Rules:** When customer views invoice with remaining\_amount \> 0, system displays \[btnPayNow\] button. When clicked, system displays payment form via displayPaymentForm() with components: \[cmbPaymentMethod\] dropdown (Credit Card, Debit Card, Bank Transfer, E-Wallet) populated from available gateway methods; \[txtBoxPaymentAmount\] pre-filled with remaining\_amount but editable to allow partial payment; \[lblMaxAmount\] showing "Maximum: \[remaining\_amount\] VND"; \[btnConfirmPayment\], \[btnCancel\] buttons. (Refer to "Payment Form" view in "View Description" file) |
| *(8), (8.1)* | *BR169* | **Validation Rules:** When customer clicks \[btnConfirmPayment\], system validates payment amount. System checks: If \[txtBoxPaymentAmount\].Value \<= 0: System calls displayErrorMessage("Payment amount must be greater than 0.") (Refer to MSG 136\) and returns to step (5). If \[txtBoxPaymentAmount\].Value \> remaining\_amount: System calls displayErrorMessage("Payment amount cannot exceed outstanding balance of \[remaining\_amount\] VND.") (Refer to MSG 137\) and returns to step (5). |
| *(9), (10), (11), (11.1)* | *BR170* | **Integration Rules:** System redirects customer to payment gateway via redirectToPaymentGateway(\[cmbPaymentMethod\].SelectedValue, \[txtBoxPaymentAmount\].Value, \[booking\_id\]) with transaction details. Customer completes payment on external gateway. System receives payment result callback via handlePaymentCallback(\[transaction\_id\], \[status\], \[amount\]). If payment status \= 'failed' OR status \= 'cancelled': System calls displayErrorMessage("Payment failed. Please try again or contact support.") (Refer to MSG 138\) and use case ends at step (11.2). |
| *(12), (12.1), (12.2)* | *BR171* | **Querying Rules:** When payment is successful, system begins transaction via beginTransaction(). System calculates new remaining amount: new\_remaining \= remaining\_amount \- \[payment\_amount\]. System executes SQL UPDATE: "UPDATE Booking SET remaining\_amount \= \[new\_remaining\], payment\_date \= NOW(), updated\_at \= NOW() WHERE booking\_id \= \[selected\_booking\_id\]". If new\_remaining \= 0: Add "status \= 'Completed'". System inserts payment history: "INSERT INTO Payment\_History (booking\_id, payment\_amount, payment\_method, transaction\_id, payment\_date, created\_by) VALUES (\[booking\_id\], \[payment\_amount\], \[payment\_method\], \[transaction\_id\], NOW(), \[current\_user\_id\])". If SQL execution fails: System rolls back transaction via rollbackTransaction(), calls displayErrorMessage("Error occurred during payment processing. Please contact support.") (Refer to MSG 69), and use case ends at step (12.3). |
| *(13), (14), (15), (16)* | *BR172* | **Querying Rules:** System commits transaction via commitTransaction(). System sends payment confirmation email via sendPaymentConfirmationEmail(\[customer\_email\], \[booking\_id\], \[payment\_amount\], \[new\_remaining\]) with receipt details. System displays success message "Payment successful\! Amount paid: \[payment\_amount\] VND. Remaining balance: \[new\_remaining\] VND." (Refer to MSG 70\) via displaySuccessMessage(). System refreshes invoice details via refreshInvoiceDetails(). (Refer to "Booking", "Payment\_History" tables in "DB Sheet" file) |

##### 2.1.6.3 Export My Invoice to PDF

###### *Use Case Description*

This use case allows customers to export their invoice details to a PDF file for printing or record-keeping purposes. The PDF includes complete booking and payment information.

###### *Actors*

- Customer

###### *Preconditions*

- User must be logged in as a customer with valid JWT access token  
- Customer is viewing invoice details

###### *Postconditions*

- PDF file containing invoice details is generated  
- PDF file is downloaded to customer's device

(Refer to "Activity Export My Invoice to PDF" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2), (3), (4)* | *BR173* | **Displaying Rules:** When customer views invoice details, system displays \[btnExportPDF\] button. When clicked, system queries complete invoice data same as BR166 plus additional details: System queries payment history: "SELECT payment\_amount, payment\_method, payment\_date FROM Payment\_History WHERE booking\_id \= \[selected\_booking\_id\] ORDER BY payment\_date DESC". (Refer to "Booking", "Menu\_Item", "Service\_Detail", "Payment\_History" tables in "DB Sheet" file) |
| *(5), (5.1), (5.2)* | *BR174* | **Integration Rules:** System generates PDF file via generateInvoicePDF() using PDF library (e.g., PDFKit, jsPDF, Apache PDFBox). PDF content includes: Header with company logo and "WEDDING INVOICE" title, Invoice details section (booking*id, issue\_date, wedding\_date), Customer information (groom\_name, bride\_name, phone), Venue details (hall\_name, hall\_type, shift with time), itemized Menu table (dish names, quantities, prices, subtotals), itemized Services table (service names, quantities, prices, subtotals), Payment summary box (Total Amount, Deposit Paid, Amount Paid to Date, Outstanding Balance), Payment history table if any payments made, Footer with terms and company contact. System creates filename "Invoice*\[booking\_id\]\_\[YYYYMMDD\].pdf". If PDF generation fails: System calls displayErrorMessage("Cannot create PDF file. Please try again or contact support.") (Refer to MSG 20\) and use case ends at step (5.2). |
| *(6), (6.1), (6.2)* | *BR175* | **Integration Rules:** System initiates file download via downloadFile(\[pdf\_file\], \[filename\]) setting HTTP headers: Content-Type \= "application/pdf", Content-Disposition \= "attachment; filename=\[filename\]". Browser downloads file to default downloads folder. If download fails due to browser restrictions or connection issues: System calls displayErrorMessage("Cannot download file. Please check your connection or browser settings.") (Refer to MSG 21\) and use case ends at step (6.2). |
| *(7), (8)* | *BR176* | **Displaying Rules:** System displays success message "Invoice PDF exported successfully." (Refer to MSG 49\) via displaySuccessMessage(). System provides option to view PDF in new browser tab via \[btnViewPDF\] link. |

#### 2.1.7 Staff Invoice Management

##### 2.1.7.1 View Any Invoice and Debt

###### *Use Case Description*

This use case allows staff and administrators to view invoice and debt information for any booking in the system. This provides staff with complete visibility into customer payment status.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to view invoices  
- Viewing from booking details (UC 2.1.5.2)

###### *Postconditions*

- Complete invoice details including debt information are displayed  
- Staff can access payment confirmation or export functions

(Refer to "Activity View Any Invoice & Debt" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(1), (2), (2.1)* | *BR177* | **Querying Rules:** When staff clicks \[btnViewInvoice\] from booking details, system queries complete invoice details with SQL: "SELECT b.\*, u.username, u.email AS customer\_email, h.hall\_name, ht.type\_name, ht.min\_table\_price, s.shift\_name, s.start\_time, s.end\_time FROM Booking b INNER JOIN User u ON b.user\_id \= u.user\_id INNER JOIN Hall h ON b.hall\_id \= h.hall\_id INNER JOIN Hall\_Type ht ON h.type\_id \= ht.type\_id INNER JOIN Shift s ON b.shift\_id \= s.shift\_id WHERE b.booking\_id \= \[selected\_booking\_id\]". System queries menu items: "SELECT d.dish\_name, mi.quantity, d.price, (mi.quantity \* d.price) AS subtotal FROM Menu\_Item mi INNER JOIN Dish d ON mi.dish\_id \= d.dish\_id WHERE mi.booking\_id \= \[selected\_booking\_id\]". System queries services: "SELECT s.service\_name, sd.quantity, s.price, (sd.quantity \* s.price) AS subtotal FROM Service\_Detail sd INNER JOIN Service s ON sd.service\_id \= s.service\_id WHERE sd.booking\_id \= \[selected\_booking\_id\]". System queries payment history: "SELECT payment\_amount, payment\_method, payment\_date, created\_by FROM Payment\_History WHERE booking\_id \= \[selected\_booking\_id\] ORDER BY payment\_date DESC". If any query fails: System calls displayErrorMessage("Cannot load invoice details. Please try again.") (Refer to MSG 135\) and use case ends at step (2.2). |
| *(3), (4)* | *BR178* | **Displaying Rules:** System displays staff invoice dialog via displayStaffInvoiceDialog() with comprehensive sections: \[sectionInvoiceHeader\] showing booking\_id, invoice\_date, status; \[sectionCustomerInfo\] showing username, email, phone; \[sectionBookingInfo\] showing wedding\_date, shift\_name with time, hall\_name with type, groom\_name, bride\_name, table\_count, reserve\_table\_count; \[sectionMenuItems\] with \[gridMenu\] showing dish\_name, quantity, price, subtotal with total; \[sectionServices\] with \[gridServices\] showing service\_name, quantity, price, subtotal with total; \[sectionPaymentSummary\] showing total\_table\_cost, total\_service\_cost, deposit\_amount, total\_invoice, remaining\_amount with status indicator, penalty\_amount if applicable; \[sectionPaymentHistory\] with \[gridPaymentHistory\] showing payment\_date, payment\_amount, payment\_method, processed\_by. If remaining\_amount \> 0: Display \[btnConfirmPayment\] button. Display \[btnExportPDF\] button. (Refer to "Staff Invoice Dialog" view in "View Description" file) |

##### 2.1.7.2 Confirm Payment and Calculate Penalty

###### *Use Case Description*

This use case allows staff to confirm customer payments and automatically calculate penalty fees for late payments based on system parameters. Staff can review payment details and finalize the transaction.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to confirm payments  
- Invoice has outstanding balance (remaining\_amount \> 0\)

###### *Postconditions*

- Payment is confirmed and recorded  
- Penalty is calculated and applied if applicable  
- Booking payment status is updated  
- Payment confirmation email is sent to customer

(Refer to "Activity Confirm Payment & Calculate Penalty" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2), (3), (4), (5), (6)* | *BR179* | **Loading Screen Rules:** When staff views invoice with remaining\_amount \> 0, system displays \[btnConfirmPayment\] button. When clicked, system retrieves payment information from customer's recent transaction. System queries system parameters: "SELECT param\_value FROM System\_Parameter WHERE param\_name \= 'penalty\_check\_enabled'". If penalty\_check\_enabled \= 1: System queries penalty rate: "SELECT param\_value FROM System\_Parameter WHERE param\_name \= 'late\_payment\_penalty\_rate'". System calculates payment deadline: deadline\_date \= wedding\_date \- 3 days. System checks if current\_date \> deadline\_date. If late AND penalty\_check\_enabled \= 1: System calculates penalty\_amount \= remaining\_amount \* (penalty\_rate / 100), Else: penalty\_amount \= 0\. (Refer to "System\_Parameter" table in "DB Sheet" file) |
| *(7), (8), (9), (10)* | *BR180* | **Displaying Rules:** System displays payment confirmation dialog via displayPaymentConfirmationDialog() with sections: \[sectionPaymentDetails\] showing payment\_amount equal to remaining\_amount, payment\_method from customer transaction or selectable by staff, payment\_date defaulting to current date; \[sectionPenaltyCalculation\] showing deadline\_date, days\_overdue if late, penalty\_rate, calculated penalty\_amount with red text if \> 0; \[sectionTotalProcessed\] showing "Total Amount to Process: \[remaining\_amount \+ penalty\_amount\] VND"; \[txtBoxStaffNotes\] for optional notes; \[btnConfirm\], \[btnCancel\] buttons. (Refer to "Payment Confirmation Dialog" view in "View Description" file) |
| *(11), (11.1), (11.2)* | *BR181* | **Querying Rules:** When staff clicks \[btnConfirm\], system begins transaction via beginTransaction(). System executes SQL UPDATE: "UPDATE Booking SET remaining\_amount \= 0, penalty\_amount \= \[penalty\_amount\], payment\_date \= NOW(), status \= 'Completed', updated\_at \= NOW() WHERE booking\_id \= \[selected\_booking\_id\]". System inserts payment history: "INSERT INTO Payment\_History (booking\_id, payment\_amount, payment\_method, penalty\_amount, staff\_notes, payment\_date, created\_by) VALUES (\[booking\_id\], \[remaining\_amount\], \[payment\_method\], \[penalty\_amount\], \[txtBoxStaffNotes\].Text, NOW(), \[current\_user\_id\])". If SQL execution fails: System rolls back transaction via rollbackTransaction(), calls displayErrorMessage("Error occurred during payment confirmation. Please try again.") (Refer to MSG 144), and use case ends at step (11.3). |
| *(12), (13), (14), (15)* | *BR182* | **Querying Rules:** System commits transaction via commitTransaction(). System logs payment action: "INSERT INTO Audit\_Log (user\_id, action\_type, table\_name, record\_id, action\_details, created\_at) VALUES (\[current\_user\_id\], 'CONFIRM\_PAYMENT', 'Booking', \[booking\_id\], 'Confirmed payment \[remaining\_amount\] VND \+ penalty \[penalty\_amount\] VND', NOW())". System sends payment confirmation email via sendPaymentConfirmationEmail(\[customer\_email\], \[booking\_id\], \[remaining\_amount\], \[penalty\_amount\]) with receipt and penalty explanation if applicable. System displays success message "Payment confirmation successful. Total processed: \[remaining\_amount \+ penalty\_amount\] VND." (Refer to MSG 50\) via displaySuccessMessage(). System refreshes invoice details via refreshInvoiceDetails(). (Refer to "Booking", "Payment\_History", "Audit\_Log" tables in "DB Sheet" file) |

##### 2.1.7.3 Export Any Invoice to PDF

###### *Use Case Description*

This use case allows staff and administrators to export complete invoice details to PDF format including payment history and staff signatures for official documentation purposes.

###### *Actors*

- Staff, Admin

###### *Preconditions*

- User must be logged in with valid JWT access token  
- User has permission to export invoices  
- Staff is viewing invoice details

###### *Postconditions*

- PDF file containing complete invoice details is generated  
- PDF file is downloaded to staff's device

(Refer to "Activity Export Any Invoice to PDF" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2), (3), (4)* | *BR183* | **Displaying Rules:** When staff views invoice details, system displays \[btnExportPDF\] button. When clicked, system queries complete invoice data same as BR177 including all booking details, menu items, services, and payment history. |
| *(5), (5.1), (5.2)* | *BR184* | **Integration Rules:** System generates official PDF file via generateOfficialInvoicePDF() using PDF library. PDF content includes professional invoice format: Header with company logo, name, address, tax ID, and "OFFICIAL WEDDING INVOICE" title; Invoice metadata (invoice*number \= booking\_id, issue\_date, due\_date); Customer information section (Full names, Contact details, Email); Booking details section (Wedding date and time, Venue with hall type, Shift schedule); Itemized charges table with Menu section (dish names, quantities, unit prices, subtotals), Services section (service names, quantities, unit prices, subtotals), Subtotal row; Payment information section (Total Amount, Deposit Paid, Payments Received with dates, Penalty Fees if applicable, Outstanding Balance); Payment history table with all transactions; Terms and conditions section; Staff signature section with processed\_by name and date; Footer with company contact and payment instructions. System creates filename "Official\_Invoice*\[booking\_id\]\_\[YYYYMMDD\_HHMMSS\].pdf". If PDF generation fails: System calls displayErrorMessage("Cannot create PDF file. Please try again.") (Refer to MSG 103\) and use case ends at step (5.2). |
| *(6), (6.1), (6.2)* | *BR185* | **Integration Rules:** System initiates file download via downloadFile(\[pdf\_file\], \[filename\]) with HTTP headers same as BR175. If download fails: System calls displayErrorMessage("Cannot download file. Please check your connection.") (Refer to MSG 104\) and use case ends at step (6.2). |
| *(7), (8)* | *BR186* | **Displaying Rules:** System displays success message "Official invoice PDF exported successfully." (Refer to MSG 105\) via displaySuccessMessage(). System logs export action: "INSERT INTO Audit\_Log (user\_id, action\_type, table\_name, record\_id, action\_details, created\_at) VALUES (\[current\_user\_id\], 'EXPORT\_INVOICE', 'Booking', \[booking\_id\], 'Exported official invoice PDF', NOW())". |

#### 2.1.8 Reporting

##### 2.1.8.1 View Revenue Chart

###### *Use Case Description*

This use case allows administrators to view revenue charts and statistics by month, including daily revenue breakdown, total monthly revenue, and contribution percentages of each day.

###### *Actors*

- Admin

###### *Preconditions*

- User must be logged in as administrator with valid JWT access token  
- User has permission to view revenue reports  
- System has revenue data available

###### *Postconditions*

- Revenue chart and statistics are displayed  
- Admin can analyze monthly revenue patterns

(Refer to "Activity View Revenue Chart" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(1), (2)* | *BR187* | **Displaying Rules:** When admin selects "Revenue Report" function, system displays month/year selection form via displayRevenueReportForm() with components: \[datePickerMonth\] defaulting to current month, \[datePickerYear\] defaulting to current year, \[cmbChartType\] dropdown (Column Chart, Line Chart, Pie Chart) defaulting to Column Chart, \[btnViewReport\] button. (Refer to "Revenue Report Selection Form" view in "View Description" file) |
| *(5), (5.1), (5.2)* | *BR188* | **Querying Rules:** When admin clicks \[btnViewReport\], system queries revenue summary: "SELECT month, year, total\_revenue FROM Revenue\_Report WHERE month \= \[datePickerMonth\].Value AND year \= \[datePickerYear\].Value". System queries daily details: "SELECT report\_date, event\_count, daily\_revenue, contribution\_percentage FROM Revenue\_Report\_Detail WHERE month \= \[datePickerMonth\].Value AND year \= \[datePickerYear\].Value ORDER BY report\_date". If no data found (COUNT \= 0): System calls displayNoResultsMessage("No report data for this month.") (Refer to MSG 106\) and use case ends at step (5.2). If database query fails: System calls displayErrorMessage("Cannot load report data. Please try again.") (Refer to MSG 51\) and use case ends at step (5.2). (Refer to "Revenue\_Report", "Revenue\_Report\_Detail" tables in "DB Sheet" file) |
| *(6), (7), (8), (9)* | *BR189* | **Displaying Rules:** System renders revenue chart using Chart.js library via renderRevenueChart(\[chart\_type\], \[daily\_data\]) showing X-axis \= dates, Y-axis \= revenue amounts. System displays \[gridDailyRevenue\] data grid with columns (Date, Event Count, Revenue formatted as \#,\#\#0 VND, Percentage formatted as 0.00%). System displays \[panelSummary\] section showing: "Total Monthly Revenue: \[total\_revenue\] VND", "Total Events: \[SUM(event\_count)\]", "Average Revenue per Day: \[total\_revenue / days\_with\_events\] VND", "Highest Revenue Day: \[date with MAX(daily\_revenue)\]", "Lowest Revenue Day: \[date with MIN(daily\_revenue)\]". System highlights highest and lowest revenue days with color coding (green for highest, red for lowest). (Refer to "Revenue Report View" in "View Description" file) |
| *(9)* | *BR190* | **Integration Rules:** System provides \[btnExportExcel\] button to export report data. Chart is interactive allowing hover to see exact values via tooltips. System auto-refreshes chart when admin changes chart type selection without requerying database. |

##### 2.1.8.2 Export Report to Excel

###### *Use Case Description*

This use case allows administrators to export monthly revenue reports to Excel format for storage, printing, or sharing purposes.

###### *Actors*

- Admin

###### *Preconditions*

- User must be logged in as administrator with valid JWT access token  
- User is viewing revenue chart (UC 2.1.8.1)  
- System has report data available

###### *Postconditions*

- Excel file containing revenue report is generated  
- Excel file is downloaded to admin's device

(Refer to "Activity Export Report to Excel" diagram in "Activity for wedding management system" folder)

###### *Business Rules*

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2), (3), (4), (4.1), (4.2)* | *BR191* | **Displaying Rules:** When admin views revenue chart, system displays \[btnExportExcel\] button. When clicked, system queries same data as BR188 to ensure consistency. If no data available (COUNT \= 0): System calls displayNoResultsMessage("No data to export.") (Refer to MSG 68\) and use case ends at step (4.2). |
| *(5), (5.1), (5.2)* | *BR192* | **Integration Rules:** System generates Excel file via generateRevenueExcel() using Excel library (e.g., ExcelJS, Apache POI, NPOI). Excel structure: Sheet 1 "Summary" with header section (Company Logo, Report Title "Revenue Report \- \[Month\]/\[Year\]", Generation Date), summary table (Month/Year, Total Revenue with format \#,\#\#0 VND, Total Events, Average Revenue/Day); Sheet 2 "Daily Details" with table columns (Date, Event Count, Revenue formatted as \#,\#\#0 VND, Percentage formatted as 0.00%) with color-coded rows (green for highest, red for lowest), totals row at bottom; Sheet 3 "Chart" with embedded column chart if library supports. Apply professional formatting: Bold headers with background color \#4472C4, borders on all cells, auto-fit column widths, freeze header rows. System creates filename "Revenue*Report*\[Month\]*\[Year\]*\[YYYYMMDD\].xlsx". If Excel generation fails due to library error or memory issues: System calls displayErrorMessage("Cannot create Excel file. Please try again.") (Refer to MSG 151\) and use case ends at step (5.2). |
| *(6), (6.1), (6.2)* | *BR193* | **Integration Rules:** System initiates file download via downloadFile(\[excel\_file\], \[filename\]) setting HTTP headers: Content-Type \= "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Content-Disposition \= "attachment; filename=\[filename\]". Browser downloads file to default downloads folder. If download fails due to browser restrictions, connection issues, or disk space: System calls displayErrorMessage("Cannot download file. Please check your connection and disk space.") (Refer to MSG 152\) and use case ends at step (6.2). |
| *(7), (8)* | *BR194* | **Displaying Rules:** System displays success message "Export Excel successful. File saved to Downloads folder." (Refer to MSG 153\) via displaySuccessMessage() with option to open file location. System logs export action: "INSERT INTO Audit\_Log (user\_id, action\_type, table\_name, action\_details, created\_at) VALUES (\[current\_user\_id\], 'EXPORT\_REPORT', 'Revenue\_Report', 'Exported revenue report for \[Month\]/\[Year\]', NOW())". |

### 2.2 List Description

The Wedding Management System uses 15 main database tables to store and manage all business data:

| STT | Table Name | Description |
| :---: | :---: | :---: |
| 1 | User | Stores user account information with encrypted passwords |
| 2 | Permission\_Group | Defines user role groups with permissions |
| 3 | Permission\_Function | Maps permissions between groups and functions |
| 4 | System\_Parameter | System configuration parameters (penalty, deposit rates) |
| 5 | Hall\_Type | Stores hall type information and minimum table pricing |
| 6 | Hall | Stores hall information for wedding events |
| 7 | Shift | Manages shift schedules (start time, end time) |
| 8 | Dish | Menu item catalog |
| 9 | Service | Service catalog |
| 10 | Booking | Stores wedding booking information |
| 11 | Menu\_Item | Menu items for each booking |
| 12 | Service\_Detail | Service details for each booking |
| 13 | Payment\_History | Payment transaction records |
| 14 | Refresh\_Token | JWT refresh token storage |
| 15 | Token\_Blacklist | Invalidated access tokens |

For detailed table schemas including field definitions, data types, and constraints, refer to "DB Sheet" documentation.

### 2.3 View Description

The Wedding Management System consists of main screens organized by functional modules:

**Authentication Screens:**

1. Login \- User authentication with JWT token generation  
2. Register Account \- Customer self-registration (Web only)  
3. Forgot Password \- Password reset via email  
4. Change Password \- User password update

**User Management Screens:** 5\. Manage Profile \- Personal information management 6\. User Management \- Admin user account management 7\. Permission Groups \- Role and permission configuration

**Master Data Screens:** 8\. Hall Type Management \- Input and manage hall types 9\. Hall Management \- Input and manage halls 10\. Shift Management \- Input and manage shifts 11\. Dish Management \- Input and manage menu items 12\. Service Management \- Input and manage services 13\. System Parameters \- Configure system regulations

**Booking & Operations Screens:** 14\. Check Hall Availability \- Query available halls by date/shift 15\. Submit Wedding Reservation \- Create new booking with menu/services 16\. My Bookings \- Customer booking list and details 17\. Manage All Bookings \- Staff booking management 18\. Booking Details \- View and edit booking information

**Payment & Invoice Screens:** 19\. Invoice & Debt \- View invoice and payment status 20\. Pay Invoice \- Process customer payments 21\. Confirm Payment \- Staff payment confirmation with penalty 22\. Export Invoice PDF \- Generate invoice documents

**Reporting Screens:** 23\. Revenue Report \- Monthly revenue visualization 24\. Export Report \- Generate Excel reports

For detailed screen designs including UI elements, validation rules, and event handling, refer to activity diagrams and view documentation.

## 3\. Non-functional Requirements

### 3.1 User Access and Security

| Function / Data | Customer | Staff | Administrator |
| :---- | :---- | :---: | :---- |
| **Manage Booking** |  |  |  |
| Create (Submit Wedding Reservation) | X(\*) |  |  |
| Read (View My Booking Details) | X(\*) | X(\*\*) | X |
| Update (Edit My Booking Request) | X(\*) | X(\*\*) | X |
| Delete (Cancel My Booking) | X(\*) | X(\*\*) | X |
| **Manage Hall** |  |  |  |
| Create, Update, Delete |  |  | X |
| Read | X | X | X |
| **Manage Hall Type** |  |  |  |
| Create, Update, Delete |  |  | X |
| Read | X | X | X |
| **Manage Shift** |  |  |  |
| Create, Update, Delete |  |  | X |
| Read | X | X | X |
| **Manage Dish** |  |  |  |
| Create, Update, Delete |  |  | X |
| Read | X | X | X |
| **Manage Service** |  |  |  |
| Create, Update, Delete |  |  | X |
| Read | X | X | X |
| **Manage System Parameters** |  |  |  |
| Create, Update, Delete |  |  | X |
| Read |  | X | X |
| **Manage User** |  |  |  |
| Create, Update, Delete |  |  | X |
| Read |  |  | X |
| **Manage Permission Group** |  |  |  |
| Create, Update, Delete |  |  | X |
| Read |  |  | X |
| **Manage Permissions** |  |  |  |
| Create, Update, Delete |  |  | X |
| Read |  |  | X |
| Check Hall Availability | X | X | X |
| Create Booking for Customer |  | X | X |
| View/Pay Invoice | X(\*) | X(\*\*) | X |
| Export Invoice to PDF | X(\*) | X(\*\*) | X |
| Confirm Payment and Calculate Penalty |  | X | X |
| Manage Profile | X(\*) | X(\*) | X(\*) |
| Change Password | X(\*) | X(\*) | X(\*) |

X: User has full permission to perform the action. X(\*): User has permission to perform action on their own items/profile only. X(\*\*): User has permission to perform action on items assigned to them only.

**Security Implementation:**

The system implements role-based access control (RBAC) through:

- **Permission\_Group** \- Defines user role groups (Admin, Staff, Customer)  
- **Permission\_Function** \- Maps permissions between groups and functions  
- **User** \- Stores user accounts with encrypted passwords (BCrypt hash \+ salt)

Access control is enforced at both presentation and business logic layers. Password encryption using BCrypt ensures secure storage. JWT tokens are used for authentication with refresh token rotation. Only administrators can assign permissions to prevent unauthorized privilege escalation.

### 3.2 Performance Requirements

**Number of Users:**

- Number of concurrent users: 20-50 users  
- Number of business users: 100-200 users (including customers)

**Data Volume:**

- Number of bookings: Estimated 500-1000 bookings per year  
- Data growth rate: \~100 bookings/month during peak season (wedding season)  
- Storage per booking: \~3-5 KB/booking  
- Storage per user: \~1-2 KB/user

**Response Time:**

- Login/Authentication: \< 1 second  
- Hall availability check: \< 0.5 second  
- Booking submission: \< 2 seconds  
- Booking search/filter: \< 1 second  
- Invoice generation: \< 1 second  
- Payment processing: \< 2 seconds  
- Report generation: \< 5 seconds  
- Parameter update: Instant

**Level of Availability:** 24×7 availability required. System must be accessible at all times for booking management, particularly during peak wedding season (October to March). Maximum planned downtime: 2 hours per month for maintenance.

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

**Location:** Vietnam \- Wedding venue management centers in major cities (Ho Chi Minh City, Hanoi, Da Nang)

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

## 4\. Other Requirements

### 4.1 Archive Function

Enable Archival Function for following data:

| Data Type | Actor | Condition |
| :---- | :---- | :---- |
| Booking | Administrator | Administrator can archive completed bookings older than 2 years by wedding date. |
| User Accounts | Administrator | Administrator can archive inactive user accounts with no login activity for 1 year. |
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
     
   - Log all changes to Permission\_Function table  
   - Log all changes to Permission\_Group assignments  
   - Record: User who made change, timestamp, old values, new values

   

2. **User Account Management**  
     
   - Log user creation, modification, deletion, and status changes  
   - Log password reset operations  
   - Record: Administrator who performed action, affected user, timestamp

   

3. **Critical Data Modifications**  
     
   - Log changes to System\_Parameter table  
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

1. **Hall\_Type** \- Hall Types (hall\_type\_id, name, minimum\_table\_price, description)  
2. **Hall** \- Halls (hall\_id, hall\_type\_id, name, max\_tables, notes)  
3. **Shift** \- Shifts (shift\_id, name, start\_time, end\_time)  
4. **Dish** \- Dishes (dish\_id, name, price, notes)  
5. **Service** \- Services (service\_id, name, price, notes)

**Transaction Tables:**

6. **Booking** \- Wedding Bookings (booking\_id, groom\_name, bride\_name, phone, booking\_date, wedding\_date, shift\_id, hall\_id, deposit\_amount, table\_count, reserved\_tables, payment\_date, total\_amount, remaining\_amount, penalty\_amount, damage\_cost, status)  
7. **Menu\_Item** \- Menu Items (booking\_id, dish\_id, quantity, unit\_price, serving\_order, notes)  
8. **Service\_Detail** \- Service Details (booking\_id, service\_id, quantity, unit\_price, total\_price, notes)  
9. **Payment\_History** \- Payment Records (payment\_id, booking\_id, payment\_date, amount, payment\_method, notes)

**Report Tables:**

10. **Revenue\_Report** \- Monthly Revenue Reports (month, year, total\_revenue)  
11. **Revenue\_Detail** \- Daily Revenue Details (date, month, year, booking\_count, revenue, percentage)

**System Configuration Tables:**

12. **System\_Parameter** \- System Parameters (enable\_penalty, penalty\_rate, minimum\_deposit\_rate, minimum\_reserved\_table\_rate)

**Security Tables:**

13. **Permission\_Function** \- System Functions (function\_id, function\_name, screen\_to\_load)  
14. **Permission\_Group** \- User Groups (group\_id, group\_name)  
15. **User** \- Users (user\_id, username, password\_hash, full\_name, email, phone, group\_id, status, created\_at, updated\_at)

Additional Security Tables:

16. **Refresh\_Token** \- JWT Refresh Tokens (token\_id, user\_id, token, expires\_at, created\_at)  
17. **Token\_Blacklist** \- Invalidated Tokens (token, blacklisted\_at, expires\_at)

For detailed table schemas with field definitions, data types, constraints and relationships, refer to "DB Sheet" documentation.

### 4.5 Custom Pages

The Wedding Management System implements the following custom pages with specialized functionality:

| \# | Page Name | Description |
| :---- | :---- | :---- |
| 1 | Home Dashboard | Custom dashboard with calendar view of upcoming weddings, recent bookings, and monthly revenue chart. Includes quick action button for new booking. |
| 2 | Wedding Booking Form | Multi-step form with dynamic validation for hall availability, menu selection with real-time pricing calculation, service selection, and deposit calculation. |
| 3 | Invoice Calculator | Custom page with complex business logic for calculating table pricing, service charges, late payment penalties (1% per day), equipment damage costs, and remaining balance. |
| 4 | Revenue Report Viewer | Interactive report page with date range filter, revenue breakdown by day, visual chart representation, and export to Excel functionality. |
| 5 | Hall Availability Checker | Real-time hall availability checker with calendar interface showing booked and available slots by hall and shift. |
| 6 | System Parameter Manager | Custom configuration page for managing business rules: penalty rates, deposit percentages, reserved table ratios, and minimum table requirements. |

All custom pages are built using modern web frameworks with responsive design and follow the system's design guidelines for consistency.

### 4.6 Scheduled Agents

The Wedding Management System implements the following scheduled background agents:

| No. | Name | Description | Schedule Rule | Agent Main Class |
| :---- | :---- | :---- | :---- | :---- |
| 1 | Daily Backup Agent | Performs automated database backup of all wedding bookings, invoices, and system data. Creates backup files with timestamp and stores in configured backup location. | Daily at 02:00 AM | BackupService.PerformDailyBackup() |
| 2 | Monthly Report Generator | Automatically generates monthly revenue reports by aggregating booking data, calculating revenue by day, and computing percentages. | 1st day of month at 01:00 AM | ReportService.GenerateMonthlyReport() |
| 3 | Payment Reminder Agent | Scans for overdue payments and sends reminder emails to customers. Calculates late payment penalties based on configured penalty rate (1% per day). | Daily at 08:00 AM | PaymentService.SendPaymentReminders() |
| 4 | Data Archive Agent | Archives old booking records (older than 2 years) and monthly reports (older than 3 years) to external storage. Maintains archive index for retrieval. | Monthly on last day at 03:00 AM | ArchiveService.ArchiveOldRecords() |
| 5 | Session Cleanup Agent | Removes expired JWT refresh tokens from Refresh\_Token table and cleans up blacklisted tokens from Token\_Blacklist table. | Every 6 hours | AuthService.CleanupExpiredSessions() |
| 6 | Hall Availability Cache Refresh | Refreshes cached hall availability data to ensure real-time accuracy for booking system. Updates availability matrix based on confirmed bookings. | Every 15 minutes during business hours (08:00-20:00) | CacheService.RefreshHallAvailability() |

All scheduled agents include error handling with logging and email notifications to administrators in case of failures.

### 4.7 Technical Concern

**Factors Affecting System Performance:**

1. **Seasonal Data Growth Pattern**  
     
   - Peak wedding season (October-March) causes 3-4x increase in booking volume  
   - System must handle surge in concurrent users during peak hours  
   - Database query optimization required for hall availability checks  
   - Risk Level: Medium \- Requires performance monitoring and optimization

   

2. **Complex Booking Validation Rules**  
     
   - Multiple business rules must be validated during booking submission:  
     - Hall availability by date and shift  
     - Minimum table quantity (≥80% of hall capacity)  
     - Minimum deposit amount (≥20% of estimated cost)  
     - Reserved table limit calculation  
   - Each validation requires database queries  
   - Risk Level: Medium \- May slow down booking submission process

   

3. **Invoice Calculation Complexity**  
     
   - Real-time calculation of:  
     - Table pricing (base price \+ menu items)  
     - Service charges  
     - Late payment penalties (1% per day)  
     - Equipment damage costs  
   - Multiple table joins required (Booking, Menu\_Item, Service\_Detail, Dish, Service)  
   - Risk Level: Low \- Single invoice calculation is fast, but batch processing may need optimization

   

4. **Report Generation Performance**  
     
   - Monthly revenue reports aggregate data from multiple bookings  
   - Requires calculation of revenue by date and percentages  
   - Risk Level: Low \- Monthly frequency allows acceptable 5-second processing time

   

5. **Database Connection Management**  
     
   - Web application requires connection pooling  
   - Network latency may affect response time  
   - Risk Level: Medium \- Implement connection pooling and retry logic

   

6. **User Concurrency**  
     
   - Multiple staff members may access same booking simultaneously  
   - Risk of data conflicts during updates  
   - Risk Level: Medium \- Implement optimistic concurrency control with row versioning

   

7. **Image Storage**  
     
   - Hall, dish, and service images stored in system  
   - Large image files may slow down loading  
   - Risk Level: Low \- Implement image caching, CDN, and optimization (WebP format, lazy loading)

   

8. **Data Archival**  
     
   - Past booking data accumulates over years  
   - May slow down queries if not properly indexed  
   - Risk Level: Low \- Implement data archiving strategy for old bookings

**Mitigation Strategies:**

- Implement database indexing on frequently queried fields (wedding\_date, hall\_id, shift\_id, status)  
- Use stored procedures or prepared statements for complex business logic calculations  
- Implement caching for reference data (Hall\_Type, Shift, Dish, Service) using Redis or in-memory cache  
- Use async/await patterns for database operations to prevent blocking  
- Implement connection pooling for database connections (pgBouncer for PostgreSQL)  
- Regular database maintenance: vacuum, analyze, and statistics updates  
- Monitor and optimize slow queries using database query analyzer  
- Implement pagination for large data lists (50 items per page)  
- Use CDN for static assets and image delivery  
- Implement rate limiting to prevent API abuse  
- Use database read replicas for reporting queries  
- Implement proper error handling and retry logic with exponential backoff

## 5\. Appendixes

### 5.1 Glossary

The list below contains all the necessary terms to interpret the document, including acronyms and abbreviations.

| Term | Description |
| :---- | :---- |
| *BR* | **B**usiness **R**ule |
| *CBR* | **C**ommon **B**usiness **R**ule |
| *DB* | **D**ata**b**ase |
| *MSG* | **M**es**s**a**g**e |
| *UC* | **U**se **C**ase |
| *WMS* | **W**edding **M**anagement **S**ystem |
| *JWT* | **J**SON **W**eb **T**oken |

### 5.2 Messages

This section describes the details of messages used in business rules e.g. error messages, confirmation messages, etc.

| Message Code | Message Content | Button |
| :---- | :---- | :---- |
| *MSG 1* | "Username and password are required." | OK |
| *MSG 2* | "Invalid username or password." | OK |
| *MSG 3* | "Invalid username or password or account is not active." | OK |
| *MSG 4* | "Welcome, \[User.username\]\!" | \- |
| *MSG 5* | "You have been logged out successfully." | \- |
| *MSG 6* | "All fields are required." | OK |
| *MSG 7* | "Invalid email format." | OK |
| *MSG 8* | "Phone must be 10 digits." | OK |
| *MSG 9* | "Email already exists in system." | OK |
| *MSG 10* | "Failed to update profile. Please try again." | OK |
| *MSG 11* | "Profile updated successfully." | \- |
| *MSG 12* | "Password must be at least 8 characters with uppercase, lowercase, digit and special character." | OK |
| *MSG 13* | "New password and confirm password do not match." | OK |
| *MSG 14* | "Current password is incorrect." | OK |
| *MSG 15* | "Failed to change password. Please try again." | OK |
| *MSG 16* | "Password changed successfully. Please login with your new password." | \- |
| *MSG 17* | "Username must be 4-50 alphanumeric characters." | OK |
| *MSG 18* | "Password and confirm password do not match." | OK |
| *MSG 19* | "You must agree to terms and conditions." | OK |
| *MSG 20* | "Username already exists." | OK |
| *MSG 21* | "Email already exists." | OK |
| *MSG 22* | "Registration failed. Please try again." | OK |
| *MSG 23* | "Registration successful\! Please login with your account." | \- |
| *MSG 24* | "Email is required." | OK |
| *MSG 25* | "If your email exists in our system, you will receive a password reset link." | \- |
| *MSG 26* | "Invalid or expired reset link." | OK |
| *MSG 27* | "Failed to reset password. Please try again." | OK |
| *MSG 28* | "All required fields must be filled." | OK |
| *MSG 29* | "CCCD must be 12 digits." | OK |
| *MSG 30* | "Failed to create user. Please try again." | OK |
| *MSG 31* | "User created successfully." | \- |
| *MSG 32* | "User not found." | OK |
| *MSG 33* | "Failed to update user. Please try again." | OK |
| *MSG 34* | "User updated successfully." | \- |
| *MSG 35* | "Cannot delete user. User has \[reference\_count\] associated bookings/invoices." | OK |
| *MSG 36* | "Failed to delete user. Please try again." | OK |
| *MSG 37* | "User deleted successfully." | \- |
| *MSG 38* | "Group code and group name are required." | OK |
| *MSG 39* | "Group code must be 3-20 uppercase alphanumeric characters with underscores." | OK |
| *MSG 40* | "Group name must be 3-100 characters." | OK |
| *MSG 41* | "Please select at least one function for this permission group." | OK |
| *MSG 42* | "Group code already exists." | OK |
| *MSG 43* | "Group name already exists." | OK |
| *MSG 44* | "Failed to create permission group. Please try again." | OK |
| *MSG 45* | "Permission group created successfully." | \- |
| *MSG 46* | "Group name is required." | OK |
| *MSG 47* | "Failed to update permission group. Please try again." | OK |
| *MSG 48* | "Permission group updated successfully." | \- |
| *MSG 49* | "Cannot delete permission group. \[COUNT\] user(s) are assigned to this group." | OK |
| *MSG 50* | "Failed to delete permission group. Please try again." | OK |
| *MSG 51* | "Permission group deleted successfully." | \- |
| *MSG 52* | "Penalty rate must be between 0% and 100%." | OK |
| *MSG 53* | "Minimum deposit rate must be greater than 0% and up to 100%." | OK |
| *MSG 54* | "Minimum table reservation rate must be greater than 0% and up to 100%." | OK |
| *MSG 55* | "Failed to update system parameters. Please try again." | OK |
| *MSG 56* | "System parameters updated successfully. Changes will take effect immediately." | \- |
| *MSG 57* | "Hall name, hall type, and max tables are required." | OK |
| *MSG 58* | "Hall name must be 3-100 characters." | OK |
| *MSG 59* | "Max tables must be a positive number." | OK |
| *MSG 60* | "Hall name already exists." | OK |
| *MSG 61* | "Failed to create hall. Please try again." | OK |
| *MSG 62* | "Hall created successfully." | \- |
| *MSG 63* | "Failed to update hall. Please try again." | OK |
| *MSG 64* | "Hall updated successfully." | \- |
| *MSG 65* | "Cannot delete hall. Hall has \[COUNT\] associated booking(s)." | OK |
| *MSG 66* | "Failed to delete hall. Please try again." | OK |
| *MSG 67* | "Hall deleted successfully." | \- |
| *MSG 68* | "No data to export." | OK |
| *MSG 69* | "Hall type name and minimum table price are required." | OK |
| *MSG 70* | "Hall type name must be 3-100 characters." | OK |
| *MSG 71* | "Minimum table price must be a positive number." | OK |
| *MSG 72* | "Hall type name already exists." | OK |
| *MSG 73* | "Failed to create hall type. Please try again." | OK |
| *MSG 74* | "Hall type created successfully." | \- |
| *MSG 75* | "Failed to update hall type. Please try again." | OK |
| *MSG 76* | "Hall type updated successfully." | \- |
| *MSG 77* | "Cannot delete hall type. \[COUNT\] hall(s) are using this type." | OK |
| *MSG 78* | "Failed to delete hall type. Please try again." | OK |
| *MSG 79* | "Hall type deleted successfully." | \- |
| *MSG 80* | "Dish name and price are required." | OK |
| *MSG 81* | "Dish name must be 3-100 characters." | OK |
| *MSG 82* | "Price must be a positive number." | OK |
| *MSG 83* | "Dish name already exists." | OK |
| *MSG 84* | "Failed to create dish. Please try again." | OK |
| *MSG 85* | "Dish created successfully." | \- |
| *MSG 86* | "Failed to update dish. Please try again." | OK |
| *MSG 87* | "Dish updated successfully." | \- |
| *MSG 88* | "Cannot delete dish. This dish is used in \[COUNT\] menu item(s)." | OK |
| *MSG 89* | "Failed to delete dish. Please try again." | OK |
| *MSG 90* | "Dish deleted successfully." | \- |
| *MSG 91* | "Service name and price are required." | OK |
| *MSG 92* | "Service name must be 3-100 characters." | OK |
| *MSG 93* | "Price must be a positive number." | OK |
| *MSG 94* | "Service name already exists." | OK |
| *MSG 95* | "Failed to create service. Please try again." | OK |
| *MSG 96* | "Service created successfully." | \- |
| *MSG 97* | "Failed to update service. Please try again." | OK |
| *MSG 98* | "Service updated successfully." | \- |
| *MSG 99* | "Cannot delete service. This service is used in \[COUNT\] booking(s)." | OK |
| *MSG 100* | "Failed to delete service. Please try again." | OK |
| *MSG 101* | "Service deleted successfully." | \- |
| *MSG 102* | "Shift name, start time, and end time are required." | OK |
| *MSG 103* | "Shift name must be 3-100 characters." | OK |
| *MSG 104* | "Start time must be before end time." | OK |
| *MSG 105* | "Shift name already exists." | OK |
| *MSG 106* | "Failed to create shift. Please try again." | OK |
| *MSG 107* | "Shift created successfully." | \- |
| *MSG 108* | "Failed to update shift. Please try again." | OK |
| *MSG 109* | "Shift updated successfully." | \- |
| *MSG 110* | "Cannot delete shift. This shift is used in \[COUNT\] booking(s)." | OK |
| *MSG 111* | "Failed to delete shift. Please try again." | OK |
| *MSG 112* | "Shift deleted successfully." | \- |
| *MSG 113* | "Date must be in future." | OK |
| *MSG 114* | "No available halls found. Try other dates or shifts." | \- |
| *MSG 115* | "Wedding date must be in future." | OK |
| *MSG 116* | "Number of tables exceeds hall capacity of \[max\_tables\] tables." | OK |
| *MSG 117* | "Hall is no longer available for selected date and shift." | OK |
| *MSG 118* | "Booking submitted successfully. Booking ID: \[booking\_id\]. Please check your email for confirmation." | \- |
| *MSG 119* | "No bookings found. Create your first wedding booking\!" | \- |
| *MSG 120* | "Cannot load booking details. Please try again." | OK |
| *MSG 121* | "Cannot edit this booking. Only pending bookings can be edited." | OK |
| *MSG 122* | "Booking updated successfully." | \- |
| *MSG 123* | "Cannot cancel this booking. Booking is already \[status\] or date has passed." | OK |
| *MSG 124* | "Booking cancelled successfully. Deposit \[deposit\_amount\] VND is non-refundable as per policy." | \- |
| *MSG 125* | "No bookings found. Try adjusting search criteria." | \- |
| *MSG 126* | "Booking does not exist." | OK |
| *MSG 127* | "No halls in system." | OK |
| *MSG 128* | "Number of tables exceeds hall capacity." | OK |
| *MSG 129* | "Hall is already booked for selected date and shift." | OK |
| *MSG 130* | "Booking created successfully. Booking ID: \[booking\_id\]." | \- |
| *MSG 131* | "Cannot edit completed or cancelled bookings." | OK |
| *MSG 132* | "Cannot delete booking. Database error occurred." | OK |
| *MSG 133* | "Booking deleted successfully." | \- |
| *MSG 134* | "You don't have any invoices yet." | \- |
| *MSG 135* | "Cannot load invoice details. Please try again." | OK |
| *MSG 136* | "Payment amount must be greater than 0." | OK |
| *MSG 137* | "Payment amount cannot exceed outstanding balance of \[remaining\_amount\] VND." | OK |
| *MSG 138* | "Payment failed. Please try again or contact support." | OK |
| *MSG 139* | "Error occurred during payment processing. Please contact support." | OK |
| *MSG 140* | "Payment successful\! Amount paid: \[payment\_amount\] VND. Remaining balance: \[new\_remaining\] VND." | \- |
| *MSG 141* | "Cannot create PDF file. Please try again or contact support." | OK |
| *MSG 142* | "Cannot download file. Please check your connection or browser settings." | OK |
| *MSG 143* | "Invoice PDF exported successfully." | \- |
| *MSG 144* | "Error occurred during payment confirmation. Please try again." | OK |
| *MSG 145* | "Payment confirmation successful. Total processed: \[remaining\_amount \+ penalty\_amount\] VND." | \- |
| *MSG 146* | "Cannot create PDF file. Please try again." | OK |
| *MSG 147* | "Cannot download file. Please check your connection." | OK |
| *MSG 148* | "Official invoice PDF exported successfully." | \- |
| *MSG 149* | "No report data for this month." | \- |
| *MSG 150* | "Cannot load report data. Please try again." | OK |
| *MSG 151* | "Cannot create Excel file. Please try again." | OK |
| *MSG 152* | "Cannot download file. Please check your connection and disk space." | OK |
| *MSG 153* | "Export Excel successful. File saved to Downloads folder." | \- |

### 5.3 Issues List

N/A  
