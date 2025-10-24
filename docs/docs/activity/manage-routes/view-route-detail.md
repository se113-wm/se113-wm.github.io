# Activity View Route Detail

```plantuml
@startuml
|S|Staff
|Sy|System

|S|
start

:(1) Select route from list;

|Sy|
:(2) Query route details from database;

if (Check route exists?) then (No)
  :(2.1) Display route not found notification;
  |S|
  :(2.2) Confirm end;
  stop
else (Yes)
endif
|Sy|
:(3) Query total trips and schedule summary;

:(4) Display route details with totals \n and schedule summary by day;

|S|
:(5) View route details;
:(6) Confirm end;

stop

@enduml
```

<!-- diagram id="activity-manage-routes-view-route-detail" -->
