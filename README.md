# LS-JS120 Rock, Paper, Scissors!

- This is a command line version of the game "Rock, Paper, Scissors" which uses OOP principals

## Rules

1. Player chooses between rock, paper scissors, lizard, or spock (r, p, s, l, sp)
2. Computer will then choose at random
3. Results are displayed
4. The game will keep going until one of the players meets the winning score, which is currently set to 3
5. After a win game condition is met, the user will be asked if they'd like to play again

## Features added

- There is not a property for each player that contains data on their move history
- AI chooses carefully based off moves they have lost against
    - There is now a property that includes the moves within an array that lose against the human's previous winning move. This array is then used to concatenate the current array of moves with an array that doesnt include elements that are within this properties array. Doing this increases the chances of the elements that are not within the lastLoss property, and decreases the chance of the computer choosing the ones that ARE within that property.

