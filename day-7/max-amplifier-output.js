const Computer = require("./computer");
const utils = require("./utils");

function maxAmplifierOutput(program, phaseSettings) {
  const phaseSequences = [];

  utils.getPermutations([...phaseSettings], result => {
    phaseSequences.push([...result]);
  });

  return phaseSequences.reduce((highest, sequence) => {
    const computers = [];
    let output = 0;

    // Initialize and run all computers
    sequence.forEach(phaseSetting => {
      const computer = new Computer();
      computer.loadProgram(program);
      computer.queueInputs(phaseSetting, output);
      output = computer.run(true);
      computers.push(computer);
    });

    // Handle feedback loop
    while (!computers[computers.length - 1].done) {
      computers.forEach(computer => {
        computer.queueInputs(output);
        output = computer.run(true);
      });
    }

    return Math.max(highest, output);
  }, 0);
}

module.exports = maxAmplifierOutput;
