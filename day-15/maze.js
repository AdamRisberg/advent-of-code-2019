const Computer = require("../day-9/computer");
const utils = require("./utils");
const {
  turnRight,
  turnLeft,
  addPositions,
  comparePositions,
  directions,
  oppositeDirections
} = utils;

function shortestDistanceToOxygen(grid, startingPosition, oxygenPosition) {
  let runners = [{ pos: startingPosition, dir: { x: 1, y: 0 } }];

  const runnersSeen = {};
  runnersSeen[JSON.stringify(runners[0].pos)] = true;

  let counter = 0;
  while (runners.length) {
    runners = stepRunners(runners, grid, runnersSeen, oxygenPosition);
    if (runners.length) {
      counter++;
    }
  }

  return counter;
}

function calculateOxygenFillTime(grid, startingPosition) {
  let runners = [{ pos: startingPosition, dir: { x: 1, y: 0 } }];

  const runnersSeen = {};
  runnersSeen[JSON.stringify(runners[0].pos)] = true;

  let counter = 0;
  while (runners.length) {
    runners = stepRunners(runners, grid, runnersSeen);
    if (runners.length) {
      counter++;
    }
  }

  return counter;
}

function stepRunners(runners, grid, seen, goal) {
  const newRunners = [];

  for (let i = 0; i < runners.length; i++) {
    const curRunner = runners[i];
    const { pos, dir } = curRunner;

    const leftDir = turnLeft(dir);
    const rightDir = turnRight(dir);

    const leftPos = addPositions(pos, leftDir);
    const rightPos = addPositions(pos, rightDir);
    const straightPos = addPositions(pos, dir);

    const shouldRunLeft = shouldRun(grid, leftPos);
    const shouldRunRight = shouldRun(grid, rightPos);
    const shouldRunStraight = shouldRun(grid, straightPos);

    const leftKey = JSON.stringify(leftPos);
    const rightKey = JSON.stringify(rightPos);
    const straightKey = JSON.stringify(straightPos);

    if (goal && comparePositions(pos, goal)) {
      return [];
    }

    if (shouldRunStraight && !seen[straightKey]) {
      newRunners.push({ pos: straightPos, dir: dir });
      seen[straightKey] = true;
    }
    if (shouldRunLeft && !seen[leftKey]) {
      newRunners.push({ pos: leftPos, dir: leftDir });
      seen[leftKey] = true;
    }
    if (shouldRunRight && !seen[rightKey]) {
      newRunners.push({ pos: rightPos, dir: rightDir });
      seen[rightKey] = true;
    }
  }

  return newRunners;
}

function shouldRun(grid, pos) {
  const sizeY = grid.length;
  const sizeX = grid[0].length;

  if (pos.x < 0 || pos.y < 0) return false;
  if (pos.x >= sizeX || pos.y >= sizeY) return false;
  return grid[pos.y][pos.x] !== 0;
}

function generateMaze(program) {
  const computer = new Computer();
  computer.loadProgram(program);

  const curPosition = { x: 0, y: 0 };
  const seen = { [JSON.stringify(curPosition)]: { start: true } };
  const backtrack = {};

  while (!nextStep(computer, seen, backtrack, curPosition)) {}

  const grid = [];
  const positions = [];

  let startPos;
  let oxygenPos;

  for (let key in seen) {
    const pos = JSON.parse(key);
    positions.push(pos);

    if (seen[key].start) {
      startPos = { ...pos };
    }
    if (seen[key].oxygen) {
      oxygenPos = { ...pos };
    }
  }

  let y = 0;
  let x = 0;

  positions.forEach(pos => {
    y = Math.min(y, pos.y);
    x = Math.min(x, pos.x);
  });

  x = Math.abs(x);
  y = Math.abs(y);

  startPos.x += x;
  startPos.y += y;
  oxygenPos.x += x;
  oxygenPos.y += y;

  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];
    pos.x += x;
    pos.y += y;

    if (!grid[pos.y]) {
      grid[pos.y] = [];
    }

    grid[pos.y][pos.x] = "_";
  }

  grid[startPos.y][startPos.x] = "S";
  grid[oxygenPos.y][oxygenPos.x] = "O";

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (!grid[y][x]) {
        grid[y][x] = 0;
      }
    }
  }

  grid.reverse();

  return grid;
}

function nextStep(computer, seen, backtrack, curPosition) {
  let curDirection = 1;

  while (true) {
    const key = JSON.stringify(curPosition);

    if (!seen[key]) {
      seen[key] = {};
    }

    const backtracking = noPaths(seen[key]);

    if (backtracking && !backtrack[key]) {
      backtrack[key] = {};
    }

    if (backtracking && noPaths(backtrack[key])) {
      return true;
    }

    let status = 0;
    let curSeen = backtracking ? backtrack[key] : seen[key];

    let hasBeenSeen = curSeen[curDirection];

    if (!hasBeenSeen) {
      computer.queueInputs(curDirection);
      computer.run(true);
      status = computer.getLastOutput();
      curSeen[curDirection] = true;
    }

    if (status === 0) {
      curDirection++;

      if (curDirection > 4) {
        curDirection = 1;
      }
    } else {
      moveOne(curPosition, curDirection);

      const newKey = JSON.stringify(curPosition);
      if (!seen[newKey]) {
        seen[newKey] = {};
        seen[newKey][oppositeDirections[curDirection]] = true;
      }

      if (status === 2) {
        seen[newKey].oxygen = true;
      }

      if (!backtrack[key]) {
        backtrack[key] = {};
      }

      if (!backtracking) {
        backtrack[key][curDirection] = true;
      }

      if (!seen[newKey].steps) {
        const prevSteps = seen[key].steps;
        seen[newKey].steps = (prevSteps || 0) + 1;
      }

      return false;
    }
  }
}

function moveOne(position, direction) {
  switch (direction) {
    case directions.north:
      position.y += 1;
      break;
    case directions.south:
      position.y -= 1;
      break;
    case directions.east:
      position.x += 1;
      break;
    case directions.west:
      position.x -= 1;
      break;
    default:
      throw new Error("Invalid direction: " + direction);
  }
}

function getStartAndOxygenPos(grid) {
  let startPos;
  let oxygenPos;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === "S") {
        startPos = { x, y };
      }
      if (grid[y][x] === "O") {
        oxygenPos = { x, y };
      }
    }
  }

  return { startPos, oxygenPos };
}

function printMaze(grid) {
  grid.forEach(row => console.log(row.toString()));
}

function noPaths(info) {
  return info[1] && info[2] && info[3] && info[4];
}

module.exports = {
  generateMaze,
  getStartAndOxygenPos,
  shortestDistanceToOxygen,
  calculateOxygenFillTime,
  printMaze
};
