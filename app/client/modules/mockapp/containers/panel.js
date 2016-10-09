import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import Panel from '../components/panel.jsx';
import lodash from 'lodash';
import 'seedrandom';
export const composer = ({context}, onData) => {
  // create fake values by a seeded random
  const {Meteor, LocalState, Collections: {Annotations}} = context();
  const image = LocalState.get('mockapp.currentImage');
  const seed = Annotations.find().count();
  Math.seedrandom(`something${image}${seed}`);
  // we have to re-invoke lodash
  const _ = lodash.runInContext();

  const accuracy = Math.tanh((Math.random() * 10 + Annotations.find().count()) / 10);
  const t = _.sample([ '0','1', '2', '3', '4', 'X' ]);
  const n = _.sample([ '0','1', '2', '3', 'X' ]);
  const m = _.sample([ '0','1' ]);
  const classification = `T:${t} N:${n} M:${m}`;
  const showAnnotations = LocalState.get('mockapp.showAnnotations');

  onData(null, {accuracy, showAnnotations, classification});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  nextSample: actions.mockapp.nextSample,
  setCTSample: actions.mockapp.setCTSample,
  toggleAnnotations: actions.annotations.toggleAnnotations
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Panel);
