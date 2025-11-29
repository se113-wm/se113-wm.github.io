# USE CASE SPECIFICATION - MANAGE HALLS

This document describes the use cases for managing halls, intended for Staff and Administrators in the Wedding Management System.

It includes 5 main use cases:

1.  View Hall Details
2.  Add New Hall
3.  Edit Hall
4.  Delete Hall
5.  Export Halls to Excel

---

## UC_MH_01: View Hall Details

### Description

Staff/Admin views the list of halls in the system and can filter, search by hall type, capacity, and view detailed information for each hall.

### Primary Actors

-   Staff
-   Admin

### Preconditions

-   The user is logged in with the role of Staff or Admin.

### Postconditions

-   Displays the list of halls according to the filter criteria (if any).
-   Displays the detailed information of the selected hall (if any).

### Main Flow

| Step | Staff/Admin                                        | System                                                                                                                                                                                                                         |
| :--- | :--------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Selects the "Manage Halls" feature.                |                                                                                                                                                                                                                                |
| 2    |                                                      | Queries the list of halls: <br>`SELECT h.HallId, h.HallName, h.MaxTableCount, h.Note, ht.HallTypeName, ht.MinTablePrice` <br>`FROM Hall h` <br>`LEFT JOIN HallType ht ON h.HallTypeId = ht.HallTypeId` <br>`ORDER BY h.HallId` |
| 3    |                                                      | Displays the list with columns: Hall ID, Hall Name, Hall Type, Max Table Count, Min Table Price, Note, Actions (View Details, Edit, Delete).                                                                                    |
| 4    | (Optional) Enters search/filter criteria.          |                                                                                                                                                                                                                                |
| 5    | Clicks "Search" or "Apply Filter".                   |                                                                                                                                                                                                                                |
| 6    |                                                      | Queries with the corresponding WHERE clause: <br>- By hall type (HallTypeId) <br>- By hall name (HallName LIKE N'%keyword%') <br>- By capacity (MaxTableCount >= @Min AND MaxTableCount <= @Max) <br>`... WHERE ... ORDER BY ...` |
| 7    |                                                      | Displays the results according to the search/filter criteria.                                                                                                                                                                  |
| 8    | Selects a hall to view details.                      |                                                                                                                                                                                                                                |
| 9    |                                                      | Queries for detailed information: <br>`SELECT h.*, ht.HallTypeName, ht.MinTablePrice` <br>`FROM Hall h` <br>`LEFT JOIN HallType ht ON h.HallTypeId = ht.HallTypeId` <br>`WHERE h.HallId = @HallId`                  |
| 10   |                                                      | Displays a details dialog with: Hall ID, Hall Name, Hall Type, Max Table Count, Min Table Price, Note, Actions (Edit, Delete).                                                                                                  |
| 11   | Views the detailed information.                      |                                                                                                                                                                                                                                |

### Alternative Flows

-   None.

### Business Rules/SQL Suggestions

-   Add indexes on `Hall.HallTypeId` and `Hall.HallName` to speed up searches.
-   Display the number of bookings currently using the hall (if needed): `SELECT COUNT(*) FROM Booking WHERE HallId = @HallId`

---

## UC_MH_02: Add New Hall

### Description

Staff/Admin creates a new hall in the system with complete information.

### Primary Actors

-   Staff
-   Admin

### Preconditions

-   The user is logged in with the role of Staff or Admin.
-   The HallType already exists in the system.

### Postconditions

-   A new Hall record is created with complete information.

### Main Flow

| Step | Staff/Admin                  | System                                                                                                                                                                                        |
| :--- | :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Selects "Add New Hall".      |                                                                                                                                                                                               |
| 2    |                              | Queries the list of hall types: <br>`SELECT HallTypeId, HallTypeName, MinTablePrice` <br>`FROM HallType` <br>`ORDER BY HallTypeName`                                                          |
| 3    |                              | Displays the add hall form with fields: Hall Name, Hall Type (dropdown), Max Table Count, Note.                                                                                               |
| 4    | Enters the hall information. |                                                                                                                                                                                               |
| 5    | Clicks "Save".               |                                                                                                                                                                                               |
| 6    |                              | Validates the data: <br>- Hall Name is not empty, length ≤ 40 characters. <br>- A Hall Type is selected. <br>- Max Table Count > 0 and is an integer. <br>- Note (if any) length ≤ 100 characters. |
| 7    |                              | Checks for duplicate hall name: <br>`SELECT COUNT(*) FROM Hall` <br>`WHERE HallName = @HallName`                                                                                               |
| 8    |                              | Executes the insert: <br>`INSERT INTO Hall (HallTypeId, HallName, MaxTableCount, Note)` <br>`VALUES (@HallTypeId, @HallName, @MaxTableCount, @Note)`                                             |
| 9    |                              | Displays "Hall added successfully" and returns to the hall list.                                                                                                                              |
| 10   | Views the new hall in the list. |                                                                                                                                                                                               |

