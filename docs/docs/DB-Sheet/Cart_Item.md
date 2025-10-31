# Cart_Item Table

## Description

This table stores individual items in a user's shopping cart, representing trips that the user intends to book.

## Table Structure

| No. | Attribute Name | Data Type     | Constraint            | Meaning or Note                                |
| --- | -------------- | ------------- | --------------------- | ---------------------------------------------- |
| 1   | id             | INT           | PRIMARY KEY           | Unique identifier for each cart item           |
| 2   | cart_id        | INT           | FOREIGN KEY, NOT NULL | Reference to Cart table                        |
| 3   | trip_id        | INT           | FOREIGN KEY, NOT NULL | Reference to Trip table                        |
| 4   | quantity       | INT           | NOT NULL, CHECK > 0   | Number of seats to book for this trip          |
| 5   | price          | DECIMAL(10,2) | NOT NULL              | Price per person at the time of adding to cart |

## Relationships

- **Many-to-One**: Cart_Item → Cart (Multiple items can be in one cart)
- **Many-to-One**: Cart_Item → Trip (Multiple cart items can reference the same trip)

## Foreign Keys

- `cart_id` REFERENCES `Cart(id)` ON DELETE CASCADE
- `trip_id` REFERENCES `Trip(id)` ON DELETE CASCADE

## Constraints

- UNIQUE(cart_id, trip_id) - A trip can only appear once per cart
- quantity must be <= (Trip.total_seats - Trip.booked_seats)

## Notes

- Price is captured at the time of adding to cart to preserve the price
- Quantity represents the number of people/seats for the trip
- Items are removed from cart after successful booking
- Need to validate seat availability before checkout
- Total item cost = quantity × price
