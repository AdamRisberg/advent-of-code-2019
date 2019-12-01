const masses = require("./input");
const fuel = require("./fuel");

console.log("Part 1: " + fuel.getTotalRequiredFuel(masses));
console.log("Part 2: " + fuel.getTotalRequiredFuel(masses, true));
