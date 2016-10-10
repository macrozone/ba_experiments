/** Canny edge detection.
 *
 *  var edge = canny(imageData, {});
 *
 * Copyright 2015  Kota Yamaguchi
 * -----
 * ES2015 transcription 2016 Marco Wettstein, ZHAW
 */
import compat from './compat';

function createIntensityData(width, height) {
  return {
    width,
    height,
    data: new Float32Array(width * height)
  };
}

function createGaussian1D(k = 1, sigma = 1.3) {

  const size = 2 * k + 1;
  const kernel = new Float32Array(size);
  const coeff = 1 / (2 * Math.PI * Math.pow(sigma, 2));
  for (let i = 0; i < size; ++i) {
    kernel[i] = coeff * Math.exp(-Math.pow((i - k) / sigma, 2));
  }
  return normalize(kernel);
}

function normalize(array) {
  let sum = 0;
  for (let i = 0; i < array.length; ++i) {
    sum += array[i];
  }
  for (let i = 0; i < array.length; ++i) {
    array[i] /= sum;
  }
  return array;
}

function rgb2intensity(imageData) {
  const intensity = createIntensityData(imageData.width, imageData.height);
  const newData = intensity.data;
  const data = imageData.data;
  for (let i = 0; i < imageData.width * imageData.height; ++i) {
    newData[i] = (data[4 * i] + data[4 * i + 1] + data[4 * i + 2]) /
                   (3 * 255);
  }
  return intensity;
}

  // function intensity2rgb(intensity) {
  //   var newImageData = compat.createImageData(intensity.width,
  //                                             intensity.height),
  //       data = intensity.data,
  //       newData = newImageData.data;
  //   for (var i = 0; i < data.length; ++i) {
  //     var value = Math.max(Math.min(Math.round(255 * data[i]), 255), 0);
  //     newData[4 * i] = value;
  //     newData[4 * i + 1] = value;
  //     newData[4 * i + 2] = value;
  //     newData[4 * i + 3] = 255;
  //   }
  //   return newImageData;
  // }

function padImage(intensity, sizeParam = [ 0,0 ]) {
  let size = sizeParam;
  if (typeof sizeParam === 'number') {
    size = [ sizeParam, sizeParam ];
  }
  const {width, height, data} = intensity;

  const newIntensity = createIntensityData(width + 2 * size[0],
                                           height + 2 * size[1]);
  const newData = newIntensity.data;

  for (let i = 0; i < newIntensity.height; ++i) {
    const y = (i < size[1]) ? size[1] - i :
              (i >= height + size[1]) ? 2 * height - size[1] + 1 - i :
              i - size[1];
    for (let j = 0; j < newIntensity.width; ++j) {
      const x = (j < size[0]) ? size[0] - j :
                (j >= width + size[0]) ? 2 * width - size[0] + 1 - j :
                j - size[0];
      const newOffset = i * newIntensity.width + j;
      const oldOffset = y * width + x;
      newData[newOffset] = data[oldOffset];
    }
  }
  return newIntensity;
}

function filter1D(intensity, kernel, horizontal) {
  const size = Math.round((kernel.length - 1) / 2);
  const paddedData = padImage(intensity,
                              (horizontal) ? [ size, 0 ] : [ 0, size ]);
  const {data,width, height} = paddedData;

  const temporaryData = new Float32Array(data.length);

  if (horizontal) {
    for (let i = 0; i < height; ++i) {
      for (let j = size; j < width - size; ++j) {
        const offset = i * width + j;
        let value = kernel[size] * data[offset];
        for (let k = 1; k <= size; ++k) {
          value += kernel[size + k] * data[offset + k] +
                     kernel[size - k] * data[offset - k];
        }
        temporaryData[offset] = value;
      }
    }
  } else {
    for (let i = size; i < height - size; ++i) {
      for (let j = 0; j < width; ++j) {
        const offset = i * width + j;
        let value = kernel[size] * data[offset];
        for (let k = 1; k <= size; ++k) {
          value += kernel[size + k] * data[offset + width * k] +
                     kernel[size - k] * data[offset - width * k];
        }
        temporaryData[offset] = value;
      }
    }
  }
  paddedData.data.set(temporaryData);
  return padImage(paddedData, (horizontal) ? [ -size, 0 ] : [ 0, -size ]);
}