### Alternative Flows

-   6a. Invalid data: Displays a specific error message (which field is missing/has the wrong format), returns to step 4.
-   7a. Hall name already exists: Displays "Hall name already exists in the system", returns to step 4.
-   8a. Database error: Displays "An error occurred while adding the hall. Please try again", returns to step 4.

### Business Rules/SQL Suggestions

-   Hall name must be unique (UNIQUE constraint).
-   Max Table Count must be a positive integer.
-   HallTypeId must exist in the HallType table (FK constraint).

---

## UC_MH_03: Edit Hall

### Description

Staff/Admin edits the information of an existing hall in the system.

### Primary Actors

-   Staff
-   Admin

### Preconditions

-   The user is logged in with the role of Staff or Admin.
-   The hall to be edited exists in the system.

### Postconditions

-   The Hall information is updated.

### Main Flow

| Step | Staff/Admin                     | System                                                                                                                                                                                                  |
| :--- | :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Selects the "Edit Hall" feature. |                                                                                                                                                                                                           |
| 2    |                                 | Displays the list of halls.                                                                                                                                                                             |
| 3    | Selects the hall to edit.       |                                                                                                                                                                                                           |
| 4    |                                 | Queries the hall information: <br>`SELECT HallId, HallTypeId, HallName, MaxTableCount, Note` <br>`FROM Hall` <br>`WHERE HallId = @HallId`                                                                 |
| 5    |                                 | Queries the list of hall types: <br>`SELECT HallTypeId, HallTypeName, MinTablePrice` <br>`FROM HallType`                                                                                                  |
| 6    |                                 | Displays the edit form with the current data: Hall Name, Hall Type (dropdown), Max Table Count, Note.                                                                                                   |
| 7    | Edits the hall information.     |                                                                                                                                                                                                           |
| 8    | Clicks "Save".                  |                                                                                                                                                                                                           |
| 9    |                                 | Validates the data: <br>- Hall Name is not empty, length ≤ 40 characters. <br>- A Hall Type is selected. <br>- Max Table Count > 0 and is an integer. <br>- Note (if any) length ≤ 100 characters.      |
| 10   |                                 | Checks for duplicate name (if the name is changed): <br>`SELECT COUNT(*) FROM Hall` <br>`WHERE HallName = @HallName AND HallId <> @HallId`                                                                 |
| 11   |                                 | Executes the update: <br>`UPDATE Hall` <br>`SET HallTypeId = @HallTypeId,` <br>`    HallName = @HallName,` <br>`    MaxTableCount = @MaxTableCount,` <br>`    Note = @Note` <br>`WHERE HallId = @HallId` |
| 12   |                                 | Displays "Hall updated successfully" and reloads the list.                                                                                                                                              |
| 13   | Views the updated hall information. |                                                                                                                                                                                                           |

### Alternative Flows

-   9a. Invalid data: Displays a specific error message, returns to step 7.
-   10a. Hall name already exists: Displays "Hall name already exists in the system", returns to step 7.
-   11a. Database error: Displays "An error occurred while updating the hall. Please try again", returns to step 7.

### Business Rules/SQL Suggestions

-   Check the impact of changing the hall type (may affect the unit price).
-   Warn if the maximum number of tables is reduced to less than the number of tables already booked in bookings.

---

## UC_MH_04: Delete Hall

### Description

Staff/Admin deletes a hall from the system after checking that no bookings are using it.

### Primary Actors

-   Staff
-   Admin

### Preconditions

-   The user is logged in with the role of Staff or Admin.
-   The hall to be deleted exists in the system.

### Postconditions

-   The Hall record is deleted.

### Main Flow

| Step | Staff/Admin                     | System                                                                                                                  |
| :--- | :------------------------------ | :---------------------------------------------------------------------------------------------------------------------- |
| 1    | Selects the "Delete Hall" feature. |                                                                                                                       |
| 2    |                                 | Displays the list of halls.                                                                                             |
| 3    | Selects the hall to delete.     |                                                                                                                       |
| 4    | Clicks the "Delete" button.     |                                                                                                                       |
| 5    |                                 | Checks for referenced data: <br>`SELECT COUNT(*) FROM Booking` <br>`WHERE HallId = @HallId`                             |
| 6    |                                 | Displays a confirmation dialog: "Are you sure you want to delete the hall '[Hall Name]'? This action cannot be undone." |
| 7    | Clicks "Confirm" or "Cancel".   |                                                                                                                       |
| 8    |                                 | Executes the delete: <br>`DELETE FROM Hall` <br>`WHERE HallId = @HallId`                                                 |
| 9    |                                 | Displays "Hall deleted successfully" and reloads the list.                                                              |
| 10   | Views the updated list.         |                                                                                                                       |

