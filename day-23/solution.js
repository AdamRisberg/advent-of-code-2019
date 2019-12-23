const input = require("./input");
const network = require("./network");
const { createAndBootComputers, runComputers } = network;

const computers = createAndBootComputers(input);
const [part1, part2] = runComputers(computers);

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
