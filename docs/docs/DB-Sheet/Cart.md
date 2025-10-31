# Cart Table

## Description

This table stores shopping cart information for each user to temporarily hold trips before booking.

## Table Structure

| No. | Attribute Name | Data Type | Constraint                    | Meaning or Note                            |
| --- | -------------- | --------- | ----------------------------- | ------------------------------------------ |
| 1   | id             | INT       | PRIMARY KEY                   | Unique identifier for each cart            |
| 2   | user_id        | INT       | FOREIGN KEY, NOT NULL, UNIQUE | Reference to User table, one cart per user |

## Relationships

- **One-to-One**: Cart → User (Each user has exactly one cart)
- **One-to-Many**: Cart → Cart_Item (A cart can contain multiple items)

## Foreign Keys

- `user_id` REFERENCES `User(id)` ON DELETE CASCADE

## Constraints

- UNIQUE(user_id) - Each user can have only one cart

## Notes

- Cart is automatically created when a user registers
- Cart persists even when empty
- Items in cart are not reserved until booking is confirmed
- Cart is specific to each user and cannot be shared
