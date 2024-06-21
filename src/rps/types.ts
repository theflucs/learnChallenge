import type { Interface as ReadlineInterface } from 'readline';

export type Move = 'rock' | 'paper' | 'scissors';
export type Result = 'Player 1 wins' | 'Player 2 wins' | 'It\'s a tie';
export type GameMode = 'HvsH' | 'HvsC' | 'CvsC';
export type RLinterface = ReadlineInterface;
