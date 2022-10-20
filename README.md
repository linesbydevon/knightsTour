# JUGR-KNOT
A chess-based puzzle game

## About
JUGR-KNOT is a strategy game based on the chess concept of a Knight's Tour. A Knight's Tour is a sequence of movements by a single knight that results in every square on the chess board being occupied exactly once.

## How to play

### Single Player

Your mission is simple—attempt to disable every single square on a grid size of your choosing. Starting at level 1 is a good idea but it's your choice. You lose if you run out of valid moves before disabling all squares on the grid.

### Multiplayer

Battle head to head with a friend—or enemy—to determine who is the most cunning knight. The first player to run out of valid moves loses.

## Style guide

Please adhere to these guidelines for the immediate future when developing new features or refactoring code.

### Typography

#### Inconsolata

Inconsolata is a monospace font that enables equal spacing on each side of the knot logo in the JUGR-KNOT lock up. As of now it should only be used in this capacity. 

Importing and using Inconsolata in CSS:

```
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@800&display=swap');
font-family: 'Inconsolata', monospace;
```

[Read more about Inconsolata](https://fonts.google.com/specimen/Inconsolata/about?query=incon&preview.text=JUGR-KNOT&preview.text_type=custom)

#### Helvetica

Helvetica should be the first font-family listed in all element stacks, absent the JUGR-KNOT lock up. Absent Helvetica, Arial is an appropriate substitute. This is necessary as we are not currently importing Helvetica.

Required font-stack:

```
font-family: helvetica, arial, sans-serif;
```

### Spacing

### Color

#### Darkmode

#### Lightmode

## Roadmap

### History

- Initial logic for proof of concept
- Initial layout in HTML/CSS
- Responsivity for mobile
- Dropdown menu for selection of various levels of difficulty
- Toggle button that displays moves history for current game
- Toggle button for switching between multiplayer
- Initial logic for multiplayer gameplay
- Toggle input for darkmode/lightmode

### Future

- Refactor code for improved abstraction so as to maximize efficiency and minimize complexity
- Functionality that enables users to copy moveslist to clipboard with a click/tap instead of hightlighting and copying a list
- Develop and implement better articulated style guide for lightmode and darkmode
- Make info section/subsections collapsable/expandable
- Add a timer function and score to foster competition among users
- Add ability to create an account/profile for additional features:
  - Saving and reviewing the moves list for previous games
  - Ranking users by score/time on each level
  - Enabling users to play against eachother in multiplayer mode
- Create new grids of uneven dimensions
  - Rectangles
  - Grids with gaps/obstacles that require more precise tour execution to navigate

