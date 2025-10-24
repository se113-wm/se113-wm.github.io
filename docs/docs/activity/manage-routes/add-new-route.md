# Activity Add New Route

```plantuml
@startuml
|S|Staff
|Sy|System

|S|
start

:(1) Select function Add New Route;

|Sy|
:(2) Display add route form \n (name, start, end, days, image, status);

repeat
  |S|
  :(3) Enter route information;
  :(4) Click save button;

  |Sy|
  :(5) Verify data valid;
repeat while (Check data valid?) is (No) not (Yes)

|Sy|
:(6) Update route (insert new record);
:(7) Notify success and redirect to routes list;

|S|
:(8) View new route in list;
:(9) Confirm end;

stop

@enduml
```

<!-- diagram id="activity-manage-routes-add-new-route" -->
