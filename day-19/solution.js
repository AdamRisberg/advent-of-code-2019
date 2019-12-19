const input = require("./input");
const tractorBeam = require("./tractor-beam");
const { getPointsAffected, findSquareForShip } = tractorBeam;

const part1 = getPointsAffected(input, 50, 50);
console.log(`Part 1: ${part1}`);

const startingPosition = findSquareForShip(input, 100, 100);
const part2 = startingPosition.x * 10000 + startingPosition.y;
console.log(`Part 2: ${part2}`);
