const Computer = require("./computer");
const fullProgram = require("./input");
// prettier-ignore
const testProgram = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
  1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
  999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];

describe("Computer", () => {
  it("should run basic program successfully", () => {
    const computer = new Computer();
    computer.loadProgram(fullProgram);
    computer.queueInputs(1);
    const outputs = computer.run(true);

    for (let i = 0; i < outputs.length; i++) {
      if (i === outputs.length - 1) {
        expect(outputs[i]).not.toBe(0);
      } else {
        expect(outputs[i]).toBe(0);
      }
    }
  });

  it("should handle conditional instructions", () => {
    const computer = new Computer();
    computer.loadProgram(testProgram);
    computer.queueInputs(7);
    computer.run(true);

    expect(computer.getOutputs()[0]).toBe(999);

    computer.resetProgram();
    computer.queueInputs(8);
    computer.run(true);

    expect(computer.getOutputs()[0]).toBe(1000);

    computer.resetProgram();
    computer.queueInputs(9);
    computer.run(true);

    expect(computer.getOutputs()[0]).toBe(1001);
  });
});
