const inputs = require("./input");
const crossedWires = require("./crossed-wires");
const { findClosestCrossing } = crossedWires;

const part1 = findClosestCrossing(inputs.wireA, inputs.wireB);
const part2 = findClosestCrossing(inputs.wireA, inputs.wireB, true);

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
