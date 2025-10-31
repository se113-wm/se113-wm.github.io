# Route Table

## Description

This table stores information about tour routes (travel itineraries) offered by the tourism company.

## Table Structure

| No. | Attribute Name | Data Type                       | Constraint               | Meaning or Note                  |
| --- | -------------- | ------------------------------- | ------------------------ | -------------------------------- |
| 1   | id             | INT                             | PRIMARY KEY              | Unique identifier for each route |
| 2   | name           | VARCHAR(255)                    | NOT NULL                 | Route name/title                 |
| 3   | start_location | VARCHAR(200)                    | NOT NULL                 | Starting point of the tour       |
| 4   | end_location   | VARCHAR(200)                    | NOT NULL                 | Ending point of the tour         |
| 5   | duration_days  | INT                             | NOT NULL, CHECK > 0      | Duration of the tour in days     |
| 6   | image          | VARCHAR(500)                    |                          | URL or path to route image       |
| 7   | status         | ENUM('OPEN','ONGOING','CLOSED') | NOT NULL, DEFAULT 'OPEN' | Route operational status         |

## Relationships

- **One-to-Many**: Route → Trip (A route can have multiple trips with different departure dates)
- **Many-to-Many**: Route ↔ Attraction (through Route_Attraction table)
- **Many-to-Many**: Route ↔ User (through Favorite_Tour table for customer favorites)

## Notes

- OPEN: Route is available for booking
- ONGOING: Route has active trips in progress
- CLOSED: Route is no longer offered
- duration_days must be greater than 0
- Cannot close route if there are active trips (SCHEDULED/ONGOING status)
