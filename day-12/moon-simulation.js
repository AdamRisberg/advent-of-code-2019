const utils = require("./utils");

function simulateMoonsAndGetTotalEnergy(moons, stepsToSimulate) {
  simulateMoons(moons, stepsToSimulate);
  return getTotalEnergyOfMoons(moons);
}

function simulateMoons(moons, stepsToSimulate) {
  while (stepsToSimulate > 0) {
    const applied = new Set();

    for (let i = 0; i < moons.length; i++) {
      for (let j = 0; j < moons.length; j++) {
        const key = "" + i + j;
        const reverseKey = "" + j + i;

        if (!applied.has(key) && !applied.has(reverseKey)) {
          applyGravity(moons[i], moons[j]);
          applied.add(key);
          applied.add(reverseKey);
        }
      }
    }

    moons.forEach(moon => moon.move());
    stepsToSimulate--;
  }
}

function applyGravity(moonA, moonB) {
  applyGravityToAxis(moonA, moonB, "x");
  applyGravityToAxis(moonA, moonB, "y");
  applyGravityToAxis(moonA, moonB, "z");
}

function applyGravityToAxis(moonA, moonB, axis) {
  if (moonA.position[axis] !== moonB.position[axis]) {
    const changeA = moonA.position[axis] < moonB.position[axis] ? 1 : -1;
    const changeB = changeA * -1;
    moonA.velocity[axis] += changeA;
    moonB.velocity[axis] += changeB;
  }
}

function getTotalEnergyOfMoons(moons) {
  return moons.reduce((total, moon) => {
    total += moon.getKineticEnergy() * moon.getPotentialEnergy();
    return total;
  }, 0);
}

function getFirstStateRepeatOfMoons(moons) {
  const repeats = [
    getFirstAxisStateRepeat(moons, "x"),
    getFirstAxisStateRepeat(moons, "y"),
    getFirstAxisStateRepeat(moons, "z")
  ];

  return utils.leastCommonMultipleOfArray(repeats);
}

function getFirstAxisStateRepeat(moons, axis) {
  let steps = 0;
  const states = new Set();

  while (true) {
    const currentState = getAxisState(moons, axis);

    if (states.has(currentState)) break;

    states.add(currentState);
    simulateMoons(moons, 1);
    steps++;
  }

  return steps;
}

function getAxisState(moons, axis) {
  let state = "";

  moons.forEach(moon => {
    state += "" + moon.position[axis] + moon.velocity[axis];
  });

  return state;
}

module.exports = {
  simulateMoons,
  getTotalEnergyOfMoons,
  getFirstStateRepeatOfMoons,
  simulateMoonsAndGetTotalEnergy
};
