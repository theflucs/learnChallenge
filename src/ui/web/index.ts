import {playRPSgame} from './initGame.js';
import {initToggleGamesMenu} from './toggleMainMenu.js';

document.addEventListener('DOMContentLoaded', () => {
  initToggleGamesMenu();
  playRPSgame();
});
