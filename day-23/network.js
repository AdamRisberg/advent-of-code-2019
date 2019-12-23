const Computer = require("../day-9/computer");

function createAndBootComputers(program) {
  const computers = [];

  for (let i = 0; i < 50; i++) {
    const computer = new Computer();
    computer.loadProgram(program);
    computer.queueInputs([i, -1]);
    computer.run(true);
    computers.push(computer);
  }

  return computers;
}

function runComputers(computers) {
  let natHistoryY = [];
  let nat = [];

  while (true) {
    let idle = true;

    computers.forEach((computer, i) => {
      if (!computer.inputsQueue.length) {
        idle = idle && true;
        computer.queueInputs(-1);
      }

      computer.run(true);
      let outputs = [...computer.getOutputs()];
      computer.outputs.length = 0;
      outputs = chunkOutput(outputs);

      for (let i = 0; i < outputs.length; i++) {
        const [compIdx, x, y] = outputs[i];
        if (compIdx === 255) {
          nat = [x, y];
          continue;
        }
        computers[compIdx].queueInputs([x, y]);
      }
    });

    if (idle && nat.length) {
      computers[0].queueInputs(nat);

      if (natHistoryY[natHistoryY.length - 1] === nat[1]) {
        return [natHistoryY[0], nat[1]];
      }

      natHistoryY.push(nat[1]);
      nat = [];
    }
  }
}

function chunkOutput(output) {
  const result = [];

  for (let i = 0; i < output.length; i += 3) {
    result.push(output.slice(i, i + 3));
  }

  return result;
}

module.exports = {
  createAndBootComputers,
  runComputers
};
