const inputs = require("./inputs");
const stationFinder = require("./station-finder");
const {
  findBestMonitoringLocation,
  getTwoHundrethAsteroidDestroyed
} = stationFinder;

const monitoringStation = findBestMonitoringLocation(inputs.main);

console.log(`Part 1: ${monitoringStation.count}`);

const asteroid = getTwoHundrethAsteroidDestroyed(
  inputs.main,
  monitoringStation.location
);

if (asteroid) {
  const { location } = asteroid;
  const part2 = location.x * 100 + location.y;
  console.log(`Part 2: ${part2}`);
} else {
  console.log("Part 2: No 200th asteroid found!");
}
