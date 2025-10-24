# Activity Edit Trip Details

```plantuml
@startuml
|C|Customer
|S|System

|C|
start

:(1) In cart page click edit button;

|S|
:(2) Query cart item information from database;

:(3) Verify trip still valid;

if (Check trip valid and editable?) then (No)
  :(3.1) Display trip invalid warning with remove option;

  |C|
  :(3.2) Confirm end;

  stop
else (Yes)
endif

|S|
:(4) Display edit form with \n current quantity and available seats;

|C|
:(5) Change quantity of seats;

|S|
:(6) Auto calculate and display new total price;

repeat
  |C|
  :(7) Click save changes button;

  |S|
  :(8) Verify quantity valid;

  :(9) Query available seats from database;

  :(10) Verify sufficient seats for new quantity;
repeat while (Check quantity valid and sufficient seats?) is (No) not (Yes)

:(11) Update cart item quantity in database;

:(12) Display update success notification;

:(13) Auto update total cart price on interface;

|C|
:(14) View updated cart;

:(15) Confirm end;

stop

@enduml
```

<!-- diagram id="activity-adjust-cart-edit-trip-details" -->
