function GridLevel(grid, blank, single) {
  this.grid = this.copyGrid(grid, blank, single);
  this.single = single;
  this.bugCount = 0;
  this.previous = null;
  this.next = null;
  this.biodiversity = 0;
  this.biodiversityHistory = [];

  this.outer = new CounterGroup();
  this.newOuter = new CounterGroup();
  this.inner = new CounterGroup();
  this.newInner = new CounterGroup();
  this.initializeCounts();
}

GridLevel.prototype.countBugs = function(forward = true, backward = true) {
  let leftCount = 0;

  if (this.previous && backward) {
    leftCount = this.previous.countBugs(false, true);
  }

  let rightCount = 0;
  if (this.next && forward) {
    rightCount = this.next.countBugs(true, false);
  }

  return this.bugCount + leftCount + rightCount;
};

GridLevel.prototype.forEach = function(cb) {
  for (let y = 0; y < this.grid.length; y++) {
    for (let x = 0; x < this.grid[0].length; x++) {
      if (!this.single && y === 2 && x === 2) continue;
      cb(this.grid[y][x], x, y, this.grid.length - 1, this.grid[0].length - 1);
    }
  }
};

GridLevel.prototype.initializeCounts = function() {
  if (this.single) return;

  this.forEach((square, x, y, lastX, lastY) => {
    const bug = square === "#";

    // OUTER
    if (y === 0) {
      this.outer.top += bug ? 1 : 0;
    } else if (y === this.grid.length - 1) {
      this.outer.bottom += bug ? 1 : 0;
    }

    if (x === 0) {
      this.outer.left += bug ? 1 : 0;
    } else if (x === this.grid[0].length - 1) {
      this.outer.right += bug ? 1 : 0;
    }

    // INNER
    if (y === 1 && x === 2) {
      this.inner.top += bug ? 1 : 0;
    } else if (y === 3 && x === 2) {
      this.inner.bottom += bug ? 1 : 0;
    } else if (y === 2 && x === 1) {
      this.inner.left += bug ? 1 : 0;
    } else if (y === 2 && x === 3) {
      this.inner.right += bug ? 1 : 0;
    }
  });
};

GridLevel.prototype.needsLayer = function(counterGroup) {
  if (
    counterGroup.top ||
    counterGroup.bottom ||
    counterGroup.left ||
    counterGroup.right
  ) {
    return true;
  }
  return false;
};

GridLevel.prototype.print = function() {
  this.grid.forEach(row => {
    console.log(row.join(""));
  });
};

GridLevel.prototype.shouldHaveBug = function(square, adjacentCount) {
  if (square === "#") {
    return adjacentCount === 1;
  } else if (square === ".") {
    return adjacentCount === 1 || adjacentCount === 2;
  }
  return false;
};

GridLevel.prototype.getAdjacentBugCount = function(x, y) {
  let count = 0;
  if (this.grid[y - 1] && this.grid[y - 1][x] === "#") {
    count++;
  }
  if (this.grid[y + 1] && this.grid[y + 1][x] === "#") {
    count++;
  }
  if (this.grid[y][x - 1] && this.grid[y][x - 1] === "#") {
    count++;
  }
  if (this.grid[y][x + 1] && this.grid[y][x + 1] === "#") {
    count++;
  }

  return count;
};

const defaultCounts = new CounterGroup();

GridLevel.prototype.simulate = function(minutes) {
  let counter = 0;

  while (!minutes || counter < minutes) {
    if (this.step()) return;
    counter++;
  }
};

