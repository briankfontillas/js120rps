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

    currentChoices: CHOICES,
    lastLoss: null,

    choose() {
      let randomIndex = Math.floor(Math.random() * this.currentChoices.length);
      this.move = this.currentChoices[randomIndex];
      this.history.push(this.move);
    },

    //modify the weight against each move after an opponent loss
    modifyChoices() {
      let finalChoices = [];

      CHOICES.forEach(move => {
        if (!this.lastLoss.includes(move)) finalChoices.push(move);
      });

      return this.currentChoices.concat(finalChoices);
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
        choice = this.convertMove(readline.question());
        if (CHOICES.includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
      this.history.push(choice);
    },

    //converts single letter moves to their perspective whole words
    convertMove(move) {
      if (move.toLowerCase() === 'sp') {
        return 'spock';
      } else {
        switch (move.toLowerCase()) {
          case 'r': return 'rock';
          case 'p': return 'paper';
          case 's': return 'scissors';
          case 'l': return 'lizard';
          default:
            return move.toLowerCase();
        }
      }
    },
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
      this.computer.lastLoss = WINNING_MOVES[humanMove];
      if (this.computer.lastLoss !== null) {
        this.computer.currentChoices = this.computer.modifyChoices();
      }
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
    return answer.split("").every(letter => 'yes'.includes(letter.toLowerCase())) &&
           answer.length > 0;
  },

  checkWinner() {
    return [this.human.score, this.computer.score].includes(WINNING_SCORE);
  },

  resetScores() {
    console.clear();
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