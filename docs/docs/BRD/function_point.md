# Function Point Analysis

## Function Point Counting Table

| No. | Main Function             | Sub Function                           | Deployment Environment | MEASUREMENT LIST |          |          |          |          |          |          |          |         |         |
| --- | ------------------------- | -------------------------------------- | ---------------------- | ---------------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | ------- | ------- |
|     |                           |                                        | Web                    | C1               | W1       | C2       | W2       | C3       | W3       | C4       | W4       | C5      | W5      |
|     |                           |                                        |                        | **EI-L**         | **EI-A** | **EI-H** | **EO-L** | **EO-A** | **EO-H** | **EQ-L** | **EQ-A** | **ILF** | **EIF** |
| 1   | Authentication            | Sign in                                | x                      |                  | 1        |          |          |          |          |          | 1        |         |         |
| 2   |                           | Sign up                                | x                      |                  | 1        |          |          |          |          |          | 1        |         |         |
| 3   |                           | Forget password                        | x                      |                  | 1        |          |          |          |          |          | 1        |         |         |
| 4   |                           | Manage profile                         | x                      |                  | 1        |          |          |          |          | 1        |          |         |         |
| 5   | Manage Personal Bookings  | Book a trip                            | x                      |                  |          | 1        |          | 1        |          |          |          |         |         |
| 6   |                           | Edit Upcoming Trip's Passenger Details | x                      |                  | 1        |          |          |          |          |          | 1        |         |         |
| 7   |                           | View and Filter Personal Bookings      | x                      |                  |          |          |          |          |          |          | 1        |         |         |
| 8   |                           | View and Pay Booking Invoice Details   | x                      |                  |          | 1        |          | 1        |          |          |          |         |         |
| 9   | Browse Trips              | View and Filter Available Trips        | x                      |                  |          |          |          |          |          |          | 1        |         |         |
| 10  |                           | View Trip Details                      | x                      |                  |          |          |          |          |          |          | 1        |         |         |
| 11  | Adjust Cart               | Add Trip to Cart                       | x                      | 1                |          |          |          |          |          |          |          |         |         |
| 12  |                           | Remove Trip from Cart                  | x                      | 1                |          |          |          |          |          |          |          |         |         |
| 13  |                           | Edit Cart Details                      | x                      |                  | 1        |          |          |          |          |          | 1        |         |         |
| 14  |                           | View and Filter Trips in Cart          | x                      |                  |          |          |          |          |          |          | 1        |         |         |
| 15  | Adjust Favorite Trips     | Favorite a Trip                        | x                      | 1                |          |          |          |          |          |          |          |         |         |
| 16  |                           | Unfavorite a Trip                      | x                      | 1                |          |          |          |          |          |          |          |         |         |
| 17  |                           | View and Filter Favorite Trips         | x                      |                  |          |          |          |          |          |          | 1        |         |         |
| 18  | Manage Routes             | Add new Route                          | x                      |                  |          | 1        |          |          |          |          |          |         |         |
| 19  |                           | View Route Detail                      | x                      |                  |          |          |          |          |          |          | 1        |         |         |
| 20  |                           | Edit Route detail                      | x                      |                  |          | 1        |          |          |          |          |          |         |         |
| 21  |                           | Delete route                           | x                      |                  | 1        |          |          |          |          |          |          |         |         |
| 22  |                           | View and Filter Routes                 | x                      |                  |          |          |          |          |          |          | 1        |         |         |
| 23  | Manage Route Schedule     | Add a new itinerary                    | x                      |                  | 1        |          |          |          |          |          |          |         |         |
| 24  |                           | View route schedule                    | x                      |                  |          |          |          |          |          |          | 1        |         |         |
| 25  |                           | Edit itinerary                         | x                      |                  | 1        |          |          |          |          |          |          |         |         |
| 26  |                           | Delete an itinerary                    | x                      |                  | 1        |          |          |          |          |          |          |         |         |
| 27  | Manage Attraction         | Add new attraction                     | x                      |                  | 1        |          |          |          |          |          |          |         |         |
| 28  |                           | View attraction detail                 | x                      |                  |          |          |          |          |          |          | 1        |         |         |
| 29  |                           | Edit attraction detail                 | x                      |                  | 1        |          |          |          |          |          |          |         |         |
| 30  |                           | Delete attraction                      | x                      |                  | 1        |          |          |          |          |          |          |         |         |
| 31  |                           | View and Filter attractions            | x                      |                  |          |          |          |          |          |          | 1        |         |         |
| 32  | Manage Trips              | Add new trip                           | x                      |                  | 1        |          |          |          |          |          |          |         |         |
| 33  |                           | View trip detail                       | x                      |                  |          |          |          |          |          |          | 1        |         |         |
| 34  |                           | Edit trip                              | x                      |                  | 1        |          |          |          |          |          |          |         |         |
| 35  |                           | Add new booking for trip               | x                      |                  |          | 1        |          | 1        |          |          |          |         |         |
| 36  |                           | Delete trip                            | x                      |                  | 1        |          |          |          |          |          |          |         |         |
| 37  |                           | View and Filter trips                  | x                      |                  |          |          |          |          |          |          | 1        |         |         |
| 38  | Adjust and Track Bookings | Add new booking                        | x                      |                  |          | 1        |          | 1        |          |          |          |         |         |
| 39  |                           | View booking detail                    | x                      |                  |          |          |          |          |          |          | 1        |         |         |
| 40  |                           | Edit Pre-Departure Booking             | x                      |                  | 1        |          |          |          |          |          |          |         |         |
| 41  |                           | Delete booking                         | x                      |                  | 1        |          |          |          |          |          |          |         |         |
| 42  |                           | View and filter bookings               | x                      |                  |          |          |          |          |          |          | 1        |         |         |
| 43  |                           | View booking invoice                   | x                      |                  |          |          |          |          | 1        |          |          |         |         |
| 44  | Adjust Customers          | Add new customer                       | x                      |                  | 1        |          |          |          |          |          |          |         |         |
| 45  |                           | View customer details                  | x                      |                  |          |          |          |          |          |          | 1        |         |         |
| 46  |                           | Edit customer                          | x                      |                  | 1        |          |          |          |          |          |          |         |         |
| 47  |                           | Delete customer                        | x                      |                  | 1        |          |          |          |          |          |          |         |         |
| 48  |                           | View and filter customers              | x                      |                  |          |          |          |          |          |          | 1        |         |         |
| 49  | Adjust Staffs             | Add new staff                          | x                      |                  | 1        |          |          |          |          |          |          |         |         |
| 50  |                           | View staff details                     | x                      |                  |          |          |          |          |          |          | 1        |         |         |
| 51  |                           | Edit staff                             | x                      |                  | 1        |          |          |          |          |          |          |         |         |
| 52  |                           | Delete staff                           | x                      |                  | 1        |          |          |          |          |          |          |         |         |
| 53  |                           | View and Filter staffs                 | x                      |                  |          |          |          |          |          |          | 1        |         |         |
| 54  | Reports                   | View reports                           | x                      |                  |          |          |          |          | 1        |          |          |         |         |
|     | **Total**                 |                                        |                        | **4**            | **25**   | **7**    | **0**    | **4**    | **2**    | **0**    | **20**   | **0**   | **0**   |

