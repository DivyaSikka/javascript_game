# Chorus Lapilli

This is a React-based implementation of **Chorus Lapilli**, a variant of the ancient Roman board game Terni Lapilli. The game is structurally similar to Tic-Tac-Toe, but with an added strategic twist: after the initial placement phase, players must move existing pieces instead of placing new ones.

This project was developed as part of an assignment, with the goal of building a simple interactive game application using React. The emphasis is on building the app from scratch, maintaining a detailed build log, and writing a small set of automated frontend tests using Selenium.

## Game Description

Chorus Lapilli is played on a 3×3 grid. Two players take turns and aim to align three of their symbols in a row, column, or diagonal. However, the game introduces two key differences from Tic-Tac-Toe:

1. After each player has placed three pieces, they must **move** one of their existing pieces to an **adjacent empty square**. The player always maintains exactly three pieces on the board.

2. If a player is about to make a move and they already have three pieces on the board, and **one of their pieces is in the center square**, then:
   - Their move must either result in an immediate win, or
   - Vacate the center square.

## Implementation Overview

This app is built using React functional components and 'useState' for managing game state. Key functions and logic include:

- **Placement and movement phases** based on the number of total pieces on the board.
- **Enforcement of adjacency** when moving a piece.
- **Restriction rules** based on piece position and potential to win.
- **Win detection** through standard Tic-Tac-Toe line checks.

### Core Components

- 'Square': Individual square component of the 3x3 board.
- 'Board': Main game controller that handles state, rules, and rendering.

### Logic Helpers

- 'checkSix': Determines if six pieces have been placed, signaling the start of the movement phase.
- 'checkAdjacent': Enforces adjacency movement rules.
- 'isCenterOrWin': Checks whether the selected piece is in the center or could result in a win.
- 'nextMoveWin' and 'winInSingleMove': Handle win validation before allowing a move.

## Project Goals and Learning Objectives

This assignment was designed to help students:

- Understand and implement a complete front-end app using React.
- Build from a basic tutorial and extend it to include custom logic and gameplay.
- Record a build log to ensure reproducibility of their work.
- Write and run Selenium-based automated tests.
- Practice using `npm` and packaging tools like `npm pack`.

## Setup Instructions

To run the app locally:

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm start` to launch the app in development mode.

To package the app:

```bash
npm pack --dry-run  # Check contents
npm pack            # Create chorus-lapilli.tgz
