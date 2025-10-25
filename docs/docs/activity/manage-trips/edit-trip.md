# Activity Edit Trip

```plantuml
@startuml
|S|Staff
|Sy|System

|S|
start

:(1) Select function Edit Trip;

|Sy|
:(2) Query trip details and status;

if (Check trip exists and editable?) then (No)
	:(2.1) Display cannot edit or not found notification;
	|S|
	:(2.2) Confirm end;
	stop
else (Yes)
endif

|Sy|
:(3) Display trip edit form with current data;

repeat
	|S|
	:(4) Edit trip information;
	:(5) Click save button;
	|Sy|
	:(6) Verify data valid and constraints satisfied;
repeat while (Check data valid and constraints satisfied?) is (No) not (Yes)

|Sy|
:(7) Update trip information;
:(8) Display success notification and reload list;

|S|
:(9) View updated trip details;
:(10) Confirm end;

stop

@enduml
```

<!-- diagram id="activity-manage-trips-edit-trip" -->
