# Activity Delete Route

```plantuml
@startuml
|S|Staff
|Sy|System

|S|
start

:(1) View routes list;
:(2) Click delete button on a route;

|Sy|
:(3) Query related data (Trips and Route_Attractions);

if (Check has related data?) then (Yes)
  :(3.1) Display cannot delete route notification;
  |S|
  :(3.2) Confirm end;
  stop
else (No)
endif

|Sy|
:(4) Display confirmation dialog with route name;

|S|
:(5) Click confirm or cancel button;

|Sy|
if (Check Staff confirms delete?) then (No)
  :(5.1) Close confirmation dialog;
  |S|
  :(5.2) Confirm end;
  stop
else (Yes)
endif

|Sy|
:(6) Delete route in transaction;
:(7) Display success notification and reload list;

|S|
:(8) View updated list;
:(9) Confirm end;

stop

@enduml
```

<!-- diagram id="activity-manage-routes-delete-route" -->
