
import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import SegmentationImage from '../components/segmentation_image.jsx';
import _ from 'lodash';



export const composer = ({context}, onData) => {
  const {LocalState} = context();
  const segmentationOpacity = LocalState.get('segmentation.opacity');
  onData(null, {segmentationOpacity});
};

export const depsMapper = (context, actions) => ({
  context: () => context,

});

export default composeAll(

  composeWithTracker(composer),
  useDeps(depsMapper)
)(SegmentationImage);
