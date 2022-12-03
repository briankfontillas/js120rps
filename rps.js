const readline = require("readline-sync");
const WINNING_SCORE = 3;

function createPlayer() {
  return {
    move: null,
    score: 0,
  };
}

function createComputer() {
  let playerObject = createPlayer();
  let computerObject = {
    choose() {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();
  let humanObject = {
    choose() {
      readline.question("Press enter to continue...");
      const MOVES = ['rock', 'paper', 'scissors'];
      let choice;

      while (true) {
        console.log('Please choose rock, paper, or scissors');
        choice = readline.question();
        if (MOVES.includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    }
  };

  return Object.assign(playerObject, humanObject);

}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Rock, Paper, Scissors!");
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
    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'paper' && computerMove === 'rock') ||
        (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You win the round!');
      this.human.score += 1;
    //computer win conditions
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
               (humanMove === 'paper' && computerMove === 'scissors') ||
               (humanMove === 'scissors' && computerMove === 'rock')) {
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