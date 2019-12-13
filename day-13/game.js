const Computer = require("../day-9/computer");

function getGameInfo(program) {
  const computer = new Computer();
  computer.loadProgram(program);
  computer.run(true);

  const outputs = computer.getOutputs();
  let blockCount = 0;
  const playerPosition = { x: 0, y: 0 };

  for (let i = 0; i < outputs.length; i += 3) {
    const x = outputs[i];
    const y = outputs[i + 1];
    const tile = outputs[i + 2];

    if (tile === 2) {
      blockCount++;
    } else if (tile === 3) {
      playerPosition.x = x;
      playerPosition.y = y;
    }
  }

  return {
    blockCount,
    playerPosition
  };
}

function autoPlayGame(program, playerPosition) {
  const computer = new Computer();
  computer.loadProgram(program);
  computer.program[0] = 2;

  while (!computer.done) {
    computer.run(true);

    const [x] = computer.getOutputs().slice(-3);

    let input = 0;
    if (playerPosition.x < x) {
      input = 1;
    } else if (playerPosition.x > x) {
      input = -1;
    }
    playerPosition.x += input;

    computer.queueInputs(input);
  }

  return computer.getLastOutput();
}

module.exports = {
  getGameInfo,
  autoPlayGame
};
