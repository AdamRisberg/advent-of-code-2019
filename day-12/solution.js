const input = require("./input");
const moonSimulation = require("./moon-simulation");
const {
  simulateMoonsAndGetTotalEnergy,
  getFirstStateRepeatOfMoons
} = moonSimulation;

let moons = input.getMainInput();
const part1 = simulateMoonsAndGetTotalEnergy(moons, 1000);
console.log(`Part 1: ${part1}`);

moons = input.getMainInput();
const part2 = getFirstStateRepeatOfMoons(moons);
console.log(`Part 2: ${part2}`);
