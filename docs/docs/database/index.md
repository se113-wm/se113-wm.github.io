#database

```d2
vars: {
	d2-config: {
		layout-engine: elk
		theme-id: 3
	}
}

**.shape: sql_table
explanation.shape: rectangle

User: {
	id: int {constraint: PK}
	username: varchar {constraint: UNQ}
	password: varchar
	is_lock: boolean
	full_name: varchar
	email: varchar {constraint: UNQ}
	phone_number: varchar
	address: varchar
	birthday: date
	gender: enum('M','F','O')
	role: enum('CUSTOMER','STAFF','ADMIN')
}

Category: {
	id: int {constraint: PK}
	name: varchar
	status: enum('ACTIVE','INACTIVE','DELETED')
}

Attraction: {
	id: int {constraint: PK}
	name: varchar
	description: text
	location: varchar
	category_id: int {constraint: FK}
	status: enum('ACTIVE','INACTIVE','DELETED')
}

Route: {
	id: int {constraint: PK}
	name: varchar
	start_location: varchar
	end_location: varchar
	duration_days: int
	image: varchar
	status: enum('OPEN','ONGOING','CLOSED')
}

Route_Attraction: {
	id: int {constraint: PK}
	route_id: int {constraint: FK}
	attraction_id: int {constraint: FK}
	day: int
	order_in_day: int
	activity_description: text
}

Trip: {
	id: int {constraint: PK}
	route_id: int {constraint: FK}
	departure_date: date
	return_date: date
	price: decimal
	total_seats: int
	booked_seats: int
	pick_up_time: time
	pick_up_location: varchar
	status: enum('SCHEDULED','ONGOING','FINISHED','CANCELED')
}

Cart: {
	id: int {constraint: PK}
	user_id: int {constraint: FK}
}

Cart_Item: {
	id: int {constraint: PK}
	cart_id: int {constraint: FK}
	trip_id: int {constraint: FK}
	quantity: int
	price: decimal
}

Favorite_Tour: {
	user_id: int {constraint: [PK, FK]}
	route_id: int {constraint: [PK, FK]}
}

Tour_Booking: {
	id: int {constraint: PK}
	trip_id: int {constraint: FK}
	user_id: int {constraint: FK}
	seats_booked: int
	total_price: decimal
	status: enum('PENDING','CONFIRMED','CANCELED','COMPLETED')
}

Tour_Booking_Detail: {
	id: int {constraint: PK}
	booking_id: int {constraint: FK}
	no_adults: int
	no_children: int
}

Booking_Traveler: {
	id: int {constraint: PK}
	booking_id: int {constraint: FK}
	full_name: varchar
	gender: enum('M','F','O')
	date_of_birth: date
	identity_doc: varchar
}

Invoice: {
	id: int {constraint: PK}
	booking_id: int {constraint: FK}
	total_amount: decimal
	payment_status: enum('UNPAID','PAID','REFUNDED')
	payment_method: varchar
}

Attraction.category_id -> Category.id
Route_Attraction.route_id -> Route.id
Route_Attraction.attraction_id -> Attraction.id
Trip.route_id -> Route.id
Cart.user_id -> User.id
Cart_Item.cart_id -> Cart.id
Cart_Item.trip_id -> Trip.id
Favorite_Tour.user_id -> User.id
Favorite_Tour.route_id -> Route.id
Tour_Booking.trip_id -> Trip.id
Tour_Booking.user_id -> User.id
Tour_Booking_Detail.booking_id -> Tour_Booking.id
Booking_Traveler.booking_id -> Tour_Booking.id
Invoice.booking_id -> Tour_Booking.id

```
