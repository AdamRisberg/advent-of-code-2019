const Point = require("./point");

describe("Point", () => {
  it("should compare two points", () => {
    const pointA = new Point(5, 8);
    const pointB = new Point(5, 8);

    expect(pointA.equalTo(pointB)).toBe(true);

    pointB.x = 8;

    expect(pointA.equalTo(pointB)).toBe(false);
  });

  it("should calculate angle to another point", () => {
    const pointA = new Point(0, 5);
    const pointB = new Point(0, 0);

    expect(pointA.angleTo(pointB)).toBe(0);

    pointA.y = -5;

    expect(pointA.angleTo(pointB)).toBe(180);
  });

  it("should calculate distance to another point", () => {
    const pointA = new Point(5, 5);
    const pointB = new Point(5, 3);

    expect(pointA.distanceTo(pointB)).toBe(2);
  });
});
