# Activity View Shift Details

```plantuml
@startuml
|S|Staff/Admin
|Sys|System

|S|
start

:(1) Select view shifts function;

|Sys|
:(2) Display shifts list with search/filter options;

|S|
:(3) Enter search/filter criteria (optional);
:(4) Click search/filter button;

|Sys|
:(5) Query shifts with criteria;
:(6) Display filtered shifts list;

|S|
:(7) Select shift to view details;

|Sys|
:(8) Query shift details and usage count;
:(9) Display shift details dialog;

|S|
:(10) View shift information and close dialog;

stop

@enduml
```

<!-- diagram id="activity-manage-shifts-view-shift-details" -->
