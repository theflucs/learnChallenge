import {foobar} from './foobar/foobar.js';

const toggleFoobarButton = document.getElementById(
  'toggle-foobar-button',
) as HTMLButtonElement | null;
const toggleChooseModeButton = document.getElementById(
  'toggle-choose-mode-button',
) as HTMLButtonElement | null;
const foobarContainer = document.getElementById(
  'foobar-container',
) as HTMLDivElement | null;
const gameModeContainer = document.getElementById(
  'game-mode-container',
) as HTMLDivElement | null;
const gameDeck = document.getElementById('game-deck') as HTMLDivElement;
const gameWrapper = document.getElementById('game-wrapper') as HTMLDivElement;
const modeButtons = document.querySelectorAll(
  '.mode-button',
) as NodeListOf<HTMLButtonElement>;

const makeFoobar = () => {
  if (foobarContainer) {
    foobarContainer.innerHTML = `
        <h2>Foobar Output</h2>
        <ul class="number-list">
          ${foobar()
            .map((item, index) => `<li key="${index}">${item}</li>`)
            .join('')}
        </ul>
      `;
  }
};

let isFoobarOpen = foobarContainer && foobarContainer.style.display === 'block';
let isPlayOpen = gameWrapper && gameWrapper.style.display === 'block';

const toggleMenuContainers = (id: string | undefined) => {
  if (id === '1') {
    if (!isFoobarOpen && !isPlayOpen) {
      if (foobarContainer) foobarContainer.style.display = 'none';
      if (toggleFoobarButton) toggleFoobarButton.textContent = 'View foobar';
      if (gameWrapper) gameWrapper.style.display = 'none';
      if (toggleChooseModeButton)
        toggleChooseModeButton.textContent = 'Play Rock-Paper-Scissors game';
    }
    if (isFoobarOpen && isPlayOpen) {
      if (foobarContainer) foobarContainer.style.display = 'block';
      if (toggleFoobarButton) toggleFoobarButton.textContent = 'View foobar';
      if (gameWrapper) gameWrapper.style.display = 'block';
      if (toggleChooseModeButton)
        toggleChooseModeButton.textContent = 'Hide game';
      isPlayOpen = !isPlayOpen;
    }
    if (isFoobarOpen && !isPlayOpen) {
      makeFoobar();
      if (foobarContainer) foobarContainer.style.display = 'block';
      if (toggleFoobarButton) toggleFoobarButton.textContent = 'Hide foobar';
      if (gameWrapper) gameWrapper.style.display = 'none';
      if (toggleChooseModeButton)
        toggleChooseModeButton.textContent = 'Play Rock-Paper-Scissors game';
    }
    if (!isFoobarOpen && isPlayOpen) {
      if (foobarContainer) foobarContainer.style.display = 'none';
      if (toggleFoobarButton) toggleFoobarButton.textContent = 'View foobar';
      if (gameWrapper) gameWrapper.style.display = 'block';
      if (toggleChooseModeButton)
        toggleChooseModeButton.textContent = 'Hide game';
    }
  } else if (id === '2') {
    if (!isFoobarOpen && !isPlayOpen) {
      if (gameWrapper) gameWrapper.style.display = 'none';
      if (toggleChooseModeButton)
        toggleChooseModeButton.textContent = 'Play Rock-Paper-Scissors game';
      if (foobarContainer) foobarContainer.style.display = 'none';
      if (toggleFoobarButton) toggleFoobarButton.textContent = 'View foobar';
    }

    if (isFoobarOpen && isPlayOpen) {
      if (foobarContainer) foobarContainer.style.display = 'none';
      if (toggleFoobarButton) toggleFoobarButton.textContent = 'View foobar';
      if (gameWrapper) gameWrapper.style.display = 'block';
      if (toggleChooseModeButton)
        toggleChooseModeButton.textContent = 'Hide game';
      isFoobarOpen = !isFoobarOpen;
    }
    if (isFoobarOpen && !isPlayOpen) {
      if (foobarContainer) foobarContainer.style.display = 'none';
      if (toggleFoobarButton) toggleFoobarButton.textContent = 'View foobar';
      if (gameWrapper) gameWrapper.style.display = 'block';
      if (toggleChooseModeButton)
        toggleChooseModeButton.textContent = 'Hide game';
    }
    if (!isFoobarOpen && isPlayOpen) {
      if (gameWrapper) gameWrapper.style.display = 'block';
      if (toggleChooseModeButton)
        toggleChooseModeButton.textContent = 'Hide game';
    }
  } else {
    throw new Error('Invalid id');
  }
};

if (toggleFoobarButton) {
  toggleFoobarButton.onclick = (event) => {
    if (event.target instanceof HTMLButtonElement) {
      const id: string | undefined = event.target.dataset.id;
      isFoobarOpen = !isFoobarOpen;
      toggleMenuContainers(id);
    }
  };
}

if (toggleChooseModeButton) {
  toggleChooseModeButton.onclick = (event) => {
    if (event.target instanceof HTMLButtonElement) {
      const id: string | undefined = event.target.dataset.id;
      isPlayOpen = !isPlayOpen;
      toggleMenuContainers(id);
    }
  };
}

const openGameDeck = () => {
  if (gameDeck && gameModeContainer) {
    gameDeck.style.display = 'block';
    gameModeContainer.style.display = 'none';
  }
};

const selectMode = (event: MouseEvent) => {
  if (event.target instanceof HTMLButtonElement) {
    const selectedMode = event.target.dataset.mode;
    setSelectedModeTitle(selectedMode);
    setPlayersNames(selectedMode);
    openGameDeck();
    makeDeck(selectedMode);
  }
};

modeButtons.forEach((button) => {
  button.addEventListener('click', selectMode);
});

const setSelectedModeTitle = (selectedMode: string | undefined) => {
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
  const player1Moves = document.getElementById(
    'player1-moves',
  ) as HTMLDivElement;
  const player2Moves = document.getElementById(
    'player2-moves',
  ) as HTMLDivElement;
  const computerPlaceholder = document.getElementById(
    'computer-placeholder',
  ) as HTMLDivElement;
  const computersPlaceholder = document.getElementById(
    'computers-placeholder',
  ) as HTMLDivElement;

  if (
    !selectedMode ||
    !player1Moves ||
    !player2Moves ||
    !computerPlaceholder ||
    !computersPlaceholder
  ) {
    return;
  }

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
  console.log('container', container);
  const buttons = container.querySelectorAll('button');
  buttons.forEach((button) => {
    button.disabled = true;
    button.style.pointerEvents = 'none';
    button.style.color = 'darkgray';
    button.style.backgroundColor = 'lightgray';
  });
};
