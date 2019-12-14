const path = require("path");
const fs = require("fs");

const getInput = inputFilePath => {
  return fs
    .readFileSync(path.resolve(__dirname, inputFilePath), "UTF-8")
    .split("\r\n")
    .map(line => {
      let [ingredients, result] = line.split("=>");

      const ingredientsArray = ingredients
        .trim()
        .split(",")
        .map(i => i.trim().split(" "));
      const resultArray = result.trim().split(" ");

      return {
        result: resultArray,
        ingredients: ingredientsArray
      };
    })
    .reduce((acc, next) => {
      const parentKey = next.result[1];

      acc[parentKey] = {
        amount: Number(next.result[0]),
        store: 0
      };

      for (let i = 0; i < next.ingredients.length; i++) {
        acc[parentKey][next.ingredients[i][1]] = Number(next.ingredients[i][0]);
      }

      return acc;
    }, {});
};

module.exports = getInput;
