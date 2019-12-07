const getPermutations = require("./permutations");

describe("Permutations", () => {
  it("should generate all permutations of given array", () => {
    expect(getPermutations([1, 2, 3])).toEqual([
      [1, 2, 3],
      [2, 1, 3],
      [3, 1, 2],
      [1, 3, 2],
      [2, 3, 1],
      [3, 2, 1]
    ]);
  });
});
