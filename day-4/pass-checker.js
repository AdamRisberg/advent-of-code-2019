function countPasswordsWithinRange(start, end, strict) {
  let count = 0;
  for (let i = start; i <= end; i++) {
    if (checkPassword(i, strict)) count++;
  }

  return count;
}

function checkPassword(password, strict) {
  let passStr = password + "";
  let adjacentCount = 1;
  let prevChar = passStr[0];
  let hasAdjacent = false;

  // Loop one extra time to ensure last adjacent run gets checked
  for (let i = 1; i <= passStr.length; i++) {
    if (!hasAdjacent && passStr[i] !== prevChar) {
      hasAdjacent = strict ? adjacentCount === 2 : adjacentCount >= 2;
      adjacentCount = 1;
    } else {
      adjacentCount++;
    }

    // Compare with previous to account for extra loop with undefined char
    if (Number(passStr[i - 1]) > Number(passStr[i])) {
      return false;
    }

    prevChar = passStr[i];
  }

  return hasAdjacent;
}

module.exports = {
  countPasswordsWithinRange,
  checkPassword
};
