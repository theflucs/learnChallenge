import {playRPSgame} from './rockPaperScissorsGame.js';
import {initToggleGamesMenu} from './toggleGamesMenu.js';

document.addEventListener('DOMContentLoaded', () => {
  initToggleGamesMenu();
  playRPSgame();
});
