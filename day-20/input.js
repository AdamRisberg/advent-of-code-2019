const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(
  path.resolve(__dirname, "raw-input.txt"),
  "UTF-8"
);

const testInput = fs.readFileSync(
  path.resolve(__dirname, "raw-test-input.txt"),
  "UTF-8"
);

module.exports = { input, testInput };
