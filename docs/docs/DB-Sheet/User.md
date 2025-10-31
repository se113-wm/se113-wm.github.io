# User Table

## Description

This table stores information about all users in the Tourist Management System, including customers, staff, and administrators.

## Table Structure

| No. | Attribute Name | Data Type                        | Constraint       | Meaning or Note                                         |
| --- | -------------- | -------------------------------- | ---------------- | ------------------------------------------------------- |
| 1   | id             | INT                              | PRIMARY KEY      | Unique identifier for each user                         |
| 2   | username       | VARCHAR(50)                      | NOT NULL, UNIQUE | User's login username, must be unique across the system |
| 3   | password       | VARCHAR(255)                     | NOT NULL         | User's hashed password (bcrypt/argon2)                  |
| 4   | is_lock        | BOOLEAN                          | DEFAULT FALSE    | Account lock status (true = locked, false = active)     |
| 5   | full_name      | VARCHAR(200)                     | NOT NULL         | User's full name                                        |
| 6   | email          | VARCHAR(100)                     | NOT NULL, UNIQUE | User's email address, must be unique                    |
| 7   | phone_number   | VARCHAR(20)                      |                  | User's contact phone number                             |
| 8   | address        | TEXT                             |                  | User's residential address                              |
| 9   | birthday       | DATE                             |                  | User's date of birth                                    |
| 10  | gender         | ENUM('M','F','O')                |                  | User's gender (M=Male, F=Female, O=Other)               |
| 11  | role           | ENUM('CUSTOMER','STAFF','ADMIN') | NOT NULL         | User's role in the system                               |

## Relationships

- **One-to-One**: User → Cart (Each user has one shopping cart)
- **One-to-Many**: User → Tour_Booking (A user can have multiple bookings)
- **Many-to-Many**: User ↔ Route (through Favorite_Tour table)

## Notes

- Password must be hashed before storing
- Username and email must be unique across all roles
- Staff and Admin users are created by administrators
- Customer users can self-register
- When is_lock = true, the user cannot log in to the system
