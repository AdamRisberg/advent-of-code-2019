const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.resolve(__dirname, "raw-input.txt"), "UTF-8")
  .split(",")
  .map(str => Number(str));

module.exports = input;

// 1 north
// 2 south
// 3 west
// 4 east

// 0: The repair droid hit a wall. Its position has not changed.
// 1: The repair droid has moved one step in the requested direction.
// 2: The repair droid has moved one step in the requested direction;
//    its new position is the location of the oxygen system.

// directions.east,
// directions.east,
// directions.north,
// directions.north,
// directions.east,
// directions.north,
// directions.east
