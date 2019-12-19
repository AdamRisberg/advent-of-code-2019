const Computer = require("../day-9/computer");

function findSquareForShip(input, squareSizeX, squareSizeY) {
  const computer = new Computer();
  computer.loadProgram(input);

  let x = 0;
  let y = squareSizeY;

  const offsetX = squareSizeX - 1;
  const offsetY = squareSizeY - 1;

  while (true) {
    computer.queueInputs([x, y]);
    computer.run(true);

    const cur = computer.getLastOutput();
    computer.resetProgram();

    if (!cur) {
      x++;
    } else {
      computer.queueInputs([x + offsetX, y - offsetY]);
      computer.run(true);
      const topRight = computer.getLastOutput();
      computer.resetProgram();

      if (topRight) {
        return { x, y: y - offsetY };
      } else {
        y++;
      }
    }
  }
}

function getPointsAffected(input, sizeX, sizeY) {
  const computer = new Computer();
  computer.loadProgram(input);

  const position = { x: 0, y: 0 };
  let affected = 0;

  do {
    computer.queueInputs([position.x, position.y]);
    computer.run(true);

    if (computer.getLastOutput()) {
      affected++;
    }
    computer.resetProgram();
  } while (incrementPosition(position, sizeX, sizeY));

  return affected;
}

function incrementPosition(position, sizeX, sizeY) {
  position.x++;

  if (position.x >= sizeX) {
    position.x = 0;
    position.y++;
  }

  if (position.y >= sizeY) {
    return false;
  }
  return true;
}

module.exports = {
  getPointsAffected,
  findSquareForShip
};
