import type {GameMode, Move, Result} from './types.js';
import {getComputerMove} from './utils.js';

const rules: {[key in Move]: Move[]} = {
  rock: ['scissors'],
  paper: ['rock'],
  scissors: ['paper'],
};

export const playGame = (player1Move?: Move, player2Move?: Move) => {
  const player1: Move = player1Move || getComputerMove();
  const player2: Move = player2Move || getComputerMove();
  const result = calculateGameResult(player1, player2);
  const gameMode = getGameMode(player1Move, player2Move);
  const resultString = `Players' moves: ${player1} vs ${player2}\nResult: ${result}!`;
  console.log(resultString);
  return {player1, player2, result, gameMode};
};

export const calculateGameResult = (
  player1Move: Move,
  player2Move: Move,
): Result => {
  if (player1Move === player2Move) {
    return "It's a tie";
  }

  if (rules[player1Move].includes(player2Move)) {
    return 'Player 1 wins';
  }

  return 'Player 2 wins';
};

export const getGameMode = (
  player1Move?: Move,
  player2Move?: Move,
): GameMode => {
  if (player1Move && player2Move) {
    return 'HvsH';
  } else if (player1Move && !player2Move) {
    return 'HvsC';
  } else {
    return 'CvsC';
  }
};
export const isValidMove = (move: Move | string | null): boolean => {
  if (move) {
    const normalizedMove = move.trim().toLowerCase();
    return (
      normalizedMove === 'rock' ||
      normalizedMove === 'paper' ||
      normalizedMove === 'scissors'
    );
  } else {
    return false;
  }
};
