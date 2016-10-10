import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Draw from '../components/draw.jsx';
import withMousePosition from '../../core/hocs/with_mouse_position';
import Segmentation from '/lib/image/segmentation';
export const composer = ({context}, onData) => {
  const {LocalState} = context();
  const showAnnotations = LocalState.get('annotations.showAnnotations');
  const currentToolId = LocalState.get('annotations.currentToolId');
  const segmentationOpacity = LocalState.get('segmentation.opacity');
  onData(null, {showAnnotations, segmentationOpacity, currentToolId});
};

export const imageComposer = ({context}, onData) => {
  const {LocalState} = context();
  const imageUrl = LocalState.get('mockapp.currentImage');

  const image = new Image();
  image.src = imageUrl;
  image.setAttribute('crossOrigin', '');
  image.onload = () => {

    onData(null, {image, width: image.width, height: image.height});
  };

};


export const segmentationComposer = ({context, image}, onData) => {
  const {LocalState} = context();
  const regionSize = LocalState.get('segmentation.regionSize');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0 );
  const imageData = ctx.getImageData(0, 0, image.width, image.height);

  const segmentation = Segmentation.create(imageData, {method: 'slic', regionSize});

  segmentation.image = new Image();
  ctx.putImageData(segmentation.result,0,0);
  segmentation.image.src = canvas.toDataURL();
  function _getEncodedLabel(array, offset) {
    return array[offset] |
           (array[offset + 1] << 8) |
           (array[offset + 2] << 16);
  }

  const createLabelMap = function () {
    const map = new Map();
    const data = segmentation.result.data;
    for (let i = 0; i < data.length; i += 4) {
      const label = _getEncodedLabel(data, i);
      if (!map.has(label)) {
        map.set(label, {label, pixels: []});
      }
      map.get(label).pixels.push(i);
    }
    return map;
  };

  const labelMap = createLabelMap();

  const _getClickOffset = (x,y) => {
    return 4 * (y * image.width + x);
  };

  const getLabelForClick = (x,y) => {
    const label = _getEncodedLabel(segmentation.result.data, _getClickOffset(x,y));
    return labelMap.get(label);
  };





  onData(null, { segmentation, getLabelForClick});


};


export const keyComposer = ({context}, onData) => {
  const {Keypress} = context();
  const altKey = Keypress.is(Keypress.Keys.Alt);
  onData(null, {altKey});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});
export default composeAll(
  withMousePosition(),
  composeWithTracker(keyComposer),
  composeWithTracker(composer),
  composeWithTracker(segmentationComposer),
  composeWithTracker(imageComposer),
  useDeps(depsMapper)
)(Draw);
