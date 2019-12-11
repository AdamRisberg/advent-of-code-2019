const input = require("./input");
const paintingRobot = require("./painting-robot");
const imageProcessor = require("../day-8/image-processor");
const {
  createPaintingInfo,
  getPaintedSquaresCount,
  createPaintingGrid
} = paintingRobot;

const paintingInfoPart1 = createPaintingInfo(input);
const part1 = getPaintedSquaresCount(paintingInfoPart1);

console.log(`Part 1: ${part1}`);

const paintingInfoPart2 = createPaintingInfo(input, 1);
const paintingGrid = createPaintingGrid(paintingInfoPart2);
imageProcessor.createImage(paintingGrid, 10, "Part2");

console.log("Part 2: See Part2.jpg");
