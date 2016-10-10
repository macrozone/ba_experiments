/** Compatibility API.
 *
 * Copyright 2015  Kota Yamaguchi
 * -----
 * ES2015 transcription 2016 Marco Wettstein, ZHAW
 */

  // Internet Explorer doesn't support ImageData().
export default {
  createImageData(width, height) {
    const context = document.createElement('canvas').getContext('2d');
    return context.createImageData(width, height);
  }
};
