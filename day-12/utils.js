function greatestCommonDivisor(a, b) {
  if (!b) return b === 0 ? a : NaN;
  return greatestCommonDivisor(b, a % b);
}
function leastCommonMultiple(a, b) {
  return (a * b) / greatestCommonDivisor(a, b);
}
function leastCommonMultipleOfArray(array) {
  var n = 1;
  for (var i = 0; i < array.length; i++) {
    n = leastCommonMultiple(array[i], n);
  }
  return n;
}

module.exports = {
  leastCommonMultiple,
  greatestCommonDivisor,
  leastCommonMultipleOfArray
};
