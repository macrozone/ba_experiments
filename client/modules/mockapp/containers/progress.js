import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Progress from '../components/progress.jsx';

export const composer = ({context}, onData) => {
  const {LocalState} = context();
  const samplesDone = LocalState.get('samplesDone') || 0;
  const SAMPLES_PER_SESSION = 20;
  const progress = (samplesDone % SAMPLES_PER_SESSION / SAMPLES_PER_SESSION) * 100;
  const label = `${samplesDone % SAMPLES_PER_SESSION} / ${SAMPLES_PER_SESSION}`;
  onData(null, {progress, label});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Progress);
