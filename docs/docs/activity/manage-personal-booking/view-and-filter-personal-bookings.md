# Activity View and Filter Personal Bookings

```plantuml
@startuml
|C|Customer
|S|System

|C|
start
:(1) Click "Booking của tôi" in menu;

|S|
:(2) Query bookings from database;

if (Check customer has bookings?) then (No)
  :(2.1) Display no bookings message \n with explore tours button;
  |C|
  :(2.2) Confirm end;
  stop
else (Yes)
endif
|S|
:(3) Display bookings with tabs and filter form;

|C|
:(4) View bookings and enter filter criteria;

:(5) Click apply filter button;

|S|
:(6) Query bookings with filter conditions;

if (Check has matching results?) then (No)
  :(6.1) Display no matching bookings message;
else (Yes)
  :(7) Display filtered bookings list;
endif

|C|
:(8) Confirm end;

stop

@enduml
```

<!-- diagram id="activity-manage-personal-booking-view-and-filter-personal-bookings" -->
