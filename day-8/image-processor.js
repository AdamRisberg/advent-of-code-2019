const Jimp = require("jimp");

function createImageLayers(data, width, height) {
  const layers = [];

  for (let i = 0; i < data.length; i += width * height) {
    layers.push(data.slice(i, i + width * height));
  }

  return layers;
}

function getLeastZerosLayerInfo(layers) {
  let lowestZeros = Infinity;
  let lowestIdx = 0;

  const layersInfo = layers.map((layer, i) => {
    const digitsCount = getDigitCounts(layer);

    if (digitsCount.zeroes < lowestZeros) {
      lowestZeros = digitsCount.zeroes;
      lowestIdx = i;
    }
    return digitsCount;
  });

  return layersInfo[lowestIdx];
}

function getDigitCounts(layer) {
  return layer.reduce(
    (acc, num) => {
      acc.zeroes += num === 0 ? 1 : 0;
      acc.ones += num === 1 ? 1 : 0;
      acc.twos += num === 2 ? 1 : 0;
      return acc;
    },
    { zeroes: 0, ones: 0, twos: 0 }
  );
}

function compositeAndCreateImage(layers, width, height) {
  const composite = compositeLayers(layers);
  const rows = createRows(composite, width);

  initializeImage(width, height)
    .then(image => {
      for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < rows[y].length; x++) {
          const pixelColor = !!rows[y][x] ? 0xff000000 : 0xffffffff;
          image.setPixelColor(pixelColor, x, y);
        }
      }
      return image;
    })
    .then(image => image.write("Part2.jpg"))
    .then(() => Jimp.read("Part2.jpg"))
    .then(image => image.resize(width * 10, height * 10))
    .then(image => image.write("Part2.jpg"))
    .catch(err => console.log(err));
}

function compositeLayers(layers) {
  const combined = [];

  for (let l = 0; l < layers.length; l++) {
    const curLayer = layers[l];

    for (let i = 0; i < curLayer.length; i++) {
      if (curLayer[i] !== 2 && combined[i] === undefined) {
        combined[i] = curLayer[i];
      }
    }
  }

  return combined;
}

function createRows(data, rowWidth) {
  const rows = [];

  for (let i = 0; i < data.length; i += rowWidth) {
    rows.push(data.slice(i, i + rowWidth));
  }
  return rows;
}

function initializeImage(width, height) {
  return new Promise((resolve, reject) => {
    new Jimp(width, height, (err, image) => {
      if (err) return reject(err);
      resolve(image);
    });
  });
}

module.exports = {
  createImageLayers,
  getLeastZerosLayerInfo,
  compositeAndCreateImage
};