GridLevel.prototype.step = function(forward = true, backward = true) {
  const copy = this.copyGrid(this.grid, false, this.single);
  const inner = this.next ? this.next.outer : defaultCounts;
  const outer = this.previous ? this.previous.inner : defaultCounts;
  this.bugCount = 0;
  this.biodiversity = 0;

  this.forEach((square, x, y, lastX, lastY) => {
    const adjCount = this.getAdjacentBugCount(x, y);
    let bug = this.shouldHaveBug(square, adjCount);

    // OUTER
    if (x === 0 && y === 0) {
      bug = this.shouldHaveBug(square, adjCount + outer.top + outer.left);
      this.newOuter.top += bug ? 1 : 0;
      this.newOuter.left += bug ? 1 : 0;
    } else if (x === 0 && y === lastY) {
      bug = this.shouldHaveBug(square, adjCount + outer.bottom + outer.left);
      this.newOuter.bottom += bug ? 1 : 0;
      this.newOuter.left += bug ? 1 : 0;
    } else if (x === lastX && y === 0) {
      bug = this.shouldHaveBug(square, adjCount + outer.top + outer.right);
      this.newOuter.top += bug ? 1 : 0;
      this.newOuter.right += bug ? 1 : 0;
    } else if (x === lastX && y === lastY) {
      bug = this.shouldHaveBug(square, adjCount + outer.bottom + outer.right);
      this.newOuter.bottom += bug ? 1 : 0;
      this.newOuter.right += bug ? 1 : 0;
    } else if (y === 0) {
      bug = this.shouldHaveBug(square, adjCount + outer.top);
      this.newOuter.top += bug ? 1 : 0;
    } else if (y === lastY) {
      bug = this.shouldHaveBug(square, adjCount + outer.bottom);
      this.newOuter.bottom += bug ? 1 : 0;
    } else if (x === 0) {
      bug = this.shouldHaveBug(square, adjCount + outer.left);
      this.newOuter.left += bug ? 1 : 0;
    } else if (x === lastX) {
      bug = this.shouldHaveBug(square, adjCount + outer.right);
      this.newOuter.right += bug ? 1 : 0;
    }

    // INNER
    if (y === 1 && x === 2) {
      bug = this.shouldHaveBug(square, adjCount + inner.top);
      this.newInner.top += bug ? 1 : 0;
    } else if (y === 3 && x === 2) {
      bug = this.shouldHaveBug(square, adjCount + inner.bottom);
      this.newInner.bottom += bug ? 1 : 0;
    } else if (y === 2 && x === 1) {
      bug = this.shouldHaveBug(square, adjCount + inner.left);
      this.newInner.left += bug ? 1 : 0;
    } else if (y === 2 && x === 3) {
      bug = this.shouldHaveBug(square, adjCount + inner.right);
      this.newInner.right += bug ? 1 : 0;
    }

    copy[y][x] = bug ? "#" : ".";
    this.bugCount += bug;

    this.biodiversity += bug ? Math.pow(2, y * (lastX + 1) + x) : 0;
  });

  if (!this.single) {
    if (this.needsLayer(this.inner) && !this.next) {
      this.next = new GridLevel(this.grid, true);
      this.next.previous = this;
    }
    if (this.needsLayer(this.outer) && !this.previous) {
      this.previous = new GridLevel(this.grid, true);
      this.previous.next = this;
    }

    // RECURSE OUTER
    if (backward && this.previous) {
      this.previous.step(false, true);
    }
    // RECURSE INNER
    if (forward && this.next) {
      this.next.step(true, false);
    }
  }

  // APPLY CHANGES
  this.inner = this.newInner;
  this.outer = this.newOuter;
  this.newInner = new CounterGroup();
  this.newOuter = new CounterGroup();
  this.grid = copy;

  if (this.single) {
    const foundMatch = this.biodiversityHistory.includes(this.biodiversity);
    this.biodiversityHistory.push(this.biodiversity);
    return foundMatch;
  }
};

GridLevel.prototype.copyGrid = function(grid, blank, single) {
  const copy = grid.map(row => row.slice());
  if (!single) {
    copy[2][2] = "?";
  }
  if (!blank) return copy;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (!single && y === 2 && x === 2) {
        copy[y][x] = "?";
        continue;
      }
      copy[y][x] = blank ? "." : grid[y][x];
    }
  }
  return copy;
};

function CounterGroup() {
  this.left = 0;
  this.right = 0;
  this.bottom = 0;
  this.top = 0;
}

module.exports = GridLevel;
