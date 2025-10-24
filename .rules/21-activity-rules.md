# Activity Rules

- Write diagram in activity PlantUML syntax
- There are only two swimlanes: the first is the system swimlane |S|, and the second is the actor’s swimlane (which can be customer, admin, or staff).
- The system swimlane |S| only represents the actions: display _, verify _, update _, notify _.
  The actions of the actor are usually select, enter information, submit information, click button "..." to confirm, or check the intention to continue, or represent real-world operations that are not computer behaviors, meaning input-type functions.
  Always make sure that each action is placed in the correct swimlane to which it belongs.
- Every node in the diagram must be connected to another node and be connected from another node, except for the start node and the end node.
- The names of action nodes should follow the structure: verb + noun / noun phrase. Condition nodes should also use verbs with meanings such as check, verify, etc.
- Only use if - else (not if - else if) and repeat - repeat while statements. The branch labels should also be written with an uppercase first letter, such as Yes, No, or Valid, Invalid.
- The start node and end node must always be in the actor’s swimlane.
- The first action can be select function \_\_\_ (similar or identical to the use case name, for example, select function ABC...).
- The final action can be confirm notification.
  For example, if the system displays a success message, the customer confirms the success, or simply confirms the end (instead of confirming the end of the use case), and then the end node follows.
- There must be only one start node and one end node; therefore, if any exceptions occur, they should be represented as a repeat - repeat while loop.
- The folder which only has 1 file in that folder, same filename as the folder is a special activity. It isn't generic use case, but a single use case.
- Do not use notes. Nodes should have more explicit content.
- Add "\n" to create a line break for nodes with content that is too long, for example:
  "Display no bookings message with explore tours button;" → "Display no bookings message \n with explore tours button;".
- An activity should not exceed 15 lines (a line is counted when there is at least one node on that line).
There should be no more than two nodes on the same line within the same swimlane.
If there are more nodes, they should be grouped together to shorten the diagram, and the content of each node should not be too long.