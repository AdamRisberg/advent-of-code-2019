function padNumber(num, length) {
  const str = num + "";
  return str.padStart(length, "0");
}

module.exports = {
  padNumber
};
