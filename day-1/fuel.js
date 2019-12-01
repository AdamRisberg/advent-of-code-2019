function calculateFuel(mass) {
  return Math.floor(mass / 3) - 2;
}

function calculateFuelRecursive(mass, total = 0) {
  const fuel = calculateFuel(mass);

  if (fuel <= 0) {
    return total;
  }

  return calculateFuelRecursive(fuel, total + fuel);
}

/**
 * Calculates required fuel based on module's mass
 * @param  {Number}  mass             Mass of module
 * @param  {Boolean} includeFuelMass  Include fuel mass in calculation
 * @return {Number}                   Required fuel
 */
function getRequiredFuel(mass, includeFuelMass) {
  return includeFuelMass ? calculateFuelRecursive(mass) : calculateFuel(mass);
}

/**
 * Calculates total fuel required by multiple modules
 * @param   {Number[]}  masses          Array of module masses
 * @param   {Boolean}   includeFuelMass Include fuel mass in calculation
 * @return  {Number}                    Total required fuel
 */
function getTotalRequiredFuel(masses, includeFuelMass) {
  return masses.reduce((totalFuel, mass) => {
    return totalFuel + getRequiredFuel(mass, includeFuelMass);
  }, 0);
}

module.exports = {
  getRequiredFuel,
  getTotalRequiredFuel
};
