const readline = require("readline-sync");
const WINNING_SCORE = 3;
const WINNING_MOVES = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['spock', 'paper'],
  spock: ['rock', 'scissors']
};
const CHOICES_LIST = Object.keys(WINNING_MOVES);

function createPlayer() {
  return {
    move: null,
    history: [],
    score: 0,

    addPoint() {
      this.score += 1;
    },

    reset() {
      this.score = 0;
    },
  };
}

function createComputer() {
  let playerObject = createPlayer();
  let computerObject = {

    choices: CHOICES_LIST,
    loss: null,

    choose() {
      let randomIndex = Math.floor(Math.random() * this.choices.length);
      this.move = this.choices[randomIndex];
      this.history.push(this.move);
    },

    //modify the weight against each move after an opponent loss
    modChoice() {
      let finalChoices = [];

      CHOICES_LIST.forEach(move => {
        if (!this.loss.includes(move)) finalChoices.push(move);
      });

      return this.choices.concat(finalChoices);
    },

    lastLoss(humanMove) {
      this.loss = WINNING_MOVES[humanMove];
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
        if (CHOICES_LIST.includes(choice)) break;
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
  cpu: createComputer(),


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
    let computerMove = this.cpu.move;

    console.log(`Your move: ${humanMove} | Computer move: ${computerMove}`);

    //human win conditions
    if (WINNING_MOVES[humanMove].includes(computerMove)) {
      console.log('You win the round!');
      this.human.addPoint();
      this.cpu.lastLoss(humanMove);
      if (this.cpu.loss !== null) this.cpu.choices = this.cpu.modChoice();
    //cpu win conditions
    } else if (!WINNING_MOVES[humanMove].includes(computerMove) &&
               humanMove !== computerMove) {
      console.log("Computer wins the round!");
      this.cpu.addPoint();
    //tie condition
    } else {
      console.log("It's a tie");
    }

    console.log(`Current Score:\nPlayer: ${this.human.score} | Computer: ${this.cpu.score}`);
  },

  playAgainResponses() {
    const leadingSubstrings = str => {
      let final = [];

      for (let index = 1; index <= str.length; index += 1) {
        let substring = str.slice(0, index);
        final.push(substring);
      }

      return final;
    };
    const valid = ['yes', 'no'];

    return valid.map(word => leadingSubstrings(word)).flat();
  },

  playAgain() {
    let answer;
    let winner = this.human.score > this.cpu.score ? 'Player' : 'Computer';
    console.log(`The winner of the Match is ${winner}!`);
    console.log("------------");

    while (true) {
      console.log("Would you like to play again? (y/n)");
      answer = readline.question("");

      if (this.playAgainResponses().includes(answer)) {
        return answer[0].toLowerCase() === 'y';
      } else {
        console.log(`${answer} is not a valid answer.`);
      }
    }
  },

  checkWinner() {
    return [this.human.score, this.cpu.score].includes(WINNING_SCORE);
  },

  resetScores() {
    console.clear();
    this.human.reset();
    this.cpu.reset();
  },

  play() {
    this.displayWelcomeMessage();

    while (!this.checkWinner()) {
      this.human.choose();
      this.cpu.choose();
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