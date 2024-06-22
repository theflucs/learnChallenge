import {foobar} from './foobar/foobar.js';
import {isValidMove, playGame} from './rps/rps.js';
import type {GameMode, Move, Result} from './rps/types.js';

const toggleFoobarButton = document.getElementById(
  'toggle-foobar-button',
) as HTMLButtonElement;
const toggleChooseModeButton = document.getElementById(
  'toggle-choose-mode-button',
) as HTMLButtonElement;
const foobarContainer = document.getElementById(
  'foobar-container',
) as HTMLDivElement;
const gameModeContainer = document.getElementById(
  'game-mode-container',
) as HTMLDivElement;
const gameDeck = document.getElementById('game-deck') as HTMLDivElement;

const gameWrapper = document.getElementById('game-wrapper') as HTMLDivElement;
const modeButtons = document.querySelectorAll(
  '.mode-button',
) as NodeListOf<HTMLButtonElement>;
const moveButtons = document.querySelectorAll(
  '.move-button',
) as NodeListOf<HTMLButtonElement>;

const player1Moves = document.getElementById('player1-moves') as HTMLDivElement;
const player2Moves = document.getElementById('player2-moves') as HTMLDivElement;
const player1Move = document.getElementById('player1-move') as HTMLSpanElement;
const player2Move = document.getElementById('player2-move') as HTMLSpanElement;
const gameResultElement = document.getElementById(
  'game-result',
) as HTMLHeadingElement;

const computerPlaceholder = document.getElementById(
  'computer-placeholder',
) as HTMLDivElement;
const computersPlaceholder = document.getElementById(
  'computers-placeholder',
) as HTMLDivElement;

let selectedMode: GameMode;

const makeFoobar = () => {
  foobarContainer.innerHTML = `
  <h2>Foobar Output</h2>
  <ul class="number-list">
    ${foobar()
      .map((item, index) => `<li key="${index}">${item}</li>`)
      .join('')}
  </ul>
`;
};

let isFoobarOpen = foobarContainer.style.display === 'block';
let isPlayOpen = gameWrapper.style.display === 'block';

const toggleMenuContainers = (id: string | undefined) => {
  if (id === '1') {
    if (!isFoobarOpen && !isPlayOpen) {
      foobarContainer.style.display = 'none';
      toggleFoobarButton.textContent = 'View foobar';
      gameWrapper.style.display = 'none';
      toggleChooseModeButton.textContent = 'Play Rock-Paper-Scissors game';
    }
    if (isFoobarOpen && isPlayOpen) {
      foobarContainer.style.display = 'block';
      toggleFoobarButton.textContent = 'View foobar';
      gameWrapper.style.display = 'block';
      toggleChooseModeButton.textContent = 'Hide game';
      isPlayOpen = !isPlayOpen;
    }
    if (isFoobarOpen && !isPlayOpen) {
      makeFoobar();
      foobarContainer.style.display = 'block';
      toggleFoobarButton.textContent = 'Hide foobar';
      gameWrapper.style.display = 'none';
      toggleChooseModeButton.textContent = 'Play Rock-Paper-Scissors game';
    }
    if (!isFoobarOpen && isPlayOpen) {
      foobarContainer.style.display = 'none';
      toggleFoobarButton.textContent = 'View foobar';
      gameWrapper.style.display = 'block';
      toggleChooseModeButton.textContent = 'Hide game';
    }
  } else if (id === '2') {
    if (!isFoobarOpen && !isPlayOpen) {
      gameWrapper.style.display = 'none';
      toggleChooseModeButton.textContent = 'Play Rock-Paper-Scissors game';
      foobarContainer.style.display = 'none';
      toggleFoobarButton.textContent = 'View foobar';
    }

    if (isFoobarOpen && isPlayOpen) {
      foobarContainer.style.display = 'none';
      toggleFoobarButton.textContent = 'View foobar';
      gameWrapper.style.display = 'block';
      toggleChooseModeButton.textContent = 'Hide game';
      isFoobarOpen = !isFoobarOpen;
    }
    if (isFoobarOpen && !isPlayOpen) {
      foobarContainer.style.display = 'none';
      toggleFoobarButton.textContent = 'View foobar';
      gameWrapper.style.display = 'block';
      toggleChooseModeButton.textContent = 'Hide game';
    }
    if (!isFoobarOpen && isPlayOpen) {
      gameWrapper.style.display = 'block';
      toggleChooseModeButton.textContent = 'Hide game';
    }
  } else {
    throw new Error('Invalid id');
  }
};