### Alternative Flows

-   5a. The hall has referenced bookings: Blocks the operation and displays "Cannot delete this hall because it is being used by X bookings. Please handle the bookings before deleting.", stops the use case.
-   7a. Staff/Admin clicks "Cancel": Closes the confirmation dialog, stops the use case.
-   8a. Database error: Displays "An error occurred while deleting the hall. Please try again."

### Business Rules/SQL Suggestions

-   **MANDATORY** to check for referenced data from Booking before deleting.
-   Only perform a hard delete when there is no referenced data.
-   Consider adding an "Inactive" status instead of a physical delete in the future.

---

## UC_MH_05: Export Halls to Excel

### Description

Staff/Admin exports the list of halls (which can be filtered) to an Excel file for storage or reporting.

### Primary Actors

-   Staff
-   Admin

### Preconditions

-   The user is logged in with the role of Staff or Admin.
-   The list of halls is being viewed (filters may be applied).

### Postconditions

-   An Excel file containing the list of halls is created and automatically downloaded.

### Main Flow

| Step | Staff/Admin                             | System                                                                                                                                                                                                                                                                    |
| :--- | :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Selects the "Manage Halls" feature.     |                                                                                                                                                                                                                                                                           |
| 2    |                                         | Displays the list of halls.                                                                                                                                                                                                                                             |
| 3    | (Optional) Applies filters.             |                                                                                                                                                                                                                                                                           |
| 4    | Clicks "Export Excel".                  |                                                                                                                                                                                                                                                                           |
| 5    |                                         | Queries the hall data according to the current filters: <br>`SELECT h.HallId, h.HallName, ht.HallTypeName, h.MaxTableCount, ht.MinTablePrice, h.Note` <br>`FROM Hall h` <br>`LEFT JOIN HallType ht ON h.HallTypeId = ht.HallTypeId` <br>`WHERE ... -- filter condition if any` <br>`ORDER BY h.HallId` |
| 6    |                                         | Creates an Excel file with: <br>- Sheet "Hall List" <br>- Header: Hall ID, Hall Name, Hall Type, Max Table Count, Min Table Price, Note <br>- Data from the query <br>- Footer: Total number of halls, Report export date                                                        |
| 7    |                                         | Generates the file name: "HallList_YYYYMMDD_HHmmss.xlsx"                                                                                                                                                                                                                  |
| 8    |                                         | Sends the file to the browser for download.                                                                                                                                                                                                                               |
| 9    | Downloads the Excel file to the machine. |                                                                                                                                                                                                                                                                           |
| 10   | Opens and checks the Excel file.        |                                                                                                                                                                                                                                                                           |

### Alternative Flows

-   5a. No data to export: Displays "No hall data to export", stops the use case.
-   6a. Error creating Excel file: Displays "An error occurred while creating the Excel file. Please try again."

### Business Rules/SQL Suggestions

-   Excel file format: .xlsx (Office Open XML).
-   Use a library: EPPlus, ClosedXML, or NPOI.
-   Limit the number of records to export (e.g., max 10,000 halls) to avoid overload.
-   Format the currency amount (VND).
-   Auto-fit column width for better display.

---

## APPENDIX: DATABASE TABLE INFORMATION

### Hall Table

| Column Name   | Data Type     | Constraints               | Description        |
| :------------ | :------------ | :------------------------ | :----------------- |
| HallId        | INT           | PRIMARY KEY IDENTITY(1,1) | Hall ID            |
| HallTypeId    | INT           | FK → HallType(HallTypeId) | Hall Type ID       |
| HallName      | NVARCHAR(40)  | UNIQUE NOT NULL           | Hall Name          |
| MaxTableCount | INT           |                           | Max Table Count    |
| Note          | NVARCHAR(100) |                           | Note               |

### HallType Table (related)

| Column Name   | Data Type    | Constraints               | Description         |
| :------------ | :----------- | :------------------------ | :------------------ |
| HallTypeId    | INT          | PRIMARY KEY IDENTITY(1,1) | Hall Type ID        |
| HallTypeName  | NVARCHAR(40) | UNIQUE NOT NULL           | Hall Type Name      |
| MinTablePrice | MONEY        |                           | Minimum Table Price |

### Booking Table (related)

| Column Name | Data Type | Constraints               | Description |
| :---------- | :-------- | :------------------------ | :---------- |
| BookingId   | INT       | PRIMARY KEY IDENTITY(1,1) | Booking ID  |
| HallId      | INT       | FK → Hall(HallId)         | Hall ID     |
| ...         | ...       | ...                       | ...         |
