import type { RLinterface } from '../../rps/types.js';
import { initGame as initRPSGame } from './rpsGame.js';
import { initGame as initFoobarGame } from './foobarGame.js';
import * as readline from 'readline';

const rl: RLinterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const mainMenu = () => {
    console.log('Welcome to the Game Menu!');
    console.log('Choose a game to play:');
    console.log('1. Rock, Paper, Scissors');
    console.log('2. Foobar');
    console.log('Type "exit" anytime to exit the application.');

    rl.question('Enter your choice (1, 2, or "exit"): ', (choice) => {
        if (choice === '1') {
            initRPSGame(rl);
        } else if (choice === '2') {
            initFoobarGame(rl);
        } else if (choice.toLowerCase() === 'exit') {
            console.log('Exiting the application...');
            rl.close();
        } else {
            console.log('Invalid choice! Please enter 1, 2, or "exit".');
            mainMenu();
        }
    });
};

export default mainMenu;
