# Activity Delete Service

```plantuml
@startuml
|S|Staff/Admin
|Sys|System

|S|
start

:(1) Select delete service function;

|Sys|
:(2) Display services list;

|S|
:(3) Select service to delete;
:(4) Click delete button;

|Sys|
:(5) Query referenced data (service details);

if (Check has referenced data?) then (Yes)
	:(5.1) Display cannot delete notification \n with usage count;
	|S|
	:(5.2) Confirm end;
	stop
else (No)
endif

|Sys|
:(6) Display confirmation dialog;

|S|
:(7) Click confirm or cancel button;

|Sys|
if (Check Staff/Admin confirms delete?) then (No)
	:(7.1) Close confirmation dialog;
	|S|
	:(7.2) Confirm end;
	stop
else (Yes)
endif

|Sys|
:(8) Delete service record;
:(9) Display success notification and reload list;

|S|
:(10) View updated list;

stop

@enduml
```

<!-- diagram id="activity-manage-services-delete-service" -->
