const PatternManager = require("./pattern-manager");

function processSignal(transmission, phases, pattern) {
  while (phases > 0) {
    processOnce(transmission, pattern);
    phases--;
  }
  return Number(transmission.slice(0, 8).join(""));
}

function processOnce(transmission, pattern) {
  const patternManager = new PatternManager(pattern);

  for (let j = 0; j < transmission.length; j++) {
    let sum = 0;

    patternManager.reset(j + 1);
    patternManager.skip();

    for (let i = j; i < transmission.length; i++) {
      const skip = patternManager.canSkip();

      if (skip) {
        if (transmission.length - 1 - i < skip) {
          break;
        } else {
          i += skip;
          patternManager.skip();
        }
      }

      const num = transmission[i] * patternManager.getValue();

      sum += num;
    }

    transmission[j] = Math.abs(sum) % 10;
  }
}

function processSignalWithRepeat(transmission, phases, repeat) {
  const offset = Number(transmission.slice(0, 7).join(""));
  const times = getNumOfRepeats(transmission.length, repeat, offset);
  const nums = repeatArray(transmission, times).slice(
    offset % transmission.length
  );

  for (let i = 0; i < phases; i++) {
    for (let j = nums.length - 1; j >= 1; j--) {
      nums[j - 1] = addForSingleDigit(nums[j], nums[j - 1]);
    }
  }

  return Number(nums.slice(0, 8).join(""));
}

function getNumOfRepeats(length, repeatInput, offset) {
  const totalLength = length * repeatInput;
  return Math.ceil((totalLength - offset) / length);
}

function addForSingleDigit(a, b) {
  return Math.abs(a + b) % 10;
}

function repeatArray(array, times) {
  const result = [];

  while (times > 0) {
    result.push(...array);
    times--;
  }
  return result;
}

module.exports = {
  processSignal,
  processSignalWithRepeat
};
