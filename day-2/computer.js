/**
 * Intcode computer
 * @constructor
 */
function Computer() {
  this.defaultProgram = [];
  this.program = [];
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

/**
 * Runs current program
 * @return {Number[]} Program's state after running instructions
 */
Computer.prototype.run = function() {
  for (let i = 0; i < this.program.length; i += 4) {
    const instruction = this.program[i];
    const indexA = this.program[i + 1];
    const indexB = this.program[i + 2];
    const resultIdx = this.program[i + 3];
    const valueA = this.program[indexA];
    const valueB = this.program[indexB];

    let result;

    switch (instruction) {
      case 1:
        result = valueA + valueB;
        break;
      case 2:
        result = valueA * valueB;
        break;
      case 99:
        return this.program;
      default:
        throw new Error(`Invalid opcode: ${instruction}`);
    }

    this.program[resultIdx] = result;
  }
  return this.program;
};

/**
 * Finds required params (noun and verb) to result in desired output
 * @param {Number}  output  Desired output
 * @return {Number[]} Array containing target noun and verb. Array will be empty if solution is impossible.
 */
Computer.prototype.findNounAndVerb = function(output) {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      this.resetProgram();
      this.program[1] = i;
      this.program[2] = j;
      this.run();

      if (this.getOutput() === output) {
        return [i, j];
      }
    }
  }
  return [];
};

module.exports = Computer;
