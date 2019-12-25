const input = require("./input");
const Computer = require("../day-9/computer");
const utils = require("../day-21/utils");
const { toASCII, toText } = utils;

const computer = new Computer();
computer.loadProgram(input);

// Decided not to clean up my route...for historical accuracy. :)
computer.queueInputs([
  ...toASCII("west"),
  ...toASCII("take mug"),
  ...toASCII("west"),
  ...toASCII("east"),
  ...toASCII("north"),
  ...toASCII("take easter egg"),
  ...toASCII("south"),
  ...toASCII("east"),
  ...toASCII("east"),
  ...toASCII("take coin"),
  ...toASCII("north"),
  ...toASCII("north"),
  ...toASCII("take hypercube"),
  ...toASCII("south"),
  ...toASCII("east"),
  ...toASCII("take manifold"),
  ...toASCII("west"),
  ...toASCII("south"),
  ...toASCII("south"),
  ...toASCII("east"),
  ...toASCII("take pointer"),
  ...toASCII("west"),
  ...toASCII("west"),
  ...toASCII("take astrolabe"),
  ...toASCII("north"),
  ...toASCII("east"),
  ...toASCII("north"),
  ...toASCII("drop manifold"),
  ...toASCII("drop easter egg"),
  ...toASCII("drop pointer"),
  ...toASCII("east")
]);

computer.run(true);
const fullOutput = toText(computer.getOutputs());
const password = /\d{3,}/g.exec(fullOutput)[0];
console.log(`Part 1: ${password}`);
