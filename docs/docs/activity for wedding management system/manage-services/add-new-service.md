# Activity Add New Service

```plantuml
@startuml
|S|Staff/Admin
|Sys|System

|S|
start

:(1) Select function Add New Service;

|Sys|
:(2) Display add service form \n (service name, price, notes);

repeat
	|S|
	:(3) Enter service information;
	:(4) Click save button;

	|Sys|
	:(5) Verify data valid (name not empty, price > 0);
	:(6) Verify not duplicated service name;
    backward: (6.1) Display error notification;
repeat while (Check data valid and not duplicated?) is (No) not (Yes)

|Sys|
:(7) Insert new service record;
:(8) Notify success and redirect to services list;

|S|
:(9) View new service in list;
:(10) Confirm end;

stop

@enduml
```

<!-- diagram id="activity-manage-services-add-new-service" -->
