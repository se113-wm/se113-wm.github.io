# Activity Edit Hall Type

```plantuml
@startuml
|S|Staff/Admin
|Sys|System

|S|
start

:(1) Select function Edit Hall Type;

|Sys|
:(2) Display hall types list;

|S|
:(3) Select hall type to edit;

|Sys|
:(4) Query hall type details;
:(5) Display edit form with current data;

repeat
	|S|
	:(6) Edit hall type information;
	:(7) Click save button;
	|Sys|
	:(8) Verify data valid and constraints satisfied;
    backward: (8.1) Display error notification;
repeat while (Check data valid and constraints satisfied?) is (No) not (Yes)

|Sys|
:(9) Update hall type information;
:(10) Display success notification and reload list;

|S|
:(11) View updated hall type details;

stop

@enduml
```

<!-- diagram id="activity-manage-hall-types-edit-hall-type" -->
