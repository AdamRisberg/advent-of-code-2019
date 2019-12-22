const inputs = require("./input");
const { input } = inputs;
const shuffle = require("./shuffle");
const { shuffleAndFindCardIndex, simulateCardShuffle } = shuffle;

const part1 = shuffleAndFindCardIndex(testInput, 10007, 2019);
console.log(`Part 1: ${part1}`);

const part2 = simulateCardShuffle(
  input,
  119315717514047,
  101741582076661,
  2020
);
console.log(`Part 2: ${part2}`);
