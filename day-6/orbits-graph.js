class OrbitsGraph {
  constructor(orbits) {
    this.list = {};
    this.initialize(orbits);
  }

  initialize(orbits) {
    for (let orbit of orbits) {
      const [orbitee, orbiter] = orbit.split(")");
      this.addEdge(orbitee, orbiter);
    }
  }

  addVertex(name) {
    if (!this.list[name]) {
      this.list[name] = [];
    }
  }

  addEdge(orbitee, orbiter) {
    this.addVertex(orbitee);
    this.addVertex(orbiter);
    this.list[orbitee].push(orbiter);
    this.list[orbiter].push(orbitee);
  }

  getOrbitalDistance(from, to) {
    const queue = [from, "_"];
    const distances = {};
    let level = 0;

    while (queue.length > 1) {
      const cur = queue.shift();

      if (cur === "_") {
        level++;
        queue.push("_");
        continue;
      }

      if (distances[cur] === undefined) {
        distances[cur] = level;
        queue.push(...this.list[cur]);
      }
    }

    return distances[to] - 2;
  }

  countOrbits() {
    const queue = ["COM", "_"];
    const visited = {};
    let count = 0;
    let level = 0;

    while (queue.length > 1) {
      const cur = queue.shift();

      if (cur === "_") {
        level++;
        queue.push("_");
        continue;
      }

      if (!visited[cur]) {
        count += level;
        visited[cur] = true;
        queue.push(...this.list[cur]);
      }
    }

    return count;
  }
}

module.exports = OrbitsGraph;
