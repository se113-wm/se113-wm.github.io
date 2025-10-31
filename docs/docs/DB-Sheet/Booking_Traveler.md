# Booking_Traveler Table

## Description

This table stores personal information for each individual traveler in a booking (required for legal and logistics purposes).

## Table Structure

| No. | Attribute Name | Data Type         | Constraint            | Meaning or Note                                    |
| --- | -------------- | ----------------- | --------------------- | -------------------------------------------------- |
| 1   | id             | INT               | PRIMARY KEY           | Unique identifier for each traveler                |
| 2   | booking_id     | INT               | FOREIGN KEY, NOT NULL | Reference to Tour_Booking table                    |
| 3   | full_name      | VARCHAR(200)      | NOT NULL              | Traveler's full legal name                         |
| 4   | gender         | ENUM('M','F','O') |                       | Traveler's gender (M=Male, F=Female, O=Other)      |
| 5   | date_of_birth  | DATE              |                       | Traveler's date of birth                           |
| 6   | identity_doc   | VARCHAR(50)       |                       | Identity document number (passport, ID card, etc.) |

## Relationships

- **Many-to-One**: Booking_Traveler → Tour_Booking (A booking can have multiple travelers)

## Foreign Keys

- `booking_id` REFERENCES `Tour_Booking(id)` ON DELETE CASCADE

## Constraints

- Number of travelers for a booking should equal Tour_Booking.seats_booked
- full_name is required (NOT NULL)

## Notes

- Each person on the trip must have a traveler record
- Required for insurance, legal compliance, and emergency contact
- Can be edited up to 3 days before trip departure
- Identity document must be valid and match the traveler's name
- Date of birth used to determine adult/child classification
- Gender field optional but helpful for room arrangements
