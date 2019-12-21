const input = require("./input");
const utils = require("./utils");
const Computer = require("../day-9/computer");
const { toASCII } = utils;
const computer = new Computer();

computer.loadProgram(input);

const instructionsPart1 = [
  ...toASCII("NOT A T"),
  ...toASCII("OR T J"),
  ...toASCII("NOT B T"),
  ...toASCII("OR T J"),
  ...toASCII("NOT C T"),
  ...toASCII("OR T J"),
  ...toASCII("AND D J"),
  ...toASCII("WALK")
];

computer.run(true);
computer.outputs.length = 0;
computer.queueInputs(instructionsPart1);
computer.run(true);
const part1 = computer.getLastOutput();
console.log(`Part 1: ${part1}`);

const instructionsPart2 = [
  ...toASCII("NOT A T"),
  ...toASCII("OR T J"),
  ...toASCII("NOT B T"),
  ...toASCII("OR T J"),
  ...toASCII("NOT C T"),
  ...toASCII("OR T J"),
  ...toASCII("AND D J"),
  ...toASCII("NOT H T"),
  ...toASCII("NOT T T"),
  ...toASCII("OR E T"),
  ...toASCII("AND T J"),
  ...toASCII("RUN")
];

computer.resetProgram();
computer.run(true);
computer.outputs.length = 0;
computer.queueInputs(instructionsPart2);
computer.run(true);
const part2 = computer.getLastOutput();
console.log(`Part 2: ${part2}`);
