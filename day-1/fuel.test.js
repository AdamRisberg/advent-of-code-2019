const fuel = require("./fuel");
const { getRequiredFuel, getTotalRequiredFuel } = fuel;

describe("getRequiredFuel", () => {
  it("should calculate required fuel based on mass", () => {
    expect(getRequiredFuel(12)).toBe(2);
    expect(getRequiredFuel(14)).toBe(2);
    expect(getRequiredFuel(1969)).toBe(654);
    expect(getRequiredFuel(100756)).toBe(33583);
  });

  it("should calculate required fuel based on mass (including fuel mass)", () => {
    expect(getRequiredFuel(14, true)).toBe(2);
    expect(getRequiredFuel(1969, true)).toBe(966);
    expect(getRequiredFuel(100756, true)).toBe(50346);
  });
});

describe("getTotalRequiredFuel", () => {
  it("should calculate total fuel required for array of masses", () => {
    expect(getTotalRequiredFuel([12, 14, 1969, 100756])).toBe(34241);
  });

  it("should calculate total fuel required for array of masses (including fuel mass)", () => {
    expect(getTotalRequiredFuel([14, 1969, 100756], true)).toBe(51314);
  });
});
