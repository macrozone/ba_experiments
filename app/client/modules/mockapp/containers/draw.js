import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Draw from '../components/draw.jsx';
import withMousePosition from '../../core/hocs/with_mouse_position';
import Segmentation from '/lib/image/segmentation';
export const composer = ({context}, onData) => {
  const {LocalState} = context();
  const showAnnotations = LocalState.get('annotations.showAnnotations');
  const currentToolId = LocalState.get('annotations.currentToolId');
  const segmentationOpacity = LocalState.get('annotations.segmentationOpacity');
  onData(null, {showAnnotations, segmentationOpacity, currentToolId});
};

export const imageComposer = ({context}, onData) => {
  const {LocalState} = context();
  const imageUrl = LocalState.get('mockapp.currentImage');

  const image = new Image();
  image.src = imageUrl;
  image.setAttribute('crossOrigin', '');
  image.onload = () => {

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0 );
    const imageData = ctx.getImageData(0, 0, image.width, image.height);

    const segmentation = Segmentation.create(imageData, {method: 'slic', regionSize: 25});

    segmentation.image = new Image();
    ctx.putImageData(segmentation.result,0,0);
    segmentation.image.src = canvas.toDataURL();

    onData(null, {image, width: image.width, height: image.height, imageUrl, segmentation});
  };

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
  composeWithTracker(imageComposer),
  useDeps(depsMapper)
)(Draw);
