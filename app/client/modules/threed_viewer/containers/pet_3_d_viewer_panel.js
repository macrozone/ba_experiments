import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import Pet3DViewerPanel from '../components/pet_3_d_viewer_panel.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections } = context();
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Pet3DViewerPanel);
