function turnRight(direction) {
  const { x, y } = direction;
  return { x: y, y: -x };
}

function turnLeft(direction) {
  const { x, y } = direction;
  return { x: -y, y: x };
}

function addPositions(pointA, pointB) {
  const result = { x: 0, y: 0 };
  result.x = pointA.x + pointB.x;
  result.y = pointA.y + pointB.y;
  return result;
}

function comparePositions(pointA, pointB) {
  return pointA.x === pointB.x && pointA.y === pointB.y;
}

module.exports = {
  turnRight,
  turnLeft,
  addPositions,
  comparePositions
};
