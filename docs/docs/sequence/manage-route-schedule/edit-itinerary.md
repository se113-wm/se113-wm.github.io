# Sequence Edit Itinerary

```plantuml
@startuml
autonumber

actor Admin as A
boundary RouteScheduleView as RSV
control RouteScheduleController as RSC
entity ROUTE_ATTRACTION as RA

A -> RSV: Click "Edit" on attraction
activate A
activate RSV
RSV -> RSC: Request edit itinerary
activate RSC
RSC -> RA: Check route status
activate RA
RA -> RA: Query route status

break Route closed
  RSC <-- RA: Error notification
  RSV <-- RSC: Error notification
  RSV -> RSV: Display error message
  activate RSV
  deactivate RSV
end

RSC <-- RA: Route editable
RSC -> RA: Get itinerary details
RA -> RA: Query route attraction

break Itinerary not found
  RSC <-- RA: Error notification
  RSV <-- RSC: Error notification
  RSV -> RSV: Display error message
  activate RSV
  deactivate RSV
end

RSC <-- RA: Itinerary data
deactivate RA
RSV <-- RSC: Itinerary details
deactivate RSC
RSV -> RSV: Display edit form
activate RSV
deactivate RSV

A -> RSV: Edit itinerary details
A -> RSV: Click save
deactivate A
RSV -> RSV: Validate data
activate RSV
deactivate RSV

break Invalid data
  RSV -> RSV: Display error notification
  activate RSV
  deactivate RSV
end

RSV -> RSC: Send update request
activate RSC
RSC -> RA: Update itinerary
activate RA
RA -> RA: Update route attraction
RSC <-- RA: Success notification
deactivate RA
RSV <-- RSC: Success notification
deactivate RSC
RSV -> RSV: Display success message
activate RSV
RSV -> RSV: Reload schedule
deactivate RSV
deactivate RSV

@enduml
```

<!-- diagram id="sequence-manage-route-schedule-edit-itinerary" -->
