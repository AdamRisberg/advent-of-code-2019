const input = require("./input");
const signalProcessor = require("./signal-processor");
const { processSignal, processSignalWithRepeat } = signalProcessor;

const part1 = processSignal([...input], 100, [0, 1, 0, -1]);
const part2 = processSignalWithRepeat([...input], 100, 10000);

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
