const program = require("./input");
const Computer = require("./computer");

const computer = new Computer();

computer.loadProgram(program);
computer.queueInputs(1);
const outputs1 = computer.run(true);
console.log(`Part 1: ${outputs1[outputs1.length - 1]}`);

computer.resetProgram();
computer.queueInputs(5);
const outputs2 = computer.run(true);
console.log(`Part 2: ${outputs2[outputs2.length - 1]}`);
