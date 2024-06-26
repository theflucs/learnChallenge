import {foobar} from '../../foobar/foobar.js';
import {isValidMove, playGame} from '../../rps/rps.js';
import type {GameMode, Move, Result} from '../../rps/types.js';

// DOM elements declaration
const gameModeContainer = document.getElementById(
  'game-mode-container',
) as HTMLDivElement;
const gameDeck = document.getElementById('game-deck') as HTMLDivElement;
const player1Moves = document.getElementById('player1-moves') as HTMLDivElement;
const player2Moves = document.getElementById('player2-moves') as HTMLDivElement;
const player1Move = document.getElementById('player1-move') as HTMLSpanElement;
const player2Move = document.getElementById('player2-move') as HTMLSpanElement;
const computerPlaceholder = document.getElementById(
  'computer-placeholder',
) as HTMLDivElement;
const computersPlaceholder = document.getElementById(
  'computers-placeholder',
) as HTMLDivElement;
const gameResultElement = document.getElementById(
  'game-result',
) as HTMLHeadingElement;
const playAgainButton = document.getElementById(
  'play-again-button',
) as HTMLButtonElement;

let selectedMode: GameMode | null = null;

export const selectMode = (event: MouseEvent) => {
  if (event.target instanceof HTMLButtonElement) {
    selectedMode = event.target.dataset.mode as GameMode;
    makeGameDeck(selectedMode);
    if (selectedMode === 'CvsC') {
      computerVScomputer();
    }
  }
};

function computerVScomputer() {
  setTimeout(() => {
    const {player1, player2, result} = playGame();
    player1Move.textContent = player1.toUpperCase();
    player1Move.style.display = 'inline';
    player2Move.textContent = player2.toUpperCase();
    player2Move.style.display = 'inline';
    gameResultElement.textContent = result;
    gameResultElement.style.display = 'block';
    computersPlaceholder.style.display = 'none';
    playAgainButton.style.display = 'block';
  }, 3000);
}

export function setSelectedModeTitle(selectedMode: GameMode | undefined): void {
  const titleElement = document.getElementById('selected-mode-title');
  if (titleElement && selectedMode) {
    switch (selectedMode) {
      case 'HvsH':
        titleElement.textContent = 'Player vs Player';
        break;
      case 'HvsC':
        titleElement.textContent = 'Player vs Computer';
        break;
      case 'CvsC':
        titleElement.textContent = 'Computer vs Computer';
        break;
      default:
        break;
    }
  }
}

export function setPlayersNames(selectedMode: GameMode | undefined): void {
  const player1NameElement = document.getElementById('player1-name');
  const player2NameElement = document.getElementById('player2-name');

  if (!selectedMode || !player1NameElement || !player2NameElement) return;

  switch (selectedMode) {
    case 'HvsH':
      player1NameElement.textContent = 'Player 1';
      player2NameElement.textContent = 'Player 2';
      break;
    case 'HvsC':
      player1NameElement.textContent = 'Player 1';
      player2NameElement.textContent = 'Computer';
      break;
    case 'CvsC':
      player1NameElement.textContent = 'Computer 1';
      player2NameElement.textContent = 'Computer 2';
      break;
    default:
      break;
  }
}

export function openGameDeck(): void {
  gameDeck.style.display = 'block';
  gameModeContainer.style.display = 'none';
}

export function makeGameDeck(selectedMode: GameMode | undefined): void {
  if (!selectedMode) return;

  setSelectedModeTitle(selectedMode);
  setPlayersNames(selectedMode);
  openGameDeck();

  switch (selectedMode) {
    case 'HvsH':
      break;
    case 'HvsC':
      toggleDisableButtons(player2Moves, false);
      computerPlaceholder.style.display = 'block';
      break;
    case 'CvsC':
      toggleDisableButtons(player1Moves, false);
      toggleDisableButtons(player2Moves, false);
      computersPlaceholder.style.display = 'block';
      break;
    default:
      break;
  }
}

export function toggleDisableButtons(
  container: HTMLDivElement,
  enable: boolean,
): void {
  const buttons = container.querySelectorAll('button');
  buttons.forEach((button) => {
    button.disabled = !enable;
    button.style.pointerEvents = enable ? 'auto' : 'none';
    button.style.color = enable ? '' : 'darkgray';
    button.style.backgroundColor = enable ? '' : 'lightgray';
  });
}

let move1: Move | null = null;
let move2: Move | null = null;
export function handlePlayerMove(player: number, move: Move): void {
  if (isValidMove(move)) {
    switch (player) {
      case 1:
        move1 = move;
        player1Move.textContent = move.toUpperCase();
        toggleDisableButtons(player1Moves, false);
        player1Move.style.display = 'inline';
        break;
      case 2:
        move2 = move;
        player2Move.textContent = move.toUpperCase();
        toggleDisableButtons(player2Moves, false);
        player2Move.style.display = 'inline';
        break;
      default:
        break;
    }

    if (selectedMode === 'HvsH' && move1 && move2) {
      play(move1, move2);
    } else if (selectedMode === 'HvsC' && move1) {
      play(move1);
    }
  } else {
    return;
  }
}

export function play(move1?: Move, move2?: Move) {
  let outcome: Result | null = null;
  switch (selectedMode) {
    case 'HvsH':
      if (move1 && move2) {
        const gameResult = playGame(move1, move2);
        outcome = gameResult.result;
        player1Move.textContent = move1.toUpperCase() || '';
        player1Move.style.display = 'inline';
      }
      break;
    case 'HvsC':
      if (move1) {
        const {player2, result} = playGame(move1);
        outcome = result;
        player2Move.textContent = player2.toUpperCase() || '';
        player2Move.style.display = 'inline';
        computerPlaceholder.style.display = 'none';
      }
      break;
    default:
      break;
  }

  gameResultElement.textContent = outcome;
  gameResultElement.style.display = 'block';
  playAgainButton.style.display = 'block';
}
playAgainButton.onclick = () => {
  resetGame();
};

export function resetPlayerMovesUI(): void {
  player1Move.textContent = '';
  player2Move.textContent = '';
  player1Move.style.display = 'none';
  player2Move.style.display = 'none';
}

export function resetGame(): void {
  gameModeContainer.style.display = 'block';
  gameDeck.style.display = 'none';
  playAgainButton.style.display = 'none';
  resetPlayerMovesUI();
  selectedMode = null;
  gameResultElement.textContent = '';
  toggleDisableButtons(player1Moves, true);
  toggleDisableButtons(player2Moves, true);
}

export const makeFoobar = (foobarContainer: HTMLDivElement): void => {
  foobarContainer.innerHTML = `
    <h2>Foobar Output</h2>
    <ul class="number-list">
      ${foobar()
        .map((item, index) => `<li key="${index}">${item}</li>`)
        .join('')}
    </ul>
  `;
};