## Function Point Categories

### EI (External Input) - Input Transactions

- **Low (L)**: Simple input with 1-2 data elements and 1 file reference
- **Average (A)**: Moderate input with 3-5 data elements and 2 file references
- **High (H)**: Complex input with >5 data elements and >2 file references

### EO (External Output) - Output with Calculation

- **Low (L)**: Simple output with basic calculation
- **Average (A)**: Moderate output with moderate calculation
- **High (H)**: Complex output with complex calculation/aggregation

### EQ (External Query) - Simple Retrieval

- **Low (L)**: Simple query with 1-2 filters
- **Average (A)**: Moderate query with 3-5 filters
- **High (H)**: Complex query with >5 filters and joins

### ILF (Internal Logical File) - Internal Data Tables

- Count: Number of main data tables maintained by the application

### EIF (External Interface File) - External Data Sources

- Count: Number of external systems or data sources referenced

## Calculation

| Type                                       | Count | Complexity | Weight | UFP     |
| ------------------------------------------ | ----- | ---------- | ------ | ------- |
| EI-L                                       | 4     | Low        | 3      | 12      |
| EI-A                                       | 25    | Average    | 4      | 100     |
| EI-H                                       | 7     | High       | 6      | 42      |
| EO-L                                       | 0     | Low        | 4      | 0       |
| EO-A                                       | 4     | Average    | 5      | 20      |
| EO-H                                       | 2     | High       | 7      | 14      |
| EQ-L                                       | 0     | Low        | 3      | 0       |
| EQ-A                                       | 20    | Average    | 4      | 80      |
| ILF                                        | 13    | Average    | 10     | 130     |
| EIF                                        | 0     | Average    | 7      | 0       |
| **Total Unadjusted Function Points (UFP)** |       |            |        | **398** |

## Internal Logical Files (ILF)

1. User
2. Category
3. Attraction
4. Route
5. Route_Attraction
6. Trip
7. Cart
8. Cart_Item
9. Favorite_Tour
10. Tour_Booking
11. Tour_Booking_Detail
12. Booking_Traveler
13. Invoice

## Notes

- All functions are deployed on Web platform
- EI counts include create, update, delete operations
- EO counts include operations with business logic and calculations
- EQ counts include view and filter operations (simple retrieval)
- ILF count is based on the database schema (13 tables)
- No external interface files (EIF) as the system is standalone
