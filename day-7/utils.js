function getPermutations(array, output, n) {
  n = n || array.length;
  if (n === 1) {
    output(array);
  } else {
    for (var i = 1; i <= n; i += 1) {
      getPermutations(array, output, n - 1);
      if (n % 2) {
        var j = 1;
      } else {
        var j = i;
      }
      swap(array, j - 1, n - 1);
    }
  }
}

function swap(array, pos1, pos2) {
  var temp = array[pos1];
  array[pos1] = array[pos2];
  array[pos2] = temp;
}

module.exports = {
  getPermutations
};
