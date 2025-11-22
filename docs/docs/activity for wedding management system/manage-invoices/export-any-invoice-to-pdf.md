# Activity Export Any Invoice to PDF

```plantuml
@startuml
|S|Staff/Admin
|Sys|System

|S|
start

:(1) View invoice details (UC 54);

|Sys|
:(2) Display "Export PDF" button;

|S|
:(3) Click "Export PDF" button;

|Sys|
:(4) Query full invoice information from \n PHIEUDATTIEC, THUCDON, CHITIETDV, \n SANH, CA, NGUOIDUNG;
:(5) Generate PDF file with complete invoice content \n (including payment history, staff signatures);

if (Check PDF generation successful?) then (No)
	:(5.1) Display "Cannot create PDF file. Please try again" error;
	|S|
	:(5.2) View error message;
	stop
else (Yes)
endif

|Sys|
:(6) Download PDF file to device;

if (Check download successful?) then (No)
	:(6.1) Display "Cannot download file. Please check connection" error;
	|S|
	:(6.2) View error message;
	stop
else (Yes)
endif

|Sys|
:(7) Display "Export PDF successful" message;

|S|
:(8) View downloaded PDF file;

stop

@enduml
```

<!-- diagram id="activity-manage-invoices-export-any-invoice-to-pdf" -->
