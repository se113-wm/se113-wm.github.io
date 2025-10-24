# Activity Edit Upcoming Trip's Passenger Details

```plantuml
@startuml
|C|Customer
|S|System

|C|
start

:(1) View upcoming booking details;

|S|
:(2) Display booking details;

:(3) Query traveler list from database;

:(4) Display traveler list with edit button;

|C|
:(5) Click edit passenger information button;

|S|
:(6) Query booking status and departure date;

:(7) Verify edit conditions;

if (Check booking editable?) then (No)
  :(7.1) Display cannot edit notification with reason;

  |C|
  :(7.2) Confirm end;

  stop
else (Yes)
endif

|S|
:(8) Display passenger information edit form \n with current data;

repeat
  |C|
  :(9) Edit information for one or more passengers;

  :(10) Click save changes button;

  |S|
  :(11) Verify input data validity;
repeat while (Check all data valid?) is (No) not (Yes)

:(12) Update traveler records in transaction;

:(13) Commit transaction;

:(14) Display update success notification;

:(15) Send email confirmation for information update;

|C|
:(16) View updated information;

:(17) Confirm end;

stop

@enduml
```

<!-- diagram id="activity-manage-personal-booking-edit-upcoming-trip's-passenger-details" -->
