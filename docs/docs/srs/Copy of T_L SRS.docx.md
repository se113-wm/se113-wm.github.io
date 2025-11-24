

**Revision and Signoff Sheet**

**Change Record**

| Author | Version | Change reference | Date |
| ----- | ----- | ----- | ----- |
| Trinh-Dong Nguyen | 0.5.0 | Complete requirement direction | 08/08/2021 |
| Hoai Nguyen | 0.7.0 | Complete requirement direction | 08/09/2021 |

**Reviewers**

| Name | Company | Version  | Position | Date |
| ----- | ----- | ----- | ----- | ----- |
| Ha Tran | FPT | 0.5.0 | AD Team Lead | 08/08/2021 |
| Ha Tran | FPT | 0.7.0 | AD Team Lead | 08/10/2021 |

**Table of Contents**

1. # **Introduction**

   1. # **Purpose**

This Software Requirements Specification and Design document contains the software requirements to migrate the application from Lotus Notes/Domino to a new target platform e.g. SharePoint, Java or PHP and detailed design for migrated application on target platform. Firstly, this document along with the Notes database(s) and other reference documents are complete requirements to perform a migration from Domino environment to target platform. Secondly, it defines, technically, how applications will operate. Developers will base on this document to conduct development plan, task assignment and implementation of the new application.

2. # **Scope**

This document is prepared for the application GES Errors, in scope of the project LNAR2.

3. # **Intended Audiences and Document Organization**

This document is intended for:

* Development team: Responsible to develop detailed design, implement and perform unit test, integration test and system test for the migrated application

* Data Migration team: Responsible to create data migration scripts, and perform data migration for the application.

* Documentation Team: Responsible to writing User Guide for the application.

* UAT team: Responsible to conduct user acceptance test sessions with end users.

Below are main sections of the document:

* **1\. Introduction**: This section describes the general introduction of this document.

* **2\. Functional Requirements**: This section describes the functional requirements in detail.

* **3\. Non-functional Requirements:** This section describes the non-functional requirements of this application such as user access and security, interfaces, screens and performance.

* **4\. Other Requirements:** This section describes other requirements such as archive or security audit function.

* **5\.** **SharePoint Application Design:** This section describes the design of SharePoint application.

* **6\. Appendixes**: This section describes other requirements for this application and other supporting information for this document**.**

* NOTE: Please refer to section 6.1 for all acronyms and abbreviations you may encounter within this document.

  4. # **References**

| \# | Title | Version | File Name / Link | Description |
| :---- | :---- | :---- | :---- | :---- |
| 1 |  |  |  |  |
| 2 |  |  |  |  |

2. # **Functional Requirements**

   1. # **Use Case Description**

### UC1: Submit Error Form

| Name |  Submit Error Form |
| :---- | :---- |
| **Description** | This use case allows GES Requester to send the error form to Sign Offs. |
| **Actor** | GES Requester |
| **Trigger** | When user clicks on “Send To Technical Sign Off” button if \[Error Reason\] \= “Technical Fault” Otherwise when user clicks on “Send To Office Sign Off” button |
| **Pre-condition** | The item is in new created mode.  Or \[Document Status\] \= “” |
| **Post-condition** | The item is updated. Notification emails are sent. |

#### **Activities Flow**

![][image1]

*Figure 1: Activities Flow*

