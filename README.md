# Unit2-Puppy-Bowl
Unit 2 Puppy Bowl - not Fork

Api:

GET POST DELETE

Contains -

https://fsa-puppy-bowl.herokuapp.com/api/2405-ftb-et-web-ft/players

Individual Puppy
* Id
* name
* breed
* status
* imageUrl
* createdAt
* updatedAt
* teamId
* cohortId

https://fsa-puppy-bowl.herokuapp.com/api/2405-ftb-et-web-ft/teams

Puppy Team
* Id
* name
* score
* createdAt
* updatedAt
* cohortId
* List of players

TODO:

For Puppy:
* Create 
* Delete (includes deleting from current team)
* Add to Team
* Remove from Team
* View individually. - rendered with a card element

For Team:
* Add 
* Delete 
* Add Puppy to team
* Remove Puppy from Team
* View Team

Visually/CSS :
* Form is styled and easy to use
* Player cards are styled and easy to use
* Team display is styled and easy to use

JavaScript:
* DOM to generate and manipulate HTML and styles as needed
* Use functions to isolate and reuse - code

TestScript: 
* Create Test for fetchingSinglePlayer, addNewPlayer, removePlayer
* Each Describe should contain at least one test
* Complete api functions in script.js so test cases pass npm test
