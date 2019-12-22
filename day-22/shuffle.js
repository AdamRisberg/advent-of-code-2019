const bigInt = require("big-integer");

bigInt.prototype.modNeg = function(n) {
  if (this < 0) {
    return this.mod(n)
      .plus(n)
      .mod(n);
  }
  return this.mod(n);
};

function simulateCardShuffle(instructions, numOfCards, times, cardIndex) {
  numOfCards = bigInt(numOfCards);
  times = bigInt(times);
  let cards = [bigInt.one, bigInt.zero];

  parseInstructions(instructions).forEach(instruction => {
    const arg = bigInt(instruction[1]);
    let [cardA, cardB] = cards;

    switch (instruction[0]) {
      case "a": // deal into
        cards = [
          cardA.negate().modNeg(numOfCards),
          cardB
            .negate()
            .minus(bigInt.one)
            .modNeg(numOfCards)
        ];
        break;
      case "b": // cut
        cards = [cardA, cardB.minus(arg).modNeg(numOfCards)];
        break;
      case "c": // deal with
        cards = [
          cardA.times(arg).modNeg(numOfCards),
          cardB.times(arg).modNeg(numOfCards)
        ];
        break;
      default:
        throw new Error(`Unknown shuffle type: ${instruction[0]}`);
    }
  });

  let [a, b] = cards;
  let an = a.modPow(times, numOfCards);

  let A = an;
  let B = b
    .times(an.minus(bigInt.one))
    .times(a.minus(bigInt.one).modInv(numOfCards));

  return bigInt(cardIndex)
    .minus(B)
    .times(A.modInv(numOfCards))
    .modNeg(numOfCards)
    .plus(numOfCards)
    .modNeg(numOfCards)
    .valueOf();
}

function shuffleAndFindCardIndex(instructions, numOfCards, searchCard) {
  const shuffled = shuffleCards(instructions, numOfCards);
  return findIndexOfCardN(shuffled, searchCard);
}

function shuffleCards(instructions, numOfCards) {
  let cards = createCards(numOfCards);

  parseInstructions(instructions).forEach(instruction => {
    switch (instruction[0]) {
      case "a":
        cards = dealIntoNewStack(cards);
        break;
      case "b":
        cards = cutCards(cards, instruction[1]);
        break;
      case "c":
        cards = dealIncrementN(cards, instruction[1]);
        break;
      default:
        throw new Error(`Unknown shuffle type: ${instruction[0]}`);
    }
  });

  return cards;
}

function parseInstructions(instructions) {
  return instructions.map(str => {
    const arg = Number(str.replace(/[^0-9-]/g, ""));
    if (str.startsWith("deal into")) {
      return ["a"];
    } else if (str.startsWith("cut")) {
      return ["b", arg];
    } else if (str.startsWith("deal with")) {
      return ["c", arg];
    } else {
      throw new Error(`Parsing failed at: ${str}`);
    }
  });
}

function dealIntoNewStack(cards) {
  const result = [];

  for (let i = 0; i < cards.length; i++) {
    result[cards.length - 1 - i] = cards[i];
  }

  return result;
}

function cutCards(cards, n) {
  return [...cards.slice(n), ...cards.slice(0, n)];
}

function dealIncrementN(cards, n) {
  const cardsCopy = cards.slice();
  const result = [];
  let curIdx = 0;

  while (cardsCopy.length) {
    if (result[curIdx] === undefined) {
      let curCard = cardsCopy.shift();
      result[curIdx] = curCard;

      curIdx += n;
      if (curIdx >= cards.length) {
        curIdx -= cards.length;
      }
    }
  }

  return result;
}

function findIndexOfCardN(cards, n) {
  for (let i = 0; i < cards.length; i++) {
    if (cards[i] === 2019) {
      return i;
    }
  }
}

function createCards(n) {
  const cards = [];

  for (let i = 0; i < n; i++) {
    cards.push(i);
  }

  return cards;
}

module.exports = {
  shuffleCards,
  findIndexOfCardN,
  simulateCardShuffle,
  shuffleAndFindCardIndex
};
