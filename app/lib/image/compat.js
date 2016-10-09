/** Compatibility API.
 *
 * Copyright 2015  Kota Yamaguchi
 */

  // Internet Explorer doesn't support ImageData().
export default {
  createImageData(width, height) {
    const context = document.createElement('canvas').getContext('2d');
    return context.createImageData(width, height);
  }
};
