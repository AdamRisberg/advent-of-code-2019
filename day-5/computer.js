const readline = require("readline");

/**
 * Intcode computer
 * @constructor
 */
function Computer() {
  this.defaultProgram = [];
  this.program = [];
  this.curIdx = 0;
}

/**
 * Loads a new intcode program into memory
 * @param {Number[]} program Array of integers
 */
Computer.prototype.loadProgram = function(program) {
  this.defaultProgram = program;
  this.resetProgram();
};

/**
 * Restores last loaded program to its initial state
 */
Computer.prototype.resetProgram = function() {
  this.program = [...this.defaultProgram];
};

/**
 * Retrieves current program's output
 * @return {Number} Program output
 */
Computer.prototype.getOutput = function() {
  return this.program[0];
};

Computer.prototype.requestInput = function() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question("Input: ", input => {
      resolve(input);
      rl.close();
    });
  });
};

Computer.prototype.runOperationOne = function(
  modeOne = false,
  modeTwo = false,
  modeThree = false
) {
  const indexA = modeOne ? this.curIdx + 1 : this.program[this.curIdx + 1];
  const indexB = modeTwo ? this.curIdx + 2 : this.program[this.curIdx + 2];
  const resultIdx = modeThree ? this.curIdx + 3 : this.program[this.curIdx + 3];

  const valueA = this.program[indexA];
  const valueB = this.program[indexB];

  this.program[resultIdx] = valueA + valueB;
};

Computer.prototype.runOperationTwo = function(
  modeOne = false,
  modeTwo = false,
  modeThree = false
) {
  const indexA = modeOne ? this.curIdx + 1 : this.program[this.curIdx + 1];
  const indexB = modeTwo ? this.curIdx + 2 : this.program[this.curIdx + 2];
  const resultIdx = modeThree ? this.curIdx + 3 : this.program[this.curIdx + 3];

  const valueA = this.program[indexA];
  const valueB = this.program[indexB];

  this.program[resultIdx] = valueA * valueB;
};

Computer.prototype.runOperationThree = async function() {
  const input = await this.requestInput();
  const resultIdx = this.program[this.curIdx + 1];
  this.program[resultIdx] = Number(input);
};

Computer.prototype.runOperationFour = function(modeOne = false) {
  const resultIdx = modeOne ? this.curIdx + 1 : this.program[this.curIdx + 1];
  console.log("Output: " + this.program[resultIdx]);
};

Computer.prototype.runOperationFive = function(
  modeOne = false,
  modeTwo = false
) {
  const indexA = modeOne ? this.curIdx + 1 : this.program[this.curIdx + 1];
  const indexB = modeTwo ? this.curIdx + 2 : this.program[this.curIdx + 2];

  const valueA = this.program[indexA];
  const valueB = this.program[indexB];

  if (!!valueA) {
    this.curIdx = valueB;
    return true;
  }

  return false;
};

Computer.prototype.runOperationSix = function(
  modeOne = false,
  modeTwo = false
) {
  const indexA = modeOne ? this.curIdx + 1 : this.program[this.curIdx + 1];
  const indexB = modeTwo ? this.curIdx + 2 : this.program[this.curIdx + 2];

  const valueA = this.program[indexA];
  const valueB = this.program[indexB];

  if (!valueA) {
    this.curIdx = valueB;
    return true;
  }

  return false;
};

Computer.prototype.runOperationSeven = function(
  modeOne = false,
  modeTwo = false,
  modeThree = false
) {
  const indexA = modeOne ? this.curIdx + 1 : this.program[this.curIdx + 1];
  const indexB = modeTwo ? this.curIdx + 2 : this.program[this.curIdx + 2];
  const resultIdx = modeThree ? this.curIdx + 3 : this.program[this.curIdx + 3];

  const valueA = this.program[indexA];
  const valueB = this.program[indexB];

  this.program[resultIdx] = valueA < valueB ? 1 : 0;
};

Computer.prototype.runOperationEight = function(
  modeOne = false,
  modeTwo = false,
  modeThree = false
) {
  const indexA = modeOne ? this.curIdx + 1 : this.program[this.curIdx + 1];
  const indexB = modeTwo ? this.curIdx + 2 : this.program[this.curIdx + 2];
  const resultIdx = modeThree ? this.curIdx + 3 : this.program[this.curIdx + 3];

  const valueA = this.program[indexA];
  const valueB = this.program[indexB];

  this.program[resultIdx] = valueA === valueB ? 1 : 0;
};

/**
 * Runs current program
 * @return {Number[]} Program's state after running instructions
 */
Computer.prototype.run = async function() {
  this.curIdx = 0;

  while (this.curIdx < this.program.length) {
    const instruction = this.program[this.curIdx] + "";
    const opcode = instruction.slice(-2).padStart(2, "0");

    const modes = getModesArray(instruction);

    switch (opcode) {
      case "01":
        this.runOperationOne(...modes);
        this.curIdx += 4;
        break;
      case "02":
        this.runOperationTwo(...modes);
        this.curIdx += 4;
        break;
      case "03":
        await this.runOperationThree();
        this.curIdx += 2;
        break;
      case "04":
        this.runOperationFour(...modes);
        this.curIdx += 2;
        break;
      case "05":
        if (!this.runOperationFive(...modes)) this.curIdx += 3;
        break;
      case "06":
        if (!this.runOperationSix(...modes)) this.curIdx += 3;
        break;
      case "07":
        this.runOperationSeven(...modes);
        this.curIdx += 4;
        break;
      case "08":
        this.runOperationEight(...modes);
        this.curIdx += 4;
        break;
      case "99":
        return this.getOutput();
      case "00":
        this.curIdx++;
        break;
      default:
        throw new Error(`Invalid opcode: ${opcode}`);
    }
  }

  return this.program;
};

function getModesArray(instruction) {
  const instLength = instruction.length;
  const modeOne = Number(instruction[instLength - 3]);
  const modeTwo = Number(instruction[instLength - 4]);
  const modeThree = Number(instruction[instLength - 5]);

  return [Boolean(modeOne), Boolean(modeTwo), Boolean(modeThree)];
}

module.exports = Computer;
