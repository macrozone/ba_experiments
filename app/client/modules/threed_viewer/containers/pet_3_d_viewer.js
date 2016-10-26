import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Pet3DViewer from '../components/pet_3_d_viewer.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState} = context();
  const opacity = LocalState.get('pet_3_d_viewer.opacity');
  onData(null, {opacity});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Pet3DViewer);
