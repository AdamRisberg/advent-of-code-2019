const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.resolve(__dirname, "raw-input.txt"), "UTF-8")
  .split("")
  .map(char => Number(char));

module.exports = {
  data: input,
  size: {
    width: 25,
    height: 6
  }
};
