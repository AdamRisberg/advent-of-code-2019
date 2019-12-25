const input = require("./input");
const GridLevel = require("./grid-level");

const gridLevelOne = new GridLevel(input, false, true);
gridLevelOne.simulate();
console.log(`Part 1: ${gridLevelOne.biodiversity}`);

const gridLevel = new GridLevel(input);
gridLevel.simulate(200);
console.log(`Part 2: ${gridLevel.countBugs()}`);
