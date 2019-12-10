const path = require("path");
const fs = require("fs");

const mainInput = fs
  .readFileSync(path.resolve(__dirname, "raw-input.txt"), "UTF-8")
  .split("\r\n")
  .map(row => row.split(""));

const testInput = fs
  .readFileSync(path.resolve(__dirname, "raw-test-input.txt"), "UTF-8")
  .split("\r\n")
  .map(row => row.split(""));

module.exports = { main: mainInput, test: testInput };
