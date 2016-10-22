import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {LocalState} = context();
  const imageUrl = LocalState.get('mockapp.currentImage');

  const image = new Image();
  image.src = imageUrl;
  image.setAttribute('crossOrigin', '');
  image.onload = () => {
    onData(null, {image, width: image.width, height: image.height});
  };


};
export default () => composeWithTracker(composer);
