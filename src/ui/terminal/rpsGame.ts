import type { Move, RLinterface } from '../../rps/types.js';
import { playGame } from '../../rps/rps.js';

let readline = {} as RLinterface;
export const initGame = (rl: RLinterface) => {
    readline = rl;
    console.log('Welcome to Rock, Paper, Scissors!');
    console.log('Choose a game mode:');
    console.log('1. Human vs Human');
    console.log('2. Human vs Computer');
    console.log('3. Computer vs Computer');
    console.log('Type "exit" anytime to exit the application.');

    rl.question('Enter your choice (1, 2, or 3): ', (choice: string) => {
        if (choice === '1') {
            console.log('Human vs Human mode selected.');
            rl.question('Enter Player 1 move (rock, paper, scissors): ', (move1: string) => {
                rl.question('Enter Player 2 move (rock, paper, scissors): ', (move2: string) => {
                    startHvsH(move1 as Move, move2 as Move);
                });
            });
        } else if (choice === '2') {
            console.log('Human vs Computer mode selected.');
            rl.question('Enter Player 1 move (rock, paper, scissors): ', (move1: string) => {
                startHvsC(move1 as Move);
            });
        } else if (choice === '3') {
            startCvsC();
        } else if (choice.toLowerCase() === 'exit') {
            console.log('Exiting the application...');
            rl.close();
        } else {
            console.log('Invalid choice! Please enter 1, 2, or 3.');
            initGame(rl);
        }
    });
};

const startHvsH = (move1: Move, move2: Move) => {
    playGame(move1, move2);
    promptExit(readline);
};

const startHvsC = (move1: Move) => {
    playGame(move1);
    promptExit(readline);
};

const startCvsC = () => {
    console.log('Computer vs Computer mode selected.');
    playGame();
    promptExit(readline);
};

const promptExit = (rl: RLinterface) => {
    rl.question('Do you want to play again? (yes/no): ', (answer: string) => {
        if (answer.toLowerCase() === 'yes') {
            initGame(rl);
        } else {
            console.log('Exiting the application...');
            rl.close();
        }
    });
};

export default initGame;
