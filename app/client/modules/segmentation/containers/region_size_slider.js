import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import RegionSizeSlider from '../components/region_size_slider.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState} = context();
  const regionSize = LocalState.get('segmentation.regionSize');

  onData(null, {regionSize});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  setRegionSize: actions.segmentation.setRegionSize
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(RegionSizeSlider);
