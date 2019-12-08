const input = require("./input");
const imageProcessor = require("./image-processor");
const {
  createImageLayers,
  getLeastZerosLayerInfo,
  compositeAndCreateImage
} = imageProcessor;
const { data, size } = input;

const layers = createImageLayers(data, size.width, size.height);
const info = getLeastZerosLayerInfo(layers);
const part1 = info.ones * info.twos;

console.log(`Part 1: ${part1}`);
console.log("Part 2: See Part2.jpg");
compositeAndCreateImage(layers, size.width, size.height);
