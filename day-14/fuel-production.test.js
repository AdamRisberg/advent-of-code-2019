const getInput = require("./input");
const fuelProduction = require("./fuel-production");
const { calculateMaxFuelProduction, getOreRequiredForElement } = fuelProduction;

describe("Fuel Production", () => {
  it("should calculate ore needed for fuel", () => {
    const oreNeeded = getOreRequiredForElement(
      "FUEL",
      1,
      getInput("raw-test-input.txt")
    );
    expect(oreNeeded).toBe(2210736);
  });

  it("should calculate max fuel production", () => {
    const oreNeeded = calculateMaxFuelProduction(
      1000000000000,
      getInput("raw-test-input.txt")
    );
    expect(oreNeeded).toBe(460664);
  });
});
