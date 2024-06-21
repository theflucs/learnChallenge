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
const gameIntroContainer = document.getElementById(
  'game-intro-container',
) as HTMLDivElement | null;
const gameModeButton = document.getElementById(
  'game-mode-button',
) as HTMLButtonElement | null;
const gameModeContainer = document.getElementById('game-mode-container');
const modeButtons = document.querySelectorAll(
  '.mode-button',
) as NodeListOf<HTMLButtonElement>;

let selectedMode = '';

const makeFoobar = () => {
  const content = `
    <h2>Foobar Output</h2>
    <ul class="number-list">
      ${foobar()
        .map((item, index) => `<li key="${index}">${item}</li>`)
        .join('')}
    </ul>
  `;
  if (foobarContainer) {
    foobarContainer.innerHTML = content;
  }
};

const toggleMenuContainers = (id: string | undefined) => {
  if (id === '1') {
    toggleContainers('foobar');
  } else if (id === '2') {
    toggleContainers('gameIntro');
  } else {
    throw new Error('Invalid id');
  }
};

const toggleContainers = (containerToShow: string) => {
  if (
    foobarContainer &&
    gameIntroContainer &&
    toggleFoobarButton &&
    toggleChooseModeButton
  ) {
    if (gameModeContainer?.style.display === 'block') {
      gameModeContainer.style.display = 'none';
    }
    if (containerToShow === 'foobar') {
      if (foobarContainer.style.display === 'block') {
        foobarContainer.style.display = 'none';
        toggleFoobarButton.textContent = 'View Foobar';
      } else {
        makeFoobar();
        foobarContainer.style.display = 'block';
        toggleFoobarButton.textContent = 'Hide Foobar';
        gameIntroContainer.style.display = 'none';
        toggleChooseModeButton.textContent = 'Play Rock-Paper-Scissors Game';
      }
    } else if (containerToShow === 'gameIntro') {
      if (gameIntroContainer.style.display === 'block') {
        gameIntroContainer.style.display = 'none';
        toggleChooseModeButton.textContent = 'Play Rock-Paper-Scissors Game';
      } else {
        gameIntroContainer.style.display = 'block';
        toggleChooseModeButton.textContent = 'Hide game';
        foobarContainer.style.display = 'none';
        toggleFoobarButton.textContent = 'View Foobar';
      }
    } else {
      throw new Error('Invalid containerToShow');
    }
  }
};

if (toggleFoobarButton) {
  toggleFoobarButton.onclick = (event) => {
    if (event.target instanceof HTMLButtonElement) {
      const id: string | undefined = event.target.dataset.id;
      toggleMenuContainers(id);
    }
  };
}

if (toggleChooseModeButton) {
  toggleChooseModeButton.onclick = (event) => {
    if (event.target instanceof HTMLButtonElement) {
      const id: string | undefined = event.target.dataset.id;
      toggleMenuContainers(id);
    }
  };
}

const openChooseModeContainer = (): void => {
  if (gameModeContainer) {
    gameModeContainer.style.display = 'block';
  }
};

if (gameModeButton) gameModeButton.onclick = () => openChooseModeContainer();

const selectMode = (event: MouseEvent) => {
  if (event.target instanceof HTMLButtonElement) {
    if (event.target.dataset.mode) {
      selectedMode = event.target.dataset.mode;
      console.log(selectedMode);
    }
  }
};

modeButtons.forEach((button) => button.addEventListener('click', selectMode));
