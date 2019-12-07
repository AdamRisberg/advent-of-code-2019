function getPermutations(array) {
  const result = [];
  permutations([...array], array.length, perm => result.push(perm));
  return result;
}

function permutations(array, n, cb) {
  n = n || array.length;

  if (n === 1) {
    cb([...array]);
    return;
  }

  for (let i = 0; i < n; i++) {
    permutations(array, n - 1, cb);

    if (n % 2 === 0) {
      swap(array, i, n - 1);
    } else {
      swap(array, 0, n - 1);
    }
  }
}

function swap(array, idxA, idxB) {
  const temp = array[idxA];
  array[idxA] = array[idxB];
  array[idxB] = temp;
}

module.exports = getPermutations;
