import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import ToggleAxesButton from '../components/toggle_axes_button.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState} = context();
  const showAxes = LocalState.get('pet_3_d_viewer.showAxes');

  onData(null, {showAxes});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  toggleAxes: () => context.LocalState.set(
    'pet_3_d_viewer.showAxes',
    !context.LocalState.get('pet_3_d_viewer.showAxes')
  )
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ToggleAxesButton);
