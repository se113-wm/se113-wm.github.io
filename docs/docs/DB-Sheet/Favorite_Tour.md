# Favorite_Tour Table

## Description

This is a junction table that stores which routes users have marked as favorites for quick access later.

## Table Structure

| No. | Attribute Name | Data Type | Constraint               | Meaning or Note          |
| --- | -------------- | --------- | ------------------------ | ------------------------ |
| 1   | user_id        | INT       | PRIMARY KEY, FOREIGN KEY | Reference to User table  |
| 2   | route_id       | INT       | PRIMARY KEY, FOREIGN KEY | Reference to Route table |

## Relationships

- **Many-to-Many**: User ↔ Route (Users can favorite multiple routes, routes can be favorited by multiple users)

## Foreign Keys

- `user_id` REFERENCES `User(id)` ON DELETE CASCADE
- `route_id` REFERENCES `Route(id)` ON DELETE CASCADE

## Constraints

- PRIMARY KEY(user_id, route_id) - Composite primary key ensures unique user-route pairs

## Notes

- Allows customers to save routes they are interested in
- Toggle functionality: if exists, delete (unfavorite); if not exists, insert (favorite)
- Only customers can favorite routes
- Favorite status is independent of booking status
- Can extend with created_date timestamp to track when favorited
