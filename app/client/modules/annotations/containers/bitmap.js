import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import Bitmap from '../components/bitmap.jsx';
import { withState } from 'recompose';
export const composer = ({ context, props, image }, onData) => {
  const { Meteor, Collections: { AnnotationBitmaps } } = context();
  Meteor.subscribe('annotationBitmaps.all');
  const annotationBitmap = AnnotationBitmaps.findOne(props.bitmapId);
  if (annotationBitmap) {
    const imageUrl = annotationBitmap.link();
    image.src = imageUrl;
    image.onload = () => {
      onData(null, { loaded: image.complete, image });
    };
  }

  onData(null, { loaded: image.complete, image });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  withState('image', 'setImage', () => new Image()),
  useDeps(depsMapper)
)(Bitmap);
