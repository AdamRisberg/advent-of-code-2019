const inputs = require("./inputs");
const stationFinder = require("./station-finder");
const Point = require("./point");
const {
  findBestMonitoringLocation,
  getTwoHundrethAsteroidDestroyed
} = stationFinder;

describe("Station Finder", () => {
  it("should find best station location", () => {
    const station = findBestMonitoringLocation(inputs.test);
    const { location, count } = station;
    expect(location).toEqual({ x: 11, y: 13 });
    expect(count).toEqual(210);
  });

  it("should find 200th asteroid destroyed", () => {
    const asteroid = getTwoHundrethAsteroidDestroyed(
      inputs.test,
      new Point(11, 13)
    );
    expect(asteroid).not.toBeNull();
    expect(asteroid.location).toEqual({ x: 8, y: 2 });
  });
});
