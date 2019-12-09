const input = require("./input");
const Computer = require("./computer");

const computer = new Computer();
computer.loadProgram(input);
computer.queueInputs(1);
const part1 = computer.run(true);

computer.resetProgram();
computer.queueInputs(2);
const part2 = computer.run(true);

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
