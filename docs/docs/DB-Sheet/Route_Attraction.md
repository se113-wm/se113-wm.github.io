# Route_Attraction Table

## Description

This is a junction table that defines the relationship between routes and attractions, including the day and order of visit for each attraction in a route's itinerary.

## Table Structure

| No. | Attribute Name       | Data Type | Constraint            | Meaning or Note                                          |
| --- | -------------------- | --------- | --------------------- | -------------------------------------------------------- |
| 1   | id                   | INT       | PRIMARY KEY           | Unique identifier for each route-attraction relationship |
| 2   | route_id             | INT       | FOREIGN KEY, NOT NULL | Reference to Route table                                 |
| 3   | attraction_id        | INT       | FOREIGN KEY, NOT NULL | Reference to Attraction table                            |
| 4   | day                  | INT       | NOT NULL, CHECK > 0   | Day number in the itinerary (1 to duration_days)         |
| 5   | order_in_day         | INT       | NOT NULL, CHECK > 0   | Order of visit within the day (1, 2, 3, ...)             |
| 6   | activity_description | TEXT      |                       | Description of activities at this attraction             |

## Relationships

- **Many-to-One**: Route_Attraction → Route
- **Many-to-One**: Route_Attraction → Attraction

## Foreign Keys

- `route_id` REFERENCES `Route(id)` ON DELETE CASCADE
- `attraction_id` REFERENCES `Attraction(id)`

## Constraints

- UNIQUE(route_id, attraction_id, day, order_in_day)
- day must be <= Route.duration_days
- day and order_in_day must be > 0

## Notes

- Defines the complete itinerary for a tour route
- Multiple attractions can be visited on the same day
- order_in_day determines the sequence of visits within a day
- activity_description provides specific details about what tourists will do at each attraction
