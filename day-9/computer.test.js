const Computer = require("./computer");

describe("Intcode computer", () => {
  it("should handle relative mode and large numbers", () => {
    const computer = new Computer();
    const testInput = [
      109,
      1,
      204,
      -1,
      1001,
      100,
      1,
      100,
      1008,
      100,
      16,
      101,
      1006,
      101,
      0,
      99
    ];
    computer.loadProgram(testInput);
    computer.run(true);

    expect(computer.getOutputs()).toEqual(testInput);

    computer.loadProgram([1102, 34915192, 34915192, 7, 4, 7, 99, 0]);
    computer.run(true);

    expect(computer.getLastOutput()).toBe(1219070632396864);

    computer.loadProgram([104, 1125899906842624, 99]);
    computer.run(true);

    expect(computer.getLastOutput()).toBe(1125899906842624);
  });
});
