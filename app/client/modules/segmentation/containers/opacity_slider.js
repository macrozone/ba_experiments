import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import OpacitySlider from '../components/opacity_slider.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState} = context();
  const opacity = LocalState.get('segmentation.opacity');
  onData(null, {opacity});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  setOpacity: actions.segmentation.setOpacity
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(OpacitySlider);
