import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Bitmap from '../components/bitmap.jsx';
import {withState} from 'recompose';
export const composer = ({context, props, image, setImage}, onData) => {
  const {Meteor, Collections: {AnnotationBitmaps}} = context();
  const annotationBitmap = AnnotationBitmaps.findOne(props.bitmapId);
  if (annotationBitmap) {
    const imageUrl = annotationBitmap.link();
    image.src = imageUrl;
    image.setAttribute('crossOrigin', '');
    image.onload = () => {
      setImage(image);
    };
  }

  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  withState('image', 'setImage', () => new Image()),
  useDeps(depsMapper)
)(Bitmap);
