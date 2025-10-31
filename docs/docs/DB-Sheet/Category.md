# Category Table

## Description

This table stores tourism categories used to classify attractions and routes (e.g., beach tourism, mountain tourism, cultural tourism, eco-tourism).

## Table Structure

| No. | Attribute Name | Data Type                           | Constraint                 | Meaning or Note                                           |
| --- | -------------- | ----------------------------------- | -------------------------- | --------------------------------------------------------- |
| 1   | id             | INT                                 | PRIMARY KEY                | Unique identifier for each category                       |
| 2   | name           | VARCHAR(100)                        | NOT NULL                   | Category name (e.g., "Beach Tourism", "Mountain Tourism") |
| 3   | status         | ENUM('ACTIVE','INACTIVE','DELETED') | NOT NULL, DEFAULT 'ACTIVE' | Category status for display and usage control             |

## Relationships

- **One-to-Many**: Category → Attraction (A category can have multiple attractions)

## Notes

- Categories are used to organize and filter attractions
- ACTIVE: Category is visible and usable
- INACTIVE: Category is hidden but data is preserved
- DELETED: Soft delete, category is not displayed but historical data remains
