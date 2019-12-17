const signalProcessor = require("./signal-processor");
const { processSignal, processSignalWithRepeat } = signalProcessor;

const pattern = [0, 1, 0, -1];
const input1 = "80871224585914546619083218645595".split("").map(Number);
const input2 = "03036732577212944063491565474664".split("").map(Number);

describe("Signal Processor", () => {
  it("processes and returns first 8 digits of signal", () => {
    expect(processSignal(input1, 100, pattern)).toBe(24176176);
  });

  it("processes repeated input and returns first 8 digits", () => {
    expect(processSignalWithRepeat(input2, 100, 10000)).toBe(84462026);
  });
});
