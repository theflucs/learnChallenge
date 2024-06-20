import { calculateGameResult, getGameMode, playGame } from './rps.js';
import * as utils from './utils.js';

describe('getComputerMove', () => {
    it('should return a valid move', () => {
        const move = utils.getComputerMove();
        expect(['rock', 'paper', 'scissors']).toContain(move);
    });
});

describe('calculateGameResult', () => {
    it('should return "It\'s a tie" when both moves are the same', () => {
        expect(calculateGameResult('rock', 'rock')).toBe("It's a tie");
        expect(calculateGameResult('paper', 'paper')).toBe("It's a tie");
        expect(calculateGameResult('scissors', 'scissors')).toBe("It's a tie");
    });

    it('should return "Player 1 wins" for winning combinations', () => {
        expect(calculateGameResult('rock', 'scissors')).toBe('Player 1 wins');
        expect(calculateGameResult('paper', 'rock')).toBe('Player 1 wins');
        expect(calculateGameResult('scissors', 'paper')).toBe('Player 1 wins');
    });

    it('should return "Player 2 wins" for losing combinations', () => {
        expect(calculateGameResult('rock', 'paper')).toBe('Player 2 wins');
        expect(calculateGameResult('paper', 'scissors')).toBe('Player 2 wins');
        expect(calculateGameResult('scissors', 'rock')).toBe('Player 2 wins');
    });
});

describe('getGameMode', () => {
    it('should return "HvsH" when both player1Move and player2Move are provided', () => {
        expect(getGameMode('rock', 'paper')).toBe('HvsH');
        expect(getGameMode('scissors', 'rock')).toBe('HvsH');
        expect(getGameMode('paper', 'scissors')).toBe('HvsH');
    });

    it('should return "HvsC" when only player1Move is provided', () => {
        expect(getGameMode('rock')).toBe('HvsC');
        expect(getGameMode('scissors')).toBe('HvsC');
        expect(getGameMode('paper')).toBe('HvsC');
    });

    it('should return "CvsC" when neither player1Move nor player2Move are provided', () => {
        expect(getGameMode()).toBe('CvsC');
    });
});

describe('playGame', () => {
    it('should count calls to getComputerMove in computer vs computer', async () => {
        const getComputerMoveSpy = vi.spyOn(utils, 'getComputerMove').mockReturnValue('rock');
        playGame();
        expect(getComputerMoveSpy).toHaveBeenCalledTimes(2);

        getComputerMoveSpy.mockRestore();
    });
    it('should count calls to getComputerMove in human vs computer', async () => {
        const getComputerMoveSpy = vi.spyOn(utils, 'getComputerMove').mockReturnValue('rock');
        playGame('rock');
        expect(getComputerMoveSpy).toHaveBeenCalledTimes(1);
        getComputerMoveSpy.mockRestore();
    });
    it('should count calls to getComputerMove in human vs human', async () => {
        const getComputerMoveSpy = vi.spyOn(utils, 'getComputerMove').mockReturnValue('rock');
        playGame('rock', 'rock');
        expect(getComputerMoveSpy).toHaveBeenCalledTimes(0);
    });
    it('should play a game with random moves if no moves are provided', async () => {
        const getComputerMoveSpy = vi.spyOn(utils, 'getComputerMove').mockReturnValue('rock');

        const { player1, player2, result } = playGame();

        expect(player1).toBe('rock');
        expect(player2).toBe('rock');
        expect(result).toBe("It's a tie");

        getComputerMoveSpy.mockRestore();
    });

    it('should play a game with one provided move and one random move', async () => {
        const getComputerMoveSpy = vi.spyOn(utils, 'getComputerMove').mockReturnValue('paper');

        const { player1, player2, result } = playGame('rock');

        expect(player1).toBe('rock');
        expect(player2).toBe('paper');
        expect(result).toBe('Player 2 wins');

        getComputerMoveSpy.mockRestore();
    });

    it('should play a game with both provided moves', () => {
        const { player1, player2, result } = playGame('rock', 'paper');

        expect(player1).toBe('rock');
        expect(player2).toBe('paper');
        expect(result).toBe('Player 2 wins');
    });
});
