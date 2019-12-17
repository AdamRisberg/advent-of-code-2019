const input = require("./input");
const Computer = require("../day-9/computer");
const control = require("./scaffolding-control");
const { createGrid, calculateIntersections, createInputs } = control;

const computer = new Computer();

computer.loadProgram(input);
computer.run(true);
const grid = createGrid(computer.getOutputs());
const part1 = calculateIntersections(grid);
console.log(`Part 1: ${part1}`);

computer.resetProgram();
computer.program[0] = 2;
computer.queueInputs(
  createInputs(
    "A,A,B,C,C,A,B,C,A,B",
    "L,12,L,12,R,12",
    "L,8,L,8,R,12,L,8,L,8",
    "L,10,R,8,R,12"
  )
);

const part2 = computer.run(true);
console.log(`Part 2: ${part2}`);
