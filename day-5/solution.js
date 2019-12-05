const input = require("./input");
const Computer = require("./computer");

const program = [...input];

const computer = new Computer();
computer.loadProgram(program);

computer.run();
