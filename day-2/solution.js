const input = require("./input");
const Computer = require("./computer");
const utils = require("./utils");

const program = [...input];
program[1] = 12;
program[2] = 2;

const computer = new Computer();

computer.loadProgram(program);
computer.run();
console.log(`Part 1: ${computer.getOutput()}`);

computer.resetProgram();

const result = computer.findNounAndVerb(19690720);
const noun = utils.padNumber(result[0], 2);
const verb = utils.padNumber(result[1], 2);
console.log(`Part 2: ${noun + verb}`);
