# Sequence Add New Booking for Trip

```plantuml
@startuml
autonumber

actor Staff as S
boundary TripDetailView as TDV
boundary AddBookingView as ABV
control BookingController as BC
entity BOOKING as B

S -> TDV: Click "Add Booking"
activate S
activate TDV
TDV -> ABV: Navigate to booking form
deactivate TDV
activate ABV
ABV -> ABV: Display booking form
activate ABV
deactivate ABV

S -> ABV: Enter booking details
S -> ABV: Submit booking
deactivate S
ABV -> ABV: Validate data
activate ABV
deactivate ABV

break Invalid data
  ABV -> ABV: Display error notification
  activate ABV
  deactivate ABV
end

ABV -> BC: Send booking request
activate BC
BC -> B: Check seat availability
activate B
B -> B: Query available seats
activate B
deactivate B

break Insufficient seats
  BC <-- B: Error notification
  ABV <-- BC: Error notification
  ABV -> ABV: Display error message
  activate ABV
  deactivate ABV
end

BC <-- B: Seats available
BC -> B: Create booking
B -> B: Store booking data
activate B
deactivate B
BC <-- B: Success notification
deactivate B
ABV <-- BC: Success notification
deactivate BC
ABV -> ABV: Display success message
activate ABV
deactivate ABV
deactivate ABV

@enduml
```

<!-- diagram id="sequence-manage-trips-add-new-booking-for-trip" -->
