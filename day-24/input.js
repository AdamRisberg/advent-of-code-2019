const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.resolve(__dirname, "raw-input.txt"), "UTF-8")
  .split("\r\n")
  .map(str => str.split(""));

module.exports = input;
