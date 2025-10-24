# Activity Checkout Cart

```plantuml
@startuml
|C|Customer
|S|System

|C|
start
:(1) View cart with items;
:(2) Click checkout cart button;

|S|
:(3) Query cart items and trip details;

if (Check cart has items?) then (No)
  :(3.1) Display empty cart notification;
  |C|
  :(3.2) Confirm end;
  stop
else (Yes)
endif
|S|
:(4) Verify all trips validity;

if (Check all trips valid?) then (No)
  :(4.1) Display invalid trips list;
  |C|
  :(4.2) Remove invalid trips or cancel;
  stop
else (Yes)
endif

|S|
:(5) Display passenger information form;

repeat
  |C|
  :(6) Enter passenger quantity and traveler details;
  :(7) Click confirm bookings button;
  |S|
  :(8) Verify passenger data;
repeat while (Check data valid?) is (No) not (Yes)

:(9) Display confirmation page with total amount;

|C|
:(10) Confirm checkout;

|S|
:(11) Create bookings, travelers, invoices in transaction;
:(12) Update booked seats and clear cart;
:(13) Display success notification and send email;

|C|
:(14) Confirm end;

stop

@enduml
```

<!-- diagram id="activity-manage-personal-booking-checkout-cart" -->
