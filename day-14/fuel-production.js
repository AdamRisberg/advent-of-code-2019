function calculateMaxFuelProduction(ore, materials) {
  let min = 0;
  let max = ore;

  while (min < max) {
    const mid = (min + max) / 2;
    if (enoughOreForFuel(mid, ore, materials)) {
      min = mid;
    } else {
      max = mid;
    }
  }

  return Math.floor(min);
}

function enoughOreForFuel(fuel, ore, materials) {
  return ore > getOreRequiredForElement("FUEL", fuel, materials);
}

function getOreRequiredForElement(element, needed, materials) {
  if (!needed) return 0;
  if (element === "ORE") {
    return needed;
  }

  let have = materials[element].store;

  if (have > needed) {
    const leftOver = have - needed;
    materials[element].store = leftOver;
    needed = 0;
  } else {
    needed -= have;
    materials[element].store = 0;
  }

  const produced = materials[element].amount;
  const batches = Math.ceil(needed / produced);
  let toMake = produced * batches;

  if (toMake > needed) {
    const left = toMake - needed;
    materials[element].store += left;
  }

  let oreNeeded = 0;
  for (let key in materials[element]) {
    if (key === "amount" || key === "store") continue;
    oreNeeded += getOreRequiredForElement(
      key,
      materials[element][key] * batches,
      materials
    );
  }

  return oreNeeded;
}

module.exports = {
  calculateMaxFuelProduction,
  enoughOreForFuel,
  getOreRequiredForElement
};
