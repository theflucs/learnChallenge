import type { GameMode, Move, Result } from "./types.js";
import { getComputerMove } from "./utils.js";

export const playGame = (player1Move?: Move, player2Move?: Move) => {
    const player1: Move = player1Move || getComputerMove();
    const player2: Move = player2Move || getComputerMove();
    const result = calculateGameResult(player1, player2);
    const gameMode = getGameMode(player1Move, player2Move);
    const resultString = `Play in mode ${gameMode}\n${player1} vs ${player2} * Result: ${result}`;
    console.log(resultString);
    return { player1, player2, result, gameMode };
}

export const calculateGameResult = (player1Move: Move, player2Move: Move): Result => {
    if (player1Move === player2Move) {
        return "It's a tie";
    }

    if (
        (player1Move === 'paper' && player2Move === 'rock') ||
        (player1Move === 'rock' && player2Move === 'scissors') ||
        (player1Move === 'scissors' && player2Move === 'paper')
    ) {
        return 'Player 1 wins';
    }

    return 'Player 2 wins';
}

export const getGameMode = (player1Move?: Move, player2Move?: Move): GameMode => {
    if (player1Move && player2Move) {
        return 'HvsH';
    } else if (player1Move && !player2Move) {
        return 'HvsC';
    } else {
        return 'CvsC';
    }
}
