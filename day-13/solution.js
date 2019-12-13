const input = require("./input");
const game = require("./game");
const { getGameInfo, autoPlayGame } = game;

const { blockCount, playerPosition } = getGameInfo(input);
const score = autoPlayGame(input, playerPosition);

console.log(`Part 1: ${blockCount}`);
console.log(`Part 2: ${score}`);
