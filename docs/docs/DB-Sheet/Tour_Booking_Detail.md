# Tour_Booking_Detail Table

## Description

This table stores detailed information about the composition of travelers in a booking (number of adults and children).

## Table Structure

| No. | Attribute Name | Data Type | Constraint                    | Meaning or Note                                           |
| --- | -------------- | --------- | ----------------------------- | --------------------------------------------------------- |
| 1   | id             | INT       | PRIMARY KEY                   | Unique identifier for booking detail                      |
| 2   | booking_id     | INT       | FOREIGN KEY, NOT NULL, UNIQUE | Reference to Tour_Booking table (one-to-one relationship) |
| 3   | no_adults      | INT       | NOT NULL, CHECK >= 0          | Number of adult travelers                                 |
| 4   | no_children    | INT       | NOT NULL, CHECK >= 0          | Number of child travelers                                 |

## Relationships

- **One-to-One**: Tour_Booking_Detail → Tour_Booking (Each booking has one detail record)

## Foreign Keys

- `booking_id` REFERENCES `Tour_Booking(id)` ON DELETE CASCADE

## Constraints

- UNIQUE(booking_id) - One booking can have only one detail record
- no_adults + no_children = Tour_Booking.seats_booked
- At least one of no_adults or no_children must be > 0

## Notes

- Adults and children may have different pricing (can be implemented in future)
- Provides breakdown of booking composition for reporting
- Both values must sum to total seats booked
- Used for statistical analysis and capacity planning
