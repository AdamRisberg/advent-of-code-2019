const passChecker = require("./pass-checker");
const { checkPassword, countPasswordsWithinRange } = passChecker;

describe("pass checker", () => {
  it("should validate a password", () => {
    expect(checkPassword(111111)).toBe(true);
    expect(checkPassword(223450)).toBe(false);
    expect(checkPassword(123789)).toBe(false);
  });

  it("should validate a password (strict rules)", () => {
    expect(checkPassword(112233, true)).toBe(true);
    expect(checkPassword(123444, true)).toBe(false);
    expect(checkPassword(111122, true)).toBe(true);
  });

  it("should count valid passwords in a range", () => {
    expect(countPasswordsWithinRange(123550, 123600)).toBe(9);
  });

  it("should count valid passwords in a range (strict rules)", () => {
    expect(countPasswordsWithinRange(123550, 123600, true)).toBe(8);
  });
});
