const inputs = require("./input");
const crossedWires = require("./crossed-wires");
const { findNearestCrossing, findShortestLengthCrossing } = crossedWires;

const part1 = findNearestCrossing(inputs.wireA, inputs.wireB);
const part2 = findShortestLengthCrossing(inputs.wireA, inputs.wireB);

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
