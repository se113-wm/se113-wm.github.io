# Attraction Table

## Description

This table stores information about tourist attractions (points of interest) that can be included in tour routes.

## Table Structure

| No. | Attribute Name | Data Type                           | Constraint                 | Meaning or Note                               |
| --- | -------------- | ----------------------------------- | -------------------------- | --------------------------------------------- |
| 1   | id             | INT                                 | PRIMARY KEY                | Unique identifier for each attraction         |
| 2   | name           | VARCHAR(200)                        | NOT NULL                   | Attraction name                               |
| 3   | description    | TEXT                                |                            | Detailed description of the attraction        |
| 4   | location       | VARCHAR(255)                        |                            | Geographic location/address of the attraction |
| 5   | category_id    | INT                                 | FOREIGN KEY                | Reference to Category table                   |
| 6   | status         | ENUM('ACTIVE','INACTIVE','DELETED') | NOT NULL, DEFAULT 'ACTIVE' | Attraction status for management              |

## Relationships

- **Many-to-One**: Attraction → Category (Each attraction belongs to one category)
- **Many-to-Many**: Attraction ↔ Route (through Route_Attraction table)

## Foreign Keys

- `category_id` REFERENCES `Category(id)`

## Notes

- ACTIVE: Attraction can be added to routes
- INACTIVE: Attraction is temporarily unavailable
- DELETED: Soft delete, not displayed but historical data preserved
- Attractions can be reused across multiple routes
