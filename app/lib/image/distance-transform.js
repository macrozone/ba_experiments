/** Distance transform implementation based on the following paper.
 *
 * Distance Transforms of Sampled Functions
 * P. Felzenszwalb, D. Huttenlocher
 * Theory of Computing, Vol. 8, No. 19, September 2012
 *
 * Copyright 2015  Kota Yamaguchi
 */
import compat from './compat';

const INF = 1e20;

function distanceTransform1D(f, n) {
  const d = new Float32Array(n);
  const v = new Int32Array(n);
  const z = new Float32Array(n + 1);
  let k = 0;
  const square = function (x) { return x * x; };
  let q;
  v[0] = 0;
  z[0] = -INF;
  z[1] = INF;
  for (q = 1; q <= n - 1; ++q) {
    var s = ((f[q] + square(q)) - (f[v[k]] + square(v[k]))) /
              (2 * q - 2 * v[k]);
    if (isNaN(s)) {
      throw new Error('NaN error');
    }
    while (s <= z[k]) {
      --k;
      s = ((f[q] + square(q)) - (f[v[k]] + square(v[k]))) /
             (2 * q - 2 * v[k]);
      if (isNaN(s)) {
        throw new Error('NaN error');
      }
    }
    ++k;
    v[k] = q;
    z[k] = s;
    z[k + 1] = INF;
  }
  k = 0;
  for (q = 0; q <= n - 1; ++q) {
    while (z[k + 1] < q) {
      k++;
    }
    d[q] = square(q - v[k]) + f[v[k]];
  }
  return d;
}

function distanceTransform2D(distanceMap) {
  const width = distanceMap.width;
  const height = distanceMap.height;
  const data = distanceMap.data;
  const f = new Float32Array(Math.max(width, height));
    // Column transform.
  for (let x = 0; x < width; ++x) {
    for (let y = 0; y < height; ++y) {
      f[y] = data[y * width + x];
    }
    let d = distanceTransform1D(f, height);
    for (let y = 0; y < height; ++y) {
      data[y * width + x] = d[y];
    }
  }
    // Row transform.
  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      f[x] = data[y * width + x];
    }
    let d = distanceTransform1D(f, width);
    for (let x = 0; x < width; ++x) {
      data[y * width + x] = d[x];
    }
  }
    // Sqrt.
  for (let x = 0; x < data.length; ++x) {
    data[x] = Math.sqrt(data[x]);
  }
}

function distanceTransform(intensity, options = {}) {
  var distanceMap = {
    width: intensity.width,
    height: intensity.height,
    data: new Float32Array(intensity.data.length)
  };
  for (var offset = 0; offset < distanceMap.data.length; ++offset) {
    distanceMap.data[offset] = (intensity.data[offset]) ? 0 : INF;
  }
  distanceTransform2D(distanceMap);
    // if (options.outputRGB)
    //  distanceMap = intensity2rgb(distanceMap);
  return distanceMap;
}

  // For debugging.
  // function intensity2rgb(intensity) {
  //   var newImageData = compat.createImageData(intensity.width,
  //                                             intensity.height),
  //       data = intensity.data,
  //       newData = newImageData.data;
  //   for (var i = 0; i < data.length; ++i) {
  //     var value = Math.round(data[i]);
  //     newData[4 * i] = 255 & value;
  //     newData[4 * i + 1] = 255 & (value >> 8);
  //     newData[4 * i + 2] = 255 & (value >> 16);
  //     newData[4 * i + 3] = 255;
  //   }
  //   return newImageData;
  // }

export default distanceTransform;
