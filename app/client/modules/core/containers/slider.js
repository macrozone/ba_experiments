import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Slider from '../components/slider.jsx';
import _ from 'lodash';

export const composer = ({context, localState, debounce = 300}, onData) => {
  const {Meteor, LocalState} = context();
  const value = LocalState.get(localState);
  const setValue = _.debounce((newValue) => LocalState.set(localState, newValue), debounce);
  onData(null, {setValue, value});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Slider);
