# Activity View Dish Details

```plantuml
@startuml
|S|Staff/Admin
|Sys|System

|S|
start

:(1) Select view dishes function;

|Sys|
:(2) Display dishes list with search/filter options;

|S|
:(3) Enter search/filter criteria (optional);
:(4) Click search/filter button;

|Sys|
:(5) Query dishes with criteria;
:(6) Display filtered dishes list;

|S|
:(7) Select dish to view details;

|Sys|
:(8) Query dish details and usage count;
:(9) Display dish details dialog;

|S|
:(10) View dish information and close dialog;

stop

@enduml
```

<!-- diagram id="activity-manage-menu-view-dish-details" -->
