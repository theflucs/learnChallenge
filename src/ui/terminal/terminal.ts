import * as readline from 'readline';
import type { Move } from '../../rps/types.js';
import { playGame } from '../../rps/rps.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const initGame = () => {
    console.log('Welcome to Rock, Paper, Scissors!');
    console.log('Choose a game mode: 1. Human vs Human 2. Human vs Computer 3. Computer vs Computer');
    console.log('Type "exit" anytime to exit the application.');

    rl.question('Enter your choice (1, 2, or 3): ', (choice) => {
        if (choice === '1') {
            console.log('Human vs Human mode selected.');
            rl.question('Enter Player 1 move (rock, paper, scissors): ', (move1) => {
                rl.question('Enter Player 2 move (rock, paper, scissors): ', (move2) => {
                    startHvsH(move1 as Move, move2 as Move);
                });
            });
        } else if (choice === '2') {
            console.log('Human vs Computer mode selected.');
            rl.question('Enter Player 1 move (rock, paper, scissors): ', (move1) => {
                startHvsC(move1 as Move);
            });
        } else if (choice === '3') {
            startCvsC();
        } else if (choice.toLowerCase() === 'exit') {
            console.log('Exiting the application...');
            rl.close();
        } else {
            console.log('Invalid choice! Please enter 1, 2, or 3.');
            initGame(); // Restart game initialization
        }
    });
};

const startHvsH = (move1: Move, move2: Move) => {
    playGame(move1, move2);
    rl.close();
};

const startHvsC = (move1: Move) => {
    playGame(move1);
    rl.close();
};

const startCvsC = () => {
    console.log('Computer vs Computer mode selected.');
    playGame();
    rl.close();
};


// Export the initGame function to be able to call it externally
export default initGame;
