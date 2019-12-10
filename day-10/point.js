function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.equalTo = function(point) {
  return this.x === point.x && this.y === point.y;
};

Point.prototype.angleTo = function(point) {
  const radians = Math.atan2(point.y - this.y, point.x - this.x);
  let degrees = radians * (180 / Math.PI);
  degrees += 90;

  if (degrees < 0) {
    degrees += 360;
  }
  return degrees;
};

Point.prototype.distanceTo = function(point) {
  const x = Math.abs(this.x - point.x);
  const y = Math.abs(this.y - point.y);
  return Math.sqrt(x * x + y * y);
};

module.exports = Point;