{
  toggleFoobarButton.onclick = (event) => {
    if (event.target instanceof HTMLButtonElement) {
      const id: string | undefined = event.target.dataset.id;
      isFoobarOpen = !isFoobarOpen;
      toggleMenuContainers(id);
    }
  };
}

toggleChooseModeButton.onclick = (event) => {
  console.log('toggleChooseModeButton clicked');
  if (event.target instanceof HTMLButtonElement) {
    const id: string | undefined = event.target.dataset.id;
    isPlayOpen = !isPlayOpen;
    toggleMenuContainers(id);
  }
};

const openGameDeck = () => {
  gameDeck.style.display = 'block';
  gameModeContainer.style.display = 'none';
};

const selectMode = (event: MouseEvent) => {
  if (event.target instanceof HTMLButtonElement) {
    selectedMode = event.target.dataset.mode as GameMode;
    setSelectedModeTitle(selectedMode);
    setPlayersNames(selectedMode);
    openGameDeck();
    makeDeck(selectedMode);
  }
  if (selectedMode === 'CvsC') {
    setTimeout(() => {
      const {player1, player2, result} = playGame();
      player1Move.textContent = player1.toUpperCase();
      player1Move.style.display = 'inline';
      player2Move.textContent = player2.toUpperCase();
      player2Move.style.display = 'inline';
      gameResultElement.textContent = result;
      gameResultElement.style.display = 'block';
      computersPlaceholder.style.display = 'none';
    }, 3000);
  }
};

const setSelectedModeTitle = (selectedMode: string | undefined) => {
  console.log('selected mode title', selectedMode);
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
};

const setPlayersNames = (selectedMode: string | undefined) => {
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
};

const makeDeck = (selectedMode: string | undefined) => {
  if (!selectedMode) return;

  switch (selectedMode) {
    case 'HvsH':
      break;
    case 'HvsC':
      disableButtons(player2Moves);
      computerPlaceholder.style.display = 'block';
      break;
    case 'CvsC':
      disableButtons(player1Moves);
      disableButtons(player2Moves);
      computersPlaceholder.style.display = 'block';
      break;
    default:
      break;
  }
};

const disableButtons = (container: HTMLDivElement) => {
  const buttons = container.querySelectorAll('button');
  buttons.forEach((button) => {
    button.disabled = true;
    button.style.pointerEvents = 'none';
    button.style.color = 'darkgray';
    button.style.backgroundColor = 'lightgray';
  });
};

moveButtons.forEach((button) => {
  button.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    const player = parseInt(target.dataset.player || '0');
    const move = target.dataset.move as Move;
    handlePlayerMove(player, move);
  });
});

modeButtons.forEach((button) => {
  console.log('MODE button', button);
  button.addEventListener('click', (event: MouseEvent) => {
    selectMode(event);
  });
});

let move1: Move | null = null;
let move2: Move | null = null;

const handlePlayerMove = (player: number, move: Move) => {
  if (isValidMove(move)) {
    switch (player) {
      case 1:
        move1 = move;
        player1Move.textContent = move.toUpperCase();
        disableButtons(player1Moves);
        player1Move.style.display = 'inline';
        break;
      case 2:
        move2 = move;
        player2Move.textContent = move.toUpperCase();
        disableButtons(player2Moves);
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
};

const play = (move1?: Move, move2?: Move) => {
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
};