function filter1DTwice(intensity, kernel) {
  return filter1D(filter1D(intensity, kernel, true), kernel, false);
}

function detectEdges(intensity, options) {
  const {width, height} = intensity;
  const magnitude = new Float32Array(intensity.data.length);
  const orientation = new Float32Array(intensity.data.length);
  const suppressed = new Float32Array(intensity.data.length);
  const result = createIntensityData(width, height);
  const SobelKernel = [ -1, 0, 1 ];
  const dx = filter1D(intensity, SobelKernel, true);
  const dy = filter1D(intensity, SobelKernel, false);

  for (let i = 0; i < intensity.data.length; ++i) {
    magnitude[i] = Math.sqrt(Math.pow(dx.data[i], 2) +
                               Math.pow(dy.data[i], 2));
    const direction = Math.atan2(dy.data[i], dx.data[i]);
    orientation[i] = (direction < 0) ? direction + Math.PI :
                       (direction > Math.PI) ? direction - Math.PI : direction;
  }
    // NMS.
  for (let i = 1; i < height - 1; ++i) {
    for (let j = 1; j < width - 1; ++j) {
      const offset = i * width + j;
      const direction = orientation[offset];
      let offset1;
      let offset2;
      if (direction < Math.PI / 8 || 7 * Math.PI / 8 <= direction) {
        offset1 = offset - 1;
        offset2 = offset + 1;
      } else if (Math.PI / 8 <= direction && direction < 3 * Math.PI / 8) {
        offset1 = offset - width - 1;
        offset2 = offset + width + 1;
      } else if (3 * Math.PI / 8 <= direction && direction < 5 * Math.PI / 8) {
        offset1 = offset - width;
        offset2 = offset + width;
      } else if (5 * Math.PI / 8 <= direction && direction < 7 * Math.PI / 8) {
        offset1 = offset - width + 1;
        offset2 = offset + width - 1;
      }
      suppressed[offset] = (magnitude[offset] > magnitude[offset1] &&
                              magnitude[offset] > magnitude[offset2]) ?
                              magnitude[offset] : 0;
    }
  }
    // Hysteresis.
  for (let i = 1; i < height - 1; ++i) {
    for (let j = 1; j < width - 1; ++j) {
      const offset = i * width + j;
      let direction = orientation[offset] - 0.5 * Math.PI;
      direction = (direction < 0) ? direction + Math.PI : direction;
      let offset1;
      let offset2;
      if (direction < Math.PI / 8 || 7 * Math.PI / 8 <= direction) {
        offset1 = offset - 1;
        offset2 = offset + 1;
      } else if (Math.PI / 8 <= direction && direction < 3 * Math.PI / 8) {
        offset1 = offset - width - 1;
        offset2 = offset + width + 1;
      } else if (3 * Math.PI / 8 <= direction && direction < 5 * Math.PI / 8) {
        offset1 = offset - width;
        offset2 = offset + width;
      } else if (5 * Math.PI / 8 <= direction && direction < 7 * Math.PI / 8) {
        offset1 = offset - width + 1;
        offset2 = offset + width - 1;
      }
      result.data[offset] =
            (suppressed[offset] >= options.highThreshold ||
             (suppressed[offset] >= options.lowThreshold &&
              suppressed[offset1] >= options.highThreshold) ||
             (suppressed[offset] >= options.lowThreshold &&
              suppressed[offset2] >= options.highThreshold)) ?
             suppressed[offset] : 0;
    }
  }
  result.magnitude = magnitude;
  return result;
}

function canny(imageData, options = {}) {
  options.kernelTail = options.kernelTail || 4;
  options.sigma = options.sigma || 1.6;
  options.highThreshold = options.highThreshold || 0.04;
  options.lowThreshold = options.lowThreshold || 0.3 * options.highThreshold;
  const intensity = rgb2intensity(imageData);
  const gaussianKernel = createGaussian1D(options.kernelTail, options.sigma);
  const blurredData = filter1DTwice(intensity, gaussianKernel);
  const edge = detectEdges(blurredData, options);
  return edge;
}

export default canny;