#### **Business Rules**

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| *(2)* | *BR1* | **Loading Screen Rules:** The system loads “Error Form” screen. (Refer to “Error Form” list in “List Description” file) |
| *(4)* | *BR2* | **Submitting Rules:** When user clicks on “Send To Office Sign Off”/”Send to Technical Sign Off”, the system will prompt a confirmation message (Refer to MSG 6). If user chooses Cancel, the system does nothing; else, the system will save inputted information, submit the item to appropriate approver and update the item as the following: The system retrieves “Currency” item with \[Currency Symbol\] \= \[Currency\] in current item. If there is no retrieved value, the system shows an error message MSG 7 and exits submitting process.  Else if the absolute value of \[Amount\] \> \[Global Notification Limit\] of the retrieved “Currency” item and this \[Global Notification Limit\] \<\> 0, set \[Is Error Over Currency Limit\] \= "Yes" \[Lock\] \= “Yes” If \[Error Reason\] \= “Technical Fault” Set \[Document Status\] \= “Sent to Technical Sign Off” Else  Set \[Document Status\] \= “Sent to Office Sign Off”. If \[Amount\] \<\> 0 and \[Euro Rate\] \<\> 0, set \[Euro Equivalent\] \= \[Amount\] / \[Euro Rate\]; else, set \[Euro Equivalent\] \= 0  \[Reference Number\] is generated with format as: \[Error Identifier\] \+ \[Error Current Year\] \+ “-“ \+ \<\<Reference Number\>\> with **\<\<Reference Number\>\>**: \[Report Number\] of the satisfied Country item \+ 1 Update \[Report Number\] of the satisfied “Country” item \= \[Report Number\] \+ 1 Update permission so that no one can edit fields in Trader Details, Trade Details, Client Proprietary Details, and Cancellation Details sections. Besides, editable permission also is updated as the following: If \[Market\] \= “EURX” and \[Compliance Operation\] \<\> “”, only users in \[Compliance Operation\], users of “EURX” items basing \[Email\], \[Creator\], GES Administrator, \[Sign offs\], \[Approvers\], \[Compliance Approvers\], and GES Higher Approvers. Else if \[Market\] \=”EURX” and \[Compliance Operation\] \= “”, only users of “EURX” items basing \[Email\], \[Creator\], GES Administrator, \[Sign offs\], \[Approvers\], \[Compliance Approvers\], and GES Higher Approvers. Else if \[Market\] \<\> “EURX” and \[Compliance Operation\] \<\> “”, only users in \[Compliance Operation\], \[Creator\], GES Administrator, \[Sign offs\], \[Approvers\], \[Compliance Approvers\], and GES Higher Approvers. Send notification email as **Email Templates** below, |
|  |  | **Email Templates:** Send mail to Sign Offs as the template below**:** From Current user To \[Sign Off Emails\] Cc N/A Subject Get \[Subject\] of “Email Template” item of which \[Keyword\] \= “Sign Offs” Body Get \[Body\] of “Email Template” item of which \[Keyword\] \= “Sign Offs”  Following is sample email content: Subject "Error \- "+ \[Trader\] \+", "+ \[Trade Date\] \+", EUR "+ \[Euro Equivalent\] Body If author of the item is different from sales person (compared by email) \[Body\] \= "A GES error, reference number” \+ \[Reference Number\] \+ ", entered by” \+ \[Created By\] \+ “on behalf of "+ \[Trader\] \+ "." Else  \[Body\] \= "A GES error, reference number” \+ \[Reference Number\] \+", entered by” \+ \[Created By\] \+ "." \[Body\] \= \[Body\] \+ new 2 lines \[Body\] \= \[Body\] \+ “The GES Error has been sent to the following Sign Offs for approval.” \[Body\] \= \[Body\] \+ new line \[Body\] \= \[Body\] \+ \[Sign Offs\] (one value of \[Sign Offs\] per one line) \[Body\] \= \[Body\] \+ new line \[Body\] \= \[Body\] \+ "Please go to the document by clicking the following link: " \+ new line \[Body\] \= \[Body\] \+ \<\<Link to item\>\> \[Body\] \= \[Body\] \+ "And approve or reject it by clicking the action buttons at the top of the screen."  If \[Error Reason\] \<\> “Technical Fault”, \[Is Error Over Currency Limit\] \= "Yes", send mail to Office Approvers as the template below: From Current user To \[Approver Emails\] Cc N/A Subject Get \[Subject\] of “Email Template” item of which \[Keyword\] \= “Error Over Currency Limit” Body Get \[Body\] of “Email Template” item of which \[Keyword\] \= “Error Over Currency Limit”  Following is sample email content: 	 From Current user To \[Approver Emails\] Cc N/A Bcc N/A Subject "Error \- "+ \[Trader\] \+", "+ \[Trade Date\] \+", EUR "+ \[Euro Equivalent\] Body If the author of the item is different from sales person (compared by email address) then \[Body\] \= "A GES error, reference number” \+ \[Reference Number\] \+ ", entered by” \+ \[Created By\] \+ “on behalf of "+ \[Trader\] \+ "." Else, then \[Body\] \= "A GES error, reference number” \+ \[Reference Number\] \+", entered by” \+ \[Created By\] \+ "." \[Body\] \= \[Body\] \+ new 2 lines \[Body\] \= \[Body\] \+ "This is a large error of "+ \[Amount\] (with format of "0, 0") \+" "+ \[Currency\] \+"." \[Body\] \= \[Body\] \+ new 2 lines \[Body\] \= \[Body\] \+ “The GES Error has been sent to the following Office Sign Offs for sign off."  \[Body\] \= \[Body\] \+ new line \[Body\] \= \[Body\] \+ \[Office Sign Offs\] (one value of \[Office Sign Offs\] per one line) \[Body\] \= \[Body\] \+ new line \[Body\] \= \[Body\] \+ "Please go to the document by clicking the following link: " \+ new line \[Body\] \= \[Body\] \+ \<\<Link to item\>\> Update readable permission for users in \[DB Secretary\] and send mail to them as the template below: From Current user To \[Email Address\] value of “Email Setup” item which \[Email Keyword\] is “DBSecretary” Cc N/A Subject Get \[Subject\] of “Email Template” item of which \[Keyword\] \= “GES Requester to DB Secretary” Body Get \[Body\] of “Email Template” item of which \[Keyword\] \= “GES Requester to DB Secretary”  Following is sample email content: Subject "Error \- "+ \[Trader\] \+", "+ \[Trade Date\] \+", EUR "+ \[Euro Equivalent\] Body If the author of the item is different from sales person (compared by email address) then \[Body\] \= "A GES error, reference number” \+ \[Reference Number\] \+ ", entered by” \+ \[Created By\] \+ “on behalf of "+ \[Trader\] \+ "." Else, then \[Body\] \= "A GES error, reference number” \+ \[Reference Number\] \+", entered by” \+ \[Created By\] \+ "." \[Body\] \= \[Body\] \+ new 2 lines \[Body\] \= \[Body\] \+ “The GES Error has been sent to the following Office Sign Offs for sign off."  \[Body\] \= \[Body\] \+ new line \[Body\] \= \[Body\] \+ \[Office Sign Offs\] (one value of \[Office Sign Offs\] per one line) \[Body\] \= \[Body\] \+ new line \[Body\] \= \[Body\] \+ "Please go to the document by clicking the following link: " \+ new line \[Body\] \= \[Body\] \+ \<\<Link to item\>\>  |

