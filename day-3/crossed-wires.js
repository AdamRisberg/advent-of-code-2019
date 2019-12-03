function findNearestCrossing(wireA, wireB) {
  const points = {};
  let curPoint = { x: 0, y: 0 };

  wireA
    .map(input => getAdjustmentVector(input))
    .forEach(movement => {
      if (movement.x) {
        const start = curPoint.x;
        const end = curPoint.x + movement.x;
        const inc = movement.x < 0 ? -1 : 1;

        for (let x = start + inc; x - inc !== end; x += inc) {
          const point = { x, y: curPoint.y };
          const key = "A" + JSON.stringify(point);
          points[key] = 1;
        }
      } else {
        const start = curPoint.y;
        const end = curPoint.y + movement.y;
        const inc = movement.y < 0 ? -1 : 1;

        for (let y = start + inc; y - inc !== end; y += inc) {
          const point = { x: curPoint.x, y };
          const key = "A" + JSON.stringify(point);
          points[key] = 1;
        }
      }

      curPoint.x += movement.x;
      curPoint.y += movement.y;
    });

  curPoint = { x: 0, y: 0 };
  wireB
    .map(input => getAdjustmentVector(input))
    .forEach(movement => {
      if (movement.x) {
        const start = curPoint.x;
        const end = curPoint.x + movement.x;
        const inc = movement.x < 0 ? -1 : 1;

        for (let x = start + inc; x - inc !== end; x += inc) {
          const point = { x, y: curPoint.y };
          const key = "A" + JSON.stringify(point);
          if (points[key]) points[key]++;
        }
      } else {
        const start = curPoint.y;
        const end = curPoint.y + movement.y;
        const inc = movement.y < 0 ? -1 : 1;

        for (let y = start + inc; y - inc !== end; y += inc) {
          const point = { x: curPoint.x, y };
          const key = "A" + JSON.stringify(point);
          if (points[key]) points[key]++;
        }
      }

      curPoint.x += movement.x;
      curPoint.y += movement.y;
    });

  const matching = [];

  for (let key in points) {
    const trimKey = key.slice(1);
    if (points[key] > 1) {
      matching.push(JSON.parse(trimKey));
    }
  }

  const distances = matching.map(pos => Math.abs(pos.x) + Math.abs(pos.y));
  distances.sort((a, b) => a - b);
  return distances[0];
}

function findShortestLengthCrossing(wireA, wireB) {
  const points = {};
  let curPoint = { x: 0, y: 0 };
  let curDistance = 0;

  wireA
    .map(input => getAdjustmentVector(input))
    .forEach(movement => {
      if (movement.x) {
        const start = curPoint.x;
        const end = curPoint.x + movement.x;
        const inc = movement.x < 0 ? -1 : 1;

        for (let x = start + inc; x - inc !== end; x += inc) {
          const point = { x, y: curPoint.y };
          const key = JSON.stringify(point);

          curDistance += 1;

          if (points[key]) {
            points[key].a.push(curDistance);
          } else {
            points[key] = { a: [curDistance] };
          }
        }
      } else {
        const start = curPoint.y;
        const end = curPoint.y + movement.y;
        const inc = movement.y < 0 ? -1 : 1;

        for (let y = start + inc; y - inc !== end; y += inc) {
          const point = { x: curPoint.x, y };
          const key = JSON.stringify(point);

          curDistance += 1;

          if (points[key]) {
            points[key].a.push(curDistance);
          } else {
            points[key] = { a: [curDistance] };
          }
        }
      }

      curPoint.x += movement.x;
      curPoint.y += movement.y;
    });

  curPoint = { x: 0, y: 0 };
  curDistance = 0;

  wireB
    .map(input => getAdjustmentVector(input))
    .forEach(movement => {
      if (movement.x) {
        const start = curPoint.x;
        const end = curPoint.x + movement.x;
        const inc = movement.x < 0 ? -1 : 1;

        for (let x = start + inc; x - inc !== end; x += inc) {
          const point = { x, y: curPoint.y };
          const key = JSON.stringify(point);

          curDistance += 1;

          if (points[key]) {
            if (points[key].b) {
              points[key].b.push(curDistance);
            } else {
              points[key].b = [curDistance];
            }
          }
        }
      } else {
        const start = curPoint.y;
        const end = curPoint.y + movement.y;
        const inc = movement.y < 0 ? -1 : 1;

        for (let y = start + inc; y - inc !== end; y += inc) {
          const point = { x: curPoint.x, y };
          const key = JSON.stringify(point);

          curDistance += 1;

          if (points[key]) {
            if (points[key].b) {
              points[key].b.push(curDistance);
            } else {
              points[key].b = [curDistance];
            }
          }
        }
      }

      curPoint.x += movement.x;
      curPoint.y += movement.y;
    });

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
  findNearestCrossing,
  findShortestLengthCrossing,
  getAdjustmentVector
};
