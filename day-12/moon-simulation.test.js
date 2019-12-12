const input = require("./input");
const moonSimulation = require("./moon-simulation");
const {
  simulateMoons,
  getTotalEnergyOfMoons,
  getFirstStateRepeatOfMoons
} = moonSimulation;

describe("Moon Simulation", () => {
  it("should simulate the motion of moons", () => {
    const moons = input.getTestInput1();

    simulateMoons(moons, 1);
    expect(moons[0].position).toEqual({ x: 2, y: -1, z: 1 });
    expect(moons[0].velocity).toEqual({ x: 3, y: -1, z: -1 });
  });

  it("should calculate total energy of moons", () => {
    const moons = input.getTestInput2();

    simulateMoons(moons, 100);
    const energy = getTotalEnergyOfMoons(moons);
    expect(energy).toBe(1940);
  });

  it("should get number of steps to repeat state of moons", () => {
    const moons = input.getTestInput1();

    const firstRepeat = getFirstStateRepeatOfMoons(moons);
    expect(firstRepeat).toBe(2772);
  });
});
