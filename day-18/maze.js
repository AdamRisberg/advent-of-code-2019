const utils = require("./utils");
const { turnRight, turnLeft, addPositions } = utils;

function collectAllKeys(input) {
  const { grid, startPositions } = createGrid(input.split(/\r\n/g));

  const distances = [];

  startPositions.forEach(start => {
    const paths = buildSolutionMap(grid, start, "START");

    const keys = [];
    const doors = [];
    for (let key in paths) {
      if (key !== "START") {
        keys.push(key);
        doors.push(key.toUpperCase());
      }
    }

    const distance = findShortestRoute(paths, "START", [...keys], [...doors]);
    distances.push(distance);
  });

  return distances.reduce((total, distance) => total + distance, 0);
}

function findShortestRoute(
  paths,
  curKeyName,
  keys,
  doors,
  distance = 0,
  shortest = Infinity,
  cache = {}
) {
  const cur = paths[curKeyName];

  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === curKeyName) {
      keys.splice(i, 1);
      break;
    }
  }

  if (!keys.length) {
    return distance;
  }

  for (let key in cur) {
    const hasKeys = cur[key].doors.every(d => {
      return !keys.includes(d.toLowerCase()) || !doors.includes(d);
    });

    if (keys.includes(key) && hasKeys) {
      let potentialShortest;

      if (cache[key + JSON.stringify(keys)] !== undefined) {
        potentialShortest = cache[key + JSON.stringify(keys)];
      } else {
        potentialShortest = findShortestRoute(
          paths,
          key,
          [...keys],
          [...doors],
          distance,
          shortest,
          cache
        );
        cache[key + JSON.stringify(keys)] = potentialShortest;
      }

      shortest = Math.min(shortest, potentialShortest + cur[key].distance);
    }
  }

  return shortest;
}

function buildSolutionMap(grid, start, keyName, solution = {}, seen = {}) {
  if (seen[keyName]) {
    return;
  }
  seen[keyName] = true;

  let curKey = {
    name: keyName,
    position: start,
    distance: 0,
    doors: []
  };

  const possibleKeys = findPossibleKeys(grid, start, {});

  possibleKeys.forEach(key => {
    if (!solution[curKey.name]) {
      solution[curKey.name] = {};
    }

    if (curKey.name !== key.name) {
      solution[curKey.name][key.name] = {
        distance: key.distance,
        doors: key.doorsInWay
      };
    }

    buildSolutionMap(grid, key.position, key.name, solution, seen);
  });

  return solution;
}

function findPossibleKeys(grid, start, keyPouch) {
  const possibleKeys = [];
  let curGrid = copyGrid(grid);

  while (true) {
    const curKeyPouch = { ...keyPouch };

    const { counter, lastPos, doorsInWay } = shortestDistance(
      curGrid,
      start,
      curKeyPouch
    );

    if (lastPos) {
      for (let keyName in curKeyPouch) {
        possibleKeys.push({
          name: keyName,
          position: lastPos,
          distance: counter,
          keyPouch: { keyName: true, ...curKeyPouch },
          doorsInWay
        });
      }
    } else {
      break;
    }
  }

  return possibleKeys;
}

function copyGrid(grid) {
  return grid.map(row => {
    return [...row];
  });
}

function shortestDistance(grid, startingPosition, keyPouch, doorsInWay = []) {
  let runners = [{ pos: startingPosition, dir: { x: 1, y: 0 }, doorsInWay }];
  let lastPouchSize = Object.keys(keyPouch).length;
  let lastPos;
  let newDoorsInWay;

  const runnersSeen = {};
  runnersSeen[JSON.stringify(runners[0].pos)] = true;

  let counter = 0;
  while (runners.length) {
    const { newRunners, lastPosition, doorsFound } = stepRunners(
      runners,
      grid,
      runnersSeen,
      keyPouch
    );
    runners = newRunners;
    lastPos = lastPosition;
    if (runners.length) {
      counter++;
    }
    if (doorsFound) {
      newDoorsInWay = doorsFound;
    }
  }

  const newPouchSize = Object.keys(keyPouch).length;
  if (lastPouchSize === newPouchSize) {
    return { counter: 0, lastPos: null };
  }
  lastPouchSize = newPouchSize;

  return { counter, lastPos, doorsInWay: newDoorsInWay };
}

