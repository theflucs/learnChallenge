import { foobar } from "./foobar/foobar.js";
import { playGame } from "./rps/rps.js";

foobar();

// simulate human vs human
playGame('rock', 'paper');

// simulate human vs computer
playGame('rock');

// simulate computer vs computer
playGame();
