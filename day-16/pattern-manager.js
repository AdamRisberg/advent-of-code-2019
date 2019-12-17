function PatternManager(pattern) {
  this.pattern = pattern;
  this.curIdx = 0;
  this.length = pattern.length;
  this.repeat = 1;
  this.position = 1;
}

PatternManager.prototype.reset = function(position) {
  this.curIdx = 0;
  this.repeat = 1;
  this.position = position;
};

PatternManager.prototype.getValue = function() {
  if (this.repeat >= this.position) {
    this.curIdx++;
    this.repeat = 0;

    if (this.curIdx > this.length - 1) {
      this.curIdx = 0;
    }
  }

  this.repeat++;
  return this.pattern[this.curIdx];
};

PatternManager.prototype.peekValue = function() {
  let index = this.curIdx;

  if (this.repeat >= this.position) {
    index++;

    if (this.curIdx > this.length - 1) {
      index = 0;
    }
  }

  return this.pattern[index];
};

PatternManager.prototype.canSkip = function() {
  if (this.peekValue()) return 0;
  return this.position - this.repeat;
};

PatternManager.prototype.skip = function() {
  if (this.canSkip()) {
    this.repeat = this.position;
  }
};

module.exports = PatternManager;