function stepRunners(runners, grid, seen, keyPouch) {
  const newRunners = [];
  let lastPosition;

  for (let i = 0; i < runners.length; i++) {
    const curRunner = runners[i];
    const { pos, dir } = curRunner;
    lastPosition = pos;

    const leftDir = turnLeft(dir);
    const rightDir = turnRight(dir);
    const backDir = turnRight(rightDir);

    const leftPos = addPositions(pos, leftDir);
    const rightPos = addPositions(pos, rightDir);
    const straightPos = addPositions(pos, dir);
    const backPos = addPositions(pos, backDir);

    const square = grid[pos.y][pos.x];

    if (/[a-z]/.test(square)) {
      grid[pos.y][pos.x] = ".";
      keyPouch[square] = true;

      return {
        newRunners: [],
        lastPosition: pos,
        doorsFound: curRunner.doorsInWay
      };
    }

    const { shouldRun: shouldRunLeft, doors: leftDoors } = shouldRun(
      grid,
      leftPos,
      curRunner.doorsInWay
    );
    const { shouldRun: shouldRunRight, doors: rightDoors } = shouldRun(
      grid,
      rightPos,
      curRunner.doorsInWay
    );
    const { shouldRun: shouldRunStraight, doors: straightDoors } = shouldRun(
      grid,
      straightPos,
      curRunner.doorsInWay
    );
    const { shouldRun: shouldRunBack, doors: backDoors } = shouldRun(
      grid,
      backPos,
      curRunner.doorsInWay
    );

    const leftKey = JSON.stringify(leftPos);
    const rightKey = JSON.stringify(rightPos);
    const straightKey = JSON.stringify(straightPos);
    const backKey = JSON.stringify(backPos);

    if (shouldRunStraight && !seen[straightKey]) {
      newRunners.push({
        pos: straightPos,
        dir: dir,
        doorsInWay: straightDoors
      });
      seen[straightKey] = true;
    }
    if (shouldRunLeft && !seen[leftKey]) {
      newRunners.push({
        pos: leftPos,
        dir: leftDir,
        doorsInWay: leftDoors
      });
      seen[leftKey] = true;
    }
    if (shouldRunRight && !seen[rightKey]) {
      newRunners.push({
        pos: rightPos,
        dir: rightDir,
        doorsInWay: rightDoors
      });
      seen[rightKey] = true;
    }
    if (shouldRunBack && !seen[backKey]) {
      newRunners.push({
        pos: backPos,
        dir: backDir,
        doorsInWay: backDoors
      });
      seen[backKey] = true;
    }
  }

  return {
    newRunners,
    lastPosition
  };
}

function shouldRun(grid, pos, doorsInWay) {
  const sizeY = grid.length;
  const sizeX = grid[0].length;

  if (pos.x < 0 || pos.y < 0) return false;
  if (pos.x >= sizeX || pos.y >= sizeY) return false;

  let square = grid[pos.y][pos.x];

  let shouldPass = false;

  if (/[A-Z]/.test(square)) {
    doorsInWay.push(square);
    shouldPass = true;
  } else if (/[a-z]/.test(square)) {
    shouldPass = true;
  }

  const shouldRun = square === "." || square === "@" || shouldPass;

  return { shouldRun, doors: [...doorsInWay] };
}

function printMaze(grid) {
  grid.forEach(row => console.log(row.join("")));
}

function createGrid(input) {
  const grid = [];
  const startPositions = [];

  for (let y = 0; y < input.length; y++) {
    const row = input[y];

    for (let x = 0; x < row.length; x++) {
      if (!grid[y]) {
        grid.push([]);
      }
      grid[y][x] = row[x];

      if (grid[y][x] === "@") {
        startPositions.push({ x, y });
      }
    }
  }
  return { grid, startPositions };
}

module.exports = {
  shortestDistance,
  printMaze,
  createGrid,
  collectAllKeys
};
