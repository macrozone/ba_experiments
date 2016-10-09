import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import SegmentationOpacitySlider from '../components/segmentation_opacity_slider.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState} = context();
  const opacity = LocalState.get('annotations.segmentationOpacity');
  onData(null, {opacity});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  setOpacity: actions.annotations.setSegmentationOpacity
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SegmentationOpacitySlider);
