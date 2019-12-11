const Computer = require("../day-9/computer");
const Point = require("../day-10/point");

function createPaintingInfo(program, startPanelColor = 0) {
  const computer = new Computer();
  computer.loadProgram(program);
  let position = new Point(0, 0);
  let direction = new Point(0, 1);

  const painted = {};
  painted[JSON.stringify(position)] = startPanelColor;

  while (!computer.done) {
    const curColor = painted[JSON.stringify(position)] || 0;
    computer.queueInputs(curColor);
    computer.run(true);

    const instructions = computer.getOutputs().slice(-2);
    const [color, turn] = instructions;
    painted[JSON.stringify(position)] = color;

    direction = turn ? turnRight(direction) : turnLeft(direction);
    position = addPoints(position, direction);
  }

  return painted;
}

function getPaintingGridOffsets(paintingInfo) {
  let lowestX = 0;
  let lowestY = 0;

  for (let key in paintingInfo) {
    const { x, y } = JSON.parse(key);
    lowestX = Math.min(lowestX, x);
    lowestY = Math.min(lowestY, y);
  }

  return {
    x: Math.abs(lowestX),
    y: Math.abs(lowestY)
  };
}

function createPaintingGrid(paintingInfo) {
  const rows = [];
  const offsets = getPaintingGridOffsets(paintingInfo);

  for (let key in paintingInfo) {
    const pos = JSON.parse(key);
    const color = paintingInfo[key];

    pos.x += offsets.x;
    pos.y += offsets.y;

    if (!rows[pos.y]) {
      rows[pos.y] = [];
    }
    rows[pos.y][pos.x] = color;
  }

  rows.reverse();
  return rows;
}

function turnRight(direction) {
  const { x, y } = direction;
  return new Point(y, -x);
}

function turnLeft(direction) {
  const { x, y } = direction;
  return new Point(-y, x);
}

function addPoints(pointA, pointB) {
  const result = new Point(0, 0);
  result.x = pointA.x + pointB.x;
  result.y = pointA.y + pointB.y;
  return result;
}

function getPaintedSquaresCount(paintingInfo) {
  return Object.keys(paintingInfo).length;
}

module.exports = {
  createPaintingInfo,
  getPaintedSquaresCount,
  createPaintingGrid
};
