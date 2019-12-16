const input = require("./input");
const maze = require("./maze");
const {
  generateMaze,
  getStartAndOxygenPos,
  shortestDistanceToOxygen,
  calculateOxygenFillTime
} = maze;

const grid = generateMaze(input);
const { startPos, oxygenPos } = getStartAndOxygenPos(grid);

const part1 = shortestDistanceToOxygen(grid, startPos, oxygenPos);
const part2 = calculateOxygenFillTime(grid, oxygenPos);

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
