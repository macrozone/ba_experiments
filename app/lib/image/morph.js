/** Image morphology operations and index image I/O.
 *
 * Copyright 2015  Kota Yamaguchi
 */

import compat from './compat';
import maxFilter from './morph/max-filter';
function decodeIndexImage(imageData) {
  var indexImage = {
    width: imageData.width,
    height: imageData.height,
    data: new Int32Array(imageData.width * imageData.height)
  };
  for (var i = 0; i < imageData.data.length; ++i) {
    var offset = 4 * i;
    indexImage.data[i] = (imageData.data[offset + 0]) |
                           (imageData.data[offset + 1] << 8) |
                           (imageData.data[offset + 2] << 16);
  }
  return indexImage;
}

function encodeIndexImage(indexImage) {
  var imageData = compat.createImageData(indexImage.width, indexImage.height);
  for (let i = 0; i < indexImage.length; ++i) {
    const offset = 4 * i;
    const value = indexImage.data[i];
    imageData.data[offset] = 255 & value;
    imageData.data[offset + 1] = 255 & (value >>> 8);
    imageData.data[offset + 2] = 255 & (value >>> 16);
    imageData.data[offset + 3] = 255;
  }
  return imageData;
}

export default {
  encodeIndexImage,
  decodeIndexImage,
  maxFilter
};
