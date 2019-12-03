function findClosestCrossing(wireA, wireB, byWireLength) {
  const points = {};
  let curPoint = { x: 0, y: 0 };
  let curDistance = 0;

  wireA
    .map(input => getAdjustmentVector(input))
    .forEach(movement => {
      curDistance = setPoints(
        movement,
        curPoint,
        points,
        addPoint,
        curDistance
      );
    });

  curPoint = { x: 0, y: 0 };
  curDistance = 0;

  wireB
    .map(input => getAdjustmentVector(input))
    .forEach(movement => {
      curDistance = setPoints(
        movement,
        curPoint,
        points,
        addMatchingPoint,
        curDistance
      );
    });

  return byWireLength
    ? findClosestByWireLength(points)
    : findClosestByDistance(points);
}

function findClosestByDistance(points) {
  const matching = [];

  for (let key in points) {
    if (points[key].a && points[key].b) {
      matching.push(JSON.parse(key));
    }
  }

  const distances = matching.map(pos => Math.abs(pos.x) + Math.abs(pos.y));
  distances.sort((a, b) => a - b);
  return distances[0];
}

function findClosestByWireLength(points) {
  const matching = [];

  for (let key in points) {
    if (points[key].b) {
      points[key].a.sort((a, b) => a - b);
      points[key].b.sort((a, b) => a - b);
      matching.push(points[key].a[0] + points[key].b[0]);
    }
  }
  matching.sort((a, b) => a - b);
  return matching[0];
}

function setPoints(movement, curPoint, points, addPoint, curLength) {
  const movingX = !!movement.x;
  const moveKey = movingX ? "x" : "y";
  const staticKey = movingX ? "y" : "x";

  const start = curPoint[moveKey];
  const end = curPoint[moveKey] + movement[moveKey];
  const inc = movement[moveKey] < 0 ? -1 : 1;

  for (let i = start + inc; i - inc !== end; i += inc) {
    const point = createOrderedCoordsObj(
      moveKey,
      i,
      staticKey,
      curPoint[staticKey]
    );
    curLength++;
    const key = JSON.stringify(point);
    addPoint(key, points, curLength);
  }

  curPoint.x += movement.x;
  curPoint.y += movement.y;
  return curLength;
}

function addPoint(key, points, curLength) {
  if (points[key]) {
    points[key].a.push(curLength);
  } else {
    points[key] = { a: [curLength] };
  }
}

function addMatchingPoint(key, points, curLength) {
  if (points[key]) {
    if (points[key].b) {
      points[key].b.push(curLength);
    } else {
      points[key].b = [curLength];
    }
  }
}

function createOrderedCoordsObj(keyA, valueA, keyB, valueB) {
  return keyA === "x"
    ? { [keyA]: valueA, [keyB]: valueB }
    : { [keyB]: valueB, [keyA]: valueA };
}

function getAdjustmentVector(input) {
  const direction = input[0];
  const distance = Number(input.slice(1));
  let x = 0;
  let y = 0;

  switch (direction) {
    case "U":
      y += distance;
      break;
    case "D":
      y -= distance;
      break;
    case "L":
      x -= distance;
      break;
    case "R":
      x += distance;
      break;
    default:
      throw new Error(`Invalid direction: ${direction}`);
  }

  return { x, y };
}

module.exports = {
  findClosestCrossing,
  getAdjustmentVector
};
