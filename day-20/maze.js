const utils = require("./utils");
const { turnRight, turnLeft, addPositions, comparePositions } = utils;

// High levelLimit can cause stack overflow
// Set just high enough to solve the maze
function solveMaze(input, levelLimit) {
  const grid = createGrid(input.split(/\r\n/g));
  shiftPositions(grid);

  const start = {
    position: findStartPosition(grid),
    name: "START"
  };
  const otherPositions = [...findOtherStartingPositions(grid, {})];
  const startPositions = [start, ...otherPositions];

  const names = {};
  for (let k of startPositions) {
    names[JSON.stringify(k.position)] = k.name;
  }

  const paths = {};
  startPositions.forEach(({ position, name }) => {
    buildSolutionMap(grid, position, name, paths, {}, names);
  });

  fuseTeleporters(grid, paths);

  const keys = [];
  const doors = [];
  for (let key in paths) {
    if (key !== "START") {
      keys.push(key);
      doors.push(key.toUpperCase());
    }
  }

  return findShortestRoute(
    paths,
    "START",
    [...keys],
    levelLimit,
    0,
    undefined,
    0,
    ""
  ).length;
}

function findShortestRoute(
  paths,
  curKeyName,
  keys,
  levelLimit,
  distance = 0,
  shortest = { length: Infinity, level: 0 },
  level = 0,
  thePath = "",
  routes = {}
) {
  const cur = paths[curKeyName];

  if (levelLimit && (level < 0 || level > levelLimit)) {
    return { length: Infinity, level };
  }

  thePath += curKeyName + ",";

  if (curKeyName === "ZZ") {
    const finalDistance = !levelLimit || level === 0 ? distance : Infinity;
    return { length: finalDistance, level };
  }

  if (!levelLimit) {
    keys = keys.filter(k => k !== curKeyName);
  }

  for (let key in cur) {
    if (!levelLimit && !keys.includes(key)) {
      continue;
    }
    if (key === "position" || key === "level") continue;
    if (levelLimit && key === "ZZ" && level !== 0) continue;

    const { level: finalLevel, length: finalDistance } = findShortestRoute(
      paths,
      key,
      keys,
      levelLimit,
      distance + cur[key].distance,
      shortest,
      level + paths[key].level,
      thePath,
      routes
    );

    let potentialShortest = Math.min(shortest.length, finalDistance);

    if (shortest.length !== potentialShortest) {
      shortest.length = potentialShortest;
      shortest.level = finalLevel;
    }
  }

  return shortest;
}

function fuseTeleporters(grid, paths) {
  for (let pathKey in paths) {
    const pos = paths[pathKey].position;
    paths[pathKey].level = getLevel(grid, pos.x, pos.y);

    if (pathKey === "START" || pathKey === "ZZ") {
      paths[pathKey].level = 0;
    }

    for (let childKey in paths[pathKey]) {
      if (childKey === "ZZ" || childKey === "position" || childKey === "level")
        continue;

      const cur = paths[pathKey][childKey];
      delete paths[pathKey][childKey];

      let reversePathKey;
      if (childKey === childKey.toLowerCase()) {
        reversePathKey = childKey.toUpperCase();
      } else {
        reversePathKey = childKey.toLowerCase();
      }

      paths[pathKey][reversePathKey] = {
        ...cur,
        distance: cur.distance + 1
      };
    }
  }
}

function buildSolutionMap(
  grid,
  start,
  keyName,
  solution = {},
  seen = {},
  names
) {
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
    key.name = names[JSON.stringify(key.position)];
  });

  possibleKeys.forEach(key => {
    if (!solution[curKey.name]) {
      solution[curKey.name] = { position: curKey.position };
    }

    if (curKey.name !== key.name) {
      solution[curKey.name][key.name] = {
        distance: key.distance,
        position: key.position,
        doors: key.doorsInWay
      };
    }

    buildSolutionMap(grid, key.position, key.name, solution, seen, names);
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
          keyPouch: { [keyName]: true, ...curKeyPouch },
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

    if (/[A-Za-z]/.test(square)) {
      const { found, position } = checkSurrounding(grid, pos.x, pos.y);

      let name = found + square;
      name = name
        .split("")
        .sort()
        .join("");
      if (keyPouch[name]) {
        name = name.toLowerCase();
      }
      blockSquare(grid, position, "#");

      grid[pos.y][pos.x] = ".";
      keyPouch[name] = true;

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

  if (/[A-Za-z]/.test(square)) {
    shouldPass = true;
  }

  const shouldRun = square === "." || square === "@" || shouldPass;

  return { shouldRun, doors: [...doorsInWay] };
}

function createGrid(input) {
  const grid = [];

  for (let y = 0; y < input.length; y++) {
    const row = input[y];

    for (let x = 0; x < row.length; x++) {
      if (!grid[y]) {
        grid.push([]);
      }
      grid[y][x] = row[x];
    }
  }
  return grid;
}

function blockSquare(grid, position, char) {
  grid[position.y][position.x] = char;
}

function findStartPosition(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === "A") {
        const {
          found: foundOtherA,
          position: otherAPosition
        } = checkSurrounding(grid, x, y, /A/);

        const { found: foundPeriod } = checkSurrounding(grid, x, y, /\./);

        if (foundOtherA && foundPeriod) {
          blockSquare(grid, otherAPosition, "#");
          grid[y][x] = "@";
          return { x, y };
        }
      }
    }
  }
}

