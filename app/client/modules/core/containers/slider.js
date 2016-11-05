import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Slider from '../components/slider.jsx';
import _ from 'lodash';
import {withState} from 'recompose';

export const composer = ({context, localState, min, max,debounce = 300}, onData) => {
  const {Meteor, LocalState} = context();
  const value = LocalState.get(localState);
  const clampValue = value => _.clamp(value, min, max);
  const setValue = _.debounce(
    (value) => LocalState.set(localState, clampValue(value)),
    debounce
  );

  onData(null, {setValue, value});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Slider);
