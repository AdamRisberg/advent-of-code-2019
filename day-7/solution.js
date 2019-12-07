const input = require("./input");
const maxAmplifierOutput = require("./max-amplifier-output");

const part1 = maxAmplifierOutput(input, [0, 1, 2, 3, 4]);
const part2 = maxAmplifierOutput(input, [5, 6, 7, 8, 9]);

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
