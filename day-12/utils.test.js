const utils = require("./utils");
const {
  leastCommonMultiple,
  greatestCommonDivisor,
  leastCommonMultipleOfArray
} = utils;

describe("Day 12 Utility Functions", () => {
  it("should calculate greatest common divisor", () => {
    expect(greatestCommonDivisor(8, 12)).toBe(4);
  });

  it("should calculate least common multiple", () => {
    expect(leastCommonMultiple(12, 13)).toBe(156);
  });

  it("should calculate least common multiple of array", () => {
    expect(leastCommonMultipleOfArray([12, 15, 10])).toBe(60);
  });
});
