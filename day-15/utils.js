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

function comparePositions(posA, posB) {
  return posA.x === posB.x && posA.y === posB.y;
}

const directions = {
  north: 1,
  south: 2,
  west: 3,
  east: 4
};

const oppositeDirections = {
  1: 2,
  2: 1,
  3: 4,
  4: 3
};

module.exports = {
  turnRight,
  turnLeft,
  addPositions,
  comparePositions,
  directions,
  oppositeDirections
};