function findOtherStartingPositions(grid, seen = {}) {
  const starts = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (/[A-Za-z]/.test(grid[y][x])) {
        const { found: foundOther } = checkSurrounding(grid, x, y, /[A-Za-z]/);

        const { found: foundPeriod } = checkSurrounding(grid, x, y, /\./);

        if (foundOther && foundPeriod) {
          let name = grid[y][x] + foundOther;
          name = name
            .split("")
            .sort()
            .join("");

          let reverseName = name.toLowerCase();
          if (
            seen[name] &&
            !seen[reverseName] &&
            !comparePositions({ x, y }, seen[name].position)
          ) {
            starts.push({ position: { x, y }, name: reverseName });
            continue;
          } else if (
            seen[reverseName] &&
            !seen[name] &&
            !comparePositions({ x, y }, seen[reverseName].position)
          ) {
            starts.push({ position: { x, y }, name });
            continue;
          } else if (!seen[name] && !seen[reverseName]) {
            starts.push({ position: { x, y }, name });
            seen[name] = { position: { x, y } };
          }
        }
      }
    }
  }

  starts.sort(function(a, b) {
    if (a.name < b.name) return -1;
    if (b.name < a.name) return 1;
    return 0;
  });
  for (let i = 0; i < starts.length - 1; i++) {
    if (starts[i].name === starts[i + 1].name) {
      starts[i].name = starts[i].name.toLowerCase();
    }
  }

  return starts;
}

function getLevel(grid, x, y) {
  const height = grid.length - 1;
  const width = grid[0].length - 1;

  const horizontal = x < 3 || width - x < 3;
  const vertical = y < 3 || height - y < 3;
  const outer = horizontal || vertical;
  return outer ? 1 : -1;
}

function checkSurrounding(grid, x, y, lookForRegex) {
  let foundPos;
  lookForRegex = lookForRegex || new RegExp(/[A-Za-z]/);

  if (grid[y - 1] && lookForRegex.test(grid[y - 1][x])) {
    foundPos = { x, y: y - 1 };
  }
  if (grid[y + 1] && lookForRegex.test(grid[y + 1][x])) {
    foundPos = { x, y: y + 1 };
  }
  if (lookForRegex.test(grid[y][x + 1])) {
    foundPos = { x: x + 1, y };
  }
  if (lookForRegex.test(grid[y][x - 1])) {
    foundPos = { x: x - 1, y };
  }

  let found;

  if (foundPos) {
    found = grid[foundPos.y][foundPos.x];
  }

  return { found, position: foundPos };
}

function shiftPositions(grid) {
  const positions = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (/[A-Z]/.test(grid[y][x])) {
        const { found: foundOther, position: otherPosition } = checkSurrounding(
          grid,
          x,
          y,
          /[A-Z]/
        );

        const {
          found: foundPeriod,
          position: periodPosition
        } = checkSurrounding(grid, x, y, /\./);

        if (foundOther && foundPeriod) {
          const positionInfo = {
            position: { x, y },
            periodPosition: periodPosition,
            otherPosition: otherPosition,
            name: grid[y][x],
            otherName: foundOther
          };
          positions.push(positionInfo);
        }
      }
    }
  }

  positions.forEach(posInfo => {
    const {
      position,
      periodPosition,
      otherPosition,
      name,
      otherName
    } = posInfo;

    blockSquare(grid, otherPosition, "#");
    blockSquare(grid, periodPosition, name);
    blockSquare(grid, position, otherName);
  });
}

module.exports = solveMaze;
