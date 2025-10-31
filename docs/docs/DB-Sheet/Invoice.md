# Invoice Table

## Description

This table stores invoice and payment information for each booking, tracking payment status and payment methods.

## Table Structure

| No. | Attribute Name | Data Type                        | Constraint                    | Meaning or Note                                                    |
| --- | -------------- | -------------------------------- | ----------------------------- | ------------------------------------------------------------------ |
| 1   | id             | INT                              | PRIMARY KEY                   | Unique identifier for each invoice                                 |
| 2   | booking_id     | INT                              | FOREIGN KEY, NOT NULL, UNIQUE | Reference to Tour_Booking table (one-to-one relationship)          |
| 3   | total_amount   | DECIMAL(10,2)                    | NOT NULL, CHECK > 0           | Total invoice amount                                               |
| 4   | payment_status | ENUM('UNPAID','PAID','REFUNDED') | NOT NULL, DEFAULT 'UNPAID'    | Payment status                                                     |
| 5   | payment_method | VARCHAR(50)                      |                               | Payment method used (e.g., "Credit Card", "Bank Transfer", "Cash") |

## Relationships

- **One-to-One**: Invoice → Tour_Booking (Each booking generates one invoice)

## Foreign Keys

- `booking_id` REFERENCES `Tour_Booking(id)` ON DELETE CASCADE

## Constraints

- UNIQUE(booking_id) - One booking can have only one invoice
- total_amount should equal Tour_Booking.total_price

## Payment Status Flow

1. **UNPAID**: Invoice created, no payment received
2. **PAID**: Full or partial payment received (minimum 30% required)
3. **REFUNDED**: Payment refunded due to cancellation

## Payment Rules

- Minimum 30% payment required for booking confirmation
- Full payment required 7 days before departure
- Unpaid bookings auto-canceled if payment deadline exceeded

## Refund Policy (by cancellation timing)

- 15+ days before departure: 80% refund
- 7-14 days before: 50% refund
- 3-6 days before: 20% refund
- Less than 3 days: No refund

## Notes

- Invoice auto-generated when booking is created
- payment_method is NULL until first payment received
- Company cancellations result in 100% refund
- Refund amount calculated based on days until departure