2. # **List Description**

   ![][image2]

   3. # **View Description**

      ![][image3]

3. # **Non-functional Requirements**

## User Access and Security 

|                          SharePoint Group Function / Data | GES Requester | GES Approver | GES Higher Approver | GES Administrator | System Timer |
| :---- | ----- | :---: | ----- | ----- | :---: |
| **Manage “Error Form”** |  |  |  |  |  |
| Create  | X(\*) |  |  |  |  |
| Read(1) | X(\*) | X(\*\*) | X(\*\*) | X |  |
| Update  | X(\*) |  |  | X |  |
| Delete |  |  |  | X |  |
| **Manage “Market”** |  |  |  |  |  |
|    Create, Update, Delete  |  |  |  | X |  |
|    Read  | X | X | X | X |  |
| **Manage “Currency”** |  |  |  |  |  |
|    Create, Update, Delete  |  |  |  | X |  |
|    Read  | X | X | X | X |  |
| **Manage “Contract”** |  |  |  |  |  |
|    Create, Update, Delete  |  |  |  | X |  |
|    Read  | X | X | X | X |  |
| **Manage “Trading Region”** |  |  |  |  |  |
|    Create, Update, Delete  |  |  |  | X |  |
|    Read  | X | X | X | X |  |
| **Manage “Country”** |  |  |  |  |  |
|    Create, Update, Delete  |  |  |  | X |  |
|    Read  | X | X | X | X |  |
| **Manage “Division”** |  |  |  |  |  |
|    Create, Update, Delete  |  |  |  | X |  |
|    Read  | X | X | X | X |  |
| **Manage “Product”** |  |  |  |  |  |
|    Create, Update, Delete  |  |  |  | X |  |
|    Read  | X | X | X | X |  |
| **Manage “Office”** |  |  |  |  |  |
|    Create, Update, Delete  |  |  |  | X |  |
|    Read  | X | X | X | X |  |
| **Manage “Employee”** |  |  |  |  |  |
|    Create, Update, Delete  |  |  |  | X |  |
|    Read  | X | X | X | X |  |
| **Manage “Error Account”** |  |  |  |  |  |
|    Create, Update, Delete  |  |  |  | X |  |
|    Read  | X | X | X | X |  |
| **Manage “Email Setup”** |  |  |  |  |  |
|    Create, Update, Delete  |  |  |  | X |  |
|    Read  | X | X | X | X |  |
| **Manage “Reason”** |  |  |  |  |  |
|    Create, Update, Delete  |  |  |  | X |  |
|    Read  | X | X | X | X |  |
| Submit Error Form | X(\*) |  |  |  |  |
| Resubmit Error Form | X(\*) |  |  |  |  |
| Approve by Sign Off  |  | X(\*\*) |  |  |  |
| Reject by Sign Off |  | X(\*\*) |  |  |  |
| Approve by Approver |  | X(\*\*) |  |  |  |
| Reject by Approver |  | X(\*\*) |  | \` |  |
| Approve by Compliance Approver |  | X(\*\*) |  |  |  |
| Reject by Compliance Approver |  | X(\*\*) |  |  |  |
| Approve by Higher Approver |  |  | X(\*\*) |  |  |
| Reject by Higher Approver |  |  | X(\*\*) |  |  |
| Archive Contract |  |  |  | X |  |
| Unlock Document |  |  |  | X |  |
| Report by Specified Date |  |  |  | X |  |
| Import DBIRSREF |  |  |  | X |  |
| Archive Error Forms |  |  |  |  | X |
| Reset Report Number |  |  |  |  | X |
| Export Approved Error |  |  |  |  | X |

X: User has full permission to do the action.

X(\*): User has permission to do the action on his own items.

X(\*\*):  User has permission to do the action on items sent to him only.

X (1): reading permission is specified for each Error Form item regarding to Location of the item. For example, items, which have Location \= “London”, are only read by employees of the location.

## Performance Requirements

**Number of user**

* Number of concurrent user:  
* Number of business user:

**Data volume**

* Number of documents:  
* Data growth rate:

**Level of availability**

\[Availability level required for this application\]

\[24\*7, 24\*7, 24\*5, 8\*5, Less\]

**Usage frequency**

\[(Hourly, Daily, Weekly, Monthly, Quarterly, Annually, Ad hoc)\]

## Implementation Requirements

\[Information in this section can be retrieved from the interview form\]

**Location**

\[The location where this SharePoint website will be deployed\]

\[Example: Europe\]

**Read-only Duration**	

\[The duration this application can be set to read-only\]

\[Example: 1 day would be preferred, lots of users to coordinate with if we needed to shot down for more than that.\]

**Read-only Timeframe**	

\[The time-frame this application can be set to read-only\]

\[Example: Usually biz hours for new entry but research go on at all times.  Also, it spans US and India hours.\]

**Maintenance Window**	

\[The duration this application can be set to read-only\]

\[Example: (Hourly, Daily, Weekly, Monthly, Quarterly, Annually, Ad hoc)\]

**Overall conversion timeline**

 \[Example: 1st, 15th and 25th of every month, the US users are payment dates.\]

**Other plans and activities**

\[N/A\]	

4. # **Other Requirements**

## Archive Function

\[Enable Archival Function for following list:

| List | Actor | Condition |
| :---- | :---- | :---- |
| *List name* | *Actor name* | *Actor* is able to archive item in “*list name*” list by created date. |

\[For details, refer to section 6.4 Reference.\]

## Security Audit Function

\[Enable Security Audit Function for {Actor name} to tracking any modification on user’s permission.\]

5. # **Các yêu cầu hệ thống**

## Custom Pages

\[If there is no custom page, remove the table and use this sentence:

There is no custom page implemented in this application.\]

| \# | Page Name | Description |
| :---- | :---- | :---- |
| *1* |  |  |
| *2* |  |  |
| *3* |  |  |

## Scheduled Agents

\[If there is no scheduled agent, remove the table and use this sentence:

There is no scheduled agent implemented in this application.\]

| No. | Name | Description | Rule | Agent Main Class |
| :---- | :---- | :---- | :---- | :---- |
| 1 |  |  |  |  |
| *2* |  |  |  |  |
| *3* |  |  |  |  |

## Technical Concern

\[List all factors that can affect the performance of application such as

- Growth Rate is low \=\> less risk in performance  
- Huge amount of data \=\> saving/loading issue  
- Too much content is in a single page  
- Integrate to another systems  
- …\]

6. # **Appendixes**

## Glossary

The list below contains all the necessary terms to interpret the document, including acronyms and abbreviations.

| Term | Description |
| :---- | :---- |
| *BR* | **B**usiness **R**ule |
| *CBR* | **C**ommon **B**usiness **R**ule |
| *DB* | Notes **D**ata**b**ase |
| *MSG* | **M**es**s**a**g**e |
| *UC* | **U**se **C**ase |
| *N/A* | **N**ot **A**vailable or **N**ot **A**pplicable, used to indicate when information in a certain section could not be provided because it does not apply to this application. |
| *UI* | **U**ser **I**nterface |
| *SRS* | **S**oftware **R**equirements **S**pecification |
| *TBD* | **T**o **b**e **d**etermined or **t**o **b**e **d**efined |

## 

## Messages

This section describes the details of messages used in business rules e.g. error messages, confirmation messages, etc.

| Message Code | Message Content | Button |
| :---- | :---- | :---- |
| *MSG 1*  | SP10 Standard mandatory fields message: "You must specify a value for this required field" |  |
| MSG 2 | SP10 Standard unique value message “This value already exists in the list.” |  |
| MSG 3 | End Date should be greater than the start date. |  |
| MSG 4 | "Compliance ops viewers updated in the readers field successfully." |  |
| MSG 5 | “The CSV file should contain 'EVENTID' in second column and 'DBIRSREF' in third column.” |  |
| MSG 6 | "Do you wish to save the document? This will forward an E-Mail to your Sign Offs for approval." |  |
| MSG 7 | “You must select a correct combination of Market and Contract. If a correct combination is selected the currency in which that contact was traded is shown." |  |
| MSG 8 | "Do you wish to approve this Future & Options Error?" | OK/Cancel |
| MSG 9 | “Do you wish to reject this Future & Options Error?” | OK/Cancel |
| MSG 10 | “Cannot find any names.  Please contact the database administrator." |  |
| MSG 11 | “You must enter a two letter country code.” |  |
| MSG 12 | “There seems to be a problem with the Euro Rate for the current Market and Contract.  Please contact the database administrator.” |  |
| MSG 13 | “Please select an Employee\!” |  |

## Issues List

N/A

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>

[image3]: <data:image/png;base64,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>