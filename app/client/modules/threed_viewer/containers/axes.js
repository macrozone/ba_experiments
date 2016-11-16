import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Axes from '../components/axes.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState} = context();
  const showAxes = LocalState.get('threed_viewer.showAxes');
  onData(null, {showAxes});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Axes);
