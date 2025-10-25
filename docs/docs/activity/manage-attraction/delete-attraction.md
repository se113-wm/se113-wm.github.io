# Activity Delete Attraction

```plantuml
@startuml
|S|Staff
|Sy|System

|S|
start

:(1) View attractions list;
:(2) Click delete button on an attraction;

|Sy|
:(3) Query references in Route_Attraction;

if (Check attraction has references?) then (Yes)
	:(3.1) Display cannot delete; suggest set INACTIVE;
	|S|
	:(3.2) Click set INACTIVE or cancel;
	|Sy|
	if (Check Staff chooses set INACTIVE?) then (No)
		:(3.2.1) Close dialog;
		|S|
		:(3.2.2) Confirm end;
		stop
	else (Yes)
	endif
    |Sy|
	:(3.3) Update attraction status to INACTIVE;
	:(3.4) Display success notification and reload list;
	|S|
	:(3.5) View updated list;
	:(3.6) Confirm end;
	stop
else (No)
endif

|Sy|
:(4) Display confirmation dialog with attraction name;

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
:(6) Soft delete attraction (status='DELETED') in transaction;
:(7) Display success notification and reload list;

|S|
:(8) View updated list;
:(9) Confirm end;

stop

@enduml
```

<!-- diagram id="activity-manage-attraction-delete-attraction" -->
