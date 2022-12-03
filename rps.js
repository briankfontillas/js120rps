const readline = require("readline-sync");

function createPlayer(playerType) {
  return {
    playerType,
    move: null,

    isHuman() {
      return this.playerType === 'human';
    },

    choose() {
      if (this.isHuman()) {
        let choice;
        const MOVES = ['rock', 'paper', 'scissors'];

        while (true) {
          console.log('Please choose rock, paper, or scissors');
          choice = readline.question();
          if (MOVES.includes(choice)) break;
          console.log('Sorry, invalid choice.');
        }

        this.move = choice;
      } else {
        const choices = ['rock', 'paper', 'scissors'];
        let randomIndex = Math.floor(Math.random() * choices.length);
        this.move = choices[randomIndex];
      }
    },
  };
}

const RPSGame = {
  human: createPlayer('human'),
  computer: createPlayer('computer'),

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