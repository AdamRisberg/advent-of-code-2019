const Moon = require("./moon");

module.exports = {
  getMainInput: () => [
    new Moon(16, -11, 2),
    new Moon(0, -4, 7),
    new Moon(6, 4, -10),
    new Moon(-3, -2, -4)
  ],
  getTestInput1: () => [
    new Moon(-1, 0, 2),
    new Moon(2, -10, -7),
    new Moon(4, -8, 8),
    new Moon(3, 5, -1)
  ],
  getTestInput2: () => [
    new Moon(-8, -10, 0),
    new Moon(5, 5, 10),
    new Moon(2, -7, 3),
    new Moon(9, -8, -3)
  ]
};
