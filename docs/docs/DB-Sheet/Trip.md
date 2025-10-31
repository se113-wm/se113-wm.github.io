# Trip Table

## Description

This table stores information about specific trip instances for each route, including departure dates, pricing, and seat availability.

## Table Structure

| No. | Attribute Name   | Data Type                                         | Constraint                      | Meaning or Note                     |
| --- | ---------------- | ------------------------------------------------- | ------------------------------- | ----------------------------------- |
| 1   | id               | INT                                               | PRIMARY KEY                     | Unique identifier for each trip     |
| 2   | route_id         | INT                                               | FOREIGN KEY, NOT NULL           | Reference to Route table            |
| 3   | departure_date   | DATE                                              | NOT NULL                        | Trip departure date                 |
| 4   | return_date      | DATE                                              | NOT NULL                        | Trip return date                    |
| 5   | price            | DECIMAL(10,2)                                     | NOT NULL, CHECK > 0             | Tour price per person               |
| 6   | total_seats      | INT                                               | NOT NULL, CHECK > 0             | Total available seats for this trip |
| 7   | booked_seats     | INT                                               | NOT NULL, DEFAULT 0, CHECK >= 0 | Number of seats already booked      |
| 8   | pick_up_time     | TIME                                              |                                 | Time to pick up customers           |
| 9   | pick_up_location | VARCHAR(255)                                      |                                 | Location to pick up customers       |
| 10  | status           | ENUM('SCHEDULED','ONGOING','FINISHED','CANCELED') | NOT NULL, DEFAULT 'SCHEDULED'   | Trip status                         |

## Relationships

- **Many-to-One**: Trip → Route (Multiple trips can be created for the same route)
- **One-to-Many**: Trip → Cart_Item (A trip can be in multiple shopping carts)
- **One-to-Many**: Trip → Tour_Booking (A trip can have multiple bookings)

## Foreign Keys

- `route_id` REFERENCES `Route(id)`

## Constraints

- booked_seats <= total_seats
- return_date >= departure_date
- return_date = departure_date + Route.duration_days - 1
- departure_date must be >= CURRENT_DATE + 7 days (for new trips)

## Notes

- SCHEDULED: Trip is open for booking
- ONGOING: Trip is currently in progress (departure_date <= today <= return_date)
- FINISHED: Trip has been completed (return_date < today)
- CANCELED: Trip has been canceled
- Available seats = total_seats - booked_seats
- Cannot modify trip if there are existing bookings (except increasing price/seats)
