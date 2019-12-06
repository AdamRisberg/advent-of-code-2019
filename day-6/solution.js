const orbits = require("./input");
const OrbitGraph = require("./orbits-graph");

const graph = new OrbitGraph(orbits);

const part1 = graph.countOrbits();
const part2 = graph.getOrbitalDistance("YOU", "SAN");

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
