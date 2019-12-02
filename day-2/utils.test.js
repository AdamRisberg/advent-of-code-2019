const utils = require("./utils");
const { padNumber } = utils;

describe("padNumber", () => {
  it("should pad number with zeroes if < target length", () => {
    expect(padNumber(8, 2)).toBe("08");
    expect(padNumber(15, 3)).toBe("015");
  });

  it("should not pad number if > target length", () => {
    expect(padNumber(20, 2)).toBe("20");
    expect(padNumber(100, 1)).toBe("100");
  });
});
