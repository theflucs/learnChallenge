import {makeFoobar} from './utils.js';

const toggleFoobarButton = document.getElementById(
  'toggle-foobar-button',
) as HTMLButtonElement;
const toggleChooseModeButton = document.getElementById(
  'toggle-choose-mode-button',
) as HTMLButtonElement;
const foobarContainer = document.getElementById(
  'foobar-container',
) as HTMLDivElement;
const gameWrapper = document.getElementById('game-wrapper') as HTMLDivElement;

let isFoobarOpen = false;
let isPlayOpen = false;

export const initToggleGamesMenu = () => {
  toggleFoobarButton.onclick = (event) => {
    if (event.target instanceof HTMLButtonElement) {
      const id: string | undefined = event.target.dataset.id;
      isFoobarOpen = !isFoobarOpen;
      toggleMenuContainers(id);
    }
  };

  toggleChooseModeButton.onclick = (event) => {
    if (event.target instanceof HTMLButtonElement) {
      const id: string | undefined = event.target.dataset.id;
      isPlayOpen = !isPlayOpen;
      toggleMenuContainers(id);
    }
  };
};

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
      makeFoobar(foobarContainer);
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
