const OrbitsGraph = require("./orbits-graph");

describe("Orbits graph", () => {
  it("should count direct and indirect orbits", () => {
    const graph = new OrbitsGraph([
      "COM)B",
      "B)C",
      "C)D",
      "D)E",
      "E)F",
      "B)G",
      "G)H",
      "D)I",
      "E)J",
      "J)K",
      "K)L"
    ]);

    expect(graph.countOrbits()).toBe(42);
  });

  it("should get number of orbit transfers between two points", () => {
    const graph = new OrbitsGraph([
      "COM)B",
      "B)C",
      "C)D",
      "D)E",
      "E)F",
      "B)G",
      "G)H",
      "D)I",
      "E)J",
      "J)K",
      "K)L",
      "K)YOU",
      "I)SAN"
    ]);

    expect(graph.getShortestPath("YOU", "SAN")).toBe(4);
  });
});
