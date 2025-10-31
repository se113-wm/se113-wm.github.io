# Tour_Booking Table

## Description

This table stores booking information when customers reserve trips, including booking status and payment details.

## Table Structure

| No. | Attribute Name | Data Type                                          | Constraint                  | Meaning or Note                                     |
| --- | -------------- | -------------------------------------------------- | --------------------------- | --------------------------------------------------- |
| 1   | id             | INT                                                | PRIMARY KEY                 | Unique identifier for each booking                  |
| 2   | trip_id        | INT                                                | FOREIGN KEY, NOT NULL       | Reference to Trip table                             |
| 3   | user_id        | INT                                                | FOREIGN KEY, NOT NULL       | Reference to User table (customer who booked)       |
| 4   | seats_booked   | INT                                                | NOT NULL, CHECK > 0         | Number of seats reserved in this booking            |
| 5   | total_price    | DECIMAL(10,2)                                      | NOT NULL, CHECK > 0         | Total price for this booking (seats_booked × price) |
| 6   | status         | ENUM('PENDING','CONFIRMED','CANCELED','COMPLETED') | NOT NULL, DEFAULT 'PENDING' | Booking status                                      |

## Relationships

- **Many-to-One**: Tour_Booking → Trip (Multiple bookings can be made for the same trip)
- **Many-to-One**: Tour_Booking → User (A user can make multiple bookings)
- **One-to-One**: Tour_Booking → Tour_Booking_Detail (Each booking has detailed information)
- **One-to-Many**: Tour_Booking → Booking_Traveler (A booking includes multiple travelers)
- **One-to-One**: Tour_Booking → Invoice (Each booking generates one invoice)

## Foreign Keys

- `trip_id` REFERENCES `Trip(id)`
- `user_id` REFERENCES `User(id)`

## Constraints

- seats_booked must be <= available seats at booking time
- total_price = seats_booked × Trip.price

## Status Flow

1. **PENDING**: Booking created, awaiting payment
2. **CONFIRMED**: Payment received (at least 30%), booking confirmed
3. **CANCELED**: Booking canceled by customer or system
4. **COMPLETED**: Trip finished successfully

## Notes

- Upon booking creation, Trip.booked_seats is incremented
- Minimum 30% payment required to move from PENDING to CONFIRMED
- Full payment required 7 days before departure
- If canceled, Trip.booked_seats is decremented
- Cannot modify booking details after CONFIRMED status (except traveler info)
