function Moon(posX, posY, posZ) {
  this.position = new Vector3D(posX, posY, posZ);
  this.velocity = new Vector3D(0, 0, 0);
}

Moon.prototype.move = function() {
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
  this.position.z += this.velocity.z;
};

Moon.prototype.getPotentialEnergy = function() {
  return (
    Math.abs(this.position.x) +
    Math.abs(this.position.y) +
    Math.abs(this.position.z)
  );
};

Moon.prototype.getKineticEnergy = function() {
  return (
    Math.abs(this.velocity.x) +
    Math.abs(this.velocity.y) +
    Math.abs(this.velocity.z)
  );
};

function Vector3D(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

module.exports = Moon;
