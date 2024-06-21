import mainMenu from './mainMenu.js';
import { foobar } from '../../foobar/foobar.js';
import type { RLinterface } from '../../rps/types.js';

export const initGame = (rl: RLinterface) => {
    console.log('Welcome to Foobar!');
    foobar();
    rl.question('Press Enter to return to the main menu.', () => {
        mainMenu();
    });
};

export default initGame;
