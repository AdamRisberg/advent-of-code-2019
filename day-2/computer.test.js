const Computer = require("./computer");
const computer = new Computer();

describe("Computer", () => {
  it("should properly run programs", () => {
    computer.setProgram([1, 0, 0, 0, 99]);
    expect(computer.compute()).toEqual([2, 0, 0, 0, 99]);

    computer.setProgram([2, 3, 0, 3, 99]);
    expect(computer.compute()).toEqual([2, 3, 0, 6, 99]);

    computer.setProgram([2, 4, 4, 5, 99, 0]);
    expect(computer.compute()).toEqual([2, 4, 4, 5, 99, 9801]);

    computer.setProgram([1, 1, 1, 4, 99, 5, 6, 0, 99]);
    expect(computer.compute()).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
  });

  it("should retrieve output of computed programs", () => {
    computer.setProgram([1, 1, 1, 4, 99, 5, 6, 0, 99]);
    computer.compute();
    expect(computer.getOutput()).toEqual(30);
  });

  it("should reset a program after computing", () => {
    const program = [1, 1, 1, 4, 99, 5, 6, 0, 99];
    computer.setProgram(program);
    computer.compute();
    computer.resetProgram();
    expect(computer.program).toEqual(program);
  });

  it("should find noun and verb", () => {
    computer.setProgram([1, 0, 1, 3, 2, 3, 6, 0, 99]);
    expect(computer.findNounAndVerb(54)).toEqual([3, 6]);
  });
});
