const inputs = require("./input");
const { inputPart1, inputPart2 } = inputs;
const maze = require("./maze");
const { collectAllKeys } = maze;

const part1 = collectAllKeys(inputPart1);
console.log(`Part 1: ${part1}`);

const part2 = collectAllKeys(inputPart2);
console.log(`Part 2: ${part2}`);
