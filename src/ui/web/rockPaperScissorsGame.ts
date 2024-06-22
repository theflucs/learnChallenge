import {isValidMove, playGame} from '../../rps/rps.js';
import type {GameMode, Move, Result} from '../../rps/types.js';

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

export const playRPSgame = () => {
  const selectMode = (event: MouseEvent) => {
    if (event.target instanceof HTMLButtonElement) {
      selectedMode = event.target.dataset.mode as GameMode;
      setSelectedModeTitle(selectedMode);
      setPlayersNames(selectedMode);
      openGameDeck();
      makeDeck(selectedMode);
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
          playAgainButton.style.display = 'block';
        }, 3000);
      }
    }
  };

  const openGameDeck = () => {
    gameDeck.style.display = 'block';
    gameModeContainer.style.display = 'none';
  };

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
    if (!selectedMode) return;
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
  };

  const toggleDisableButtons = (container: HTMLDivElement, enable: boolean) => {
    const buttons = container.querySelectorAll('button');
    buttons.forEach((button) => {
      button.disabled = !enable;
      button.style.pointerEvents = enable ? 'auto' : 'none';
      button.style.color = enable ? '' : 'darkgray';
      button.style.backgroundColor = enable ? '' : 'lightgray';
    });
  };
  const modeButtons = document.querySelectorAll(
    '.mode-button',
  ) as NodeListOf<HTMLButtonElement>;

  modeButtons.forEach((button) => {
    button.addEventListener('click', selectMode);
  });

  const moveButtons = document.querySelectorAll(
    '.move-button',
  ) as NodeListOf<HTMLButtonElement>;

  let move1: Move | null = null;
  let move2: Move | null = null;

  const handlePlayerMove = (player: number, move: Move) => {
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
  };

  moveButtons.forEach((button) => {
    button.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLButtonElement;
      const player = parseInt(target.dataset.player || '0');
      const move = target.dataset.move as Move;
      handlePlayerMove(player, move);
    });
  });

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
    playAgainButton.style.display = 'block';
  };
  playAgainButton.onclick = () => {
    resetGame();
  };

  const resetPlayerMovesUI = () => {
    player1Move.textContent = '';
    player2Move.textContent = '';
    player1Move.style.display = 'none';
    player2Move.style.display = 'none';
  };

  const resetGame = () => {
    gameModeContainer.style.display = 'block';
    gameDeck.style.display = 'none';
    playAgainButton.style.display = 'none';
    resetPlayerMovesUI();
    selectedMode = null;
    gameResultElement.textContent = '';
    toggleDisableButtons(player1Moves, true);
    toggleDisableButtons(player2Moves, true);
  };
};
