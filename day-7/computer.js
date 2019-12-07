/**
 * Intcode computer
 * @constructor
 */
function Computer() {
  this.defaultProgram = [];
  this.program = [];
  this.curIdx = 0;
  this.modeOne = false;
  this.modeTwo = false;
  this.modeThree = false;
  this.inputsQueue = [];
  this.outputs = [0];
  this.silentMode = false;
  this.done = false;
  this.awaitingInput = false;
}

/**
 * Loads a new intcode program into memory
 * @param {Number[]} program  Array of integers representing program
 */
Computer.prototype.loadProgram = function(program) {
  this.defaultProgram = program;
  this.resetProgram();
};

/**
 * Queues one or more integers to be used as responses to input requests
 * @param {Number\|Number[]}  inputs  Number or array of numbers representing user input(s)
 */
Computer.prototype.queueInputs = function(inputs) {
  inputs = Array.isArray(inputs) ? inputs : [inputs];

  // Reverse inputs in order to use pop for dequeueing
  for (let i = inputs.length - 1; i >= 0; i--) {
    this.inputsQueue.push(inputs[i]);
  }
};

/**
 * Restores last loaded program to its initial state.
 */
Computer.prototype.resetProgram = function() {
  this.program = [...this.defaultProgram];
  this.inputsQueue = [];
  this.outputs = [0];
  this.done = false;
  this.awaitingInput = false;
};

/**
 * Retrieves current program's outputs
 * @return {Number[]} Program outputs
 */
Computer.prototype.getOutputs = function() {
  return this.outputs;
};

/**
 * Retrieves last output
 * @return {Number} Last program output
 */
Computer.prototype.getLastOutput = function() {
  return this.outputs[this.outputs.length - 1];
};

Computer.prototype.getParams = function() {
  const indexA = this.modeOne ? this.curIdx + 1 : this.program[this.curIdx + 1];
  const indexB = this.modeTwo ? this.curIdx + 2 : this.program[this.curIdx + 2];
  const resultIdx = this.modeThree
    ? this.curIdx + 3
    : this.program[this.curIdx + 3];

  const valueA = this.program[indexA];
  const valueB = this.program[indexB];

  return {
    resultIdx,
    valueA,
    valueB,
    indexA,
    indexB
  };
};

Computer.prototype.runOperationOne = function() {
  const { valueA, valueB, resultIdx } = this.getParams();

  this.program[resultIdx] = valueA + valueB;
  this.curIdx += 4;
};

Computer.prototype.runOperationTwo = function() {
  const { valueA, valueB, resultIdx } = this.getParams();

  this.program[resultIdx] = valueA * valueB;
  this.curIdx += 4;
};

Computer.prototype.runOperationThree = function() {
  if (!this.inputsQueue.length) {
    this.awaitingInput = true;
    return false;
  }
  this.awaitingInput = false;

  const input = this.inputsQueue.pop();
  const { indexA } = this.getParams();

  this.program[indexA] = Number(input);
  this.curIdx += 2;
  return true;
};

Computer.prototype.runOperationFour = function() {
  const { indexA } = this.getParams();
  const output = this.program[indexA];

  this.outputs.push(output);
  !this.silentMode && console.log(`Output: ${output}`);
  this.curIdx += 2;
};

Computer.prototype.runOperationFive = function() {
  const { valueA, valueB } = this.getParams();

  this.curIdx = !!valueA ? valueB : this.curIdx + 3;
};

Computer.prototype.runOperationSix = function() {
  const { valueA, valueB } = this.getParams();

  this.curIdx = !valueA ? valueB : this.curIdx + 3;
};

Computer.prototype.runOperationSeven = function() {
  const { valueA, valueB, resultIdx } = this.getParams();

  this.program[resultIdx] = valueA < valueB ? 1 : 0;
  this.curIdx += 4;
};

Computer.prototype.runOperationEight = function() {
  const { valueA, valueB, resultIdx } = this.getParams();

  this.program[resultIdx] = valueA === valueB ? 1 : 0;
  this.curIdx += 4;
};

Computer.prototype.setModes = function(instruction) {
  const instLength = instruction.length;
  const modeOne = Number(instruction[instLength - 3]);
  const modeTwo = Number(instruction[instLength - 4]);
  const modeThree = Number(instruction[instLength - 5]);

  this.modeOne = Boolean(modeOne);
  this.modeTwo = Boolean(modeTwo);
  this.modeThree = Boolean(modeThree);
};

/**
 * Runs current program
 * @return {Number} Program's last output
 */
Computer.prototype.run = function(silentMode) {
  this.silentMode = silentMode;
  if (!this.awaitingInput) {
    this.curIdx = 0;
  }

  while (this.curIdx < this.program.length) {
    const instruction = this.program[this.curIdx] + "";
    const opcode = instruction.slice(-2).padStart(2, "0");
    let breakLoop = false;

    this.setModes(instruction);

    switch (opcode) {
      case "01":
        this.runOperationOne();
        break;
      case "02":
        this.runOperationTwo();
        break;
      case "03":
        if (!this.runOperationThree()) {
          breakLoop = true;
        }
        break;
      case "04":
        this.runOperationFour();
        break;
      case "05":
        this.runOperationFive();
        break;
      case "06":
        this.runOperationSix();
        break;
      case "07":
        this.runOperationSeven();
        break;
      case "08":
        this.runOperationEight();
        break;
      case "99":
        this.done = true;
        breakLoop = true;
        break;
      case "00":
        this.curIdx++;
        break;
      default:
        throw new Error(`Invalid opcode: ${opcode}`);
    }

    if (breakLoop) break;
  }

  return this.getLastOutput();
};

module.exports = Computer;
