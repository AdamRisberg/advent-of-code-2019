function createGrid(outputs) {
  const grid = [[]];
  let row = 0;

  for (let i = 0; i < outputs.length; i++) {
    const cur = outputs[i];
    switch (cur) {
      case 35:
        grid[row].push("#");
        break;
      case 46:
        grid[row].push(".");
        break;
      case 10:
        row++;
        setupRow(grid, row);
        break;
      default:
        grid[row].push("^");
    }
  }

  return grid;
}

function calculateIntersections(grid) {
  const intersections = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (
        checkScaffold(grid, x - 1, y) &&
        checkScaffold(grid, x + 1, y) &&
        checkScaffold(grid, x, y - 1) &&
        checkScaffold(grid, x, y + 1)
      ) {
        intersections.push(x * y);
      }
    }
  }

  return intersections.reduce((total, num) => {
    return total + num;
  }, 0);
}

function checkScaffold(grid, x, y) {
  if (x < 0 || y < 0) return false;
  if (x >= grid[0].length || y >= grid.length) return false;
  if (grid[y][x] === "#") return true;
  return false;
}

function setupRow(grid, row) {
  if (!grid[row]) {
    grid.push([]);
  }
}

function printGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(""));
  }
}

function createInputs(commands, funcA, funcB, funcC) {
  return [
    ...toAsciiArray(commands),
    ...toAsciiArray(funcA),
    ...toAsciiArray(funcB),
    ...toAsciiArray(funcC),
    ...toAsciiArray("n"),
    10
  ];
}

function toAsciiArray(str) {
  const arr = str.split("").map(char => char.charCodeAt(0));
  arr.push(10);
  return arr;
}

module.exports = {
  createGrid,
  calculateIntersections,
  printGrid,
  toAsciiArray,
  createInputs
};
