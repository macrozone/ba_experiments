import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import SelectState from '../components/select_state.jsx';


export const composer = ({context, localState}, onData) => {
  const {Meteor, LocalState} = context();
  const value = LocalState.get(localState);
  const setValue = newValue => LocalState.set(localState, newValue);
  onData(null, {setValue, value});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SelectState);
