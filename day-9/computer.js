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
  this.outputs = [];
  this.silentMode = false;
  this.done = false;
  this.awaitingInput = false;
  this.relativeBase = 0;
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
  this.outputs = [];
  this.done = false;
  this.awaitingInput = false;
  this.relativeBase = 0;
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

Computer.prototype.getParam = function(mode, paramOffset) {
  switch (mode) {
    case 0:
      return this.program[this.curIdx + paramOffset];
    case 1:
      return this.curIdx + paramOffset;
    case 2:
      return this.program[this.curIdx + paramOffset] + this.relativeBase;
    default:
      throw new Error(`Invalid param mode: ${mode}`);
  }
};

Computer.prototype.getParams = function() {
  let indexA = this.getParam(this.modeOne, 1);
  let indexB = this.getParam(this.modeTwo, 2);
  let resultIdx = this.getParam(this.modeThree, 3);

  const valueA = this.program[indexA] || 0;
  const valueB = this.program[indexB] || 0;

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

Computer.prototype.runOperationNine = function() {
  const { valueA } = this.getParams();
  this.relativeBase += valueA;
  this.curIdx += 2;
};

Computer.prototype.setModes = function(instruction) {
  const instLength = instruction.length;

  this.modeOne = Number(instruction[instLength - 3] || 0);
  this.modeTwo = Number(instruction[instLength - 4] || 0);
  this.modeThree = Number(instruction[instLength - 5] || 0);
};

/**
 * Runs current program
 * @param {Boolean}  silentMode  Runs program without logging outputs
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
      case "09":
        this.runOperationNine();
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
