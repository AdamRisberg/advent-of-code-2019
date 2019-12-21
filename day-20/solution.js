const inputs = require("./input");
const { input } = inputs;
const solveMaze = require("./maze");

const part1 = solveMaze(input);
const part2 = solveMaze(input, 25);

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
