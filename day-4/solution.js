const pass = require("./pass-checker");
const range = require("./input");

const part1 = pass.countPasswordsWithinRange(range.start, range.end);
const part2 = pass.countPasswordsWithinRange(range.start, range.end, true);

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
