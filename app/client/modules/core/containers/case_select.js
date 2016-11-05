import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import CaseSelect from '../components/case_select.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  Meteor.subscribe('cases.all');
  const cases = Collections.Cases.find().fetch();
  onData(null, {cases});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  selectCase: actions.cases.select,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(CaseSelect);
