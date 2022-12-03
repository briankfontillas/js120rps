const readline = require("readline-sync");
const WINNING_SCORE = 3;
const WINNING_MOVES = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['spock', 'paper'],
  spock: ['rock', 'scissors']
};
const CHOICES = Object.keys(WINNING_MOVES);

function createPlayer() {
  return {
    move: null,
    history: [],
    score: 0,
  };
}

function createComputer() {
  let playerObject = createPlayer();
  let computerObject = {
    choose() {
      let randomIndex = Math.floor(Math.random() * CHOICES.length);
      this.move = CHOICES[randomIndex];
      this.history.push(this.move);
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();
  let humanObject = {
    choose() {
      readline.question("Press enter to continue...");
      let choice;

      while (true) {
        console.log('Please choose rock, paper, scissors, lizard, or spock');
        choice = readline.question();
        if (CHOICES.includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
      this.history.push(choice);
    }
  };

  return Object.assign(playerObject, humanObject);

}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),


  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Rock, Paper, Scissors, Lizard, Spock!");
  },

  displayGoodbyeMessage() {
    console.log("Thank you for playing. Goodbye!");
  },

  displayWinner() {
    console.clear();
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`Your move: ${humanMove} | Computer move: ${computerMove}`);

    //human win conditions
    if (WINNING_MOVES[humanMove].includes(computerMove)) {
      console.log('You win the round!');
      this.human.score += 1;
    //computer win conditions
    } else if (!WINNING_MOVES[humanMove].includes(computerMove) &&
               humanMove !== computerMove) {
      console.log("Computer wins the round!");
      this.computer.score += 1;
    //tie condition
    } else {
      console.log("It's a tie");
    }

    console.log(`Current Score:\nPlayer: ${this.human.score} | Computer: ${this.computer.score}`);
  },

  playAgain() {
    let winner = this.human.score > this.computer.score ? 'Player' : 'Computer';
    console.log(`The winner of the Match is ${winner}!`);
    console.log("------------");
    console.log("Would you like to play again? (y/n)");
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  checkWinner() {
    return [this.human.score, this.computer.score].includes(WINNING_SCORE);
  },

  resetScores() {
    this.human.score = 0;
    this.computer.score = 0;
  },

  play() {
    this.displayWelcomeMessage();

    while (!this.checkWinner()) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (this.checkWinner()) {
        if (this.playAgain()) {
          this.resetScores();
        } else {
          break;
        }
      }
    }

    this.displayGoodbyeMessage();

  },
};

RPSGame.play();