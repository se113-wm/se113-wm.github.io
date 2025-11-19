# Activity Export Hall Types to Excel

```plantuml
@startuml
|S|Staff/Admin
|Sys|System

|S|
start

:(1) Select view hall types function;

|Sys|
:(2) Display hall types list;

|S|
:(3) Apply filter criteria (optional);

|Sys|
:(4) Display filtered hall types list;

|S|
:(5) Click "Export Excel" button;

|Sys|
:(6) Query hall types data with current filter;

if (Check has data to export?) then (No)
	:(6.1) Display no data notification;
	|S|
	:(6.2) Confirm end;
	stop
else (Yes)
endif

|Sys|
:(7) Generate Excel file with hall types data;
:(8) Create filename with timestamp;
:(9) Send file to browser for download;

|S|
:(10) Download and open Excel file;

stop

@enduml
```

<!-- diagram id="activity-manage-hall-types-export-hall-types-to-excel" -->
