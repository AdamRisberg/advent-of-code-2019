const getInput = require("./input");
const fuelProduction = require("./fuel-production");
const { getOreRequiredForElement, calculateMaxFuelProduction } = fuelProduction;

const part1 = getOreRequiredForElement("FUEL", 1, getInput("raw-input.txt"));
console.log(`Part 1: ${part1}`);

const part2 = calculateMaxFuelProduction(
  1000000000000,
  getInput("raw-input.txt")
);
console.log(`Part 2: ${part2}`);
