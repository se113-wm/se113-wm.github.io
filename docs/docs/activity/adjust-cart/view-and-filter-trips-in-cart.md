# Activity View and Filter Trips in Cart

```plantuml
@startuml
|C|Customer
|S|System

|C|
start

:(1) Click cart icon;

|S|
:(2) Query cart with items and details;

if (Check cart has items?) then (No)
  :(2.1) Display empty cart message \n with explore tours button;
  |C|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Display cart items list;

repeat
  |C|
  :(4) Enter filter criteria;
  :(5) Submit filter;

  |S|
  :(6) Verify filter criteria;

  if (Check has results?) then (No)
    :(6.1) Display no matching trips message;
    |C|
  else (Yes)
    |S|
    :(7) Display filtered results with updated totals;
    |C|
  endif
repeat while (Check want to filter again?) is (Yes) not (No)

:(8) Confirm end;

stop

@enduml

<!-- diagram id="activity-adjust-cart-view-and-filter-trips-in-cart" -->
```
