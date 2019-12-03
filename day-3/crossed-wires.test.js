const crossedWires = require("./crossed-wires");
const {
  getAdjustmentVector,
  findNearestCrossing,
  findShortestLengthCrossing
} = crossedWires;

describe("crossed wires", () => {
  it("should get adjustment vector", () => {
    expect(getAdjustmentVector("U7")).toEqual({ x: 0, y: 7 });
    expect(getAdjustmentVector("D17")).toEqual({ x: 0, y: -17 });
    expect(getAdjustmentVector("R5")).toEqual({ x: 5, y: 0 });
    expect(getAdjustmentVector("L17")).toEqual({ x: -17, y: 0 });
  });

  it("should find nearest crossing", () => {
    expect(
      findNearestCrossing(["R8", "U5", "L5", "D3"], ["U7", "R6", "D4", "L4"])
    ).toBe(6);
    expect(
      findNearestCrossing(
        ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"],
        ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"]
      )
    ).toBe(159);
    expect(
      findNearestCrossing(
        [
          "R98",
          "U47",
          "R26",
          "D63",
          "R33",
          "U87",
          "L62",
          "D20",
          "R33",
          "U53",
          "R51"
        ],
        ["U98", "R91", "D20", "R16", "D67", "R40", "U7", "R15", "U6", "R7"]
      )
    ).toBe(135);
  });

  it("should find shortest wire length crossing", () => {
    expect(
      findShortestLengthCrossing(
        ["R8", "U5", "L5", "D3"],
        ["U7", "R6", "D4", "L4"]
      )
    ).toBe(30);
    expect(
      findShortestLengthCrossing(
        ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"],
        ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"]
      )
    ).toBe(610);
    expect(
      findShortestLengthCrossing(
        [
          "R98",
          "U47",
          "R26",
          "D63",
          "R33",
          "U87",
          "L62",
          "D20",
          "R33",
          "U53",
          "R51"
        ],
        ["U98", "R91", "D20", "R16", "D67", "R40", "U7", "R15", "U6", "R7"]
      )
    ).toBe(410);
  });
});
