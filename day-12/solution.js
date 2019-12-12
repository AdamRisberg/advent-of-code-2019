const input = require("./input");
const utils = require("./utils");
const moonSimulation = require("./moon-simulation");
const {
  simulateMoons,
  getTotalEnergyOfMoons,
  getFirstAxisStateRepeat
} = moonSimulation;

let moons = input.getMainInput();

simulateMoons(moons, 100);
const part1 = getTotalEnergyOfMoons(moons);
console.log(`Part 1: ${part1}`);

moons = input.getMainInput();

const repeats = [
  getFirstAxisStateRepeat(moons, "x"),
  getFirstAxisStateRepeat(moons, "y"),
  getFirstAxisStateRepeat(moons, "z")
];

const part2 = utils.leastCommonMultipleOfArray(repeats);
console.log(`Part 2: ${part2}`);
