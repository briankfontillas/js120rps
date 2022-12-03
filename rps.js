const readline = require("readline-sync");

function createPlayer() {
  return {
    move: null,
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
  human: createHuman('human'),
  computer: createComputer('computer'),

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors!");
  },

  displayGoodbyeMessage() {
    console.log("Thank you for playing. Goodbye!");
  },

  displayWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`Computer chose: ${this.computer.move}`);
  },

  playAgain() {
    console.log("Would you like to play again? (y/n)");
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    while (true) {
      this.displayWelcomeMessage();
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();

  },
};

RPSGame.play();