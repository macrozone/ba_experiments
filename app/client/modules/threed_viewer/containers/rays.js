import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Rays from '../components/rays.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState} = context();

  const rays = LocalState.get('pet_3_d_viewer.rays');
  onData(null, {rays});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Rays);
