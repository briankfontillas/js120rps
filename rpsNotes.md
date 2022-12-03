# Keeping score

## Problem

Right now, the game doesn't have any dramatic flair. It would be more interesting if we were playing up to, say, 5 points. Whoever reaches 5 points first wins. Can you build this functionality? We have a new noun -- a score. Is that a new object type, or a state of an existing class? Explore both options and see which works better.

" We have a new noun -- a score. Is that a new object type, or a state of an existing class? Explore both options and see which works better."

1. New obj type:

"playerobjects"
state
- move
- score (initially 0)

behavior
- choosing a move

"gameobject"
state
- player
- computer

behaviors

[displays]
play flow (keep going until 1 player reaches the max score)
- players choose
- compare
- win or lose
    a. add 1 to the player that won
- play again

steps
1. add a score property initialized to the value of 0 in the createPlayer factory
2. Re-structure the flow of play()
    a. while no players are at X points yet, keep playing
3. Within the comparison, add 1 point to the appropriate winning player
4. Before the loop ends, ask user if they want to play again
    - If yes, reset scores to 0
    - If no, continue to end the loop

----------------------------

## Problem

This variation on the regular Rock, Paper, Scissors game adds two additional options - Lizard and Spock. The full explanation and rules are here: http://www.samkass.com/theories/RPSSL.html

- I looked at my previous rpsls project and used the logic there
1. create an object that has the different choices as keys, and their values as what they would win against
2. implemented this object into the choice and comparison methods

## Problem

As long as the user doesn't quit, keep track of a history of moves by both the human and computer. Which data structure will you use? Will you use a new object or an existing object? How will you display it?

- in the object that creates th initial moves property, i will insert a new property for the move history.
- This will be an array

- within the choose() method, i will insert a way to push each chosen move into the property array

## Problem

Come up with some rules based on the history of moves to help the computer make its moves. For instance, if the human tends to win over 60% of his hands when the computer chooses "rock," then decrease the likelihood that the computer will choose "rock." First, come up with an appropriate rule, then implement some history analysis. Use the analysis to adjust the weight of each choice -- for instance, increase the weight to increase the likelihood of choosing a particular move. Currently, the computer has a 33% chance of making any given move -- it's those odds that you need to weight. Finally, have the computer consider the weight of each choice when choosing a move.