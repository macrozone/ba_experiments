/**
 * Canny + Watershed segmentation algorithm.
 *
 *  var segmentation = new WatershedSegmentation(imageData);
 *  var result = segmentation.result;
 *  var result = segmentation.finer();
 *  var result = segmentation.coarser();
 *
 *  TODO:
 *  * Edge options other than canny.
 *  * Create a graph-structure for coarse/fine adjustment.
 * -----
 * ES2015 transcription 2016 Marco Wettstein, ZHAW
 */
 /* eslint guard-for-in: 0*/

import BaseSegmentation from './base';
import PriorityQueue from './binary-heap-priority-queue';
import canny from '../canny';
import compat from '../compat';
import distanceTransform from '../distance-transform';
  // Constructor for the segmentation configuration.
function WatershedSegmentation(imageData, options = {}) {
  BaseSegmentation.call(this, imageData, options);
  this.sigmaRange = options.sigmaRange ||
      [ -2, -1, 0, 0.5, 1, 2, 3 ].map(function (n) {
        return Math.pow(2, n);
      });
  this.kernelRange = options.kernelRange || [ 2, 3, 4, 4, 4, 5, 6 ];
  this.currentConfig = options.currentConfig ||
                         Math.floor((this.sigmaRange.length - 1) / 2);
  this.minRegionSize = options.minRegionSize || 16;
  this.highThreshold = options.highThreshold || 0.04;
  this.lowThreshold = options.lowThreshold || 0.3 * options.highThreshold;
  if (this.sigmaRange.length <= 0) {
    throw new Error('Invalid sigma range');
  }
  this.neighborMap8 = new NeighborMap(this.imageData.width,
                                        this.imageData.height);
  this.neighborMap4 = new NeighborMap(this.imageData.width,
                                        this.imageData.height,
                                        [ [ -1, -1 ],
                                         [ -1, 0 ],
                                         [ -1, 1 ],
                                         [ 0, -1 ] ]);
  this._compute();
}

WatershedSegmentation.prototype = Object.create(BaseSegmentation.prototype);

  // Change the segmentation resolution.
WatershedSegmentation.prototype.finer = function () {
  if (this.currentConfig > 0) {
    --this.currentConfig;
    if (this.imageData) {
      this._compute();
    }
  }
};

  // Change the segmentation resolution.
WatershedSegmentation.prototype.coarser = function () {
  if (this.currentConfig < this.sigmaRange.length - 1) {
    ++this.currentConfig;
    if (this.imageData) {
      this._compute();
    }
  }
};

  // Compute canny-watershed segmentation.
WatershedSegmentation.prototype._compute = function () {
  const queue = new PriorityQueue({
    comparator(a, b) { return a[0] - b[0]; }
  });
  const edge = canny(this.imageData, {
    kernelTail: this.kernelRange[this.currentConfig],
    sigma: this.sigmaRange[this.currentConfig],
    lowThreshold: this.lowThreshold,
    highThreshold: this.highThreshold
  });
  const seeds = this._findLocalMaxima(distanceTransform(edge));
  const labels = new Int32Array(edge.data.length);

    // Initialize.
  for (let i = 0; i < labels.length; ++i) {
    labels[i] = -1;
  }
  for (let i = 0; i < seeds.length; ++i) {
    labels[seeds[i]] = i + 1;
  }
  for (let i = 0; i < seeds.length; ++i) {
    const neighbors = this.neighborMap8.get(seeds[i]);
    for (let j = 0; j < neighbors.length; ++j) {
      const neighborOffset = neighbors[j];
      if (labels[neighborOffset] === -1) {
        queue.push([ edge.magnitude[neighborOffset], neighborOffset ]);
        labels[neighborOffset] = -2;
      }
    }
  }
    // Iterate until we label all pixels by non-border dilation.
  let iter = 0;
  while (queue.length > 0) {
    const offset = queue.shift()[1];
    const neighbors = this.neighborMap8.get(offset);
    const uniqueLabel = this._findUniqueRegionLabel(neighbors, labels);
    if (uniqueLabel) {  // Dilate when there is a unique region label.
      labels[offset] = uniqueLabel;
      for (let i = 0; i < neighbors.length; ++i) {
        const neighborOffset = neighbors[i];
        if (labels[neighborOffset] === -1) {
          labels[neighborOffset] = -2;
          queue.push([ edge.magnitude[neighborOffset], neighborOffset ]);
        }
      }
    } else {
      labels[offset] = 0;  // Boundary.
    }
    if (++iter > labels.length) {
      throw new Error('Too many iterations');
    }
  }
    // Remove boundaries and small regions.
  this.erode(0, labels);
  this._removeSmallRegions(labels);
  const numSegments = this._relabel(labels);
  this.result = this._encodeLabels(labels);
  this.result.numSegments = numSegments;
};

  // Find the local maxima.
WatershedSegmentation.prototype._findLocalMaxima = function (intensity) {
  const data = intensity.data;
  const maximaMap = new Uint8Array(data.length);
  const offsets = [];

  for (let offset = 0; offset < data.length; ++offset) {
    let neighbors = this.neighborMap8.get(offset);
    let flag = true;
    for (let k = 0; k < neighbors.length; ++k) {
      flag = flag && data[offset] >= data[neighbors[k]];
    }
    maximaMap[offset] = flag;
  }
    // Erase connected seeds.
  const suppressed = new Uint8Array(maximaMap.length);
  for (let offset = 0; offset < data.length; ++offset) {
    const neighbors = this.neighborMap4.get(offset);
    let flag = true;
    for (let k = 0; k < neighbors.length; ++k) {
      flag = flag && maximaMap[offset] > maximaMap[neighbors[k]];
    }
    suppressed[offset] = flag;
  }
  for (let offset = 0; offset < suppressed.length; ++offset) {
    if (suppressed[offset]) {
      offsets.push(offset);
    }
  }
  return offsets;
};

