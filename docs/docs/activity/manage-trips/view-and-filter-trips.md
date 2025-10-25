# Activity View and Filter Trips

```plantuml
@startuml
|S|Staff
|Sy|System

|S|
start

:(1) Select function View Trips;

|Sy|
:(2) Query trips;

if (Check has trips?) then (No)
	:(2.1) Display no trips notification;
	|S|
	:(2.2) Confirm end;
	stop
else (Yes)
endif

:(3) Display trips list;

repeat
	|S|
	:(4) Enter filter criteria;
	:(5) Submit filter;

	|Sy|
	:(6) Verify filter criteria;

	if (Check has results?) then (No)
		:(6.1) Display no results notification;
		|S|
	else (Yes)
		|Sy|
		:(7) Display filtered results;
		|S|
	endif
repeat while (Check want to filter again?) is (Yes) not (No)

:(8) Confirm end;

stop

@enduml

<!-- diagram id="activity-manage-trips-view-and-filter-trips" -->
```
