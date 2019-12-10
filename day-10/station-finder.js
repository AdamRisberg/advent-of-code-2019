const Point = require("./point");

function getTwoHundrethAsteroidDestroyed(grid, laserPoint) {
  let count = 0;

  while (true) {
    const destroyed = fireLazer(grid, laserPoint);

    if (!destroyed.length) {
      return null;
    }

    if (destroyed.length + count >= 200) {
      const idx = 200 - count;
      return destroyed[idx - 1];
    }

    count += destroyed.length;
  }
}

function fireLazer(grid, laserPoint) {
  const asteroids = detectAsteroids(laserPoint, grid, true);
  const asteroidsArray = [];

  for (let key in asteroids) {
    asteroidsArray.push(asteroids[key]);
  }

  asteroidsArray.sort((a, b) => a.angle - b.angle);

  for (let i = 0; i < asteroidsArray.length; i++) {
    destroyAsteroid(grid, asteroidsArray[i].location);
  }

  return asteroidsArray;
}

function destroyAsteroid(grid, location) {
  grid[location.y][location.x] = ".";
}

function findBestMonitoringLocation(grid) {
  let highestCount = 0;
  let bestLocation = null;

  scanGrid(grid, (hasAsteroid, location) => {
    if (!hasAsteroid) return;

    const asteroids = detectAsteroids(location, grid);
    const count = Object.keys(asteroids).length;

    if (count > highestCount) {
      highestCount = count;
      bestLocation = location;
    }
  });

  return { count: highestCount, location: bestLocation };
}

function detectAsteroids(viewingLocation, grid) {
  const asteroids = {};

  scanGrid(grid, (hasAsteroid, location) => {
    if (!hasAsteroid || viewingLocation.equalTo(location)) {
      return;
    }

    const angle = viewingLocation.angleTo(location);
    const distance = viewingLocation.distanceTo(location);

    if (asteroids[angle] && distance > asteroids[angle].distance) {
      return;
    }

    asteroids[angle] = { location, distance, angle };
  });

  return asteroids;
}

function scanGrid(grid, cb) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      cb(grid[y][x] === "#", new Point(x, y));
    }
  }
}

module.exports = {
  findBestMonitoringLocation,
  getTwoHundrethAsteroidDestroyed
};