WatershedSegmentation.prototype._findUniqueRegionLabel =
      function (neighbors, labels) {
        const uniqueLabels = [];
        for (let i = 0; i < neighbors.length; ++i) {
          const label = labels[neighbors[i]];
          if (label > 0 && uniqueLabels.indexOf(label) < 0) {
            uniqueLabels.push(label);
          }
        }
        return (uniqueLabels.length === 1) ? uniqueLabels[0] : null;
      };

WatershedSegmentation.prototype._findDominantLabel =
      function (neighbors, labels, target) {
        const histogram = {};
        for (let i = 0; i < neighbors.length; ++i) {
          let label = labels[neighbors[i]];
          if (label !== target) {
            if (histogram[label]) {
              ++histogram[label];
            } else {
              histogram[label] = 1;
            }
          }
        }
        let count = 0;
        let dominantLabel = null;
        for (let label in histogram) {
          if (histogram[label] > count) {
            dominantLabel = label;
            count = histogram[label];
          }
        }
        return dominantLabel;
      };

  // Greedy erode.
WatershedSegmentation.prototype.erode = function (target, labels) {
  const offsets = [];
  const updates = {};
  let offset;
  for (offset = 0; offset < labels.length; ++offset) {
    if (labels[offset] === target) {
      offsets.push(offset);
    }
  }
  if (target !== 0 && offsets.length === 0) {
    throw new Error('No pixels for label ' + target);
  }
  updates[target] = 0;
  let iter = 0;
  while (offsets.length > 0) {
    offset = offsets.shift();
    const neighbors = this.neighborMap8.get(offset);
    const dominantLabel = this._findDominantLabel(neighbors, labels, target);
    if (dominantLabel !== null) {
      labels[offset] = dominantLabel;
      if (updates[dominantLabel]) {
        ++updates[dominantLabel];
      } else {
        updates[dominantLabel] = 1;
      }
      --updates[target];
    } else {
      offsets.push(offset);
    }
    if (++iter > labels.length) {
      throw new Error('Too many iterations for label ' + target);
    }
  }
  return updates;
};

  // Find small item.
WatershedSegmentation.prototype._findSmallLabel =
      function (histogram) {
        let smallLabel = null;
        for (let label in histogram) {
          const count = histogram[label];
          if (count > 0 && count < this.minRegionSize) {
            smallLabel = parseInt(label, 10);
            break;
          }
        }
        return smallLabel;
      };

  // Remove small regions.
WatershedSegmentation.prototype._removeSmallRegions =
      function (labels) {
        const histogram = {};
        for (let offset = 0; offset < labels.length; ++offset) {
          const label = labels[offset];
          if (histogram[label]) {
            ++histogram[label];
          } else {
            histogram[label] = 1;
          }
        }
        var iter = 0;
        /* eslint no-constant-condition: 0*/
        while (true) {
          const smallLabel = this._findSmallLabel(histogram);
          if (smallLabel !== null) {
            const updates = this.erode(smallLabel, labels);
            for (let label in updates) {
              histogram[label] += updates[label];
            }
          } else {
            break;
          }
          if (++iter >= Object.keys(histogram).length) {
            throw new Error('Too many iterations');
          }
        }
      };

WatershedSegmentation.prototype._relabel = function (labels) {
  const uniqueArray = [];
  for (let i = 0; i < labels.length; ++i) {
    let index = uniqueArray.indexOf(labels[i]);
    if (index < 0) {
      index = uniqueArray.length;
      uniqueArray.push(labels[i]);
    }
    labels[i] = index;
  }
  return uniqueArray.length;
};

  // Encode segmentation.
WatershedSegmentation.prototype._encodeLabels = function (labels) {
  const imageData = new ImageData(this.imageData.width,
                                  this.imageData.height);
  const data = imageData.data;
  for (let i = 0; i < labels.length; ++i) {
    const value = labels[i];
    data[4 * i] = 255 & value;
    data[4 * i + 1] = 255 & (value >> 8);
    data[4 * i + 2] = 255 & (value >> 16);
    data[4 * i + 3] = 255;
  }
  return imageData;
};

  // Neighbor Map.
function NeighborMap(width, height, neighbors) {
  this.neighbors = neighbors || [ [ -1, -1 ], [ -1, 0 ], [ -1, 1 ],
                                   [ 0, -1 ], [ 0, 1 ],
                                   [ 1, -1 ], [ 1, 0 ], [ 1, 1 ] ];
  this.maps = [];
  for (let k = 0; k < this.neighbors.length; ++k) {
    const dy = this.neighbors[k][0];
    const dx = this.neighbors[k][1];
    const map = new Int32Array(width * height);
    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        const Y = y + dy;
        const X = x + dx;
        map[y * width + x] = (Y < 0 || height <= Y || X < 0 || width <= X) ?
                               -1 : Y * width + X;
      }
    }
    this.maps.push(map);
  }
}

NeighborMap.prototype.get = function (offset) {
  const neighborOffsets = [];
  for (let k = 0; k < this.neighbors.length; ++k) {
    const neighborOffset = this.maps[k][offset];
    if (neighborOffset >= 0) {
      neighborOffsets.push(neighborOffset);
    }
  }
  return neighborOffsets;
};

export default WatershedSegmentation;
