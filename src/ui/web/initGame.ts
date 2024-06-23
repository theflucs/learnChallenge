import type {Move} from '../../rps/types.js';
import {handlePlayerMove, resetGame, selectMode} from './utils.js';

export const playRPSgame = () => {
  chooseGameMode();
  resetGame();
};

function chooseGameMode() {
  const modeButtons = document.querySelectorAll(
    '.mode-button',
  ) as NodeListOf<HTMLButtonElement>;
  modeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      selectMode(event);
    });
  });

  const moveButtons = document.querySelectorAll(
    '.move-button',
  ) as NodeListOf<HTMLButtonElement>;
  moveButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const target = event.target as HTMLButtonElement;
      const player = parseInt(target.dataset.player || '0');
      const move = target.dataset.move as Move;
      handlePlayerMove(player, move);
    });
  });
}
