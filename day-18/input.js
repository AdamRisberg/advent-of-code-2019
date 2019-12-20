const path = require("path");
const fs = require("fs");

const inputPart1 = fs.readFileSync(
  path.resolve(__dirname, "raw-input.txt"),
  "UTF-8"
);
const inputPart2 = fs.readFileSync(
  path.resolve(__dirname, "raw-input-2.txt"),
  "UTF-8"
);

module.exports = { inputPart1, inputPart2 };
