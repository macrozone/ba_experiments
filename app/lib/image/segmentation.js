/** Image segmentation factory.
 *
 *  var segm = segmentation.create(imageData);
 *  var segmentData = segm.result;  // imageData with numSegments.
 *
 *  segm.finer();
 *  segm.coarser();
 *
 * Copyright 2015  Kota Yamaguchi
 * -----
 * ES2015 transcription 2016 Marco Wettstein, ZHAW
 */

import pff from './segmentation/pff';
import slic from './segmentation/slic';
import slico from './segmentation/slico';
import watershed from './segmentation/watershed';

const methods = { pff, slic, slico, watershed};

methods.create = function (imageData, options = {}) {
  options.method = options.method || 'slic';
  if (!methods[options.method]) {
    throw new Error('Invalid method: ' + options.method);
  }
  return new methods[options.method](imageData, options);
};

export default methods;
